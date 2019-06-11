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

const get = ({ url, params={} }: commonCrudInterface) => {
    const { _page, _limit, _all } = params;
    const endPoint = urlWithOrigin(url);

    if (_all) return axios.get(endPoint, { params })
    if (_page && _limit) return axios.get(endPoint, { params });
    return axios.get(endPoint);
}

// ApiHelper
export const ApiHelper = {
    posts: (params: any) => get({ url : "posts/", params }),
}