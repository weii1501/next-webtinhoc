'use client'
import React from 'react'
import NoSSR from '@/components/NoSSR'
// @mui
import { styled } from '@mui/material/styles'
import { Button, Container, Divider, Stack, Typography } from '@mui/material'
// hooks
// components
import Iconify from '@/components/iconify'
import LoginForm from '@/components/login/LoginForm'
import Link from 'next/link'
import { useEffectOnce } from 'react-use'
import { getSocialLogin } from '@/apis/user_apis'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

export async function getStaticProps ({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'], null, ['vi', 'en']))
    }
  }
}

function LoginPage () {
  const { t } = useTranslation('common')
  const router = useRouter()
  const [socialLogin, setSocialLogin] = React.useState(false)
  useEffectOnce(() => {
    getSocialLogin().then(res => {
      setSocialLogin(res.data.data)
      // console.log(res.data.data)
    }).catch(err => {
      console.log(err)
    })
  })

  const login = (url) => {
    router.push(url)
  }

  return (
    <>
      <StyledRoot>
        <Container maxWidth='sm'>
          <StyledContent>
            <Typography variant='h4' gutterBottom>
              {t('login')}
            </Typography>

            <Typography
              variant='body2'
              sx={{
                mb: 5,
                '& :hover': {
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  color: 'primary.main'
                }
              }}
            >
              {t('do_not_have_an_account')}
              <Link className='ml-1' href='/register'>{t('register_now')}</Link>
            </Typography>

            <Stack direction='row' spacing={2}>
              {socialLogin.google &&
                <Button onClick={() => login(socialLogin.google)} fullWidth size='large' color='inherit' variant='outlined'>
                  <Iconify icon='eva:google-fill' color='#DF3E30' width={22} height={22} />
                </Button>}

              {socialLogin.facebook &&
                <Button onClick={() => login(socialLogin.facebook)} fullWidth size='large' color='inherit' variant='outlined'>
                  <Iconify icon='eva:facebook-fill' color='#1877F2' width={22} height={22} />
                </Button>}

              {socialLogin.twitter &&
                <Button fullWidth size='large' color='inherit' variant='outlined'>
                  <Iconify icon='eva:twitter-fill' color='#1C9CEA' width={22} height={22} />
                </Button>}

            </Stack>

            <Divider sx={{ my: 3 }}>
              <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                {t('or')}
              </Typography>
            </Divider>
            <LoginForm />
          </StyledContent>
        </Container>
      </StyledRoot>

    </>
  )
}

export default NoSSR(LoginPage)

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}))

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  // minHeight: 'vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0)
}))
