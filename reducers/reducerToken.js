export default function(token = 'dTsvaJw2PQiOtTWxykt5KcWco87eeSp6', action){
    if(action.type == 'addToken'){
        console.log('reducer')
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
