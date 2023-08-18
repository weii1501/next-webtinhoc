import React, { useContext } from 'react'
// @mui
import { styled } from '@mui/material/styles'
import {
  AppBar,
  Box,
  Card,
  IconButton,
  Modal,
  Stack,
  Toolbar
} from '@mui/material'
import { bgBlur } from '@/utils/cssStyles'
import Iconify from '@/components/iconify'
import Searchbar from '@/components/header/Searchbar'
import LanguagePopover from '@/components/header/LanguagePopover'
import NotificationsPopover from '@/components/header/NotificationsPopover'
import AccountPopover from '@/components/header/AccountPopover'
import Logo from '@/components/logo'
import { FormCreateArticle } from '@/components/articles'
import { useSelector } from 'react-redux'
import { Context } from '@/hooks/context'

const NAV_WIDTH = 280

const HEADER_MOBILE = 64

const HEADER_DESKTOP = 92

const StyledRoot = styled(AppBar)(({ theme }) => ({
  ...bgBlur({ color: theme.palette.background.default }),
  boxShadow: 'none',
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${0}px)`
  }
}))

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: HEADER_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: HEADER_DESKTOP,
    padding: theme.spacing(0, 5)
  }
}))

function Header (props) {
  const { user } = useContext(Context)
  const store = useSelector((state) => state.UserStore)
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <StyledRoot>
      <StyledToolbar>
        <IconButton
          onClick={() => console.log('click')}
          sx={{
            mr: 1,
            color: 'text.primary',
            display: { lg: 'none' }
          }}
        >
          <Iconify icon='eva:menu-2-fill' />
        </IconButton>
        <Box sx={{ px: 2.5, py: 3, display: 'inline-flex' }}>
          <Logo />
        </Box>
        <Searchbar />
        <Box sx={{ flexGrow: 1 }} />
        <Stack
          direction='row'
          alignItems='center'
          spacing={{
            xs: 0.5,
            sm: 1
          }}
        >
          <LanguagePopover />
          {user &&
            <IconButton
              onClick={handleOpen}
              sx={{
                padding: 0,
                width: 44,
                height: 44
              }}
            >
              <Iconify icon='zondicons:question' />
            </IconButton>}
          {user && <NotificationsPopover />}

          <AccountPopover />
        </Stack>
      </StyledToolbar>
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Card sx={{ p: 2 }}>
            <FormCreateArticle />
          </Card>
        </Box>
      </Modal>
    </StyledRoot>
  )
}

export default React.memo(Header)

const style = {
  width: '70%',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  boxShadow: 24
}
