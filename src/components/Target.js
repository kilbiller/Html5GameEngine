import Component from "../X/Component";

export default class Target extends Component {
  constructor(type = "player", range = "200") {
    super("target");
    this.type = type;
    this.range = range;
    this.entity = null;
    this.isAcquired = false;
  }
}
