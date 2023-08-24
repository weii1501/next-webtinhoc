/** @type {import('next-i18next').UserConfig} */
module.exports = {
  debug: process.env.NODE_ENV === 'development',

  i18n: {
    defaultLocale: 'vi',
    locales: ['en', 'vi'],
    localeDetection: false
  },

  localePath:
      typeof window === 'undefined'
        ? require('path').resolve('./public/locales')
        : '/locales',
  reloadOnPrerender: process.env.NODE_ENV === 'development'
}
