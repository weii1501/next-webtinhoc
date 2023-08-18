import React from 'react'
import { Box, Card, IconButton, Modal } from '@mui/material'
import CardInfoThread from '@/components/thread-handling/CardInfoThread'
import Iconify from '@/components/iconify'
import { FormCreateArticle } from '@/components/articles'
import { getAllTopic, getTags } from '@/apis/apis'

function PreviewThread ({ thread, topics, tags }) {
  const [openModal, setOpenModal] = React.useState(false)
  const handleOpenModal = () => {
    setOpenModal(true)
  }
  const handleCloseModal = () => setOpenModal(false)

  return (
    <>
      <Modal
        keepMounted
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby='keep-mounted-modal-title'
        aria-describedby='keep-mounted-modal-description'
      >
        <Box sx={style}>
          {/* <CardInfoThread thread={thread} /> */}
          <Card sx={{ p: 2 }}>
            {thread &&
              <FormCreateArticle
                topics={topics}
                tags={tags}
                thread={thread}
                update
              />}
          </Card>
        </Box>
      </Modal>
      <IconButton
        onClick={handleOpenModal}
        sx={{
          mr: 1,
          color: 'text.secondary'
        }}
      >
        <Iconify icon='mdi:eye' />
      </IconButton>
    </>
  )
}

export default PreviewThread

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70%',
  boxShadow: 24
}
