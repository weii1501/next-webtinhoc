'use client'

import React from 'react'
import { alpha, styled } from '@mui/material/styles'
import { Box, Card, CardContent, Grid, Typography } from '@mui/material'
import Iconify from '@/components/iconify'
import { fShortenNumber } from '@/utils/formatNumber'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {DJANGO_BASE_URL} from "@/constants";
import {generateRandomCoverUrl} from "@/utils/utils";

const StyledCardMedia = styled('div')({
  position: 'relative',
  paddingTop: 'calc(100% * 3 / 4)'
})

const StyledTitle = styled(Typography)({
  height: 44,
  overflow: 'hidden',
  WebkitLineClamp: 2,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical'
})

const StyledInfo = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-end',
  marginTop: theme.spacing(3),
  color: theme.palette.text.disabled
}))

const StyledCover = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
})

CategoryCard.propTypes = {

}

export default function CategoryCard ({ topic, subcategory, category, index }) {
  const router = useRouter()
  const {
    category: categorySlug,
    subcategory: subcategorySlug
  } = router.query
  const { cover, name, title, numPosts } = category ?? subcategory ?? topic
  const latestPostLarge = index === 0 && (typeof subcategory !== 'undefined')
  const latestPost = true
  const CATEGORY_INFO = [
    { number: numPosts, icon: 'dashicons:welcome-write-blog' }
  ]
  const [pathname, setPathname] = React.useState('')

  React.useEffect(() => {
    if (topic) {
      setPathname(`/${categorySlug}/${subcategorySlug}/${topic.slug}`)
    } else if (subcategory) {
      setPathname(`/${categorySlug}/${subcategory.slug}`)
    } else {
      setPathname(`/${category.slug}`)
    }
  }, [categorySlug, subcategorySlug])

  return (
    <Grid item xs={12} sm={latestPostLarge ? 12 : 6} md={(latestPostLarge) ? 6 : 3}>
      <Card sx={{ position: 'relative' }}>
        <StyledCardMedia
          sx={{
            ...((latestPostLarge || latestPost) && {
              pt: 'calc(100% * 4 / 3)',
              '&:after': {
                top: 0,
                content: "''",
                width: '100%',
                height: '100%',
                position: 'absolute',
                bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
              }
            }),
            ...(latestPostLarge && {
              pt: {
                xs: 'calc(100% * 4 / 3)',
                sm: 'calc(100% * 3 / 4.66)'
              }
            })
          }}
        >
          <StyledCover alt={name ?? title} src={cover ? `${DJANGO_BASE_URL}${cover}` : generateRandomCoverUrl()} />
        </StyledCardMedia>

        <CardContent
          sx={{
            pt: 4,
            ...((latestPostLarge || latestPost) && {
              bottom: 0,
              width: '100%',
              position: 'absolute'
            })
          }}
        >
          <StyledTitle
            color='inherit'
            variant='subtitle2'
            underline='none'
            sx={{
              ...(latestPostLarge && { typography: 'h2', height: 60 }),
              ...((latestPostLarge || latestPost) && {
                color: 'common.white',
                typography: 'h3'
              }),
              ...(!latestPostLarge && !latestPost && {
                typography: 'h2'
              })
            }}
          >
            <Link href={pathname} className='w-full h-auto'>
              {name ?? title}
            </Link>
          </StyledTitle>

          <StyledInfo>
            {CATEGORY_INFO.map((info, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  ml: index === 0 ? 0 : 1.5,
                  ...((latestPostLarge || latestPost) && {
                    color: 'grey.500'
                  })
                }}
              >
                <Iconify icon={info.icon} sx={{ width: 16, height: 16, mr: 0.5 }} />
                <Typography variant='caption'>{fShortenNumber(info.number)} posts</Typography>
              </Box>
            ))}
          </StyledInfo>
        </CardContent>
      </Card>
    </Grid>
  )
}
