import axios from "axios";
import { popularsetup_dbsURL, newsetup_dbsURL } from "../api";
 
//Action Creator
 
export const loadSetup_dbs = () => async (dispatch) => {
  //FETCH AXIOS
  const popularData = await axios.get(popularSetup_dbsURL());
  const newSetup_dbsData = await axios.get(newSetup_dbsURL());

  dispatch({
    type: "FETCH_SETUP_DBS",
    payload: {
      popular: popularData.data.results,
      newSetup_dbs: newSetup_dbsData.data.results,
    },
  });
};
