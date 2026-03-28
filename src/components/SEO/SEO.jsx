import React, { useEffect } from 'react'

const SEO = ({ 
  title, 
  description, 
  keywords, 
  ogImage, 
  ogUrl, 
  canonicalUrl,
  type = 'website',
  structuredData
}) => {
  const siteTitle = 'Metis Prime Production'
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle
  const siteDescription = description || 'Metis Prime Production delivers exceptional digital solutions including visual production, branding, web development, and cinematic videography. Elevate your brand with our creative expertise.'
  const siteKeywords = keywords || 'Metis Prime Production, creative agency, digital production, branding, web development, cinematic videography, visual design, digital marketing, Dubai UAE'
  const siteImage = ogImage || 'https://metisprimeproduction.com/logo-main.PNG'
  const siteUrl = ogUrl || 'https://metisprimeproduction.com/'

  useEffect(() => {
    // Update page title
    document.title = fullTitle

    // Update or create meta tags
    const updateMetaTag = (name, content, property = null) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`
      let meta = document.querySelector(selector)
      
      if (!meta) {
        meta = document.createElement('meta')
        if (property) {
          meta.setAttribute('property', name)
        } else {
          meta.setAttribute('name', name)
        }
        document.head.appendChild(meta)
      }
      
      meta.setAttribute('content', content)
    }

    // Update primary meta tags
    updateMetaTag('description', siteDescription)
    updateMetaTag('keywords', siteKeywords)
    updateMetaTag('author', 'Metis Prime Production')
    updateMetaTag('robots', 'index, follow')

    // Update Open Graph tags
    updateMetaTag('og:type', type, true)
    updateMetaTag('og:url', siteUrl, true)
    updateMetaTag('og:title', fullTitle, true)
    updateMetaTag('og:description', siteDescription, true)
    updateMetaTag('og:image', siteImage, true)
    updateMetaTag('og:image:width', '1200', true)
    updateMetaTag('og:image:height', '630', true)
    updateMetaTag('og:site_name', siteTitle, true)

    // Update Twitter tags
    updateMetaTag('twitter:card', 'summary_large_image', true)
    updateMetaTag('twitter:url', siteUrl, true)
    updateMetaTag('twitter:title', fullTitle, true)
    updateMetaTag('twitter:description', siteDescription, true)
    updateMetaTag('twitter:image', siteImage, true)

    // Update canonical URL
    if (canonicalUrl) {
      let canonical = document.querySelector('link[rel="canonical"]')
      if (!canonical) {
        canonical = document.createElement('link')
        canonical.setAttribute('rel', 'canonical')
        document.head.appendChild(canonical)
      }
      canonical.setAttribute('href', canonicalUrl)
    }

    // Update structured data
    if (structuredData) {
      let structuredDataScript = document.querySelector('script[type="application/ld+json"]')
      if (!structuredDataScript) {
        structuredDataScript = document.createElement('script')
        structuredDataScript.setAttribute('type', 'application/ld+json')
        document.head.appendChild(structuredDataScript)
      }
      structuredDataScript.textContent = JSON.stringify(structuredData)
    }

    // Update theme color
    updateMetaTag('theme-color', '#D3FD50')
    updateMetaTag('msapplication-TileColor', '#D3FD50')

    // Cleanup function
    return () => {
      // Reset to default values when component unmounts
      document.title = siteTitle
    }
  }, [fullTitle, siteDescription, siteKeywords, siteUrl, siteImage, siteTitle, canonicalUrl, structuredData, type])

  // SEO component doesn't render anything visible
  return null
}

export default SEO
