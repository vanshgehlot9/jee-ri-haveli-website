export const siteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || 'Jee Ri Haveli',
  tagline: process.env.NEXT_PUBLIC_SITE_TAGLINE || 'A Heritage Hotel, Jodhpur',
  phone: process.env.NEXT_PUBLIC_PHONE || '+919351733007',
  phoneDisplay: process.env.NEXT_PUBLIC_PHONE_DISPLAY || '+91 93517 33007',
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'info@jeerihaveli.com',
  quickLinks: [
    { href: '/about', label: 'About Us' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/contact', label: 'Contact' },
  ],
  policyLinks: [
    { href: '/hotel-policy', label: 'Hotel Policy' },
    { href: '/terms', label: 'Terms & Conditions' },
    { href: '/privacy', label: 'Privacy Policy' },
  ],
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP || '919351733007',
  elfsightAppId: process.env.NEXT_PUBLIC_ELFSIGHT_APP_ID || '444160de-79ec-44d4-8669-3d58f8ad39a0',
}

export type SiteConfig = typeof siteConfig
