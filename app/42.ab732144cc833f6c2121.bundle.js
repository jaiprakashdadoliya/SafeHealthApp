(window.webpackJsonp=window.webpackJsonp||[]).push([[42],{1901:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.Payments=void 0;var n=o(a(1)),l=a(66),i=(o(a(115)),o(a(296))),s=a(8),r=a(10);function o(e){return e&&e.__esModule?e:{default:e}}var c=(0,i.default)({loader:function(){return a.e(5).then(a.t.bind(null,813,7)).then(function(e){return e.SideMenu})},loading:l.Loading}),u=(0,i.default)({loader:function(){return a.e(6).then(a.t.bind(null,810,7)).then(function(e){return e.HeaderContainer})},loading:l.Loading});t.Payments=function(e){for(var t,a=[],l=0;l<e.pages;l++)t="paginate_button",l==e.page&&(t="paginate_button active"),l<10&&a.push(n.default.createElement("li",{className:t,key:l},n.default.createElement("a",{href:"javascript:void(0)","data-dt-idx":"1",tabIndex:"0",onClick:e.handlePaginationClick.bind(null,l)},l+1)));return n.default.createElement("div",{className:"page-container"},n.default.createElement(c,null),n.default.createElement(u,null),n.default.createElement("div",{className:"main-content"},n.default.createElement("div",{className:"col-md-12"},n.default.createElement("div",{className:"wrap-inner-content"},n.default.createElement("div",{className:"inner-content"},n.default.createElement("div",{className:"row page-header"},n.default.createElement("div",{className:"col-md-6 col-sm-6"},n.default.createElement("h2",null,"Payment History")),n.default.createElement("div",{className:"col-md-6 col-sm-6 text-right"},n.default.createElement("button",{className:"btn green text-btn"},"Add"))),n.default.createElement("div",{className:"row page-header"},n.default.createElement("div",{className:"col-md-12 text-right"},n.default.createElement("div",{className:"dataTables_paginate paging_simple_numbers",id:"example_paginate"},e.pages>=2&&n.default.createElement("ul",{className:"pagination"},n.default.createElement("li",{className:"paginate_button",disabled:e.buttonDisable,id:"example_previous"},n.default.createElement("a",{href:"javascript:void(0)","aria-controls":"example","data-dt-idx":"0",tabIndex:"0",onClick:e.pageNavigation.bind(null,e.page,s.configConstants.PREVIOUS_SLOT,e.pages)},"Previous")),a,n.default.createElement("li",{className:"paginate_button",disabled:e.buttonDisable,id:"example_next"},n.default.createElement("a",{href:"javascript:void(0)","aria-controls":"example","data-dt-idx":"7",tabIndex:"0",onClick:e.pageNavigation.bind(null,e.page,s.configConstants.NEXT_SLOT,e.pages)},"Next")))))),!e.sendingRequest&&e.paymentsHistory.length>0?e.paymentsHistory.map(function(e,t){if(null!=e)return n.default.createElement("div",{className:"row"},n.default.createElement("div",{className:"col-md-12 margin-top-25"},n.default.createElement("div",{className:"payment-detail"},n.default.createElement("div",{className:"payment-detail-heading"},n.default.createElement("div",{className:"col-md-8"},n.default.createElement("div",{className:"col-md-1"},n.default.createElement("img",{className:"payment-detail-image",height:"40",width:"40",src:""!==e.pat_profile_img&&e.pat_profile_img!==s.configConstants.DEFAULT_IMAGE_PATH?e.pat_profile_img:s.configConstants.DEFAULT_IMAGE_PATH})),n.default.createElement("div",{className:"col-md-4"},n.default.createElement("h4",null,e.user_firstname," ",e.user_lastname)),n.default.createElement("div",{className:"col-md-3"},n.default.createElement("h4",null,r.utilityHelper.getGender(e.user_gender),", ",e.pat_dob.result)),n.default.createElement("div",{className:"col-md-4"},n.default.createElement("h4",null,"Reg. Number :- ",e.pat_code," "))),n.default.createElement("div",{className:"col-md-4 text-right"},n.default.createElement("div",{className:"header-action"},n.default.createElement("a",{className:"btn table-btn green",href:"javascript:void(0);"},"Print")))),n.default.createElement("div",{className:"payment-details-inner"},n.default.createElement("div",{className:"row"},n.default.createElement("div",{className:"col-md-2"},n.default.createElement("h4",null,"Receipt Number"),n.default.createElement("div",{className:"paymentData"},e.reciept_number)),n.default.createElement("div",{className:"col-md-2"},n.default.createElement("h4",null,"Amount Paid"),n.default.createElement("div",{className:"paymentData"},e.amount)),n.default.createElement("div",{className:"col-md-2"},n.default.createElement("h4",null,"Invoices"),n.default.createElement("div",{className:"paymentData"},n.default.createElement("a",{href:"/app/invoices"},e.invoice_number?e.invoice_number:"-"))),n.default.createElement("div",{className:"col-md-3"},n.default.createElement("h4",null,"Payment Towards"),n.default.createElement("div",{className:"paymentData"},e.checkup_type?e.checkup_type:"-")),n.default.createElement("div",{className:"col-md-2"},n.default.createElement("h4",null,"Payment Mode"),n.default.createElement("span",{className:"paymentData"},e.payment_mode?e.payment_mode:"-")))))))}):n.default.createElement("div",null,e.sendingRequest?n.default.createElement("div",{className:"showbox"},n.default.createElement("div",{className:"loader"},n.default.createElement("svg",{className:"circular",viewBox:"25 25 50 50"},n.default.createElement("circle",{className:"path",cx:"50",cy:"50",r:"20",fill:"none",strokeWidth:"2",strokeMiterlimit:"10"})))):n.default.createElement("div",{className:"text-center"},n.default.createElement("h4",null,"No invoice history record found."))))))))}},2527:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.PaymentsContainer=void 0;var n=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}(),l=u(a(1)),i=(a(21),a(36)),s=a(2528),r=u(a(296)),o=a(66),c=a(8);function u(e){return e&&e.__esModule?e:{default:e}}var d=(0,r.default)({loader:function(){return Promise.resolve().then(a.t.bind(null,1901,7)).then(function(e){return e.Payments})},loading:o.Loading}),m=function(e){function t(e,a){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,a));return n.state={paymentsHistory:[]},n.handlePaginationClick=n.handlePaginationClick.bind(n),n.pageNavigation=n.pageNavigation.bind(n),n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,l.default.Component),n(t,[{key:"componentWillMount",value:function(){var e=this.props.dispatch,t=(c.configConstants.PAGE_NUMBER,c.configConstants.PAGE_SIZE,{page:c.configConstants.PAGE_NUMBER,pageSize:c.configConstants.PAGE_SIZE});setTimeout(function(){e(s.paymentsActions.getPaymentHistory(t))}.bind(this),500)}},{key:"componentWillReceiveProps",value:function(e){e.isPaymentHistoryFetched&&e.paymentsHistory&&this.setState({paymentsHistory:e.paymentsHistory})}},{key:"handlePaginationClick",value:function(e){var t=this.props.dispatch,a={page:e,pageSize:c.configConstants.PAGE_SIZE};t(s.paymentsActions.getPaymentHistory(a))}},{key:"pageNavigation",value:function(e,t,a){t==c.configConstants.PREVIOUS_SLOT&&e>=1?this.handlePaginationClick(e-1):this.setState({buttonDisable:!0}),t==c.configConstants.NEXT_SLOT&&e<a?this.handlePaginationClick(e+1):this.setState({buttonDisable:!0})}},{key:"render",value:function(){return l.default.createElement(d,{paymentsHistory:this.state.paymentsHistory,pages:this.props.pages,page:this.props.page,handlePaginationClick:this.handlePaginationClick,pageSize:c.configConstants.PAGE_SIZE,pageNavigation:this.pageNavigation,buttonDisable:this.state.buttonDisable})}}]),t}();var f=(0,i.connect)(function(e){var t=e.payments,a=t.sendingRequest;return{successMessage:t.successMessage,errorMsg:t.errorMsg,sendingRequest:a,paymentsHistory:t.paymentsHistory,isPaymentHistoryFetched:t.isPaymentHistoryFetched,pages:t.pages,page:t.page}})(m);t.PaymentsContainer=f},2528:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.paymentsActions=void 0;var n=a(8),l=a(353),i=a(2529);a(10),t.paymentsActions={getPaymentHistory:function(e){return function(a){a({type:l.paymentsConstants.PAYMENT_HISTORY_DATA_REQUEST}),i.paymentsService.getPaymentsHistory(e).then(function(e){var i,s,r=e.data;r.code==n.configConstants.SUCCESS_CODE?a((s=r.result,{type:l.paymentsConstants.PAYMENT_HISTORY_DATA_SUCCESS,result:s})):r.code==n.configConstants.ERROR_CODE?a(t(r.message)):r.code==n.configConstants.EXCEPTION_CODE?a(t(r.message)):r.code==n.configConstants.UNAUTHENTICATE_CODE?a((i=r.message,{type:n.configConstants.UNAUTHENTICATE,error:i})):a(t(e))}).catch(function(e){a(t(e.message))})};function t(e){return{type:l.paymentsConstants.PAYMENT_HISTORY_DATA_FAILURE,errorMsg:e}}},resetState:function(){return function(e){e({type:l.paymentsConstants.PAYMENT_HISTORY_RESET_STATE})}}}},2529:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.paymentsService=void 0;var n,l=a(15),i=(n=l)&&n.__esModule?n:{default:n},s=a(8),r=a(10);t.paymentsService={getPaymentsHistory:function(e){return(0,i.default)({method:"post",url:s.configConstants.API_BASE_PATH+"accounts/payments-history",data:e,headers:r.headerHelper.getHeaderWithAuthorization()}).then(function(e){return e}).catch(function(e){var t=r.utilityHelper.catchServiceErrorHandel(e);return t})}}},801:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a(2527);Object.keys(n).forEach(function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(t,e,{enumerable:!0,get:function(){return n[e]}})});var l=a(1901);Object.keys(l).forEach(function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(t,e,{enumerable:!0,get:function(){return l[e]}})})}}]);