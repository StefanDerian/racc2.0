webpackJsonp([1],{

/***/ 485:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_axios__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_bootstrap_table__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_bootstrap_table___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react_bootstrap_table__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_redux__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__redux_employee__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__redux_select__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__redux_message__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_reactstrap__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_react_router_dom__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__global_url__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_react_motion_drawer__ = __webpack_require__(189);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_react_motion_drawer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_react_motion_drawer__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_react_form__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_react_form___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_react_form__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_react_easy_print__ = __webpack_require__(190);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__PrintElement__ = __webpack_require__(191);
var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }










//import { Col,Button, htmlForm, label, Text, htmlFormText } from 'reactstrap';








//changed to htmlForm because of the layout problem with react-strap library






var mapDispatchToProps = function mapDispatchToProps(dispatch, ownProps) {
  return {
    failed: function failed(msg) {
      return dispatch(__WEBPACK_IMPORTED_MODULE_7__redux_message__["a" /* actions */].failed(msg));
    },
    loading: function loading(msg) {
      return dispatch(__WEBPACK_IMPORTED_MODULE_7__redux_message__["a" /* actions */].loading(msg));
    },
    success: function success(msg) {
      return dispatch(__WEBPACK_IMPORTED_MODULE_7__redux_message__["a" /* actions */].success(msg));
    },
    reset: function reset() {
      return dispatch(__WEBPACK_IMPORTED_MODULE_7__redux_message__["a" /* actions */].reset());
    }

  };
};

//getting select data from redux
var mapStateToProps = function mapStateToProps(_ref) {
  var employeeReducer = _ref.employeeReducer,
      selectReducer = _ref.selectReducer,
      messageReducer = _ref.messageReducer;


  return {
    employeesSelect: employeeReducer.select,
    employeeSelectForm: employeeReducer.selectForm,
    statusSelect: selectReducer.status,
    statusSelectForm: selectReducer.statusForm

  };
};

var Home = function (_Component) {
  _inherits(Home, _Component);

  function Home(props) {
    _classCallCheck(this, Home);

    var _this = _possibleConstructorReturn(this, (Home.__proto__ || Object.getPrototypeOf(Home)).call(this, props));

    _this.state = {
      clients: [],
      tempClients: [], //for filtering purpose, so when it whant to go back to its previous state it just have to refer to `clients` state
      urgentIds: [],
      sidebarOpen: false,
      formdata: {
        FirstName: "",
        LastName: "",
        DateofBirth: "",
        Mobile: "",
        Vexpiry: ["", ""],
        tim: ["", ""], // last contact date
        CurrentStatus: "",
        UserID: "", //the employee user id
        Nationality: "",
        Course: "",
        Visa: ""
        //end of form data
      } };
    _this.trClasshtmlFormat = _this.trClasshtmlFormat.bind(_this);
    _this.filterClient = _this.filterClient.bind(_this);
    _this.sleep = _this.sleep.bind(_this);
    _this.print = _this.print.bind(_this);
    return _this;
  }

  _createClass(Home, [{
    key: 'print',
    value: function print() {
      printJS({ printable: this.state.tempClients, type: 'json', properties: ['FirstName', 'LastName', 'DateofBirth', 'Mobile', 'Email', 'Status', 'Vexpiry', 'Course', 'duedate', 'tim'] });
    }

    //indicating urgent row

  }, {
    key: 'trClasshtmlFormat',
    value: function trClasshtmlFormat(row, rowIndex) {
      // row is the current row data
      return row.urgent == 0 ? "" : "table-danger"; // return className name.
    }
  }, {
    key: 'handleRowSelect',
    value: function handleRowSelect(row, isSelected, e) {

      //mainly because to update the urgency data
      //assign the row data
      var object = {};

      //if the row is selected

      if (isSelected) {
        console.log(row.FirstName + "is selected");
        object = _extends({}, object, { urgent: 1

          //or else
        });
      } else {

        console.log(row.FirstName + "is not selected");
        object = _extends({}, object, { urgent: 0 });
      }

      console.log(object);
      //serialize it so it can be sent to the laravel router
      var serialized = JSON.stringify(object);

      __WEBPACK_IMPORTED_MODULE_2_axios___default.a.put("/api/updateclient/" + row.clientId + "/" + serialized).then(function (response) {}).catch(function (error) {});
    }

    //onselected row

  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var options = {
        exportCSVText: 'Export CSV',
        printToolBar: true
      };

      var printData = __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'table',
        null,
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'thead',
          null,
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'tr',
            null,
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'td',
              null,
              'First Name'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'td',
              null,
              'Last Name'
            )
          ),
          this.state.tempClients.map(function (values) {
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'tr',
              null,
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'td',
                null,
                values.FirstName
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'td',
                null,
                values.LastName
              )
            );
          })
        )
      );

      var selectRow = {
        mode: 'checkbox', // or checkbox
        className: 'table-danger', // change class name or turn this into red once selected
        onSelect: this.handleRowSelect, //handle row selection
        selected: this.state.urgentIds, //selected value of urgent data
        clickToExpand: true, // expand the detail of the data
        showOnlySelected: true //display urgent client only
      };
      var expandColumnComponent = function expandColumnComponent(_ref2) {
        var isExpandableRow = _ref2.isExpandableRow,
            isExpanded = _ref2.isExpanded;

        var content = '';

        if (isExpandableRow) {
          content = isExpanded ? '(-)' : '(+)';
        } else {
          content = ' ';
        }
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          null,
          ' ',
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'button',
            { className: 'btn btn-danger btn-sm' },
            content,
            ' '
          )
        );
      };
      var expandComponent = function expandComponent(row) {

        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          null,
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'row' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_9_react_router_dom__["b" /* Link */],
              { to: { pathname: "Detail/" + row.clientId + "/updateclient" }, className: 'btn btn-primary' },
              'Update Client Data'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_9_react_router_dom__["b" /* Link */],
              { to: { pathname: "Detail/" + row.clientId + "/pte" }, className: 'btn btn-primary' },
              'Update Migration data'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_9_react_router_dom__["b" /* Link */],
              { to: { pathname: "Detail/" + row.clientId + "/education" }, className: 'btn btn-primary' },
              'Update Education Data'
            )
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'row' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'dl',
              null,
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'dt',
                null,
                'First Name'
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'dd',
                null,
                row.FirstName
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'dt',
                null,
                'Last Name'
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'dd',
                null,
                row.LastName
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'dt',
                null,
                'Mobile Number'
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'dd',
                null,
                row.Mobile
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'dt',
                null,
                'Date of Birth'
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'dd',
                null,
                row.DateofBirth
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'dt',
                null,
                'Email'
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'dd',
                null,
                row.Email
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'dt',
                null,
                'Nationality'
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'dd',
                null,
                row.Nationality
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'dt',
                null,
                'Client Status'
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'dd',
                null,
                row.CurrentStatus
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'dt',
                null,
                'Visa Expiry Date'
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'dd',
                null,
                row.Vexpiry
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'dt',
                null,
                'Visa Type'
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'dd',
                null,
                row.Visa
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'dt',
                null,
                'Course'
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'dd',
                null,
                row.Course
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'dt',
                null,
                'Last Contact Date'
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'dd',
                null,
                row.tim
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'dt',
                null,
                'Expected Graduation Date'
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'dd',
                null,
                row.uni_compl
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'dt',
                null,
                'Due Date'
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'dd',
                null,
                row.duedate
              )
            )
          )
        );
      };

      // for employee select filter format
      var enumFormatter = function enumFormatter(cell, row, enumObject) {
        return enumObject[cell];
      };

      var printElement = function printElement(_ref3) {
        var children = _ref3.children;
        return {
          type: __WEBPACK_IMPORTED_MODULE_14__PrintElement__["a" /* default */],
          props: {
            printdata: printData
          }
        };
      };

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        null,
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'container' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_12_react_form__["Form"],
            { onChange: function onChange(values) {
                //the data of the changed values
                var data = values.values;
                //current state of the form data
                var currentdata = _this2.state.formdata;
                //copying the current state with the new state given
                _this2.setState({ formdata: _extends({}, currentdata, data) });

                _this2.filterClient(data);
              } },
            function (formApi) {
              var _React$createElement;

              return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'form',
                { onSubmit: formApi.submitForm },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'div',
                  { className: 'row' },
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    { className: 'col-md-3 search-col' },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                      'div',
                      { className: 'form-group' },
                      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'label',
                        { htmlFor: 'FirstName' },
                        ' First Name:'
                      ),
                      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_12_react_form__["Text"], { type: 'string', id: 'FirstName', className: 'form-control search-form', field: 'FirstName', placeholder: 'Search by First Name...' })
                    )
                  ),
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    { className: 'col-md-3 search-col' },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                      'div',
                      { className: 'form-group' },
                      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'label',
                        { htmlFor: 'LastName' },
                        ' Last Name:'
                      ),
                      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_12_react_form__["Text"], { type: 'string', id: 'LastName', className: 'form-control search-form', field: 'LastName', placeholder: 'Search by Last Name...' })
                    )
                  ),
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    { className: 'col-md-3 search-col' },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                      'div',
                      { className: 'form-group' },
                      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'label',
                        { htmlFor: 'DateofBirth' },
                        ' Date Of Birth:'
                      ),
                      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_12_react_form__["Text"], { type: 'date', id: 'DateofBirth', className: 'form-control search-form', field: 'DateofBirth', placeholder: 'dd/mm/yyyy' })
                    )
                  ),
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    { className: 'col search-col' },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                      'div',
                      { className: 'form-group' },
                      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'label',
                        { htmlFor: 'Mobile' },
                        ' phone number:'
                      ),
                      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_12_react_form__["Text"], { type: 'string', id: 'Mobile', className: 'form-control search-form', field: 'Mobile', placeholder: 'Search by Phone Number...' })
                    )
                  ),
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    { className: 'col-md-3 search-col' },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                      'div',
                      { className: 'form-group' },
                      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'label',
                        { htmlFor: 'Vexpiry' },
                        ' Visa Expiry Date bottom Range:'
                      ),
                      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_12_react_form__["Text"], { type: 'date', id: 'Vexpiry', className: 'form-control search-form', field: 'Vexpiry[0]', placeholder: 'dd/mm/yyyy' })
                    )
                  ),
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    { className: 'col-md-3 search-col' },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                      'div',
                      { className: 'form-group' },
                      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'label',
                        { htmlFor: 'Vexpiry' },
                        ' Visa Expiry Date upper Range:'
                      ),
                      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_12_react_form__["Text"], { type: 'date', id: 'Vexpiry', className: 'form-control search-form', field: 'Vexpiry[1]', placeholder: 'dd/mm/yyyy' })
                    )
                  ),
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    { className: 'col-md-3 search-col' },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                      'div',
                      { className: 'form-group' },
                      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'label',
                        { htmlFor: 'tim' },
                        ' last contact bottom Range:'
                      ),
                      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_12_react_form__["Text"], { type: 'date', id: 'tim', className: 'form-control search-form', field: 'tim[0]', placeholder: 'dd/mm/yyyy' })
                    )
                  ),
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    { className: 'col-md-3 search-col' },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                      'div',
                      { className: 'form-group' },
                      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'label',
                        { htmlFor: 'tim' },
                        ' last contact upper range:'
                      ),
                      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_12_react_form__["Text"], { type: 'date', id: 'tim', className: 'form-control search-form', field: 'tim[1]', placeholder: 'dd/mm/yyyy' })
                    )
                  ),
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    { className: 'col-md-3 search-col' },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                      'div',
                      { className: 'form-group' },
                      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'label',
                        { htmlFor: 'tim' },
                        ' graduation date bottom Range:'
                      ),
                      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_12_react_form__["Text"], { type: 'date', id: 'uni_Compl', className: 'form-control search-form', field: 'uni_Compl[0]', placeholder: 'dd/mm/yyyy' })
                    )
                  ),
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    { className: 'col-md-3 search-col' },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                      'div',
                      { className: 'form-group' },
                      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'label',
                        { htmlFor: 'tim' },
                        ' graduation date upper range:'
                      ),
                      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_12_react_form__["Text"], { type: 'date', id: 'uni_Compl', className: 'form-control search-form', field: 'uni_Compl[1]', placeholder: 'dd/mm/yyyy' })
                    )
                  ),
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    { className: 'col-md-3 search-col' },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                      'div',
                      { className: 'form-group' },
                      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'label',
                        { htmlFor: 'Nationality' },
                        ' Nationality:'
                      ),
                      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_12_react_form__["Text"], { type: 'string', id: 'Nationality', className: 'form-control search-form', field: 'Nationality' })
                    )
                  ),
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    { className: 'col-md-3 search-col' },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                      'div',
                      { className: 'form-group' },
                      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'label',
                        { htmlFor: 'Course' },
                        ' Course:'
                      ),
                      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_12_react_form__["Text"], { type: 'string', id: 'Course', className: 'form-control search-form', field: 'Course' })
                    )
                  ),
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    { className: 'col-md-3 search-col' },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                      'div',
                      { className: 'form-group' },
                      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'label',
                        { htmlFor: 'Visa' },
                        ' Visa Type:'
                      ),
                      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_12_react_form__["Text"], { type: 'string', id: 'Visa', className: 'form-control search-form', field: 'Visa' })
                    )
                  ),
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    { className: 'col-md-3 search-col' },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                      'div',
                      { className: 'form-group' },
                      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'label',
                        { htmlFor: 'CurrentStatus' },
                        'Status  :'
                      ),
                      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_12_react_form__["Select"], (_React$createElement = { field: 'CurrentStatus', id: 'CurrentStatus', options: _this2.props.statusSelectForm }, _defineProperty(_React$createElement, 'field', 'CurrentStatus'), _defineProperty(_React$createElement, 'className', 'form-control search-form'), _React$createElement))
                    )
                  ),
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    { className: 'col-md-3 search-col' },
                    localStorage.getItem("type") == "MANAGER" && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                      'div',
                      { className: 'form-group' },
                      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'label',
                        { htmlFor: 'UserID' },
                        'Consultant:'
                      ),
                      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_12_react_form__["Select"], { field: 'UserID', id: 'UserID', options: _this2.props.employeeSelectForm, className: 'form-control search-form' })
                    )
                  )
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'button',
                  { type: 'reset', className: 'btn btn-warning btn-lg', onClick: function onClick() {
                      formApi.resetAll();
                      _this2.setState({ formdata: _this2.state.defaultFormData });
                      _this2.setState({ tempClients: _this2.state.clients });
                    } },
                  'Reset'
                )
              );
            }
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_9_react_router_dom__["b" /* Link */],
            { to: { pathname: "/CreateClient" }, className: 'btn btn-primary btn-lg pull-right' },
            'Create Client'
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'button',
            { type: 'button', className: 'btn btn-warning btn-lg', onClick: function onClick() {

                _this2.print();
              } },
            'Print'
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_3_react_bootstrap_table__["BootstrapTable"],
            { ref: 'clientsTable', data: this.state.tempClients,

              style: { width: "50%" },
              options: options,
              selectRow: selectRow,
              expandableRow: function expandableRow(row) {
                return true;
              },
              expandComponent: expandComponent,
              expandColumnOptions: {
                expandColumnVisible: true,
                expandColumnComponent: expandColumnComponent,
                columnWidth: 50
              },
              autoCollapse: true,
              exportCSV: true, striped: true, hover: true, pagination: true },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_3_react_bootstrap_table__["TableHeaderColumn"],
              { isKey: true, dataField: 'clientId', dataSort: true, hidden: true },
              'Client ID'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_3_react_bootstrap_table__["TableHeaderColumn"],
              { width: '150px', filter: { type: 'TextFilter', delay: 1000 }, ref: 'FirstName', dataField: 'FirstName', dataSort: true, columnTitle: true },
              'First Name'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_3_react_bootstrap_table__["TableHeaderColumn"],
              { width: '150px', filter: { type: 'TextFilter', delay: 1000 }, ref: 'LastName', dataField: 'LastName', dataSort: true, columnTitle: true },
              'LastName'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_3_react_bootstrap_table__["TableHeaderColumn"],
              { width: '150px', filter: { type: 'TextFilter', delay: 1000 }, ref: 'Mobile', dataField: 'Mobile', dataSort: true, columnTitle: true },
              'Mobile Number'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_3_react_bootstrap_table__["TableHeaderColumn"],
              { width: '150px', filter: { type: 'TextFilter' }, ref: 'DateofBirth', dataField: 'DateofBirth', dataSort: true, columnTitle: true },
              'DOB'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_3_react_bootstrap_table__["TableHeaderColumn"],
              { width: '150px', filter: { type: 'TextFilter', delay: 1000 }, ref: 'Email', dataField: 'Email', dataSort: true, columnTitle: true },
              'Email'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_3_react_bootstrap_table__["TableHeaderColumn"],
              { width: '150px', filter: { type: 'TextFilter', delay: 1000 }, ref: 'Nationality', dataField: 'Nationality', dataSort: true, columnTitle: true },
              'Nationality'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_3_react_bootstrap_table__["TableHeaderColumn"],
              { width: '150px', filter: { type: 'SelectFilter', options: this.props.statusSelect, delay: 3000 }, ref: 'CurrentStatus', dataField: 'CurrentStatus', dataSort: true, columnTitle: true },
              'Status'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_3_react_bootstrap_table__["TableHeaderColumn"],
              { width: '150px', filter: { type: 'DateFilter' }, ref: 'Vexpiry', dataField: 'Vexpiry', dataSort: true, columnTitle: true },
              'Visa Expiry Date'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_3_react_bootstrap_table__["TableHeaderColumn"],
              { width: '150px', filter: { type: 'TextFilter', delay: 1000 }, dataField: 'Course', ref: 'Course', dataSort: true, columnTitle: true },
              'Course'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_3_react_bootstrap_table__["TableHeaderColumn"],
              { width: '150px', filter: { type: 'TextFilter', delay: 1000 }, dataField: 'Visa', ref: 'Visa', dataSort: true, columnTitle: true },
              'Visa'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_3_react_bootstrap_table__["TableHeaderColumn"],
              { width: '150px', filter: { type: 'DateFilter' }, ref: 'tim', dataField: 'tim', dataSort: true, columnTitle: true },
              'Last Contact Date'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_3_react_bootstrap_table__["TableHeaderColumn"],
              { width: '150px', ref: 'UserID', filter: { type: 'SelectFilter', options: this.props.employeesSelect, delay: 3000 }, dataField: 'UserID', dataSort: true, dataFormat: enumFormatter, formatExtraData: this.props.employeesSelect, hidden: localStorage.getItem("type") != "MANAGER", columnTitle: true },
              'Consultant'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_3_react_bootstrap_table__["TableHeaderColumn"],
              { width: '150px', ref: 'uni_Compl', filter: { type: 'DateFilter' }, dataField: 'uni_Compl', dataSort: true },
              'Expected Graduation Date'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_3_react_bootstrap_table__["TableHeaderColumn"],
              { width: '150px', dataField: 'duedate', dataSort: true, columnTitle: true },
              'Due Date'
            )
          )
        )
      );
    }
  }, {
    key: 'sleep',
    value: function sleep(time) {
      return new Promise(function (resolve) {
        return setTimeout(resolve, time);
      });
    }
    //function for filtering the data based on the tempClientData
    //this function is relying on ref attribute,filter, and the state of object
    // the state, filter and ref must be defined properly with same name and variable name

  }, {
    key: 'filterClient',
    value: function filterClient() {
      var _this3 = this;

      this.sleep(1000).then(function () {
        var filteredData = _this3.state.clients;

        var _loop = function _loop(key, value) {
          // do something with key|value

          // if the column is exist as the column may not exist in some of the roles
          if (_this3.refs[key]) {
            // if it is an array then it is a ranged filter such as date
            if (Array.isArray(value)) {
              // index 0 is bottom value and index 1 is upper value

              if (value[0] !== "" && value[0] && value[1] !== "" && value[1]) {

                // this.refs[key].applyFilter({
                //   date: new Date(value[0]),
                //   comparator: '>='
                //
                // })
                // this.refs[key].applyFilter({
                //   date: new Date(value[1]),
                //   comparator: '<='
                //
                // })
                //filtering based on the tempClients state so the table will update as well
                filteredData = filteredData.filter(function (values) {

                  return new Date(values[key]) >= new Date(value[0]) && new Date(values[key]) <= new Date(value[1]);
                });
              }
              // else{
              //   this.refs[key].cleanFiltered()
              //   //this.setState({tempClients:this.state.clients})
              // }
            } else {
              if (value !== "" && value !== 0 && value !== -1 && value) {
                //console.log("value",value)
                //this.refs[key].applyFilter(value)
                filteredData = filteredData.filter(function (values) {
                  //3. string.search
                  var string1 = values[key];
                  var expr = value;
                  if (string1.indexOf(expr) !== -1) {
                    console.log("values", values[key]);
                    console.log("value", value);
                  }
                  console.log(string1.indexOf(expr) !== -1);
                  return string1.indexOf(expr) !== -1;
                });
              } else {
                //this.refs[key].cleanFiltered()
              }
            }
          }
        };

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = Object.entries(_this3.state.formdata)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _ref4 = _step.value;

            var _ref5 = _slicedToArray(_ref4, 2);

            var key = _ref5[0];
            var value = _ref5[1];

            _loop(key, value);
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        _this3.setState({ tempClients: filteredData });
      });
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      var self = this;
      var url = "/api/clientdata";
      // to determine which is for agent and manager
      console.log(localStorage.getItem("type"));
      if (localStorage.getItem("type") != "MANAGER") {
        url += "/" + localStorage.getItem("id");
      } else {
        url += "/" + 0;
      }
      self.props.loading("loading data please wait");
      __WEBPACK_IMPORTED_MODULE_2_axios___default.a.get(url).then(function (res) {
        return res;
      }).then(function (response) {
        //set the state for client data

        console.log(response);
        // if(response.data.data){
        //   self.props.failed("you still do not have any clients")
        // }
        self.setState({ clients: response.data.data });

        //set the state for temporary client data which is used for filtering
        self.setState({ tempClients: response.data.data });

        return response.data.data;
      }).then(function (reponse) {
        //select urgent clients
        self.props.success("successfully loaded data");
        var urgent = self.state.clients.filter(function (client) {
          return client.urgent == 1;
        });
        //get their id htmlFor the bootstrap react table library
        var filtered = urgent.map(function (client) {
          return client.clientId;
        });

        //checkpoint for reseting data
        self.setState({ defaultFormData: _extends({}, self.state.formdata) });
        //set it in state
        self.setState({ urgentIds: filtered });
      }).catch(function (error) {
        self.props.loading("Failed loading data. Something went wrong");
      });
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      var self = this;
      if (nextState !== this.state || nextProps !== this.props) {
        return true;
      }
      return false;
    }
  }]);

  return Home;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (Object(__WEBPACK_IMPORTED_MODULE_4_react_redux__["connect"])(mapStateToProps, mapDispatchToProps)(Home));

/***/ })

});