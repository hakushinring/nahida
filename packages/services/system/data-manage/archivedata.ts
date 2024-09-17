import { post ,get, del, put} from '@sinozur/utils';
import { useQuery } from 'react-query'

export interface RecordParams {
  queryObjectList?:  {
    field?: string,
    operateType?: number,
    value?: string
  }[],
  pageSize ?: number,
  pageNum?: number,
  keyword?: string
  epcList?:string[]
}
export interface InventoryPage {
  queryObjectList?:  {
    field?: string,
    operateType?: number,
    value:string
  }[],
  pageSize?: number,
  pageNum?: number,
  keyword?: string,
  startTime?: number,
  endTime?: number
}
export interface detailsVOList {
  shelvId:number,
  shelvName: string,
  latticeId:number,
  latticeName: string,
  result: string
}
interface InventoryPageResult {
  pageSize:number,
  pageNum:number,
  total:number,
  dataList: [
    {
      id:number,
      isDel:number,
      createdBy:number,
      createdByName: string,
      createdTime:number,
      updatedBy:number,
      updatedByName: string,
      updatedTime:number,
      userId:number,
      userName: string,
      time:number,
      detailsVOList: detailsVOList[]
    }
  ],
}

interface ArchiveResult {
  pageSize?:number,
  pageNum?:number,
  total?:number,
  dataList?: {[key:string]:any}[],
  map?: {[key:string]:any}
}

// 档案数据管理-新增
export function addArchiveData(params: any) {
    return post('/rfid/archives/data/add', params);
}

// 档案数据管理-修改
export function updateArchiveData(params: any, id: string) {
    return post(`/rfid/archives/data/updateById/${id}`, params);
}

// 档案数据管理-删除
export function delArchiveData(id: string) {
  return del(`/rfid/archives/data/deleteById/${id}`);
}

// 档案数据管理-批量删除
export function batchDelArchiveData(params: {idList: string[]}) {
  return post(`/rfid/archives/data/deleteByIdList`, params);
}

// 档案数据管理-批量清空回收站
export function batchDelRecycle(params: {idList: string[]}) {
  return post(`/rfid/archives/data/physicalDeleteByIdList`, params);
}

// 档案数据管理-批量恢复回收站
export function batchRecoverRecycle(params: {idList: string[]}) {
  return post(`/rfid/archives/data/recycleByIdList`, params);
}

interface UpOrDownProps {
  id?: string;
  warehouseId?: string;
  shelvId?: string;
  latticeId?: string;
}

// 档案数据管理-档案倒架
export function archivePour(params: UpOrDownProps) {
  return post(`/rfid/archives/data/shelf/move`, params);
}

// 档案数据管理-档案出库
export function archiveStockRemoval(params: {idList: string[]}) {
  return post(`/rfid/archives/data/outStore`, params);
}


// 标签绑定或者更换
export function byIdBindEpc(code ?:string,id?:string) {
  return put(`/rfid/archives/data/bindEpc/${code}/${id}`);
}

// 标签注销
export function byIdUnbindEpc(id?:string) {
  return put(`/rfid/archives/data/unbindEpc/${id}`);
}
// 档案数据epc编码绑定记录分页查询
export const usePageArchivesDataEpcRecord = (params: RecordParams) => {
  return useQuery(['use-Page-Archives-DataEpc-Record', params],
      async () => {
          const data = await post<ArchiveResult>(`/rfid/archives/data/pageArchivesDataEpcRecord`, params);
          if (data) {
              return data;
          }
      }
  );
}

//档案盘点分页
export const useInventoryPage = (params: InventoryPage) => {
  return useQuery(['use-inventory-Record', params],
      async () => {
          const data = await post<InventoryPageResult>(`/rfid/archives/inventory/page`, params);
          if (data) {
              return data;
          }
      }
  );
}
