export default function(prenom = '', action){
    if(action.type == 'addPrenom'){
        console.log(action)
        return action.prenom
    } else if(action.type == 'deletePrenom') {
        console.log("REDUCER KILL NAME",action);
        var newPrenom = "";
        return newPrenom
    } else {
        return prenom
    }
}