import React from 'react'
import {Box, Button, Container, Divider, Pagination, Paper, Stack, Typography} from '@mui/material'
import TagArticles from '@/components/tag/TagArticles'
import {getTagData} from '@/apis/apis'
import {ThreadCard} from '@/components/threads'
import Iconify from '@/components/iconify'
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

export async function getServerSideProps (context) {
  const { tag } = context.params
    const { locale } = context
  const data = await getTagData(tag).then(res => res.data.data)
  return {
    props: {
      tag: data.tag,
      articles: data.articles,
      threads: data.threads,
        ...(await serverSideTranslations(locale, ['common'], null, ['vi', 'en']))
    }
  }
}

function TagPage ({ tag, articles, threads }) {
  const [openThread, setOpenThread] = React.useState(false)
  return (
    <>
      <Container
        maxWidth='md'
      >
        <Typography variant='h3' gutterBottom mb={2}>
          #{tag.name}
        </Typography>
        <Divider />
        <Stack spacing={2} my={1}>
          <Pagination count={10} shape='rounded' size='small' defaultPage={1} />
        </Stack>
      </Container>
      <Container
        maxWidth='md'
      >
        <TagArticles
          articles={articles}
        />
      </Container>
      <Container
        maxWidth='md'
      >
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
                Các câu hỏi có thể quan tâm
              </Typography>
            </Box>
            <Button
              variant='contained'
              onClick={() => setOpenThread(!openThread)}
            >
              Tạo câu hỏi
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

export default TagPage
