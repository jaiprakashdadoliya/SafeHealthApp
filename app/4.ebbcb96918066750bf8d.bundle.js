(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{802:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=a(809);Object.keys(s).forEach(function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(t,e,{enumerable:!0,get:function(){return s[e]}})});var l=a(805);Object.keys(l).forEach(function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(t,e,{enumerable:!0,get:function(){return l[e]}})})},805:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var s in a)Object.prototype.hasOwnProperty.call(a,s)&&(e[s]=a[s])}return e},l=function(){function e(e,t){for(var a=0;a<t.length;a++){var s=t[a];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(e,s.key,s)}}return function(t,a,s){return a&&e(t.prototype,a),s&&e(t,s),t}}(),n=m(a(1)),r=m(a(298)),o=m(a(9));a(297);var i=a(811),u=m(a(818)),c=a(819),h=m(a(115)),d=a(8);function m(e){return e&&e.__esModule?e:{default:e}}function f(e){if(Array.isArray(e)){for(var t=0,a=Array(e.length);t<e.length;t++)a[t]=e[t];return a}return Array.from(e)}var p=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var a=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e)),s=e.config.value;return a.dtFormat="","datetime"===e.config.type?(a.dtFormat=e.config.format,s=s&&(0,o.default)(s).format(e.config.format)):"date"===e.config.type?(a.dtFormat=e.config.format,""==s||null==s?s=null:"string"==typeof s&&""!=s&&void 0!=s&&(s=s&&(0,o.default)(s))):"tags"===e.config.type&&void 0==s&&(s=[]),a.state={value:s,hasError:!1},a.isRequired=a.props.config.isRequired,a.onCheckBoxValueChanged=a.onCheckBoxValueChanged.bind(a),a.onMultiCheckBoxChanged=a.onMultiCheckBoxChanged.bind(a),a.handleFileClick=a.handleFileClick.bind(a),a.handleFileChange=a.handleFileChange.bind(a),a.handleSelectAutocomplete=a.handleSelectAutocomplete.bind(a),a.restrictCharacters=a.restrictCharacters.bind(a),a.handleDelete=a.handleDelete.bind(a),a.handleAddition=a.handleAddition.bind(a),a.handleDrag=a.handleDrag.bind(a),a.handleViewFile=a.handleViewFile.bind(a),a.handleSelectAutocompleteRunTime=a.handleSelectAutocompleteRunTime.bind(a),a.handleChangeSearchAutocompleteRunTime=a.handleChangeSearchAutocompleteRunTime.bind(a),a.triggerChangeAutocompleteRunTime=a.triggerChangeAutocompleteRunTime.bind(a),a.timer=null,a.renderItems=a.renderItems.bind(a),a.loadingFalse=a.loadingFalse.bind(a),a}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,n.default.Component),l(t,[{key:"setValue",value:function(e){this.setState({value:e,hasError:this.hasErrors(e)})}},{key:"setValueField",value:function(e){this.setState({value:e})}},{key:"clearValue",value:function(){this.setState({value:"",hasError:!1})}},{key:"getValue",value:function(){return this.state.value}},{key:"getValueId",value:function(){return this.state.id}},{key:"hasError",value:function(){var e=this.state.hasError;if(this.props.config.hasOwnProperty("validations")){var t=this.props.config.validations,a=this.props.config.showOnForm;for(var s in t){var l=t[s];l.isRequired&&!this.state.value&&a&&(this.setState({value:this.state.value,hasError:this.hasErrors(this.state.value)}),e=l.msg)}}return e}},{key:"hasErrors",value:function(e){if(this.props.config.hasOwnProperty("validations")){var t=this.props.config.validations,a=this.props.config.showOnForm;for(var s in t){var l=t[s];if(l.isRequired&&!e&&a)return l.msg;if(l.pattern&&l.isRequired||l.pattern&&""!=e&&!l.isRequired&&a){var n=new RegExp(l.pattern);if(null==e.match(n))return l.msg}}}return!1}},{key:"onValueChanged",value:function(e){var t=e.target.value,a=e.target.dataset.hasOwnProperty("restricttype")&&""!=e.target.dataset.restricttype?e.target.dataset.restricttype:"",s=(e.target.dataset.hasOwnProperty("handle")&&""!=e.target.dataset.handle&&e.target.dataset.handle,""==a||this.restrictCharacters(e.target.value,a)),l=this.state.value;s||""==t?(this.setState({value:t,hasError:this.hasErrors(t)}),this.props.onChange&&this.props.onChange(t)):(this.setState({value:l,hasError:this.hasErrors(l)}),this.props.onChange&&this.props.onChange(l))}},{key:"onTextValueChanged",value:function(e,t,a){var s=e.target.dataset.hasOwnProperty("restricttype")&&""!=e.target.dataset.restricttype?e.target.dataset.restricttype:"",l=e.target.dataset.hasOwnProperty("formname")&&""!=e.target.dataset.formname?e.target.dataset.formname:"",n=e.target.value,r=""==s||this.restrictCharacters(n,s),o=this.state.value;r||""==n?(this.setState({value:n,hasError:this.hasErrors(n)}),this.props.onChange&&this.props.onChange(n),void 0!==a&&""!=a&&a(e,l)):(this.setState({value:o,hasError:this.hasErrors(o)}),this.props.onChange&&this.props.onChange(o),e.target.value=o,void 0!==a&&""!=a&&a(e,l))}},{key:"handleSelectChange",value:function(e,t,a){this.setState({value:e.value,hasError:this.hasErrors(e.value)}),this.props.onChange&&this.props.onChange(e.value),void 0!==a&&a(e.value,e.label)}},{key:"onDateValueChanged",value:function(e,t){this.setState({value:t,hasError:this.hasErrors(t)}),this.props.onChange&&this.props.onChange(t),void 0!==e&&e(t)}},{key:"onDateTimeValueChanged",value:function(e){var t=(0,o.default)(e).format(this.dtFormat);this.setState({value:t,hasError:this.hasErrors(t)}),this.props.onChange&&this.props.onChange(t)}},{key:"getArrayDifference",value:function(e,t){return t.filter(function(t){return-1===e.indexOf(t)})}},{key:"onCheckBoxValueChanged",value:function(e,t,a){var s=this.state.value,l=this.getArrayDifference(s,a);this.setState({value:l,fieldName:t,hasError:this.hasErrors(l)}),this.props.onChange&&this.props.onChange(l),void 0!==e&&e(l,t)}},{key:"onMultiCheckBoxChanged",value:function(e,t){var a=e;this.setState({value:a,hasError:this.hasErrors(a)}),this.props.onChange&&this.props.onChange(a),void 0!==t&&t(a)}},{key:"handleFileChange",value:function(e){var t=e.target.files[0],a=e.target.files[0].name;this.setState({value:t,fileName:a,hasError:this.hasErrors(t)}),this.props.onChange&&this.props.onChange(t)}},{key:"handleFileClick",value:function(e){return this.refs[e].value&&(this.refs[e].value=""),this.refs[e].click(),!1}},{key:"handleChangeAutocomplete",value:function(e,t){var a=e.target.value;this.setState({id:"",value:a,hasError:this.hasErrors(a)})}},{key:"handleSelectAutocomplete",value:function(e,t,a){var s;s=e.split("__"),this.setState({id:s[1],value:s[0],hasError:this.hasErrors(s[0])}),void 0!==t&&t(s[1],s[0])}},{key:"restrictCharacters",value:function(e,t){if("digitsOnly"==t)var a=/^\d+$/;else{if("digitsWithDotOnly"!=t)return!0;a=/^[0-9\.]+$/}var s=e;return!!a.test(s)}},{key:"handleSelectAutocompleteRunTime",value:function(e,t){var a;a=e.split("__"),this.setState({id:a[1],value:a[0],hasError:this.hasErrors(a[0])}),void 0!==t&&t(a[1],a[0])}},{key:"handleChangeSearchAutocompleteRunTime",value:function(e,t,a){clearTimeout(this.timer);var s=e.target.value;this.setState({id:"",value:s,loading:!0,hasError:this.hasErrors(s)}),void 0!==a&&(this.timer=setTimeout(this.triggerChangeAutocompleteRunTime.bind(null,s,t,a),1e3))}},{key:"triggerChangeAutocompleteRunTime",value:function(e,t,a){void 0!==a&&(a(e,t),setTimeout(this.loadingFalse,1e3))}},{key:"handleDelete",value:function(e){var t=this.state.value;this.setState({value:t.filter(function(t,a){return a!==e}),hasError:this.hasErrors(t)})}},{key:"handleAddition",value:function(e){this.setState({value:[].concat(f(this.state.value),[e])})}},{key:"handleDrag",value:function(e,t,a){var s=[].concat(f(this.state.value)).slice();s.splice(t,1),s.splice(a,0,e),this.setState({value:s,hasError:this.hasErrors(s)})}},{key:"renderItems",value:function(e){return e.map(function(e,t){return e})}},{key:"loadingFalse",value:function(){var e=this.state;this.setState(s({},e,{loading:!1}))}},{key:"handleViewFile",value:function(e,t){var a=d.configConstants.API_BASE_PATH+"visit/view-file/"+e+"/"+t;window.open(a,"_blank")}},{key:"render",value:function(){var e=this,t=this.props.config,a=this.state.hasError,s=this.props.inputData,l=this.props.inputHandle,o=this.props.inputHandleRunTime,m=this.props.inputFormName,f=this.props.user_type;switch(t.type){case"hidden":return n.default.createElement("input",{key:"fi_"+t.name,type:"hidden",className:t.cssClasses.inputClass,name:t.name,value:this.state.value,onChange:this.onValueChanged.bind(this)});case"number":return n.default.createElement("div",{key:"fg_"+t.name,className:t.cssClasses.inputGroupClass+" "+(a?"has-error":"")},n.default.createElement("label",{key:"fl_"+t.name,className:"control-label "+t.cssClasses.labelClass,htmlFor:t.name},t.title),n.default.createElement("input",{key:"fi_"+t.name,type:"number",className:t.cssClasses.inputClass,name:t.name,value:this.state.value,onChange:this.onValueChanged.bind(this)}),n.default.createElement("span",{className:"help-block"},a));case"password":return n.default.createElement("div",{key:"fg_"+t.name,className:t.cssClasses.inputGroupClass+" "+(a?"has-error":"")},n.default.createElement("label",{key:"fl_"+t.name,className:t.cssClasses.labelClass,htmlFor:t.name},t.title),n.default.createElement("input",{key:"fi_"+t.name,type:"password",className:t.cssClasses.inputClass,name:t.name,value:this.state.value,onChange:this.onValueChanged.bind(this)}),n.default.createElement("span",{className:"help-block"},a));case"customcheckbox":return n.default.createElement("div",{key:"fg_"+t.name,className:t.cssClasses.inputGroupClass+" checkbox-listing "+(a?"has-error":"")},n.default.createElement("div",{key:"fl_"+t.name,className:"control-label "+t.cssClasses.labelClass},t.title),n.default.createElement("div",{key:"fi_"+t.name,className:t.cssClasses.inputContainerClass},n.default.createElement(i.CheckboxGroup,{checkboxDepth:2,name:t.name,value:this.state.value,onChange:this.onCheckBoxValueChanged.bind(this,l,t.fieldName)},s&&s.map(function(e){return n.default.createElement("label",{key:e.value},n.default.createElement(i.Checkbox,{className:"option-input checkbox",value:e.value}),n.default.createElement("span",null,e.label))}))));case"checkbox":return n.default.createElement("div",{key:"fg_"+t.name,className:t.cssClasses.inputGroupClass+" checkbox-listing "+(a?"has-error":"")},n.default.createElement("div",{key:"fl_"+t.name,className:t.cssClasses.labelClass},t.title),n.default.createElement("div",{key:"fi_"+t.name,className:t.cssClasses.inputContainerClass},n.default.createElement(i.CheckboxGroup,{checkboxDepth:2,name:t.name,value:this.state.value,onChange:function(t,a){return e.onMultiCheckBoxChanged(t,l)}},s&&s.map(function(e){return n.default.createElement("label",{key:e.value},n.default.createElement(i.Checkbox,{className:"option-input checkbox multiple-checkbox",value:e.value}),n.default.createElement("span",null,e.label))}))));case"textarea":return n.default.createElement("div",{key:"fg_"+t.name,className:t.cssClasses.inputGroupClass+" "+(a?"has-error":"")},n.default.createElement("label",{key:"fl_"+t.name,className:t.cssClasses.labelClass,htmlFor:t.name},t.title),n.default.createElement("textarea",{key:"fi_"+t.name,className:t.cssClasses.inputClass,name:t.name,value:this.state.value,onChange:this.onValueChanged.bind(this)}),n.default.createElement("span",{className:"help-block"},a));case"groupHeading":return n.default.createElement("div",{key:"fg_"+t.name,className:t.cssClasses.inputGroupClass},n.default.createElement("h4",null,t.title));case"datetime":return n.default.createElement("div",{key:"fg_"+t.name,className:t.cssClasses.inputGroupClass+" "+(a?"has-error":"")},n.default.createElement("label",{key:"fl_"+t.name,className:t.cssClasses.labelClass,htmlFor:t.name},t.title),n.default.createElement(Datetime,{key:"fi_"+t.name,name:t.name,value:this.state.value,onChange:this.onDateTimeValueChanged.bind(this),dateFormat:"DD/MM/YYYY",timeFormat:"hh:mm:ss",closeOnSelect:!0,inputProps:{readOnly:!0}}),n.default.createElement("span",{className:"help-block"},a));case"date":if(t.hasOwnProperty("disableDate")&&"before"===t.disableDate);else if(t.hasOwnProperty("disableDate")&&"after"===t.disableDate)Datetime.moment().subtract(1,"day");else if(t.hasOwnProperty("disableDate")&&"weekend"===t.disableDate);return n.default.createElement("div",{key:"fg_"+t.name,className:t.cssClasses.inputGroupClass+" "+(a?"has-error":"")},n.default.createElement("label",{key:"fl_"+t.name,className:"control-label "+t.cssClasses.labelClass,htmlFor:t.name},t.title),n.default.createElement(r.default,{selected:this.state.value,dateFormat:t.format,name:t.name,onChange:this.onDateValueChanged.bind(this,l),peekNextMonth:!0,showMonthDropdown:!0,showYearDropdown:!0,dropdownMode:"select",readOnly:!0}),n.default.createElement("span",{className:"help-block"},a));case"select":return n.default.createElement("div",{key:"fg_"+t.name,className:t.cssClasses.inputGroupClass+" "+(a?"has-error":"")},n.default.createElement("label",{key:"fl_"+t.name,className:"control-label "+t.cssClasses.labelClass,htmlFor:t.name},t.title),n.default.createElement(h.default,{key:"fi_"+t.name,className:t.cssClasses.selectClass+" custom-select",options:s,value:this.state.value,name:t.name,onChange:function(a,s,n){return e.handleSelectChange(a,t.name,l)}}),n.default.createElement("span",{className:"help-block"},a));case"file":return n.default.createElement("div",{key:"fg_"+t.name,className:t.cssClasses.inputGroupClass+" "+(a?"has-error":"")},void 0!=f&&f!=d.configConstants.USER_TYPE_PATIENT?n.default.createElement(n.default.Fragment,null,n.default.createElement("label",{key:"fl_"+t.name,className:"control-label "+t.cssClasses.labelClass,htmlFor:t.name},t.title),n.default.createElement("input",{type:"file",id:"file",ref:t.name,style:{display:"none"},accept:t.accept,onChange:this.handleFileChange}),n.default.createElement("button",{className:t.cssClasses.inputClass,onClick:this.handleFileClick.bind(null,t.name)},t.placeholder),n.default.createElement("div",{className:"green-color"},""!=this.state.fileName&&void 0!=this.state.fileName?this.state.fileName:""),n.default.createElement("span",{className:"help-block"},a)):"",t.value&&void 0!=t.showFileView&&""!=this.state.value&&void 0!=this.state.value&&n.default.createElement("button",{className:"btn blue pull-right",onClick:this.handleViewFile.bind(null,this.state.value,t.fileType)},"View File"));case"autocomplete":return n.default.createElement("div",{key:"fg_"+t.name,className:t.cssClasses.inputGroupClass+" autocomplete-input "+(a?"has-error":"")},n.default.createElement(u.default,{className:"form-control",items:s,shouldItemRender:function(e,t){return e.label.toLowerCase().indexOf(t.toLowerCase())>-1},getItemValue:function(e){return e.label+"__"+e.value},renderItem:function(e,t){return n.default.createElement("div",{key:e.value,style:{backgroundColor:t?"#eee":"transparent"}},e.label)},name:t.name,ref:t.name,value:this.state.value,onSelect:function(t,a){return e.handleSelectAutocomplete(t,l)},onChange:function(t){return e.handleChangeAutocomplete(t)}}),n.default.createElement("span",{className:"help-block"},a),n.default.createElement("label",{key:"fl_"+t.name,className:"control-label "+t.cssClasses.labelClass,htmlFor:t.name},t.title));case"tags":return n.default.createElement("div",{key:"fg_"+t.name,className:t.cssClasses.inputGroupClass+" "+(a?"has-error":"")},n.default.createElement("label",{key:"fl_"+t.name,className:"control-label "+t.cssClasses.labelClass,htmlFor:t.name},t.title),n.default.createElement(c.WithContext,{tags:this.state.value,handleDelete:this.handleDelete,suggestions:s,handleAddition:this.handleAddition,handleDrag:this.handleDrag,delimiters:d.configConstants.KEY_CODES,placeholder:"Tags separated by comma"}),n.default.createElement("span",{className:"help-block"},a));case"autocompleteRuntime":return this.keyCount=0,n.default.createElement("div",{key:"fg_"+t.name,className:t.cssClasses.inputGroupClass+" autocomplete-input "+(a?"has-error":"")},n.default.createElement(u.default,{className:"form-control",items:s,shouldItemRender:function(e,t){return e.label.toLowerCase().indexOf(t.toLowerCase())>-1},getItemValue:function(e){return e.label+"__"+e.value},renderItem:function(t,a){return n.default.createElement("div",{key:e.keyCount++,style:{backgroundColor:a?"#eee":""}},t.label)},name:t.name,ref:t.name,value:this.state.value,onSelect:function(t,a){return e.handleSelectAutocompleteRunTime(t,o)},onChange:function(a,s,n){return e.handleChangeSearchAutocompleteRunTime(a,t.name,l)},renderMenu:function(a,s){var l=t.focusText?t.focusText:"Type of the name",r=t.loadingText?t.loadingText:"Loading...",o=t.notFoundText?t.notFoundText:"Record not Found";return n.default.createElement("div",{key:e.keyCount++,className:"menu autocomplete-menu"},n.default.createElement("div",{className:"item"},""==s?n.default.createElement("div",null,l):e.state.loading&&0===a.length?n.default.createElement("div",null,r):0===a.length?n.default.createElement("div",null,o):e.renderItems(a)," "))}}),n.default.createElement("span",{className:"help-block"},a),n.default.createElement("label",{key:"fl_"+t.name,className:"control-label "+t.cssClasses.labelClass,htmlFor:t.name},t.title));default:return n.default.createElement("div",{key:"fg_"+t.name,className:t.cssClasses.inputGroupClass+" "+(a?"has-error":"")},n.default.createElement("label",{key:"fl_"+t.name,className:"control-label "+t.cssClasses.labelClass,htmlFor:t.name},t.title),n.default.createElement("input",{key:"fi_"+t.name,type:"text",className:t.cssClasses.inputClass,name:t.name,value:void 0==this.state.value?"":this.state.value,"data-restricttype":t.hasOwnProperty("restrictType")&&t.restrictType?t.restrictType:"","data-formname":void 0!==m&&""!==m?m:"",onChange:function(a,s,n){return e.onTextValueChanged(a,t.name,l)},maxLength:""!=t.maxLength&&null!=t.maxLength?t.maxLength:"",readOnly:void 0!=t.readOnly&&t.readOnly}),n.default.createElement("span",{className:"help-block"},a))}}}]),t}();t.default=p},809:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.FxForm=void 0;var s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},l=function(){function e(e,t){for(var a=0;a<t.length;a++){var s=t[a];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(e,s.key,s)}}return function(t,a,s){return a&&e(t.prototype,a),s&&e(t,s),t}}(),n=o(a(1)),r=o(a(805));function o(e){return e&&e.__esModule?e:{default:e}}t.FxForm=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var a=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return a.defaultInputParentClass="col-sm-6 col-md-6 col-xs-12",a.defaultInputGroupClass="form-group",a.defaultInputClass="form-control",a.defaultLabelClass="control-label",a.config=a.props.config,a.fields=a.setDefaultOptions(a.config.fields),a.items={},a.isEditing=!1,a}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,n.default.Component),l(t,[{key:"setDefaultOptions",value:function(e){for(var t in e){var a=e[t];if("group"==a.type){var s=a.fields;for(var l in void 0===a.cssClasses&&(a.cssClasses={}),void 0===a.cssClasses&&(a.groupHeadClass=""),void 0===a.cssClasses&&(a.groupParentClass=""),void 0===s.cssClasses&&(a.groupContainerClass=""),s){var n=s[l];void 0===n.cssClasses&&(n.cssClasses={}),void 0===n.cssClasses.inputParentClass&&(n.cssClasses.inputParentClass=this.defaultInputParentClass),void 0===n.cssClasses.inputGroupClass&&(n.cssClasses.inputGroupClass=this.defaultInputGroupClass),void 0===n.cssClasses.inputClass&&(n.cssClasses.inputClass=this.defaultInputClass),void 0===n.cssClasses.labelClass&&(n.cssClasses.labelClass=this.defaultLabelClass),void 0===n.cssClasses.inputContainerClass&&(n.cssClasses.inputContainerClass=""),void 0===n.cssClasses.selectClass&&(n.cssClasses.selectClass=""),a.fields[l]=n}}else void 0===a.cssClasses&&(a.cssClasses={}),void 0===a.cssClasses.inputParentClass&&(a.cssClasses.inputParentClass=this.defaultInputParentClass),void 0===a.cssClasses.inputGroupClass&&(a.cssClasses.inputGroupClass=this.defaultInputGroupClass),void 0===a.cssClasses.inputClass&&(a.cssClasses.inputClass=this.defaultInputClass),void 0===a.cssClasses.labelClass&&(a.cssClasses.labelClass=this.defaultLabelClass),void 0===a.cssClasses.inputContainerClass&&(a.cssClasses.inputContainerClass=""),void 0===a.cssClasses.selectClass&&(a.cssClasses.selectClass="")}return e}},{key:"setData",value:function(e){var t=this.items;for(var a in t){if(t.hasOwnProperty(a))t[a].setValue(e[a])}}},{key:"setFieldData",value:function(e){var t=this.items,a=Object.keys(e),s=a.length>0?a[0]:"";""!=s&&t.hasOwnProperty(s)&&e.hasOwnProperty(s)&&t[s].setValueField(e[s])}},{key:"getData",value:function(){var e=this.items,t={},a=!0;for(var l in e)if(e.hasOwnProperty(l)){var n=e[l];if(null!=n)if(n.hasError(n))a&&(a=!1);else{void 0!==n.props.config.idField&&"undefined"!==n.props.config.idField&&(t[n.props.config.idField]=n.getValueId());var r=n.getValue();"date"==n.props.config.type&&(r=null==r?"":r);var o="date"==n.props.config.type&&"object"===(void 0===r?"undefined":s(r))&&null!==r&&""!==r?r.format(n.props.config.format):r;t[l]=o}}return a?t:a}},{key:"clearForm",value:function(){var e=this.items;for(var t in e){if(e.hasOwnProperty(t))e[t].clearValue()}}},{key:"render",value:function(){var e=this;return n.default.createElement("div",null,this.fields.map(function(t,a){return"group"==t.type&&t.showOnForm?n.default.createElement(n.default.Fragment,{key:"k_"+t.name},n.default.createElement("div",{key:"g_"+t.name,className:t.cssClasses.groupParentClass},n.default.createElement("h3",{key:"gh_"+t.name,className:t.cssClasses.groupHeadClass},t.title),t.fields.map(function(a){if(a.showOnForm)return n.default.createElement("div",{key:"p_"+a.name,className:a.cssClasses.inputParentClass},n.default.createElement(r.default,{key:"fe_"+a.name,ref:function(t){e.items[a.name]=t},config:a,inputData:e.props.config.data[a.name+"_data"],inputHandle:e.props.config.handlers[a.name+"_handle"],inputHandleRunTime:e.props.config.handlers[t.name+"_runtime_multiple_handle"],user_type:e.props.user_type}))}),t.showBottomHR&&n.default.createElement("hr",{className:"fxform-froup-hr"})),t.clearFix&&n.default.createElement("div",{className:"clearfix",key:"cl_"+t.name})):t.showOnForm&&"group"!=t.type?n.default.createElement("div",{key:"mp_"+t.name},n.default.createElement("div",{key:"p_"+t.name,className:t.cssClasses.inputParentClass},n.default.createElement(r.default,{key:"fe_"+t.name,ref:function(a){e.items[t.name]=a},config:t,inputData:e.props.config.data[t.name+"_data"],inputHandle:e.props.config.handlers[t.name+"_handle"],inputHandleRunTime:e.props.config.handlers[t.name+"_runtime_multiple_handle"],inputFormName:e.props.config.hasOwnProperty("formName")?e.props.config.formName:"",user_type:e.props.user_type})),t.clearFix&&n.default.createElement("div",{className:"clearfix",key:"cl_"+t.name})):void 0}))}}]),t}()}}]);