import axios from "axios";
import { popularTopicsURL, newTopicsURL } from "../api";
 
//Action Creator
 
export const loadTopics = () => async (dispatch) => {
  //FETCH AXIOS
  const popularData = await axios.get(popularTopicsURL());
  const newTopicsData = await axios.get(newTopicsURL());

  dispatch({
    type: "FETCH_TOPICS",
    payload: {
      popular: popularData.data.results,
      newTopics: newTopicsData.data.results,
    },
  });
};
