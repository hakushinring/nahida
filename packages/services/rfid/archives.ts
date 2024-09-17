import { useQuery } from 'react-query'
import { post, get } from '@sinozur/utils'
// 0未入库，1入库，2上架，3借出，4下架，5出库，6销毁，7到期
export type archiveStatus = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7'
export interface ArchiveInfo {
  id: string
  bind: number
  code: string
  epc: string
  status: archiveStatus
  name: string
  is_borrow: number // 0否，1外借
  shelvName: string
  position: string // 档案在密集架位置
}

interface ArchiveListParams {
  latticeId?: string
   warehouseId?: string
   status?: archiveStatus
}
export const useArchiveListByLatticeId = (params: ArchiveListParams) => {
  return useQuery(['archive-list-lattice', params], async () => {
    if (params.latticeId || params.warehouseId) {
      return post<ArchiveInfo[]>('/rfid/archives/data/getListByConditions', params)
    }
  })
}

export const getArchiveByEpc = (epc: string) => {
  return get<ArchiveInfo>(`/rfid/lattice/info/getByEpc/${epc}`)
}

export const archiveMove = (params: { id: string, warehouseId: string, shelvId: string, latticeId: string }) => {
  return post('/rfid/archives/data/shelf/move', params)
}

export const getListByUploadFileId = (fileId: string) => {
  return get<ArchiveInfo[]>(`/rfid/archives/data/getListByUploadFileId/${fileId}`)
}

export interface ArchiveParams {
  warehouseId?: string,
  latticeId?: string,
  recordId?: string,
  status?: string,
  bind?: number,
  keyword?: string,
  customCondition?: {
    [key:string]:any
  },
  queryObjectList?:  {
    field?: string,
    operateType?: number,
    value?: string
  }[],
  pageNum?: number,
  pageSize?: number,
  epcList?:string[]
  isDel?: string,
  orderMap?:{
    [key:string]:any
  }
  name?: string //题名
  code?: string // 档号
}

interface ArchiveResult {
  pageSize?:number,
  pageNum?:number,
  total?:number,
  dataList?: {[key:string]:any}[],
  map?: {[key:string]:any}
}

// 档案数据管理-分页
export const useGetArchivePage = (params?: ArchiveParams) => {
  return useQuery(['get-archive-page', params], async () => {
    if (params) {
      return await post<ArchiveResult>(`/rfid/archives/data/page`, params);
    }
  });
}

interface UpOrDownProps {
  id?: string;
  warehouseId?: string;
  shelvId?: string;
  latticeId?: string;
}

// 档案数据管理-档案上/下架
export function archiveUpOrDown(params: UpOrDownProps, archiveStatus?: archiveStatus) {
  return post(`/rfid/archives/data/shelf/${archiveStatus}`, params);
}

export interface ArchiveBorrowInfo {
  id: string
  borrowerId: string
  code: string
  epc: string
  // 0借阅中 1正常归还 2超期归还 3超期未归还 4待领取
  status: 0 | 1 | 2 | 3 | 4
  name: string
  is_borrow: number // 0否，1外借
  shelvName: string
  position: string // 档案在密集架位置
  borrowTime: number // 单位天
  beginTime: number // 借阅开始时间
}

// 借阅待领取
export const useArchiveBorrowList = (warehouseId?: string) => {
  return useQuery(['archive-borrow-list', warehouseId], async () => {
    if (warehouseId) {
      return await post<ArchiveBorrowInfo[]>(`/rfid/archives/info/borrow/record/list`, { warehouseId, status: '4' });
    }
  });
}

export const useArchiveListByBorrowerId = (borrowerId?: string) => {
  return useQuery(['archive-list-borrowerId', borrowerId], async () => {
    if (borrowerId) {
      return await post<ArchiveBorrowInfo[]>(`/rfid/archives/info/borrow/record/list`, { borrowerId });
    }
  });
}

export const useArchiveBorrows = (params: any) => {
  return useQuery(['archive-list-borrowerId', params], async () => {
    return await post<ArchiveBorrowInfo[]>(`/rfid/archives/info/borrow/record/list`, params);
  });
}

export interface BorrowerInfo {
  id: string
  name: string
  workNo?: string
  department?: string
  job?: string
  idCard?: string
  idNum?: string
  tel?: string
  qqNum?: string
  email?: string
  weChat?: string
  enableStatus?: 0 | 1
}

interface BorrowerListParams {
  queryObjectList?: { field: string, operateType: number, value: unknown }[],
  pageSize?: number
  pageNumber?: number
  keyword?: string
  enableStatus?: number
}
export const useBorrowerList = (params?: BorrowerListParams) => {
  return useQuery(['borrower-list', params], async () => {
    if (params) {
      return await post<BorrowerInfo[]>(`/rfid/archives/info/borrower/list`, params);
    }
  })
}

export const addBorrower = (params: BorrowerInfo) => {
  return post<BorrowerInfo[]>(`/rfid/archives/info/borrower/add`, params);
}
