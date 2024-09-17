import { useQuery } from 'react-query'
import { post, get, del, put } from '@sinozur/utils'

interface MenuBtn {
  roleId: string;
  menuId: string;
  enableStatus: number;
  buttonIdList: string[];
}

//绑定菜单按钮
export function getMenuButton(params: MenuBtn) {
  return post<null>('/api/system/role/insertOrUpdateButtonBind', params);
}

interface Bind {
  roleId: string;
  menuIdList: string[];
}
//绑定角色权限菜单
export function bindMenu(params: Bind) {
  return post<null>('/api/system/role/bindMenu', params);
}
