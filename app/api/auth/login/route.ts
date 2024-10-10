import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { csrf } from "../../csrf/route";

const tokens = new csrf();
const secret = process.env.CSRF_SECRET || tokens.secretSync();

export async function POST(req: NextRequest, res: NextResponse) {
    const { csrfToken, email, password } = await req.json();

    try {
        if (!tokens.verify(secret, csrfToken)) {
            return NextResponse.json(
                { error: "Invalid CSRF token" },
                { status: 403 }
            );
        }

        // Validate the request method
        if (req.method !== "POST") {
            return NextResponse.json(
                { error: "Method Not Allowed" },
                { status: 405 }
            );
        }

        // Find the user by email
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return new Response(JSON.stringify({ error: "Invalid Credential" }), {
                status: 404,
                headers: { "Content-Type": "application/json" },
            });
        }

        // Verify the password
        const isMatch = await bcrypt.compare(password.trim(), user.password);

        // return new Response(
        //     JSON.stringify({
        //         message: "Hello World",
        //         user,
        //         password,
        //         isMatch,
        //     }),
        //     {
        //         status: 200,
        //         headers: { "Content-Type": "application/json" },
        //     }
        // );

        if (!isMatch) {
            return new Response(
                JSON.stringify({ error: "Invalid credentials" }),
                {
                    status: 401,
                    headers: { "Content-Type": "application/json" },
                }
            );
        }

        // Create a JWT token
        const token = jwt.sign(
            { userId: user.id, role: user.role, email: user.email },
            "verysecretkey",
            { expiresIn: "1d" }
        );

        // Return the token in the response
        return new Response(JSON.stringify({ token }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error:", error);
        return new Response(
            JSON.stringify({ message: "Internal Server Error" }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" },
            }
        );
    }
}
