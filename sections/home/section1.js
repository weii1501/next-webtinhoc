import React from 'react'
import { Box, Stack } from '@mui/material'
import Link from 'next/link'
import { styled, useTheme } from '@mui/material/styles'

function Section1 () {
  const theme = useTheme()
  return (
    <Stack
      direction='row'
      justifyContent='center'
      alignItems='center'
      spacing={8}
      columns={2}
      mt={5}
      sx={{ position: 'relative' }}
    >
      <img
        src='/assets/icons/home-ic/illo-code.svg'
        alt='illo-code.svg'
        title='illo-code.svg'
        height={184}
        width={222}
        loading='lazy'
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          marginTop: '-50px'
        }}
      />
      <img
        src='/assets/icons/home-ic/illo-code.svg'
        alt='illo-code.svg'
        title='illo-code.svg'
        height={184}
        width={222}
        loading='lazy'
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          marginTop: '128px'
        }}
      />
      <Box
        sx={{
          position: 'relative',
          width: '442px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: '#fde3cd',
          padding: '24px',
          borderTopLeftRadius: '8px',
          borderBottomLeftRadius: '8px',
          borderTopRightRadius: '8px',
          '&:after': {
            clipPath: 'polygon(18px 0, 32px 0, 0 40px, 0 38px, 0 0, 18px 0)',
            background: '#fde3cd',
            width: '32px',
            height: '32px',
            position: 'absolute',
            top: '95%',
            right: 0,
            display: 'block',
            content: '""',
            borderRadius: '0 5px 0',
            transform: 'scaleX(-1)'
          }
        }}
      >
        <img
          src='/assets/icons/home-ic/article-svgrepo-com.svg'
          alt='article-svgrepo-com.svg'
          title='article-svgrepo-com.svg'
          height={48}
          width={48}
          loading='lazy'
          className='mb-4'
        />
        <Styledp className='text-lg text-center px-6 mb-4'>
          Find the best answer to your technical question, help others answer theirs
        </Styledp>
        <StyledLink href='/home' style={{ background: '#f2740d' }}>
          Xem bài viết
        </StyledLink>
      </Box>

      <Box
        sx={{
          position: 'relative',
          width: '442px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: '#cde9fe',
          padding: '24px',
          borderTopLeftRadius: '8px',
          borderBottomLeftRadius: '8px',
          borderTopRightRadius: '8px',
          '&:after': {
            clipPath: 'polygon(18px 0, 32px 0, 0 40px, 0 38px, 0 0, 18px 0)',
            background: '#cde9fe',
            width: '32px',
            height: '32px',
            position: 'absolute',
            top: '95%',
            left: 0,
            display: 'block',
            content: '""',
            borderRadius: '0 5px 0',
            transform: 'scaleX(1)'
          }
        }}
      >
        <img
          src='/assets/icons/home-ic/question-mark.svg'
          alt='article-svgrepo-com.svg'
          title='article-svgrepo-com.svg'
          height={48}
          width={48}
          loading='lazy'
          className='mb-4'
        />
        <Styledp className='text-lg text-center px-6 mb-4'>
          Want a secure, private space for your technical knowledge? Create a free
        </Styledp>
        <StyledLink href='/home'>
          Xem câu hỏi
        </StyledLink>
      </Box>
    </Stack>
  )
}

export default Section1

const Styledp = styled('p')(({ theme }) => ({
  fontSize: '16px',
  fontWeight: '400',
  textAlign: 'center',
  paddingLeft: '32px',
  paddingRight: '32px',
  marginBottom: '16px'
}))

const StyledLink = styled(Link)(({ theme }) => ({
  width: '210px',
  padding: '12px 24px',
  background: '#0b95ff',
  color: theme.palette.grey[100],
  fontSize: '16px',
  fontWeight: '700',
  borderRadius: '8px',
  textAlign: 'center'
}))
