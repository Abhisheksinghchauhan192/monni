import { ZodError } from "zod";
import ApiError from "../errors/ApiError.js";

function handleZodError(err, next) {
  if (err instanceof ZodError) {
    const message = err.issues.map((i) => i.message).join(", ");
    return next(new ApiError(400, message));
  }
  next(err);
}

export function validateBody(schema) {
  return (req, res, next) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (err) {
      handleZodError(err, next);
    }
  };
}

export function validateQuery(schema) {
  return (req, res, next) => {
    try {
      // DO NOT overwrite req.query
      req.validatedQuery = schema.parse(req.query);
      next();
    } catch (err) {
      handleZodError(err, next);
    }
  };
}
