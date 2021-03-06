import axios from "axios";
import { setInterceptors } from "./common/interceptors";

const apiUrl = 'http://localhost:2000/';

function createInstance() {
    const instance = axios.create({
        baseURL: apiUrl.replace('localhost', location.hostname)
    });
    return instance;
}

function createInstanceWithAuth(url) {
    const instance = axios.create({
        baseURL: `${apiUrl.replace('localhost', location.hostname)}${url}`
    });
    return setInterceptors(instance);
}

export function getBaseApiUrl() {
    return `${apiUrl.replace('localhost', location.hostname)}`;
}

export const instance = createInstance();
export const onvif = createInstanceWithAuth('onvif');
export const overlay = createInstanceWithAuth('overlay');
export const network = createInstanceWithAuth('network');