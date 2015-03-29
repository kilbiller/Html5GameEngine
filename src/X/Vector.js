export default class Vector {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  copy(vector) {
    this.x = vector.x;
    this.y = vector.y;
    return this;
  }

  clone() {
    return new Vector(this.x, this.y);
  }

  add(vector) {
    this.x += vector.x;
    this.y += vector.y;
    return this;
  }

  sub(vector) {
    this.x -= vector.x;
    this.y -= vector.y;
    return this;
  }

  equal(vector) {
    return this.x === vector.x && this.y === vector.y;
  }

  norm() {
    let hyp = this.len();
    if(hyp > 0) {
      this.x /= hyp;
      this.y /= hyp;
    }
    return this;
  }

  getDirection(target) {
    let dir = new Vector(target.x - this.x, target.y - this.y);
    dir.norm();
    return dir;
  }

  dot(vector) {
    return this.x * vector.x + this.y * vector.y;
  }

  len2() {
    return this.dot(this);
  }

  len() {
    return Math.sqrt(this.len2());
  }

  static lerp(vector1, vector2, amount) {
    return new Vector(vector1.x + (vector2.x - vector1.x) * amount, vector1.y + (vector2.y - vector1.y) * amount);
  }

  static euclidianDistance(vector1, vector2) {
    return Math.sqrt(Math.pow(vector2.x - vector1.x, 2) + Math.pow(vector2.y - vector1.y, 2));
  }

  print() {
    console.log(this);
  }

  static get UP() {
    return new Vector(0, -1);
  }

  static get DOWN() {
    return new Vector(0, 1);
  }

  static get LEFT() {
    return new Vector(-1, 0);
  }

  static get RIGHT() {
    return new Vector(1, 0);
  }

  static get Zero() {
    return new Vector(0, 0);
  }
}
