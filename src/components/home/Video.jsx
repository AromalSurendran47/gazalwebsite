import React, { useEffect, useRef } from 'react'

const Video = () => {
  const videoRef = useRef(null)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    const tryPlay = () => {
      const p = v.play()
      if (p && typeof p.catch === 'function') p.catch(() => {})
    }
    if (v.readyState >= 2) tryPlay()
    else v.addEventListener('loadeddata', tryPlay, { once: true })
    return () => v.removeEventListener('loadeddata', tryPlay)
  }, [])

  return (
    <div className='h-full w-full'>
      <video
        ref={videoRef}
        className='h-full w-full object-cover [transform:translateZ(0)] [will-change:transform] [backface-visibility:hidden]'
        autoPlay
        loop
        muted
        playsInline
        preload='metadata'
        disablePictureInPicture
        disableRemotePlayback
        src='/bg.mp4'
      />
    </div>
  )
}

export default Video