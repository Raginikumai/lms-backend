import prisma from '../../../config/db';
import bcrypt from 'bcrypt';
import { ApiError } from '../../../middleware/errorHandler';
import { type RegisterInput } from '../auth/auth.schema';

export const createUser = async (data: RegisterInput) => {

    const { username, first_name, last_name, email, password } = data;
    const existing = await prisma.user.findUnique({ where: { email: email } });
    if (existing) {
        throw new ApiError(409, 'Email already in use');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
        data: {
            username,
            firstName: first_name ?? null,
            lastName: last_name ?? null,
            email,
            password: hashedPassword,
        },
        select: {
            id: true,
            email: true,
            username: true,
            role: true,
            createdAt: true,
        }
    });

    return newUser;
};