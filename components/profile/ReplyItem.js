import React from 'react'
import { Avatar, Box, IconButton, Stack, Typography } from '@mui/material'
import { DJANGO_BASE_URL } from '@/constants'
import Link from 'next/link'
import Iconify from '@/components/iconify'
import { useTheme } from '@mui/material/styles'
import ChildrenReplyItem from '@/components/profile/ChildrenReplyItem'
import { v4 as uuidv4 } from 'uuid'
import ReactHtmlParser from 'react-html-parser'

function ReplyItem ({ reply }) {
  const theme = useTheme()
  const [showMore, setShowMore] = React.useState(false)
  const handleShowMore = () => {
    setShowMore(!showMore)
  }
  return (
    <Box
      sx={{
        width: '100%',
        height: 'auto',
        position: 'relative'
      }}
    >
      <Stack
        direction='row'
        alignItems='start'
        justifyContent='start'
        spacing={2}
        mb={2}
      >
        <Avatar
          src={`${reply?.user?.profileImage}`}
          alt='photoURL'
          sx={{ width: 45, height: 45 }}
        />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start',
            justifyContent: 'space-between',
            height: 45
          }}
        >
          <Typography
            variant='body2'
            color='text.primary'
            sx={{
              fontWeight: 600,
              display: 'flex',
              '&:hover': {
                textDecoration: 'underline',
                cursor: 'pointer',
                color: 'primary.main'
              }
            }}
          >
            <Link
              className='pr-1'
              href={`/thread/${reply?.thread?.slug}`}
            >
              {reply?.thread?.title}
            </Link>
            {reply?.isSolved &&
              <Iconify icon='ph:check-fill' color={theme.palette.success.main} />}
          </Typography>

          <Typography variant='caption' color='text.secondary'>
            Topic: {reply?.thread?.topic?.title}
          </Typography>
        </Box>
      </Stack>
      {reply?.children?.length > 0 &&
        <IconButton
          onClick={handleShowMore}
          sx={{
            width: 40,
            height: 40,
            position: 'absolute',
            top: 0,
            right: 0
          }}
        >
          <Iconify
            icon={showMore ? 'icon-park-outline:up' : 'icon-park-outline:down'}
            color={theme.palette.primary}
          />
        </IconButton>}
      <Typography
        variant='body2'
        color='text.primary'
        sx={{
          color: 'text.primary',
          mb: 1,
          '& img': {
            display: 'flex',
            maxWidth: 200,
            maxHeight: 200,
            boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'
          }
        }}
      >
        {ReactHtmlParser(reply?.content)}
      </Typography>
      {showMore &&
        <Stack
          direction='column'
          alignItems='start'
          justifyContent='start'
          spacing={2}
          mt={1}
        >
          {reply?.children?.length > 0 && reply?.children?.map((child, index) =>
            <ChildrenReplyItem key={uuidv4()} child={child} />)}
        </Stack>}
    </Box>
  )
}

export default ReplyItem
