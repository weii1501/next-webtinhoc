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

const categories = [...Array(8)].map((_, index) => ({
  id: faker.datatype.uuid(),
  cover: `/assets/images/covers/cover_${index + 1}.jpg`,
  title: CATEGORY_TITLES[index],
  slug: slugify(CATEGORY_TITLES[index].toLowerCase()),
  createdAt: faker.date.past(),
  posts: 20000
}))

export default categories
