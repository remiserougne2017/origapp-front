export default function(token = '', action){
    if(action.type == 'addToken'){
        console.log('reducer add TOKEn')
        return action.token
    } else if (action.type == 'deleteToken'){
        console.log('reducer delete token SURE');
        var newToken = "";
        console.log('new token ?',newToken)
        return newToken
    } else {
        return token
    }
}
