export const config = {
    base_url(url) {
        if (url.startsWith("/")) {
            return "https://sparktrend.net:3333/api" + url;
        } else {
            return "https://sparktrend.net:3333/api/" + url;
        }
    }
};