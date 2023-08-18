import React from 'react'
import {Card, Stack, Typography} from '@mui/material'

function CardInfoThread ({ thread }) {
  const tagsStrings = thread?.tags?.map(tag => tag.name).join(', ')
  return (
    <Card
      sx={{
        p: 2
      }}
    >
      <Stack
        direction='column'
        spacing={2}
      >
        <Typography variant='body1'>
          <strong>Tiêu đề: </strong>
          {thread?.title}
        </Typography>
        <Typography variant='body1'>
          <strong>Topic: </strong>
          {thread?.topic?.title}
        </Typography>
        <Typography variant='body1'>
          <strong>Người đăng: </strong>
          {thread?.user?.userName}
        </Typography>
        <Typography variant='body1'>
          <strong>Tags: </strong>
          {tagsStrings}
        </Typography>
        <Typography variant='body1'>
          <strong>Nội dung: </strong>
          {thread?.content}
        </Typography>
      </Stack>
    </Card>
  )
}

export default CardInfoThread
