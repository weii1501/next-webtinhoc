import React, {useContext, useEffect, useRef, useTransition} from 'react'
import {
  Avatar,
  Box,
  CircularProgress,
  Grid,
  IconButton,
  Stack
} from '@mui/material'
import account from '@/_mock/account'
import { styled } from '@mui/material/styles'
import Iconify from '@/components/iconify'
import { Controller, useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { postComment } from '@/apis/apis'
import { useSelector } from 'react-redux'
import { DJANGO_BASE_URL } from '@/constants'
import {Context} from "@/hooks/context";

function PostCommemt ({ setComments, comments }) {
  const {
    control,
    handleSubmit,
    resetField,
    formState: { errors }
  } = useForm()
  const textareaRef = useRef(null)
  const router = useRouter()
  const { article, slug } = router.query
  const [isLoading, startLoading] = useTransition()
  const store = useSelector(state => state.UserStore)
  const { user } = useContext(Context)

  useEffect(() => {
    // console.log(errors)
  }, [errors])

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [textareaRef])

  const handleTextareaChange = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }

  const onSubmmit = (data) => {
    resetField('content')
    startLoading(() => {
      if (article) {
        const replacedString = data.content.replace(/\n/g, '</br>')
        // console.log(replacedString)
        const comment = {
          article_id: article.split('.').reverse()[0],
          content: replacedString
        }
        postComment(comment).then(res => {
          // console.log(res.data)
          const newComments = [res.data, ...comments]
          setComments(newComments)
        })
      } else {
        const comment = {
          thread_id: slug.split('.').reverse()[0],
          content: data.content
        }
        postComment(comment).then(res => {
          // console.log(res.data)
          const newComments = [res.data, ...comments]
          setComments(newComments)
        })
      }
    })
  }

  return (
    <Box sx={{ mb: 3 }}>
      <Grid
        container
        direction='row'
        spacing={1}
        columns={16}
      >
        <Grid item xs={1}>
          <Box sx={{ width: '100%', height: '100%' }}>
            <StyledAccount>
              <Avatar src={`${DJANGO_BASE_URL}${user.profileImage}`} alt='photoURL' />
            </StyledAccount>
          </Box>
        </Grid>
        <Grid item xs={15}>
          <form onSubmit={handleSubmit(onSubmmit)}>
            <StyledStack>
              <Controller
                name='content'
                control={control}
                required
                defaultValue=''
                render={({ field }) => (
                  <StyledTextarea
                    {...field}
                    ref={textareaRef}
                    onChange={e => {
                      handleTextareaChange(e)
                      field.onChange(e)
                    }}
                    style={{ resize: 'none' }}
                    id='comment'
                    placeholder={null}
                  />
                )}
              />
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Stack
                  direction='row'
                >
                  {icon.map((item, index) => (
                    <IconButton
                      key={index}
                      type='button'
                      size='medium'
                      sx={{
                        color: 'text.secondary'
                      }}
                    >
                      <Iconify icon={item} />
                    </IconButton>
                  ))}
                </Stack>
                <IconButton
                  type='submit'
                  disabled={isLoading}
                  sx={{
                    color: 'text.secondary',
                    width: '36px',
                    height: '36px'
                  }}
                >
                  {isLoading
                    ? <CircularProgress size={24} />
                    : <Iconify icon='iconamoon:send-fill' size='large' />}
                </IconButton>
              </Box>
            </StyledStack>
          </form>
        </Grid>
      </Grid>
    </Box>
  )
}

const StyledAccount = styled('div')(({ theme }) => ({
  width: '100%', // 100% of the parent
  height: '100%',
  display: 'flex',
  alignItems: 'start',
  justifyContent: 'end',
  borderRadius: Number(theme.shape.borderRadius) * 1.5
}))

const StyledStack = styled(Stack)(({ theme }) => ({
  width: '100%', // 100% of the parent
  height: '100%',
  padding: theme.spacing(1),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: theme.palette.grey[200]
}))

const StyledTextarea = styled('textarea')(({ theme }) => ({
  width: '100%',
  height: 'auto',
  border: 'none',
  outline: 'none',
  padding: theme.spacing(1),
  backgroundColor: 'transparent',
  fontSize: theme.typography.subtitle2.fontSize
}))

export default PostCommemt

const icon = [
  'uil:smile',
  'uil:camera',
  'uil:location-point'
]
