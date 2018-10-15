(window.webpackJsonp=window.webpackJsonp||[]).push([[70],{1969:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.RespiratoryRateChart=void 0;var a,n=r(1),o=(a=n)&&a.__esModule?a:{default:a},i=(r(66),r(80),r(829));t.RespiratoryRateChart=function(e){return o.default.createElement("div",{className:"col-sm-6 col-md-4"},o.default.createElement("div",{className:"chart-container box"},o.default.createElement("div",{className:"box-header"},o.default.createElement("h3",null,"Respiratory Rate")),e.chartData.data.length>0?o.default.createElement(i.ResponsiveContainer,{debounce:200,width:"100%",height:220},o.default.createElement(i.LineChart,{width:600,height:300,data:e.chartData.data,margin:{top:10,right:20,left:-15,bottom:-8}},o.default.createElement(i.XAxis,{dataKey:"Date"}),o.default.createElement(i.YAxis,null),o.default.createElement(i.CartesianGrid,{stroke:"#f5f5f5"}),o.default.createElement(i.Tooltip,null),o.default.createElement(i.Line,{type:"monotone",dataKey:"Respiratory Rate",stroke:"#8884d8",activeDot:{r:8},strokeWidth:4}))):o.default.createElement("p",{className:"fx-no-record"},"No record found.")))}},2694:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=r(1969);Object.keys(a).forEach(function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(t,e,{enumerable:!0,get:function(){return a[e]}})});var n=r(2695);Object.keys(n).forEach(function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(t,e,{enumerable:!0,get:function(){return n[e]}})})},2695:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.RespiratoryRateChartContainer=void 0;var a,n=function(){function e(e,t){for(var r=0;r<t.length;r++){var a=t[r];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,r,a){return r&&e(t.prototype,r),a&&e(t,a),t}}(),o=r(1),i=(a=o)&&a.__esModule?a:{default:a},l=r(1969);t.RespiratoryRateChartContainer=function(e){function t(e,r){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,r))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,i.default.Component),n(t,[{key:"render",value:function(){return i.default.createElement("div",null,i.default.createElement(l.RespiratoryRateChart,{chartData:this.props.respiratoryRateChartData}))}}]),t}()}}]);