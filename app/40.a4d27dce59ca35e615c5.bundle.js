(window.webpackJsonp=window.webpackJsonp||[]).push([[40],{2423:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.Reports=void 0;var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),r=d(n(1)),l=n(43),i=n(66),o=n(303),c=(n(80),d(n(115)),d(n(296))),u=n(8),s=n(10);n(829);function d(e){return e&&e.__esModule?e:{default:e}}var f=(0,c.default)({loader:function(){return n.e(5).then(n.t.bind(null,813,7)).then(function(e){return e.SideMenu})},loading:i.Loading}),m=(0,c.default)({loader:function(){return n.e(6).then(n.t.bind(null,810,7)).then(function(e){return e.HeaderContainer})},loading:i.Loading}),p=(0,c.default)({loader:function(){return n.e(91).then(n.t.bind(null,2764,7)).then(function(e){return e.ChartReportsContainer})},loading:i.Loading}),b=(0,c.default)({loader:function(){return Promise.all([n.e(2),n.e(1),n.e(3),n.e(4),n.e(92)]).then(n.t.bind(null,2768,7)).then(function(e){return e.PatientReportsContainer})},loading:i.Loading}),v=(0,c.default)({loader:function(){return n.e(93).then(n.t.bind(null,2773,7)).then(function(e){return e.IncomeReportsContainer})},loading:i.Loading});t.Reports=function(e){function t(e,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var a=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,n));return a.handleSelect=a.handleSelect.bind(a),a.state={activeTab:1},a}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,r.default.Component),a(t,[{key:"handleSelect",value:function(e){this.setState({activeTab:e})}},{key:"render",value:function(){return s.utilityHelper.getUserInfo().user_type==u.configConstants.USER_TYPE_DOCTOR&&1,r.default.createElement("div",{className:"page-container"},r.default.createElement(f,null),r.default.createElement(m,{history:this.props.history}),r.default.createElement("div",{className:"main-content"},r.default.createElement("div",{className:"col-md-12"},r.default.createElement("div",{className:"wrap-inner-content"},r.default.createElement("div",{className:"inner-content"},r.default.createElement("div",{className:"row page-header hide-on-print"},r.default.createElement("div",{className:"col-md-6 col-sm-6"},r.default.createElement("h2",null,"Reports"))),r.default.createElement(l.Tab.Container,{id:"left-tabs-example",defaultActiveKey:1,onSelect:this.handleSelect},r.default.createElement(l.Row,{className:"clearfix"},r.default.createElement(l.Col,{className:"visit-tabs rrp patient-medical-profile hide-on-print"},r.default.createElement(l.Nav,{className:"nav nav-tabs tabs-left",stacked:!0},r.default.createElement(l.NavItem,{eventKey:1},"Statistics"),r.default.createElement(l.NavItem,{eventKey:2},"Patient Reports"),r.default.createElement(l.NavItem,{eventKey:3},"Income Reports"))),r.default.createElement(l.Col,{className:"visit-tabs-contents rlp patient-medical-profile"},r.default.createElement(o.Scrollbars,{className:"tabscroll",style:{height:350}},r.default.createElement(l.Tab.Content,{className:"left-tabs",animation:!0},r.default.createElement(l.Tab.Pane,{eventKey:1},1===this.state.activeTab&&r.default.createElement(p,{activeKey:this.state.activeTab})),r.default.createElement(l.Tab.Pane,{eventKey:2},2===this.state.activeTab&&r.default.createElement(b,{activeKey:this.state.activeTab})),r.default.createElement(l.Tab.Pane,{eventKey:3},3===this.state.activeTab&&r.default.createElement(v,{activeKey:this.state.activeTab}))))))))))))}}]),t}()},799:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(2423);Object.keys(a).forEach(function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(t,e,{enumerable:!0,get:function(){return a[e]}})})}}]);