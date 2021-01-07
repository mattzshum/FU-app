import axios from "axios";
import { popularPostsURL, newPostsURL } from "../api";
 
//Action Creator
 
export const loadPosts = () => async (dispatch) => {
  //FETCH AXIOS
  const popularData = await axios.get(popularPostsURL());
  const newPostsData = await axios.get(newPostsURL());

  dispatch({
    type: "FETCH_POSTS",
    payload: {
      popular: popularData.data.results,
      newPosts: newPostsData.data.results,
    },
  });
};
