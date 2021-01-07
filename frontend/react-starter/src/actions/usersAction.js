import axios from "axios";
import { popularUsersURL, newUsersURL } from "../api";
 
//Action Creator
 
export const loadUsers = () => async (dispatch) => {
  //FETCH AXIOS
  const popularData = await axios.get(popularUsersURL());
  const newUsersData = await axios.get(newUsersURL());

  dispatch({
    type: "FETCH_USERS",
    payload: {
      popular: popularData.data.results,
      newUsers: newUsersData.data.results,
    },
  });
};
