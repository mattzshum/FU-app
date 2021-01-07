const initState = {
    popular : [],
    newPosts : [],
    searched : [],
};
 
const postsReducer = (state= initState, action) => {
  switch (action.type) {
    case "FETCH_POSTS":
      return {
        ...state,
        popular: action.payload.popular ,
        newPosts: action.payload.newPosts ,
      };   
    default:
      return {...state}
    }
  };
   
export default postsReducer;