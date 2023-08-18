import {faker} from '@faker-js/faker'
import slugify from 'slugify'

const TOPICS_TITLE = [
  'Mouse',
  'Stylus',
  'Keyboard',
  'Monitor',
  'Printer',
  'Speaker',
  'Headphone',
  'Microphone',
  'Webcam',
  'Scanner',
  'Projector',
  'Joystick',
  'Gamepad',
  'Touchpad',
  'Trackball',
  'Touchscreen',
  'Graphics Tablet',
  'Digital Camera',
  'Microphone'
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

const topics = SUBCATEGORY_TITLES.map((subcategory, index) => ({
  id: faker.datatype.uuid(),
  subcategory,
  slug: slugify(subcategory.toLowerCase()),
  topics: TOPICS_TITLE.map((topic, index) => ({
    id: faker.datatype.uuid(),
    cover: `/assets/images/covers/cover_${index + 1}.jpg`,
    title: topic,
    slug: slugify(topic.toLowerCase()),
    posts: 20000
  }))
}))

export default topics
