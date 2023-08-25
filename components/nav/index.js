import PropTypes from 'prop-types'
import { useContext, useEffect, useState } from 'react'

// @mui
import { alpha, styled } from '@mui/material/styles'
import { Avatar, Box, Drawer, Link, Typography } from '@mui/material'
// mock

// hooks
import useResponsive from '@/hooks/useResponsive'
// components
import Logo from '@/components/logo'
import Scrollbar from '@/components/scrollbar'
import NavSection from '@/components/nav/nav-section'
//
import navConfig from './config'
import { useRouter } from 'next/router'
import { Context } from '@/hooks/context'
import { DJANGO_BASE_URL } from '@/constants'
import { getAllCategories } from '@/apis/apis'
import SvgColor from '@/components/svg-color'

// ----------------------------------------------------------------------

const NAV_WIDTH = 280

const StyledAccount = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(theme.palette.grey[500], 0.12)
}))

// ----------------------------------------------------------------------

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func
}

export default function Nav ({ openNav, onCloseNav }) {
  const router = useRouter()
  const { pathname } = router
  const { user } = useContext(Context)
  const [navCategories, setNavCategories] = useState(navConfig)

  useEffect(() => {
    getAllCategories().then((res) => {
      console.log(res.data)
      const array = res.data.map((category) => {
        if (category.parent === null) {
          return {
            title: category.name,
            path: `/${category.slug}`,
            icon: icon('ic_tags')
          }
        } else {
          return {
            title: category.name,
            path: `/${category.parent.slug}/${category.slug}`,
            icon: icon('ic_tags')
          }
        }
      })
      console.log(array)
      setNavCategories([...navConfig, ...array])
    })
  }, [])

  const isDesktop = useResponsive('up', 'lg')

  useEffect(() => {
    if (openNav) {
      onCloseNav()
    }
  }, [pathname])

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' }
      }}
    >
      <Box sx={{ px: 2.5, py: 3, display: 'inline-flex' }}>
        <Logo />
      </Box>

      {user && (
        <Box sx={{ mb: 5, mx: 2.5 }}>
          <Link underline='none'>
            <StyledAccount>
              <Avatar
                src={`${DJANGO_BASE_URL}${user?.profileImage}`}
                alt='photoURL'
                imgProps={{
                  width: '500',
                  height: '600'
                }}
              />

              <Box sx={{ ml: 2 }}>
                <Typography variant='subtitle2' sx={{ color: 'text.primary' }}>
                  {user?.username}
                </Typography>

                <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                  admin
                </Typography>
              </Box>
            </StyledAccount>
          </Link>
        </Box>
      )}
      <NavSection data={navCategories} />
    </Scrollbar>
  )

  return (
    <Box
      component='nav'
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV_WIDTH }
      }}
    >
      {isDesktop
        ? (
          <Drawer
            open
            variant='permanent'
            PaperProps={{
              sx: {
                width: NAV_WIDTH,
                bgcolor: 'background.default',
                borderRightStyle: 'dashed'
              }
            }}
          >
            {renderContent}
          </Drawer>
          )
        : (
          <Drawer
            open={openNav}
            onClose={onCloseNav}
            ModalProps={{
              keepMounted: true
            }}
            PaperProps={{
              sx: { width: NAV_WIDTH }
            }}
          >
            {renderContent}
          </Drawer>
          )}
    </Box>
  )
}

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
