'use client'
import React, { useTransition } from 'react'
import { Box, Button, Stack } from '@mui/material'
import 'react-quill/dist/quill.snow.css'
import dynamic from 'next/dynamic'
import { useTheme } from '@mui/material/styles'
import Iconify from '@/components/iconify'
import { Controller, useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { postReplies } from '@/apis/apis'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

const TOOLBAR_OPTIONS = [
  [{ list: 'ordered' }, { list: 'bullet' }],
  ['bold', 'italic', 'underline'],
  [{ align: [] }],
  ['image', 'blockquote'],
  ['clean']
]
function PostAnswerReply ({ reply, setReplies, setAnswers, answers, index, setOpenAnswer }) {
  const router = useRouter()
  const [send, startSend] = useTransition()
  const { slug } = router.query
  const theme = useTheme()
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm()
  const onSubmit = (data) => {
    const cleanedContent = data.content.replace(/<p>/g, '').replace(/<\/p>/g, '')
    // console.log(cleanedContent)
    const sendData = {
      thread_id: slug.split('.').reverse()[0],
      reply_id: reply.id,
      content: cleanedContent
    }
    startSend(() => {
      postReplies(sendData).then(res => {
        const newAnswer = [...answers, res.data]
        // console.log(res.data)
        setOpenAnswer(false)
        setAnswers(newAnswer)
        setReplies(prev => {
          prev[index] = {
            ...reply,
            children: newAnswer
          }
          // console.log(prev)
          return prev
        })
      })
    })
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack direction='column' alignItems='end' justifyContent='start' my={1}>
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
              <textarea
                theme='snow'
                id={`content-${reply.id}`}
                value={field.value || ''}
                onChange={field.onChange}
                placeholder='Nội dung bài viết'
                style={{
                  width: '100%',
                  minHeight: '70px',
                  padding: '8px',
                  fontSize: '12px',
                  border: `1px solid ${theme.palette.divider}`
                }}
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

export default PostAnswerReply
