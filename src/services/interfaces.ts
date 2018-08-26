export interface IndexObject {
  timestamp: string,
  index_id: string,
  value: string,
  assets: {
    [key: string]: Asset
  }
}

export interface Asset {
  price: number,
  weight: number
}

export interface IndexDataResponse {
  type: string
  data: IndexObject[]
}
