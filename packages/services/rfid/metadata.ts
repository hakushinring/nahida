import { post ,get, del, put} from '@sinozur/utils';
import { useQuery } from 'react-query'
interface FieldList {
  id?: string,
  isDel?: string,
  createdBy?: string,
  createdByName?: string,
  createdTime?: string,
  updatedBy?: string,
  updatedByName?: string,
  updatedTime?: string,
  orgId?: string,
  orgName?: string,
  fieldName?: string,
  fieldType?: string,
  fieldDesc?: string,
  fieldLength?: string,
  isSort?: string,
  sortType?: string,
  isNull?: string,
  isDefault?: string,
  isApply?: string
}
// 元数据维护-分页
export const useGetMetadataPage = (params: any) => {
  return useQuery(['get-metadata-page', params],
    async () => {
      const data: any = await post(`/rfid/metadata/info/config/page`, params);
      if (data) {
        return data;
      }
    }
  );
}

// 根据字段名判断元数据
export function getDetailByField(fieldName : string)  {
  return get(`/rfid/metadata/info/config/getSameFieldList/${fieldName}`);
}

interface MetadataProps {
  id?: string;
  fieldName?: string;
  fieldType?: string;
  fieldDesc?: string;
  fieldLength?: number;
  isSort?: string;
  sortType?: string;
  isDefault?: string;
  isApply?: string;
  isNull?: string;
  isMultiplexing?: string;
}

// 元数据维护-新增
export function addMetadata(params: MetadataProps) {
  return post('/rfid/metadata/info/config/add', params);
}

// 元数据维护-修改
export function updateMetadata(params: MetadataProps) {
  return post('/rfid/metadata/info/config/updateById', params);
}

// 元数据维护-删除
export function delMetadata(id?: number) {
  return del(`/rfid/metadata/info/config/deleteById/${id}`);
}

// 元数据维护-批量修改
export function batchUpdate(params: {idList: string[]}) {
  return post('/rfid/metadata/info/config/deleteByIdList', params);
}

// 元数据维护-批量应用
export function batchApply(params: {idList: string[]}) {
  return post('/rfid/metadata/info/config/applyByIdList', params);
}

// 获取已应用字段列表
export function useGetApplyFields() {
  return useQuery('get-apply-fields', async() => {
    return await get<FieldList[]>('/rfid/metadata/info/config/field/list');
  });
}
