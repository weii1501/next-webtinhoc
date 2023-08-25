import axios from 'axios'

import { AUTH_TOKEN_GUEST, DJANGO_BASE_URL } from '../constants'

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'
axios.defaults.withCredentials = true

const query = axios.create({
  baseURL: DJANGO_BASE_URL + '/api/',
  timeout: 30000
  // headers: { Authorization: `Basic ${AUTH_TOKEN_GUEST}` }
})

export function getCategoriesSitemap () {
  return query.get('categories/sitemap/')
}

export function getAllThreadsSitemap () {
  return query.get('threads/list/')
}

export function getAllArticlesSitemap () {
  return query.get('articles/list/')
}

export function getAllTagsSitemap () {
  return query.get('tags/')
}
