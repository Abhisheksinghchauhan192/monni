import { varifyToken } from "../utils/jwt.js";
import ApiError from "../errors/ApiError.js";

export default function authMiddleWare(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new ApiError(401, "Unauthorised"));
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = varifyToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    next(new ApiError(401, "Token Expired !"));
  }
}
