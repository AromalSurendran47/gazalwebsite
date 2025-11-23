import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useParams, useNavigate } from 'react-router-dom'

const ProjectDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  
  const diagonalBandRef = useRef(null)
  const mainTextRef = useRef(null)
  const leftTextRef = useRef(null)
  const rightTextRef = useRef(null)
  const leftTextMobileRef = useRef(null)
  const rightTextMobileRef = useRef(null)
  const socialRef = useRef(null)

  // Project data - you can expand this with actual project data
  const projectsData = {
    '1': {
      title: 'PROJECT ONE',
      description: 'A creative project showcasing innovative design solutions.',
      client: 'Client Name',
      year: '2024',
      bandText: 'VIEW PROJECT'
    },
    '2': {
      title: 'PROJECT TWO',
      description: 'Another amazing project with stunning visuals.',
      client: 'Client Name',
      year: '2024',
      bandText: 'VIEW PROJECT'
    },
    '3': {
      title: 'PROJECT THREE',
      description: 'A third project demonstrating our capabilities.',
      client: 'Client Name',
      year: '2024',
      bandText: 'VIEW PROJECT'
    }
  }

  const projectData = projectsData[id] || {
    title: 'PROJECT',
    description: 'Project details coming soon.',
    client: 'Client',
    year: '2024',
    bandText: 'VIEW PROJECT'
  }

  useGSAP(function () {
    gsap.from(mainTextRef.current?.children || [], {
      opacity: 0,
      y: 50,
      stagger: 0.1,
      duration: 0.8,
      delay: 0.5
    })

    if (leftTextRef.current) {
      gsap.from(leftTextRef.current, {
        opacity: 0,
        x: -50,
        duration: 0.8,
        delay: 0.7
      })
    }

    if (rightTextRef.current) {
      gsap.from(rightTextRef.current, {
        opacity: 0,
        x: 50,
        duration: 0.8,
        delay: 0.7
      })
    }

    if (leftTextMobileRef.current) {
      gsap.from(leftTextMobileRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 0.7
      })
    }

    if (rightTextMobileRef.current) {
      gsap.from(rightTextMobileRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 0.7
      })
    }

    gsap.from(diagonalBandRef.current, {
      opacity: 0,
      scaleX: 0,
      duration: 1,
      delay: 1
    })

    gsap.from(socialRef.current?.children || [], {
      opacity: 0,
      scale: 0,
      stagger: 0.1,
      duration: 0.5,
      delay: 1.2
    })
  })

  return (
    <div className='min-h-screen bg-black text-white font-[font1] overflow-hidden relative'>
      {/* Main Content Container */}
      <div className='h-screen w-full flex flex-col justify-between px-5 lg:px-12 py-8 lg:py-12'>
        
        {/* Top Section - Main Headline */}
        <div className='flex-1 flex items-center justify-center relative pt-20 lg:pt-0'>
          {/* Left Side Text */}
          <div 
            ref={leftTextRef}
            className='absolute left-0 lg:left-12 top-1/2 -translate-y-1/2 lg:w-64 w-40 text-xs lg:text-base leading-relaxed hidden lg:block'
          >
            <p>{projectData.client}</p>
            <p>{projectData.year}</p>
            <p className='mt-4'>{projectData.description}</p>
          </div>

          {/* Main Headline */}
          <div 
            ref={mainTextRef}
            className='text-center lg:text-[8vw] text-[12vw] uppercase font-[font2] leading-[0.9]'
          >
            {projectData.title.split(' ').map((word, idx) => (
              <div key={idx}>{word}</div>
            ))}
          </div>

          {/* Right Side - Back Button */}
          <div 
            ref={rightTextRef}
            className='absolute right-0 lg:right-12 top-1/2 -translate-y-1/2 lg:w-64 w-40 text-xs lg:text-base leading-relaxed text-right hidden lg:block cursor-pointer hover:text-[#D3FD50] transition-colors'
            onClick={() => navigate('/projects')}
          >
            <p className='mt-2'>← BACK</p>
          </div>

          {/* Mobile: Stack left and right text below headline */}
          <div className='lg:hidden absolute bottom-0 left-0 right-0 flex justify-between px-5 text-xs'>
            <div ref={leftTextMobileRef}>
              <p>{projectData.client}</p>
              <p>{projectData.year}</p>
              <p className='mt-2'>{projectData.description}</p>
            </div>
            <div 
              ref={rightTextMobileRef} 
              className='text-right cursor-pointer hover:text-[#D3FD50] transition-colors'
              onClick={() => navigate('/projects')}
            >
              <p className='mt-2'>← BACK</p>
            </div>
          </div>
        </div>

        {/* Diagonal Green Band */}
        <div className='relative w-full overflow-hidden my-8 lg:my-12'>
          <div 
            ref={diagonalBandRef}
            className='relative w-[150%] h-32 lg:h-40 bg-[#D3FD50] -rotate-3 origin-center'
            style={{
              marginLeft: '-25%'
            }}
          >
            <div className='absolute inset-0 flex items-center justify-center lg:justify-start lg:pl-12 rotate-3'>
              <div className='text-black font-[font2] text-4xl lg:text-6xl xl:text-7xl uppercase'>
                <span className='inline-block'>♥</span> {projectData.bandText || 'VIEW PROJECT'}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Social Media or Project Links */}
        <div 
          ref={socialRef}
          className='flex flex-col items-center justify-center gap-4 lg:gap-6 py-8'
        >
          <div className='text-sm lg:text-base uppercase tracking-wider'>PROJECT DETAILS</div>
          <div className='flex gap-4 lg:gap-6'>
            {/* You can add project-specific links here */}
            <div className='w-12 h-12 lg:w-16 lg:h-16 rounded-full border-2 border-white flex items-center justify-center text-black bg-white font-[font2] text-sm lg:text-base font-bold cursor-pointer hover:bg-[#D3FD50] hover:border-[#D3FD50] transition-colors'>
              WEB
            </div>
            <div className='w-12 h-12 lg:w-16 lg:h-16 rounded-full border-2 border-white flex items-center justify-center text-black bg-white font-[font2] text-sm lg:text-base font-bold cursor-pointer hover:bg-[#D3FD50] hover:border-[#D3FD50] transition-colors'>
              CASE
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectDetail

