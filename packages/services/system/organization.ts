import { useQuery } from 'react-query'
import { post, get, del, put } from '@sinozur/utils'

export function getOrganization<T>(): Promise<T> {
  return get<T>(`/api/system/org/getOrgList`);
}

interface RoleData {
  id: string;
  creatorName: string;
  roleCode: string;
  roleName: string;
}
//获取组织下的角色
export function getRoleList(id: string) {
  return get<RoleData[]>(`/api/system/role/findByOrgId/${id}`);
}
