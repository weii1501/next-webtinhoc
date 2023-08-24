import React from 'react'
import {
  Box,
  Button,
  Container, Divider,
  Grid, Pagination,
  Paper,
  Stack,
  Typography
} from '@mui/material'
import { ArticleCard } from '@/components/articles'
import Iconify from '@/components/iconify'
import NoSSR from '@/components/NoSSR'
import { useRouter } from 'next/router'
import { getArticles, getCateogry, getThreads } from '@/apis/apis'
import { ThreadCard } from '@/components/threads'
import { buildFullUrl } from '@/utils/utils'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import BreadcrumbsContainer
  from '@/components/breadcrumbs/BreadcrumbsContainer'

export async function getServerSideProps (context) {
  const { locale } = context
  const { topic, subcategory } = context.params
  const { page } = context.query
  const subcategorydata = await getCateogry(subcategory).then(res => res.data.data).catch(err => console.log(err))
  const data = await getArticles(topic, page).then(res => res.data)
  const threads = await getThreads(topic).then(res => res.data)
  // console.log(data)
  const breadcrumbs = [
    {
      label: 'Trang chủ',
      url: '/'
    },
    {
      label: subcategorydata?.parent?.name,
      url: `/${subcategorydata?.parent?.slug}`
    },
    {
      label: subcategorydata?.name,
      url: `/${subcategorydata?.parent?.slug}/${subcategorydata?.slug}`
    },
    {
      label: data.topic?.title,
      url: `/${subcategorydata?.parent?.slug}/${subcategorydata?.slug}/${data.topic?.slug}`
    }
  ]

  return {
    props: {
      page: data.page,
      topic: data.topic,
      data: data.data,
      breadcrumbs,
      threads,
      ...(await serverSideTranslations(locale, [
        'common'
      ]))
    }
  }
}

function Index ({ page, topic, data, threads, breadcrumbs }) {
  const router = useRouter()
  const { t } = useTranslation('common')
  const [openThread, setOpenThread] = React.useState(false)
  const onChange = (event, value) => {
    // console.log(value)
    const path = router.asPath.split('?')[0]
    router.push(buildFullUrl(path, { page: value }))
  }

  return (
    <>
      <BreadcrumbsContainer breadcrumbs={breadcrumbs} />
      <Container
        sx={{
          mb: 3
        }}
      >
        <Typography variant='h3' gutterBottom mb={2}>
          {topic.title}
        </Typography>
        <Divider />
        <Stack spacing={2} my={1}>
          <Pagination
            count={page.totalPages}
            shape='rounded'
            size='small'
            defaultPage={1}
            onChange={onChange}
            page={parseInt(router?.query?.page || 1)}
          />
        </Stack>
      </Container>

      <Container>
        <Grid container spacing={3}>
          {data.map((article, index) => (
            <ArticleCard article={article} index={index} key={article.id} />
          ))}
        </Grid>
      </Container>

      <Container>
        <Paper
          sx={{
            width: '100%',
            p: 2,
            mt: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start',
            justifyContent: 'start'
          }}
        >
          <Stack direction='row' alignItems='center' justifyContent='space-between' spacing={1} mb={2} sx={{ width: '100%' }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'start'
              }}
            >
              <Typography
                variant='h5'
                gutterBottom
                sx={{
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mr: 1
                }}
              >
                <Iconify icon='bx:help-circle' color='#f44336' width={28} height={28} />
              </Typography>
              <Typography variant='h5' gutterBottom>
                {t('questions_that_may_be_of_interest')}
              </Typography>
            </Box>
            <Button
              variant='contained'
              onClick={() => setOpenThread(!openThread)}
            >
              {t('create_new_thread')}
            </Button>
          </Stack>
          <Box
            sx={{
              width: '100%'
            }}
          >
            <ThreadCard
              setOpenThread={setOpenThread}
              openThread={openThread}
              threads={threads}
            />
          </Box>
        </Paper>
      </Container>

    </>
  )
}

export default NoSSR(Index)

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'company', label: 'Company', alignRight: false },
  { id: 'role', label: 'Role', alignRight: false },
  { id: 'isVerified', label: 'Verified', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: '' }
]
