"use client";

import { motion } from 'framer-motion'
import React from 'react'
import { BackgroundBeamsWithCollision } from '../ui/background-beams-with-collision';

const Footer = () => {
    return (
        <footer className='mx-auto w-full pt-24 bg-primary-100 pb-32'>
            <BackgroundBeamsWithCollision>
            <div
                className="justify-content mx-auto w-5/6 md:flex md:justify-between md:gap-16"
            >
                {/* First Col*/}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    variants={{
                        hidden: { opacity: 0, x: -50 },
                        visible: { opacity: 1, x: 0 }
                    }}
                    className="md:w-6/12 mb-14"
                >
                    <h4 className="font-bold">About Us</h4>
                    <p className="my-5 text-justify">
                        We are here to help you manage your hr and payroll in a single system. Streamlining your business operations is crucial for efficiency, and one way to achieve this is by managing your HR and payroll in a single system. our service is designed to help you manage your HR and payroll in a single system.
                    </p>
                    {/* copyright */}
                    <p className="font-bold">
                        &copy; Mochammad Haikal Alfandi Subagyo All Rights Reserved
                    </p>
                </motion.div>
                {/* Secound Col */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    variants={{
                        hidden: { opacity: 0, x: -50 },
                        visible: { opacity: 1, x: 0 }
                    }}
                    className="md:w-3/12 mb-14">
                    <h4 className="font-bold">Links</h4>
                    <ul className="my-5">
                        <li className="mb-5">Home</li>
                        <li className="mb-5">Service</li>
                        <li className="mb-5">Support</li>
                        <li className="mb-5">Contact Us</li>
                    </ul>

                </motion.div>

                {/* Third Col */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    variants={{
                        hidden: { opacity: 0, x: -50 },
                        visible: { opacity: 1, x: 0 }
                    }} className="md:w-3/12 mb-5">
                    <h4 className="font-bold">Contact Us</h4>
                    <p className="my-5">
                        1234 Main Street, Anytown, USA 12345
                    </p>
                    <p>
                        Phone: 1-800-123-4567
                    </p>

                </motion.div>

            </div>
            </BackgroundBeamsWithCollision>
        </footer>
    )
}

export default Footer