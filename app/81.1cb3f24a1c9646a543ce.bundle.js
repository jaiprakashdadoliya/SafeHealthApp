(window.webpackJsonp=window.webpackJsonp||[]).push([[81],{1981:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.appointmentCategoryActions=void 0;var a=n(8),o=n(339),r=n(2722),i=n(10);t.appointmentCategoryActions={getList:function(e,t,n,i){return function(l){l({type:o.appointmentCategoryConstants.APP_CATE_REQUEST}),r.appointmentCategoryService.getList(e,t,n,i).then(function(e){var t,n,r=e.data;r.code==a.configConstants.SUCCESS_CODE?l((n=r.result,{type:o.appointmentCategoryConstants.APP_CATE_SUCCESS,appointmentCategoryList:n})):r.code==a.configConstants.ERROR_CODE?l(s(r.message)):r.code==a.configConstants.EXCEPTION_CODE?l(s(r.message)):r.code==a.configConstants.UNAUTHENTICATE_CODE?l((t=r.message,{type:a.configConstants.UNAUTHENTICATE,error:t})):l(s(e))}).catch(function(e){l(s(e))})};function s(e){return{type:o.appointmentCategoryConstants.APP_CATE_FAILURE,errorMsg:e}}},doSave:function(e){return function(n){n({type:o.appointmentCategoryConstants.APP_CATE_ADD_REQUEST}),r.appointmentCategoryService.doSave(e).then(function(e){var r,s=e.data;if(s.code==a.configConstants.SUCCESS_CODE){var l={message:s.message,detail:s.result};n(function(e){return{type:o.appointmentCategoryConstants.APP_CATE_ADD_SUCCESS,categoryResult:e}}(l))}else if(s.code==a.configConstants.ERROR_CODE){var c=i.utilityHelper.getFirstErrorMessage(s.error);n(t(c))}else s.code==a.configConstants.EXCEPTION_CODE?n(t(s.message)):s.code==a.configConstants.UNAUTHENTICATE_CODE?n((r=s.message,{type:a.configConstants.UNAUTHENTICATE,error:r})):n(t(e))}).catch(function(e){n(t(e))})};function t(e){return{type:o.appointmentCategoryConstants.APP_CATE_ADD_FAILURE,errorMsg:e}}},doUpdate:function(e,t){return function(i){r.appointmentCategoryService.doUpdate(e).then(function(e){var r,s=e.data;if(s.code==a.configConstants.SUCCESS_CODE){var l=t.findIndex(function(e){return e.appointment_cat_id===s.result.appointment_cat_id});t[l]=s.result;var c={message:s.message,detail:s.result,appointmentCategoryList:t};i(function(e){return{type:o.appointmentCategoryConstants.APP_CATE_EDIT_SUCCESS,successMsg:e}}(c))}else s.code==a.configConstants.ERROR_CODE?i(n(s.message)):s.code==a.configConstants.EXCEPTION_CODE?i(n(s.message)):s.code==a.configConstants.UNAUTHENTICATE_CODE?i((r=s.message,{type:a.configConstants.UNAUTHENTICATE,error:r})):i(n(e))}).catch(function(e){i(n(e))})};function n(e){return{type:o.appointmentCategoryConstants.APP_CATE_EDIT_FAILURE,errorMsg:e}}},doDelete:function(e,t){return function(i){i({type:o.appointmentCategoryConstants.APP_CATE_REMOVE_REQUEST}),r.appointmentCategoryService.doDelete(e).then(function(r){var s,l=r.data;if(l.code==a.configConstants.SUCCESS_CODE){t=t.filter(function(t){return t.appointment_cat_id!==e});var c={message:l.message,appointmentCategoryId:e,appointmentCategoryList:t};i(function(e){return{type:o.appointmentCategoryConstants.APP_CATE_REMOVE_SUCCESS,successMsg:e}}(c))}else l.code==a.configConstants.ERROR_CODE?i(n(l.message)):l.code==a.configConstants.EXCEPTION_CODE?i(n(l.message)):l.code==a.configConstants.UNAUTHENTICATE_CODE?i((s=l.message,{type:a.configConstants.UNAUTHENTICATE,error:s})):i(n(r))}).catch(function(e){i(n(e))})};function n(e){return{type:o.appointmentCategoryConstants.APP_CATE_REMOVE_FAILURE,errorMsg:e}}},resetState:function(){return function(e){e({type:o.appointmentCategoryConstants.APP_CATE_RESET_STATE})}}}},1982:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.AppointmentCategoryEdit=void 0;var a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},o=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),r=u(n(1)),i=(n(21),u(n(15)),u(n(115)),u(n(807)),n(36)),s=n(43),l=n(54),c=n(1981),p=(n(8),n(1983));function u(e){return e&&e.__esModule?e:{default:e}}function d(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var m=function(e){function t(e,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var a=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,n));return a.handleClose=a.handleClose.bind(a),a.handleSubmit=a.handleSubmit.bind(a),a.handleChange=a.handleChange.bind(a),a.handleSelectChange=a.handleSelectChange.bind(a),a.state={appointmentCategory:{detail:{appointment_cat_name:""},validate:{appointment_cat_name:{isValid:!0,message:""}}}},a}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,r.default.Component),o(t,[{key:"componentDidUpdate",value:function(){var e=this.props.dispatch;this.props.isUserNotValid&&e(l.headerActions.logout())}},{key:"handleClose",value:function(){this.props.appointmentCategoryEditHideHandle(),(0,this.props.dispatch)(c.appointmentCategoryActions.resetState())}},{key:"handleSubmit",value:function(){if(p.appointmentCategoryValidator.isCategoryValid(this)){var e=this.state.appointmentCategory.detail;(0,this.props.dispatch)(c.appointmentCategoryActions.doUpdate(e,this.props.appointmentCategoryList))}}},{key:"handleChange",value:function(e){var t=e.target,n=t.name,o=t.value,r=this.state.appointmentCategory,i=r.detail,s=r.validate;this.setState({appointmentCategory:{validate:a({},s,d({},n,{isValid:!0,message:""})),detail:a({},i,d({},n,o))}})}},{key:"handleSelectChange",value:function(e,t){var n=this.state.appointmentCategory,o=n.detail,r=n.validate;this.setState({appointmentCategory:{detail:a({},o,d({},t,e.value)),validate:a({},r,d({},t,{isValid:!0,message:""}))}})}},{key:"componentWillReceiveProps",value:function(e){var t={};for(var n in e.updatedData?t=e.updatedData:e.appointmentCategory&&(t=e.appointmentCategory),t)this.state.appointmentCategory.detail[n]=null!=t[n]?t[n]:"";e.editSuccessMessage&&setTimeout(function(){this.handleClose()}.bind(this),1500)}},{key:"render",value:function(){return r.default.createElement("div",null,r.default.createElement(s.Modal,{show:this.props.appointmentCategoryShow,onHide:this.handleClose,backdrop:"static",keyboard:!1},r.default.createElement(s.Modal.Header,{closeButton:!0},r.default.createElement(s.Modal.Title,null,"Edit appointment category")),this.props.editSuccessMessage&&r.default.createElement(s.Alert,{bsStyle:"success"},this.props.editSuccessMessage),this.props.editErrorMsg&&r.default.createElement(s.Alert,{bsStyle:"danger"},this.props.editErrorMsg),r.default.createElement(s.Modal.Body,null,r.default.createElement("div",{className:"row"},r.default.createElement("div",{className:"col-md-6"},r.default.createElement("div",{className:this.state.appointmentCategory.validate.appointment_cat_name.isValid?"form-group":"form-group has-error"},r.default.createElement("input",{className:"form-control",type:"text",name:"appointment_cat_name",id:"appointment_cat_name",onChange:this.handleChange,value:this.state.appointmentCategory.detail.appointment_cat_name}),r.default.createElement("label",{className:"control-label"},"Appointment category"),r.default.createElement("span",{className:"help-block"},this.state.appointmentCategory.validate.appointment_cat_name.message))))),r.default.createElement(s.Modal.Footer,null,r.default.createElement(s.Button,{className:"btn text-btn red",onClick:this.handleClose},"Close"),r.default.createElement(s.Button,{className:"btn text-btn green",onClick:this.handleSubmit,disabled:!!this.props.editSuccessMessage},"Save"))))}}]),t}();var f=(0,i.connect)(function(e){var t=e.appointmentCategory;return{isUserNotValid:t.isUserNotValid,sendingRequest:t.sendingRequest,editSuccessMessage:t.editSuccessMessage,updatedData:t.updatedData,appointmentCategoryList:t.appointmentCategoryList,editErrorMsg:t.editErrorMsg}})(m);t.AppointmentCategoryEdit=f},1983:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.appointmentCategoryValidator=void 0;var a,o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},r=n(19),i=(a=r)&&a.__esModule?a:{default:a},s=n(10);t.appointmentCategoryValidator={isCategoryValid:function(e){var t=e.state.appointmentCategory,n=t.detail,a=t.validate,r={};i.default.isEmpty(i.default.trim(n.appointment_cat_name))&&(r.appointment_cat_name={isValid:!1,message:"Appointment Category is required."});return!!s.utilityHelper.isObjectEmpty(r)||(e.setState({appointmentCategory:{detail:o({},n),validate:o({},a,r)}}),!1)}}},2720:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(2721);Object.keys(a).forEach(function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(t,e,{enumerable:!0,get:function(){return a[e]}})});var o=n(1982);Object.keys(o).forEach(function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(t,e,{enumerable:!0,get:function(){return o[e]}})})},2721:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.AppointmentCategory=void 0;var a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},o=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),r=f(n(1)),i=(n(21),f(n(15)),f(n(115)),f(n(807))),s=n(803),l=n(36),c=n(43),p=(n(54),n(1981)),u=n(8),d=n(1982),m=n(1983);function f(e){return e&&e.__esModule?e:{default:e}}function g(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var C=function(e){function t(e,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var a=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,n));return a.appointmentCategoryEditShowHandle=a.appointmentCategoryEditShowHandle.bind(a),a.appointmentCategoryEditHideHandle=a.appointmentCategoryEditHideHandle.bind(a),a.handleSave=a.handleSave.bind(a),a.handleChange=a.handleChange.bind(a),a.handleSelectChange=a.handleSelectChange.bind(a),a.appointmentCategoryDeleteHandle=a.appointmentCategoryDeleteHandle.bind(a),a.getAppointmentCategoryList=a.getAppointmentCategoryList.bind(a),a.appointmentCategorySearch=a.appointmentCategorySearch.bind(a),a.state={appointmentCategoryShow:!1,appointmentCategory:a.initialState,editappointmentCategory:a.initialState,filtered:[],filterAll:""},a}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,r.default.Component),o(t,[{key:"getAppointmentCategoryList",value:function(e,t,n,a){(0,this.props.dispatch)(p.appointmentCategoryActions.getList(e,t,n,a))}},{key:"handleChange",value:function(e){var t=e.target,n=t.name,o=t.value,r=this.state.appointmentCategory,i=r.detail,s=r.validate;this.setState({appointmentCategory:{validate:a({},s,g({},n,{isValid:!0,message:""})),detail:a({},i,g({},n,o))}})}},{key:"handleSelectChange",value:function(e,t){var n=this.state.appointmentCategory,o=n.detail,r=n.validate;this.setState({appointmentCategory:{detail:a({},o,g({},t,e.value)),validate:a({},r,g({},t,{isValid:!0,message:""}))}})}},{key:"appointmentCategoryEditShowHandle",value:function(e){var t=this.props.appointmentCategoryList[e],n=this.state.editappointmentCategory,o=n.detail,r=n.validate;this.setState({editappointmentCategory:{detail:a({},o,{appointment_cat_id:t.appointment_cat_id,appointment_cat_name:t.appointment_cat_name}),validate:a({},r)}}),this.setState({appointmentCategoryShow:!0})}},{key:"handleSave",value:function(){if(m.appointmentCategoryValidator.isCategoryValid(this)){var e=this.state.appointmentCategory.detail;(0,this.props.dispatch)(p.appointmentCategoryActions.doSave(e))}}},{key:"componentWillReceiveProps",value:function(e){(e.addSuccessMessage||e.deleteErrorMsg)&&e.activeKey?setTimeout(function(){this.setState({appointmentCategory:this.initialState}),(0,this.props.dispatch)(p.appointmentCategoryActions.resetState())}.bind(this),1500):e.addErrorMsg&&e.activeKey&&setTimeout(function(){(0,this.props.dispatch)(p.appointmentCategoryActions.resetState())}.bind(this),1500)}},{key:"appointmentCategoryEditHideHandle",value:function(){this.setState({appointmentCategoryShow:!1})}},{key:"appointmentCategoryDeleteHandle",value:function(e){var t=this;(0,s.confirmAlert)({title:"Delete Appointment Category",message:"Are you sure you want to delete this category?",buttons:[{label:"Yes",onClick:function(){(0,t.props.dispatch)(p.appointmentCategoryActions.doDelete(e,t.props.appointmentCategoryList))}},{label:"No",onClick:function(){return!1}}]})}},{key:"appointmentCategorySearch",value:function(e){var t=e.target.value,n=[{id:"all",value:t}];this.setState({filterAll:t,filtered:n})}},{key:"render",value:function(){var e,t=this;return r.default.createElement("div",null,r.default.createElement(d.AppointmentCategoryEdit,{appointmentCategoryShow:this.state.appointmentCategoryShow,appointmentCategoryEditHideHandle:this.appointmentCategoryEditHideHandle,appointmentCategory:this.state.editappointmentCategory.detail,appointmentCategoryList:this.props.appointmentCategoryList}),this.props.addSuccessMessage&&r.default.createElement(c.Alert,{bsStyle:"success"},this.props.addSuccessMessage),this.props.deleteErrorMsg&&r.default.createElement(c.Alert,{bsStyle:"danger"},this.props.deleteErrorMsg),this.props.addErrorMsg&&r.default.createElement(c.Alert,{bsStyle:"danger"},this.props.addErrorMsg),r.default.createElement("div",{className:"col-md-12"},r.default.createElement("h4",null,"Appointment Category")),r.default.createElement("div",{className:"col-md-3"},r.default.createElement("div",{className:"form-group"},r.default.createElement("div",{className:this.state.appointmentCategory.validate.appointment_cat_name.isValid?"form-group":"form-group has-error"},r.default.createElement("input",{className:"form-control",type:"text",name:"appointment_cat_name",id:"appointment_cat_name",onChange:this.handleChange,value:this.state.appointmentCategory.detail.appointment_cat_name}),r.default.createElement("span",{className:"help-block"},this.state.appointmentCategory.validate.appointment_cat_name.message)))),r.default.createElement("div",{className:"col-md-2 text-left"},r.default.createElement("div",{className:"form-group"},r.default.createElement("button",{className:"green btn table-btn",id:"dr_pass_change",onClick:this.handleSave,disabled:!!this.props.editSuccessMessage},"Add"))),r.default.createElement("hr",null),r.default.createElement("div",{className:"table-wrap tabel-responsive col-md-12"},r.default.createElement("div",{className:"table-search"},"Search: ",r.default.createElement("input",{value:this.state.filterAll,onChange:this.appointmentCategorySearch,className:"table-search-input"})),r.default.createElement(i.default,(g(e={noDataText:"No appointment category found !!",data:this.props.appointmentCategoryList,filterable:!0,defaultFilterMethod:function(e,t){return String(t[e.id])===e.value},filtered:this.state.filtered,columns:[{Header:"Appointment Category",accessor:"appointment_cat_name",className:"dataCellClass",filterable:!1,filterMethod:function(e,t){return t[e.id].includes(e.value)}},{Header:"Actions",accessor:"appointment_cat_id",filterable:!1,className:"actionCellClass",Cell:function(e){return r.default.createElement("div",null,r.default.createElement("a",{href:"javascript:void(0);",onClick:t.appointmentCategoryEditShowHandle.bind(null,e.index),className:"green btn table-btn"},"Edit"),r.default.createElement("a",{href:"javascript:void(0)",onClick:t.appointmentCategoryDeleteHandle.bind(null,e.value),className:"red btn table-btn"},"Delete"))}}],defaultSorted:[{id:"appointment_cat_name",desc:!0}],defaultPageSize:u.configConstants.PAGE_SIZE,minRows:this.props.appointmentCategoryList.length,className:"table table-bordered responsive",loading:this.props.loader},"filterable",!0),g(e,"Sorted",!0),g(e,"pages",this.props.pages),g(e,"showPagination",!0),g(e,"showPaginationTop",!0),g(e,"showPaginationBottom",!1),g(e,"pageSizeOptions",[1,2,3,4,5,6]),g(e,"manual",!0),g(e,"onFetchData",function(e,n){t.getAppointmentCategoryList(e.page,e.pageSize,e.sorted,e.filtered)}),e))))}},{key:"initialState",get:function(){return{detail:{appointment_cat_id:"",appointment_cat_name:""},validate:{appointment_cat_id:{isValid:!0,message:""},appointment_cat_name:{isValid:!0,message:""}}}}}]),t}();var y=(0,l.connect)(function(e){var t=e.appointmentCategory;return{pages:t.pages,isUserNotValid:t.isUserNotValid,appointmentCategoryList:t.appointmentCategoryList,addSuccessMessage:t.addSuccessMessage,deleteErrorMsg:t.deleteErrorMsg,addErrorMsg:t.addErrorMsg,loader:t.loader}})(C);t.AppointmentCategory=y},2722:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.appointmentCategoryService=void 0;var a,o=n(15),r=(a=o)&&a.__esModule?a:{default:a},i=n(8),s=n(10);t.appointmentCategoryService={getList:function(e,t,n,a){return(0,r.default)({method:"post",url:i.configConstants.API_BASE_PATH+"appointment/category/list",data:{page:e,pageSize:t,sorted:n,filtered:a},headers:{Authorization:"Bearer "+s.utilityHelper.getLoginAccessToken()}}).then(function(e){return e}).catch(function(e){return e})},doUpdate:function(e){return(0,r.default)({method:"put",url:i.configConstants.API_BASE_PATH+"appointment/category/update",data:e,headers:{"Content-Type":"application/json",Authorization:"Bearer "+s.utilityHelper.getLoginAccessToken()}}).then(function(e){return e}).catch(function(e){return e})},doSave:function(e){return(0,r.default)({method:"post",url:i.configConstants.API_BASE_PATH+"appointment/category/insert",data:e,headers:{"Content-Type":"application/json",Authorization:"Bearer "+s.utilityHelper.getLoginAccessToken()}}).then(function(e){return e}).catch(function(e){return e})},doDelete:function(e){var t={appointment_cat_id:e};return(0,r.default)({method:"delete",url:i.configConstants.API_BASE_PATH+"appointment/category/delete",headers:s.headerHelper.getHeaderWithAuthorization(),data:s.headerHelper.appendUserDataInJson(t)}).then(function(e){return e}).catch(function(e){return e})}}},803:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a,o,r=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}();t.confirmAlert=function(e){(function(){var e="http://www.w3.org/2000/svg",t=document.createElementNS(e,"feGaussianBlur");t.setAttribute("stdDeviation","0.7");var n=document.createElementNS(e,"filter");n.setAttribute("id","gaussian-blur"),n.appendChild(t);var a=document.createElementNS(e,"svg");a.setAttribute("id","react-confirm-alert-firm-svg"),a.setAttribute("class","react-confirm-alert-svg"),a.appendChild(n),document.body.appendChild(a)})(),function(e){document.body.children[0].classList.add("react-confirm-alert-blur");var t=document.createElement("div");t.id="react-confirm-alert",document.body.appendChild(t),(0,c.render)(s.default.createElement(d,e),t)}(e)};var i=n(1),s=p(i),l=p(n(0)),c=n(13);function p(e){return e&&e.__esModule?e:{default:e}}function u(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}var d=(o=a=function(e){function t(){var e,n,a;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);for(var o=arguments.length,r=Array(o),i=0;i<o;i++)r[i]=arguments[i];return n=a=u(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(r))),a.handleClickButton=function(e){e.onClick&&e.onClick(),a.close()},a.close=function(){var e,t;e=document.getElementById("react-confirm-alert"),(0,c.unmountComponentAtNode)(e),e.parentNode.removeChild(e),(t=document.getElementById("react-confirm-alert-firm-svg")).parentNode.removeChild(t),document.body.children[0].classList.remove("react-confirm-alert-blur")},a.componentWillUnmount=function(){a.props.willUnmount()},a.renderCustomUI=function(){var e=a.props,t=e.title,n=e.message;return(0,e.customUI)({title:t,message:n,onClose:a.close})},u(a,n)}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,i.Component),r(t,[{key:"render",value:function(){var e=this,t=this.props,n=t.title,a=t.message,o=t.buttons,r=t.childrenElement,i=t.customUI;return s.default.createElement("div",{className:"react-confirm-alert-overlay"},s.default.createElement("div",{className:"react-confirm-alert"},i?this.renderCustomUI():s.default.createElement("div",{className:"react-confirm-alert-body"},n&&s.default.createElement("h1",null,n),a,r(),s.default.createElement("div",{className:"react-confirm-alert-button-group"},o.map(function(t,n){return s.default.createElement("button",{key:n,onClick:function(){return e.handleClickButton(t)}},t.label)})))))}}]),t}(),a.propTypes={title:l.default.string,message:l.default.string,buttons:l.default.array.isRequired,childrenElement:l.default.func,customUI:l.default.func,willUnmount:l.default.func},a.defaultProps={buttons:[{label:"Cancel",onClick:function(){return null}},{label:"Confirm",onClick:function(){return null}}],childrenElement:function(){return null},willUnmount:function(){return null}},o);t.default=d}}]);