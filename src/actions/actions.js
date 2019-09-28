import {ADD_COMPASS, ADD_LINE} from './action_types.js';

export const addCompass = (properties) => {return {
  x: properties.x,
  y: properties.y,
  r: properties.r,
  type: ADD_COMPASS
}};


export const addLine = (properties) => ({
  x1: properties.x1,
  y1: properties.y1,
  x2: properties.x2,
  y2: properties.y2,
  type: ADD_LINE
});
