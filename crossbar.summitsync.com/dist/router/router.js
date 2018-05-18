'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _services = require('../users/services');

var _services2 = _interopRequireDefault(_services);

var _connection = require('./connection');

var _connection2 = _interopRequireDefault(_connection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var autobahnConnection = new _connection2.default();

var Router = function () {
    function Router() {
        _classCallCheck(this, Router);

        this.connect();
    }

    _createClass(Router, [{
        key: 'connect',
        value: function connect() {
            autobahnConnection.connection.onopen = function (session) {
                session.register('users.getUsers', _services2.default.getUsers).then(function (reg) {
                    console.log('procedure was registered ', reg.procedure);
                }, function (err) {
                    console.log('error registaring procedure ', err);
                });
            };
            autobahnConnection.connection.open();
        }
    }]);

    return Router;
}();

exports.default = Router;


var router = new Router();
//# sourceMappingURL=router.js.map
