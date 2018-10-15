(window.webpackJsonp=window.webpackJsonp||[]).push([[67],{1966:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.SpO2Chart=void 0;var n,a=r(1),o=(n=a)&&n.__esModule?n:{default:n},l=(r(66),r(80),r(829));t.SpO2Chart=function(e){return o.default.createElement("div",{className:e.medicalProfile?"col-sm-6 col-md-6":"col-sm-6 col-md-4"},o.default.createElement("div",{className:"chart-container box"},o.default.createElement("div",{className:"box-header"},o.default.createElement("h3",null,"SpO2")),e.chartData.data.length>0?o.default.createElement(l.ResponsiveContainer,{debounce:200,width:"100%",height:220},o.default.createElement(l.LineChart,{width:600,height:300,data:e.chartData.data,margin:{top:10,right:20,left:-15,bottom:-8}},o.default.createElement(l.XAxis,{dataKey:"Date"}),o.default.createElement(l.YAxis,null),o.default.createElement(l.CartesianGrid,{stroke:"#f5f5f5"}),o.default.createElement(l.Tooltip,null),o.default.createElement(l.Line,{type:"monotone",dataKey:"SpO2",stroke:"#8884d8",activeDot:{r:8},strokeWidth:4}))):o.default.createElement("p",{className:"fx-no-record"},"No record found.")))}},2688:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(1966);Object.keys(n).forEach(function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(t,e,{enumerable:!0,get:function(){return n[e]}})});var a=r(2689);Object.keys(a).forEach(function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(t,e,{enumerable:!0,get:function(){return a[e]}})})},2689:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.SpO2ChartContainer=void 0;var n,a=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),o=r(1),l=(n=o)&&n.__esModule?n:{default:n},c=r(1966);t.SpO2ChartContainer=function(e){function t(e,r){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,r))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,l.default.Component),a(t,[{key:"render",value:function(){return l.default.createElement("div",null,l.default.createElement(c.SpO2Chart,{chartData:this.props.spo2ChartData,medicalProfile:this.props.medicalProfile}))}}]),t}()}}]);