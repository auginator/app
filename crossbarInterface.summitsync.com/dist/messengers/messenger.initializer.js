'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _messenger = require('./messengers/messenger.worker');

var _messenger2 = _interopRequireDefault(_messenger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MessengerInitializer = function () {
    function MessengerInitializer() {
        _classCallCheck(this, MessengerInitializer);
    }

    _createClass(MessengerInitializer, null, [{
        key: 'useWorker',
        value: function useWorker() {
            return !!window.SharedWorker;
        }
    }, {
        key: 'get',
        value: function get() {
            var onSuccess = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
            var onError = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

            if (MessengerInitializer.useWorker()) {
                return new _messenger2.default(onSuccess, onError);
            }
        }
    }]);

    return MessengerInitializer;
}();

exports.default = MessengerInitializer;
//# sourceMappingURL=messenger.initializer.js.map
