import Component from "../X/Component";

export default class Dimension extends Component {
  constructor(width = 0, height = 0) {
    super("dimension");
    this.width = width;
    this.height = height;
  }
}
