const initState = {
    popular : [],
    newLocations : [],
    searched : [],
};
 
const topicsReducer = (state= initState, action) => {
  switch (action.type) {
    case "FETCH_TOPICS":
      return {
        ...state,
        popular: action.payload.popular ,
        newTopics: action.payload.newTopics ,
      };   
    default:
      return {...state}
    }
  };
   
export default topicsReducer;