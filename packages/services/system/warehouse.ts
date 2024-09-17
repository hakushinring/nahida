import { post ,get, del, put} from '@sinozur/utils';
import { useQuery } from 'react-query'
interface WarehouseList     {
  id: string,
  created: string,
  creator: string,
  creatorName: string,
  modified: string,
  modifier: string,
  modifierName: string,
  warehouseCode: string,
  warehouseName: string,
  responsibleId: string,
  responsibleName: string,
  warehouseArea: string,
  storagePath: string,
  orgName: string,
  orgId: string,
  serviceList: any[],
  serviceCode: string,
  warehouseLocation: string,
  remark: string,
  enableStatus: string,
  enableStatusDesc: string,
  modelPath: string
}
// 通过组织单位id查询库房信息
export const useWarehouseList = (id?: string) => {
  return useQuery(['warehouse-manage-getWarehouseListByOrgId',id], async () => {
    if (id === undefined) return []

    return get<WarehouseList[]>(`/warehouse/warehouse/manage/getWarehouseListByOrgIdAndServiceCode/1/${id}`)
  })
}

interface ReportPageProps {

}

// 库房管理-分页
export const useGetReportPage = (params: any) => {
    return useQuery(['get-report-page', params],
        async () => {
            const data: any = await post(`/warehouse/warehouse/manage/page`, params);
            if (data) {
                return data;
            }
        }
    );
}

interface ReportProps {
    id?: string;
    warehouseCode?: string;
    warehouseName?: string;
    storagePath?: string;
    warehouseArea?: string;
    orgId?: string;
    responsibleId?: string;
    serviceList?: string[];
    warehouseLocation?: string;
    remark?: string;
    modelPath?: string;
  }

// 库房管理-新增
export function addReport(params: ReportProps) {
    return post('/warehouse/warehouse/manage/add', params);
}

// 库房管理-编辑
export function updateReport(params: ReportProps) {
    return post('/warehouse/warehouse/manage/updateById', params);
}

// 库房管理-删除
export function delReport(id?: number) {
  return del(`/warehouse/warehouse/manage/deleteById/${id}`);
}

//库房启用
export function enableReport(id : string) {
  return put(`/warehouse/warehouse/manage/enable/${id}`);
}

//库房禁用
export function disabledReport(id : string) {
  return put(`/warehouse/warehouse/manage/disable/${id }`);
}

// 获取所有单位列表
export function useAllOrgList() {
  return useQuery('org-list', async () => {
    return await get<any[]>(`/api/system/org/getOrgList`);
  });
}

// 获取用户名
export function useMatchRealName(realName?: string) {
  return useQuery(['match-real-name', realName], async () => {
      if (realName) {
          const data = await get<{ id: string; realName: string }[]>(`/api/system/user/matchRealName/${realName}`);
          return data;
      }
      return [];
  });
}
export interface StoryItem {
  id: string
  orgName: string
  orgId: string
  // 负责人的
  responsibleName: string
  userId: string
  // 库房名称
  warehouseName: string
  warehouseCode: string
  serviceList: { label: string, value: string }[]
  warehouseLocation: string
  remark: string
  enableStatus: number
  enableStatusDesc: string
}
// 获取组织架构下所有仓库列表，如果要区分库房开启状态请使用 useWarehouseList
export function useStoryList (orgId?: string|number) {
  return useQuery (['/store/room/getStoreRoomListByOrgId', orgId], () => {
    if (orgId) {
      return get<StoryItem[]>(`/warehouse/warehouse/manage/getWarehouseListByOrgId/${orgId}`)
    }
    return []
  })
}
