/* eslint-disable @next/next/no-img-element */
import React from 'react'

const Support = () => {
    return (
        <section className='w-full flex flex-col dark:bg-black bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative' id='support'>
            <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
            <div className='flex flex-col md:flex-row justify-center items-center p-10 md:px-20 sm:p-10 gap-6'>
                <div className='basis-1/2'>
                    <img src="https://images.unsplash.com/photo-1544725121-be3bf52e2dc8?q=80&w=2067&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Support" className="object-contain rounded-lg shadow-2xl" />
                </div>
                <div className='basis-1/2'>
                    <h1 className='text-2xl font-bold md:text-left text-center md:text-3xl lg:text-6xl sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200'>
                        Unbeatable Support Meet <span className='text-indigo-500'>Innovative</span> Technology
                    </h1>
                    <p className='text-base text-justify sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200 lg:pe-10 md:pe-0'>
                        Unmatched Support, We beliave that exceptional customer support is the cornerstone of a successful bussiness. We are committed to providing the best support experience in the industry. Our dedicated team of professionals...
                    </p>
                </div>
            </div>
            <div className='flex flex-col md:flex-row justify-center items-center p-10 md:px-20 sm:p-10 gap-6'>
                <div className='basis-1/2'>
                    <h1 className='text-2xl font-bold md:text-left text-center md:text-3xl lg:text-6xl sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200'>
                        Load and Maximize Your <span className='text-indigo-500'>Productivity</span> While Managing Your Risk.
                    </h1>
                    <p className='text-base text-justify sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200 lg:pe-10 md:pe-0'>
                        Insperity is commited to helping the comunities where we work and live through corporate contributions, volunteer efforts, community leadership and social responsibility.
                    </p>
                </div>
                <div className='basis-1/2'>
                    <img src="https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Support" className="object-contain rounded-lg shadow-2xl" />
                </div>
            </div>
        </section>
    )
}

export default Support