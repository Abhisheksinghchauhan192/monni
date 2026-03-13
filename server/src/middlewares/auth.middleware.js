import { varifyToken } from "../utils/jwt.js";
import ApiError from "../errors/ApiError.js";

export default function authMiddleWare(req, res, next) {
  const token = req.cookies.monni_token;

  if (!token) {
    return next(new ApiError(401, "Unauthorised"));
  }

  try {
    const decoded = varifyToken(token);
    req.user = decoded.publicId;
    next();
  } catch {
    next(new ApiError(401, "Token Expired !"));
  }
}