import React from 'react'
import { Link } from 'react-router-dom'

const links = [
  { label: 'Projects', subtitle: 'To see everything', to: '/projects' },
  { label: 'Services', subtitle: 'What we offer', to: '/services' },
  // { label: 'Agency', subtitle: 'Our spirit', to: '/agence' },
  { label: 'Contact', subtitle: 'Say hello', to: '/contact' }
]

const HomeBottomText = () => {
  return (
    <section className='w-full px-4 sm:px-5 md:px-8 lg:px-12 pb-8 sm:pb-10 lg:pb-16 font-[font1]'>
      <div className='relative border-t border-white/30 pt-8 sm:pt-10 lg:pt-14'>
        <div className='absolute -top-1 left-4 sm:left-5 md:left-8 lg:left-12 h-2 w-16 bg-[#D3FD50]' />
        <div className='grid gap-8 sm:gap-10 lg:grid-cols-[1.1fr_0.9fr_1fr] items-start lg:items-center'>
          <p className='text-xs sm:text-sm lg:text-lg leading-relaxed sm:leading-loose lg:leading-loose text-white/80 max-w-xl py-3 sm:py-4 lg:py-6 px-2'>
          We are a multimedia production house built on the fusion of strategic intelligence and cinematic craftsmanship. We carry stories powerful enough to shape perception,
           inspire emotion, and elevate influence, but only if it's told with intention.
          </p>

          <div className='space-y-3 text-xs uppercase tracking-[0.3em] text-white/70 px-2'>
            <div>Contact</div>
            <a href='mailto:metisprimeproduction@gmail.com' className='font-[font2] text-lg sm:text-xl lg:text-2xl tracking-normal text-white hover:text-[#D3FD50] transition-colors block normal-case break-words'>
              metisprimeproduction@gmail.com
            </a>
            <div className='flex gap-4 text-[0.6rem] tracking-[0.4em]'>
              <span>FB</span>
              <span>IG</span>
              <span>IN</span>
              <span>BE</span>
            </div>
          </div>

          <div className='space-y-3 font-[font2] text-2xl sm:text-3xl lg:text-5xl px-2'>
            {links.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className='group flex items-center justify-between border-b border-white/20 pb-2 sm:pb-3'
              >
                <div>
                  <div className='uppercase tracking-tight group-hover:text-[#D3FD50] transition-colors'>
                    {link.label}
                  </div>
                  <div className='text-xs uppercase tracking-[0.4em] text-white/60'>{link.subtitle}</div>
                </div>
                <div className='h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 rounded-full border border-white/40 flex items-center justify-center group-hover:border-[#D3FD50] group-hover:text-[#D3FD50] transition-colors flex-shrink-0'>
                  →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomeBottomText