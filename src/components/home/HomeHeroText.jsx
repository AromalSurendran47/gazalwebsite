import React from 'react'
import Video from './Video'

const HomeHeroText = () => {
    return (
        <div className='font-[font1] mt-72 lg:mt-0 pt-5 text-center'>
            <div className='lg:text-[4vw] text-[8vw] justify-center flex items-center uppercase leading-none font-[font2] whitespace-nowrap'>
            Elevated excellence
            </div>
            {/* <div className='lg:text-[9.5vw] text-[12vw] justify-center flex items-start uppercase lg:leading-[8vw] leading-[10vw] font-[font2]'>
                
                <div className='h-[7vw] w-[16vw] rounded-full -mt-3 overflow-hidden mx-2'>
                    <Video />
                </div>
                
            </div> */}
            <div className='text-[3.5vw] lg:text-[1.2vw] mt-4 lg:mt-6 tracking-wide text-gray-400'>
                 Update your thought
            </div>
        </div>
    )
}

export default HomeHeroText