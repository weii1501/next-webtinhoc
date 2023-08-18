import React, { useEffect } from 'react'
import { Grid, Stack, Typography, Divider } from '@mui/material'
import { getFilterTopics } from '@/apis/apis'
import { useRouter } from 'next/router'
import FilterTopicsItem from '@/components/profile/FilterTopicsItem'

function FilterTopics () {
  const router = useRouter()
  const { id } = router.query
  const [data, setData] = React.useState(null)
  useEffect(() => {
    getFilterTopics(id).then(res => {
      console.log(res.data)
      setData(res.data.data.sort(function(a, b) {
        return b.totalViews - a.totalViews;
      }))
    })
  }, [id])
  return (
    <Stack
      direction='column'
      spacing={2}
      divider={<Divider flexItem />}
      sx={{
        width: '100%'
      }}
    >
      <Grid
        container
        spacing={2}
        columns={12}
      >
        <Grid
          item
          xs={7}
        >
          <Typography variant='body1' color='text.secondary' pl={2}>
            Topic
          </Typography>
        </Grid>
        <Grid
          item
          xs={1}
        >
          <Typography variant='body1' color='text.secondary'>
            Bài viết
          </Typography>
        </Grid>
        <Grid
          item
          xs={1}
        >
          <Typography variant='body1' color='text.secondary'>
            Bình luận
          </Typography>
        </Grid>
        <Grid
          item
          xs={1}
        >
          <Typography variant='body1' color='text.secondary'>
            Câu hỏi
          </Typography>
        </Grid>
        <Grid
          item
          xs={1}
        >
          <Typography variant='body1' color='text.secondary'>
            Trả lời
          </Typography>
        </Grid>
        <Grid
          item
          xs={1}
        >
          <Typography variant='body1' color='text.secondary'>
            Lượt xem
          </Typography>
        </Grid>
      </Grid>
      {data && data?.map((item, index) => (
        <FilterTopicsItem
          key={index}
          item={item}
        />
      ))}
    </Stack>
  )
}

export default FilterTopics
