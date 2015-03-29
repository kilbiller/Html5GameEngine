import Component from "../X/Component";

export default class Health extends Component {
  constructor(hp = 100) {
    super("health");
    this.hp = hp;
    this.isAlive = true;
  }
}
