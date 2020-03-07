export default function(token = '', action){
    if(action.type == 'addToken'){
        console.log('reducer'+action.token)
        return action.token
    } else if (action.type == 'deleteToken'){
        console.log('reducer delete token');
        let newToken = "";
        token = newToken;
        console.log('new token ?',token)
        return token
    } else {

        return token
    }
}
