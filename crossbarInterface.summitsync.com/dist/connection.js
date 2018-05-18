'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _autobahnMin = require('../resources/autobahn.min.jgz');

var _autobahnMin2 = _interopRequireDefault(_autobahnMin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CrossbarConnection = function () {
    function CrossbarConnection(wsUrl) {
        var onJoin = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Promise.resolve();
        var onLeave = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Promise.resolve();

        _classCallCheck(this, CrossbarConnection);

        this.wsUrl = wsUrl;
        this.onJoin = onJoin;
        this.onLeave = onLeave;
        this.connection = null;
        this.connected = false;
        this.session = null;
    }

    _createClass(CrossbarConnection, [{
        key: '_connect',
        value: function _connect() {
            return new _autobahnMin2.default.Connection({
                url: this.wsUrl,
                realm: 'realm1'
            });
        }
    }, {
        key: '_session',
        value: function _session() {
            var _this = this;

            if (!this._getSession) {
                this._getSession = new Promise(function (resolve, reject) {
                    try {
                        _this.connection = _this._connect();

                        _this.connected = true;

                        _this.connection.onopen = function (session, details) {
                            _this.session = session;
                            _this.onJoin(session, details).then(function (_) {
                                _this.session.caller_disclose_me = true;
                                resolve(_this.session);
                            });
                        };

                        _this.connection.onclose = function (reason, details) {
                            _this.connected = false;
                            _this._getSession = null;
                            _this.onLeave(reason, details).then(function (_) {});
                            if (reason === 'lost') {
                                return true;
                            }
                        };
                    } catch (ex) {
                        console.log('autobahn connection error: ', ex);
                    }
                });
            }
            return this._getSession;
        }
    }, {
        key: 'close',
        value: function close() {
            if (this.connected) {
                this.connection.close();
            }
        }
    }, {
        key: 'exec',
        value: function exec(config, callback) {
            var _this2 = this;

            return this._session().then(function (_) {
                _this2[config.type](config, callback);
            });
        }
    }, {
        key: 'call',
        value: function call(config, callback) {
            this.session.call(config.namespace, config.parameters, config.kwargs, config.options).then(function (response) {
                callback({ id: config.id, status: 'success', response: response });
            }, function (err) {
                callback({ id: config.id, status: 'error', error: error });
            });
        }
    }]);

    return CrossbarConnection;
}();

exports.default = CrossbarConnection;
//# sourceMappingURL=connection.js.map
