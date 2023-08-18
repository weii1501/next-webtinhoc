import { faker } from '@faker-js/faker'
import slugify from 'slugify'

const CATEGORY_TITLES = [
  'Hardware',
  'Software',
  'Network',
  'Technology',
  'Education',
  'Politics',
  'Business',
  'Entertainment'
]

const SUBCATEGORY_TITLES = [
  'Input Devices',
  'Output Devices',
  'Storage Devices',
  'Networking Devices',
  'Communication Devices',
  'Processing Devices',
  'Motherboard'
]

const subcategories = CATEGORY_TITLES.map((category, index) => ({
  id: faker.datatype.uuid(),
  category,
  slug: slugify(category.toLowerCase()),
  subcategories: SUBCATEGORY_TITLES.map((subcategory, index) => ({
    id: faker.datatype.uuid(),
    cover: `/assets/images/covers/cover_${index + 1}.jpg`,
    title: subcategory,
    slug: slugify(subcategory.toLowerCase()),
    posts: 20000
  }))
}))

export default subcategories
