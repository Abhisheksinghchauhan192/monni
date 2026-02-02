import { createUser, findUserByEmail } from "../users/user.model.js";
import ApiError from "../../errors/ApiError.js";
import { hashPassword, comparePassword } from "../../utils/password.js";

// Registration of User Business Logic
export async function registerUser({ name, email, password }) {
  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    throw new ApiError(409, "User already exists");
  }

  const passwordHash = await hashPassword(password);

  const user = createUser({ name, email, passwordHash });

  return user;
}

// Login User Business Logic
export async function loginUser({ email, password }) {
  const user = await findUserByEmail(email);
  if (!user || !(await comparePassword(password, user.password_hash))) {
    throw new ApiError(401, "Invalid email or password");
  }

  return {
    id: user.id,
    publicId: user.public_id,
    email: user.email,
    name: user.name,
  };
}
