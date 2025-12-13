import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const ProjectCard = (props) => {
    const navigate = useNavigate()
    const videoRef1 = useRef(null)
    const videoRef2 = useRef(null)
    const cardRef1 = useRef(null)
    const cardRef2 = useRef(null)
    const overlayRef1 = useRef(null)
    const overlayRef2 = useRef(null)
    
    const handleClick = () => {
        navigate(`/project/${props.projectId || '1'}`)
    }

    const handleMouseEnter = (videoRef, cardRef, overlayRef) => {
        if (videoRef.current) {
            videoRef.current.play().catch(() => {})
        }
        if (cardRef.current) {
            gsap.to(cardRef.current, {
                scale: 1.02,
                duration: 0.5,
                ease: 'power2.out'
            })
        }
        if (overlayRef.current) {
            gsap.to(overlayRef.current, {
                opacity: 1,
                duration: 0.4,
                ease: 'power2.out'
            })
        }
    }

    const handleMouseLeave = (videoRef, cardRef, overlayRef) => {
        if (videoRef.current) {
            videoRef.current.pause()
            videoRef.current.currentTime = 0
        }
        if (cardRef.current) {
            gsap.to(cardRef.current, {
                scale: 1,
                duration: 0.5,
                ease: 'power2.out'
            })
        }
        if (overlayRef.current) {
            gsap.to(overlayRef.current, {
                opacity: 0,
                duration: 0.4,
                ease: 'power2.out'
            })
        }
    }

    return (
        <>
            <div 
                ref={cardRef1}
                className='lg:w-1/2 group relative overflow-hidden h-full cursor-pointer bg-black'
                onClick={handleClick}
                onMouseEnter={() => handleMouseEnter(videoRef1, cardRef1, overlayRef1)}
                onMouseLeave={() => handleMouseLeave(videoRef1, cardRef1, overlayRef1)}
            >
                <video 
                    ref={videoRef1}
                    className='h-full w-full object-cover transition-transform duration-700 ease-out' 
                    loop 
                    muted 
                    playsInline
                    preload='metadata'
                >
                    <source src={props.video1} type='video/mp4' />
                </video>
                
                {/* Gradient Overlay */}
                <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
                
                {/* Content Overlay */}
                <div
                    ref={overlayRef1}
                    className='absolute inset-0 flex flex-col justify-end p-6 lg:p-8 text-white opacity-0'
                >
                    <div className='transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500'>
                        <p className='text-xs uppercase tracking-[0.3em] text-white/70 mb-2 font-[font1]'>
                            Project
                        </p>
                        <h3 className='font-[font2] text-3xl lg:text-4xl xl:text-5xl uppercase tracking-tight'>
                            {props.title1 || 'Project'}
                        </h3>
                    </div>
                </div>

                {/* Border Effect */}
                <div className='absolute inset-0 border-2 border-white/0 group-hover:border-white/30 transition-all duration-500'></div>
            </div>
            
            <div 
                ref={cardRef2}
                className='lg:w-1/2 group relative overflow-hidden h-full cursor-pointer bg-black'
                onClick={handleClick}
                onMouseEnter={() => handleMouseEnter(videoRef2, cardRef2, overlayRef2)}
                onMouseLeave={() => handleMouseLeave(videoRef2, cardRef2, overlayRef2)}
            >
                <video 
                    ref={videoRef2}
                    className='h-full w-full object-cover transition-transform duration-700 ease-out' 
                    loop 
                    muted 
                    playsInline
                    preload='metadata'
                >
                    <source src={props.video2} type='video/mp4' />
                </video>
                
                {/* Gradient Overlay */}
                <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
                
                {/* Content Overlay */}
                <div
                    ref={overlayRef2}
                    className='absolute inset-0 flex flex-col justify-end p-6 lg:p-8 text-white opacity-0'
                >
                    <div className='transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500'>
                        <p className='text-xs uppercase tracking-[0.3em] text-white/70 mb-2 font-[font1]'>
                            Project
                        </p>
                        <h3 className='font-[font2] text-3xl lg:text-4xl xl:text-5xl uppercase tracking-tight'>
                            {props.title2 || 'Project'}
                        </h3>
                    </div>
                </div>

                {/* Border Effect */}
                <div className='absolute inset-0 border-2 border-white/0 group-hover:border-white/30 transition-all duration-500'></div>
            </div>
        </>
    )
}

export default ProjectCard
