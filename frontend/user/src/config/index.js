export const config = {
    base_url(url) {
        if (url.startsWith("/")) {
            return "http://127.0.0.1:3333/api" + url;
        } else {
            return "http://127.0.0.1:3333/api/" + url;
        }
    }
};