import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpRequest} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";

export interface RequestOptions {
  headers?: HttpHeaders;
  observe?: any;
  params?: HttpParams;
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
  body?: any;
}

export function apiHttpClientCreator(http: HttpClient) {
  return new ApiService(http);
}

@Injectable()
export class ApiService {

  public readonly baseURL = environment.apiUrl;

  public constructor(private http: HttpClient) {
  }

  public get<T>(endPoint: string, options?: RequestOptions): Observable<any> {
    return this.http.get<T>(this.baseURL + endPoint, options);
  }

  public post<T>(endPoint: string, body: any, options?: RequestOptions): Observable<any> {
    return this.http.post<T>(this.baseURL + endPoint, body, options);
  }

  public put<T>(endPoint: string, body: any, options?: RequestOptions): Observable<any> {
    return this.http.put<T>(this.baseURL + endPoint, body, options);
  }

  public patch<T>(endPoint: string, body: any, options?: RequestOptions): Observable<any> {
    return this.http.patch<T>(this.baseURL + endPoint, body, options);
  }

  public delete<T>(endPoint: string, options?: RequestOptions): Observable<any> {
    return this.http.delete<T>(this.baseURL + endPoint, options);
  }

  public getFile(endPoint: string, header?: HttpHeaders) {
    return this.http.get(this.baseURL + endPoint, {responseType: "blob",headers:header});

    // return this.http.get<T>(this.newBaseURL + endPoint, options);
  }

  public postFile<T>(endPoint: string, body: any, options?: RequestOptions): Observable<any> {
    const req = new HttpRequest('POST', this.baseURL + endPoint, body, {responseType: "text"});
    return this.http.request<T>(req);
    // return this.http.post<T>(this.baseURL + endPoint, body, options);
  }
}
