import axios from 'axios';
export function startRead() {
  return axios.get('http://localhost:7000/epc/reader/startRead')
}
// 获取EPC,单条获取绑定
export function getLastEpc() {
  return axios.get('http://localhost:7000/epc/reader/getSingleLastEpc').then((res: any) => {
    return res.data.data;
   })
}
// 启动读写器,读取多条记录
export function startReadBatch() {
  return axios.get('http://localhost:7000/epc/reader/startReadBatch')
}

// 停止读写器,读取多条记录
export function stopReadBatch() {
  return axios.get('http://localhost:7000/epc/reader/stopReadBatch')
}

// 获取多条EPC记录
export function getBatchLastEpc() {
  return axios.get('http://localhost:7000/epc/reader/getBatchLastEpc').then((res: any) => {
    return res.data.data;
  })
}
