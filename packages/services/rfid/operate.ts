import { useQuery } from 'react-query'
import { post, get, del, put } from '@sinozur/utils'
export interface WorkLoadReport {
  '1'?: number[],
  '2'?: number[],
  '3'?: number[],
  '4'?: number[]

}
interface WorkLoadReportResult {
  all: number,
  operate: string,
  tendency: string,
  yest: number,
  today: number
}
interface ReportList {
  statisticsType: string,
  count: number,
  statisticsOperateMap: { [key: string]: any[] }
}
interface ReportListResult { 
  archivesData_shelfOn:number,
epc_replace:number,
archivesData_shelfOff:number,
epc_registered:number,
epc_logout:number,
archivesData_storeOut:number,
time:string,
archivesData_borrowing:number
}
// 工作量统计
export const useWorkLoadReport = (params: WorkLoadReport) => {
  return useQuery(['useWorkLoadReport', params], async () => {
    return post<WorkLoadReportResult[]>('/rfid/operate/report/getWorkLoadReport', params)
  })
}

// 图表统计信息列表查询
export const useReportList = (params?: ReportList) => {
  return useQuery(['useReportList', params], async () => {
    const data= post<ReportListResult[]>('/rfid/operate/report/getReportList', params)
    if (!data) return []
    return data
  })
}