const initState = {
    popular : [],
    newSetup_dbs : [],
    searched : [],
};
 
const setup_dbsReducer = (state= initState, action) => {
  switch (action.type) {
    case "FETCH_SETUP_DBS":
      return {
        ...state,
        popular: action.payload.popular ,
        newSetup_dbs: action.payload.newSetup_dbs ,
      };   
    default:
      return {...state}
    }
  };
   
export default setup_dbsReducer;