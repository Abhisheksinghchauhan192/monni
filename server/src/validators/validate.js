import Apierror from "../errors/ApiError.js";
import { ZodError } from "zod";
// Global validator logic .
export default function validate(schema) {
  return (req, res, next) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (err) {
      // handle the zod specific errors.
      if (err instanceof ZodError) {
        const message = err.issues
          .map((issue) => {
            return issue.message;
          })
          .join(", ");
        return next(new Apierror(400, message));
      }

      next(err); // Handle other errors.
    }
  };
}
