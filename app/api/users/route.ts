import prisma from "@/lib/prisma";

// GET: Fetch all users
export async function GET() {
    const users = await prisma.user.findMany();
    return new Response(JSON.stringify(users), { status: 200 });
}

// POST: Add new user
export async function POST(req: Request) {
    const { name, email, password } = await req.json();
    const newUser = await prisma.user.create({
        data: { name, email, password, role: "employee" },
    });
    return new Response(JSON.stringify(newUser), { status: 201 });
}
