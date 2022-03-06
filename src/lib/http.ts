import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { configure } from "winston";
import Logger from "./logger"

//https://github.com/axios/axios#request-config

export type RequestConfig = {
    headers?: any;
    url: string;
    params?: any;   //URL parameters, key value pairs, NOTE this is NOT the express Request params.
    data?:any ;
    method:string;
};

export type ServerResponse = {
    // `data` is the response that was provided by the server
    data: any,
    // `status` is the HTTP status code from the server response
    status: number,
    // `statusText` is the HTTP status message from the server response
    statusText: string,
    // `headers` the HTTP headers that the server responded with
    // All header names are lower cased and can be accessed using the bracket notation.
    // Example: `response.headers['content-type']`
    headers: any,
};

const errorResp:ServerResponse ={
    data:{"ERROR":"Try again later?"},
    status:0,
    statusText: "ERROR",
    headers:{}
}

async function client(config:RequestConfig):Promise<ServerResponse> {
    try {
        Logger.info(JSON.stringify(config,null,4))
        const response = await axios(config as AxiosRequestConfig);
        //console.log(response);
        Logger.info("Request Headers(to target) & data:")
        Logger.info(JSON.stringify(response.config.headers,null,4));
        Logger.info(JSON.stringify(response.config.data,null,4));
        Logger.info("Response Headers(from target) & data:")
        Logger.info(JSON.stringify(response.headers,null,4));
        Logger.info(JSON.stringify(response.data,null,4));
        return {data:response.data, status:response.status,statusText:response.statusText,headers:response.headers}
      } catch (error) {
        Logger.debug(error);
        return errorResp;
      }
}

export default client;