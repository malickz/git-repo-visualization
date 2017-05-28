/**
 * Created by SMalik on 2017-03-28.
 */

export interface PhyllotaxisPoint {
  x: number;
  y: number;
}


/**
 * A helper function to obtain a generator for a phyllotaxis layout of points
 */
export function phyllotaxis(width: number, height: number, radius: number): ((i: number) => PhyllotaxisPoint) {
  let theta = Math.PI * (3 - Math.sqrt(5));
  return function (i: number) {
    let r: number = radius * Math.sqrt(i), a = theta * i;
    return {
      x: width / 2 + r * Math.cos(a),
      y: height / 2 + r * Math.sin(a)
    };
  };
}
