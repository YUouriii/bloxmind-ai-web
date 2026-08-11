import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/404.html', '/_not-found'],
      },
      {
        userAgent: ['Googlebot', 'Google-InspectionTool'],
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: 'https://bloxmindai.netlify.app/sitemap.xml',
  }
}
