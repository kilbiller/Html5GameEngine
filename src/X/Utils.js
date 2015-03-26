"use strict";

export function clamp(value, min, max) {
  if(value > max) {
    return max;
  } else if(value < min) {
    return min;
  } else {
    return value;
  }
}
