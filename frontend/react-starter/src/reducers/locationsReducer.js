const initState = {
    popular : [],
    newLocations : [],
    searched : [],
};
 
const locationsReducer = (state= initState, action) => {
  switch (action.type) {
    case "FETCH_LOCATIONS":
      return {
        ...state,
        popular: action.payload.popular ,
        newLocations: action.payload.newLocations ,
      };   
    default:
      return {...state}
    }
  };
   
export default locationsReducer;