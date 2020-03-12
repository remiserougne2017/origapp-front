export default function(storeLibrairy =[], action){
    if(action.type == 'manageLibrairy' && action.bool==true){
        var index = storeLibrairy.findIndex(e=>e==action.id)
        if(index==-1){
            var newLibrairy = [...storeLibrairy, action.id ]
            return newLibrairy
        }else{
            return storeLibrairy
        }
    } else {
        if(action.type == 'manageLibrairy' && action.bool==false){
            var newLibrairy = storeLibrairy.filter(e=>e!=action.id)
            return newLibrairy
        }else{
            return storeLibrairy
        }
    }
}