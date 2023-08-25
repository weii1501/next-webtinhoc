require('dotenv').config()
const path = require('path')
const { i18n } = require('./next-i18next.config')
const isProd = process.env.NODE_ENV === 'production'

const nextConfig = {
  reactStrictMode: false,
  compiler: {
    emotion: true
  },
  env: {
    spaceID: process.env.spaceID,
    accessTokenDelivery: process.env.accessTokenDelivery
  },
  trailingSlash: true,
  distDir: 'build',
  assetPrefix: isProd ? 'https://next-webtinhoc.vercel.app' : undefined,
  images: {
    domains: ['localhost', '127.0.0.1', 'https://next-webtinhoc.vercel.app']
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
  rewrites: async () => [
    {
      source: '/dynamic-sitemap.xml',
      destination: '/dynamic-sitemap'
    }
  ],
  webpack: (config, { isServer }) => {
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

    // if (isServer) {
    //   require('./scripts/sitemap-generator')
    // }

    return config
  },
  i18n
}

const plugins = [
]

module.exports = () => {
  return plugins.reduce((acc, next) => next(acc), {
    ...nextConfig
  })
}
