import axios, { AxiosError, Method } from 'axios';

import { isDevelopment } from '../../scripts/env';

import config from '@/config/constants';

export interface BaseResponse<T> {
    code: number | string;
    message: string;
    data: T;
    success?: boolean;
    msg?: string;
}

axios.defaults.withCredentials = true;
axios.defaults.timeout = 100000;
axios.defaults.baseURL = config.api;

/**
 * @desc http request 请求前拦截器
 */
axios.interceptors.request.use(
    config => {
        config.data = JSON.stringify(config.data);
        config.headers = {
            'Content-Type': 'application/json',
        };
        return config;
    },
    error => {
        return Promise.reject(error);
    },
);

/**
 * @desc http response 请求后拦截器
 */
axios.interceptors.response.use(
    response => {
        // TODO: 这里可以做些处理
        return response;
    },
    error => {
        // eslint-disable-next-line
        console.log('请求出错：', error);
    },
);

/**
 * @desc 封装get方法
 * @param url  请求url
 * @param params  请求参数
 * @returns {Promise}
 */
export function get<T = {}>(url: string, params = {}): Promise<BaseResponse<T>> {
    return new Promise((resolve, reject) => {
        axios
            .get(url, {
                params: params,
            })
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

/**
 * @desc 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post<T = {}>(url: string, data = {}): Promise<BaseResponse<T>> {
    return new Promise((resolve, reject) => {
        axios.post(url, data).then(
            response => {
                //关闭进度条
                resolve(response.data);
            },
            err => {
                reject(err);
            },
        );
    });
}

/**
 * @desc 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function patch<T = {}>(url: string, data = {}): Promise<BaseResponse<T>> {
    return new Promise((resolve, reject) => {
        axios.patch(url, data).then(
            response => {
                resolve(response.data);
            },
            err => {
                msag(err);
                reject(err);
            },
        );
    });
}

/**
 * @desc 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put<T = {}>(url: string, data = {}): Promise<BaseResponse<T>> {
    return new Promise((resolve, reject) => {
        axios.put(url, data).then(
            response => {
                resolve(response.data);
            },
            err => {
                msag(err);
                reject(err);
            },
        );
    });
}

/**
 * @desc 统一接口处理，返回数据
 * @param fecth
 * @param url
 * @param param
 */
export default function <T = {}>(fecth: Method, url: string, param = {}): Promise<BaseResponse<T>> {
    const _data = '';
    return new Promise((resolve, reject) => {
        switch (fecth) {
            case 'get':
            case 'GET':
                get<T>(url, param)
                    .then(function (response) {
                        resolve(response);
                    })
                    .catch(function (error) {
                        reject(error);
                    });
                break;
            case 'post':
            case 'POST':
                post<T>(url, param)
                    .then(function (response) {
                        resolve(response);
                    })
                    .catch(function (error) {
                        reject(error);
                    });
                break;
            default:
                break;
        }
    });
}

/**
 * @desc 失败提示
 * @param err
 */
function msag(err: AxiosError) {
    if (err && err.response) {
        switch (err.response.status) {
            case 400:
                alert(err.response.data.error.details);
                break;
            case 401:
                alert('未授权，请登录');
                break;

            case 403:
                alert('拒绝访问');
                break;

            case 404:
                alert('请求地址出错');
                break;

            case 408:
                alert('请求超时');
                break;

            case 500:
                alert('服务器内部错误');
                break;

            case 501:
                alert('服务未实现');
                break;

            case 502:
                alert('网关错误');
                break;

            case 503:
                alert('服务不可用');
                break;

            case 504:
                alert('网关超时');
                break;

            case 505:
                alert('HTTP版本不受支持');
                break;
            default:
        }
    }
}
