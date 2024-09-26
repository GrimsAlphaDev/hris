export type UserType = {
    userId : string;
    name: string;
    email?: string;
    role: 'employee' | 'hr';
}