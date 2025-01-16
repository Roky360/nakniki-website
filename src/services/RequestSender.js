import axios from "axios";

const apiBase = '/api';

const getHeaders = (jwt, headers) => {
    return {
        headers: {
            'Authorization': `Bearer ${jwt}`,
            ...headers
        }
    }
}

export const sendGet = async (uri, jwt, headers = {}) => {
    return await axios.get(`${apiBase}${uri}`, getHeaders(jwt, headers));
}

export const sendPost = async (uri, jwt, headers = {}, body = {}) => {
    return await axios.post(`${apiBase}${uri}`, body, getHeaders(jwt, headers));
}

export const sendPut = async (uri, jwt, headers = {}, body = {}) => {
    return await axios.put(`${apiBase}${uri}`, body, getHeaders(jwt, headers));
}

export const sendDelete = async (uri, jwt, headers = {}) => {
    return await axios.delete(`${apiBase}${uri}`, getHeaders(jwt, headers));
}

export const sendPatch = async (uri, jwt, headers = {}, body = {}) => {
    return await axios.patch(`${apiBase}${uri}`, body, getHeaders(jwt, headers));
}

