import { post} from '@sinozur/utils';
export function uploadFile(params: { file: File }): Promise<{fileId:string}> {
    return post(
        '/ecs/repos/getStoragePath',
        {
            ...params
        },
        { 'Content-Type': 'multipart/form-data' }
    );
}

export function uploadFileEAM(params: { file: File }): Promise<string> {
    return post(
        '/rfid/repos/getStoragePath',
        {
            ...params
        },
        { 'Content-Type': 'multipart/form-data' }
    );
}
export function LargeFileUploadMethod(params: FormData) {
  return post('/rfid/file/upload', params,{  'Content-type': 'application/x-www-form-urlencoded' });
} 