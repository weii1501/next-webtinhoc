import { getServerSideSitemapLegacy } from 'next-sitemap'
import {
  getAllArticlesSitemap,
  getAllTagsSitemap,
  getAllThreadsSitemap,
  getCategoriesSitemap
} from '@/apis/sitemap_api'

export const getServerSideProps = async (ctx) => {
  const cacheMaxAgeUntilStaleSeconds = 60 // 1 minute
  const cacheMaxAgeStaleDataReturnSeconds = 15 * 60 // 15 minutes
  ctx.res.setHeader(
    'Cache-Control',
      `public, s-maxage=${cacheMaxAgeUntilStaleSeconds}, stale-while-revalidate=${cacheMaxAgeStaleDataReturnSeconds}`
  )

  const reqCategories = await getCategoriesSitemap().then(res => res.data).catch(err => console.log(err))
  // create categoryPaths
  const categoryPaths = await reqCategories.map(category => `/${category.slug}`)
  const newsSitemapsCategory = await categoryPaths.map(addNextSiteMap)
  // create subcategoryPaths
  const subcategoryPaths = await reqCategories.map(category => {
    const paths = category.children.map(subcategory => `/${category.slug}/${subcategory.slug}`)
    return paths
  })
  const tmpSubcategoryPaths = subcategoryPaths.reduce((acc, curr) => acc.concat(curr), [])
  const newsSitemapsSubcategory = tmpSubcategoryPaths.map(addNextSiteMap)

  console.log(newsSitemapsSubcategory)
  // create topicPaths
  const topicPaths = await reqCategories.map(category => {
    const paths = category.children.map(subcategory => {
      const subcategoryPaths = subcategory.topics.map(topic => `/${category.slug}/${subcategory.slug}/${topic.slug}`)
      return subcategoryPaths
    })
    return paths
  })
  const arr1D = topicPaths.reduce((acc, curr) => acc.concat(curr.flat()), [])
  const newsSitemapsTopics = await arr1D.map(addNextSiteMap)

  // console.log(newsSitemapsTopics)
  // create threadPaths
  const reqThreads = await getAllThreadsSitemap().then(res => res.data).catch(err => console.log(err))
  const threadPaths = await reqThreads.map(thread => `/thread/${thread.slug}.${thread.id}`)
  const newsSitemapsThreads = threadPaths.map(addNextSiteMap)
  // create articlePaths
  const reqArticles = await getAllArticlesSitemap().then(res => res.data).catch(err => console.log(err))
  const articlePaths = await reqArticles.map(article => `/article/${article.slug}.${article.id}`)
  const newsSitemapsArticle = articlePaths.map(addNextSiteMap)

  // create tagPaths
  const reqTags = await getAllTagsSitemap().then(res => res.data.data).catch(err => console.log(err))
  const tagPaths = await reqTags.map(tag => `/tag/${tag.slug}`)

  const newsSitemapsTags = await tagPaths.map(addNextSiteMap)
  const fields = [
    ...newsSitemapsTags,
    ...newsSitemapsCategory,
    ...newsSitemapsSubcategory,
    ...newsSitemapsTopics,
    ...newsSitemapsArticle,
    ...newsSitemapsThreads
  ]

  return getServerSideSitemapLegacy(ctx, fields)
}

export default function Site () {
  return null
}

function addNextSiteMap (path) {
  return {
    loc: `${process.env.NEXT_PUBLIC_SITE_BASE_URL}${path}`,
    lastmod: new Date().toISOString()
  }
}
