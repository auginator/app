'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CrossbarInterface = function () {
    function CrossbarInterface() {
        _classCallCheck(this, CrossbarInterface);
    }

    _createClass(CrossbarInterface, [{
        key: 'addCallback',
        value: function addCallback(resolve, reject, ttl) {
            var id = '_' + _uuid2.default.v1();
            var cb = { resolve: resolve, reject: reject, ttl: ttl };
            this.callbacks[id] = cb;
            return id;
        }
    }, {
        key: 'request',
        value: function request(config) {
            var _this = this;

            return new Promise(function (resolve, reject) {
                var ttl = config.handler && config.handler.ttl ? config.handler.ttl : null;
                var id = _this.addCallback(resolve, reject, ttl);
                return _this.requestCallback(config, id);
            });
        }
    }, {
        key: 'call',
        value: function call(namespace, data) {
            return this.request({ namespace: namespace, data: data, type: 'call' });
        }
    }, {
        key: 'register',
        value: function register(namespace, data) {
            return this.request({ namespace: namespace, data: data, type: 'register' });
        }
    }, {
        key: 'publish',
        value: function publish(namespace, data) {
            return this.request({ namespace: namespace, data: data, type: 'publish' });
        }
    }, {
        key: 'subscribe',
        value: function subscribe(namespace, data) {
            return this.request({ namespace: namespace, data: data, type: 'subscribe' });
        }
    }, {
        key: 'unsubscribe',
        value: function unsubscribe(namespace, data) {
            return this.request({ namespace: namespace, data: data, type: 'unsubscribe' });
        }
    }]);

    return CrossbarInterface;
}();

exports.default = CrossbarInterface;
//# sourceMappingURL=interface.js.map
