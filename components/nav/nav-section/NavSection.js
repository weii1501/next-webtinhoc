import PropTypes from 'prop-types'
// @mui
import { Box, List, ListItemText } from '@mui/material'
import Link from 'next/link'
//
import { StyledNavItem, StyledNavItemIcon } from './styles'
import { useRouter } from 'next/router'

// ----------------------------------------------------------------------

NavSection.propTypes = {
  data: PropTypes.array
}

export default function NavSection ({ data = [], ...other }) {
  return (
    <Box {...other}>
      <List disablePadding sx={{ p: 1 }}>
        {data?.map((item) => (
          <NavItem key={item?.title} item={item} />
        ))}
      </List>
    </Box>
  )
}

// ----------------------------------------------------------------------

NavItem.propTypes = {
  item: PropTypes.object
}

function NavItem ({ item }) {
  const { title, path, icon, info } = item
  const router = useRouter()
  console.log(router.asPath)
  console.log(path)
  console.log(router.asPath === path)

  return (
    <li>
      <StyledNavItem
        component={Link}
        to={path}
        sx={{
          ...(router.asPath === path && {
            color: 'text.primary',
            bgcolor: 'action.selected',
            fontWeight: 'fontWeightBold'
          })
        }}
      >
        {icon && <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>}

        <ListItemText disableTypography primary={title} />
        {info && info}
      </StyledNavItem>
    </li>
  )
}
