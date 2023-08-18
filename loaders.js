import React from 'react'
import ContentLoader from 'react-content-loader'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

export const HomeCardLoader = (props) => (
  <Card className='mb-4'>
    <CardContent>
      <ContentLoader
        speed={2}
        viewBox='0 0 600 80'
        backgroundColor='#cccccc66'
        foregroundColor='#aaaaaa66'
        {...props}
      >
        <circle cx='8' cy='8' r='8' />
        <rect x='25' y='4' rx='3' ry='3' width='80' height='6' />
        <rect x='110' y='4' rx='3' ry='3' width='50' height='6' />

        <rect x='0' y='20' rx='3' ry='3' width='434' height='10' />
        <rect x='0' y='35' rx='3' ry='3' width='320' height='10' />

        <rect x='0' y='55' rx='3' ry='3' width='110' height='6' />
        <rect x='0' y='65' rx='3' ry='3' width='270' height='6' />
      </ContentLoader>
    </CardContent>
  </Card>
)

export const UserCardLoader = (props) => (
  <ContentLoader
    speed={2}
    viewBox='0 0 200 80'
    backgroundColor='#cccccc66'
    foregroundColor='#aaaaaa66'
    {...props}
  >
    <circle cx='15' cy='15' r='15' />
    <rect x='40' y='0' rx='3' ry='3' width='80' height='10' />
    <rect x='40' y='20' rx='3' ry='3' width='100' height='6' />

    <rect x='0' y='50' rx='3' ry='3' width='150' height='10' />
    <rect x='0' y='70' rx='3' ry='3' width='70' height='6' />
  </ContentLoader>
)

export const TopicCommentsListLoader = (props) => (
  <ContentLoader
    speed={2}
    viewBox='0 0 600 140'
    backgroundColor='#cccccc66'
    foregroundColor='#aaaaaa66'
    {...props}
  >
    <circle cx='15' cy='15' r='15' />
    <rect x='40' y='0' rx='3' ry='3' width='180' height='10' />
    <rect x='40' y='20' rx='3' ry='3' width='300' height='6' />

    <circle cx='15' cy='65' r='15' />
    <rect x='40' y='50' rx='3' ry='3' width='220' height='10' />
    <rect x='40' y='70' rx='3' ry='3' width='150' height='6' />

    <circle cx='15' cy='115' r='15' />
    <rect x='40' y='100' rx='3' ry='3' width='480' height='10' />
    <rect x='40' y='120' rx='3' ry='3' width='250' height='6' />
  </ContentLoader>
)

export const MatchHeadlinesLoader = (props) => (
  <ContentLoader
    speed={2}
    viewBox='0 0 200 160'
    backgroundColor='#cccccc66'
    foregroundColor='#aaaaaa66'
    {...props}
  >
    <rect x='0' y='0' rx='3' ry='3' width='120' height='10' />
    <rect x='160' y='0' rx='3' ry='3' width='40' height='30' />
    <rect x='0' y='20' rx='3' ry='3' width='70' height='10' />

    <rect x='0' y='60' rx='3' ry='3' width='50' height='10' />
    <rect x='160' y='60' rx='3' ry='3' width='40' height='30' />
    <rect x='0' y='80' rx='3' ry='3' width='135' height='10' />

    <rect x='0' y='120' rx='3' ry='3' width='80' height='10' />
    <rect x='160' y='120' rx='3' ry='3' width='40' height='30' />
    <rect x='0' y='140' rx='3' ry='3' width='50' height='10' />

  </ContentLoader>
)

export const NewsFeaturedMatchesLoader = (props) => (
  <ContentLoader
    speed={2}
    viewBox='0 0 200 200'
    backgroundColor='#cccccc66'
    foregroundColor='#aaaaaa66'
    {...props}
  >
    <rect x='0' y='0' rx='3' ry='3' width='200' height='150' />

    <rect x='0' y='160' rx='3' ry='3' width='160' height='10' />
    <rect x='0' y='180' rx='3' ry='3' width='90' height='10' />
  </ContentLoader>
)
