'use client'
import React, { useContext, useState } from 'react'
import { filter } from 'lodash'
import {
  Card,
  Container,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material'
import ThreadListToolbar from '@/components/thread-handling/ThreadListToolbar'
import ThreadListHead from '@/components/thread-handling/ThreadListHead'
import { adminGetAllThreads, getAllTopic, getTags } from '@/apis/apis'
import { v4 as uuidv4 } from 'uuid'
import Link from 'next/link'
import Approve from '@/components/thread-handling/Approve'
import PreviewThread from '@/components/thread-handling/PreviewThread'
import { Context } from '@/hooks/context'

function ConsiderPage () {
  const { user } = useContext(Context)
  const [threads, setThreads] = React.useState([])

  const [topics, setTopics] = React.useState([])

  const [tags, setTags] = React.useState([])

  React.useEffect(() => {
    getAllTopic().then(res => {
      const newArr = res.data.map(category => {
        return category.topics.map(topic => {
          return {
            ...topic,
            category: category.name
          }
        })
      })
      const mergedArray = newArr.reduce((accumulator, current) => {
        return [...accumulator, ...current]
      }, [])
      setTopics(mergedArray)
    })
    getTags().then(res => {
      // console.log(res.data)
      setTags(res.data.data)
    })
  }, [])

  React.useEffect(() => {
    adminGetAllThreads().then(res => {
      // console.log(res.data)
      setThreads(res.data)
    })
  }, [])

  const [open, setOpen] = useState(null)

  const [page, setPage] = useState(0)

  const [order, setOrder] = useState('asc')

  const [selected, setSelected] = useState([])

  const [orderBy, setOrderBy] = useState('name')

  const [filterName, setFilterName] = useState('')

  const [rowsPerPage, setRowsPerPage] = useState(5)

  // const handlePreview = (thread) => {
  //   setPreview(thread)
  //   setOpenModal(true)
  // }

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget)
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = threads.map((n) => n.name)
      setSelected(newSelecteds)
      return
    }
    setSelected([])
  }

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name)
    let newSelected = []
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1))
    }
    setSelected(newSelected)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setPage(0)
    setRowsPerPage(parseInt(event.target.value, 10))
  }

  const handleFilterByName = (event) => {
    setPage(0)
    setFilterName(event.target.value)
  }

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - threads.length) : 0

  const filteredThreads = applySortFilter(threads, getComparator(order, orderBy), filterName)

  const isNotFound = !filteredThreads.length && !!filterName

  return (
    <>

      <Container
        sx={{
          mb: 4
        }}
      >
        <Typography variant='h3' gutterBottom mb={2}>
          Xét duyệt câu hỏi
        </Typography>
        <Divider />
      </Container>
      {user?.groups?.includes('admin')
        ? <Container>
          <Card>
            <ThreadListToolbar
              numSelected={selected.length}
              filterName={filterName}
              onFilterName={handleFilterByName}
            />
            <TableContainer sx={{ width: '100%' }}>
              <Table>
                <ThreadListHead />
                <TableBody>
                  {/* eslint-disable-next-line array-callback-return */}
                  {filteredThreads.length > 0 && filteredThreads.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    // const { title, topic, user, status } = row
                    return (
                      <TableRow
                        hover
                        key={uuidv4()}
                        tabIndex={-1}
                        role='checkbox'
                        sx={{ cursor: 'pointer' }}
                      >
                        <TableCell component='th' scope='row' padding='1'>
                          <Typography
                              variant='subtitle2'
                              noWrap
                              sx={{
                                '&:hover': {
                                  color: 'primary.main',
                                  textDecoration: 'underline'
                                }
                              }}
                            >
                              <Link
                                href={`/thread/${row.slug}`}
                                target='_blank' rel='noreferrer'
                              >
                                {row.title}
                              </Link>
                            </Typography>
                        </TableCell>

                        <TableCell align='left'>{row?.topic?.title}</TableCell>
                        <TableCell align='left'>{row?.user?.username}</TableCell>
                        <TableCell align='left'>
                          <Approve thread={row} />
                        </TableCell>
                        <TableCell align='left'>
                          <PreviewThread
                              thread={row}
                              topics={topics}
                              tags={tags}
                            />
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align='center' colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                              textAlign: 'center'
                            }}
                        >
                          <Typography variant='h6' paragraph>
                              Not found
                            </Typography>

                          <Typography variant='body2'>
                              No results found for &nbsp;
                              <strong>&quot;{filterName}&quot;</strong>.
                              <br /> Try checking for typos or using complete words.
                            </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component='div'
              count={threads.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Card>
          </Container>
        : <Container>
          {console.log(user)}
          <Typography variant='h3' gutterBottom mb={2}>
            Bạn không có quyền truy cập
          </Typography>
          </Container>}

    </>
  )
}

export default ConsiderPage

function descendingComparator (a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

function getComparator (order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

function applySortFilter (array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) return order
    return a[1] - b[1]
  })
  if (query) {
    return filter(array, (_user) => _user.title.toLowerCase().indexOf(query.toLowerCase()) !== -1)
  }
  return stabilizedThis.map((el) => el[0])
}
