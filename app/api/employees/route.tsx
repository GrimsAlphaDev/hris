import prisma from '@/lib/prisma';

export async function GET() {
    const employees = await prisma.employee.findMany();
    return new Response(JSON.stringify(employees), { status: 200 });
}

export async function POST(req: Request) {
    const { name, position, department } = await req.json();
    const newEmployee = await prisma.employee.create({
        data: { name, position, department },
    });
    return new Response(JSON.stringify(newEmployee), { status: 201 });
}

export async function PUT(req: Request) {
    const { id, name, position, department } = await req.json();
    const updatedEmployee = await prisma.employee.update({
        where: { id },
        data: { name, position, department },
    });
    return new Response(JSON.stringify(updatedEmployee), { status: 200 });
}

export async function DELETE(req: Request) {
    const { id } = await req.json();
    await prisma.employee.delete({ where: { id } });
    return new Response('Employee deleted', { status: 204 });
}