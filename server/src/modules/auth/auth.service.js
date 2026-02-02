import { createUser, findUserByEmail } from "../users/user.model.js";

import { hashPassword, comparePassword } from "../../utils/password.js";

// Registration of User Business Logic
export async function registerUser({ name, email, password }) {
  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    throw new Error("User already exists with this email\n");
  }
  const passwordHash = await hashPassword(password);

  const user = createUser({ name, email, passwordHash });

  return user;
}

// Login User Business Logic
export async function loginUser({ email, password }) {
  const user = await findUserByEmail(email);
  if (!user) {
    throw new Error("Invalid Email or Password");
  }

  const isMatch = await comparePassword(password, user.password_hash);

  if (!isMatch) {
    throw new Error("Invalid Email or password");
  }

  return {
    id: user.id,
    publicId: user.public_id,
    email: user.email,
    name: user.name,
  };
}
