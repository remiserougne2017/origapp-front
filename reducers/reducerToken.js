export default function(token = 'dTsvaJw2PQiOtTWxykt5KcWco87eeSp6', action){
    if(action.type == 'addToken'){
        console.log('reducer')
        return action.token
    } else {
        return token
    }
}