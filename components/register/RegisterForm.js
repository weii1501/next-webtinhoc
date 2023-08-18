import React, {useState} from 'react'
import {IconButton, InputAdornment, Stack, TextField} from '@mui/material'
import Iconify from '@/components/iconify'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import {Controller, useForm} from 'react-hook-form'
import {LoadingButton} from '@mui/lab'
import {postUserAPI} from '@/apis/user_apis'
import {toast} from 'react-toastify'
import {useRouter} from 'next/router'
import {useTranslation} from "next-i18next";

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Vui lòng nhập đúng định dạng email.')
    .required('Email không được để trống.'),
  firstName: yup.string().required('Họ không được để trống.'),
  username: yup.string().required('Tên đăng nhập không được để trống.'),
  lastName: yup.string().required('Tên không được để trống.'),
  password: yup.string().required('Mật khẩu không được để trống.'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Mật khẩu xác nhận phải trùng khớp với mật khẩu.')
})

function RegisterForm () {
  const { t } = useTranslation('common')
  const router = useRouter()
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema)
  })
  const [showPassword, setShowPassword] = useState(false)
  const onSubmit = (data) => {
    // console.log(data)
    const sendData = {
      email: data.email,
      password: data.password,
      first_name: data.firstName,
      last_name: data.lastName,
      username: data.username
    }
    postUserAPI('register', sendData).then(res => {
      toast.success('Đăng ký thành công!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000
      })
      router.push('/login')
    }).catch(err => {
      if (err.response.status === 400) {
        toast.warning('User with this email already exists.', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000
        })
      } if (err.response.status === 500) {
        toast.error('Something went wrong.', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000
        })
      }
    })
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <Controller
          name='email'
          control={control}
          defaultValue=''
          render={({ field }) => (
            <TextField
              {...field}
              value={field.value}
              name='email'
              label='Email'
              error={Boolean(errors.email)}
              helperText={errors.email?.message}
              onChange={(e) => field.onChange(e.target.value)}
            />
          )}
        />

        <Controller
          name='username'
          control={control}
          defaultValue=''
          render={({ field }) => (
            <TextField
              {...field}
              value={field.value}
              name='username'
              label={t('username')}
              error={Boolean(errors.username)}
              helperText={errors.username?.message}
              onChange={(e) => field.onChange(e.target.value)}
            />
          )}
        />

        <Controller
          name='firstName'
          control={control}
          defaultValue=''
          render={({ field }) => (
            <TextField
              {...field}
              value={field.value}
              name='firstName'
              label={t('first_name')}
              error={Boolean(errors.firstName)}
              helperText={errors.firstName?.message}
              onChange={(e) => field.onChange(e.target.value)}
            />
          )}
        />

        <Controller
          name='lastName'
          control={control}
          defaultValue=''
          render={({ field }) => (
            <TextField
              {...field}
              value={field.value}
              name='lastName'
              label={t('last_name')}
              error={Boolean(errors.lastName)}
              helperText={errors.lastName?.message}
              onChange={(e) => field.onChange(e.target.value)}
            />
          )}
        />

        <Controller
          name='password'
          required
          control={control}
          defaultValue=''
          render={({ field }) => (
            <TextField
              {...field}
              value={field.value}
              name='password'
              label={t('password')}
              type={showPassword ? 'text' : 'password'}
              error={Boolean(errors.password)}
              helperText={errors.password?.message}
              onChange={(e) => field.onChange(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge='end'>
                      <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          )}
        />

        <Controller
          name='confirmPassword'
          required
          control={control}
          defaultValue=''
          render={({ field }) => (
            <TextField
              {...field}
              value={field.value}
              name='confirmPassword'
              label={t('confirm_password')}
              type={showPassword ? 'text' : 'password'}
              error={Boolean(errors.confirmPassword)}
              helperText={errors.confirmPassword?.message}
              onChange={(e) => field.onChange(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge='end'>
                      <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          )}
        />

        <LoadingButton fullWidth size='large' type='submit' variant='contained'>
            {t('register')}
        </LoadingButton>
      </Stack>
    </form>
  )
}

export default RegisterForm
