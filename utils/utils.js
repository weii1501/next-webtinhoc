import { MEDIA_URL, SITE_BASE_URL, STATIC_URL } from '../constants'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'
import dayjs from 'dayjs'
import URI from 'urijs'
import TimeAgo from 'react-timeago'
import React from 'react'

export function numberWithCommas (x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export const defaultAvatar = STATIC_URL + 'img/default-avatar.jpg'

export const getMediaURL = (urlParts) => {
  // khi chạy môi trường thật thì thường dùng CDN với đường dẫn tuyệt đối nên hàm này vô dụng
  if (process.env.NODE_ENV === 'production') return urlParts
  if (!urlParts) return ''
  let u = new URI(urlParts)
  if (u.is('relative')) {
    u = u.absoluteTo(MEDIA_URL)
  }
  return u.toString()
}

export function getBase64 (img, callback) {
  const reader = new window.FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}

export const emailPattern = /^([\w!#$%&'*+\-/=?^`{|}~]+\.)*[\w!#$%&'*+\-/=?^`{|}~]+@((((([a-z0-9][a-z0-9-]{0,62}[a-z0-9])|[a-z])\.)+[a-z]{2,6})|(\d{1,3}\.){3}\d{1,3}(:\d{1,5})?)$/i

export const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(emailPattern)
}

export const getFromNowShort = (datetimeStr, showSuffix) => {
  const strings = {
    prefixAgo: '',
    prefixFromNow: null,
    suffixAgo: '',
    suffixFromNow: '',
    seconds: 'mới đây',
    minute: '1 phút',
    minutes: '%d phút',
    hour: '1 giờ',
    hours: '%d giờ',
    day: '1 ngày',
    days: '%d ngày',
    month: '1 tháng',
    months: '%d tháng',
    year: '1 năm',
    years: '%d năm',
    wordSeparator: ' '
  }
  if (showSuffix) {
    strings.suffixAgo = 'trước'
    strings.suffixFromNow = 'trước'
  }
  const formatter = buildFormatter(strings)
  return <TimeAgo date={datetimeStr} formatter={formatter} />
}

export const formatDate = (datetimeStr, dateOnly) => {
  let t = 'HH:mm DD/MM/YYYY'
  if (dateOnly) {
    t = 'DD/MM/YYYY'
  }
  return dayjs(datetimeStr).format(t)
}

export const getFromNowSmart = (datetimeStr, dateOnly) => {
  const hoursDiff = (dayjs() - dayjs(datetimeStr)) / 1000 / 3600
  if (hoursDiff > 24 * 7) {
    return <time dateTime={datetimeStr}>{formatDate(datetimeStr, dateOnly)}</time>
  }
  return getFromNowShort(datetimeStr)
}

export const buildFullUrl = (path, query) => {
  const url = new URI(SITE_BASE_URL)
  if (query) {
    return url.pathname(path).addQuery(query).toString()
  }
  return url.pathname(path).toString()
}

export function numberFormatter (num, digits) {
  try {
    num = parseInt(num)
  } catch (e) {
  }
  const si = [
    { value: 1E15, symbol: 'P' },
    { value: 1E12, symbol: 'T' },
    { value: 1E9, symbol: 'G' },
    { value: 1E6, symbol: 'M' },
    { value: 1E3, symbol: 'K' }
  ]
  for (const i of si) {
    if (num >= i.value) {
      return (num / i.value).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + i.symbol
    }
  }
  return isNaN(num) ? null : num.toString()
}
