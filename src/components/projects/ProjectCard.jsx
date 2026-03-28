import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const ProjectCard = (props) => {
    const navigate = useNavigate()
    const videoRef1 = useRef(null)
    const videoRef2 = useRef(null)
    
    const handleClick = () => {
        navigate(`/project/${props.projectId || '1'}`)
    }

    const handleTouchStart = (videoRef) => {
        if (videoRef.current) {
            videoRef.current.currentTime = 0;
            videoRef.current.play().catch(() => {})
        }
    }

    const handleTouchEnd = (videoRef) => {
        if (videoRef.current) {
            setTimeout(() => {
                videoRef.current.pause()
                videoRef.current.currentTime = 0
            }, 1000)
        }
    }

    const handleMouseEnter = (videoRef) => {
        if (videoRef.current) {
            videoRef.current.currentTime = 0;
            videoRef.current.play().catch(() => {})
        }
    }

    const handleMouseLeave = (videoRef) => {
        if (videoRef.current) {
            videoRef.current.pause()
            videoRef.current.currentTime = 0
        }
    }

    return (
        <>
            <div 
                className={`${props.video2 ? 'lg:w-1/2' : 'lg:w-full'} relative overflow-hidden h-full cursor-pointer bg-black rounded-lg sm:rounded-xl lg:rounded-2xl shadow-xl sm:shadow-2xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(211,253,80,0.3)] sm:hover:shadow-[0_0_30px_rgba(211,253,80,0.3)] lg:hover:shadow-[0_0_40px_rgba(211,253,80,0.3)]`}
                onClick={handleClick}
                onMouseEnter={() => handleMouseEnter(videoRef1)}
                onMouseLeave={() => handleMouseLeave(videoRef1)}
                onTouchStart={() => handleTouchStart(videoRef1)}
                onTouchEnd={() => handleTouchEnd(videoRef1)}
            >
                <video 
                    ref={videoRef1}
                    className='absolute inset-0 h-full w-full object-cover z-0' 
                    loop 
                    muted 
                    playsInline
                    preload='metadata'
                >
                    <source src={props.video1} type='video/mp4' />
                </video>
                
                {/* Ambient Light Effect */}
                <div className='absolute inset-0 rounded-lg sm:rounded-xl lg:rounded-2xl bg-gradient-to-t from-[#D3FD50]/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 pointer-events-none'></div>
                
                {/* Title and Description Overlay */}
                <div className='absolute inset-0 flex flex-col justify-end p-3 sm:p-4 lg:p-6 xl:p-8 text-white opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none'>
                    <div className='transform translate-y-4 hover:translate-y-0 transition-transform duration-300'>
                        <h3 className='font-[font2] text-lg sm:text-xl lg:text-2xl xl:text-3xl uppercase tracking-tight mb-1 sm:mb-2'>
                            {props.title1 || 'Project'}
                        </h3>
                        <p className='text-xs sm:text-sm lg:text-base text-white/70 uppercase tracking-wider'>
                            {props.description1 || 'Click to view project'}
                        </p>
                    </div>
                </div>
                
                {/* Project Count */}
                {/* <div className='absolute top-4 left-4 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full z-10'>
                    <span className='text-white text-sm font-[font1] uppercase tracking-wider'>
                        {props.projectId}
                    </span>
                </div> */}
            </div>
            
            {props.video2 && (
            <div 
                className='lg:w-1/2 relative overflow-hidden h-full cursor-pointer bg-black rounded-lg sm:rounded-xl lg:rounded-2xl shadow-xl sm:shadow-2xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(211,253,80,0.3)] sm:hover:shadow-[0_0_30px_rgba(211,253,80,0.3)] lg:hover:shadow-[0_0_40px_rgba(211,253,80,0.3)]'
                onClick={handleClick}
                onMouseEnter={() => handleMouseEnter(videoRef2)}
                onMouseLeave={() => handleMouseLeave(videoRef2)}
                onTouchStart={() => handleTouchStart(videoRef2)}
                onTouchEnd={() => handleTouchEnd(videoRef2)}
            >
                <video 
                    ref={videoRef2}
                    className='absolute inset-0 h-full w-full object-cover z-0' 
                    loop 
                    muted 
                    playsInline
                    preload='metadata'
                >
                    <source src={props.video2} type='video/mp4' />
                </video>
                
                {/* Ambient Light Effect */}
                <div className='absolute inset-0 rounded-lg sm:rounded-xl lg:rounded-2xl bg-gradient-to-t from-[#D3FD50]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none'></div>
                
                {/* Title and Description Overlay */}
                <div className='absolute inset-0 flex flex-col justify-end p-3 sm:p-4 lg:p-6 xl:p-8 text-white opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none'>
                    <div className='transform translate-y-4 hover:translate-y-0 transition-transform duration-300'>
                        <h3 className='font-[font2] text-lg sm:text-xl lg:text-2xl xl:text-3xl uppercase tracking-tight mb-1 sm:mb-2'>
                            {props.title2 || 'Project'}
                        </h3>
                        <p className='text-xs sm:text-sm lg:text-base text-white/70 uppercase tracking-wider'>
                            {props.description2 || 'Click to view project'}
                        </p>
                    </div>
                </div>
                
                {/* Project Count */}
                {/* <div className='absolute top-4 left-4 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full z-10'>
                    <span className='text-white text-sm font-[font1] uppercase tracking-wider'>
                        {props.projectId}
                    </span>
                </div> */}
            </div>
            )}
        </>
    )
}

export default ProjectCard
