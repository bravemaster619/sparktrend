export function authHeader(){
    let user = JSON.parse(localStorage.getItem("sparktrend-user"));
    if(user && user.token){
        return {
            'Authorization' :   'Bearer ' + user.token
        }
    }else{
        return {}
    }
}