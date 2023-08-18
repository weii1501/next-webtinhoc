import React from 'react'
import {
  Avatar,
  Box,
  Container,
  Divider,
  Paper,
  Stack, Tab, Tabs,
  Typography
} from '@mui/material'
import Logo from '@/components/logo'
import Iconify from '@/components/iconify'
import { useRouter } from 'next/router'
import SummarySection from '@/components/profile/SummarySection'
import ActivitySection from '@/components/profile/ActivitySection'
import { getAboutUser } from '@/apis/apis'
import { DJANGO_BASE_URL } from '@/constants'
import { useTheme } from '@mui/material/styles'

export async function getServerSideProps (context) {
  const { id, section, filter } = context.params

  const data = await getAboutUser(id).then(res => res.data.data)

  return {
    props: {
      id,
      filter,
      section,
      data
    }
  }
}

function ProfilePage ({ id, data, section, filter }) {
  const router = useRouter()
  const [value, setValue] = React.useState(section)
  const theme = useTheme()

  const handleChange = (event, newValue) => {
    setValue(newValue)
    const href = `/profile/${router.query.id}/${newValue}`
    router.push(href)
  }
  return (
    <>
      <Container>
        <Paper
          sx={{
            p: 2,
            width: '100%',
            height: 'auto'
          }}
        >
          <Stack
            direction='column'
            alignItems='start'
            justifyContent='start'
            spacing={2}
            divider={<Divider flexItem />}
          >
            {/*  avatar profile */}
            <Box
              sx={{
                width: '100%',
                height: 'auto'
              }}
            >
              {/*  right */}
              <Stack
                direction='row'
                alignItems='start'
                justifyContent='start'
                spacing={2}
              >
                <Box
                  sx={{
                    width: 144,
                    height: 144,
                    position: 'relative'
                  }}
                >
                  <Avatar
                    src={`${DJANGO_BASE_URL}${data?.user?.profileImage}`}
                    alt='photoURL'
                    sx={{ width: '100%', height: '100%' }}
                  />
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      borderRadius: '50%'
                    }}
                  >
                    <Logo />
                  </Box>
                </Box>

                {/*  left */}
                <Stack
                  direction='column'
                  alignItems='start'
                  justifyContent='start'
                >
                  <Typography variant='h3' gutterBottom mb={0}>
                    {data?.user?.username}
                  </Typography>
                  <Typography variant='h4' sx={{ color: 'text.secondary' }} noWrap>
                    {data?.user?.email}
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <Iconify icon='mdi:location' color='text.secondary' />
                    <Typography variant='body2' sx={{ color: 'text.secondary' }} size='xs'>
                      location
                    </Typography>
                  </Box>
                </Stack>
              </Stack>

            </Box>

            {/*  about */}
            <Box
              sx={{ width: '100%', height: 'auto' }}
            >
              <Stack
                direction='row'
                alignItems='start'
                justifyContent='start'
                spacing={2}
              >
                <Box
                  sx={{
                    display: 'flex'
                  }}
                >
                  <Typography variant='body2' color='text.secondary' gutterBottom mb={0}>
                    Tham gia
                  </Typography>
                  <Typography variant='body2' color='text.primary' gutterBottom ml={0.5}>
                    1 tháng trước
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex'
                  }}
                >
                  <Typography variant='body2' color='text.secondary' gutterBottom mb={0}>
                    Bài viết
                  </Typography>
                  <Typography variant='body2' color='text.primary' gutterBottom ml={0.5}>
                    20
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex'
                  }}
                >
                  <Typography variant='body2' color='text.secondary' gutterBottom mb={0}>
                    Câu hỏi
                  </Typography>
                  <Typography variant='body2' color='text.primary' gutterBottom ml={0.5}>
                    20
                  </Typography>
                </Box>
                <Box
                    sx={{
                      display: 'flex'
                    }}
                >
                  <Typography variant='body2' color='text.secondary' gutterBottom mb={0}>
                    Trả lời
                  </Typography>
                  <Typography variant='body2' color='text.primary' gutterBottom ml={0.5}>
                    20
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex'
                  }}
                >
                  <Typography variant='body2' color='text.secondary' gutterBottom mb={0}>
                    Lươt thích
                  </Typography>
                  <Typography variant='body2' color='text.primary' gutterBottom ml={0.5}>
                    20
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex'
                  }}
                >
                  <Typography variant='body2' color='text.secondary' gutterBottom mb={0}>
                    Lượt xem
                  </Typography>
                  <Typography variant='body2' color='text.primary' gutterBottom ml={0.5}>
                    20
                  </Typography>
                </Box>
              </Stack>
            </Box>

            {/*  section */}
            <Box
              sx={{
                width: '100%',
                height: 'auto',
                borderBottom: `1px solid ${theme.palette.divider}`
              }}
            >
              <Tabs
                value={value ?? 'summary'}
                onChange={handleChange}
                sx={{
                  width: '100%',
                  height: 'auto'
                }}
                centered
                variant='fullWidth'
              >
                <Tab
                  label='Giới thiệu'
                  value='summary'
                  sx={{
                    width: '100%',
                    height: 'auto',
                    borderBottom: `1px solid ${theme.palette.divider}`
                  }}
                />
                <Tab
                  label='Hoạt động'
                  value='activity'
                  sx={{
                    width: '100%',
                    height: 'auto',
                    borderBottom: `2px solid ${theme.palette.divider}`
                  }}
                />
              </Tabs>
              <Stack
                direction='row'
                alignItems='start'
                justifyContent='start'
                spacing={2}
              >
                {value === 'summary'
                  ? <SummarySection data={data} />
                  : <ActivitySection />}
              </Stack>
            </Box>
          </Stack>
        </Paper>
      </Container>
    </>
  )
}

export default ProfilePage
