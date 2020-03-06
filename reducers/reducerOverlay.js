export default function(overlayData = {toggle:false,content:[]}, action){

    switch (action.type) {
        case 'open-overlay': 
          action.overlayData.toggle = true;
          // console.log('open-overlay reducer',action);

          return action.overlayData
          break;    
        case 'close-overlay':
          action.overlayData.toggle = false;
          // console.log('close-overlay reducer',action);

          return action.overlayData
          break;
        default:
          return overlayData;
      }
    // if(action.type == 'open-overlay'){
    //     console.log('open-overlay reducer',action)
    //     return action.overlayData
    // } else {
    //     return overlayData

    // }
}