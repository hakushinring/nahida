import { useQuery } from 'react-query'
import { get, post } from '@sinozur/utils'



/* excel条目导入 */
export function getItemImportExcel(params: {fileId: string}) {
  return get(`/rfid/file/excel/analysis?fileId=${params.fileId}`);
}

export interface MappingProps {
  sheetIndex: string|number;
  source: string[];
  target: string[];
}
export interface ImportProps {
  fileId: string;
  importType: string|number;
  repeatAction: string|number;
  fieldMapping: MappingProps
}
// 导入
export function importData(params: ImportProps) {
  return post('/rfid/file/import', params);
}

export interface SecondProps 
{
  field?: string;
  operateType: string|number;
  value:  string;
}
export interface ImportDataProps {
  queryObjectList: SecondProps[],
  pageSize: number;
  pageNum: number;
  keyword: string;
}

interface PagePropsVO {

}

// 数据导入记录-分页
export const useGetImportDataPage = (params: ImportDataProps) => {
  return useQuery(['get-import-data-page', params],
      async () => {
          const data: any = await post(`/rfid/record/archives/data/import/record/page/2`, params);
          if (data) {
              return data;
          }
      }
  );
}