import React, { useState, useEffect, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const ServiceCarousel = ({ images, autoPlay = true, interval = 4000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const carouselRef = useRef(null)
  const imageRefs = useRef([])

  useEffect(() => {
    if (!autoPlay) return

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, interval)

    return () => clearInterval(timer)
  }, [autoPlay, interval, images.length])

  useGSAP(() => {
    if (imageRefs.current[currentIndex]) {
      gsap.fromTo(
        imageRefs.current[currentIndex],
        { opacity: 0, scale: 1.1 },
        { opacity: 1, scale: 1, duration: 0.8, ease: 'power2.out' }
      )
    }
  }, [currentIndex])

  const goToSlide = (index) => {
    setCurrentIndex(index)
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  return (
    <div ref={carouselRef} className='relative w-full h-full overflow-hidden group'>
      {/* Images */}
      <div className='relative w-full h-full'>
        {images.map((image, index) => (
          <div
            key={index}
            ref={(el) => (imageRefs.current[index] = el)}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className='w-full h-full object-cover'
            />
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className='absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100'
        aria-label='Previous slide'
      >
        <svg
          className='w-6 h-6'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M15 19l-7-7 7-7'
          />
        </svg>
      </button>

      <button
        onClick={goToNext}
        className='absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100'
        aria-label='Next slide'
      >
        <svg
          className='w-6 h-6'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M9 5l7 7-7 7'
          />
        </svg>
      </button>

      {/* Dots Indicator */}
      <div className='absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2'>
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex
                ? 'bg-[#D3FD50] w-8'
                : 'bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default ServiceCarousel

