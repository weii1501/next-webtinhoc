import React from 'react'
import NoSSR from '@/components/NoSSR'
import { Container, Stack, Typography } from '@mui/material'
import { FormCreateArticle } from '@/components/articles'
import Layout from '@/components/Layout'
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

export async function getStaticProps ({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'], null, ['vi', 'en']))
    }
  }
}
const Index = () => {
  return (
    <>
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
