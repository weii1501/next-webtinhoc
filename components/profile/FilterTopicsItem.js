import React from 'react'
import { Grid, Typography } from '@mui/material'
import { numberFormatter } from '@/utils/utils'

function FilterTopicsItem ({ item }) {
  return (
    <Grid
      container
      spacing={2}
      columns={12}
    >
      <Grid
        item
        xs={7}
      >
        <Typography variant='body1' color='text.primary'>
          {item.title}
        </Typography>
      </Grid>
      <Grid
        item
        xs={1}
      >
        <Typography variant='body1' color='text.primary'>
          {numberFormatter(item.totalArticles, 2)}
        </Typography>
      </Grid>
      <Grid
        item
        xs={1}
      >
        <Typography variant='body1' color='text.primary'>
          {numberFormatter(item.totalComments, 2)}
        </Typography>
      </Grid>
      <Grid
        item
        xs={1}
      >
        <Typography variant='body1' color='text.primary'>
          {numberFormatter(item.totalThreads, 2)}
        </Typography>
      </Grid>
      <Grid
        item
        xs={1}
      >
        <Typography variant='body1' color='text.primary'>
          {numberFormatter(item.totalReplies, 2)}
        </Typography>
      </Grid>
      <Grid
        item
        xs={1}
      >
        <Typography variant='body1' color='text.primary'>
          {numberFormatter(item.totalViews, 2)}
        </Typography>
      </Grid>
    </Grid>
  )
}

export default FilterTopicsItem
