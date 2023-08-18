import React from 'react'
import { Box, Grid, Stack, Typography } from '@mui/material'
import TopThreadItem from '@/components/profile/TopThreadItem'
import { v4 as uuidv4 } from 'uuid'
import TopUser from '@/components/profile/TopUser'

function SummarySection ({ data }) {
  return (
    <Box
      sx={{
        width: '100%',
        height: 'auto',
        mt: 4
      }}
    >
      <Grid
        container
        spacing={2}
        columns={2}
      >
        {/* top cau hoi */}
        <Grid
          item
          xs={1}
        >
          <Stack
            direction='column'
            alignItems='start'
            justifyContent='start'
            spacing={1}
          >
            <Typography variant='h5' color='text.primary'>
              TOP CÂU HỎI
            </Typography>
            {data?.threads?.map((thread) =>
              <TopThreadItem key={uuidv4()} thread={thread} />)}
          </Stack>
        </Grid>

        {/* top chu de */}
        <Grid
          item
          xs={1}
        >
          <Stack
            direction='column'
            alignItems='start'
            justifyContent='start'
            spacing={1}
          >
            <Typography variant='h5' color='text.primary'>
              TOP TRẢ LỜI
            </Typography>
            {data?.topRepliesThreads?.map((thread) =>
              <TopThreadItem key={uuidv4()} thread={thread} />)}
          </Stack>
        </Grid>

        <Grid
          item
          xs={1}
        >
          <Stack
            direction='column'
            alignItems='start'
            justifyContent='start'
            spacing={1}
          >
            <Typography variant='h5' color='text.primary'>
              TRẢ LỜI NHIỀU NHẤT
            </Typography>
            {data?.topRepliesUser?.map((user) =>
              <TopUser key={uuidv4()} user={user} />)}
          </Stack>
        </Grid>

      </Grid>
    </Box>
  )
}

export default SummarySection
