import { useQuery } from 'react-query'
import { get } from '@sinozur/utils'
export const useSystemInfo = () => {
  return useQuery('platform-system-info', () => {
    return get('/api/platform/systemInfo')
  })
}

interface CurrentUser {
  id: string,
  created: string,
  creator: string,
  creatorName: string,
  modified: string,
  modifier: string,
  modifierName: string,
  userName: string,
  nickName: string,
  realName: string,
  workNo: string,
  tel: string,
  userGrade: string,
  userGradeDesc: string,
  orgId: string,
  orgName: string,
  loginOrgId: string,
  loginOrgName: string,
  loginOrgParentId: string,
  departmentId: string,
  departmentName: string,
  remark: string
}
// 获取当前用户
export const useCurrentUser = () => {
  return useQuery('system-user-currentUser', async () => {
    return get<CurrentUser>(`/api/system/user/currentUser`)
  })
}

export function usePlatformVersion() {
  return useQuery('version', () => {
    return get<{
      id: string;
      name: string;
      version: string;
      serviceCode: string;
      serviceName: string;
      passwordRule: string;
      passwordRuleDesc: string;
      passwordMinSize: string;
      passwordMinLife: string;
      passwordMaxLife: string;
      userLockTime: string;
      userLockThreshold: string;
      userMaxNumber: string;
      orgMaxNumber: string;
      databaseVersion: string;
      serviceVersion: string;
      installDate: string;
      filePath: string;
      systemUptime: string;
    }>(`/api/platform/getPlatformVersion`);
  });
}
