import { post } from './axios'
import { Md5 } from 'md5-typescript'

//@ts-ignore
window.login = async (userName, password) => {
  password = Md5.init(Md5.init(password).toLocaleLowerCase() + userName).toLocaleUpperCase();
  const token = await post<string>('/api/system/user/login', { userName, password });
  sessionStorage.setItem('ZZToken', token)
}
//@ts-ignore
window.login2 = async (userName, password) => {
  password = Md5.init(Md5.init(password).toLocaleLowerCase() + userName).toLocaleUpperCase();
  const token = await post<string>('/hrms/system/user/login', { userName, password });
  sessionStorage.setItem('ZZToken', token)
}
