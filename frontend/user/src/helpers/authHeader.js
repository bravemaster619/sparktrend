export function authHeader(){
    let user = JSON.parse(localStorage.getItem("user"));
    if(user && user.token){
        return {
            'Authorization' :   'monkey ' + user.token
        }
    }else{
        return {}
    }
}