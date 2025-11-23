import React, { useRef } from 'react'
import Video from '../components/home/Video'
import HomeHeroText from '../components/home/HomeHeroText'
import HomeBottomText from '../components/home/HomeBottomText'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const Home = () => {
  const heroTextRef = useRef(null)
  const bottomTextRef = useRef(null)

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
  })

  return (
    <div className='text-white min-h-screen'>
      <div className='h-screen w-screen fixed z-0'>
        <Video />
      </div>
      <div className='h-screen w-screen relative z-10 overflow-hidden flex flex-col justify-between'>
        <div className='flex-1 flex items-center justify-center'>
          <div ref={heroTextRef}>
            <HomeHeroText />
          </div>
        </div>
        <div ref={bottomTextRef}>
          <HomeBottomText />
        </div>
      </div>
    </div>
  )
}

export default Home