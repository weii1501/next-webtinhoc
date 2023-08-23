import React, { useEffect, useTransition } from 'react'
import { Box, Button, Card, Stack, TextField, Typography } from '@mui/material'
import Iconify from '@/components/iconify'
import { useTheme } from '@mui/material/styles'
import dynamic from 'next/dynamic'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { useRouter } from 'next/router'
import { postThread } from '@/apis/apis'
import { toast } from 'react-toastify'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

const TOOLBAR_OPTIONS = [
  [{ list: 'ordered' }, { list: 'bullet' }],
  ['bold', 'italic', 'underline'],
  [{ align: [] }],
  ['image', 'blockquote'],
  ['clean']
]

const schema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  content: Yup.string().required('Content is required')
})

const styled = {
  width: '70%',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  boxShadow: 24
}

function ThreadForm ({ thread }) {
  const router = useRouter()
  const { topic } = router.query
  const [send, startSend] = useTransition()
  const {
    control,
    handleSubmit,
    setFocus,
    formState: {
      errors
    }
  } = useForm({
    resolver: yupResolver(schema)
  })
  const theme = useTheme()
  useEffect(() => {
    if (errors.title) {
      setFocus('title', { shouldSelect: true })
    } else if (errors.content) {
      setFocus('content', { shouldSelect: true })
    }
  }, [errors])

  const onSubmit = (data) => {
    // console.log(data)
    const cleanedContent = data.content.replace(/<p>/g, '').replace(/<\/p>/g, '')
    const sendData = {
      topic,
      title: data.title,
      content: cleanedContent
    }
    startSend(() => {
      postThread(sendData).then(res => {
        // console.log(res.data)
        toast.success('Câu hỏi của bạn sẽ được duyệt', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000
        })
      })
    })
  }
  return (
    <Box sx={styled}>
      <Card sx={{ p: 2 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            control={control}
            name='title'
            required
            render={({ field }) => (
              <TextField
                id='outlined-basic'
                label='Tiều đề'
                variant='standard'
                fullWidth
                value={field.value ?? ''}
                onChange={(e) => {
                  field.onChange(e.target.value)
                }}
              />
            )}
          />
          <Stack direction='column' alignItems='start' justifyContent='start' mt={3}>
            <Typography variant='caption' gutterBottom>
              Nội dung bài viết
            </Typography>
            <Box
              sx={{
                mb: 1,
                width: '100%',
                '& .ql-toolbar': {
                  backgroundColor: '#f0f2f5'
                },
                '& .ql-editor': {
                  maxHeight: 500
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
                },
                '& .ql-snow .ql-editor img': {
                  display: 'flex',
                  margin: 'auto',
                  maxWidth: 2,
                  maxHeight: 500,
                  my: 2,
                  borderRadius: 2,
                  boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                  cursor: 'pointer'
                }
              }}
            >
              <Controller
                control={control}
                name='content'
                required
                render={({ field }) => (
                  <ReactQuill
                    theme='snow'
                    value={field.value}
                    modules={{
                      toolbar: TOOLBAR_OPTIONS
                    }}
                    onChange={field.onChange}
                    placeholder='Nội dung bài viết'
                  />
                )}
              />
            </Box>
            <Typography variant='body2' gutterBottom sx={{ mt: 0 }}>
              <strong>Chú ý:</strong> Bài viết sẽ được duyệt trước khi được hiển thị trên website.
            </Typography>
            <Button
              type='submit'
              variant='contained'
              startIcon={<Iconify icon='material-symbols:cloud-upload' />}
            >
              Lưu bài viết
            </Button>
          </Stack>
        </form>
      </Card>
    </Box>
  )
}

export default ThreadForm
