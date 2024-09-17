/* 
 * 层标管理
*/
import { post, get, del, put } from '@sinozur/utils';
import { useQuery } from 'react-query'
export interface LatticePageParams { 
  pageSize?:number,
  pageNum ?:number,
  shelvId?:string,
  bind ?:number,
  code?: string,
  name?: string,
  keyword?: string,
  epcList?:string[]
  queryObjectList?: {
    field?: string,
    operateType?: number,
    value?: string
  }[]
}
export interface LatticeOperateParams {
  queryObjectList?:{
    field?: string,
    operateType?: number,
    value?:string
  }[],
  pageSize?: number,
  pageNum?: number,
  keyword?: string,
  shelvId?: string,
  type?: number
}

interface DataList { 
  id: number,
  isDel: number,
  createdBy: number,
  createdByName: string,
  createdTime: number,
  updatedBy: number,
  updatedByName: string,
  updatedTime: number,
  shelvId: number,
  shelvName: string,
  bind: number,
  bindDesc: string,
  epc: string,
  code: string,
  name: string
}
interface LatticePageData { 
  pageSize:number,
  pageNum:number,
  total:number,
  dataList:DataList[]
}
interface OperateList { 
  sceneId?: string,
  type?: string,
  ip?: string,
  scenarios?: string,
  content?: string,
  operator?: string,
  operatorName?: string,
  operatingTime?: string,
  shelvId?: string,
  shelvName?: string,
  code?: string,
  name?: string,
  epc?: string
}
interface OperateListResult { 
  pageSize: number,
  pageNum: number,
  total: number,
  dataList:OperateList[]
}
// 分页
export const useLatticePage = (params ?: LatticePageParams) => {
  return useQuery(['use-Lattice-Page', params], async () => {
    if (params===undefined || params.shelvId ===undefined) return;
    return post<LatticePageData>('/rfid/lattice/info/page', params)
  })
}
// 标签绑定和更换
export const byCodeAndIdBindEpc = (code: string,id:string) => {
  return put(`/rfid/lattice/info/bindEpc/${code}/${id}`)
}

// 标签注销(解除epc绑定)
export const byCodeAndIdUnbindEpc = (id:string) => {
  return put(`/rfid/lattice/info/unbindEpc/${id}`)
}
// 层标操作分页
export const useLatticeOperatePage = (params ?: LatticeOperateParams) => {
  return useQuery(['use-Lattice-Page', params], async () => {
    if (params===undefined || params.shelvId ===undefined) return;
    return post<OperateListResult>('/rfid/lattice/info/operate/page', params)
  })
}