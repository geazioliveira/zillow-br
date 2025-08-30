import {
  MockPropertiesType,
  PropertyType,
} from '@/components/HeroSection/types'
import { faker } from '@faker-js/faker'

export const createMockProperty = (): MockPropertiesType => {
  return {
    id: faker.database.mongodbObjectId(),
    address: faker.location.streetAddress({ useFullAddress: true }),
    baths: faker.number.int({ min: 1, max: 6 }),
    beds: faker.number.int({ min: 1, max: 6 }),
    image: 'https://picsum.photos/seed/picsum/270/200',
    price: faker.commerce.price(),
    sqft: faker.number.int({ min: 100, max: 1000 }),
    type: faker.helpers.arrayElement([
      PropertyType.FOR_RENT,
      PropertyType.FOR_SALE,
    ]),
  }
}

export const mockProperties = Array.from({ length: 8 }, createMockProperty)
