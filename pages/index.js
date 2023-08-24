import React from 'react'
import {
  Box,
  Container,
  Grid,
  Input,
  InputAdornment,
  Stack,
  Typography
} from '@mui/material'

import { CategoryCard } from '@/components/category'
import { getCategories, getHotTags } from '@/apis/apis'
import { styled, useTheme } from '@mui/material/styles'
import { v4 as uuidv4 } from 'uuid'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import Iconify from '@/components/iconify'
import Link from 'next/link'
import NoSSR from '@/components/NoSSR'
import BreadcrumbsLine from '@/components/breadcrumbs/BreadcrumbsLine'

export async function getStaticProps ({ locale }) {
  const categories = await getCategories().then(res => res.data).catch(err => console.log(err))
  const hotTags = await getHotTags().then(res => res.data).catch(err => console.log(err))
  console.log(locale)
  return {
    props: {
      categories: categories.data ?? [],
      tags: hotTags ?? [],
      ...(await serverSideTranslations(locale ?? 'vi', [
        'common'
      ]))
    }
  }
}

function Index ({ categories, tags }) {
  // const pageTitle = 'Webtinhoc'
  // const pageDesc = `Website ${BRAND_NAME} chuyên trang về công nghệ, kỹ thuật lập trình và hướng dẫn kỹ năng phát triển trong lĩnh vực web và mobile.`

  const { t } = useTranslation('common')
  const theme = useTheme()
  return (
    <>
      {/* <NextSeo */}
      {/* title={`${pageTitle} - ${BRAND_NAME}`} */}
      {/* description={pageDesc} */}
      {/* canonical={SITE_BASE_URL} */}
      {/* /> */}

      <StyledDiv
        sx={{
          minHeight: '50vh'
        }}
      >
        <Box
          sx={{
            height: '50vh',
            width: '50vh',
            backgroundColor: 'transparent',
            position: 'absolute',
            top: 1,
            left: 1,
            zIndex: 0
          }}
        >
          <img
            alt='bg'
            src='/assets/icons/neuromorphic-computing-icon.svg'
            height={500}
            width={500}
            className='w-full h-full object-contain transparent'
          />
        </Box>
        <Box
          sx={{
            height: '50vh',
            width: '50vh',
            backgroundColor: 'transparent',
            position: 'absolute',
            bottom: 0,
            right: 0,
            zIndex: 0
          }}
        >
          <img
            alt='bg'
            src='/assets/icons/wired-keyboard-mouse-icon.svg'
            height={500}
            width={500}
            className='w-full h-full object-contain transparent'
          />
        </Box>
        <Container>
          <Stack direction='column' alignItems='center' justifyContent='center' mb={5}>
            <Box
              sx={{
                width: '70%',
                zIndex: 20,
                py: 4
              }}
            >

              <Typography variant='h1' gutterBottom sx={{ textTransform: 'uppercase' }} align='center'>
                {t('home_h1')}
              </Typography>
            </Box>
            <Box
              sx={{
                width: '80%',
                zIndex: 20
              }}
            >

              <Typography variant='body1' color='text.secondary' align='center' sx={{ fontSize: '24px' }}>
                Đây là chuyên trang về công nghệ, kỹ thuật lập trình và hướng dẫn kỹ năng phát triển trong lĩnh vực web và mobile.
              </Typography>
            </Box>
            <Box
              sx={{
                width: {
                  xs: '100%',
                  sm: '60%'
                },
                zIndex: 20,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <StyledSearchHome>
                <Input
                  autoFocus
                  fullWidth
                  disableUnderline
                  placeholder='Bạn đang muốn tìm gì?'
                  startAdornment={
                    <InputAdornment position='start'>
                      <Iconify icon='eva:search-fill' sx={{ color: 'text.disabled', width: 20, height: 20 }} />
                    </InputAdornment>
                          }
                  sx={{ mr: 1, fontWeight: 'fontWeightBold' }}
                />
              </StyledSearchHome>
            </Box>
          </Stack>
        </Container>
      </StyledDiv>
      <StyledDiv>
        <Container>
          <Grid
            container
            columns={3}
            direction={{
              xs: 'column',
              sm: 'row'
            }}
            spacing={3}
            mt={1}
          >
            {intro.map((item, index) =>
              <Grid
                key={uuidv4()}
                item
                xs={1}
              >
                <Box
                  sx={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    border: `1px solid ${theme.palette.grey[400]}`,
                    p: 2,
                    borderRadius: 1,
                    zIndex: 20
                  }}
                >
                  {/* <Typography variant='subtitle1' gutterBottom color='text.main'> */}
                  {/*  {item.title} */}
                  {/* </Typography> */}
                  <h2 className={`text-[16px] text-[${theme.palette.text.primary}] font-bold mb-1`}>
                    {item.title}
                  </h2>
                  <Typography variant='body1' gutterBottom color='text.main'>
                    {item.content}
                  </Typography>
                </Box>
              </Grid>)}
          </Grid>
          {/* <Typography */}
          {/*  variant='h5' */}
          {/*  sx={{ */}
          {/*    textTransform: 'uppercase', */}
          {/*    mt: 5 */}
          {/*  }} */}
          {/*  color='text.secondary' */}
          {/* > */}
          {/*  những chủ đề được quan tâm */}
          {/* </Typography> */}
          <h2
            className='text-[20px] uppercase mt-5 font-bold'
            style={{
              color: theme.palette.text.secondary
            }}
          >
            những chủ đề được quan tâm
          </h2>
          <Stack
            direction='row'
            alignItems='start'
            justifyContent='start'
            spacing={1}
            useFlexGap
            sx={{
              flexWrap: 'wrap'
            }}
            mb={5}
          >
            {tags?.map((tag, index) => (
              <Typography
                key={index}
                variant='body1'
                gutterBottom
                mb={0}
                sx={{
                  color: 'text.secondary',
                  px: 1,
                  borderRadius: 1,
                  backgroundColor: 'grey.300',
                  '&:hover': {
                    color: 'primary.main',
                    textDecoration: 'underline'
                  }
                }}
              >
                <Link href={`/tag/${tag.slug}`}>
                  #{tag?.name}
                </Link>
              </Typography>
            ))}
          </Stack>
        </Container>
      </StyledDiv>
      <StyledDiv>
        <Container>
          <Stack direction='row' alignItems='start' justifyContent='start' mt={5}>
            {/* <Typography variant='h5' gutterBottom sx={{ textTransform: 'uppercase' }} color='text.secondary'> */}
            {/*  Những chủ đề nổi bật */}
            {/* </Typography> */}
            <h2
              className='text-[20px] uppercase mt-5 font-bold'
              style={{
                color: theme.palette.text.secondary
              }}
            >
              những chủ đề được quan tâm
            </h2>
          </Stack>
          <Grid container spacing={3}>
            {categories.map((category, index) => (
              <CategoryCard category={category} index={index} key={index} />
            ))}
          </Grid>
        </Container>
      </StyledDiv>
    </>
  )
}
export default NoSSR(Index)

const StyledDiv = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  minHeight: 'auto',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative'
}))

const HEADER_MOBILE = 64

const StyledSearchHome = styled('div')(({ theme }) => ({
  color: theme.palette.background.default,
  top: 0,
  left: 0,
  zIndex: 99,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  height: HEADER_MOBILE,
  border: `3px solid ${theme.palette.grey[400]}`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(0, 1),
  marginTop: theme.spacing(6)
}))

const intro = [
  {
    title: 'Kho bài viết chất lượng cao',
    content: 'Chúng tôi cung cấp những bài viết có tính hữu dụng và thực tế trong một thư viện dễ dàng tìm kiếm và tra cứu.'
  },
  {
    title: 'Trau dồi kỹ năng lập trình',
    content: 'Cùng với sự phát triển của cộng đồng các nhà phát triển, chúng ta có cơ hội tranh luận cùng nhau trong một môi trường văn minh.'
  },
  {
    title: 'Chia sẻ kiến thức của bạn',
    content: 'Tại Vietdev, bạn có thể đăng ký thành viên và gửi bài viết cho chúng tôi. Nếu bài viết được đăng, bạn sẽ nhận được nhuận bút'
  }
]
