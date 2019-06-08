// @ts-ignore
import axios from "Api/Axios";

export const URL = "http://localhost:3000/";

export interface commonCrudInterface {
    "url": string,
    "params": any
}

const urlWithOrigin = (url: string) => {
    return URL + url;
}

/**
 * Params should be { next, keyword }
 * @param {string} url
 * @param {object} params
 */

const get = ({ url, params }: commonCrudInterface) => {
    const { next, keyword }: any = params;
    const endPoint = urlWithOrigin(url);
    if (next)  return axios.get(next);
    if (keyword) return axios.get(endPoint, { params: { keyword } });
    return axios.get(url);
}

// ApiHelper
export const ApiHelper = {
    posts: (params: any) => get({ url : urlWithOrigin("posts/"), params })
}