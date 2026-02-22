import React, { useRef } from 'react'
import Video from '../components/home/Video'
import HomeHeroText from '../components/home/HomeHeroText'
import HomeBottomText from '../components/home/HomeBottomText'
import Clock from '../components/home/Clock'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const Home = () => {
  const heroTextRef = useRef(null)
  const bottomTextRef = useRef(null)
  const infoBarRef = useRef(null)

  useGSAP(() => {
    // Hero text animation
    if (heroTextRef.current) {
      const lines = heroTextRef.current.querySelectorAll('div')
      gsap.from(lines, {
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 1,
        ease: 'power3.out',
        delay: 0.3
      })
    }

    // Bottom text and links animation
    if (bottomTextRef.current) {
      const elements = bottomTextRef.current.querySelectorAll('p, a')
      gsap.from(elements, {
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 0.8,
        delay: 0.8,
        ease: 'power3.out'
      })
    }

    if (infoBarRef.current) {
      gsap.from(infoBarRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.8,
        delay: 0.2,
        ease: 'power3.out'
      })
    }
  })

  return (
    <div className='text-white min-h-screen relative font-[font1]'>
      <div className='fixed inset-0 z-0'>
        <Video />
        <div className='absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30 pointer-events-none' />
      </div>
      <div className='relative z-10 flex flex-col min-h-screen'>
        <div
          ref={infoBarRef}
          className='flex justify-end px-5 lg:px-12 pt-6 pb-4 text-white/80 backdrop-blur-sm'
        >
          <div className='flex items-center gap-3 uppercase tracking-[0.3em] text-[0.6rem] sm:text-xs'>
            <span className='flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-white/60'>
              <svg
                className='h-4 w-4 sm:h-5 sm:w-5 text-white'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <circle cx='12' cy='12' r='9' stroke='currentColor' strokeWidth='1.2' />
                <path
                  d='M3 12h18M12 3c2.5 3 2.5 15 0 18M7.5 5.5c1.5 2.2 1.5 10.8 0 13M16.5 5.5c-1.5 2.2-1.5 10.8 0 13'
                  stroke='currentColor'
                  strokeWidth='1.2'
                  strokeLinecap='round'
                />
              </svg>
            </span>
            {/* <Clock className='tracking-[0.35em] text-xs lg:text-sm uppercase' /> */}
          </div>
        </div>

        <div className='flex-1 flex items-center justify-center px-5 lg:px-16'>
          <div ref={heroTextRef} className='w-full text-center'>
            <HomeHeroText />
          </div>
        </div>

        <div ref={bottomTextRef} className='mt-auto'>
          <HomeBottomText />
        </div>
      </div>
    </div>
  )
}

export default Home