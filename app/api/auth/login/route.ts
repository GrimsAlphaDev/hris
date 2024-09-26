import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
    const { email, password } = await req.json();

    // Cari user berdasarkan email
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return new Response("User not found", { status: 404 });

    // Verifikasi password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return new Response("Invalid credentials", { status: 401 });

    const token = jwt.sign(
        { userId: user.id, role: user.role, email: user.email },
        "verysecretkey",
        { expiresIn: "1d" }
    );
    return new Response(JSON.stringify({ token }), { status: 200 });
}
