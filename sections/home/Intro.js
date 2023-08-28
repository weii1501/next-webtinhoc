import React from 'react'
import ReactHtmlParser from 'react-html-parser'
import { useTheme } from '@mui/material/styles'

function Intro () {
  const theme = useTheme()
  return (
    <section
      className='w-full rounded-lg p-9 bg-gradient-to-b from-gray-900 to-gray-600 rounded-lg'
    >
      <div className='w-full h-auto flex items-center justify-around'>
        <div className='w-[442px] bg-orange-300'>
          <p>
            asdfasd
          </p>
        </div>
      </div>
      <h1
        className='flex items-center justify-center font-bold p-16'
        style={{
          color: theme.palette.grey[100],
          fontSize: '55px',
          textAlign: 'center'
        }}
      >
        {ReactHtmlParser('Chào mừng các bạn <br> đến với trang Webtinhoc')}
      </h1>
    </section>
  )
}

export default Intro
