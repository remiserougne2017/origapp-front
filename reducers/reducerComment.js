export default function(contentComment = {commentsData:[]}, action){

    switch (action.type) {
        case 'send-data-comment': 
          // console.log('send data comment',action)
          return action.commentData
          break;    

        default:
          return contentComment;
      }
    }