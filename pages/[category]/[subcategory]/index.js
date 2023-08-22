'use client'

import React from 'react'
import { Container, Grid, Stack, Typography } from '@mui/material'
import { CategoryCard } from '@/components/category'
import NoSSR from '@/components/NoSSR'
import {getSubcategories, getTopics} from '@/apis/apis'
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

function Index ({ name, data }) {
  // console.log(data)
  return (
    <>
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

export async function getServerSideProps (context) {
  const { locale } = context
  const { subcategory } = context.params
  // const data = await Subcategories.find(subcategory => subcategory.slug === category)
  const data = await getTopics(subcategory).then(res => res.data).catch(err => console.log(err))
  return {
    props: {
      name: data.name,
      data: data.data,
      ...(await serverSideTranslations(locale, ['common'], null, ['vi', 'en']))
    }
  }
}
