import { API_HOST } from './api';

export const config = {
    base_url(url) {
        if (url.startsWith("/")) {
            return API_HOST + url;
        } else {
            return `${API_HOST}/${url}`;
        }
    }
};