import React, { useContext, useEffect } from 'react'
import { Box, Button, Container, Grid, InputAdornment, TextField, Typography } from '@mui/material'
import Iconify from '@/components/iconify'
import { Controller, useForm } from 'react-hook-form'
import { Context } from '@/hooks/context'
import { putUpdateInfo } from '@/apis/user_apis'
import { toast } from 'react-toastify'
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import BreadcrumbsContainer
  from "@/components/breadcrumbs/BreadcrumbsContainer";

export async function getStaticProps ({ locale }) {
  const breadcrumbs = [
    {
      label: 'Trang chủ',
      url: '/'
    },
    {
      label: 'Cài đặt',
      url: '/settings'
    }
  ]
  return {
    props: {
      breadcrumbs,
      ...(await serverSideTranslations(locale, ['common'], null, ['vi', 'en']))
    }
  }
}

function SettingsPage ({ breadcrumbs }) {
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm()
  const { user, setUser } = useContext(Context)

  useEffect(() => {
    if (user) {
      setValue('firstName', user.firstName)
      setValue('lastName', user.lastName)
      setValue('email', user.email)
      setValue('phoneNumber', user.numberPhone)
      setValue('location', user.location)
      setValue('facebook', user.facebook)
      setValue('tiktok', user.tiktok)
      setValue('username', user.username)
      setValue('birthYear', user.birthYear)
    }
  }, [user])

  const onSubmit = (data) => {
    const sendData = {
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      number_phone: data.phoneNumber,
      location: data.location,
      facebook: data.facebook,
      tiktok: data.tiktok,
      username: data.username,
      birth_year: data.birthYear
    }
    putUpdateInfo(sendData).then(res => {
      console.log(res.data)
      if (res.data.ok) {
        setUser(res.data.data)
        toast.success('Cập nhật thành công', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000
        })
      } else {
        toast.error(res.data.msg, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000
        })
      }
    }).catch(err => {
      toast.error(err.response.data.msg, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000
      })
    })
  }

  return (
    <>
      <BreadcrumbsContainer breadcrumbs={breadcrumbs} />

      <Container>
        <h1 className='hidden'>Settings</h1>
        <Typography variant='h4' mb={0}>
          Điều Chỉnh Thông Tin Cá Nhân
        </Typography>
        <Typography variant='body1' gutterBottom mb={2} color='text.secondary'>
          admin
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid
            container
            direction='column'
            spacing={3}
          >
            <Grid
              item
              sx={{ width: '100%' }}
            >
              <Grid
                container
                direction='row'
                spacing={3}
                columns={2}
              >
                <Grid
                  item
                  sx={{ width: '100%' }}
                  xs={1}
                >
                  <Controller
                    name='lastName'
                    control={control}
                    defaultValue=''
                    render={({ field }) => (
                      <TextField
                        {...field}
                        onChange={field.onChange}
                        label='Họ:'
                        variant='standard'
                        fullWidth
                      />
                    )}
                  />
                </Grid>

                <Grid
                  item
                  sx={{ width: '100%' }}
                  xs={1}
                >
                  <Controller
                    name='firstName'
                    control={control}
                    defaultValue=''
                    render={({ field }) => (
                      <TextField
                        {...field}
                        onChange={field.onChange}
                        label='Tên:'
                        variant='standard'
                        fullWidth
                      />
                    )}
                  />

                </Grid>
              </Grid>
            </Grid>

            {/* use name */}
            <Grid
              item
              sx={{ width: '100%' }}
            >
              <Controller
                name='username'
                control={control}
                defaultValue=''
                render={({ field }) => (
                  <TextField
                    {...field}
                    onChange={field.onChange}
                    label='Tên Tài Khoản:'
                    variant='standard'
                    fullWidth
                  />
                )}
              />
            </Grid>

            {/*  location */}
            <Grid
              item
              sx={{ width: '100%' }}
            >
              <Controller
                name='location'
                control={control}
                defaultValue=''
                render={({ field }) => (
                  <TextField
                    {...field}
                    onChange={field.onChange}
                    label='Địa chỉ:'
                    variant='standard'
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <Iconify icon='fluent:location-12-filled' color='#6B7280' mr={1} />
                      )
                    }}
                  />
                )}
              />
            </Grid>

            {/*  nam sinh va sdt */}
            <Grid
              item
              sx={{ width: '100%' }}
            >
              <Grid
                container
                direction='row'
                spacing={3}
                columns={2}
              >
                <Grid
                  item
                  sx={{ width: '100%' }}
                  xs={1}
                >
                  <Controller
                    name='birthYear'
                    control={control}
                    defaultValue=''
                    render={({ field }) => (
                      <TextField
                        {...field}
                        onChange={field.onChange}
                        type='number'
                        label='Năm Sinh:'
                        variant='standard'
                        fullWidth
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position='start'>
                              <Iconify icon='iwwa:year' color='#6B7280' mr={1} />
                            </InputAdornment>
                          )
                        }}
                      />
                    )}
                  />
                </Grid>

                <Grid
                  item
                  sx={{ width: '100%' }}
                  xs={1}
                >
                  <Controller
                    name='phoneNumber'
                    control={control}
                    defaultValue=''
                    render={({ field }) => (
                      <TextField
                        {...field}
                        onChange={field.onChange}
                        label='Số Điện Thoại (Riêng tư):'
                        variant='standard'
                        fullWidth
                        InputProps={{
                          startAdornment: (
                            <Iconify icon='tabler:phone-filled' color='#6B7280' mr={1} />
                          )
                        }}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Grid>

            {/*  fb va tw */}
            <Grid
              item
              sx={{ width: '100%' }}
            >
              <Grid
                container
                direction='row'
                spacing={3}
                columns={2}
              >
                <Grid
                  item
                  sx={{ width: '100%' }}
                  xs={1}
                >
                  <Controller
                    name='facebook'
                    control={control}
                    defaultValue=''
                    render={({ field }) => (
                      <TextField
                        {...field}
                        onChange={field.onChange}
                        label='Facebook:'
                        variant='standard'
                        fullWidth
                        InputProps={{
                          startAdornment: (
                            <Iconify icon='uiw:facebook' color='#6B7280' mr={1} />
                          )
                        }}
                      />
                    )}
                  />
                </Grid>

                <Grid
                  item
                  sx={{ width: '100%' }}
                  xs={1}
                >
                  <Controller
                    name='tiktok'
                    control={control}
                    defaultValue=''
                    render={({ field }) => (
                      <TextField
                        {...field}
                        onChange={field.onChange}
                        label='Tiktok:'
                        variant='standard'
                        fullWidth
                        InputProps={{
                          startAdornment: (
                            <Iconify icon='ri:tiktok-line' color='#6B7280' mr={1} />
                          )
                        }}
                      />
                    )}
                  />
                </Grid>

                <Grid
                  item
                  sx={{ width: '100%' }}
                >
                  <Controller
                    name='email'
                    control={control}
                    defaultValue=''
                    render={({ field }) => (
                      <TextField
                        {...field}
                        onChange={field.onChange}
                        label='Email (Riêng tư):'
                        variant='standard'
                        fullWidth
                        InputProps={{
                          startAdornment: (
                            <Iconify icon='mdi:email' color='#6B7280' mr={1} />
                          )
                        }}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Box
            sx={{
              mt: 5
            }}
          >
            <Button
              type='submit'
              color='primary'
              variant='contained'
            >
              Lưu Thông Tin
            </Button>
          </Box>
        </form>
      </Container>
    </>
  )
}

export default SettingsPage
