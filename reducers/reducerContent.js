export default function(contentMediaData = {}, action){

    switch (action.type) {
        case 'open-content-information': 
          console.log('open-content-information reducer',action)
          return action.contentData
          break;    

        default:
          return contentMediaData;
      }
    }