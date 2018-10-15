(window.webpackJsonp=window.webpackJsonp||[]).push([[83],{1986:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.ManageCalendar=void 0;var n,r=a(1),o=(n=r)&&n.__esModule?n:{default:n},s=(a(43),a(8)),i=a(66),c=a(802);t.ManageCalendar=function(e){return o.default.createElement(o.default.Fragment,null,o.default.createElement("div",{className:"",id:"manageCalendarTitle"},o.default.createElement("div",{className:"col-md-6"},o.default.createElement("h4",null,"Calendar Setting"))),o.default.createElement("div",{className:"col-md-12"},o.default.createElement(i.PatientAlertMessage,{errorMsg:e.errorMsg,isUpdateDone:e.isUpdateDone,successMessage:e.successMessage})),o.default.createElement("form",{role:"form",onSubmit:function(e){e.preventDefault()}},o.default.createElement(c.FxForm,{config:e.formConfig,ref:function(t){e.handleBoundFormUpdate(t)}}),o.default.createElement("div",{className:""},o.default.createElement("div",{className:"col-md-12 text-right"},o.default.createElement("button",{className:"btn text-btn green",disabled:!!e.submitted,onClick:e.submitData},e.submitted?s.configConstants.BUTTON_PLEASE_WAIT:s.configConstants.SAVE_BUTTON)))))}},2727:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a(1986);Object.keys(n).forEach(function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(t,e,{enumerable:!0,get:function(){return n[e]}})});var r=a(2728);Object.keys(r).forEach(function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(t,e,{enumerable:!0,get:function(){return r[e]}})})},2728:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.ManageCalendarContainer=void 0;var n=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}(),r=u(a(1)),o=a(36),s=(u(a(296)),a(66),a(10),a(54)),i=a(2729),c=a(1986);function u(e){return e&&e.__esModule?e:{default:e}}var l=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var a=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return a.submitData=a.submitData.bind(a),a.boundForm=void 0,a.handleBoundFormUpdate=a.handleBoundFormUpdate.bind(a),a}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,r.default.Component),n(t,[{key:"handleBoundFormUpdate",value:function(e){this.boundForm=e}},{key:"submitData",value:function(){if(this.boundForm){var e=this.boundForm.getData();if(e)(0,this.props.dispatch)(i.manageCalendarActions.newSubmit(e)),document.getElementById("manageCalendarTitle").scrollIntoView()}}},{key:"componentWillMount",value:function(){(0,this.props.dispatch)(i.manageCalendarActions.getRecord())}},{key:"componentDidUpdate",value:function(){var e=this.props.dispatch;this.props.isUserNotValid&&e(s.headerActions.logout())}},{key:"componentWillReceiveProps",value:function(e){var t=this.props.dispatch;e.isUpdateDone&&setTimeout(function(){t(i.manageCalendarActions.resetState())},2e3)}},{key:"render",value:function(){return this.props.fetchedManageCalendarData?r.default.createElement("div",null,r.default.createElement(c.ManageCalendar,{successMessage:this.props.successMessage,errorMsg:this.props.errorMsg,formConfig:this.props.manageCalendarData.form,isUpdateDone:this.props.isUpdateDone,submitData:this.submitData,handleBoundFormUpdate:this.handleBoundFormUpdate})):r.default.createElement("div",{className:"showbox"},r.default.createElement("div",{className:"loader"},r.default.createElement("svg",{className:"circular",viewBox:"25 25 50 50"},r.default.createElement("circle",{className:"path",cx:"50",cy:"50",r:"20",fill:"none",strokeWidth:"2",strokeMiterlimit:"10"}))))}}]),t}();var d=(0,o.connect)(function(e){var t=e.manageCalendar,a=t.successMessage,n=t.errorMsg,r=t.isUserNotValid,o=t.fetchedManageCalendarData,s=t.manageCalendarData;return{successMessage:a,isUpdateDone:t.isUpdateDone,errorMsg:n,isUserNotValid:r,fetchedManageCalendarData:o,manageCalendarData:s}})(l);t.ManageCalendarContainer=d},2729:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.manageCalendarActions=void 0;var n=a(8),r=a(10),o=a(2730),s=a(348);t.manageCalendarActions={getRecord:function(e){return function(a){a({type:s.manageCalendarConstants.MANAGE_CALENDAR_REQUEST}),o.manageCalendarService.getRecord(e).then(function(e){var o,i=e.data;if(i.code==n.configConstants.SUCCESS_CODE)a(function(e){return{type:s.manageCalendarConstants.MANAGE_CALENDAR_SUCCESS,data:e}}(i));else if(i.code==n.configConstants.ERROR_CODE){var c=r.utilityHelper.getFirstErrorMessage(i.error);a(t(c))}else if(i.code==n.configConstants.EXCEPTION_CODE){var c=i.message;a(t(c))}else if(i.code==n.configConstants.UNAUTHENTICATE_CODE){var c=i.message;a((o=c,{type:n.configConstants.UNAUTHENTICATE,error:o}))}else a(t(e))}).catch(function(e){a(t(e))})};function t(e){return{type:s.manageCalendarConstants.MANAGE_CALENDAR_FAILURE,error:e}}},newSubmit:function(e){return function(a){var i;a((i={detils:e},{type:s.manageCalendarConstants.MANAGE_CALENDAR_NEW_REQUEST,data:i})),o.manageCalendarService.doNewSubmit(e).then(function(e){var o,i=e.data;if(i.code==n.configConstants.SUCCESS_CODE)a(function(e){return{type:s.manageCalendarConstants.MANAGE_CALENDAR_NEW_SUCCESS,data:e}}(i));else if(i.code==n.configConstants.ERROR_CODE){var c=r.utilityHelper.getFirstErrorMessage(i.error);a(t(c))}else if(i.code==n.configConstants.EXCEPTION_CODE)a(t(i.message));else if(i.code==n.configConstants.UNAUTHENTICATE_CODE){var c=i.message;a((o=c,{type:n.configConstants.UNAUTHENTICATE,error:o}))}else a(t(e))}).catch(function(e){a(t(e))})};function t(e){return{type:s.manageCalendarConstants.MANAGE_CALENDAR_NEW_FAILURE,errorMsg:e}}},resetState:function(){return function(e){e({type:s.manageCalendarConstants.MANAGE_CALENDAR_RESET_STATE})}}}},2730:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.manageCalendarService=void 0;var n,r=a(15),o=(n=r)&&n.__esModule?n:{default:n},s=a(8),i=a(10);t.manageCalendarService={getRecord:function(e){return(0,o.default)({method:"POST",url:s.configConstants.API_BASE_PATH+"setting/manage-calendar",data:i.headerHelper.appendUserDataInJson(e),headers:i.headerHelper.getHeaderWithAuthorization()}).then(function(e){return e}).catch(function(e){return e})},doNewSubmit:function(e){return(0,o.default)({method:"POST",url:s.configConstants.API_BASE_PATH+"setting/manage-calendar/save",data:i.headerHelper.getJsonDataToFormData(e),headers:i.headerHelper.getHeaderWithAuthorization("multipart/form-data")}).then(function(e){return e}).catch(function(e){return e})}}}}]);