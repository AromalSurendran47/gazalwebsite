import React, { useRef, useContext } from 'react'
import { Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
// import logoMain from '../../assets/logo-main.PNG?url'
import frontImage from '../../assets/front.jpeg?url'
import { NavbarContext } from '../../context/NavContext'

const FullScreenNav = () => {
    const fullNavLinksRef = useRef(null)
    const fullScreenRef = useRef(null)

    const [navOpen, setNavOpen] = useContext(NavbarContext)





    function gsapAnimation() {
        const tl = gsap.timeline()
        tl.to('.fullscreennav', {
            display: 'block'
        })
        tl.to('.stairing', {
            delay: 0.2,
            height: '100%',
            stagger: {
                amount: -0.3
            }
        })
        tl.to('.link', {
            opacity: 1,
            rotateX: 0,
            stagger: {
                amount: 0.3
            }
        })
        tl.to('.navlink', {
            opacity: 1
        })
    }
    function gsapAnimationReverse() {
        const tl = gsap.timeline()
        tl.to('.link', {
            opacity: 0,
            rotateX: 90,
            stagger: {
                amount: 0.1
            }
        })
        tl.to('.stairing', {
            height: 0,
            stagger: {
                amount: 0.1
            }
        })
        tl.to('.navlink', {
            opacity: 0
        })
        tl.to('.fullscreennav', {
            display: 'none',
        })
    }


    useGSAP(function () {
        if (navOpen) {

            gsapAnimation()
        } else {
            gsapAnimationReverse()
        }
    }, [navOpen])

    return (
        <nav
            ref={fullScreenRef}
            id='fullscreennav'
            className='fullscreennav hidden fixed inset-0 text-white overflow-hidden h-screen w-full z-50 bg-black'
            role='navigation'
            aria-label='Main navigation menu'
        >
            {/* Solid black background overlay */}
            <div className='absolute inset-0 bg-black z-10' aria-hidden='true'></div>
            
            <div className='h-screen w-full fixed' aria-hidden='true'>
                <div className='h-full w-full flex' role='presentation'>
                    <div className='stairing h-full w-1/5 bg-black lg:border-r lg:border-black' aria-hidden='true'></div>
                    <div className='stairing h-full w-1/5 bg-black lg:border-r lg:border-black' aria-hidden='true'></div>
                    <div className='stairing h-full w-1/5 bg-black lg:border-r lg:border-black' aria-hidden='true'></div>
                    <div className='stairing h-full w-1/5 bg-black lg:border-r lg:border-black' aria-hidden='true'></div>
                    <div className='stairing h-full w-1/5 bg-black' aria-hidden='true'></div>
                </div>
            </div>
            <header ref={fullNavLinksRef} className='relative z-20'>
                <div className="navlink flex w-full justify-between lg:p-5 p-2 items-center">
                    <div className=''>
                        <div className='lg:w-36 w-24'>
                            {/* <img src={logoMain} alt="K72 Creative Agency Logo" className="w-full" /> */}
                        </div>
                    </div>
                    <button
                        onClick={() => {
                            setNavOpen(false)
                        }}
                        className='lg:h-16 h-10 w-16 lg:w-20 relative cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#D3FD50] focus:ring-offset-2 focus:ring-offset-black rounded-lg'
                        aria-label='Close navigation menu'
                        type='button'
                    >
                        <div className='lg:h-25 h-12 lg:w-1 w-0.5 -rotate-45 absolute bg-[#D3FD50] inset-0 m-auto' aria-hidden='true'></div>
                        <div className='lg:h-25 h-12 lg:w-1 w-0.5 right-0 rotate-45 absolute bg-[#D3FD50] inset-0 m-auto' aria-hidden='true'></div>
                    </button>
                </div>
                <main className='pt-20 lg:pt-4 pb-32 lg:pb-46 px-4 lg:px-0' role='main'>
                    <ul className='space-y-0' role='list'>
                        <li role='listitem'>
                            <Link to='/projects' onClick={() => setNavOpen(false)} className='link origin-top relative border-t-1 border-white block focus:outline-none focus:ring-2 focus:ring-[#D3FD50] focus:ring-offset-2 focus:ring-offset-black'>
                                <span className='font-[font2] text-3xl sm:text-4xl md:text-5xl lg:text-[8vw] text-center lg:leading-[0.8] leading-tight lg:pt-10 pt-6 pb-4 lg:pb-0 uppercase block'>Projects</span>
                                <div className='moveLink absolute text-black flex top-0 bg-[#D3FD50]'>
                                    <div className='moveX flex items-center'>
                                        <h2 className='whitespace-nowrap font-[font2] lg:text-[8vw] text-5xl  text-center lg:leading-[0.8] lg:pt-10 pt-4 uppercase'>To See Everything</h2>
                                        <img className='lg:h-44 h-16 rounded-full shrink-0 lg:w-[28rem] w-40 object-cover' src={frontImage} alt="" />
                                        <h2 className='whitespace-nowrap font-[font2] lg:text-[8vw] text-5xl  text-center lg:leading-[0.8] lg:pt-10 pt-4 uppercase'>To See Everything</h2>
                                        <img className='lg:h-44 h-16 rounded-full shrink-0 lg:w-[28rem] w-40 object-cover' src={frontImage} alt="" />
                                    </div>
                                    <div className='moveX flex items-center'>
                                        <h2 className='whitespace-nowrap font-[font2] lg:text-[8vw] text-5xl  text-center lg:leading-[0.8] lg:pt-10 pt-4 uppercase'>To See Everything</h2>
                                        <img className='lg:h-44 h-16 rounded-full shrink-0 lg:w-[28rem] w-40 object-cover' src={frontImage} alt="" />
                                        <h2 className='whitespace-nowrap font-[font2] lg:text-[8vw] text-5xl  text-center lg:leading-[0.8] lg:pt-10 pt-4 uppercase'>To See Everything</h2>
                                        <img className='lg:h-44 h-16 rounded-full shrink-0 lg:w-[28rem] w-40 object-cover' src={frontImage} alt="" />
                                    </div>
                                </div>
                            </Link>
                        </li>
                        <li role='listitem'>
                            <Link to='/services' onClick={() => setNavOpen(false)} className='link origin-top relative border-t-1 border-white block focus:outline-none focus:ring-2 focus:ring-[#D3FD50] focus:ring-offset-2 focus:ring-offset-black'>
                                <span className='font-[font2] text-3xl sm:text-4xl md:text-5xl lg:text-[8vw] text-center lg:leading-[0.8] leading-tight lg:pt-10 pt-6 pb-4 lg:pb-0 uppercase block'>Services</span>
                                <div className='moveLink absolute text-black flex top-0 bg-[#D3FD50]'>
                                    <div className='moveX flex items-center'>
                                        <h2 className='whitespace-nowrap font-[font2] lg:text-[8vw] text-5xl  text-center lg:leading-[0.8] lg:pt-10 pt-4 uppercase'>To See Everything</h2>
                                        <img className='lg:h-44 h-16 rounded-full shrink-0 lg:w-[28rem] w-40 object-cover' src={frontImage} alt="" />
                                        <h2 className='whitespace-nowrap font-[font2] lg:text-[8vw] text-5xl  text-center lg:leading-[0.8] lg:pt-10 pt-4 uppercase'>To See Everything</h2>
                                        <img className='lg:h-44 h-16 rounded-full shrink-0 lg:w-[28rem] w-40 object-cover' src={frontImage} alt="" />
                                    </div>
                                    <div className='moveX flex items-center'>
                                        <h2 className='whitespace-nowrap font-[font2] lg:text-[8vw] text-5xl  text-center lg:leading-[0.8] lg:pt-10 pt-4 uppercase'>To See Everything</h2>
                                        <img className='lg:h-44 h-16 rounded-full shrink-0 lg:w-[28rem] w-40 object-cover' src={frontImage} alt="" />
                                        <h2 className='whitespace-nowrap font-[font2] lg:text-[8vw] text-5xl  text-center lg:leading-[0.8] lg:pt-10 pt-4 uppercase'>To See Everything</h2>
                                        <img className='lg:h-44 h-16 rounded-full shrink-0 lg:w-[28rem] w-40 object-cover' src={frontImage} alt="" />
                                    </div>
                                </div>
                            </Link>
                        </li>
                        <li role='listitem'>
                            <Link to='/contact' onClick={() => setNavOpen(false)} className='link origin-top relative border-t-1 border-white block focus:outline-none focus:ring-2 focus:ring-[#D3FD50] focus:ring-offset-2 focus:ring-offset-black'>
                                <span className='font-[font2] text-3xl sm:text-4xl md:text-5xl lg:text-[8vw] text-center lg:leading-[0.8] leading-tight lg:pt-10 pt-6 pb-4 lg:pb-0 uppercase block'>Contact</span>
                                <div className='moveLink absolute text-black flex top-0 bg-[#D3FD50]'>
                                    <div className='moveX flex items-center'>
                                        <h2 className='whitespace-nowrap font-[font2] lg:text-[8vw] text-5xl  text-center lg:leading-[0.8] lg:pt-10 pt-4 uppercase'>To See Everything</h2>
                                        <img className='lg:h-44 h-16 rounded-full shrink-0 lg:w-[28rem] w-40 object-cover' src={frontImage} alt="" />
                                        <h2 className='whitespace-nowrap font-[font2] lg:text-[8vw] text-5xl  text-center lg:leading-[0.8] lg:pt-10 pt-4 uppercase'>To See Everything</h2>
                                        <img className='lg:h-44 h-16 rounded-full shrink-0 lg:w-[28rem] w-40 object-cover' src={frontImage} alt="" />
                                    </div>
                                    <div className='moveX flex items-center'>
                                        <h2 className='whitespace-nowrap font-[font2] lg:text-[8vw] text-5xl  text-center lg:leading-[0.8] lg:pt-10 pt-4 uppercase'>To See Everything</h2>
                                        <img className='lg:h-44 h-16 rounded-full shrink-0 lg:w-[28rem] w-40 object-cover' src={frontImage} alt="" />
                                        <h2 className='whitespace-nowrap font-[font2] lg:text-[8vw] text-5xl  text-center lg:leading-[0.8] lg:pt-10 pt-4 uppercase'>To See Everything</h2>
                                        <img className='lg:h-44 h-16 rounded-full shrink-0 lg:w-[28rem] w-40 object-cover' src={frontImage} alt="" />
                                    </div>
                                </div>
                            </Link>
                        </li>
                    </ul>
                </main>
            </header>
        </nav>
    )
}

export default FullScreenNav