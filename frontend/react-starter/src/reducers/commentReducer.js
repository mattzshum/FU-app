const initState = {
    popular : [],
    newComments : [],
    searched : [],
};
 
const commentsReducer = (state= initState, action) => {
  switch (action.type) {
    case "FETCH_COMMENTS":
      return {
        ...state,
        popular: action.payload.popular ,
        newComments: action.payload.newComments ,
      };   
    default:
      return {...state}
    }
  };
   
export default commentsReducer;