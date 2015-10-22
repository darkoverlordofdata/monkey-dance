var bosco;
(function (bosco) {
    var utils;
    (function (utils) {
        var Input = (function () {
            function Input() {
                var _this = this;
                this.states = {};
                this.mouseDown = false;
                this.mouseButtonDown = false;
                this.mousePosition = { x: 0, y: 0 };
                this.isDown = function (keyCode) { return _this.states[keyCode]; };
                this.isUp = function (keyCode) { return !_this.states[keyCode]; };
                this.onKeyUp = function (event) {
                    if (_this.states[event.keyCode])
                        _this.states[event.keyCode] = false;
                };
                this.onKeyDown = function (event) {
                    _this.states[event.keyCode] = true;
                };
                this.onTouchStart = function (event) {
                    event = event.targetTouches ? event.targetTouches[0] : event;
                    _this.mouseDown = true;
                    _this.mouseButtonDown = true;
                    _this.mousePosition.x = parseInt(event.clientX);
                    _this.mousePosition.y = parseInt(event.clientY);
                    return true;
                };
                this.onTouchMove = function (event) {
                    event = event.targetTouches ? event.targetTouches[0] : event;
                    _this.mousePosition.x = parseInt(event.clientX);
                    _this.mousePosition.y = parseInt(event.clientY);
                };
                this.onTouchEnd = function (event) {
                    _this.mouseDown = false;
                    _this.mouseButtonDown = false;
                };
                document.addEventListener('touchstart', this.onTouchStart, true);
                document.addEventListener('touchmove', this.onTouchMove, true);
                document.addEventListener('touchend', this.onTouchEnd, true);
                document.addEventListener('mousedown', this.onTouchStart, true);
                document.addEventListener('mousemove', this.onTouchMove, true);
                document.addEventListener('mouseup', this.onTouchEnd, true);
                window.addEventListener('keydown', this.onKeyDown, true);
                window.addEventListener('keyup', this.onKeyUp, true);
            }
            Object.defineProperty(Input, "mousePosition", {
                get: function () {
                    return Input._input.mousePosition;
                },
                enumerable: true,
                configurable: true
            });
            Input.getKeyDown = function (k) {
                return Input._input.isDown(k.charCodeAt(0));
            };
            Input.getKeyUp = function (k) {
                return Input._input.isUp(k.charCodeAt(0));
            };
            Input.getMouseButtonUp = function (m) {
                return !Input._input.mouseButtonDown;
            };
            Input.getMouseButton = function (m) {
                return Input._input.mouseDown;
            };
            Input.getMouseButtonDown = function (m) {
                return Input._input.mouseButtonDown;
            };
            Input.update = function () {
                Input._input.mouseDown = false;
                Input._input.states = {};
            };
            Input._input = new Input();
            return Input;
        })();
        utils.Input = Input;
    })(utils = bosco.utils || (bosco.utils = {}));
})(bosco || (bosco = {}));
//# sourceMappingURL=Input.js.map
var bosco;
(function (bosco) {
    var utils;
    (function (utils) {
        var Rnd = (function () {
            function Rnd() {
            }
            Rnd.nextBool = function () {
                return ((~~(Math.random() * 32767)) & 1) === 1;
            };
            /*
             * Generates a random real value from 0.0, inclusive, to 1.0, exclusive.
            */
            Rnd.nextDouble = function () {
                return Math.random();
            };
            /*
             * Generates a random int value from 0, inclusive, to max, exclusive.
            */
            Rnd.nextInt = function (max) {
                return ~~(Math.random() * max);
            };
            Rnd.random = function (start, end) {
                if (end === undefined) {
                    return Rnd.nextInt(start + 1);
                }
                else if (parseInt(start) === parseFloat(start) && parseInt(end) === parseFloat(end)) {
                    return start + Rnd.nextInt(end - start + 1);
                }
                else {
                    return start + Rnd.nextDouble() * (end - start);
                }
            };
            return Rnd;
        })();
        utils.Rnd = Rnd;
    })(utils = bosco.utils || (bosco.utils = {}));
})(bosco || (bosco = {}));
//# sourceMappingURL=Rnd.js.map
var bosco;
(function (bosco) {
    var utils;
    (function (utils) {
        // Thanks to Riven
        // From: http://riven8192.blogspot.com/2009/08/fastmath-sincos-lookup-tables.html
        var TrigLUT = (function () {
            function TrigLUT() {
            }
            TrigLUT.sin = function (rad) {
                return TrigLUT.sin_[(rad * TrigLUT.radToIndex) & TrigLUT.SIN_MASK];
            };
            TrigLUT.cos = function (rad) {
                return TrigLUT.cos_[(rad * TrigLUT.radToIndex) & TrigLUT.SIN_MASK];
            };
            TrigLUT.sinDeg = function (deg) {
                return TrigLUT.sin_[(deg * TrigLUT.degToIndex) & TrigLUT.SIN_MASK];
            };
            TrigLUT.cosDeg = function (deg) {
                return TrigLUT.cos_[(deg * TrigLUT.degToIndex) & TrigLUT.SIN_MASK];
            };
            TrigLUT.init = function (update) {
                TrigLUT.RAD = Math.PI / 180.0;
                TrigLUT.DEG = 180.0 / Math.PI;
                TrigLUT.SIN_BITS = 12;
                TrigLUT.SIN_MASK = ~(-1 << TrigLUT.SIN_BITS);
                TrigLUT.SIN_COUNT = TrigLUT.SIN_MASK + 1;
                TrigLUT.radFull = (Math.PI * 2.0);
                TrigLUT.degFull = (360.0);
                TrigLUT.radToIndex = TrigLUT.SIN_COUNT / TrigLUT.radFull;
                TrigLUT.degToIndex = TrigLUT.SIN_COUNT / TrigLUT.degFull;
                TrigLUT.sin_ = new Array(TrigLUT.SIN_COUNT);
                TrigLUT.cos_ = new Array(TrigLUT.SIN_COUNT);
                for (var i = 0; i < TrigLUT.SIN_COUNT; i++) {
                    TrigLUT.sin_[i] = Math.sin((i + 0.5) / TrigLUT.SIN_COUNT * TrigLUT.radFull);
                    TrigLUT.cos_[i] = Math.cos((i + 0.5) / TrigLUT.SIN_COUNT * TrigLUT.radFull);
                }
                if (update) {
                    Math.sin = TrigLUT.sin;
                    Math.cos = TrigLUT.cos;
                }
            };
            return TrigLUT;
        })();
        utils.TrigLUT = TrigLUT;
    })(utils = bosco.utils || (bosco.utils = {}));
})(bosco || (bosco = {}));
//# sourceMappingURL=TrigLUT.js.map
/**
 * Utils.ts
 *
 * Bosco Utility functions
 *
 */
var bosco;
(function (bosco) {
    var Sprite = PIXI.Sprite;
    var Texture = PIXI.Texture;
    /**
     * Builds a composited sprite
     *
     * @param name  resource name
     * @returns {PIXI.Sprite}
     */
    function prefab(name) {
        var config = bosco.config.resources[name];
        if (Array.isArray(config)) {
            var container = new Sprite();
            for (var i = 0, l = config.length; i < l; i++) {
                container.addChild(prefab(config[i]));
            }
            return container;
        }
        else {
            var sprite = new Sprite(Texture.fromFrame(config.path));
            for (var k in config) {
                switch (k) {
                    case 'anchor':
                        sprite.anchor.set(config.anchor.x, config.anchor.y);
                        break;
                    case 'scale':
                        sprite.scale.set(config.scale.x, config.scale.y);
                        break;
                    case 'position':
                        sprite.position.set(config.position.x, config.position.y);
                        break;
                    case 'rotation':
                        sprite.rotation = config.rotation.z;
                        break;
                    case 'tint':
                        sprite.tint = config.tint;
                        break;
                }
            }
            return sprite;
        }
    }
    bosco.prefab = prefab;
})(bosco || (bosco = {}));
//# sourceMappingURL=Utils.js.map
/**
 * Properties.ts
 *
 * Persist properties using LocalStorage
 *
 */
var bosco;
(function (bosco) {
    var Properties = (function () {
        function Properties() {
        }
        Properties.init = function (name, properties) {
            if (Properties.db !== null)
                return;
            /** Initialize the db with the properties */
            function initializeDb(db) {
                if (db.isNew()) {
                    db.createTable("settings", ["name", "value"]);
                    db.createTable("leaderboard", ["date", "score"]);
                    for (var key in properties) {
                        if (properties.hasOwnProperty(key)) {
                            db.insert("settings", {
                                name: key,
                                value: properties[key]
                            });
                        }
                    }
                    db.commit();
                }
            }
            Properties.dbname = name;
            Properties.properties = properties;
            if (window['chrome']) {
                chromeStorageDB(Properties.dbname, localStorage, function (db) { return initializeDb(Properties.db = db); });
            }
            else {
                initializeDb(Properties.db = new localStorageDB(Properties.dbname));
            }
        };
        /*
         * Get Game Property from local storage
         *
         * @param property name
         * @return property value
         */
        Properties.get = function (prop) {
            return Properties.db.queryAll("settings", {
                query: {
                    name: prop
                }
            })[0].value;
        };
        Properties.setScore = function (score) {
            var today = new Date();
            var mm = (today.getMonth() + 1).toString();
            if (mm.length === 1)
                mm = '0' + mm;
            var dd = today.getDate().toString();
            if (dd.length === 1)
                dd = '0' + dd;
            var yyyy = today.getFullYear().toString();
            var yyyymmdd = yyyy + mm + dd;
            if (0 === Properties.db.queryAll('leaderboard', { query: { date: yyyymmdd } }).length) {
                Properties.db.insert('leaderboard', { date: yyyymmdd, score: score });
            }
            else {
                Properties.db.update('leaderboard', { date: yyyymmdd }, function (row) {
                    if (score > row.score) {
                        row.score = score;
                    }
                    return row;
                });
            }
            Properties.db.commit();
        };
        Properties.getLeaderboard = function (count) {
            return Properties.db.queryAll('leaderboard', { limit: count, sort: [['score', 'DESC']] });
        };
        Properties.db = null;
        Properties.dbname = "";
        Properties.properties = null;
        /*
         * Set Game Property in local storage
         *
         * @param property name
         * @param property value
         * @return nothing
         */
        Properties.set = function (prop, value) {
            Properties.db.update("settings", {
                name: prop
            }, function (row) {
                row.value = "" + value;
                return row;
            });
            Properties.db.commit();
        };
        return Properties;
    })();
    bosco.Properties = Properties;
})(bosco || (bosco = {}));
//# sourceMappingURL=Properties.js.map
/**
 * Bosco.ts
 *
 * Game Shell
 *
 *     __  __         ___                            ___  ___
 *    / /_/ /  ___   / _ \___ _    _____ ____  ___  / _/ / _ )___  ___ _______
 *   / __/ _ \/ -_) / ___/ _ \ |/|/ / -_) __/ / _ \/ _/ / _  / _ \(_-</ __/ _ \
 *   \__/_//_/\__/ /_/   \___/__,__/\__/_/    \___/_/  /____/\___/___/\__/\___/
 *
 */
var bosco;
(function (bosco) {
    var Container = PIXI.Container;
    var Input = bosco.utils.Input;
    (function (ScaleType) {
        ScaleType[ScaleType["FILL"] = 0] = "FILL";
        ScaleType[ScaleType["FIXED"] = 1] = "FIXED"; // scale fixed size to fit the screen
    })(bosco.ScaleType || (bosco.ScaleType = {}));
    var ScaleType = bosco.ScaleType;
    bosco.config;
    /**
     * Load assets and start
     */
    function start(config) {
        //if (config.properties) {
        //  Properties.init(config.namespace, config.properties);
        //}
        for (var asset in config.assets) {
            PIXI.loader.add(asset, config.assets[asset]);
        }
        PIXI.loader.load(function (loader, resources) { return new Game(config, resources); });
    }
    bosco.start = start;
    var DummyStats = (function () {
        function DummyStats() {
        }
        DummyStats.prototype.begin = function () { };
        DummyStats.prototype.end = function () { };
        return DummyStats;
    })();
    var Game = (function () {
        /**
         * Create the game instance
         * @param resources
         */
        function Game(config, resources) {
            var _this = this;
            /**
             * Game Loop
             * @param time
             */
            this.update = function (time) { };
            /**
             * Resize window
             */
            this.resize = function () {
                var ratio = Math.min(window.innerWidth / _this.config.width, window.innerHeight / _this.config.height);
                _this.config.scale = ratio;
                _this.stage.scale.x = _this.stage.scale.y = ratio;
                _this.renderer.resize(Math.ceil(_this.config.width * ratio), Math.ceil(_this.config.height * ratio));
            };
            console.log('asset', window.devicePixelRatio, config.assets);
            var controllers = [];
            var temp;
            var previousTime;
            this.config = bosco.config = config;
            this.resources = resources;
            var renderer = this.renderer = PIXI.autoDetectRenderer(config.width, config.height, config.options);
            renderer.view.style.position = 'absolute';
            renderer.view.style.top = '0px';
            renderer.view.style.left = '0px';
            var stage = this.stage = new Container();
            viewContainer = this.sprites = new Container();
            foreContainer = this.fore = new Container();
            this.resize();
            document.body.appendChild(renderer.view);
            if (config.stats) {
                var stats = this.stats = new Stats();
                stats.setMode(0);
                stats.domElement.style.position = 'absolute';
                stats.domElement.style.left = '0px';
                stats.domElement.style.top = '0px';
                document.body.appendChild(stats.domElement);
                /**
                 *
                 * @param time
                 */
                this.update = function (time) {
                    stats.begin();
                    temp = previousTime || time;
                    previousTime = time;
                    var delta = (time - temp) * 0.001;
                    for (var i = 0, l = controllers.length; i < l; i++) {
                        controllers[i].update(delta);
                    }
                    renderer.render(stage);
                    stats.end();
                    requestAnimationFrame(_this.update);
                    Input.update();
                    TWEEN.update();
                };
            }
            else {
                /**
                 *
                 * @param time
                 */
                this.update = function (time) {
                    temp = previousTime || time;
                    previousTime = time;
                    var delta = (time - temp) * 0.001;
                    for (var i = 0, l = controllers.length; i < l; i++) {
                        controllers[i].update(delta);
                    }
                    renderer.render(stage);
                    requestAnimationFrame(_this.update);
                    Input.update();
                    TWEEN.update();
                };
            }
            window.addEventListener('resize', this.resize, true);
            window.onorientationchange = this.resize;
            stage.addChild(this.sprites);
            stage.addChild(this.fore);
            for (var _i = 0, _a = config.controllers; _i < _a.length; _i++) {
                var className = _a[_i];
                var Class = window[config.namespace][className];
                controllers.push(new Class());
            }
            for (var _b = 0; _b < controllers.length; _b++) {
                var controller = controllers[_b];
                controller.start();
            }
            requestAnimationFrame(this.update);
        }
        return Game;
    })();
    bosco.Game = Game;
})(bosco || (bosco = {}));
//# sourceMappingURL=Bosco.js.map
/*
	Kailash Nadh (http://nadh.in)

	localStorageDB v 2.3.1
	A simple database layer for localStorage

	v 2.3.1 Mar 2015
	v 2.3 Feb 2014 Contribution: Christian Kellner (http://orange-coding.net)
	v 2.2 Jan 2014 Contribution: Andy Hawkins (http://a904guy.com) 
	v 2.1 Nov 2013
	v 2.0 June 2013
	v 1.9 Nov 2012

	License	:	MIT License
*/

!(function (_global, undefined) {
	function chromeStorageDB(db_name, engine, next) {
		if (next == null) {
			next = engine;
			engine = null;
		}
		var db_prefix = 'db_',
			db_id = db_prefix + db_name,
			db_new = false,	// this flag determines whether a new database was created during an object initialisation
			db = null,
			storage;

			try {
				if (chrome.storage != null) {
					storage = (engine == chrome.storage.sync ? chrome.storage.sync: chrome.storage.local);
				} else {
					storage = (engine == sessionStorage ? sessionStorage: localStorage);
				}
			} catch(e) { // ie8 hack
				storage = engine;
			}

		// if the database doesn't exist, create it
		if (chrome.storage == null) {
			db = storage[db_id];
			if (!( db && (db = JSON.parse(db)) && db.tables && db.data )) {
				if (!validateName(db_name)) {
					error("The name '" + db_name + "' contains invalid characters");
				} else {
					db = {tables: {}, data: {}};
					commit();
					db_new = true;
				}
			}
			if (next) return next(publicInterface(db));
		} else {
			storage.get(db_id, function(items) {
				db = items[db_id];
				if (!( db && (db = JSON.parse(db)) && db.tables && db.data )) {
					if (!validateName(db_name)) {
						error("The name '" + db_name + "' contains invalid characters");
					} else {
						db = {tables: {}, data: {}};
						commit(function() {
							db_new = true;
							return next(publicInterface(db));
						});
					}
				}
				return next(publicInterface(db));
			});
		}



		// ______________________ private methods

		// _________ database functions
		// drop the database
		function drop(next) {
			if (chrome.storage == null) {
				if(storage.hasOwnProperty(db_id)) {
					delete storage[db_id];
				}
				db = null;
				if (next) return next();
			} else {
				storage.remove(db_id, next);
				db = null;
			}
		}

		// number of tables in the database
		function tableCount() {
			var count = 0;
			for(var table in db.tables) {
				if( db.tables.hasOwnProperty(table) ) {
					count++;
				}
			}
			return count;
		}

		// _________ table functions

		// returns all fields in a table.
		function tableFields(table_name) {
			return db.tables[table_name].fields;
		}

		// check whether a table exists
		function tableExists(table_name) {
			return db.tables[table_name] ? true : false;
		}

		// check whether a table exists, and if not, throw an error
		function tableExistsWarn(table_name) {
			if(!tableExists(table_name)) {
				error("The table '" + table_name + "' does not exist");
			}
		}

		// check whether a table column exists
		function columnExists(table_name, field_name) {
			var exists = false;
			var table_fields = db.tables[table_name].fields;
			for(var field in table_fields){
				if(table_fields[field] == field_name)
				{
					exists = true;
					break;
				}
			}
			return exists;
		}

		// create a table
		function createTable(table_name, fields) {
			db.tables[table_name] = {fields: fields, auto_increment: 1};
			db.data[table_name] = {};
		}

		// drop a table
		function dropTable(table_name) {
			delete db.tables[table_name];
			delete db.data[table_name];
		}

		// empty a table
		function truncate(table_name) {
			db.tables[table_name].auto_increment = 1;
			db.data[table_name] = {};
		}

		//alter a table
		function alterTable(table_name, new_fields, default_values){
			db.tables[table_name].fields = db.tables[table_name].fields.concat(new_fields);

			// insert default values in existing table
			if(typeof default_values != "undefined") {
				// loop through all the records in the table
				for(var ID in db.data[table_name]) {
					if( !db.data[table_name].hasOwnProperty(ID) ) {
						continue;
					}
					for(var field in new_fields) {
						if(typeof default_values == "object") {
							db.data[table_name][ID][new_fields[field]] = default_values[new_fields[field]];
						} else {
							db.data[table_name][ID][new_fields[field]] = default_values;
						}
					}
				}
			}
		}

		// number of rows in a table
		function rowCount(table_name) {
			var count = 0;
			for(var ID in db.data[table_name]) {
				if( db.data[table_name].hasOwnProperty(ID) ) {
					count++;
				}
			}
			return count;
		}

		// insert a new row
		function insert(table_name, data) {
			data.ID = db.tables[table_name].auto_increment;
			db.data[table_name][ db.tables[table_name].auto_increment ] = data;
			db.tables[table_name].auto_increment++;
			return data.ID;
		}

		// select rows, given a list of IDs of rows in a table
		function select(table_name, ids, start, limit, sort, distinct) {
			var ID = null, results = [], row = null;

			for(var i=0; i<ids.length; i++) {
				ID = ids[i];
				row = db.data[table_name][ID];
				results.push( clone(row) );
			}

			// there are sorting params
			if(sort && sort instanceof Array) {
				for(var i=0; i<sort.length; i++) {
					results.sort(sort_results(sort[i][0], sort[i].length > 1 ? sort[i][1] : null));
				}
			}

			// distinct params
			if(distinct && distinct instanceof Array) {
				for(var j=0; j<distinct.length; j++) {
					var seen = {}, d = distinct[j];

					for(var i=0; i<results.length; i++) {
						if(results[i] === undefined) {
							continue;
						}

						if(results[i].hasOwnProperty(d) && seen.hasOwnProperty(results[i][d])) {
							delete(results[i]);
						} else {
							seen[results[i][d]] = 1;
						}
					}
				}

				// can't use .filter(ie8)
				var new_results = [];
				for(var i=0; i<results.length; i++) {
					if(results[i] !== undefined) {
						new_results.push(results[i]);
					}
				}

				results = new_results;
			}

			// limit and offset
			start = start && typeof start === "number" ? start : null;
			limit = limit && typeof limit === "number" ? limit : null;

			if(start && limit) {
				results = results.slice(start, start+limit);
			} else if(start) {
				results = results.slice(start);
			} else if(limit) {
				results = results.slice(start, limit);
			}

			return results;
		}

		// sort a result set
		function sort_results(field, order) {
			return function(x, y) {
				// case insensitive comparison for string values
				var v1 = typeof(x[field]) === "string" ? x[field].toLowerCase() : x[field],
					v2 = typeof(y[field]) === "string" ? y[field].toLowerCase() : y[field];

				if(order === "DESC") {
					return v1 == v2 ? 0 : (v1 < v2 ? 1 : -1);
				} else {
					return v1 == v2 ? 0 : (v1 > v2 ? 1 : -1);
				}
			};
		}

		// select rows in a table by field-value pairs, returns the IDs of matches
		function queryByValues(table_name, data) {
			var result_ids = [],
				exists = false,
				row = null;

			// loop through all the records in the table, looking for matches
			for(var ID in db.data[table_name]) {
				if( !db.data[table_name].hasOwnProperty(ID) ) {
					continue;
				}

				row = db.data[table_name][ID];
				exists = true;

				for(var field in data) {
					if( !data.hasOwnProperty(field) ) {
						continue;
					}

					if(typeof data[field] == 'string') {	// if the field is a string, do a case insensitive comparison
						if( row[field] === null || row[field].toString().toLowerCase() != data[field].toString().toLowerCase() ) {
							exists = false;
							break;
						}
					} else {
						if(row[field] != data[field]) {
							exists = false;
							break;
						}
					}
				}
				if(exists) {
					result_ids.push(ID);
				}
			}

			return result_ids;
		}

		// select rows in a table by a function, returns the IDs of matches
		function queryByFunction(table_name, query_function) {
			var result_ids = [],
				exists = false,
				row = null;

			// loop through all the records in the table, looking for matches
			for(var ID in db.data[table_name]) {
				if( !db.data[table_name].hasOwnProperty(ID) ) {
					continue;
				}

				row = db.data[table_name][ID];

				if( query_function( clone(row) ) == true ) {	// it's a match if the supplied conditional function is satisfied
					result_ids.push(ID);
				}
			}

			return result_ids;
		}

		// return all the IDs in a table
		function getIDs(table_name) {
			var result_ids = [];

			for(var ID in db.data[table_name]) {
				if( db.data[table_name].hasOwnProperty(ID) ) {
					result_ids.push(ID);
				}
			}
			return result_ids;
		}

		// delete rows, given a list of their IDs in a table
		function deleteRows(table_name, ids) {
			for(var i=0; i<ids.length; i++) {
				if( db.data[table_name].hasOwnProperty(ids[i]) ) {
					delete db.data[table_name][ ids[i] ];
				}
			}
			return ids.length;
		}

		// update rows
		function update(table_name, ids, update_function) {
			var ID = '', num = 0;

			for(var i=0; i<ids.length; i++) {
				ID = ids[i];

				var updated_data = update_function( clone(db.data[table_name][ID]) );

				if(updated_data) {
					delete updated_data['ID']; // no updates possible to ID

					var new_data = db.data[table_name][ID];
					// merge updated data with existing data
					for(var field in updated_data) {
						if( updated_data.hasOwnProperty(field) ) {
							new_data[field] = updated_data[field];
						}
					}

					db.data[table_name][ID] = validFields(table_name, new_data);
					num++;
				}
			}
			return num;
		}

		// commit the database to localStorage
		function commit(next) {
			if (chrome.storage == null) {
				try {
					storage.setItem(db_id, JSON.stringify(db));
					if (next) return next(true);
					return true;
				} catch(e) {
					if (next) return next(false);
					return false;
				}
			} else {
				var items = {};
				items[db_id] = JSON.stringify(db);
				storage.set(items, next);
			}
		}

		// serialize the database
		function serialize() {
			return JSON.stringify(db);
		}

		// throw an error
		function error(msg) {
			throw new Error(msg);
		}

		// clone an object
		function clone(obj) {
			var new_obj = {};
			for(var key in obj) {
				if( obj.hasOwnProperty(key) ) {
					new_obj[key] = obj[key];
				}
			}
			return new_obj;
		}

		// validate db, table, field names (alpha-numeric only)
		function validateName(name) {
			return name.toString().match(/[^a-z_0-9]/ig) ? false : true;
		}

		// given a data list, only retain valid fields in a table
		function validFields(table_name, data) {
			var field = '', new_data = {};

			for(var i=0; i<db.tables[table_name].fields.length; i++) {
				field = db.tables[table_name].fields[i];

				if (data[field] !== undefined) {
					new_data[field] = data[field];
				}
			}
			return new_data;
		}

		// given a data list, populate with valid field names of a table
		function validateData(table_name, data) {
			var field = '', new_data = {};
			for(var i=0; i<db.tables[table_name].fields.length; i++) {
				field = db.tables[table_name].fields[i];
				new_data[field] = (data[field] === null || data[field] === undefined) ? null : data[field];
			}
			return new_data;
		}

		function publicInterface(db) {
			// ______________________ public methods

			return {
				// commit the database to localStorage
				commit: function(next) {
					return commit(next);
				},

				// is this instance a newly created database?
				isNew: function() {
					return db_new;
				},

				// delete the database
				drop: function() {
					drop();
				},

				// serialize the database
				serialize: function() {
					return serialize();
				},

				// check whether a table exists
				tableExists: function(table_name) {
					return tableExists(table_name);
				},

				// list of keys in a table
				tableFields: function(table_name) {
					return tableFields(table_name);
				},

				// number of tables in the database
				tableCount: function() {
					return tableCount();
				},

				columnExists: function(table_name, field_name){
					return columnExists(table_name, field_name);
				},

				// create a table
				createTable: function(table_name, fields) {
					var result = false;
					if(!validateName(table_name)) {
						error("The database name '" + table_name + "' contains invalid characters.");
					} else if(this.tableExists(table_name)) {
						error("The table name '" + table_name + "' already exists.");
					} else {
						// make sure field names are valid
						var is_valid = true;
						for(var i=0; i<fields.length; i++) {
							if(!validateName(fields[i])) {
								is_valid = false;
								break;
							}
						}

						if(is_valid) {
							// cannot use indexOf due to <IE9 incompatibility
							// de-duplicate the field list
							var fields_literal = {};
							for(var i=0; i<fields.length; i++) {
								fields_literal[ fields[i] ] = true;
							}
							delete fields_literal['ID']; // ID is a reserved field name

							fields = ['ID'];
							for(var field in fields_literal) {
								if( fields_literal.hasOwnProperty(field) ) {
									fields.push(field);
								}
							}

							createTable(table_name, fields);
							result = true;
						} else {
							error("One or more field names in the table definition contains invalid characters");
						}
					}

					return result;
				},

				// Create a table using array of Objects @ [{k:v,k:v},{k:v,k:v},etc]
				createTableWithData: function(table_name, data, next) {
					if(typeof data !== 'object' || !data.length || data.length < 1) {
						error("Data supplied isn't in object form. Example: [{k:v,k:v},{k:v,k:v} ..]");
					}

					var fields = Object.keys(data[0]);

					// create the table
					if( this.createTable(table_name, fields) ) {
						this.commit(function() {

							// populate
							for (var i=0; i<data.length; i++) {
								if( !insert(table_name, data[i]) ) {
									error("Failed to insert record: [" + JSON.stringify(data[i]) + "]");
								}
							}
							this.commit(next);
						});
					}
					return true;
				},

				// drop a table
				dropTable: function(table_name) {
					tableExistsWarn(table_name);
					dropTable(table_name);
				},

				// empty a table
				truncate: function(table_name) {
					tableExistsWarn(table_name);
					truncate(table_name);
				},

				// alter a table
				alterTable: function(table_name, new_fields, default_values) {
					var result = false;
					if(!validateName(table_name)) {
						error("The database name '" + table_name + "' contains invalid characters");
					} else {
						if(typeof new_fields == "object") {
							// make sure field names are valid
							var is_valid = true;
							for(var i=0; i<new_fields.length; i++) {
								if(!validateName(new_fields[i])) {
									is_valid = false;
									break;
								}
							}

							if(is_valid) {
								// cannot use indexOf due to <IE9 incompatibility
								// de-duplicate the field list
								var fields_literal = {};
								for(var i=0; i<new_fields.length; i++) {
									fields_literal[ new_fields[i] ] = true;
								}
								delete fields_literal['ID']; // ID is a reserved field name

								new_fields = [];
								for(var field in fields_literal) {
									if( fields_literal.hasOwnProperty(field) ) {
										new_fields.push(field);
									}
								}

								alterTable(table_name, new_fields, default_values);
								result = true;
							} else {
								error("One or more field names in the table definition contains invalid characters");
							}
						} else if(typeof new_fields == "string") {
							if(validateName(new_fields)) {
								var new_fields_array = [];
								new_fields_array.push(new_fields);
								alterTable(table_name, new_fields_array, default_values);
								result = true;
							} else {
								error("One or more field names in the table definition contains invalid characters");
							}
						}
					}

					return result;
				},

				// number of rows in a table
				rowCount: function(table_name) {
					tableExistsWarn(table_name);
					return rowCount(table_name);
				},

				// insert a row
				insert: function(table_name, data) {
					tableExistsWarn(table_name);
					return insert(table_name, validateData(table_name, data) );
				},

				// insert or update based on a given condition
				insertOrUpdate: function(table_name, query, data) {
					tableExistsWarn(table_name);

					var result_ids = [];
					if(!query) {
						result_ids = getIDs(table_name);				// there is no query. applies to all records
					} else if(typeof query == 'object') {				// the query has key-value pairs provided
						result_ids = queryByValues(table_name, validFields(table_name, query));
					} else if(typeof query == 'function') {				// the query has a conditional map function provided
						result_ids = queryByFunction(table_name, query);
					}

					// no existing records matched, so insert a new row
					if(result_ids.length == 0) {
						return insert(table_name, validateData(table_name, data) );
					} else {
						var ids = [];
						for(var n=0; n<result_ids.length; n++) {
							update(table_name, result_ids, function(o) {
								ids.push(o.ID);
								return data;
							});
						}

						return ids;
					}
				},

				// update rows
				update: function(table_name, query, update_function) {
					tableExistsWarn(table_name);

					var result_ids = [];
					if(!query) {
						result_ids = getIDs(table_name);				// there is no query. applies to all records
					} else if(typeof query == 'object') {				// the query has key-value pairs provided
						result_ids = queryByValues(table_name, validFields(table_name, query));
					} else if(typeof query == 'function') {				// the query has a conditional map function provided
						result_ids = queryByFunction(table_name, query);
					}
					return update(table_name, result_ids, update_function);
				},

				// select rows
				query: function(table_name, query, limit, start, sort, distinct) {
					tableExistsWarn(table_name);

					var result_ids = [];
					if(!query) {
						result_ids = getIDs(table_name, limit, start); // no conditions given, return all records
					} else if(typeof query == 'object') {			// the query has key-value pairs provided
						result_ids = queryByValues(table_name, validFields(table_name, query), limit, start);
					} else if(typeof query == 'function') {		// the query has a conditional map function provided
						result_ids = queryByFunction(table_name, query, limit, start);
					}

					return select(table_name, result_ids, start, limit, sort, distinct);
				},

				// alias for query() that takes a dict of params instead of positional arrguments
				queryAll: function(table_name, params) {
					if(!params) {
						return this.query(table_name)
					} else {
						return this.query(table_name,
							params.hasOwnProperty('query') ? params.query : null,
							params.hasOwnProperty('limit') ? params.limit : null,
							params.hasOwnProperty('start') ? params.start : null,
							params.hasOwnProperty('sort') ? params.sort : null,
							params.hasOwnProperty('distinct') ? params.distinct : null
						);
					}
				},

				// delete rows
				deleteRows: function(table_name, query) {
					tableExistsWarn(table_name);

					var result_ids = [];
					if(!query) {
						result_ids = getIDs(table_name);
					} else if(typeof query == 'object') {
						result_ids = queryByValues(table_name, validFields(table_name, query));
					} else if(typeof query == 'function') {
						result_ids = queryByFunction(table_name, query);
					}
					return deleteRows(table_name, result_ids);
				}
			}
		}

	}

	// make amd compatible
	if(typeof define === 'function' && define.amd) {
		define(function() {
			return chromeStorageDB;
		});
	} else {
		_global['chromeStorageDB'] = chromeStorageDB;
	}

}(window));

var __extends=this&&this.__extends||function(d,b){for(var p in b)if(b.hasOwnProperty(p))d[p]=b[p];function __(){this.constructor=d}d.prototype=b===null?Object.create(b):(__.prototype=b.prototype,new __)};var entitas;
(function(entitas){var Exception=function(){function Exception(message){this.message=message}Exception.prototype.toString=function(){return this.message};return Exception}();entitas.Exception=Exception;var EntityAlreadyHasComponentException=function(_super){__extends(EntityAlreadyHasComponentException,_super);function EntityAlreadyHasComponentException(message,index){_super.call(this,message+"\nEntity already has a component at index "+index)}return EntityAlreadyHasComponentException}(Exception);
entitas.EntityAlreadyHasComponentException=EntityAlreadyHasComponentException;var EntityDoesNotHaveComponentException=function(_super){__extends(EntityDoesNotHaveComponentException,_super);function EntityDoesNotHaveComponentException(message,index){_super.call(this,message+"\nEntity does not have a component at index "+index)}return EntityDoesNotHaveComponentException}(Exception);entitas.EntityDoesNotHaveComponentException=EntityDoesNotHaveComponentException;var EntityIsNotEnabledException=function(_super){__extends(EntityIsNotEnabledException,
_super);function EntityIsNotEnabledException(message){_super.call(this,message+"\nEntity is not enabled")}return EntityIsNotEnabledException}(Exception);entitas.EntityIsNotEnabledException=EntityIsNotEnabledException;var EntityIsAlreadyReleasedException=function(_super){__extends(EntityIsAlreadyReleasedException,_super);function EntityIsAlreadyReleasedException(){_super.call(this,"Entity is already released!")}return EntityIsAlreadyReleasedException}(Exception);entitas.EntityIsAlreadyReleasedException=
EntityIsAlreadyReleasedException;var SingleEntityException=function(_super){__extends(SingleEntityException,_super);function SingleEntityException(matcher){_super.call(this,"Multiple entities exist matching "+matcher)}return SingleEntityException}(Exception);entitas.SingleEntityException=SingleEntityException;var GroupObserverException=function(_super){__extends(GroupObserverException,_super);function GroupObserverException(message){_super.call(this,message)}return GroupObserverException}(Exception);
entitas.GroupObserverException=GroupObserverException;var PoolDoesNotContainEntityException=function(_super){__extends(PoolDoesNotContainEntityException,_super);function PoolDoesNotContainEntityException(entity,message){_super.call(this,message+"\nPool does not contain entity "+entity)}return PoolDoesNotContainEntityException}(Exception);entitas.PoolDoesNotContainEntityException=PoolDoesNotContainEntityException;var EntityIsNotDestroyedException=function(_super){__extends(EntityIsNotDestroyedException,
_super);function EntityIsNotDestroyedException(message){_super.call(this,message+"\nEntity is not destroyed yet!")}return EntityIsNotDestroyedException}(Exception);entitas.EntityIsNotDestroyedException=EntityIsNotDestroyedException;var MatcherException=function(_super){__extends(MatcherException,_super);function MatcherException(matcher){_super.call(this,"matcher.indices.length must be 1 but was "+matcher.indices.length)}return MatcherException}(Exception);entitas.MatcherException=MatcherException})(entitas||
(entitas={}));var entitas;
(function(entitas){var Signal=function(){function Signal(context,alloc){if(alloc===void 0)alloc=16;this._listeners=[];this._context=context;this._alloc=alloc;this._size=0}Signal.prototype.dispatch=function(){var args=[];for(var _i=0;_i<arguments.length;_i++)args[_i-0]=arguments[_i];var listeners=this._listeners;var size=listeners.length;var context=this._context;for(var i=0;i<size;i++)listeners[i].apply(context,args)};Signal.prototype.add=function(listener){this._listeners.push(listener)};Signal.prototype.remove=
function(listener){var listeners=this._listeners;var index=listeners.indexOf(listener);if(index!==-1)listeners.splice(index,1)};Signal.prototype.clear=function(){this._listeners.length=0};return Signal}();entitas.Signal=Signal})(entitas||(entitas={}));var entitas;
(function(entitas){var MatcherException=entitas.MatcherException;var Matcher=function(){function Matcher(){this._id=Matcher.uniqueId++}Object.defineProperty(Matcher.prototype,"id",{get:function(){return this._id},enumerable:true,configurable:true});Object.defineProperty(Matcher.prototype,"indices",{get:function(){if(!this._indices)this._indices=this.mergeIndices();return this._indices},enumerable:true,configurable:true});Object.defineProperty(Matcher.prototype,"allOfIndices",{get:function(){return this._allOfIndices},
enumerable:true,configurable:true});Object.defineProperty(Matcher.prototype,"anyOfIndices",{get:function(){return this._anyOfIndices},enumerable:true,configurable:true});Object.defineProperty(Matcher.prototype,"noneOfIndices",{get:function(){return this._noneOfIndices},enumerable:true,configurable:true});Matcher.prototype.anyOf=function(){var args=[];for(var _i=0;_i<arguments.length;_i++)args[_i-0]=arguments[_i];if("number"===typeof args[0]||"string"===typeof args[0]){this._anyOfIndices=Matcher.distinctIndices(args);
this._indices=undefined;return this}else return this.anyOf.apply(this,Matcher.mergeIndices(args))};Matcher.prototype.noneOf=function(){var args=[];for(var _i=0;_i<arguments.length;_i++)args[_i-0]=arguments[_i];if("number"===typeof args[0]||"string"===typeof args[0]){this._noneOfIndices=Matcher.distinctIndices(args);this._indices=undefined;return this}else return this.noneOf.apply(this,Matcher.mergeIndices(args))};Matcher.prototype.matches=function(entity){var matchesAllOf=this._allOfIndices===undefined||
entity.hasComponents(this._allOfIndices);var matchesAnyOf=this._anyOfIndices===undefined||entity.hasAnyComponent(this._anyOfIndices);var matchesNoneOf=this._noneOfIndices===undefined||!entity.hasAnyComponent(this._noneOfIndices);return matchesAllOf&&matchesAnyOf&&matchesNoneOf};Matcher.prototype.mergeIndices=function(){var indicesList=[];if(this._allOfIndices!==undefined)indicesList=indicesList.concat(this._allOfIndices);if(this._anyOfIndices!==undefined)indicesList=indicesList.concat(this._anyOfIndices);
if(this._noneOfIndices!==undefined)indicesList=indicesList.concat(this._noneOfIndices);return Matcher.distinctIndices(indicesList)};Matcher.prototype.toString=function(){if(this._toStringCache===undefined){var sb=[];if(this._allOfIndices!==undefined)Matcher.appendIndices(sb,"AllOf",this._allOfIndices);if(this._anyOfIndices!==undefined){if(this._allOfIndices!==undefined)sb.push(".");Matcher.appendIndices(sb,"AnyOf",this._anyOfIndices)}if(this._noneOfIndices!==undefined)Matcher.appendIndices(sb,".NoneOf",
this._noneOfIndices);this._toStringCache=sb.join("")}return this._toStringCache};Matcher.prototype.equals=function(obj){if(obj==null||obj===undefined)return false;var matcher=obj;if(!Matcher.equalIndices(matcher.allOfIndices,this._allOfIndices))return false;if(!Matcher.equalIndices(matcher.anyOfIndices,this._anyOfIndices))return false;if(!Matcher.equalIndices(matcher.noneOfIndices,this._noneOfIndices))return false;return true};Matcher.equalIndices=function(i1,i2){if(i1===undefined!=(i2===undefined))return false;
if(i1===undefined)return true;if(i1.length!==i2.length)return false;for(var i=0,indicesLength=i1.length;i<indicesLength;i++)if(i1[i]!=i2[i])return false;return true};Matcher.distinctIndices=function(indices){var indicesSet={};for(var i=0,l=indices.length;i<l;i++){var k=""+indices[i];indicesSet[k]=i}return[].concat(Object.keys(indicesSet))};Matcher.mergeIndices=function(matchers){var indices=[];for(var i=0,matchersLength=matchers.length;i<matchersLength;i++){var matcher=matchers[i];if(matcher.indices.length!==
1)throw new MatcherException(matcher);indices[i]=matcher.indices[0]}return indices};Matcher.allOf=function(){var args=[];for(var _i=0;_i<arguments.length;_i++)args[_i-0]=arguments[_i];if("number"===typeof args[0]||"string"===typeof args[0]){var matcher=new Matcher;matcher._allOfIndices=Matcher.distinctIndices(args);return matcher}else return Matcher.allOf.apply(this,Matcher.mergeIndices(args))};Matcher.anyOf=function(){var args=[];for(var _i=0;_i<arguments.length;_i++)args[_i-0]=arguments[_i];if("number"===
typeof args[0]||"string"===typeof args[0]){var matcher=new Matcher;matcher._anyOfIndices=Matcher.distinctIndices(args);return matcher}else return Matcher.anyOf.apply(this,Matcher.mergeIndices(args))};Matcher.appendIndices=function(sb,prefix,indexArray){var SEPERATOR=", ";sb.push(prefix);sb.push("(");var lastSeperator=indexArray.length-1;for(var i=0,indicesLength=indexArray.length;i<indicesLength;i++){sb.push(""+indexArray[i]);if(i<lastSeperator)sb.push(SEPERATOR)}sb.push(")")};Matcher.uniqueId=0;
return Matcher}();entitas.Matcher=Matcher})(entitas||(entitas={}));var entitas;(function(entitas){var TriggerOnEvent=function(){function TriggerOnEvent(trigger,eventType){this.trigger=trigger;this.eventType=eventType}return TriggerOnEvent}();entitas.TriggerOnEvent=TriggerOnEvent})(entitas||(entitas={}));var entitas;
(function(entitas){var Signal=entitas.Signal;var EntityIsNotEnabledException=entitas.EntityIsNotEnabledException;var EntityIsAlreadyReleasedException=entitas.EntityIsAlreadyReleasedException;var EntityAlreadyHasComponentException=entitas.EntityAlreadyHasComponentException;var EntityDoesNotHaveComponentException=entitas.EntityDoesNotHaveComponentException;var Entity=function(){function Entity(totalComponents){if(totalComponents===void 0)totalComponents=16;this._creationIndex=0;this._isEnabled=true;
this._refCount=0;this.onEntityReleased=new Signal(this);this.onComponentAdded=new Signal(this);this.onComponentRemoved=new Signal(this);this.onComponentReplaced=new Signal(this);this._components=new Array(totalComponents)}Object.defineProperty(Entity.prototype,"creationIndex",{get:function(){return this._creationIndex},enumerable:true,configurable:true});Entity.prototype.addComponent=function(index,component){if(!this._isEnabled)throw new EntityIsNotEnabledException("Cannot add component!");if(this.hasComponent(index)){var errorMsg=
"Cannot add component at index "+index+" to "+this;throw new EntityAlreadyHasComponentException(errorMsg,index);}this._components[index]=component;this._componentsCache=undefined;this._componentIndicesCache=undefined;this._toStringCache=undefined;this.onComponentAdded.dispatch(this,index,component);return this};Entity.prototype.removeComponent=function(index){if(!this._isEnabled)throw new EntityIsNotEnabledException("Cannot remove component!");if(!this.hasComponent(index)){var errorMsg="Cannot remove component at index "+
index+" from "+this;throw new EntityDoesNotHaveComponentException(errorMsg,index);}this._replaceComponent(index,undefined);return this};Entity.prototype.replaceComponent=function(index,component){if(!this._isEnabled)throw new EntityIsNotEnabledException("Cannot replace component!");if(this.hasComponent(index))this._replaceComponent(index,component);else if(component!==undefined)this.addComponent(index,component);return this};Entity.prototype._replaceComponent=function(index,replacement){var previousComponent=
this._components[index];if(previousComponent===replacement)this.onComponentReplaced.dispatch(this,index,previousComponent,replacement);else{this._components[index]=replacement;this._componentsCache=undefined;if(replacement===undefined){delete this._components[index];this._componentIndicesCache=undefined;this._toStringCache=undefined;this.onComponentRemoved.dispatch(this,index,previousComponent)}else this.onComponentReplaced.dispatch(this,index,previousComponent,replacement)}};Entity.prototype.getComponent=
function(index){if(!this.hasComponent(index)){var errorMsg="Cannot get component at index "+index+" from "+this;throw new EntityDoesNotHaveComponentException(errorMsg,index);}return this._components[index]};Entity.prototype.getComponents=function(){if(this._componentsCache===undefined){var components=[];for(var i=0,componentsLength=this._components.length;i<componentsLength;i++){var component=this._components[i];if(component!==undefined)components.push(component)}this._componentsCache=components}return this._componentsCache};
Entity.prototype.getComponentIndices=function(){if(this._componentIndicesCache===undefined){var indices=[];for(var i=0,componentsLength=this._components.length;i<componentsLength;i++)if(this._components[i]!==undefined)indices.push(i);this._componentIndicesCache=indices}return this._componentIndicesCache};Entity.prototype.hasComponent=function(index){return this._components[index]!==undefined};Entity.prototype.hasComponents=function(indices){for(var i=0,indicesLength=indices.length;i<indicesLength;i++)if(this._components[indices[i]]===
undefined)return false;return true};Entity.prototype.hasAnyComponent=function(indices){for(var i=0,indicesLength=indices.length;i<indicesLength;i++)if(this._components[indices[i]]!==undefined)return true;return false};Entity.prototype.removeAllComponents=function(){this._toStringCache=undefined;for(var i=0,componentsLength=this._components.length;i<componentsLength;i++)if(this._components[i]!==undefined)this._replaceComponent(i,undefined)};Entity.prototype.destroy=function(){this.removeAllComponents();
this.onComponentAdded.clear();this.onComponentReplaced.clear();this.onComponentRemoved.clear();this._isEnabled=false};Entity.prototype.toString=function(){if(this._toStringCache===undefined){var sb=[];sb.push("Entity_");sb.push(this._creationIndex);sb.push("(");var seperator=", ";var components=this.getComponents();var lastSeperator=components.length-1;for(var i=0,componentsLength=components.length;i<componentsLength;i++){sb.push(this._componentsEnum[i]);if(i<lastSeperator)sb.push(seperator)}sb.push(")");
this._toStringCache=sb.join("")}return this._toStringCache};Entity.prototype.addRef=function(){this._refCount+=1;return this};Entity.prototype.release=function(){this._refCount-=1;if(this._refCount===0)this.onEntityReleased.dispatch(this);else if(this._refCount<0)throw new EntityIsAlreadyReleasedException;};return Entity}();entitas.Entity=Entity})(entitas||(entitas={}));var entitas;
(function(entitas){var Signal=entitas.Signal;var SingleEntityException=entitas.SingleEntityException;var Group=function(){function Group(matcher){this._entities={};this.onEntityAdded=new Signal(this);this.onEntityRemoved=new Signal(this);this.onEntityUpdated=new Signal(this);this._matcher=matcher}Object.defineProperty(Group.prototype,"count",{get:function(){return Object.keys(this._entities).length},enumerable:true,configurable:true});Object.defineProperty(Group.prototype,"matcher",{get:function(){return this._matcher},
enumerable:true,configurable:true});Group.prototype.handleEntitySilently=function(entity){if(this._matcher.matches(entity))this.addEntitySilently(entity);else this.removeEntitySilently(entity)};Group.prototype.handleEntity=function(entity,index,component){if(this._matcher.matches(entity))this.addEntity(entity,index,component);else this.removeEntity(entity,index,component)};Group.prototype.updateEntity=function(entity,index,previousComponent,newComponent){if(entity.creationIndex in this._entities){this.onEntityRemoved.dispatch(this,
entity,index,previousComponent);this.onEntityAdded.dispatch(this,entity,index,newComponent);this.onEntityUpdated.dispatch(this,entity,index,previousComponent,newComponent)}};Group.prototype.addEntitySilently=function(entity){if(!(entity.creationIndex in this._entities)){this._entities[entity.creationIndex]=entity;this._entitiesCache=undefined;this._singleEntityCache=undefined;entity.addRef()}};Group.prototype.addEntity=function(entity,index,component){if(!(entity.creationIndex in this._entities)){this._entities[entity.creationIndex]=
entity;this._entitiesCache=undefined;this._singleEntityCache=undefined;entity.addRef();this.onEntityAdded.dispatch(this,entity,index,component)}};Group.prototype.removeEntitySilently=function(entity){if(entity.creationIndex in this._entities){delete this._entities[entity.creationIndex];this._entitiesCache=undefined;this._singleEntityCache=undefined;entity.release()}};Group.prototype.removeEntity=function(entity,index,component){if(entity.creationIndex in this._entities){delete this._entities[entity.creationIndex];
this._entitiesCache=undefined;this._singleEntityCache=undefined;this.onEntityRemoved.dispatch(this,entity,index,component);entity.release()}};Group.prototype.containsEntity=function(entity){return entity.creationIndex in this._entities};Group.prototype.getEntities=function(){if(this._entitiesCache===undefined){this._entitiesCache=[];for(var k in this._entities)this._entitiesCache.push(this._entities[k])}return this._entitiesCache};Group.prototype.getSingleEntity=function(){if(this._singleEntityCache===
undefined){var enumerator=Object.keys(this._entities);var c=enumerator.length;if(c===1)this._singleEntityCache=this._entities[enumerator[0]];else if(c===0)return undefined;else throw new SingleEntityException(this._matcher);}return this._singleEntityCache};Group.prototype.toString=function(){if(this._toStringCache===undefined)this._toStringCache="Group("+this._matcher+")";return this._toStringCache};return Group}();entitas.Group=Group})(entitas||(entitas={}));var entitas;
(function(entitas){var GroupObserverException=entitas.GroupObserverException;(function(GroupEventType){GroupEventType[GroupEventType["OnEntityAdded"]=0]="OnEntityAdded";GroupEventType[GroupEventType["OnEntityRemoved"]=1]="OnEntityRemoved";GroupEventType[GroupEventType["OnEntityAddedOrRemoved"]=2]="OnEntityAddedOrRemoved"})(entitas.GroupEventType||(entitas.GroupEventType={}));var GroupEventType=entitas.GroupEventType;var GroupObserver=function(){function GroupObserver(groups,eventTypes){var _this=
this;this._collectedEntities={};this.addEntity=function(group,entity,index,component){if(!(entity.creationIndex in _this._collectedEntities)){_this._collectedEntities[entity.creationIndex]=entity;entity.addRef()}};this._groups=Array.isArray(groups)?groups:[groups];this._eventTypes=Array.isArray(eventTypes)?eventTypes:[eventTypes];if(groups.length!==eventTypes.length)throw new GroupObserverException("Unbalanced count with groups ("+groups.length+") and event types ("+eventTypes.length+")");this._collectedEntities=
{};this._addEntityCache=this.addEntity;this.activate()}Object.defineProperty(GroupObserver.prototype,"collectedEntities",{get:function(){return this._collectedEntities},enumerable:true,configurable:true});GroupObserver.prototype.activate=function(){for(var i=0,groupsLength=this._groups.length;i<groupsLength;i++){var group=this._groups[i];var eventType=this._eventTypes[i];if(eventType===GroupEventType.OnEntityAdded){group.onEntityAdded.remove(this._addEntityCache);group.onEntityAdded.add(this._addEntityCache)}else if(eventType===
GroupEventType.OnEntityRemoved){group.onEntityRemoved.remove(this._addEntityCache);group.onEntityRemoved.add(this._addEntityCache)}else if(eventType===GroupEventType.OnEntityAddedOrRemoved){group.onEntityAdded.remove(this._addEntityCache);group.onEntityAdded.add(this._addEntityCache);group.onEntityRemoved.remove(this._addEntityCache);group.onEntityRemoved.add(this._addEntityCache)}else throw"Invalid eventType ["+typeof eventType+":"+eventType+"] in GroupObserver::activate";}};GroupObserver.prototype.deactivate=
function(){var e;for(var i=0,groupsLength=this._groups.length;i<groupsLength;i++){var group=this._groups[i];group.onEntityAdded.remove(this._addEntityCache);group.onEntityRemoved.remove(this._addEntityCache);this.clearCollectedEntities()}};GroupObserver.prototype.clearCollectedEntities=function(){for(var e in this._collectedEntities)this._collectedEntities[e].release();this._collectedEntities={}};return GroupObserver}();entitas.GroupObserver=GroupObserver})(entitas||(entitas={}));var entitas;
(function(entitas){var Group=entitas.Group;var Entity=entitas.Entity;var EntityIsNotDestroyedException=entitas.EntityIsNotDestroyedException;var PoolDoesNotContainEntityException=entitas.PoolDoesNotContainEntityException;var Pool=function(){function Pool(components,totalComponents,startCreationIndex){var _this=this;if(startCreationIndex===void 0)startCreationIndex=0;this._entities={};this._groups={};this._reusableEntities=[];this._retainedEntities={};this._totalComponents=0;this._creationIndex=0;
this.updateGroupsComponentAddedOrRemoved=function(entity,index,component){var groups=_this._groupsForIndex[index];if(groups!==undefined)for(var i=0,groupsCount=groups.length;i<groupsCount;i++)groups[i].handleEntity(entity,index,component)};this.updateGroupsComponentReplaced=function(entity,index,previousComponent,newComponent){var groups=_this._groupsForIndex[index];if(groups!==undefined)for(var i=0,groupsCount=groups.length;i<groupsCount;i++)groups[i].updateEntity(entity,index,previousComponent,
newComponent)};this.onEntityReleased=function(entity){if(entity._isEnabled)throw new EntityIsNotDestroyedException("Cannot release entity.");entity.onEntityReleased.remove(_this._cachedOnEntityReleased);delete _this._retainedEntities[entity.creationIndex];_this._reusableEntities.push(entity)};this.onGroupCreated=new entitas.Signal(this);this.onEntityCreated=new entitas.Signal(this);this.onEntityDestroyed=new entitas.Signal(this);this.onEntityWillBeDestroyed=new entitas.Signal(this);this._componentsEnum=
components;this._totalComponents=totalComponents;this._creationIndex=startCreationIndex;this._groupsForIndex=[];this._cachedUpdateGroupsComponentAddedOrRemoved=this.updateGroupsComponentAddedOrRemoved;this._cachedUpdateGroupsComponentReplaced=this.updateGroupsComponentReplaced;this._cachedOnEntityReleased=this.onEntityReleased;Pool.componentsEnum=components;Pool.totalComponents=totalComponents}Object.defineProperty(Pool.prototype,"totalComponents",{get:function(){return this._totalComponents},enumerable:true,
configurable:true});Object.defineProperty(Pool.prototype,"count",{get:function(){return Object.keys(this._entities).length},enumerable:true,configurable:true});Object.defineProperty(Pool.prototype,"reusableEntitiesCount",{get:function(){return this._reusableEntities.length},enumerable:true,configurable:true});Object.defineProperty(Pool.prototype,"retainedEntitiesCount",{get:function(){return Object.keys(this._retainedEntities).length},enumerable:true,configurable:true});Pool.groupDesc=function(group){var s=
group.toString();for(var c=Pool.totalComponents;c>-1;c--)s=s.replace(""+c,Pool.componentsEnum[c]);return s};Pool.prototype.createEntity=function(name){var entity=this._reusableEntities.length>0?this._reusableEntities.pop():new Entity(this._totalComponents);entity._isEnabled=true;entity.name=name;entity._creationIndex=this._creationIndex++;entity.addRef();this._entities[entity.creationIndex]=entity;this._entitiesCache=undefined;entity.onComponentAdded.add(this._cachedUpdateGroupsComponentAddedOrRemoved);
entity.onComponentRemoved.add(this._cachedUpdateGroupsComponentAddedOrRemoved);entity.onComponentReplaced.add(this._cachedUpdateGroupsComponentReplaced);entity.onEntityReleased.add(this._cachedOnEntityReleased);this.onEntityCreated.dispatch(this,entity);return entity};Pool.prototype.destroyEntity=function(entity){if(!(entity.creationIndex in this._entities))throw new PoolDoesNotContainEntityException(entity,"Could not destroy entity!");delete this._entities[entity.creationIndex];this._entitiesCache=
undefined;this.onEntityWillBeDestroyed.dispatch(this,entity);entity.destroy();this.onEntityDestroyed.dispatch(this,entity);if(entity._refCount===1){entity.onEntityReleased.remove(this._cachedOnEntityReleased);this._reusableEntities.push(entity)}else this._retainedEntities[entity.creationIndex]=entity;entity.release()};Pool.prototype.destroyAllEntities=function(){var entities=this.getEntities();for(var i=0,entitiesLength=entities.length;i<entitiesLength;i++)this.destroyEntity(entities[i])};Pool.prototype.hasEntity=
function(entity){return entity.creationIndex in this._entities};Pool.prototype.getEntities=function(){if(this._entitiesCache===undefined){this._entitiesCache=[];for(var k in Object.keys(this._entities))this._entitiesCache.push(this._entities[k])}return this._entitiesCache};Pool.prototype.getGroup=function(matcher){var group;if(matcher.id in this._groups)group=this._groups[matcher.id];else{group=new Group(matcher);var entities=this.getEntities();for(var i=0,entitiesLength=entities.length;i<entitiesLength;i++)group.handleEntitySilently(entities[i]);
this._groups[matcher.id]=group;for(var i=0,indicesLength=matcher.indices.length;i<indicesLength;i++){var index=matcher.indices[i];if(this._groupsForIndex[index]===undefined)this._groupsForIndex[index]=[];this._groupsForIndex[index].push(group)}this.onGroupCreated.dispatch(this,group)}return group};Pool.totalComponents=0;return Pool}();entitas.Pool=Pool})(entitas||(entitas={}));var entitas;
(function(entitas){var GroupObserver=entitas.GroupObserver;function as(obj,method1){return method1 in obj?obj:null}var ReactiveSystem=function(){function ReactiveSystem(pool,subSystem){var triggers="triggers"in subSystem?subSystem["triggers"]:[subSystem["trigger"]];this._subsystem=subSystem;var ensureComponents=as(subSystem,"ensureComponents");if(ensureComponents!=null)this._ensureComponents=ensureComponents.ensureComponents;var excludeComponents=as(subSystem,"excludeComponents");if(excludeComponents!=
null)this._excludeComponents=excludeComponents.excludeComponents;this._clearAfterExecute=as(subSystem,"clearAfterExecute")!=null;var triggersLength=triggers.length;var groups=new Array(triggersLength);var eventTypes=new Array(triggersLength);for(var i=0;i<triggersLength;i++){var trigger=triggers[i];groups[i]=pool.getGroup(trigger.trigger);eventTypes[i]=trigger.eventType}this._observer=new GroupObserver(groups,eventTypes);this._buffer=[]}Object.defineProperty(ReactiveSystem.prototype,"subsystem",{get:function(){return this._subsystem},
enumerable:true,configurable:true});ReactiveSystem.prototype.activate=function(){this._observer.activate()};ReactiveSystem.prototype.deactivate=function(){this._observer.deactivate()};ReactiveSystem.prototype.clear=function(){this._observer.clearCollectedEntities()};ReactiveSystem.prototype.execute=function(){var collectedEntities=this._observer.collectedEntities;var ensureComponents=this._ensureComponents;var excludeComponents=this._excludeComponents;var buffer=this._buffer;if(Object.keys(collectedEntities).length!=
0){if(ensureComponents)if(excludeComponents)for(var k in collectedEntities){var e=collectedEntities[k];if(ensureComponents.matches(e)&&!excludeComponents.matches(e))buffer.push(e.addRef())}else for(var k in collectedEntities){var e=collectedEntities[k];if(ensureComponents.matches(e))buffer.push(e.addRef())}else if(excludeComponents)for(var k in collectedEntities){var e=collectedEntities[k];if(!excludeComponents.matches(e))buffer.push(e.addRef())}else for(var k in collectedEntities){var e=collectedEntities[k];
buffer.push(e.addRef())}this._observer.clearCollectedEntities();if(buffer.length!=0){this._subsystem.execute(buffer);for(var i=0,bufferCount=buffer.length;i<bufferCount;i++)buffer[i].release();buffer.length=0;if(this._clearAfterExecute)this._observer.clearCollectedEntities()}}};return ReactiveSystem}();entitas.ReactiveSystem=ReactiveSystem})(entitas||(entitas={}));var entitas;
(function(entitas){function as(obj,method1){return method1 in obj?obj:null}(function(SystemType){SystemType[SystemType["IInitializeSystem"]=1]="IInitializeSystem";SystemType[SystemType["IExecuteSystem"]=2]="IExecuteSystem";SystemType[SystemType["IReactiveExecuteSystem"]=4]="IReactiveExecuteSystem";SystemType[SystemType["IMultiReactiveSystem"]=8]="IMultiReactiveSystem";SystemType[SystemType["IReactiveSystem"]=16]="IReactiveSystem";SystemType[SystemType["IEnsureComponents"]=32]="IEnsureComponents";
SystemType[SystemType["IExcludeComponents"]=64]="IExcludeComponents";SystemType[SystemType["IClearReactiveSystem"]=128]="IClearReactiveSystem"})(entitas.SystemType||(entitas.SystemType={}));var SystemType=entitas.SystemType;var Systems=function(){function Systems(){this._initializeSystems=[];this._executeSystems=[]}Systems.prototype.add=function(system){if("function"===typeof system){var Klass=system;system=new Klass}var reactiveSystem=as(system,"subsystem");var initializeSystem=reactiveSystem!=null?
as(reactiveSystem.subsystem,"initialize"):as(system,"initialize");if(initializeSystem!=null)this._initializeSystems.push(initializeSystem);var executeSystem=as(system,"execute");if(executeSystem!=null)this._executeSystems.push(executeSystem);return this};Systems.prototype.initialize=function(){for(var i=0,initializeSysCount=this._initializeSystems.length;i<initializeSysCount;i++)this._initializeSystems[i].initialize()};Systems.prototype.execute=function(){var executeSystems=this._executeSystems;for(var i=
0,exeSysCount=executeSystems.length;i<exeSysCount;i++)executeSystems[i].execute()};Systems.prototype.clearReactiveSystems=function(){for(var i=0,exeSysCount=this._executeSystems.length;i<exeSysCount;i++){var reactiveSystem=as(this._executeSystems[i],"subsystem");if(reactiveSystem!=null)reactiveSystem.clear();var nestedSystems=as(this._executeSystems[i],"clearReactiveSystems");if(nestedSystems!=null)nestedSystems.clearReactiveSystems()}};return Systems}();entitas.Systems=Systems})(entitas||(entitas=
{}));var __extends=this&&this.__extends||function(d,b){for(var p in b)if(b.hasOwnProperty(p))d[p]=b[p];function __(){this.constructor=d}d.prototype=b===null?Object.create(b):(__.prototype=b.prototype,new __)};var entitas;
(function(entitas){var extensions;(function(extensions){var Exception=entitas.Exception;var Collection=function(_super){__extends(Collection,_super);function Collection($0){_super.call(this,$0)}Collection.prototype.singleEntity=function(){if(this.length!==1)throw new Exception("Expected exactly one entity but found "+this.length);return this[0]};return Collection}(Array);extensions.Collection=Collection})(extensions=entitas.extensions||(entitas.extensions={}))})(entitas||(entitas={}));var entitas;
(function(entitas){var extensions;(function(extensions){var GroupEventType=entitas.GroupEventType;var GroupObserver=entitas.GroupObserver;entitas.Group.prototype.createObserver=function(eventType){if(eventType===void 0)eventType=GroupEventType.OnEntityAdded;return new GroupObserver(this,eventType)}})(extensions=entitas.extensions||(entitas.extensions={}))})(entitas||(entitas={}));var entitas;
(function(entitas){var extensions;(function(extensions){var Matcher=entitas.Matcher;var GroupEventType=entitas.GroupEventType;var TriggerOnEvent=entitas.TriggerOnEvent;Matcher.prototype.onEntityAdded=function(){return new TriggerOnEvent(this,GroupEventType.OnEntityAdded)};Matcher.prototype.onEntityRemoved=function(){return new TriggerOnEvent(this,GroupEventType.OnEntityRemoved)};Matcher.prototype.onEntityAddedOrRemoved=function(){return new TriggerOnEvent(this,GroupEventType.OnEntityAddedOrRemoved)}})(extensions=
entitas.extensions||(entitas.extensions={}))})(entitas||(entitas={}));var entitas;
(function(entitas){var extensions;(function(extensions){function as(obj,method1){return method1 in obj?obj:null}entitas.Pool.prototype.getEntities=function(matcher){if(matcher)return this.getGroup(matcher).getEntities();else{if(this._entitiesCache===undefined){this._entitiesCache=[];for(var k in Object.keys(this._entities))this._entitiesCache.push(this._entities[k])}return this._entitiesCache}};entitas.Pool.prototype.createSystem=function(system){if("function"===typeof system){var Klass=system;system=
new Klass}entitas.Pool.setPool(system,this);var reactiveSystem=as(system,"trigger");if(reactiveSystem!=null)return new entitas.ReactiveSystem(this,reactiveSystem);var multiReactiveSystem=as(system,"triggers");if(multiReactiveSystem!=null)return new entitas.ReactiveSystem(this,multiReactiveSystem);return system};entitas.Pool.setPool=function(system,pool){var poolSystem=as(system,"setPool");if(poolSystem!=null)poolSystem.setPool(pool)}})(extensions=entitas.extensions||(entitas.extensions={}))})(entitas||
(entitas={}));

var EZGUI;
(function (EZGUI) {
    EZGUI.Easing = {
        Linear: {
            None: function (k) {
                return k;
            }
        },
        Quadratic: {
            In: function (k) {
                return k * k;
            },
            Out: function (k) {
                return k * (2 - k);
            },
            InOut: function (k) {
                if ((k *= 2) < 1)
                    return 0.5 * k * k;
                return -0.5 * (--k * (k - 2) - 1);
            }
        },
        Cubic: {
            In: function (k) {
                return k * k * k;
            },
            Out: function (k) {
                return --k * k * k + 1;
            },
            InOut: function (k) {
                if ((k *= 2) < 1)
                    return 0.5 * k * k * k;
                return 0.5 * ((k -= 2) * k * k + 2);
            }
        },
        Quartic: {
            In: function (k) {
                return k * k * k * k;
            },
            Out: function (k) {
                return 1 - (--k * k * k * k);
            },
            InOut: function (k) {
                if ((k *= 2) < 1)
                    return 0.5 * k * k * k * k;
                return -0.5 * ((k -= 2) * k * k * k - 2);
            }
        },
        Quintic: {
            In: function (k) {
                return k * k * k * k * k;
            },
            Out: function (k) {
                return --k * k * k * k * k + 1;
            },
            InOut: function (k) {
                if ((k *= 2) < 1)
                    return 0.5 * k * k * k * k * k;
                return 0.5 * ((k -= 2) * k * k * k * k + 2);
            }
        },
        Sinusoidal: {
            In: function (k) {
                return 1 - Math.cos(k * Math.PI / 2);
            },
            Out: function (k) {
                return Math.sin(k * Math.PI / 2);
            },
            InOut: function (k) {
                return 0.5 * (1 - Math.cos(Math.PI * k));
            }
        },
        Exponential: {
            In: function (k) {
                return k === 0 ? 0 : Math.pow(1024, k - 1);
            },
            Out: function (k) {
                return k === 1 ? 1 : 1 - Math.pow(2, -10 * k);
            },
            InOut: function (k) {
                if (k === 0)
                    return 0;
                if (k === 1)
                    return 1;
                if ((k *= 2) < 1)
                    return 0.5 * Math.pow(1024, k - 1);
                return 0.5 * (-Math.pow(2, -10 * (k - 1)) + 2);
            }
        },
        Circular: {
            In: function (k) {
                return 1 - Math.sqrt(1 - k * k);
            },
            Out: function (k) {
                return Math.sqrt(1 - (--k * k));
            },
            InOut: function (k) {
                if ((k *= 2) < 1)
                    return -0.5 * (Math.sqrt(1 - k * k) - 1);
                return 0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1);
            }
        },
        Elastic: {
            In: function (k) {
                var s, a = 0.1, p = 0.4;
                if (k === 0)
                    return 0;
                if (k === 1)
                    return 1;
                if (!a || a < 1) {
                    a = 1;
                    s = p / 4;
                }
                else
                    s = p * Math.asin(1 / a) / (2 * Math.PI);
                return -(a * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p));
            },
            Out: function (k) {
                var s, a = 0.1, p = 0.4;
                if (k === 0)
                    return 0;
                if (k === 1)
                    return 1;
                if (!a || a < 1) {
                    a = 1;
                    s = p / 4;
                }
                else
                    s = p * Math.asin(1 / a) / (2 * Math.PI);
                return (a * Math.pow(2, -10 * k) * Math.sin((k - s) * (2 * Math.PI) / p) + 1);
            },
            InOut: function (k) {
                var s, a = 0.1, p = 0.4;
                if (k === 0)
                    return 0;
                if (k === 1)
                    return 1;
                if (!a || a < 1) {
                    a = 1;
                    s = p / 4;
                }
                else
                    s = p * Math.asin(1 / a) / (2 * Math.PI);
                if ((k *= 2) < 1)
                    return -0.5 * (a * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p));
                return a * Math.pow(2, -10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p) * 0.5 + 1;
            }
        },
        Back: {
            In: function (k) {
                var s = 1.70158;
                return k * k * ((s + 1) * k - s);
            },
            Out: function (k) {
                var s = 1.70158;
                return --k * k * ((s + 1) * k + s) + 1;
            },
            InOut: function (k) {
                var s = 1.70158 * 1.525;
                if ((k *= 2) < 1)
                    return 0.5 * (k * k * ((s + 1) * k - s));
                return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);
            }
        },
        Bounce: {
            In: function (k) {
                return 1 - EZGUI.Easing.Bounce.Out(1 - k);
            },
            Out: function (k) {
                if (k < (1 / 2.75)) {
                    return 7.5625 * k * k;
                }
                else if (k < (2 / 2.75)) {
                    return 7.5625 * (k -= (1.5 / 2.75)) * k + 0.75;
                }
                else if (k < (2.5 / 2.75)) {
                    return 7.5625 * (k -= (2.25 / 2.75)) * k + 0.9375;
                }
                else {
                    return 7.5625 * (k -= (2.625 / 2.75)) * k + 0.984375;
                }
            },
            InOut: function (k) {
                if (k < 0.5)
                    return EZGUI.Easing.Bounce.In(k * 2) * 0.5;
                return EZGUI.Easing.Bounce.Out(k * 2 - 1) * 0.5 + 0.5;
            }
        }
    };
})(EZGUI || (EZGUI = {}));
var EZGUI;
(function (EZGUI) {
    EZGUI.Interpolation = {
        Linear: function (v, k) {
            var m = v.length - 1, f = m * k, i = Math.floor(f), fn = EZGUI.Interpolation.Utils.Linear;
            if (k < 0)
                return fn(v[0], v[1], f);
            if (k > 1)
                return fn(v[m], v[m - 1], m - f);
            return fn(v[i], v[i + 1 > m ? m : i + 1], f - i);
        },
        Bezier: function (v, k) {
            var b = 0, n = v.length - 1, pw = Math.pow, bn = EZGUI.Interpolation.Utils.Bernstein, i;
            for (i = 0; i <= n; i++) {
                b += pw(1 - k, n - i) * pw(k, i) * v[i] * bn(n, i);
            }
            return b;
        },
        CatmullRom: function (v, k) {
            var m = v.length - 1, f = m * k, i = Math.floor(f), fn = EZGUI.Interpolation.Utils.CatmullRom;
            if (v[0] === v[m]) {
                if (k < 0)
                    i = Math.floor(f = m * (1 + k));
                return fn(v[(i - 1 + m) % m], v[i], v[(i + 1) % m], v[(i + 2) % m], f - i);
            }
            else {
                if (k < 0)
                    return v[0] - (fn(v[0], v[0], v[1], v[1], -f) - v[0]);
                if (k > 1)
                    return v[m] - (fn(v[m], v[m], v[m - 1], v[m - 1], f - m) - v[m]);
                return fn(v[i ? i - 1 : 0], v[i], v[m < i + 1 ? m : i + 1], v[m < i + 2 ? m : i + 2], f - i);
            }
        },
        Utils: {
            Linear: function (p0, p1, t) {
                return (p1 - p0) * t + p0;
            },
            Bernstein: function (n, i) {
                var fc = EZGUI.Interpolation.Utils.Factorial;
                return fc(n) / fc(i) / fc(n - i);
            },
            Factorial: (function () {
                var a = [1];
                return function (n) {
                    var s = 1, i;
                    if (a[n])
                        return a[n];
                    for (i = n; i > 1; i--)
                        s *= i;
                    return a[n] = s;
                };
            })(),
            CatmullRom: function (p0, p1, p2, p3, t) {
                var v0 = (p2 - p0) * 0.5, v1 = (p3 - p1) * 0.5, t2 = t * t, t3 = t * t2;
                return (2 * p1 - 2 * p2 + v0 + v1) * t3 + (-3 * p1 + 3 * p2 - 2 * v0 - v1) * t2 + v0 * t + p1;
            }
        }
    };
})(EZGUI || (EZGUI = {}));
/// <reference path="easing.ts" />
/// <reference path="interpolation.ts" />
/**
 * This is a part of Tween.js converted to TypeScript
 *
 * Tween.js - Licensed under the MIT license
 * https://github.com/sole/tween.js
 */
var EZGUI;
(function (EZGUI) {
    var Tween = (function () {
        //#endregion
        function Tween(object) {
            this._valuesStart = {};
            this._valuesEnd = {};
            this._valuesStartRepeat = {};
            this._duration = 1000;
            this._repeat = 0;
            this._yoyo = false;
            this._isPlaying = false;
            this._reversed = false;
            this._delayTime = 0;
            this._startTime = null;
            this._easingFunction = EZGUI.Easing.Linear.None;
            this._interpolationFunction = EZGUI.Interpolation.Linear;
            this._chainedTweens = [];
            this._onStartCallback = null;
            this._onStartCallbackFired = false;
            this._onUpdateCallback = null;
            this._onCompleteCallback = null;
            this._onStopCallback = null;
            this._object = object;
            for (var field in object) {
                this._valuesStart[field] = parseFloat(object[field], 10);
            }
        }
        Tween.getAll = function () {
            return this._tweens;
        };
        Tween.removeAll = function () {
            this._tweens = [];
        };
        Tween.add = function (tween) {
            this._tweens.push(tween);
        };
        Tween.remove = function (tween) {
            var i = this._tweens.indexOf(tween);
            if (i !== -1) {
                this._tweens.splice(i, 1);
            }
        };
        Tween.update = function (time) {
            if (this._tweens.length === 0)
                return false;
            var i = 0;
            time = time !== undefined ? time : window.performance.now();
            while (i < this._tweens.length) {
                if (this._tweens[i].update(time)) {
                    i++;
                }
                else {
                    this._tweens.splice(i, 1);
                }
            }
            return true;
        };
        Tween.prototype.to = function (properties, duration) {
            if (duration !== undefined) {
                this._duration = duration;
            }
            this._valuesEnd = properties;
            return this;
        };
        Tween.prototype.start = function (time) {
            Tween.add(this);
            this._isPlaying = true;
            this._onStartCallbackFired = false;
            this._startTime = time !== undefined ? time : window.performance.now();
            this._startTime += this._delayTime;
            for (var property in this._valuesEnd) {
                // check if an Array was provided as property value
                if (this._valuesEnd[property] instanceof Array) {
                    if (this._valuesEnd[property].length === 0) {
                        continue;
                    }
                    // create a local copy of the Array with the start value at the front
                    this._valuesEnd[property] = [this._object[property]].concat(this._valuesEnd[property]);
                }
                this._valuesStart[property] = this._object[property];
                if ((this._valuesStart[property] instanceof Array) === false) {
                    this._valuesStart[property] *= 1.0; // Ensures we're using numbers, not strings
                }
                this._valuesStartRepeat[property] = this._valuesStart[property] || 0;
            }
            return this;
        };
        Tween.prototype.stop = function () {
            if (!this._isPlaying) {
                return this;
            }
            Tween.remove(this);
            this._isPlaying = false;
            if (this._onStopCallback !== null) {
                this._onStopCallback.call(this._object);
            }
            this.stopChainedTweens();
            return this;
        };
        Tween.prototype.stopChainedTweens = function () {
            for (var i = 0, numChainedTweens = this._chainedTweens.length; i < numChainedTweens; i++) {
                this._chainedTweens[i].stop();
            }
        };
        Tween.prototype.delay = function (amount) {
            this._delayTime = amount;
            return this;
        };
        Tween.prototype.repeat = function (times) {
            this._repeat = times;
            return this;
        };
        Tween.prototype.yoyo = function (yoyo) {
            this._yoyo = yoyo;
            return this;
        };
        Tween.prototype.easing = function (easing) {
            this._easingFunction = easing;
            return this;
        };
        Tween.prototype.interpolation = function (interpolation) {
            this._interpolationFunction = interpolation;
            return this;
        };
        Tween.prototype.chain = function () {
            this._chainedTweens = arguments;
            return this;
        };
        Tween.prototype.onStart = function (callback) {
            this._onStartCallback = callback;
            return this;
        };
        Tween.prototype.onUpdate = function (callback) {
            this._onUpdateCallback = callback;
            return this;
        };
        Tween.prototype.onComplete = function (callback) {
            this._onCompleteCallback = callback;
            return this;
        };
        Tween.prototype.onStop = function (callback) {
            this._onStopCallback = callback;
            return this;
        };
        Tween.prototype.update = function (time) {
            var property;
            if (time < this._startTime) {
                return true;
            }
            if (this._onStartCallbackFired === false) {
                if (this._onStartCallback !== null) {
                    this._onStartCallback.call(this._object);
                }
                this._onStartCallbackFired = true;
            }
            var elapsed = (time - this._startTime) / this._duration;
            elapsed = elapsed > 1 ? 1 : elapsed;
            var value = this._easingFunction(elapsed);
            for (property in this._valuesEnd) {
                var start = this._valuesStart[property] || 0;
                var end = this._valuesEnd[property];
                if (end instanceof Array) {
                    this._object[property] = this._interpolationFunction(end, value);
                }
                else {
                    // Parses relative end values with start as base (e.g.: +10, -3)
                    if (typeof (end) === "string") {
                        end = start + parseFloat(end, 10);
                    }
                    // protect against non numeric properties.
                    if (typeof (end) === "number") {
                        this._object[property] = start + (end - start) * value;
                    }
                }
            }
            if (this._onUpdateCallback !== null) {
                this._onUpdateCallback.call(this._object, value);
            }
            if (elapsed == 1) {
                if (this._repeat > 0) {
                    if (isFinite(this._repeat)) {
                        this._repeat--;
                    }
                    for (property in this._valuesStartRepeat) {
                        if (typeof (this._valuesEnd[property]) === "string") {
                            this._valuesStartRepeat[property] = this._valuesStartRepeat[property] + parseFloat(this._valuesEnd[property], 10);
                        }
                        if (this._yoyo) {
                            var tmp = this._valuesStartRepeat[property];
                            this._valuesStartRepeat[property] = this._valuesEnd[property];
                            this._valuesEnd[property] = tmp;
                        }
                        this._valuesStart[property] = this._valuesStartRepeat[property];
                    }
                    if (this._yoyo) {
                        this._reversed = !this._reversed;
                    }
                    this._startTime = time + this._delayTime;
                    return true;
                }
                else {
                    if (this._onCompleteCallback !== null) {
                        this._onCompleteCallback.call(this._object);
                    }
                    for (var i = 0, numChainedTweens = this._chainedTweens.length; i < numChainedTweens; i++) {
                        this._chainedTweens[i].start(time);
                    }
                    return false;
                }
            }
            return true;
        };
        //#region Static part replacing TWEEN namespace from original tweenjs
        Tween._tweens = [];
        return Tween;
    })();
    EZGUI.Tween = Tween;
})(EZGUI || (EZGUI = {}));
var EZGUI;
(function (EZGUI) {
    var utils;
    (function (utils) {
        var EventHandler = (function () {
            function EventHandler() {
            }
            EventHandler.prototype.bind = function (event, fct) {
                this._events = this._events || {};
                this._events[event] = this._events[event] || [];
                this._events[event].push(fct);
            };
            //same as bind
            EventHandler.prototype.on = function (event, fct, nbcalls) {
                this._events = this._events || {};
                this._events[event] = this._events[event] || [];
                if (nbcalls)
                    fct.__nbcalls__ = nbcalls;
                this._events[event].push(fct);
            };
            //unbind(event, fct) {
            //    this._events = this._events || {};
            //    //if (event in this._events === false) return;
            //    if (event in this._events === false || typeof this._events[event] != 'array') return;
            //    this._events[event].splice(this._events[event].indexOf(fct), 1);
            //}
            EventHandler.prototype.unbind = function (event, fct) {
                this._events = this._events || {};
                if (event in this._events === false || !this._events[event] || !(this._events[event] instanceof Array))
                    return;
                this._events[event].splice(this._events[event].indexOf(fct), 1);
            };
            EventHandler.prototype.unbindEvent = function (event) {
                this._events = this._events || {};
                this._events[event] = [];
            };
            EventHandler.prototype.unbindAll = function () {
                this._events = this._events || {};
                for (var event in this._events)
                    this._events[event] = false;
            };
            EventHandler.prototype.trigger = function (event) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
                this._events = this._events || {};
                if (event in this._events !== false) {
                    for (var i = 0; i < this._events[event].length; i++) {
                        var fct = this._events[event][i];
                        fct.apply(this, args);
                        if (fct.__nbcalls__) {
                            fct.__nbcalls__--;
                            if (fct.__nbcalls__ <= 0)
                                this.unbind(event, fct);
                        }
                    }
                }
            };
            return EventHandler;
        })();
        utils.EventHandler = EventHandler;
    })(utils = EZGUI.utils || (EZGUI.utils = {}));
})(EZGUI || (EZGUI = {}));
/**
* Hack in support for Function.name for browsers that don't support it.
* IE, I'm looking at you.
**/
if (Function.prototype['name'] === undefined && Object.defineProperty !== undefined) {
    Object.defineProperty(Function.prototype, 'name', {
        get: function () {
            var funcNameRegex = /function\s([^(]{1,})\(/;
            var results = (funcNameRegex).exec((this).toString());
            return (results && results.length > 1) ? results[1].trim() : "";
        },
        set: function (value) {
        }
    });
}
/// <reference path="polyfills/ie.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
//declare var __extends;
var EZGUI;
(function (EZGUI) {
    var Compatibility;
    (function (Compatibility) {
        Compatibility.PIXIVersion = (PIXI.VERSION.indexOf('v3.') == 0 || PIXI.VERSION.indexOf('3.') == 0) ? 3 : 2;
        Compatibility.isPhaser = (typeof Phaser != 'undefined');
        Compatibility.isPhaser24 = Compatibility.isPhaser && Phaser.VERSION.indexOf('2.4') == 0;
        Compatibility.BitmapText = Compatibility.PIXIVersion >= 3 ? PIXI.extras.BitmapText : PIXI.BitmapText;
        var TilingSprite = (function () {
            function TilingSprite(texture, width, height) {
            }
            return TilingSprite;
        })();
        Compatibility.TilingSprite = TilingSprite;
        var GUIContainer = (function (_super) {
            __extends(GUIContainer, _super);
            function GUIContainer() {
                _super.apply(this, arguments);
            }
            return GUIContainer;
        })(PIXI.DisplayObjectContainer);
        Compatibility.GUIContainer = GUIContainer;
        if (Compatibility.PIXIVersion == 3) {
            Compatibility['GUIContainer'] = PIXI['Container'];
        }
        else {
            Compatibility['GUIContainer'] = PIXI['DisplayObjectContainer'];
        }
        var GUIDisplayObjectContainer = (function (_super) {
            __extends(GUIDisplayObjectContainer, _super);
            function GUIDisplayObjectContainer() {
                _super.call(this);
                if (typeof Phaser != 'undefined') {
                    var game = Phaser.GAMES[0];
                    if (!GUIDisplayObjectContainer.globalPhaserGroup)
                        GUIDisplayObjectContainer.globalPhaserGroup = new Phaser.Group(game, game.stage, 'guigroup');
                    this.phaserGroup = GUIDisplayObjectContainer.globalPhaserGroup.create(0, 0); //new Phaser.Group(Phaser.GAMES[0]);
                    this.phaserGroup.addChild(this);
                    this.phaserGroup.guiSprite = this;
                }
            }
            return GUIDisplayObjectContainer;
        })(GUIContainer);
        Compatibility.GUIDisplayObjectContainer = GUIDisplayObjectContainer;
        //var dummy:any = (function (_super) {
        //    __extends(GUIDisplayObjectContainer, _super);
        //    function GUIDisplayObjectContainer() {
        //        _super.call(this, [Phaser.GAMES[0]]);
        //    }
        //    return GUIDisplayObjectContainer;
        //})(Phaser.Group);
        //Compatibility['GUIDisplayObjectContainer'] = dummy;
        function createRenderTexture(width, height) {
            var texture;
            if (EZGUI.Compatibility.PIXIVersion == 3) {
                texture = new PIXI.RenderTexture(EZGUI.tilingRenderer, width, height);
            }
            else {
                texture = new PIXI.RenderTexture(width, height, EZGUI.tilingRenderer);
            }
            return texture;
        }
        Compatibility.createRenderTexture = createRenderTexture;
        /*
         *
         * this function is used to fix Phaser 2.4 compatibility
         * it need to be attached to onLoadComplete of phaser's loader to copy loaded resources to PIXI.TextureCache
         */
        function fixCache(resources) {
            if (!EZGUI.Compatibility.isPhaser24 || !this._fileList)
                return;
            for (var i = 0; i < this._fileList.length; i++) {
                if (!resources || resources.length == 0 || resources.indexOf(this._fileList[i].key) >= 0) {
                    var tx = new PIXI.Texture(new PIXI.BaseTexture(this._fileList[i].data));
                    PIXI.TextureCache[this._fileList[i].key] = tx;
                }
            }
        }
        Compatibility.fixCache = fixCache;
    })(Compatibility = EZGUI.Compatibility || (EZGUI.Compatibility = {}));
})(EZGUI || (EZGUI = {}));
if (EZGUI.Compatibility.PIXIVersion == 3) {
    PIXI['utils']._saidHello = true;
    //EZGUI.tilingRenderer = new PIXI.WebGLRenderer();
    EZGUI.tilingRenderer = new PIXI.CanvasRenderer();
    EZGUI.Compatibility.TilingSprite = (PIXI.extras).TilingSprite;
    PIXI['utils']._saidHello = false;
}
else {
    EZGUI.tilingRenderer = new PIXI.CanvasRenderer();
    EZGUI.Compatibility.TilingSprite = PIXI.TilingSprite;
}
EZGUI.Compatibility.TilingSprite.prototype['fixPhaser24'] = function () {
    if (EZGUI.Compatibility.isPhaser24) {
        var ltexture = this.originalTexture || this.texture;
        var frame = ltexture.frame;
        var targetWidth, targetHeight;
        //  Check that the frame is the same size as the base texture.
        var isFrame = frame.width !== ltexture.baseTexture.width || frame.height !== ltexture.baseTexture.height;
        this._frame = {};
        if (ltexture.trim) {
            this._frame.spriteSourceSizeX = ltexture.trim.width;
            this._frame.spriteSourceSizeY = ltexture.trim.height;
        }
        else {
            this._frame.sourceSizeW = frame.width;
            this._frame.sourceSizeH = frame.height;
        }
    }
};
if (PIXI.EventTarget) {
    PIXI.EventTarget.mixin(EZGUI.Compatibility.GUIDisplayObjectContainer.prototype);
}
else {
    if (EZGUI.Compatibility.isPhaser) {
        var proto = EZGUI.Compatibility.GUIDisplayObjectContainer.prototype;
        proto.on = function (event, fct) {
            this._listeners = this._listeners || {};
            this._listeners[event] = this._listeners[event] || [];
            this._listeners[event].push(fct);
        };
        proto.off = function (event, fct) {
            this._listeners = this._listeners || {};
            if (!fct) {
                this._listeners[event] = [];
            }
            else {
                if (event in this._listeners === false || typeof this._listeners[event] != 'array')
                    return;
                this._listeners[event].splice(this._listeners[event].indexOf(fct), 1);
            }
        };
        proto.emit = function (event) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            this._listeners = this._listeners || {};
            if (event in this._listeners !== false) {
                for (var i = 0; i < this._listeners[event].length; i++) {
                    var fct = this._listeners[event][i];
                    fct.apply(this, args);
                    if (fct.__nbcalls__) {
                        fct.__nbcalls__--;
                        if (fct.__nbcalls__ <= 0)
                            this.unbind(event, fct);
                    }
                }
            }
        };
    }
}
/// <reference path="ezgui.ts" />
var EZGUI;
(function (EZGUI) {
    var Theme = (function () {
        function Theme(themeConfig) {
            this.themeConfig = themeConfig;
            this._listeners = [];
            this.ready = false;
            this.url = '';
            var _this = this;
            if (typeof themeConfig == 'string') {
                _this.url = themeConfig;
                EZGUI.utils.loadJSON(_this.url, function (themeConfig) {
                    _this.themeConfig = themeConfig;
                    _this.initThemeConfig(themeConfig);
                });
            }
            else {
                this.initThemeConfig(themeConfig);
            }
        }
        Theme.prototype.override = function (themeConfig) {
            var _theme = JSON.parse(JSON.stringify(themeConfig));
            for (var t in _theme) {
                if (t == 'default')
                    continue;
                var skin = _theme[t];
                EZGUI.utils.extendJSON(skin, this._default);
            }
            this.parseComponents(_theme);
            for (var t in _theme) {
                if (t == 'default')
                    continue;
                var skin = _theme[t];
                this._theme[t] = skin;
            }
        };
        Theme.prototype.fixLimits = function (target, source) {
            if (typeof source == 'object') {
                if (target.width != undefined && source.maxWidth)
                    target.width = Math.min(target.width, source.maxWidth);
                if (target.height != undefined && source.maxHeight)
                    target.height = Math.min(target.height, source.maxHeight);
                for (var i in source) {
                    var src = source[i];
                    if (typeof target[i] == 'object') {
                        this.fixLimits(target[i], source[i]);
                    }
                }
            }
        };
        Theme.prototype.initThemeConfig = function (themeConfig) {
            this._theme = JSON.parse(JSON.stringify(themeConfig));
            this.id = this._theme.__config__ ? this._theme.__config__.name : undefined;
            this._default = this._theme['default'];
            for (var t in this._theme) {
                if (t == 'default')
                    continue;
                var skin = this._theme[t];
                /*
                for (var i in this._default) {
                    if (!skin[i]) skin[i] = JSON.parse(JSON.stringify(this._default[i]));
                }
                */
                EZGUI.utils.extendJSON(skin, this._default);
            }
            this.path = this.url.substring(0, this.url.lastIndexOf('/') + 1);
            this.parseComponents(this._theme);
            this.preload();
        };
        Theme.prototype.parseResources = function () {
            var themeResources = this._theme.__config__.resources;
            var resources = [];
            if (!themeResources || themeResources.length <= 0)
                return resources;
            var resToLoad = 0;
            for (var i = 0; i < themeResources.length; i++) {
                var res = themeResources[i];
                if (res.indexOf('http://') == 0 || res.indexOf('https://') == 0 || res.indexOf('file://') == 0 || res.indexOf('/') == 0)
                    continue;
                //TODO : use a path normalizer here
                if (res.indexOf('./') == 0)
                    res = res.substring(2);
                if (PIXI.loader && PIXI.loader.resources[resources[i]]) {
                }
                else {
                    resources.push(this.path + res);
                }
            }
            return resources;
        };
        Theme.prototype.parseComponents = function (theme) {
            for (var i in theme) {
                if (i == '__config__')
                    continue;
                var item = theme[i];
                for (var c = 0; c < Theme.imageComponents.length; c++) {
                    var cc = Theme.imageComponents[c];
                    for (var v = 0; v < Theme.imageVariants.length; v++) {
                        var vv = Theme.imageVariants[v];
                        if (vv != '')
                            cc = cc + '-' + vv;
                        if (item[cc] == undefined)
                            continue;
                        if (typeof item[cc] == 'string') {
                            var str = item[cc];
                            item[cc] = this.normalizeResPath(str);
                        }
                        else {
                            for (var s = 0; s < Theme.imageStates.length; s++) {
                                var st = Theme.imageStates[s];
                                var str = item[cc][st];
                                if (str) {
                                    item[cc][st] = this.normalizeResPath(str);
                                }
                            }
                        }
                    }
                }
            }
        };
        Theme.prototype.normalizeResPath = function (str) {
            if (str.indexOf('./') != 0)
                return str;
            str = str.substring(2);
            return this.path + str;
        };
        Theme.load = function (themes, cb) {
            if (cb === void 0) { cb = null; }
            var remaining = 0;
            for (var i = 0; i < themes.length; i++) {
                remaining++;
                var theme = new Theme(themes[i]);
                theme.onReady(function () {
                    remaining--;
                    if (remaining <= 0 && typeof cb == 'function') {
                        cb();
                    }
                });
            }
        };
        //experimental Theme transparent preload
        Theme.prototype.onReady = function (cb) {
            if (typeof cb != 'function')
                return;
            if (this.ready)
                cb();
            this._listeners.push(cb);
        };
        Theme.prototype.preload = function () {
            var _this = this;
            var onAssetsLoaded = function () {
                _this.ready = true;
                EZGUI.themes[_this.id] = _this;
                var cb;
                while (cb = _this._listeners.pop())
                    cb();
            };
            if (this._theme.__config__ && this._theme.__config__.resources) {
                var resources = this.parseResources();
                if (resources.length == 0) {
                    onAssetsLoaded();
                }
                else {
                    //console.log('Theme preloading ', resources);
                    //utils.loadJSON(_this.url, function (themeConfig) {
                    //    _this.themeConfig = themeConfig;
                    //    _this.initThemeConfig(themeConfig);
                    //});
                    _this.loadResources(resources, onAssetsLoaded);
                }
            }
            else {
                onAssetsLoaded();
            }
        };
        Theme.prototype.loadResources = function (resources, cb) {
            var _this = this;
            var images = [];
            var atlases = [];
            var fonts = [];
            var atlasData = {};
            var fontData = {};
            var resToLoad = 0;
            var cacheAtlas = function () {
                for (var i in atlasData) {
                    var atlasJson = atlasData[i];
                    var imgUrl = _this.path + atlasJson.meta.image;
                    var baseTx = PIXI.utils ? PIXI.utils.TextureCache[imgUrl].baseTexture : PIXI.TextureCache[imgUrl].baseTexture;
                    for (var f in atlasJson.frames) {
                        var frame = atlasJson.frames[f].frame;
                        var texture = new PIXI.Texture(baseTx, {
                            x: frame.x,
                            y: frame.y,
                            width: frame.w,
                            height: frame.h
                        });
                        if (PIXI.utils) {
                            PIXI.utils.TextureCache[f] = texture;
                        }
                        else {
                            PIXI.TextureCache[f] = texture;
                        }
                    }
                }
                for (var i in fontData) {
                    var font = fontData[i];
                    _this.parseFont(font, PIXI.Texture.fromFrame(font.textureId));
                }
                cb();
            };
            //var phaser24cache = function (loader) {
            //    if (!loader._fileList) return;
            //    //console.log(loader._fileList);
            //    for (var i = 0; i < loader._fileList.length; i++) {
            //        var tx = new (<any>PIXI).Texture(new (<any>PIXI).BaseTexture(loader._fileList[i].data));
            //        //tx._frame = { test: 1 };
            //        //console.log('Caching : ', loader._fileList[i].key);
            //        PIXI.TextureCache[loader._fileList[i].key] = tx;
            //        //console.log(tx);
            //    }
            //}
            var loadImages = function () {
                var crossOrigin = (EZGUI.settings.crossOrigin == true);
                if (typeof Phaser != 'undefined') {
                    //console.log('Phaser loader');
                    var loader = new Phaser.Loader(Phaser.GAMES[0]);
                    loader.crossOrigin = crossOrigin;
                    for (var i = 0; i < images.length; i++) {
                        loader.image(images[i], images[i]);
                    }
                    loader.onLoadComplete.add(function () {
                        //loader.onLoadComplete.add(EZGUI.Compatibility.fixCache, loader);
                        EZGUI.Compatibility.fixCache.apply(loader);
                        //phaser24cache(loader);
                        cacheAtlas();
                    });
                    loader.start();
                    return;
                }
                if (PIXI.loader) {
                    for (var i = 0; i < images.length; i++) {
                        PIXI.loader.add({ url: images[i], crossOrigin: crossOrigin });
                    }
                    //(<any>PIXI).loader.add(images);
                    PIXI.loader.load(cacheAtlas);
                }
                else {
                    var loader = new PIXI.AssetLoader(images, crossOrigin);
                    loader.onComplete = cacheAtlas;
                    loader.load();
                }
            };
            for (var i = 0; i < resources.length; i++) {
                var res = resources[i];
                if (res.indexOf('.json') > 0) {
                    atlases.push(res);
                    continue;
                }
                if (res.indexOf('.xml') > 0 || res.indexOf('.fnt') > 0) {
                    fonts.push(res);
                    continue;
                }
                images.push(res);
            }
            if (atlases.length > 0) {
                for (var i = 0; i < atlases.length; i++) {
                    var font = atlases[i];
                    resToLoad++;
                    (function (atlasUrl) {
                        EZGUI.utils.loadJSON(atlasUrl, function (atlasjson) {
                            images.push(_this.path + atlasjson.meta.image);
                            resToLoad--;
                            atlasData[atlasUrl] = atlasjson;
                            if (resToLoad <= 0) {
                                //console.log('Atlas loaded ', images);
                                loadImages();
                            }
                        });
                    })(font);
                }
            }
            if (fonts.length > 0) {
                for (var i = 0; i < fonts.length; i++) {
                    var font = fonts[i];
                    resToLoad++;
                    (function (atlasUrl) {
                        EZGUI.utils.loadXML(atlasUrl, function (xmlfont) {
                            var img = xmlfont.getElementsByTagName('page')[0].getAttribute('file');
                            var path = atlasUrl.substring(0, atlasUrl.lastIndexOf('\\') + atlasUrl.lastIndexOf('/') + 2);
                            var src = path + img;
                            //console.log('Fake font load = ', src);
                            images.push(src);
                            resToLoad--;
                            fontData[atlasUrl] = {
                                data: xmlfont,
                                textureId: src
                            };
                            if (resToLoad <= 0) {
                                //console.log('Fonts loaded ', images);
                                loadImages();
                            }
                        });
                    })(font);
                }
            }
            if (atlases.length <= 0 && fonts.length <= 0) {
                loadImages();
            }
        };
        Theme.prototype.parseFont = function (resource, texture) {
            var data = {};
            var info = resource.data.getElementsByTagName('info')[0];
            var common = resource.data.getElementsByTagName('common')[0];
            data.font = info.getAttribute('face');
            data.size = parseInt(info.getAttribute('size'), 10);
            data.lineHeight = parseInt(common.getAttribute('lineHeight'), 10);
            data.chars = {};
            var Rectangle;
            var BitmapText;
            if (EZGUI.Compatibility.PIXIVersion == 3) {
                Rectangle = PIXI.math.Rectangle;
                BitmapText = PIXI.extras.BitmapText;
            }
            else {
                Rectangle = PIXI.Rectangle;
                BitmapText = PIXI.BitmapText;
            }
            //parse letters
            var letters = resource.data.getElementsByTagName('char');
            for (var i = 0; i < letters.length; i++) {
                var charCode = parseInt(letters[i].getAttribute('id'), 10);
                var textureRect = new Rectangle(parseInt(letters[i].getAttribute('x'), 10) + texture.frame.x, parseInt(letters[i].getAttribute('y'), 10) + texture.frame.y, parseInt(letters[i].getAttribute('width'), 10), parseInt(letters[i].getAttribute('height'), 10));
                data.chars[charCode] = {
                    xOffset: parseInt(letters[i].getAttribute('xoffset'), 10),
                    yOffset: parseInt(letters[i].getAttribute('yoffset'), 10),
                    xAdvance: parseInt(letters[i].getAttribute('xadvance'), 10),
                    kerning: {},
                    texture: new PIXI.Texture(texture.baseTexture, textureRect)
                };
            }
            //parse kernings
            var kernings = resource.data.getElementsByTagName('kerning');
            for (i = 0; i < kernings.length; i++) {
                var first = parseInt(kernings[i].getAttribute('first'), 10);
                var second = parseInt(kernings[i].getAttribute('second'), 10);
                var amount = parseInt(kernings[i].getAttribute('amount'), 10);
                data.chars[second].kerning[first] = amount;
            }
            //resource.bitmapFont = data;
            // I'm leaving this as a temporary fix so we can test the bitmap fonts in v3
            // but it's very likely to change
            BitmapText.fonts[data.font] = data;
        };
        Theme.prototype.getSkin = function (skinId) {
            var skin = this._theme[skinId] || this._theme['default'];
            return skin;
        };
        Theme.prototype.applySkin = function (settings) {
            var skinId = settings['skin'] || settings['component'];
            var skin = this._theme[skinId] || this._theme['default'];
            EZGUI.utils.extendJSON(settings, skin);
            this.fixLimits(settings, skin);
            return settings;
        };
        Theme.imageComponents = ['bg', 'corner', 'line', 'side', 'image', 'checkmark'];
        Theme.imageStates = ['default', 'hover', 'down', 'checked'];
        Theme.imageVariants = ['', 't', 'r', 'b', 'l', 'left', 'right', 'tl', 'tr', 'bl', 'br'];
        return Theme;
    })();
    EZGUI.Theme = Theme;
})(EZGUI || (EZGUI = {}));
/// <reference path="tween/tween.ts" />
/// <reference path="utils/eventhandler.ts" />
/// <reference path="compatibility.ts" />
/// <reference path="theme.ts" />
var EZGUI;
(function (EZGUI) {
    EZGUI.VERSION = '0.3.0 beta';
    //export var states = ['default', 'hover', 'down', 'checked'];
    EZGUI.tilingRenderer;
    EZGUI.dragging;
    EZGUI.dsx;
    EZGUI.dsy;
    EZGUI.startDrag = { x: null, y: null, t: null };
    EZGUI.focused;
    EZGUI.game;
    EZGUI.themes = {};
    EZGUI.components = {};
    EZGUI.radioGroups = [];
    EZGUI.EventsHelper = new EZGUI.utils.EventHandler();
    /**
     * generic settings object
     * accepted parameters
     * crossOrigin : true/false
     */
    EZGUI.settings = {
        crossOrigin: false
    };
    var _components = {};
    function registerComponents(cpt, id) {
        id = id || cpt.name;
        _components[id] = cpt;
    }
    EZGUI.registerComponents = registerComponents;
    function create(settings, theme) {
        var t = settings.component || 'default';
        var cptConstructor = _components[settings.component] || _components['default'];
        var component;
        if (cptConstructor) {
            component = new cptConstructor(settings, theme);
        }
        return component;
    }
    EZGUI.create = create;
    function tween_animate() {
        requestAnimationFrame(tween_animate);
        EZGUI.Tween.update();
    }
    tween_animate();
    function showHeader() {
        //use https://github.com/daniellmb/console.style ?
        var isChrome = (navigator.userAgent.indexOf("Chrome") != -1);
        var isFirefox = (navigator.userAgent.indexOf("Firefox") != -1);
        var isIE = (navigator.userAgent.indexOf("MSIE") != -1);
        if (isChrome) {
            //console.log('%cEZGUI', 'font-size:60px;color:#fff;text-shadow:0 1px 0 #ccc,0 2px 0 #c9c9c9,0 3px 0 #bbb,0 4px 0 #b9b9b9,0 5px 0 #aaa,0 6px 1px rgba(0,0,0,.1),0 0 5px rgba(0,0,0,.1),0 1px 3px rgba(0,0,0,.3),0 3px 5px rgba(0,0,0,.2),0 5px 10px rgba(0,0,0,.25),0 10px 10px rgba(0,0,0,.2),0 20px 20px rgba(0,0,0,.15);');﻿
            console.log('%cEZ%cGUI%c v' + EZGUI.VERSION + '%c | http://ezgui.ezelia.com  %c[We %c❤%c HTML5]', 'font-weight:bold;font-size:20px;color:#b33;text-shadow:0 1px 0 #ccc,0 2px 0 #c9c9c9,0 3px 0 #bbb', 'font-weight:bold;font-size:20px;color:#000;text-shadow:0 1px 0 #ccc,0 2px 0 #c9c9c9,0 3px 0 #bbb', 'font-size:12px;font-weight:bold; color: #b33;', 'font-size:12px;font-weight:bold; color: #000;', 'font-size:12px;font-weight:bold; color: #fff;background:#f18050', 'font-size:12px;font-weight:bold; color: #f00;background:#f18050', 'font-size:12px;font-weight:bold; color: #fff;background:#f18050');
            return;
        }
        if (isFirefox) {
            console.log('%cEZGUI%c v' + EZGUI.VERSION + '%c | http://ezgui.ezelia.com  %c[We ❤ HTML5]', 'font-weight:bold;font-size:20px;color:#b33;text-shadow:0 1px 0 #ccc,0 2px 0 #c9c9c9,0 3px 0 #bbb', 'font-size:12px;font-weight:bold; color: #b33;', 'font-size:12px;font-weight:bold; color: #000;', 'font-size:12px;font-weight:bold; color: #fff;background:#f18050');
            return;
        }
        if (window['console']) {
            console.log(' EZGUI v' + EZGUI.VERSION + '   [We <3 HTML5] | http://ezgui.ezelia.com');
        }
    }
    showHeader();
})(EZGUI || (EZGUI = {}));
/// <reference path="ezgui.ts" />
var EZGUI;
(function (EZGUI) {
    var MultistateSprite = (function (_super) {
        __extends(MultistateSprite, _super);
        function MultistateSprite(texture, states) {
            _super.call(this, texture);
            this.stateTextures = {};
            this.stateTextures['default'] = texture;
            if (states) {
                for (var s in states) {
                    var tx = states[s];
                    if (tx instanceof PIXI.Texture) {
                        this.stateTextures[s] = tx;
                    }
                }
            }
        }
        MultistateSprite.prototype.addState = function (id, texture) {
            this.stateTextures[id] = texture;
        };
        MultistateSprite.prototype.setState = function (state) {
            if (state === void 0) { state = 'default'; }
            var sprite = this;
            if (!sprite.stateTextures[state])
                return;
            if (sprite.texture) {
                sprite.texture = sprite.stateTextures[state];
            }
            else {
                if (sprite._texture)
                    sprite._texture = sprite.stateTextures[state];
            }
            if (sprite._tilingTexture)
                sprite._tilingTexture = sprite.stateTextures[state];
        };
        return MultistateSprite;
    })(PIXI.Sprite);
    EZGUI.MultistateSprite = MultistateSprite;
})(EZGUI || (EZGUI = {}));
/// <reference path="ezgui.ts" />
/// <reference path="../lib/pixi.d.ts" />
/// <reference path="multistatesprite.ts" />
/// <reference path="compatibility.ts" />
var EZGUI;
(function (EZGUI) {
    var GUIObject = (function (_super) {
        __extends(GUIObject, _super);
        function GUIObject() {
            _super.call(this);
            this.container = new EZGUI.Compatibility.GUIContainer();
            this.addChild(this.container);
        }
        Object.defineProperty(GUIObject.prototype, "Id", {
            get: function () {
                return this.guiID;
            },
            set: function (val) {
                this.guiID = val;
            },
            enumerable: true,
            configurable: true
        });
        GUIObject.prototype.setupEvents = function () {
            var _this = this;
            //var _this:any = this;
            _this.interactive = true;
            _this.mouseover = function (event) {
                //console.log('mouseover ', _this.guiID);
                //if PIXI 2 use event else use event.data
                var data = event.data || event;
                if (!_this.canTrigger(event, _this)) {
                    return;
                }
                //console.log('hover ', guiObj.guiID);
                _this._over = true;
                //guiObj.setState('hover');
                _this.emit('ezgui:mouseover', event, _this);
            };
            _this.mouseout = function (event) {
                //console.log('mouseout ', _this.guiID);
                //if PIXI 2 use event else use event.data
                var data = event.data || event;
                _this._over = false;
                //guiObj.setState('out');
                _this.emit('ezgui:mouseout', event, _this);
            };
            //handle drag stuff
            _this.mousedown = _this.touchstart = function (event) {
                //console.log('mousedown ', _this.guiID);
                if (!_this.canTrigger(event, _this)) {
                    return;
                }
                var pos = EZGUI.utils.getRealPos(event);
                EZGUI.startDrag.x = pos.x;
                EZGUI.startDrag.y = pos.y;
                EZGUI.startDrag.t = Date.now();
                var data = event.data || event;
                _this.emit('ezgui:mousedown', event, _this);
                //event.stopped = true;
            };
            _this.mouseup = _this.mouseupoutside = _this.touchend = _this.touchendoutside = function (event) {
                if (!_this.canTrigger(event, _this)) {
                    return;
                }
                var data = event.data || event;
                _this.emit('ezgui:mouseup', event, _this);
                var pos = EZGUI.utils.getRealPos(event);
                if (EZGUI.utils.distance(pos.x, pos.y, EZGUI.startDrag.x, EZGUI.startDrag.y) <= 4) {
                    _this.emit('ezgui:click', event, _this);
                    if (EZGUI.focused && _this != EZGUI.focused && EZGUI.focused.emit)
                        EZGUI.focused.emit('ezgui:blur');
                    EZGUI.focused = _this;
                    EZGUI.focused.emit('ezgui:focus');
                    event.stopped = true;
                }
            };
            _this.mousemove = _this.touchmove = function (event) {
                if (_this._over) {
                    if (_this.canTrigger(event, _this)) {
                        _this._over = false;
                        _this.mouseover(event);
                    }
                    else {
                        _this.mouseout(event);
                    }
                }
                if (!_this.canTrigger(event, _this)) {
                    return;
                }
                var data = event.data || event;
                _this.emit('ezgui:mousemove', event, _this);
            };
            _this.click = _this.tap = function (event) {
                //console.log('click', _this.guiID);
                //var pos = utils.getRealPos(event);
                //if (utils.distance(pos.x, pos.y, _this.startDrag.x, _this.startDrag.y) > 4) return;
                //if (guiObj.canTrigger(event, guiObj)) guiObj.emit('ezgui:click', event);
            };
            if (_this.phaserGroup) {
                _this.phaserGroup.inputEnabled = true;
                _this.phaserGroup.events.onInputOver.add(function (target, event) {
                    _this._over = true;
                    //console.log('ezgui:mouseover', event);
                    _this.emit('ezgui:mouseover', event, _this);
                }, this);
                _this.phaserGroup.events.onInputOut.add(function (target, event) {
                    _this._over = false;
                    _this.emit('ezgui:mouseout', event, _this);
                    //console.log('ezgui:mouseout', event);
                }, this);
                _this.phaserGroup.events.onInputDown.add(function (target, event) {
                    if (!_this.canTrigger(event, _this)) {
                        return;
                    }
                    var pos = EZGUI.utils.getRealPos(event);
                    EZGUI.startDrag.x = pos.x;
                    EZGUI.startDrag.y = pos.y;
                    EZGUI.startDrag.t = Date.now();
                    _this.emit('ezgui:mousedown', event, _this);
                    if (!_this.draggable && _this.guiParent && _this.guiParent.draggable) {
                        _this.guiParent.emit('ezgui:mousedown', event, _this);
                    }
                    //    
                    //console.log('ezgui:mousedown', event);
                }, this);
                _this.phaserGroup.events.onInputUp.add(function (target, event) {
                    //if (!_this.canTrigger(event, _this)) {
                    //    return;
                    //}
                    //_this.emit('ezgui:mouseup', event);
                    _this.emit('ezgui:mouseup', event, _this);
                    var pos = EZGUI.utils.getRealPos(event);
                    if (EZGUI.utils.distance(pos.x, pos.y, EZGUI.startDrag.x, EZGUI.startDrag.y) <= 4) {
                        _this.emit('ezgui:click', event, _this);
                        if (EZGUI.focused && _this != EZGUI.focused && EZGUI.focused.emit)
                            EZGUI.focused.emit('ezgui:blur');
                        EZGUI.focused = _this;
                        EZGUI.focused.emit('ezgui:focus');
                    }
                    if (!_this.draggable && _this.guiParent && _this.guiParent.draggable) {
                        _this.guiParent.emit('ezgui:mouseup', event, _this);
                    }
                }, this);
                //Phaser.GAMES[0].input.moveCallback = function (pointer, x, y) {
                //    console.log(pointer, x, y);
                //}
                Phaser.GAMES[0].input.mouse.mouseMoveCallback = function (event) {
                    if (_this._over) {
                        if (_this.canTrigger(event, _this)) {
                            _this._over = true;
                            _this.emit('ezgui:mouseover', event, _this);
                        }
                        else {
                            _this._over = false;
                            _this.emit('ezgui:mouseout', event, _this);
                        }
                    }
                    if (!_this.canTrigger(event, _this)) {
                        return;
                    }
                    var data = event.data || event;
                    _this.emit('ezgui:mousemove', event, _this);
                };
            }
        };
        GUIObject.prototype.originalAddChildAt = function (child, index) {
            return _super.prototype.addChildAt.call(this, child, index);
        };
        GUIObject.prototype.originalAddChild = function (child) {
            return this.originalAddChildAt(child, this.children.length);
        };
        GUIObject.prototype.addChild = function (child) {
            if (child instanceof EZGUI.GUISprite) {
                //return this.container.addChild(child);
                child.guiParent = this;
                if (child.phaserGroup)
                    return this.container.addChild(child.phaserGroup);
                else
                    return this.container.addChild(child);
            }
            else {
                return _super.prototype.addChild.call(this, child);
            }
        };
        GUIObject.prototype.removeChild = function (child) {
            if (child instanceof EZGUI.GUISprite) {
                child.guiParent = null;
                if (child.phaserGroup)
                    return this.container.removeChild(child.phaserGroup);
                else
                    return this.container.removeChild(child);
            }
            else {
                return _super.prototype.removeChild.call(this, child);
            }
        };
        GUIObject.prototype.mouseInObj = function (event, guiSprite) {
            var data = event.data || event;
            var clientpos = EZGUI.utils.getClientXY(event);
            var origEvt = event;
            if (data.originalEvent && data.originalEvent.changedTouches && data.originalEvent.changedTouches.length > 0) {
                origEvt = data.originalEvent.changedTouches[0];
            }
            else if (data.originalEvent && data.originalEvent.touches && data.originalEvent.touches.length > 0) {
                origEvt = data.originalEvent.touches[0];
            }
            else {
                if (data.originalEvent)
                    origEvt = data.originalEvent;
            }
            var bcr = origEvt.target.getBoundingClientRect();
            var px = clientpos.x - bcr.left;
            var py = clientpos.y - bcr.top;
            var absPos = EZGUI.utils.getAbsPos(guiSprite);
            if (px < absPos.x || px > absPos.x + guiSprite.width || py < absPos.y || py > absPos.y + guiSprite.height)
                return false;
            return true;
        };
        GUIObject.prototype.canTrigger = function (event, guiSprite) {
            var data = event.data || event;
            var clientpos = EZGUI.utils.getClientXY(event);
            var origEvt = event;
            if (data.originalEvent && data.originalEvent.changedTouches && data.originalEvent.changedTouches.length > 0) {
                origEvt = data.originalEvent.changedTouches[0];
            }
            else if (data.originalEvent && data.originalEvent.touches && data.originalEvent.touches.length > 0) {
                origEvt = data.originalEvent.touches[0];
            }
            else {
                if (data.originalEvent)
                    origEvt = data.originalEvent;
            }
            if (!origEvt.target.getBoundingClientRect)
                return false;
            var bcr = origEvt.target.getBoundingClientRect();
            var px = clientpos.x - bcr.left;
            var py = clientpos.y - bcr.top;
            //var absPos = utils.getAbsPos(guiSprite);
            //if (px < absPos.x || px > absPos.x + guiSprite.width || py < absPos.y || py > absPos.y + guiSprite.height) return false;
            //check if click is in visible zone
            var masked = EZGUI.utils.isMasked(px, py, guiSprite);
            return !masked;
        };
        GUIObject.prototype.on = function (event, fn, context) {
            return _super.prototype.on.call(this, 'ezgui:' + event, fn, context);
            //super.on('gui:' + event, cb);
        };
        GUIObject.prototype.off = function (event, fn, context) {
            if (EZGUI.Compatibility.PIXIVersion == 2) {
                if (fn == null && context == null) {
                    this._listeners['ezgui:' + event] = [];
                    return;
                }
            }
            return _super.prototype.off.call(this, 'ezgui:' + event, fn, context);
            //super.on('gui:' + event, cb);
        };
        GUIObject.prototype.bindChildren = function (event, fn) {
            for (var i = 0; i < this.container.children.length; i++) {
                var child = this.container.children[i];
                if (child.guiSprite)
                    child = child.guiSprite;
                child.on(event, fn);
            }
        };
        GUIObject.prototype.bindChildrenOfType = function (_type, event, fn) {
            for (var i = 0; i < this.container.children.length; i++) {
                var child = this.container.children[i];
                if (child.guiSprite)
                    child = child.guiSprite;
                if (child instanceof _type)
                    child.on(event, fn);
            }
        };
        GUIObject.prototype.unbindChildren = function (event, fn) {
            for (var i = 0; i < this.container.children.length; i++) {
                var child = this.container.children[i];
                if (child.guiSprite)
                    child = child.guiSprite;
                child.off(event, fn);
            }
        };
        GUIObject.prototype.unbindChildrenOfType = function (_type, event, fn) {
            for (var i = 0; i < this.container.children.length; i++) {
                var child = this.container.children[i];
                if (child.guiSprite)
                    child = child.guiSprite;
                if (child instanceof _type)
                    child.off(event, fn);
            }
        };
        GUIObject.prototype.preUpdate = function () {
        };
        GUIObject.prototype.update = function () {
        };
        GUIObject.prototype.postUpdate = function () {
        };
        GUIObject.prototype.destroy = function () {
            if (this.phaserGroup) {
                this.phaserGroup.destroy();
            }
            if (this.parent && this.parent.removeChild)
                this.parent.removeChild(this);
            delete EZGUI.components[this.guiID];
        };
        return GUIObject;
    })(EZGUI.Compatibility.GUIDisplayObjectContainer);
    EZGUI.GUIObject = GUIObject;
    EZGUI.registerComponents(EZGUI.GUISprite, 'default');
})(EZGUI || (EZGUI = {}));
/// <reference path="guiobject.ts" />
var EZGUI;
(function (EZGUI) {
    var GUISprite = (function (_super) {
        __extends(GUISprite, _super);
        //private savedSettings;
        function GUISprite(settings, themeId) {
            _super.call(this);
            this.settings = settings;
            this.themeId = themeId;
            this.dragXInterval = [-Infinity, +Infinity];
            this.dragYInterval = [-Infinity, +Infinity];
            //this.container = new Compatibility.GUIContainer();
            //this.addChild(this.container);
            this.userData = settings.userData;
            if (themeId instanceof EZGUI.Theme)
                this.theme = themeId;
            else
                this.theme = EZGUI.themes[themeId];
            if (!this.theme || !this.theme.ready) {
                console.error('[EZGUI ERROR]', 'Theme is not ready, nothing to display');
                this.theme = new EZGUI.Theme({});
            }
            //this.savedSettings = JSON.parse(JSON.stringify(_settings));
            //this._settings = this.theme.applySkin(_settings);
            //this.parseSettings();
            //this.draw();
            //this.drawText();
            //this.setupEvents();
            //this.handleEvents();
            this.rebuild();
        }
        Object.defineProperty(GUISprite.prototype, "text", {
            //get settings(): string {
            //    return this._settings;
            //}
            get: function () {
                if (this.textObj)
                    return this.textObj.text;
            },
            set: function (val) {
                if (this.textObj) {
                    if (EZGUI.Compatibility.PIXIVersion == 3) {
                        this.textObj.text = val;
                    }
                    else {
                        this.textObj.setText(val);
                    }
                    if (this._settings.anchor) {
                        this.textObj.position.x = 0;
                        this.textObj.position.y = 0;
                        if (this.textObj.anchor) {
                            this.textObj.anchor.x = this._settings.anchor.x;
                            this.textObj.anchor.y = this._settings.anchor.y;
                        }
                        else {
                            //fake anchor for bitmap font
                            this.textObj.position.x -= this.textObj.width / 2;
                            this.textObj.position.y -= this.textObj.height / 2;
                        }
                    }
                    else {
                        this.textObj.position.x = (this._settings.width - this.textObj.width) / 2;
                        this.textObj.position.y = (this._settings.height - this.textObj.height) / 2;
                        if (this.textObj.anchor) {
                            this.textObj.anchor.x = 0;
                            this.textObj.anchor.y = 0;
                        }
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        GUISprite.prototype.erase = function () {
            this.container.children.length = 0; //clear all children
            this.children.length = 0;
            this.rootSprite = undefined;
        };
        GUISprite.prototype.rebuild = function () {
            this.erase();
            var _settings = JSON.parse(JSON.stringify(this.settings));
            this._settings = this.theme.applySkin(_settings);
            this.parseSettings();
            this.draw();
            this.drawText();
            this.setupEvents();
            this.handleEvents();
        };
        GUISprite.prototype.parsePercentageValue = function (str) {
            if (typeof str != 'string')
                return NaN;
            var val = NaN;
            var percentToken = str.split('%');
            if (percentToken.length == 2 && percentToken[1] == '') {
                val = parseFloat(percentToken[0]);
            }
            return val;
        };
        GUISprite.prototype.parseSettings = function () {
        };
        GUISprite.prototype.prepareChildSettings = function (settings) {
            var padTop = this._settings['padding-top'] || this._settings.padding || 0;
            var padLeft = this._settings['padding-left'] || this._settings.padding || 0;
            var padBottom = this._settings['padding-bottom'] || this._settings.padding || 0;
            var padRight = this._settings['padding-right'] || this._settings.padding || 0;
            var padX = padRight + padLeft;
            var padY = padTop + padBottom;
            //var _psettings = this._settings;
            var _settings = JSON.parse(JSON.stringify(settings));
            if (_settings) {
                //support percentage values for width and height
                if (typeof _settings.width == 'string') {
                    var p = this.parsePercentageValue(_settings.width);
                    if (p != NaN)
                        _settings.width = (this.width - padX) * p / 100;
                }
                if (typeof _settings.height == 'string') {
                    var p = this.parsePercentageValue(_settings.height);
                    if (p != NaN)
                        _settings.height = (this.height - padY) * p / 100;
                }
                if (typeof _settings.position == 'object') {
                    if (typeof _settings.position.x == 'string') {
                        var px = this.parsePercentageValue(_settings.position.x);
                        if (px != NaN)
                            _settings.position.x = (this.width - padX) * px / 100;
                    }
                    if (typeof _settings.position.y == 'string') {
                        var py = this.parsePercentageValue(_settings.position.y);
                        if (py != NaN)
                            _settings.position.y = (this.height - padY) * py / 100;
                    }
                }
            }
            return _settings;
        };
        GUISprite.prototype.setDraggable = function (val) {
            if (val === void 0) { val = true; }
            if (val)
                this.draggable = this;
            else
                this.draggable = undefined;
        };
        GUISprite.prototype.handleEvents = function () {
            var _this = this;
            //var _this = this;
            this.draghandle = _this;
            if (_this._settings.draggable == true) {
                this.draggable = _this;
            }
            if (_this._settings.draggable == 'container') {
                this.draggable = _this.container;
            }
            if (_this._settings.dragX === false) {
                this.dragConstraint = 'y';
            }
            if (_this._settings.dragY === false) {
                this.dragConstraint = 'x';
            }
            //guiObj.on('mouseover', function () {
            //    guiObj.setState('hover');
            //});
            //guiObj.on('mouseout', function () {
            //    //EZGUI.dragging = null;
            //    guiObj.setState('out');
            //});
            //handle drag stuff
            _this.on('mousedown', function (event) {
                if (_this.draggable) {
                    if (_this.mouseInObj(event, _this.draghandle)) {
                        //if PIXI 2 use event else use event.data
                        var data = event.data || event;
                        //guiObj.alpha = 0.9;
                        EZGUI.dragging = _this;
                        //console.log('set dragging', EZGUI.dragging.guiID);
                        var pos = EZGUI.utils.getRealPos(event);
                        EZGUI.dsx = pos.x;
                        EZGUI.dsy = pos.y;
                        EZGUI.startDrag.x = pos.x;
                        EZGUI.startDrag.y = pos.y;
                    }
                }
                //only work in PIXI 3 ?
                //guiObj.setState('click');
            });
            _this.on('mouseup', function (event) {
                //guiObj.alpha = 1
                EZGUI.dragging = null;
                _this.setState('default');
            });
            _this.on('mousemove', function (event) {
                if (EZGUI.dragging) {
                    var dg = _this.draggable ? _this.draggable.guiID : '';
                }
                var PhaserDrag = typeof Phaser != 'undefined' && EZGUI.dragging;
                if (_this.draggable && EZGUI.dragging == _this || PhaserDrag) {
                    var pos = EZGUI.utils.getRealPos(event);
                    var dragObg = EZGUI.dragging;
                    var draggable = EZGUI.dragging.draggable;
                    var dpos = EZGUI.utils.getAbsPos(draggable);
                    if (dragObg.dragConstraint != 'y') {
                        var nextPos = draggable.position.x + pos.x - EZGUI.dsx;
                        if (nextPos >= dragObg.dragXInterval[0] && nextPos <= dragObg.dragXInterval[1])
                            draggable.position.x = nextPos;
                    }
                    if (dragObg.dragConstraint != 'x') {
                        var nextPos = draggable.position.y + pos.y - EZGUI.dsy;
                        if (nextPos >= dragObg.dragYInterval[0] && nextPos <= dragObg.dragYInterval[1])
                            draggable.position.y = nextPos;
                    }
                    EZGUI.dsx = pos.x;
                    EZGUI.dsy = pos.y;
                }
            });
        };
        /**
         * Main draw function
         */
        GUISprite.prototype.draw = function () {
            var settings = this._settings;
            if (settings) {
                this.guiID = settings.id;
                //add reference to component
                if (this.guiID)
                    EZGUI.components[this.guiID] = this;
                for (var s = 0; s < EZGUI.Theme.imageStates.length; s++) {
                    var stateId = EZGUI.Theme.imageStates[s];
                    var container = new EZGUI.Compatibility.GUIContainer();
                    var controls = this.createVisuals(settings, stateId);
                    for (var i = 0; i < controls.length; i++) {
                        container.addChild(controls[i]);
                    }
                    var texture = EZGUI.Compatibility.createRenderTexture(settings.width, settings.height);
                    texture.render(container);
                    if (!this.rootSprite) {
                        this.rootSprite = new EZGUI.MultistateSprite(texture);
                        this.addChild(this.rootSprite);
                    }
                    else {
                        this.rootSprite.addState(stateId, texture);
                    }
                }
                var padding = settings.padding || 0;
                if (settings.position) {
                    this.position.x = settings.position.x;
                    this.position.y = settings.position.y;
                }
                else {
                    this.position.x = 0;
                    this.position.y = 0;
                }
                //this.container = new Compatibility.GUIContainer();
                //this.addChild(this.container);
                if (settings.children) {
                    for (var i = 0; i < settings.children.length; i++) {
                        var btnObj = this.prepareChildSettings(settings.children[i]); // JSON.parse(JSON.stringify(settings.children[i]));
                        var child = this.createChild(btnObj, i);
                        if (!child)
                            continue;
                        //if (child.phaserGroup) this.container.addChild(child.phaserGroup);
                        //else this.container.addChild(child);
                        //force call original addChild to prevent conflict with local addchild
                        _super.prototype.addChild.call(this, child);
                        child.guiParent = this;
                    }
                }
                if (this._settings.anchor) {
                    this.rootSprite.anchor.x = this._settings.anchor.x;
                    this.rootSprite.anchor.y = this._settings.anchor.y;
                    this.container.position.x -= this.rootSprite.width * this._settings.anchor.x;
                    this.container.position.y -= this.rootSprite.height * this._settings.anchor.y;
                    this.position.x += this.rootSprite.width * this._settings.anchor.x;
                    this.position.y += this.rootSprite.height * this._settings.anchor.y;
                }
                //tint color
                if (this._settings.color) {
                    var pixiColor = EZGUI.utils.ColorParser.parseToPixiColor(this._settings.color);
                    if (pixiColor >= 0) {
                        this.rootSprite.tint = pixiColor;
                    }
                }
                //move container to top
                this.addChild(this.container);
                this.sortChildren();
            }
        };
        GUISprite.prototype.sortChildren = function () {
            if (!this.container)
                return;
            var comparator = function (a, b) {
                if (a.guiSprite)
                    a = a.guiSprite;
                if (b.guiSprite)
                    b = b.guiSprite;
                a._settings.z = a._settings.z || 0;
                b._settings.z = b._settings.z || 0;
                return a._settings.z - b._settings.z;
            };
            this.container.children.sort(comparator);
        };
        /**
         * Text draw function
         * shared by all components
         */
        GUISprite.prototype.drawText = function () {
            if (this._settings && this._settings.text != undefined && this.rootSprite) {
                //var settings = this.theme.applySkin(this._settings);
                var settings = this._settings;
                if (EZGUI.Compatibility.BitmapText.fonts && EZGUI.Compatibility.BitmapText.fonts[settings.font.family]) {
                    this.textObj = new EZGUI.Compatibility.BitmapText(this._settings.text, { font: settings.font.size + ' ' + settings.font.family });
                    var pixiColor = EZGUI.utils.ColorParser.parseToPixiColor(settings.font.color);
                    if (pixiColor >= 0) {
                        this.textObj.tint = pixiColor;
                        this.textObj.dirty = true;
                    }
                }
                else {
                    var style = { font: settings.font.size + ' ' + settings.font.family, fill: settings.font.color };
                    for (var s in settings.font) {
                        if (!style[s])
                            style[s] = settings.font[s];
                    }
                    this.textObj = new PIXI.Text(this._settings.text, style);
                }
                //text.height = this.height;
                this.textObj.position.x = 0; //(this._settings.width - this.textObj.width) / 2;
                this.textObj.position.y = 0; //(this._settings.height - this.textObj.height) / 2;
                if (this._settings.anchor) {
                    this.textObj.position.x = 0;
                    this.textObj.position.y = 0;
                    if (this.textObj.anchor) {
                        this.textObj.anchor.x = this._settings.anchor.x;
                        this.textObj.anchor.y = this._settings.anchor.y;
                    }
                    else {
                        //fake anchor for bitmap font
                        this.textObj.position.x -= this.textObj.width / 2;
                        this.textObj.position.y -= this.textObj.height / 2;
                    }
                }
                else {
                    this.textObj.position.x = (this._settings.width - this.textObj.width) / 2;
                    this.textObj.position.y = (this._settings.height - this.textObj.height) / 2;
                    if (this.textObj.anchor) {
                        this.textObj.anchor.x = 0;
                        this.textObj.anchor.y = 0;
                    }
                }
                this.rootSprite.addChild(this.textObj);
            }
        };
        GUISprite.prototype.createChild = function (childSettings, order) {
            if (!childSettings)
                return null;
            var i = order;
            var pos = childSettings.position;
            if (typeof pos == 'string') {
                var parts = pos.split(' ');
                var pos1 = parts[0];
                var pos2 = parts[1];
                //normalize pos
                if (parts[0] == parts[1]) {
                    pos2 = undefined;
                }
                if ((parts[0] == 'top' && parts[2] == 'bottom') || (parts[0] == 'bottom' && parts[2] == 'top') || (parts[0] == 'left' && parts[2] == 'right') || (parts[0] == 'right' && parts[2] == 'left')) {
                    pos1 = 'center';
                    pos2 = 'undefined';
                }
                if ((parts[0] == 'left' || parts[0] == 'right') && (parts[1] == 'top' || parts[1] == 'bottom')) {
                    pos1 = parts[1];
                    pos2 = parts[0];
                }
                if ((pos1 == 'left' || pos1 == 'right') && pos2 === undefined) {
                    pos2 = pos1;
                    pos1 = 'left';
                }
                var padTop = this._settings['padding-top'] || this._settings.padding || 0;
                var padLeft = this._settings['padding-left'] || this._settings.padding || 0;
                childSettings.position = { x: 0, y: 0 };
                if (pos1 == 'center') {
                    //childSettings.anchor = { x: 0.5, y: 0.5 };
                    childSettings.position.x = (this._settings.width - childSettings.width) / 2;
                    childSettings.position.y = (this._settings.height - childSettings.height + padTop) / 2;
                }
                switch (pos1) {
                    case 'center':
                        childSettings.position.y = (this._settings.height - childSettings.height + padTop) / 2;
                        if (pos2 === undefined)
                            childSettings.position.x = (this._settings.width - childSettings.width) / 2;
                        break;
                    case 'bottom':
                        childSettings.position.y = this._settings.height - childSettings.height - this._settings.padding;
                        break;
                }
                switch (pos2) {
                    case 'center':
                        childSettings.position.x = (this._settings.width - childSettings.width) / 2;
                        break;
                    case 'right':
                        childSettings.position.x = this._settings.width - childSettings.width - this._settings.padding;
                        break;
                }
            }
            var child = EZGUI.create(childSettings, this.theme);
            return child;
        };
        /**
         *
         */
        GUISprite.prototype.setState = function (state) {
            if (state === void 0) { state = 'default'; }
            for (var i = 0; i < this.children.length; i++) {
                var child = this.children[i];
                if (child instanceof EZGUI.MultistateSprite) {
                    child.setState(state);
                }
            }
        };
        GUISprite.prototype.animatePosTo = function (x, y, time, easing, callback) {
            if (time === void 0) { time = 1000; }
            if (easing === void 0) { easing = EZGUI.Easing.Linear.None; }
            easing = easing || EZGUI.Easing.Linear.None;
            if (typeof callback == 'function') {
                var tween = new EZGUI.Tween(this.position).to({ x: x, y: y }, time).easing(easing).onComplete(callback);
            }
            else {
                var tween = new EZGUI.Tween(this.position).to({ x: x, y: y }, time).easing(easing);
            }
            tween.start();
            return tween;
        };
        GUISprite.prototype.animateSizeTo = function (w, h, time, easing, callback) {
            if (time === void 0) { time = 1000; }
            if (easing === void 0) { easing = EZGUI.Easing.Linear.None; }
            easing = easing || EZGUI.Easing.Linear.None;
            if (typeof callback == 'function') {
                var tween = new EZGUI.Tween(this).to({ width: w, height: h }, time).easing(easing).onComplete(callback);
            }
            else {
                var tween = new EZGUI.Tween(this).to({ width: w, height: h }, time).easing(easing);
            }
            tween.start();
            return tween;
        };
        /**
         *
         */
        GUISprite.prototype.getFrameConfig = function (config, state) {
            var cfg = JSON.parse(JSON.stringify(config)); //if (cfg.texture instanceof PIXI.Texture) return cfg;
            if (typeof cfg == 'string') {
                cfg = { 'default': cfg };
            }
            var src = cfg[state] == null ? cfg['default'] : cfg[state];
            var texture;
            if (src.trim() != '')
                texture = PIXI.Texture.fromFrame(src);
            cfg.texture = texture;
            return cfg;
        };
        GUISprite.prototype.getComponentConfig = function (component, part, side, state) {
            //var ctype = this.theme[type] || this.theme['default'];
            var skin = this.theme.getSkin(component);
            if (!skin)
                return;
            var scale = (skin.scale == undefined) ? 1 : skin.scale;
            var rotation = 0;
            //get configuration, if explicit configuration is defined then use it otherwise use theme config
            //var hasSide = this.settings[component + '-' + side] || ctype[component + '-' + side];
            var cfg = this._settings[part + '-' + side] || skin[part + '-' + side] || this._settings[part] || skin[part];
            if (!cfg)
                return;
            if (skin[part] && !skin[part + '-' + side]) {
                switch (side) {
                    case 'tr':
                    case 'r':
                        rotation = 90 * Math.PI / 180;
                        break;
                    case 'bl':
                    case 'l':
                        rotation = -90 * Math.PI / 180;
                        break;
                    case 'br':
                    case 'b':
                        rotation = 180 * Math.PI / 180;
                        break;
                }
            }
            cfg = this.getFrameConfig(cfg, state);
            cfg.rotation = cfg.rotation != undefined ? cfg.rotation : rotation;
            cfg.scale = cfg.scale != undefined ? cfg.scale : scale;
            var bgPadding = this._settings['bgPadding'] != undefined ? this._settings['bgPadding'] : skin['bgPadding'];
            cfg.bgPadding = bgPadding != undefined ? bgPadding : 0;
            //cfg.hoverTexture = cfg.hover ? PIXI.Texture.fromFrame(cfg.hover) : cfg.texture;
            return cfg;
        };
        GUISprite.prototype.createThemeCorner = function (settings, part, side, state) {
            var component = settings.skin || settings.component || 'default';
            var cfg = this.getComponentConfig(component, part, side, state);
            if (!cfg || !cfg.texture)
                return;
            //var ctype = this.theme[type] || this.theme['default'];
            //var skin = this.theme.getSkin(component);
            var skin = settings;
            var hasSide = this._settings[part + '-' + side] || skin[part + '-' + side];
            //var sprite = new MultistateSprite(cfg.texture, cfg.textures);
            var sprite = new PIXI.Sprite(cfg.texture);
            sprite.rotation = cfg.rotation;
            sprite.scale.x = cfg.scale;
            sprite.scale.y = cfg.scale;
            switch (side) {
                case 'tl':
                    sprite.position.x = 0;
                    sprite.position.y = 0;
                    break;
                case 'tr':
                    sprite.position.x = settings.width;
                    sprite.position.y = 0;
                    break;
                case 'bl':
                    sprite.position.x = 0;
                    sprite.position.y = settings.height;
                    break;
                case 'br':
                    sprite.position.x = settings.width;
                    sprite.position.y = settings.height;
                    break;
            }
            //needed for specific corner sides : corner-tl corner-tr corner-bl corner-br
            if (hasSide) {
                if (sprite.position.y != 0)
                    sprite.anchor.y = 1;
                if (sprite.position.x != 0)
                    sprite.anchor.x = 1;
            }
            return sprite;
        };
        GUISprite.prototype.createThemeSide = function (settings, side, state) {
            var component = settings.component;
            var cfg = this.getComponentConfig(component, side, '', state);
            if (!cfg || !cfg.texture)
                return;
            //var sprite = new MultistateSprite(cfg.texture, cfg.textures);
            var sprite = new PIXI.Sprite(cfg.texture);
            //sprite.rotation = cfg.rotation;
            sprite.scale.x = cfg.scale;
            sprite.scale.y = cfg.scale;
            sprite.height = settings.height;
            switch (side) {
                case 'left':
                    sprite.position.x = 0;
                    sprite.position.y = 0;
                    break;
                case 'right':
                    sprite.position.x = settings.width;
                    sprite.position.y = 0;
                    break;
            }
            return sprite;
        };
        GUISprite.prototype.createThemeBorder = function (settings, part, side, state) {
            var component = settings.skin || settings.component || 'default';
            var cfg = this.getComponentConfig(component, part, side, state);
            if (!cfg || !cfg.texture)
                return;
            var tlCornerCfg = this.getComponentConfig(component, 'corner', 'tl', state);
            var blCornerCfg = this.getComponentConfig(component, 'corner', 'bl', state);
            if (!tlCornerCfg || !tlCornerCfg.texture)
                return;
            if (!blCornerCfg || !blCornerCfg.texture)
                return;
            //var ctype = this.theme[type] || this.theme['default'];
            //var ctype = this.theme.getSkin(component);
            var ctype = settings;
            var hasSide = this._settings[part + '-' + side] || ctype[part + '-' + side];
            var cwidth, cheight;
            var twidth, theight;
            switch (side) {
                case 't':
                case 'b':
                    cwidth = tlCornerCfg.texture.width * tlCornerCfg.scale;
                    cheight = blCornerCfg.texture.height * blCornerCfg.scale;
                    twidth = (settings.width - (cwidth * 2)) * 1 / cfg.scale;
                    theight = cfg.texture.height;
                    break;
                case 'r':
                case 'l':
                    cwidth = tlCornerCfg.texture.height * tlCornerCfg.scale;
                    twidth = (settings.height - (cwidth * 2)) * 1 / cfg.scale;
                    theight = cfg.texture.height;
                    if (hasSide) {
                        cheight = tlCornerCfg.texture.width * tlCornerCfg.scale;
                        twidth = tlCornerCfg.texture.width;
                        theight = (settings.height - (cwidth * 2)) * 1 / cfg.scale;
                    }
                    break;
            }
            //var cwidth = cornerCfg.texture.width * cornerCfg.scale;
            //var line: any = new MultistateTilingSprite(cfg.texture, twidth, theight, cfg.textures);
            var line = new EZGUI.Compatibility.TilingSprite(cfg.texture, twidth, theight);
            //phaser 2.4 compatibility /////////////////////////////////
            line.fixPhaser24();
            switch (side) {
                case 't':
                    line.position.x = cwidth;
                    line.position.y = 0;
                    break;
                case 'r':
                    line.position.y = cwidth;
                    if (!hasSide) {
                        line.position.x = settings.width - cwidth;
                        line.anchor.x = 0;
                        line.anchor.y = 1;
                    }
                    else {
                        line.position.x = settings.width;
                        line.anchor.x = 1;
                        line.anchor.y = 0;
                    }
                    break;
                case 'b':
                    line.position.x = cwidth;
                    if (!hasSide) {
                        line.position.y = settings.height - cwidth;
                        line.anchor.x = 1;
                        line.anchor.y = 1;
                    }
                    else {
                        line.position.y = settings.height - cheight;
                    }
                    break;
                case 'l':
                    line.position.y = cwidth;
                    if (!hasSide) {
                        line.anchor.x = 1;
                        line.anchor.y = 0;
                    }
                    else {
                        line.anchor.x = 0;
                        line.anchor.y = 0;
                    }
                    break;
            }
            line.scale.x = cfg.scale;
            line.scale.y = cfg.scale;
            line.rotation = cfg.rotation; //180 * Math.PI / 180;
            return line;
        };
        GUISprite.prototype.createThemeTilableBackground = function (settings, state) {
            var component = settings.skin || settings.component || 'default';
            var cfg = this.getComponentConfig(component, 'bg', null, state);
            if (!cfg || !cfg.texture)
                return;
            //cfg.bgPadding = 0;
            //var bg: any = new MultistateTilingSprite(cfg.texture, settings.width - cfg.bgPadding * 2, settings.height - cfg.bgPadding * 2, cfg.textures);
            var bg = new EZGUI.Compatibility.TilingSprite(cfg.texture, settings.width - cfg.bgPadding * 2, settings.height - cfg.bgPadding * 2);
            //phaser 2.4 compatibility /////////////////////////////////
            bg.fixPhaser24();
            ////////////////////////////////////////////////////////////
            bg.position.x = cfg.bgPadding;
            bg.position.y = cfg.bgPadding;
            if (settings.bgTiling) {
                if (settings.bgTiling == "x") {
                    bg.tileScale.y = (settings.height - cfg.bgPadding * 2) / cfg.texture.height;
                }
                if (settings.bgTiling == "y") {
                    bg.tileScale.x = (settings.width - cfg.bgPadding * 2) / cfg.texture.width;
                }
            }
            return bg;
        };
        GUISprite.prototype.createThemeBackground = function (settings, state, leftSide, rightSide) {
            var component = settings.skin || settings.component || 'default';
            var cfg = this.getComponentConfig(component, 'bg', null, state);
            if (!cfg || !cfg.texture)
                return;
            //cfg.bgPadding = 0;
            //var bg: any = new MultistateSprite(cfg.texture, cfg.textures);
            var bg = new PIXI.Sprite(cfg.texture);
            bg.position.x = leftSide.width;
            bg.position.y = 0;
            bg.scale.x = cfg.scale;
            bg.scale.y = cfg.scale;
            bg.width = settings.width - leftSide.width;
            bg.height = settings.height;
            return bg;
        };
        GUISprite.prototype.createThemeImage = function (settings, state, imagefield) {
            if (imagefield === void 0) { imagefield = 'image'; }
            var component = settings.skin || settings.component || 'default';
            //var ctype = this.theme[type] || this.theme['default'];
            var ctype = settings; //this.theme.getSkin(component);
            if (ctype[imagefield]) {
                var cfg = this.getFrameConfig(ctype[imagefield], state);
                //var img = new MultistateSprite(cfg.texture, cfg.textures);
                var img = new PIXI.Sprite(cfg.texture);
                img.width = settings.width;
                img.height = settings.height;
                return img;
            }
            return null;
        };
        GUISprite.prototype.createVisuals = function (settings, state) {
            if (settings.transparent === true)
                return [];
            //priority to image
            var img = this.createThemeImage(settings, state);
            if (img != null)
                return [img];
            var controls = [];
            var leftSide = this.createThemeSide(settings, 'left', state);
            var rightSide = this.createThemeSide(settings, 'right', state);
            var bg = this.createThemeTilableBackground(settings, state);
            if (bg)
                controls.push(bg);
            //if (!leftSide && !rightSide) {
            //    var bg = this.createThemeTilableBackground(settings, state);
            //    if (bg) controls.push(bg);
            //}
            //else {
            //    var bg = this.createThemeBackground(settings, state, leftSide);
            //    if (bg) controls.push(bg);
            //}
            if (leftSide) {
                controls.push(leftSide);
            }
            else {
                var tl = this.createThemeCorner(settings, 'corner', 'tl', state);
                if (tl)
                    controls.push(tl);
                var bl = this.createThemeCorner(settings, 'corner', 'bl', state);
                if (bl)
                    controls.push(bl);
                var lineLeft = this.createThemeBorder(settings, 'line', 'l', state);
                if (lineLeft)
                    controls.push(lineLeft);
            }
            if (rightSide) {
                controls.push(rightSide);
            }
            else {
                var tr = this.createThemeCorner(settings, 'corner', 'tr', state);
                if (tr)
                    controls.push(tr);
                var br = this.createThemeCorner(settings, 'corner', 'br', state);
                if (br)
                    controls.push(br);
                var lineRight = this.createThemeBorder(settings, 'line', 'r', state);
                if (lineRight)
                    controls.push(lineRight);
            }
            if (!leftSide && !rightSide) {
                var lineTop = this.createThemeBorder(settings, 'line', 't', state);
                if (lineTop)
                    controls.push(lineTop);
                var lineBottom = this.createThemeBorder(settings, 'line', 'b', state);
                if (lineBottom)
                    controls.push(lineBottom);
            }
            return controls;
        };
        return GUISprite;
    })(EZGUI.GUIObject);
    EZGUI.GUISprite = GUISprite;
    EZGUI.registerComponents(GUISprite, 'default');
})(EZGUI || (EZGUI = {}));
/// <reference path="../guisprite.ts" />
var EZGUI;
(function (EZGUI) {
    var Component;
    (function (Component) {
        var Input = (function (_super) {
            __extends(Input, _super);
            function Input(settings, themeId) {
                _super.call(this, settings, themeId);
                this.settings = settings;
                this.themeId = themeId;
                if (settings.text)
                    this.text = settings.text;
            }
            Object.defineProperty(Input.prototype, "text", {
                get: function () {
                    if (this.domInput)
                        return this.domInput.value;
                    if (this.textObj)
                        return this.textObj.text;
                },
                set: function (val) {
                    if (this.domInput) {
                        var cpos = this.getCaretPosition();
                        this.domInput.value = val;
                        this.setCaretPosition(cpos);
                        this.setTextWithCaret(val);
                    }
                    if (this.textObj) {
                        this.textObj.text = val;
                    }
                },
                enumerable: true,
                configurable: true
            });
            Input.prototype.setTextWithCaret = function (val, event) {
                if (event === void 0) { event = null; }
                if (this.textObj) {
                    if (EZGUI.Compatibility.PIXIVersion == 3) {
                        this.textObj.text = val;
                    }
                    else {
                        this.textObj.setText(val);
                    }
                    if (this._settings.anchor) {
                        this.textObj.position.x = 0;
                        this.textObj.position.y = 0;
                        if (this.textObj.anchor) {
                            this.textObj.anchor.x = this._settings.anchor.x;
                            this.textObj.anchor.y = this._settings.anchor.y;
                        }
                        else {
                            //fake anchor for bitmap font
                            this.textObj.position.x -= this.textObj.width / 2;
                            this.textObj.position.y -= this.textObj.height / 2;
                        }
                    }
                    else {
                        this.textObj.position.x = (this._settings.width - this.textObj.width) / 2;
                        this.textObj.position.y = (this._settings.height - this.textObj.height) / 2;
                        if (this.textObj.anchor) {
                            this.textObj.anchor.x = 0;
                            this.textObj.anchor.y = 0;
                        }
                    }
                }
                //var cpos = this.getCaretPosition();
                //console.log('setting value ', val, cpos, val.substr(0, cpos - 1), val.substr(cpos));
                //this.domInput.value = val.substr(0, cpos - 1) + val.substr(cpos);
                this.textObj.position.x = 5;
                if (event)
                    this.emit('ezgui:change', event, this);
            };
            Input.prototype.draw = function () {
                _super.prototype.draw.call(this);
                this.guiMask = { width: 0, height: 0 };
                var settings = this._settings;
                if (settings) {
                    var padding = settings.padding || 0;
                    var myMask = new PIXI.Graphics();
                    myMask.beginFill();
                    myMask.drawRect(padding, padding, settings.width - padding * 2, settings.height - padding * 2);
                    myMask.endFill();
                    this.addChild(myMask);
                    if (this._settings.anchor) {
                        myMask.position.x = this.container.position.x + padding;
                        myMask.position.y = this.container.position.y + padding;
                    }
                    this.container.mask = myMask;
                    this.guiMask.x = padding;
                    this.guiMask.y = padding;
                    this.guiMask.width = settings.width - padding * 2;
                    this.guiMask.height = settings.height - padding * 2;
                }
                //move container back to the top
                this.addChild(this.container);
            };
            Input.prototype.drawText = function () {
                this._settings.text = this._settings.text || '';
                _super.prototype.drawText.call(this);
                this.textObj.position.x = 5;
                this.container.addChild(this.textObj);
                //this.textObj
            };
            Input.prototype.setupEvents = function () {
                _super.prototype.setupEvents.call(this);
                if (!EZGUI.Device.isMobile && document && document.createElement) {
                    this.domInput = document.createElement("input");
                    this.domInput.id = this.guiID + "_input";
                    this.domInput.style.position = 'absolute';
                    this.domInput.style.top = '-100px';
                    this.domInput.value = '';
                    document.body.appendChild(this.domInput);
                    var _this = this;
                    this.domInput.addEventListener('input', function (event) {
                        var cpos = _this.getCaretPosition();
                        var str = _this.domInput.value;
                        _this.setTextWithCaret(str.substr(0, cpos) + '|' + str.substr(cpos));
                        _this.setTextWithCaret(str, true);
                    });
                    this.domInput.addEventListener('keydown', function (event) {
                        var cpos = _this.getCaretPosition();
                        var str = _this.domInput.value;
                        _this.setTextWithCaret(str.substr(0, cpos) + '|' + str.substr(cpos));
                    });
                    this.domInput.addEventListener('keyup', function (event) {
                        var cpos = _this.getCaretPosition();
                        var str = _this.domInput.value;
                        _this.setTextWithCaret(str.substr(0, cpos) + '|' + str.substr(cpos));
                    });
                }
            };
            Input.prototype.handleEvents = function () {
                _super.prototype.handleEvents.call(this);
                var guiObj = this;
                var _this = this;
                if (EZGUI.Device.isMobile) {
                    guiObj.on('click', function (event) {
                        _this.setTextWithCaret(prompt('', _this.text), event);
                    });
                    return;
                }
                guiObj.on('focus', function () {
                    if (_this.focused)
                        return;
                    _this.focused = true;
                    if (!_this.domInput)
                        return;
                    _this.domInput.value = _this.text;
                    _this.setCaretPosition(_this.domInput.value.length);
                    var cpos = _this.getCaretPosition();
                    var str = _this.domInput.value;
                    _this.setTextWithCaret(str.substr(0, cpos) + '|' + str.substr(cpos));
                    _this.domInput.focus();
                });
                guiObj.on('blur', function () {
                    if (!_this.focused)
                        return;
                    _this.focused = false;
                    if (!_this.domInput)
                        return;
                    _this.setTextWithCaret(_this.domInput.value);
                    //_this.text = _this.text.substr(0, _this.text.length - 1);
                    _this.domInput.blur();
                });
            };
            Input.prototype.getCaretPosition = function () {
                var ctrl = this.domInput;
                if (!ctrl)
                    return 0;
                var CaretPos = 0;
                // IE Support
                if (document.selection) {
                    ctrl.focus();
                    var Sel = document.selection.createRange();
                    Sel.moveStart('character', -ctrl.value.length);
                    CaretPos = Sel.text.length;
                }
                else if (ctrl.selectionStart || ctrl.selectionStart == '0')
                    CaretPos = ctrl.selectionStart;
                return (CaretPos);
            };
            Input.prototype.setCaretPosition = function (pos) {
                var ctrl = this.domInput;
                if (!ctrl)
                    return 0;
                if (ctrl.setSelectionRange) {
                    ctrl.focus();
                    ctrl.setSelectionRange(pos, pos);
                }
                else if (ctrl.createTextRange) {
                    var range = ctrl.createTextRange();
                    range.collapse(true);
                    range.moveEnd('character', pos);
                    range.moveStart('character', pos);
                    range.select();
                }
            };
            return Input;
        })(EZGUI.GUISprite);
        Component.Input = Input;
        EZGUI.registerComponents(Input, 'Input');
    })(Component = EZGUI.Component || (EZGUI.Component = {}));
})(EZGUI || (EZGUI = {}));
/// <reference path="../guisprite.ts" />
var EZGUI;
(function (EZGUI) {
    var Component;
    (function (Component) {
        var Label = (function (_super) {
            __extends(Label, _super);
            function Label(settings, themeId) {
                _super.call(this, settings, themeId);
                this.settings = settings;
                this.themeId = themeId;
                if (settings.text)
                    this.text = settings.text;
            }
            Label.prototype.setupEvents = function () {
                //clear events
            };
            Label.prototype.handleEvents = function () {
                //clear event handlers
            };
            Label.prototype.drawText = function () {
                this._settings.text = this._settings.text || '';
                _super.prototype.drawText.call(this);
            };
            Label.prototype.draw = function () {
                var settings = this._settings;
                if (settings) {
                    this.guiID = settings.id;
                    if (this.guiID)
                        EZGUI.components[this.guiID] = this;
                    this.position.x = settings.position.x;
                    this.position.y = settings.position.y;
                    this.rootSprite = new EZGUI.Compatibility.GUIContainer();
                    this.addChild(this.rootSprite);
                }
            };
            return Label;
        })(EZGUI.GUISprite);
        Component.Label = Label;
        EZGUI.registerComponents(Label, 'Label');
    })(Component = EZGUI.Component || (EZGUI.Component = {}));
})(EZGUI || (EZGUI = {}));
/// <reference path="../guisprite.ts" />
var EZGUI;
(function (EZGUI) {
    var Component;
    (function (Component) {
        var Slider = (function (_super) {
            __extends(Slider, _super);
            function Slider(settings, themeId) {
                _super.call(this, settings, themeId);
                this.settings = settings;
                this.themeId = themeId;
            }
            Object.defineProperty(Slider.prototype, "value", {
                get: function () {
                    if (this.horizontalSlide) {
                        return this.slide.position.x / (this.width - this.slide.width);
                    }
                    else {
                        return 1 + this.slide.position.y / (this.slide.height - this.height);
                    }
                },
                set: function (val) {
                    val = Math.max(0, val);
                    val = Math.min(val, 1);
                    if (this.horizontalSlide) {
                        this.slide.position.x = val * (this.width - this.slide.width);
                    }
                    else {
                        this.slide.position.y = (val - 1) * (this.slide.height - this.height);
                    }
                },
                enumerable: true,
                configurable: true
            });
            Slider.prototype.setupEvents = function () {
                _super.prototype.setupEvents.call(this);
                var guiObj = this;
                var _this = this;
            };
            Slider.prototype.drawText = function () {
                //prevent text drawing
            };
            Slider.prototype.handleEvents = function () {
                _super.prototype.handleEvents.call(this);
                var guiObj = this;
                var _this = this;
                if (EZGUI.Compatibility.isPhaser) {
                    guiObj.on('mousemove', function () {
                    });
                    guiObj.on('mousedown', function (event, any) {
                        if (_this.canTrigger(event, _this.slide)) {
                            _this.slide.emit('ezgui:mousedown', event);
                        }
                    });
                    guiObj.on('mouseup', function () {
                        if (_this.canTrigger(event, _this.slide)) {
                            _this.slide.emit('ezgui:mouseup', event);
                        }
                    });
                    guiObj.on('mouseover', function () {
                    });
                    guiObj.on('mouseout', function () {
                    });
                }
                this.slide.on('mousemove', function () {
                    if (EZGUI.dragging == _this.slide) {
                        _this.emit('ezgui:value', _this.value);
                    }
                });
            };
            Slider.prototype.draw = function () {
                _super.prototype.draw.call(this);
                var cfg = this._settings.slide;
                cfg.component = 'Button';
                cfg.skin = 'Slide';
                cfg.position = { x: 0, y: 0 };
                cfg.draggable = true;
                //{ id: 'slide1', component: 'Button', position: { x: 0, y: 0 }, width: 30, height: this.height, draggable: true };
                var dir = this._settings.dir;
                if (this._settings.height > this._settings.width)
                    this._settings.dir = 'v';
                else
                    this._settings.dir = 'h';
                if (this._settings.dir == 'v') {
                    cfg.dragX = false;
                    this.horizontalSlide = false;
                }
                else {
                    cfg.dragY = false;
                    this.horizontalSlide = true;
                }
                this.slide = EZGUI.create(cfg, this.theme);
                this.slide.dragXInterval = [0, this.width - this.slide.width];
                this.slide.dragYInterval = [0, this.height - this.slide.height];
                this.value = 0;
                this.container.addChild(this.slide);
            };
            return Slider;
        })(EZGUI.GUISprite);
        Component.Slider = Slider;
        EZGUI.registerComponents(Slider, 'Slider');
    })(Component = EZGUI.Component || (EZGUI.Component = {}));
})(EZGUI || (EZGUI = {}));
/// <reference path="../guisprite.ts" />
var EZGUI;
(function (EZGUI) {
    var Component;
    (function (Component) {
        var Tabs = (function (_super) {
            __extends(Tabs, _super);
            function Tabs(settings, themeId) {
                _super.call(this, settings, themeId);
                this.settings = settings;
                this.themeId = themeId;
            }
            Tabs.prototype.handleEvents = function () {
                _super.prototype.handleEvents.call(this);
                var _this = this;
                if (this.tabsBar) {
                    for (var i = 0; i < _this.tabsBar.container.children.length; i++) {
                        //remove default buttons events
                        _this.tabsBar.container.children[i]._events = {};
                    }
                    this.tabsBar.bindChildren('click', function (e, tab) {
                        //console.log('clicked ', tab);
                        _this.activate(tab.userData.id);
                        for (var i = 0; i < _this.tabsBar.container.children.length; i++) {
                            _this.tabsBar.container.children[i].setState('default');
                        }
                        tab.setState('down');
                    });
                }
            };
            Tabs.prototype.draw = function () {
                //tabs should not have layout positionning
                delete this._settings.layout;
                var tabsH = this._settings.tabHeight || 50;
                this._settings['padding-top'] = tabsH;
                var tabsCfg = {
                    component: 'Window',
                    transparent: true,
                    padding: 0,
                    position: { x: 0, y: 0 },
                    width: this._settings.width,
                    height: tabsH,
                    layout: [this._settings.children.length, 1],
                    children: [
                    ]
                };
                for (var i = 0; i < this._settings.children.length; i++) {
                    var child = { text: this._settings.children[i].title || '', userData: { id: i }, component: 'Button', position: { x: 0, y: 0 }, width: ~~(this._settings.width / this._settings.children.length), height: tabsH };
                    tabsCfg.children.push(child);
                }
                this.tabsBar = EZGUI.create(tabsCfg, this.themeId);
                //this._settings.children.unshift(tabs);
                _super.prototype.draw.call(this);
                this.addChild(this.tabsBar);
            };
            Tabs.prototype.createChild = function (childSettings, order) {
                var child = _super.prototype.createChild.call(this, childSettings, order);
                if (!this.activeChild)
                    this.activeChild = child;
                if (childSettings.active) {
                    this.activeChild.visible = false;
                    this.activeChild = child;
                    this.activeChild.visible = true;
                    if (this.tabsBar)
                        this.tabsBar.container.children[order].setState('down');
                }
                else {
                    child.visible = false;
                    if (this.tabsBar)
                        this.tabsBar.container.children[order].setState('default');
                }
                return child;
            };
            Tabs.prototype.activate = function (idx) {
                if (this.container.children[idx]) {
                    this.activeChild.visible = false;
                    this.activeChild = this.container.children[idx];
                    this.activeChild.visible = true;
                    if (this.tabsBar) {
                        for (var i = 0; i < this.tabsBar.container.children.length; i++) {
                            this.tabsBar.container.children[i].setState('default');
                        }
                        this.tabsBar.container.children[idx].setState('down');
                    }
                }
            };
            return Tabs;
        })(EZGUI.GUISprite);
        Component.Tabs = Tabs;
        EZGUI.registerComponents(Tabs, 'Tabs');
    })(Component = EZGUI.Component || (EZGUI.Component = {}));
})(EZGUI || (EZGUI = {}));
var EZGUI;
(function (EZGUI) {
    var Device;
    (function (Device) {
        //Code taken from https://github.com/g13n/ua.js 
        var userAgent = (window.navigator && navigator.userAgent) || "";
        function detect(pattern) {
            return (pattern).test(userAgent);
        }
        /**
         * Return true if the browser is Chrome or compatible.
         *
         * @method isChrome
         */
        Device.isChrome = detect(/webkit\W.*(chrome|chromium)\W/i);
        /**
         * Return true if the browser is Firefox.
         *
         * @method isFirefox
         */
        Device.isFirefox = detect(/mozilla.*\Wfirefox\W/i);
        /**
         * Return true if the browser is using the Gecko engine.
         *
         * This is probably a better way to identify Firefox and other browsers
         * that use XulRunner.
         *
         * @method isGecko
         */
        Device.isGecko = detect(/mozilla(?!.*webkit).*\Wgecko\W/i);
        /**
         * Return true if the browser is Internet Explorer.
         *
         * @method isIE
         */
        Device.isIE = function () {
            if (navigator.appName === "Microsoft Internet Explorer") {
                return true;
            }
            else if (detect(/\bTrident\b/)) {
                return true;
            }
            else {
                return false;
            }
        };
        /**
         * Return true if the browser is running on Kindle.
         *
         * @method isKindle
         */
        Device.isKindle = detect(/\W(kindle|silk)\W/i);
        /**
         * Return true if the browser is running on a mobile device.
         *
         * @method isMobile
         */
        Device.isMobile = detect(/(iphone|ipod|((?:android)?.*?mobile)|blackberry|nokia)/i);
        /**
         * Return true if we are running on Opera.
         *
         * @method isOpera
         */
        Device.isOpera = detect(/opera.*\Wpresto\W|OPR/i);
        /**
         * Return true if the browser is Safari.
         *
         * @method isSafari
         */
        Device.isSafari = detect(/webkit\W(?!.*chrome).*safari\W/i);
        /**
         * Return true if the browser is running on a tablet.
         *
         * One way to distinguish Android mobiles from tablets is that the
         * mobiles contain the string "mobile" in their UserAgent string.
         * If the word "Android" isn't followed by "mobile" then its a
         * tablet.
         *
         * @method isTablet
         */
        Device.isTablet = detect(/(ipad|android(?!.*mobile)|tablet)/i);
        /**
         * Return true if the browser is running on a TV!
         *
         * @method isTV
         */
        Device.isTV = detect(/googletv|sonydtv/i);
        /**
         * Return true if the browser is running on a WebKit browser.
         *
         * @method isWebKit
         */
        Device.isWebKit = detect(/webkit\W/i);
        /**
         * Return true if the browser is running on an Android browser.
         *
         * @method isAndroid
         */
        Device.isAndroid = detect(/android/i);
        /**
         * Return true if the browser is running on any iOS device.
         *
         * @method isIOS
         */
        Device.isIOS = detect(/(ipad|iphone|ipod)/i);
        /**
         * Return true if the browser is running on an iPad.
         *
         * @method isIPad
         */
        Device.isIPad = detect(/ipad/i);
        /**
         * Return true if the browser is running on an iPhone.
         *
         * @method isIPhone
         */
        Device.isIPhone = detect(/iphone/i);
        /**
         * Return true if the browser is running on an iPod touch.
         *
         * @method isIPod
         */
        Device.isIPod = detect(/ipod/i);
        Device.isMobile = detect(/mobile/i) || Device.isAndroid || Device.isIOS;
        /**
         * Return the complete UserAgent string verbatim.
         *
         * @method whoami
         */
        Device.whoami = function () {
            return userAgent;
        };
    })(Device = EZGUI.Device || (EZGUI.Device = {}));
})(EZGUI || (EZGUI = {}));
/// <reference path="../guisprite.ts" />
var EZGUI;
(function (EZGUI) {
    var Component;
    (function (Component) {
        var Layout = (function (_super) {
            __extends(Layout, _super);
            function Layout(settings, themeId) {
                _super.call(this, settings, themeId);
                this.settings = settings;
                this.themeId = themeId;
            }
            Layout.prototype.handleEvents = function () {
                _super.prototype.handleEvents.call(this);
            };
            Layout.prototype.draw = function () {
                _super.prototype.draw.call(this);
                this.guiMask = { width: 0, height: 0 };
                var settings = this._settings;
                if (settings) {
                    var padding = settings.padding || 0;
                    if (this._settings.mask !== false) {
                        var myMask = new PIXI.Graphics();
                        myMask.beginFill();
                        myMask.drawRect(padding, padding, settings.width - padding * 2, settings.height - padding * 2);
                        myMask.endFill();
                        this.addChild(myMask);
                        if (this._settings.anchor) {
                            myMask.position.x = this.container.position.x + padding;
                            myMask.position.y = this.container.position.y + padding;
                        }
                        this.container.mask = myMask;
                    }
                    this.guiMask.x = padding;
                    this.guiMask.y = padding;
                    this.guiMask.width = settings.width - padding * 2;
                    this.guiMask.height = settings.height - padding * 2;
                }
                //move container back to the top
                this.addChild(this.container);
            };
            Layout.prototype.createChild = function (childSettings, order) {
                if (!childSettings)
                    return null;
                var i = order;
                //console.log('adding ', i);
                var padTop = this._settings['padding-top'] || this._settings.padding || 0;
                var padLeft = this._settings['padding-left'] || this._settings.padding || 0;
                var swidth = this._settings.width - padLeft;
                var sheight = this._settings.height - padTop;
                var dx = padLeft;
                var dy = padTop;
                var lx = 1;
                var ly = 1;
                if (this._settings.layout != undefined) {
                    lx = this._settings.layout[0];
                    ly = this._settings.layout[1];
                    var x, y;
                    //horizontal layout 
                    if (ly == null) {
                        x = i;
                        y = 0;
                    }
                    else if (lx == null) {
                        x = 0;
                        y = i;
                    }
                    else {
                        var adjust = Math.floor(i / (lx * ly));
                        if (this._settings.dragY === false) {
                            dx += adjust * swidth;
                            dy -= adjust * sheight;
                        }
                        else if (this._settings.dragX === false) {
                        }
                        x = i % lx;
                        y = Math.floor(i / lx);
                    }
                    ly = ly || 1;
                    lx = lx || 1;
                    dx += x * (swidth / lx);
                    dy += y * (sheight / ly);
                }
                var pos = childSettings.position;
                if (typeof pos == 'string') {
                    var parts = pos.split(' ');
                    var pos1 = parts[0];
                    var pos2 = parts[1];
                    //normalize pos
                    if (parts[0] == parts[1]) {
                        pos2 = undefined;
                    }
                    if ((parts[0] == 'top' && parts[2] == 'bottom') || (parts[0] == 'bottom' && parts[2] == 'top') || (parts[0] == 'left' && parts[2] == 'right') || (parts[0] == 'right' && parts[2] == 'left')) {
                        pos1 = 'center';
                        pos2 = 'undefined';
                    }
                    if ((parts[0] == 'left' || parts[0] == 'right') && (parts[1] == 'top' || parts[1] == 'bottom')) {
                        pos1 = parts[1];
                        pos2 = parts[0];
                    }
                    if ((pos1 == 'left' || pos1 == 'right') && pos2 === undefined) {
                        pos2 = pos1;
                        pos1 = 'left';
                    }
                    childSettings.position = { x: dx, y: dy };
                    switch (pos1) {
                        case 'center':
                            childSettings.position.y = dy + (this._settings.height / ly) / 2 - childSettings.height / 2;
                            if (pos2 === undefined)
                                childSettings.position.x = dx + (this._settings.width / lx) / 2 - childSettings.width / 2;
                            break;
                        case 'bottom':
                            childSettings.position.y = dy + (this._settings.height / ly) - childSettings.height - this._settings.padding;
                            break;
                    }
                    switch (pos2) {
                        case 'center':
                            childSettings.position.x = dx + (this._settings.width / lx) / 2 - childSettings.width / 2;
                            break;
                        case 'right':
                            childSettings.position.x = dx + (this._settings.width / lx) - childSettings.width - this._settings.padding;
                            break;
                    }
                }
                else {
                    childSettings.position.x = dx + childSettings.position.x;
                    childSettings.position.y = dy + childSettings.position.y;
                }
                //console.log(' >> ', dx.toFixed(2), dy.toFixed(2), childSettings.position.x.toFixed(2), childSettings.position.y.toFixed(2));
                var child = EZGUI.create(childSettings, this.theme);
                return child;
            };
            Layout.prototype.addChild = function (child) {
                if (child instanceof EZGUI.GUISprite) {
                    return this.addChildAt(child, this.container.children.length);
                }
                else {
                    return _super.prototype.addChild.call(this, child);
                }
            };
            Layout.prototype.addChildAt = function (child, index) {
                if (child instanceof EZGUI.GUISprite) {
                    var i = index;
                    //console.log('adding ', i);
                    var padTop = this._settings['padding-top'] || this._settings.padding || 0;
                    var padLeft = this._settings['padding-left'] || this._settings.padding || 0;
                    var swidth = this._settings.width - padLeft;
                    var sheight = this._settings.height - padTop;
                    var dx = padLeft;
                    var dy = padTop;
                    var lx = 1;
                    var ly = 1;
                    if (this._settings.layout != undefined) {
                        lx = this._settings.layout[0];
                        ly = this._settings.layout[1];
                        var x, y;
                        //horizontal layout 
                        if (ly == null) {
                            x = i;
                            y = 0;
                        }
                        else if (lx == null) {
                            x = 0;
                            y = i;
                        }
                        else {
                            var adjust = Math.floor(i / (lx * ly));
                            if (this._settings.dragY === false) {
                                dx += adjust * swidth;
                                dy -= adjust * sheight;
                            }
                            else if (this._settings.dragX === false) {
                            }
                            x = i % lx;
                            y = Math.floor(i / lx);
                        }
                        ly = ly || 1;
                        lx = lx || 1;
                        dx += x * (swidth / lx);
                        dy += y * (sheight / ly);
                    }
                    var childSettings = child._settings;
                    var pos = childSettings.position;
                    if (typeof pos == 'string') {
                        var parts = pos.split(' ');
                        var pos1 = parts[0];
                        var pos2 = parts[1];
                        //normalize pos
                        if (parts[0] == parts[1]) {
                            pos2 = undefined;
                        }
                        if ((parts[0] == 'top' && parts[2] == 'bottom') || (parts[0] == 'bottom' && parts[2] == 'top') || (parts[0] == 'left' && parts[2] == 'right') || (parts[0] == 'right' && parts[2] == 'left')) {
                            pos1 = 'center';
                            pos2 = 'undefined';
                        }
                        if ((parts[0] == 'left' || parts[0] == 'right') && (parts[1] == 'top' || parts[1] == 'bottom')) {
                            pos1 = parts[1];
                            pos2 = parts[0];
                        }
                        if ((pos1 == 'left' || pos1 == 'right') && pos2 === undefined) {
                            pos2 = pos1;
                            pos1 = 'left';
                        }
                        childSettings.position = { x: dx, y: dy };
                        switch (pos1) {
                            case 'center':
                                childSettings.position.y = dy + (this._settings.height / ly) / 2 - childSettings.height / 2;
                                if (pos2 === undefined)
                                    childSettings.position.x = dx + (this._settings.width / lx) / 2 - childSettings.width / 2;
                                break;
                            case 'bottom':
                                childSettings.position.y = dy + (this._settings.height / ly) - childSettings.height - this._settings.padding;
                                break;
                        }
                        switch (pos2) {
                            case 'center':
                                childSettings.position.x = dx + (this._settings.width / lx) / 2 - childSettings.width / 2;
                                break;
                            case 'right':
                                childSettings.position.x = dx + (this._settings.width / lx) - childSettings.width - this._settings.padding;
                                break;
                        }
                    }
                    else {
                        childSettings.position.x = dx + childSettings.position.x;
                        childSettings.position.y = dy + childSettings.position.y;
                    }
                    child.position.x = childSettings.position.x;
                    child.position.y = childSettings.position.y;
                    child.guiParent = this;
                    if (child.phaserGroup)
                        return this.container.addChild(child.phaserGroup);
                    else
                        return this.container.addChild(child);
                }
                else {
                    //return Compatibility.GUIDisplayObjectContainer.prototype.addChild.call(this, child, index);
                    return _super.prototype.addChildAt.call(this, child, index);
                }
            };
            return Layout;
        })(EZGUI.GUISprite);
        Component.Layout = Layout;
        EZGUI.registerComponents(Layout, 'Layout');
    })(Component = EZGUI.Component || (EZGUI.Component = {}));
})(EZGUI || (EZGUI = {}));
/// <reference path="layout.ts" />
var EZGUI;
(function (EZGUI) {
    var Component;
    (function (Component) {
        var Window = (function (_super) {
            __extends(Window, _super);
            function Window(settings, themeId) {
                _super.call(this, settings, themeId);
                this.settings = settings;
                this.themeId = themeId;
            }
            Window.prototype.draw = function () {
                var headerCfg = this._settings.header;
                if (headerCfg) {
                    headerCfg.height = headerCfg.height || 0;
                    headerCfg.skin = headerCfg.skin || 'Header';
                    this._settings['padding-top'] = headerCfg.height;
                }
                _super.prototype.draw.call(this);
                if (headerCfg) {
                    //this.position.y += headerCfg.height;
                    if (headerCfg.width == undefined)
                        headerCfg.width = this._settings.width;
                    this.titleBar = new EZGUI.GUISprite(headerCfg, this.theme);
                    //this.titleBar.position.y -= headerCfg.height - this.settings.padding*2;
                    this.originalAddChild(this.titleBar);
                }
            };
            Window.prototype.handleEvents = function () {
                _super.prototype.handleEvents.call(this);
                if (this._settings.draggable) {
                    //if (this.titleBar) this.draghandle = this.titleBar;
                    //else this.draghandle = this;
                    //this.draggable = this;
                    this.setDraggable(true);
                }
            };
            Window.prototype.setDraggable = function (val) {
                if (val === void 0) { val = true; }
                if (val) {
                    this.draggable = this;
                    if (this.titleBar)
                        this.draghandle = this.titleBar;
                    else
                        this.draghandle = this;
                }
                else {
                    this.draggable = undefined;
                    this.draghandle = undefined;
                }
            };
            return Window;
        })(Component.Layout);
        Component.Window = Window;
        EZGUI.registerComponents(Window, 'Window');
    })(Component = EZGUI.Component || (EZGUI.Component = {}));
})(EZGUI || (EZGUI = {}));
/// <reference path="../components/window.ts" />
var EZGUI;
(function (EZGUI) {
    var Kit;
    (function (Kit) {
        var MainScreen = (function (_super) {
            __extends(MainScreen, _super);
            function MainScreen(settings, themeId) {
                _super.call(this, settings, themeId);
                this.settings = settings;
                this.themeId = themeId;
                //this.parseSettings();
            }
            MainScreen.prototype.parseSettings = function () {
                var txCache = EZGUI.Compatibility.PIXIVersion >= 3 ? PIXI.utils.TextureCache : PIXI.TextureCache;
                //parse logo
                if (this._settings.logo) {
                    if (typeof this._settings.logo == 'string') {
                        if (txCache[this._settings.logo]) {
                            var tx = txCache[this._settings.logo];
                            var px = (this._settings.width - tx.width) / 2;
                            this._settings.header = { position: { x: px, y: 0 }, image: this._settings.logo, height: tx.height, width: tx.width };
                        }
                    }
                    else {
                        this._settings.header = this._settings.logo;
                    }
                }
                //parse buttons
                if (this._settings.buttons && this._settings.buttons.length > 0) {
                    this.buttonsEvents = {};
                    var children = [];
                    var maxHeight = 1;
                    for (var i = 0; i < this._settings.buttons.length; i++) {
                        var btn = this._settings.buttons[i];
                        if (btn) {
                            btn.component = 'Button';
                            btn.id = this._settings.id + '-btn-' + i;
                            btn.position = btn.position || 'center';
                            if (maxHeight < btn.height)
                                maxHeight = btn.height;
                            if (btn.event) {
                                this.buttonsEvents[btn.id] = btn.event;
                            }
                        }
                        children.push(btn);
                    }
                    var yParts = Math.floor((this._settings.height - this._settings.header.height) / (maxHeight * 1.1));
                    this._settings.layout = [1, yParts];
                    this._settings.children = children;
                }
                this._settings = this.theme.applySkin(this._settings);
            };
            MainScreen.prototype.handleEvents = function () {
                _super.prototype.handleEvents.call(this);
                var _this = this;
                this.bindChildren('click', function (event, btn) {
                    if (_this.buttonsEvents && _this.buttonsEvents[btn.Id]) {
                        _this.emit('ezgui:' + _this.buttonsEvents[btn.Id], event, btn);
                    }
                });
            };
            return MainScreen;
        })(EZGUI.Component.Window);
        Kit.MainScreen = MainScreen;
        EZGUI.registerComponents(MainScreen, 'MainScreen');
    })(Kit = EZGUI.Kit || (EZGUI.Kit = {}));
})(EZGUI || (EZGUI = {}));
// (c) Dean McNamee <dean@gmail.com>, 2012.
//
// https://github.com/deanm/css-color-parser-js
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to
// deal in the Software without restriction, including without limitation the
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
// sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
// FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
// IN THE SOFTWARE.
// http://www.w3.org/TR/css3-color/
var EZGUI;
(function (EZGUI) {
    var utils;
    (function (utils) {
        var ColorParser;
        (function (ColorParser) {
            var kCSSColorTable = {
                "transparent": [0, 0, 0, 0],
                "aliceblue": [240, 248, 255, 1],
                "antiquewhite": [250, 235, 215, 1],
                "aqua": [0, 255, 255, 1],
                "aquamarine": [127, 255, 212, 1],
                "azure": [240, 255, 255, 1],
                "beige": [245, 245, 220, 1],
                "bisque": [255, 228, 196, 1],
                "black": [0, 0, 0, 1],
                "blanchedalmond": [255, 235, 205, 1],
                "blue": [0, 0, 255, 1],
                "blueviolet": [138, 43, 226, 1],
                "brown": [165, 42, 42, 1],
                "burlywood": [222, 184, 135, 1],
                "cadetblue": [95, 158, 160, 1],
                "chartreuse": [127, 255, 0, 1],
                "chocolate": [210, 105, 30, 1],
                "coral": [255, 127, 80, 1],
                "cornflowerblue": [100, 149, 237, 1],
                "cornsilk": [255, 248, 220, 1],
                "crimson": [220, 20, 60, 1],
                "cyan": [0, 255, 255, 1],
                "darkblue": [0, 0, 139, 1],
                "darkcyan": [0, 139, 139, 1],
                "darkgoldenrod": [184, 134, 11, 1],
                "darkgray": [169, 169, 169, 1],
                "darkgreen": [0, 100, 0, 1],
                "darkgrey": [169, 169, 169, 1],
                "darkkhaki": [189, 183, 107, 1],
                "darkmagenta": [139, 0, 139, 1],
                "darkolivegreen": [85, 107, 47, 1],
                "darkorange": [255, 140, 0, 1],
                "darkorchid": [153, 50, 204, 1],
                "darkred": [139, 0, 0, 1],
                "darksalmon": [233, 150, 122, 1],
                "darkseagreen": [143, 188, 143, 1],
                "darkslateblue": [72, 61, 139, 1],
                "darkslategray": [47, 79, 79, 1],
                "darkslategrey": [47, 79, 79, 1],
                "darkturquoise": [0, 206, 209, 1],
                "darkviolet": [148, 0, 211, 1],
                "deeppink": [255, 20, 147, 1],
                "deepskyblue": [0, 191, 255, 1],
                "dimgray": [105, 105, 105, 1],
                "dimgrey": [105, 105, 105, 1],
                "dodgerblue": [30, 144, 255, 1],
                "firebrick": [178, 34, 34, 1],
                "floralwhite": [255, 250, 240, 1],
                "forestgreen": [34, 139, 34, 1],
                "fuchsia": [255, 0, 255, 1],
                "gainsboro": [220, 220, 220, 1],
                "ghostwhite": [248, 248, 255, 1],
                "gold": [255, 215, 0, 1],
                "goldenrod": [218, 165, 32, 1],
                "gray": [128, 128, 128, 1],
                "green": [0, 128, 0, 1],
                "greenyellow": [173, 255, 47, 1],
                "grey": [128, 128, 128, 1],
                "honeydew": [240, 255, 240, 1],
                "hotpink": [255, 105, 180, 1],
                "indianred": [205, 92, 92, 1],
                "indigo": [75, 0, 130, 1],
                "ivory": [255, 255, 240, 1],
                "khaki": [240, 230, 140, 1],
                "lavender": [230, 230, 250, 1],
                "lavenderblush": [255, 240, 245, 1],
                "lawngreen": [124, 252, 0, 1],
                "lemonchiffon": [255, 250, 205, 1],
                "lightblue": [173, 216, 230, 1],
                "lightcoral": [240, 128, 128, 1],
                "lightcyan": [224, 255, 255, 1],
                "lightgoldenrodyellow": [250, 250, 210, 1],
                "lightgray": [211, 211, 211, 1],
                "lightgreen": [144, 238, 144, 1],
                "lightgrey": [211, 211, 211, 1],
                "lightpink": [255, 182, 193, 1],
                "lightsalmon": [255, 160, 122, 1],
                "lightseagreen": [32, 178, 170, 1],
                "lightskyblue": [135, 206, 250, 1],
                "lightslategray": [119, 136, 153, 1],
                "lightslategrey": [119, 136, 153, 1],
                "lightsteelblue": [176, 196, 222, 1],
                "lightyellow": [255, 255, 224, 1],
                "lime": [0, 255, 0, 1],
                "limegreen": [50, 205, 50, 1],
                "linen": [250, 240, 230, 1],
                "magenta": [255, 0, 255, 1],
                "maroon": [128, 0, 0, 1],
                "mediumaquamarine": [102, 205, 170, 1],
                "mediumblue": [0, 0, 205, 1],
                "mediumorchid": [186, 85, 211, 1],
                "mediumpurple": [147, 112, 219, 1],
                "mediumseagreen": [60, 179, 113, 1],
                "mediumslateblue": [123, 104, 238, 1],
                "mediumspringgreen": [0, 250, 154, 1],
                "mediumturquoise": [72, 209, 204, 1],
                "mediumvioletred": [199, 21, 133, 1],
                "midnightblue": [25, 25, 112, 1],
                "mintcream": [245, 255, 250, 1],
                "mistyrose": [255, 228, 225, 1],
                "moccasin": [255, 228, 181, 1],
                "navajowhite": [255, 222, 173, 1],
                "navy": [0, 0, 128, 1],
                "oldlace": [253, 245, 230, 1],
                "olive": [128, 128, 0, 1],
                "olivedrab": [107, 142, 35, 1],
                "orange": [255, 165, 0, 1],
                "orangered": [255, 69, 0, 1],
                "orchid": [218, 112, 214, 1],
                "palegoldenrod": [238, 232, 170, 1],
                "palegreen": [152, 251, 152, 1],
                "paleturquoise": [175, 238, 238, 1],
                "palevioletred": [219, 112, 147, 1],
                "papayawhip": [255, 239, 213, 1],
                "peachpuff": [255, 218, 185, 1],
                "peru": [205, 133, 63, 1],
                "pink": [255, 192, 203, 1],
                "plum": [221, 160, 221, 1],
                "powderblue": [176, 224, 230, 1],
                "purple": [128, 0, 128, 1],
                "red": [255, 0, 0, 1],
                "rosybrown": [188, 143, 143, 1],
                "royalblue": [65, 105, 225, 1],
                "saddlebrown": [139, 69, 19, 1],
                "salmon": [250, 128, 114, 1],
                "sandybrown": [244, 164, 96, 1],
                "seagreen": [46, 139, 87, 1],
                "seashell": [255, 245, 238, 1],
                "sienna": [160, 82, 45, 1],
                "silver": [192, 192, 192, 1],
                "skyblue": [135, 206, 235, 1],
                "slateblue": [106, 90, 205, 1],
                "slategray": [112, 128, 144, 1],
                "slategrey": [112, 128, 144, 1],
                "snow": [255, 250, 250, 1],
                "springgreen": [0, 255, 127, 1],
                "steelblue": [70, 130, 180, 1],
                "tan": [210, 180, 140, 1],
                "teal": [0, 128, 128, 1],
                "thistle": [216, 191, 216, 1],
                "tomato": [255, 99, 71, 1],
                "turquoise": [64, 224, 208, 1],
                "violet": [238, 130, 238, 1],
                "wheat": [245, 222, 179, 1],
                "white": [255, 255, 255, 1],
                "whitesmoke": [245, 245, 245, 1],
                "yellow": [255, 255, 0, 1],
                "yellowgreen": [154, 205, 50, 1]
            };
            function clamp_css_byte(i) {
                i = Math.round(i); // Seems to be what Chrome does (vs truncation).
                return i < 0 ? 0 : i > 255 ? 255 : i;
            }
            function clamp_css_float(f) {
                return f < 0 ? 0 : f > 1 ? 1 : f;
            }
            function parse_css_int(str) {
                if (str[str.length - 1] === '%')
                    return clamp_css_byte(parseFloat(str) / 100 * 255);
                return clamp_css_byte(parseInt(str));
            }
            function parse_css_float(str) {
                if (str[str.length - 1] === '%')
                    return clamp_css_float(parseFloat(str) / 100);
                return clamp_css_float(parseFloat(str));
            }
            function css_hue_to_rgb(m1, m2, h) {
                if (h < 0)
                    h += 1;
                else if (h > 1)
                    h -= 1;
                if (h * 6 < 1)
                    return m1 + (m2 - m1) * h * 6;
                if (h * 2 < 1)
                    return m2;
                if (h * 3 < 2)
                    return m1 + (m2 - m1) * (2 / 3 - h) * 6;
                return m1;
            }
            function parseToPixiColor(str) {
                var rgb = parseToRGB(str);
                if (!rgb)
                    return -1;
                var intRGB = rgb[0];
                intRGB = (intRGB << 8) + rgb[1];
                intRGB = (intRGB << 8) + rgb[2];
                return intRGB;
            }
            ColorParser.parseToPixiColor = parseToPixiColor;
            function parseToRGB(str) {
                // Remove all whitespace, not compliant, but should just be more accepting.
                var str = str.replace(/ /g, '').toLowerCase();
                // Color keywords (and transparent) lookup.
                if (str in kCSSColorTable)
                    return kCSSColorTable[str].slice(); // dup.
                // #abc and #abc123 syntax.
                if (str[0] === '#') {
                    if (str.length === 4) {
                        var iv = parseInt(str.substr(1), 16); // TODO(deanm): Stricter parsing.
                        if (!(iv >= 0 && iv <= 0xfff))
                            return null; // Covers NaN.
                        return [((iv & 0xf00) >> 4) | ((iv & 0xf00) >> 8), (iv & 0xf0) | ((iv & 0xf0) >> 4), (iv & 0xf) | ((iv & 0xf) << 4), 1];
                    }
                    else if (str.length === 7) {
                        var iv = parseInt(str.substr(1), 16); // TODO(deanm): Stricter parsing.
                        if (!(iv >= 0 && iv <= 0xffffff))
                            return null; // Covers NaN.
                        return [(iv & 0xff0000) >> 16, (iv & 0xff00) >> 8, iv & 0xff, 1];
                    }
                    return null;
                }
                var op = str.indexOf('('), ep = str.indexOf(')');
                if (op !== -1 && ep + 1 === str.length) {
                    var fname = str.substr(0, op);
                    var params = str.substr(op + 1, ep - (op + 1)).split(',');
                    var alpha = 1; // To allow case fallthrough.
                    switch (fname) {
                        case 'rgba':
                            if (params.length !== 4)
                                return null;
                            alpha = parse_css_float(params.pop());
                        case 'rgb':
                            if (params.length !== 3)
                                return null;
                            return [parse_css_int(params[0]), parse_css_int(params[1]), parse_css_int(params[2]), alpha];
                        case 'hsla':
                            if (params.length !== 4)
                                return null;
                            alpha = parse_css_float(params.pop());
                        case 'hsl':
                            if (params.length !== 3)
                                return null;
                            var h = (((parseFloat(params[0]) % 360) + 360) % 360) / 360; // 0 .. 1
                            // NOTE(deanm): According to the CSS spec s/l should only be
                            // percentages, but we don't bother and let float or percentage.
                            var s = parse_css_float(params[1]);
                            var l = parse_css_float(params[2]);
                            var m2 = l <= 0.5 ? l * (s + 1) : l + s - l * s;
                            var m1 = l * 2 - m2;
                            return [clamp_css_byte(css_hue_to_rgb(m1, m2, h + 1 / 3) * 255), clamp_css_byte(css_hue_to_rgb(m1, m2, h) * 255), clamp_css_byte(css_hue_to_rgb(m1, m2, h - 1 / 3) * 255), alpha];
                        default:
                            return null;
                    }
                }
                return null;
            }
            ColorParser.parseToRGB = parseToRGB;
        })(ColorParser = utils.ColorParser || (utils.ColorParser = {}));
    })(utils = EZGUI.utils || (EZGUI.utils = {}));
})(EZGUI || (EZGUI = {}));
/// <reference path="../guisprite.ts" />
var EZGUI;
(function (EZGUI) {
    var Component;
    (function (Component) {
        var Button = (function (_super) {
            __extends(Button, _super);
            function Button(settings, themeId) {
                _super.call(this, settings, themeId);
                this.settings = settings;
                this.themeId = themeId;
                if (settings.text)
                    this.text = settings.text;
            }
            Button.prototype.handleEvents = function () {
                _super.prototype.handleEvents.call(this);
                var guiObj = this;
                var _this = this;
                var isDown = false;
                //guiObj.on('mousemove', function () {
                //});
                guiObj.on('mousedown', function () {
                    isDown = true;
                    //console.log('down', _this.guiID);
                    guiObj.setState('down');
                });
                guiObj.on('mouseup', function () {
                    isDown = false;
                    //console.log('up', _this.guiID);
                    guiObj.setState('default');
                });
                guiObj.on('mouseover', function () {
                    //console.log('hover', _this.guiID);
                    if (!isDown)
                        guiObj.setState('hover');
                });
                guiObj.on('mouseout', function () {
                    //console.log('out', _this.guiID);
                    //EZGUI.dragging = null;
                    //temporary workaround for phaser
                    if (!EZGUI.Compatibility.isPhaser) {
                        isDown = false;
                        guiObj.setState('default');
                    }
                });
            };
            return Button;
        })(EZGUI.GUISprite);
        Component.Button = Button;
        EZGUI.registerComponents(Button, 'Button');
    })(Component = EZGUI.Component || (EZGUI.Component = {}));
})(EZGUI || (EZGUI = {}));
/// <reference path="../guisprite.ts" />
var EZGUI;
(function (EZGUI) {
    var Component;
    (function (Component) {
        var Checkbox = (function (_super) {
            __extends(Checkbox, _super);
            function Checkbox(settings, themeId) {
                _super.call(this, settings, themeId);
                this.settings = settings;
                this.themeId = themeId;
            }
            Object.defineProperty(Checkbox.prototype, "checked", {
                //Getter & setter for check state
                get: function () {
                    return this._checked;
                },
                set: function (chk) {
                    if (chk) {
                        this.setState('checked');
                        if (this._checkmark)
                            this._checkmark.visible = true;
                    }
                    else {
                        this.setState('default');
                        if (this._checkmark)
                            this._checkmark.visible = false;
                    }
                    this._checked = chk;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Checkbox.prototype, "text", {
                //Getter & setter for text vakue which need to be placed on the right
                get: function () {
                    if (this.textObj)
                        return this.textObj.text;
                },
                set: function (val) {
                    if (this.textObj) {
                        this.textObj.text = val;
                        if (this._settings.anchor) {
                            this.textObj.position.x = 0;
                            this.textObj.position.y = 0;
                            this.textObj.anchor.x = this._settings.anchor.x;
                            this.textObj.anchor.y = this._settings.anchor.y;
                        }
                        else {
                            this.textObj.position.x = this._settings.width;
                            this.textObj.position.y = (this._settings.height) / 2 - this.textObj.height / 2.5;
                            this.textObj.anchor.x = 0;
                            this.textObj.anchor.y = 0;
                        }
                    }
                },
                enumerable: true,
                configurable: true
            });
            Checkbox.prototype.handleEvents = function () {
                _super.prototype.handleEvents.call(this);
                var guiObj = this;
                var _this = this;
                var _this = this;
                var guiObj = this;
                guiObj.on('mouseover', function (event) {
                    //guiObj.alpha = 0.7;
                });
                //clear parent event
                guiObj.off('mouseout');
                guiObj.on('mouseout', function () {
                    //prevent state clear
                    //if (_this.checked) {
                    //    _this.setState('checked');
                    //}
                    //guiObj.alpha = 1;
                });
                guiObj.on('click', function () {
                    _this.checked = !_this.checked;
                });
            };
            Checkbox.prototype.draw = function () {
                _super.prototype.draw.call(this);
                this._checkmark = this.createThemeImage(this._settings, 'default', 'checkmark');
                if (this._checkmark != null) {
                    this.addChild(this._checkmark);
                    this._checkmark.visible = false;
                    this._checkmark.width = this._settings.width;
                    this._checkmark.height = this._settings.height;
                    if (this._settings.anchor) {
                        this._checkmark.anchor.x = this._settings.anchor.x;
                        this._checkmark.anchor.y = this._settings.anchor.y;
                    }
                }
            };
            Checkbox.prototype.drawText = function () {
                _super.prototype.drawText.call(this);
                if (this.textObj) {
                    this.textObj.position.x = this._settings.width;
                    this.textObj.position.y = (this._settings.height) / 2 - this.textObj.height / 2.5;
                }
            };
            return Checkbox;
        })(Component.Button);
        Component.Checkbox = Checkbox;
        EZGUI.registerComponents(Checkbox, 'Checkbox');
    })(Component = EZGUI.Component || (EZGUI.Component = {}));
})(EZGUI || (EZGUI = {}));
/// <reference path="checkbox.ts" />
var EZGUI;
(function (EZGUI) {
    var Component;
    (function (Component) {
        var Radio = (function (_super) {
            __extends(Radio, _super);
            function Radio(settings, themeId) {
                _super.call(this, settings, themeId);
                this.settings = settings;
                this.themeId = themeId;
                this.group = null;
                this.group = settings.group;
                if (!EZGUI.radioGroups[this.group])
                    EZGUI.radioGroups[this.group] = [];
                EZGUI.radioGroups[this.group].push(this);
                if (this._settings.checked === true)
                    this.checked = true;
            }
            Object.defineProperty(Radio, "groups", {
                //static groups: any = {};
                //static selectedFrom: any = {};
                get: function () {
                    return EZGUI.radioGroups;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Radio.prototype, "checked", {
                get: function () {
                    return this._checked;
                },
                set: function (chk) {
                    if (chk) {
                        this.clearGroup();
                        this.setState('checked');
                        if (this._checkmark)
                            this._checkmark.visible = true;
                    }
                    else {
                        this.setState('default');
                        if (this._checkmark)
                            this._checkmark.visible = false;
                    }
                    this._checked = chk;
                    EZGUI.radioGroups[this.group].selected = this;
                },
                enumerable: true,
                configurable: true
            });
            Radio.prototype.clearGroup = function () {
                if (!EZGUI.radioGroups[this.group])
                    return;
                for (var i = 0; i < EZGUI.radioGroups[this.group].length; i++) {
                    EZGUI.radioGroups[this.group][i].checked = false;
                }
            };
            Radio.prototype.handleEvents = function () {
                _super.prototype.handleEvents.call(this);
                var _this = this;
                //clear default action
                _this.off('click');
                _this.on('click', function (event) {
                    _this.checked = true;
                    _this.emit('ezgui:checked', event, _this);
                });
            };
            Radio.prototype.draw = function () {
                _super.prototype.draw.call(this);
            };
            return Radio;
        })(Component.Checkbox);
        Component.Radio = Radio;
        EZGUI.registerComponents(Radio, 'Radio');
    })(Component = EZGUI.Component || (EZGUI.Component = {}));
})(EZGUI || (EZGUI = {}));
var EZGUI;
(function (EZGUI) {
    var Component;
    (function (Component) {
        var List = (function (_super) {
            __extends(List, _super);
            function List(settings, themeId) {
                _super.call(this, settings, themeId);
                this.settings = settings;
                this.themeId = themeId;
                //this.draghandle = this.uichildren['sbtn1'];
            }
            List.prototype.handleEvents = function () {
                var _this = this;
                var ssize;
                this.draggable = this.container;
                if (_this._settings.dragY === false || (this._settings.layout && this._settings.layout[1] == null)) {
                    this.dragConstraint = 'x';
                    this.horizontalSlide = true;
                    this.slotSize = (this._settings.width / this._settings.layout[0]);
                }
                if (_this._settings.dragX === false || (this._settings.layout && this._settings.layout[0] == null)) {
                    this.dragConstraint = 'y';
                    this.horizontalSlide = false;
                    this.slotSize = (this._settings.height / this._settings.layout[1]);
                }
                if (this._settings.layout && this._settings.layout[0] != null && this._settings.layout[1] != null) {
                    if (_this._settings.dragY === false) {
                        this.slotSize = this.slotSize / this._settings.layout[1];
                    }
                    if (_this._settings.dragX === false) {
                        this.slotSize = this.slotSize / this._settings.layout[0];
                    }
                }
                //console.log(' >>>> ', this.draggable.width, this._settings.width);
                ssize = this.slotSize * this.container.children.length;
                this.dragXInterval[0] = -ssize + this._settings.width * 0.5;
                this.dragXInterval[1] = this._settings.width * 0.2;
                this.dragYInterval[0] = -ssize + this._settings.height * 0.5;
                this.dragYInterval[1] = this._settings.height * 0.2;
                _super.prototype.handleEvents.call(this);
                _this.on('mousedown', function (event) {
                    if (_this.decelerationItv) {
                        clearInterval(_this.decelerationItv);
                        _this.decelerationItv = null;
                    }
                    for (var i = 0; i < _this.container.children.length; i++) {
                        var child = _this.container.children[i];
                        if (!(child instanceof EZGUI.GUISprite))
                            continue;
                        if (!child.mouseInObj(event, child))
                            continue;
                        if (!child.canTrigger(event, child))
                            continue;
                        child.emit('ezgui:mousedown', event);
                    }
                });
                _this.on('mouseup', function (event) {
                    if (_this.decelerationItv)
                        return;
                    var endPos = EZGUI.utils.getRealPos(event);
                    //console.log('slide end ', EZGUI.startDrag.x, EZGUI.startDrag.x, endPos);
                    _this.decelerateScroll(endPos);
                });
            };
            List.prototype.decelerateScroll = function (endPos) {
                var _this = this;
                var sign = 0;
                if (_this.dragConstraint != 'y') {
                    sign = Math.sign(endPos.x - EZGUI.startDrag.x);
                }
                if (_this.dragConstraint != 'x') {
                    sign = Math.sign(endPos.y - EZGUI.startDrag.y);
                }
                var x1 = EZGUI.startDrag.x;
                var y1 = EZGUI.startDrag.y;
                var x2 = endPos.x;
                var y2 = endPos.y;
                var distance = Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
                var time = Date.now() - EZGUI.startDrag.t;
                var speed = distance / time;
                var timeConstant = 10;
                var amplitude = sign * speed * 150;
                var step = 0;
                var initialPosX = _this.draggable.position.x;
                var initialPosY = _this.draggable.position.y;
                var posX = 0;
                var posY = 0;
                if (_this.decelerationItv)
                    clearInterval(_this.decelerationItv);
                _this.decelerationItv = setInterval(function () {
                    //console.log('.');
                    var delta = amplitude / timeConstant;
                    if (_this.dragConstraint != 'y') {
                        posX += delta;
                        var nextPos = initialPosX + posX;
                        if (nextPos >= _this.dragXInterval[0] && nextPos <= _this.dragXInterval[1])
                            _this.draggable.position.x = nextPos;
                        else
                            clearInterval(_this.decelerationItv);
                    }
                    if (_this.dragConstraint != 'x') {
                        posY += delta;
                        var nextPos = initialPosY + posY;
                        if (nextPos >= _this.dragYInterval[0] && nextPos <= _this.dragYInterval[1])
                            _this.draggable.position.y = nextPos;
                        else
                            clearInterval(_this.decelerationItv);
                    }
                    amplitude -= delta;
                    step += 1;
                    if (step > 6 * timeConstant) {
                        clearInterval(_this.decelerationItv);
                        _this.decelerationItv = null;
                    }
                }, 16);
            };
            List.prototype.addChildAt = function (child, index) {
                var result = _super.prototype.addChildAt.call(this, child, index);
                if (result instanceof EZGUI.GUISprite) {
                    var ssize = this.slotSize * this.container.children.length;
                    this.dragXInterval[0] = -ssize + this._settings.width * 0.5;
                    this.dragXInterval[1] = this._settings.width * 0.2;
                    this.dragYInterval[0] = -ssize + this._settings.height * 0.9;
                    this.dragYInterval[1] = this._settings.height * 0.1;
                }
                return result;
            };
            List.prototype.removeChild = function (child) {
                var result = _super.prototype.removeChild.call(this, child);
                if (child instanceof EZGUI.GUISprite) {
                    var ssize = this.slotSize * this.container.children.length;
                    this.dragXInterval[0] = -ssize + this._settings.width * 0.5;
                    this.dragXInterval[1] = this._settings.width * 0.2;
                    this.dragYInterval[0] = -ssize + this._settings.height * 0.9;
                    this.dragYInterval[1] = this._settings.height * 0.1;
                    this.draggable.position.x = 0;
                    this.draggable.position.y = 0;
                }
                return result;
            };
            List.prototype.slideBy = function (value, delay) {
                delay = delay || Math.abs(value) * 5;
                var _this = this;
                if (_this.dragConstraint != 'y') {
                    var nextPos = _this.draggable.position.x + value;
                    nextPos = Math.max(nextPos, _this.dragXInterval[0]);
                    nextPos = Math.min(nextPos, _this.dragXInterval[1]);
                    if (_this.tween)
                        _this.tween.stop();
                    _this.tween = new EZGUI.Tween(_this.container.position).to({ x: nextPos }, delay).easing(EZGUI.Easing.Cubic.Out);
                    _this.tween.start();
                }
                if (_this.dragConstraint != 'x') {
                    var nextPos = _this.draggable.position.y + value;
                    nextPos = Math.max(nextPos, _this.dragYInterval[0]);
                    nextPos = Math.min(nextPos, _this.dragYInterval[1]);
                    if (_this.tween)
                        _this.tween.stop();
                    _this.tween = new EZGUI.Tween(_this.container.position).to({ y: nextPos }, delay).easing(EZGUI.Easing.Cubic.Out);
                    _this.tween.start();
                }
            };
            List.prototype.slideTo = function (value, delay) {
                var _this = this;
                if (_this.dragConstraint != 'y') {
                    var nextPos = value;
                    delay = delay || Math.abs(value - _this.draggable.position.x) * 5;
                    nextPos = Math.max(nextPos, _this.dragXInterval[0]);
                    nextPos = Math.min(nextPos, _this.dragXInterval[1]);
                    if (_this.tween)
                        _this.tween.stop();
                    _this.tween = new EZGUI.Tween(_this.container.position).to({ x: nextPos }, delay).easing(EZGUI.Easing.Cubic.Out);
                    _this.tween.start();
                }
                if (_this.dragConstraint != 'x') {
                    var nextPos = value;
                    delay = delay || Math.abs(value - _this.draggable.position.y) * 5;
                    nextPos = Math.max(nextPos, _this.dragYInterval[0]);
                    nextPos = Math.min(nextPos, _this.dragYInterval[1]);
                    if (_this.tween)
                        _this.tween.stop();
                    _this.tween = new EZGUI.Tween(_this.container.position).to({ y: nextPos }, delay).easing(EZGUI.Easing.Cubic.Out);
                    _this.tween.start();
                }
            };
            return List;
        })(Component.Layout);
        Component.List = List;
        EZGUI.registerComponents(List, 'List');
    })(Component = EZGUI.Component || (EZGUI.Component = {}));
})(EZGUI || (EZGUI = {}));
var EZGUI;
(function (EZGUI) {
    var MultistateTilingSprite = (function (_super) {
        __extends(MultistateTilingSprite, _super);
        function MultistateTilingSprite(texture, width, height, states) {
            _super.call(this, texture, width, height);
            this.stateTextures = {};
            this.currentState = 'default';
            this.stateTextures['default'] = texture;
            var _this = this;
            if (states) {
                for (var s in states) {
                    var tx = states[s];
                    if (tx instanceof PIXI.Texture && !this.stateTextures[s]) {
                        //var mtx:any = new MultistateTilingSprite(tx, width, height);
                        this.stateTextures[s] = tx;
                    }
                }
            }
        }
        MultistateTilingSprite.prototype.setState = function (state) {
            if (state === void 0) { state = 'default'; }
            var sprite = this;
            if (!sprite.stateTextures[state] || state == this.currentState)
                return;
            if (sprite.texture == sprite.stateTextures[state])
                return;
            if (sprite.texture) {
                sprite.texture = sprite.stateTextures[state];
            }
            else {
                if (sprite._texture)
                    sprite._texture = sprite.stateTextures[state];
            }
            if (sprite.tilingTexture)
                sprite.tilingTexture = sprite.stateTextures[state];
            if (sprite._tilingTexture)
                sprite._tilingTexture = sprite.stateTextures[state];
            if (EZGUI.Compatibility.PIXIVersion == 2) {
            }
        };
        return MultistateTilingSprite;
    })(EZGUI.Compatibility.TilingSprite);
    EZGUI.MultistateTilingSprite = MultistateTilingSprite;
})(EZGUI || (EZGUI = {}));
(function (root) {
    if ('performance' in root === false) {
        root.performance = {};
    }
    // IE 8
    Date.now = (Date.now || function () {
        return new Date().getTime();
    });
    if ('now' in root.performance === false) {
        var offset = root.performance.timing && root.performance.timing.navigationStart ? performance.timing.navigationStart : Date.now();
        root.performance.now = function () {
            return Date.now() - offset;
        };
    }
})(this);
var EZGUI;
(function (EZGUI) {
    var utils;
    (function (utils) {
        /**
         * check if the the point defined by x and y outside a visible gui element
         *
         */
        function isMasked(x, y, obj) {
            var parent = obj.parent;
            if (parent == null)
                return false;
            if (!parent.worldTransform || !parent.guiMask)
                return isMasked(x, y, parent);
            var wratio = 1;
            var hratio = 1;
            if (EZGUI.Compatibility.isPhaser) {
                wratio = Phaser.GAMES[0].scale.width / Phaser.GAMES[0].width;
                hratio = Phaser.GAMES[0].scale.height / Phaser.GAMES[0].height;
            }
            var tx = (parent.worldTransform.tx + parent.guiMask.x) * wratio;
            var ty = (parent.worldTransform.ty + parent.guiMask.y) * hratio;
            var w = parent.guiMask.width * wratio;
            var h = parent.guiMask.height * hratio;
            if (x < tx || y < ty || x > tx + w || y > ty + h)
                return true;
            return isMasked(x, y, parent);
        }
        utils.isMasked = isMasked;
        function getAbsPos(obj, from) {
            if (from === void 0) { from = null; }
            //if (EZGUI.Compatibility.PIXIVersion == 3) {
            if (from == null)
                from = { x: 0, y: 0 };
            from.x += obj.position.x;
            from.y += obj.position.y;
            if (obj.parent != null)
                return getAbsPos(obj.parent, from);
            return from;
            //}
            //else {
            //return { x: obj.worldTransform.tx, y: obj.worldTransform.ty };
            //}
        }
        utils.getAbsPos = getAbsPos;
        function getClientXY(event) {
            var data = event.data || event;
            var origEvt = event;
            if (data.originalEvent && data.originalEvent.changedTouches && data.originalEvent.changedTouches.length > 0) {
                origEvt = data.originalEvent.changedTouches[0];
            }
            else if (data.originalEvent && data.originalEvent.touches && data.originalEvent.touches.length > 0) {
                origEvt = data.originalEvent.touches[0];
            }
            else {
                if (data.originalEvent)
                    origEvt = data.originalEvent;
            }
            return { x: origEvt.clientX, y: origEvt.clientY };
        }
        utils.getClientXY = getClientXY;
        function getRealPos(event) {
            var data = event.data || event;
            var origEvt = event;
            if (data.originalEvent && data.originalEvent.changedTouches && data.originalEvent.changedTouches.length > 0) {
                origEvt = data.originalEvent.changedTouches[0];
            }
            else if (data.originalEvent && data.originalEvent.touches && data.originalEvent.touches.length > 0) {
                origEvt = data.originalEvent.touches[0];
            }
            else {
                if (data.originalEvent)
                    origEvt = data.originalEvent;
            }
            var bcr = origEvt.target.getBoundingClientRect();
            var px = origEvt.clientX - bcr.left;
            var py = origEvt.clientY - bcr.top;
            return { x: px, y: py };
        }
        utils.getRealPos = getRealPos;
        function distance(x, y, x0, y0) {
            return Math.sqrt((x -= x0) * x + (y -= y0) * y);
        }
        utils.distance = distance;
        ;
        function extendJSON(target, source) {
            if (typeof source == 'object') {
                for (var i in source) {
                    var src = source[i];
                    if (target[i] == '') {
                        continue;
                    }
                    if (target[i]) {
                        extendJSON(target[i], source[i]);
                    }
                    else {
                        target[i] = JSON.parse(JSON.stringify(source[i]));
                    }
                }
            }
        }
        utils.extendJSON = extendJSON;
        function loadJSON(url, cb, crossOrigin) {
            if (crossOrigin === void 0) { crossOrigin = true; }
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    var jsonContent = JSON.parse(xmlhttp.responseText);
                    cb(jsonContent);
                }
            };
            xmlhttp.open("GET", url, crossOrigin);
            xmlhttp.send();
        }
        utils.loadJSON = loadJSON;
        function loadXML(url, cb, crossOrigin) {
            if (crossOrigin === void 0) { crossOrigin = true; }
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    var xmlDoc;
                    if (window['DOMParser']) {
                        var parser = new DOMParser();
                        xmlDoc = parser.parseFromString(xmlhttp.responseText, "text/xml");
                    }
                    else {
                        xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
                        xmlDoc.async = false;
                        xmlDoc.loadXML(xmlhttp.responseText);
                    }
                    cb(xmlDoc);
                }
            };
            xmlhttp.open("GET", url, crossOrigin);
            xmlhttp.send();
        }
        utils.loadXML = loadXML;
    })(utils = EZGUI.utils || (EZGUI.utils = {}));
})(EZGUI || (EZGUI = {}));
//# sourceMappingURL=EZGUI.js.map
/*!
 *  howler.js v1.1.28
 *  howlerjs.com
 *
 *  (c) 2013-2015, James Simpson of GoldFire Studios
 *  goldfirestudios.com
 *
 *  MIT License
 */
!function(){var e={},o=null,n=!0,t=!1;try{"undefined"!=typeof AudioContext?o=new AudioContext:"undefined"!=typeof webkitAudioContext?o=new webkitAudioContext:n=!1}catch(r){n=!1}if(!n)if("undefined"!=typeof Audio)try{new Audio}catch(r){t=!0}else t=!0;if(n){var a="undefined"==typeof o.createGain?o.createGainNode():o.createGain();a.gain.value=1,a.connect(o.destination)}var i=function(e){this._volume=1,this._muted=!1,this.usingWebAudio=n,this.ctx=o,this.noAudio=t,this._howls=[],this._codecs=e,this.iOSAutoEnable=!0};i.prototype={volume:function(e){var o=this;if(e=parseFloat(e),e>=0&&1>=e){o._volume=e,n&&(a.gain.value=e);for(var t in o._howls)if(o._howls.hasOwnProperty(t)&&o._howls[t]._webAudio===!1)for(var r=0;r<o._howls[t]._audioNode.length;r++)o._howls[t]._audioNode[r].volume=o._howls[t]._volume*o._volume;return o}return n?a.gain.value:o._volume},mute:function(){return this._setMuted(!0),this},unmute:function(){return this._setMuted(!1),this},_setMuted:function(e){var o=this;o._muted=e,n&&(a.gain.value=e?0:o._volume);for(var t in o._howls)if(o._howls.hasOwnProperty(t)&&o._howls[t]._webAudio===!1)for(var r=0;r<o._howls[t]._audioNode.length;r++)o._howls[t]._audioNode[r].muted=e},codecs:function(e){return this._codecs[e]},_enableiOSAudio:function(){var e=this;if(!o||!e._iOSEnabled&&/iPhone|iPad|iPod/i.test(navigator.userAgent)){e._iOSEnabled=!1;var n=function(){var t=o.createBuffer(1,1,22050),r=o.createBufferSource();r.buffer=t,r.connect(o.destination),"undefined"==typeof r.start?r.noteOn(0):r.start(0),setTimeout(function(){(r.playbackState===r.PLAYING_STATE||r.playbackState===r.FINISHED_STATE)&&(e._iOSEnabled=!0,e.iOSAutoEnable=!1,window.removeEventListener("touchend",n,!1))},0)};return window.addEventListener("touchend",n,!1),e}}};var u=null,d={};t||(u=new Audio,d={mp3:!!u.canPlayType("audio/mpeg;").replace(/^no$/,""),opus:!!u.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/,""),ogg:!!u.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),wav:!!u.canPlayType('audio/wav; codecs="1"').replace(/^no$/,""),aac:!!u.canPlayType("audio/aac;").replace(/^no$/,""),m4a:!!(u.canPlayType("audio/x-m4a;")||u.canPlayType("audio/m4a;")||u.canPlayType("audio/aac;")).replace(/^no$/,""),mp4:!!(u.canPlayType("audio/x-mp4;")||u.canPlayType("audio/mp4;")||u.canPlayType("audio/aac;")).replace(/^no$/,""),weba:!!u.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/,"")});var l=new i(d),f=function(e){var t=this;t._autoplay=e.autoplay||!1,t._buffer=e.buffer||!1,t._duration=e.duration||0,t._format=e.format||null,t._loop=e.loop||!1,t._loaded=!1,t._sprite=e.sprite||{},t._src=e.src||"",t._pos3d=e.pos3d||[0,0,-.5],t._volume=void 0!==e.volume?e.volume:1,t._urls=e.urls||[],t._rate=e.rate||1,t._model=e.model||null,t._onload=[e.onload||function(){}],t._onloaderror=[e.onloaderror||function(){}],t._onend=[e.onend||function(){}],t._onpause=[e.onpause||function(){}],t._onplay=[e.onplay||function(){}],t._onendTimer=[],t._webAudio=n&&!t._buffer,t._audioNode=[],t._webAudio&&t._setupAudioNode(),"undefined"!=typeof o&&o&&l.iOSAutoEnable&&l._enableiOSAudio(),l._howls.push(t),t.load()};if(f.prototype={load:function(){var e=this,o=null;if(t)return void e.on("loaderror");for(var n=0;n<e._urls.length;n++){var r,a;if(e._format)r=e._format;else{if(a=e._urls[n],r=/^data:audio\/([^;,]+);/i.exec(a),r||(r=/\.([^.]+)$/.exec(a.split("?",1)[0])),!r)return void e.on("loaderror");r=r[1].toLowerCase()}if(d[r]){o=e._urls[n];break}}if(!o)return void e.on("loaderror");if(e._src=o,e._webAudio)_(e,o);else{var u=new Audio;u.addEventListener("error",function(){u.error&&4===u.error.code&&(i.noAudio=!0),e.on("loaderror",{type:u.error?u.error.code:0})},!1),e._audioNode.push(u),u.src=o,u._pos=0,u.preload="auto",u.volume=l._muted?0:e._volume*l.volume();var f=function(){e._duration=Math.ceil(10*u.duration)/10,0===Object.getOwnPropertyNames(e._sprite).length&&(e._sprite={_default:[0,1e3*e._duration]}),e._loaded||(e._loaded=!0,e.on("load")),e._autoplay&&e.play(),u.removeEventListener("canplaythrough",f,!1)};u.addEventListener("canplaythrough",f,!1),u.load()}return e},urls:function(e){var o=this;return e?(o.stop(),o._urls="string"==typeof e?[e]:e,o._loaded=!1,o.load(),o):o._urls},play:function(e,n){var t=this;return"function"==typeof e&&(n=e),e&&"function"!=typeof e||(e="_default"),t._loaded?t._sprite[e]?(t._inactiveNode(function(r){r._sprite=e;var a=r._pos>0?r._pos:t._sprite[e][0]/1e3,i=0;t._webAudio?(i=t._sprite[e][1]/1e3-r._pos,r._pos>0&&(a=t._sprite[e][0]/1e3+a)):i=t._sprite[e][1]/1e3-(a-t._sprite[e][0]/1e3);var u,d=!(!t._loop&&!t._sprite[e][2]),f="string"==typeof n?n:Math.round(Date.now()*Math.random())+"";if(function(){var o={id:f,sprite:e,loop:d};u=setTimeout(function(){!t._webAudio&&d&&t.stop(o.id).play(e,o.id),t._webAudio&&!d&&(t._nodeById(o.id).paused=!0,t._nodeById(o.id)._pos=0,t._clearEndTimer(o.id)),t._webAudio||d||t.stop(o.id),t.on("end",f)},1e3*i),t._onendTimer.push({timer:u,id:o.id})}(),t._webAudio){var _=t._sprite[e][0]/1e3,s=t._sprite[e][1]/1e3;r.id=f,r.paused=!1,p(t,[d,_,s],f),t._playStart=o.currentTime,r.gain.value=t._volume,"undefined"==typeof r.bufferSource.start?d?r.bufferSource.noteGrainOn(0,a,86400):r.bufferSource.noteGrainOn(0,a,i):d?r.bufferSource.start(0,a,86400):r.bufferSource.start(0,a,i)}else{if(4!==r.readyState&&(r.readyState||!navigator.isCocoonJS))return t._clearEndTimer(f),function(){var o=t,a=e,i=n,u=r,d=function(){o.play(a,i),u.removeEventListener("canplaythrough",d,!1)};u.addEventListener("canplaythrough",d,!1)}(),t;r.readyState=4,r.id=f,r.currentTime=a,r.muted=l._muted||r.muted,r.volume=t._volume*l.volume(),setTimeout(function(){r.play()},0)}return t.on("play"),"function"==typeof n&&n(f),t}),t):("function"==typeof n&&n(),t):(t.on("load",function(){t.play(e,n)}),t)},pause:function(e){var o=this;if(!o._loaded)return o.on("play",function(){o.pause(e)}),o;o._clearEndTimer(e);var n=e?o._nodeById(e):o._activeNode();if(n)if(n._pos=o.pos(null,e),o._webAudio){if(!n.bufferSource||n.paused)return o;n.paused=!0,"undefined"==typeof n.bufferSource.stop?n.bufferSource.noteOff(0):n.bufferSource.stop(0)}else n.pause();return o.on("pause"),o},stop:function(e){var o=this;if(!o._loaded)return o.on("play",function(){o.stop(e)}),o;o._clearEndTimer(e);var n=e?o._nodeById(e):o._activeNode();if(n)if(n._pos=0,o._webAudio){if(!n.bufferSource||n.paused)return o;n.paused=!0,"undefined"==typeof n.bufferSource.stop?n.bufferSource.noteOff(0):n.bufferSource.stop(0)}else isNaN(n.duration)||(n.pause(),n.currentTime=0);return o},mute:function(e){var o=this;if(!o._loaded)return o.on("play",function(){o.mute(e)}),o;var n=e?o._nodeById(e):o._activeNode();return n&&(o._webAudio?n.gain.value=0:n.muted=!0),o},unmute:function(e){var o=this;if(!o._loaded)return o.on("play",function(){o.unmute(e)}),o;var n=e?o._nodeById(e):o._activeNode();return n&&(o._webAudio?n.gain.value=o._volume:n.muted=!1),o},volume:function(e,o){var n=this;if(e=parseFloat(e),e>=0&&1>=e){if(n._volume=e,!n._loaded)return n.on("play",function(){n.volume(e,o)}),n;var t=o?n._nodeById(o):n._activeNode();return t&&(n._webAudio?t.gain.value=e:t.volume=e*l.volume()),n}return n._volume},loop:function(e){var o=this;return"boolean"==typeof e?(o._loop=e,o):o._loop},sprite:function(e){var o=this;return"object"==typeof e?(o._sprite=e,o):o._sprite},pos:function(e,n){var t=this;if(!t._loaded)return t.on("load",function(){t.pos(e)}),"number"==typeof e?t:t._pos||0;e=parseFloat(e);var r=n?t._nodeById(n):t._activeNode();if(r)return e>=0?(t.pause(n),r._pos=e,t.play(r._sprite,n),t):t._webAudio?r._pos+(o.currentTime-t._playStart):r.currentTime;if(e>=0)return t;for(var a=0;a<t._audioNode.length;a++)if(t._audioNode[a].paused&&4===t._audioNode[a].readyState)return t._webAudio?t._audioNode[a]._pos:t._audioNode[a].currentTime},pos3d:function(e,o,n,t){var r=this;if(o="undefined"!=typeof o&&o?o:0,n="undefined"!=typeof n&&n?n:-.5,!r._loaded)return r.on("play",function(){r.pos3d(e,o,n,t)}),r;if(!(e>=0||0>e))return r._pos3d;if(r._webAudio){var a=t?r._nodeById(t):r._activeNode();a&&(r._pos3d=[e,o,n],a.panner.setPosition(e,o,n),a.panner.panningModel=r._model||"HRTF")}return r},fade:function(e,o,n,t,r){var a=this,i=Math.abs(e-o),u=e>o?"down":"up",d=i/.01,l=n/d;if(!a._loaded)return a.on("load",function(){a.fade(e,o,n,t,r)}),a;a.volume(e,r);for(var f=1;d>=f;f++)!function(){var e=a._volume+("up"===u?.01:-.01)*f,n=Math.round(1e3*e)/1e3,i=o;setTimeout(function(){a.volume(n,r),n===i&&t&&t()},l*f)}()},fadeIn:function(e,o,n){return this.volume(0).play().fade(0,e,o,n)},fadeOut:function(e,o,n,t){var r=this;return r.fade(r._volume,e,o,function(){n&&n(),r.pause(t),r.on("end")},t)},_nodeById:function(e){for(var o=this,n=o._audioNode[0],t=0;t<o._audioNode.length;t++)if(o._audioNode[t].id===e){n=o._audioNode[t];break}return n},_activeNode:function(){for(var e=this,o=null,n=0;n<e._audioNode.length;n++)if(!e._audioNode[n].paused){o=e._audioNode[n];break}return e._drainPool(),o},_inactiveNode:function(e){for(var o=this,n=null,t=0;t<o._audioNode.length;t++)if(o._audioNode[t].paused&&4===o._audioNode[t].readyState){e(o._audioNode[t]),n=!0;break}if(o._drainPool(),!n){var r;if(o._webAudio)r=o._setupAudioNode(),e(r);else{o.load(),r=o._audioNode[o._audioNode.length-1];var a=navigator.isCocoonJS?"canplaythrough":"loadedmetadata",i=function(){r.removeEventListener(a,i,!1),e(r)};r.addEventListener(a,i,!1)}}},_drainPool:function(){var e,o=this,n=0;for(e=0;e<o._audioNode.length;e++)o._audioNode[e].paused&&n++;for(e=o._audioNode.length-1;e>=0&&!(5>=n);e--)o._audioNode[e].paused&&(o._webAudio&&o._audioNode[e].disconnect(0),n--,o._audioNode.splice(e,1))},_clearEndTimer:function(e){for(var o=this,n=0,t=0;t<o._onendTimer.length;t++)if(o._onendTimer[t].id===e){n=t;break}var r=o._onendTimer[n];r&&(clearTimeout(r.timer),o._onendTimer.splice(n,1))},_setupAudioNode:function(){var e=this,n=e._audioNode,t=e._audioNode.length;return n[t]="undefined"==typeof o.createGain?o.createGainNode():o.createGain(),n[t].gain.value=e._volume,n[t].paused=!0,n[t]._pos=0,n[t].readyState=4,n[t].connect(a),n[t].panner=o.createPanner(),n[t].panner.panningModel=e._model||"equalpower",n[t].panner.setPosition(e._pos3d[0],e._pos3d[1],e._pos3d[2]),n[t].panner.connect(n[t]),n[t]},on:function(e,o){var n=this,t=n["_on"+e];if("function"==typeof o)t.push(o);else for(var r=0;r<t.length;r++)o?t[r].call(n,o):t[r].call(n);return n},off:function(e,o){var n=this,t=n["_on"+e],r=o?o.toString():null;if(r){for(var a=0;a<t.length;a++)if(r===t[a].toString()){t.splice(a,1);break}}else n["_on"+e]=[];return n},unload:function(){for(var o=this,n=o._audioNode,t=0;t<o._audioNode.length;t++)n[t].paused||(o.stop(n[t].id),o.on("end",n[t].id)),o._webAudio?n[t].disconnect(0):n[t].src="";for(t=0;t<o._onendTimer.length;t++)clearTimeout(o._onendTimer[t].timer);var r=l._howls.indexOf(o);null!==r&&r>=0&&l._howls.splice(r,1),delete e[o._src],o=null}},n)var _=function(o,n){if(n in e)return o._duration=e[n].duration,void c(o);if(/^data:[^;]+;base64,/.test(n)){for(var t=atob(n.split(",")[1]),r=new Uint8Array(t.length),a=0;a<t.length;++a)r[a]=t.charCodeAt(a);s(r.buffer,o,n)}else{var i=new XMLHttpRequest;i.open("GET",n,!0),i.responseType="arraybuffer",i.onload=function(){s(i.response,o,n)},i.onerror=function(){o._webAudio&&(o._buffer=!0,o._webAudio=!1,o._audioNode=[],delete o._gainNode,delete e[n],o.load())};try{i.send()}catch(u){i.onerror()}}},s=function(n,t,r){o.decodeAudioData(n,function(o){o&&(e[r]=o,c(t,o))},function(e){t.on("loaderror")})},c=function(e,o){e._duration=o?o.duration:e._duration,0===Object.getOwnPropertyNames(e._sprite).length&&(e._sprite={_default:[0,1e3*e._duration]}),e._loaded||(e._loaded=!0,e.on("load")),e._autoplay&&e.play()},p=function(n,t,r){var a=n._nodeById(r);a.bufferSource=o.createBufferSource(),a.bufferSource.buffer=e[n._src],a.bufferSource.connect(a.panner),a.bufferSource.loop=t[0],t[0]&&(a.bufferSource.loopStart=t[1],a.bufferSource.loopEnd=t[1]+t[2]),a.bufferSource.playbackRate.value=n._rate};"function"==typeof define&&define.amd&&define(function(){return{Howler:l,Howl:f}}),"undefined"!=typeof exports&&(exports.Howler=l,exports.Howl=f),"undefined"!=typeof window&&(window.Howler=l,window.Howl=f)}();
/*
	Kailash Nadh (http://nadh.in)

	localStorageDB v 2.3.1
	A simple database layer for localStorage

	v 2.3.1 Mar 2015
	v 2.3 Feb 2014 Contribution: Christian Kellner (http://orange-coding.net)
	v 2.2 Jan 2014 Contribution: Andy Hawkins (http://a904guy.com) 
	v 2.1 Nov 2013
	v 2.0 June 2013
	v 1.9 Nov 2012

	License	:	MIT License
*/

!function(t,e){function n(t,n){function r(){E.hasOwnProperty(_)&&delete E[_],x=null}function a(){var t=0;for(var e in x.tables)x.tables.hasOwnProperty(e)&&t++;return t}function i(t){return x.tables[t].fields}function o(t){return x.tables[t]?!0:!1}function f(t){o(t)||D("The table '"+t+"' does not exist")}function u(t,e){var n=!1,r=x.tables[t].fields;for(var a in r)if(r[a]==e){n=!0;break}return n}function l(t,e){x.tables[t]={fields:e,auto_increment:1},x.data[t]={}}function s(t){delete x.tables[t],delete x.data[t]}function c(t){x.tables[t].auto_increment=1,x.data[t]={}}function d(t,e,n){if(x.tables[t].fields=x.tables[t].fields.concat(e),"undefined"!=typeof n)for(var r in x.data[t])if(x.data[t].hasOwnProperty(r))for(var a in e)x.data[t][r][e[a]]="object"==typeof n?n[e[a]]:n}function h(t){var e=0;for(var n in x.data[t])x.data[t].hasOwnProperty(n)&&e++;return e}function v(t,e){return e.ID=x.tables[t].auto_increment,x.data[t][x.tables[t].auto_increment]=e,x.tables[t].auto_increment++,e.ID}function p(t,n,r,a,i,o){for(var f=null,u=[],l=null,s=0;s<n.length;s++)f=n[s],l=x.data[t][f],u.push(k(l));if(i&&i instanceof Array)for(var s=0;s<i.length;s++)u.sort(y(i[s][0],i[s].length>1?i[s][1]:null));if(o&&o instanceof Array){for(var c=0;c<o.length;c++)for(var d={},h=o[c],s=0;s<u.length;s++)u[s]!==e&&(u[s].hasOwnProperty(h)&&d.hasOwnProperty(u[s][h])?delete u[s]:d[u[s][h]]=1);for(var v=[],s=0;s<u.length;s++)u[s]!==e&&v.push(u[s]);u=v}return r=r&&"number"==typeof r?r:null,a=a&&"number"==typeof a?a:null,r&&a?u=u.slice(r,r+a):r?u=u.slice(r):a&&(u=u.slice(r,a)),u}function y(t,e){return function(n,r){var a="string"==typeof n[t]?n[t].toLowerCase():n[t],i="string"==typeof r[t]?r[t].toLowerCase():r[t];return"DESC"===e?a==i?0:i>a?1:-1:a==i?0:a>i?1:-1}}function b(t,e){var n=[],r=!1,a=null;for(var i in x.data[t])if(x.data[t].hasOwnProperty(i)){a=x.data[t][i],r=!0;for(var o in e)if(e.hasOwnProperty(o))if("string"==typeof e[o]){if(a[o].toString().toLowerCase()!=e[o].toString().toLowerCase()){r=!1;break}}else if(a[o]!=e[o]){r=!1;break}r&&n.push(i)}return n}function g(t,e){var n=[],r=null;for(var a in x.data[t])x.data[t].hasOwnProperty(a)&&(r=x.data[t][a],1==e(k(r))&&n.push(a));return n}function m(t){var e=[];for(var n in x.data[t])x.data[t].hasOwnProperty(n)&&e.push(n);return e}function w(t,e){for(var n=0;n<e.length;n++)x.data[t].hasOwnProperty(e[n])&&delete x.data[t][e[n]];return e.length}function O(t,e,n){for(var r="",a=0,i=0;i<e.length;i++){r=e[i];var o=n(k(x.data[t][r]));if(o){delete o.ID;var f=x.data[t][r];for(var u in o)o.hasOwnProperty(u)&&(f[u]=o[u]);x.data[t][r]=j(t,f),a++}}return a}function P(){try{return E.setItem(_,JSON.stringify(x)),!0}catch(t){return!1}}function S(){return JSON.stringify(x)}function D(t){throw new Error(t)}function k(t){var e={};for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);return e}function T(t){return t.toString().match(/[^a-z_0-9]/gi)?!1:!0}function j(t,n){for(var r="",a={},i=0;i<x.tables[t].fields.length;i++)r=x.tables[t].fields[i],n[r]!==e&&(a[r]=n[r]);return a}function I(t,n){for(var r="",a={},i=0;i<x.tables[t].fields.length;i++)r=x.tables[t].fields[i],a[r]=null===n[r]||n[r]===e?null:n[r];return a}var C="db_",_=C+t,q=!1,x=null;try{var E=n==sessionStorage?sessionStorage:localStorage}catch(N){var E=n}return x=E[_],x&&(x=JSON.parse(x))&&x.tables&&x.data||(T(t)?(x={tables:{},data:{}},P(),q=!0):D("The name '"+t+"' contains invalid characters")),{commit:function(){return P()},isNew:function(){return q},drop:function(){r()},serialize:function(){return S()},tableExists:function(t){return o(t)},tableFields:function(t){return i(t)},tableCount:function(){return a()},columnExists:function(t,e){return u(t,e)},createTable:function(t,e){var n=!1;if(T(t))if(this.tableExists(t))D("The table name '"+t+"' already exists.");else{for(var r=!0,a=0;a<e.length;a++)if(!T(e[a])){r=!1;break}if(r){for(var i={},a=0;a<e.length;a++)i[e[a]]=!0;delete i.ID,e=["ID"];for(var o in i)i.hasOwnProperty(o)&&e.push(o);l(t,e),n=!0}else D("One or more field names in the table definition contains invalid characters")}else D("The database name '"+t+"' contains invalid characters.");return n},createTableWithData:function(t,e){("object"!=typeof e||!e.length||e.length<1)&&D("Data supplied isn't in object form. Example: [{k:v,k:v},{k:v,k:v} ..]");var n=Object.keys(e[0]);if(this.createTable(t,n)){this.commit();for(var r=0;r<e.length;r++)v(t,e[r])||D("Failed to insert record: ["+JSON.stringify(e[r])+"]");this.commit()}return!0},dropTable:function(t){f(t),s(t)},truncate:function(t){f(t),c(t)},alterTable:function(t,e,n){var r=!1;if(T(t)){if("object"==typeof e){for(var a=!0,i=0;i<e.length;i++)if(!T(e[i])){a=!1;break}if(a){for(var o={},i=0;i<e.length;i++)o[e[i]]=!0;delete o.ID,e=[];for(var f in o)o.hasOwnProperty(f)&&e.push(f);d(t,e,n),r=!0}else D("One or more field names in the table definition contains invalid characters")}else if("string"==typeof e)if(T(e)){var u=[];u.push(e),d(t,u,n),r=!0}else D("One or more field names in the table definition contains invalid characters")}else D("The database name '"+t+"' contains invalid characters");return r},rowCount:function(t){return f(t),h(t)},insert:function(t,e){return f(t),v(t,I(t,e))},insertOrUpdate:function(t,e,n){f(t);var r=[];if(e?"object"==typeof e?r=b(t,j(t,e)):"function"==typeof e&&(r=g(t,e)):r=m(t),0==r.length)return v(t,I(t,n));for(var a=[],i=0;i<r.length;i++)O(t,r,function(t){return a.push(t.ID),n});return a},update:function(t,e,n){f(t);var r=[];return e?"object"==typeof e?r=b(t,j(t,e)):"function"==typeof e&&(r=g(t,e)):r=m(t),O(t,r,n)},query:function(t,e,n,r,a,i){f(t);var o=[];return e?"object"==typeof e?o=b(t,j(t,e),n,r):"function"==typeof e&&(o=g(t,e,n,r)):o=m(t,n,r),p(t,o,r,n,a,i)},queryAll:function(t,e){return e?this.query(t,e.hasOwnProperty("query")?e.query:null,e.hasOwnProperty("limit")?e.limit:null,e.hasOwnProperty("start")?e.start:null,e.hasOwnProperty("sort")?e.sort:null,e.hasOwnProperty("distinct")?e.distinct:null):this.query(t)},deleteRows:function(t,e){f(t);var n=[];return e?"object"==typeof e?n=b(t,j(t,e)):"function"==typeof e&&(n=g(t,e)):n=m(t),w(t,n)}}}"function"==typeof define&&define.amd?define(function(){return n}):t.localStorageDB=n}(window);
!function(t){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var e;e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,e.PIXI=t()}}(function(){var t;return function e(t,r,i){function n(s,a){if(!r[s]){if(!t[s]){var h="function"==typeof require&&require;if(!a&&h)return h(s,!0);if(o)return o(s,!0);var u=new Error("Cannot find module '"+s+"'");throw u.code="MODULE_NOT_FOUND",u}var l=r[s]={exports:{}};t[s][0].call(l.exports,function(e){var r=t[s][1][e];return n(r?r:e)},l,l.exports,e,t,r,i)}return r[s].exports}for(var o="function"==typeof require&&require,s=0;s<i.length;s++)n(i[s]);return n}({1:[function(e,r,i){(function(e,i){!function(){function n(){}function o(t){return t}function s(t){return!!t}function a(t){return!t}function h(t){return function(){if(null===t)throw new Error("Callback was already called.");t.apply(this,arguments),t=null}}function u(t){return function(){null!==t&&(t.apply(this,arguments),t=null)}}function l(t){return X(t)||"number"==typeof t.length&&t.length>=0&&t.length%1===0}function c(t,e){return l(t)?p(t,e):g(t,e)}function p(t,e){for(var r=-1,i=t.length;++r<i;)e(t[r],r,t)}function d(t,e){for(var r=-1,i=t.length,n=Array(i);++r<i;)n[r]=e(t[r],r,t);return n}function f(t){return d(Array(t),function(t,e){return e})}function v(t,e,r){return p(t,function(t,i,n){r=e(r,t,i,n)}),r}function g(t,e){p(G(t),function(r){e(t[r],r)})}function m(t,e){for(var r=0;r<t.length;r++)if(t[r]===e)return r;return-1}function y(t){var e,r,i=-1;return l(t)?(e=t.length,function(){return i++,e>i?i:null}):(r=G(t),e=r.length,function(){return i++,e>i?r[i]:null})}function x(t,e){return e=null==e?t.length-1:+e,function(){for(var r=Math.max(arguments.length-e,0),i=Array(r),n=0;r>n;n++)i[n]=arguments[n+e];switch(e){case 0:return t.call(this,i);case 1:return t.call(this,arguments[0],i)}}}function b(t){return function(e,r,i){return t(e,i)}}function _(t){return function(e,r,i){i=u(i||n),e=e||[];var o=y(e);if(0>=t)return i(null);var s=!1,a=0,l=!1;!function c(){if(s&&0>=a)return i(null);for(;t>a&&!l;){var n=o();if(null===n)return s=!0,void(0>=a&&i(null));a+=1,r(e[n],n,h(function(t){a-=1,t?(i(t),l=!0):c()}))}}()}}function T(t){return function(e,r,i){return t(U.eachOf,e,r,i)}}function E(t){return function(e,r,i,n){return t(_(r),e,i,n)}}function S(t){return function(e,r,i){return t(U.eachOfSeries,e,r,i)}}function w(t,e,r,i){i=u(i||n);var o=[];t(e,function(t,e,i){r(t,function(t,r){o[e]=r,i(t)})},function(t){i(t,o)})}function A(t,e,r,i){var n=[];t(e,function(t,e,i){r(t,function(r){r&&n.push({index:e,value:t}),i()})},function(){i(d(n.sort(function(t,e){return t.index-e.index}),function(t){return t.value}))})}function C(t,e,r,i){A(t,e,function(t,e){r(t,function(t){e(!t)})},i)}function R(t,e,r){return function(i,n,o,s){function a(){s&&s(r(!1,void 0))}function h(t,i,n){return s?void o(t,function(i){s&&e(i)&&(s(r(!0,t)),s=o=!1),n()}):n()}arguments.length>3?t(i,n,h,a):(s=o,o=n,t(i,h,a))}}function M(t,e){return e}function O(t,e,r){r=r||n;var i=l(e)?[]:{};t(e,function(t,e,r){t(x(function(t,n){n.length<=1&&(n=n[0]),i[e]=n,r(t)}))},function(t){r(t,i)})}function P(t,e,r,i){var n=[];t(e,function(t,e,i){r(t,function(t,e){n=n.concat(e||[]),i(t)})},function(t){i(t,n)})}function F(t,e,r){function i(t,e,r,i){if(null!=i&&"function"!=typeof i)throw new Error("task callback must be a function");return t.started=!0,X(e)||(e=[e]),0===e.length&&t.idle()?U.setImmediate(function(){t.drain()}):(p(e,function(e){var o={data:e,callback:i||n};r?t.tasks.unshift(o):t.tasks.push(o),t.tasks.length===t.concurrency&&t.saturated()}),void U.setImmediate(t.process))}function o(t,e){return function(){s-=1;var r=arguments;p(e,function(t){t.callback.apply(t,r)}),t.tasks.length+s===0&&t.drain(),t.process()}}if(null==e)e=1;else if(0===e)throw new Error("Concurrency must not be zero");var s=0,a={tasks:[],concurrency:e,payload:r,saturated:n,empty:n,drain:n,started:!1,paused:!1,push:function(t,e){i(a,t,!1,e)},kill:function(){a.drain=n,a.tasks=[]},unshift:function(t,e){i(a,t,!0,e)},process:function(){if(!a.paused&&s<a.concurrency&&a.tasks.length)for(;s<a.concurrency&&a.tasks.length;){var e=a.payload?a.tasks.splice(0,a.payload):a.tasks.splice(0,a.tasks.length),r=d(e,function(t){return t.data});0===a.tasks.length&&a.empty(),s+=1;var i=h(o(a,e));t(r,i)}},length:function(){return a.tasks.length},running:function(){return s},idle:function(){return a.tasks.length+s===0},pause:function(){a.paused=!0},resume:function(){if(a.paused!==!1){a.paused=!1;for(var t=Math.min(a.concurrency,a.tasks.length),e=1;t>=e;e++)U.setImmediate(a.process)}}};return a}function D(t){return x(function(e,r){e.apply(null,r.concat([x(function(e,r){"object"==typeof console&&(e?console.error&&console.error(e):console[t]&&p(r,function(e){console[t](e)}))})]))})}function B(t){return function(e,r,i){t(f(e),r,i)}}function L(t){return x(function(e,r){var i=x(function(r){var i=this,n=r.pop();return t(e,function(t,e,n){t.apply(i,r.concat([n]))},n)});return r.length?i.apply(this,r):i})}function I(t){return x(function(e){var r=e.pop();e.push(function(){var t=arguments;i?U.setImmediate(function(){r.apply(null,t)}):r.apply(null,t)});var i=!0;t.apply(this,e),i=!1})}var N,U={},k="object"==typeof self&&self.self===self&&self||"object"==typeof i&&i.global===i&&i||this;null!=k&&(N=k.async),U.noConflict=function(){return k.async=N,U};var j=Object.prototype.toString,X=Array.isArray||function(t){return"[object Array]"===j.call(t)},Y=function(t){var e=typeof t;return"function"===e||"object"===e&&!!t},G=Object.keys||function(t){var e=[];for(var r in t)t.hasOwnProperty(r)&&e.push(r);return e},z="function"==typeof setImmediate&&setImmediate,W=z?function(t){z(t)}:function(t){setTimeout(t,0)};"object"==typeof e&&"function"==typeof e.nextTick?U.nextTick=e.nextTick:U.nextTick=W,U.setImmediate=z?W:U.nextTick,U.forEach=U.each=function(t,e,r){return U.eachOf(t,b(e),r)},U.forEachSeries=U.eachSeries=function(t,e,r){return U.eachOfSeries(t,b(e),r)},U.forEachLimit=U.eachLimit=function(t,e,r,i){return _(e)(t,b(r),i)},U.forEachOf=U.eachOf=function(t,e,r){function i(t){t?r(t):(s+=1,s>=o&&r(null))}r=u(r||n),t=t||[];var o=l(t)?t.length:G(t).length,s=0;return o?void c(t,function(r,n){e(t[n],n,h(i))}):r(null)},U.forEachOfSeries=U.eachOfSeries=function(t,e,r){function i(){var n=!0;return null===s?r(null):(e(t[s],s,h(function(t){if(t)r(t);else{if(s=o(),null===s)return r(null);n?U.nextTick(i):i()}})),void(n=!1))}r=u(r||n),t=t||[];var o=y(t),s=o();i()},U.forEachOfLimit=U.eachOfLimit=function(t,e,r,i){_(e)(t,r,i)},U.map=T(w),U.mapSeries=S(w),U.mapLimit=E(w),U.inject=U.foldl=U.reduce=function(t,e,r,i){U.eachOfSeries(t,function(t,i,n){r(e,t,function(t,r){e=r,n(t)})},function(t){i(t||null,e)})},U.foldr=U.reduceRight=function(t,e,r,i){var n=d(t,o).reverse();U.reduce(n,e,r,i)},U.select=U.filter=T(A),U.selectLimit=U.filterLimit=E(A),U.selectSeries=U.filterSeries=S(A),U.reject=T(C),U.rejectLimit=E(C),U.rejectSeries=S(C),U.any=U.some=R(U.eachOf,s,o),U.someLimit=R(U.eachOfLimit,s,o),U.all=U.every=R(U.eachOf,a,a),U.everyLimit=R(U.eachOfLimit,a,a),U.detect=R(U.eachOf,o,M),U.detectSeries=R(U.eachOfSeries,o,M),U.detectLimit=R(U.eachOfLimit,o,M),U.sortBy=function(t,e,r){function i(t,e){var r=t.criteria,i=e.criteria;return i>r?-1:r>i?1:0}U.map(t,function(t,r){e(t,function(e,i){e?r(e):r(null,{value:t,criteria:i})})},function(t,e){return t?r(t):void r(null,d(e.sort(i),function(t){return t.value}))})},U.auto=function(t,e){function r(t){l.unshift(t)}function i(t){var e=m(l,t);e>=0&&l.splice(e,1)}function o(){a--,p(l.slice(0),function(t){t()})}e=u(e||n);var s=G(t),a=s.length;if(!a)return e(null);var h={},l=[];r(function(){a||e(null,h)}),p(s,function(n){function s(){return v(p,function(t,e){return t&&h.hasOwnProperty(e)},!0)&&!h.hasOwnProperty(n)}function a(){s()&&(i(a),l[l.length-1](c,h))}for(var u,l=X(t[n])?t[n]:[t[n]],c=x(function(t,r){if(r.length<=1&&(r=r[0]),t){var i={};g(h,function(t,e){i[e]=t}),i[n]=r,e(t,i)}else h[n]=r,U.setImmediate(o)}),p=l.slice(0,l.length-1),d=p.length;d--;){if(!(u=t[p[d]]))throw new Error("Has inexistant dependency");if(X(u)&&m(u,n)>=0)throw new Error("Has cyclic dependencies")}s()?l[l.length-1](c,h):r(a)})},U.retry=function(t,e,r){function i(t,e){if("number"==typeof e)t.times=parseInt(e,10)||o;else{if("object"!=typeof e)throw new Error("Unsupported argument type for 'times': "+typeof e);t.times=parseInt(e.times,10)||o,t.interval=parseInt(e.interval,10)||s}}function n(t,e){function r(t,r){return function(i){t(function(t,e){i(!t||r,{err:t,result:e})},e)}}function i(t){return function(e){setTimeout(function(){e(null)},t)}}for(;h.times;){var n=!(h.times-=1);a.push(r(h.task,n)),!n&&h.interval>0&&a.push(i(h.interval))}U.series(a,function(e,r){r=r[r.length-1],(t||h.callback)(r.err,r.result)})}var o=5,s=0,a=[],h={times:o,interval:s},u=arguments.length;if(1>u||u>3)throw new Error("Invalid arguments - must be either (task), (task, callback), (times, task) or (times, task, callback)");return 2>=u&&"function"==typeof t&&(r=e,e=t),"function"!=typeof t&&i(h,t),h.callback=r,h.task=e,h.callback?n():n},U.waterfall=function(t,e){function r(t){return x(function(i,n){if(i)e.apply(null,[i].concat(n));else{var o=t.next();o?n.push(r(o)):n.push(e),I(t).apply(null,n)}})}if(e=u(e||n),!X(t)){var i=new Error("First argument to waterfall must be an array of functions");return e(i)}return t.length?void r(U.iterator(t))():e()},U.parallel=function(t,e){O(U.eachOf,t,e)},U.parallelLimit=function(t,e,r){O(_(e),t,r)},U.series=function(t,e){O(U.eachOfSeries,t,e)},U.iterator=function(t){function e(r){function i(){return t.length&&t[r].apply(null,arguments),i.next()}return i.next=function(){return r<t.length-1?e(r+1):null},i}return e(0)},U.apply=x(function(t,e){return x(function(r){return t.apply(null,e.concat(r))})}),U.concat=T(P),U.concatSeries=S(P),U.whilst=function(t,e,r){if(r=r||n,t()){var i=x(function(n,o){n?r(n):t.apply(this,o)?e(i):r(null)});e(i)}else r(null)},U.doWhilst=function(t,e,r){var i=0;return U.whilst(function(){return++i<=1||e.apply(this,arguments)},t,r)},U.until=function(t,e,r){return U.whilst(function(){return!t.apply(this,arguments)},e,r)},U.doUntil=function(t,e,r){return U.doWhilst(t,function(){return!e.apply(this,arguments)},r)},U.during=function(t,e,r){r=r||n;var i=x(function(e,i){e?r(e):(i.push(o),t.apply(this,i))}),o=function(t,n){t?r(t):n?e(i):r(null)};t(o)},U.doDuring=function(t,e,r){var i=0;U.during(function(t){i++<1?t(null,!0):e.apply(this,arguments)},t,r)},U.queue=function(t,e){var r=F(function(e,r){t(e[0],r)},e,1);return r},U.priorityQueue=function(t,e){function r(t,e){return t.priority-e.priority}function i(t,e,r){for(var i=-1,n=t.length-1;n>i;){var o=i+(n-i+1>>>1);r(e,t[o])>=0?i=o:n=o-1}return i}function o(t,e,o,s){if(null!=s&&"function"!=typeof s)throw new Error("task callback must be a function");return t.started=!0,X(e)||(e=[e]),0===e.length?U.setImmediate(function(){t.drain()}):void p(e,function(e){var a={data:e,priority:o,callback:"function"==typeof s?s:n};t.tasks.splice(i(t.tasks,a,r)+1,0,a),t.tasks.length===t.concurrency&&t.saturated(),U.setImmediate(t.process)})}var s=U.queue(t,e);return s.push=function(t,e,r){o(s,t,e,r)},delete s.unshift,s},U.cargo=function(t,e){return F(t,1,e)},U.log=D("log"),U.dir=D("dir"),U.memoize=function(t,e){var r={},i={};e=e||o;var n=x(function(n){var o=n.pop(),s=e.apply(null,n);s in r?U.nextTick(function(){o.apply(null,r[s])}):s in i?i[s].push(o):(i[s]=[o],t.apply(null,n.concat([x(function(t){r[s]=t;var e=i[s];delete i[s];for(var n=0,o=e.length;o>n;n++)e[n].apply(null,t)})])))});return n.memo=r,n.unmemoized=t,n},U.unmemoize=function(t){return function(){return(t.unmemoized||t).apply(null,arguments)}},U.times=B(U.map),U.timesSeries=B(U.mapSeries),U.timesLimit=function(t,e,r,i){return U.mapLimit(f(t),e,r,i)},U.seq=function(){var t=arguments;return x(function(e){var r=this,i=e[e.length-1];"function"==typeof i?e.pop():i=n,U.reduce(t,e,function(t,e,i){e.apply(r,t.concat([x(function(t,e){i(t,e)})]))},function(t,e){i.apply(r,[t].concat(e))})})},U.compose=function(){return U.seq.apply(null,Array.prototype.reverse.call(arguments))},U.applyEach=L(U.eachOf),U.applyEachSeries=L(U.eachOfSeries),U.forever=function(t,e){function r(t){return t?i(t):void o(r)}var i=h(e||n),o=I(t);r()},U.ensureAsync=I,U.constant=x(function(t){var e=[null].concat(t);return function(t){return t.apply(this,e)}}),U.wrapSync=U.asyncify=function(t){return x(function(e){var r,i=e.pop();try{r=t.apply(this,e)}catch(n){return i(n)}Y(r)&&"function"==typeof r.then?r.then(function(t){i(null,t)})["catch"](function(t){i(t.message?t:new Error(t))}):i(null,r)})},"object"==typeof r&&r.exports?r.exports=U:"function"==typeof t&&t.amd?t([],function(){return U}):k.async=U}()}).call(this,e("_process"),"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{_process:3}],2:[function(t,e,r){(function(t){function e(t,e){for(var r=0,i=t.length-1;i>=0;i--){var n=t[i];"."===n?t.splice(i,1):".."===n?(t.splice(i,1),r++):r&&(t.splice(i,1),r--)}if(e)for(;r--;r)t.unshift("..");return t}function i(t,e){if(t.filter)return t.filter(e);for(var r=[],i=0;i<t.length;i++)e(t[i],i,t)&&r.push(t[i]);return r}var n=/^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/,o=function(t){return n.exec(t).slice(1)};r.resolve=function(){for(var r="",n=!1,o=arguments.length-1;o>=-1&&!n;o--){var s=o>=0?arguments[o]:t.cwd();if("string"!=typeof s)throw new TypeError("Arguments to path.resolve must be strings");s&&(r=s+"/"+r,n="/"===s.charAt(0))}return r=e(i(r.split("/"),function(t){return!!t}),!n).join("/"),(n?"/":"")+r||"."},r.normalize=function(t){var n=r.isAbsolute(t),o="/"===s(t,-1);return t=e(i(t.split("/"),function(t){return!!t}),!n).join("/"),t||n||(t="."),t&&o&&(t+="/"),(n?"/":"")+t},r.isAbsolute=function(t){return"/"===t.charAt(0)},r.join=function(){var t=Array.prototype.slice.call(arguments,0);return r.normalize(i(t,function(t,e){if("string"!=typeof t)throw new TypeError("Arguments to path.join must be strings");return t}).join("/"))},r.relative=function(t,e){function i(t){for(var e=0;e<t.length&&""===t[e];e++);for(var r=t.length-1;r>=0&&""===t[r];r--);return e>r?[]:t.slice(e,r-e+1)}t=r.resolve(t).substr(1),e=r.resolve(e).substr(1);for(var n=i(t.split("/")),o=i(e.split("/")),s=Math.min(n.length,o.length),a=s,h=0;s>h;h++)if(n[h]!==o[h]){a=h;break}for(var u=[],h=a;h<n.length;h++)u.push("..");return u=u.concat(o.slice(a)),u.join("/")},r.sep="/",r.delimiter=":",r.dirname=function(t){var e=o(t),r=e[0],i=e[1];return r||i?(i&&(i=i.substr(0,i.length-1)),r+i):"."},r.basename=function(t,e){var r=o(t)[2];return e&&r.substr(-1*e.length)===e&&(r=r.substr(0,r.length-e.length)),r},r.extname=function(t){return o(t)[3]};var s="b"==="ab".substr(-1)?function(t,e,r){return t.substr(e,r)}:function(t,e,r){return 0>e&&(e=t.length+e),t.substr(e,r)}}).call(this,t("_process"))},{_process:3}],3:[function(t,e,r){function i(){l=!1,a.length?u=a.concat(u):c=-1,u.length&&n()}function n(){if(!l){var t=setTimeout(i);l=!0;for(var e=u.length;e;){for(a=u,u=[];++c<e;)a&&a[c].run();c=-1,e=u.length}a=null,l=!1,clearTimeout(t)}}function o(t,e){this.fun=t,this.array=e}function s(){}var a,h=e.exports={},u=[],l=!1,c=-1;h.nextTick=function(t){var e=new Array(arguments.length-1);if(arguments.length>1)for(var r=1;r<arguments.length;r++)e[r-1]=arguments[r];u.push(new o(t,e)),1!==u.length||l||setTimeout(n,0)},o.prototype.run=function(){this.fun.apply(null,this.array)},h.title="browser",h.browser=!0,h.env={},h.argv=[],h.version="",h.versions={},h.on=s,h.addListener=s,h.once=s,h.off=s,h.removeListener=s,h.removeAllListeners=s,h.emit=s,h.binding=function(t){throw new Error("process.binding is not supported")},h.cwd=function(){return"/"},h.chdir=function(t){throw new Error("process.chdir is not supported")},h.umask=function(){return 0}},{}],4:[function(e,r,i){(function(e){!function(n){function o(t){throw RangeError(B[t])}function s(t,e){for(var r=t.length,i=[];r--;)i[r]=e(t[r]);return i}function a(t,e){var r=t.split("@"),i="";r.length>1&&(i=r[0]+"@",t=r[1]),t=t.replace(D,".");var n=t.split("."),o=s(n,e).join(".");return i+o}function h(t){for(var e,r,i=[],n=0,o=t.length;o>n;)e=t.charCodeAt(n++),e>=55296&&56319>=e&&o>n?(r=t.charCodeAt(n++),56320==(64512&r)?i.push(((1023&e)<<10)+(1023&r)+65536):(i.push(e),n--)):i.push(e);return i}function u(t){return s(t,function(t){var e="";return t>65535&&(t-=65536,e+=N(t>>>10&1023|55296),t=56320|1023&t),e+=N(t)}).join("")}function l(t){return 10>t-48?t-22:26>t-65?t-65:26>t-97?t-97:E}function c(t,e){return t+22+75*(26>t)-((0!=e)<<5)}function p(t,e,r){var i=0;for(t=r?I(t/C):t>>1,t+=I(t/e);t>L*w>>1;i+=E)t=I(t/L);return I(i+(L+1)*t/(t+A))}function d(t){var e,r,i,n,s,a,h,c,d,f,v=[],g=t.length,m=0,y=M,x=R;for(r=t.lastIndexOf(O),0>r&&(r=0),i=0;r>i;++i)t.charCodeAt(i)>=128&&o("not-basic"),v.push(t.charCodeAt(i));for(n=r>0?r+1:0;g>n;){for(s=m,a=1,h=E;n>=g&&o("invalid-input"),c=l(t.charCodeAt(n++)),(c>=E||c>I((T-m)/a))&&o("overflow"),m+=c*a,d=x>=h?S:h>=x+w?w:h-x,!(d>c);h+=E)f=E-d,a>I(T/f)&&o("overflow"),a*=f;e=v.length+1,x=p(m-s,e,0==s),I(m/e)>T-y&&o("overflow"),y+=I(m/e),m%=e,v.splice(m++,0,y)}return u(v)}function f(t){var e,r,i,n,s,a,u,l,d,f,v,g,m,y,x,b=[];for(t=h(t),g=t.length,e=M,r=0,s=R,a=0;g>a;++a)v=t[a],128>v&&b.push(N(v));for(i=n=b.length,n&&b.push(O);g>i;){for(u=T,a=0;g>a;++a)v=t[a],v>=e&&u>v&&(u=v);for(m=i+1,u-e>I((T-r)/m)&&o("overflow"),r+=(u-e)*m,e=u,a=0;g>a;++a)if(v=t[a],e>v&&++r>T&&o("overflow"),v==e){for(l=r,d=E;f=s>=d?S:d>=s+w?w:d-s,!(f>l);d+=E)x=l-f,y=E-f,b.push(N(c(f+x%y,0))),l=I(x/y);b.push(N(c(l,0))),s=p(r,m,i==n),r=0,++i}++r,++e}return b.join("")}function v(t){return a(t,function(t){return P.test(t)?d(t.slice(4).toLowerCase()):t})}function g(t){return a(t,function(t){return F.test(t)?"xn--"+f(t):t})}var m="object"==typeof i&&i&&!i.nodeType&&i,y="object"==typeof r&&r&&!r.nodeType&&r,x="object"==typeof e&&e;(x.global===x||x.window===x||x.self===x)&&(n=x);var b,_,T=2147483647,E=36,S=1,w=26,A=38,C=700,R=72,M=128,O="-",P=/^xn--/,F=/[^\x20-\x7E]/,D=/[\x2E\u3002\uFF0E\uFF61]/g,B={overflow:"Overflow: input needs wider integers to process","not-basic":"Illegal input >= 0x80 (not a basic code point)","invalid-input":"Invalid input"},L=E-S,I=Math.floor,N=String.fromCharCode;if(b={version:"1.3.2",ucs2:{decode:h,encode:u},decode:d,encode:f,toASCII:g,toUnicode:v},"function"==typeof t&&"object"==typeof t.amd&&t.amd)t("punycode",function(){return b});else if(m&&y)if(r.exports==m)y.exports=b;else for(_ in b)b.hasOwnProperty(_)&&(m[_]=b[_]);else n.punycode=b}(this)}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],5:[function(t,e,r){"use strict";function i(t,e){return Object.prototype.hasOwnProperty.call(t,e)}e.exports=function(t,e,r,o){e=e||"&",r=r||"=";var s={};if("string"!=typeof t||0===t.length)return s;var a=/\+/g;t=t.split(e);var h=1e3;o&&"number"==typeof o.maxKeys&&(h=o.maxKeys);var u=t.length;h>0&&u>h&&(u=h);for(var l=0;u>l;++l){var c,p,d,f,v=t[l].replace(a,"%20"),g=v.indexOf(r);g>=0?(c=v.substr(0,g),p=v.substr(g+1)):(c=v,p=""),d=decodeURIComponent(c),f=decodeURIComponent(p),i(s,d)?n(s[d])?s[d].push(f):s[d]=[s[d],f]:s[d]=f}return s};var n=Array.isArray||function(t){return"[object Array]"===Object.prototype.toString.call(t)}},{}],6:[function(t,e,r){"use strict";function i(t,e){if(t.map)return t.map(e);for(var r=[],i=0;i<t.length;i++)r.push(e(t[i],i));return r}var n=function(t){switch(typeof t){case"string":return t;case"boolean":return t?"true":"false";case"number":return isFinite(t)?t:"";default:return""}};e.exports=function(t,e,r,a){return e=e||"&",r=r||"=",null===t&&(t=void 0),"object"==typeof t?i(s(t),function(s){var a=encodeURIComponent(n(s))+r;return o(t[s])?i(t[s],function(t){return a+encodeURIComponent(n(t))}).join(e):a+encodeURIComponent(n(t[s]))}).join(e):a?encodeURIComponent(n(a))+r+encodeURIComponent(n(t)):""};var o=Array.isArray||function(t){return"[object Array]"===Object.prototype.toString.call(t)},s=Object.keys||function(t){var e=[];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&e.push(r);return e}},{}],7:[function(t,e,r){"use strict";r.decode=r.parse=t("./decode"),r.encode=r.stringify=t("./encode")},{"./decode":5,"./encode":6}],8:[function(t,e,r){function i(){this.protocol=null,this.slashes=null,this.auth=null,this.host=null,this.port=null,this.hostname=null,this.hash=null,this.search=null,this.query=null,this.pathname=null,this.path=null,this.href=null}function n(t,e,r){if(t&&u(t)&&t instanceof i)return t;var n=new i;return n.parse(t,e,r),n}function o(t){return h(t)&&(t=n(t)),t instanceof i?t.format():i.prototype.format.call(t)}function s(t,e){return n(t,!1,!0).resolve(e)}function a(t,e){return t?n(t,!1,!0).resolveObject(e):e}function h(t){return"string"==typeof t}function u(t){return"object"==typeof t&&null!==t}function l(t){return null===t}function c(t){return null==t}var p=t("punycode");r.parse=n,r.resolve=s,r.resolveObject=a,r.format=o,r.Url=i;var d=/^([a-z0-9.+-]+:)/i,f=/:[0-9]*$/,v=["<",">",'"',"`"," ","\r","\n","	"],g=["{","}","|","\\","^","`"].concat(v),m=["'"].concat(g),y=["%","/","?",";","#"].concat(m),x=["/","?","#"],b=255,_=/^[a-z0-9A-Z_-]{0,63}$/,T=/^([a-z0-9A-Z_-]{0,63})(.*)$/,E={javascript:!0,"javascript:":!0},S={javascript:!0,"javascript:":!0},w={http:!0,https:!0,ftp:!0,gopher:!0,file:!0,"http:":!0,"https:":!0,"ftp:":!0,"gopher:":!0,"file:":!0},A=t("querystring");i.prototype.parse=function(t,e,r){if(!h(t))throw new TypeError("Parameter 'url' must be a string, not "+typeof t);var i=t;i=i.trim();var n=d.exec(i);if(n){n=n[0];var o=n.toLowerCase();this.protocol=o,i=i.substr(n.length)}if(r||n||i.match(/^\/\/[^@\/]+@[^@\/]+/)){var s="//"===i.substr(0,2);!s||n&&S[n]||(i=i.substr(2),this.slashes=!0)}if(!S[n]&&(s||n&&!w[n])){for(var a=-1,u=0;u<x.length;u++){var l=i.indexOf(x[u]);-1!==l&&(-1===a||a>l)&&(a=l)}var c,f;f=-1===a?i.lastIndexOf("@"):i.lastIndexOf("@",a),-1!==f&&(c=i.slice(0,f),i=i.slice(f+1),this.auth=decodeURIComponent(c)),a=-1;for(var u=0;u<y.length;u++){var l=i.indexOf(y[u]);-1!==l&&(-1===a||a>l)&&(a=l)}-1===a&&(a=i.length),this.host=i.slice(0,a),i=i.slice(a),this.parseHost(),this.hostname=this.hostname||"";var v="["===this.hostname[0]&&"]"===this.hostname[this.hostname.length-1];if(!v)for(var g=this.hostname.split(/\./),u=0,C=g.length;C>u;u++){var R=g[u];if(R&&!R.match(_)){for(var M="",O=0,P=R.length;P>O;O++)M+=R.charCodeAt(O)>127?"x":R[O];if(!M.match(_)){var F=g.slice(0,u),D=g.slice(u+1),B=R.match(T);B&&(F.push(B[1]),D.unshift(B[2])),D.length&&(i="/"+D.join(".")+i),this.hostname=F.join(".");break}}}if(this.hostname.length>b?this.hostname="":this.hostname=this.hostname.toLowerCase(),!v){for(var L=this.hostname.split("."),I=[],u=0;u<L.length;++u){var N=L[u];I.push(N.match(/[^A-Za-z0-9_-]/)?"xn--"+p.encode(N):N)}this.hostname=I.join(".")}var U=this.port?":"+this.port:"",k=this.hostname||"";this.host=k+U,this.href+=this.host,v&&(this.hostname=this.hostname.substr(1,this.hostname.length-2),"/"!==i[0]&&(i="/"+i))}if(!E[o])for(var u=0,C=m.length;C>u;u++){var j=m[u],X=encodeURIComponent(j);X===j&&(X=escape(j)),i=i.split(j).join(X)}var Y=i.indexOf("#");-1!==Y&&(this.hash=i.substr(Y),i=i.slice(0,Y));var G=i.indexOf("?");if(-1!==G?(this.search=i.substr(G),this.query=i.substr(G+1),e&&(this.query=A.parse(this.query)),i=i.slice(0,G)):e&&(this.search="",this.query={}),i&&(this.pathname=i),w[o]&&this.hostname&&!this.pathname&&(this.pathname="/"),this.pathname||this.search){var U=this.pathname||"",N=this.search||"";this.path=U+N}return this.href=this.format(),this},i.prototype.format=function(){var t=this.auth||"";t&&(t=encodeURIComponent(t),t=t.replace(/%3A/i,":"),t+="@");var e=this.protocol||"",r=this.pathname||"",i=this.hash||"",n=!1,o="";this.host?n=t+this.host:this.hostname&&(n=t+(-1===this.hostname.indexOf(":")?this.hostname:"["+this.hostname+"]"),this.port&&(n+=":"+this.port)),this.query&&u(this.query)&&Object.keys(this.query).length&&(o=A.stringify(this.query));var s=this.search||o&&"?"+o||"";return e&&":"!==e.substr(-1)&&(e+=":"),this.slashes||(!e||w[e])&&n!==!1?(n="//"+(n||""),r&&"/"!==r.charAt(0)&&(r="/"+r)):n||(n=""),i&&"#"!==i.charAt(0)&&(i="#"+i),s&&"?"!==s.charAt(0)&&(s="?"+s),r=r.replace(/[?#]/g,function(t){return encodeURIComponent(t)}),s=s.replace("#","%23"),e+n+r+s+i},i.prototype.resolve=function(t){return this.resolveObject(n(t,!1,!0)).format()},i.prototype.resolveObject=function(t){if(h(t)){var e=new i;e.parse(t,!1,!0),t=e}var r=new i;if(Object.keys(this).forEach(function(t){r[t]=this[t]},this),r.hash=t.hash,""===t.href)return r.href=r.format(),r;if(t.slashes&&!t.protocol)return Object.keys(t).forEach(function(e){"protocol"!==e&&(r[e]=t[e])}),w[r.protocol]&&r.hostname&&!r.pathname&&(r.path=r.pathname="/"),r.href=r.format(),r;if(t.protocol&&t.protocol!==r.protocol){if(!w[t.protocol])return Object.keys(t).forEach(function(e){r[e]=t[e]}),r.href=r.format(),r;if(r.protocol=t.protocol,t.host||S[t.protocol])r.pathname=t.pathname;else{for(var n=(t.pathname||"").split("/");n.length&&!(t.host=n.shift()););t.host||(t.host=""),t.hostname||(t.hostname=""),""!==n[0]&&n.unshift(""),n.length<2&&n.unshift(""),r.pathname=n.join("/")}if(r.search=t.search,r.query=t.query,r.host=t.host||"",r.auth=t.auth,r.hostname=t.hostname||t.host,r.port=t.port,r.pathname||r.search){var o=r.pathname||"",s=r.search||"";r.path=o+s}return r.slashes=r.slashes||t.slashes,r.href=r.format(),r}var a=r.pathname&&"/"===r.pathname.charAt(0),u=t.host||t.pathname&&"/"===t.pathname.charAt(0),p=u||a||r.host&&t.pathname,d=p,f=r.pathname&&r.pathname.split("/")||[],n=t.pathname&&t.pathname.split("/")||[],v=r.protocol&&!w[r.protocol];if(v&&(r.hostname="",r.port=null,r.host&&(""===f[0]?f[0]=r.host:f.unshift(r.host)),r.host="",t.protocol&&(t.hostname=null,t.port=null,t.host&&(""===n[0]?n[0]=t.host:n.unshift(t.host)),t.host=null),p=p&&(""===n[0]||""===f[0])),u)r.host=t.host||""===t.host?t.host:r.host,r.hostname=t.hostname||""===t.hostname?t.hostname:r.hostname,r.search=t.search,r.query=t.query,f=n;else if(n.length)f||(f=[]),f.pop(),f=f.concat(n),r.search=t.search,r.query=t.query;else if(!c(t.search)){if(v){r.hostname=r.host=f.shift();var g=r.host&&r.host.indexOf("@")>0?r.host.split("@"):!1;g&&(r.auth=g.shift(),r.host=r.hostname=g.shift())}return r.search=t.search,r.query=t.query,l(r.pathname)&&l(r.search)||(r.path=(r.pathname?r.pathname:"")+(r.search?r.search:"")),r.href=r.format(),r}if(!f.length)return r.pathname=null,r.search?r.path="/"+r.search:r.path=null,r.href=r.format(),r;for(var m=f.slice(-1)[0],y=(r.host||t.host)&&("."===m||".."===m)||""===m,x=0,b=f.length;b>=0;b--)m=f[b],"."==m?f.splice(b,1):".."===m?(f.splice(b,1),x++):x&&(f.splice(b,1),x--);if(!p&&!d)for(;x--;x)f.unshift("..");!p||""===f[0]||f[0]&&"/"===f[0].charAt(0)||f.unshift(""),y&&"/"!==f.join("/").substr(-1)&&f.push("");var _=""===f[0]||f[0]&&"/"===f[0].charAt(0);if(v){r.hostname=r.host=_?"":f.length?f.shift():"";var g=r.host&&r.host.indexOf("@")>0?r.host.split("@"):!1;g&&(r.auth=g.shift(),r.host=r.hostname=g.shift())}return p=p||r.host&&f.length,p&&!_&&f.unshift(""),f.length?r.pathname=f.join("/"):(r.pathname=null,r.path=null),l(r.pathname)&&l(r.search)||(r.path=(r.pathname?r.pathname:"")+(r.search?r.search:"")),r.auth=t.auth||r.auth,r.slashes=r.slashes||t.slashes,r.href=r.format(),r},i.prototype.parseHost=function(){var t=this.host,e=f.exec(t);e&&(e=e[0],":"!==e&&(this.port=e.substr(1)),t=t.substr(0,t.length-e.length)),t&&(this.hostname=t)}},{punycode:4,querystring:7}],9:[function(t,e,r){"use strict";function i(t,e,r){r=r||2;var i=e&&e.length,a=i?e[0]*r:t.length,h=o(t,n(t,0,a,r,!0)),u=[];if(!h)return u;var c,p,d,f,v,g,m;if(i&&(h=l(t,e,h,r)),t.length>80*r){c=d=t[0],p=f=t[1];for(var y=r;a>y;y+=r)v=t[y],g=t[y+1],c>v&&(c=v),p>g&&(p=g),v>d&&(d=v),g>f&&(f=g);m=Math.max(d-c,f-p)}return s(t,h,u,r,c,p,m),u}function n(t,e,r,i,n){var o,s,a,h=0;for(o=e,s=r-i;r>o;o+=i)h+=(t[s]-t[o])*(t[o+1]+t[s+1]),s=o;if(n===h>0)for(o=e;r>o;o+=i)a=w(o,a);else for(o=r-i;o>=e;o-=i)a=w(o,a);return a}function o(t,e,r){r||(r=e);var i,n=e;do if(i=!1,n.steiner||!x(t,n.i,n.next.i)&&0!==y(t,n.prev.i,n.i,n.next.i))n=n.next;else{if(n.prev.next=n.next,n.next.prev=n.prev,n.prevZ&&(n.prevZ.nextZ=n.nextZ),n.nextZ&&(n.nextZ.prevZ=n.prevZ),n=r=n.prev,n===n.next)return null;i=!0}while(i||n!==r);return r}function s(t,e,r,i,n,l,c,p){if(e){p||void 0===n||d(t,e,n,l,c);for(var f,v,g=e;e.prev!==e.next;)if(f=e.prev,v=e.next,a(t,e,n,l,c))r.push(f.i/i),r.push(e.i/i),r.push(v.i/i),v.prev=f,f.next=v,e.prevZ&&(e.prevZ.nextZ=e.nextZ),e.nextZ&&(e.nextZ.prevZ=e.prevZ),e=v.next,g=v.next;else if(e=v,e===g){p?1===p?(e=h(t,e,r,i),s(t,e,r,i,n,l,c,2)):2===p&&u(t,e,r,i,n,l,c):s(t,o(t,e),r,i,n,l,c,1);break}}}function a(t,e,r,i,n){var o=e.prev.i,s=e.i,a=e.next.i,h=t[o],u=t[o+1],l=t[s],c=t[s+1],p=t[a],d=t[a+1],f=h*c-u*l,g=h*d-u*p,m=p*c-d*l,y=f-g-m;if(0>=y)return!1;var x,b,_,T,E,S,w,A=d-u,C=h-p,R=u-c,M=l-h;if(void 0!==r){var O=l>h?p>h?h:p:p>l?l:p,P=c>u?d>u?u:d:d>c?c:d,F=h>l?h>p?h:p:l>p?l:p,D=u>c?u>d?u:d:c>d?c:d,B=v(O,P,r,i,n),L=v(F,D,r,i,n);for(w=e.nextZ;w&&w.z<=L;)if(x=w.i,w=w.nextZ,x!==o&&x!==a&&(b=t[x],_=t[x+1],T=A*b+C*_-g,T>=0&&(E=R*b+M*_+f,E>=0&&(S=y-T-E,S>=0&&(T&&E||T&&S||E&&S)))))return!1;for(w=e.prevZ;w&&w.z>=B;)if(x=w.i,w=w.prevZ,x!==o&&x!==a&&(b=t[x],_=t[x+1],T=A*b+C*_-g,T>=0&&(E=R*b+M*_+f,E>=0&&(S=y-T-E,S>=0&&(T&&E||T&&S||E&&S)))))return!1}else for(w=e.next.next;w!==e.prev;)if(x=w.i,w=w.next,b=t[x],_=t[x+1],T=A*b+C*_-g,T>=0&&(E=R*b+M*_+f,E>=0&&(S=y-T-E,S>=0&&(T&&E||T&&S||E&&S))))return!1;return!0}function h(t,e,r,i){var n=e;do{var o=n.prev,s=n.next.next;if(o.i!==s.i&&b(t,o.i,n.i,n.next.i,s.i)&&T(t,o,s)&&T(t,s,o)){r.push(o.i/i),r.push(n.i/i),r.push(s.i/i),o.next=s,s.prev=o;var a=n.prevZ,h=n.nextZ&&n.nextZ.nextZ;a&&(a.nextZ=h),h&&(h.prevZ=a),n=e=s}n=n.next}while(n!==e);return n}function u(t,e,r,i,n,a,h){var u=e;do{for(var l=u.next.next;l!==u.prev;){if(u.i!==l.i&&m(t,u,l)){var c=S(u,l);return u=o(t,u,u.next),c=o(t,c,c.next),s(t,u,r,i,n,a,h),void s(t,c,r,i,n,a,h)}l=l.next}u=u.next}while(u!==e)}function l(t,e,r,i){var s,a,h,u,l,p=[];for(s=0,a=e.length;a>s;s++)h=e[s]*i,u=a-1>s?e[s+1]*i:t.length,l=n(t,h,u,i,!1),l===l.next&&(l.steiner=!0),l=o(t,l),l&&p.push(g(t,l));for(p.sort(function(e,r){return t[e.i]-t[r.i]}),s=0;s<p.length;s++)c(t,p[s],r),r=o(t,r,r.next);return r}function c(t,e,r){if(r=p(t,e,r)){var i=S(r,e);o(t,i,i.next)}}function p(t,e,r){var i,n,o,s=r,a=e.i,h=t[a],u=t[a+1],l=-(1/0);do{if(n=s.i,o=s.next.i,u<=t[n+1]&&u>=t[o+1]){var c=t[n]+(u-t[n+1])*(t[o]-t[n])/(t[o+1]-t[n+1]);h>=c&&c>l&&(l=c,i=t[n]<t[o]?s:s.next)}s=s.next}while(s!==r);if(!i)return null;var p,d,f,v,g,m,y=t[i.i],x=t[i.i+1],b=h*x-u*y,_=h*u-u*l,E=u-u,S=h-l,w=u-x,A=y-h,C=b-_-(l*x-u*y),R=0>=C?-1:1,M=i,O=1/0;for(s=i.next;s!==M;)p=t[s.i],d=t[s.i+1],f=h-p,f>=0&&p>=y&&(v=(E*p+S*d-_)*R,v>=0&&(g=(w*p+A*d+b)*R,g>=0&&C*R-v-g>=0&&(m=Math.abs(u-d)/f,O>m&&T(t,s,e)&&(i=s,O=m)))),s=s.next;return i}function d(t,e,r,i,n){var o=e;do null===o.z&&(o.z=v(t[o.i],t[o.i+1],r,i,n)),o.prevZ=o.prev,o.nextZ=o.next,o=o.next;while(o!==e);o.prevZ.nextZ=null,o.prevZ=null,f(o)}function f(t){var e,r,i,n,o,s,a,h,u=1;do{for(r=t,t=null,o=null,s=0;r;){for(s++,i=r,a=0,e=0;u>e&&(a++,i=i.nextZ,i);e++);for(h=u;a>0||h>0&&i;)0===a?(n=i,i=i.nextZ,h--):0!==h&&i?r.z<=i.z?(n=r,r=r.nextZ,a--):(n=i,i=i.nextZ,h--):(n=r,r=r.nextZ,a--),o?o.nextZ=n:t=n,n.prevZ=o,o=n;r=i}o.nextZ=null,u*=2}while(s>1);return t}function v(t,e,r,i,n){return t=1e3*(t-r)/n,t=16711935&(t|t<<8),t=252645135&(t|t<<4),t=858993459&(t|t<<2),t=1431655765&(t|t<<1),e=1e3*(e-i)/n,e=16711935&(e|e<<8),e=252645135&(e|e<<4),e=858993459&(e|e<<2),e=1431655765&(e|e<<1),t|e<<1}function g(t,e){var r=e,i=e;do t[r.i]<t[i.i]&&(i=r),r=r.next;while(r!==e);return i}function m(t,e,r){return e.next.i!==r.i&&e.prev.i!==r.i&&!_(t,e,e.i,r.i)&&T(t,e,r)&&T(t,r,e)&&E(t,e,e.i,r.i)}function y(t,e,r,i){var n=(t[r+1]-t[e+1])*(t[i]-t[r])-(t[r]-t[e])*(t[i+1]-t[r+1]);return n>0?1:0>n?-1:0}function x(t,e,r){return t[e]===t[r]&&t[e+1]===t[r+1]}function b(t,e,r,i,n){return y(t,e,r,i)!==y(t,e,r,n)&&y(t,i,n,e)!==y(t,i,n,r);
}function _(t,e,r,i){var n=e;do{var o=n.i,s=n.next.i;if(o!==r&&s!==r&&o!==i&&s!==i&&b(t,o,s,r,i))return!0;n=n.next}while(n!==e);return!1}function T(t,e,r){return-1===y(t,e.prev.i,e.i,e.next.i)?-1!==y(t,e.i,r.i,e.next.i)&&-1!==y(t,e.i,e.prev.i,r.i):-1===y(t,e.i,r.i,e.prev.i)||-1===y(t,e.i,e.next.i,r.i)}function E(t,e,r,i){var n=e,o=!1,s=(t[r]+t[i])/2,a=(t[r+1]+t[i+1])/2;do{var h=n.i,u=n.next.i;t[h+1]>a!=t[u+1]>a&&s<(t[u]-t[h])*(a-t[h+1])/(t[u+1]-t[h+1])+t[h]&&(o=!o),n=n.next}while(n!==e);return o}function S(t,e){var r=new A(t.i),i=new A(e.i),n=t.next,o=e.prev;return t.next=e,e.prev=t,r.next=n,n.prev=r,i.next=r,r.prev=i,o.next=i,i.prev=o,i}function w(t,e){var r=new A(t);return e?(r.next=e.next,r.prev=e,e.next.prev=r,e.next=r):(r.prev=r,r.next=r),r}function A(t){this.i=t,this.prev=null,this.next=null,this.z=null,this.prevZ=null,this.nextZ=null,this.steiner=!1}e.exports=i},{}],10:[function(t,e,r){"use strict";function i(t,e,r){this.fn=t,this.context=e,this.once=r||!1}function n(){}var o="function"!=typeof Object.create?"~":!1;n.prototype._events=void 0,n.prototype.listeners=function(t,e){var r=o?o+t:t,i=this._events&&this._events[r];if(e)return!!i;if(!i)return[];if(i.fn)return[i.fn];for(var n=0,s=i.length,a=new Array(s);s>n;n++)a[n]=i[n].fn;return a},n.prototype.emit=function(t,e,r,i,n,s){var a=o?o+t:t;if(!this._events||!this._events[a])return!1;var h,u,l=this._events[a],c=arguments.length;if("function"==typeof l.fn){switch(l.once&&this.removeListener(t,l.fn,void 0,!0),c){case 1:return l.fn.call(l.context),!0;case 2:return l.fn.call(l.context,e),!0;case 3:return l.fn.call(l.context,e,r),!0;case 4:return l.fn.call(l.context,e,r,i),!0;case 5:return l.fn.call(l.context,e,r,i,n),!0;case 6:return l.fn.call(l.context,e,r,i,n,s),!0}for(u=1,h=new Array(c-1);c>u;u++)h[u-1]=arguments[u];l.fn.apply(l.context,h)}else{var p,d=l.length;for(u=0;d>u;u++)switch(l[u].once&&this.removeListener(t,l[u].fn,void 0,!0),c){case 1:l[u].fn.call(l[u].context);break;case 2:l[u].fn.call(l[u].context,e);break;case 3:l[u].fn.call(l[u].context,e,r);break;default:if(!h)for(p=1,h=new Array(c-1);c>p;p++)h[p-1]=arguments[p];l[u].fn.apply(l[u].context,h)}}return!0},n.prototype.on=function(t,e,r){var n=new i(e,r||this),s=o?o+t:t;return this._events||(this._events=o?{}:Object.create(null)),this._events[s]?this._events[s].fn?this._events[s]=[this._events[s],n]:this._events[s].push(n):this._events[s]=n,this},n.prototype.once=function(t,e,r){var n=new i(e,r||this,!0),s=o?o+t:t;return this._events||(this._events=o?{}:Object.create(null)),this._events[s]?this._events[s].fn?this._events[s]=[this._events[s],n]:this._events[s].push(n):this._events[s]=n,this},n.prototype.removeListener=function(t,e,r,i){var n=o?o+t:t;if(!this._events||!this._events[n])return this;var s=this._events[n],a=[];if(e)if(s.fn)(s.fn!==e||i&&!s.once||r&&s.context!==r)&&a.push(s);else for(var h=0,u=s.length;u>h;h++)(s[h].fn!==e||i&&!s[h].once||r&&s[h].context!==r)&&a.push(s[h]);return a.length?this._events[n]=1===a.length?a[0]:a:delete this._events[n],this},n.prototype.removeAllListeners=function(t){return this._events?(t?delete this._events[o?o+t:t]:this._events=o?{}:Object.create(null),this):this},n.prototype.off=n.prototype.removeListener,n.prototype.addListener=n.prototype.on,n.prototype.setMaxListeners=function(){return this},n.prefixed=o,"undefined"!=typeof e&&(e.exports=n)},{}],11:[function(t,e,r){"use strict";function i(t){if(null===t||void 0===t)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(t)}var n=Object.prototype.hasOwnProperty,o=Object.prototype.propertyIsEnumerable;e.exports=Object.assign||function(t,e){for(var r,s,a=i(t),h=1;h<arguments.length;h++){r=Object(arguments[h]);for(var u in r)n.call(r,u)&&(a[u]=r[u]);if(Object.getOwnPropertySymbols){s=Object.getOwnPropertySymbols(r);for(var l=0;l<s.length;l++)o.call(r,s[l])&&(a[s[l]]=r[s[l]])}}return a}},{}],12:[function(t,e,r){e.exports={name:"pixi.js",version:"3.0.8",description:"Pixi.js is a fast lightweight 2D library that works across all devices.",author:"Mat Groves",contributors:["Chad Engler <chad@pantherdev.com>","Richard Davey <rdavey@gmail.com>"],main:"./src/index.js",homepage:"http://goodboydigital.com/",bugs:"https://github.com/pixijs/pixi.js/issues",license:"MIT",repository:{type:"git",url:"https://github.com/pixijs/pixi.js.git"},scripts:{start:"gulp && gulp watch",test:"gulp && testem ci",build:"gulp",docs:"jsdoc -c ./gulp/util/jsdoc.conf.json -R README.md"},files:["bin/","src/","CONTRIBUTING.md","LICENSE","package.json","README.md"],dependencies:{async:"^1.4.2",brfs:"^1.4.1",earcut:"^2.0.2",eventemitter3:"^1.1.1","gulp-header":"^1.7.1","object-assign":"^4.0.1","resource-loader":"^1.6.2"},devDependencies:{browserify:"^11.1.0",chai:"^3.2.0",del:"^2.0.2",gulp:"^3.9.0","gulp-cached":"^1.1.0","gulp-concat":"^2.6.0","gulp-debug":"^2.1.0","gulp-jshint":"^1.11.2","gulp-mirror":"^0.4.0","gulp-plumber":"^1.0.1","gulp-rename":"^1.2.2","gulp-sourcemaps":"^1.5.2","gulp-uglify":"^1.4.1","gulp-util":"^3.0.6","jaguarjs-jsdoc":"git+https://github.com/davidshimjs/jaguarjs-jsdoc.git",jsdoc:"^3.3.2","jshint-summary":"^0.4.0",minimist:"^1.2.0",mocha:"^2.3.2","require-dir":"^0.3.0","run-sequence":"^1.1.2",testem:"^0.9.4","vinyl-buffer":"^1.0.0","vinyl-source-stream":"^1.1.0",watchify:"^3.4.0"},browserify:{transform:["brfs"]}}},{}],13:[function(t,e,r){var i={VERSION:t("../../package.json").version,PI_2:2*Math.PI,RAD_TO_DEG:180/Math.PI,DEG_TO_RAD:Math.PI/180,TARGET_FPMS:.06,RENDERER_TYPE:{UNKNOWN:0,WEBGL:1,CANVAS:2},BLEND_MODES:{NORMAL:0,ADD:1,MULTIPLY:2,SCREEN:3,OVERLAY:4,DARKEN:5,LIGHTEN:6,COLOR_DODGE:7,COLOR_BURN:8,HARD_LIGHT:9,SOFT_LIGHT:10,DIFFERENCE:11,EXCLUSION:12,HUE:13,SATURATION:14,COLOR:15,LUMINOSITY:16},DRAW_MODES:{POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},SCALE_MODES:{DEFAULT:0,LINEAR:0,NEAREST:1},RETINA_PREFIX:/@(.+)x/,RESOLUTION:1,FILTER_RESOLUTION:1,DEFAULT_RENDER_OPTIONS:{view:null,resolution:1,antialias:!1,forceFXAA:!1,autoResize:!1,transparent:!1,backgroundColor:0,clearBeforeRender:!0,preserveDrawingBuffer:!1,roundPixels:!1},SHAPES:{POLY:0,RECT:1,CIRC:2,ELIP:3,RREC:4},SPRITE_BATCH_SIZE:2e3};e.exports=i},{"../../package.json":12}],14:[function(t,e,r){function i(){o.call(this),this.children=[]}var n=t("../math"),o=t("./DisplayObject"),s=t("../textures/RenderTexture"),a=new n.Matrix;i.prototype=Object.create(o.prototype),i.prototype.constructor=i,e.exports=i,Object.defineProperties(i.prototype,{width:{get:function(){return this.scale.x*this.getLocalBounds().width},set:function(t){var e=this.getLocalBounds().width;0!==e?this.scale.x=t/e:this.scale.x=1,this._width=t}},height:{get:function(){return this.scale.y*this.getLocalBounds().height},set:function(t){var e=this.getLocalBounds().height;0!==e?this.scale.y=t/e:this.scale.y=1,this._height=t}}}),i.prototype.onChildrenChange=function(){},i.prototype.addChild=function(t){return this.addChildAt(t,this.children.length)},i.prototype.addChildAt=function(t,e){if(t===this)return t;if(e>=0&&e<=this.children.length)return t.parent&&t.parent.removeChild(t),t.parent=this,this.children.splice(e,0,t),this.onChildrenChange(e),t.emit("added",this),t;throw new Error(t+"addChildAt: The index "+e+" supplied is out of bounds "+this.children.length)},i.prototype.swapChildren=function(t,e){if(t!==e){var r=this.getChildIndex(t),i=this.getChildIndex(e);if(0>r||0>i)throw new Error("swapChildren: Both the supplied DisplayObjects must be children of the caller.");this.children[r]=e,this.children[i]=t,this.onChildrenChange(i>r?r:i)}},i.prototype.getChildIndex=function(t){var e=this.children.indexOf(t);if(-1===e)throw new Error("The supplied DisplayObject must be a child of the caller");return e},i.prototype.setChildIndex=function(t,e){if(0>e||e>=this.children.length)throw new Error("The supplied index is out of bounds");var r=this.getChildIndex(t);this.children.splice(r,1),this.children.splice(e,0,t),this.onChildrenChange(e)},i.prototype.getChildAt=function(t){if(0>t||t>=this.children.length)throw new Error("getChildAt: Supplied index "+t+" does not exist in the child list, or the supplied DisplayObject is not a child of the caller");return this.children[t]},i.prototype.removeChild=function(t){var e=this.children.indexOf(t);if(-1!==e)return this.removeChildAt(e)},i.prototype.removeChildAt=function(t){var e=this.getChildAt(t);return e.parent=null,this.children.splice(t,1),this.onChildrenChange(t),e.emit("removed",this),e},i.prototype.removeChildren=function(t,e){var r,i,n=t||0,o="number"==typeof e?e:this.children.length,s=o-n;if(s>0&&o>=s){for(r=this.children.splice(n,s),i=0;i<r.length;++i)r[i].parent=null;for(this.onChildrenChange(t),i=0;i<r.length;++i)r[i].emit("removed",this);return r}if(0===s&&0===this.children.length)return[];throw new RangeError("removeChildren: numeric values are outside the acceptable range.")},i.prototype.generateTexture=function(t,e,r){var i=this.getLocalBounds(),n=new s(t,0|i.width,0|i.height,r,e);return a.tx=-i.x,a.ty=-i.y,n.render(this,a),n},i.prototype.updateTransform=function(){if(this.visible){this.displayObjectUpdateTransform();for(var t=0,e=this.children.length;e>t;++t)this.children[t].updateTransform()}},i.prototype.containerUpdateTransform=i.prototype.updateTransform,i.prototype.getBounds=function(){if(!this._currentBounds){if(0===this.children.length)return n.Rectangle.EMPTY;for(var t,e,r,i=1/0,o=1/0,s=-(1/0),a=-(1/0),h=!1,u=0,l=this.children.length;l>u;++u){var c=this.children[u];c.visible&&(h=!0,t=this.children[u].getBounds(),i=i<t.x?i:t.x,o=o<t.y?o:t.y,e=t.width+t.x,r=t.height+t.y,s=s>e?s:e,a=a>r?a:r)}if(!h)return n.Rectangle.EMPTY;var p=this._bounds;p.x=i,p.y=o,p.width=s-i,p.height=a-o,this._currentBounds=p}return this._currentBounds},i.prototype.containerGetBounds=i.prototype.getBounds,i.prototype.getLocalBounds=function(){var t=this.worldTransform;this.worldTransform=n.Matrix.IDENTITY;for(var e=0,r=this.children.length;r>e;++e)this.children[e].updateTransform();return this.worldTransform=t,this._currentBounds=null,this.getBounds(n.Matrix.IDENTITY)},i.prototype.renderWebGL=function(t){if(this.visible&&!(this.worldAlpha<=0)&&this.renderable){var e,r;if(this._mask||this._filters){for(t.currentRenderer.flush(),this._filters&&this._filters.length&&t.filterManager.pushFilter(this,this._filters),this._mask&&t.maskManager.pushMask(this,this._mask),t.currentRenderer.start(),this._renderWebGL(t),e=0,r=this.children.length;r>e;e++)this.children[e].renderWebGL(t);t.currentRenderer.flush(),this._mask&&t.maskManager.popMask(this,this._mask),this._filters&&t.filterManager.popFilter(),t.currentRenderer.start()}else for(this._renderWebGL(t),e=0,r=this.children.length;r>e;++e)this.children[e].renderWebGL(t)}},i.prototype._renderWebGL=function(t){},i.prototype._renderCanvas=function(t){},i.prototype.renderCanvas=function(t){if(this.visible&&!(this.alpha<=0)&&this.renderable){this._mask&&t.maskManager.pushMask(this._mask,t),this._renderCanvas(t);for(var e=0,r=this.children.length;r>e;++e)this.children[e].renderCanvas(t);this._mask&&t.maskManager.popMask(t)}},i.prototype.destroy=function(t){if(o.prototype.destroy.call(this),t)for(var e=0,r=this.children.length;r>e;++e)this.children[e].destroy(t);this.removeChildren(),this.children=null}},{"../math":23,"../textures/RenderTexture":61,"./DisplayObject":15}],15:[function(t,e,r){function i(){s.call(this),this.position=new n.Point,this.scale=new n.Point(1,1),this.pivot=new n.Point(0,0),this.rotation=0,this.alpha=1,this.visible=!0,this.renderable=!0,this.parent=null,this.worldAlpha=1,this.worldTransform=new n.Matrix,this.filterArea=null,this._sr=0,this._cr=1,this._bounds=new n.Rectangle(0,0,1,1),this._currentBounds=null,this._mask=null}var n=t("../math"),o=t("../textures/RenderTexture"),s=t("eventemitter3"),a=t("../const"),h=new n.Matrix,u={worldTransform:new n.Matrix,worldAlpha:1,children:[]};i.prototype=Object.create(s.prototype),i.prototype.constructor=i,e.exports=i,Object.defineProperties(i.prototype,{x:{get:function(){return this.position.x},set:function(t){this.position.x=t}},y:{get:function(){return this.position.y},set:function(t){this.position.y=t}},worldVisible:{get:function(){var t=this;do{if(!t.visible)return!1;t=t.parent}while(t);return!0}},mask:{get:function(){return this._mask},set:function(t){this._mask&&(this._mask.renderable=!0),this._mask=t,this._mask&&(this._mask.renderable=!1)}},filters:{get:function(){return this._filters&&this._filters.slice()},set:function(t){this._filters=t&&t.slice()}}}),i.prototype.updateTransform=function(){var t,e,r,i,n,o,s=this.parent.worldTransform,h=this.worldTransform;this.rotation%a.PI_2?(this.rotation!==this.rotationCache&&(this.rotationCache=this.rotation,this._sr=Math.sin(this.rotation),this._cr=Math.cos(this.rotation)),t=this._cr*this.scale.x,e=this._sr*this.scale.x,r=-this._sr*this.scale.y,i=this._cr*this.scale.y,n=this.position.x,o=this.position.y,(this.pivot.x||this.pivot.y)&&(n-=this.pivot.x*t+this.pivot.y*r,o-=this.pivot.x*e+this.pivot.y*i),h.a=t*s.a+e*s.c,h.b=t*s.b+e*s.d,h.c=r*s.a+i*s.c,h.d=r*s.b+i*s.d,h.tx=n*s.a+o*s.c+s.tx,h.ty=n*s.b+o*s.d+s.ty):(t=this.scale.x,i=this.scale.y,n=this.position.x-this.pivot.x*t,o=this.position.y-this.pivot.y*i,h.a=t*s.a,h.b=t*s.b,h.c=i*s.c,h.d=i*s.d,h.tx=n*s.a+o*s.c+s.tx,h.ty=n*s.b+o*s.d+s.ty),this.worldAlpha=this.alpha*this.parent.worldAlpha,this._currentBounds=null},i.prototype.displayObjectUpdateTransform=i.prototype.updateTransform,i.prototype.getBounds=function(t){return n.Rectangle.EMPTY},i.prototype.getLocalBounds=function(){return this.getBounds(n.Matrix.IDENTITY)},i.prototype.toGlobal=function(t){return this.parent?this.displayObjectUpdateTransform():(this.parent=u,this.displayObjectUpdateTransform(),this.parent=null),this.worldTransform.apply(t)},i.prototype.toLocal=function(t,e){return e&&(t=e.toGlobal(t)),this.parent?this.displayObjectUpdateTransform():(this.parent=u,this.displayObjectUpdateTransform(),this.parent=null),this.worldTransform.applyInverse(t)},i.prototype.renderWebGL=function(t){},i.prototype.renderCanvas=function(t){},i.prototype.generateTexture=function(t,e,r){var i=this.getLocalBounds(),n=new o(t,0|i.width,0|i.height,e,r);return h.tx=-i.x,h.ty=-i.y,n.render(this,h),n},i.prototype.setParent=function(t){if(!t||!t.addChild)throw new Error("setParent: Argument must be a Container");return t.addChild(this),t},i.prototype.destroy=function(){this.position=null,this.scale=null,this.pivot=null,this.parent=null,this._bounds=null,this._currentBounds=null,this._mask=null,this.worldTransform=null,this.filterArea=null}},{"../const":13,"../math":23,"../textures/RenderTexture":61,eventemitter3:10}],16:[function(t,e,r){function i(){n.call(this),this.fillAlpha=1,this.lineWidth=0,this.lineColor=0,this.graphicsData=[],this.tint=16777215,this._prevTint=16777215,this.blendMode=l.BLEND_MODES.NORMAL,this.currentPath=null,this._webGL={},this.isMask=!1,this.boundsPadding=0,this._localBounds=new u.Rectangle(0,0,1,1),this.dirty=!0,this.glDirty=!1,this.boundsDirty=!0,this.cachedSpriteDirty=!1}var n=t("../display/Container"),o=t("../textures/Texture"),s=t("../renderers/canvas/utils/CanvasBuffer"),a=t("../renderers/canvas/utils/CanvasGraphics"),h=t("./GraphicsData"),u=t("../math"),l=t("../const"),c=new u.Point;i.prototype=Object.create(n.prototype),i.prototype.constructor=i,e.exports=i,i.prototype.clone=function(){var t=new i;t.renderable=this.renderable,t.fillAlpha=this.fillAlpha,t.lineWidth=this.lineWidth,t.lineColor=this.lineColor,t.tint=this.tint,t.blendMode=this.blendMode,t.isMask=this.isMask,t.boundsPadding=this.boundsPadding,t.dirty=!0,t.glDirty=!0,t.cachedSpriteDirty=this.cachedSpriteDirty;for(var e=0;e<this.graphicsData.length;++e)t.graphicsData.push(this.graphicsData[e].clone());return t.currentPath=t.graphicsData[t.graphicsData.length-1],t.updateLocalBounds(),t},i.prototype.lineStyle=function(t,e,r){if(this.lineWidth=t||0,this.lineColor=e||0,this.lineAlpha=void 0===r?1:r,this.currentPath)if(this.currentPath.shape.points.length){var i=new u.Polygon(this.currentPath.shape.points.slice(-2));i.closed=!1,this.drawShape(i)}else this.currentPath.lineWidth=this.lineWidth,this.currentPath.lineColor=this.lineColor,this.currentPath.lineAlpha=this.lineAlpha;return this},i.prototype.moveTo=function(t,e){var r=new u.Polygon([t,e]);return r.closed=!1,this.drawShape(r),this},i.prototype.lineTo=function(t,e){return this.currentPath.shape.points.push(t,e),this.dirty=!0,this},i.prototype.quadraticCurveTo=function(t,e,r,i){this.currentPath?0===this.currentPath.shape.points.length&&(this.currentPath.shape.points=[0,0]):this.moveTo(0,0);var n,o,s=20,a=this.currentPath.shape.points;0===a.length&&this.moveTo(0,0);for(var h=a[a.length-2],u=a[a.length-1],l=0,c=1;s>=c;++c)l=c/s,n=h+(t-h)*l,o=u+(e-u)*l,a.push(n+(t+(r-t)*l-n)*l,o+(e+(i-e)*l-o)*l);return this.dirty=this.boundsDirty=!0,this},i.prototype.bezierCurveTo=function(t,e,r,i,n,o){this.currentPath?0===this.currentPath.shape.points.length&&(this.currentPath.shape.points=[0,0]):this.moveTo(0,0);for(var s,a,h,u,l,c=20,p=this.currentPath.shape.points,d=p[p.length-2],f=p[p.length-1],v=0,g=1;c>=g;++g)v=g/c,s=1-v,a=s*s,h=a*s,u=v*v,l=u*v,p.push(h*d+3*a*v*t+3*s*u*r+l*n,h*f+3*a*v*e+3*s*u*i+l*o);return this.dirty=this.boundsDirty=!0,this},i.prototype.arcTo=function(t,e,r,i,n){this.currentPath?0===this.currentPath.shape.points.length&&this.currentPath.shape.points.push(t,e):this.moveTo(t,e);var o=this.currentPath.shape.points,s=o[o.length-2],a=o[o.length-1],h=a-e,u=s-t,l=i-e,c=r-t,p=Math.abs(h*c-u*l);if(1e-8>p||0===n)(o[o.length-2]!==t||o[o.length-1]!==e)&&o.push(t,e);else{var d=h*h+u*u,f=l*l+c*c,v=h*l+u*c,g=n*Math.sqrt(d)/p,m=n*Math.sqrt(f)/p,y=g*v/d,x=m*v/f,b=g*c+m*u,_=g*l+m*h,T=u*(m+y),E=h*(m+y),S=c*(g+x),w=l*(g+x),A=Math.atan2(E-_,T-b),C=Math.atan2(w-_,S-b);this.arc(b+t,_+e,n,A,C,u*l>c*h)}return this.dirty=this.boundsDirty=!0,this},i.prototype.arc=function(t,e,r,i,n,o){if(o=o||!1,i===n)return this;!o&&i>=n?n+=2*Math.PI:o&&n>=i&&(i+=2*Math.PI);var s=o?-1*(i-n):n-i,a=40*Math.ceil(Math.abs(s)/(2*Math.PI));if(0===s)return this;var h=t+Math.cos(i)*r,u=e+Math.sin(i)*r;this.currentPath?this.currentPath.shape.points.push(h,u):this.moveTo(h,u);for(var l=this.currentPath.shape.points,c=s/(2*a),p=2*c,d=Math.cos(c),f=Math.sin(c),v=a-1,g=v%1/v,m=0;v>=m;m++){var y=m+g*m,x=c+i+p*y,b=Math.cos(x),_=-Math.sin(x);l.push((d*b+f*_)*r+t,(d*-_+f*b)*r+e)}return this.dirty=this.boundsDirty=!0,this},i.prototype.beginFill=function(t,e){return this.filling=!0,this.fillColor=t||0,this.fillAlpha=void 0===e?1:e,this.currentPath&&this.currentPath.shape.points.length<=2&&(this.currentPath.fill=this.filling,this.currentPath.fillColor=this.fillColor,this.currentPath.fillAlpha=this.fillAlpha),this},i.prototype.endFill=function(){return this.filling=!1,this.fillColor=null,this.fillAlpha=1,this},i.prototype.drawRect=function(t,e,r,i){return this.drawShape(new u.Rectangle(t,e,r,i)),this},i.prototype.drawRoundedRect=function(t,e,r,i,n){return this.drawShape(new u.RoundedRectangle(t,e,r,i,n)),this},i.prototype.drawCircle=function(t,e,r){return this.drawShape(new u.Circle(t,e,r)),this},i.prototype.drawEllipse=function(t,e,r,i){return this.drawShape(new u.Ellipse(t,e,r,i)),this},i.prototype.drawPolygon=function(t){var e=t,r=!0;if(e instanceof u.Polygon&&(r=e.closed,e=e.points),!Array.isArray(e)){e=new Array(arguments.length);for(var i=0;i<e.length;++i)e[i]=arguments[i]}var n=new u.Polygon(e);return n.closed=r,this.drawShape(n),this},i.prototype.clear=function(){return this.lineWidth=0,this.filling=!1,this.dirty=!0,this.clearDirty=!0,this.graphicsData=[],this},i.prototype.generateTexture=function(t,e,r){e=e||1;var i=this.getLocalBounds(),n=new s(i.width*e,i.height*e),h=o.fromCanvas(n.canvas,r);return h.baseTexture.resolution=e,n.context.scale(e,e),n.context.translate(-i.x,-i.y),a.renderGraphics(this,n.context),h},i.prototype._renderWebGL=function(t){this.glDirty&&(this.dirty=!0,this.glDirty=!1),t.setObjectRenderer(t.plugins.graphics),t.plugins.graphics.render(this)},i.prototype._renderCanvas=function(t){if(this.isMask!==!0){this._prevTint!==this.tint&&(this.dirty=!0);var e=t.context,r=this.worldTransform,i=t.blendModes[this.blendMode];i!==e.globalCompositeOperation&&(e.globalCompositeOperation=i);var n=t.resolution;e.setTransform(r.a*n,r.b*n,r.c*n,r.d*n,r.tx*n,r.ty*n),a.renderGraphics(this,e)}},i.prototype.getBounds=function(t){if(!this._currentBounds){if(!this.renderable)return u.Rectangle.EMPTY;this.boundsDirty&&(this.updateLocalBounds(),this.glDirty=!0,this.cachedSpriteDirty=!0,this.boundsDirty=!1);var e=this._localBounds,r=e.x,i=e.width+e.x,n=e.y,o=e.height+e.y,s=t||this.worldTransform,a=s.a,h=s.b,l=s.c,c=s.d,p=s.tx,d=s.ty,f=a*i+l*o+p,v=c*o+h*i+d,g=a*r+l*o+p,m=c*o+h*r+d,y=a*r+l*n+p,x=c*n+h*r+d,b=a*i+l*n+p,_=c*n+h*i+d,T=f,E=v,S=f,w=v;S=S>g?g:S,S=S>y?y:S,S=S>b?b:S,w=w>m?m:w,w=w>x?x:w,w=w>_?_:w,T=g>T?g:T,T=y>T?y:T,T=b>T?b:T,E=m>E?m:E,E=x>E?x:E,E=_>E?_:E,this._bounds.x=S,this._bounds.width=T-S,this._bounds.y=w,this._bounds.height=E-w,this._currentBounds=this._bounds}return this._currentBounds},i.prototype.containsPoint=function(t){this.worldTransform.applyInverse(t,c);for(var e=this.graphicsData,r=0;r<e.length;r++){var i=e[r];if(i.fill&&i.shape&&i.shape.contains(c.x,c.y))return!0}return!1},i.prototype.updateLocalBounds=function(){var t=1/0,e=-(1/0),r=1/0,i=-(1/0);if(this.graphicsData.length)for(var n,o,s,a,h,u,c=0;c<this.graphicsData.length;c++){var p=this.graphicsData[c],d=p.type,f=p.lineWidth;if(n=p.shape,d===l.SHAPES.RECT||d===l.SHAPES.RREC)s=n.x-f/2,a=n.y-f/2,h=n.width+f,u=n.height+f,t=t>s?s:t,e=s+h>e?s+h:e,r=r>a?a:r,i=a+u>i?a+u:i;else if(d===l.SHAPES.CIRC)s=n.x,a=n.y,h=n.radius+f/2,u=n.radius+f/2,t=t>s-h?s-h:t,e=s+h>e?s+h:e,r=r>a-u?a-u:r,i=a+u>i?a+u:i;else if(d===l.SHAPES.ELIP)s=n.x,a=n.y,h=n.width+f/2,u=n.height+f/2,t=t>s-h?s-h:t,e=s+h>e?s+h:e,r=r>a-u?a-u:r,i=a+u>i?a+u:i;else{o=n.points;for(var v=0;v<o.length;v+=2)s=o[v],a=o[v+1],t=t>s-f?s-f:t,e=s+f>e?s+f:e,r=r>a-f?a-f:r,i=a+f>i?a+f:i}}else t=0,e=0,r=0,i=0;var g=this.boundsPadding;this._localBounds.x=t-g,this._localBounds.width=e-t+2*g,this._localBounds.y=r-g,this._localBounds.height=i-r+2*g},i.prototype.drawShape=function(t){this.currentPath&&this.currentPath.shape.points.length<=2&&this.graphicsData.pop(),this.currentPath=null;var e=new h(this.lineWidth,this.lineColor,this.lineAlpha,this.fillColor,this.fillAlpha,this.filling,t);return this.graphicsData.push(e),e.type===l.SHAPES.POLY&&(e.shape.closed=e.shape.closed||this.filling,this.currentPath=e),this.dirty=this.boundsDirty=!0,e},i.prototype.destroy=function(){n.prototype.destroy.apply(this,arguments);for(var t=0;t<this.graphicsData.length;++t)this.graphicsData[t].destroy();for(var e in this._webgl)for(var r=0;r<this._webgl[e].data.length;++r)this._webgl[e].data[r].destroy();this.graphicsData=null,this.currentPath=null,this._webgl=null,this._localBounds=null}},{"../const":13,"../display/Container":14,"../math":23,"../renderers/canvas/utils/CanvasBuffer":35,"../renderers/canvas/utils/CanvasGraphics":36,"../textures/Texture":62,"./GraphicsData":17}],17:[function(t,e,r){function i(t,e,r,i,n,o,s){this.lineWidth=t,this.lineColor=e,this.lineAlpha=r,this._lineTint=e,this.fillColor=i,this.fillAlpha=n,this._fillTint=i,this.fill=o,this.shape=s,this.type=s.type}i.prototype.constructor=i,e.exports=i,i.prototype.clone=function(){return new i(this.lineWidth,this.lineColor,this.lineAlpha,this.fillColor,this.fillAlpha,this.fill,this.shape)},i.prototype.destroy=function(){this.shape=null}},{}],18:[function(t,e,r){function i(t){a.call(this,t),this.graphicsDataPool=[],this.primitiveShader=null,this.complexPrimitiveShader=null,this.maximumSimplePolySize=200}var n=t("../../utils"),o=t("../../math"),s=t("../../const"),a=t("../../renderers/webgl/utils/ObjectRenderer"),h=t("../../renderers/webgl/WebGLRenderer"),u=t("./WebGLGraphicsData"),l=t("earcut");i.prototype=Object.create(a.prototype),i.prototype.constructor=i,e.exports=i,h.registerPlugin("graphics",i),i.prototype.onContextChange=function(){},i.prototype.destroy=function(){a.prototype.destroy.call(this);for(var t=0;t<this.graphicsDataPool.length;++t)this.graphicsDataPool[t].destroy();this.graphicsDataPool=null},i.prototype.render=function(t){var e,r=this.renderer,i=r.gl,o=r.shaderManager.plugins.primitiveShader;t.dirty&&this.updateGraphics(t);var s=t._webGL[i.id];r.blendModeManager.setBlendMode(t.blendMode);for(var a=0,h=s.data.length;h>a;a++)e=s.data[a],1===s.data[a].mode?(r.stencilManager.pushStencil(t,e),i.uniform1f(r.shaderManager.complexPrimitiveShader.uniforms.alpha._location,t.worldAlpha*e.alpha),i.drawElements(i.TRIANGLE_FAN,4,i.UNSIGNED_SHORT,2*(e.indices.length-4)),r.stencilManager.popStencil(t,e)):(o=r.shaderManager.primitiveShader,r.shaderManager.setShader(o),i.uniformMatrix3fv(o.uniforms.translationMatrix._location,!1,t.worldTransform.toArray(!0)),i.uniformMatrix3fv(o.uniforms.projectionMatrix._location,!1,r.currentRenderTarget.projectionMatrix.toArray(!0)),i.uniform3fv(o.uniforms.tint._location,n.hex2rgb(t.tint)),i.uniform1f(o.uniforms.alpha._location,t.worldAlpha),i.bindBuffer(i.ARRAY_BUFFER,e.buffer),i.vertexAttribPointer(o.attributes.aVertexPosition,2,i.FLOAT,!1,24,0),i.vertexAttribPointer(o.attributes.aColor,4,i.FLOAT,!1,24,8),i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.indexBuffer),i.drawElements(i.TRIANGLE_STRIP,e.indices.length,i.UNSIGNED_SHORT,0)),r.drawCount++},i.prototype.updateGraphics=function(t){var e=this.renderer.gl,r=t._webGL[e.id];r||(r=t._webGL[e.id]={lastIndex:0,data:[],gl:e}),t.dirty=!1;var i;if(t.clearDirty){for(t.clearDirty=!1,i=0;i<r.data.length;i++){var n=r.data[i];n.reset(),this.graphicsDataPool.push(n)}r.data=[],r.lastIndex=0}var o;for(i=r.lastIndex;i<t.graphicsData.length;i++){var a=t.graphicsData[i];if(a.type===s.SHAPES.POLY){if(a.points=a.shape.points.slice(),a.shape.closed&&(a.points[0]!==a.points[a.points.length-2]||a.points[1]!==a.points[a.points.length-1])&&a.points.push(a.points[0],a.points[1]),a.fill&&a.points.length>=6)if(a.points.length<2*this.maximumSimplePolySize){o=this.switchMode(r,0);var h=this.buildPoly(a,o);h||(o=this.switchMode(r,1),this.buildComplexPoly(a,o))}else o=this.switchMode(r,1),this.buildComplexPoly(a,o);a.lineWidth>0&&(o=this.switchMode(r,0),this.buildLine(a,o))}else o=this.switchMode(r,0),a.type===s.SHAPES.RECT?this.buildRectangle(a,o):a.type===s.SHAPES.CIRC||a.type===s.SHAPES.ELIP?this.buildCircle(a,o):a.type===s.SHAPES.RREC&&this.buildRoundedRectangle(a,o);r.lastIndex++}for(i=0;i<r.data.length;i++)o=r.data[i],o.dirty&&o.upload()},i.prototype.switchMode=function(t,e){var r;return t.data.length?(r=t.data[t.data.length-1],(r.points.length>32e4||r.mode!==e||1===e)&&(r=this.graphicsDataPool.pop()||new u(t.gl),r.mode=e,t.data.push(r))):(r=this.graphicsDataPool.pop()||new u(t.gl),r.mode=e,t.data.push(r)),r.dirty=!0,r},i.prototype.buildRectangle=function(t,e){var r=t.shape,i=r.x,o=r.y,s=r.width,a=r.height;if(t.fill){var h=n.hex2rgb(t.fillColor),u=t.fillAlpha,l=h[0]*u,c=h[1]*u,p=h[2]*u,d=e.points,f=e.indices,v=d.length/6;d.push(i,o),d.push(l,c,p,u),d.push(i+s,o),d.push(l,c,p,u),d.push(i,o+a),d.push(l,c,p,u),d.push(i+s,o+a),d.push(l,c,p,u),f.push(v,v,v+1,v+2,v+3,v+3)}if(t.lineWidth){var g=t.points;t.points=[i,o,i+s,o,i+s,o+a,i,o+a,i,o],this.buildLine(t,e),t.points=g}},i.prototype.buildRoundedRectangle=function(t,e){var r=t.shape,i=r.x,o=r.y,s=r.width,a=r.height,h=r.radius,u=[];if(u.push(i,o+h),this.quadraticBezierCurve(i,o+a-h,i,o+a,i+h,o+a,u),this.quadraticBezierCurve(i+s-h,o+a,i+s,o+a,i+s,o+a-h,u),this.quadraticBezierCurve(i+s,o+h,i+s,o,i+s-h,o,u),this.quadraticBezierCurve(i+h,o,i,o,i,o+h+1e-10,u),t.fill){var c=n.hex2rgb(t.fillColor),p=t.fillAlpha,d=c[0]*p,f=c[1]*p,v=c[2]*p,g=e.points,m=e.indices,y=g.length/6,x=l(u,null,2),b=0;for(b=0;b<x.length;b+=3)m.push(x[b]+y),m.push(x[b]+y),m.push(x[b+1]+y),m.push(x[b+2]+y),m.push(x[b+2]+y);for(b=0;b<u.length;b++)g.push(u[b],u[++b],d,f,v,p)}if(t.lineWidth){var _=t.points;t.points=u,this.buildLine(t,e),t.points=_}},i.prototype.quadraticBezierCurve=function(t,e,r,i,n,o,s){function a(t,e,r){var i=e-t;return t+i*r}for(var h,u,l,c,p,d,f=20,v=s||[],g=0,m=0;f>=m;m++)g=m/f,h=a(t,r,g),u=a(e,i,g),l=a(r,n,g),c=a(i,o,g),p=a(h,l,g),d=a(u,c,g),v.push(p,d);return v},i.prototype.buildCircle=function(t,e){var r,i,o=t.shape,a=o.x,h=o.y;t.type===s.SHAPES.CIRC?(r=o.radius,i=o.radius):(r=o.width,i=o.height);var u=Math.floor(30*Math.sqrt(o.radius))||Math.floor(15*Math.sqrt(o.width+o.height)),l=2*Math.PI/u,c=0;if(t.fill){var p=n.hex2rgb(t.fillColor),d=t.fillAlpha,f=p[0]*d,v=p[1]*d,g=p[2]*d,m=e.points,y=e.indices,x=m.length/6;for(y.push(x),c=0;u+1>c;c++)m.push(a,h,f,v,g,d),m.push(a+Math.sin(l*c)*r,h+Math.cos(l*c)*i,f,v,g,d),y.push(x++,x++);y.push(x-1)}if(t.lineWidth){var b=t.points;for(t.points=[],c=0;u+1>c;c++)t.points.push(a+Math.sin(l*c)*r,h+Math.cos(l*c)*i);this.buildLine(t,e),t.points=b}},i.prototype.buildLine=function(t,e){var r=0,i=t.points;if(0!==i.length){var s=new o.Point(i[0],i[1]),a=new o.Point(i[i.length-2],i[i.length-1]);if(s.x===a.x&&s.y===a.y){i=i.slice(),i.pop(),i.pop(),a=new o.Point(i[i.length-2],i[i.length-1]);var h=a.x+.5*(s.x-a.x),u=a.y+.5*(s.y-a.y);i.unshift(h,u),i.push(h,u)}var l,c,p,d,f,v,g,m,y,x,b,_,T,E,S,w,A,C,R,M,O,P,F,D=e.points,B=e.indices,L=i.length/2,I=i.length,N=D.length/6,U=t.lineWidth/2,k=n.hex2rgb(t.lineColor),j=t.lineAlpha,X=k[0]*j,Y=k[1]*j,G=k[2]*j;for(p=i[0],d=i[1],f=i[2],v=i[3],y=-(d-v),x=p-f,F=Math.sqrt(y*y+x*x),y/=F,x/=F,y*=U,x*=U,D.push(p-y,d-x,X,Y,G,j),D.push(p+y,d+x,X,Y,G,j),r=1;L-1>r;r++)p=i[2*(r-1)],d=i[2*(r-1)+1],f=i[2*r],v=i[2*r+1],g=i[2*(r+1)],m=i[2*(r+1)+1],y=-(d-v),x=p-f,F=Math.sqrt(y*y+x*x),y/=F,x/=F,y*=U,x*=U,b=-(v-m),_=f-g,F=Math.sqrt(b*b+_*_),b/=F,_/=F,b*=U,_*=U,S=-x+d-(-x+v),w=-y+f-(-y+p),A=(-y+p)*(-x+v)-(-y+f)*(-x+d),C=-_+m-(-_+v),R=-b+f-(-b+g),M=(-b+g)*(-_+v)-(-b+f)*(-_+m),O=S*R-C*w,Math.abs(O)<.1?(O+=10.1,D.push(f-y,v-x,X,Y,G,j),D.push(f+y,v+x,X,Y,G,j)):(l=(w*M-R*A)/O,c=(C*A-S*M)/O,P=(l-f)*(l-f)+(c-v)+(c-v),P>19600?(T=y-b,E=x-_,F=Math.sqrt(T*T+E*E),T/=F,E/=F,T*=U,E*=U,D.push(f-T,v-E),D.push(X,Y,G,j),D.push(f+T,v+E),D.push(X,Y,G,j),D.push(f-T,v-E),D.push(X,Y,G,j),I++):(D.push(l,c),D.push(X,Y,G,j),D.push(f-(l-f),v-(c-v)),D.push(X,Y,G,j)));for(p=i[2*(L-2)],d=i[2*(L-2)+1],f=i[2*(L-1)],v=i[2*(L-1)+1],y=-(d-v),x=p-f,F=Math.sqrt(y*y+x*x),y/=F,x/=F,y*=U,x*=U,D.push(f-y,v-x),D.push(X,Y,G,j),D.push(f+y,v+x),D.push(X,Y,G,j),B.push(N),r=0;I>r;r++)B.push(N++);B.push(N-1)}},i.prototype.buildComplexPoly=function(t,e){var r=t.points.slice();if(!(r.length<6)){var i=e.indices;e.points=r,e.alpha=t.fillAlpha,e.color=n.hex2rgb(t.fillColor);for(var o,s,a=1/0,h=-(1/0),u=1/0,l=-(1/0),c=0;c<r.length;c+=2)o=r[c],s=r[c+1],a=a>o?o:a,h=o>h?o:h,u=u>s?s:u,l=s>l?s:l;r.push(a,u,h,u,h,l,a,l);var p=r.length/2;for(c=0;p>c;c++)i.push(c)}},i.prototype.buildPoly=function(t,e){var r=t.points;if(!(r.length<6)){var i=e.points,o=e.indices,s=r.length/2,a=n.hex2rgb(t.fillColor),h=t.fillAlpha,u=a[0]*h,c=a[1]*h,p=a[2]*h,d=l(r,null,2);if(!d)return!1;var f=i.length/6,v=0;for(v=0;v<d.length;v+=3)o.push(d[v]+f),o.push(d[v]+f),o.push(d[v+1]+f),o.push(d[v+2]+f),o.push(d[v+2]+f);for(v=0;s>v;v++)i.push(r[2*v],r[2*v+1],u,c,p,h);return!0}}},{"../../const":13,"../../math":23,"../../renderers/webgl/WebGLRenderer":39,"../../renderers/webgl/utils/ObjectRenderer":53,"../../utils":67,"./WebGLGraphicsData":19,earcut:9}],19:[function(t,e,r){function i(t){this.gl=t,this.color=[0,0,0],this.points=[],this.indices=[],this.buffer=t.createBuffer(),this.indexBuffer=t.createBuffer(),this.mode=1,this.alpha=1,this.dirty=!0,this.glPoints=null,this.glIndices=null}i.prototype.constructor=i,e.exports=i,i.prototype.reset=function(){this.points.length=0,this.indices.length=0},i.prototype.upload=function(){var t=this.gl;this.glPoints=new Float32Array(this.points),t.bindBuffer(t.ARRAY_BUFFER,this.buffer),t.bufferData(t.ARRAY_BUFFER,this.glPoints,t.STATIC_DRAW),this.glIndices=new Uint16Array(this.indices),t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,this.indexBuffer),t.bufferData(t.ELEMENT_ARRAY_BUFFER,this.glIndices,t.STATIC_DRAW),this.dirty=!1},i.prototype.destroy=function(){
this.color=null,this.points=null,this.indices=null,this.gl.deleteBuffer(this.buffer),this.gl.deleteBuffer(this.indexBuffer),this.gl=null,this.buffer=null,this.indexBuffer=null,this.glPoints=null,this.glIndices=null}},{}],20:[function(t,e,r){var i=e.exports=Object.assign(t("./const"),t("./math"),{utils:t("./utils"),ticker:t("./ticker"),DisplayObject:t("./display/DisplayObject"),Container:t("./display/Container"),Sprite:t("./sprites/Sprite"),ParticleContainer:t("./particles/ParticleContainer"),SpriteRenderer:t("./sprites/webgl/SpriteRenderer"),ParticleRenderer:t("./particles/webgl/ParticleRenderer"),Text:t("./text/Text"),Graphics:t("./graphics/Graphics"),GraphicsData:t("./graphics/GraphicsData"),GraphicsRenderer:t("./graphics/webgl/GraphicsRenderer"),Texture:t("./textures/Texture"),BaseTexture:t("./textures/BaseTexture"),RenderTexture:t("./textures/RenderTexture"),VideoBaseTexture:t("./textures/VideoBaseTexture"),TextureUvs:t("./textures/TextureUvs"),CanvasRenderer:t("./renderers/canvas/CanvasRenderer"),CanvasGraphics:t("./renderers/canvas/utils/CanvasGraphics"),CanvasBuffer:t("./renderers/canvas/utils/CanvasBuffer"),WebGLRenderer:t("./renderers/webgl/WebGLRenderer"),ShaderManager:t("./renderers/webgl/managers/ShaderManager"),Shader:t("./renderers/webgl/shaders/Shader"),ObjectRenderer:t("./renderers/webgl/utils/ObjectRenderer"),RenderTarget:t("./renderers/webgl/utils/RenderTarget"),AbstractFilter:t("./renderers/webgl/filters/AbstractFilter"),FXAAFilter:t("./renderers/webgl/filters/FXAAFilter"),SpriteMaskFilter:t("./renderers/webgl/filters/SpriteMaskFilter"),autoDetectRenderer:function(t,e,r,n){return t=t||800,e=e||600,!n&&i.utils.isWebGLSupported()?new i.WebGLRenderer(t,e,r):new i.CanvasRenderer(t,e,r)}})},{"./const":13,"./display/Container":14,"./display/DisplayObject":15,"./graphics/Graphics":16,"./graphics/GraphicsData":17,"./graphics/webgl/GraphicsRenderer":18,"./math":23,"./particles/ParticleContainer":29,"./particles/webgl/ParticleRenderer":31,"./renderers/canvas/CanvasRenderer":34,"./renderers/canvas/utils/CanvasBuffer":35,"./renderers/canvas/utils/CanvasGraphics":36,"./renderers/webgl/WebGLRenderer":39,"./renderers/webgl/filters/AbstractFilter":40,"./renderers/webgl/filters/FXAAFilter":41,"./renderers/webgl/filters/SpriteMaskFilter":42,"./renderers/webgl/managers/ShaderManager":46,"./renderers/webgl/shaders/Shader":51,"./renderers/webgl/utils/ObjectRenderer":53,"./renderers/webgl/utils/RenderTarget":55,"./sprites/Sprite":57,"./sprites/webgl/SpriteRenderer":58,"./text/Text":59,"./textures/BaseTexture":60,"./textures/RenderTexture":61,"./textures/Texture":62,"./textures/TextureUvs":63,"./textures/VideoBaseTexture":64,"./ticker":66,"./utils":67}],21:[function(t,e,r){function i(){this.a=1,this.b=0,this.c=0,this.d=1,this.tx=0,this.ty=0}var n=t("./Point");i.prototype.constructor=i,e.exports=i,i.prototype.fromArray=function(t){this.a=t[0],this.b=t[1],this.c=t[3],this.d=t[4],this.tx=t[2],this.ty=t[5]},i.prototype.toArray=function(t,e){this.array||(this.array=new Float32Array(9));var r=e||this.array;return t?(r[0]=this.a,r[1]=this.b,r[2]=0,r[3]=this.c,r[4]=this.d,r[5]=0,r[6]=this.tx,r[7]=this.ty,r[8]=1):(r[0]=this.a,r[1]=this.c,r[2]=this.tx,r[3]=this.b,r[4]=this.d,r[5]=this.ty,r[6]=0,r[7]=0,r[8]=1),r},i.prototype.apply=function(t,e){e=e||new n;var r=t.x,i=t.y;return e.x=this.a*r+this.c*i+this.tx,e.y=this.b*r+this.d*i+this.ty,e},i.prototype.applyInverse=function(t,e){e=e||new n;var r=1/(this.a*this.d+this.c*-this.b),i=t.x,o=t.y;return e.x=this.d*r*i+-this.c*r*o+(this.ty*this.c-this.tx*this.d)*r,e.y=this.a*r*o+-this.b*r*i+(-this.ty*this.a+this.tx*this.b)*r,e},i.prototype.translate=function(t,e){return this.tx+=t,this.ty+=e,this},i.prototype.scale=function(t,e){return this.a*=t,this.d*=e,this.c*=t,this.b*=e,this.tx*=t,this.ty*=e,this},i.prototype.rotate=function(t){var e=Math.cos(t),r=Math.sin(t),i=this.a,n=this.c,o=this.tx;return this.a=i*e-this.b*r,this.b=i*r+this.b*e,this.c=n*e-this.d*r,this.d=n*r+this.d*e,this.tx=o*e-this.ty*r,this.ty=o*r+this.ty*e,this},i.prototype.append=function(t){var e=this.a,r=this.b,i=this.c,n=this.d;return this.a=t.a*e+t.b*i,this.b=t.a*r+t.b*n,this.c=t.c*e+t.d*i,this.d=t.c*r+t.d*n,this.tx=t.tx*e+t.ty*i+this.tx,this.ty=t.tx*r+t.ty*n+this.ty,this},i.prototype.prepend=function(t){var e=this.tx;if(1!==t.a||0!==t.b||0!==t.c||1!==t.d){var r=this.a,i=this.c;this.a=r*t.a+this.b*t.c,this.b=r*t.b+this.b*t.d,this.c=i*t.a+this.d*t.c,this.d=i*t.b+this.d*t.d}return this.tx=e*t.a+this.ty*t.c+t.tx,this.ty=e*t.b+this.ty*t.d+t.ty,this},i.prototype.invert=function(){var t=this.a,e=this.b,r=this.c,i=this.d,n=this.tx,o=t*i-e*r;return this.a=i/o,this.b=-e/o,this.c=-r/o,this.d=t/o,this.tx=(r*this.ty-i*n)/o,this.ty=-(t*this.ty-e*n)/o,this},i.prototype.identity=function(){return this.a=1,this.b=0,this.c=0,this.d=1,this.tx=0,this.ty=0,this},i.prototype.clone=function(){var t=new i;return t.a=this.a,t.b=this.b,t.c=this.c,t.d=this.d,t.tx=this.tx,t.ty=this.ty,t},i.prototype.copy=function(t){return t.a=this.a,t.b=this.b,t.c=this.c,t.d=this.d,t.tx=this.tx,t.ty=this.ty,t},i.IDENTITY=new i,i.TEMP_MATRIX=new i},{"./Point":22}],22:[function(t,e,r){function i(t,e){this.x=t||0,this.y=e||0}i.prototype.constructor=i,e.exports=i,i.prototype.clone=function(){return new i(this.x,this.y)},i.prototype.copy=function(t){this.set(t.x,t.y)},i.prototype.equals=function(t){return t.x===this.x&&t.y===this.y},i.prototype.set=function(t,e){this.x=t||0,this.y=e||(0!==e?this.x:0)}},{}],23:[function(t,e,r){e.exports={Point:t("./Point"),Matrix:t("./Matrix"),Circle:t("./shapes/Circle"),Ellipse:t("./shapes/Ellipse"),Polygon:t("./shapes/Polygon"),Rectangle:t("./shapes/Rectangle"),RoundedRectangle:t("./shapes/RoundedRectangle")}},{"./Matrix":21,"./Point":22,"./shapes/Circle":24,"./shapes/Ellipse":25,"./shapes/Polygon":26,"./shapes/Rectangle":27,"./shapes/RoundedRectangle":28}],24:[function(t,e,r){function i(t,e,r){this.x=t||0,this.y=e||0,this.radius=r||0,this.type=o.SHAPES.CIRC}var n=t("./Rectangle"),o=t("../../const");i.prototype.constructor=i,e.exports=i,i.prototype.clone=function(){return new i(this.x,this.y,this.radius)},i.prototype.contains=function(t,e){if(this.radius<=0)return!1;var r=this.x-t,i=this.y-e,n=this.radius*this.radius;return r*=r,i*=i,n>=r+i},i.prototype.getBounds=function(){return new n(this.x-this.radius,this.y-this.radius,2*this.radius,2*this.radius)}},{"../../const":13,"./Rectangle":27}],25:[function(t,e,r){function i(t,e,r,i){this.x=t||0,this.y=e||0,this.width=r||0,this.height=i||0,this.type=o.SHAPES.ELIP}var n=t("./Rectangle"),o=t("../../const");i.prototype.constructor=i,e.exports=i,i.prototype.clone=function(){return new i(this.x,this.y,this.width,this.height)},i.prototype.contains=function(t,e){if(this.width<=0||this.height<=0)return!1;var r=(t-this.x)/this.width,i=(e-this.y)/this.height;return r*=r,i*=i,1>=r+i},i.prototype.getBounds=function(){return new n(this.x-this.width,this.y-this.height,this.width,this.height)}},{"../../const":13,"./Rectangle":27}],26:[function(t,e,r){function i(t){var e=t;if(!Array.isArray(e)){e=new Array(arguments.length);for(var r=0;r<e.length;++r)e[r]=arguments[r]}if(e[0]instanceof n){for(var i=[],s=0,a=e.length;a>s;s++)i.push(e[s].x,e[s].y);e=i}this.closed=!0,this.points=e,this.type=o.SHAPES.POLY}var n=t("../Point"),o=t("../../const");i.prototype.constructor=i,e.exports=i,i.prototype.clone=function(){return new i(this.points.slice())},i.prototype.contains=function(t,e){for(var r=!1,i=this.points.length/2,n=0,o=i-1;i>n;o=n++){var s=this.points[2*n],a=this.points[2*n+1],h=this.points[2*o],u=this.points[2*o+1],l=a>e!=u>e&&(h-s)*(e-a)/(u-a)+s>t;l&&(r=!r)}return r}},{"../../const":13,"../Point":22}],27:[function(t,e,r){function i(t,e,r,i){this.x=t||0,this.y=e||0,this.width=r||0,this.height=i||0,this.type=n.SHAPES.RECT}var n=t("../../const");i.prototype.constructor=i,e.exports=i,i.EMPTY=new i(0,0,0,0),i.prototype.clone=function(){return new i(this.x,this.y,this.width,this.height)},i.prototype.contains=function(t,e){return this.width<=0||this.height<=0?!1:t>=this.x&&t<this.x+this.width&&e>=this.y&&e<this.y+this.height?!0:!1}},{"../../const":13}],28:[function(t,e,r){function i(t,e,r,i,o){this.x=t||0,this.y=e||0,this.width=r||0,this.height=i||0,this.radius=o||20,this.type=n.SHAPES.RREC}var n=t("../../const");i.prototype.constructor=i,e.exports=i,i.prototype.clone=function(){return new i(this.x,this.y,this.width,this.height,this.radius)},i.prototype.contains=function(t,e){return this.width<=0||this.height<=0?!1:t>=this.x&&t<=this.x+this.width&&e>=this.y&&e<=this.y+this.height?!0:!1}},{"../../const":13}],29:[function(t,e,r){function i(t,e,r){n.call(this),r=r||15e3,t=t||15e3;var i=16384;r>i&&(r=i),r>t&&(r=t),this._properties=[!1,!0,!1,!1,!1],this._maxSize=t,this._batchSize=r,this._buffers=null,this._bufferToUpdate=0,this.interactiveChildren=!1,this.blendMode=o.BLEND_MODES.NORMAL,this.roundPixels=!0,this.setProperties(e)}var n=t("../display/Container"),o=t("../const");i.prototype=Object.create(n.prototype),i.prototype.constructor=i,e.exports=i,i.prototype.setProperties=function(t){t&&(this._properties[0]="scale"in t?!!t.scale:this._properties[0],this._properties[1]="position"in t?!!t.position:this._properties[1],this._properties[2]="rotation"in t?!!t.rotation:this._properties[2],this._properties[3]="uvs"in t?!!t.uvs:this._properties[3],this._properties[4]="alpha"in t?!!t.alpha:this._properties[4])},i.prototype.updateTransform=function(){this.displayObjectUpdateTransform()},i.prototype.renderWebGL=function(t){this.visible&&!(this.worldAlpha<=0)&&this.children.length&&this.renderable&&(t.setObjectRenderer(t.plugins.particle),t.plugins.particle.render(this))},i.prototype.onChildrenChange=function(t){var e=Math.floor(t/this._batchSize);e<this._bufferToUpdate&&(this._bufferToUpdate=e)},i.prototype.renderCanvas=function(t){if(this.visible&&!(this.worldAlpha<=0)&&this.children.length&&this.renderable){var e=t.context,r=this.worldTransform,i=!0,n=0,o=0,s=0,a=0;e.globalAlpha=this.worldAlpha,this.displayObjectUpdateTransform();for(var h=0;h<this.children.length;++h){var u=this.children[h];if(u.visible){var l=u.texture.frame;if(e.globalAlpha=this.worldAlpha*u.alpha,u.rotation%(2*Math.PI)===0)i&&(e.setTransform(r.a,r.b,r.c,r.d,r.tx,r.ty),i=!1),n=u.anchor.x*(-l.width*u.scale.x)+u.position.x+.5,o=u.anchor.y*(-l.height*u.scale.y)+u.position.y+.5,s=l.width*u.scale.x,a=l.height*u.scale.y;else{i||(i=!0),u.displayObjectUpdateTransform();var c=u.worldTransform;t.roundPixels?e.setTransform(c.a,c.b,c.c,c.d,0|c.tx,0|c.ty):e.setTransform(c.a,c.b,c.c,c.d,c.tx,c.ty),n=u.anchor.x*-l.width+.5,o=u.anchor.y*-l.height+.5,s=l.width,a=l.height}e.drawImage(u.texture.baseTexture.source,l.x,l.y,l.width,l.height,n,o,s,a)}}}},i.prototype.destroy=function(){if(n.prototype.destroy.apply(this,arguments),this._buffers)for(var t=0;t<this._buffers.length;++t)this._buffers[t].destroy();this._properties=null,this._buffers=null}},{"../const":13,"../display/Container":14}],30:[function(t,e,r){function i(t,e,r,i){this.gl=t,this.vertSize=2,this.vertByteSize=4*this.vertSize,this.size=i,this.dynamicProperties=[],this.staticProperties=[];for(var n=0;n<e.length;n++){var o=e[n];r[n]?this.dynamicProperties.push(o):this.staticProperties.push(o)}this.staticStride=0,this.staticBuffer=null,this.staticData=null,this.dynamicStride=0,this.dynamicBuffer=null,this.dynamicData=null,this.initBuffers()}i.prototype.constructor=i,e.exports=i,i.prototype.initBuffers=function(){var t,e,r=this.gl,i=0;for(this.dynamicStride=0,t=0;t<this.dynamicProperties.length;t++)e=this.dynamicProperties[t],e.offset=i,i+=e.size,this.dynamicStride+=e.size;this.dynamicData=new Float32Array(this.size*this.dynamicStride*4),this.dynamicBuffer=r.createBuffer(),r.bindBuffer(r.ARRAY_BUFFER,this.dynamicBuffer),r.bufferData(r.ARRAY_BUFFER,this.dynamicData,r.DYNAMIC_DRAW);var n=0;for(this.staticStride=0,t=0;t<this.staticProperties.length;t++)e=this.staticProperties[t],e.offset=n,n+=e.size,this.staticStride+=e.size;this.staticData=new Float32Array(this.size*this.staticStride*4),this.staticBuffer=r.createBuffer(),r.bindBuffer(r.ARRAY_BUFFER,this.staticBuffer),r.bufferData(r.ARRAY_BUFFER,this.staticData,r.DYNAMIC_DRAW)},i.prototype.uploadDynamic=function(t,e,r){for(var i=this.gl,n=0;n<this.dynamicProperties.length;n++){var o=this.dynamicProperties[n];o.uploadFunction(t,e,r,this.dynamicData,this.dynamicStride,o.offset)}i.bindBuffer(i.ARRAY_BUFFER,this.dynamicBuffer),i.bufferSubData(i.ARRAY_BUFFER,0,this.dynamicData)},i.prototype.uploadStatic=function(t,e,r){for(var i=this.gl,n=0;n<this.staticProperties.length;n++){var o=this.staticProperties[n];o.uploadFunction(t,e,r,this.staticData,this.staticStride,o.offset)}i.bindBuffer(i.ARRAY_BUFFER,this.staticBuffer),i.bufferSubData(i.ARRAY_BUFFER,0,this.staticData)},i.prototype.bind=function(){var t,e,r=this.gl;for(r.bindBuffer(r.ARRAY_BUFFER,this.dynamicBuffer),t=0;t<this.dynamicProperties.length;t++)e=this.dynamicProperties[t],r.vertexAttribPointer(e.attribute,e.size,r.FLOAT,!1,4*this.dynamicStride,4*e.offset);for(r.bindBuffer(r.ARRAY_BUFFER,this.staticBuffer),t=0;t<this.staticProperties.length;t++)e=this.staticProperties[t],r.vertexAttribPointer(e.attribute,e.size,r.FLOAT,!1,4*this.staticStride,4*e.offset)},i.prototype.destroy=function(){this.dynamicProperties=null,this.dynamicData=null,this.gl.deleteBuffer(this.dynamicBuffer),this.staticProperties=null,this.staticData=null,this.gl.deleteBuffer(this.staticBuffer)}},{}],31:[function(t,e,r){function i(t){n.call(this,t);var e=98304;this.indices=new Uint16Array(e);for(var r=0,i=0;e>r;r+=6,i+=4)this.indices[r+0]=i+0,this.indices[r+1]=i+1,this.indices[r+2]=i+2,this.indices[r+3]=i+0,this.indices[r+4]=i+2,this.indices[r+5]=i+3;this.shader=null,this.indexBuffer=null,this.properties=null,this.tempMatrix=new h.Matrix}var n=t("../../renderers/webgl/utils/ObjectRenderer"),o=t("../../renderers/webgl/WebGLRenderer"),s=t("./ParticleShader"),a=t("./ParticleBuffer"),h=t("../../math");i.prototype=Object.create(n.prototype),i.prototype.constructor=i,e.exports=i,o.registerPlugin("particle",i),i.prototype.onContextChange=function(){var t=this.renderer.gl;this.shader=new s(this.renderer.shaderManager),this.indexBuffer=t.createBuffer(),t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,this.indexBuffer),t.bufferData(t.ELEMENT_ARRAY_BUFFER,this.indices,t.STATIC_DRAW),this.properties=[{attribute:this.shader.attributes.aVertexPosition,size:2,uploadFunction:this.uploadVertices,offset:0},{attribute:this.shader.attributes.aPositionCoord,size:2,uploadFunction:this.uploadPosition,offset:0},{attribute:this.shader.attributes.aRotation,size:1,uploadFunction:this.uploadRotation,offset:0},{attribute:this.shader.attributes.aTextureCoord,size:2,uploadFunction:this.uploadUvs,offset:0},{attribute:this.shader.attributes.aColor,size:1,uploadFunction:this.uploadAlpha,offset:0}]},i.prototype.start=function(){var t=this.renderer.gl;t.activeTexture(t.TEXTURE0),t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,this.indexBuffer);var e=this.shader;this.renderer.shaderManager.setShader(e)},i.prototype.render=function(t){var e=t.children,r=e.length,i=t._maxSize,n=t._batchSize;if(0!==r){r>i&&(r=i),t._buffers||(t._buffers=this.generateBuffers(t)),this.renderer.blendModeManager.setBlendMode(t.blendMode);var o=this.renderer.gl,s=t.worldTransform.copy(this.tempMatrix);s.prepend(this.renderer.currentRenderTarget.projectionMatrix),o.uniformMatrix3fv(this.shader.uniforms.projectionMatrix._location,!1,s.toArray(!0)),o.uniform1f(this.shader.uniforms.uAlpha._location,t.worldAlpha);var a=e[0]._texture.baseTexture;if(a._glTextures[o.id])o.bindTexture(o.TEXTURE_2D,a._glTextures[o.id]);else{if(!this.renderer.updateTexture(a))return;t._properties[0]&&t._properties[3]||(t._bufferToUpdate=0)}for(var h=0,u=0;r>h;h+=n,u+=1){var l=r-h;l>n&&(l=n);var c=t._buffers[u];c.uploadDynamic(e,h,l),t._bufferToUpdate===u&&(c.uploadStatic(e,h,l),t._bufferToUpdate=u+1),c.bind(this.shader),o.drawElements(o.TRIANGLES,6*l,o.UNSIGNED_SHORT,0),this.renderer.drawCount++}}},i.prototype.generateBuffers=function(t){var e,r=this.renderer.gl,i=[],n=t._maxSize,o=t._batchSize,s=t._properties;for(e=0;n>e;e+=o)i.push(new a(r,this.properties,s,o));return i},i.prototype.uploadVertices=function(t,e,r,i,n,o){for(var s,a,h,u,l,c,p,d,f,v=0;r>v;v++)s=t[e+v],a=s._texture,u=s.scale.x,l=s.scale.y,a.trim?(h=a.trim,p=h.x-s.anchor.x*h.width,c=p+a.crop.width,f=h.y-s.anchor.y*h.height,d=f+a.crop.height):(c=a._frame.width*(1-s.anchor.x),p=a._frame.width*-s.anchor.x,d=a._frame.height*(1-s.anchor.y),f=a._frame.height*-s.anchor.y),i[o]=p*u,i[o+1]=f*l,i[o+n]=c*u,i[o+n+1]=f*l,i[o+2*n]=c*u,i[o+2*n+1]=d*l,i[o+3*n]=p*u,i[o+3*n+1]=d*l,o+=4*n},i.prototype.uploadPosition=function(t,e,r,i,n,o){for(var s=0;r>s;s++){var a=t[e+s].position;i[o]=a.x,i[o+1]=a.y,i[o+n]=a.x,i[o+n+1]=a.y,i[o+2*n]=a.x,i[o+2*n+1]=a.y,i[o+3*n]=a.x,i[o+3*n+1]=a.y,o+=4*n}},i.prototype.uploadRotation=function(t,e,r,i,n,o){for(var s=0;r>s;s++){var a=t[e+s].rotation;i[o]=a,i[o+n]=a,i[o+2*n]=a,i[o+3*n]=a,o+=4*n}},i.prototype.uploadUvs=function(t,e,r,i,n,o){for(var s=0;r>s;s++){var a=t[e+s]._texture._uvs;a?(i[o]=a.x0,i[o+1]=a.y0,i[o+n]=a.x1,i[o+n+1]=a.y1,i[o+2*n]=a.x2,i[o+2*n+1]=a.y2,i[o+3*n]=a.x3,i[o+3*n+1]=a.y3,o+=4*n):(i[o]=0,i[o+1]=0,i[o+n]=0,i[o+n+1]=0,i[o+2*n]=0,i[o+2*n+1]=0,i[o+3*n]=0,i[o+3*n+1]=0,o+=4*n)}},i.prototype.uploadAlpha=function(t,e,r,i,n,o){for(var s=0;r>s;s++){var a=t[e+s].alpha;i[o]=a,i[o+n]=a,i[o+2*n]=a,i[o+3*n]=a,o+=4*n}},i.prototype.destroy=function(){this.renderer.gl&&this.renderer.gl.deleteBuffer(this.indexBuffer),n.prototype.destroy.apply(this,arguments),this.shader.destroy(),this.indices=null,this.tempMatrix=null}},{"../../math":23,"../../renderers/webgl/WebGLRenderer":39,"../../renderers/webgl/utils/ObjectRenderer":53,"./ParticleBuffer":30,"./ParticleShader":32}],32:[function(t,e,r){function i(t){n.call(this,t,["attribute vec2 aVertexPosition;","attribute vec2 aTextureCoord;","attribute float aColor;","attribute vec2 aPositionCoord;","attribute vec2 aScale;","attribute float aRotation;","uniform mat3 projectionMatrix;","varying vec2 vTextureCoord;","varying float vColor;","void main(void){","   vec2 v = aVertexPosition;","   v.x = (aVertexPosition.x) * cos(aRotation) - (aVertexPosition.y) * sin(aRotation);","   v.y = (aVertexPosition.x) * sin(aRotation) + (aVertexPosition.y) * cos(aRotation);","   v = v + aPositionCoord;","   gl_Position = vec4((projectionMatrix * vec3(v, 1.0)).xy, 0.0, 1.0);","   vTextureCoord = aTextureCoord;","   vColor = aColor;","}"].join("\n"),["precision lowp float;","varying vec2 vTextureCoord;","varying float vColor;","uniform sampler2D uSampler;","uniform float uAlpha;","void main(void){","  vec4 color = texture2D(uSampler, vTextureCoord) * vColor * uAlpha;","  if (color.a == 0.0) discard;","  gl_FragColor = color;","}"].join("\n"),{uAlpha:{type:"1f",value:1}},{aPositionCoord:0,aRotation:0})}var n=t("../../renderers/webgl/shaders/TextureShader");i.prototype=Object.create(n.prototype),i.prototype.constructor=i,e.exports=i},{"../../renderers/webgl/shaders/TextureShader":52}],33:[function(t,e,r){function i(t,e,r,i){if(a.call(this),n.sayHello(t),i)for(var h in s.DEFAULT_RENDER_OPTIONS)"undefined"==typeof i[h]&&(i[h]=s.DEFAULT_RENDER_OPTIONS[h]);else i=s.DEFAULT_RENDER_OPTIONS;this.type=s.RENDERER_TYPE.UNKNOWN,this.width=e||800,this.height=r||600,this.view=i.view||document.createElement("canvas"),this.resolution=i.resolution,this.transparent=i.transparent,this.autoResize=i.autoResize||!1,this.blendModes=null,this.preserveDrawingBuffer=i.preserveDrawingBuffer,this.clearBeforeRender=i.clearBeforeRender,this.roundPixels=i.roundPixels,this._backgroundColor=0,this._backgroundColorRgb=[0,0,0],this._backgroundColorString="#000000",this.backgroundColor=i.backgroundColor||this._backgroundColor,this._tempDisplayObjectParent={worldTransform:new o.Matrix,worldAlpha:1,children:[]},this._lastObjectRendered=this._tempDisplayObjectParent}var n=t("../utils"),o=t("../math"),s=t("../const"),a=t("eventemitter3");i.prototype=Object.create(a.prototype),i.prototype.constructor=i,e.exports=i,Object.defineProperties(i.prototype,{backgroundColor:{get:function(){return this._backgroundColor},set:function(t){this._backgroundColor=t,this._backgroundColorString=n.hex2string(t),n.hex2rgb(t,this._backgroundColorRgb)}}}),i.prototype.resize=function(t,e){this.width=t*this.resolution,this.height=e*this.resolution,this.view.width=this.width,this.view.height=this.height,this.autoResize&&(this.view.style.width=this.width/this.resolution+"px",this.view.style.height=this.height/this.resolution+"px")},i.prototype.destroy=function(t){t&&this.view.parentNode&&this.view.parentNode.removeChild(this.view),this.type=s.RENDERER_TYPE.UNKNOWN,this.width=0,this.height=0,this.view=null,this.resolution=0,this.transparent=!1,this.autoResize=!1,this.blendModes=null,this.preserveDrawingBuffer=!1,this.clearBeforeRender=!1,this.roundPixels=!1,this._backgroundColor=0,this._backgroundColorRgb=null,this._backgroundColorString=null}},{"../const":13,"../math":23,"../utils":67,eventemitter3:10}],34:[function(t,e,r){function i(t,e,r){r=r||{},n.call(this,"Canvas",t,e,r),this.type=h.RENDERER_TYPE.CANVAS,this.context=this.view.getContext("2d",{alpha:this.transparent}),this.refresh=!0,this.maskManager=new o,this.smoothProperty="imageSmoothingEnabled",this.context.imageSmoothingEnabled||(this.context.webkitImageSmoothingEnabled?this.smoothProperty="webkitImageSmoothingEnabled":this.context.mozImageSmoothingEnabled?this.smoothProperty="mozImageSmoothingEnabled":this.context.oImageSmoothingEnabled?this.smoothProperty="oImageSmoothingEnabled":this.context.msImageSmoothingEnabled&&(this.smoothProperty="msImageSmoothingEnabled")),this.initPlugins(),this._mapBlendModes(),this._tempDisplayObjectParent={worldTransform:new a.Matrix,worldAlpha:1},this.resize(t,e)}var n=t("../SystemRenderer"),o=t("./utils/CanvasMaskManager"),s=t("../../utils"),a=t("../../math"),h=t("../../const");i.prototype=Object.create(n.prototype),i.prototype.constructor=i,e.exports=i,s.pluginTarget.mixin(i),i.prototype.render=function(t){var e=t.parent;this._lastObjectRendered=t,t.parent=this._tempDisplayObjectParent,t.updateTransform(),t.parent=e,this.context.setTransform(1,0,0,1,0,0),this.context.globalAlpha=1,this.context.globalCompositeOperation=this.blendModes[h.BLEND_MODES.NORMAL],navigator.isCocoonJS&&this.view.screencanvas&&(this.context.fillStyle="black",this.context.clear()),this.clearBeforeRender&&(this.transparent?this.context.clearRect(0,0,this.width,this.height):(this.context.fillStyle=this._backgroundColorString,this.context.fillRect(0,0,this.width,this.height))),this.renderDisplayObject(t,this.context)},i.prototype.destroy=function(t){this.destroyPlugins(),n.prototype.destroy.call(this,t),this.context=null,this.refresh=!0,this.maskManager.destroy(),this.maskManager=null,this.smoothProperty=null},i.prototype.renderDisplayObject=function(t,e){var r=this.context;this.context=e,t.renderCanvas(this),this.context=r},i.prototype.resize=function(t,e){n.prototype.resize.call(this,t,e),this.smoothProperty&&(this.context[this.smoothProperty]=h.SCALE_MODES.DEFAULT===h.SCALE_MODES.LINEAR)},i.prototype._mapBlendModes=function(){this.blendModes||(this.blendModes={},s.canUseNewCanvasBlendModes()?(this.blendModes[h.BLEND_MODES.NORMAL]="source-over",this.blendModes[h.BLEND_MODES.ADD]="lighter",this.blendModes[h.BLEND_MODES.MULTIPLY]="multiply",this.blendModes[h.BLEND_MODES.SCREEN]="screen",this.blendModes[h.BLEND_MODES.OVERLAY]="overlay",this.blendModes[h.BLEND_MODES.DARKEN]="darken",this.blendModes[h.BLEND_MODES.LIGHTEN]="lighten",this.blendModes[h.BLEND_MODES.COLOR_DODGE]="color-dodge",this.blendModes[h.BLEND_MODES.COLOR_BURN]="color-burn",this.blendModes[h.BLEND_MODES.HARD_LIGHT]="hard-light",this.blendModes[h.BLEND_MODES.SOFT_LIGHT]="soft-light",this.blendModes[h.BLEND_MODES.DIFFERENCE]="difference",this.blendModes[h.BLEND_MODES.EXCLUSION]="exclusion",this.blendModes[h.BLEND_MODES.HUE]="hue",this.blendModes[h.BLEND_MODES.SATURATION]="saturate",this.blendModes[h.BLEND_MODES.COLOR]="color",this.blendModes[h.BLEND_MODES.LUMINOSITY]="luminosity"):(this.blendModes[h.BLEND_MODES.NORMAL]="source-over",this.blendModes[h.BLEND_MODES.ADD]="lighter",this.blendModes[h.BLEND_MODES.MULTIPLY]="source-over",this.blendModes[h.BLEND_MODES.SCREEN]="source-over",this.blendModes[h.BLEND_MODES.OVERLAY]="source-over",this.blendModes[h.BLEND_MODES.DARKEN]="source-over",this.blendModes[h.BLEND_MODES.LIGHTEN]="source-over",this.blendModes[h.BLEND_MODES.COLOR_DODGE]="source-over",this.blendModes[h.BLEND_MODES.COLOR_BURN]="source-over",this.blendModes[h.BLEND_MODES.HARD_LIGHT]="source-over",this.blendModes[h.BLEND_MODES.SOFT_LIGHT]="source-over",this.blendModes[h.BLEND_MODES.DIFFERENCE]="source-over",this.blendModes[h.BLEND_MODES.EXCLUSION]="source-over",this.blendModes[h.BLEND_MODES.HUE]="source-over",this.blendModes[h.BLEND_MODES.SATURATION]="source-over",this.blendModes[h.BLEND_MODES.COLOR]="source-over",this.blendModes[h.BLEND_MODES.LUMINOSITY]="source-over"))}},{"../../const":13,"../../math":23,"../../utils":67,"../SystemRenderer":33,"./utils/CanvasMaskManager":37}],35:[function(t,e,r){function i(t,e){this.canvas=document.createElement("canvas"),this.context=this.canvas.getContext("2d"),this.canvas.width=t,this.canvas.height=e}i.prototype.constructor=i,e.exports=i,Object.defineProperties(i.prototype,{width:{get:function(){return this.canvas.width},set:function(t){this.canvas.width=t}},height:{get:function(){return this.canvas.height},set:function(t){this.canvas.height=t}}}),i.prototype.clear=function(){this.context.setTransform(1,0,0,1,0,0),this.context.clearRect(0,0,this.canvas.width,this.canvas.height)},i.prototype.resize=function(t,e){this.canvas.width=t,this.canvas.height=e},i.prototype.destroy=function(){this.context=null,this.canvas=null}},{}],36:[function(t,e,r){var i=t("../../../const"),n={};e.exports=n,n.renderGraphics=function(t,e){var r=t.worldAlpha;t.dirty&&(this.updateGraphicsTint(t),t.dirty=!1);for(var n=0;n<t.graphicsData.length;n++){var o=t.graphicsData[n],s=o.shape,a=o._fillTint,h=o._lineTint;if(e.lineWidth=o.lineWidth,o.type===i.SHAPES.POLY){e.beginPath();var u=s.points;e.moveTo(u[0],u[1]);for(var l=1;l<u.length/2;l++)e.lineTo(u[2*l],u[2*l+1]);s.closed&&e.lineTo(u[0],u[1]),u[0]===u[u.length-2]&&u[1]===u[u.length-1]&&e.closePath(),o.fill&&(e.globalAlpha=o.fillAlpha*r,e.fillStyle="#"+("00000"+(0|a).toString(16)).substr(-6),e.fill()),o.lineWidth&&(e.globalAlpha=o.lineAlpha*r,e.strokeStyle="#"+("00000"+(0|h).toString(16)).substr(-6),e.stroke())}else if(o.type===i.SHAPES.RECT)(o.fillColor||0===o.fillColor)&&(e.globalAlpha=o.fillAlpha*r,e.fillStyle="#"+("00000"+(0|a).toString(16)).substr(-6),e.fillRect(s.x,s.y,s.width,s.height)),o.lineWidth&&(e.globalAlpha=o.lineAlpha*r,e.strokeStyle="#"+("00000"+(0|h).toString(16)).substr(-6),e.strokeRect(s.x,s.y,s.width,s.height));else if(o.type===i.SHAPES.CIRC)e.beginPath(),e.arc(s.x,s.y,s.radius,0,2*Math.PI),e.closePath(),o.fill&&(e.globalAlpha=o.fillAlpha*r,e.fillStyle="#"+("00000"+(0|a).toString(16)).substr(-6),e.fill()),o.lineWidth&&(e.globalAlpha=o.lineAlpha*r,e.strokeStyle="#"+("00000"+(0|h).toString(16)).substr(-6),e.stroke());else if(o.type===i.SHAPES.ELIP){var c=2*s.width,p=2*s.height,d=s.x-c/2,f=s.y-p/2;e.beginPath();var v=.5522848,g=c/2*v,m=p/2*v,y=d+c,x=f+p,b=d+c/2,_=f+p/2;e.moveTo(d,_),e.bezierCurveTo(d,_-m,b-g,f,b,f),e.bezierCurveTo(b+g,f,y,_-m,y,_),e.bezierCurveTo(y,_+m,b+g,x,b,x),e.bezierCurveTo(b-g,x,d,_+m,d,_),e.closePath(),o.fill&&(e.globalAlpha=o.fillAlpha*r,e.fillStyle="#"+("00000"+(0|a).toString(16)).substr(-6),e.fill()),o.lineWidth&&(e.globalAlpha=o.lineAlpha*r,e.strokeStyle="#"+("00000"+(0|h).toString(16)).substr(-6),e.stroke())}else if(o.type===i.SHAPES.RREC){var T=s.x,E=s.y,S=s.width,w=s.height,A=s.radius,C=Math.min(S,w)/2|0;A=A>C?C:A,e.beginPath(),e.moveTo(T,E+A),e.lineTo(T,E+w-A),e.quadraticCurveTo(T,E+w,T+A,E+w),e.lineTo(T+S-A,E+w),e.quadraticCurveTo(T+S,E+w,T+S,E+w-A),e.lineTo(T+S,E+A),e.quadraticCurveTo(T+S,E,T+S-A,E),e.lineTo(T+A,E),e.quadraticCurveTo(T,E,T,E+A),e.closePath(),(o.fillColor||0===o.fillColor)&&(e.globalAlpha=o.fillAlpha*r,e.fillStyle="#"+("00000"+(0|a).toString(16)).substr(-6),e.fill()),o.lineWidth&&(e.globalAlpha=o.lineAlpha*r,e.strokeStyle="#"+("00000"+(0|h).toString(16)).substr(-6),e.stroke())}}},n.renderGraphicsMask=function(t,e){var r=t.graphicsData.length;if(0!==r){e.beginPath();for(var n=0;r>n;n++){var o=t.graphicsData[n],s=o.shape;if(o.type===i.SHAPES.POLY){var a=s.points;e.moveTo(a[0],a[1]);for(var h=1;h<a.length/2;h++)e.lineTo(a[2*h],a[2*h+1]);a[0]===a[a.length-2]&&a[1]===a[a.length-1]&&e.closePath()}else if(o.type===i.SHAPES.RECT)e.rect(s.x,s.y,s.width,s.height),e.closePath();else if(o.type===i.SHAPES.CIRC)e.arc(s.x,s.y,s.radius,0,2*Math.PI),e.closePath();else if(o.type===i.SHAPES.ELIP){var u=2*s.width,l=2*s.height,c=s.x-u/2,p=s.y-l/2,d=.5522848,f=u/2*d,v=l/2*d,g=c+u,m=p+l,y=c+u/2,x=p+l/2;e.moveTo(c,x),e.bezierCurveTo(c,x-v,y-f,p,y,p),e.bezierCurveTo(y+f,p,g,x-v,g,x),e.bezierCurveTo(g,x+v,y+f,m,y,m),e.bezierCurveTo(y-f,m,c,x+v,c,x),e.closePath()}else if(o.type===i.SHAPES.RREC){var b=s.x,_=s.y,T=s.width,E=s.height,S=s.radius,w=Math.min(T,E)/2|0;S=S>w?w:S,e.moveTo(b,_+S),e.lineTo(b,_+E-S),e.quadraticCurveTo(b,_+E,b+S,_+E),e.lineTo(b+T-S,_+E),e.quadraticCurveTo(b+T,_+E,b+T,_+E-S),e.lineTo(b+T,_+S),e.quadraticCurveTo(b+T,_,b+T-S,_),e.lineTo(b+S,_),e.quadraticCurveTo(b,_,b,_+S),e.closePath()}}}},n.updateGraphicsTint=function(t){if(16777215!==t.tint||t._prevTint!==t.tint){t._prevTint=t.tint;for(var e=(t.tint>>16&255)/255,r=(t.tint>>8&255)/255,i=(255&t.tint)/255,n=0;n<t.graphicsData.length;n++){var o=t.graphicsData[n],s=0|o.fillColor,a=0|o.lineColor;o._fillTint=((s>>16&255)/255*e*255<<16)+((s>>8&255)/255*r*255<<8)+(255&s)/255*i*255,o._lineTint=((a>>16&255)/255*e*255<<16)+((a>>8&255)/255*r*255<<8)+(255&a)/255*i*255}}}},{"../../../const":13}],37:[function(t,e,r){function i(){}var n=t("./CanvasGraphics");i.prototype.constructor=i,e.exports=i,i.prototype.pushMask=function(t,e){e.context.save();var r=t.alpha,i=t.worldTransform,o=e.resolution;e.context.setTransform(i.a*o,i.b*o,i.c*o,i.d*o,i.tx*o,i.ty*o),t.texture||(n.renderGraphicsMask(t,e.context),e.context.clip()),t.worldAlpha=r},i.prototype.popMask=function(t){t.context.restore()},i.prototype.destroy=function(){}},{"./CanvasGraphics":36}],38:[function(t,e,r){var i=t("../../../utils"),n={};e.exports=n,n.getTintedTexture=function(t,e){var r=t.texture;e=n.roundColor(e);var i="#"+("00000"+(0|e).toString(16)).substr(-6);if(r.tintCache=r.tintCache||{},r.tintCache[i])return r.tintCache[i];var o=n.canvas||document.createElement("canvas");if(n.tintMethod(r,e,o),n.convertTintToImage){var s=new Image;s.src=o.toDataURL(),r.tintCache[i]=s}else r.tintCache[i]=o,n.canvas=null;return o},n.tintWithMultiply=function(t,e,r){var i=r.getContext("2d"),n=t.baseTexture.resolution,o=t.crop.clone();o.x*=n,o.y*=n,o.width*=n,o.height*=n,r.width=o.width,r.height=o.height,i.fillStyle="#"+("00000"+(0|e).toString(16)).substr(-6),i.fillRect(0,0,o.width,o.height),i.globalCompositeOperation="multiply",i.drawImage(t.baseTexture.source,o.x,o.y,o.width,o.height,0,0,o.width,o.height),i.globalCompositeOperation="destination-atop",i.drawImage(t.baseTexture.source,o.x,o.y,o.width,o.height,0,0,o.width,o.height)},n.tintWithOverlay=function(t,e,r){var i=r.getContext("2d"),n=t.baseTexture.resolution,o=t.crop.clone();o.x*=n,o.y*=n,o.width*=n,o.height*=n,r.width=o.width,r.height=o.height,i.globalCompositeOperation="copy",i.fillStyle="#"+("00000"+(0|e).toString(16)).substr(-6),i.fillRect(0,0,o.width,o.height),i.globalCompositeOperation="destination-atop",i.drawImage(t.baseTexture.source,o.x,o.y,o.width,o.height,0,0,o.width,o.height)},n.tintWithPerPixel=function(t,e,r){var n=r.getContext("2d"),o=t.baseTexture.resolution,s=t.crop.clone();s.x*=o,s.y*=o,s.width*=o,s.height*=o,r.width=s.width,r.height=s.height,n.globalCompositeOperation="copy",n.drawImage(t.baseTexture.source,s.x,s.y,s.width,s.height,0,0,s.width,s.height);for(var a=i.hex2rgb(e),h=a[0],u=a[1],l=a[2],c=n.getImageData(0,0,s.width,s.height),p=c.data,d=0;d<p.length;d+=4)p[d+0]*=h,
p[d+1]*=u,p[d+2]*=l;n.putImageData(c,0,0)},n.roundColor=function(t){var e=n.cacheStepsPerColorChannel,r=i.hex2rgb(t);return r[0]=Math.min(255,r[0]/e*e),r[1]=Math.min(255,r[1]/e*e),r[2]=Math.min(255,r[2]/e*e),i.rgb2hex(r)},n.cacheStepsPerColorChannel=8,n.convertTintToImage=!1,n.canUseMultiply=i.canUseNewCanvasBlendModes(),n.tintMethod=n.canUseMultiply?n.tintWithMultiply:n.tintWithPerPixel},{"../../../utils":67}],39:[function(t,e,r){function i(t,e,r){r=r||{},n.call(this,"WebGL",t,e,r),this.type=f.RENDERER_TYPE.WEBGL,this.handleContextLost=this.handleContextLost.bind(this),this.handleContextRestored=this.handleContextRestored.bind(this),this.view.addEventListener("webglcontextlost",this.handleContextLost,!1),this.view.addEventListener("webglcontextrestored",this.handleContextRestored,!1),this._useFXAA=!!r.forceFXAA&&r.antialias,this._FXAAFilter=null,this._contextOptions={alpha:this.transparent,antialias:r.antialias,premultipliedAlpha:this.transparent&&"notMultiplied"!==this.transparent,stencil:!0,preserveDrawingBuffer:r.preserveDrawingBuffer},this.drawCount=0,this.shaderManager=new o(this),this.maskManager=new s(this),this.stencilManager=new a(this),this.filterManager=new h(this),this.blendModeManager=new u(this),this.currentRenderTarget=null,this.currentRenderer=new c(this),this.initPlugins(),this._createContext(),this._initContext(),this._mapGlModes(),this._renderTargetStack=[]}var n=t("../SystemRenderer"),o=t("./managers/ShaderManager"),s=t("./managers/MaskManager"),a=t("./managers/StencilManager"),h=t("./managers/FilterManager"),u=t("./managers/BlendModeManager"),l=t("./utils/RenderTarget"),c=t("./utils/ObjectRenderer"),p=t("./filters/FXAAFilter"),d=t("../../utils"),f=t("../../const");i.prototype=Object.create(n.prototype),i.prototype.constructor=i,e.exports=i,d.pluginTarget.mixin(i),i.glContextId=0,i.prototype._createContext=function(){var t=this.view.getContext("webgl",this._contextOptions)||this.view.getContext("experimental-webgl",this._contextOptions);if(this.gl=t,!t)throw new Error("This browser does not support webGL. Try using the canvas renderer");this.glContextId=i.glContextId++,t.id=this.glContextId,t.renderer=this},i.prototype._initContext=function(){var t=this.gl;t.disable(t.DEPTH_TEST),t.disable(t.CULL_FACE),t.enable(t.BLEND),this.renderTarget=new l(t,this.width,this.height,null,this.resolution,!0),this.setRenderTarget(this.renderTarget),this.emit("context",t),this.resize(this.width,this.height),this._useFXAA||(this._useFXAA=this._contextOptions.antialias&&!t.getContextAttributes().antialias),this._useFXAA&&(window.console.warn("FXAA antialiasing being used instead of native antialiasing"),this._FXAAFilter=[new p])},i.prototype.render=function(t){if(!this.gl.isContextLost()){this.drawCount=0,this._lastObjectRendered=t,this._useFXAA&&(this._FXAAFilter[0].uniforms.resolution.value.x=this.width,this._FXAAFilter[0].uniforms.resolution.value.y=this.height,t.filterArea=this.renderTarget.size,t.filters=this._FXAAFilter);var e=t.parent;t.parent=this._tempDisplayObjectParent,t.updateTransform(),t.parent=e;var r=this.gl;this.setRenderTarget(this.renderTarget),this.clearBeforeRender&&(this.transparent?r.clearColor(0,0,0,0):r.clearColor(this._backgroundColorRgb[0],this._backgroundColorRgb[1],this._backgroundColorRgb[2],1),r.clear(r.COLOR_BUFFER_BIT)),this.renderDisplayObject(t,this.renderTarget)}},i.prototype.renderDisplayObject=function(t,e,r){this.setRenderTarget(e),r&&e.clear(),this.filterManager.setFilterStack(e.filterStack),t.renderWebGL(this),this.currentRenderer.flush()},i.prototype.setObjectRenderer=function(t){this.currentRenderer!==t&&(this.currentRenderer.stop(),this.currentRenderer=t,this.currentRenderer.start())},i.prototype.setRenderTarget=function(t){this.currentRenderTarget!==t&&(this.currentRenderTarget=t,this.currentRenderTarget.activate(),this.stencilManager.setMaskStack(t.stencilMaskStack))},i.prototype.resize=function(t,e){n.prototype.resize.call(this,t,e),this.filterManager.resize(t,e),this.renderTarget.resize(t,e),this.currentRenderTarget===this.renderTarget&&(this.renderTarget.activate(),this.gl.viewport(0,0,this.width,this.height))},i.prototype.updateTexture=function(t){if(t=t.baseTexture||t,t.hasLoaded){var e=this.gl;return t._glTextures[e.id]||(t._glTextures[e.id]=e.createTexture(),t.on("update",this.updateTexture,this),t.on("dispose",this.destroyTexture,this)),e.bindTexture(e.TEXTURE_2D,t._glTextures[e.id]),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultipliedAlpha),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,t.source),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,t.scaleMode===f.SCALE_MODES.LINEAR?e.LINEAR:e.NEAREST),t.mipmap&&t.isPowerOfTwo?(e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,t.scaleMode===f.SCALE_MODES.LINEAR?e.LINEAR_MIPMAP_LINEAR:e.NEAREST_MIPMAP_NEAREST),e.generateMipmap(e.TEXTURE_2D)):e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,t.scaleMode===f.SCALE_MODES.LINEAR?e.LINEAR:e.NEAREST),t.isPowerOfTwo?(e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.REPEAT),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.REPEAT)):(e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)),t._glTextures[e.id]}},i.prototype.destroyTexture=function(t){t=t.baseTexture||t,t.hasLoaded&&t._glTextures[this.gl.id]&&this.gl.deleteTexture(t._glTextures[this.gl.id])},i.prototype.handleContextLost=function(t){t.preventDefault()},i.prototype.handleContextRestored=function(){this._initContext();for(var t in d.BaseTextureCache)d.BaseTextureCache[t]._glTextures.length=0},i.prototype.destroy=function(t){this.destroyPlugins(),this.view.removeEventListener("webglcontextlost",this.handleContextLost),this.view.removeEventListener("webglcontextrestored",this.handleContextRestored);for(var e in d.BaseTextureCache){var r=d.BaseTextureCache[e];r.off("update",this.updateTexture,this),r.off("dispose",this.destroyTexture,this)}n.prototype.destroy.call(this,t),this.uid=0,this.shaderManager.destroy(),this.maskManager.destroy(),this.stencilManager.destroy(),this.filterManager.destroy(),this.blendModeManager.destroy(),this.shaderManager=null,this.maskManager=null,this.filterManager=null,this.blendModeManager=null,this.currentRenderer=null,this.handleContextLost=null,this.handleContextRestored=null,this._contextOptions=null,this.drawCount=0,this.gl.useProgram(null),this.gl=null},i.prototype._mapGlModes=function(){var t=this.gl;this.blendModes||(this.blendModes={},this.blendModes[f.BLEND_MODES.NORMAL]=[t.ONE,t.ONE_MINUS_SRC_ALPHA],this.blendModes[f.BLEND_MODES.ADD]=[t.SRC_ALPHA,t.DST_ALPHA],this.blendModes[f.BLEND_MODES.MULTIPLY]=[t.DST_COLOR,t.ONE_MINUS_SRC_ALPHA],this.blendModes[f.BLEND_MODES.SCREEN]=[t.SRC_ALPHA,t.ONE],this.blendModes[f.BLEND_MODES.OVERLAY]=[t.ONE,t.ONE_MINUS_SRC_ALPHA],this.blendModes[f.BLEND_MODES.DARKEN]=[t.ONE,t.ONE_MINUS_SRC_ALPHA],this.blendModes[f.BLEND_MODES.LIGHTEN]=[t.ONE,t.ONE_MINUS_SRC_ALPHA],this.blendModes[f.BLEND_MODES.COLOR_DODGE]=[t.ONE,t.ONE_MINUS_SRC_ALPHA],this.blendModes[f.BLEND_MODES.COLOR_BURN]=[t.ONE,t.ONE_MINUS_SRC_ALPHA],this.blendModes[f.BLEND_MODES.HARD_LIGHT]=[t.ONE,t.ONE_MINUS_SRC_ALPHA],this.blendModes[f.BLEND_MODES.SOFT_LIGHT]=[t.ONE,t.ONE_MINUS_SRC_ALPHA],this.blendModes[f.BLEND_MODES.DIFFERENCE]=[t.ONE,t.ONE_MINUS_SRC_ALPHA],this.blendModes[f.BLEND_MODES.EXCLUSION]=[t.ONE,t.ONE_MINUS_SRC_ALPHA],this.blendModes[f.BLEND_MODES.HUE]=[t.ONE,t.ONE_MINUS_SRC_ALPHA],this.blendModes[f.BLEND_MODES.SATURATION]=[t.ONE,t.ONE_MINUS_SRC_ALPHA],this.blendModes[f.BLEND_MODES.COLOR]=[t.ONE,t.ONE_MINUS_SRC_ALPHA],this.blendModes[f.BLEND_MODES.LUMINOSITY]=[t.ONE,t.ONE_MINUS_SRC_ALPHA]),this.drawModes||(this.drawModes={},this.drawModes[f.DRAW_MODES.POINTS]=t.POINTS,this.drawModes[f.DRAW_MODES.LINES]=t.LINES,this.drawModes[f.DRAW_MODES.LINE_LOOP]=t.LINE_LOOP,this.drawModes[f.DRAW_MODES.LINE_STRIP]=t.LINE_STRIP,this.drawModes[f.DRAW_MODES.TRIANGLES]=t.TRIANGLES,this.drawModes[f.DRAW_MODES.TRIANGLE_STRIP]=t.TRIANGLE_STRIP,this.drawModes[f.DRAW_MODES.TRIANGLE_FAN]=t.TRIANGLE_FAN)}},{"../../const":13,"../../utils":67,"../SystemRenderer":33,"./filters/FXAAFilter":41,"./managers/BlendModeManager":43,"./managers/FilterManager":44,"./managers/MaskManager":45,"./managers/ShaderManager":46,"./managers/StencilManager":47,"./utils/ObjectRenderer":53,"./utils/RenderTarget":55}],40:[function(t,e,r){function i(t,e,r){this.shaders=[],this.padding=0,this.uniforms=r||{},this.vertexSrc=t||n.defaultVertexSrc,this.fragmentSrc=e||n.defaultFragmentSrc}var n=t("../shaders/TextureShader");i.prototype.constructor=i,e.exports=i,i.prototype.getShader=function(t){var e=t.gl,r=this.shaders[e.id];return r||(r=new n(t.shaderManager,this.vertexSrc,this.fragmentSrc,this.uniforms,this.attributes),this.shaders[e.id]=r),r},i.prototype.applyFilter=function(t,e,r,i){var n=this.getShader(t);t.filterManager.applyFilter(n,e,r,i)},i.prototype.syncUniform=function(t){for(var e=0,r=this.shaders.length;r>e;++e)this.shaders[e].syncUniform(t)}},{"../shaders/TextureShader":52}],41:[function(t,e,r){function i(){n.call(this,"\nprecision mediump float;\n\nattribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\nattribute vec4 aColor;\n\nuniform mat3 projectionMatrix;\nuniform vec2 resolution;\n\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\n\nvarying vec2 vResolution;\n\n//texcoords computed in vertex step\n//to avoid dependent texture reads\nvarying vec2 v_rgbNW;\nvarying vec2 v_rgbNE;\nvarying vec2 v_rgbSW;\nvarying vec2 v_rgbSE;\nvarying vec2 v_rgbM;\n\n\nvoid texcoords(vec2 fragCoord, vec2 resolution,\n            out vec2 v_rgbNW, out vec2 v_rgbNE,\n            out vec2 v_rgbSW, out vec2 v_rgbSE,\n            out vec2 v_rgbM) {\n    vec2 inverseVP = 1.0 / resolution.xy;\n    v_rgbNW = (fragCoord + vec2(-1.0, -1.0)) * inverseVP;\n    v_rgbNE = (fragCoord + vec2(1.0, -1.0)) * inverseVP;\n    v_rgbSW = (fragCoord + vec2(-1.0, 1.0)) * inverseVP;\n    v_rgbSE = (fragCoord + vec2(1.0, 1.0)) * inverseVP;\n    v_rgbM = vec2(fragCoord * inverseVP);\n}\n\nvoid main(void){\n   gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n   vTextureCoord = aTextureCoord;\n   vColor = vec4(aColor.rgb * aColor.a, aColor.a);\n   vResolution = resolution;\n\n   //compute the texture coords and send them to varyings\n   texcoords(aTextureCoord * resolution, resolution, v_rgbNW, v_rgbNE, v_rgbSW, v_rgbSE, v_rgbM);\n}\n",'precision lowp float;\n\n\n/**\nBasic FXAA implementation based on the code on geeks3d.com with the\nmodification that the texture2DLod stuff was removed since it\'s\nunsupported by WebGL.\n\n--\n\nFrom:\nhttps://github.com/mitsuhiko/webgl-meincraft\n\nCopyright (c) 2011 by Armin Ronacher.\n\nSome rights reserved.\n\nRedistribution and use in source and binary forms, with or without\nmodification, are permitted provided that the following conditions are\nmet:\n\n    * Redistributions of source code must retain the above copyright\n      notice, this list of conditions and the following disclaimer.\n\n    * Redistributions in binary form must reproduce the above\n      copyright notice, this list of conditions and the following\n      disclaimer in the documentation and/or other materials provided\n      with the distribution.\n\n    * The names of the contributors may not be used to endorse or\n      promote products derived from this software without specific\n      prior written permission.\n\nTHIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS\n"AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT\nLIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR\nA PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT\nOWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,\nSPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT\nLIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,\nDATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY\nTHEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT\n(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE\nOF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.\n*/\n\n#ifndef FXAA_REDUCE_MIN\n    #define FXAA_REDUCE_MIN   (1.0/ 128.0)\n#endif\n#ifndef FXAA_REDUCE_MUL\n    #define FXAA_REDUCE_MUL   (1.0 / 8.0)\n#endif\n#ifndef FXAA_SPAN_MAX\n    #define FXAA_SPAN_MAX     8.0\n#endif\n\n//optimized version for mobile, where dependent\n//texture reads can be a bottleneck\nvec4 fxaa(sampler2D tex, vec2 fragCoord, vec2 resolution,\n            vec2 v_rgbNW, vec2 v_rgbNE,\n            vec2 v_rgbSW, vec2 v_rgbSE,\n            vec2 v_rgbM) {\n    vec4 color;\n    mediump vec2 inverseVP = vec2(1.0 / resolution.x, 1.0 / resolution.y);\n    vec3 rgbNW = texture2D(tex, v_rgbNW).xyz;\n    vec3 rgbNE = texture2D(tex, v_rgbNE).xyz;\n    vec3 rgbSW = texture2D(tex, v_rgbSW).xyz;\n    vec3 rgbSE = texture2D(tex, v_rgbSE).xyz;\n    vec4 texColor = texture2D(tex, v_rgbM);\n    vec3 rgbM  = texColor.xyz;\n    vec3 luma = vec3(0.299, 0.587, 0.114);\n    float lumaNW = dot(rgbNW, luma);\n    float lumaNE = dot(rgbNE, luma);\n    float lumaSW = dot(rgbSW, luma);\n    float lumaSE = dot(rgbSE, luma);\n    float lumaM  = dot(rgbM,  luma);\n    float lumaMin = min(lumaM, min(min(lumaNW, lumaNE), min(lumaSW, lumaSE)));\n    float lumaMax = max(lumaM, max(max(lumaNW, lumaNE), max(lumaSW, lumaSE)));\n\n    mediump vec2 dir;\n    dir.x = -((lumaNW + lumaNE) - (lumaSW + lumaSE));\n    dir.y =  ((lumaNW + lumaSW) - (lumaNE + lumaSE));\n\n    float dirReduce = max((lumaNW + lumaNE + lumaSW + lumaSE) *\n                          (0.25 * FXAA_REDUCE_MUL), FXAA_REDUCE_MIN);\n\n    float rcpDirMin = 1.0 / (min(abs(dir.x), abs(dir.y)) + dirReduce);\n    dir = min(vec2(FXAA_SPAN_MAX, FXAA_SPAN_MAX),\n              max(vec2(-FXAA_SPAN_MAX, -FXAA_SPAN_MAX),\n              dir * rcpDirMin)) * inverseVP;\n\n    vec3 rgbA = 0.5 * (\n        texture2D(tex, fragCoord * inverseVP + dir * (1.0 / 3.0 - 0.5)).xyz +\n        texture2D(tex, fragCoord * inverseVP + dir * (2.0 / 3.0 - 0.5)).xyz);\n    vec3 rgbB = rgbA * 0.5 + 0.25 * (\n        texture2D(tex, fragCoord * inverseVP + dir * -0.5).xyz +\n        texture2D(tex, fragCoord * inverseVP + dir * 0.5).xyz);\n\n    float lumaB = dot(rgbB, luma);\n    if ((lumaB < lumaMin) || (lumaB > lumaMax))\n        color = vec4(rgbA, texColor.a);\n    else\n        color = vec4(rgbB, texColor.a);\n    return color;\n}\n\n\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\nvarying vec2 vResolution;\n\n//texcoords computed in vertex step\n//to avoid dependent texture reads\nvarying vec2 v_rgbNW;\nvarying vec2 v_rgbNE;\nvarying vec2 v_rgbSW;\nvarying vec2 v_rgbSE;\nvarying vec2 v_rgbM;\n\nuniform sampler2D uSampler;\n\n\nvoid main(void){\n\n    gl_FragColor = fxaa(uSampler, vTextureCoord * vResolution, vResolution, v_rgbNW, v_rgbNE, v_rgbSW, v_rgbSE, v_rgbM);\n\n}\n',{resolution:{type:"v2",value:{x:1,y:1}}})}var n=t("./AbstractFilter");i.prototype=Object.create(n.prototype),i.prototype.constructor=i,e.exports=i,i.prototype.applyFilter=function(t,e,r){var i=t.filterManager,n=this.getShader(t);i.applyFilter(n,e,r)}},{"./AbstractFilter":40}],42:[function(t,e,r){function i(t){var e=new o.Matrix;n.call(this,"attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\nattribute vec4 aColor;\n\nuniform mat3 projectionMatrix;\nuniform mat3 otherMatrix;\n\nvarying vec2 vMaskCoord;\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n    vMaskCoord = ( otherMatrix * vec3( aTextureCoord, 1.0)  ).xy;\n    vColor = vec4(aColor.rgb * aColor.a, aColor.a);\n}\n","precision lowp float;\n\nvarying vec2 vMaskCoord;\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\n\nuniform sampler2D uSampler;\nuniform float alpha;\nuniform sampler2D mask;\n\nvoid main(void)\n{\n    // check clip! this will stop the mask bleeding out from the edges\n    vec2 text = abs( vMaskCoord - 0.5 );\n    text = step(0.5, text);\n    float clip = 1.0 - max(text.y, text.x);\n    vec4 original = texture2D(uSampler, vTextureCoord);\n    vec4 masky = texture2D(mask, vMaskCoord);\n    original *= (masky.r * masky.a * alpha * clip);\n    gl_FragColor = original;\n}\n",{mask:{type:"sampler2D",value:t._texture},alpha:{type:"f",value:1},otherMatrix:{type:"mat3",value:e.toArray(!0)}}),this.maskSprite=t,this.maskMatrix=e}var n=t("./AbstractFilter"),o=t("../../../math");i.prototype=Object.create(n.prototype),i.prototype.constructor=i,e.exports=i,i.prototype.applyFilter=function(t,e,r){var i=t.filterManager;this.uniforms.mask.value=this.maskSprite._texture,i.calculateMappedMatrix(e.frame,this.maskSprite,this.maskMatrix),this.uniforms.otherMatrix.value=this.maskMatrix.toArray(!0),this.uniforms.alpha.value=this.maskSprite.worldAlpha;var n=this.getShader(t);i.applyFilter(n,e,r)},Object.defineProperties(i.prototype,{map:{get:function(){return this.uniforms.mask.value},set:function(t){this.uniforms.mask.value=t}},offset:{get:function(){return this.uniforms.offset.value},set:function(t){this.uniforms.offset.value=t}}})},{"../../../math":23,"./AbstractFilter":40}],43:[function(t,e,r){function i(t){n.call(this,t),this.currentBlendMode=99999}var n=t("./WebGLManager");i.prototype=Object.create(n.prototype),i.prototype.constructor=i,e.exports=i,i.prototype.setBlendMode=function(t){if(this.currentBlendMode===t)return!1;this.currentBlendMode=t;var e=this.renderer.blendModes[this.currentBlendMode];return this.renderer.gl.blendFunc(e[0],e[1]),!0}},{"./WebGLManager":48}],44:[function(t,e,r){function i(t){n.call(this,t),this.filterStack=[],this.filterStack.push({renderTarget:t.currentRenderTarget,filter:[],bounds:null}),this.texturePool=[],this.textureSize=new h.Rectangle(0,0,t.width,t.height),this.currentFrame=null}var n=t("./WebGLManager"),o=t("../utils/RenderTarget"),s=t("../../../const"),a=t("../utils/Quad"),h=t("../../../math");i.prototype=Object.create(n.prototype),i.prototype.constructor=i,e.exports=i,i.prototype.onContextChange=function(){this.texturePool.length=0;var t=this.renderer.gl;this.quad=new a(t)},i.prototype.setFilterStack=function(t){this.filterStack=t},i.prototype.pushFilter=function(t,e){var r=t.filterArea?t.filterArea.clone():t.getBounds();r.x=0|r.x,r.y=0|r.y,r.width=0|r.width,r.height=0|r.height;var i=0|e[0].padding;if(r.x-=i,r.y-=i,r.width+=2*i,r.height+=2*i,this.renderer.currentRenderTarget.transform){var n=this.renderer.currentRenderTarget.transform;r.x+=n.tx,r.y+=n.ty,this.capFilterArea(r),r.x-=n.tx,r.y-=n.ty}else this.capFilterArea(r);if(r.width>0&&r.height>0){this.currentFrame=r;var o=this.getRenderTarget();this.renderer.setRenderTarget(o),o.clear(),this.filterStack.push({renderTarget:o,filter:e})}else this.filterStack.push({renderTarget:null,filter:e})},i.prototype.popFilter=function(){var t=this.filterStack.pop(),e=this.filterStack[this.filterStack.length-1],r=t.renderTarget;if(t.renderTarget){var i=e.renderTarget,n=this.renderer.gl;this.currentFrame=r.frame,this.quad.map(this.textureSize,r.frame),n.bindBuffer(n.ARRAY_BUFFER,this.quad.vertexBuffer),n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,this.quad.indexBuffer);var o=t.filter;if(n.vertexAttribPointer(this.renderer.shaderManager.defaultShader.attributes.aVertexPosition,2,n.FLOAT,!1,0,0),n.vertexAttribPointer(this.renderer.shaderManager.defaultShader.attributes.aTextureCoord,2,n.FLOAT,!1,0,32),n.vertexAttribPointer(this.renderer.shaderManager.defaultShader.attributes.aColor,4,n.FLOAT,!1,0,64),this.renderer.blendModeManager.setBlendMode(s.BLEND_MODES.NORMAL),1===o.length)o[0].uniforms.dimensions&&(o[0].uniforms.dimensions.value[0]=this.renderer.width,o[0].uniforms.dimensions.value[1]=this.renderer.height,o[0].uniforms.dimensions.value[2]=this.quad.vertices[0],o[0].uniforms.dimensions.value[3]=this.quad.vertices[5]),o[0].applyFilter(this.renderer,r,i),this.returnRenderTarget(r);else{for(var a=r,h=this.getRenderTarget(!0),u=0;u<o.length-1;u++){var l=o[u];l.uniforms.dimensions&&(l.uniforms.dimensions.value[0]=this.renderer.width,l.uniforms.dimensions.value[1]=this.renderer.height,l.uniforms.dimensions.value[2]=this.quad.vertices[0],l.uniforms.dimensions.value[3]=this.quad.vertices[5]),l.applyFilter(this.renderer,a,h);var c=a;a=h,h=c}o[o.length-1].applyFilter(this.renderer,a,i),this.returnRenderTarget(a),this.returnRenderTarget(h)}return t.filter}},i.prototype.getRenderTarget=function(t){var e=this.texturePool.pop()||new o(this.renderer.gl,this.textureSize.width,this.textureSize.height,s.SCALE_MODES.LINEAR,this.renderer.resolution*s.FILTER_RESOLUTION);return e.frame=this.currentFrame,t&&e.clear(!0),e},i.prototype.returnRenderTarget=function(t){this.texturePool.push(t)},i.prototype.applyFilter=function(t,e,r,i){var n=this.renderer.gl;this.renderer.setRenderTarget(r),i&&r.clear(),this.renderer.shaderManager.setShader(t),t.uniforms.projectionMatrix.value=this.renderer.currentRenderTarget.projectionMatrix.toArray(!0),t.syncUniforms(),n.activeTexture(n.TEXTURE0),n.bindTexture(n.TEXTURE_2D,e.texture),n.drawElements(n.TRIANGLES,6,n.UNSIGNED_SHORT,0),this.renderer.drawCount++},i.prototype.calculateMappedMatrix=function(t,e,r){var i=e.worldTransform.copy(h.Matrix.TEMP_MATRIX),n=e._texture.baseTexture,o=r.identity(),s=this.textureSize.height/this.textureSize.width;o.translate(t.x/this.textureSize.width,t.y/this.textureSize.height),o.scale(1,s);var a=this.textureSize.width/n.width,u=this.textureSize.height/n.height;return i.tx/=n.width*a,i.ty/=n.width*a,i.invert(),o.prepend(i),o.scale(1,1/s),o.scale(a,u),o.translate(e.anchor.x,e.anchor.y),o},i.prototype.capFilterArea=function(t){t.x<0&&(t.width+=t.x,t.x=0),t.y<0&&(t.height+=t.y,t.y=0),t.x+t.width>this.textureSize.width&&(t.width=this.textureSize.width-t.x),t.y+t.height>this.textureSize.height&&(t.height=this.textureSize.height-t.y)},i.prototype.resize=function(t,e){this.textureSize.width=t,this.textureSize.height=e;for(var r=0;r<this.texturePool.length;r++)this.texturePool[r].resize(t,e)},i.prototype.destroy=function(){this.quad.destroy(),n.prototype.destroy.call(this),this.filterStack=null,this.offsetY=0;for(var t=0;t<this.texturePool.length;t++)this.texturePool[t].destroy();this.texturePool=null}},{"../../../const":13,"../../../math":23,"../utils/Quad":54,"../utils/RenderTarget":55,"./WebGLManager":48}],45:[function(t,e,r){function i(t){n.call(this,t),this.stencilStack=[],this.reverse=!0,this.count=0,this.alphaMaskPool=[]}var n=t("./WebGLManager"),o=t("../filters/SpriteMaskFilter");i.prototype=Object.create(n.prototype),i.prototype.constructor=i,e.exports=i,i.prototype.pushMask=function(t,e){e.texture?this.pushSpriteMask(t,e):this.pushStencilMask(t,e)},i.prototype.popMask=function(t,e){e.texture?this.popSpriteMask(t,e):this.popStencilMask(t,e)},i.prototype.pushSpriteMask=function(t,e){var r=this.alphaMaskPool.pop();r||(r=[new o(e)]),r[0].maskSprite=e,this.renderer.filterManager.pushFilter(t,r)},i.prototype.popSpriteMask=function(){var t=this.renderer.filterManager.popFilter();this.alphaMaskPool.push(t)},i.prototype.pushStencilMask=function(t,e){this.renderer.stencilManager.pushMask(e)},i.prototype.popStencilMask=function(t,e){this.renderer.stencilManager.popMask(e)}},{"../filters/SpriteMaskFilter":42,"./WebGLManager":48}],46:[function(t,e,r){function i(t){n.call(this,t),this.maxAttibs=10,this.attribState=[],this.tempAttribState=[];for(var e=0;e<this.maxAttibs;e++)this.attribState[e]=!1;this.stack=[],this._currentId=-1,this.currentShader=null}var n=t("./WebGLManager"),o=t("../shaders/TextureShader"),s=t("../shaders/ComplexPrimitiveShader"),a=t("../shaders/PrimitiveShader"),h=t("../../../utils");i.prototype=Object.create(n.prototype),i.prototype.constructor=i,h.pluginTarget.mixin(i),e.exports=i,i.prototype.onContextChange=function(){this.initPlugins();var t=this.renderer.gl;this.maxAttibs=t.getParameter(t.MAX_VERTEX_ATTRIBS),this.attribState=[];for(var e=0;e<this.maxAttibs;e++)this.attribState[e]=!1;this.defaultShader=new o(this),this.primitiveShader=new a(this),this.complexPrimitiveShader=new s(this)},i.prototype.setAttribs=function(t){var e;for(e=0;e<this.tempAttribState.length;e++)this.tempAttribState[e]=!1;for(var r in t)this.tempAttribState[t[r]]=!0;var i=this.renderer.gl;for(e=0;e<this.attribState.length;e++)this.attribState[e]!==this.tempAttribState[e]&&(this.attribState[e]=this.tempAttribState[e],this.attribState[e]?i.enableVertexAttribArray(e):i.disableVertexAttribArray(e))},i.prototype.setShader=function(t){return this._currentId===t.uid?!1:(this._currentId=t.uid,this.currentShader=t,this.renderer.gl.useProgram(t.program),this.setAttribs(t.attributes),!0)},i.prototype.destroy=function(){this.primitiveShader.destroy(),this.complexPrimitiveShader.destroy(),n.prototype.destroy.call(this),this.destroyPlugins(),this.attribState=null,this.tempAttribState=null}},{"../../../utils":67,"../shaders/ComplexPrimitiveShader":49,"../shaders/PrimitiveShader":50,"../shaders/TextureShader":52,"./WebGLManager":48}],47:[function(t,e,r){function i(t){n.call(this,t),this.stencilMaskStack=null}var n=t("./WebGLManager"),o=t("../../../utils");i.prototype=Object.create(n.prototype),i.prototype.constructor=i,e.exports=i,i.prototype.setMaskStack=function(t){this.stencilMaskStack=t;var e=this.renderer.gl;0===t.stencilStack.length?e.disable(e.STENCIL_TEST):e.enable(e.STENCIL_TEST)},i.prototype.pushStencil=function(t,e){this.renderer.currentRenderTarget.attachStencilBuffer();var r=this.renderer.gl,i=this.stencilMaskStack;this.bindGraphics(t,e),0===i.stencilStack.length&&(r.enable(r.STENCIL_TEST),r.clear(r.STENCIL_BUFFER_BIT),i.reverse=!0,i.count=0),i.stencilStack.push(e);var n=i.count;r.colorMask(!1,!1,!1,!1),r.stencilFunc(r.ALWAYS,0,255),r.stencilOp(r.KEEP,r.KEEP,r.INVERT),1===e.mode?(r.drawElements(r.TRIANGLE_FAN,e.indices.length-4,r.UNSIGNED_SHORT,0),i.reverse?(r.stencilFunc(r.EQUAL,255-n,255),r.stencilOp(r.KEEP,r.KEEP,r.DECR)):(r.stencilFunc(r.EQUAL,n,255),r.stencilOp(r.KEEP,r.KEEP,r.INCR)),r.drawElements(r.TRIANGLE_FAN,4,r.UNSIGNED_SHORT,2*(e.indices.length-4)),i.reverse?r.stencilFunc(r.EQUAL,255-(n+1),255):r.stencilFunc(r.EQUAL,n+1,255),i.reverse=!i.reverse):(i.reverse?(r.stencilFunc(r.EQUAL,n,255),r.stencilOp(r.KEEP,r.KEEP,r.INCR)):(r.stencilFunc(r.EQUAL,255-n,255),r.stencilOp(r.KEEP,r.KEEP,r.DECR)),r.drawElements(r.TRIANGLE_STRIP,e.indices.length,r.UNSIGNED_SHORT,0),i.reverse?r.stencilFunc(r.EQUAL,n+1,255):r.stencilFunc(r.EQUAL,255-(n+1),255)),r.colorMask(!0,!0,!0,!0),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),i.count++},i.prototype.bindGraphics=function(t,e){var r,i=this.renderer.gl;1===e.mode?(r=this.renderer.shaderManager.complexPrimitiveShader,this.renderer.shaderManager.setShader(r),i.uniformMatrix3fv(r.uniforms.translationMatrix._location,!1,t.worldTransform.toArray(!0)),i.uniformMatrix3fv(r.uniforms.projectionMatrix._location,!1,this.renderer.currentRenderTarget.projectionMatrix.toArray(!0)),i.uniform3fv(r.uniforms.tint._location,o.hex2rgb(t.tint)),i.uniform3fv(r.uniforms.color._location,e.color),i.uniform1f(r.uniforms.alpha._location,t.worldAlpha),i.bindBuffer(i.ARRAY_BUFFER,e.buffer),i.vertexAttribPointer(r.attributes.aVertexPosition,2,i.FLOAT,!1,8,0),i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.indexBuffer)):(r=this.renderer.shaderManager.primitiveShader,this.renderer.shaderManager.setShader(r),i.uniformMatrix3fv(r.uniforms.translationMatrix._location,!1,t.worldTransform.toArray(!0)),i.uniformMatrix3fv(r.uniforms.projectionMatrix._location,!1,this.renderer.currentRenderTarget.projectionMatrix.toArray(!0)),i.uniform3fv(r.uniforms.tint._location,o.hex2rgb(t.tint)),i.uniform1f(r.uniforms.alpha._location,t.worldAlpha),i.bindBuffer(i.ARRAY_BUFFER,e.buffer),i.vertexAttribPointer(r.attributes.aVertexPosition,2,i.FLOAT,!1,24,0),i.vertexAttribPointer(r.attributes.aColor,4,i.FLOAT,!1,24,8),i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.indexBuffer))},i.prototype.popStencil=function(t,e){var r=this.renderer.gl,i=this.stencilMaskStack;if(i.stencilStack.pop(),i.count--,0===i.stencilStack.length)r.disable(r.STENCIL_TEST);else{var n=i.count;this.bindGraphics(t,e),r.colorMask(!1,!1,!1,!1),1===e.mode?(i.reverse=!i.reverse,i.reverse?(r.stencilFunc(r.EQUAL,255-(n+1),255),r.stencilOp(r.KEEP,r.KEEP,r.INCR)):(r.stencilFunc(r.EQUAL,n+1,255),r.stencilOp(r.KEEP,r.KEEP,r.DECR)),r.drawElements(r.TRIANGLE_FAN,4,r.UNSIGNED_SHORT,2*(e.indices.length-4)),r.stencilFunc(r.ALWAYS,0,255),r.stencilOp(r.KEEP,r.KEEP,r.INVERT),r.drawElements(r.TRIANGLE_FAN,e.indices.length-4,r.UNSIGNED_SHORT,0),this.renderer.drawCount+=2,i.reverse?r.stencilFunc(r.EQUAL,n,255):r.stencilFunc(r.EQUAL,255-n,255)):(i.reverse?(r.stencilFunc(r.EQUAL,n+1,255),r.stencilOp(r.KEEP,r.KEEP,r.DECR)):(r.stencilFunc(r.EQUAL,255-(n+1),255),r.stencilOp(r.KEEP,r.KEEP,r.INCR)),r.drawElements(r.TRIANGLE_STRIP,e.indices.length,r.UNSIGNED_SHORT,0),this.renderer.drawCount++,i.reverse?r.stencilFunc(r.EQUAL,n,255):r.stencilFunc(r.EQUAL,255-n,255)),r.colorMask(!0,!0,!0,!0),r.stencilOp(r.KEEP,r.KEEP,r.KEEP)}},i.prototype.destroy=function(){n.prototype.destroy.call(this),this.stencilMaskStack.stencilStack=null},i.prototype.pushMask=function(t){this.renderer.setObjectRenderer(this.renderer.plugins.graphics),t.dirty&&this.renderer.plugins.graphics.updateGraphics(t,this.renderer.gl),t._webGL[this.renderer.gl.id].data.length&&this.pushStencil(t,t._webGL[this.renderer.gl.id].data[0])},i.prototype.popMask=function(t){this.renderer.setObjectRenderer(this.renderer.plugins.graphics),this.popStencil(t,t._webGL[this.renderer.gl.id].data[0])}},{"../../../utils":67,"./WebGLManager":48}],48:[function(t,e,r){function i(t){this.renderer=t,this.renderer.on("context",this.onContextChange,this)}i.prototype.constructor=i,e.exports=i,i.prototype.onContextChange=function(){},i.prototype.destroy=function(){this.renderer.off("context",this.onContextChange,this),this.renderer=null}},{}],49:[function(t,e,r){function i(t){n.call(this,t,["attribute vec2 aVertexPosition;","uniform mat3 translationMatrix;","uniform mat3 projectionMatrix;","uniform vec3 tint;","uniform float alpha;","uniform vec3 color;","varying vec4 vColor;","void main(void){","   gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);","   vColor = vec4(color * alpha * tint, alpha);","}"].join("\n"),["precision mediump float;","varying vec4 vColor;","void main(void){","   gl_FragColor = vColor;","}"].join("\n"),{tint:{type:"3f",value:[0,0,0]},alpha:{type:"1f",value:0},color:{type:"3f",value:[0,0,0]},translationMatrix:{type:"mat3",value:new Float32Array(9)},projectionMatrix:{type:"mat3",value:new Float32Array(9)}},{aVertexPosition:0})}var n=t("./Shader");i.prototype=Object.create(n.prototype),i.prototype.constructor=i,e.exports=i},{"./Shader":51}],50:[function(t,e,r){function i(t){n.call(this,t,["attribute vec2 aVertexPosition;","attribute vec4 aColor;","uniform mat3 translationMatrix;","uniform mat3 projectionMatrix;","uniform float alpha;","uniform float flipY;","uniform vec3 tint;","varying vec4 vColor;","void main(void){","   gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);","   vColor = aColor * vec4(tint * alpha, alpha);","}"].join("\n"),["precision mediump float;","varying vec4 vColor;","void main(void){","   gl_FragColor = vColor;","}"].join("\n"),{tint:{type:"3f",value:[0,0,0]},alpha:{type:"1f",value:0},translationMatrix:{type:"mat3",value:new Float32Array(9)},projectionMatrix:{type:"mat3",value:new Float32Array(9)}},{aVertexPosition:0,aColor:0})}var n=t("./Shader");i.prototype=Object.create(n.prototype),i.prototype.constructor=i,e.exports=i},{"./Shader":51}],51:[function(t,e,r){function i(t,e,r,i,o){if(!e||!r)throw new Error("Pixi.js Error. Shader requires vertexSrc and fragmentSrc");this.uid=n.uid(),this.gl=t.renderer.gl,this.shaderManager=t,this.program=null,this.uniforms=i||{},this.attributes=o||{},this.textureCount=1,this.vertexSrc=e,this.fragmentSrc=r,this.init()}var n=t("../../../utils");
i.prototype.constructor=i,e.exports=i,i.prototype.init=function(){this.compile(),this.gl.useProgram(this.program),this.cacheUniformLocations(Object.keys(this.uniforms)),this.cacheAttributeLocations(Object.keys(this.attributes))},i.prototype.cacheUniformLocations=function(t){for(var e=0;e<t.length;++e)this.uniforms[t[e]]._location=this.gl.getUniformLocation(this.program,t[e])},i.prototype.cacheAttributeLocations=function(t){for(var e=0;e<t.length;++e)this.attributes[t[e]]=this.gl.getAttribLocation(this.program,t[e])},i.prototype.compile=function(){var t=this.gl,e=this._glCompile(t.VERTEX_SHADER,this.vertexSrc),r=this._glCompile(t.FRAGMENT_SHADER,this.fragmentSrc),i=t.createProgram();return t.attachShader(i,e),t.attachShader(i,r),t.linkProgram(i),t.getProgramParameter(i,t.LINK_STATUS)||(console.error("Pixi.js Error: Could not initialize shader."),console.error("gl.VALIDATE_STATUS",t.getProgramParameter(i,t.VALIDATE_STATUS)),console.error("gl.getError()",t.getError()),""!==t.getProgramInfoLog(i)&&console.warn("Pixi.js Warning: gl.getProgramInfoLog()",t.getProgramInfoLog(i)),t.deleteProgram(i),i=null),t.deleteShader(e),t.deleteShader(r),this.program=i},i.prototype.syncUniform=function(t){var e,r,i=t._location,o=t.value,s=this.gl;switch(t.type){case"b":case"bool":case"boolean":s.uniform1i(i,o?1:0);break;case"i":case"1i":s.uniform1i(i,o);break;case"f":case"1f":s.uniform1f(i,o);break;case"2f":s.uniform2f(i,o[0],o[1]);break;case"3f":s.uniform3f(i,o[0],o[1],o[2]);break;case"4f":s.uniform4f(i,o[0],o[1],o[2],o[3]);break;case"v2":s.uniform2f(i,o.x,o.y);break;case"v3":s.uniform3f(i,o.x,o.y,o.z);break;case"v4":s.uniform4f(i,o.x,o.y,o.z,o.w);break;case"1iv":s.uniform1iv(i,o);break;case"2iv":s.uniform2iv(i,o);break;case"3iv":s.uniform3iv(i,o);break;case"4iv":s.uniform4iv(i,o);break;case"1fv":s.uniform1fv(i,o);break;case"2fv":s.uniform2fv(i,o);break;case"3fv":s.uniform3fv(i,o);break;case"4fv":s.uniform4fv(i,o);break;case"m2":case"mat2":case"Matrix2fv":s.uniformMatrix2fv(i,t.transpose,o);break;case"m3":case"mat3":case"Matrix3fv":s.uniformMatrix3fv(i,t.transpose,o);break;case"m4":case"mat4":case"Matrix4fv":s.uniformMatrix4fv(i,t.transpose,o);break;case"c":"number"==typeof o&&(o=n.hex2rgb(o)),s.uniform3f(i,o[0],o[1],o[2]);break;case"iv1":s.uniform1iv(i,o);break;case"iv":s.uniform3iv(i,o);break;case"fv1":s.uniform1fv(i,o);break;case"fv":s.uniform3fv(i,o);break;case"v2v":for(t._array||(t._array=new Float32Array(2*o.length)),e=0,r=o.length;r>e;++e)t._array[2*e]=o[e].x,t._array[2*e+1]=o[e].y;s.uniform2fv(i,t._array);break;case"v3v":for(t._array||(t._array=new Float32Array(3*o.length)),e=0,r=o.length;r>e;++e)t._array[3*e]=o[e].x,t._array[3*e+1]=o[e].y,t._array[3*e+2]=o[e].z;s.uniform3fv(i,t._array);break;case"v4v":for(t._array||(t._array=new Float32Array(4*o.length)),e=0,r=o.length;r>e;++e)t._array[4*e]=o[e].x,t._array[4*e+1]=o[e].y,t._array[4*e+2]=o[e].z,t._array[4*e+3]=o[e].w;s.uniform4fv(i,t._array);break;case"t":case"sampler2D":if(!t.value||!t.value.baseTexture.hasLoaded)break;s.activeTexture(s["TEXTURE"+this.textureCount]);var a=t.value.baseTexture._glTextures[s.id];a||(this.initSampler2D(t),a=t.value.baseTexture._glTextures[s.id]),s.bindTexture(s.TEXTURE_2D,a),s.uniform1i(t._location,this.textureCount),this.textureCount++;break;default:console.warn("Pixi.js Shader Warning: Unknown uniform type: "+t.type)}},i.prototype.syncUniforms=function(){this.textureCount=1;for(var t in this.uniforms)this.syncUniform(this.uniforms[t])},i.prototype.initSampler2D=function(t){var e=this.gl,r=t.value.baseTexture;if(r.hasLoaded)if(t.textureData){var i=t.textureData;r._glTextures[e.id]=e.createTexture(),e.bindTexture(e.TEXTURE_2D,r._glTextures[e.id]),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,r.premultipliedAlpha),e.texImage2D(e.TEXTURE_2D,0,i.luminance?e.LUMINANCE:e.RGBA,e.RGBA,e.UNSIGNED_BYTE,r.source),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,i.magFilter?i.magFilter:e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,i.wrapS?i.wrapS:e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,i.wrapS?i.wrapS:e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,i.wrapT?i.wrapT:e.CLAMP_TO_EDGE)}else this.shaderManager.renderer.updateTexture(r)},i.prototype.destroy=function(){this.gl.deleteProgram(this.program),this.gl=null,this.uniforms=null,this.attributes=null,this.vertexSrc=null,this.fragmentSrc=null},i.prototype._glCompile=function(t,e){var r=this.gl.createShader(t);return this.gl.shaderSource(r,e),this.gl.compileShader(r),this.gl.getShaderParameter(r,this.gl.COMPILE_STATUS)?r:(console.log(this.gl.getShaderInfoLog(r)),null)}},{"../../../utils":67}],52:[function(t,e,r){function i(t,e,r,o,s){var a={uSampler:{type:"sampler2D",value:0},projectionMatrix:{type:"mat3",value:new Float32Array([1,0,0,0,1,0,0,0,1])}};if(o)for(var h in o)a[h]=o[h];var u={aVertexPosition:0,aTextureCoord:0,aColor:0};if(s)for(var l in s)u[l]=s[l];e=e||i.defaultVertexSrc,r=r||i.defaultFragmentSrc,n.call(this,t,e,r,a,u)}var n=t("./Shader");i.prototype=Object.create(n.prototype),i.prototype.constructor=i,e.exports=i,i.defaultVertexSrc=["precision lowp float;","attribute vec2 aVertexPosition;","attribute vec2 aTextureCoord;","attribute vec4 aColor;","uniform mat3 projectionMatrix;","varying vec2 vTextureCoord;","varying vec4 vColor;","void main(void){","   gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);","   vTextureCoord = aTextureCoord;","   vColor = vec4(aColor.rgb * aColor.a, aColor.a);","}"].join("\n"),i.defaultFragmentSrc=["precision lowp float;","varying vec2 vTextureCoord;","varying vec4 vColor;","uniform sampler2D uSampler;","void main(void){","   gl_FragColor = texture2D(uSampler, vTextureCoord) * vColor ;","}"].join("\n")},{"./Shader":51}],53:[function(t,e,r){function i(t){n.call(this,t)}var n=t("../managers/WebGLManager");i.prototype=Object.create(n.prototype),i.prototype.constructor=i,e.exports=i,i.prototype.start=function(){},i.prototype.stop=function(){this.flush()},i.prototype.flush=function(){},i.prototype.render=function(t){}},{"../managers/WebGLManager":48}],54:[function(t,e,r){function i(t){this.gl=t,this.vertices=new Float32Array([0,0,200,0,200,200,0,200]),this.uvs=new Float32Array([0,0,1,0,1,1,0,1]),this.colors=new Float32Array([1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]),this.indices=new Uint16Array([0,1,2,0,3,2]),this.vertexBuffer=t.createBuffer(),this.indexBuffer=t.createBuffer(),t.bindBuffer(t.ARRAY_BUFFER,this.vertexBuffer),t.bufferData(t.ARRAY_BUFFER,128,t.DYNAMIC_DRAW),t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,this.indexBuffer),t.bufferData(t.ELEMENT_ARRAY_BUFFER,this.indices,t.STATIC_DRAW),this.upload()}i.prototype.constructor=i,i.prototype.map=function(t,e){var r=0,i=0;this.uvs[0]=r,this.uvs[1]=i,this.uvs[2]=r+e.width/t.width,this.uvs[3]=i,this.uvs[4]=r+e.width/t.width,this.uvs[5]=i+e.height/t.height,this.uvs[6]=r,this.uvs[7]=i+e.height/t.height,r=e.x,i=e.y,this.vertices[0]=r,this.vertices[1]=i,this.vertices[2]=r+e.width,this.vertices[3]=i,this.vertices[4]=r+e.width,this.vertices[5]=i+e.height,this.vertices[6]=r,this.vertices[7]=i+e.height,this.upload()},i.prototype.upload=function(){var t=this.gl;t.bindBuffer(t.ARRAY_BUFFER,this.vertexBuffer),t.bufferSubData(t.ARRAY_BUFFER,0,this.vertices),t.bufferSubData(t.ARRAY_BUFFER,32,this.uvs),t.bufferSubData(t.ARRAY_BUFFER,64,this.colors)},i.prototype.destroy=function(){var t=this.gl;t.deleteBuffer(this.vertexBuffer),t.deleteBuffer(this.indexBuffer)},e.exports=i},{}],55:[function(t,e,r){var i=t("../../../math"),n=t("../../../utils"),o=t("../../../const"),s=t("./StencilMaskStack"),a=function(t,e,r,a,h,u){if(this.gl=t,this.frameBuffer=null,this.texture=null,this.size=new i.Rectangle(0,0,1,1),this.resolution=h||o.RESOLUTION,this.projectionMatrix=new i.Matrix,this.transform=null,this.frame=null,this.stencilBuffer=null,this.stencilMaskStack=new s,this.filterStack=[{renderTarget:this,filter:[],bounds:this.size}],this.scaleMode=a||o.SCALE_MODES.DEFAULT,this.root=u,!this.root){this.frameBuffer=t.createFramebuffer(),this.texture=t.createTexture(),t.bindTexture(t.TEXTURE_2D,this.texture),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,a===o.SCALE_MODES.LINEAR?t.LINEAR:t.NEAREST),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,a===o.SCALE_MODES.LINEAR?t.LINEAR:t.NEAREST);var l=n.isPowerOfTwo(e,r);l?(t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.REPEAT),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.REPEAT)):(t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE)),t.bindFramebuffer(t.FRAMEBUFFER,this.frameBuffer),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,this.texture,0)}this.resize(e,r)};a.prototype.constructor=a,e.exports=a,a.prototype.clear=function(t){var e=this.gl;t&&e.bindFramebuffer(e.FRAMEBUFFER,this.frameBuffer),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT)},a.prototype.attachStencilBuffer=function(){if(!this.stencilBuffer&&!this.root){var t=this.gl;this.stencilBuffer=t.createRenderbuffer(),t.bindRenderbuffer(t.RENDERBUFFER,this.stencilBuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.RENDERBUFFER,this.stencilBuffer),t.renderbufferStorage(t.RENDERBUFFER,t.DEPTH_STENCIL,this.size.width*this.resolution,this.size.height*this.resolution)}},a.prototype.activate=function(){var t=this.gl;t.bindFramebuffer(t.FRAMEBUFFER,this.frameBuffer);var e=this.frame||this.size;this.calculateProjection(e),this.transform&&this.projectionMatrix.append(this.transform),t.viewport(0,0,e.width*this.resolution,e.height*this.resolution)},a.prototype.calculateProjection=function(t){var e=this.projectionMatrix;e.identity(),this.root?(e.a=1/t.width*2,e.d=-1/t.height*2,e.tx=-1-t.x*e.a,e.ty=1-t.y*e.d):(e.a=1/t.width*2,e.d=1/t.height*2,e.tx=-1-t.x*e.a,e.ty=-1-t.y*e.d)},a.prototype.resize=function(t,e){if(t=0|t,e=0|e,this.size.width!==t||this.size.height!==e){if(this.size.width=t,this.size.height=e,!this.root){var r=this.gl;r.bindTexture(r.TEXTURE_2D,this.texture),r.texImage2D(r.TEXTURE_2D,0,r.RGBA,t*this.resolution,e*this.resolution,0,r.RGBA,r.UNSIGNED_BYTE,null),this.stencilBuffer&&(r.bindRenderbuffer(r.RENDERBUFFER,this.stencilBuffer),r.renderbufferStorage(r.RENDERBUFFER,r.DEPTH_STENCIL,t*this.resolution,e*this.resolution))}var i=this.frame||this.size;this.calculateProjection(i)}},a.prototype.destroy=function(){var t=this.gl;t.deleteRenderbuffer(this.stencilBuffer),t.deleteFramebuffer(this.frameBuffer),t.deleteTexture(this.texture),this.frameBuffer=null,this.texture=null}},{"../../../const":13,"../../../math":23,"../../../utils":67,"./StencilMaskStack":56}],56:[function(t,e,r){function i(){this.stencilStack=[],this.reverse=!0,this.count=0}i.prototype.constructor=i,e.exports=i},{}],57:[function(t,e,r){function i(t){s.call(this),this.anchor=new n.Point,this._texture=null,this._width=0,this._height=0,this.tint=16777215,this.blendMode=u.BLEND_MODES.NORMAL,this.shader=null,this.cachedTint=16777215,this.texture=t||o.EMPTY}var n=t("../math"),o=t("../textures/Texture"),s=t("../display/Container"),a=t("../renderers/canvas/utils/CanvasTinter"),h=t("../utils"),u=t("../const"),l=new n.Point;i.prototype=Object.create(s.prototype),i.prototype.constructor=i,e.exports=i,Object.defineProperties(i.prototype,{width:{get:function(){return Math.abs(this.scale.x)*this.texture._frame.width},set:function(t){this.scale.x=h.sign(this.scale.x)*t/this.texture._frame.width,this._width=t}},height:{get:function(){return Math.abs(this.scale.y)*this.texture._frame.height},set:function(t){this.scale.y=h.sign(this.scale.y)*t/this.texture._frame.height,this._height=t}},texture:{get:function(){return this._texture},set:function(t){this._texture!==t&&(this._texture=t,this.cachedTint=16777215,t&&(t.baseTexture.hasLoaded?this._onTextureUpdate():t.once("update",this._onTextureUpdate,this)))}}}),i.prototype._onTextureUpdate=function(){this._width&&(this.scale.x=h.sign(this.scale.x)*this._width/this.texture.frame.width),this._height&&(this.scale.y=h.sign(this.scale.y)*this._height/this.texture.frame.height)},i.prototype._renderWebGL=function(t){t.setObjectRenderer(t.plugins.sprite),t.plugins.sprite.render(this)},i.prototype.getBounds=function(t){if(!this._currentBounds){var e,r,i,n,o=this._texture._frame.width,s=this._texture._frame.height,a=o*(1-this.anchor.x),h=o*-this.anchor.x,u=s*(1-this.anchor.y),l=s*-this.anchor.y,c=t||this.worldTransform,p=c.a,d=c.b,f=c.c,v=c.d,g=c.tx,m=c.ty;if(0===d&&0===f)0>p&&(p*=-1),0>v&&(v*=-1),e=p*h+g,r=p*a+g,i=v*l+m,n=v*u+m;else{var y=p*h+f*l+g,x=v*l+d*h+m,b=p*a+f*l+g,_=v*l+d*a+m,T=p*a+f*u+g,E=v*u+d*a+m,S=p*h+f*u+g,w=v*u+d*h+m;e=y,e=e>b?b:e,e=e>T?T:e,e=e>S?S:e,i=x,i=i>_?_:i,i=i>E?E:i,i=i>w?w:i,r=y,r=b>r?b:r,r=T>r?T:r,r=S>r?S:r,n=x,n=_>n?_:n,n=E>n?E:n,n=w>n?w:n}if(this.children.length){var A=this.containerGetBounds();a=A.x,h=A.x+A.width,u=A.y,l=A.y+A.height,e=a>e?e:a,i=u>i?i:u,r=r>h?r:h,n=n>l?n:l}var C=this._bounds;C.x=e,C.width=r-e,C.y=i,C.height=n-i,this._currentBounds=C}return this._currentBounds},i.prototype.getLocalBounds=function(){return this._bounds.x=-this._texture._frame.width*this.anchor.x,this._bounds.y=-this._texture._frame.height*this.anchor.y,this._bounds.width=this._texture._frame.width,this._bounds.height=this._texture._frame.height,this._bounds},i.prototype.containsPoint=function(t){this.worldTransform.applyInverse(t,l);var e,r=this._texture._frame.width,i=this._texture._frame.height,n=-r*this.anchor.x;return l.x>n&&l.x<n+r&&(e=-i*this.anchor.y,l.y>e&&l.y<e+i)?!0:!1},i.prototype._renderCanvas=function(t){if(!(this.texture.crop.width<=0||this.texture.crop.height<=0)){var e=t.blendModes[this.blendMode];if(e!==t.context.globalCompositeOperation&&(t.context.globalCompositeOperation=e),this.texture.valid){var r,i,n,o,s=this._texture,h=this.worldTransform;t.context.globalAlpha=this.worldAlpha;var l=s.baseTexture.scaleMode===u.SCALE_MODES.LINEAR;if(t.smoothProperty&&t.context[t.smoothProperty]!==l&&(t.context[t.smoothProperty]=l),s.rotate){var c=h.a,p=h.b;h.a=-h.c,h.b=-h.d,h.c=c,h.d=p,n=s.crop.height,o=s.crop.width,r=s.trim?s.trim.y-this.anchor.y*s.trim.height:this.anchor.y*-s._frame.height,i=s.trim?s.trim.x-this.anchor.x*s.trim.width:this.anchor.x*-s._frame.width}else n=s.crop.width,o=s.crop.height,r=s.trim?s.trim.x-this.anchor.x*s.trim.width:this.anchor.x*-s._frame.width,i=s.trim?s.trim.y-this.anchor.y*s.trim.height:this.anchor.y*-s._frame.height;t.roundPixels?(t.context.setTransform(h.a,h.b,h.c,h.d,h.tx*t.resolution|0,h.ty*t.resolution|0),r=0|r,i=0|i):t.context.setTransform(h.a,h.b,h.c,h.d,h.tx*t.resolution,h.ty*t.resolution);var d=s.baseTexture.resolution;16777215!==this.tint?(this.cachedTint!==this.tint&&(this.cachedTint=this.tint,this.tintedTexture=a.getTintedTexture(this,this.tint)),t.context.drawImage(this.tintedTexture,0,0,n*d,o*d,r*t.resolution,i*t.resolution,n*t.resolution,o*t.resolution)):t.context.drawImage(s.baseTexture.source,s.crop.x*d,s.crop.y*d,n*d,o*d,r*t.resolution,i*t.resolution,n*t.resolution,o*t.resolution)}}},i.prototype.destroy=function(t,e){s.prototype.destroy.call(this),this.anchor=null,t&&this._texture.destroy(e),this._texture=null,this.shader=null},i.fromFrame=function(t){var e=h.TextureCache[t];if(!e)throw new Error('The frameId "'+t+'" does not exist in the texture cache');return new i(e)},i.fromImage=function(t,e,r){return new i(o.fromImage(t,e,r))}},{"../const":13,"../display/Container":14,"../math":23,"../renderers/canvas/utils/CanvasTinter":38,"../textures/Texture":62,"../utils":67}],58:[function(t,e,r){function i(t){n.call(this,t),this.vertSize=5,this.vertByteSize=4*this.vertSize,this.size=s.SPRITE_BATCH_SIZE;var e=4*this.size*this.vertByteSize,r=6*this.size;this.vertices=new ArrayBuffer(e),this.positions=new Float32Array(this.vertices),this.colors=new Uint32Array(this.vertices),this.indices=new Uint16Array(r);for(var i=0,o=0;r>i;i+=6,o+=4)this.indices[i+0]=o+0,this.indices[i+1]=o+1,this.indices[i+2]=o+2,this.indices[i+3]=o+0,this.indices[i+4]=o+2,this.indices[i+5]=o+3;this.currentBatchSize=0,this.sprites=[],this.shader=null}var n=t("../../renderers/webgl/utils/ObjectRenderer"),o=t("../../renderers/webgl/WebGLRenderer"),s=t("../../const");i.prototype=Object.create(n.prototype),i.prototype.constructor=i,e.exports=i,o.registerPlugin("sprite",i),i.prototype.onContextChange=function(){var t=this.renderer.gl;this.shader=this.renderer.shaderManager.defaultShader,this.vertexBuffer=t.createBuffer(),this.indexBuffer=t.createBuffer(),t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,this.indexBuffer),t.bufferData(t.ELEMENT_ARRAY_BUFFER,this.indices,t.STATIC_DRAW),t.bindBuffer(t.ARRAY_BUFFER,this.vertexBuffer),t.bufferData(t.ARRAY_BUFFER,this.vertices,t.DYNAMIC_DRAW),this.currentBlendMode=99999},i.prototype.render=function(t){var e=t._texture;this.currentBatchSize>=this.size&&this.flush();var r=e._uvs;if(r){var i,n,o,s,a=t.anchor.x,h=t.anchor.y;if(e.trim&&void 0===t.tileScale){var u=e.trim;n=u.x-a*u.width,i=n+e.crop.width,s=u.y-h*u.height,o=s+e.crop.height}else i=e._frame.width*(1-a),n=e._frame.width*-a,o=e._frame.height*(1-h),s=e._frame.height*-h;var l=this.currentBatchSize*this.vertByteSize,c=t.worldTransform,p=c.a,d=c.b,f=c.c,v=c.d,g=c.tx,m=c.ty,y=this.colors,x=this.positions;this.renderer.roundPixels?(x[l]=p*n+f*s+g|0,x[l+1]=v*s+d*n+m|0,x[l+5]=p*i+f*s+g|0,x[l+6]=v*s+d*i+m|0,x[l+10]=p*i+f*o+g|0,x[l+11]=v*o+d*i+m|0,x[l+15]=p*n+f*o+g|0,x[l+16]=v*o+d*n+m|0):(x[l]=p*n+f*s+g,x[l+1]=v*s+d*n+m,x[l+5]=p*i+f*s+g,x[l+6]=v*s+d*i+m,x[l+10]=p*i+f*o+g,x[l+11]=v*o+d*i+m,x[l+15]=p*n+f*o+g,x[l+16]=v*o+d*n+m),x[l+2]=r.x0,x[l+3]=r.y0,x[l+7]=r.x1,x[l+8]=r.y1,x[l+12]=r.x2,x[l+13]=r.y2,x[l+17]=r.x3,x[l+18]=r.y3;var b=t.tint;y[l+4]=y[l+9]=y[l+14]=y[l+19]=(b>>16)+(65280&b)+((255&b)<<16)+(255*t.worldAlpha<<24),this.sprites[this.currentBatchSize++]=t}},i.prototype.flush=function(){if(0!==this.currentBatchSize){var t,e=this.renderer.gl;if(this.currentBatchSize>.5*this.size)e.bufferSubData(e.ARRAY_BUFFER,0,this.vertices);else{var r=this.positions.subarray(0,this.currentBatchSize*this.vertByteSize);e.bufferSubData(e.ARRAY_BUFFER,0,r)}for(var i,n,o,s,a=0,h=0,u=null,l=this.renderer.blendModeManager.currentBlendMode,c=null,p=!1,d=!1,f=0,v=this.currentBatchSize;v>f;f++)s=this.sprites[f],i=s._texture.baseTexture,n=s.blendMode,o=s.shader||this.shader,p=l!==n,d=c!==o,(u!==i||p||d)&&(this.renderBatch(u,a,h),h=f,a=0,u=i,p&&(l=n,this.renderer.blendModeManager.setBlendMode(l)),d&&(c=o,t=c.shaders?c.shaders[e.id]:c,t||(t=c.getShader(this.renderer)),this.renderer.shaderManager.setShader(t),t.uniforms.projectionMatrix.value=this.renderer.currentRenderTarget.projectionMatrix.toArray(!0),t.syncUniforms(),e.activeTexture(e.TEXTURE0))),a++;this.renderBatch(u,a,h),this.currentBatchSize=0}},i.prototype.renderBatch=function(t,e,r){if(0!==e){var i=this.renderer.gl;t._glTextures[i.id]?i.bindTexture(i.TEXTURE_2D,t._glTextures[i.id]):this.renderer.updateTexture(t),i.drawElements(i.TRIANGLES,6*e,i.UNSIGNED_SHORT,6*r*2),this.renderer.drawCount++}},i.prototype.start=function(){var t=this.renderer.gl;t.bindBuffer(t.ARRAY_BUFFER,this.vertexBuffer),t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,this.indexBuffer);var e=this.vertByteSize;t.vertexAttribPointer(this.shader.attributes.aVertexPosition,2,t.FLOAT,!1,e,0),t.vertexAttribPointer(this.shader.attributes.aTextureCoord,2,t.FLOAT,!1,e,8),t.vertexAttribPointer(this.shader.attributes.aColor,4,t.UNSIGNED_BYTE,!0,e,16)},i.prototype.destroy=function(){this.renderer.gl.deleteBuffer(this.vertexBuffer),this.renderer.gl.deleteBuffer(this.indexBuffer),n.prototype.destroy.call(this),this.shader.destroy(),this.renderer=null,this.vertices=null,this.positions=null,this.colors=null,this.indices=null,this.vertexBuffer=null,this.indexBuffer=null,this.sprites=null,this.shader=null}},{"../../const":13,"../../renderers/webgl/WebGLRenderer":39,"../../renderers/webgl/utils/ObjectRenderer":53}],59:[function(t,e,r){function i(t,e,r){this.canvas=document.createElement("canvas"),this.context=this.canvas.getContext("2d"),this.resolution=r||h.RESOLUTION,this._text=null,this._style=null;var i=o.fromCanvas(this.canvas);i.trim=new s.Rectangle,n.call(this,i),this.text=t,this.style=e}var n=t("../sprites/Sprite"),o=t("../textures/Texture"),s=t("../math"),a=t("../utils"),h=t("../const");i.prototype=Object.create(n.prototype),i.prototype.constructor=i,e.exports=i,i.fontPropertiesCache={},i.fontPropertiesCanvas=document.createElement("canvas"),i.fontPropertiesContext=i.fontPropertiesCanvas.getContext("2d"),Object.defineProperties(i.prototype,{width:{get:function(){return this.dirty&&this.updateText(),this.scale.x*this._texture._frame.width},set:function(t){this.scale.x=t/this._texture._frame.width,this._width=t}},height:{get:function(){return this.dirty&&this.updateText(),this.scale.y*this._texture._frame.height},set:function(t){this.scale.y=t/this._texture._frame.height,this._height=t}},style:{get:function(){return this._style},set:function(t){t=t||{},"number"==typeof t.fill&&(t.fill=a.hex2string(t.fill)),"number"==typeof t.stroke&&(t.stroke=a.hex2string(t.stroke)),"number"==typeof t.dropShadowColor&&(t.dropShadowColor=a.hex2string(t.dropShadowColor)),t.font=t.font||"bold 20pt Arial",t.fill=t.fill||"black",t.align=t.align||"left",t.stroke=t.stroke||"black",t.strokeThickness=t.strokeThickness||0,t.wordWrap=t.wordWrap||!1,t.wordWrapWidth=t.wordWrapWidth||100,t.dropShadow=t.dropShadow||!1,t.dropShadowColor=t.dropShadowColor||"#000000",t.dropShadowAngle=t.dropShadowAngle||Math.PI/6,t.dropShadowDistance=t.dropShadowDistance||5,t.padding=t.padding||0,t.textBaseline=t.textBaseline||"alphabetic",t.lineJoin=t.lineJoin||"miter",t.miterLimit=t.miterLimit||10,this._style=t,this.dirty=!0}},text:{get:function(){return this._text},set:function(t){t=t.toString()||" ",this._text!==t&&(this._text=t,this.dirty=!0)}}}),i.prototype.updateText=function(){var t=this._style;this.context.font=t.font;for(var e=t.wordWrap?this.wordWrap(this._text):this._text,r=e.split(/(?:\r\n|\r|\n)/),i=new Array(r.length),n=0,o=this.determineFontProperties(t.font),s=0;s<r.length;s++){var a=this.context.measureText(r[s]).width;i[s]=a,n=Math.max(n,a)}var h=n+t.strokeThickness;t.dropShadow&&(h+=t.dropShadowDistance),this.canvas.width=(h+this.context.lineWidth)*this.resolution;var u=this.style.lineHeight||o.fontSize+t.strokeThickness,l=u*r.length;t.dropShadow&&(l+=t.dropShadowDistance),this.canvas.height=(l+2*this._style.padding)*this.resolution,this.context.scale(this.resolution,this.resolution),navigator.isCocoonJS&&this.context.clearRect(0,0,this.canvas.width,this.canvas.height),this.context.font=t.font,this.context.strokeStyle=t.stroke,this.context.lineWidth=t.strokeThickness,this.context.textBaseline=t.textBaseline,this.context.lineJoin=t.lineJoin,this.context.miterLimit=t.miterLimit;var c,p;if(t.dropShadow){this.context.fillStyle=t.dropShadowColor;var d=Math.cos(t.dropShadowAngle)*t.dropShadowDistance,f=Math.sin(t.dropShadowAngle)*t.dropShadowDistance;for(s=0;s<r.length;s++)c=t.strokeThickness/2,p=t.strokeThickness/2+s*u+o.ascent,"right"===t.align?c+=n-i[s]:"center"===t.align&&(c+=(n-i[s])/2),t.fill&&this.context.fillText(r[s],c+d,p+f+this._style.padding)}for(this.context.fillStyle=t.fill,s=0;s<r.length;s++)c=t.strokeThickness/2,p=t.strokeThickness/2+s*u+o.ascent,"right"===t.align?c+=n-i[s]:"center"===t.align&&(c+=(n-i[s])/2),t.stroke&&t.strokeThickness&&this.context.strokeText(r[s],c,p+this._style.padding),t.fill&&this.context.fillText(r[s],c,p+this._style.padding);this.updateTexture()},i.prototype.updateTexture=function(){var t=this._texture;t.baseTexture.hasLoaded=!0,t.baseTexture.resolution=this.resolution,t.baseTexture.width=this.canvas.width/this.resolution,t.baseTexture.height=this.canvas.height/this.resolution,t.crop.width=t._frame.width=this.canvas.width/this.resolution,t.crop.height=t._frame.height=this.canvas.height/this.resolution,t.trim.x=0,t.trim.y=-this._style.padding,t.trim.width=t._frame.width,t.trim.height=t._frame.height-2*this._style.padding,this._width=this.canvas.width/this.resolution,this._height=this.canvas.height/this.resolution,t.baseTexture.emit("update",t.baseTexture),this.dirty=!1},i.prototype.renderWebGL=function(t){this.dirty&&this.updateText(),n.prototype.renderWebGL.call(this,t)},i.prototype._renderCanvas=function(t){this.dirty&&this.updateText(),n.prototype._renderCanvas.call(this,t)},i.prototype.determineFontProperties=function(t){var e=i.fontPropertiesCache[t];if(!e){e={};var r=i.fontPropertiesCanvas,n=i.fontPropertiesContext;n.font=t;var o=Math.ceil(n.measureText("|MÉq").width),s=Math.ceil(n.measureText("M").width),a=2*s;s=1.4*s|0,r.width=o,r.height=a,n.fillStyle="#f00",n.fillRect(0,0,o,a),n.font=t,n.textBaseline="alphabetic",n.fillStyle="#000",n.fillText("|MÉq",0,s);var h,u,l=n.getImageData(0,0,o,a).data,c=l.length,p=4*o,d=0,f=!1;for(h=0;s>h;h++){for(u=0;p>u;u+=4)if(255!==l[d+u]){f=!0;break}if(f)break;d+=p}for(e.ascent=s-h,d=c-p,f=!1,h=a;h>s;h--){for(u=0;p>u;u+=4)if(255!==l[d+u]){f=!0;break}if(f)break;d-=p}e.descent=h-s,e.fontSize=e.ascent+e.descent,i.fontPropertiesCache[t]=e}return e},i.prototype.wordWrap=function(t){for(var e="",r=t.split("\n"),i=this._style.wordWrapWidth,n=0;n<r.length;n++){for(var o=i,s=r[n].split(" "),a=0;a<s.length;a++){var h=this.context.measureText(s[a]).width,u=h+this.context.measureText(" ").width;0===a||u>o?(a>0&&(e+="\n"),e+=s[a],o=i-h):(o-=u,e+=" "+s[a])}n<r.length-1&&(e+="\n")}return e},i.prototype.getBounds=function(t){return this.dirty&&this.updateText(),n.prototype.getBounds.call(this,t)},i.prototype.destroy=function(t){this.context=null,this.canvas=null,this._style=null,this._texture.destroy(void 0===t?!0:t)}},{"../const":13,"../math":23,"../sprites/Sprite":57,"../textures/Texture":62,"../utils":67}],60:[function(t,e,r){function i(t,e,r){s.call(this),this.uid=n.uid(),this.resolution=r||1,this.width=100,this.height=100,this.realWidth=100,this.realHeight=100,this.scaleMode=e||o.SCALE_MODES.DEFAULT,this.hasLoaded=!1,this.isLoading=!1,this.source=null,this.premultipliedAlpha=!0,this.imageUrl=null,this.isPowerOfTwo=!1,this.mipmap=!1,this._glTextures=[],t&&this.loadSource(t)}var n=t("../utils"),o=t("../const"),s=t("eventemitter3");i.prototype=Object.create(s.prototype),i.prototype.constructor=i,e.exports=i,i.prototype.update=function(){this.realWidth=this.source.naturalWidth||this.source.width,this.realHeight=this.source.naturalHeight||this.source.height,this.width=this.realWidth/this.resolution,this.height=this.realHeight/this.resolution,this.isPowerOfTwo=n.isPowerOfTwo(this.realWidth,this.realHeight),this.emit("update",this)},i.prototype.loadSource=function(t){var e=this.isLoading;if(this.hasLoaded=!1,this.isLoading=!1,e&&this.source&&(this.source.onload=null,this.source.onerror=null),this.source=t,(this.source.complete||this.source.getContext)&&this.source.width&&this.source.height)this._sourceLoaded();else if(!t.getContext){this.isLoading=!0;var r=this;t.onload=function(){t.onload=null,t.onerror=null,r.isLoading&&(r.isLoading=!1,r._sourceLoaded(),r.emit("loaded",r))},t.onerror=function(){t.onload=null,t.onerror=null,r.isLoading&&(r.isLoading=!1,r.emit("error",r))},t.complete&&t.src&&(this.isLoading=!1,t.onload=null,t.onerror=null,t.width&&t.height?(this._sourceLoaded(),e&&this.emit("loaded",this)):e&&this.emit("error",this))}},i.prototype._sourceLoaded=function(){this.hasLoaded=!0,this.update()},i.prototype.destroy=function(){this.imageUrl?(delete n.BaseTextureCache[this.imageUrl],delete n.TextureCache[this.imageUrl],this.imageUrl=null,navigator.isCocoonJS||(this.source.src="")):this.source&&this.source._pixiId&&delete n.BaseTextureCache[this.source._pixiId],this.source=null,this.dispose()},i.prototype.dispose=function(){this.emit("dispose",this),this._glTextures.length=0},i.prototype.updateSourceImage=function(t){this.source.src=t,this.loadSource(this.source)},i.fromImage=function(t,e,r){var o=n.BaseTextureCache[t];if(void 0===e&&0!==t.indexOf("data:")&&(e=!0),!o){var s=new Image;e&&(s.crossOrigin=""),o=new i(s,r),o.imageUrl=t,s.src=t,n.BaseTextureCache[t]=o,o.resolution=n.getResolutionOfUrl(t)}return o},i.fromCanvas=function(t,e){t._pixiId||(t._pixiId="canvas_"+n.uid());var r=n.BaseTextureCache[t._pixiId];return r||(r=new i(t,e),n.BaseTextureCache[t._pixiId]=r),r}},{"../const":13,"../utils":67,eventemitter3:10}],61:[function(t,e,r){function i(t,e,r,i,c){if(!t)throw new Error("Unable to create RenderTexture, you must pass a renderer into the constructor.");e=e||100,r=r||100,c=c||l.RESOLUTION;var p=new n;if(p.width=e,p.height=r,p.resolution=c,p.scaleMode=i||l.SCALE_MODES.DEFAULT,p.hasLoaded=!0,o.call(this,p,new u.Rectangle(0,0,e,r)),this.width=e,this.height=r,this.resolution=c,this.render=null,this.renderer=t,this.renderer.type===l.RENDERER_TYPE.WEBGL){var d=this.renderer.gl;this.textureBuffer=new s(d,this.width,this.height,p.scaleMode,this.resolution),this.baseTexture._glTextures[d.id]=this.textureBuffer.texture,this.filterManager=new a(this.renderer),this.filterManager.onContextChange(),this.filterManager.resize(e,r),this.render=this.renderWebGL,this.renderer.currentRenderer.start(),this.renderer.currentRenderTarget.activate()}else this.render=this.renderCanvas,this.textureBuffer=new h(this.width*this.resolution,this.height*this.resolution),this.baseTexture.source=this.textureBuffer.canvas;this.valid=!0,this._updateUvs()}var n=t("./BaseTexture"),o=t("./Texture"),s=t("../renderers/webgl/utils/RenderTarget"),a=t("../renderers/webgl/managers/FilterManager"),h=t("../renderers/canvas/utils/CanvasBuffer"),u=t("../math"),l=t("../const"),c=new u.Matrix;i.prototype=Object.create(o.prototype),i.prototype.constructor=i,e.exports=i,i.prototype.resize=function(t,e,r){(t!==this.width||e!==this.height)&&(this.valid=t>0&&e>0,this.width=this._frame.width=this.crop.width=t,this.height=this._frame.height=this.crop.height=e,r&&(this.baseTexture.width=this.width,this.baseTexture.height=this.height),this.valid&&(this.textureBuffer.resize(this.width,this.height),this.filterManager&&this.filterManager.resize(this.width,this.height)))},i.prototype.clear=function(){this.valid&&(this.renderer.type===l.RENDERER_TYPE.WEBGL&&this.renderer.gl.bindFramebuffer(this.renderer.gl.FRAMEBUFFER,this.textureBuffer.frameBuffer),this.textureBuffer.clear())},i.prototype.renderWebGL=function(t,e,r,i){if(this.valid){if(i=void 0!==i?i:!0,this.textureBuffer.transform=e,this.textureBuffer.activate(),t.worldAlpha=1,i){t.worldTransform.identity(),t.currentBounds=null;var n,o,s=t.children;for(n=0,o=s.length;o>n;++n)s[n].updateTransform()}var a=this.renderer.filterManager;this.renderer.filterManager=this.filterManager,this.renderer.renderDisplayObject(t,this.textureBuffer,r),this.renderer.filterManager=a}},i.prototype.renderCanvas=function(t,e,r,i){if(this.valid){i=!!i;var n=c;n.identity(),e&&n.append(e),t.worldTransform=n;var o=t.worldTransform;t.worldAlpha=1;var s,a,h=t.children;for(s=0,a=h.length;a>s;++s)h[s].updateTransform();r&&this.textureBuffer.clear();var u=this.textureBuffer.context,l=this.renderer.resolution;this.renderer.resolution=this.resolution,this.renderer.renderDisplayObject(t,u),this.renderer.resolution=l,t.worldTransform=o}},i.prototype.destroy=function(){o.prototype.destroy.call(this,!0),this.textureBuffer.destroy(),this.filterManager&&this.filterManager.destroy(),this.renderer=null},i.prototype.getImage=function(){var t=new Image;return t.src=this.getBase64(),t},i.prototype.getBase64=function(){return this.getCanvas().toDataURL()},i.prototype.getCanvas=function(){if(this.renderer.type===l.RENDERER_TYPE.WEBGL){var t=this.renderer.gl,e=this.textureBuffer.size.width,r=this.textureBuffer.size.height,i=new Uint8Array(4*e*r);t.bindFramebuffer(t.FRAMEBUFFER,this.textureBuffer.frameBuffer),t.readPixels(0,0,e,r,t.RGBA,t.UNSIGNED_BYTE,i),t.bindFramebuffer(t.FRAMEBUFFER,null);var n=new h(e,r),o=n.context.getImageData(0,0,e,r);return o.data.set(i),n.context.putImageData(o,0,0),n.canvas}return this.textureBuffer.canvas},i.prototype.getPixels=function(){var t,e;if(this.renderer.type===l.RENDERER_TYPE.WEBGL){var r=this.renderer.gl;t=this.textureBuffer.size.width,e=this.textureBuffer.size.height;
var i=new Uint8Array(4*t*e);return r.bindFramebuffer(r.FRAMEBUFFER,this.textureBuffer.frameBuffer),r.readPixels(0,0,t,e,r.RGBA,r.UNSIGNED_BYTE,i),r.bindFramebuffer(r.FRAMEBUFFER,null),i}return t=this.textureBuffer.canvas.width,e=this.textureBuffer.canvas.height,this.textureBuffer.canvas.getContext("2d").getImageData(0,0,t,e).data},i.prototype.getPixel=function(t,e){if(this.renderer.type===l.RENDERER_TYPE.WEBGL){var r=this.renderer.gl,i=new Uint8Array(4);return r.bindFramebuffer(r.FRAMEBUFFER,this.textureBuffer.frameBuffer),r.readPixels(t,e,1,1,r.RGBA,r.UNSIGNED_BYTE,i),r.bindFramebuffer(r.FRAMEBUFFER,null),i}return this.textureBuffer.canvas.getContext("2d").getImageData(t,e,1,1).data}},{"../const":13,"../math":23,"../renderers/canvas/utils/CanvasBuffer":35,"../renderers/webgl/managers/FilterManager":44,"../renderers/webgl/utils/RenderTarget":55,"./BaseTexture":60,"./Texture":62}],62:[function(t,e,r){function i(t,e,r,n,o){a.call(this),this.noFrame=!1,e||(this.noFrame=!0,e=new h.Rectangle(0,0,1,1)),t instanceof i&&(t=t.baseTexture),this.baseTexture=t,this._frame=e,this.trim=n,this.valid=!1,this.requiresUpdate=!1,this._uvs=null,this.width=0,this.height=0,this.crop=r||e,this.rotate=!!o,t.hasLoaded?(this.noFrame&&(e=new h.Rectangle(0,0,t.width,t.height),t.on("update",this.onBaseTextureUpdated,this)),this.frame=e):t.once("loaded",this.onBaseTextureLoaded,this)}var n=t("./BaseTexture"),o=t("./VideoBaseTexture"),s=t("./TextureUvs"),a=t("eventemitter3"),h=t("../math"),u=t("../utils");i.prototype=Object.create(a.prototype),i.prototype.constructor=i,e.exports=i,Object.defineProperties(i.prototype,{frame:{get:function(){return this._frame},set:function(t){if(this._frame=t,this.noFrame=!1,this.width=t.width,this.height=t.height,!this.trim&&!this.rotate&&(t.x+t.width>this.baseTexture.width||t.y+t.height>this.baseTexture.height))throw new Error("Texture Error: frame does not fit inside the base Texture dimensions "+this);this.valid=t&&t.width&&t.height&&this.baseTexture.hasLoaded,this.trim?(this.width=this.trim.width,this.height=this.trim.height,this._frame.width=this.trim.width,this._frame.height=this.trim.height):this.crop=t,this.valid&&this._updateUvs()}}}),i.prototype.update=function(){this.baseTexture.update()},i.prototype.onBaseTextureLoaded=function(t){this.noFrame?this.frame=new h.Rectangle(0,0,t.width,t.height):this.frame=this._frame,this.emit("update",this)},i.prototype.onBaseTextureUpdated=function(t){this._frame.width=t.width,this._frame.height=t.height,this.emit("update",this)},i.prototype.destroy=function(t){this.baseTexture&&(t&&this.baseTexture.destroy(),this.baseTexture.off("update",this.onBaseTextureUpdated,this),this.baseTexture.off("loaded",this.onBaseTextureLoaded,this),this.baseTexture=null),this._frame=null,this._uvs=null,this.trim=null,this.crop=null,this.valid=!1,this.off("dispose",this.dispose,this),this.off("update",this.update,this)},i.prototype.clone=function(){return new i(this.baseTexture,this.frame,this.crop,this.trim,this.rotate)},i.prototype._updateUvs=function(){this._uvs||(this._uvs=new s),this._uvs.set(this.crop,this.baseTexture,this.rotate)},i.fromImage=function(t,e,r){var o=u.TextureCache[t];return o||(o=new i(n.fromImage(t,e,r)),u.TextureCache[t]=o),o},i.fromFrame=function(t){var e=u.TextureCache[t];if(!e)throw new Error('The frameId "'+t+'" does not exist in the texture cache');return e},i.fromCanvas=function(t,e){return new i(n.fromCanvas(t,e))},i.fromVideo=function(t,e){return"string"==typeof t?i.fromVideoUrl(t,e):new i(o.fromVideo(t,e))},i.fromVideoUrl=function(t,e){return new i(o.fromUrl(t,e))},i.addTextureToCache=function(t,e){u.TextureCache[e]=t},i.removeTextureFromCache=function(t){var e=u.TextureCache[t];return delete u.TextureCache[t],delete u.BaseTextureCache[t],e},i.EMPTY=new i(new n)},{"../math":23,"../utils":67,"./BaseTexture":60,"./TextureUvs":63,"./VideoBaseTexture":64,eventemitter3:10}],63:[function(t,e,r){function i(){this.x0=0,this.y0=0,this.x1=1,this.y1=0,this.x2=1,this.y2=1,this.x3=0,this.y3=1}e.exports=i,i.prototype.set=function(t,e,r){var i=e.width,n=e.height;r?(this.x0=(t.x+t.height)/i,this.y0=t.y/n,this.x1=(t.x+t.height)/i,this.y1=(t.y+t.width)/n,this.x2=t.x/i,this.y2=(t.y+t.width)/n,this.x3=t.x/i,this.y3=t.y/n):(this.x0=t.x/i,this.y0=t.y/n,this.x1=(t.x+t.width)/i,this.y1=t.y/n,this.x2=(t.x+t.width)/i,this.y2=(t.y+t.height)/n,this.x3=t.x/i,this.y3=(t.y+t.height)/n)}},{}],64:[function(t,e,r){function i(t,e){if(!t)throw new Error("No video source element specified.");(t.readyState===t.HAVE_ENOUGH_DATA||t.readyState===t.HAVE_FUTURE_DATA)&&t.width&&t.height&&(t.complete=!0),o.call(this,t,e),this.autoUpdate=!1,this._onUpdate=this._onUpdate.bind(this),this._onCanPlay=this._onCanPlay.bind(this),t.complete||(t.addEventListener("canplay",this._onCanPlay),t.addEventListener("canplaythrough",this._onCanPlay),t.addEventListener("play",this._onPlayStart.bind(this)),t.addEventListener("pause",this._onPlayStop.bind(this))),this.__loaded=!1}function n(t,e){e||(e="video/"+t.substr(t.lastIndexOf(".")+1));var r=document.createElement("source");return r.src=t,r.type=e,r}var o=t("./BaseTexture"),s=t("../utils");i.prototype=Object.create(o.prototype),i.prototype.constructor=i,e.exports=i,i.prototype._onUpdate=function(){this.autoUpdate&&(window.requestAnimationFrame(this._onUpdate),this.update())},i.prototype._onPlayStart=function(){this.autoUpdate||(window.requestAnimationFrame(this._onUpdate),this.autoUpdate=!0)},i.prototype._onPlayStop=function(){this.autoUpdate=!1},i.prototype._onCanPlay=function(){this.hasLoaded=!0,this.source&&(this.source.removeEventListener("canplay",this._onCanPlay),this.source.removeEventListener("canplaythrough",this._onCanPlay),this.width=this.source.videoWidth,this.height=this.source.videoHeight,this.source.play(),this.__loaded||(this.__loaded=!0,this.emit("loaded",this)))},i.prototype.destroy=function(){this.source&&this.source._pixiId&&(delete s.BaseTextureCache[this.source._pixiId],delete this.source._pixiId),o.prototype.destroy.call(this)},i.fromVideo=function(t,e){t._pixiId||(t._pixiId="video_"+s.uid());var r=s.BaseTextureCache[t._pixiId];return r||(r=new i(t,e),s.BaseTextureCache[t._pixiId]=r),r},i.fromUrl=function(t,e){var r=document.createElement("video");if(Array.isArray(t))for(var o=0;o<t.length;++o)r.appendChild(n(t[o].src||t[o],t[o].mime));else r.appendChild(n(t.src||t,t.mime));return r.load(),r.play(),i.fromVideo(r,e)},i.fromUrls=i.fromUrl},{"../utils":67,"./BaseTexture":60}],65:[function(t,e,r){function i(){var t=this;this._tick=function(e){t._requestId=null,t.started&&(t.update(e),t.started&&null===t._requestId&&t._emitter.listeners(s,!0)&&(t._requestId=requestAnimationFrame(t._tick)))},this._emitter=new o,this._requestId=null,this._maxElapsedMS=100,this.autoStart=!1,this.deltaTime=1,this.elapsedMS=1/n.TARGET_FPMS,this.lastTime=0,this.speed=1,this.started=!1}var n=t("../const"),o=t("eventemitter3"),s="tick";Object.defineProperties(i.prototype,{FPS:{get:function(){return 1e3/this.elapsedMS}},minFPS:{get:function(){return 1e3/this._maxElapsedMS},set:function(t){var e=Math.min(Math.max(0,t)/1e3,n.TARGET_FPMS);this._maxElapsedMS=1/e}}}),i.prototype._requestIfNeeded=function(){null===this._requestId&&this._emitter.listeners(s,!0)&&(this.lastTime=performance.now(),this._requestId=requestAnimationFrame(this._tick))},i.prototype._cancelIfNeeded=function(){null!==this._requestId&&(cancelAnimationFrame(this._requestId),this._requestId=null)},i.prototype._startIfPossible=function(){this.started?this._requestIfNeeded():this.autoStart&&this.start()},i.prototype.add=function(t,e){return this._emitter.on(s,t,e),this._startIfPossible(),this},i.prototype.addOnce=function(t,e){return this._emitter.once(s,t,e),this._startIfPossible(),this},i.prototype.remove=function(t,e){return this._emitter.off(s,t,e),this._emitter.listeners(s,!0)||this._cancelIfNeeded(),this},i.prototype.start=function(){this.started||(this.started=!0,this._requestIfNeeded())},i.prototype.stop=function(){this.started&&(this.started=!1,this._cancelIfNeeded())},i.prototype.update=function(t){var e;t=t||performance.now(),e=this.elapsedMS=t-this.lastTime,e>this._maxElapsedMS&&(e=this._maxElapsedMS),this.deltaTime=e*n.TARGET_FPMS*this.speed,this._emitter.emit(s,this.deltaTime),this.lastTime=t},e.exports=i},{"../const":13,eventemitter3:10}],66:[function(t,e,r){var i=t("./Ticker"),n=new i;n.autoStart=!0,e.exports={shared:n,Ticker:i}},{"./Ticker":65}],67:[function(t,e,r){var i=t("../const"),n=e.exports={_uid:0,_saidHello:!1,EventEmitter:t("eventemitter3"),pluginTarget:t("./pluginTarget"),async:t("async"),uid:function(){return++n._uid},hex2rgb:function(t,e){return e=e||[],e[0]=(t>>16&255)/255,e[1]=(t>>8&255)/255,e[2]=(255&t)/255,e},hex2string:function(t){return t=t.toString(16),t="000000".substr(0,6-t.length)+t,"#"+t},rgb2hex:function(t){return(255*t[0]<<16)+(255*t[1]<<8)+255*t[2]},canUseNewCanvasBlendModes:function(){if("undefined"==typeof document)return!1;var t="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAABAQMAAADD8p2OAAAAA1BMVEX/",e="AAAACklEQVQI12NgAAAAAgAB4iG8MwAAAABJRU5ErkJggg==",r=new Image;r.src=t+"AP804Oa6"+e;var i=new Image;i.src=t+"/wCKxvRF"+e;var n=document.createElement("canvas");n.width=6,n.height=1;var o=n.getContext("2d");o.globalCompositeOperation="multiply",o.drawImage(r,0,0),o.drawImage(i,2,0);var s=o.getImageData(2,0,1,1).data;return 255===s[0]&&0===s[1]&&0===s[2]},getNextPowerOfTwo:function(t){if(t>0&&0===(t&t-1))return t;for(var e=1;t>e;)e<<=1;return e},isPowerOfTwo:function(t,e){return t>0&&0===(t&t-1)&&e>0&&0===(e&e-1)},getResolutionOfUrl:function(t){var e=i.RETINA_PREFIX.exec(t);return e?parseFloat(e[1]):1},sayHello:function(t){if(!n._saidHello){if(navigator.userAgent.toLowerCase().indexOf("chrome")>-1){var e=["\n %c %c %c Pixi.js "+i.VERSION+" - ✰ "+t+" ✰  %c  %c  http://www.pixijs.com/  %c %c ♥%c♥%c♥ \n\n","background: #ff66a5; padding:5px 0;","background: #ff66a5; padding:5px 0;","color: #ff66a5; background: #030307; padding:5px 0;","background: #ff66a5; padding:5px 0;","background: #ffc3dc; padding:5px 0;","background: #ff66a5; padding:5px 0;","color: #ff2424; background: #fff; padding:5px 0;","color: #ff2424; background: #fff; padding:5px 0;","color: #ff2424; background: #fff; padding:5px 0;"];window.console.log.apply(console,e)}else window.console&&window.console.log("Pixi.js "+i.VERSION+" - "+t+" - http://www.pixijs.com/");n._saidHello=!0}},isWebGLSupported:function(){var t={stencil:!0};try{if(!window.WebGLRenderingContext)return!1;var e=document.createElement("canvas"),r=e.getContext("webgl",t)||e.getContext("experimental-webgl",t);return!(!r||!r.getContextAttributes().stencil)}catch(i){return!1}},sign:function(t){return t?0>t?-1:1:0},TextureCache:{},BaseTextureCache:{}}},{"../const":13,"./pluginTarget":68,async:1,eventemitter3:10}],68:[function(t,e,r){function i(t){t.__plugins={},t.registerPlugin=function(e,r){t.__plugins[e]=r},t.prototype.initPlugins=function(){this.plugins=this.plugins||{};for(var e in t.__plugins)this.plugins[e]=new t.__plugins[e](this)},t.prototype.destroyPlugins=function(){for(var t in this.plugins)this.plugins[t].destroy(),this.plugins[t]=null;this.plugins=null}}e.exports={mixin:function(t){i(t)}}},{}],69:[function(t,e,r){var i=t("./core"),n=t("./mesh"),o=t("./extras"),s=t("./filters");i.SpriteBatch=function(){throw new ReferenceError("SpriteBatch does not exist any more, please use the new ParticleContainer instead.")},i.AssetLoader=function(){throw new ReferenceError("The loader system was overhauled in pixi v3, please see the new PIXI.loaders.Loader class.")},Object.defineProperties(i,{Stage:{get:function(){return console.warn("You do not need to use a PIXI Stage any more, you can simply render any container."),i.Container}},DisplayObjectContainer:{get:function(){return console.warn("DisplayObjectContainer has been shortened to Container, please use Container from now on."),i.Container}},Strip:{get:function(){return console.warn("The Strip class has been renamed to Mesh and moved to mesh.Mesh, please use mesh.Mesh from now on."),n.Mesh}},Rope:{get:function(){return console.warn("The Rope class has been moved to mesh.Rope, please use mesh.Rope from now on."),n.Rope}},MovieClip:{get:function(){return console.warn("The MovieClip class has been moved to extras.MovieClip, please use extras.MovieClip from now on."),o.MovieClip}},TilingSprite:{get:function(){return console.warn("The TilingSprite class has been moved to extras.TilingSprite, please use extras.TilingSprite from now on."),o.TilingSprite}},BitmapText:{get:function(){return console.warn("The BitmapText class has been moved to extras.BitmapText, please use extras.BitmapText from now on."),o.BitmapText}},blendModes:{get:function(){return console.warn("The blendModes has been moved to BLEND_MODES, please use BLEND_MODES from now on."),i.BLEND_MODES}},scaleModes:{get:function(){return console.warn("The scaleModes has been moved to SCALE_MODES, please use SCALE_MODES from now on."),i.SCALE_MODES}},BaseTextureCache:{get:function(){return console.warn("The BaseTextureCache class has been moved to utils.BaseTextureCache, please use utils.BaseTextureCache from now on."),i.utils.BaseTextureCache}},TextureCache:{get:function(){return console.warn("The TextureCache class has been moved to utils.TextureCache, please use utils.TextureCache from now on."),i.utils.TextureCache}},math:{get:function(){return console.warn("The math namespace is deprecated, please access members already accessible on PIXI."),i}}}),i.Sprite.prototype.setTexture=function(t){this.texture=t,console.warn("setTexture is now deprecated, please use the texture property, e.g : sprite.texture = texture;")},o.BitmapText.prototype.setText=function(t){this.text=t,console.warn("setText is now deprecated, please use the text property, e.g : myBitmapText.text = 'my text';")},i.Text.prototype.setText=function(t){this.text=t,console.warn("setText is now deprecated, please use the text property, e.g : myText.text = 'my text';")},i.Text.prototype.setStyle=function(t){this.style=t,console.warn("setStyle is now deprecated, please use the style property, e.g : myText.style = style;")},i.Texture.prototype.setFrame=function(t){this.frame=t,console.warn("setFrame is now deprecated, please use the frame property, e.g : myTexture.frame = frame;")},Object.defineProperties(s,{AbstractFilter:{get:function(){return console.warn("filters.AbstractFilter is an undocumented alias, please use AbstractFilter from now on."),i.AbstractFilter}},FXAAFilter:{get:function(){return console.warn("filters.FXAAFilter is an undocumented alias, please use FXAAFilter from now on."),i.FXAAFilter}},SpriteMaskFilter:{get:function(){return console.warn("filters.SpriteMaskFilter is an undocumented alias, please use SpriteMaskFilter from now on."),i.SpriteMaskFilter}}}),i.utils.uuid=function(){return console.warn("utils.uuid() is deprecated, please use utils.uid() from now on."),i.utils.uid()}},{"./core":20,"./extras":76,"./filters":93,"./mesh":117}],70:[function(t,e,r){function i(t,e){n.Container.call(this),e=e||{},this.textWidth=0,this.textHeight=0,this._glyphs=[],this._font={tint:void 0!==e.tint?e.tint:16777215,align:e.align||"left",name:null,size:0},this.font=e.font,this._text=t,this.maxWidth=0,this.maxLineHeight=0,this.dirty=!1,this.updateText()}var n=t("../core");i.prototype=Object.create(n.Container.prototype),i.prototype.constructor=i,e.exports=i,Object.defineProperties(i.prototype,{tint:{get:function(){return this._font.tint},set:function(t){this._font.tint="number"==typeof t&&t>=0?t:16777215,this.dirty=!0}},align:{get:function(){return this._font.align},set:function(t){this._font.align=t||"left",this.dirty=!0}},font:{get:function(){return this._font},set:function(t){t&&("string"==typeof t?(t=t.split(" "),this._font.name=1===t.length?t[0]:t.slice(1).join(" "),this._font.size=t.length>=2?parseInt(t[0],10):i.fonts[this._font.name].size):(this._font.name=t.name,this._font.size="number"==typeof t.size?t.size:parseInt(t.size,10)),this.dirty=!0)}},text:{get:function(){return this._text},set:function(t){t=t.toString()||" ",this._text!==t&&(this._text=t,this.dirty=!0)}}}),i.prototype.updateText=function(){for(var t=i.fonts[this._font.name],e=new n.Point,r=null,o=[],s=0,a=0,h=[],u=0,l=this._font.size/t.size,c=-1,p=0,d=0;d<this.text.length;d++){var f=this.text.charCodeAt(d);if(c=/(\s)/.test(this.text.charAt(d))?d:c,/(?:\r\n|\r|\n)/.test(this.text.charAt(d)))h.push(s),a=Math.max(a,s),u++,e.x=0,e.y+=t.lineHeight,r=null;else if(-1!==c&&this.maxWidth>0&&e.x*l>this.maxWidth)o.splice(c,d-c),d=c,c=-1,h.push(s),a=Math.max(a,s),u++,e.x=0,e.y+=t.lineHeight,r=null;else{var v=t.chars[f];v&&(r&&v.kerning[r]&&(e.x+=v.kerning[r]),o.push({texture:v.texture,line:u,charCode:f,position:new n.Point(e.x+v.xOffset,e.y+v.yOffset)}),s=e.x+(v.texture.width+v.xOffset),e.x+=v.xAdvance,p=Math.max(p,v.yOffset+v.texture.height),r=f)}}h.push(s),a=Math.max(a,s);var g=[];for(d=0;u>=d;d++){var m=0;"right"===this._font.align?m=a-h[d]:"center"===this._font.align&&(m=(a-h[d])/2),g.push(m)}var y=o.length,x=this.tint;for(d=0;y>d;d++){var b=this._glyphs[d];b?b.texture=o[d].texture:(b=new n.Sprite(o[d].texture),this._glyphs.push(b)),b.position.x=(o[d].position.x+g[o[d].line])*l,b.position.y=o[d].position.y*l,b.scale.x=b.scale.y=l,b.tint=x,b.parent||this.addChild(b)}for(d=y;d<this._glyphs.length;++d)this.removeChild(this._glyphs[d]);this.textWidth=a*l,this.textHeight=(e.y+t.lineHeight)*l,this.maxLineHeight=p*l},i.prototype.updateTransform=function(){this.validate(),this.containerUpdateTransform()},i.prototype.getLocalBounds=function(){return this.validate(),n.Container.prototype.getLocalBounds.call(this)},i.prototype.validate=function(){this.dirty&&(this.updateText(),this.dirty=!1)},i.fonts={}},{"../core":20}],71:[function(t,e,r){function i(t){n.Sprite.call(this,t[0]instanceof n.Texture?t[0]:t[0].texture),this._textures=null,this._durations=null,this.textures=t,this.animationSpeed=1,this.loop=!0,this.onComplete=null,this._currentTime=0,this.playing=!1}var n=t("../core");i.prototype=Object.create(n.Sprite.prototype),i.prototype.constructor=i,e.exports=i,Object.defineProperties(i.prototype,{totalFrames:{get:function(){return this._textures.length}},textures:{get:function(){return this._textures},set:function(t){if(t[0]instanceof n.Texture)this._textures=t,this._durations=null;else{this._textures=[],this._durations=[];for(var e=0;e<t.length;e++)this._textures.push(t[e].texture),this._durations.push(t[e].time)}}},currentFrame:{get:function(){var t=Math.floor(this._currentTime)%this._textures.length;return 0>t&&(t+=this._textures.length),t}}}),i.prototype.stop=function(){this.playing&&(this.playing=!1,n.ticker.shared.remove(this.update,this))},i.prototype.play=function(){this.playing||(this.playing=!0,n.ticker.shared.add(this.update,this))},i.prototype.gotoAndStop=function(t){this.stop(),this._currentTime=t,this._texture=this._textures[this.currentFrame]},i.prototype.gotoAndPlay=function(t){this._currentTime=t,this.play()},i.prototype.update=function(t){var e=this.animationSpeed*t;if(null!==this._durations){var r=this._currentTime%1*this._durations[this.currentFrame];for(r+=e/60*1e3;0>r;)this._currentTime--,r+=this._durations[this.currentFrame];var i=Math.sign(this.animationSpeed*t);for(this._currentTime=Math.floor(this._currentTime);r>=this._durations[this.currentFrame];)r-=this._durations[this.currentFrame]*i,this._currentTime+=i;this._currentTime+=r/this._durations[this.currentFrame]}else this._currentTime+=e;this._currentTime<0&&!this.loop?(this.gotoAndStop(0),this.onComplete&&this.onComplete()):this._currentTime>=this._textures.length&&!this.loop?(this.gotoAndStop(this._textures.length-1),this.onComplete&&this.onComplete()):this._texture=this._textures[this.currentFrame]},i.prototype.destroy=function(){this.stop(),n.Sprite.prototype.destroy.call(this)},i.fromFrames=function(t){for(var e=[],r=0;r<t.length;++r)e.push(new n.Texture.fromFrame(t[r]));return new i(e)},i.fromImages=function(t){for(var e=[],r=0;r<t.length;++r)e.push(new n.Texture.fromImage(t[r]));return new i(e)}},{"../core":20}],72:[function(t,e,r){function i(t,e,r){n.Sprite.call(this,t),this.tileScale=new n.Point(1,1),this.tilePosition=new n.Point(0,0),this._width=e||100,this._height=r||100,this._uvs=new n.TextureUvs,this._canvasPattern=null,this.shader=new n.AbstractFilter(["precision lowp float;","attribute vec2 aVertexPosition;","attribute vec2 aTextureCoord;","attribute vec4 aColor;","uniform mat3 projectionMatrix;","uniform vec4 uFrame;","uniform vec4 uTransform;","varying vec2 vTextureCoord;","varying vec4 vColor;","void main(void){","   gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);","   vec2 coord = aTextureCoord;","   coord -= uTransform.xy;","   coord /= uTransform.zw;","   vTextureCoord = coord;","   vColor = vec4(aColor.rgb * aColor.a, aColor.a);","}"].join("\n"),["precision lowp float;","varying vec2 vTextureCoord;","varying vec4 vColor;","uniform sampler2D uSampler;","uniform vec4 uFrame;","uniform vec2 uPixelSize;","void main(void){","   vec2 coord = mod(vTextureCoord, uFrame.zw);","   coord = clamp(coord, uPixelSize, uFrame.zw - uPixelSize);","   coord += uFrame.xy;","   gl_FragColor =  texture2D(uSampler, coord) * vColor ;","}"].join("\n"),{uFrame:{type:"4fv",value:[0,0,1,1]},uTransform:{type:"4fv",value:[0,0,1,1]},uPixelSize:{type:"2fv",value:[1,1]}})}var n=t("../core"),o=new n.Point,s=t("../core/renderers/canvas/utils/CanvasTinter");i.prototype=Object.create(n.Sprite.prototype),i.prototype.constructor=i,e.exports=i,Object.defineProperties(i.prototype,{width:{get:function(){return this._width},set:function(t){this._width=t}},height:{get:function(){return this._height},set:function(t){this._height=t}}}),i.prototype._onTextureUpdate=function(){},i.prototype._renderWebGL=function(t){var e=this._texture;if(e&&e._uvs){var r=e._uvs,i=e._frame.width,n=e._frame.height,o=e.baseTexture.width,s=e.baseTexture.height;e._uvs=this._uvs,e._frame.width=this.width,e._frame.height=this.height,this.shader.uniforms.uPixelSize.value[0]=1/o,this.shader.uniforms.uPixelSize.value[1]=1/s,this.shader.uniforms.uFrame.value[0]=r.x0,this.shader.uniforms.uFrame.value[1]=r.y0,this.shader.uniforms.uFrame.value[2]=r.x1-r.x0,this.shader.uniforms.uFrame.value[3]=r.y2-r.y0,this.shader.uniforms.uTransform.value[0]=this.tilePosition.x%(i*this.tileScale.x)/this._width,this.shader.uniforms.uTransform.value[1]=this.tilePosition.y%(n*this.tileScale.y)/this._height,this.shader.uniforms.uTransform.value[2]=o/this._width*this.tileScale.x,this.shader.uniforms.uTransform.value[3]=s/this._height*this.tileScale.y,t.setObjectRenderer(t.plugins.sprite),t.plugins.sprite.render(this),e._uvs=r,e._frame.width=i,e._frame.height=n}},i.prototype._renderCanvas=function(t){var e=this._texture;if(e.baseTexture.hasLoaded){var r=t.context,i=this.worldTransform,o=t.resolution,a=e.baseTexture,h=this.tilePosition.x/this.tileScale.x%e._frame.width,u=this.tilePosition.y/this.tileScale.y%e._frame.height;if(!this._canvasPattern){var l=new n.CanvasBuffer(e._frame.width,e._frame.height);16777215!==this.tint?(this.cachedTint!==this.tint&&(this.cachedTint=this.tint,this.tintedTexture=s.getTintedTexture(this,this.tint)),l.context.drawImage(this.tintedTexture,0,0)):l.context.drawImage(a.source,-e._frame.x,-e._frame.y),this._canvasPattern=l.context.createPattern(l.canvas,"repeat")}r.globalAlpha=this.worldAlpha,r.setTransform(i.a*o,i.b*o,i.c*o,i.d*o,i.tx*o,i.ty*o),r.scale(this.tileScale.x,this.tileScale.y),r.translate(h+this.anchor.x*-this._width,u+this.anchor.y*-this._height);var c=t.blendModes[this.blendMode];c!==t.context.globalCompositeOperation&&(r.globalCompositeOperation=c),r.fillStyle=this._canvasPattern,r.fillRect(-h,-u,this._width/this.tileScale.x,this._height/this.tileScale.y)}},i.prototype.getBounds=function(){var t,e,r,i,n=this._width,o=this._height,s=n*(1-this.anchor.x),a=n*-this.anchor.x,h=o*(1-this.anchor.y),u=o*-this.anchor.y,l=this.worldTransform,c=l.a,p=l.b,d=l.c,f=l.d,v=l.tx,g=l.ty,m=c*a+d*u+v,y=f*u+p*a+g,x=c*s+d*u+v,b=f*u+p*s+g,_=c*s+d*h+v,T=f*h+p*s+g,E=c*a+d*h+v,S=f*h+p*a+g;t=m,t=t>x?x:t,t=t>_?_:t,t=t>E?E:t,r=y,r=r>b?b:r,r=r>T?T:r,r=r>S?S:r,e=m,e=x>e?x:e,e=_>e?_:e,e=E>e?E:e,i=y,i=b>i?b:i,i=T>i?T:i,i=S>i?S:i;var w=this._bounds;return w.x=t,w.width=e-t,w.y=r,w.height=i-r,this._currentBounds=w,w},i.prototype.containsPoint=function(t){this.worldTransform.applyInverse(t,o);var e,r=this._width,i=this._height,n=-r*this.anchor.x;return o.x>n&&o.x<n+r&&(e=-i*this.anchor.y,o.y>e&&o.y<e+i)?!0:!1},i.prototype.destroy=function(){n.Sprite.prototype.destroy.call(this),this.tileScale=null,this._tileScaleOffset=null,this.tilePosition=null,this._uvs=null},i.fromFrame=function(t,e,r){var o=n.utils.TextureCache[t];if(!o)throw new Error('The frameId "'+t+'" does not exist in the texture cache '+this);return new i(o,e,r)},i.fromImage=function(t,e,r,o,s){return new i(n.Texture.fromImage(t,o,s),e,r)}},{"../core":20,"../core/renderers/canvas/utils/CanvasTinter":38}],73:[function(t,e,r){var i=t("../core"),n=i.DisplayObject,o=new i.Matrix;n.prototype._cacheAsBitmap=!1,n.prototype._originalRenderWebGL=null,n.prototype._originalRenderCanvas=null,n.prototype._originalUpdateTransform=null,n.prototype._originalHitTest=null,n.prototype._originalDestroy=null,n.prototype._cachedSprite=null,Object.defineProperties(n.prototype,{cacheAsBitmap:{get:function(){return this._cacheAsBitmap},set:function(t){this._cacheAsBitmap!==t&&(this._cacheAsBitmap=t,t?(this._originalRenderWebGL=this.renderWebGL,this._originalRenderCanvas=this.renderCanvas,this._originalUpdateTransform=this.updateTransform,this._originalGetBounds=this.getBounds,this._originalDestroy=this.destroy,this._originalContainsPoint=this.containsPoint,this.renderWebGL=this._renderCachedWebGL,this.renderCanvas=this._renderCachedCanvas,this.destroy=this._cacheAsBitmapDestroy):(this._cachedSprite&&this._destroyCachedDisplayObject(),this.renderWebGL=this._originalRenderWebGL,this.renderCanvas=this._originalRenderCanvas,this.getBounds=this._originalGetBounds,this.destroy=this._originalDestroy,this.updateTransform=this._originalUpdateTransform,this.containsPoint=this._originalContainsPoint))}}}),n.prototype._renderCachedWebGL=function(t){!this.visible||this.worldAlpha<=0||!this.renderable||(this._initCachedDisplayObject(t),this._cachedSprite.worldAlpha=this.worldAlpha,t.setObjectRenderer(t.plugins.sprite),t.plugins.sprite.render(this._cachedSprite))},n.prototype._initCachedDisplayObject=function(t){if(!this._cachedSprite){t.currentRenderer.flush();var e=this.getLocalBounds().clone();if(this._filters){var r=this._filters[0].padding;e.x-=r,e.y-=r,e.width+=2*r,e.height+=2*r}var n=t.currentRenderTarget,s=t.filterManager.filterStack,a=new i.RenderTexture(t,0|e.width,0|e.height),h=o;h.tx=-e.x,h.ty=-e.y,this.renderWebGL=this._originalRenderWebGL,a.render(this,h,!0,!0),t.setRenderTarget(n),t.filterManager.filterStack=s,this.renderWebGL=this._renderCachedWebGL,this.updateTransform=this.displayObjectUpdateTransform,this.getBounds=this._getCachedBounds,this._cachedSprite=new i.Sprite(a),this._cachedSprite.worldTransform=this.worldTransform,this._cachedSprite.anchor.x=-(e.x/e.width),this._cachedSprite.anchor.y=-(e.y/e.height),this.updateTransform(),this.containsPoint=this._cachedSprite.containsPoint.bind(this._cachedSprite)}},n.prototype._renderCachedCanvas=function(t){!this.visible||this.worldAlpha<=0||!this.renderable||(this._initCachedDisplayObjectCanvas(t),this._cachedSprite.worldAlpha=this.worldAlpha,this._cachedSprite.renderCanvas(t))},n.prototype._initCachedDisplayObjectCanvas=function(t){if(!this._cachedSprite){var e=this.getLocalBounds(),r=t.context,n=new i.RenderTexture(t,0|e.width,0|e.height),s=o;s.tx=-e.x,s.ty=-e.y,this.renderCanvas=this._originalRenderCanvas,n.render(this,s,!0),t.context=r,this.renderCanvas=this._renderCachedCanvas,this.updateTransform=this.displayObjectUpdateTransform,this.getBounds=this._getCachedBounds,this._cachedSprite=new i.Sprite(n),this._cachedSprite.worldTransform=this.worldTransform,this._cachedSprite.anchor.x=-(e.x/e.width),this._cachedSprite.anchor.y=-(e.y/e.height),this.updateTransform(),this.containsPoint=this._cachedSprite.containsPoint.bind(this._cachedSprite)}},n.prototype._getCachedBounds=function(){return this._cachedSprite._currentBounds=null,this._cachedSprite.getBounds()},n.prototype._destroyCachedDisplayObject=function(){this._cachedSprite._texture.destroy(),this._cachedSprite=null},n.prototype._cacheAsBitmapDestroy=function(){this.cacheAsBitmap=!1,this._originalDestroy()}},{"../core":20}],74:[function(t,e,r){var i=t("../core");i.DisplayObject.prototype.name=null,i.Container.prototype.getChildByName=function(t){for(var e=0;e<this.children.length;e++)if(this.children[e].name===t)return this.children[e];return null}},{"../core":20}],75:[function(t,e,r){var i=t("../core");i.DisplayObject.prototype.getGlobalPosition=function(t){return t=t||new i.Point,this.parent?(this.displayObjectUpdateTransform(),t.x=this.worldTransform.tx,t.y=this.worldTransform.ty):(t.x=this.position.x,t.y=this.position.y),t}},{"../core":20}],76:[function(t,e,r){t("./cacheAsBitmap"),t("./getChildByName"),t("./getGlobalPosition"),e.exports={MovieClip:t("./MovieClip"),TilingSprite:t("./TilingSprite"),BitmapText:t("./BitmapText")}},{"./BitmapText":70,"./MovieClip":71,"./TilingSprite":72,"./cacheAsBitmap":73,"./getChildByName":74,"./getGlobalPosition":75}],77:[function(t,e,r){function i(){n.AbstractFilter.call(this,null,"precision mediump float;\n\nuniform vec4 dimensions;\nuniform float pixelSize;\nuniform sampler2D uSampler;\n\nfloat character(float n, vec2 p)\n{\n    p = floor(p*vec2(4.0, -4.0) + 2.5);\n    if (clamp(p.x, 0.0, 4.0) == p.x && clamp(p.y, 0.0, 4.0) == p.y)\n    {\n        if (int(mod(n/exp2(p.x + 5.0*p.y), 2.0)) == 1) return 1.0;\n    }\n    return 0.0;\n}\n\nvoid main()\n{\n    vec2 uv = gl_FragCoord.xy;\n\n    vec3 col = texture2D(uSampler, floor( uv / pixelSize ) * pixelSize / dimensions.xy).rgb;\n\n    float gray = (col.r + col.g + col.b) / 3.0;\n\n    float n =  65536.0;             // .\n    if (gray > 0.2) n = 65600.0;    // :\n    if (gray > 0.3) n = 332772.0;   // *\n    if (gray > 0.4) n = 15255086.0; // o\n    if (gray > 0.5) n = 23385164.0; // &\n    if (gray > 0.6) n = 15252014.0; // 8\n    if (gray > 0.7) n = 13199452.0; // @\n    if (gray > 0.8) n = 11512810.0; // #\n\n    vec2 p = mod( uv / ( pixelSize * 0.5 ), 2.0) - vec2(1.0);\n    col = col * character(n, p);\n\n    gl_FragColor = vec4(col, 1.0);\n}\n",{dimensions:{type:"4fv",value:new Float32Array([0,0,0,0])},pixelSize:{type:"1f",value:8}})}var n=t("../../core");i.prototype=Object.create(n.AbstractFilter.prototype),i.prototype.constructor=i,e.exports=i,Object.defineProperties(i.prototype,{size:{get:function(){return this.uniforms.pixelSize.value},set:function(t){this.uniforms.pixelSize.value=t}}})},{"../../core":20}],78:[function(t,e,r){function i(){n.AbstractFilter.call(this),this.blurXFilter=new o,this.blurYFilter=new s,this.defaultFilter=new n.AbstractFilter}var n=t("../../core"),o=t("../blur/BlurXFilter"),s=t("../blur/BlurYFilter");i.prototype=Object.create(n.AbstractFilter.prototype),i.prototype.constructor=i,e.exports=i,i.prototype.applyFilter=function(t,e,r){var i=t.filterManager.getRenderTarget(!0);this.defaultFilter.applyFilter(t,e,r),this.blurXFilter.applyFilter(t,e,i),t.blendModeManager.setBlendMode(n.BLEND_MODES.SCREEN),this.blurYFilter.applyFilter(t,i,r),t.blendModeManager.setBlendMode(n.BLEND_MODES.NORMAL),t.filterManager.returnRenderTarget(i)},Object.defineProperties(i.prototype,{blur:{get:function(){return this.blurXFilter.blur},set:function(t){this.blurXFilter.blur=this.blurYFilter.blur=t}},blurX:{get:function(){return this.blurXFilter.blur},set:function(t){this.blurXFilter.blur=t}},blurY:{get:function(){return this.blurYFilter.blur},set:function(t){this.blurYFilter.blur=t}}})},{"../../core":20,"../blur/BlurXFilter":81,"../blur/BlurYFilter":82}],79:[function(t,e,r){function i(t,e){n.AbstractFilter.call(this,"attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\nattribute vec4 aColor;\n\nuniform float strength;\nuniform float dirX;\nuniform float dirY;\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\nvarying vec2 vBlurTexCoords[3];\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3((aVertexPosition), 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n\n    vBlurTexCoords[0] = aTextureCoord + vec2( (0.004 * strength) * dirX, (0.004 * strength) * dirY );\n    vBlurTexCoords[1] = aTextureCoord + vec2( (0.008 * strength) * dirX, (0.008 * strength) * dirY );\n    vBlurTexCoords[2] = aTextureCoord + vec2( (0.012 * strength) * dirX, (0.012 * strength) * dirY );\n\n    vColor = vec4(aColor.rgb * aColor.a, aColor.a);\n}\n","precision lowp float;\n\nvarying vec2 vTextureCoord;\nvarying vec2 vBlurTexCoords[3];\nvarying vec4 vColor;\n\nuniform sampler2D uSampler;\n\nvoid main(void)\n{\n    gl_FragColor = vec4(0.0);\n\n    gl_FragColor += texture2D(uSampler, vTextureCoord     ) * 0.3989422804014327;\n    gl_FragColor += texture2D(uSampler, vBlurTexCoords[ 0]) * 0.2419707245191454;\n    gl_FragColor += texture2D(uSampler, vBlurTexCoords[ 1]) * 0.05399096651318985;\n    gl_FragColor += texture2D(uSampler, vBlurTexCoords[ 2]) * 0.004431848411938341;\n}\n",{
strength:{type:"1f",value:1},dirX:{type:"1f",value:t||0},dirY:{type:"1f",value:e||0}}),this.defaultFilter=new n.AbstractFilter,this.passes=1,this.dirX=t||0,this.dirY=e||0,this.strength=4}var n=t("../../core");i.prototype=Object.create(n.AbstractFilter.prototype),i.prototype.constructor=i,e.exports=i,i.prototype.applyFilter=function(t,e,r,i){var n=this.getShader(t);if(this.uniforms.strength.value=this.strength/4/this.passes*(e.frame.width/e.size.width),1===this.passes)t.filterManager.applyFilter(n,e,r,i);else{var o=t.filterManager.getRenderTarget(!0);t.filterManager.applyFilter(n,e,o,i);for(var s=0;s<this.passes-2;s++)t.filterManager.applyFilter(n,o,o,i);t.filterManager.applyFilter(n,o,r,i),t.filterManager.returnRenderTarget(o)}},Object.defineProperties(i.prototype,{blur:{get:function(){return this.strength},set:function(t){this.padding=.5*t,this.strength=t}},dirX:{get:function(){return this.dirX},set:function(t){this.uniforms.dirX.value=t}},dirY:{get:function(){return this.dirY},set:function(t){this.uniforms.dirY.value=t}}})},{"../../core":20}],80:[function(t,e,r){function i(){n.AbstractFilter.call(this),this.blurXFilter=new o,this.blurYFilter=new s}var n=t("../../core"),o=t("./BlurXFilter"),s=t("./BlurYFilter");i.prototype=Object.create(n.AbstractFilter.prototype),i.prototype.constructor=i,e.exports=i,i.prototype.applyFilter=function(t,e,r){var i=t.filterManager.getRenderTarget(!0);this.blurXFilter.applyFilter(t,e,i),this.blurYFilter.applyFilter(t,i,r),t.filterManager.returnRenderTarget(i)},Object.defineProperties(i.prototype,{blur:{get:function(){return this.blurXFilter.blur},set:function(t){this.padding=.5*Math.abs(t),this.blurXFilter.blur=this.blurYFilter.blur=t}},passes:{get:function(){return this.blurXFilter.passes},set:function(t){this.blurXFilter.passes=this.blurYFilter.passes=t}},blurX:{get:function(){return this.blurXFilter.blur},set:function(t){this.blurXFilter.blur=t}},blurY:{get:function(){return this.blurYFilter.blur},set:function(t){this.blurYFilter.blur=t}}})},{"../../core":20,"./BlurXFilter":81,"./BlurYFilter":82}],81:[function(t,e,r){function i(){n.AbstractFilter.call(this,"attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\nattribute vec4 aColor;\n\nuniform float strength;\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\nvarying vec2 vBlurTexCoords[6];\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3((aVertexPosition), 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n\n    vBlurTexCoords[ 0] = aTextureCoord + vec2(-0.012 * strength, 0.0);\n    vBlurTexCoords[ 1] = aTextureCoord + vec2(-0.008 * strength, 0.0);\n    vBlurTexCoords[ 2] = aTextureCoord + vec2(-0.004 * strength, 0.0);\n    vBlurTexCoords[ 3] = aTextureCoord + vec2( 0.004 * strength, 0.0);\n    vBlurTexCoords[ 4] = aTextureCoord + vec2( 0.008 * strength, 0.0);\n    vBlurTexCoords[ 5] = aTextureCoord + vec2( 0.012 * strength, 0.0);\n\n    vColor = vec4(aColor.rgb * aColor.a, aColor.a);\n}\n","precision lowp float;\n\nvarying vec2 vTextureCoord;\nvarying vec2 vBlurTexCoords[6];\nvarying vec4 vColor;\n\nuniform sampler2D uSampler;\n\nvoid main(void)\n{\n    gl_FragColor = vec4(0.0);\n\n    gl_FragColor += texture2D(uSampler, vBlurTexCoords[ 0])*0.004431848411938341;\n    gl_FragColor += texture2D(uSampler, vBlurTexCoords[ 1])*0.05399096651318985;\n    gl_FragColor += texture2D(uSampler, vBlurTexCoords[ 2])*0.2419707245191454;\n    gl_FragColor += texture2D(uSampler, vTextureCoord     )*0.3989422804014327;\n    gl_FragColor += texture2D(uSampler, vBlurTexCoords[ 3])*0.2419707245191454;\n    gl_FragColor += texture2D(uSampler, vBlurTexCoords[ 4])*0.05399096651318985;\n    gl_FragColor += texture2D(uSampler, vBlurTexCoords[ 5])*0.004431848411938341;\n}\n",{strength:{type:"1f",value:1}}),this.passes=1,this.strength=4}var n=t("../../core");i.prototype=Object.create(n.AbstractFilter.prototype),i.prototype.constructor=i,e.exports=i,i.prototype.applyFilter=function(t,e,r,i){var n=this.getShader(t);if(this.uniforms.strength.value=this.strength/4/this.passes*(e.frame.width/e.size.width),1===this.passes)t.filterManager.applyFilter(n,e,r,i);else{for(var o=t.filterManager.getRenderTarget(!0),s=e,a=o,h=0;h<this.passes-1;h++){t.filterManager.applyFilter(n,s,a,!0);var u=a;a=s,s=u}t.filterManager.applyFilter(n,s,r,i),t.filterManager.returnRenderTarget(o)}},Object.defineProperties(i.prototype,{blur:{get:function(){return this.strength},set:function(t){this.padding=.5*Math.abs(t),this.strength=t}}})},{"../../core":20}],82:[function(t,e,r){function i(){n.AbstractFilter.call(this,"attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\nattribute vec4 aColor;\n\nuniform float strength;\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\nvarying vec2 vBlurTexCoords[6];\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3((aVertexPosition), 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n\n    vBlurTexCoords[ 0] = aTextureCoord + vec2(0.0, -0.012 * strength);\n    vBlurTexCoords[ 1] = aTextureCoord + vec2(0.0, -0.008 * strength);\n    vBlurTexCoords[ 2] = aTextureCoord + vec2(0.0, -0.004 * strength);\n    vBlurTexCoords[ 3] = aTextureCoord + vec2(0.0,  0.004 * strength);\n    vBlurTexCoords[ 4] = aTextureCoord + vec2(0.0,  0.008 * strength);\n    vBlurTexCoords[ 5] = aTextureCoord + vec2(0.0,  0.012 * strength);\n\n   vColor = vec4(aColor.rgb * aColor.a, aColor.a);\n}\n","precision lowp float;\n\nvarying vec2 vTextureCoord;\nvarying vec2 vBlurTexCoords[6];\nvarying vec4 vColor;\n\nuniform sampler2D uSampler;\n\nvoid main(void)\n{\n    gl_FragColor = vec4(0.0);\n\n    gl_FragColor += texture2D(uSampler, vBlurTexCoords[ 0])*0.004431848411938341;\n    gl_FragColor += texture2D(uSampler, vBlurTexCoords[ 1])*0.05399096651318985;\n    gl_FragColor += texture2D(uSampler, vBlurTexCoords[ 2])*0.2419707245191454;\n    gl_FragColor += texture2D(uSampler, vTextureCoord     )*0.3989422804014327;\n    gl_FragColor += texture2D(uSampler, vBlurTexCoords[ 3])*0.2419707245191454;\n    gl_FragColor += texture2D(uSampler, vBlurTexCoords[ 4])*0.05399096651318985;\n    gl_FragColor += texture2D(uSampler, vBlurTexCoords[ 5])*0.004431848411938341;\n}\n",{strength:{type:"1f",value:1}}),this.passes=1,this.strength=4}var n=t("../../core");i.prototype=Object.create(n.AbstractFilter.prototype),i.prototype.constructor=i,e.exports=i,i.prototype.applyFilter=function(t,e,r,i){var n=this.getShader(t);if(this.uniforms.strength.value=Math.abs(this.strength)/4/this.passes*(e.frame.height/e.size.height),1===this.passes)t.filterManager.applyFilter(n,e,r,i);else{for(var o=t.filterManager.getRenderTarget(!0),s=e,a=o,h=0;h<this.passes-1;h++){t.filterManager.applyFilter(n,s,a,!0);var u=a;a=s,s=u}t.filterManager.applyFilter(n,s,r,i),t.filterManager.returnRenderTarget(o)}},Object.defineProperties(i.prototype,{blur:{get:function(){return this.strength},set:function(t){this.padding=.5*Math.abs(t),this.strength=t}}})},{"../../core":20}],83:[function(t,e,r){function i(){n.AbstractFilter.call(this,null,"precision mediump float;\n\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform vec2 delta;\n\nfloat random(vec3 scale, float seed)\n{\n    return fract(sin(dot(gl_FragCoord.xyz + seed, scale)) * 43758.5453 + seed);\n}\n\nvoid main(void)\n{\n    vec4 color = vec4(0.0);\n    float total = 0.0;\n\n    float offset = random(vec3(12.9898, 78.233, 151.7182), 0.0);\n\n    for (float t = -30.0; t <= 30.0; t++)\n    {\n        float percent = (t + offset - 0.5) / 30.0;\n        float weight = 1.0 - abs(percent);\n        vec4 sample = texture2D(uSampler, vTextureCoord + delta * percent);\n        sample.rgb *= sample.a;\n        color += sample * weight;\n        total += weight;\n    }\n\n    gl_FragColor = color / total;\n    gl_FragColor.rgb /= gl_FragColor.a + 0.00001;\n}\n",{delta:{type:"v2",value:{x:.1,y:0}}})}var n=t("../../core");i.prototype=Object.create(n.AbstractFilter.prototype),i.prototype.constructor=i,e.exports=i},{"../../core":20}],84:[function(t,e,r){function i(){n.AbstractFilter.call(this,null,"precision mediump float;\n\nvarying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform float m[25];\n\nvoid main(void)\n{\n\n    vec4 c = texture2D(uSampler, vTextureCoord);\n\n    gl_FragColor.r = (m[0] * c.r);\n        gl_FragColor.r += (m[1] * c.g);\n        gl_FragColor.r += (m[2] * c.b);\n        gl_FragColor.r += (m[3] * c.a);\n        gl_FragColor.r += m[4];\n\n    gl_FragColor.g = (m[5] * c.r);\n        gl_FragColor.g += (m[6] * c.g);\n        gl_FragColor.g += (m[7] * c.b);\n        gl_FragColor.g += (m[8] * c.a);\n        gl_FragColor.g += m[9];\n\n     gl_FragColor.b = (m[10] * c.r);\n        gl_FragColor.b += (m[11] * c.g);\n        gl_FragColor.b += (m[12] * c.b);\n        gl_FragColor.b += (m[13] * c.a);\n        gl_FragColor.b += m[14];\n\n     gl_FragColor.a = (m[15] * c.r);\n        gl_FragColor.a += (m[16] * c.g);\n        gl_FragColor.a += (m[17] * c.b);\n        gl_FragColor.a += (m[18] * c.a);\n        gl_FragColor.a += m[19];\n\n}\n",{m:{type:"1fv",value:[1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0]}})}var n=t("../../core");i.prototype=Object.create(n.AbstractFilter.prototype),i.prototype.constructor=i,e.exports=i,i.prototype._loadMatrix=function(t,e){e=!!e;var r=t;e&&(this._multiply(r,this.uniforms.m.value,t),r=this._colorMatrix(r)),this.uniforms.m.value=r},i.prototype._multiply=function(t,e,r){return t[0]=e[0]*r[0]+e[1]*r[5]+e[2]*r[10]+e[3]*r[15],t[1]=e[0]*r[1]+e[1]*r[6]+e[2]*r[11]+e[3]*r[16],t[2]=e[0]*r[2]+e[1]*r[7]+e[2]*r[12]+e[3]*r[17],t[3]=e[0]*r[3]+e[1]*r[8]+e[2]*r[13]+e[3]*r[18],t[4]=e[0]*r[4]+e[1]*r[9]+e[2]*r[14]+e[3]*r[19],t[5]=e[5]*r[0]+e[6]*r[5]+e[7]*r[10]+e[8]*r[15],t[6]=e[5]*r[1]+e[6]*r[6]+e[7]*r[11]+e[8]*r[16],t[7]=e[5]*r[2]+e[6]*r[7]+e[7]*r[12]+e[8]*r[17],t[8]=e[5]*r[3]+e[6]*r[8]+e[7]*r[13]+e[8]*r[18],t[9]=e[5]*r[4]+e[6]*r[9]+e[7]*r[14]+e[8]*r[19],t[10]=e[10]*r[0]+e[11]*r[5]+e[12]*r[10]+e[13]*r[15],t[11]=e[10]*r[1]+e[11]*r[6]+e[12]*r[11]+e[13]*r[16],t[12]=e[10]*r[2]+e[11]*r[7]+e[12]*r[12]+e[13]*r[17],t[13]=e[10]*r[3]+e[11]*r[8]+e[12]*r[13]+e[13]*r[18],t[14]=e[10]*r[4]+e[11]*r[9]+e[12]*r[14]+e[13]*r[19],t[15]=e[15]*r[0]+e[16]*r[5]+e[17]*r[10]+e[18]*r[15],t[16]=e[15]*r[1]+e[16]*r[6]+e[17]*r[11]+e[18]*r[16],t[17]=e[15]*r[2]+e[16]*r[7]+e[17]*r[12]+e[18]*r[17],t[18]=e[15]*r[3]+e[16]*r[8]+e[17]*r[13]+e[18]*r[18],t[19]=e[15]*r[4]+e[16]*r[9]+e[17]*r[14]+e[18]*r[19],t},i.prototype._colorMatrix=function(t){var e=new Float32Array(t);return e[4]/=255,e[9]/=255,e[14]/=255,e[19]/=255,e},i.prototype.brightness=function(t,e){var r=[t,0,0,0,0,0,t,0,0,0,0,0,t,0,0,0,0,0,1,0];this._loadMatrix(r,e)},i.prototype.greyscale=function(t,e){var r=[t,t,t,0,0,t,t,t,0,0,t,t,t,0,0,0,0,0,1,0];this._loadMatrix(r,e)},i.prototype.grayscale=i.prototype.greyscale,i.prototype.blackAndWhite=function(t){var e=[.3,.6,.1,0,0,.3,.6,.1,0,0,.3,.6,.1,0,0,0,0,0,1,0];this._loadMatrix(e,t)},i.prototype.hue=function(t,e){t=(t||0)/180*Math.PI;var r=Math.cos(t),i=Math.sin(t),n=.213,o=.715,s=.072,a=[n+r*(1-n)+i*-n,o+r*-o+i*-o,s+r*-s+i*(1-s),0,0,n+r*-n+.143*i,o+r*(1-o)+.14*i,s+r*-s+i*-.283,0,0,n+r*-n+i*-(1-n),o+r*-o+i*o,s+r*(1-s)+i*s,0,0,0,0,0,1,0];this._loadMatrix(a,e)},i.prototype.contrast=function(t,e){var r=(t||0)+1,i=-128*(r-1),n=[r,0,0,0,i,0,r,0,0,i,0,0,r,0,i,0,0,0,1,0];this._loadMatrix(n,e)},i.prototype.saturate=function(t,e){var r=2*(t||0)/3+1,i=(r-1)*-.5,n=[r,i,i,0,0,i,r,i,0,0,i,i,r,0,0,0,0,0,1,0];this._loadMatrix(n,e)},i.prototype.desaturate=function(t){this.saturate(-1)},i.prototype.negative=function(t){var e=[0,1,1,0,0,1,0,1,0,0,1,1,0,0,0,0,0,0,1,0];this._loadMatrix(e,t)},i.prototype.sepia=function(t){var e=[.393,.7689999,.18899999,0,0,.349,.6859999,.16799999,0,0,.272,.5339999,.13099999,0,0,0,0,0,1,0];this._loadMatrix(e,t)},i.prototype.technicolor=function(t){var e=[1.9125277891456083,-.8545344976951645,-.09155508482755585,0,11.793603434377337,-.3087833385928097,1.7658908555458428,-.10601743074722245,0,-70.35205161461398,-.231103377548616,-.7501899197440212,1.847597816108189,0,30.950940869491138,0,0,0,1,0];this._loadMatrix(e,t)},i.prototype.polaroid=function(t){var e=[1.438,-.062,-.062,0,0,-.122,1.378,-.122,0,0,-.016,-.016,1.483,0,0,0,0,0,1,0];this._loadMatrix(e,t)},i.prototype.toBGR=function(t){var e=[0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,1,0];this._loadMatrix(e,t)},i.prototype.kodachrome=function(t){var e=[1.1285582396593525,-.3967382283601348,-.03992559172921793,0,63.72958762196502,-.16404339962244616,1.0835251566291304,-.05498805115633132,0,24.732407896706203,-.16786010706155763,-.5603416277695248,1.6014850761964943,0,35.62982807460946,0,0,0,1,0];this._loadMatrix(e,t)},i.prototype.browni=function(t){var e=[.5997023498159715,.34553243048391263,-.2708298674538042,0,47.43192855600873,-.037703249837783157,.8609577587992641,.15059552388459913,0,-36.96841498319127,.24113635128153335,-.07441037908422492,.44972182064877153,0,-7.562075277591283,0,0,0,1,0];this._loadMatrix(e,t)},i.prototype.vintage=function(t){var e=[.6279345635605994,.3202183420819367,-.03965408211312453,0,9.651285835294123,.02578397704808868,.6441188644374771,.03259127616149294,0,7.462829176470591,.0466055556782719,-.0851232987247891,.5241648018700465,0,5.159190588235296,0,0,0,1,0];this._loadMatrix(e,t)},i.prototype.colorTone=function(t,e,r,i,n){t=t||.2,e=e||.15,r=r||16770432,i=i||3375104;var o=(r>>16&255)/255,s=(r>>8&255)/255,a=(255&r)/255,h=(i>>16&255)/255,u=(i>>8&255)/255,l=(255&i)/255,c=[.3,.59,.11,0,0,o,s,a,t,0,h,u,l,e,0,o-h,s-u,a-l,0,0];this._loadMatrix(c,n)},i.prototype.night=function(t,e){t=t||.1;var r=[-2*t,-t,0,0,0,-t,0,t,0,0,0,t,2*t,0,0,0,0,0,1,0];this._loadMatrix(r,e)},i.prototype.predator=function(t,e){var r=[11.224130630493164*t,-4.794486999511719*t,-2.8746118545532227*t,0*t,.40342438220977783*t,-3.6330697536468506*t,9.193157196044922*t,-2.951810836791992*t,0*t,-1.316135048866272*t,-3.2184197902679443*t,-4.2375030517578125*t,7.476448059082031*t,0*t,.8044459223747253*t,0,0,0,1,0];this._loadMatrix(r,e)},i.prototype.lsd=function(t){var e=[2,-.4,.5,0,0,-.5,2,-.4,0,0,-.4,-.5,3,0,0,0,0,0,1,0];this._loadMatrix(e,t)},i.prototype.reset=function(){var t=[1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0];this._loadMatrix(t,!1)},Object.defineProperties(i.prototype,{matrix:{get:function(){return this.uniforms.m.value},set:function(t){this.uniforms.m.value=t}}})},{"../../core":20}],85:[function(t,e,r){function i(){n.AbstractFilter.call(this,null,"precision mediump float;\n\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform float step;\n\nvoid main(void)\n{\n    vec4 color = texture2D(uSampler, vTextureCoord);\n\n    color = floor(color * step) / step;\n\n    gl_FragColor = color;\n}\n",{step:{type:"1f",value:5}})}var n=t("../../core");i.prototype=Object.create(n.AbstractFilter.prototype),i.prototype.constructor=i,e.exports=i,Object.defineProperties(i.prototype,{step:{get:function(){return this.uniforms.step.value},set:function(t){this.uniforms.step.value=t}}})},{"../../core":20}],86:[function(t,e,r){function i(t,e,r){n.AbstractFilter.call(this,null,"precision mediump float;\n\nvarying mediump vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform vec2 texelSize;\nuniform float matrix[9];\n\nvoid main(void)\n{\n   vec4 c11 = texture2D(uSampler, vTextureCoord - texelSize); // top left\n   vec4 c12 = texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y - texelSize.y)); // top center\n   vec4 c13 = texture2D(uSampler, vec2(vTextureCoord.x + texelSize.x, vTextureCoord.y - texelSize.y)); // top right\n\n   vec4 c21 = texture2D(uSampler, vec2(vTextureCoord.x - texelSize.x, vTextureCoord.y)); // mid left\n   vec4 c22 = texture2D(uSampler, vTextureCoord); // mid center\n   vec4 c23 = texture2D(uSampler, vec2(vTextureCoord.x + texelSize.x, vTextureCoord.y)); // mid right\n\n   vec4 c31 = texture2D(uSampler, vec2(vTextureCoord.x - texelSize.x, vTextureCoord.y + texelSize.y)); // bottom left\n   vec4 c32 = texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y + texelSize.y)); // bottom center\n   vec4 c33 = texture2D(uSampler, vTextureCoord + texelSize); // bottom right\n\n   gl_FragColor =\n       c11 * matrix[0] + c12 * matrix[1] + c13 * matrix[2] +\n       c21 * matrix[3] + c22 * matrix[4] + c23 * matrix[5] +\n       c31 * matrix[6] + c32 * matrix[7] + c33 * matrix[8];\n\n   gl_FragColor.a = c22.a;\n}\n",{matrix:{type:"1fv",value:new Float32Array(t)},texelSize:{type:"v2",value:{x:1/e,y:1/r}}})}var n=t("../../core");i.prototype=Object.create(n.AbstractFilter.prototype),i.prototype.constructor=i,e.exports=i,Object.defineProperties(i.prototype,{matrix:{get:function(){return this.uniforms.matrix.value},set:function(t){this.uniforms.matrix.value=new Float32Array(t)}},width:{get:function(){return 1/this.uniforms.texelSize.value.x},set:function(t){this.uniforms.texelSize.value.x=1/t}},height:{get:function(){return 1/this.uniforms.texelSize.value.y},set:function(t){this.uniforms.texelSize.value.y=1/t}}})},{"../../core":20}],87:[function(t,e,r){function i(){n.AbstractFilter.call(this,null,"precision mediump float;\n\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\n\nvoid main(void)\n{\n    float lum = length(texture2D(uSampler, vTextureCoord.xy).rgb);\n\n    gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);\n\n    if (lum < 1.00)\n    {\n        if (mod(gl_FragCoord.x + gl_FragCoord.y, 10.0) == 0.0)\n        {\n            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\n        }\n    }\n\n    if (lum < 0.75)\n    {\n        if (mod(gl_FragCoord.x - gl_FragCoord.y, 10.0) == 0.0)\n        {\n            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\n        }\n    }\n\n    if (lum < 0.50)\n    {\n        if (mod(gl_FragCoord.x + gl_FragCoord.y - 5.0, 10.0) == 0.0)\n        {\n            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\n        }\n    }\n\n    if (lum < 0.3)\n    {\n        if (mod(gl_FragCoord.x - gl_FragCoord.y - 5.0, 10.0) == 0.0)\n        {\n            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\n        }\n    }\n}\n")}var n=t("../../core");i.prototype=Object.create(n.AbstractFilter.prototype),i.prototype.constructor=i,e.exports=i},{"../../core":20}],88:[function(t,e,r){function i(t,e){var r=new n.Matrix;t.renderable=!1,n.AbstractFilter.call(this,"attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\nattribute vec4 aColor;\n\nuniform mat3 projectionMatrix;\nuniform mat3 otherMatrix;\n\nvarying vec2 vMapCoord;\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\n\nvoid main(void)\n{\n   gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n   vTextureCoord = aTextureCoord;\n   vMapCoord = ( otherMatrix * vec3( aTextureCoord, 1.0)  ).xy;\n   vColor = vec4(aColor.rgb * aColor.a, aColor.a);\n}\n","precision mediump float;\n\nvarying vec2 vMapCoord;\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\n\nuniform vec2 scale;\n\nuniform sampler2D uSampler;\nuniform sampler2D mapSampler;\n\nvoid main(void)\n{\n   vec4 map =  texture2D(mapSampler, vMapCoord);\n\n   map -= 0.5;\n   map.xy *= scale;\n\n   gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.x + map.x, vTextureCoord.y + map.y));\n}\n",{mapSampler:{type:"sampler2D",value:t.texture},otherMatrix:{type:"mat3",value:r.toArray(!0)},scale:{type:"v2",value:{x:1,y:1}}}),this.maskSprite=t,this.maskMatrix=r,(null===e||void 0===e)&&(e=20),this.scale=new n.Point(e,e)}var n=t("../../core");i.prototype=Object.create(n.AbstractFilter.prototype),i.prototype.constructor=i,e.exports=i,i.prototype.applyFilter=function(t,e,r){var i=t.filterManager;i.calculateMappedMatrix(e.frame,this.maskSprite,this.maskMatrix),this.uniforms.otherMatrix.value=this.maskMatrix.toArray(!0),this.uniforms.scale.value.x=this.scale.x*(1/e.frame.width),this.uniforms.scale.value.y=this.scale.y*(1/e.frame.height);var n=this.getShader(t);i.applyFilter(n,e,r)},Object.defineProperties(i.prototype,{map:{get:function(){return this.uniforms.mapSampler.value},set:function(t){this.uniforms.mapSampler.value=t}}})},{"../../core":20}],89:[function(t,e,r){function i(){n.AbstractFilter.call(this,null,"precision mediump float;\n\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\n\nuniform vec4 dimensions;\nuniform sampler2D uSampler;\n\nuniform float angle;\nuniform float scale;\n\nfloat pattern()\n{\n   float s = sin(angle), c = cos(angle);\n   vec2 tex = vTextureCoord * dimensions.xy;\n   vec2 point = vec2(\n       c * tex.x - s * tex.y,\n       s * tex.x + c * tex.y\n   ) * scale;\n   return (sin(point.x) * sin(point.y)) * 4.0;\n}\n\nvoid main()\n{\n   vec4 color = texture2D(uSampler, vTextureCoord);\n   float average = (color.r + color.g + color.b) / 3.0;\n   gl_FragColor = vec4(vec3(average * 10.0 - 5.0 + pattern()), color.a);\n}\n",{scale:{type:"1f",value:1},angle:{type:"1f",value:5},dimensions:{type:"4fv",value:[0,0,0,0]}})}var n=t("../../core");i.prototype=Object.create(n.AbstractFilter.prototype),i.prototype.constructor=i,e.exports=i,Object.defineProperties(i.prototype,{scale:{get:function(){return this.uniforms.scale.value},set:function(t){this.uniforms.scale.value=t}},angle:{get:function(){return this.uniforms.angle.value},set:function(t){this.uniforms.angle.value=t}}})},{"../../core":20}],90:[function(t,e,r){function i(){n.AbstractFilter.call(this,"attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\nattribute vec4 aColor;\n\nuniform float strength;\nuniform vec2 offset;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\nvarying vec2 vBlurTexCoords[6];\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3((aVertexPosition+offset), 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n\n    vBlurTexCoords[ 0] = aTextureCoord + vec2(0.0, -0.012 * strength);\n    vBlurTexCoords[ 1] = aTextureCoord + vec2(0.0, -0.008 * strength);\n    vBlurTexCoords[ 2] = aTextureCoord + vec2(0.0, -0.004 * strength);\n    vBlurTexCoords[ 3] = aTextureCoord + vec2(0.0,  0.004 * strength);\n    vBlurTexCoords[ 4] = aTextureCoord + vec2(0.0,  0.008 * strength);\n    vBlurTexCoords[ 5] = aTextureCoord + vec2(0.0,  0.012 * strength);\n\n   vColor = vec4(aColor.rgb * aColor.a, aColor.a);\n}\n","precision lowp float;\n\nvarying vec2 vTextureCoord;\nvarying vec2 vBlurTexCoords[6];\nvarying vec4 vColor;\n\nuniform vec3 color;\nuniform float alpha;\n\nuniform sampler2D uSampler;\n\nvoid main(void)\n{\n    vec4 sum = vec4(0.0);\n\n    sum += texture2D(uSampler, vBlurTexCoords[ 0])*0.004431848411938341;\n    sum += texture2D(uSampler, vBlurTexCoords[ 1])*0.05399096651318985;\n    sum += texture2D(uSampler, vBlurTexCoords[ 2])*0.2419707245191454;\n    sum += texture2D(uSampler, vTextureCoord     )*0.3989422804014327;\n    sum += texture2D(uSampler, vBlurTexCoords[ 3])*0.2419707245191454;\n    sum += texture2D(uSampler, vBlurTexCoords[ 4])*0.05399096651318985;\n    sum += texture2D(uSampler, vBlurTexCoords[ 5])*0.004431848411938341;\n\n    gl_FragColor = vec4( color.rgb * sum.a * alpha, sum.a * alpha );\n}\n",{blur:{type:"1f",value:1/512},color:{type:"c",value:[0,0,0]},alpha:{type:"1f",value:.7},offset:{type:"2f",value:[5,5]},strength:{type:"1f",value:1}}),this.passes=1,this.strength=4}var n=t("../../core");i.prototype=Object.create(n.AbstractFilter.prototype),i.prototype.constructor=i,e.exports=i,i.prototype.applyFilter=function(t,e,r,i){var n=this.getShader(t);if(this.uniforms.strength.value=this.strength/4/this.passes*(e.frame.height/e.size.height),1===this.passes)t.filterManager.applyFilter(n,e,r,i);else{for(var o=t.filterManager.getRenderTarget(!0),s=e,a=o,h=0;h<this.passes-1;h++){t.filterManager.applyFilter(n,s,a,i);var u=a;a=s,s=u}t.filterManager.applyFilter(n,s,r,i),t.filterManager.returnRenderTarget(o)}},Object.defineProperties(i.prototype,{blur:{get:function(){return this.strength},set:function(t){this.padding=.5*t,this.strength=t}}})},{"../../core":20}],91:[function(t,e,r){function i(){n.AbstractFilter.call(this),this.blurXFilter=new o,this.blurYTintFilter=new s,this.defaultFilter=new n.AbstractFilter,this.padding=30,this._dirtyPosition=!0,this._angle=45*Math.PI/180,this._distance=10,this.alpha=.75,this.hideObject=!1,this.blendMode=n.BLEND_MODES.MULTIPLY}var n=t("../../core"),o=t("../blur/BlurXFilter"),s=t("./BlurYTintFilter");i.prototype=Object.create(n.AbstractFilter.prototype),i.prototype.constructor=i,e.exports=i,i.prototype.applyFilter=function(t,e,r){var i=t.filterManager.getRenderTarget(!0);this._dirtyPosition&&(this._dirtyPosition=!1,this.blurYTintFilter.uniforms.offset.value[0]=Math.sin(this._angle)*this._distance,this.blurYTintFilter.uniforms.offset.value[1]=Math.cos(this._angle)*this._distance),this.blurXFilter.applyFilter(t,e,i),t.blendModeManager.setBlendMode(this.blendMode),this.blurYTintFilter.applyFilter(t,i,r),t.blendModeManager.setBlendMode(n.BLEND_MODES.NORMAL),this.hideObject||this.defaultFilter.applyFilter(t,e,r),t.filterManager.returnRenderTarget(i)},Object.defineProperties(i.prototype,{blur:{get:function(){return this.blurXFilter.blur},set:function(t){this.blurXFilter.blur=this.blurYTintFilter.blur=t}},blurX:{get:function(){return this.blurXFilter.blur},set:function(t){this.blurXFilter.blur=t}},blurY:{get:function(){return this.blurYTintFilter.blur},set:function(t){this.blurYTintFilter.blur=t}},color:{get:function(){return n.utils.rgb2hex(this.blurYTintFilter.uniforms.color.value)},set:function(t){this.blurYTintFilter.uniforms.color.value=n.utils.hex2rgb(t)}},alpha:{get:function(){return this.blurYTintFilter.uniforms.alpha.value},set:function(t){this.blurYTintFilter.uniforms.alpha.value=t}},distance:{get:function(){return this._distance},set:function(t){this._dirtyPosition=!0,this._distance=t}},angle:{get:function(){return this._angle},set:function(t){this._dirtyPosition=!0,this._angle=t}}})},{"../../core":20,"../blur/BlurXFilter":81,"./BlurYTintFilter":90}],92:[function(t,e,r){function i(){n.AbstractFilter.call(this,null,"precision mediump float;\n\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\n\nuniform sampler2D uSampler;\nuniform float gray;\n\nvoid main(void)\n{\n   gl_FragColor = texture2D(uSampler, vTextureCoord);\n   gl_FragColor.rgb = mix(gl_FragColor.rgb, vec3(0.2126*gl_FragColor.r + 0.7152*gl_FragColor.g + 0.0722*gl_FragColor.b), gray);\n}\n",{gray:{type:"1f",value:1}})}var n=t("../../core");i.prototype=Object.create(n.AbstractFilter.prototype),i.prototype.constructor=i,e.exports=i,Object.defineProperties(i.prototype,{gray:{get:function(){return this.uniforms.gray.value},set:function(t){this.uniforms.gray.value=t}}})},{"../../core":20}],93:[function(t,e,r){e.exports={AsciiFilter:t("./ascii/AsciiFilter"),BloomFilter:t("./bloom/BloomFilter"),BlurFilter:t("./blur/BlurFilter"),BlurXFilter:t("./blur/BlurXFilter"),BlurYFilter:t("./blur/BlurYFilter"),BlurDirFilter:t("./blur/BlurDirFilter"),ColorMatrixFilter:t("./color/ColorMatrixFilter"),ColorStepFilter:t("./color/ColorStepFilter"),ConvolutionFilter:t("./convolution/ConvolutionFilter"),CrossHatchFilter:t("./crosshatch/CrossHatchFilter"),DisplacementFilter:t("./displacement/DisplacementFilter"),DotScreenFilter:t("./dot/DotScreenFilter"),GrayFilter:t("./gray/GrayFilter"),DropShadowFilter:t("./dropshadow/DropShadowFilter"),InvertFilter:t("./invert/InvertFilter"),NoiseFilter:t("./noise/NoiseFilter"),PixelateFilter:t("./pixelate/PixelateFilter"),RGBSplitFilter:t("./rgb/RGBSplitFilter"),ShockwaveFilter:t("./shockwave/ShockwaveFilter"),SepiaFilter:t("./sepia/SepiaFilter"),SmartBlurFilter:t("./blur/SmartBlurFilter"),TiltShiftFilter:t("./tiltshift/TiltShiftFilter"),TiltShiftXFilter:t("./tiltshift/TiltShiftXFilter"),TiltShiftYFilter:t("./tiltshift/TiltShiftYFilter"),TwistFilter:t("./twist/TwistFilter")}},{"./ascii/AsciiFilter":77,"./bloom/BloomFilter":78,"./blur/BlurDirFilter":79,"./blur/BlurFilter":80,"./blur/BlurXFilter":81,"./blur/BlurYFilter":82,"./blur/SmartBlurFilter":83,"./color/ColorMatrixFilter":84,"./color/ColorStepFilter":85,"./convolution/ConvolutionFilter":86,"./crosshatch/CrossHatchFilter":87,"./displacement/DisplacementFilter":88,"./dot/DotScreenFilter":89,"./dropshadow/DropShadowFilter":91,"./gray/GrayFilter":92,"./invert/InvertFilter":94,"./noise/NoiseFilter":95,"./pixelate/PixelateFilter":96,"./rgb/RGBSplitFilter":97,"./sepia/SepiaFilter":98,"./shockwave/ShockwaveFilter":99,"./tiltshift/TiltShiftFilter":101,"./tiltshift/TiltShiftXFilter":102,"./tiltshift/TiltShiftYFilter":103,"./twist/TwistFilter":104}],94:[function(t,e,r){function i(){n.AbstractFilter.call(this,null,"precision mediump float;\n\nvarying vec2 vTextureCoord;\n\nuniform float invert;\nuniform sampler2D uSampler;\n\nvoid main(void)\n{\n    gl_FragColor = texture2D(uSampler, vTextureCoord);\n\n    gl_FragColor.rgb = mix( (vec3(1)-gl_FragColor.rgb) * gl_FragColor.a, gl_FragColor.rgb, 1.0 - invert);\n}\n",{invert:{type:"1f",value:1}})}var n=t("../../core");i.prototype=Object.create(n.AbstractFilter.prototype),i.prototype.constructor=i,e.exports=i,Object.defineProperties(i.prototype,{invert:{get:function(){return this.uniforms.invert.value},set:function(t){this.uniforms.invert.value=t}}})},{"../../core":20}],95:[function(t,e,r){function i(){n.AbstractFilter.call(this,null,"precision highp float;\n\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\n\nuniform float noise;\nuniform sampler2D uSampler;\n\nfloat rand(vec2 co)\n{\n    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);\n}\n\nvoid main()\n{\n    vec4 color = texture2D(uSampler, vTextureCoord);\n\n    float diff = (rand(vTextureCoord) - 0.5) * noise;\n\n    color.r += diff;\n    color.g += diff;\n    color.b += diff;\n\n    gl_FragColor = color;\n}\n",{noise:{type:"1f",value:.5}})}var n=t("../../core");i.prototype=Object.create(n.AbstractFilter.prototype),i.prototype.constructor=i,e.exports=i,Object.defineProperties(i.prototype,{noise:{get:function(){return this.uniforms.noise.value},set:function(t){this.uniforms.noise.value=t}}})},{"../../core":20}],96:[function(t,e,r){function i(){n.AbstractFilter.call(this,null,"precision mediump float;\n\nvarying vec2 vTextureCoord;\n\nuniform vec4 dimensions;\nuniform vec2 pixelSize;\nuniform sampler2D uSampler;\n\nvoid main(void)\n{\n    vec2 coord = vTextureCoord;\n\n    vec2 size = dimensions.xy / pixelSize;\n\n    vec2 color = floor( ( vTextureCoord * size ) ) / size + pixelSize/dimensions.xy * 0.5;\n\n    gl_FragColor = texture2D(uSampler, color);\n}\n",{dimensions:{type:"4fv",value:new Float32Array([0,0,0,0])},pixelSize:{type:"v2",value:{x:10,y:10}}})}var n=t("../../core");i.prototype=Object.create(n.AbstractFilter.prototype),i.prototype.constructor=i,e.exports=i,Object.defineProperties(i.prototype,{size:{get:function(){return this.uniforms.pixelSize.value},set:function(t){this.uniforms.pixelSize.value=t}}})},{"../../core":20}],97:[function(t,e,r){function i(){n.AbstractFilter.call(this,null,"precision mediump float;\n\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform vec4 dimensions;\nuniform vec2 red;\nuniform vec2 green;\nuniform vec2 blue;\n\nvoid main(void)\n{\n   gl_FragColor.r = texture2D(uSampler, vTextureCoord + red/dimensions.xy).r;\n   gl_FragColor.g = texture2D(uSampler, vTextureCoord + green/dimensions.xy).g;\n   gl_FragColor.b = texture2D(uSampler, vTextureCoord + blue/dimensions.xy).b;\n   gl_FragColor.a = texture2D(uSampler, vTextureCoord).a;\n}\n",{red:{type:"v2",value:{x:20,y:20}},green:{type:"v2",value:{x:-20,y:20}},blue:{type:"v2",value:{x:20,y:-20}},dimensions:{type:"4fv",value:[0,0,0,0]}})}var n=t("../../core");i.prototype=Object.create(n.AbstractFilter.prototype),i.prototype.constructor=i,e.exports=i,Object.defineProperties(i.prototype,{red:{get:function(){return this.uniforms.red.value},set:function(t){this.uniforms.red.value=t}},green:{get:function(){return this.uniforms.green.value},set:function(t){this.uniforms.green.value=t}},blue:{get:function(){return this.uniforms.blue.value},set:function(t){this.uniforms.blue.value=t}}})},{"../../core":20}],98:[function(t,e,r){function i(){n.AbstractFilter.call(this,null,"precision mediump float;\n\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform float sepia;\n\nconst mat3 sepiaMatrix = mat3(0.3588, 0.7044, 0.1368, 0.2990, 0.5870, 0.1140, 0.2392, 0.4696, 0.0912);\n\nvoid main(void)\n{\n   gl_FragColor = texture2D(uSampler, vTextureCoord);\n   gl_FragColor.rgb = mix( gl_FragColor.rgb, gl_FragColor.rgb * sepiaMatrix, sepia);\n}\n",{
sepia:{type:"1f",value:1}})}var n=t("../../core");i.prototype=Object.create(n.AbstractFilter.prototype),i.prototype.constructor=i,e.exports=i,Object.defineProperties(i.prototype,{sepia:{get:function(){return this.uniforms.sepia.value},set:function(t){this.uniforms.sepia.value=t}}})},{"../../core":20}],99:[function(t,e,r){function i(){n.AbstractFilter.call(this,null,"precision lowp float;\n\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\n\nuniform vec2 center;\nuniform vec3 params; // 10.0, 0.8, 0.1\nuniform float time;\n\nvoid main()\n{\n    vec2 uv = vTextureCoord;\n    vec2 texCoord = uv;\n\n    float dist = distance(uv, center);\n\n    if ( (dist <= (time + params.z)) && (dist >= (time - params.z)) )\n    {\n        float diff = (dist - time);\n        float powDiff = 1.0 - pow(abs(diff*params.x), params.y);\n\n        float diffTime = diff  * powDiff;\n        vec2 diffUV = normalize(uv - center);\n        texCoord = uv + (diffUV * diffTime);\n    }\n\n    gl_FragColor = texture2D(uSampler, texCoord);\n}\n",{center:{type:"v2",value:{x:.5,y:.5}},params:{type:"v3",value:{x:10,y:.8,z:.1}},time:{type:"1f",value:0}})}var n=t("../../core");i.prototype=Object.create(n.AbstractFilter.prototype),i.prototype.constructor=i,e.exports=i,Object.defineProperties(i.prototype,{center:{get:function(){return this.uniforms.center.value},set:function(t){this.uniforms.center.value=t}},params:{get:function(){return this.uniforms.params.value},set:function(t){this.uniforms.params.value=t}},time:{get:function(){return this.uniforms.time.value},set:function(t){this.uniforms.time.value=t}}})},{"../../core":20}],100:[function(t,e,r){function i(){n.AbstractFilter.call(this,null,"precision mediump float;\n\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform float blur;\nuniform float gradientBlur;\nuniform vec2 start;\nuniform vec2 end;\nuniform vec2 delta;\nuniform vec2 texSize;\n\nfloat random(vec3 scale, float seed)\n{\n    return fract(sin(dot(gl_FragCoord.xyz + seed, scale)) * 43758.5453 + seed);\n}\n\nvoid main(void)\n{\n    vec4 color = vec4(0.0);\n    float total = 0.0;\n\n    float offset = random(vec3(12.9898, 78.233, 151.7182), 0.0);\n    vec2 normal = normalize(vec2(start.y - end.y, end.x - start.x));\n    float radius = smoothstep(0.0, 1.0, abs(dot(vTextureCoord * texSize - start, normal)) / gradientBlur) * blur;\n\n    for (float t = -30.0; t <= 30.0; t++)\n    {\n        float percent = (t + offset - 0.5) / 30.0;\n        float weight = 1.0 - abs(percent);\n        vec4 sample = texture2D(uSampler, vTextureCoord + delta / texSize * percent * radius);\n        sample.rgb *= sample.a;\n        color += sample * weight;\n        total += weight;\n    }\n\n    gl_FragColor = color / total;\n    gl_FragColor.rgb /= gl_FragColor.a + 0.00001;\n}\n",{blur:{type:"1f",value:100},gradientBlur:{type:"1f",value:600},start:{type:"v2",value:{x:0,y:window.innerHeight/2}},end:{type:"v2",value:{x:600,y:window.innerHeight/2}},delta:{type:"v2",value:{x:30,y:30}},texSize:{type:"v2",value:{x:window.innerWidth,y:window.innerHeight}}}),this.updateDelta()}var n=t("../../core");i.prototype=Object.create(n.AbstractFilter.prototype),i.prototype.constructor=i,e.exports=i,i.prototype.updateDelta=function(){this.uniforms.delta.value.x=0,this.uniforms.delta.value.y=0},Object.defineProperties(i.prototype,{blur:{get:function(){return this.uniforms.blur.value},set:function(t){this.uniforms.blur.value=t}},gradientBlur:{get:function(){return this.uniforms.gradientBlur.value},set:function(t){this.uniforms.gradientBlur.value=t}},start:{get:function(){return this.uniforms.start.value},set:function(t){this.uniforms.start.value=t,this.updateDelta()}},end:{get:function(){return this.uniforms.end.value},set:function(t){this.uniforms.end.value=t,this.updateDelta()}}})},{"../../core":20}],101:[function(t,e,r){function i(){n.AbstractFilter.call(this),this.tiltShiftXFilter=new o,this.tiltShiftYFilter=new s}var n=t("../../core"),o=t("./TiltShiftXFilter"),s=t("./TiltShiftYFilter");i.prototype=Object.create(n.AbstractFilter.prototype),i.prototype.constructor=i,e.exports=i,i.prototype.applyFilter=function(t,e,r){var i=t.filterManager.getRenderTarget(!0);this.tiltShiftXFilter.applyFilter(t,e,i),this.tiltShiftYFilter.applyFilter(t,i,r),t.filterManager.returnRenderTarget(i)},Object.defineProperties(i.prototype,{blur:{get:function(){return this.tiltShiftXFilter.blur},set:function(t){this.tiltShiftXFilter.blur=this.tiltShiftYFilter.blur=t}},gradientBlur:{get:function(){return this.tiltShiftXFilter.gradientBlur},set:function(t){this.tiltShiftXFilter.gradientBlur=this.tiltShiftYFilter.gradientBlur=t}},start:{get:function(){return this.tiltShiftXFilter.start},set:function(t){this.tiltShiftXFilter.start=this.tiltShiftYFilter.start=t}},end:{get:function(){return this.tiltShiftXFilter.end},set:function(t){this.tiltShiftXFilter.end=this.tiltShiftYFilter.end=t}}})},{"../../core":20,"./TiltShiftXFilter":102,"./TiltShiftYFilter":103}],102:[function(t,e,r){function i(){n.call(this)}var n=t("./TiltShiftAxisFilter");i.prototype=Object.create(n.prototype),i.prototype.constructor=i,e.exports=i,i.prototype.updateDelta=function(){var t=this.uniforms.end.value.x-this.uniforms.start.value.x,e=this.uniforms.end.value.y-this.uniforms.start.value.y,r=Math.sqrt(t*t+e*e);this.uniforms.delta.value.x=t/r,this.uniforms.delta.value.y=e/r}},{"./TiltShiftAxisFilter":100}],103:[function(t,e,r){function i(){n.call(this)}var n=t("./TiltShiftAxisFilter");i.prototype=Object.create(n.prototype),i.prototype.constructor=i,e.exports=i,i.prototype.updateDelta=function(){var t=this.uniforms.end.value.x-this.uniforms.start.value.x,e=this.uniforms.end.value.y-this.uniforms.start.value.y,r=Math.sqrt(t*t+e*e);this.uniforms.delta.value.x=-e/r,this.uniforms.delta.value.y=t/r}},{"./TiltShiftAxisFilter":100}],104:[function(t,e,r){function i(){n.AbstractFilter.call(this,null,"precision mediump float;\n\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform float radius;\nuniform float angle;\nuniform vec2 offset;\n\nvoid main(void)\n{\n   vec2 coord = vTextureCoord - offset;\n   float dist = length(coord);\n\n   if (dist < radius)\n   {\n       float ratio = (radius - dist) / radius;\n       float angleMod = ratio * ratio * angle;\n       float s = sin(angleMod);\n       float c = cos(angleMod);\n       coord = vec2(coord.x * c - coord.y * s, coord.x * s + coord.y * c);\n   }\n\n   gl_FragColor = texture2D(uSampler, coord+offset);\n}\n",{radius:{type:"1f",value:.5},angle:{type:"1f",value:5},offset:{type:"v2",value:{x:.5,y:.5}}})}var n=t("../../core");i.prototype=Object.create(n.AbstractFilter.prototype),i.prototype.constructor=i,e.exports=i,Object.defineProperties(i.prototype,{offset:{get:function(){return this.uniforms.offset.value},set:function(t){this.uniforms.offset.value=t}},radius:{get:function(){return this.uniforms.radius.value},set:function(t){this.uniforms.radius.value=t}},angle:{get:function(){return this.uniforms.angle.value},set:function(t){this.uniforms.angle.value=t}}})},{"../../core":20}],105:[function(t,e,r){(function(r){t("./polyfill");var i=e.exports=t("./core");i.extras=t("./extras"),i.filters=t("./filters"),i.interaction=t("./interaction"),i.loaders=t("./loaders"),i.mesh=t("./mesh"),i.loader=new i.loaders.Loader,Object.assign(i,t("./deprecation")),r.PIXI=i}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./core":20,"./deprecation":69,"./extras":76,"./filters":93,"./interaction":108,"./loaders":111,"./mesh":117,"./polyfill":122}],106:[function(t,e,r){function i(){this.global=new n.Point,this.target=null,this.originalEvent=null}var n=t("../core");i.prototype.constructor=i,e.exports=i,i.prototype.getLocalPosition=function(t,e,r){return t.toLocal(r?r:this.global,e)}},{"../core":20}],107:[function(t,e,r){function i(t,e){e=e||{},this.renderer=t,this.autoPreventDefault=void 0!==e.autoPreventDefault?e.autoPreventDefault:!0,this.interactionFrequency=e.interactionFrequency||10,this.mouse=new o,this.eventData={stopped:!1,target:null,type:null,data:this.mouse,stopPropagation:function(){this.stopped=!0}},this.interactiveDataPool=[],this.interactionDOMElement=null,this.eventsAdded=!1,this.onMouseUp=this.onMouseUp.bind(this),this.processMouseUp=this.processMouseUp.bind(this),this.onMouseDown=this.onMouseDown.bind(this),this.processMouseDown=this.processMouseDown.bind(this),this.onMouseMove=this.onMouseMove.bind(this),this.processMouseMove=this.processMouseMove.bind(this),this.onMouseOut=this.onMouseOut.bind(this),this.processMouseOverOut=this.processMouseOverOut.bind(this),this.onTouchStart=this.onTouchStart.bind(this),this.processTouchStart=this.processTouchStart.bind(this),this.onTouchEnd=this.onTouchEnd.bind(this),this.processTouchEnd=this.processTouchEnd.bind(this),this.onTouchMove=this.onTouchMove.bind(this),this.processTouchMove=this.processTouchMove.bind(this),this.last=0,this.currentCursorStyle="inherit",this._tempPoint=new n.Point,this.resolution=1,this.setTargetElement(this.renderer.view,this.renderer.resolution)}var n=t("../core"),o=t("./InteractionData");Object.assign(n.DisplayObject.prototype,t("./interactiveTarget")),i.prototype.constructor=i,e.exports=i,i.prototype.setTargetElement=function(t,e){this.removeEvents(),this.interactionDOMElement=t,this.resolution=e||1,this.addEvents()},i.prototype.addEvents=function(){this.interactionDOMElement&&(n.ticker.shared.add(this.update,this),window.navigator.msPointerEnabled&&(this.interactionDOMElement.style["-ms-content-zooming"]="none",this.interactionDOMElement.style["-ms-touch-action"]="none"),window.document.addEventListener("mousemove",this.onMouseMove,!0),this.interactionDOMElement.addEventListener("mousedown",this.onMouseDown,!0),this.interactionDOMElement.addEventListener("mouseout",this.onMouseOut,!0),this.interactionDOMElement.addEventListener("touchstart",this.onTouchStart,!0),this.interactionDOMElement.addEventListener("touchend",this.onTouchEnd,!0),this.interactionDOMElement.addEventListener("touchmove",this.onTouchMove,!0),window.addEventListener("mouseup",this.onMouseUp,!0),this.eventsAdded=!0)},i.prototype.removeEvents=function(){this.interactionDOMElement&&(n.ticker.shared.remove(this.update),window.navigator.msPointerEnabled&&(this.interactionDOMElement.style["-ms-content-zooming"]="",this.interactionDOMElement.style["-ms-touch-action"]=""),window.document.removeEventListener("mousemove",this.onMouseMove,!0),this.interactionDOMElement.removeEventListener("mousedown",this.onMouseDown,!0),this.interactionDOMElement.removeEventListener("mouseout",this.onMouseOut,!0),this.interactionDOMElement.removeEventListener("touchstart",this.onTouchStart,!0),this.interactionDOMElement.removeEventListener("touchend",this.onTouchEnd,!0),this.interactionDOMElement.removeEventListener("touchmove",this.onTouchMove,!0),this.interactionDOMElement=null,window.removeEventListener("mouseup",this.onMouseUp,!0),this.eventsAdded=!1)},i.prototype.update=function(t){if(this._deltaTime+=t,!(this._deltaTime<this.interactionFrequency)&&(this._deltaTime=0,this.interactionDOMElement)){if(this.didMove)return void(this.didMove=!1);this.cursor="inherit",this.processInteractive(this.mouse.global,this.renderer._lastObjectRendered,this.processMouseOverOut,!0),this.currentCursorStyle!==this.cursor&&(this.currentCursorStyle=this.cursor,this.interactionDOMElement.style.cursor=this.cursor)}},i.prototype.dispatchEvent=function(t,e,r){r.stopped||(r.target=t,r.type=e,t.emit(e,r),t[e]&&t[e](r))},i.prototype.mapPositionToPoint=function(t,e,r){var i=this.interactionDOMElement.getBoundingClientRect();t.x=(e-i.left)*(this.interactionDOMElement.width/i.width)/this.resolution,t.y=(r-i.top)*(this.interactionDOMElement.height/i.height)/this.resolution},i.prototype.processInteractive=function(t,e,r,i,n){if(!e||!e.visible)return!1;var o=e.children,s=!1;if(n=n||e.interactive,e.interactiveChildren)for(var a=o.length-1;a>=0;a--)!s&&i?s=this.processInteractive(t,o[a],r,!0,n):this.processInteractive(t,o[a],r,!1,!1);return n&&(i&&(e.hitArea?(e.worldTransform.applyInverse(t,this._tempPoint),s=e.hitArea.contains(this._tempPoint.x,this._tempPoint.y)):e.containsPoint&&(s=e.containsPoint(t))),e.interactive&&r(e,s)),s},i.prototype.onMouseDown=function(t){this.mouse.originalEvent=t,this.eventData.data=this.mouse,this.eventData.stopped=!1,this.mapPositionToPoint(this.mouse.global,t.clientX,t.clientY),this.autoPreventDefault&&this.mouse.originalEvent.preventDefault(),this.processInteractive(this.mouse.global,this.renderer._lastObjectRendered,this.processMouseDown,!0)},i.prototype.processMouseDown=function(t,e){var r=this.mouse.originalEvent,i=2===r.button||3===r.which;e&&(t[i?"_isRightDown":"_isLeftDown"]=!0,this.dispatchEvent(t,i?"rightdown":"mousedown",this.eventData))},i.prototype.onMouseUp=function(t){this.mouse.originalEvent=t,this.eventData.data=this.mouse,this.eventData.stopped=!1,this.mapPositionToPoint(this.mouse.global,t.clientX,t.clientY),this.processInteractive(this.mouse.global,this.renderer._lastObjectRendered,this.processMouseUp,!0)},i.prototype.processMouseUp=function(t,e){var r=this.mouse.originalEvent,i=2===r.button||3===r.which,n=i?"_isRightDown":"_isLeftDown";e?(this.dispatchEvent(t,i?"rightup":"mouseup",this.eventData),t[n]&&(t[n]=!1,this.dispatchEvent(t,i?"rightclick":"click",this.eventData))):t[n]&&(t[n]=!1,this.dispatchEvent(t,i?"rightupoutside":"mouseupoutside",this.eventData))},i.prototype.onMouseMove=function(t){this.mouse.originalEvent=t,this.eventData.data=this.mouse,this.eventData.stopped=!1,this.mapPositionToPoint(this.mouse.global,t.clientX,t.clientY),this.didMove=!0,this.cursor="inherit",this.processInteractive(this.mouse.global,this.renderer._lastObjectRendered,this.processMouseMove,!0),this.currentCursorStyle!==this.cursor&&(this.currentCursorStyle=this.cursor,this.interactionDOMElement.style.cursor=this.cursor)},i.prototype.processMouseMove=function(t,e){this.dispatchEvent(t,"mousemove",this.eventData),this.processMouseOverOut(t,e)},i.prototype.onMouseOut=function(t){this.mouse.originalEvent=t,this.eventData.stopped=!1,this.mapPositionToPoint(this.mouse.global,t.clientX,t.clientY),this.interactionDOMElement.style.cursor="inherit",this.mapPositionToPoint(this.mouse.global,t.clientX,t.clientY),this.processInteractive(this.mouse.global,this.renderer._lastObjectRendered,this.processMouseOverOut,!1)},i.prototype.processMouseOverOut=function(t,e){e?(t._over||(t._over=!0,this.dispatchEvent(t,"mouseover",this.eventData)),t.buttonMode&&(this.cursor=t.defaultCursor)):t._over&&(t._over=!1,this.dispatchEvent(t,"mouseout",this.eventData))},i.prototype.onTouchStart=function(t){this.autoPreventDefault&&t.preventDefault();for(var e=t.changedTouches,r=e.length,i=0;r>i;i++){var n=e[i],o=this.getTouchData(n);o.originalEvent=t,this.eventData.data=o,this.eventData.stopped=!1,this.processInteractive(o.global,this.renderer._lastObjectRendered,this.processTouchStart,!0),this.returnTouchData(o)}},i.prototype.processTouchStart=function(t,e){e&&(t._touchDown=!0,this.dispatchEvent(t,"touchstart",this.eventData))},i.prototype.onTouchEnd=function(t){this.autoPreventDefault&&t.preventDefault();for(var e=t.changedTouches,r=e.length,i=0;r>i;i++){var n=e[i],o=this.getTouchData(n);o.originalEvent=t,this.eventData.data=o,this.eventData.stopped=!1,this.processInteractive(o.global,this.renderer._lastObjectRendered,this.processTouchEnd,!0),this.returnTouchData(o)}},i.prototype.processTouchEnd=function(t,e){e?(this.dispatchEvent(t,"touchend",this.eventData),t._touchDown&&(t._touchDown=!1,this.dispatchEvent(t,"tap",this.eventData))):t._touchDown&&(t._touchDown=!1,this.dispatchEvent(t,"touchendoutside",this.eventData))},i.prototype.onTouchMove=function(t){this.autoPreventDefault&&t.preventDefault();for(var e=t.changedTouches,r=e.length,i=0;r>i;i++){var n=e[i],o=this.getTouchData(n);o.originalEvent=t,this.eventData.data=o,this.eventData.stopped=!1,this.processInteractive(o.global,this.renderer._lastObjectRendered,this.processTouchMove,!0),this.returnTouchData(o)}},i.prototype.processTouchMove=function(t,e){e=e,this.dispatchEvent(t,"touchmove",this.eventData)},i.prototype.getTouchData=function(t){var e=this.interactiveDataPool.pop();return e||(e=new o),e.identifier=t.identifier,this.mapPositionToPoint(e.global,t.clientX,t.clientY),navigator.isCocoonJS&&(e.global.x=e.global.x/this.resolution,e.global.y=e.global.y/this.resolution),t.globalX=e.global.x,t.globalY=e.global.y,e},i.prototype.returnTouchData=function(t){this.interactiveDataPool.push(t)},i.prototype.destroy=function(){this.removeEvents(),this.renderer=null,this.mouse=null,this.eventData=null,this.interactiveDataPool=null,this.interactionDOMElement=null,this.onMouseUp=null,this.processMouseUp=null,this.onMouseDown=null,this.processMouseDown=null,this.onMouseMove=null,this.processMouseMove=null,this.onMouseOut=null,this.processMouseOverOut=null,this.onTouchStart=null,this.processTouchStart=null,this.onTouchEnd=null,this.processTouchEnd=null,this.onTouchMove=null,this.processTouchMove=null,this._tempPoint=null},n.WebGLRenderer.registerPlugin("interaction",i),n.CanvasRenderer.registerPlugin("interaction",i)},{"../core":20,"./InteractionData":106,"./interactiveTarget":109}],108:[function(t,e,r){e.exports={InteractionData:t("./InteractionData"),InteractionManager:t("./InteractionManager"),interactiveTarget:t("./interactiveTarget")}},{"./InteractionData":106,"./InteractionManager":107,"./interactiveTarget":109}],109:[function(t,e,r){var i={interactive:!1,buttonMode:!1,interactiveChildren:!0,defaultCursor:"pointer",_over:!1,_touchDown:!1};e.exports=i},{}],110:[function(t,e,r){function i(t,e){var r={},i=t.data.getElementsByTagName("info")[0],n=t.data.getElementsByTagName("common")[0];r.font=i.getAttribute("face"),r.size=parseInt(i.getAttribute("size"),10),r.lineHeight=parseInt(n.getAttribute("lineHeight"),10),r.chars={};for(var a=t.data.getElementsByTagName("char"),h=0;h<a.length;h++){var u=parseInt(a[h].getAttribute("id"),10),l=new o.Rectangle(parseInt(a[h].getAttribute("x"),10)+e.frame.x,parseInt(a[h].getAttribute("y"),10)+e.frame.y,parseInt(a[h].getAttribute("width"),10),parseInt(a[h].getAttribute("height"),10));r.chars[u]={xOffset:parseInt(a[h].getAttribute("xoffset"),10),yOffset:parseInt(a[h].getAttribute("yoffset"),10),xAdvance:parseInt(a[h].getAttribute("xadvance"),10),kerning:{},texture:new o.Texture(e.baseTexture,l)}}var c=t.data.getElementsByTagName("kerning");for(h=0;h<c.length;h++){var p=parseInt(c[h].getAttribute("first"),10),d=parseInt(c[h].getAttribute("second"),10),f=parseInt(c[h].getAttribute("amount"),10);r.chars[d].kerning[p]=f}t.bitmapFont=r,s.BitmapText.fonts[r.font]=r}var n=t("resource-loader").Resource,o=t("../core"),s=t("../extras"),a=t("path");e.exports=function(){return function(t,e){if(!t.data||!t.isXml)return e();if(0===t.data.getElementsByTagName("page").length||0===t.data.getElementsByTagName("info").length||null===t.data.getElementsByTagName("info")[0].getAttribute("face"))return e();var r=a.dirname(t.url);"."===r&&(r=""),this.baseUrl&&r&&("/"===this.baseUrl.charAt(this.baseUrl.length-1)&&(r+="/"),r=r.replace(this.baseUrl,"")),r&&"/"!==r.charAt(r.length-1)&&(r+="/");var s=r+t.data.getElementsByTagName("page")[0].getAttribute("file");if(o.utils.TextureCache[s])i(t,o.utils.TextureCache[s]),e();else{var h={crossOrigin:t.crossOrigin,loadType:n.LOAD_TYPE.IMAGE};this.add(t.name+"_image",s,h,function(r){i(t,r.texture),e()})}}}},{"../core":20,"../extras":76,path:2,"resource-loader":129}],111:[function(t,e,r){e.exports={Loader:t("./loader"),bitmapFontParser:t("./bitmapFontParser"),spritesheetParser:t("./spritesheetParser"),textureParser:t("./textureParser"),Resource:t("resource-loader").Resource}},{"./bitmapFontParser":110,"./loader":112,"./spritesheetParser":113,"./textureParser":114,"resource-loader":129}],112:[function(t,e,r){function i(t,e){n.call(this,t,e);for(var r=0;r<i._pixiMiddleware.length;++r)this.use(i._pixiMiddleware[r]())}var n=t("resource-loader"),o=t("./textureParser"),s=t("./spritesheetParser"),a=t("./bitmapFontParser");i.prototype=Object.create(n.prototype),i.prototype.constructor=i,e.exports=i,i._pixiMiddleware=[n.middleware.parsing.blob,o,s,a],i.addPixiMiddleware=function(t){i._pixiMiddleware.push(t)};var h=n.Resource;h.setExtensionXhrType("fnt",h.XHR_RESPONSE_TYPE.DOCUMENT)},{"./bitmapFontParser":110,"./spritesheetParser":113,"./textureParser":114,"resource-loader":129}],113:[function(t,e,r){var i=t("resource-loader").Resource,n=t("path"),o=t("../core");e.exports=function(){return function(t,e){if(!t.data||!t.isJson||!t.data.frames)return e();var r={crossOrigin:t.crossOrigin,loadType:i.LOAD_TYPE.IMAGE},s=n.dirname(t.url.replace(this.baseUrl,"")),a=o.utils.getResolutionOfUrl(t.url);this.add(t.name+"_image",s+"/"+t.data.meta.image,r,function(r){t.textures={};var i=t.data.frames;for(var n in i){var s=i[n].frame;if(s){var h=null,u=null;if(h=i[n].rotated?new o.Rectangle(s.x,s.y,s.h,s.w):new o.Rectangle(s.x,s.y,s.w,s.h),i[n].trimmed&&(u=new o.Rectangle(i[n].spriteSourceSize.x/a,i[n].spriteSourceSize.y/a,i[n].sourceSize.w/a,i[n].sourceSize.h/a)),i[n].rotated){var l=h.width;h.width=h.height,h.height=l}h.x/=a,h.y/=a,h.width/=a,h.height/=a,t.textures[n]=new o.Texture(r.texture.baseTexture,h,h.clone(),u,i[n].rotated),o.utils.TextureCache[n]=t.textures[n]}}e()})}}},{"../core":20,path:2,"resource-loader":129}],114:[function(t,e,r){var i=t("../core");e.exports=function(){return function(t,e){if(t.data&&t.isImage){var r=new i.BaseTexture(t.data,null,i.utils.getResolutionOfUrl(t.url));r.imageUrl=t.url,t.texture=new i.Texture(r),i.utils.BaseTextureCache[t.url]=r,i.utils.TextureCache[t.url]=t.texture}e()}}},{"../core":20}],115:[function(t,e,r){function i(t,e,r,o,s){n.Container.call(this),this._texture=null,this.uvs=r||new Float32Array([0,1,1,1,1,0,0,1]),this.vertices=e||new Float32Array([0,0,100,0,100,100,0,100]),this.indices=o||new Uint16Array([0,1,2,3]),this.dirty=!0,this.blendMode=n.BLEND_MODES.NORMAL,this.canvasPadding=0,this.drawMode=s||i.DRAW_MODES.TRIANGLE_MESH,this.texture=t}var n=t("../core"),o=new n.Point,s=new n.Polygon;i.prototype=Object.create(n.Container.prototype),i.prototype.constructor=i,e.exports=i,Object.defineProperties(i.prototype,{texture:{get:function(){return this._texture},set:function(t){this._texture!==t&&(this._texture=t,t&&(t.baseTexture.hasLoaded?this._onTextureUpdate():t.once("update",this._onTextureUpdate,this)))}}}),i.prototype._renderWebGL=function(t){t.setObjectRenderer(t.plugins.mesh),t.plugins.mesh.render(this)},i.prototype._renderCanvas=function(t){var e=t.context,r=this.worldTransform;t.roundPixels?e.setTransform(r.a,r.b,r.c,r.d,0|r.tx,0|r.ty):e.setTransform(r.a,r.b,r.c,r.d,r.tx,r.ty),this.drawMode===i.DRAW_MODES.TRIANGLE_MESH?this._renderCanvasTriangleMesh(e):this._renderCanvasTriangles(e)},i.prototype._renderCanvasTriangleMesh=function(t){for(var e=this.vertices,r=this.uvs,i=e.length/2,n=0;i-2>n;n++){var o=2*n;this._renderCanvasDrawTriangle(t,e,r,o,o+2,o+4)}},i.prototype._renderCanvasTriangles=function(t){for(var e=this.vertices,r=this.uvs,i=this.indices,n=i.length,o=0;n>o;o+=3){var s=2*i[o],a=2*i[o+1],h=2*i[o+2];this._renderCanvasDrawTriangle(t,e,r,s,a,h)}},i.prototype._renderCanvasDrawTriangle=function(t,e,r,i,n,o){var s=this._texture.baseTexture.source,a=this._texture.baseTexture.width,h=this._texture.baseTexture.height,u=e[i],l=e[n],c=e[o],p=e[i+1],d=e[n+1],f=e[o+1],v=r[i]*a,g=r[n]*a,m=r[o]*a,y=r[i+1]*h,x=r[n+1]*h,b=r[o+1]*h;if(this.canvasPadding>0){var _=this.canvasPadding/this.worldTransform.a,T=this.canvasPadding/this.worldTransform.d,E=(u+l+c)/3,S=(p+d+f)/3,w=u-E,A=p-S,C=Math.sqrt(w*w+A*A);u=E+w/C*(C+_),p=S+A/C*(C+T),w=l-E,A=d-S,C=Math.sqrt(w*w+A*A),l=E+w/C*(C+_),d=S+A/C*(C+T),w=c-E,A=f-S,C=Math.sqrt(w*w+A*A),c=E+w/C*(C+_),f=S+A/C*(C+T)}t.save(),t.beginPath(),t.moveTo(u,p),t.lineTo(l,d),t.lineTo(c,f),t.closePath(),t.clip();var R=v*x+y*m+g*b-x*m-y*g-v*b,M=u*x+y*c+l*b-x*c-y*l-u*b,O=v*l+u*m+g*c-l*m-u*g-v*c,P=v*x*c+y*l*m+u*g*b-u*x*m-y*g*c-v*l*b,F=p*x+y*f+d*b-x*f-y*d-p*b,D=v*d+p*m+g*f-d*m-p*g-v*f,B=v*x*f+y*d*m+p*g*b-p*x*m-y*g*f-v*d*b;t.transform(M/R,F/R,O/R,D/R,P/R,B/R),t.drawImage(s,0,0),t.restore()},i.prototype.renderMeshFlat=function(t){var e=this.context,r=t.vertices,i=r.length/2;e.beginPath();for(var n=1;i-2>n;n++){var o=2*n,s=r[o],a=r[o+2],h=r[o+4],u=r[o+1],l=r[o+3],c=r[o+5];e.moveTo(s,u),e.lineTo(a,l),e.lineTo(h,c)}e.fillStyle="#FF0000",e.fill(),e.closePath()},i.prototype._onTextureUpdate=function(){this.updateFrame=!0},i.prototype.getBounds=function(t){if(!this._currentBounds){for(var e=t||this.worldTransform,r=e.a,i=e.b,o=e.c,s=e.d,a=e.tx,h=e.ty,u=-(1/0),l=-(1/0),c=1/0,p=1/0,d=this.vertices,f=0,v=d.length;v>f;f+=2){var g=d[f],m=d[f+1],y=r*g+o*m+a,x=s*m+i*g+h;c=c>y?y:c,p=p>x?x:p,u=y>u?y:u,l=x>l?x:l}if(c===-(1/0)||l===1/0)return n.Rectangle.EMPTY;var b=this._bounds;b.x=c,b.width=u-c,b.y=p,b.height=l-p,this._currentBounds=b}return this._currentBounds},i.prototype.containsPoint=function(t){if(!this.getBounds().contains(t.x,t.y))return!1;this.worldTransform.applyInverse(t,o);var e,r,n=this.vertices,a=s.points;if(this.drawMode===i.DRAW_MODES.TRIANGLES){var h=this.indices;for(r=this.indices.length,e=0;r>e;e+=3){var u=2*h[e],l=2*h[e+1],c=2*h[e+2];if(a[0]=n[u],a[1]=n[u+1],a[2]=n[l],a[3]=n[l+1],a[4]=n[c],a[5]=n[c+1],s.contains(o.x,o.y))return!0}}else for(r=n.length,e=0;r>e;e+=6)if(a[0]=n[e],a[1]=n[e+1],a[2]=n[e+2],a[3]=n[e+3],a[4]=n[e+4],a[5]=n[e+5],s.contains(o.x,o.y))return!0;return!1},i.DRAW_MODES={TRIANGLE_MESH:0,TRIANGLES:1}},{"../core":20}],116:[function(t,e,r){function i(t,e){n.call(this,t),this.points=e,this.vertices=new Float32Array(4*e.length),this.uvs=new Float32Array(4*e.length),this.colors=new Float32Array(2*e.length),this.indices=new Uint16Array(2*e.length),this._ready=!0,this.refresh()}var n=t("./Mesh"),o=t("../core");i.prototype=Object.create(n.prototype),i.prototype.constructor=i,e.exports=i,i.prototype.refresh=function(){var t=this.points;if(!(t.length<1)&&this._texture._uvs){var e=this.uvs,r=this.indices,i=this.colors,n=this._texture._uvs,s=new o.Point(n.x0,n.y0),a=new o.Point(n.x2-n.x0,n.y2-n.y0);e[0]=0+s.x,e[1]=0+s.y,e[2]=0+s.x,e[3]=1*a.y+s.y,i[0]=1,i[1]=1,r[0]=0,r[1]=1;for(var h,u,l,c=t.length,p=1;c>p;p++)h=t[p],u=4*p,l=p/(c-1),e[u]=l*a.x+s.x,e[u+1]=0+s.y,e[u+2]=l*a.x+s.x,e[u+3]=1*a.y+s.y,u=2*p,i[u]=1,i[u+1]=1,u=2*p,r[u]=u,r[u+1]=u+1;this.dirty=!0}},i.prototype._onTextureUpdate=function(){n.prototype._onTextureUpdate.call(this),this._ready&&this.refresh()},i.prototype.updateTransform=function(){var t=this.points;if(!(t.length<1)){for(var e,r,i,n,o,s,a=t[0],h=0,u=0,l=this.vertices,c=t.length,p=0;c>p;p++)r=t[p],i=4*p,e=p<t.length-1?t[p+1]:r,u=-(e.x-a.x),h=e.y-a.y,n=10*(1-p/(c-1)),n>1&&(n=1),o=Math.sqrt(h*h+u*u),s=this._texture.height/2,h/=o,u/=o,h*=s,u*=s,l[i]=r.x+h,l[i+1]=r.y+u,l[i+2]=r.x-h,l[i+3]=r.y-u,a=r;this.containerUpdateTransform()}}},{"../core":20,"./Mesh":115}],117:[function(t,e,r){e.exports={Mesh:t("./Mesh"),Rope:t("./Rope"),MeshRenderer:t("./webgl/MeshRenderer"),MeshShader:t("./webgl/MeshShader")}},{"./Mesh":115,"./Rope":116,"./webgl/MeshRenderer":118,"./webgl/MeshShader":119}],118:[function(t,e,r){function i(t){n.ObjectRenderer.call(this,t),this.indices=new Uint16Array(15e3);for(var e=0,r=0;15e3>e;e+=6,r+=4)this.indices[e+0]=r+0,this.indices[e+1]=r+1,this.indices[e+2]=r+2,this.indices[e+3]=r+0,this.indices[e+4]=r+2,this.indices[e+5]=r+3}var n=t("../../core"),o=t("../Mesh");i.prototype=Object.create(n.ObjectRenderer.prototype),i.prototype.constructor=i,e.exports=i,n.WebGLRenderer.registerPlugin("mesh",i),i.prototype.onContextChange=function(){},i.prototype.render=function(t){t._vertexBuffer||this._initWebGL(t);var e=this.renderer,r=e.gl,i=t._texture.baseTexture,n=e.shaderManager.plugins.meshShader,s=t.drawMode===o.DRAW_MODES.TRIANGLE_MESH?r.TRIANGLE_STRIP:r.TRIANGLES;e.blendModeManager.setBlendMode(t.blendMode),r.uniformMatrix3fv(n.uniforms.translationMatrix._location,!1,t.worldTransform.toArray(!0)),r.uniformMatrix3fv(n.uniforms.projectionMatrix._location,!1,e.currentRenderTarget.projectionMatrix.toArray(!0)),r.uniform1f(n.uniforms.alpha._location,t.worldAlpha),t.dirty?(t.dirty=!1,r.bindBuffer(r.ARRAY_BUFFER,t._vertexBuffer),r.bufferData(r.ARRAY_BUFFER,t.vertices,r.STATIC_DRAW),r.vertexAttribPointer(n.attributes.aVertexPosition,2,r.FLOAT,!1,0,0),r.bindBuffer(r.ARRAY_BUFFER,t._uvBuffer),r.bufferData(r.ARRAY_BUFFER,t.uvs,r.STATIC_DRAW),r.vertexAttribPointer(n.attributes.aTextureCoord,2,r.FLOAT,!1,0,0),r.activeTexture(r.TEXTURE0),i._glTextures[r.id]?r.bindTexture(r.TEXTURE_2D,i._glTextures[r.id]):this.renderer.updateTexture(i),r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,t._indexBuffer),r.bufferData(r.ELEMENT_ARRAY_BUFFER,t.indices,r.STATIC_DRAW)):(r.bindBuffer(r.ARRAY_BUFFER,t._vertexBuffer),r.bufferSubData(r.ARRAY_BUFFER,0,t.vertices),r.vertexAttribPointer(n.attributes.aVertexPosition,2,r.FLOAT,!1,0,0),r.bindBuffer(r.ARRAY_BUFFER,t._uvBuffer),r.vertexAttribPointer(n.attributes.aTextureCoord,2,r.FLOAT,!1,0,0),r.activeTexture(r.TEXTURE0),i._glTextures[r.id]?r.bindTexture(r.TEXTURE_2D,i._glTextures[r.id]):this.renderer.updateTexture(i),r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,t._indexBuffer),r.bufferSubData(r.ELEMENT_ARRAY_BUFFER,0,t.indices)),r.drawElements(s,t.indices.length,r.UNSIGNED_SHORT,0)},i.prototype._initWebGL=function(t){var e=this.renderer.gl;t._vertexBuffer=e.createBuffer(),t._indexBuffer=e.createBuffer(),t._uvBuffer=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,t._vertexBuffer),e.bufferData(e.ARRAY_BUFFER,t.vertices,e.DYNAMIC_DRAW),e.bindBuffer(e.ARRAY_BUFFER,t._uvBuffer),e.bufferData(e.ARRAY_BUFFER,t.uvs,e.STATIC_DRAW),t.colors&&(t._colorBuffer=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,t._colorBuffer),e.bufferData(e.ARRAY_BUFFER,t.colors,e.STATIC_DRAW)),e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t._indexBuffer),e.bufferData(e.ELEMENT_ARRAY_BUFFER,t.indices,e.STATIC_DRAW)},i.prototype.flush=function(){},i.prototype.start=function(){var t=this.renderer.shaderManager.plugins.meshShader;this.renderer.shaderManager.setShader(t)},i.prototype.destroy=function(){n.ObjectRenderer.prototype.destroy.call(this)}},{"../../core":20,"../Mesh":115}],119:[function(t,e,r){function i(t){n.Shader.call(this,t,["precision lowp float;","attribute vec2 aVertexPosition;","attribute vec2 aTextureCoord;","uniform mat3 translationMatrix;","uniform mat3 projectionMatrix;","varying vec2 vTextureCoord;","void main(void){","   gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);","   vTextureCoord = aTextureCoord;","}"].join("\n"),["precision lowp float;","varying vec2 vTextureCoord;","uniform float alpha;","uniform sampler2D uSampler;","void main(void){","   gl_FragColor = texture2D(uSampler, vTextureCoord) * alpha ;","}"].join("\n"),{alpha:{type:"1f",value:0},translationMatrix:{type:"mat3",value:new Float32Array(9)},projectionMatrix:{type:"mat3",value:new Float32Array(9)}},{aVertexPosition:0,aTextureCoord:0})}var n=t("../../core");i.prototype=Object.create(n.Shader.prototype),i.prototype.constructor=i,e.exports=i,n.ShaderManager.registerPlugin("meshShader",i)},{"../../core":20}],120:[function(t,e,r){Math.sign||(Math.sign=function(t){return t=+t,0===t||isNaN(t)?t:t>0?1:-1})},{}],121:[function(t,e,r){Object.assign||(Object.assign=t("object-assign"))},{"object-assign":11}],122:[function(t,e,r){t("./Object.assign"),t("./requestAnimationFrame"),t("./Math.sign")},{"./Math.sign":120,"./Object.assign":121,"./requestAnimationFrame":123}],123:[function(t,e,r){(function(t){if(Date.now&&Date.prototype.getTime||(Date.now=function(){return(new Date).getTime()}),!t.performance||!t.performance.now){var e=Date.now();t.performance||(t.performance={}),t.performance.now=function(){return Date.now()-e}}for(var r=Date.now(),i=["ms","moz","webkit","o"],n=0;n<i.length&&!t.requestAnimationFrame;++n)t.requestAnimationFrame=t[i[n]+"RequestAnimationFrame"],t.cancelAnimationFrame=t[i[n]+"CancelAnimationFrame"]||t[i[n]+"CancelRequestAnimationFrame"];t.requestAnimationFrame||(t.requestAnimationFrame=function(t){
if("function"!=typeof t)throw new TypeError(t+"is not a function");var e=Date.now(),i=16+r-e;return 0>i&&(i=0),r=e,setTimeout(function(){r=Date.now(),t(performance.now())},i)}),t.cancelAnimationFrame||(t.cancelAnimationFrame=function(t){clearTimeout(t)})}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],124:[function(e,r,i){(function(e){!function(){function i(t){var e=!1;return function(){if(e)throw new Error("Callback was already called.");e=!0,t.apply(n,arguments)}}var n,o,s={};n=this,null!=n&&(o=n.async),s.noConflict=function(){return n.async=o,s};var a=Object.prototype.toString,h=Array.isArray||function(t){return"[object Array]"===a.call(t)},u=function(t,e){if(t.forEach)return t.forEach(e);for(var r=0;r<t.length;r+=1)e(t[r],r,t)},l=function(t,e){if(t.map)return t.map(e);var r=[];return u(t,function(t,i,n){r.push(e(t,i,n))}),r},c=function(t,e,r){return t.reduce?t.reduce(e,r):(u(t,function(t,i,n){r=e(r,t,i,n)}),r)},p=function(t){if(Object.keys)return Object.keys(t);var e=[];for(var r in t)t.hasOwnProperty(r)&&e.push(r);return e};"undefined"!=typeof e&&e.nextTick?(s.nextTick=e.nextTick,"undefined"!=typeof setImmediate?s.setImmediate=function(t){setImmediate(t)}:s.setImmediate=s.nextTick):"function"==typeof setImmediate?(s.nextTick=function(t){setImmediate(t)},s.setImmediate=s.nextTick):(s.nextTick=function(t){setTimeout(t,0)},s.setImmediate=s.nextTick),s.each=function(t,e,r){function n(e){e?(r(e),r=function(){}):(o+=1,o>=t.length&&r())}if(r=r||function(){},!t.length)return r();var o=0;u(t,function(t){e(t,i(n))})},s.forEach=s.each,s.eachSeries=function(t,e,r){if(r=r||function(){},!t.length)return r();var i=0,n=function(){e(t[i],function(e){e?(r(e),r=function(){}):(i+=1,i>=t.length?r():n())})};n()},s.forEachSeries=s.eachSeries,s.eachLimit=function(t,e,r,i){var n=d(e);n.apply(null,[t,r,i])},s.forEachLimit=s.eachLimit;var d=function(t){return function(e,r,i){if(i=i||function(){},!e.length||0>=t)return i();var n=0,o=0,s=0;!function a(){if(n>=e.length)return i();for(;t>s&&o<e.length;)o+=1,s+=1,r(e[o-1],function(t){t?(i(t),i=function(){}):(n+=1,s-=1,n>=e.length?i():a())})}()}},f=function(t){return function(){var e=Array.prototype.slice.call(arguments);return t.apply(null,[s.each].concat(e))}},v=function(t,e){return function(){var r=Array.prototype.slice.call(arguments);return e.apply(null,[d(t)].concat(r))}},g=function(t){return function(){var e=Array.prototype.slice.call(arguments);return t.apply(null,[s.eachSeries].concat(e))}},m=function(t,e,r,i){if(e=l(e,function(t,e){return{index:e,value:t}}),i){var n=[];t(e,function(t,e){r(t.value,function(r,i){n[t.index]=i,e(r)})},function(t){i(t,n)})}else t(e,function(t,e){r(t.value,function(t){e(t)})})};s.map=f(m),s.mapSeries=g(m),s.mapLimit=function(t,e,r,i){return y(e)(t,r,i)};var y=function(t){return v(t,m)};s.reduce=function(t,e,r,i){s.eachSeries(t,function(t,i){r(e,t,function(t,r){e=r,i(t)})},function(t){i(t,e)})},s.inject=s.reduce,s.foldl=s.reduce,s.reduceRight=function(t,e,r,i){var n=l(t,function(t){return t}).reverse();s.reduce(n,e,r,i)},s.foldr=s.reduceRight;var x=function(t,e,r,i){var n=[];e=l(e,function(t,e){return{index:e,value:t}}),t(e,function(t,e){r(t.value,function(r){r&&n.push(t),e()})},function(t){i(l(n.sort(function(t,e){return t.index-e.index}),function(t){return t.value}))})};s.filter=f(x),s.filterSeries=g(x),s.select=s.filter,s.selectSeries=s.filterSeries;var b=function(t,e,r,i){var n=[];e=l(e,function(t,e){return{index:e,value:t}}),t(e,function(t,e){r(t.value,function(r){r||n.push(t),e()})},function(t){i(l(n.sort(function(t,e){return t.index-e.index}),function(t){return t.value}))})};s.reject=f(b),s.rejectSeries=g(b);var _=function(t,e,r,i){t(e,function(t,e){r(t,function(r){r?(i(t),i=function(){}):e()})},function(t){i()})};s.detect=f(_),s.detectSeries=g(_),s.some=function(t,e,r){s.each(t,function(t,i){e(t,function(t){t&&(r(!0),r=function(){}),i()})},function(t){r(!1)})},s.any=s.some,s.every=function(t,e,r){s.each(t,function(t,i){e(t,function(t){t||(r(!1),r=function(){}),i()})},function(t){r(!0)})},s.all=s.every,s.sortBy=function(t,e,r){s.map(t,function(t,r){e(t,function(e,i){e?r(e):r(null,{value:t,criteria:i})})},function(t,e){if(t)return r(t);var i=function(t,e){var r=t.criteria,i=e.criteria;return i>r?-1:r>i?1:0};r(null,l(e.sort(i),function(t){return t.value}))})},s.auto=function(t,e){e=e||function(){};var r=p(t),i=r.length;if(!i)return e();var n={},o=[],a=function(t){o.unshift(t)},l=function(t){for(var e=0;e<o.length;e+=1)if(o[e]===t)return void o.splice(e,1)},d=function(){i--,u(o.slice(0),function(t){t()})};a(function(){if(!i){var t=e;e=function(){},t(null,n)}}),u(r,function(r){var i=h(t[r])?t[r]:[t[r]],o=function(t){var i=Array.prototype.slice.call(arguments,1);if(i.length<=1&&(i=i[0]),t){var o={};u(p(n),function(t){o[t]=n[t]}),o[r]=i,e(t,o),e=function(){}}else n[r]=i,s.setImmediate(d)},f=i.slice(0,Math.abs(i.length-1))||[],v=function(){return c(f,function(t,e){return t&&n.hasOwnProperty(e)},!0)&&!n.hasOwnProperty(r)};if(v())i[i.length-1](o,n);else{var g=function(){v()&&(l(g),i[i.length-1](o,n))};a(g)}})},s.retry=function(t,e,r){var i=5,n=[];"function"==typeof t&&(r=e,e=t,t=i),t=parseInt(t,10)||i;var o=function(i,o){for(var a=function(t,e){return function(r){t(function(t,i){r(!t||e,{err:t,result:i})},o)}};t;)n.push(a(e,!(t-=1)));s.series(n,function(t,e){e=e[e.length-1],(i||r)(e.err,e.result)})};return r?o():o},s.waterfall=function(t,e){if(e=e||function(){},!h(t)){var r=new Error("First argument to waterfall must be an array of functions");return e(r)}if(!t.length)return e();var i=function(t){return function(r){if(r)e.apply(null,arguments),e=function(){};else{var n=Array.prototype.slice.call(arguments,1),o=t.next();o?n.push(i(o)):n.push(e),s.setImmediate(function(){t.apply(null,n)})}}};i(s.iterator(t))()};var T=function(t,e,r){if(r=r||function(){},h(e))t.map(e,function(t,e){t&&t(function(t){var r=Array.prototype.slice.call(arguments,1);r.length<=1&&(r=r[0]),e.call(null,t,r)})},r);else{var i={};t.each(p(e),function(t,r){e[t](function(e){var n=Array.prototype.slice.call(arguments,1);n.length<=1&&(n=n[0]),i[t]=n,r(e)})},function(t){r(t,i)})}};s.parallel=function(t,e){T({map:s.map,each:s.each},t,e)},s.parallelLimit=function(t,e,r){T({map:y(e),each:d(e)},t,r)},s.series=function(t,e){if(e=e||function(){},h(t))s.mapSeries(t,function(t,e){t&&t(function(t){var r=Array.prototype.slice.call(arguments,1);r.length<=1&&(r=r[0]),e.call(null,t,r)})},e);else{var r={};s.eachSeries(p(t),function(e,i){t[e](function(t){var n=Array.prototype.slice.call(arguments,1);n.length<=1&&(n=n[0]),r[e]=n,i(t)})},function(t){e(t,r)})}},s.iterator=function(t){var e=function(r){var i=function(){return t.length&&t[r].apply(null,arguments),i.next()};return i.next=function(){return r<t.length-1?e(r+1):null},i};return e(0)},s.apply=function(t){var e=Array.prototype.slice.call(arguments,1);return function(){return t.apply(null,e.concat(Array.prototype.slice.call(arguments)))}};var E=function(t,e,r,i){var n=[];t(e,function(t,e){r(t,function(t,r){n=n.concat(r||[]),e(t)})},function(t){i(t,n)})};s.concat=f(E),s.concatSeries=g(E),s.whilst=function(t,e,r){t()?e(function(i){return i?r(i):void s.whilst(t,e,r)}):r()},s.doWhilst=function(t,e,r){t(function(i){if(i)return r(i);var n=Array.prototype.slice.call(arguments,1);e.apply(null,n)?s.doWhilst(t,e,r):r()})},s.until=function(t,e,r){t()?r():e(function(i){return i?r(i):void s.until(t,e,r)})},s.doUntil=function(t,e,r){t(function(i){if(i)return r(i);var n=Array.prototype.slice.call(arguments,1);e.apply(null,n)?r():s.doUntil(t,e,r)})},s.queue=function(t,e){function r(t,e,r,i){return t.started||(t.started=!0),h(e)||(e=[e]),0==e.length?s.setImmediate(function(){t.drain&&t.drain()}):void u(e,function(e){var n={data:e,callback:"function"==typeof i?i:null};r?t.tasks.unshift(n):t.tasks.push(n),t.saturated&&t.tasks.length===t.concurrency&&t.saturated(),s.setImmediate(t.process)})}void 0===e&&(e=1);var n=0,o={tasks:[],concurrency:e,saturated:null,empty:null,drain:null,started:!1,paused:!1,push:function(t,e){r(o,t,!1,e)},kill:function(){o.drain=null,o.tasks=[]},unshift:function(t,e){r(o,t,!0,e)},process:function(){if(!o.paused&&n<o.concurrency&&o.tasks.length){var e=o.tasks.shift();o.empty&&0===o.tasks.length&&o.empty(),n+=1;var r=function(){n-=1,e.callback&&e.callback.apply(e,arguments),o.drain&&o.tasks.length+n===0&&o.drain(),o.process()},s=i(r);t(e.data,s)}},length:function(){return o.tasks.length},running:function(){return n},idle:function(){return o.tasks.length+n===0},pause:function(){o.paused!==!0&&(o.paused=!0,o.process())},resume:function(){o.paused!==!1&&(o.paused=!1,o.process())}};return o},s.priorityQueue=function(t,e){function r(t,e){return t.priority-e.priority}function i(t,e,r){for(var i=-1,n=t.length-1;n>i;){var o=i+(n-i+1>>>1);r(e,t[o])>=0?i=o:n=o-1}return i}function n(t,e,n,o){return t.started||(t.started=!0),h(e)||(e=[e]),0==e.length?s.setImmediate(function(){t.drain&&t.drain()}):void u(e,function(e){var a={data:e,priority:n,callback:"function"==typeof o?o:null};t.tasks.splice(i(t.tasks,a,r)+1,0,a),t.saturated&&t.tasks.length===t.concurrency&&t.saturated(),s.setImmediate(t.process)})}var o=s.queue(t,e);return o.push=function(t,e,r){n(o,t,e,r)},delete o.unshift,o},s.cargo=function(t,e){var r=!1,i=[],n={tasks:i,payload:e,saturated:null,empty:null,drain:null,drained:!0,push:function(t,r){h(t)||(t=[t]),u(t,function(t){i.push({data:t,callback:"function"==typeof r?r:null}),n.drained=!1,n.saturated&&i.length===e&&n.saturated()}),s.setImmediate(n.process)},process:function o(){if(!r){if(0===i.length)return n.drain&&!n.drained&&n.drain(),void(n.drained=!0);var s="number"==typeof e?i.splice(0,e):i.splice(0,i.length),a=l(s,function(t){return t.data});n.empty&&n.empty(),r=!0,t(a,function(){r=!1;var t=arguments;u(s,function(e){e.callback&&e.callback.apply(null,t)}),o()})}},length:function(){return i.length},running:function(){return r}};return n};var S=function(t){return function(e){var r=Array.prototype.slice.call(arguments,1);e.apply(null,r.concat([function(e){var r=Array.prototype.slice.call(arguments,1);"undefined"!=typeof console&&(e?console.error&&console.error(e):console[t]&&u(r,function(e){console[t](e)}))}]))}};s.log=S("log"),s.dir=S("dir"),s.memoize=function(t,e){var r={},i={};e=e||function(t){return t};var n=function(){var n=Array.prototype.slice.call(arguments),o=n.pop(),a=e.apply(null,n);a in r?s.nextTick(function(){o.apply(null,r[a])}):a in i?i[a].push(o):(i[a]=[o],t.apply(null,n.concat([function(){r[a]=arguments;var t=i[a];delete i[a];for(var e=0,n=t.length;n>e;e++)t[e].apply(null,arguments)}])))};return n.memo=r,n.unmemoized=t,n},s.unmemoize=function(t){return function(){return(t.unmemoized||t).apply(null,arguments)}},s.times=function(t,e,r){for(var i=[],n=0;t>n;n++)i.push(n);return s.map(i,e,r)},s.timesSeries=function(t,e,r){for(var i=[],n=0;t>n;n++)i.push(n);return s.mapSeries(i,e,r)},s.seq=function(){var t=arguments;return function(){var e=this,r=Array.prototype.slice.call(arguments),i=r.pop();s.reduce(t,r,function(t,r,i){r.apply(e,t.concat([function(){var t=arguments[0],e=Array.prototype.slice.call(arguments,1);i(t,e)}]))},function(t,r){i.apply(e,[t].concat(r))})}},s.compose=function(){return s.seq.apply(null,Array.prototype.reverse.call(arguments))};var w=function(t,e){var r=function(){var r=this,i=Array.prototype.slice.call(arguments),n=i.pop();return t(e,function(t,e){t.apply(r,i.concat([e]))},n)};if(arguments.length>2){var i=Array.prototype.slice.call(arguments,2);return r.apply(this,i)}return r};s.applyEach=f(w),s.applyEachSeries=g(w),s.forever=function(t,e){function r(i){if(i){if(e)return e(i);throw i}t(r)}r()},"undefined"!=typeof r&&r.exports?r.exports=s:"undefined"!=typeof t&&t.amd?t([],function(){return s}):n.async=s}()}).call(this,e("_process"))},{_process:3}],125:[function(t,e,r){"use strict";function i(t,e,r){this.fn=t,this.context=e,this.once=r||!1}function n(){}var o="function"!=typeof Object.create?"~":!1;n.prototype._events=void 0,n.prototype.listeners=function(t,e){var r=o?o+t:t,i=this._events&&this._events[r];if(e)return!!i;if(!i)return[];if(this._events[r].fn)return[this._events[r].fn];for(var n=0,s=this._events[r].length,a=new Array(s);s>n;n++)a[n]=this._events[r][n].fn;return a},n.prototype.emit=function(t,e,r,i,n,s){var a=o?o+t:t;if(!this._events||!this._events[a])return!1;var h,u,l=this._events[a],c=arguments.length;if("function"==typeof l.fn){switch(l.once&&this.removeListener(t,l.fn,void 0,!0),c){case 1:return l.fn.call(l.context),!0;case 2:return l.fn.call(l.context,e),!0;case 3:return l.fn.call(l.context,e,r),!0;case 4:return l.fn.call(l.context,e,r,i),!0;case 5:return l.fn.call(l.context,e,r,i,n),!0;case 6:return l.fn.call(l.context,e,r,i,n,s),!0}for(u=1,h=new Array(c-1);c>u;u++)h[u-1]=arguments[u];l.fn.apply(l.context,h)}else{var p,d=l.length;for(u=0;d>u;u++)switch(l[u].once&&this.removeListener(t,l[u].fn,void 0,!0),c){case 1:l[u].fn.call(l[u].context);break;case 2:l[u].fn.call(l[u].context,e);break;case 3:l[u].fn.call(l[u].context,e,r);break;default:if(!h)for(p=1,h=new Array(c-1);c>p;p++)h[p-1]=arguments[p];l[u].fn.apply(l[u].context,h)}}return!0},n.prototype.on=function(t,e,r){var n=new i(e,r||this),s=o?o+t:t;return this._events||(this._events=o?{}:Object.create(null)),this._events[s]?this._events[s].fn?this._events[s]=[this._events[s],n]:this._events[s].push(n):this._events[s]=n,this},n.prototype.once=function(t,e,r){var n=new i(e,r||this,!0),s=o?o+t:t;return this._events||(this._events=o?{}:Object.create(null)),this._events[s]?this._events[s].fn?this._events[s]=[this._events[s],n]:this._events[s].push(n):this._events[s]=n,this},n.prototype.removeListener=function(t,e,r,i){var n=o?o+t:t;if(!this._events||!this._events[n])return this;var s=this._events[n],a=[];if(e)if(s.fn)(s.fn!==e||i&&!s.once||r&&s.context!==r)&&a.push(s);else for(var h=0,u=s.length;u>h;h++)(s[h].fn!==e||i&&!s[h].once||r&&s[h].context!==r)&&a.push(s[h]);return a.length?this._events[n]=1===a.length?a[0]:a:delete this._events[n],this},n.prototype.removeAllListeners=function(t){return this._events?(t?delete this._events[o?o+t:t]:this._events=o?{}:Object.create(null),this):this},n.prototype.off=n.prototype.removeListener,n.prototype.addListener=n.prototype.on,n.prototype.setMaxListeners=function(){return this},n.prefixed=o,e.exports=n},{}],126:[function(t,e,r){function i(t,e){a.call(this),e=e||10,this.baseUrl=t||"",this.progress=0,this.loading=!1,this._progressChunk=0,this._beforeMiddleware=[],this._afterMiddleware=[],this._boundLoadResource=this._loadResource.bind(this),this._boundOnLoad=this._onLoad.bind(this),this._buffer=[],this._numToLoad=0,this._queue=n.queue(this._boundLoadResource,e),this.resources={}}var n=t("async"),o=t("url"),s=t("./Resource"),a=t("eventemitter3");i.prototype=Object.create(a.prototype),i.prototype.constructor=i,e.exports=i,i.prototype.add=i.prototype.enqueue=function(t,e,r,i){if(Array.isArray(t)){for(var n=0;n<t.length;++n)this.add(t[n]);return this}if("object"==typeof t&&(i=e||t.callback||t.onComplete,r=t,e=t.url,t=t.name||t.key||t.url),"string"!=typeof e&&(i=r,r=e,e=t),"string"!=typeof e)throw new Error("No url passed to add resource to loader.");if("function"==typeof r&&(i=r,r=null),this.resources[t])throw new Error('Resource with name "'+t+'" already exists.');return e=this._handleBaseUrl(e),this.resources[t]=new s(t,e,r),"function"==typeof i&&this.resources[t].once("afterMiddleware",i),this._numToLoad++,this._queue.started?(this._queue.push(this.resources[t]),this._progressChunk=(100-this.progress)/(this._queue.length()+this._queue.running())):(this._buffer.push(this.resources[t]),this._progressChunk=100/this._buffer.length),this},i.prototype._handleBaseUrl=function(t){var e=o.parse(t);return e.protocol||0===e.pathname.indexOf("//")?t:this.baseUrl.length&&this.baseUrl.lastIndexOf("/")!==this.baseUrl.length-1&&t.lastIndexOf("/")!==t.length-1?this.baseUrl+"/"+t:this.baseUrl+t},i.prototype.before=i.prototype.pre=function(t){return this._beforeMiddleware.push(t),this},i.prototype.after=i.prototype.use=function(t){return this._afterMiddleware.push(t),this},i.prototype.reset=function(){this.progress=0,this.loading=!1,this._progressChunk=0,this._buffer.length=0,this._numToLoad=0,this._queue.kill(),this._queue.started=!1,this.resources={}},i.prototype.load=function(t){if("function"==typeof t&&this.once("complete",t),this._queue.started)return this;this.emit("start",this);for(var e=0;e<this._buffer.length;++e)this._queue.push(this._buffer[e]);return this._buffer.length=0,this},i.prototype._loadResource=function(t,e){var r=this;t._dequeue=e,this._runMiddleware(t,this._beforeMiddleware,function(){t.load(r._boundOnLoad)})},i.prototype._onComplete=function(){this.emit("complete",this,this.resources)},i.prototype._onLoad=function(t){this.progress+=this._progressChunk,this.emit("progress",this,t),this._runMiddleware(t,this._afterMiddleware,function(){t.emit("afterMiddleware",t),this._numToLoad--,0===this._numToLoad&&(this.progress=100,this._onComplete()),t.error?this.emit("error",t.error,this,t):this.emit("load",this,t)}),t._dequeue()},i.prototype._runMiddleware=function(t,e,r){var i=this;n.eachSeries(e,function(e,r){e.call(i,t,r)},r.bind(this,t))},i.LOAD_TYPE=s.LOAD_TYPE,i.XHR_READY_STATE=s.XHR_READY_STATE,i.XHR_RESPONSE_TYPE=s.XHR_RESPONSE_TYPE},{"./Resource":127,async:124,eventemitter3:125,url:8}],127:[function(t,e,r){function i(t,e,r){if(s.call(this),r=r||{},"string"!=typeof t||"string"!=typeof e)throw new Error("Both name and url are required for constructing a resource.");this.name=t,this.url=e,this.isDataUrl=0===this.url.indexOf("data:"),this.data=null,this.crossOrigin=r.crossOrigin===!0?"anonymous":null,this.loadType=r.loadType||this._determineLoadType(),this.xhrType=r.xhrType,this.error=null,this.xhr=null,this.isJson=!1,this.isXml=!1,this.isImage=!1,this.isAudio=!1,this.isVideo=!1,this._dequeue=null,this._boundComplete=this.complete.bind(this),this._boundOnError=this._onError.bind(this),this._boundOnProgress=this._onProgress.bind(this),this._boundXhrOnError=this._xhrOnError.bind(this),this._boundXhrOnAbort=this._xhrOnAbort.bind(this),this._boundXhrOnLoad=this._xhrOnLoad.bind(this),this._boundXdrOnTimeout=this._xdrOnTimeout.bind(this)}function n(t){return t.toString().replace("object ","")}function o(t,e,r){e&&0===e.indexOf(".")&&(e=e.substring(1)),e&&(t[e]=r)}var s=t("eventemitter3"),a=t("url"),h=!(!window.XDomainRequest||"withCredentials"in new XMLHttpRequest),u=null;i.prototype=Object.create(s.prototype),i.prototype.constructor=i,e.exports=i,i.prototype.complete=function(){this.data&&this.data.removeEventListener&&(this.data.removeEventListener("error",this._boundOnError),this.data.removeEventListener("load",this._boundComplete),this.data.removeEventListener("progress",this._boundOnProgress),this.data.removeEventListener("canplaythrough",this._boundComplete)),this.xhr&&(this.xhr.removeEventListener?(this.xhr.removeEventListener("error",this._boundXhrOnError),this.xhr.removeEventListener("abort",this._boundXhrOnAbort),this.xhr.removeEventListener("progress",this._boundOnProgress),this.xhr.removeEventListener("load",this._boundXhrOnLoad)):(this.xhr.onerror=null,this.xhr.ontimeout=null,this.xhr.onprogress=null,this.xhr.onload=null)),this.emit("complete",this)},i.prototype.load=function(t){switch(this.emit("start",this),t&&this.once("complete",t),"string"!=typeof this.crossOrigin&&(this.crossOrigin=this._determineCrossOrigin(this.url)),this.loadType){case i.LOAD_TYPE.IMAGE:this._loadImage();break;case i.LOAD_TYPE.AUDIO:this._loadElement("audio");break;case i.LOAD_TYPE.VIDEO:this._loadElement("video");break;case i.LOAD_TYPE.XHR:default:h&&this.crossOrigin?this._loadXdr():this._loadXhr()}},i.prototype._loadImage=function(){this.data=new Image,this.crossOrigin&&(this.data.crossOrigin=this.crossOrigin),this.data.src=this.url,this.isImage=!0,this.data.addEventListener("error",this._boundOnError,!1),this.data.addEventListener("load",this._boundComplete,!1),this.data.addEventListener("progress",this._boundOnProgress,!1)},i.prototype._loadElement=function(t){if("audio"===t&&"undefined"!=typeof Audio?this.data=new Audio:this.data=document.createElement(t),null===this.data)return this.error=new Error("Unsupported element "+t),void this.complete();if(navigator.isCocoonJS)this.data.src=Array.isArray(this.url)?this.url[0]:this.url;else if(Array.isArray(this.url))for(var e=0;e<this.url.length;++e)this.data.appendChild(this._createSource(t,this.url[e]));else this.data.appendChild(this._createSource(t,this.url));this["is"+t[0].toUpperCase()+t.substring(1)]=!0,this.data.addEventListener("error",this._boundOnError,!1),this.data.addEventListener("load",this._boundComplete,!1),this.data.addEventListener("progress",this._boundOnProgress,!1),this.data.addEventListener("canplaythrough",this._boundComplete,!1),this.data.load()},i.prototype._loadXhr=function(){"string"!=typeof this.xhrType&&(this.xhrType=this._determineXhrType());var t=this.xhr=new XMLHttpRequest;t.open("GET",this.url,!0),this.xhrType===i.XHR_RESPONSE_TYPE.JSON||this.xhrType===i.XHR_RESPONSE_TYPE.DOCUMENT?t.responseType=i.XHR_RESPONSE_TYPE.TEXT:t.responseType=this.xhrType,t.addEventListener("error",this._boundXhrOnError,!1),t.addEventListener("abort",this._boundXhrOnAbort,!1),t.addEventListener("progress",this._boundOnProgress,!1),t.addEventListener("load",this._boundXhrOnLoad,!1),t.send()},i.prototype._loadXdr=function(){"string"!=typeof this.xhrType&&(this.xhrType=this._determineXhrType());var t=this.xhr=new XDomainRequest;t.timeout=5e3,t.onerror=this._boundXhrOnError,t.ontimeout=this._boundXdrOnTimeout,t.onprogress=this._boundOnProgress,t.onload=this._boundXhrOnLoad,t.open("GET",this.url,!0),setTimeout(function(){t.send()},0)},i.prototype._createSource=function(t,e,r){r||(r=t+"/"+e.substr(e.lastIndexOf(".")+1));var i=document.createElement("source");return i.src=e,i.type=r,i},i.prototype._onError=function(t){this.error=new Error("Failed to load element using "+t.target.nodeName),this.complete()},i.prototype._onProgress=function(t){t&&t.lengthComputable&&this.emit("progress",this,t.loaded/t.total)},i.prototype._xhrOnError=function(){this.error=new Error(n(this.xhr)+" Request failed. Status: "+this.xhr.status+', text: "'+this.xhr.statusText+'"'),this.complete()},i.prototype._xhrOnAbort=function(){this.error=new Error(n(this.xhr)+" Request was aborted by the user."),this.complete()},i.prototype._xdrOnTimeout=function(){this.error=new Error(n(this.xhr)+" Request timed out."),this.complete()},i.prototype._xhrOnLoad=function(){var t=this.xhr,e=void 0!==t.status?t.status:200;if(200===e||204===e||0===e&&t.responseText.length>0)if(this.xhrType===i.XHR_RESPONSE_TYPE.TEXT)this.data=t.responseText;else if(this.xhrType===i.XHR_RESPONSE_TYPE.JSON)try{this.data=JSON.parse(t.responseText),this.isJson=!0}catch(r){this.error=new Error("Error trying to parse loaded json:",r)}else if(this.xhrType===i.XHR_RESPONSE_TYPE.DOCUMENT)try{if(window.DOMParser){var n=new DOMParser;this.data=n.parseFromString(t.responseText,"text/xml")}else{var o=document.createElement("div");o.innerHTML=t.responseText,this.data=o}this.isXml=!0}catch(r){this.error=new Error("Error trying to parse loaded xml:",r)}else this.data=t.response||t.responseText;else this.error=new Error("["+t.status+"]"+t.statusText+":"+t.responseURL);this.complete()},i.prototype._determineCrossOrigin=function(t,e){if(0===t.indexOf("data:"))return"";e=e||window.location,u||(u=document.createElement("a")),u.href=t,t=a.parse(u.href);var r=!t.port&&""===e.port||t.port===e.port;return t.hostname===e.hostname&&r&&t.protocol===e.protocol?"":"anonymous"},i.prototype._determineXhrType=function(){return i._xhrTypeMap[this._getExtension()]||i.XHR_RESPONSE_TYPE.TEXT},i.prototype._determineLoadType=function(){return i._loadTypeMap[this._getExtension()]||i.LOAD_TYPE.XHR},i.prototype._getExtension=function(){var t,e=this.url;if(this.isDataUrl){var r=e.indexOf("/");t=e.substring(r+1,e.indexOf(";",r))}else{var i=e.indexOf("?");-1!==i&&(e=e.substring(0,i)),t=e.substring(e.lastIndexOf(".")+1)}return t},i.prototype._getMimeFromXhrType=function(t){switch(t){case i.XHR_RESPONSE_TYPE.BUFFER:return"application/octet-binary";case i.XHR_RESPONSE_TYPE.BLOB:return"application/blob";case i.XHR_RESPONSE_TYPE.DOCUMENT:return"application/xml";case i.XHR_RESPONSE_TYPE.JSON:return"application/json";case i.XHR_RESPONSE_TYPE.DEFAULT:case i.XHR_RESPONSE_TYPE.TEXT:default:return"text/plain"}},i.LOAD_TYPE={XHR:1,IMAGE:2,AUDIO:3,VIDEO:4},i.XHR_READY_STATE={UNSENT:0,OPENED:1,HEADERS_RECEIVED:2,LOADING:3,DONE:4},i.XHR_RESPONSE_TYPE={DEFAULT:"text",BUFFER:"arraybuffer",BLOB:"blob",DOCUMENT:"document",JSON:"json",TEXT:"text"},i._loadTypeMap={gif:i.LOAD_TYPE.IMAGE,png:i.LOAD_TYPE.IMAGE,bmp:i.LOAD_TYPE.IMAGE,jpg:i.LOAD_TYPE.IMAGE,jpeg:i.LOAD_TYPE.IMAGE,tif:i.LOAD_TYPE.IMAGE,tiff:i.LOAD_TYPE.IMAGE,webp:i.LOAD_TYPE.IMAGE,tga:i.LOAD_TYPE.IMAGE},i._xhrTypeMap={xhtml:i.XHR_RESPONSE_TYPE.DOCUMENT,html:i.XHR_RESPONSE_TYPE.DOCUMENT,htm:i.XHR_RESPONSE_TYPE.DOCUMENT,xml:i.XHR_RESPONSE_TYPE.DOCUMENT,tmx:i.XHR_RESPONSE_TYPE.DOCUMENT,tsx:i.XHR_RESPONSE_TYPE.DOCUMENT,svg:i.XHR_RESPONSE_TYPE.DOCUMENT,gif:i.XHR_RESPONSE_TYPE.BLOB,png:i.XHR_RESPONSE_TYPE.BLOB,bmp:i.XHR_RESPONSE_TYPE.BLOB,jpg:i.XHR_RESPONSE_TYPE.BLOB,jpeg:i.XHR_RESPONSE_TYPE.BLOB,tif:i.XHR_RESPONSE_TYPE.BLOB,tiff:i.XHR_RESPONSE_TYPE.BLOB,webp:i.XHR_RESPONSE_TYPE.BLOB,tga:i.XHR_RESPONSE_TYPE.BLOB,json:i.XHR_RESPONSE_TYPE.JSON,text:i.XHR_RESPONSE_TYPE.TEXT,txt:i.XHR_RESPONSE_TYPE.TEXT},i.setExtensionLoadType=function(t,e){o(i._loadTypeMap,t,e)},i.setExtensionXhrType=function(t,e){o(i._xhrTypeMap,t,e)}},{eventemitter3:125,url:8}],128:[function(t,e,r){e.exports={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encodeBinary:function(t){for(var e,r="",i=new Array(4),n=0,o=0,s=0;n<t.length;){for(e=new Array(3),o=0;o<e.length;o++)n<t.length?e[o]=255&t.charCodeAt(n++):e[o]=0;switch(i[0]=e[0]>>2,i[1]=(3&e[0])<<4|e[1]>>4,i[2]=(15&e[1])<<2|e[2]>>6,i[3]=63&e[2],s=n-(t.length-1)){case 2:i[3]=64,i[2]=64;break;case 1:i[3]=64}for(o=0;o<i.length;o++)r+=this._keyStr.charAt(i[o])}return r}}},{}],129:[function(t,e,r){e.exports=t("./Loader"),e.exports.Resource=t("./Resource"),e.exports.middleware={caching:{memory:t("./middlewares/caching/memory")},parsing:{blob:t("./middlewares/parsing/blob")}}},{"./Loader":126,"./Resource":127,"./middlewares/caching/memory":130,"./middlewares/parsing/blob":131}],130:[function(t,e,r){var i={};e.exports=function(){return function(t,e){i[t.url]?(t.data=i[t.url],t.complete()):(t.once("complete",function(){i[this.url]=this.data}),e())}}},{}],131:[function(t,e,r){var i=t("../../Resource"),n=t("../../b64");window.URL=window.URL||window.webkitURL,e.exports=function(){return function(t,e){if(!t.data)return e();if(t.xhr&&t.xhrType===i.XHR_RESPONSE_TYPE.BLOB)if(window.Blob&&"string"!=typeof t.data){if(0===t.data.type.indexOf("image")){var r=URL.createObjectURL(t.data);t.blob=t.data,t.data=new Image,t.data.src=r,t.isImage=!0,t.data.onload=function(){URL.revokeObjectURL(r),t.data.onload=null,e()}}}else{var o=t.xhr.getResponseHeader("content-type");o&&0===o.indexOf("image")&&(t.data=new Image,t.data.src="data:"+o+";base64,"+n.encodeBinary(t.xhr.responseText),t.isImage=!0,t.data.onload=function(){t.data.onload=null,e()})}else e()}}},{"../../Resource":127,"../../b64":128}]},{},[105])(105)});
//# sourceMappingURL=pixi.min.js.map
// stats.js - http://github.com/mrdoob/stats.js
var Stats=function(){function f(a,e,b){a=document.createElement(a);a.id=e;a.style.cssText=b;return a}function l(a,e,b){var c=f("div",a,"padding:0 0 3px 3px;text-align:left;background:"+b),d=f("div",a+"Text","font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px;color:"+e);d.innerHTML=a.toUpperCase();c.appendChild(d);a=f("div",a+"Graph","width:74px;height:30px;background:"+e);c.appendChild(a);for(e=0;74>e;e++)a.appendChild(f("span","","width:1px;height:30px;float:left;opacity:0.9;background:"+
b));return c}function m(a){for(var b=c.children,d=0;d<b.length;d++)b[d].style.display=d===a?"block":"none";n=a}function p(a,b){a.appendChild(a.firstChild).style.height=Math.min(30,30-30*b)+"px"}var q=self.performance&&self.performance.now?self.performance.now.bind(performance):Date.now,k=q(),r=k,t=0,n=0,c=f("div","stats","width:80px;opacity:0.9;cursor:pointer");c.addEventListener("mousedown",function(a){a.preventDefault();m(++n%c.children.length)},!1);var d=0,u=Infinity,v=0,b=l("fps","#0ff","#002"),
A=b.children[0],B=b.children[1];c.appendChild(b);var g=0,w=Infinity,x=0,b=l("ms","#0f0","#020"),C=b.children[0],D=b.children[1];c.appendChild(b);if(self.performance&&self.performance.memory){var h=0,y=Infinity,z=0,b=l("mb","#f08","#201"),E=b.children[0],F=b.children[1];c.appendChild(b)}m(n);return{REVISION:14,domElement:c,setMode:m,begin:function(){k=q()},end:function(){var a=q();g=a-k;w=Math.min(w,g);x=Math.max(x,g);C.textContent=(g|0)+" MS ("+(w|0)+"-"+(x|0)+")";p(D,g/200);t++;if(a>r+1E3&&(d=Math.round(1E3*
t/(a-r)),u=Math.min(u,d),v=Math.max(v,d),A.textContent=d+" FPS ("+u+"-"+v+")",p(B,d/100),r=a,t=0,void 0!==h)){var b=performance.memory.usedJSHeapSize,c=performance.memory.jsHeapSizeLimit;h=Math.round(9.54E-7*b);y=Math.min(y,h);z=Math.max(z,h);E.textContent=h+" MB ("+y+"-"+z+")";p(F,b/c)}return a},update:function(){k=this.end()}}};"object"===typeof module&&(module.exports=Stats);

// tween.ts v0.1.0 https://github.com/edsilv/tween.ts
!function t(n,e,i){function r(o,s){if(!e[o]){if(!n[o]){var u="function"==typeof require&&require;if(!s&&u)return u(o,!0);if(a)return a(o,!0);throw new Error("Cannot find module '"+o+"'")}var h=e[o]={exports:{}};n[o][0].call(h.exports,function(t){var e=n[o][1][t];return r(e?e:t)},h,h.exports,t,n,e,i)}return e[o].exports}for(var a="function"==typeof require&&require,o=0;o<i.length;o++)r(i[o]);return r}({1:[function(t,n,e){window.TWEEN=this,e._tweens=[],e.REVISION="14",e.getAll=function(){return this._tweens},e.removeAll=function(){this._tweens=[]},e.add=function(t){this._tweens.push(t)},e.remove=function(t){var n=this._tweens.indexOf(t);-1!==n&&this._tweens.splice(n,1)},e.update=function(t){if(0===this._tweens.length)return!1;var n=0;for(t=t?t:"undefined"!=typeof window&&void 0!==window.performance&&void 0!==window.performance.now?window.performance.now():Date.now();n<this._tweens.length;)this._tweens[n].update(t)?n++:this._tweens.splice(n,1);return!0};var i=function(){function t(t){this._valuesStart={},this._valuesEnd={},this._valuesStartRepeat={},this._duration=1e3,this._repeat=0,this._yoyo=!1,this._isPlaying=!1,this._reversed=!1,this._delayTime=0,this._startTime=0/0,this._easingFunction=e.Easing.Linear.None,this._interpolationFunction=e.Interpolation.Linear,this._chainedTweens=[],this._onStartCallback=null,this._onStartCallbackFired=!1,this._onUpdateCallback=null,this._onCompleteCallback=null,this._onStopCallback=null,this._object=t;for(var n in t)this._valuesStart[n]=parseFloat(t[n])}return t.prototype.to=function(t,n){return void 0!==n&&(this._duration=n),this._valuesEnd=t,this},t.prototype.start=function(t){e.add(this),this._isPlaying=!0,this._onStartCallbackFired=!1,this._startTime=t?t:"undefined"!=typeof window&&void 0!==window.performance&&void 0!==window.performance.now?window.performance.now():Date.now(),this._startTime+=this._delayTime;for(var n in this._valuesEnd){if(this._valuesEnd[n]instanceof Array){if(0===this._valuesEnd[n].length)continue;this._valuesEnd[n]=[this._object[n]].concat(this._valuesEnd[n])}this._valuesStart[n]=this._object[n],this._valuesStart[n]instanceof Array==!1&&(this._valuesStart[n]*=1),this._valuesStartRepeat[n]=this._valuesStart[n]||0}return this},t.prototype.stop=function(){return this._isPlaying?(e.remove(this),this._isPlaying=!1,null!==this._onStopCallback&&this._onStopCallback.call(this._object),this.stopChainedTweens(),this):this},t.prototype.stopChainedTweens=function(){for(var t=0,n=this._chainedTweens.length;n>t;t++)this._chainedTweens[t].stop()},t.prototype.delay=function(t){return this._delayTime=t,this},t.prototype.repeat=function(t){return this._repeat=t,this},t.prototype.yoyo=function(t){return this._yoyo=t,this},t.prototype.easing=function(t){return this._easingFunction=t,this},t.prototype.interpolation=function(t){return this._interpolationFunction=t,this},t.prototype.chain=function(){for(var t=[],n=0;n<arguments.length-0;n++)t[n]=arguments[n+0];return this._chainedTweens=t,this},t.prototype.onStart=function(t){return this._onStartCallback=t,this},t.prototype.onUpdate=function(t){return this._onUpdateCallback=t,this},t.prototype.onComplete=function(t){return this._onCompleteCallback=t,this},t.prototype.onStop=function(t){return this._onStopCallback=t,this},t.prototype.update=function(t){var n;if(t<this._startTime)return!0;this._onStartCallbackFired===!1&&(null!==this._onStartCallback&&this._onStartCallback.call(this._object),this._onStartCallbackFired=!0);var e=(t-this._startTime)/this._duration;e=e>1?1:e;var i=this._easingFunction(e);for(n in this._valuesEnd){var r=this._valuesStart[n]||0,a=this._valuesEnd[n];a instanceof Array?this._object[n]=this._interpolationFunction(a,i):("string"==typeof a&&(a=r+parseFloat(a)),"number"==typeof a&&(this._object[n]=r+(a-r)*i))}if(null!==this._onUpdateCallback&&this._onUpdateCallback.call(this._object,i),1==e){if(this._repeat>0){isFinite(this._repeat)&&this._repeat--;for(n in this._valuesStartRepeat){if("string"==typeof this._valuesEnd[n]&&(this._valuesStartRepeat[n]=this._valuesStartRepeat[n]+parseFloat(this._valuesEnd[n])),this._yoyo){var o=this._valuesStartRepeat[n];this._valuesStartRepeat[n]=this._valuesEnd[n],this._valuesEnd[n]=o}this._valuesStart[n]=this._valuesStartRepeat[n]}return this._yoyo&&(this._reversed=!this._reversed),this._startTime=t+this._delayTime,!0}null!==this._onCompleteCallback&&this._onCompleteCallback.call(this._object);for(var s=0,u=this._chainedTweens.length;u>s;s++)this._chainedTweens[s].start(t);return!1}return!0},t}();e.Tween=i,e.Easing={Linear:{None:function(t){return t}},Quadratic:{In:function(t){return t*t},Out:function(t){return t*(2-t)},InOut:function(t){return(t*=2)<1?.5*t*t:-.5*(--t*(t-2)-1)}},Cubic:{In:function(t){return t*t*t},Out:function(t){return--t*t*t+1},InOut:function(t){return(t*=2)<1?.5*t*t*t:.5*((t-=2)*t*t+2)}},Quartic:{In:function(t){return t*t*t*t},Out:function(t){return 1- --t*t*t*t},InOut:function(t){return(t*=2)<1?.5*t*t*t*t:-.5*((t-=2)*t*t*t-2)}},Quintic:{In:function(t){return t*t*t*t*t},Out:function(t){return--t*t*t*t*t+1},InOut:function(t){return(t*=2)<1?.5*t*t*t*t*t:.5*((t-=2)*t*t*t*t+2)}},Sinusoidal:{In:function(t){return 1-Math.cos(t*Math.PI/2)},Out:function(t){return Math.sin(t*Math.PI/2)},InOut:function(t){return.5*(1-Math.cos(Math.PI*t))}},Exponential:{In:function(t){return 0===t?0:Math.pow(1024,t-1)},Out:function(t){return 1===t?1:1-Math.pow(2,-10*t)},InOut:function(t){return 0===t?0:1===t?1:(t*=2)<1?.5*Math.pow(1024,t-1):.5*(-Math.pow(2,-10*(t-1))+2)}},Circular:{In:function(t){return 1-Math.sqrt(1-t*t)},Out:function(t){return Math.sqrt(1- --t*t)},InOut:function(t){return(t*=2)<1?-.5*(Math.sqrt(1-t*t)-1):.5*(Math.sqrt(1-(t-=2)*t)+1)}},Elastic:{In:function(t){var n,e=.1,i=.4;return 0===t?0:1===t?1:(!e||1>e?(e=1,n=i/4):n=i*Math.asin(1/e)/(2*Math.PI),-(e*Math.pow(2,10*(t-=1))*Math.sin(2*(t-n)*Math.PI/i)))},Out:function(t){var n,e=.1,i=.4;return 0===t?0:1===t?1:(!e||1>e?(e=1,n=i/4):n=i*Math.asin(1/e)/(2*Math.PI),e*Math.pow(2,-10*t)*Math.sin(2*(t-n)*Math.PI/i)+1)},InOut:function(t){var n,e=.1,i=.4;return 0===t?0:1===t?1:(!e||1>e?(e=1,n=i/4):n=i*Math.asin(1/e)/(2*Math.PI),(t*=2)<1?-.5*e*Math.pow(2,10*(t-=1))*Math.sin(2*(t-n)*Math.PI/i):e*Math.pow(2,-10*(t-=1))*Math.sin(2*(t-n)*Math.PI/i)*.5+1)}},Back:{In:function(t){var n=1.70158;return t*t*((n+1)*t-n)},Out:function(t){var n=1.70158;return--t*t*((n+1)*t+n)+1},InOut:function(t){var n=2.5949095;return(t*=2)<1?.5*t*t*((n+1)*t-n):.5*((t-=2)*t*((n+1)*t+n)+2)}},Bounce:{In:function(t){return 1-TWEEN.Easing.Bounce.Out(1-t)},Out:function(t){return 1/2.75>t?7.5625*t*t:2/2.75>t?7.5625*(t-=1.5/2.75)*t+.75:2.5/2.75>t?7.5625*(t-=2.25/2.75)*t+.9375:7.5625*(t-=2.625/2.75)*t+.984375},InOut:function(t){return.5>t?.5*TWEEN.Easing.Bounce.In(2*t):.5*TWEEN.Easing.Bounce.Out(2*t-1)+.5}}},e.Interpolation={Linear:function(t,n){var e=t.length-1,i=e*n,r=Math.floor(i),a=TWEEN.Interpolation.Utils.Linear;return 0>n?a(t[0],t[1],i):n>1?a(t[e],t[e-1],e-i):a(t[r],t[r+1>e?e:r+1],i-r)},Bezier:function(t,n){var e,i=0,r=t.length-1,a=Math.pow,o=TWEEN.Interpolation.Utils.Bernstein;for(e=0;r>=e;e++)i+=a(1-n,r-e)*a(n,e)*t[e]*o(r,e);return i},CatmullRom:function(t,n){var e=t.length-1,i=e*n,r=Math.floor(i),a=TWEEN.Interpolation.Utils.CatmullRom;return t[0]===t[e]?(0>n&&(r=Math.floor(i=e*(1+n))),a(t[(r-1+e)%e],t[r],t[(r+1)%e],t[(r+2)%e],i-r)):0>n?t[0]-(a(t[0],t[0],t[1],t[1],-i)-t[0]):n>1?t[e]-(a(t[e],t[e],t[e-1],t[e-1],i-e)-t[e]):a(t[r?r-1:0],t[r],t[r+1>e?e:r+1],t[r+2>e?e:r+2],i-r)},Utils:{Linear:function(t,n,e){return(n-t)*e+t},Bernstein:function(t,n){var e=TWEEN.Interpolation.Utils.Factorial;return e(t)/e(n)/e(t-n)},Factorial:function(){var t=[1];return function(n){var e,i=1;if(t[n])return t[n];for(e=n;e>1;e--)i*=e;return t[n]=i}}(),CatmullRom:function(t,n,e,i,r){var a=.5*(e-t),o=.5*(i-n),s=r*r,u=r*s;return(2*n-2*e+a+o)*u+(-3*n+3*e-2*a-o)*s+a*r+n}}}},{}]},{},[1]);