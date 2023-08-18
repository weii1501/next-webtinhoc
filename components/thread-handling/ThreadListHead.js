import React from 'react'
import { TableCell, TableHead, TableRow } from '@mui/material'

function ThreadListHead () {
  return (
    <TableHead sx={{ width: '100%' }}>
      <TableRow>
        <TableCell component='th' scope='row'>
          Tiêu đề
        </TableCell>
        <TableCell align='left'>
          Topic
        </TableCell>
        <TableCell align='left'>
          Người tạo
        </TableCell>
        <TableCell align='left'>
          Trạng thái
        </TableCell>
        <TableCell align='left'>
          Xem
        </TableCell>
      </TableRow>
    </TableHead>
  )
}

export default ThreadListHead
