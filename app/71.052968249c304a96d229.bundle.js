(window.webpackJsonp=window.webpackJsonp||[]).push([[71],{1970:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.CurrentMedicines=void 0;var n=i(a(1)),r=(a(66),a(80),i(a(807)));function i(e){return e&&e.__esModule?e:{default:e}}a(804);t.CurrentMedicines=function(e){return n.default.createElement("div",{className:"col-md-12"},n.default.createElement("div",{className:"box current-medication-container"},n.default.createElement("div",{className:"box-header"},n.default.createElement("h3",{className:"col-md-6 col-sm-6 col-xs-6"},"Medications"),n.default.createElement("div",{className:"col-md-6 col-sm-6 col-xs-6 text-right"},n.default.createElement("i",{className:"fa fa-2x fa-arrows-alt-v"}))),n.default.createElement("div",{className:"table-responsive"},n.default.createElement("div",{className:"table-wrap"},n.default.createElement(r.default,{noDataText:"No medication found !!",columns:[{Header:"Medicine Name",headerClassName:"grid-header",accessor:"medicine_name",filterMethod:function(e,t){return t[e.id].includes(e.value)}},{Header:"Start Date",headerClassName:"grid-header",accessor:"medicine_start_date_formatted",filterable:!1,sortable:!1},{Header:"End Date",headerClassName:"grid-header",accessor:"medicine_end_date_formatted",filterable:!1,sortable:!1},{Header:"Dose",accessor:"current_medicine_dose",className:"dataCellClass",headerClassName:"grid-header",filterable:!1,sortable:!1}],data:e.patientMedicationList.result,defaultPageSize:5,minRows:0,className:"table table-bordered responsive",defaultFilterMethod:function(e,t){return String(t[e.id])===e.value},filtered:e.filtered,Sorted:!0,pages:e.patientMedicationList.pages,showPagination:!0,showPaginationTop:!0,showPaginationBottom:!1,pageSizeOptions:[5,10,25,50,100],manual:!0,onFetchData:function(t,a){e.getPatientMedicationList(t.page,t.pageSize,t.sorted,t.filtered)}})))))}},2696:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a(1970);Object.keys(n).forEach(function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(t,e,{enumerable:!0,get:function(){return n[e]}})});var r=a(2697);Object.keys(r).forEach(function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(t,e,{enumerable:!0,get:function(){return r[e]}})})},2697:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.CurrentMedicinesContainer=void 0;var n,r=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}(),i=a(1),o=(n=i)&&n.__esModule?n:{default:n},s=a(1970);t.CurrentMedicinesContainer=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,o.default.Component),r(t,[{key:"render",value:function(){return o.default.createElement(s.CurrentMedicines,{filterAll:this.props.filterAll,filtered:this.props.filtered,patientMedicationSearch:this.props.patientMedicationSearch,getPatientMedicationList:this.props.getPatientMedicationList,pages:this.props.pages,patientMedicationList:this.props.patientMedicationList})}}]),t}()},804:function(e,t,a){}}]);