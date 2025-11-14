import { type Request, type Response } from "express";
import { registerUser } from "./auth.service";
import { registerSchema } from "./auth.schema";

export const register = async (req: Request, res: Response) => {
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success)
    return res.status(400).json({ success: false, errors: parsed.error.issues.map(i => i.message), data: null });

  const user = await registerUser(parsed.data);
  res.status(201).json({ success: true, user });
};

