import { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { NavbarContext } from '../../context/NavContext'
import logoMain from '../../assets/logo.PNG?url'

const MobileNav = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [navOpen, setNavOpen] = useContext(NavbarContext)
    const [mobileOpen, setMobileOpen] = useState(false)

    useEffect(() => {
        setMobileOpen(false)
    }, [location.pathname])

    useEffect(() => {
        if (mobileOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        return () => {
            document.body.style.overflow = ''
        }
    }, [mobileOpen])

    useEffect(() => {
        if (mobileOpen && navOpen) {
            setNavOpen(false)
        }
    }, [mobileOpen, navOpen, setNavOpen])

    const links = [
        { to: '/', label: 'Home', sub: 'Start here' },
        { to: '/projects', label: 'Projects', sub: 'To see everything' },
        { to: '/services', label: 'Services', sub: 'What we offer' },
        // { to: '/agence', label: 'Agency', sub: 'Who we are' },
        { to: '/contact', label: 'Contact', sub: 'Say hello' },
    ]

    const isActive = (to) =>
        to === '/' ? location.pathname === '/' : location.pathname.startsWith(to)

    return (
        <div className='lg:hidden'>
            <div className='fixed top-0 left-0 w-full z-40 flex items-center justify-between px-4 py-3 bg-black/80 border-b border-white/10'>
                <button
                    onClick={() => navigate('/')}
                    className='flex items-center cursor-pointer focus:outline-none'
                    aria-label='Go to home'
                    type='button'
                >
                    <img src={logoMain} alt='Logo' className='w-14 h-auto object-contain' />
                </button>
                <button
                    onClick={() => setMobileOpen(true)}
                    className='relative w-11 h-11 flex flex-col items-end justify-center gap-1.5 px-2 rounded-md bg-[#D3FD50] active:scale-95 transition-transform'
                    aria-label='Open menu'
                    type='button'
                >
                    <span className='block h-0.5 w-6 bg-black'></span>
                    <span className='block h-0.5 w-4 bg-black'></span>
                </button>
            </div>

            <div
                className={`fixed inset-0 z-50 transition-opacity duration-300 ${
                    mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}
                aria-hidden={!mobileOpen}
            >
                <div
                    onClick={() => setMobileOpen(false)}
                    className='absolute inset-0 bg-black/70 backdrop-blur-sm'
                ></div>

                <aside
                    className={`absolute top-0 right-0 h-full w-[88%] max-w-sm bg-black text-white shadow-2xl flex flex-col transition-transform duration-300 ease-out ${
                        mobileOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
                    role='dialog'
                    aria-label='Mobile navigation'
                >
                    <div className='flex items-center justify-between px-5 py-4 border-b border-white/10'>
                        <img src={logoMain} alt='Logo' className='w-14 h-auto object-contain' />
                        <button
                            onClick={() => setMobileOpen(false)}
                            className='relative w-10 h-10 rounded-full bg-white/5 active:scale-95 transition-transform flex items-center justify-center'
                            aria-label='Close menu'
                            type='button'
                        >
                            <span className='absolute w-5 h-0.5 bg-[#D3FD50] rotate-45'></span>
                            <span className='absolute w-5 h-0.5 bg-[#D3FD50] -rotate-45'></span>
                        </button>
                    </div>

                    <nav className='flex-1 overflow-y-auto px-2 py-3'>
                        <ul className='flex flex-col gap-1'>
                            {links.map((l, i) => {
                                const active = isActive(l.to)
                                return (
                                    <li key={l.to}>
                                        <Link
                                            to={l.to}
                                            onClick={() => setMobileOpen(false)}
                                            className={`group flex items-center justify-between gap-3 px-4 py-4 rounded-xl transition-colors ${
                                                active
                                                    ? 'bg-[#D3FD50] text-black'
                                                    : 'text-white hover:bg-white/5 active:bg-white/10'
                                            }`}
                                        >
                                            <div className='flex items-center gap-3 min-w-0'>
                                                <span
                                                    className={`text-[10px] font-[font1] tabular-nums tracking-widest ${
                                                        active ? 'text-black/60' : 'text-white/40'
                                                    }`}
                                                >
                                                    {String(i + 1).padStart(2, '0')}
                                                </span>
                                                <div className='min-w-0'>
                                                    <div className='font-[font2] text-2xl uppercase leading-none'>
                                                        {l.label}
                                                    </div>
                                                    <div
                                                        className={`text-xs mt-1 truncate ${
                                                            active ? 'text-black/70' : 'text-white/50'
                                                        }`}
                                                    >
                                                        {l.sub}
                                                    </div>
                                                </div>
                                            </div>
                                            <span
                                                className={`shrink-0 text-xl transition-transform ${
                                                    active
                                                        ? 'translate-x-0'
                                                        : 'group-hover:translate-x-1'
                                                }`}
                                                aria-hidden='true'
                                            >
                                                →
                                            </span>
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>
                    </nav>

                    <div className='px-5 py-4 border-t border-white/10'>
                        <div className='text-[10px] tracking-widest uppercase text-white/40 mb-2'>
                            Contact
                        </div>
                        <a
                            href='mailto:metisprimeproduction@gmail.com'
                            className='block text-sm text-white break-all hover:text-[#D3FD50]'
                        >
                            metisprimeproduction@gmail.com
                        </a>
                        <div className='flex gap-3 mt-3 text-[11px] tracking-widest uppercase text-white/60'>
                            <span>FB</span>
                            <span>IG</span>
                            <span>IN</span>
                            <span>BE</span>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    )
}

export default MobileNav
