import { post, get, del, put } from '@sinozur/utils';
import { useQuery } from 'react-query'
export interface AccessDoorParams {
  pageSize?: number,
  pageNum?: number
  keyword?: string
  queryObjectList?: {
    field?: string,
    operateType?: number,
    value?: string
  }[]
}
interface AccessDoorResult {
  pageSize: number,
  pageNum: number,
  total: number,
  dataList: {
    id: string,
    isDel: string,
    createdBy: string,
    createdByName: string,
    createdTime: string,
    updatedBy: string,
    updatedByName: string,
    updatedTime: string,
    brand: string,
    brandName: string,
    code: string,
    name: string,
    warehouseId: string,
    ip: string,
    port: string,
    mask: string,
    gateway: string,
    power: string,
    direction: string,
    alertTime: string,
    unknownIsAlert: string,
    unknownAlertTime: string,
    status: string,
    remark: string
  }[]
  ,
}
interface AddAccessDoor {
  id?: string,
  brand?: string,
  code?: string,
  name?: string,
  warehouseId?: string,
  ip?: string,
  port?: string,
  mask?: string,
  gateway?: string,
  power?: string,
  direction?: string,
  alertTime?: string,
  unknownIsAlert?: string,
  unknownAlertTime?: string,
  remark?: string
}
interface HandGunsResult {
  pageSize: number,
  pageNum: number,
  total: number,
  dataList: {
    id: string,
    isDel: string,
    createdBy: string,
    createdByName: string,
    createdTime: string,
    updatedBy: string,
    updatedByName: string,
    updatedTime: string,
    warehouseId: string,
    brand: string,
    brandName: string,
    code: string,
    name: string,
    ip: string,
    port: string,
    mask: string,
    gateway: string,
    power: string,
    status: string,
    remark: string
  }[]
}
interface AddHandGuns {
  id?: string,
  brand?: string,
  code?: string,
  name?: string,
  ip?: string,
  port?: string,
  mask?: string,
  gateway?: string,
  power?: string,
  status?: string,
  remark?: string
}
export interface ShelfPageParams {
  pageSize?: number,
  pageNum?: number,
  keyword?: string
  queryObjectList?: {
    field?: string,
    operateType?: number,
    value?: string
  }[]
}
interface ShelfPageResult {
  pageSize: number,
  pageNum: number,
  total: number,
  dataList: {
    id: string,
    isDel: string,
    createdBy: string,
    createdByName: string,
    createdTime: string,
    updatedBy: string,
    updatedByName: string,
    updatedTime: string,
    brand: string,
    brandName: string,
    code: string,
    name: string,
    warehouseId: string,
    warehouseName: string,
    type: string,
    ip: string,
    port: string,
    mask: string,
    gateway: string,
    status: string,
    remark: string,
    areaCode: string,
    areaName: string,
    side: string,
    fixedColumnNo: string,
    columnNoRule: string,
    columnCount: string,
    sectionCount: string,
    layerCount: string
  }[]
}
interface AddOrUpdataShelf {
  id?: string,
  brand?: string,
  code?: string,
  name?: string,
  warehouseId?: string,
  type?: string,
  ip?: string,
  port?: string,
  mask?: string,
  gateway?: string,
  remark?: string,
  areaCode?: string,
  areaName?: string,
  side?: string,
  fixedColumnNo?: string,
  columnNoRule?: string,
  columnCount?: string,
  sectionCount?: string,
  layerCount?: string
}
export interface CheckDCarPage {
  pageSize?: number,
  pageNum?: number,
  keyword?: string
  queryObjectList?: {
    field?: string,
    operateType?: number,
    value?: string
  }[]
}
interface CarList {
  id?: string,
  isDel?: string,
  createdBy?: string,
  createdByName?: string,
  createdTime?: string,
  updatedBy?: string,
  updatedByName?: string,
  updatedTime?: string,
  brand?: string,
  brandName?: string,
  code?: string,
  name?: string,
  ip?: string,
  port?: string,
  mask?: string,
  gateway?: string,
  remark?: string
}
interface CheckDCarPageResult {
  pageSize?: number,
  pageNum?: number,
  total?: number,
  dataList?: CarList[]
}
interface ReaderList {
  id?: string,
  isDel?: string,
  createdBy?: string,
  createdByName?: string,
  createdTime?: string,
  updatedBy?: string,
  updatedByName?: string,
  updatedTime?: string,
  warehouseId?: string,
  brand?: string,
  brandName?: string,
  code?: string,
  name?: string,
  ip?: string,
  port?: string,
  mask?: string,
  gateway?: string,
  power?: string,
  status?: string,
  remark?: string
}
interface DeskopReaderResult {
  pageSize?: number,
  pageNum?: number,
  total?: number,
  dataList: ReaderList[]
}
export interface ShelfTreeData {
  id: string,
  type: string,
  name: string,
  parentId: string,
  hasChildren: boolean,
  children: ShelfTreeData[]
}
export interface ShelfGetTreeParams {
  keyword?:string
}
/* ***************************** 通道门******************************* */
// 通道门分页
export const useAccessDoorPage = (params: AccessDoorParams) => {
  return useQuery(['/rfid/device/access/door/info/page', params], async () => {
    return post<AccessDoorResult>('/rfid/device/access/door/info/page', params)
  })
}

// 新增通道门
export const addAccessDoor = (params: AddAccessDoor) => {
  return post('/rfid/device/access/door/info/add', params)
}
// 修改通道门
export const updataAccessDoor = (params: AddAccessDoor) => {
  return post('/rfid/device/access/door/info/updateById', params)
}

// 设置通道门信息
export const setAccessDoorInfo = (params: AddAccessDoor) => {
  return post('/rfid/device/access/door/info/setInfoById', params)
}
// 获取功率列表
export const useGetPowerList = () => {
  return useQuery('info-getPowerList', async () => {
    return get<{ label: string, value: string }[]>('/rfid/device/access/door/info/getPowerList')
  })
}
// 获取品牌列表
export const useGetBrandList = () => {
  return useQuery('info-getBrandList', async () => {
    return get<{ label: string, value: string }[]>('/rfid/device/access/door/info/getBrandList')
  })
}
// 删除通道门条目
export const deleteAccessDoorItems = (id: string) => {
  return del(`/rfid/device/access/door/info/deleteById/${id}`)
}
// 通过id启用
export const goAccessDoorItems = (id: string) => {
  return put(`/rfid/device/access/door/info/enableById/${id}`)
}
// 通过id禁用
export const disableAccessDoorItems = (id: string) => {
  return put(`/rfid/device/access/door/info/disableById/${id}`)
}

/* ***************************** 手持枪******************************* */

// 分页
export const useHandGunrPage = (params: AccessDoorParams) => {
  return useQuery(['hand-guns-page', params], async () => {
    return post<HandGunsResult>('/rfid/device/hand/gun/info/page', params)
  })
}
// 新增
export const addHandGun = (params: AddHandGuns) => {
  return post('/rfid/device/hand/gun/info/add', params)
}
// 修改
export const updataHandGuns = (params: AddHandGuns) => {
  return post('/rfid/device/hand/gun/info/updateById', params)
}
// 设置
export const setHandGuns = (params: AddHandGuns) => {
  return post('/rfid/device/hand/gun/info/setInfoById', params)
}
// 获取功率列表
export const useGetHandGunPowerList = () => {
  return useQuery('guns-info-getPowerList', async () => {
    return get<{ label: string, value: string }[]>('/rfid/device/hand/gun/info/getPowerList')
  })
}
// 获取品牌列表
export const useGetHandGunBrandList = () => {
  return useQuery('guns-info-getBrandList', async () => {
    return get<{ label: string, value: string }[]>('/rfid/device/hand/gun/info/getBrandList')
  })
}
// 删除条目
export const deleteHandGunsItems = (id: string) => {
  return del(`/rfid/device/hand/gun/info/deleteById/${id}`)
}
// 通过id启用
export const goHandGunsItems = (id: string) => {
  return put(`/rfid/device/hand/gun/info/enableById/${id}`)
}
// 通过id禁用
export const disableHandGunsItems = (id: string) => {
  return put(`/rfid/device/hand/gun/info/disableById/${id}`)
}

/* ******************密集架管理***************************** */
// 分页
export const useShelfPage = (params: ShelfPageParams) => {
  return useQuery(['shelving-page', params], async () => {
    return post<ShelfPageResult>('/rfid/device/compact/shelving/info/page', params)
  })
}
//获取品牌列表
export const useShelfBrandList = () => {
  return useQuery(['shelving-page'], async () => {
    return get<{ label: string, value: string }[]>('/rfid/device/compact/shelving/info/getBrandList')
  })
}

// 新增密集架设备
export const addShelf = (params: AddOrUpdataShelf) => {
  return post(`/rfid/device/compact/shelving/info/add`, params)
}
// 修改
export const updataShelf = (params: AddOrUpdataShelf) => {
  return post(`/rfid/device/compact/shelving/info/updateById`, params)
}
// 设置
export const setShelfById = (params: AddOrUpdataShelf) => {
  return post(`/rfid/device/compact/shelving/info/setInfoById`, params)
}
// 删除
export const deleteShelfById = (id: string) => {
  return del(`/rfid/device/compact/shelving/info/deleteById/${id}`)
}
// 启用
export const enableShelfById = (id: string) => {
  return put(`/rfid/device/compact/shelving/info/enable/${id}`)
}
// 禁用、
export const disableShelfById = (id: string) => {
  return put(`/rfid/device/compact/shelving/info/disable/${id}`)
}
// 密集架通风
export const ventilateShelfById = (id: string) => {
  return put(`/rfid/device/compact/shelving/info/ventilate/start/${id}`)
}
// 停止通风
export const stopVentilateShelfById = (id: string) => {
  return put(`/rfid/device/compact/shelving/info/ventilate/stop/${id}`)
}

// 关闭密集架
export const closeByDeviceId = (id: string) => {
  return put(`/rfid/device/compact/shelving/info/closeByDeviceId/${id}`)
}
//树结构-库房、密集架
export const useShelfGetTree = (params:ShelfPageParams) => {
  return useQuery(['shelving-getTree',params], async () => {
    return post<ShelfTreeData[]>('/rfid/device/compact/shelving/info/getTree',params)
  })
}

export interface MijijiaProps  {
  areaCode: string;
  areaName: string;
  brand: string;
  brandName: string;
  code: string;
  columnCount: number;
  columnHeight: number;
  columnLength: number;
  columnNoRule: number;
  columnWidth: number;
  createdBy: string;
  createdByName: string;
  createdTime: string;
  fixedColumnNo: number;
  id: string;
  ip: string;
  isDel: string|number;
  layerCount: string|number;
  mask: string;
  name: string;
  port: string|number;
  remark: string;
  sectionCount: string|number;
  side: string|number;
  status: string|number;
  type: string|number;
  updatedBy: string;
  updatedByName: string;
  updatedTime: string;
  warehouseId: string;
  warehouseName: string;
}
// 根据id查询密集架信息
export function getShelfFindById(id: string) {
  return get<MijijiaProps>(`/rfid/device/compact/shelving/info/findById/${id}`);
}
export function useShelfFindById(id?: string) {
  return useQuery(['shelving-info', id], () => {
    if (id) {
      return getShelfFindById(id)
    }
  })
}

export interface LatticeProps {
  shelvId: string;
  columnNo: string|number;
  shelSideType: string|number;
  sectionNo?: string;
  layerNo?: string;
}

export interface LatticeVOProps {
  bind: string|number;
  bindDesc: string;
  code: string;
  columnNo: string|number;
  id: string;
  isDel: string|number;
  layerNo: string|number;
  name: string;
  sectionNo: string|number;
  shelSideType: string|number;
  shelvId: string;
  shelvName: string;
  warehouseId: string
}
// 获取仓位信息
export const getLatticeInfo = (params : LatticeProps) => {
  return post<LatticeVOProps[]>(`/rfid/lattice/info/getLatticeList`, params)
}

// 根据库房id查询密集架
export const getShelfFindBywarehouse = (warehouseId : string) => {
  return get<{ id: string, brandName: string }[]>(`/rfid/device/compact/shelving/info/listByWarehouse/${warehouseId}`)
}
export const useShelfFindBywarehouse = (warehouseId : string) => {
  return useQuery(['shelving-list-by-warehouseid', warehouseId], () => {
    if (warehouseId) {
      return getShelfFindBywarehouse(warehouseId)
    }
  })
}
/* ****************************盘点车********************************* */
// 分页
export const useCheckCarPage = (params: CheckDCarPage) => {
  return useQuery(['checkout-car-page', params], async () => {
    return post<CheckDCarPageResult>('/rfid/device/inventory/car/info/page', params)
  })
}
// 新增
export const addCarInfo = (params: CarList) => {
  return post(`/rfid/device/inventory/car/info/add`, params)
}
// 修改
export const upDataCarInfo = (params: CarList) => {
  return post(`/rfid/device/inventory/car/info/updateById`, params)
}
// 获取品牌列表
export const useCarBrandList = () => {
  return useQuery(['checkout-car-brand-list'], async () => {
    return get<{ label: string, value: string }[]>('/rfid/device/inventory/car/info/getBrandList')
  })
}
// 设置
export const setCheckCarInfoById = (params: CarList) => {
  return post(`/rfid/device/inventory/car/info/setInfoById`, params)
}
// 删除
export const deleteCheckCarById = (id: string) => {
  return del(`/rfid/device/inventory/car/info/deleteById/${id}`)
}
// 启用
export const enableCheckCarById = (id: string) => {
  return put(`/rfid/device/inventory/car/info/enableById/${id}`)
}
// 禁用、
export const disableCheckCarById = (id: string) => {
  return put(`/rfid/device/inventory/car/info/disableById/${id}`)
}

/* ****************桌面读写器*************** */

export const useDeskopReaderPage = (params: {
  pageSize?: number,
  pageNum?: number
}) => {
  return useQuery(['deskop-reader-page', params], async () => {
    return post<DeskopReaderResult>('/rfid/device/desktop/reader/info/page', params)
  })
}
// 新增
export const addDeskopReaderInfo = (params: ReaderList) => {
  return post(`/rfid/device/desktop/reader/info/add`, params)
}
// 修改
export const updataDeskopReaderInfo = (params: ReaderList) => {
  return post(`/rfid/device/desktop/reader/info/updateById`, params)
}
// 删除
export const deleteDeskopReaderById = (id: string) => {
  return del(`/rfid/device/desktop/reader/info/deleteById/${id}`)
}
// 设置
export const setDeskopReaderInfo = (params: ReaderList) => {
  return post(`/rfid/device/desktop/reader/info/setInfoById`, params)
}
// 品牌
export const useDeskopReaderBrandList = () => {
  return useQuery(['DeskopReader-brand-list'], async () => {
    return get<{ label: string, value: string }[]>('/rfid/device/desktop/reader/info/getBrandList')
  })
}
// 功率
export const useDeskopReaderPowerList = () => {
  return useQuery(['DeskopReader-power-list'], async () => {
    return get<{ label: string, value: string }[]>('/rfid/device/desktop/reader/info/getPowerList')
  })
}
// 启用
export const enableDeskopReaderById = (id: string) => {
  return put(`/rfid/device/desktop/reader/info/enableById/${id}`)
}
// 禁用、
export const disableDeskopReaderById = (id: string) => {
  return put(`/rfid/device/desktop/reader/info/disableById/${id}`)
}

// 通过库房获取密集架集合
export const getWarehouseShelfList = (id: string) => {
  return post<any[]>(`/rfid/device/compact/shelving/info/listByWarehouse/${id}`)
}

// 根据仓位打开密集架
export const openShelfByLatticeId = (latticeId: string) => {
  return put(`/rfid/device/compact/shelving/info/openByLatticeId/${latticeId }`)
}

interface OpenProps {
  deviceId: string;
  columnNo: string|number;
  leftMove?: boolean;
  rightMove?: boolean;
}
// 打开密集架指定列
export const openShelfColumn = (params: OpenProps) => {
  return post(`/rfid/device/compact/shelving/info/move/columnNo`, params)
}


