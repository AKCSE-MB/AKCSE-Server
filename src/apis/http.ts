import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

class HttpClient {
  public client: AxiosInstance;
  private requestInterceptorId!: number;
  private responseInterceptorId!: number;

  constructor() {
    this.client = axios.create(this.axiosConfig());
    this.requestInterceptorId = this.requestInterceptors();
    this.responseInterceptorId = this.responseInterceptors();
  }

  axiosConfig() {
    return {
      baseURL: '',
      headers: {},
    };
  }

  requestInterceptors() {
    return this.client.interceptors.request.use(
      (request: InternalAxiosRequestConfig) => {
        if (typeof window === undefined) return request;

        if (
          request.headers.Authorization?.toString().split(' ')[1] === 'null'
        ) {
          const token = (sessionStorage as Storage).getItem('token');
          request.headers.Authorization = `Bearer ${token}`;
          return { ...request };
        }

        return request;
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (error: any) => {
        console.log('error', error);

        return Promise.reject(error);
      },
    );
  }

  responseInterceptors() {
    return this.client.interceptors.response.use(
      (response: AxiosResponse) => {
        console.log('axios response!!!!');
        return response;
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (error: any) => {
        console.log('error', error.response.data.statusCode);

        if (error.response.data.statusCode >= 400) {
          console.log('Invalid Login Credentials. Please Try Again.');
        }

        return Promise.reject(error);
      },
    );
  }

  responseBody(response: AxiosResponse) {
    return response.data;
  }

  async get<R>(url: string, config?: AxiosRequestConfig) {
    return this.client.get<R>(url, config).then(this.responseBody);
  }

  async post<R, D>(url: string, data?: D, config?: AxiosRequestConfig) {
    return this.client.post<R>(url, data, config).then(this.responseBody);
  }

  async put<R, D>(url: string, data?: D, config?: AxiosRequestConfig) {
    return this.client.put<R>(url, data, config).then(this.responseBody);
  }

  async delete<R>(url: string, config?: AxiosRequestConfig) {
    return this.client.delete<R>(url, config).then(this.responseBody);
  }

  removeInterceptors() {
    this.client.interceptors.request.eject(this.requestInterceptorId);
    this.client.interceptors.response.eject(this.responseInterceptorId);
  }
}

export default new HttpClient();
