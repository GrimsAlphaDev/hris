'use client';

import { useState, useEffect } from 'react';

type Employee = {
    id: number;
    name: string;
    position: string;
};

const EmployeePage = () => {
    const [employees, setEmployees] = useState(
        [] as Employee[]
    );

    useEffect(() => {
        const fetchEmployees = async () => {
            const res = await fetch('/api/employees');
            const data = await res.json();
            setEmployees(data);
        };

        fetchEmployees();
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Employee List</h1>
            <ul>
                {employees.map((employee) => (
                    <li key={employee.id} className="border-b py-2">
                        <div className="flex justify-between items-center">
                            <span>{employee.name} - {employee.position}</span>
                            <button className="text-red-500">Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EmployeePage;
