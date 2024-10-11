import { NextRequest, NextResponse } from "next/server";
import { decryptToken } from "./lib/jwt";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { UserModel } from "./models/UserModel";

interface ExtendedJwtPayload extends JwtPayload {
    email: string;
    name: string;
    role: string;
}

export async function middleware(req: NextRequest) {
    const url = req.nextUrl.clone();
    // Ambil token dari cookie
    const token = req.cookies.get("token")?.value;

    // Jika tidak ada token, arahkan ke halaman login
    if (!token) {
        url.pathname = "/login";
        return NextResponse.redirect(url);
    }

    // Verifikasi token dan cek peran pengguna
    const decodedToken = await decryptToken(token);

    const data = jwtDecode<ExtendedJwtPayload>(decodedToken);

    // create user from user model
    const user: UserModel = {
        email: data.email,
        name: data.name,
        role: data.role,
    };

    // Hanya jalankan middleware pada rute yang dimulai dengan /hr
    if (url.pathname.startsWith("/hr")) {
        if (!user || user.role !== "hr") {
            url.pathname = "/login";
            return NextResponse.redirect(url);
        }
    } else if (url.pathname.startsWith("/employees")) {
        if (!user || user.role !== "employee") {
            url.pathname = "/login";
            return NextResponse.redirect(url);
        }
    } else if (url.pathname.startsWith("/api/auth/user")) {
        if (!user) {
            url.pathname = "/login";
            return NextResponse.redirect(url);
        }
    }

    return NextResponse.next();
}

// Tentukan ke rute mana middleware ini berlaku
export const config = {
    // matcher: ["/hr/:path*", "/employees/:path*"],
    // create 2 matcher for /hr and /employees
    matcher: ["/hr/:path*", "/employees/:path*", "/api/auth/user"],
};
