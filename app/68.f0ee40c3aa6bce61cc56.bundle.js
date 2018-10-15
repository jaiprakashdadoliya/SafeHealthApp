(window.webpackJsonp=window.webpackJsonp||[]).push([[68],{1967:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.BpChart=void 0;var r,a=n(1),o=(r=a)&&r.__esModule?r:{default:r},l=(n(66),n(80),n(829));t.BpChart=function(e){return o.default.createElement("div",{className:e.medicalProfile?"col-sm-6 col-md-6":"col-sm-6 col-md-4"},o.default.createElement("div",{className:"chart-container box"},o.default.createElement("div",{className:"box-header"},o.default.createElement("h3",null,"BP (120/80)")),e.chartData.data.length>0?o.default.createElement(l.ResponsiveContainer,{debounce:200,width:"100%",height:220},o.default.createElement(l.LineChart,{width:600,height:220,data:e.chartData.data,margin:{top:10,right:20,left:-15,bottom:-15}},o.default.createElement(l.XAxis,{dataKey:"Date"}),o.default.createElement(l.YAxis,null),o.default.createElement(l.Legend,null),o.default.createElement(l.CartesianGrid,{stroke:"#f5f5f5"}),o.default.createElement(l.Tooltip,null),o.default.createElement(l.Line,{type:"monotone",dataKey:"120",stroke:"#8884d8",activeDot:{r:8},strokeWidth:4}),o.default.createElement(l.Line,{type:"monotone",dataKey:"80",stroke:"#82ca9d",activeDot:{r:8},strokeWidth:4}))):o.default.createElement("p",{className:"fx-no-record"},"No record found.")))}},2690:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(1967);Object.keys(r).forEach(function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(t,e,{enumerable:!0,get:function(){return r[e]}})});var a=n(2691);Object.keys(a).forEach(function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(t,e,{enumerable:!0,get:function(){return a[e]}})})},2691:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.BpChartContainer=void 0;var r,a=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),o=n(1),l=(r=o)&&r.__esModule?r:{default:r},c=n(1967);t.BpChartContainer=function(e){function t(e,n){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,n))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,l.default.Component),a(t,[{key:"render",value:function(){return l.default.createElement("div",null,l.default.createElement(c.BpChart,{chartData:this.props.sysChartData,medicalProfile:this.props.medicalProfile}))}}]),t}()}}]);