import { SITE_BASE_URL } from '@/constants'

export default function sitemap () {
  return [
    {
      url: SITE_BASE_URL,
      lastModified: new Date()
    },
    {
      url: `${SITE_BASE_URL}/login`,
      lastModified: new Date()
    },
    {
      url: `${SITE_BASE_URL}/register`,
      lastModified: new Date()
    },
    {
      url: 'https://acme.com/settings',
      lastModified: new Date()
    }
  ]
}
