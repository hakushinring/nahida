import { useQuery } from 'react-query'
import { post, get } from '@sinozur/utils'

import { Md5 } from 'md5-typescript';
export function updateUserPass<T>(params: { oldPassword: string; newPassword: string }, userName: string): Promise<T> {
  params.newPassword = Md5.init(Md5.init(params.newPassword).toLocaleLowerCase() + userName).toLocaleUpperCase();
  params.oldPassword = Md5.init(Md5.init(params.oldPassword).toLocaleLowerCase() + userName).toLocaleUpperCase();
  return post<T>('/api/system/user/updatePwd', params, { authCode: 'update_pwd' });
}

export interface UserInfo {
  id?: string;
  created?: number;
  creator?: number;
  creatorName?: string;
  modified?: number;
  modifier?: number;
  modifierName?: string;
  userName?: string;
  nickName?: string;
  realName?: string;
  workNo?: string;
  tel?: string;
  orgId?: number;
  orgName?: string;
  loginOrgId?: number;
  loginOrgName?: string;
  loginOrgParentId?: string;
  departmentId?: number;
  departmentName?: string;
  userGradeDesc?:string
}
export function useUserInfo() {
  const token = sessionStorage.getItem('ZZToken')
  return useQuery(['user-info', token], async () => {
      const { loginOrgId, loginOrgParentId, ...args } = await get<UserInfo>('/api/system/user/currentUser')
      return { ...args, loginOrgId: String(loginOrgId), loginOrgParentId: String(loginOrgParentId) }
  })
}
