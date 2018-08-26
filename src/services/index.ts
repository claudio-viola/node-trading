import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import {
  IndexDataResponse
} from './interfaces'
import indexData from './index_static_dataset'

export async function getIndex (): Promise<IndexDataResponse> {
  if (process.env.INDEX_API_ENDPOINT) {
    return downloadIndex()
  }
  return indexData
}

async function downloadIndex (): Promise<IndexDataResponse> {
  try {
    const AxiosRequestObj: AxiosRequestConfig = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'GET',
      url:  `${process.env.INDEX_API_ENDPOINT}`
    }
    const res = await axios(AxiosRequestObj)
    return res.data as IndexDataResponse
  } catch (error) {
    throw error
  }
}
