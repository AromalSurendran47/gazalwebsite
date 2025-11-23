import React from 'react'
import { Link } from 'react-router-dom'

const HomeBottomText = () => {
  return (
    <div className='font-[font2] flex flex-col lg:flex-row items-center justify-between w-full px-5 lg:px-12 pb-8 lg:pb-12'>
      {/* Description Text */}
      <p className='lg:w-[30vw] w-full lg:mb-0 mb-8 font-[font1] lg:text-lg text-sm lg:leading-relaxed leading-tight text-left lg:text-left'>
        K72 est une agence qui pense chaque action pour nourrir la marque. Demain, dans 5 mois et dans 5 ans. On cherche la friction qui crée l'étincelle pour générer de l'émotion. Pour assurer une relation honnête, on est sans filtre, on dit ce qui doit être dit, on fait ce qui doit être fait.
      </p>
      
      {/* Navigation Links */}
      <div className='flex items-center gap-4 lg:gap-6'>
        <Link 
          to='/projects' 
          className='lg:border-3 border-2 hover:border-[#D3FD50] hover:text-[#D3FD50] lg:h-44 h-32 flex items-center px-6 lg:px-14 border-white rounded-full uppercase transition-colors'
        >
          <span className='text-[6vw] lg:text-[4vw] lg:mt-6 font-[font2]'>Projets</span>
        </Link>
        <Link 
          to='/agence' 
          className='lg:border-3 border-2 hover:border-[#D3FD50] hover:text-[#D3FD50] lg:h-44 h-32 flex items-center px-6 lg:px-14 border-white rounded-full uppercase transition-colors'
        >
          <span className='text-[6vw] lg:text-[4vw] lg:mt-6 font-[font2]'>Agence</span>
        </Link>
      </div>
    </div>
  )
}

export default HomeBottomText