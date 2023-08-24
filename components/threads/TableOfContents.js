import React from 'react'
import ReactHtmlParser from 'react-html-parser'
import { Typography, Stack, Card, Divider } from '@mui/material'
import { v4 as uuidv4 } from 'uuid'
import Link from 'next/link'

function TableOfContents ({ data }) {
  return (
    <Card
      sx={{
        display: {
          lg: 'none',
          md: 'none',
          sm: 'none',
          xs: 'none',
          xl: 'block'
        },
        position: 'absolute',
        maxWidth: '298px',
        p: 2,
        top: '44px',
        left: 0
      }}
    >
      <Stack
        direction='column'
        alignItems='start'
      >
        <Typography variant='h6' gutterBottom >
            Table of Contents
        </Typography>
        <Divider flexItem mb={2} />
        <HTMLCanvas htmlContent={data.content} />
      </Stack>
    </Card>
  )
}

export default TableOfContents

function HTMLCanvas ({ htmlContent }) {
  // Define an array to store the table of contents items

  // Define a transform function to filter and process the HTML nodes
  const transformNode = (node, index) => {
    if (node.type === 'tag' && node.name === 'h2') {
      const content = {
        id: `heading-${index}`,
        text: node.children[0].children[0].data,
        level: 1
      }
      console.log(node)
      console.log(content)
      return (
        <Typography
          key={uuidv4()}
          variant='body2'
        >
          <Link href={`#${content.id}`}>
            {content.text}
          </Link>
        </Typography>
      )
    } else if (node.type === 'tag' && node.name === 'h3') {
      const content = {
        id: `heading-${index}`,
        text: node.children[0].children[0].data,
        level: 2
      }
      console.log(node)
      console.log(content)
      return (
        <Typography
          key={uuidv4()}
          variant='body2'
          sx={{
            pl: 2
          }}
        >
          <Link href={`#${content.id}`}>
            {content.text}
          </Link>
        </Typography>
      )
    } else if (node.type === 'tag' && node.name === 'h4') {
      const content = {
        id: `heading-${index}`,
        text: node.children[0].children[0].data,
        level: 3
      }
      console.log(node)
      console.log(content)
      return (
        <Typography
          key={uuidv4()}
          variant='body2'
          sx={{
            pl: 4
          }}
        >
          <Link href={`#${content.id}`}>
            {content.text}
          </Link>
        </Typography>
      )
    }

    return <></>
  }

  // Render the table of contents
  return ReactHtmlParser(htmlContent, {
    transform: transformNode
  })
}
