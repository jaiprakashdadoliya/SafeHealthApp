(window.webpackJsonp=window.webpackJsonp||[]).push([[58],{1955:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.PatientInvestigations=void 0;var r=l(n(1)),i=(n(43),l(n(296)),n(66)),o=n(8),a=n(2663),s=n(2665),u=n(2667);function l(e){return e&&e.__esModule?e:{default:e}}t.PatientInvestigations=function(e){return r.default.createElement("div",null,r.default.createElement("div",{className:"row",id:"investigationsTitle"},r.default.createElement("div",{className:"col-md-6"},r.default.createElement("h3",null,"Spirometry")),e.user_type!=o.configConstants.USER_TYPE_PATIENT?r.default.createElement("div",{className:"col-md-6 text-right"},r.default.createElement("button",{className:"btn text-btn green",disabled:!!e.submitted,onClick:e.submitInvestigationsStatus},e.submitted?o.configConstants.BUTTON_PLEASE_WAIT:o.configConstants.SAVE_BUTTON)):""),r.default.createElement(i.PatientAlertMessage,{errorMsg:e.errorMsg,isUpdateDone:e.isUpdateDone,successMessage:e.successMessage}),r.default.createElement(a.SpirometryContainer,{spirometryFormData:e.visitFormData.SpirometriesFector,spirometryTableFormData:e.visitFormData.SpirometriesTableFector,investigationReportFormData:e.visitFormData.InvestigationReport,sleepStudyFormData:e.visitFormData.SleepStudyReport,visitDatafetched:e.visitDatafetched,ref:e.spirometryContainerRef,patId:e.patId,visitId:e.visitId}),r.default.createElement(s.SleepStudyContainer,{sleepStudyFormData:e.visitFormData.SleepStudyReport,visitDatafetched:e.visitDatafetched,ref:e.sleepStudyContainerRef,patId:e.patId,visitId:e.visitId}),r.default.createElement(u.InvestigationReportContainer,{investigationReportFormData:e.visitFormData.InvestigationReport,visitDatafetched:e.visitDatafetched,ref:e.investigationReportContainerRef,patId:e.patId,visitId:e.visitId,user_type:e.user_type}),r.default.createElement("div",{className:"row mt20"},e.user_type!=o.configConstants.USER_TYPE_PATIENT?r.default.createElement("div",{className:"col-md-12 text-right"},r.default.createElement("button",{className:"btn text-btn green",disabled:!!e.submitted,onClick:e.submitInvestigationsStatus},e.submitted?o.configConstants.BUTTON_PLEASE_WAIT:o.configConstants.SAVE_BUTTON)):""))}},1956:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.Spirometry=void 0;var r,i=n(1),o=(r=i)&&r.__esModule?r:{default:r};n(66),n(80),n(802);t.Spirometry=function(e){return o.default.createElement("div",null,o.default.createElement("div",{className:"divTable"},o.default.createElement("div",{className:"divTableHeading"},o.default.createElement("div",{className:"divTableRow"}),o.default.createElement("div",{className:"divTableRow"},o.default.createElement("div",{className:"divTableHead"}," "),o.default.createElement("div",{className:"divTableHead"},"Pre-bronchodilator (actual)"),o.default.createElement("div",{className:"divTableHead"},"Post-bronchodilator (actual)"))),o.default.createElement("div",{className:"divTableBody"},e.spirometryTableFormData.length>0?e.spirometryTableFormData.map(function(t){var n="spirometries_fector_pre_value_"+t.spirometries_fector_id,r="spirometries_fector_post_value_"+t.spirometries_fector_id,i="",a="",s=!1;return"FEV1 (L)"==t.spirometries_fector_value?(i="A1",a="B1"):"FVC (L)"==t.spirometries_fector_value?(i="A2",a="B2"):"FEV1/FVC"==t.spirometries_fector_value&&(i="A1/A2",a="B1/B2",s=!0),o.default.createElement("div",{className:"divTableRow",key:t.spirometries_fector_id},o.default.createElement("div",{className:"divTableCell"},t.spirometries_fector_value),o.default.createElement("div",{className:"divTableCell"},o.default.createElement("input",{type:"text",placeholder:i,className:"form-control medium-size",name:"spirometries_fector_pre_value_"+t.spirometries_fector_id,onChange:e.handleInputChange,value:e.state[n],readOnly:s})),o.default.createElement("div",{className:"divTableCell"},o.default.createElement("input",{type:"text",placeholder:a,className:"form-control medium-size",name:"spirometries_fector_post_value_"+t.spirometries_fector_id,onChange:e.handleInputChange,value:e.state[r],readOnly:s})))}):"")))}},1957:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.SleepStudy=void 0;var r,i=n(1),o=(r=i)&&r.__esModule?r:{default:r},a=(n(66),n(80),n(802));t.SleepStudy=function(e){return o.default.createElement("div",{className:"col-md-12"},o.default.createElement("h4",null,"Sleep Study"),o.default.createElement("div",{className:"row sleep-study-form-container"},o.default.createElement(a.FxForm,{config:e.sleepStudyFormData,ref:function(t){e.handleBoundFormSleepStudyUpdate(t)}})))}},1958:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.InvestigationReport=void 0;var r,i=n(1),o=(r=i)&&r.__esModule?r:{default:r},a=(n(66),n(80),n(802));t.InvestigationReport=function(e){return o.default.createElement("div",null,o.default.createElement("div",{className:"investigation-report-form"},o.default.createElement("div",{className:"row sleep-study-form-container"},o.default.createElement(a.FxForm,{config:e.investigationReportFormData,ref:function(t){e.handleBoundFormInvestigationReportUpdate(t)},user_type:e.user_type}))))}},2662:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(1955);Object.keys(r).forEach(function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(t,e,{enumerable:!0,get:function(){return r[e]}})});var i=n(2669);Object.keys(i).forEach(function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(t,e,{enumerable:!0,get:function(){return i[e]}})})},2663:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(1956);Object.keys(r).forEach(function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(t,e,{enumerable:!0,get:function(){return r[e]}})});var i=n(2664);Object.keys(i).forEach(function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(t,e,{enumerable:!0,get:function(){return i[e]}})})},2664:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.SpirometryContainer=void 0;var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=c(n(1)),s=c(n(296)),u=n(66),l=n(10);function c(e){return e&&e.__esModule?e:{default:e}}function d(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var p=(0,s.default)({loader:function(){return Promise.resolve().then(n.t.bind(null,1956,7)).then(function(e){return e.Spirometry})},loading:u.Loading});t.SpirometryContainer=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.boundFormSpirometry=void 0,n.handleBoundFormSpirometryUpdate=n.handleBoundFormSpirometryUpdate.bind(n),n.handleInputChange=n.handleInputChange.bind(n),n.getSpirometryData=n.getSpirometryData.bind(n),n.state={},n.preFevFactorId=void 0,n.postFevFactorId=void 0,n.preFvcFactorId=void 0,n.postFvcFactorId=void 0,n.preFevFvcFactorId=void 0,n.postFevFvcFactorId=void 0,n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,a.default.Component),o(t,[{key:"handleBoundFormSpirometryUpdate",value:function(e){this.boundFormSpirometry=e}},{key:"getSpirometryTableData",value:function(){return this.state}},{key:"getSpirometryData",value:function(){if(this.handleBoundFormSpirometryUpdate){var e=this.getSpirometryTableData();if(e)return l.utilityHelper.mergeMultipleObject([e])}}},{key:"componentWillMount",value:function(){var e=this,t=this.props,n=(t.dispatch,t.spirometryTableFormData);if("object"===(void 0===n?"undefined":i(n))){var r={};this.props.spirometryTableFormData.map(function(t){var n="spirometries_fector_pre_value_"+t.spirometries_fector_id,i="spirometries_fector_post_value_"+t.spirometries_fector_id;"FEV1 (L)"==t.spirometries_fector_value?(e.preFevFactorId=n,e.postFevFactorId=i):"FVC (L)"==t.spirometries_fector_value?(e.preFvcFactorId=n,e.postFvcFactorId=i):"FEV1/FVC"==t.spirometries_fector_value&&(e.preFevFvcFactorId=n,e.postFevFvcFactorId=i),r[n]=null!=t.spirometries_fector_pre_value?t.spirometries_fector_pre_value:"",r[i]=null!=t.spirometries_fector_post_value?t.spirometries_fector_post_value:""}),this.setState(r)}}},{key:"handleInputChange",value:function(e){var t=this.state,n=e.target,i=n.name,o=n.value,a="";if(i===this.preFevFactorId||i===this.preFvcFactorId){var s,u=i===this.preFevFactorId?o:t[this.preFevFactorId],c=i===this.preFvcFactorId?o:t[this.preFvcFactorId];a=l.utilityHelper.calCulateDivideData(u,c);var p=this.preFevFvcFactorId;this.setState(r({},t,(d(s={},p,a),d(s,i,o),s)))}else if(i===this.postFevFactorId||i===this.postFvcFactorId){var f,v=i===this.postFevFactorId?o:t.hasOwnProperty(this.postFevFactorId)?t[this.postFevFactorId]:"",m=i===this.postFvcFactorId?o:t[this.postFvcFactorId];a=l.utilityHelper.calCulateDivideData(v,m);var h=this.postFevFvcFactorId;this.setState(r({},t,(d(f={},h,a),d(f,i,o),f)))}else this.setState(r({},t,d({},i,o)))}},{key:"render",value:function(){return a.default.createElement("div",null,a.default.createElement(p,{spirometryFormData:this.props.spirometryFormData,spirometryTableFormData:this.props.spirometryTableFormData,visitDatafetched:this.props.visitDatafetched,handleBoundFormSpirometryUpdate:this.handleBoundFormSpirometryUpdate,handleInputChange:this.handleInputChange,state:this.state}))}}]),t}()},2665:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(1957);Object.keys(r).forEach(function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(t,e,{enumerable:!0,get:function(){return r[e]}})});var i=n(2666);Object.keys(i).forEach(function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(t,e,{enumerable:!0,get:function(){return i[e]}})})},2666:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.SleepStudyContainer=void 0;var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),i=u(n(1)),o=u(n(296)),a=n(66),s=n(10);function u(e){return e&&e.__esModule?e:{default:e}}var l=(0,o.default)({loader:function(){return Promise.resolve().then(n.t.bind(null,1957,7)).then(function(e){return e.SleepStudy})},loading:a.Loading});t.SleepStudyContainer=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.boundFormSleepStudy=void 0,n.handleBoundFormSleepStudyUpdate=n.handleBoundFormSleepStudyUpdate.bind(n),n.getSleepStudyData=n.getSleepStudyData.bind(n),n.state={},n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,i.default.Component),r(t,[{key:"handleBoundFormSleepStudyUpdate",value:function(e){this.boundFormSleepStudy=e}},{key:"getSleepStudyData",value:function(){if(this.handleBoundFormSleepStudyUpdate){var e=this.boundFormSleepStudy.getData();if(e)return s.utilityHelper.mergeMultipleObject([e])}}},{key:"componentWillMount",value:function(){var e=this.props;e.dispatch,e.SleepStudyTableFormData}},{key:"render",value:function(){return i.default.createElement("div",null,i.default.createElement(l,{sleepStudyFormData:this.props.sleepStudyFormData,visitDatafetched:this.props.visitDatafetched,handleBoundFormSleepStudyUpdate:this.handleBoundFormSleepStudyUpdate}))}}]),t}()},2667:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(1958);Object.keys(r).forEach(function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(t,e,{enumerable:!0,get:function(){return r[e]}})});var i=n(2668);Object.keys(i).forEach(function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(t,e,{enumerable:!0,get:function(){return i[e]}})})},2668:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.InvestigationReportContainer=void 0;var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),i=u(n(1)),o=u(n(296)),a=n(66),s=n(10);function u(e){return e&&e.__esModule?e:{default:e}}var l=(0,o.default)({loader:function(){return Promise.resolve().then(n.t.bind(null,1958,7)).then(function(e){return e.InvestigationReport})},loading:a.Loading});t.InvestigationReportContainer=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.boundFormInvestigationReport=void 0,n.handleBoundFormInvestigationReportUpdate=n.handleBoundFormInvestigationReportUpdate.bind(n),n.getInvestigationReportData=n.getInvestigationReportData.bind(n),n.state={},n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,i.default.Component),r(t,[{key:"handleBoundFormInvestigationReportUpdate",value:function(e){this.boundFormInvestigationReport=e}},{key:"getInvestigationReportTableData",value:function(){return this.state}},{key:"getInvestigationReportData",value:function(){if(this.handleBoundFormInvestigationReportUpdate){var e=this.boundFormInvestigationReport.getData();if(e)return s.utilityHelper.mergeMultipleObject([e])}}},{key:"componentWillMount",value:function(){this.props.dispatch}},{key:"render",value:function(){return i.default.createElement("div",null,i.default.createElement(l,{investigationReportFormData:this.props.investigationReportFormData,visitDatafetched:this.props.visitDatafetched,handleBoundFormInvestigationReportUpdate:this.handleBoundFormInvestigationReportUpdate,state:this.state,user_type:this.props.user_type}))}}]),t}()},2669:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.PatientInvestigationsContainer=void 0;var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),i=d(n(1)),o=n(36),a=d(n(296)),s=n(66),u=n(10),l=n(54),c=n(2670);function d(e){return e&&e.__esModule?e:{default:e}}var p=(0,a.default)({loader:function(){return Promise.resolve().then(n.t.bind(null,1955,7)).then(function(e){return e.PatientInvestigations})},loading:s.Loading}),f=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.spirometryContainerRef=i.default.createRef(),n.sleepStudyContainerRef=i.default.createRef(),n.investigationReportContainerRef=i.default.createRef(),n.submitInvestigationsStatus=n.submitInvestigationsStatus.bind(n),n.changeValue=n.changeValue.bind(n),n.state={},n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,i.default.Component),r(t,[{key:"submitInvestigationsStatus",value:function(){var e=this.props,t=e.patId,n=e.visitId,r=this.spirometryContainerRef.current.getSpirometryData(),i=this.sleepStudyContainerRef.current.getSleepStudyData(),o=this.investigationReportContainerRef.current.getInvestigationReportData(),a={};a.pat_id=t,a.visit_id=n;var s;if(s=u.utilityHelper.mergeMultipleObject([r,a,i,o])){var l=this.props,d=l.dispatch;l.patId,l.visitId;d(c.patientInvestigationsActions.submitRequest(s)),document.getElementById("investigationsTitle").scrollIntoView()}}},{key:"componentDidUpdate",value:function(){var e=this.props.dispatch;this.props.isUserNotValid&&e(l.headerActions.logout())}},{key:"componentWillReceiveProps",value:function(e){var t=this.props,n=t.dispatch,r=t.patId,i=t.visitId;e.isUpdateDone&&setTimeout(function(){n(c.patientInvestigationsActions.resetState());var e={};e.pat_id=r,e.visit_id=i,e.form_type=["spirometries-fector","spirometries-table-fector","sleep_study_form","investigation_report_form"],n(c.patientInvestigationsActions.getListRecord(e))},2e3)}},{key:"componentWillMount",value:function(){var e=this.props,t=e.dispatch,n=e.patId,r=e.visitId,i={};i.pat_id=n,i.visit_id=r,i.form_type=["spirometries-fector","spirometries-table-fector","sleep_study_form","investigation_report_form"],t(c.patientInvestigationsActions.getListRecord(i))}},{key:"changeValue",value:function(e,t){var n={},r=e.target.name,i=e.target.value,o=this.state;o[r]=i;var a=o[o.weight],s=o[o.height],l=u.utilityHelper.calCulateBMI(a,s);n[r]=i,this.investigationsContainerRef.current.handleSetData(n);var c={};c[o.bmi]=l,this.investigationsContainerRef.current.handleSetData(c)}},{key:"render",value:function(){return this.props.fetchedInvestigationsData?i.default.createElement("div",null,i.default.createElement(p,{visitFormData:this.props.patientInvestigationsData,visitDatafetched:this.props.fetchedInvestigationsData,submitted:this.props.submitted,successMessage:this.props.successMessage,errorMsg:this.props.errorMsg,isUpdateDone:this.props.isUpdateDone,patId:this.props.patId,visit_id:this.props.visitId,user_type:this.props.user_type,spirometryContainerRef:this.spirometryContainerRef,sleepStudyContainerRef:this.sleepStudyContainerRef,investigationReportContainerRef:this.investigationReportContainerRef,submitInvestigationsStatus:this.submitInvestigationsStatus})):i.default.createElement(s.Loading,null)}}]),t}();var v=(0,o.connect)(function(e){var t=e.patientInvestigations;return{submitted:t.submitted,successMessage:t.successMessage,errorMsg:t.errorMsg,isUserNotValid:t.isUserNotValid,fetchedInvestigationsData:t.fetchedInvestigationsData,isUpdateDone:t.isUpdateDone,patientInvestigationsData:t.patientInvestigationsData,user_type:e.session.user.user_type}})(f);t.PatientInvestigationsContainer=v},2670:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.patientInvestigationsActions=void 0;var r=n(8),i=n(10),o=n(2671),a=n(332);t.patientInvestigationsActions={getListRecord:function(e){return function(n){n({type:a.patientInvestigationsConstants.PATIENT_INVESTIGATIONS_DATA_REQUEST}),o.patientInvestigationsService.getListRecord(e).then(function(e){var o,s,u=e.data;if(u.code==r.configConstants.SUCCESS_CODE)n((s=u,{type:a.patientInvestigationsConstants.PATIENT_INVESTIGATIONS_DATA_SUCCESS,patientDetails:s}));else if(u.code==r.configConstants.ERROR_CODE){var l=i.utilityHelper.getFirstErrorMessage(u.error);n(t(l))}else if(u.code==r.configConstants.EXCEPTION_CODE){var l=u.message;n(t(l))}else if(u.code==r.configConstants.UNAUTHENTICATE_CODE){var l=u.message;n((o=l,{type:r.configConstants.UNAUTHENTICATE,error:o}))}else n(t(e))}).catch(function(e){n(t(e))})};function t(e){return{type:a.patientInvestigationsConstants.PATIENT_INVESTIGATIONS_DATA_FAILURE,error:e}}},submitRequest:function(e){return function(n){n(function(e){return{type:a.patientInvestigationsConstants.PATIENT_INVESTIGATIONS_ADD_REQUEST,patientDetails:e}}({patientDetails:e})),o.patientInvestigationsService.doSubmitRequest(e).then(function(e){var o,s=e.data;if(s.code==r.configConstants.SUCCESS_CODE){var u={message:s.message};n(function(e){return{type:a.patientInvestigationsConstants.PATIENT_INVESTIGATIONS_ADD_SUCCESS,result:e}}(u))}else if(s.code==r.configConstants.ERROR_CODE){var l=i.utilityHelper.getFirstErrorMessage(s.error);n(t(l))}else if(s.code==r.configConstants.EXCEPTION_CODE)n(t(s.message));else if(s.code==r.configConstants.UNAUTHENTICATE_CODE){var l=s.message;n((o=l,{type:r.configConstants.UNAUTHENTICATE,error:o}))}else n(t(e))}).catch(function(e){n(t(e.message))})};function t(e){return{type:a.patientInvestigationsConstants.PATIENT_INVESTIGATIONS_ADD_FAILURE,errorMsg:e}}},resetState:function(){return function(e){e({type:a.patientInvestigationsConstants.PATIENT_INVESTIGATIONS_RESET_STATE})}}}},2671:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.patientInvestigationsService=void 0;var r,i=n(15),o=(r=i)&&r.__esModule?r:{default:r},a=n(8),s=n(10);t.patientInvestigationsService={getListRecord:function(e){return(0,o.default)({method:"POST",url:a.configConstants.API_BASE_PATH+"visit/get-visits-factor",data:s.headerHelper.appendUserDataInJson(e),headers:s.headerHelper.getHeaderWithAuthorization()}).then(function(e){return e}).catch(function(e){return e})},doSubmitRequest:function(e){return(0,o.default)({method:"post",url:a.configConstants.API_BASE_PATH+"visit/save",data:s.headerHelper.getJsonDataToFormData(e),headers:s.headerHelper.getHeaderWithAuthorization("multipart/form-data")}).then(function(e){return e}).catch(function(e){return e})}}}}]);