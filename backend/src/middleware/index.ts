import type { ErrorRequestHandler } from "express";

import logger from "@/logger";
import { HttpError } from "@/model";

export const errorHandler: ErrorRequestHandler = (err, _, res, next) => {
  if (res.headersSent) {
    logger.warn("Header already sent");
    return next(err);
  }

  if (err instanceof HttpError) {
    logger.error(err.message);
    res.status(err.code).json(err.toObj());
    return;
  }

  logger.error(err.message);
  const result = new HttpError(
    "Something went wrong",
    500,
    "An unknown error occurs"
  ).toObj();
  res.status(500).json(result);
};
