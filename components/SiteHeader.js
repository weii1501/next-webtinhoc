import React from 'react'

import tw from 'twin.macro'
// @mui
import { styled } from '@mui/material/styles'
import { Box, Stack, AppBar, Toolbar, IconButton } from '@mui/material'

const NAV_WIDTH = 280

const HEADER_MOBILE = 64

const HEADER_DESKTOP = 92

const StyledRoot = styled(AppBar)(({ theme }) => ({
  ...bgBlur({ color: theme.palette.background.default }),
  boxShadow: 'none',
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${NAV_WIDTH + 1}px)`
  }
}))

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: HEADER_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: HEADER_DESKTOP,
    padding: theme.spacing(0, 5)
  }
}))

function SiteHeader (props) {
  return (
    <Header>
      <div className='container mx-auto px-4'>
        header
      </div>
    </Header>
  )
}

export default SiteHeader

const Header = styled.div`
  ${tw`
    py-8
  `}
`
