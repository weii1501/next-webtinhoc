import {
  getAllArticlesSitemap, getAllTagsSitemap,
  getAllThreadsSitemap,
  getCategoriesSitemap
} from '@/apis/sitemap_api'

import { getServerSideSitemap } from 'next-sitemap'

export default function Sitemap () {
  return null
}

export async function getServerSideProps (ctx) {
  // ctx.res.setHeader('Content-Type', 'text/xml')
  // const xml = await generateSitemap()
  // ctx.res.write(xml)
  // ctx.res.end()
  const reqCategories = await getCategoriesSitemap().then(res => res.data).catch(err => console.log(err))
  // create categoryPaths
  const categoryPaths = await reqCategories.map(category => addNextSiteMap(`/${category.slug}`))

  console.log(categoryPaths)

  getServerSideSitemap(ctx, categoryPaths)

  return {
    props: {}
  }
}

async function generateSitemap () {
  const reqCategories = await getCategoriesSitemap().then(res => res.data).catch(err => console.log(err))
  // create categoryPaths
  const categoryPaths = await reqCategories.map(category => `/${category.slug}`)
  // create subcategoryPaths
  const subcategoryPaths = await reqCategories.map(category => {
    const paths = category.children.map(subcategory => `/${category.slug}/${subcategory.slug}`)
    return paths
  })
  // create topicPaths
  const topicPaths = await reqCategories.map(category => {
    const paths = category.children.map(subcategory => {
      const subcategoryPaths = subcategory.topics.map(topic => `/${category.slug}/${subcategory.slug}/${topic.slug}`)
      return subcategoryPaths
    })
    return paths
  })
  // create threadPaths
  const reqThreads = await getAllThreadsSitemap().then(res => res.data).catch(err => console.log(err))
  const threadPaths = await reqThreads.map(thread => `/thread/${thread.slug}.${thread.id}`)
  // create articlePaths
  const reqArticles = await getAllArticlesSitemap().then(res => res.data).catch(err => console.log(err))
  const articlePaths = await reqArticles.map(article => `/article/${article.slug}.${article.id}`)

  // create tagPaths
  const reqTags = await getAllTagsSitemap().then(res => res.data.data).catch(err => console.log(err))
  const tagPaths = await reqTags.map(tag => `/tag/${tag.slug}`)
  console.log(reqTags)
  // create sitemapBase
  const sitemapBase = [
    ''
  ]

  return (
      `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">  
${sitemapBase.map(addPage).join('\n')}

${sitemapBase.map(addNextSiteMap).join('\n')}

${categoryPaths.map(addPage).join('\n')}

${subcategoryPaths.map(path => {
  return path.map(addPage).join('\n')
}).join('\n')}

${topicPaths.map(path => {
  return path.map(subpath => {
    return subpath.map(addPage).join('\n')
  })
})}

${tagPaths.map(addPage).join('\n')}

${threadPaths.map(addPage).join('\n')}

${articlePaths.map(addPage).join('\n')}
</urlset>`
  )
}

function addPage (path) {
  return `  <url>
    <loc>${`${process.env.NEXT_PUBLIC_SITE_BASE_URL}${path}`}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>`
}

function addNextSiteMap (path) {
  return {
    loc: `${process.env.NEXT_PUBLIC_SITE_BASE_URL}${path}`,
    lastmod: new Date().toISOString()
  }
}
