import React from 'react'
import { Container, Grid, Stack, Typography } from '@mui/material'
import { CategoryCard } from '@/components/category'
import NoSSR from '@/components/NoSSR'
import { getCateogry, getTopics } from '@/apis/apis'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import BreadcrumbsContainer
  from '@/components/breadcrumbs/BreadcrumbsContainer'

export async function getServerSideProps (context) {
  const { locale } = context
  const { subcategory } = context.params
  // const data = await Subcategories.find(subcategory => subcategory.slug === category)
  const subcategorydata = await getCateogry(subcategory).then(res => res.data.data).catch(err => console.log(err))
  const data = await getTopics(subcategory).then(res => res.data).catch(err => console.log(err))
  console.log(subcategorydata)
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
    }
  ]
  return {
    props: {
      name: data.name,
      data: data.data,
      breadcrumbs,
      // name: '',
      // data: [],
      ...(await serverSideTranslations(locale, ['common']))
    }
  }
}

function Index ({ name, data, breadcrumbs }) {
  // console.log(data)
  // console.log(breadcrumbs)
  return (
    <>
      <BreadcrumbsContainer breadcrumbs={breadcrumbs} />
      <Container>
        <Stack direction='row' alignItems='center' justifyContent='center' mb={5}>
          <Typography variant='h1' gutterBottom sx={{ textTransform: 'uppercase' }}>
            {name}
          </Typography>
        </Stack>
        <Grid container spacing={3}>
          {data.map((topic, index) => (
            <CategoryCard topic={topic} index={index} key={topic.id} />
          ))}
        </Grid>
      </Container>
    </>
  )
}

export default NoSSR(Index)
