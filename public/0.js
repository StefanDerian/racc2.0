webpackJsonp([0],{

/***/ 484:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__redux_auth__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__redux_message__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_redux__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_axios__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__global_url__ = __webpack_require__(11);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }


var PropTypes = __webpack_require__(1);








var mapDispatchToProps = function mapDispatchToProps(dispatch, ownProps) {
    return {
        login: function login() {
            return dispatch(__WEBPACK_IMPORTED_MODULE_2__redux_auth__["a" /* actions */].login());
        },
        failed: function failed(msg) {
            return dispatch(__WEBPACK_IMPORTED_MODULE_3__redux_message__["a" /* actions */].failed(msg));
        },
        loading: function loading(msg) {
            return dispatch(__WEBPACK_IMPORTED_MODULE_3__redux_message__["a" /* actions */].loading(msg));
        },
        success: function success(msg) {
            return dispatch(__WEBPACK_IMPORTED_MODULE_3__redux_message__["a" /* actions */].success(msg));
        },
        reset: function reset() {
            return dispatch(__WEBPACK_IMPORTED_MODULE_3__redux_message__["a" /* actions */].reset());
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

var Login = function (_Component) {
    _inherits(Login, _Component);

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

            __WEBPACK_IMPORTED_MODULE_5_axios___default.a.post("/api/user/login", data).then(function (response) {
                return response;
            }).then(function (result) {

                if (result.data.success) {
                    var data = result.data.data;
                    console.log(data);
                    localStorage.setItem('email', data.email);
                    localStorage.setItem('displayName', data.displayname);
                    localStorage.setItem('id', data.userid);
                    localStorage.setItem('user_auth', data.user_auth);
                    localStorage.setItem('type', data.usertype);
                    self.props.login();
                    self.props.success(result.data.msg);
                    //self.setState({ redirect: true })

                    if (data.usertype == "ACCOUNTANT") {
                        window.location = "/Accountant";
                    } else {
                        window.location = "/";
                    }
                } else {
                    self.props.failed(result.data.msg);
                }
            }).catch(function (error) {

                self.props.failed("Sorry but error occurred");
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
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                { className: 'container' },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    { className: 'row justify-content-center' },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'div',
                        { className: 'col-md-8' },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            'div',
                            { className: 'card' },
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                'div',
                                { className: 'card-header' },
                                'Login'
                            ),
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                'div',
                                { className: 'card-body' },
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    'form',
                                    { method: 'POST', onSubmit: this.handleSubmit },
                                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                        'div',
                                        { className: 'form-group row' },
                                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                            'label',
                                            { htmlFor: 'email', className: 'col-sm-4 col-form-label text-md-right' },
                                            'E-Mail Address'
                                        ),
                                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                            'div',
                                            { className: 'col-md-6' },
                                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { id: 'email', type: 'email', onChange: this.handleChange, className: 'form-control', name: 'email', value: this.state.email })
                                        )
                                    ),
                                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                        'div',
                                        { className: 'form-group row' },
                                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                            'label',
                                            { htmlFor: 'password', className: 'col-md-4 col-form-label text-md-right' },
                                            'Password'
                                        ),
                                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                            'div',
                                            { className: 'col-md-6' },
                                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { id: 'password', onChange: this.handleChange, type: 'password', className: 'form-control', name: 'password', value: this.state.password })
                                        )
                                    ),
                                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                        'div',
                                        { className: 'form-group row' },
                                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                            'div',
                                            { className: 'col-md-6 offset-md-4' },
                                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                                'div',
                                                { className: 'checkbox' },
                                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                                    'label',
                                                    null,
                                                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { type: 'checkbox', name: 'remember' }),
                                                    ' Remember Me'
                                                )
                                            )
                                        )
                                    ),
                                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                        'div',
                                        { className: 'form-group row mb-0' },
                                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                            'div',
                                            { className: 'col-md-8 offset-md-4' },
                                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                                'button',
                                                { type: 'submit', className: 'btn btn-primary', id: 'login-form button' },
                                                'Login'
                                            ),
                                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
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
                isRedirect && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_router__["a" /* Redirect */], { to: '/' })
            );
        }
    }]);

    return Login;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);
//have to be both as both are compulsory


/* harmony default export */ __webpack_exports__["default"] = (Object(__WEBPACK_IMPORTED_MODULE_4_react_redux__["connect"])(mapStateToProps, mapDispatchToProps)(Login));

/***/ })

});