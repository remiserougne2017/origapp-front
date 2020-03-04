export default function(prenom = '', action){
    if(action.type == 'addPrenom'){
        console.log(action)
        return action.prenom
    } else {
        return prenom
    }
}