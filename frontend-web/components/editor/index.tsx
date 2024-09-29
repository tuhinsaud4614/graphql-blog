"use client";

import * as React from "react";

import EditorJS, { EditorConfig } from "@editorjs/editorjs";
import { toast } from "sonner";
import { useOnClickOutside } from "usehooks-ts";
import { z } from "zod";

import { useUploadImageMutation } from "@/graphql/generated/schema";
import useCallbackRef from "@/hooks/useCallbackRef";
import useControllableState from "@/hooks/useControllableState";
import { BACKEND_API_URL } from "@/lib/constants";
import { isDev } from "@/lib/isType";
import { cn } from "@/lib/utils";

type Data = NonNullable<EditorConfig["data"]>;

type ClassNames = {
  root?: string;
};

export const EditorSchema = z.object({
  version: z.string().optional(),
  time: z.number().optional(),
  blocks: z.array(z.any()),
});

interface Props
  extends Omit<React.ComponentPropsWithoutRef<"div">, "onChange"> {
  value?: Data | null;
  onValueChange?: React.Dispatch<React.SetStateAction<Data | null>>;
  onBlur?(): void;
  disabled?: boolean;
  label?: string;
  required?: boolean;
  classNames?:
    | ((props: { isFocused?: boolean; isDisabled?: boolean }) => ClassNames)
    | ClassNames;
  editorInstance?: (instance: EditorJS) => void;
  imageBaseUrl?: string;
}

export type EditorProps = Props & Pick<EditorConfig, "placeholder">;

export default function Editor({
  value,
  onValueChange,
  onBlur,
  disabled = false,
  placeholder,
  className,
  editorInstance,
  classNames,
  imageBaseUrl = BACKEND_API_URL,
  ...rest
}: EditorProps) {
  const onBlurRef = useCallbackRef(onBlur);
  const editorInstanceRef = useCallbackRef(editorInstance);
  const [data, setData] = useControllableState<Data | null>({
    onChange: onValueChange,
    prop: value,
  });
  const holderRef = React.useRef<HTMLDivElement>(null);
  const editorRef = React.useRef<EditorJS | null>(null);
  const [isMounted, setIsMounted] = React.useState(false);
  const [isFocused, setIsFocused] = React.useState(false);

  const [uploadMutation, { reset }] = useUploadImageMutation({
    errorPolicy: "all",
    fetchPolicy: "network-only",
    onError() {
      toast.error("Failed to upload image.", {
        position: "top-center",
      });
    },
  });

  const saveHandler = async (image: File | null): Promise<string | null> => {
    let imageUrl: string | null = null;
    if (image) {
      try {
        const { data } = await uploadMutation({ variables: { image } });
        if (data) {
          toast.success("Upload image successfully.", {
            position: "top-center",
          });
          reset();
          imageUrl = data.uploadImage;
        }
      } catch (_) {
        toast.error("Failed to upload image.", {
          position: "top-center",
        });
      }
    }
    return imageUrl;
  };

  const initializeEditor = React.useCallback(async () => {
    const editorjsCodecup = (await import("@calumk/editorjs-codecup")).default;
    const EditorJS = (await import("@editorjs/editorjs")).default;
    const Embed = (await import("@editorjs/embed")).default;
    const Header = (await import("@editorjs/header")).default;
    const ImageTool = (await import("@editorjs/image")).default;
    const InlineCode = (await import("@editorjs/inline-code")).default;
    const LinkTool = (await import("@editorjs/link")).default;
    const List = (await import("@editorjs/list")).default;
    const Marker = (await import("@editorjs/marker")).default;
    const Paragraph = (await import("@editorjs/paragraph")).default;
    const Table = (await import("@editorjs/table")).default;
    const Underline = (await import("@editorjs/underline")).default;
    const Strikethrough = (await import("@sotaproject/strikethrough")).default;
    const ChangeCase = (await import("editorjs-change-case")).default;
    if (!editorRef.current && holderRef.current) {
      const editor = new EditorJS({
        readOnly: disabled,
        holder: holderRef.current,
        placeholder,
        inlineToolbar: true,
        data: data ?? undefined,
        tools: {
          header: Header,
          paragraph: {
            class: Paragraph,
            inlineToolbar: true,
          },
          linkTool: LinkTool,
          list: List,
          inlineCode: InlineCode,
          table: Table,
          embed: Embed,
          underline: Underline,
          strikethrough: Strikethrough,
          changeCase: {
            class: ChangeCase,
            config: {
              showLocaleOption: true, // enable locale case options
              locale: ["bn", "en"],
            },
          },
          Marker: {
            class: Marker,
            shortcut: "CMD+SHIFT+M",
          },
          code: {
            class: editorjsCodecup,
          },
          image: {
            class: ImageTool,
            config: {
              uploader: {
                /**
                 * Upload file to the server and return an uploaded image data
                 * @param {File} file - file selected from the device or pasted by drag-n-drop
                 * @return {Promise.<{success, file: {url}}>}
                 */
                uploadByFile(file: File) {
                  // your own uploading logic here
                  return saveHandler(file).then((image) => {
                    if (!image) {
                      return {
                        success: 0,
                      };
                    }
                    return {
                      success: 1,
                      file: {
                        url: `${imageBaseUrl ?? ""}/${image}`,
                      },
                    };
                  });
                },
              },
            },
          },
        },
        onReady: () => {
          editorRef.current = editor;
          editorInstanceRef?.(editor);
        },
        onChange: () => {
          editorRef.current
            ?.save()
            .then((value) => {
              if (!value || value.blocks.length === 0) {
                setData(null);
              } else {
                setData(value);
              }
            })
            .catch((e) => isDev() && console.error(e));
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disabled, placeholder, editorInstanceRef]);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
    }
  }, []);

  React.useEffect(() => {
    if (isMounted) {
      void initializeEditor();

      return () => {
        editorRef.current?.destroy();
        editorRef.current = null;
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted]);

  useOnClickOutside(holderRef, () => {
    setIsFocused(false);
    onBlurRef?.();
  });

  if (!isMounted) return null;

  return (
    <div
      ref={holderRef}
      className={cn(
        "relative bg-transparent",
        isFocused && "outline-none ring-1 ring-ring",
        disabled && "cursor-not-allowed opacity-50",
        className,
        typeof classNames === "function"
          ? classNames({ isFocused, isDisabled: disabled })
          : classNames,
      )}
      {...rest}
    />
  );
}
