# Monkey Dance

git clone https://github.com/darkoverlordofdata/template monkeydance
cd monkeydance

entitas init monkeydance

entitas create -c Movable
entitas create -c Position x:number y:number
entitas create -c Destroy
entitas create -c Input x:number y:number
entitas create -c Interactive
entitas create -c Resource name:string
entitas create -c View sprite
entitas create -c Score value:number
entitas create -e Score
entitas create -s DestroySystem IReactiveSystem ISetPool
entitas create -s ProcessInputSystem IReactiveSystem ISetPool
entitas create -s RenderPositionSystem IReactiveSystem
entitas create -s AddViewSystem IReactiveSystem
entitas create -s RemoveViewSystem IReactiveSystem ISetPool IEnsureComponents
entitas create -s ScoreSystem IInitializeSystem IReactiveSystem ISetPool

# GPLv3 License

Copyright (c) 2015 Bruce Davidson <darkoverlordofdata@gmail.com>

This file is part of Monkey Dance.

Monkey Dance is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Monkey Dance is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with Monkey Dance.  If not, see <http://www.gnu.org/licenses/>.
