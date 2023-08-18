'use client'
import React from 'react'
import { Container, Stack, Typography } from '@mui/material'
import { FormCreateArticle } from '@/components/articles'
import { getCategories } from '@/apis/apis'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export async function getStaticProps ({ locale }) {
  const categories = await getCategories().then(res => res.data).catch(err => console.log(err))
  return {
    props: {
      categories: categories.data,
      ...(await serverSideTranslations(locale, ['common', 'footer'], null, ['vi', 'en']))
    }
  }
}

function Index () {
  return (
    <>
      <Container>
        <Stack direction='row' alignItems='center' justifyContent='start' mb={2}>
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
