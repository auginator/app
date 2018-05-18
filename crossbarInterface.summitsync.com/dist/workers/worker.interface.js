'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WorkersInterface = function () {
    function WorkersInterface() {
        _classCallCheck(this, WorkersInterface);
    }

    _createClass(WorkersInterface, [{
        key: 'sendMessage',
        value: function sendMessage(msg) {
            throw new TypeError('send message is not implemented');
        }
    }, {
        key: 'response',
        value: function response(msg, obj) {
            throw new TypeError('response is not implemented');
        }
    }, {
        key: 'broadcast',
        value: function broadcast(msg) {
            throw new TypeError('broadcast is not implemented');
        }
    }]);

    return WorkersInterface;
}();

exports.default = WorkersInterface;
//# sourceMappingURL=worker.interface.js.map
