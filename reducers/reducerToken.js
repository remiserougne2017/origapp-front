export default function(token = '', action){
    if(action.type == 'addToken'){
        console.log('reducer')
        return action.token
    } else {
        return token
    }
}