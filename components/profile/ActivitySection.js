import React, { useEffect } from 'react'
import { Box, Tabs, Tab, Stack, Divider } from '@mui/material'
import Iconify from '@/components/iconify'
import { v4 as uuidv4 } from 'uuid'
import { useRouter } from 'next/router'
import ReplyItem from '@/components/profile/ReplyItem'
import { useTheme } from '@mui/material/styles'
import { getFilterChoices } from '@/apis/apis'
import handleViewport from 'react-in-viewport'
import { TopicCommentsListLoader } from '@/loaders'
import FilterTopics from '@/components/profile/FilterTopics'

function ActivitySection () {
  const theme = useTheme()
  const router = useRouter()
  const [loading, startLoading] = React.useTransition()
  const { filter, id } = router.query
  const [value, setValue] = React.useState(filter ?? '')
  const [data, setData] = React.useState(null)
  const [next, setNext] = React.useState(null)

  useEffect(() => {
    startLoading(() => {
      if (filter !== 'topics') {
        getFilterChoices(id, filter ?? 'all').then(res => {
          setData(res.data.data)
          setNext(res.data.next)
        })
      }
    })
  }, [filter])
  const handleChange = (event, newValue) => {
    setValue(newValue)
    const { id, section } = router.query
    router.push(`/profile/${id}/${section}/${newValue}`)
  }

  const handleInViewPort = () => {
    setNext(null)
    startLoading(() => {
      getFilterChoices(id, filter ?? 'all', next).then(res => {
        setData([...data, ...res.data.data])
        setNext(res.data.next)
      })
    })
  }

  return (
    <Box
      sx={{
        width: '100%',
        height: 'auto',
        mt: 4
      }}
    >
      <Tabs
        value={value ?? 'summary'}
        sx={{
          width: '100%',
          height: 'auto',
          borderBottom: `1px solid ${theme.palette.divider}`
        }}
        centered
        variant='fullWidth'
        onChange={handleChange}
      >

        {tabList.map((tab) =>
          <Tab
            key={uuidv4()}
            icon={<Iconify icon={tab.icon} />}
            iconPosition='start'
            value={tab.value}
            label={tab.label}
            sx={{ minHeight: 30 }}
          />)}
      </Tabs>

      <Stack
        direction='column'
        alignItems='start'
        justifyContent='start'
        spacing={2}
        divider={<Divider flexItem />}
        mt={4}
      >
        {(!filter) && data?.map((reply) =>
          <ReplyItem key={uuidv4()} reply={reply} />)}

        {(filter === 'replies') && data?.map((reply) =>
          <ReplyItem key={uuidv4()} reply={reply} />)}

        {(filter === 'likes') && data?.map((reply) =>
          <ReplyItem key={uuidv4()} reply={reply} />)}

        {(filter === 'solved') && data?.map((reply) =>
          <ReplyItem key={uuidv4()} reply={reply} />)}

        {(filter === 'voted') && data?.map((reply) =>
          <ReplyItem key={uuidv4()} reply={reply} />)}

        {(filter === 'topics') &&
          <FilterTopics />}

        {loading && <TopicCommentsListLoader />}
      </Stack>
      {next && <ViewportBlock onEnterViewport={handleInViewPort} onLeaveViewport={() => console.log('leave')} />}
    </Box>
  )
}

export default ActivitySection

const Block = (props) => {
  const { forwardedRef } = props
  return (
    <div className='viewport-block' ref={forwardedRef}>
      <div style={{ width: '1px', height: '1px', backgroundColor: 'transparent' }} />
    </div>
  )
}

const ViewportBlock = handleViewport(Block /** options: {}, config: {} **/)

const tabList = [
  {
    icon: 'fluent:list-24-filled',
    value: '',
    label: 'Tất cả'
  },
  {
    icon: 'ic:round-list',
    value: 'topics',
    label: 'Topics'
  },
  {
    icon: 'bxs:share',
    value: 'replies',
    label: 'Replies'
  },
  {
    icon: 'mdi:like',
    value: 'likes',
    label: 'Likes'
  },
  {
    icon: 'ph:check-fill',
    value: 'solved',
    label: 'Solved'
  },
  {
    icon: 'mdi:heart',
    value: 'voted',
    label: 'Voted'
  }
]
