import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
    const { name, email, password, role } = await req.json();

    // Cari user berdasarkan email jika sudah ada user dengan email yang sama maka akan mengembalikan error
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) return new Response("User already exists", { status: 409 });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Buat user baru
    const newUser = await prisma.user.create({
        data: { name, email, password: hashedPassword, role },
    });

    // Buat token
    const token = jwt.sign(
        { userId: newUser.id, role: newUser.role, name: newUser.name },
        "verysecretkey",
        { expiresIn: "1d" }
    );

    return new Response(JSON.stringify({ token }), { status: 201 });

}
