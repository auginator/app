'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _autobahn = require('autobahn');

var _autobahn2 = _interopRequireDefault(_autobahn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var instance = null;

var AutobahnConnection = function () {
    function AutobahnConnection() {
        _classCallCheck(this, AutobahnConnection);

        if (instance) {
            return instance;
        }

        this.connect();
        instance = this;
    }

    _createClass(AutobahnConnection, [{
        key: 'connect',
        value: function connect() {
            var connection = new _autobahn2.default.Connection({
                url: 'ws://127.0.0.1:9090/ws',
                realm: 'realm1'
            });
            this.connection = connection;
        }
    }]);

    return AutobahnConnection;
}();

exports.default = AutobahnConnection;
//# sourceMappingURL=connection.js.map
