export default function(storeLibrairy =["id123"], action){
    console.log('reducer Librairy',action)
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
            console.log("reducer remove librairy",newLibrairy)
            return newLibrairy
        }else{
            return storeLibrairy
        }
    }
}