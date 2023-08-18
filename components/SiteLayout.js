import React from 'react'
// mui
import { styled } from '@mui/material/styles'
// import Header from '@/components/header'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
// ----------------------------------------------------------------------

const Header = dynamic(() => import('@/components/header'), { ssr: false })
const SiteFooter = dynamic(() => import('@/components/SiteFooter'), { ssr: false })
const GoTop = dynamic(() => import('@/components/GoTop'), { ssr: false })
const Toast = dynamic(() => import('@/components/Toast'), { ssr: false })

const ignoreHeaderURLsList = [
  'rgx:^/auth',
  'rgx:^/lien-ket'
]

const APP_BAR_MOBILE = 64
const APP_BAR_DESKTOP = 92

function SiteLayout (props) {
  const router = useRouter()
  for (const i of ignoreHeaderURLsList) {
    if (i.startsWith('rgx')) {
      const rgxStr = i.split(':')[1]
      if (router.pathname.match(new RegExp(rgxStr))) {
        return <>{props.children}</>
      }
    } else if (i === router.pathname) return <>{props.children}</>
  }

  return (
    <StyledRoot>
      <Header />
      <Main>
        {props.children}
      </Main>
      <SiteFooter />
      <GoTop />
      <Toast />
    </StyledRoot>
  )
}

export default SiteLayout

const StyledRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100%',
  overflow: 'hidden'
}))
const Main = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  }
}))
