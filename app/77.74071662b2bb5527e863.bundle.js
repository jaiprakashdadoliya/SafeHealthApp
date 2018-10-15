(window.webpackJsonp=window.webpackJsonp||[]).push([[77],{1975:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.ManageServicesEdit=void 0;var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var r in a)Object.prototype.hasOwnProperty.call(a,r)&&(e[r]=a[r])}return e},s=function(){function e(e,t){for(var a=0;a<t.length;a++){var r=t[a];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,a,r){return a&&e(t.prototype,a),r&&e(t,r),t}}(),i=u(a(1)),n=a(43),l=a(36),c=u(a(115)),o=(a(10),a(54)),d=a(116);function u(e){return e&&e.__esModule?e:{default:e}}function v(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}var f=function(e){function t(e,a){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var r=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,a));return r.handleClose=r.handleClose.bind(r),r.handleSubmit=r.handleSubmit.bind(r),r.handleChange=r.handleChange.bind(r),r.handleSelectChange=r.handleSelectChange.bind(r),r.state={service:r.intialState},r}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,i.default.Component),s(t,[{key:"componentDidUpdate",value:function(){var e=this.props.dispatch;this.props.isUserNotValid&&e(o.headerActions.logout())}},{key:"handleClose",value:function(){this.state.service;this.props.manageServicesEditHideHandle(),(0,this.props.dispatch)(o.doctorServiceActions.resetState()),this.setState({service:this.intialState})}},{key:"handleSubmit",value:function(){if(d.doctorServiceValidator.isServiceValid(this)){var e=this.state.service.detail;(0,this.props.dispatch)(o.doctorServiceActions.serviceUpdate(e,this.props.services))}}},{key:"handleChange",value:function(e){var t=e.target,a=t.name,s=t.value,i=this.state.service,n=i.detail,l=i.validate;this.setState({service:{validate:r({},l,v({},a,{isValid:!0,message:""})),detail:r({},n,v({},a,s))}})}},{key:"handleSelectChange",value:function(e,t){var a=this.state.service,s=a.detail,i=a.validate;this.setState({service:{detail:r({},s,v({},t,e.value)),validate:r({},i,v({},t,{isValid:!0,message:""}))}})}},{key:"componentWillReceiveProps",value:function(e){var t={};for(var a in e.updatedData&&this.props.editSuccessMessage?t=e.updatedData:e.serviceData&&!this.props.editSuccessMessage&&(t=e.serviceData),t)this.state.service.detail[a]=null!=t[a]?String(t[a]):"";e.editSuccessMessage&&setTimeout(function(){this.handleClose()}.bind(this),1500)}},{key:"render",value:function(){var e=this;return i.default.createElement("div",null,i.default.createElement(n.Modal,{show:this.props.manageServicesShow,onHide:this.handleClose},i.default.createElement(n.Modal.Header,{closeButton:!0},i.default.createElement(n.Modal.Title,null,"Edit Service")),this.props.editSuccessMessage&&i.default.createElement(n.Alert,{bsStyle:"success"},this.props.editSuccessMessage),this.props.editErrorMsg&&i.default.createElement(n.Alert,{bsStyle:"danger"},this.props.editErrorMsg),i.default.createElement(n.Modal.Body,null,i.default.createElement("div",{className:"row"},i.default.createElement("div",{className:"col-md-6"},i.default.createElement("div",{className:this.state.service.validate.srv_name.isValid?"form-group":"form-group has-error"},i.default.createElement("input",{className:"form-control",type:"text",name:"srv_name",id:"service_name",onChange:this.handleChange,value:this.state.service.detail.srv_name}),i.default.createElement("label",{className:"control-label"},"Service Name"),i.default.createElement("span",{className:"help-block"},this.state.service.validate.srv_name.message))),i.default.createElement("div",{className:"col-md-6"},i.default.createElement("div",{className:this.state.service.validate.srv_cost.isValid?"form-group":"form-group has-error"},i.default.createElement("input",{className:"form-control",type:"text",name:"srv_cost",id:"service_cost",onChange:this.handleChange,value:this.state.service.detail.srv_cost}),i.default.createElement("label",{className:"control-label"},"Service Cost (INR)"),i.default.createElement("span",{className:"help-block"},this.state.service.validate.srv_cost.message))),i.default.createElement("div",{className:"col-md-6"},i.default.createElement("div",{className:this.state.service.validate.srv_duration.isValid?"form-group":"form-group has-error"},i.default.createElement("input",{className:"form-control",type:"text",name:"srv_duration",id:"service_duration",onChange:this.handleChange,value:this.state.service.detail.srv_duration}),i.default.createElement("label",{className:"control-label"},"Service Duration"),i.default.createElement("span",{className:"help-block"},this.state.service.validate.srv_duration.message))),i.default.createElement("div",{className:"col-md-6"},i.default.createElement("div",{className:this.state.service.validate.srv_unit.isValid?"form-group":"form-group has-error"},i.default.createElement(c.default,{name:"srv_unit",className:"custom-select",value:this.state.service.detail.srv_unit,clearable:!1,placeholder:"Select Unit",onChange:function(t,a){return e.handleSelectChange(t,"srv_unit")},options:[{value:"1",label:"Minute(s)"},{value:"2",label:"Hours(s)"}]}),i.default.createElement("label",{className:"control-label"},"Service Duration Unit"),i.default.createElement("span",{className:"help-block"},this.state.service.validate.srv_unit.message))))),i.default.createElement(n.Modal.Footer,null,i.default.createElement(n.Button,{className:"btn text-btn red",onClick:this.handleClose},"Close"),i.default.createElement(n.Button,{className:"btn text-btn green",onClick:this.handleSubmit,disabled:!!this.props.editSuccessMessage},"Save"))))}},{key:"intialState",get:function(){return{detail:{srv_name:"",srv_cost:"",srv_duration:"",srv_unit:""},validate:{srv_name:{isValid:!0,message:""},srv_cost:{isValid:!0,message:""},srv_duration:{isValid:!0,message:""},srv_unit:{isValid:!0,message:""}}}}}]),t}();var m=(0,l.connect)(function(e){var t=e.doctorService;return{isUserNotValid:t.isUserNotValid,sendingRequest:t.sendingRequest,editSuccessMessage:t.editSuccessMessage,updatedData:t.updatedData,services:t.services,editErrorMsg:t.editErrorMsg}})(f);t.ManageServicesEdit=m},2706:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a(2707);Object.keys(r).forEach(function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(t,e,{enumerable:!0,get:function(){return r[e]}})});var s=a(1975);Object.keys(s).forEach(function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(t,e,{enumerable:!0,get:function(){return s[e]}})})},2707:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.ManageServices=void 0;var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var r in a)Object.prototype.hasOwnProperty.call(a,r)&&(e[r]=a[r])}return e},s=function(){function e(e,t){for(var a=0;a<t.length;a++){var r=t[a];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,a,r){return a&&e(t.prototype,a),r&&e(t,r),t}}(),i=h(a(1)),n=a(43),l=a(36),c=a(803),o=h(a(807));a(804);var d=h(a(115)),u=a(1975),v=a(8),f=a(54),m=a(116);function h(e){return e&&e.__esModule?e:{default:e}}function p(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}var g=function(e){function t(e,a){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var r=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,a));return r.manageServicesEditShowHandle=r.manageServicesEditShowHandle.bind(r),r.manageServicesEditHideHandle=r.manageServicesEditHideHandle.bind(r),r.handleSave=r.handleSave.bind(r),r.handleChange=r.handleChange.bind(r),r.handleSelectChange=r.handleSelectChange.bind(r),r.serviceDeleteHandle=r.serviceDeleteHandle.bind(r),r.getServicesList=r.getServicesList.bind(r),r.serviceSearch=r.serviceSearch.bind(r),r.state={manageServicesShow:!1,service:r.initialState,editService:r.initialState,filtered:[],filterAll:""},r}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,i.default.Component),s(t,[{key:"getServicesList",value:function(e,t,a,r){(0,this.props.dispatch)(f.doctorServiceActions.serviceList(e,t,a,r))}},{key:"handleChange",value:function(e){var t=e.target,a=t.name,s=t.value,i=this.state.service,n=i.detail,l=i.validate;this.setState({service:{validate:r({},l,p({},a,{isValid:!0,message:""})),detail:r({},n,p({},a,s))}})}},{key:"handleSelectChange",value:function(e,t){var a=this.state.service,s=a.detail,i=a.validate;this.setState({service:{detail:r({},s,p({},t,e.value)),validate:r({},i,p({},t,{isValid:!0,message:""}))}})}},{key:"manageServicesEditShowHandle",value:function(e){var t=this.props.services[e],a=this.state.editService,s=a.detail,i=a.validate;this.setState({editService:{detail:r({},s,{srv_id:t.srv_id,srv_name:t.srv_name,srv_cost:String(t.srv_cost),srv_duration:String(t.srv_duration),srv_unit:t.srv_unit}),validate:r({},i)}}),this.setState({manageServicesShow:!0})}},{key:"handleSave",value:function(){if(m.doctorServiceValidator.isServiceValid(this)){var e=this.state.service.detail;(0,this.props.dispatch)(f.doctorServiceActions.serviceSave(e,this.props.services))}}},{key:"componentWillReceiveProps",value:function(e){(e.addSuccessMessage||e.deleteErrorMsg)&&e.activeKey?setTimeout(function(){this.setState({service:this.initialState}),(0,this.props.dispatch)(f.doctorServiceActions.resetState())}.bind(this),1500):e.addErrorMsg&&e.activeKey&&setTimeout(function(){(0,this.props.dispatch)(f.doctorServiceActions.resetState())}.bind(this),1500)}},{key:"manageServicesEditHideHandle",value:function(){this.setState({manageServicesShow:!1})}},{key:"serviceDeleteHandle",value:function(e){var t=this;(0,c.confirmAlert)({title:"Service delete",message:"Are you sure you want to delete this service?",buttons:[{label:"Yes",onClick:function(){(0,t.props.dispatch)(f.doctorServiceActions.serviceDelete(e,t.props.services))}},{label:"No",onClick:function(){return!1}}]})}},{key:"serviceSearch",value:function(e){var t=e.target.value,a=[{id:"all",value:t}];this.setState({filterAll:t,filtered:a})}},{key:"render",value:function(){var e,t=this;return i.default.createElement("div",null,i.default.createElement(u.ManageServicesEdit,{manageServicesShow:this.state.manageServicesShow,manageServicesEditHideHandle:this.manageServicesEditHideHandle,serviceData:this.state.editService.detail,services:this.props.services}),this.props.addSuccessMessage&&i.default.createElement(n.Alert,{bsStyle:"success"},this.props.addSuccessMessage),this.props.deleteErrorMsg&&i.default.createElement(n.Alert,{bsStyle:"danger"},this.props.deleteErrorMsg),this.props.addErrorMsg&&i.default.createElement(n.Alert,{bsStyle:"danger"},this.props.addErrorMsg),i.default.createElement("div",{className:"col-md-12"},i.default.createElement("h4",null,"Services")),i.default.createElement("div",{className:"col-md-3"},i.default.createElement("div",{className:"form-group"},i.default.createElement("div",{className:this.state.service.validate.srv_name.isValid?"form-group":"form-group has-error"},i.default.createElement("input",{className:"form-control",type:"text",name:"srv_name",id:"service_name",onChange:this.handleChange,value:this.state.service.detail.srv_name}),i.default.createElement("label",{className:"control-label"},"Service Name"),i.default.createElement("span",{className:"help-block"},this.state.service.validate.srv_name.message)))),i.default.createElement("div",{className:"col-md-3"},i.default.createElement("div",{className:this.state.service.validate.srv_cost.isValid?"form-group":"form-group has-error"},i.default.createElement("input",{className:"form-control",type:"text",name:"srv_cost",id:"service_cost",onChange:this.handleChange,value:this.state.service.detail.srv_cost}),i.default.createElement("label",{className:"control-label"},"Service Cost (INR)"),i.default.createElement("span",{className:"help-block"},this.state.service.validate.srv_cost.message))),i.default.createElement("div",{className:"col-md-2"},i.default.createElement("div",{className:this.state.service.validate.srv_duration.isValid?"form-group":"form-group has-error"},i.default.createElement("input",{className:"form-control",type:"text",name:"srv_duration",id:"service_duration",onChange:this.handleChange,value:this.state.service.detail.srv_duration}),i.default.createElement("label",{className:"control-label"},"Service Duration"),i.default.createElement("span",{className:"help-block"},this.state.service.validate.srv_duration.message))),i.default.createElement("div",{className:"col-md-2"},i.default.createElement("div",{className:this.state.service.validate.srv_unit.isValid?"form-group":"form-group has-error"},i.default.createElement(d.default,{name:"srv_unit",className:"custom-select",value:this.state.service.detail.srv_unit,clearable:!1,placeholder:"Select Unit",onChange:function(e,a){return t.handleSelectChange(e,"srv_unit")},options:[{value:"1",label:"Minute(s)"},{value:"2",label:"Hours(s)"}]}),i.default.createElement("label",{className:"control-label"},"Service Duration Unit"),i.default.createElement("span",{className:"help-block"},this.state.service.validate.srv_unit.message))),i.default.createElement("div",{className:"col-md-2 text-left"},i.default.createElement("div",{className:"form-group"},i.default.createElement("button",{className:"green btn table-btn margin-top-25",id:"dr_pass_change",onClick:this.handleSave,disabled:!!this.props.editSuccessMessage},"Add"))),i.default.createElement("hr",null),i.default.createElement("div",{className:"table-wrap tabel-responsive col-md-12"},i.default.createElement("div",{className:"table-search"},"Search: ",i.default.createElement("input",{value:this.state.filterAll,onChange:this.serviceSearch,className:"table-search-input"})),i.default.createElement(o.default,(p(e={noDataText:"No Service found !!",data:this.props.services,filterable:!0,defaultFilterMethod:function(e,t){return String(t[e.id])===e.value},filtered:this.state.filtered,columns:[{Header:"Service Name",accessor:"srv_name",className:"dataCellClass",filterable:!1,filterMethod:function(e,t){return t[e.id].includes(e.value)}},{Header:"Service Cost (INR)",accessor:"srv_cost",className:"dataCellClass",filterable:!1,filterMethod:function(e,t){return t[e.id].includes(e.value)}},{Header:"Service Duration",accessor:"srv_duration",className:"dataCellClass",filterable:!1,filterMethod:function(e,t){return t[e.id].includes(e.value)},Cell:function(e){return i.default.createElement("div",null,e.original.srv_duration," ",1==e.original.srv_unit?"Miniute":"Hour")}},{Header:"Actions",accessor:"srv_id",filterable:!1,className:"actionCellClass",Cell:function(e){return i.default.createElement("div",null,i.default.createElement("a",{href:"javascript:void(0);",onClick:t.manageServicesEditShowHandle.bind(null,e.index),className:"green btn table-btn"},"Edit"),i.default.createElement("a",{href:"javascript:void(0)",onClick:t.serviceDeleteHandle.bind(null,e.value),className:"red btn table-btn"},"Delete"))}}],defaultSorted:[{id:"srv_name",desc:!0}],defaultPageSize:v.configConstants.PAGE_SIZE,minRows:this.props.services.length,className:"table table-bordered responsive",loading:this.props.loader},"filterable",!0),p(e,"Sorted",!0),p(e,"pages",this.props.pages),p(e,"showPagination",!0),p(e,"showPaginationTop",!0),p(e,"showPaginationBottom",!1),p(e,"pageSizeOptions",[10,20,50,100]),p(e,"manual",!0),p(e,"onFetchData",function(e,a){t.getServicesList(e.page,e.pageSize,e.sorted,e.filtered)}),e))))}},{key:"initialState",get:function(){return{detail:{srv_id:"",srv_name:"",srv_cost:"",srv_duration:"",srv_unit:""},validate:{srv_name:{isValid:!0,message:""},srv_cost:{isValid:!0,message:""},srv_duration:{isValid:!0,message:""},srv_unit:{isValid:!0,message:""}}}}}]),t}();var b=(0,l.connect)(function(e){var t=e.doctorService;return{pages:t.pages,isUserNotValid:t.isUserNotValid,services:t.services,addSuccessMessage:t.addSuccessMessage,deleteErrorMsg:t.deleteErrorMsg,addErrorMsg:t.addErrorMsg,loader:t.loader}})(g);t.ManageServices=b},803:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r,s,i=function(){function e(e,t){for(var a=0;a<t.length;a++){var r=t[a];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,a,r){return a&&e(t.prototype,a),r&&e(t,r),t}}();t.confirmAlert=function(e){(function(){var e="http://www.w3.org/2000/svg",t=document.createElementNS(e,"feGaussianBlur");t.setAttribute("stdDeviation","0.7");var a=document.createElementNS(e,"filter");a.setAttribute("id","gaussian-blur"),a.appendChild(t);var r=document.createElementNS(e,"svg");r.setAttribute("id","react-confirm-alert-firm-svg"),r.setAttribute("class","react-confirm-alert-svg"),r.appendChild(a),document.body.appendChild(r)})(),function(e){document.body.children[0].classList.add("react-confirm-alert-blur");var t=document.createElement("div");t.id="react-confirm-alert",document.body.appendChild(t),(0,o.render)(l.default.createElement(v,e),t)}(e)};var n=a(1),l=d(n),c=d(a(0)),o=a(13);function d(e){return e&&e.__esModule?e:{default:e}}function u(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}var v=(s=r=function(e){function t(){var e,a,r;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);for(var s=arguments.length,i=Array(s),n=0;n<s;n++)i[n]=arguments[n];return a=r=u(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(i))),r.handleClickButton=function(e){e.onClick&&e.onClick(),r.close()},r.close=function(){var e,t;e=document.getElementById("react-confirm-alert"),(0,o.unmountComponentAtNode)(e),e.parentNode.removeChild(e),(t=document.getElementById("react-confirm-alert-firm-svg")).parentNode.removeChild(t),document.body.children[0].classList.remove("react-confirm-alert-blur")},r.componentWillUnmount=function(){r.props.willUnmount()},r.renderCustomUI=function(){var e=r.props,t=e.title,a=e.message;return(0,e.customUI)({title:t,message:a,onClose:r.close})},u(r,a)}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,n.Component),i(t,[{key:"render",value:function(){var e=this,t=this.props,a=t.title,r=t.message,s=t.buttons,i=t.childrenElement,n=t.customUI;return l.default.createElement("div",{className:"react-confirm-alert-overlay"},l.default.createElement("div",{className:"react-confirm-alert"},n?this.renderCustomUI():l.default.createElement("div",{className:"react-confirm-alert-body"},a&&l.default.createElement("h1",null,a),r,i(),l.default.createElement("div",{className:"react-confirm-alert-button-group"},s.map(function(t,a){return l.default.createElement("button",{key:a,onClick:function(){return e.handleClickButton(t)}},t.label)})))))}}]),t}(),r.propTypes={title:c.default.string,message:c.default.string,buttons:c.default.array.isRequired,childrenElement:c.default.func,customUI:c.default.func,willUnmount:c.default.func},r.defaultProps={buttons:[{label:"Cancel",onClick:function(){return null}},{label:"Confirm",onClick:function(){return null}}],childrenElement:function(){return null},willUnmount:function(){return null}},s);t.default=v},804:function(e,t,a){}}]);