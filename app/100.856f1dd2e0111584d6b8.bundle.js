(window.webpackJsonp=window.webpackJsonp||[]).push([[100],{2007:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.NewTestModal=void 0;var o=l(n(1)),r=n(43),a=(l(n(115)),n(10),n(802));l(n(298)),l(n(9));function l(e){return e&&e.__esModule?e:{default:e}}n(297);t.NewTestModal=function(e){return o.default.createElement("div",null,o.default.createElement(r.Modal,{show:e.newTestModalShow,onHide:e.handleClose,backdrop:"static",keyboard:!1},o.default.createElement(r.Modal.Header,{closeButton:!0},o.default.createElement(r.Modal.Title,null,"New Test")),o.default.createElement(r.Modal.Body,null,e.errorMsg&&o.default.createElement(r.Alert,{bsStyle:"danger"},"All fields are required"),o.default.createElement("div",{className:""},o.default.createElement("form",{role:"form",onSubmit:function(e){e.preventDefault()}},o.default.createElement(a.FxForm,{config:e.formConfig,ref:function(t){e.handleBoundFormUpdate(t)}})))),o.default.createElement(r.Modal.Footer,null,o.default.createElement(r.Button,{className:"btn text-btn red",onClick:e.handleClose},"Close"),o.default.createElement(r.Button,{className:"btn text-btn green",onClick:e.testSubmit.bind(null,"add")},"Save"))))}},2789:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(2007);Object.keys(o).forEach(function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(t,e,{enumerable:!0,get:function(){return o[e]}})});var r=n(2790);Object.keys(r).forEach(function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(t,e,{enumerable:!0,get:function(){return r[e]}})})},2790:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.NewTestModalContainer=void 0;var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),r=u(n(1)),a=u(n(1007)),l=n(2007);n(36),u(n(9));function u(e){return e&&e.__esModule?e:{default:e}}function s(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}t.NewTestModalContainer=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.defaultState={formConfig:a.default},n.state=n.defaultState,n.boundForm=void 0,n.gridRefreshDone=!0,n.handleClose=n.handleClose.bind(n),n.handleBoundFormUpdate=n.handleBoundFormUpdate.bind(n),n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,r.default.Component),o(t,[{key:"handleClose",value:function(){var e=this.state.formConfig;e.handlers,e.data,this.state;this.props.newTestModalHideHandle(),this.gridRefreshDone=!0}},{key:"handleBoundFormUpdate",value:function(e){this.boundForm=e}},{key:"render",value:function(){var e;return r.default.createElement("div",null,r.default.createElement(l.NewTestModal,(s(e={newTestModalShow:this.props.newTestModalShow,handleClose:this.handleClose,formConfig:this.state.formConfig,handleBoundFormUpdate:this.handleBoundFormUpdate,errorMsg:this.props.errorMsg,successMsg:this.props.successMsg,isInsertDone:this.props.isInsertDone},"successMsg",this.props.successMsg),s(e,"errorMsg",this.props.errorMsg),s(e,"testSubmit",this.props.testSubmit),e)))}}]),t}()}}]);