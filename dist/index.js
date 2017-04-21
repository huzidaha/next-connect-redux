'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var wrapWithProvider = function wrapWithProvider(createStore, PageComponent, cache) {
  var _class, _temp;

  return _temp = _class = function (_Component) {
    (0, _inherits3.default)(_class, _Component);
    (0, _createClass3.default)(_class, null, [{
      key: 'getInitialProps',
      value: function () {
        var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ctx) {
          var req, isServer, props;
          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  req = ctx.req;
                  isServer = !!req;

                  if (isServer && typeof window === 'undefined') {
                    cache.store = createStore();
                  }
                  ctx.store = cache.store;
                  ctx.isServer = isServer;

                  if (!PageComponent.getInitialProps) {
                    _context.next = 11;
                    break;
                  }

                  _context.next = 8;
                  return PageComponent.getInitialProps(ctx);

                case 8:
                  _context.t0 = _context.sent;
                  _context.next = 12;
                  break;

                case 11:
                  _context.t0 = {};

                case 12:
                  props = _context.t0;

                  props.initialState = cache.store.getState();
                  return _context.abrupt('return', props);

                case 15:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function getInitialProps(_x) {
          return _ref.apply(this, arguments);
        }

        return getInitialProps;
      }()
    }]);

    function _class(props) {
      (0, _classCallCheck3.default)(this, _class);

      var _this = (0, _possibleConstructorReturn3.default)(this, (_class.__proto__ || (0, _getPrototypeOf2.default)(_class)).call(this, props));

      if (!cache.store) {
        cache.store = createStore(props.initialState);
      }
      return _this;
    }

    (0, _createClass3.default)(_class, [{
      key: 'render',
      value: function render() {
        return _react2.default.createElement(
          _reactRedux.Provider,
          { store: cache.store },
          _react2.default.createElement(PageComponent, this.props)
        );
      }
    }]);
    return _class;
  }(_react.Component), _class.propTypes = {
    initialState: _propTypes2.default.object
  }, _temp;
};

exports.default = function (createStore) {
  var cache = {};
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return function (PageComponent) {
      PageComponent = _reactRedux.connect.apply(undefined, args)(PageComponent);
      return wrapWithProvider(createStore, PageComponent, cache);
    };
  };
};
