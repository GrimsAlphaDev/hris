"use client";

import React from 'react'
import { TextRevealCard } from '../ui/text-reveal-card'
import { BackgroundGradient } from '../ui/background-gradient'
import { service } from '@/data/service';

const Service = () => {
    return (
        <section className='w-full flex flex-col justify-center items-center p-20 md:p-20 sm:p-10' id='service'>
            <TextRevealCard
                text="Our Full Service HR Solution Delivers"
                revealText="Our Full Service HR Solution Delivers"
                className='w-100 mb-10'
            >
            </TextRevealCard>

            <div className='flex flex-col md:flex-row gap-4'>
                {/* for loop 5 time */}
                {service.map((item, index) => (

                <div className='md:basis-1/4' key={index}>
                    <BackgroundGradient className="rounded-[22px] max-w-sm p-4 sm:p-4 bg-white dark:bg-zinc-900 shadow-lg">
                        <img
                            src={item.imageUrl}
                            alt="Benefits"
                            height="400"
                            width="400"
                            className="object-contain rounded-lg"
                        />
                        <p className="text-base text-center sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
                            {item.title}
                        </p>
                    </BackgroundGradient>
                </div>
                ))}

            </div>
        </section>
    )
}

export default Service

