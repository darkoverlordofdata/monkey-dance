module monkeydance {

  import Pool = entitas.Pool;
  import Group = entitas.Group;
  import Entity = entitas.Entity;
  import Matcher = entitas.Matcher;
  import Exception = entitas.Exception;
  import TriggerOnEvent = entitas.TriggerOnEvent;
  import IReactiveSystem = entitas.IReactiveSystem;

  export class AddViewSystem implements IReactiveSystem {


    public get trigger():TriggerOnEvent {
    }
    
    public execute(entities:Array<Entity>) {
    }
    


  }
}