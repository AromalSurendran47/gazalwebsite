import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import { useRef } from 'react'
import { Link } from 'react-router-dom'

const Agence = () => {

  gsap.registerPlugin(ScrollTrigger)

  const imageDivRef = useRef(null)
  const imageRef = useRef(null)
  const titleRef = useRef(null)
  const textRef = useRef(null)
  const expertiseRef = useRef(null)
  const projetsRef = useRef(null)
  const creationRef = useRef(null)
  const cultureRef = useRef(null)
  const teamRef = useRef(null)
  const projectsLinkRef = useRef(null)

  const imageArray = [
    'https://k72.ca/uploads/teamMembers/Carl_480x640-480x640.jpg',
    'https://k72.ca/uploads/teamMembers/Olivier_480x640-480x640.jpg',
    'https://k72.ca/uploads/teamMembers/Lawrence_480x640-480x640.jpg',
    'https://k72.ca/uploads/teamMembers/HugoJoseph_480x640-480x640.jpg',
    'https://k72.ca/uploads/teamMembers/ChantalG_480x640-480x640.jpg',
    'https://k72.ca/uploads/teamMembers/MyleneS_480x640-480x640.jpg',
    'https://k72.ca/uploads/teamMembers/SophieA_480x640-480x640.jpg',
    'https://k72.ca/uploads/teamMembers/Claire_480x640-480x640.jpg',
    'https://k72.ca/uploads/teamMembers/Michele_480X640-480x640.jpg',
    'https://k72.ca/uploads/teamMembers/MEL_480X640-480x640.jpg',
    'https://k72.ca/uploads/teamMembers/CAMILLE_480X640_2-480x640.jpg',
    'https://k72.ca/uploads/teamMembers/MAXIME_480X640_2-480x640.jpg',
    'https://k72.ca/uploads/teamMembers/MEGGIE_480X640_2-480x640.jpg',
    'https://k72.ca/uploads/teamMembers/joel_480X640_3-480x640.jpg',
  ]

  useGSAP(function () {
    // Hero title animation
    if (titleRef.current) {
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 100,
        duration: 1.2,
        ease: 'power3.out'
      })
    }

    // Hero text animation
    if (textRef.current) {
      gsap.from(textRef.current, {
        opacity: 0,
        x: -100,
        duration: 1,
        delay: 0.3,
        ease: 'power3.out'
      })
    }

    // Team member image scroll animation
    if (imageDivRef.current && imageRef.current) {
      gsap.to(imageDivRef.current, {
        scrollTrigger: {
          trigger: imageDivRef.current,
          start: 'top 28%',
          end: 'top -70%',
          pin: true,
          pinSpacing: true,
          pinReparent: true,
          pinType: 'transform',
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (elem) => {
            let imageIndex;
            if (elem.progress < 1) {
              imageIndex = Math.floor(elem.progress * imageArray.length)
            } else {
              imageIndex = imageArray.length - 1
            }
            if (imageRef.current) {
              imageRef.current.src = imageArray[imageIndex]
            }
          }
        }
      })
    }

    // Expertise section animation
    if (expertiseRef.current) {
      const expertiseTitle = expertiseRef.current.querySelector('h2')
      const expertiseItems = expertiseRef.current.querySelectorAll('li')
      
      if (expertiseTitle) {
        gsap.from(expertiseTitle, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          scrollTrigger: {
            trigger: expertiseRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        })
      }
      
      gsap.from(expertiseItems, {
        opacity: 0,
        y: 50,
        stagger: 0.1,
        duration: 0.8,
        delay: 0.2,
        scrollTrigger: {
          trigger: expertiseRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      })
    }

    // Our Projects section animation
    if (projetsRef.current) {
      gsap.from(projetsRef.current.children, {
        opacity: 0,
        y: 80,
        stagger: 0.2,
        duration: 1,
        scrollTrigger: {
          trigger: projetsRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      })
    }

    // Our Creation section animation
    if (creationRef.current) {
      gsap.from(creationRef.current.children, {
        opacity: 0,
        y: 80,
        stagger: 0.2,
        duration: 1,
        scrollTrigger: {
          trigger: creationRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      })
    }

    // Our Culture section animation
    if (cultureRef.current) {
      gsap.from(cultureRef.current.children, {
        opacity: 0,
        y: 80,
        stagger: 0.2,
        duration: 1,
        scrollTrigger: {
          trigger: cultureRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      })
    }

    // Team section animation
    if (teamRef.current) {
      const teamTitle = teamRef.current.querySelector('h2')
      const teamItems = teamRef.current.querySelectorAll('li')
      
      if (teamTitle) {
        gsap.from(teamTitle, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          scrollTrigger: {
            trigger: teamRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        })
      }
      
      gsap.from(teamItems, {
        opacity: 0,
        x: -50,
        stagger: 0.05,
        duration: 0.6,
        delay: 0.2,
        scrollTrigger: {
          trigger: teamRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      })
    }

    // Projects link animation
    if (projectsLinkRef.current) {
      gsap.from(projectsLinkRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.8,
        scrollTrigger: {
          trigger: projectsLinkRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      })
    }
  })


  const teamMembers = [
    'Conseillère Sophie Auger',
    'Directeur principal Carl Godbout',
    'Conceptrice-rédactrice Camille Brière',
    'Conseillère principale Stéphanie Brunelle',
    'VPP et directeur général Pierre-Luc Paiement',
    'Directrice artistique Mélanie Laviolette',
    'Directrice de la stratégie Michèle Riendeau',
    'Directrice conseil Meggie Lavoie',
    'Directeur artistique Alex Sauvageau',
    'Conseiller Philippe Perreault',
    'Stratège Béatrice Roussin',
    'Conseillère Lou Gravel-Jean',
    'Planificateur stratégique principal Olivier Roeyaerts',
    'Conseillère Hélène Conti',
    'Coordonatrice Lawrence Meunier',
    'Directrice principale Isabelle Beauchemin',
    'Designer graphique Olivier Duclos',
    'Directeur de création adjoint Joël Letarte',
    'Directrice de création Chantal Gobeil',
    'Directeur de création adjoint Sébastien Roy'
  ]

  const expertiseItems = [
    'Stratégie',
    'Publicité',
    'Branding',
    'Design',
    'Contenu'
  ]

  return (
    <div className='min-h-screen bg-white text-black font-[font1]'>
      {/* Hero Section */}
      <div id='page1' className='relative min-h-screen py-1'>
        <div ref={imageDivRef} className='absolute overflow-hidden lg:h-[20vw] h-[30vw] lg:rounded-3xl rounded-xl lg:w-[15vw] w-[25vw] lg:top-96 -top-80 lg:left-[30vw] left-[30vw] z-10'>
          <img ref={imageRef} className='h-full object-cover w-full' src="https://k72.ca/uploads/teamMembers/Carl_480x640-480x640.jpg" alt="" />
        </div>
        <div className='relative font-[font2]'>
          <div className='lg:mt-[55vh] mt-[30vh]'>
            <h1 ref={titleRef} className='text-[20vw] text-center uppercase leading-[18vw] font-[font2]'>
              Soixan7e <br />
              Douze
            </h1>
          </div>
          <div ref={textRef} className='lg:pl-[40%] lg:mt-20 mt-4 p-3 lg:p-0'>
            <p className='lg:text-6xl text-xl leading-tight font-[font1]'>
              Our curiosity nourishes our creativity. We stay humble and say no to big egos, even yours. A brand is alive. It has values, a personality, a story. If we forget that, we can make good numbers in the short term, but we kill it in the long term. That's why we commit to giving perspective, to build influential brands.
            </p>
          </div>
        </div>
      </div>

      {/* Expertise Section */}
      <div ref={expertiseRef} className='lg:px-12 px-5 py-20 lg:py-32'>
        <h2 className='text-4xl lg:text-6xl font-[font2] uppercase mb-12 lg:mb-16'>Expertise</h2>
        <ul className='space-y-4 lg:space-y-6'>
          {expertiseItems.map((item, index) => (
            <li key={index} className='text-2xl lg:text-4xl font-[font1]'>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Three Column Sections */}
      <div className='lg:px-12 px-5 py-20 lg:py-32 space-y-20 lg:space-y-32'>
        {/* Our Projects */}
        <div ref={projetsRef}>
          <h2 className='text-4xl lg:text-6xl font-[font2] uppercase mb-6 lg:mb-8'>
            Our Projects<span className='font-[font1]'>_</span>
          </h2>
          <p className='text-xl lg:text-3xl font-[font1] leading-relaxed max-w-4xl'>
            are born in humility, grow in curiosity and live through creativity in all its forms.
          </p>
        </div>

        {/* Our Creation */}
        <div ref={creationRef}>
          <h2 className='text-4xl lg:text-6xl font-[font2] uppercase mb-6 lg:mb-8'>
            Our Creation<span className='font-[font1]'>_</span>
          </h2>
          <p className='text-xl lg:text-3xl font-[font1] leading-relaxed max-w-4xl'>
            bubbles in an environment where talent has the taste to explode. Where we feel free to be the best version of ourselves.
          </p>
        </div>

        {/* Our Culture */}
        <div ref={cultureRef}>
          <h2 className='text-4xl lg:text-6xl font-[font2] uppercase mb-6 lg:mb-8'>
            Our Culture<span className='font-[font1]'>_</span>
          </h2>
          <p className='text-xl lg:text-3xl font-[font1] leading-relaxed max-w-4xl'>
            it's openness to others. Period. The entire crew participates in building an agency we are proud of.
          </p>
        </div>
      </div>

      {/* Team Section */}
      <div ref={teamRef} className='lg:px-12 px-5 py-20 lg:py-32'>
        <h2 className='text-4xl lg:text-6xl font-[font2] uppercase mb-12 lg:mb-16'>Our Team</h2>
        <ul className='space-y-3 lg:space-y-4'>
          {teamMembers.map((member, index) => (
            <li key={index} className='text-xl lg:text-3xl font-[font1]'>
              {member}
            </li>
          ))}
        </ul>
      </div>

      {/* Projects Link Section */}
      <div className='lg:px-12 px-5 py-20 lg:py-32 text-center'>
        <Link 
          ref={projectsLinkRef}
          to="/projects" 
          className='text-2xl lg:text-4xl font-[font1] uppercase hover:text-[#D3FD50] transition-colors inline-block'
        >
          See All Projects
        </Link>
      </div>
    </div>
  )
}

export default Agence