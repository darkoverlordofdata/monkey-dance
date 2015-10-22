module monkeydance {

  import Pool = entitas.Pool;
  import Group = entitas.Group;
  import Entity = entitas.Entity;
  import Matcher = entitas.Matcher;
  import Exception = entitas.Exception;
  import TriggerOnEvent = entitas.TriggerOnEvent;
  import IReactiveSystem = entitas.IReactiveSystem;
  import ISetPool = entitas.ISetPool;
  import IEnsureComponents = entitas.IEnsureComponents;

  export class RemoveViewSystem implements IReactiveSystem, ISetPool, IEnsureComponents {

    protected pool:Pool;

    public get trigger():TriggerOnEvent {
    }
    
    public execute(entities:Array<Entity>) {
    }
    
    public setPool(pool:Pool) {
      this.pool = pool;
    }
    
    public get ensureComponents():IMatcher {
    }
    


  }
}