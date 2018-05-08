webpackJsonp([1],{

/***/ 160:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_router__ = __webpack_require__(185);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__redux_auth__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__redux_message__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_redux__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_axios__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__global_url__ = __webpack_require__(164);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = __webpack_require__(0);
var PropTypes = __webpack_require__(1);








var mapDispatchToProps = function mapDispatchToProps(dispatch, ownProps) {
    return {
        login: function login() {
            return dispatch(__WEBPACK_IMPORTED_MODULE_1__redux_auth__["a" /* actions */].login());
        },
        failed: function failed() {
            return dispatch(__WEBPACK_IMPORTED_MODULE_2__redux_message__["a" /* actions */].failed());
        },
        loading: function loading() {
            return dispatch(__WEBPACK_IMPORTED_MODULE_2__redux_message__["a" /* actions */].loading());
        },
        success: function success() {
            return dispatch(__WEBPACK_IMPORTED_MODULE_2__redux_message__["a" /* actions */].success());
        },
        reset: function reset() {
            return dispatch(__WEBPACK_IMPORTED_MODULE_2__redux_message__["a" /* actions */].reset());
        }

    };
};
var mapStateToProps = function mapStateToProps(_ref) {
    var authReducer = _ref.authReducer,
        messageReducer = _ref.messageReducer;

    return {
        isAuthenticated: authReducer.isLoggedIn
    };
};

var Login = function (_React$Component) {
    _inherits(Login, _React$Component);

    function Login(props) {
        _classCallCheck(this, Login);

        var _this = _possibleConstructorReturn(this, (Login.__proto__ || Object.getPrototypeOf(Login)).call(this, props));

        _this.handleSubmit = _this.handleSubmit.bind(_this);
        _this.handleChange = _this.handleChange.bind(_this);
        _this.state = {
            email: '',
            password: '',
            redirect: false
        };

        return _this;
    }

    _createClass(Login, [{
        key: 'handleSubmit',
        value: function handleSubmit(event) {
            //prevent the default event to be happened
            event.preventDefault();
            //console.log(this.state)

            var data = {
                email: this.state.email,
                password: this.state.password

            };

            var self = this;
            self.props.loading("Checking credential please await");

            __WEBPACK_IMPORTED_MODULE_4_axios___default.a.post(__WEBPACK_IMPORTED_MODULE_5__global_url__["a" /* BASE_API */] + "user/login", data).then(function (response) {
                return response;
            }).then(function (result) {
                if (result.data.success) {
                    var data = result.data.data;
                    console.log(result.data.msg);
                    localStorage.setItem('email', data.email);
                    localStorage.setItem('id', data.userid);
                    localStorage.setItem('user_auth', data.user_auth);
                    localStorage.setItem('type', data.usertype);
                    self.props.login();
                    self.props.success(result.data.msg);
                    self.setState({ redirect: true });
                } else {
                    self.props.failed(result.data.msg);
                }
            }).catch(function (error) {

                console.log(error);
            });
        }
    }, {
        key: 'handleChange',
        value: function handleChange(event) {
            //prevent the default event to be happened
            //automatically set state by the form id and the state name and form id must be the same
            this.setState(_defineProperty({}, event.target.id, event.target.value));
        }
    }, {
        key: 'render',
        value: function render() {
            var isRedirect = this.state.redirect;
            return React.createElement(
                'div',
                { className: 'container' },
                React.createElement(
                    'div',
                    { className: 'row justify-content-center' },
                    React.createElement(
                        'div',
                        { className: 'col-md-8' },
                        React.createElement(
                            'div',
                            { className: 'card' },
                            React.createElement(
                                'div',
                                { className: 'card-header' },
                                'Login'
                            ),
                            React.createElement(
                                'div',
                                { className: 'card-body' },
                                React.createElement(
                                    'form',
                                    { method: 'POST', onSubmit: this.handleSubmit },
                                    React.createElement(
                                        'div',
                                        { className: 'form-group row' },
                                        React.createElement(
                                            'label',
                                            { htmlFor: 'email', className: 'col-sm-4 col-form-label text-md-right' },
                                            'E-Mail Address'
                                        ),
                                        React.createElement(
                                            'div',
                                            { className: 'col-md-6' },
                                            React.createElement('input', { id: 'email', type: 'email', onChange: this.handleChange, className: 'form-control', name: 'email', value: this.state.email })
                                        )
                                    ),
                                    React.createElement(
                                        'div',
                                        { className: 'form-group row' },
                                        React.createElement(
                                            'label',
                                            { htmlFor: 'password', className: 'col-md-4 col-form-label text-md-right' },
                                            'Password'
                                        ),
                                        React.createElement(
                                            'div',
                                            { className: 'col-md-6' },
                                            React.createElement('input', { id: 'password', onChange: this.handleChange, type: 'password', className: 'form-control', name: 'password', value: this.state.password })
                                        )
                                    ),
                                    React.createElement(
                                        'div',
                                        { className: 'form-group row' },
                                        React.createElement(
                                            'div',
                                            { className: 'col-md-6 offset-md-4' },
                                            React.createElement(
                                                'div',
                                                { className: 'checkbox' },
                                                React.createElement(
                                                    'label',
                                                    null,
                                                    React.createElement('input', { type: 'checkbox', name: 'remember' }),
                                                    ' Remember Me'
                                                )
                                            )
                                        )
                                    ),
                                    React.createElement(
                                        'div',
                                        { className: 'form-group row mb-0' },
                                        React.createElement(
                                            'div',
                                            { className: 'col-md-8 offset-md-4' },
                                            React.createElement(
                                                'button',
                                                { type: 'submit', className: 'btn btn-primary', id: 'login-form button' },
                                                'Login'
                                            ),
                                            React.createElement(
                                                'a',
                                                { className: 'btn btn-link', href: '#' },
                                                'Forgot Your Password?'
                                            )
                                        )
                                    )
                                )
                            )
                        )
                    )
                ),
                isRedirect && React.createElement(__WEBPACK_IMPORTED_MODULE_0_react_router__["a" /* Redirect */], { to: '/' })
            );
        }
    }]);

    return Login;
}(React.Component);
//have to be both as both are compulsory


/* harmony default export */ __webpack_exports__["default"] = (Object(__WEBPACK_IMPORTED_MODULE_3_react_redux__["connect"])(mapStateToProps, mapDispatchToProps)(Login));

/***/ }),

/***/ 164:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export BASE_URL */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BASE_API; });
var BASE_URL = "http://localhost:8000/";

var BASE_API = BASE_URL + "api/";

/***/ }),

/***/ 185:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__MemoryRouter__ = __webpack_require__(54);
/* unused harmony reexport MemoryRouter */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Prompt__ = __webpack_require__(55);
/* unused harmony reexport Prompt */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Redirect__ = __webpack_require__(56);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_2__Redirect__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Route__ = __webpack_require__(27);
/* unused harmony reexport Route */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Router__ = __webpack_require__(14);
/* unused harmony reexport Router */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__StaticRouter__ = __webpack_require__(57);
/* unused harmony reexport StaticRouter */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Switch__ = __webpack_require__(58);
/* unused harmony reexport Switch */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__matchPath__ = __webpack_require__(15);
/* unused harmony reexport matchPath */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__withRouter__ = __webpack_require__(59);
/* unused harmony reexport withRouter */



















/***/ })

});