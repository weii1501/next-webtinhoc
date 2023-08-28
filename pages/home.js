import React from 'react'
import { styled, useTheme } from '@mui/material/styles'
import ReactHtmlParser from 'react-html-parser'
import Section1 from '@/sections/home/section1'

function HomePage () {
  const theme = useTheme()
  return (
    <StyledRoot>
      <StyledDiv>
        <Section1 />
        <Styledh1
          style={{
            color: theme.palette.grey[100]
          }}
        >
          {ReactHtmlParser(title)}
        </Styledh1>
      </StyledDiv>
    </StyledRoot>
  )
}

export default HomePage

const title = 'Chào mừng các bạn <br> đến với trang Webtinhoc'

const Styledh1 = styled('h1')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  fontSize: '55px',
  fontWeight: 'bold',
  padding: '64px'
}))

const StyledRoot = styled('div')({
  margin: 'auto',
  width: '100%',
  padding: '32px'
})

const StyledDiv = styled('div')({
  margin: 'auto',
  width: '100%',
  padding: '32px',
  background: 'linear-gradient(180deg, #232629 0%, #525960 130%)',
  borderRadius: '8px'
})
