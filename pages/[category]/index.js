'use client'

import React from 'react'
import { Container, Grid, Stack, Typography } from '@mui/material'
import { CategoryCard } from '@/components/category'
import NoSSR from '@/components/NoSSR'
import { getSubcategories } from '@/apis/apis'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

function Index ({ category, data }) {
  // console.log(data)
  return (
    <>
      <Container>
        <Stack direction='row' alignItems='center' justifyContent='center' mb={5}>
          <Typography variant='h1' gutterBottom sx={{ textTransform: 'uppercase' }}>
            {data.name}
          </Typography>
        </Stack>
        <Grid container spacing={3}>
          {data.children.map((subcategory, index) => (
            <CategoryCard subcategory={subcategory} index={index} key={subcategory.id} />
          ))}
        </Grid>
      </Container>
    </>
  )
}

export default NoSSR(Index)

export async function getServerSideProps (context) {
  try {
    const { category } = context.params
    const { locale } = context
    // const data = await Subcategories.find(subcategory => subcategory.slug === category)
    const data = await getSubcategories(category).then(res => res.data.data).catch(err => console.log(err))
    return {
      props: {
        category,
        data,
        ...(await serverSideTranslations(locale, [
          'common'
        ]))
      }
    }
  } catch (error) {
    // Xử lý lỗi và chuyển hướng đến trang 404
    context.res.writeHead(404, { Location: '/404' })
    context.res.end()

    // Trả về null để tránh lỗi serializer
    return {
      props: {}
    }
  }
}
