import { useQuery } from 'react-query'
import { post, get, del, put } from '@sinozur/utils'

export interface Button {
  id: string;
  menuId: string;
  name: string;
  code: string;
  authStatus: number;
}

interface MenuItem {
  id: string
  menuUrl: string
  menuName: string
  menuCode: string
  menuIcon: string,
  childrenList: MenuItem[] | null
}

interface MenuTreeNode {
  id: string,
  key: string,
  icon?: string,
  label: string,
  url: string,
  children?: MenuTreeNode[] | null
}

export interface MenuTree {
  id: string;
  parentId: string | number;
  serviceCode: string;
  menuName: string;
  menuCode: string;
  menuUrl: string;
  menuIcon: string;
  modified: string;
  buttonList: Button[];
  childCreatable: number;
  childrenList?: MenuTree[];
}

const transform = (list: MenuItem[]): MenuTreeNode[] | undefined => {
  const menus: MenuTreeNode[] = []
  list?.forEach(node => {
    const { id, menuUrl, menuName, menuCode, menuIcon, childrenList } = node
    const url = menuUrl
    menus.push({
      id,
      key: `${id}.${menuCode}`,
      icon: menuIcon,
      label: menuName,
      url,
      children: childrenList && transform(childrenList),
    })
  })
  return menus.length > 0 ? menus : undefined
}
export function useUserMenuTree() {
  return useQuery('rfid-user-menu-tree', async () => {
    const menus = await get<MenuItem[]>(`/api/system/menu/getUserMenuTree/PRMS`)
    return transform(menus)
  })
}

export function delMenuList(id: string) {
  return del(`/api/system/menu/deleteById/${id}`);
}

//菜单启用
export function enableMenu(id : string) {
  return put(`/api/system/menu/enableById/${id}`);
}

//菜单禁用
export function disabledMenu(id : string) {
  return put(`/api/system/menu/disabled/${id }`);
}

// 获取开通的系统
export function useServiceList() {
  return useQuery(['get-service-list'], async () => {
    return await get<any[]>(`/api/platform/getServiceList`)
  });
}

export function useAllServiceList() {
  return useQuery('service', () => {
      return get<{ serviceCode: string; serviceName: string }[]>(`/api/platform/getAllServiceList`);
  });
}

export interface MenuList {
  id?: string;
  parentId?: string;
  serviceCode?: string;
  menuName?: string;
  menuCode?: string;
  menuUrl?: string;
  menuIcon?: string;
  menuType?: string|number;
  orderNum?: string;
  remark?: string;
  hasChildren?: boolean;
  buttonList?: Button[];
}

// 获取服务下的菜单列表
export function useMenuListByCode(menuCode : string) {
  return useQuery(['get-menu-code-list', menuCode ], async () => {
      if(menuCode) {
          let data = await get<MenuList[]>(`/api/system/menu/conf/getMenuConfigList/${menuCode}`);
          return data;
      }
  });
}

// 新增菜单
export function addMenuList(params: MenuList) {
  if (!params.parentId) {
    params.parentId = '0'
  }
  return post('/api/system/menu/add', params);
}

export function editMenuList(params: MenuList) {
  return post('/api/system/menu/updateById', params);
}

// 获取对应资源下的菜单
export function useConfMenuTree(serviceCode: string) {
  return useQuery(['menuTree', serviceCode], async () => {
              if (serviceCode !== '') {
          let data = await get<MenuTree[]>(`/api/system/menu/getConfMenuTree/${serviceCode}`);
          data = data.map(item => {
              return { ...item, children: item.childrenList ? [] : undefined };
          });
          return data;
      }
  });
}

//菜单分页
export function useMenuData(roleId: string) {
  return useQuery(['menu', roleId], async () => {
      if (!roleId) {
          return [];
      }
      const data = await get<MenuTree[]>(`/api/system/menu/getRoleMenuTree/${roleId}`);
      return (
          data?.map(item => {
              return { ...item, children: item.childrenList ? [] : undefined };
          }) || []
      );
  });
}

export interface SortParams {
  id?: string
  type: 'up' | 'down'
}
// 菜单排序
export function menuSortById (ids: string[]) {
  const sorterList = ids.map((id, i) => {
    return { id, orderNum: i }
  })
  return post(`/api/system/menu/sortById`, { sorterList })
}
