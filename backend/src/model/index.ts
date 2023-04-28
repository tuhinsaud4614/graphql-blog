import { GraphQLError, type GraphQLErrorExtensions } from "graphql";

import {
  BAD_USER_INPUT,
  FORBIDDEN,
  GRAPHQL_PARSE_FAILED,
  GRAPHQL_VALIDATION_FAILED,
  INTERNAL_SERVER_ERROR,
  NO_CONTENT,
  PERSISTED_QUERY_NOT_FOUND,
  PERSISTED_QUERY_NOT_SUPPORTED,
  RATE_LIMIT_EXCEED,
  UN_AUTH_ERR_MSG,
  UN_AUTH_EXT_ERR_CODE,
} from "@/utils/constants";
import type { IErrorResponse, ISuccessResponse } from "@/utils/interfaces";

export class HttpError extends Error {
  constructor(message: string, public code: number, public detail?: string) {
    super(message);

    // this is for instanceof behave properly
    Object.setPrototypeOf(this, HttpError.prototype);
  }

  private _checkError(code: number) {
    switch (code) {
      case 301:
        return "Moved Permanently";
      case 400:
        return "Bad Request";
      case 401:
        return "Unauthorized";
      case 402:
        return "Payment Required";
      case 403:
        return "Forbidden";
      case 404:
        return "Not Found";
      case 409:
        return "Conflict";
      case 415:
        // The request entity has a media type which the server or resource does not support. For example, the client uploads an image as image/svg+xml, but the server requires that images use a different format.[49]
        return "Unsupported Media Type";
      case 422:
        // Invalid Inputs
        return "Unprocessable Entity";
      case 429:
        return "Too Many Requests";
      case 431:
        return "Request Header Fields Too Large";
      case 500:
        return "Internal Server Error";
      default:
        return "An unknown error occurred";
    }
  }

  toObj(): IErrorResponse {
    return {
      success: !(this.code >= 301 && this.code <= 500),
      detail: this.detail || null,
      message: this.message,
      error: this._checkError(this.code),
      timeStamp: new Date().toISOString(),
    };
  }
}

export class HttpSuccess<T> {
  constructor(
    public message: string,
    public data: T,
    public detail: string | null = null,
  ) {}

  toObj(): ISuccessResponse<T> {
    return {
      data: this.data,
      detail: this.detail,
      message: this.message,
      success: true,
      timeStamp: new Date().toISOString(),
    };
  }
}

export class CustomError extends GraphQLError {
  constructor(message: string, code: string) {
    super(message, { extensions: { code } });

    // this is for instanceof behave properly
    Object.setPrototypeOf(this, GraphQLError.prototype);
  }
}

// The GraphQL operation string contains a syntax error.
export class SyntaxError extends GraphQLError {
  constructor(message: string, extensions?: GraphQLErrorExtensions) {
    super(message, {
      extensions: { ...extensions, code: GRAPHQL_PARSE_FAILED },
    });

    // this is for instanceof behave properly
    Object.setPrototypeOf(this, GraphQLError.prototype);
  }
}

// The GraphQL operation is not valid against the server's schema.
export class ValidationError extends GraphQLError {
  constructor(message: string, extensions?: GraphQLErrorExtensions) {
    super(message, {
      extensions: { ...extensions, code: GRAPHQL_VALIDATION_FAILED },
    });

    // this is for instanceof behave properly
    Object.setPrototypeOf(this, GraphQLError.prototype);
  }
}

// The GraphQL operation includes an invalid value for a field argument.
export class UserInputError extends GraphQLError {
  constructor(message: string, extensions?: GraphQLErrorExtensions) {
    super(message, {
      extensions: { ...extensions, code: BAD_USER_INPUT },
    });

    // this is for instanceof behave properly
    Object.setPrototypeOf(this, GraphQLError.prototype);
  }
}

// The server failed to authenticate with a required data source, such as a REST API.
export class AuthenticationError extends GraphQLError {
  constructor(
    message: string = UN_AUTH_ERR_MSG,
    extensions?: GraphQLErrorExtensions,
  ) {
    super(message, {
      extensions: { ...extensions, code: UN_AUTH_EXT_ERR_CODE },
    });

    // this is for instanceof behave properly
    Object.setPrototypeOf(this, GraphQLError.prototype);
  }
}

// The server was unauthorized to access a required data source, such as a REST API.
export class ForbiddenError extends GraphQLError {
  constructor(message: string, extensions?: GraphQLErrorExtensions) {
    super(message, {
      extensions: { ...extensions, code: FORBIDDEN },
    });

    // this is for instanceof behave properly
    Object.setPrototypeOf(this, GraphQLError.prototype);
  }
}

// No content error.
export class NoContentError extends GraphQLError {
  constructor(message: string, extensions?: GraphQLErrorExtensions) {
    super(message, {
      extensions: { ...extensions, code: NO_CONTENT },
    });

    // this is for instanceof behave properly
    Object.setPrototypeOf(this, GraphQLError.prototype);
  }
}

// A client sent the hash of a query string to execute via automatic persisted queries, but the query was not in the APQ cache.
export class PersistedQueryNotFoundError extends GraphQLError {
  constructor(message: string, extensions?: GraphQLErrorExtensions) {
    super(message, {
      extensions: { ...extensions, code: PERSISTED_QUERY_NOT_FOUND },
    });

    // this is for instanceof behave properly
    Object.setPrototypeOf(this, GraphQLError.prototype);
  }
}

// A client sent the hash of a query string to execute via automatic persisted queries, but the server has disabled APQ.
export class PersistedQueryNotSupportedError extends GraphQLError {
  constructor(message: string, extensions?: GraphQLErrorExtensions) {
    super(message, {
      extensions: { ...extensions, code: PERSISTED_QUERY_NOT_SUPPORTED },
    });

    // this is for instanceof behave properly
    Object.setPrototypeOf(this, GraphQLError.prototype);
  }
}

// An unspecified error occurred.
export class UnknownError extends GraphQLError {
  constructor(message: string, extensions?: GraphQLErrorExtensions) {
    super(message, {
      extensions: { ...extensions, code: INTERNAL_SERVER_ERROR },
    });

    // this is for instanceof behave properly
    Object.setPrototypeOf(this, GraphQLError.prototype);
  }
}

export class RateLimitError extends GraphQLError {
  constructor(message: string, extensions?: GraphQLErrorExtensions) {
    super(message, {
      extensions: { ...extensions, code: RATE_LIMIT_EXCEED },
    });

    // this is for instanceof behave properly
    Object.setPrototypeOf(this, GraphQLError.prototype);
  }
}
