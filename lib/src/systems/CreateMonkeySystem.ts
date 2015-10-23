module monkeydance {

  import Pool = entitas.Pool;
  import Group = entitas.Group;
  import Entity = entitas.Entity;
  import Matcher = entitas.Matcher;
  import Exception = entitas.Exception;
  import TriggerOnEvent = entitas.TriggerOnEvent;
  import IInitializeSystem = entitas.IInitializeSystem;
  import ISetPool = entitas.ISetPool;

  export class CreateMonkeySystem implements IInitializeSystem, ISetPool {
    protected pool:Pool;

    public initialize() {
      const resourceName = "armsup_happy";
      for (var i = 0; i < bosco.config.sprites.length; i++) {
        //var speed = (Math.random()+.5) * 2;
        this.pool.createEntity()
          .addResource(bosco.config.sprites[i])
          .addPosition(i, i, 0);
          //.addMove(speed, speed);
      }
    }
    
    public setPool(pool:Pool) {
      this.pool = pool;
    }
    


  }
}