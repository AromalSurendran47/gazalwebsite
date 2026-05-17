import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import logoMain from '../../assets/logo.PNG?url'

const links = [
    { to: '/', label: 'Home', end: true },
    { to: '/projects', label: 'Projects' },
    { to: '/services', label: 'Services' },
    { to: '/contact', label: 'Contact' },
]

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8)
        onScroll()
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    return (
        <header
            className={`hidden lg:block fixed top-0 left-0 w-full z-40 transition-colors duration-300 ${
                scrolled ? 'bg-black/55' : 'bg-transparent'
            }`}
        >
            <div className='relative flex items-start justify-between px-8 xl:px-12 pt-3 pb-3'>
                <Link
                    to='/'
                    className='flex items-center gap-3 group focus:outline-none'
                    aria-label='Metis Prime — home'
                >
                    <img
                        src={logoMain}
                        alt='Metis Prime'
                        className='w-16 h-16 xl:w-20 xl:h-20 object-contain'
                    />
                    <span className='font-[font2] uppercase tracking-[0.32em] text-sm xl:text-base text-white/90 group-hover:text-[#D3FD50] transition-colors'>
                        Metis Prime
                    </span>
                </Link>

                <nav aria-label='Primary'>
                    <ul className='flex items-center gap-8 xl:gap-10' role='list'>
                        {links.map((l) => (
                            <li key={l.to}>
                                <NavLink
                                    to={l.to}
                                    end={l.end}
                                    className={({ isActive }) =>
                                        `group relative inline-flex items-center font-[font1] uppercase tracking-[0.28em] text-[11px] xl:text-xs transition-colors focus:outline-none ${
                                            isActive
                                                ? 'text-[#D3FD50]'
                                                : 'text-white/85 hover:text-white'
                                        }`
                                    }
                                >
                                    {({ isActive }) => (
                                        <>
                                            <span>{l.label}</span>
                                            <span
                                                className={`pointer-events-none absolute left-0 right-0 -bottom-1 h-px bg-[#D3FD50] origin-left transition-transform duration-300 ${
                                                    isActive
                                                        ? 'scale-x-100'
                                                        : 'scale-x-0 group-hover:scale-x-100'
                                                }`}
                                                aria-hidden='true'
                                            />
                                        </>
                                    )}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>

                <span
                    className={`pointer-events-none absolute left-8 right-8 xl:left-12 xl:right-12 bottom-0 h-px bg-white/15 transition-opacity duration-300 ${
                        scrolled ? 'opacity-100' : 'opacity-0'
                    }`}
                    aria-hidden='true'
                />
            </div>
        </header>
    )
}

export default Navbar
