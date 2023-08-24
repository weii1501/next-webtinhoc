import React from 'react'
import { Stack } from '@mui/material'
import { emphasize, styled } from '@mui/material/styles'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Chip from '@mui/material/Chip'
import { useRouter } from 'next/router'
import { v4 as uuidv4 } from 'uuid'
import { getArticle, getCateogry, getThread, getTopic } from '@/apis/apis'

const StyledBreadcrumb = styled(Chip)(({ theme }) => ({
  backgroundColor: theme.palette.grey[100],
  height: theme.spacing(3),
  color: theme.palette.text.primary,
  fontWeight: theme.typography.fontWeightRegular,
  '&:hover, &:focus': {
    backgroundColor: emphasize(theme.palette.grey[100], 0.06)
  },
  '&:active': {
    boxShadow: theme.shadows[1],
    backgroundColor: emphasize(theme.palette.grey[100], 0.12)
  }
}))

function BreadcrumbsLine () {
  const router = useRouter()
  const [breadcrumbsComponent, setBreadcrumbsComponent] = React.useState([
    <StyledBreadcrumb
      key={uuidv4()}
      component='a'
      href='/'
      label='Trang chủ'
    />
  ])

  React.useEffect(() => {
    // breadcrumbs trang home
    if (router?.pathname) {
      setBreadcrumbsComponent([])
    }

    // breadcrumbs trang category
    if (router.pathname === '/[category]') {
      console.log('router.query.category:', router.query.category)
      getCateogry(router.query.category).then((res) => {
        setBreadcrumbsComponent([
          <StyledBreadcrumb
            key={uuidv4()}
            component='a'
            href='/'
            label='Trang chủ'
          />,
          <StyledBreadcrumb
            key={uuidv4()}
            component='a'
            href={`/${res.data.data.slug}`}
            label={res.data.data.name}
          />
        ])
      })
    }

    // breadcrumbs trang subcategory
    if (router.pathname === '/[category]/[subcategory]') {
      console.log('router.query.subcategory:', router.query.subcategory)
      getCateogry(router.query.subcategory).then((res) => {
        setBreadcrumbsComponent([
          <StyledBreadcrumb
            key={uuidv4()}
            component='a'
            href='/'
            label='Trang chủ'
          />,
          <StyledBreadcrumb
            key={uuidv4()}
            component='a'
            href={`/${res.data.data.parent.slug}`}
            label={res.data.data.parent.name}
          />,
          <StyledBreadcrumb
            key={uuidv4()}
            component='a'
            href={`/${res.data.data.slug}`}
            label={res.data.data.name}
          />
        ])
      })
    }

    // breadcrumbs trang topic
    if (router.pathname === '/[category]/[subcategory]/[topic]') {
      console.log('router.query.topic:', router.query.topic)
      const topic = getTopic(router?.query?.topic).then((res) => res.data)
      const subcategory = getCateogry(router?.query?.subcategory).then((res) => res.data.data)
      Promise.all([topic, subcategory]).then((values) => {
        console.log('values:', values)
        const topic = values[0]
        const subcategory = values[1]
        setBreadcrumbsComponent([
          <StyledBreadcrumb
            key={uuidv4()}
            component='a'
            href='/'
            label='Trang chủ'
          />,
          <StyledBreadcrumb
            key={uuidv4()}
            component='a'
            href={`/${subcategory.parent.slug}`}
            label={subcategory.parent.name}
          />,
          <StyledBreadcrumb
            key={uuidv4()}
            component='a'
            href={`/${subcategory.slug}`}
            label={subcategory.name}
          />,
          <StyledBreadcrumb
            key={uuidv4()}
            component='a'
            href={`/${topic.slug}`}
            label={topic.title}
          />
        ])
      })
    }

    // breadcrumbs trang article
    if (router?.pathname === '/article/[article]') {
      getArticle(router.query.article.split('.').reverse()[0]).then((res) => {
        console.log('res:', res.data[0])
        setBreadcrumbsComponent([
          <StyledBreadcrumb
            key={uuidv4()}
            component='a'
            href='/'
            label='Trang chủ'
          />,
          <StyledBreadcrumb
            key={uuidv4()}
            component='a'
            href='/404'
            label='Bài viết'
          />,
          <StyledBreadcrumb
            key={uuidv4()}
            component='a'
            href={`/${res.data[0].slug}.${res.data[0].id}`}
            label={res.data[0].title}
          />
        ])
      })
    }

    // breadcrumbs trang thread
    if (router?.pathname === '/thread/[slug]') {
      getThread(router.query.slug.split('.').reverse()[0]).then((res) => {
        console.log('res:', res.data)
        setBreadcrumbsComponent([
          <StyledBreadcrumb
            key={uuidv4()}
            component='a'
            href='/'
            label='Trang chủ'
          />,
          <StyledBreadcrumb
            key={uuidv4()}
            component='a'
            href='/404'
            label='Câu hỏi'
          />,
          <StyledBreadcrumb
            key={uuidv4()}
            component='a'
            href={`/${res.data[0].slug}.${res.data[0].id}`}
            label={res.data[0].title}
          />
        ])
      })
    }
  }, [router])
  console.log(router)
  return (
    <Stack
      direction='row'
      alignItems='start'
      justifyContent='start'
      mb={2}
    >
      <Breadcrumbs
        separator='›'
        aria-label='breadcrumb'
      >
        {breadcrumbsComponent}
      </Breadcrumbs>
    </Stack>
  )
}

export default BreadcrumbsLine
