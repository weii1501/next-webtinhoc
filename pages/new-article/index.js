'use client'
import React from 'react'
import { Container, Stack, Typography } from '@mui/material'
import { FormCreateArticle } from '@/components/articles'
import { getCategories } from '@/apis/apis'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import BreadcrumbsContainer
  from '@/components/breadcrumbs/BreadcrumbsContainer'

export async function getServerSideProps ({ locale }) {
  const categories = await getCategories().then(res => res.data).catch(err => console.log(err))
  const breadcrumbs = [
    {
      label: 'Trang chủ',
      url: '/'
    },
    {
      label: 'Tạo bài viết mới',
      url: '/new-article'
    }
  ]
  return {
    props: {
      categories: categories.data,
      breadcrumbs,
      ...(await serverSideTranslations(locale, ['common'], null, ['vi', 'en']))
    }
  }
}

function Index ({ breadcrumbs }) {
  return (
    <>
      <BreadcrumbsContainer breadcrumbs={breadcrumbs} />
      <Container>
        <Stack direction='row' alignItems='center' justifyContent='start' my={2}>
          <Typography variant='h3' gutterBottom sx={{ textTransform: 'uppercase' }}>
            Tạo bài viết mới
          </Typography>
        </Stack>
        <FormCreateArticle article />
      </Container>
    </>
  )
}

export default Index
