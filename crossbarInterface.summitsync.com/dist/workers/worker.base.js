'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _connection = require('../connection');

var _connection2 = _interopRequireDefault(_connection);

var _worker = require('./worker.interface');

var _worker2 = _interopRequireDefault(_worker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WorkerBase = function (_WorkerInterface) {
    _inherits(WorkerBase, _WorkerInterface);

    function WorkerBase() {
        _classCallCheck(this, WorkerBase);

        return _possibleConstructorReturn(this, (WorkerBase.__proto__ || Object.getPrototypeOf(WorkerBase)).call(this));
    }

    _createClass(WorkerBase, [{
        key: 'sendMessage',
        value: function sendMessage(msg) {
            var _this2 = this;

            var namespace = msg.namespace;
            return this.crossbarConnection.exec(msg, function (obj) {
                _this2.response(msg, obj);
            });
        }
    }, {
        key: 'response',
        value: function response(msg, obj) {
            return obj;
        }
    }, {
        key: 'onJoin',
        value: function onJoin(session, details) {
            return Promise.resolve(session).then(function (session) {
                return session;
            });
        }
    }, {
        key: 'onLeave',
        value: function onLeave(reason, details) {
            return Promise.reject(details).then(function (details) {
                return details;
            });
        }
    }, {
        key: 'crossbarConnection',
        get: function get() {
            var _this3 = this;

            if (!this.cbConnection) {
                this.cbConnection = new _connection2.default('ws://127.0.0.1/ws', function (session, details) {
                    return _this3.onJoin(session, details);
                }, function (reason, details) {
                    return _this3.onLeave(reason, details);
                });
            }
            return this.cbConnection;
        }
    }]);

    return WorkerBase;
}(_worker2.default);

exports.default = WorkerBase;
//# sourceMappingURL=worker.base.js.map
