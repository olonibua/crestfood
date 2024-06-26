import { combineReducers } from "redux";
import cartReducer from "./cartReducer";
// import cartReducer from "./rootReducer"; // Import your cart reducer

const rootReducer = combineReducers({
  cart: cartReducer,
  // Add other reducers if needed
});

export default rootReducer;
