import React from 'react'
import RegisterForm from '@/components/register/RegisterForm'
import NoSSR from '@/components/NoSSR'
import { styled } from '@mui/material/styles'
import { Container, Typography } from '@mui/material'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import {useTranslation} from "next-i18next";

export async function getStaticProps ({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'], null, ['vi', 'en']))
    }
  }
}
function RegisterPage () {
  const { t } = useTranslation('common')
  return (
    <>
      <StyledRoot>
        <Container maxWidth='sm'>
          <StyledContent>
            <Typography variant='h4' gutterBottom>
              {t('register')}
            </Typography>

            <Typography variant='body2' sx={{ mb: 5 }}>
              {t('create_a_new_account_to_ask_questions_to_the_community')}
            </Typography>

            <RegisterForm />
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  )
}

export default NoSSR(RegisterPage)

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
