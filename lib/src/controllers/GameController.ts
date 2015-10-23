module monkeydance {

  import Pools = monkeydance.Pools;
  import Systems = entitas.Systems;

  export class GameController {

    systems:Systems;

    start() {

      var html = document.getElementsByTagName('html')[0];
      html.style.backgroundImage = 'none';

      this.systems = this.createSystems(Pools.pool);
      this.systems.initialize();

    }

    update(delta:number) {
      this.systems.execute();
    }

    createSystems(pool) {
      return new Systems()
        // Input
        .add(pool.createSystem(monkeydance.ProcessInputSystem))

        // Update
        .add(pool.createSystem(monkeydance.CreateMonkeySystem))
        .add(pool.createSystem(monkeydance.ScoreSystem))

        // Render
        .add(pool.createSystem(monkeydance.RemoveViewSystem))
        .add(pool.createSystem(monkeydance.AddViewSystem))
        .add(pool.createSystem(monkeydance.RenderPositionSystem))

        // Destroy
        .add(pool.createSystem(monkeydance.DestroySystem));

    }
  }
}