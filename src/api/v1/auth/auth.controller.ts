import { type Request, type Response } from "express";
import { registerUser } from "./auth.service";
import { registerSchema } from "./auth.schema";

/**
 * Registers a new user.
 *
 * @param {Request} req - The express request object.
 * @param {Response} res - The express response object.
 *
 * @returns {Promise<Response>} A promise that resolves to an express response object.
 *
 * @remarks
 * The request body should contain the following properties:
 * - username: string
 * - email: string
 * - password: string
 * - first_name: string (optional)
 * - last_name: string (optional)
 *
 * On successful registration, the response will contain the newly registered user in the response body.
 * The response status will be 201.
 *
 * If the request body is invalid, the response status will be 400 and the response body will contain an object with the following properties:
 * - success: boolean
 * - errors: string[]
 * - data: null
 */
export const register = async (req: Request, res: Response) => {
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success)
    return res.status(400).json({ success: false, errors: parsed.error.issues.map(i => i.message), data: null });

  const user = await registerUser(parsed.data);
  res.status(201).json({ success: true, user });
};

