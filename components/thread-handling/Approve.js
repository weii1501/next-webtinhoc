import React from 'react'
import { putApproveThread } from '@/apis/apis'
import { Box, Button, CircularProgress } from '@mui/material'
import Iconify from '@/components/iconify'

function Approve ({ thread }) {
  const [status, setStatus] = React.useState(thread.status)
  const [approve, startApprove] = React.useTransition()
  const handleApprove = (id) => {
    startApprove(() => {
      putApproveThread(id).then(res => {
        // console.log(res.data)
        setStatus(res.data.ok)
      })
    })
  }
    console.log(thread)
  if (status === 'C') {
    return (
      <Button
        variant='contained'
        color='primary'
        type='button'
        onClick={() => handleApprove(thread.id)}
      >
        Duyệt
      </Button>
    )
  } else {
    return (
      <Box
        sx={{
          width: 70,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Iconify
          sx={{
            width: 24,
            height: 24,
            p: 0.5,
            backgroundColor: 'success.light',
            borderRadius: '50%'
          }}
          color='common.white'
          icon='mdi:check'
        />
      </Box>
    )
  }

  // eslint-disable-next-line no-unreachable
  return (
    <Box
      sx={{
        width: 70,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      {approve
        ? <CircularProgress size={24} />
        : <Iconify
            sx={{
              width: 24,
              height: 24,
              p: 0.5,
              backgroundColor: status ? 'success.light' : 'error.main',
              borderRadius: '50%'
            }}
            color='common.white'
            icon={status ? 'mdi:check' : 'octicon:x-12'}
          />}
    </Box>
  )
}

export default Approve
