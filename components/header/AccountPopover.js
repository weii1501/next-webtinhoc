import React, { useContext, useState } from 'react'
import { Context } from '@/hooks/context'
// @mui
import { alpha } from '@mui/material/styles'
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  MenuItem,
  Popover,
  Stack,
  Typography
} from '@mui/material'
import { useDispatch } from 'react-redux'
import { useEffectOnce } from 'react-use'
import { getMyProfileAPI, logout } from '@/apis/user_apis'
import { updateUserData } from '@/actions'
import { DJANGO_BASE_URL } from '@/constants'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { toast } from 'react-toastify'
import Cookies from 'js-cookie'
// mocks_

// ----------------------------------------------------------------------

export default React.memo(function AccountPopover () {
  const { t } = useTranslation('common')
  const router = useRouter()
  const [open, setOpen] = useState(null)
  const dispatch = useDispatch()
  const { user, setUser } = useContext(Context)
  // const lock = React.useRef(false)
  const [lock, startLock] = React.useTransition()
  const MENU_OPTIONS = [
    {
      label: t('home'),
      icon: 'eva:home-fill',
      url: '/'
    },
    {
      label: t('profile'),
      icon: 'eva:person-fill',
      url: `/profile/${user?.id}/summary`
    },
    {
      label: t('settings'),
      icon: 'eva:settings-2-fill',
      url: '/settings'
    },
    {
      label: 'Tạo bài viết',
      icon: 'eva:settings-2-fill',
      url: '/new-article'
    }
  ]

  useEffectOnce(() => {
    getMyProfileAPI().then(r => {
      setUser(r.data)
      dispatch(updateUserData(r.data))
    }).catch(e => {
      console.log(e)
    })
  })

  // console.log('AccountPopover')
  const handleOpen = (event) => {
    setOpen(event.currentTarget)
  }

  const handleClose = () => {
    setOpen(null)
    console.log('handleClose')
  }

  const handleClick = (url) => {
    setOpen(null)
    console.log('handleClick')
    router.push(url)
  }

  const handleLogout = () => {
    console.log('handleLogout')
    logout().then(r => {
      if (r?.data?.ok) {
        setUser(null)
        Cookies.remove('jwtToken')
        Cookies.remove('jwtRefresh')
        router.push('/login')
      } else {
        toast.warning('Chưa đăng xuất được', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000
        })
      }
      setOpen(null)
    }).catch(e => {
      toast.error(e?.message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000
      })
    })
  }

  if (lock && !user) {
    return (
      <div className='w-12 inline-flex items-center justify-center'>
        <CircularProgress />
      </div>
    )
  }
  // console.log('user', user)
  return (
    <>
      {user?.isAuth
        ? (
          <IconButton
            onClick={handleOpen}
            sx={{
              p: 0,
              ...(open && {
                '&:before': {
                  zIndex: 1,
                  content: "''",
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  position: 'absolute',
                  bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8)
                }
              })
            }}
          >
            <Avatar
              src={`${DJANGO_BASE_URL}${user.profileImage}`}
              alt='photoURL'
              size='md'
              imgProps={{
                width: '500',
                height: '600'
              }}
            />
          </IconButton>
          )
        : (
          <Button
            type='button'
            variant='outlined'
            onClick={() => router.push('/login')}
          >
            Login
          </Button>
          )}

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            '& .MuiMenuItem-root': {
              typography: 'body2',
              borderRadius: 0.75
            }
          }
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant='subtitle2' noWrap>
            {user?.username}
          </Typography>
          <Typography variant='body2' sx={{ color: 'text.secondary' }} noWrap>
            {user?.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <MenuItem key={option.label} onClick={() => handleClick(option.url)}>
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
          {t('logout')}
        </MenuItem>
      </Popover>
    </>
  )
})
