module monkeydance {

  import Pool = entitas.Pool;
  import Group = entitas.Group;
  import Entity = entitas.Entity;
  import Matcher = entitas.Matcher;
  import Exception = entitas.Exception;
  import TriggerOnEvent = entitas.TriggerOnEvent;
  import IInitializeSystem = entitas.IInitializeSystem;
  import IReactiveSystem = entitas.IReactiveSystem;
  import ISetPool = entitas.ISetPool;

  export class ScoreSystem implements IInitializeSystem, IReactiveSystem, ISetPool {

    protected pool:Pool;

    public initialize() {
    }
    
    public get trigger():TriggerOnEvent {
    }
    
    public execute(entities:Array<Entity>) {
    }
    
    public setPool(pool:Pool) {
      this.pool = pool;
    }
    


  }
}