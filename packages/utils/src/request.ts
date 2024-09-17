import { message } from 'antd';
import axios from 'axios';
declare const location: any;
declare const window: any;
message.config({
    duration: 2,
    maxCount: 1,
    rtl: false
});
// 创建axios实例并初始化请求配置项
export const AXIOS_INSTANCE = axios.create({
    method: 'GET',
    timeout: 30000,
});
// 请求拦截器
AXIOS_INSTANCE.interceptors.request.use(
  (request: any) => {
    const cookieToken = sessionStorage.getItem('ZZToken')
    request.headers.Token = cookieToken
    return request;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);
// 响应拦截器
AXIOS_INSTANCE.interceptors.response.use(
    // @ts-ignore
    response => {
        let code, msg, data;
        const { data: res, status } = response;
        if (typeof res === 'object' && 'code' in res) {
            code = res?.code;
            msg = res?.msg;
            data = res?.data;
        } else {
            code = status;
            data = response;
        }
        if (code === 0 || code === 200) {
            return Promise.resolve(data);
        }
        const logins = [401];
        if (logins.includes(code)) {
          // @ts-ignore
          if (process.env.NODE_ENV !== 'development') {
            location.href = '/login';
            return undefined
          }
          message.warning('请登录')
          return undefined
        }
        message.destroy();
        message.warning(code === 500 ? '服务器异常，请联系管理员' : msg);
        throw new Error(msg)
    },
    (error: any) => {
        let code: number | string = 500,
            msg: string = '服务器异常，请联系管理员！';
        const { response } = error;
        if (response) {
            const { data } = response;
            if (typeof data === 'string') {
                code = response?.status;
            } else if (typeof data === 'object' && data !== null) {
                const { code: code1, status, msg: msg1, data } = response.data;
                code = code1 || status;
                msg = msg1;
            }
        } else {
            code = error.code;
            msg = error.message;
        }
        const logins = [401];
        message.destroy();
        if (typeof code === 'number' && logins.includes(code)) {
            sessionStorage.clear();
            if (!location.href.includes('/login')) {
              // @ts-ignore
              if (process.env.NODE_ENV !== 'development') {
                location.href = '/login';
                return undefined
              }
            }
        }
        message.warning(code === 500 ? '服务器异常，请联系管理员' : msg);
        throw new Error(msg)
    }
);

/**
 * GET请求
 *
 * @param url         URL
 * @param param       参数
 */
export function get<T>(url: string, param?: any, responseType?: any, headers?: { [key: string]: any }): Promise<T> {
    if (responseType) {
        return AXIOS_INSTANCE({
            method: 'GET',
            url,
            // params: { param: param },
            responseType
        }) as any;
    }
    if (headers) {
        // return AXIOS_INSTANCE({ method: 'GET', url, data: param, headers }) as any;
        return AXIOS_INSTANCE({ method: 'GET', url, data: param, headers }) as any;
    }
    return AXIOS_INSTANCE({
        method: 'GET',
        url,
        params: { param: param }
    }) as any;
}

/**
 * POST请求
 *
 * @param url         URL
 * @param param       参数
 */
export function post<T>(url: string, param?: any, headers?: { [key: string]: any }): Promise<T> {
    if (headers) return AXIOS_INSTANCE({ method: 'POST', url, data: param, headers }) as any;
    return AXIOS_INSTANCE({ method: 'POST', url, data: param }) as any;
}
export function downPost<T>(url: string, param?: any, responseType?: any, headers?: { [key: string]: any }): Promise<T> {
    if (responseType) {
        return AXIOS_INSTANCE({
            method: 'POST',
            url,
            // params: { param: param },
            data: param,
            responseType
        }) as any;
    }
    if (headers) return AXIOS_INSTANCE({ method: 'POST', url, data: param, headers }) as any;
    return AXIOS_INSTANCE({ method: 'POST', url, data: param }) as any;
}
/**
 * DELETE请求
 *
 * @param url         URL
 * @param param       参数
 */
export function del<T>(url: string, param?: any): Promise<T> {
    return AXIOS_INSTANCE({ method: 'DELETE', url, params: { param: param } }) as any;
}

/**
 * PUT请求
 *
 * @param url         URL
 * @param param       参数
 */
export function put<T>(url: string, param?: any, headers?: { [key: string]: any }): Promise<T> {
    if (headers) {
        return AXIOS_INSTANCE({ method: 'PUT', url, data: param, headers }) as any;
    }
    return AXIOS_INSTANCE({ method: 'PUT', url, data: param }) as any;
}

export function jsonp(url: string, param?: any) {
    if (!url) throw new Error('url is necessary');
    const callback: any = 'CALLBACK' + Math.random().toString().substr(9, 18);
    const JSONP = document.createElement('script');
    JSONP.setAttribute('type', 'text/javascript');
    const headEle = document.getElementsByTagName('head')[0];
    let ret = '';
    if (param) {
        if (typeof param === 'string') ret = '&' + param;
        else if (typeof param === 'object') {
            for (let key in param) ret += '&' + key + '=' + encodeURIComponent(param[key]);
        }
        ret += '&_time=' + Date.now();
    }
    JSONP.src = `${url}?callback=${callback}${ret}`;
    return new Promise((resolve, reject) => {
        window[callback] = (r: any) => {
            resolve(r);
            headEle.removeChild(JSONP);
            delete window[callback];
        };
        headEle.appendChild(JSONP);
    });
}

export const METHODS = {
    post,
    get,
    del,
    put,
    jsonp,
    downPost
};
export default AXIOS_INSTANCE;
