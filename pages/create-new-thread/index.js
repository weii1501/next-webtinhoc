import React from 'react'
import NoSSR from '@/components/NoSSR'
import { Container, Stack, Typography } from '@mui/material'
import { FormCreateArticle } from '@/components/articles'
import Layout from '@/components/Layout'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import BreadcrumbsContainer
  from '@/components/breadcrumbs/BreadcrumbsContainer'

export async function getStaticProps ({ locale }) {
  const breadcrumbs = [
    {
      label: 'Trang chủ',
      url: '/'
    },
    {
      label: 'Tạo câu hỏi mới',
      url: '/new-article'
    }
  ]
  return {
    props: {
      breadcrumbs,
      ...(await serverSideTranslations(locale, ['common'], null, ['vi', 'en']))
    }
  }
}
const Index = ({ breadcrumbs }) => {
  return (
    <>
      <BreadcrumbsContainer breadcrumbs={breadcrumbs} />
      <Container>
        <Stack direction='row' alignItems='center' justifyContent='start' mb={2}>
          <Typography variant='h3' gutterBottom sx={{ textTransform: 'uppercase' }}>
            Tạo câu hỏi mới
          </Typography>
        </Stack>
        <FormCreateArticle />
      </Container>
    </>
  )
}
export default NoSSR(Index)

Index.getLayout = function getLayout (Index) {
  return (
    <Layout>
      {Index}
    </Layout>
  )
}
