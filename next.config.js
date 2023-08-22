/** @type {import('next').NextConfig} */
require('dotenv').config()
const path = require('path')
const isProd = process.env.NODE_ENV === 'production'
const { i18n } = require('./next-i18next.config')

const nextConfig = {
  i18n,
  reactStrictMode: false,
  compiler: {
    emotion: true
  },
  env: {
    spaceID: process.env.spaceID,
    accessTokenDelivery: process.env.accessTokenDelivery
  },
  distDir: 'build',
  trailingSlash: true,
  assetPrefix: isProd ? 'https://cdn.next-webtinhoc.vercel.app' : undefined,
  images: {
    domains: [
      'localhost',
      '127.0.0.1'
    ]
  },
  modularizeImports: {
    lodash: {
      transform: 'lodash/{{member}}'
    },
    antd: {
      transform: 'antd/{{member}}'
    },
    '@mui/icons-material': {
      transform: '@mui/icons-material/{{member}}'
    }
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false }
    config.module.rules.forEach((rule) => {
      const { oneOf } = rule
      if (oneOf) {
        oneOf.forEach((one) => {
          if (!`${one.issuer?.and}`.includes('_app')) return
          one.issuer.and = [path.resolve(__dirname)]
        })
      }
    })
    return config
  }
}

const plugins = [
]

module.exports = () => {
  return plugins.reduce((acc, next) => next(acc), {
    ...nextConfig
  })
}
