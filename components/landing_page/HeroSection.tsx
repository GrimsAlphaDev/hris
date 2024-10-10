"use client";

import React from 'react'
import { Highlight } from '../ui/hero-highlight'
import { motion } from 'framer-motion'
import { BackgroundBeamsWithCollision } from '../ui/background-beams-with-collision';

const HeroSection = () => {
  return (
    <BackgroundBeamsWithCollision className='w-full flex justify-center items-center pt-20 md:p-20 sm:p-10'>
      <div className='justify-center items-center flex-1 text-center md:text-left lg:text-left'>
        <motion.h1
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: [20, -5, 0],
          }}
          transition={{
            duration: 0.5,
            ease: [0.4, 0.0, 0.2, 1],
          }}
          className="text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug mx-auto mb-5"
        >
          <Highlight className="text-black dark:text-white">
            HR Solutions
          </Highlight>
          <br />
          That Scale With Your Bussiness

        </motion.h1>
        <div className='px-4 max-w-4xl leading-relaxed lg:leading-snug mx-auto mb-5'>
          <motion.p
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: [20, -5, 0],
            }}
            transition={{
              duration: 0.5,
              ease: [0.4, 0.0, 0.2, 1],
            }}
            className="text-neutral-700 dark:text-white mb-5 sm:text-sm md:text-base lg:text-xl">
            Streamlining your bussiness operations crucial for efficiency, and one way to achieve this is by managing your HR and payroll in a single system
          </motion.p>
          <button className="p-[3px] relative ">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
            <div className="px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
              CONTACT SALES
            </div>
          </button>
        </div>

      </div>
      <div className='justify-center items-center flex-1 hidden lg:block md:flex'>
        <img src='https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt='business' className='rounded-lg w-100' />
      </div>
    </BackgroundBeamsWithCollision>


  )
}

export default HeroSection