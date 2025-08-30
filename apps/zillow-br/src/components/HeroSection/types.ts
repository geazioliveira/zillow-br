export enum PropertyType {
  FOR_SALE = 'For Sale',
  FOR_RENT = 'For Rent',
}

export interface MockPropertiesType {
  id: string
  image: string
  price: string
  address: string
  beds: number
  baths: number
  sqft: number
  type: PropertyType
}
