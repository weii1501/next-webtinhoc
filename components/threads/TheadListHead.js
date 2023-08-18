import React from 'react'
import {TableCell, TableHead, TableRow} from "@mui/material";

function ThreadListHead () {
  return (
    <TableHead>
      <TableRow>
        <TableCell>Topic</TableCell>
        <TableCell align='right'>Posts</TableCell>
        <TableCell align='right'>Likes</TableCell>
        <TableCell align='right'>Views</TableCell>
        <TableCell align='right'>Last Post</TableCell>
      </TableRow>
    </TableHead>
  )
}

export default ThreadListHead
