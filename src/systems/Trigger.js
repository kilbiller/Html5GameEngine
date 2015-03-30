import SystemX from "../X/System";

export default class Trigger extends SystemX {
  constructor(game) {
    super(game);
  }

  update(dt) {
    for(let entity of this.game.world.entities) {
      let ec = entity.components;
      if(entity.type === "player" && ec.health.isAlive) {
        let object = this.game.world.tilemap.getObject(ec.collider.bounds.clone().move(ec.position.current.x, ec.position.current.y));
        if(object) {
          if(object.type === "Transition") {
            this.game.stateManager.change("level2", {
              player: entity,
              x: parseInt(object.props.x),
              y: parseInt(object.props.y),
              tilemapName: object.props.tilemapName
            });
            this.game.assetManager.getSound("tilemap_transition").play();
          }
        }
      }
    }
  }
}
