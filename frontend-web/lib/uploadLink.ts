/* eslint-disable @typescript-eslint/ban-ts-comment */
// This code is from apollo-upload-client. I am currently facing import issue. That why copy their code here.
import {
  ApolloLink,
  Observable,
  createSignalIfSupported,
  defaultPrinter,
  fallbackHttpConfig,
  parseAndCheckHttpResponse,
  rewriteURIForGET,
  selectHttpOptionsAndBodyInternal,
  selectURI,
  serializeFetchParameter,
} from "@apollo/client";
import apolloCreateUploadLink from "apollo-upload-client/createUploadLink.mjs";
import extractFiles from "extract-files/extractFiles.mjs";
import { ExtractableFile } from "extract-files/isExtractableFile.mjs";
import { Kind, OperationTypeNode } from "graphql";

type UploadLinkOptions = NonNullable<
  Parameters<typeof apolloCreateUploadLink>[0]
>;

interface ReactNativeFileOptions {
  uri: string;
  type?: string;
  name?: string;
}

class ReactNativeFile {
  // @ts-ignore
  uri: string;
  type?: string;
  name?: string;

  // @ts-ignore
  constructor(options: ReactNativeFileOptions);
}

function isExtractableFile(value: unknown) {
  return (
    (typeof File !== "undefined" && value instanceof File) ||
    (typeof Blob !== "undefined" && value instanceof Blob) ||
    value instanceof ReactNativeFile
  );
}

function formDataAppendFile(
  formData: FormData,
  fieldName: string,
  file: ExtractableFile,
) {
  if ("name" in file) {
    formData.append(fieldName, file, file.name);
  } else {
    formData.append(fieldName, file);
  }
}

export default function createUploadLink({
  uri: fetchUri = "/graphql",
  useGETForQueries,
  // @ts-ignore
  isExtractableFile: customIsExtractableFile = isExtractableFile,
  FormData: CustomFormData,
  formDataAppendFile: customFormDataAppendFile = formDataAppendFile,
  print = defaultPrinter,
  fetch: customFetch,
  fetchOptions,
  credentials,
  headers,
  includeExtensions,
}: UploadLinkOptions) {
  const linkConfig = {
    http: { includeExtensions },
    options: fetchOptions,
    credentials,
    headers,
  };

  return new ApolloLink((operation) => {
    const context = operation.getContext();
    // @ts-ignore
    const { clientAwareness: { name, version } = {}, headers } = context;

    const contextConfig = {
      http: context.http,
      options: context.fetchOptions,
      credentials: context.credentials,
      headers: {
        ...(name && { "apollographql-client-name": name }),
        ...(version && { "apollographql-client-version": version }),
        ...headers,
      },
    };

    const { options, body } = selectHttpOptionsAndBodyInternal(
      operation,
      print,
      fallbackHttpConfig,
      linkConfig,
      contextConfig,
    );

    const { clone, files } = extractFiles(body, customIsExtractableFile, "");

    let uri = selectURI(operation, fetchUri);

    if (files.size) {
      if (options.headers) delete options.headers["content-type"];

      const RuntimeFormData = CustomFormData || FormData;

      const form = new RuntimeFormData();

      form.append("operations", serializeFetchParameter(clone, "Payload"));

      /** @type {{ [key: string]: Array<string> }} */
      const map = {};

      let i = 0;
      files.forEach((paths) => {
        // @ts-ignore
        map[++i] = paths;
      });
      form.append("map", JSON.stringify(map));

      i = 0;
      files.forEach((_, file) => {
        customFormDataAppendFile(form, String(++i), file);
      });

      options.body = form;
    } else {
      if (
        useGETForQueries &&
        // If the operation contains some mutations GET shouldn’t be used.
        !operation.query.definitions.some(
          (definition) =>
            definition.kind === Kind.OPERATION_DEFINITION &&
            definition.operation === OperationTypeNode.MUTATION,
        )
      )
        options.method = "GET";

      if (options.method === "GET") {
        const { newURI, parseError } = rewriteURIForGET(uri, body);
        if (parseError)
          // Apollo’s `HttpLink` uses `fromError` for this, but it’s not
          // exported from `@apollo/client/link/http`.
          return new Observable((observer) => {
            observer.error(parseError);
          });
        uri = newURI;
      } else options.body = serializeFetchParameter(clone, "Payload");
    }

    const { controller } = createSignalIfSupported();

    if (typeof controller !== "boolean") {
      if (options.signal)
        if (options.signal.aborted) {
          // Respect the user configured abort controller signal.

          // Signal already aborted, so immediately abort.
          controller.abort();
        } else {
          // Signal not already aborted, so setup a listener to abort when it does.
          options.signal.addEventListener(
            "abort",
            () => {
              controller.abort();
            },
            {
              // Prevent a memory leak if the user configured abort controller
              // is long lasting, or controls multiple things.
              once: true,
            },
          );
        }

      options.signal = controller.signal;
    }

    const runtimeFetch = customFetch || fetch;

    return new Observable((observer) => {
      /**
       * Is the observable being cleaned up.
       * @type {boolean}
       */
      // @ts-check
      let cleaningUp = false;

      runtimeFetch(uri, options)
        .then((response) => {
          // Forward the response on the context.
          operation.setContext({ response });
          return response;
        })
        .then(parseAndCheckHttpResponse(operation))
        .then((result: Parameters<typeof observer.next>[0]) => {
          observer.next(result);
          observer.complete();
        })
        .catch((error) => {
          // If the observable is being cleaned up, there is no need to call
          // next or error because there are no more subscribers. An error after
          // cleanup begins is likely from the cleanup function aborting the
          // fetch.
          if (!cleaningUp) {
            // For errors such as an invalid fetch URI there will be no GraphQL
            // result with errors or data to forward.
            if (error.result?.errors && error.result.data)
              observer.next(error.result);

            observer.error(error);
          }
        });

      // Cleanup function.
      return () => {
        cleaningUp = true;

        // Abort fetch. It’s ok to signal an abort even when not fetching.
        if (typeof controller !== "boolean") controller.abort();
      };
    });
  });
}
