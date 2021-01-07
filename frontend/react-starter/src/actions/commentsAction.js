import axios from "axios";
import { popularCommentsURL, newCommentsURL } from "../api";
 
//Action Creator
 
export const loadComments = () => async (dispatch) => {
  //FETCH AXIOS
  const popularData = await axios.get(popularCommentsURL());
  const newCommentsData = await axios.get(newCommentsURL());

  dispatch({
    type: "FETCH_COMMENTS",
    payload: {
      popular: popularData.data.results,
      newComments: newCommentsData.data.results,
    },
  });
};
