(window.webpackJsonp=window.webpackJsonp||[]).push([[36,5,6],{1881:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.ManageStaff=void 0;var l=o(a(1)),n=(a(43),a(1882)),r=(a(10),o(a(807)));a(804);var s=a(810),i=a(813);function o(e){return e&&e.__esModule?e:{default:e}}function u(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}t.ManageStaff=function(e){var t;return l.default.createElement("div",{className:"page-container"},l.default.createElement(i.SideMenu,null),l.default.createElement(s.HeaderContainer,{history:e.history}),l.default.createElement(n.SaveStaffContainer,{saveStaffHideHandle:e.saveStaffHideHandle,saveStaffShow:e.saveStaffShow,staffEditDetail:e.staffDetail}),l.default.createElement("div",{className:"main-content"},l.default.createElement("div",{className:"col-md-12"},l.default.createElement("div",{className:"wrap-inner-content"},l.default.createElement("div",{className:"inner-content"},l.default.createElement("div",{className:"row page-header"},l.default.createElement("div",{className:"col-md-6 col-sm-6"},l.default.createElement("h2",null,"Manage Staff")),l.default.createElement("div",{className:"col-md-6 col-sm-6 text-right"},l.default.createElement("button",{onClick:e.saveStaffShowHandle,className:"btn green text-btn"},"Add staff"))),l.default.createElement("div",{className:"table-wrap"},l.default.createElement("div",{className:"table-search"},l.default.createElement("input",{value:e.filterAll,onChange:e.staffSearch,className:"table-search-input",placeholder:"Search"})),l.default.createElement(r.default,(u(t={noDataText:"No staff found !!",data:e.staffList,filterable:!0,defaultFilterMethod:function(e,t){return String(t[e.id])===e.value},filtered:e.filtered,columns:[{Header:"Staff Name",accessor:"user_firstname",className:"dataCellClass",filterable:!1,filterMethod:function(e,t){return t[e.id].includes(e.value)}},{Header:"Gender",accessor:"user_gender",className:"dataCellClass",filterable:!1,filterMethod:function(e,t){return t[e.id].includes(e.value)},Cell:function(e){return e.original.user_gender}},{Header:"Contact Number",accessor:"user_mobile",className:"dataCellClass",filterable:!1,filterMethod:function(e,t){return t[e.id].includes(e.value)}},{Header:"Role",accessor:"user_type",className:"dataCellClass",filterable:!1,filterMethod:function(e,t){return t[e.id].includes(e.value)},Cell:function(e){return e.original.user_type}},{Header:"Actions",accessor:"doc_staff_id",filterable:!1,className:"actionCellClass",Cell:function(t){return l.default.createElement("div",null,l.default.createElement("a",{href:"javascript:void(0);",onClick:e.saveStaffShowHandle.bind(null,t.original),className:"green btn table-btn"},"Edit"),l.default.createElement("a",{href:"javascript:void(0)",onClick:e.deleteStaffHandle.bind(null,t.original.doc_staff_id),className:"red btn table-btn"},"Delete"))}}],defaultSorted:[{id:"user_firstname",desc:!0}],defaultPageSize:6,minRows:e.staffList.length,className:"table table-bordered responsive",loading:e.loading},"filterable",!0),u(t,"Sorted",!0),u(t,"pages",e.pages),u(t,"showPagination",!0),u(t,"showPaginationTop",!0),u(t,"showPaginationBottom",!1),u(t,"pageSizeOptions",[1,2,3,4,5,6]),u(t,"manual",!0),u(t,"onFetchData",function(t,a){e.getStaffList(t.page,t.pageSize,t.sorted,t.filtered)}),t))))))))}},1882:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.SaveStaffContainer=void 0;var l,n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var l in a)Object.prototype.hasOwnProperty.call(a,l)&&(e[l]=a[l])}return e},r=function(){function e(e,t){for(var a=0;a<t.length;a++){var l=t[a];l.enumerable=l.enumerable||!1,l.configurable=!0,"value"in l&&(l.writable=!0),Object.defineProperty(e,l.key,l)}}return function(t,a,l){return a&&e(t.prototype,a),l&&e(t,l),t}}(),s=a(1),i=(l=s)&&l.__esModule?l:{default:l},o=a(36),u=(a(43),a(10),a(54)),c=a(116),d=a(991);function f(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}var m=function(e){function t(e,a){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var l=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,a));return l.state=l.initialState,l.handleClose=l.handleClose.bind(l),l.handleChange=l.handleChange.bind(l),l.handleSave=l.handleSave.bind(l),l.handleSelectChange=l.handleSelectChange.bind(l),l}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,i.default.Component),r(t,[{key:"handleClose",value:function(){(0,this.props.dispatch)(u.manageStaffActions.resetState()),this.setState(this.initialState),this.props.saveStaffHideHandle()}},{key:"handleChange",value:function(e){var t=e.target,a=t.name,l=t.value,r=this.state.staff,s=r.detail,i=r.validate;this.setState({staff:{validate:n({},i,f({},a,{isValid:!0,message:""})),detail:n({},s,f({},a,l))}})}},{key:"handleSelectChange",value:function(e,t){var a=this.state.staff,l=a.detail,r=a.validate;this.setState({staff:{validate:n({},r,f({},t,{isValid:!0,message:""})),detail:n({},l,f({},t,e.value))}})}},{key:"handleSave",value:function(){if(c.manageStaffValidator.isStaffValid(this)){var e=this.state.staff.detail;(0,this.props.dispatch)(u.manageStaffActions.staffSave(e,this.props.staffList))}}},{key:"componentWillReceiveProps",value:function(e){1==e.isStaffSaved?setTimeout(function(){this.handleClose()}.bind(this),2e3):e.staffEditDetail.doc_staff_id?this.setState({staff:{detail:{doc_staff_id:e.staffEditDetail.doc_staff_id,user_id:e.staffEditDetail.user_id,user_firstname:e.staffEditDetail.user_firstname,user_lastname:e.staffEditDetail.user_lastname,user_gender_id:e.staffEditDetail.user_gender_id,user_mobile:e.staffEditDetail.user_mobile,user_email:e.staffEditDetail.user_email,user_type_id:e.staffEditDetail.user_type_id,user_password:e.staffEditDetail.user_password,user_adhaar_number:e.staffEditDetail.user_adhaar_number,user_country_code:e.staffEditDetail.user_country_code},validate:{user_firstname:{isValid:!0,message:""},user_lastname:{isValid:!0,message:""},user_gender_id:{isValid:!0,message:""},user_mobile:{isValid:!0,message:""},user_email:{isValid:!0,message:""},user_type_id:{isValid:!0,message:""},user_password:{isValid:!0,message:""},user_adhaar_number:{isValid:!0,message:""}}},title:"Edit Staff"}):e.errorMsg||this.setState(this.initialState)}},{key:"render",value:function(){return i.default.createElement("div",null,i.default.createElement(d.SaveStaff,{handleChange:this.handleChange,handleSelectChange:this.handleSelectChange,saveStaffShow:this.props.saveStaffShow,payload:this.state.staff,handleClose:this.handleClose,handleSave:this.handleSave,message:this.props.successMessage,title:this.state.title,isStaffSaved:this.props.isStaffSaved,submitted:this.props.submitted,errorMsg:this.props.errorMsg,staticDatafetched:this.props.staticDatafetched,staticData:this.props.staticData}))}},{key:"initialState",get:function(){return{staff:{detail:{doc_staff_id:"",user_id:"",user_firstname:"",user_lastname:"",user_gender_id:"",user_mobile:"",user_email:"",user_type_id:"",user_password:"",user_adhaar_number:"",user_country_code:"91"},validate:{user_firstname:{isValid:!0,message:""},user_lastname:{isValid:!0,message:""},user_gender_id:{isValid:!0,message:""},user_mobile:{isValid:!0,message:""},user_email:{isValid:!0,message:""},user_type_id:{isValid:!0,message:""},user_password:{isValid:!0,message:""},user_adhaar_number:{isValid:!0,message:""}}},title:"Add Staff"}}}]),t}();var p=(0,o.connect)(function(e){var t=e.manageStaff,a=t.successMessage,l=t.sendingRequest,n=t.submitted,r=t.staffList,s=t.errorMsg,i=e.manageStaff.isStaffSaved,o=e.staticData;return{successMessage:a,sendingRequest:l,isStaffSaved:i,submitted:n,staffList:r,errorMsg:s,staticDatafetched:o.staticDatafetched,staticData:o.staticData}})(m);t.SaveStaffContainer=p},2417:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.ManageStaffContainer=void 0;var l,n=function(){function e(e,t){for(var a=0;a<t.length;a++){var l=t[a];l.enumerable=l.enumerable||!1,l.configurable=!0,"value"in l&&(l.writable=!0),Object.defineProperty(e,l.key,l)}}return function(t,a,l){return a&&e(t.prototype,a),l&&e(t,l),t}}(),r=a(1),s=(l=r)&&l.__esModule?l:{default:l},i=a(36),o=(a(10),a(24),a(123),a(8),a(1881)),u=(a(991),a(21),a(803)),c=a(54);var d=function(e){function t(e,a){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var l=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,a));return l.saveStaffShowHandle=l.saveStaffShowHandle.bind(l),l.saveStaffHideHandle=l.saveStaffHideHandle.bind(l),l.deleteStaffHandle=l.deleteStaffHandle.bind(l),l.getStaffList=l.getStaffList.bind(l),l.staffSearch=l.staffSearch.bind(l),l.state=l.initialState,l}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,s.default.Component),n(t,[{key:"componentDidMount",value:function(){(0,this.props.dispatch)(c.staticDataActions.getStaticData())}},{key:"saveStaffShowHandle",value:function(e){this.setState({saveStaffShow:!0}),null!=e.doc_staff_id?this.setState({staffDetail:{doc_staff_id:String(e.doc_staff_id),user_id:String(e.user_id),user_firstname:String(e.user_firstname),user_lastname:String(e.user_lastname),user_gender_id:String(e.user_gender_id),user_mobile:String(e.user_mobile),user_email:String(e.user_email),user_type_id:String(e.user_type_id),user_password:String(e.user_password),user_adhaar_number:String(e.user_adhaar_number),user_country_code:"91"},closeForm:!1}):this.setState(this.initialState)}},{key:"saveStaffHideHandle",value:function(){this.setState({saveStaffShow:!1})}},{key:"deleteStaffHandle",value:function(e){var t=this;(0,u.confirmAlert)({title:"Delete Staff",message:"Are you sure you want to delete this staff member?",buttons:[{label:"Yes",onClick:function(){(0,t.props.dispatch)(c.manageStaffActions.staffDelete(e,t.props.staffList)),t.setState(t.initialState)}},{label:"No",onClick:function(){return!1}}]})}},{key:"getStaffList",value:function(e,t,a,l){(0,this.props.dispatch)(c.manageStaffActions.staffList(e,t,a,l))}},{key:"staffSearch",value:function(e){var t=e.target.value,a=[{id:"all",value:t}];this.setState({filterAll:t,filtered:a})}},{key:"render",value:function(){return s.default.createElement(o.ManageStaff,{saveStaffShowHandle:this.saveStaffShowHandle,saveStaffHideHandle:this.saveStaffHideHandle,saveStaffShow:this.state.saveStaffShow,staffDetail:this.state.staffDetail,deleteStaffHandle:this.deleteStaffHandle,staffList:this.props.staffList,history:this.props.history,loaderMessage:this.props.loader,loading:this.props.loading,pages:this.props.pages,getStaffList:this.getStaffList,filterAll:this.state.filterAll,filtered:this.state.filtered,staffSearch:this.staffSearch})}},{key:"initialState",get:function(){return{staffDetail:{doc_staff_id:"",user_id:"",user_firstname:"",user_lastname:"",user_gender_id:"",user_mobile:"",user_email:"",user_type_id:"",user_password:"",user_adhaar_number:"",user_country_code:"91"},loading:!1,pages:0}}}]),t}();var f=(0,i.connect)(function(e){var t=e.manageStaff,a=t.pages;return{staffList:t.staffList,pages:a,loader:t.loader}})(d);t.ManageStaffContainer=f},795:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=a(1881);Object.keys(l).forEach(function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(t,e,{enumerable:!0,get:function(){return l[e]}})});var n=a(2417);Object.keys(n).forEach(function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(t,e,{enumerable:!0,get:function(){return n[e]}})});var r=a(991);Object.keys(r).forEach(function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(t,e,{enumerable:!0,get:function(){return r[e]}})});var s=a(1882);Object.keys(s).forEach(function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(t,e,{enumerable:!0,get:function(){return s[e]}})})},803:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var l,n,r=function(){function e(e,t){for(var a=0;a<t.length;a++){var l=t[a];l.enumerable=l.enumerable||!1,l.configurable=!0,"value"in l&&(l.writable=!0),Object.defineProperty(e,l.key,l)}}return function(t,a,l){return a&&e(t.prototype,a),l&&e(t,l),t}}();t.confirmAlert=function(e){(function(){var e="http://www.w3.org/2000/svg",t=document.createElementNS(e,"feGaussianBlur");t.setAttribute("stdDeviation","0.7");var a=document.createElementNS(e,"filter");a.setAttribute("id","gaussian-blur"),a.appendChild(t);var l=document.createElementNS(e,"svg");l.setAttribute("id","react-confirm-alert-firm-svg"),l.setAttribute("class","react-confirm-alert-svg"),l.appendChild(a),document.body.appendChild(l)})(),function(e){document.body.children[0].classList.add("react-confirm-alert-blur");var t=document.createElement("div");t.id="react-confirm-alert",document.body.appendChild(t),(0,u.render)(i.default.createElement(f,e),t)}(e)};var s=a(1),i=c(s),o=c(a(0)),u=a(13);function c(e){return e&&e.__esModule?e:{default:e}}function d(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}var f=(n=l=function(e){function t(){var e,a,l;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);for(var n=arguments.length,r=Array(n),s=0;s<n;s++)r[s]=arguments[s];return a=l=d(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(r))),l.handleClickButton=function(e){e.onClick&&e.onClick(),l.close()},l.close=function(){var e,t;e=document.getElementById("react-confirm-alert"),(0,u.unmountComponentAtNode)(e),e.parentNode.removeChild(e),(t=document.getElementById("react-confirm-alert-firm-svg")).parentNode.removeChild(t),document.body.children[0].classList.remove("react-confirm-alert-blur")},l.componentWillUnmount=function(){l.props.willUnmount()},l.renderCustomUI=function(){var e=l.props,t=e.title,a=e.message;return(0,e.customUI)({title:t,message:a,onClose:l.close})},d(l,a)}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,s.Component),r(t,[{key:"render",value:function(){var e=this,t=this.props,a=t.title,l=t.message,n=t.buttons,r=t.childrenElement,s=t.customUI;return i.default.createElement("div",{className:"react-confirm-alert-overlay"},i.default.createElement("div",{className:"react-confirm-alert"},s?this.renderCustomUI():i.default.createElement("div",{className:"react-confirm-alert-body"},a&&i.default.createElement("h1",null,a),l,r(),i.default.createElement("div",{className:"react-confirm-alert-button-group"},n.map(function(t,a){return i.default.createElement("button",{key:a,onClick:function(){return e.handleClickButton(t)}},t.label)})))))}}]),t}(),l.propTypes={title:o.default.string,message:o.default.string,buttons:o.default.array.isRequired,childrenElement:o.default.func,customUI:o.default.func,willUnmount:o.default.func},l.defaultProps={buttons:[{label:"Cancel",onClick:function(){return null}},{label:"Confirm",onClick:function(){return null}}],childrenElement:function(){return null},willUnmount:function(){return null}},n);t.default=f},804:function(e,t,a){},810:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=a(820);Object.keys(l).forEach(function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(t,e,{enumerable:!0,get:function(){return l[e]}})});var n=a(825);Object.keys(n).forEach(function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(t,e,{enumerable:!0,get:function(){return n[e]}})})},813:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=a(828);Object.keys(l).forEach(function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(t,e,{enumerable:!0,get:function(){return l[e]}})})},820:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.Header=void 0;var l,n=a(1),r=(l=n)&&l.__esModule?l:{default:l},s=a(21),i=a(43),o=a(8);t.Header=function(e){var t=e.userType==o.configConstants.USER_TYPE_DOCTOR?"Dr":"",a="";return a=e.userType==o.configConstants.USER_TYPE_DOCTOR?r.default.createElement("li",null,r.default.createElement(s.Link,{to:"/doctorprofile"},"View Profile")):e.userType==o.configConstants.USER_TYPE_PATIENT?r.default.createElement("li",null,r.default.createElement(s.Link,{to:"/dashboard"},"view Profile")):"",r.default.createElement("div",{className:"clearfix top-menu"},r.default.createElement("div",{className:"col-md-12 col-sm-12"},r.default.createElement(i.Nav,{pullRight:!0,className:"user-info"},r.default.createElement(i.NavDropdown,{className:"profile-info",eventKey:1,title:r.default.createElement("div",null,r.default.createElement("img",{className:"img-circle",src:e.loggedInUserImage,alt:"Doctor Photo"}),t," ",e.loggedInUser),id:"doctor-profile-menu"},a,r.default.createElement("li",null,r.default.createElement(s.Link,{to:"/changepassword"},"Change Password")),r.default.createElement(i.MenuItem,{eventKey:1.3,onClick:e.handleLogout},"Logout")))))}},824:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHUAAAAtCAYAAACQ2SQmAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo5MWJiYTFiMC04ZGE1LTg5NGYtOWY3MS0yMjZkNjNlNmViNDciIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QzRBQkM5MDlCNUI1MTFFODgxNEI4MjkzRDRDM0FDQ0UiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QzRBQkM5MDhCNUI1MTFFODgxNEI4MjkzRDRDM0FDQ0UiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ZmZiNDY1NTYtMDEzZi1hNjRjLTgwMzUtNjg1YjhmODhhNWZlIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjkxYmJhMWIwLThkYTUtODk0Zi05ZjcxLTIyNmQ2M2U2ZWI0NyIv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"},825:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.HeaderContainer=void 0;var l=function(){function e(e,t){for(var a=0;a<t.length;a++){var l=t[a];l.enumerable=l.enumerable||!1,l.configurable=!0,"value"in l&&(l.writable=!0),Object.defineProperty(e,l.key,l)}}return function(t,a,l){return a&&e(t.prototype,a),l&&e(t,l),t}}(),n=d(a(1)),r=a(36),s=a(54),i=a(10),o=d(a(296)),u=a(66),c=a(8);function d(e){return e&&e.__esModule?e:{default:e}}var f=(0,o.default)({loader:function(){return Promise.resolve().then(a.t.bind(null,820,7)).then(function(e){return e.Header})},loading:u.Loading}),m=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var a=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e)),l=i.utilityHelper.getUserInfo().user_firstname+" "+i.utilityHelper.getUserInfo().user_lastname,n=i.utilityHelper.getUserInfo().user_type,r="";switch(String(n)){case c.configConstants.USER_TYPE_PATIENT:r=i.utilityHelper.getUserInfo().pat_profile_img;break;case c.configConstants.USER_TYPE_DOCTOR:r=i.utilityHelper.getUserInfo().doc_profile_img;break;default:r=c.configConstants.DEFAULT_IMAGE_PATH}return a.state={loggedInUser:l,loggedInUserImage:""!=r?r:c.configConstants.DEFAULT_IMAGE_PATH},a.handleLogout=a.handleLogout.bind(a),a}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,n.default.Component),l(t,[{key:"handleLogout",value:function(){(0,this.props.dispatch)(s.headerActions.logout())}},{key:"componentWillReceiveProps",value:function(e){var t=i.utilityHelper.getUserInfo().user_type;this.state.loggedInUserImage;void 0!=e.doc_profile_img&&t==c.configConstants.USER_TYPE_DOCTOR?this.setState({loggedInUserImage:e.doc_profile_img}):void 0!=e.user.doc_profile_img&&t==c.configConstants.USER_TYPE_DOCTOR?this.setState({loggedInUserImage:e.user.doc_profile_img}):void 0!=e.pat_profile_img&&t==c.configConstants.USER_TYPE_PATIENT?this.setState({loggedInUserImage:e.pat_profile_img}):void 0!=e.user.pat_profile_img&&t==c.configConstants.USER_TYPE_PATIENT?this.setState({loggedInUserImage:e.user.pat_profile_img}):this.setState({loggedInUserImage:c.configConstants.DEFAULT_IMAGE_PATH})}},{key:"render",value:function(){return n.default.createElement("div",null,n.default.createElement(f,{handleLogout:this.handleLogout,loggedInUser:this.state.loggedInUser,userType:this.props.user.user_type,loggedInUserImage:this.state.loggedInUserImage}))}}]),t}();var p=(0,r.connect)(function(e){var t=e.headerReducer;return{isLogoutDone:t.isLogoutDone,successMsg:t.successMsg,errorMsg:t.errorMsg,doc_profile_img:e.doctorProfile.doc_profile_img,pat_profile_img:e.patientProfile.pat_profile_img,user:e.session.user}})(m);t.HeaderContainer=p},828:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.SideMenu=void 0;var l,n=a(1),r=(l=n)&&l.__esModule?l:{default:l},s=a(21),i=a(66),o=a(80),u=a(10),c=a(8);t.SideMenu=function(e){var t=u.utilityHelper.getUserInfo(),l=t.user_type;return r.default.createElement("div",{className:"sidebar-menu fixed"},r.default.createElement("div",{className:"sidebar-menu-inner"},r.default.createElement("header",{className:"logo-env"},r.default.createElement("div",{className:"logo"},r.default.createElement(s.Link,{to:"/"},r.default.createElement("img",{src:a(824)}))),r.default.createElement("div",{className:"sidebar-collapse"},r.default.createElement("a",{href:"#",className:"sidebar-collapse-icon"},r.default.createElement(i.FontAwesomeIcon,{icon:o.faBars}))),r.default.createElement("div",{className:"sidebar-mobile-menu visible-xs"},r.default.createElement("a",{href:"#",className:"with-animation"},r.default.createElement(i.FontAwesomeIcon,{icon:o.faBars})))),l==c.configConstants.USER_TYPE_PATIENT&&r.default.createElement("ul",{id:"main-menu",className:"main-menu"},r.default.createElement("li",null,r.default.createElement(s.Link,{to:"/dashboard"},r.default.createElement(i.FontAwesomeIcon,{icon:o.faTachometerAlt})," ",r.default.createElement("span",{className:"title"}," Dashboard"))),r.default.createElement("li",null,r.default.createElement(s.Link,{to:"/myprofile/"+t.user_id+"/"+t.visit_id},r.default.createElement(i.FontAwesomeIcon,{icon:o.faCog})," ",r.default.createElement("span",{className:"title"},"My Profile"))),r.default.createElement("li",null,r.default.createElement(s.Link,{to:"/appointments"},r.default.createElement(i.FontAwesomeIcon,{icon:o.faCalendarAlt})," ",r.default.createElement("span",{className:"title"}," Appointments"))),r.default.createElement("li",null,r.default.createElement(s.Link,{to:"/patientallvisit/"+t.user_id},r.default.createElement(i.FontAwesomeIcon,{icon:o.faCog})," ",r.default.createElement("span",{className:"title"},"Visits")))),l==c.configConstants.USER_TYPE_DOCTOR&&r.default.createElement("ul",{id:"main-menu",className:"main-menu"},r.default.createElement("li",null,r.default.createElement(s.Link,{to:"/appointments"},r.default.createElement(i.FontAwesomeIcon,{icon:o.faCalendarAlt})," ",r.default.createElement("span",{className:"title"}," Appointments"))),r.default.createElement("li",null,r.default.createElement(s.Link,{to:"/patientlist"},r.default.createElement(i.FontAwesomeIcon,{icon:o.faUserAlt})," ",r.default.createElement("span",{className:"title"},"Patients"))),r.default.createElement("li",null,r.default.createElement(s.Link,{to:"/payments"},r.default.createElement(i.FontAwesomeIcon,{icon:o.faMoneyCheckAlt})," ",r.default.createElement("span",{className:"title"},"Payments"))),r.default.createElement("li",null,r.default.createElement(s.Link,{to:"/clinics"},r.default.createElement(i.FontAwesomeIcon,{icon:o.faMedkit})," ",r.default.createElement("span",{className:"title"},"Clinics"))),r.default.createElement("li",null,r.default.createElement(s.Link,{to:"/reports"},r.default.createElement(i.FontAwesomeIcon,{icon:o.faChartLine})," ",r.default.createElement("span",{className:"title"},"Reports"))),r.default.createElement("li",null,r.default.createElement(s.Link,{to:"/managestaff"},r.default.createElement(i.FontAwesomeIcon,{icon:o.faUserFriends})," ",r.default.createElement("span",{className:"title"},"Manage Staff"))),r.default.createElement("li",null,r.default.createElement(s.Link,{to:"/setting"},r.default.createElement(i.FontAwesomeIcon,{icon:o.faCog})," ",r.default.createElement("span",{className:"title"},"Setting")))),u.utilityHelper.inArray(l,c.configConstants.USER_TYPE_STAFF)&&r.default.createElement("ul",{id:"main-menu",className:"main-menu"},r.default.createElement("li",null,r.default.createElement(s.Link,{to:"/appointments"},r.default.createElement(i.FontAwesomeIcon,{icon:o.faCalendarAlt})," ",r.default.createElement("span",{className:"title"}," Appointments"))),r.default.createElement("li",null,r.default.createElement(s.Link,{to:"/patientlist"},r.default.createElement(i.FontAwesomeIcon,{icon:o.faUserAlt})," ",r.default.createElement("span",{className:"title"},"Patients"))),r.default.createElement("li",null,r.default.createElement(s.Link,{to:"/clinics"},r.default.createElement(i.FontAwesomeIcon,{icon:o.faMedkit})," ",r.default.createElement("span",{className:"title"},"Clinics"))))))}},991:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.SaveStaff=void 0;var l=i(a(1)),n=a(43),r=a(10),s=i(a(115));function i(e){return e&&e.__esModule?e:{default:e}}t.SaveStaff=function(e){return l.default.createElement("div",null,l.default.createElement(n.Modal,{show:e.saveStaffShow,onHide:e.handleClose,backdrop:"static",keyboard:!1},l.default.createElement(n.Modal.Header,{closeButton:!0},l.default.createElement(n.Modal.Title,null,e.title)),e.message&&l.default.createElement(n.Alert,{bsStyle:"success"},e.message),e.errorMsg&&l.default.createElement(n.Alert,{bsStyle:"danger"},e.errorMsg),l.default.createElement(n.Modal.Body,null,l.default.createElement("div",{className:"row"},l.default.createElement("div",{className:"col-md-6"},l.default.createElement("div",{className:e.payload.validate.user_firstname.isValid?"form-group":"form-group has-error"},l.default.createElement("input",{type:"text",className:"form-control",value:e.payload.detail.user_firstname,name:"user_firstname",onChange:e.handleChange}),l.default.createElement("label",{className:"control-label"},"First Name"),l.default.createElement("span",{className:"help-block"},e.payload.validate.user_firstname.message))),l.default.createElement("div",{className:"col-md-6"},l.default.createElement("div",{className:e.payload.validate.user_lastname.isValid?"form-group":"form-group has-error"},l.default.createElement("input",{type:"text",className:"form-control",value:e.payload.detail.user_lastname,name:"user_lastname",onChange:e.handleChange}),l.default.createElement("label",{className:"control-label"},"Last Name"),l.default.createElement("span",{className:"help-block"},e.payload.validate.user_lastname.message)))),l.default.createElement("div",{className:"row"},l.default.createElement("div",{className:"col-md-6"},l.default.createElement("div",{className:e.payload.validate.user_gender_id.isValid?"form-group":"form-group has-error"},l.default.createElement(s.default,{name:"user_gender_id",className:"custom-select",value:e.payload.detail.user_gender_id,clearable:!1,placeholder:"Select Gender",onChange:function(t,a){return e.handleSelectChange(t,"user_gender_id")},options:r.utilityHelper.getDataConvertToOptionType(e.staticData.gender,"value","id")}),l.default.createElement("label",{className:"control-label"},"Gender"),l.default.createElement("span",{className:"help-block"},e.payload.validate.user_gender_id.message))),l.default.createElement("div",{className:"col-md-6"},l.default.createElement("label",{className:"control-label"},"Mobile Number"),l.default.createElement("div",{className:"row"},l.default.createElement("div",{className:"col-xs-3 col-md-3 rpr"},l.default.createElement("div",{className:"form-group"},l.default.createElement(s.default,{name:"user_country_code",className:"custom-select country-code",onChange:e.handleCountryCodeChange,clearable:!1,value:e.payload.detail.user_country_code,options:[{value:"91",label:"+91"},{value:"92",label:"+92"},{value:"93",label:"+93"},{value:"94",label:"+94"}]}))),l.default.createElement("div",{className:"col-xs-9 col-md-9 rpl"},l.default.createElement("div",{className:e.payload.validate.user_mobile.isValid?"form-group":"form-group has-error"},l.default.createElement("input",{type:"text",className:"form-control",value:e.payload.detail.user_mobile,name:"user_mobile",onChange:e.handleChange}),l.default.createElement("span",{className:"help-block"},e.payload.validate.user_mobile.message)))))),l.default.createElement("div",{className:"row"},l.default.createElement("div",{className:"col-md-6"},l.default.createElement("div",{className:e.payload.validate.user_email.isValid?"form-group":"form-group has-error"},l.default.createElement("input",{type:"text",name:"user_email",onChange:e.handleChange,value:e.payload.detail.user_email,className:"form-control"}),l.default.createElement("label",{className:"control-label"},"Email"),l.default.createElement("span",{className:"help-block"},e.payload.validate.user_email.message))),l.default.createElement("div",{className:"col-md-6"},l.default.createElement("div",{className:e.payload.validate.user_password.isValid?"form-group":"form-group has-error"},l.default.createElement("input",{type:"password",name:"user_password",onChange:e.handleChange,value:e.payload.detail.user_password,className:"form-control",placeholder:"********"}),l.default.createElement("label",{className:"control-label"},"Password"),l.default.createElement("span",{className:"help-block"},e.payload.validate.user_password.message)))),l.default.createElement("div",{className:"row"},l.default.createElement("div",{className:"col-md-6"},l.default.createElement("div",{className:e.payload.validate.user_type_id.isValid?"form-group":"form-group has-error"},l.default.createElement(s.default,{name:"user_type_id",className:"custom-select",value:e.payload.detail.user_type_id,clearable:!1,placeholder:"Select Role",onChange:function(t,a){return e.handleSelectChange(t,"user_type_id")},options:r.utilityHelper.getDataConvertToOptionType(e.staticData.staffRole,"value","id")}),l.default.createElement("label",{className:"control-label"},"Select Role"),l.default.createElement("span",{className:"help-block"},e.payload.validate.user_type_id.message))),l.default.createElement("div",{className:"col-md-6"},l.default.createElement("div",{className:e.payload.validate.user_adhaar_number.isValid?"form-group":"form-group has-error"},l.default.createElement("input",{type:"text",name:"user_adhaar_number",onChange:e.handleChange,value:e.payload.detail.user_adhaar_number,className:"form-control"}),l.default.createElement("label",{className:"control-label"},"Adhaar number"),l.default.createElement("span",{className:"help-block"},e.payload.validate.user_adhaar_number.message))))),l.default.createElement(n.Modal.Footer,null,l.default.createElement(n.Button,{className:"btn text-btn red",onClick:e.handleClose},"Close"),l.default.createElement(n.Button,{className:"btn text-btn green",disabled:!(!e.submitted&&!e.isInsertDone),onClick:e.handleSave},e.submitted?"Sending..":"Save"))))}}}]);