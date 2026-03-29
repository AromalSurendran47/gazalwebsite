import { useGSAP } from '@gsap/react'
import ProjectCard from '../components/projects/ProjectCard'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const Projects = () => {
  const navigate = useNavigate()

  const projects = [
    {
      video1: 'https://res.cloudinary.com/dr47btnx9/video/upload/v1773339105/AUTOMOTIVE_dj5f0c.mp4',
      video2: '',
      projectId: 1,
      title1: 'Automotive',
      description1: 'High-octane automotive cinematography',
      title2: '',
      description2: ''
    }, 
    {
      video1: 'https://res.cloudinary.com/dr47btnx9/video/upload/v1773336858/food_reel_post_wkwjpq.mp4',
      video2: '',
      projectId: 3,
      title1: 'Food Reel',
      description1: 'Culinary visual storytelling',
      title2: '',
      description2: ''
    },
    {
      video1: 'https://res.cloudinary.com/dr47btnx9/video/upload/v1773336855/potraits_r2mmme.mp4',
      video2: '',
      projectId: 4,
      title1: 'Perfume',
      description1: 'Capturing human essence',
      title2: '',
      description2: ''
    },
    {
      video1: 'https://res.cloudinary.com/dr47btnx9/video/upload/v1774721957/fitness_display_eh17dl.mp4',
      video2: '',
      projectId: 2,
      title1: 'Gym Hawk Zone',
      description1: 'Fitness journey showcase',
      title2: '',
      description2: ''
    },
    {
      video1: 'https://res.cloudinary.com/dr47btnx9/video/upload/v1773404608/drift_htdsre.mp4',
      video2: '',
      projectId: 5,
      title1: 'Drift',
      description1: 'Adrenaline-fueled drifting action',
      title2: '',
      description2: ''
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
      <div className='relative pt-16 sm:pt-20 md:pt-24 lg:pt-32 xl:pt-40 pb-8 sm:pb-12 lg:pb-16 xl:pb-24 px-3 sm:px-5 md:px-8 lg:px-12'>
        {/* Back Button */}
        {/* <button
          onClick={() => navigate('/')}
          className='absolute top-4 sm:top-6 left-4 sm:left-5 md:left-8 lg:left-12 z-20 flex items-center gap-2 text-white/80 hover:text-white transition-colors group'
        >
          <svg
            className='w-5 h-5 sm:w-6 sm:h-6 transform group-hover:-translate-x-1 transition-transform'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            strokeWidth='2'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M15 19l-7-7 7-7' />
          </svg>
          <span className='text-sm sm:text-base uppercase tracking-[0.2em] font-[font1]'>
            Back to Home
          </span>
        </button> */}
        <div className='max-w-[1800px] mx-auto'>
          {/* Main Title */}
          <div ref={titleRef} className='mb-6'>
            <h1 className='font-[font2] text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-[10vw] uppercase leading-[0.9] tracking-tight text-white px-2'>
              Projects
            </h1>
          </div>
          
          {/* Subtitle */}
          <div ref={subtitleRef} className='mt-4'>
            <p className='text-sm xs:text-base sm:text-lg lg:text-xl xl:text-2xl text-white/60 uppercase tracking-wider font-[font1] px-2'>
              Creative Visual Stories
            </p>
            <div className='mt-6 w-20 h-[2px] bg-white'></div>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div ref={containerRef} className='px-3 sm:px-5 md:px-8 lg:px-12 pb-16 sm:pb-20 lg:pb-32'>
        <div className='max-w-[1800px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-6 xl:gap-8'>
          {projects.map((project, idx) => (
            <div 
              key={idx} 
              className='h-[200px] sm:h-[280px] md:h-[320px] lg:h-[350px] xl:h-[400px] 2xl:h-[450px] w-full'
            >
              <ProjectCard 
                video1={project.video1} 
                video2={project.video2} 
                projectId={project.projectId}
                title1={project.title1}
                title2={project.title2}
                description1={project.description1}
                description2={project.description2}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Footer Section */}
      <div className='px-3 sm:px-5 md:px-8 lg:px-12 pb-8 sm:pb-12 lg:pb-16 pt-12 sm:pt-16 lg:pt-20'>
        <div className='max-w-[1800px] mx-auto text-center'>
          <p className='text-xs xs:text-sm sm:text-base lg:text-lg text-white/40 uppercase tracking-widest px-2'>
            Scroll to explore more
          </p>
          <div className='mt-4 flex justify-center'>
            <div className='w-16 sm:w-20 h-0.5 sm:h-1 bg-white/60'></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Projects