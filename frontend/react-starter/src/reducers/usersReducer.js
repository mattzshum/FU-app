const initState = {
    popular : [],
    newUsers : [],
    searched : [],
};
 
const usersReducer = (state= initState, action) => {
  switch (action.type) {
    case "FETCH_USERS":
      return {
        ...state,
        popular: action.payload.popular ,
        newUsers: action.payload.newUsers ,
      };   
    default:
      return {...state}
    }
  };
   
export default usersReducer;