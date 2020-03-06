export default function(prenom = '', action){
    if(action.type == 'addPrenom'){
        console.log(action)
        return action.prenom
    } else if(action.type == 'deletePrenom') {console.log(action);
        let newPrenom = "";
        prenom = newPrenom;
        console.log('new prenom?',prenom)
        return prenom
    } else {
        return prenom
    }
}