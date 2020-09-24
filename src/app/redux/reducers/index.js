import { combineReducers } from "redux";
import { loadingBarReducer } from "react-redux-loading";

import auth from "./auth";
import redirect from "./redirect";
import formBuilder from "./formBuilder";

export default combineReducers({
  auth,
  redirect,
  formBuilder,
  loadingBar: loadingBarReducer,
});
