'use client'
import React, { useContext, useTransition } from 'react'
import { Box, Button, Stack } from '@mui/material'
import 'react-quill/dist/quill.snow.css'
import dynamic from 'next/dynamic'
import { useTheme } from '@mui/material/styles'
import Iconify from '@/components/iconify'
import { Controller, useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { postReplies } from '@/apis/apis'
import useWebSocket from '@/hooks/useWebSocket'
import { Context } from '@/hooks/context'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

const TOOLBAR_OPTIONS = [
  [{ list: 'ordered' }, { list: 'bullet' }],
  ['bold', 'italic', 'underline'],
  [{ align: [] }],
  ['image', 'blockquote'],
  ['clean']
]
function PostReply ({ setOpenAnswer, setReplies, data }) {
  const { sendMessage } = useWebSocket('notifications')
  const router = useRouter()
  const [send, startSend] = useTransition()
  const { slug } = router.query
  const theme = useTheme()
  const { user } = useContext(Context)
  // console.log(store)

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm()
  const onSubmit = (dataForm) => {
    const cleanedContent = dataForm.content.replace(/<p>/g, '').replace(/<\/p>/g, '')
    // console.log(cleanedContent)
    const sendData = {
      thread_id: slug.split('.').reverse()[0],
      content: cleanedContent
    }
    startSend(() => {
      postReplies(sendData).then(res => {
        // console.log(res.data)
        setOpenAnswer(false)
        setReplies(prev => [res.data, ...prev])
        const notification = {
          from: user?.id,
          to: data.user?.id,
          thread: data?.id,
          message: `has replied to your thread`
        }
        console.log(notification)
        sendMessage(notification)
      })
    })
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack direction='column' alignItems='end' justifyContent='start' mt={3}>
        <Box
          sx={{
            mb: 1,
            width: '100%',
            '& .ql-toolbar': {
              backgroundColor: '#f0f2f5'
            },
            '& .ql-container': {
              minHeight: '300px',
              color: theme.palette.text.primary
            },
            '& ::placeholder': {
              color: `${theme.palette.text.primary} !important`
            },
            '& .ql-active': {
              color: `${theme.palette.primary.main} !important}`
            },
            '& .ql-editor.ql-blank::before': {
              color: `${theme.palette.text.primary} !important`
            }
          }}
        >
          <Controller
            control={control}
            name='content'
            render={({ field }) => (
              <ReactQuill
                theme='snow'
                value={field.value || ''}
                modules={{
                  toolbar: TOOLBAR_OPTIONS
                }}
                onChange={field.onChange}
                placeholder='Nội dung bài viết'
              />
            )}
          />
        </Box>
        <Button
          type='submit'
          disabled={send}
          variant='contained'
          startIcon={<Iconify icon='ic:round-question-answer' />}
        >
          Trả lời
        </Button>
      </Stack>
    </form>
  )
}

export default PostReply
