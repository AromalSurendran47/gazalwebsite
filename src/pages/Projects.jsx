import { useGSAP } from '@gsap/react'
import ProjectCard from '../components/projects/ProjectCard'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import { useRef } from 'react'


const Projects = () => {

  const projects = [
    {
      video1: '/projects/AUTOMOTIVE.mp4',
      video2: '/projects/food reel post.mp4',
      projectId: 1,
      title1: 'Automotive',
      title2: 'Food Reel'
    }, 
    {
      video1: '/projects/INTERIOR E REEL.mp4',
      video2: '/projects/potraits.mp4',
      projectId: 2,
      title1: 'Interior',
      title2: 'Portraits'
    }
  ]

  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const containerRef = useRef(null)

  gsap.registerPlugin(ScrollTrigger)

  useGSAP(function () {
    // Title animation
    if (titleRef.current) {
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 80,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.3
      })
    }

    // Subtitle animation
    if (subtitleRef.current) {
      gsap.from(subtitleRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.6
      })
    }

    // Projects container animation
    if (containerRef.current) {
      const cards = containerRef.current.querySelectorAll('.project-row')
      gsap.from(cards, {
        opacity: 0,
        y: 100,
        stagger: 0.2,
        duration: 1,
        ease: 'power3.out',
        delay: 0.8,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      })
    }

    // Scroll-based height animation for project rows
    gsap.utils.toArray('.project-row').forEach((row, index) => {
      gsap.from(row, {
        height: '100px',
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: row,
          start: 'top 90%',
          end: 'top 10%',
          scrub: 1.5
        }
      })
    })
  })

  return (
    <div className='min-h-screen bg-black text-white font-[font1] overflow-hidden'>
      {/* Hero Section */}
      <div className='relative pt-32 lg:pt-40 pb-16 lg:pb-24 px-5 lg:px-12'>
        <div className='max-w-[1800px] mx-auto'>
          {/* Main Title */}
          <div ref={titleRef} className='mb-6'>
            <h1 className='font-[font2] lg:text-[12vw] text-8xl uppercase leading-[0.9] tracking-tight text-white'>
              Projects
            </h1>
          </div>
          
          {/* Subtitle */}
          <div ref={subtitleRef} className='mt-4'>
            <p className='text-lg lg:text-xl text-white/60 uppercase tracking-wider font-[font1]'>
              Creative Visual Stories
            </p>
            <div className='mt-6 w-20 h-[2px] bg-white'></div>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div ref={containerRef} className='px-5 lg:px-12 pb-32'>
        <div className='max-w-[1800px] mx-auto space-y-6 lg:space-y-8'>
          {projects.map((project, idx) => (
            <div 
              key={idx} 
              className='project-row w-full lg:h-[85vh] h-auto flex lg:flex-row flex-col gap-4 lg:gap-6'
            >
              <ProjectCard 
                video1={project.video1} 
                video2={project.video2} 
                projectId={project.projectId}
                title1={project.title1}
                title2={project.title2}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Footer Section */}
      <div className='px-5 lg:px-12 pb-16 pt-20'>
        <div className='max-w-[1800px] mx-auto text-center'>
          <p className='text-sm lg:text-base text-white/40 uppercase tracking-widest'>
            Scroll to explore more
          </p>
        </div>
      </div>
    </div>
  )
}

export default Projects