import { combineReducers } from "redux";
import axios from "axios";
import { notification } from "antd";

export default combineReducers({
  reducer
});

function reducer(state = [], { type, payload }) {
  switch (type) {
    case "GET_RESULT":
      return { ...state, result: payload };
    default:
      return state;
  }
}

const openNotificationWithIcon = (type, message) => {
  notification[type]({
    message: message,
    duration: 2
  });
};

export const handleSearchAPI = (search, limit) => async dispatch => {
  try {
    const res = await axios.get(
      `https://itunes.apple.com/search?term=${search}&limit=${limit}`
    );

    if (res.status === 200) {
      setTimeout(() => {
        openNotificationWithIcon("success", "Songs Loaded Successfully.");
      }, 2000);
    }
    dispatch({
      type: "GET_RESULT",
      payload: res.data.results
    });
  } catch (err) {
    openNotificationWithIcon("error", "OOPS! Error while loading.");
  }
};
