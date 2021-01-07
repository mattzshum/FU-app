import axios from "axios";
import { popularLocationsURL, newLocationsURL } from "../api";
 
//Action Creator
 
export const loadLocations = () => async (dispatch) => {
  //FETCH AXIOS
  const popularData = await axios.get(popularLocationsURL());
  const newLocationsData = await axios.get(newLocationsURL());

  dispatch({
    type: "FETCH_LOCATIONS",
    payload: {
      popular: popularData.data.results,
      newLocations: newLocationsData.data.results,
    },
  });
};
