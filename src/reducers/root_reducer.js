import { ADD_COMPASS, ADD_LINE } from "./../actions/action_types.js";


function rootReducer(state = initialState, action) {

  console.log(state);
  var cloneObj = Object.assign({}, state)
  
  if (action.type === ADD_COMPASS) {
     cloneObj['svg_components'][action.id] = action
  }
  else if (action.type === ADD_LINE) {
     cloneObj['svg_components'][action.id] = action
  };

  return cloneObj;
}

export default rootReducer;