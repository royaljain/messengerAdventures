import { ADD_COMPASS } from "./../actions/action_types.js";


function rootReducer(state = initialState, action) {

  console.log(state);
  
  if (action.type === ADD_COMPASS) {
     return Object.assign({}, state, {
      articles: state.svg_components.concat(action)
    });
  }

  return state;
}

export default rootReducer;