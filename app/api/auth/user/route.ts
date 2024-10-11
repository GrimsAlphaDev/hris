import { decryptToken } from "@/lib/jwt";
import * as cookie from "cookie";
import { csrf } from "../../csrf/route";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { jwtDecode } from "jwt-decode";
import { UserModel } from "@/models/UserModel";

const tokens = new csrf();
const secret = process.env.CSRF_SECRET || tokens.secretSync();

// decode token
interface UserToken {
    email: string;
    [key: string]: any;
}

export async function POST(req: Request) {
    // get token cookie
    const cookies = cookie.parse(req.headers.get("cookie") || "");
    const token: string | undefined = cookies.token;
    const csrfToken: string | undefined = cookies["XSRF-TOKEN"];

    // get csrf token from request
    // decryt token
    const decryptedToken = token ? await decryptToken(token) : undefined;

    try {
        if (!csrfToken || !tokens.verify(secret, csrfToken)) {
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

        const userToken: UserToken | undefined = decryptedToken
            ? jwtDecode<UserToken>(decryptedToken)
            : undefined;

        const email = userToken ? userToken.email : undefined;

        // Find the user by email
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            return new Response(
                JSON.stringify({ error: "Invalid Credential" }),
                {
                    status: 404,
                    headers: { "Content-Type": "application/json" },
                }
            );
        }

        const userDetail: UserModel = {
            name: user.name,
            email: user.email,
            role: user.role,
        };

        // return response with user data
        return new Response(JSON.stringify({ user: userDetail }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        return NextResponse.json(
            { error: (error as Error).message },
            { status: 403 }
        );
    }
}
