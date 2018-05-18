'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MessengerInterface = function () {
    function MessengerInterface() {
        var onSuccess = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
        var onError = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

        _classCallCheck(this, MessengerInterface);

        this.onSuccess = onSuccess;
        this.onError = onError;
    }

    _createClass(MessengerInterface, [{
        key: 'send',
        value: function send(msg) {
            throw new TypeError('send not implemented');
        }
    }, {
        key: '_onSuccess',
        value: function _onSuccess(msg) {
            throw new TypeError('on success not implemented');
        }
    }, {
        key: '_onError',
        value: function _onError(err) {
            throw new TypeError('on error not implemented');
        }
    }]);

    return MessengerInterface;
}();

exports.default = MessengerInterface;
//# sourceMappingURL=messengers.interface.js.map
