import axios, { AxiosRequestConfig, AxiosResponse, AxiosInstance } from 'axios';

enum CODE {
  UN_AUTHORIZED = 401,
  SUCCESS = 0,
}

export interface ResponseData<T = any> {
  code: number;
  message: string;
  data: T;
}

const defaultConfig: AxiosRequestConfig = {
  timeout: 5000,
  baseURL: '',
};

class Http {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create(defaultConfig);
    this.interceptorsRequest(this.instance);
    this.interceptorsResponse(this.instance);
  }

  private interceptorsRequest(instance: AxiosInstance) {
    instance.interceptors.request.use(
      (config) => ({
        ...config,
        headers: {
          ...config.headers,
          'X-Auth-CSRF-TOKEN': 'X-Auth-CSRF-TOKEN',
        },
      }),
      (error) => Promise.reject(error),
    );
  }

  private interceptorsResponse(instance: AxiosInstance) {
    instance.interceptors.response.use(
      (response: AxiosResponse<ResponseData>) => {
        const res = response.data;

        const { code, message } = res;

        if (code === CODE.UN_AUTHORIZED) {
          console.log('跳转登录页');
          return;
        }
        if (code !== CODE.SUCCESS) {
          console.log('打印错误信息');
          console.log(message);
          return;
        }
        return response;
      },
    );
  }

  public get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.instance
      .get(url, config)
      .then((res: AxiosResponse<ResponseData<T>>) => res.data.data);
  }
  public post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    return this.instance
      .post<ResponseData<T>>(url, data, config)
      .then((res) => res.data.data);
  }
}

export default new Http();
