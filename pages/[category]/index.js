'use client'

import React from 'react'
import { Container, Grid, Stack, Typography } from '@mui/material'
import { CategoryCard } from '@/components/category'
import NoSSR from '@/components/NoSSR'
import { getSubcategories } from '@/apis/apis'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export async function getServerSideProps (context) {
  const { category } = context.params
  const { locale } = context
  // const data = await Subcategories.find(subcategory => subcategory.slug === category)
  const data = await getSubcategories(category).then(res => res.data.data).catch(err => console.log(err))
  return {
    props: {
      category,
      data,
      ...(await serverSideTranslations(locale, ['common'], null, ['vi', 'en']))
    }
  }
}
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

