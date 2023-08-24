import React from 'react'
import { emphasize, styled } from '@mui/material/styles'
import Chip from '@mui/material/Chip'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import {Container, Divider, Stack} from '@mui/material'
import { v4 as uuidv4 } from 'uuid'
import { useRouter } from 'next/router'

const StyledBreadcrumb = styled(Chip)(({ theme }) => ({
  backgroundColor: theme.palette.grey[100],
  height: theme.spacing(3),
  color: theme.palette.text.primary,
  fontWeight: theme.typography.fontWeightRegular,
  '&:hover, &:focus': {
    backgroundColor: emphasize(theme.palette.grey[100], 0.06)
  },
  '&:active': {
    boxShadow: theme.shadows[1],
    backgroundColor: emphasize(theme.palette.grey[100], 0.12)
  }
}))

function BreadcrumbsContainer ({ breadcrumbs, maxWidth }) {
  const router = useRouter()
  const breadcrumbsComponent = breadcrumbs?.map((breadcrumb) => (
    <StyledBreadcrumb
      key={uuidv4()}
      component='a'
      href={breadcrumb.url}
      label={breadcrumb.label}
    />
  ))

  return (
    <Container
      maxWidth={maxWidth || 'lg'}
    >
      <Stack
        direction='row'
        alignItems='start'
        justifyContent='start'
      >
        <Breadcrumbs
          separator='›'
          aria-label='breadcrumb'
        >
          {breadcrumbsComponent}
        </Breadcrumbs>
      </Stack>
      <Divider flexItem sx={{ mb: 2 }} />
    </Container>
  )
}

export default BreadcrumbsContainer
