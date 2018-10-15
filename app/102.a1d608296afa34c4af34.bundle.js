(window.webpackJsonp=window.webpackJsonp||[]).push([[102],{2793:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.PreviousPrescription=void 0;var o=n(a(1)),i=(n(a(9)),a(911));function n(e){return e&&e.__esModule?e:{default:e}}t.PreviousPrescription=function(e){return o.default.createElement(i.DoctorMediaContainer,{patId:e.patId,mediaTitle:"Previous Prescription"})}},850:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.DoctorMedia=void 0;var o=s(a(1)),i=a(66),n=a(80),d=s(a(882)),r=a(8),l=a(43);function s(e){return e&&e.__esModule?e:{default:e}}t.DoctorMedia=function(e){return o.default.createElement("div",{className:"inner-content specialisation-section"},o.default.createElement("div",{className:"row"},o.default.createElement("h3",{className:"col-md-10 col-sm-8 col-xs-9"},void 0!=e.mediaTitle?e.mediaTitle:"Media"),o.default.createElement("div",{className:"col-md-2 col-sm-4 col-xs-3"})),e.error&&o.default.createElement(l.Alert,{bsStyle:"danger"},e.error),o.default.createElement("div",{className:"row remove-bg"},e.loader?o.default.createElement("h4",{className:"Loader text-center text-success"},"Loading..."):null,e.mediaData&&e.mediaData.length>0&&e.mediaData.map(function(t,a){return o.default.createElement("div",{className:"col-md-3",key:t.doc_media_file},o.default.createElement("div",{className:"portfolio-image"},o.default.createElement("img",{src:"pdf"==t.doc_type?"https://www.rxhealth.in/api/public/images/sample-pdf-icon-view.png":r.configConstants.MEDIA_BASE_PATH+"1/"+t.doc_media_file,className:"pdf"==t.doc_type?"media-thumbnail-pdf":"media-thumbnail",onClick:e.openDialog.bind(null,t.doc_media_file,t.doc_type)}),o.default.createElement("a",{href:"javascript:void(0);",id:a,className:"btn icon-btn red",onClick:e.handleDeleteMedia.bind(null,t.doc_media_id)},o.default.createElement(i.FontAwesomeIcon,{icon:n.faTimes}))))}),o.default.createElement("div",{className:"dropzone col-md-3"},o.default.createElement(d.default,{onDrop:e.onDrop.bind(void 0),multiple:!1,className:"drop_box"},o.default.createElement("div",{className:"upload-icon"},o.default.createElement(i.FontAwesomeIcon,{icon:n.faCloudUploadAlt})),o.default.createElement("p",null,"Drag&Drop Your File(s)Here To Upload"),o.default.createElement("span",{className:"select-upload"},"Or Select File to Upload"),o.default.createElement("small",null,"(file size: 4MB, Type: png,jpg,jpeg,pdf dimensions: maximum width=1920px,maximum height=1200px)")))))}},851:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.DoctorMediaAdd=void 0;var o=l(a(1)),i=(l(a(13)),a(43)),n=l(a(882)),d=a(66),r=a(80);function l(e){return e&&e.__esModule?e:{default:e}}t.DoctorMediaAdd=function(e){var t=e.progressValue;return o.default.createElement("div",null,o.default.createElement(i.Modal,{show:e.mediaAddShow,onHide:e.handleClose},o.default.createElement(i.Modal.Header,{closeButton:!0},o.default.createElement(i.Modal.Title,null,"Add Media")),o.default.createElement(i.Modal.Body,null,o.default.createElement("div",{className:"row"},o.default.createElement("div",{className:"col-md-12 "},e.error&&o.default.createElement(i.Alert,{bsStyle:"danger"},e.error),o.default.createElement("div",{className:"dropzone"},o.default.createElement(n.default,{onDrop:e.onDrop.bind(void 0),className:"drop_box"},o.default.createElement("div",{className:"upload-icon"},o.default.createElement(d.FontAwesomeIcon,{icon:r.faCloudUploadAlt})),o.default.createElement("p",null,"Drag&Drop Your File(s)Here To Upload"),o.default.createElement("span",{className:"select-upload"},"Or Select File to Upload"))))),o.default.createElement("div",{className:"row text-center text-lg-left thumb-img"},e.previewMedia&&e.previewMedia.map(function(e,a){var n="overplay_"+a;return o.default.createElement("div",{className:"col-lg-3 col-md-4 col-xs-6 ",key:e.preview},o.default.createElement("div",{className:"single-img"},o.default.createElement("a",{href:"#",className:"d-block mb-4 h-100"},o.default.createElement("img",{src:e.preview,className:"img-responsive img-fluid img-thumbnail"}),o.default.createElement("div",{className:"overlay",id:n},o.default.createElement(i.ProgressBar,{bsStyle:"success",now:t})))))})))))}},911:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=a(850);Object.keys(o).forEach(function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(t,e,{enumerable:!0,get:function(){return o[e]}})});var i=a(980);Object.keys(i).forEach(function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(t,e,{enumerable:!0,get:function(){return i[e]}})});var n=a(851);Object.keys(n).forEach(function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(t,e,{enumerable:!0,get:function(){return n[e]}})})},980:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.DoctorMediaContainer=void 0;var o,i=function(){function e(e,t){for(var a=0;a<t.length;a++){var o=t[a];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,a,o){return a&&e(t.prototype,a),o&&e(t,o),t}}(),n=a(1),d=(o=n)&&o.__esModule?o:{default:o},r=a(36),l=(a(21),a(851),a(850)),s=a(54),c=a(8),u=a(981),p=a(982),m=a(803);var f=function(e){function t(e,a){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var o=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,a));return o.mediaAddShowHandle=o.mediaAddShowHandle.bind(o),o.mediaAddHideHandle=o.mediaAddHideHandle.bind(o),o.handleDeleteMedia=o.handleDeleteMedia.bind(o),o.openDialog=o.openDialog.bind(o),o.handleClose=o.handleClose.bind(o),o.onDrop=o.onDrop.bind(o),o.state={mediaAddShow:!1,mediaDialogShow:!1,mediaImage:""},o}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,d.default.Component),i(t,[{key:"componentDidUpdate",value:function(){var e=this.props.dispatch;this.props.isUserNotValid&&e(s.headerActions.logout())}},{key:"componentWillMount",value:function(){var e=this.props,t=e.dispatch,a=e.patId;t(s.doctorMediaActions.getMedia({patient_id:a}))}},{key:"mediaAddShowHandle",value:function(){this.setState({mediaAddShow:!0})}},{key:"mediaAddHideHandle",value:function(){this.setState({mediaAddShow:!1})}},{key:"handleDeleteMedia",value:function(e){var t=this;(0,m.confirmAlert)({title:c.doctorMediaConstants.DR_MEDIA_ALERT_TITLE,message:c.doctorMediaConstants.DR_MEDIA_ALERT_MESSAGE,buttons:[{label:c.configConstants.CONFIRM_ALERT_YES,onClick:function(){(0,t.props.dispatch)(s.doctorMediaActions.deleteMedia(e,t.props.mediaData))}},{label:c.configConstants.CONFIRM_ALERT_NO,onClick:function(){return!1}}]})}},{key:"openDialog",value:function(e,t){"pdf"==t?window.open(c.configConstants.MEDIA_BASE_PATH+"0/"+e,"_blank"):(this.setState({mediaDialogShow:!0}),this.setState({mediaImage:e}))}},{key:"handleClose",value:function(){this.setState({mediaDialogShow:!1}),this.setState({mediaImage:""})}},{key:"onDrop",value:function(e){this.setState({files:e},function(){var t=this,a=this.props,o=a.dispatch,i=a.patId;e.map(function(e,a){var n="overplay_"+a;o(s.doctorMediaActions.addMedia(e,t.props.mediaData,n,i))})})}},{key:"componentWillReceiveProps",value:function(e){e.error&&setTimeout(function(){(0,e.dispatch)(s.doctorMediaActions.resetState())},2e3)}},{key:"render",value:function(){return d.default.createElement("div",null,d.default.createElement(l.DoctorMedia,{mediaData:this.props.mediaData,staging:this.state.staging,loader:this.props.loader,openDialog:this.openDialog,onDrop:this.onDrop,error:this.props.error,mediaTitle:this.props.mediaTitle,patId:this.props.patId,handleDeleteMedia:this.handleDeleteMedia,mediaAddShowHandle:this.mediaAddShowHandle}),d.default.createElement(u.DoctorMediaAddContainer,{mediaAddShowHandle:this.mediaAddShowHandle,mediaAddShow:this.state.mediaAddShow,mediaAddHideHandle:this.mediaAddHideHandle,loader:this.props.loader,patId:this.props.patId}),d.default.createElement(p.DoctorMediaDialog,{mediaDialogShow:this.state.mediaDialogShow,mediaImage:this.state.mediaImage,handleClose:this.handleClose}))}}]),t}();var h=(0,r.connect)(function(e){var t=e.doctorMedia;return{mediaData:t.mediaData,isDelete:t.isDelete,doc_media_id:t.doc_media_id,loader:t.loader,error:t.error,isUserNotValid:t.isUserNotValid}})(f);t.DoctorMediaContainer=h},981:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.DoctorMediaAddContainer=void 0;var o,i=function(){function e(e,t){for(var a=0;a<t.length;a++){var o=t[a];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,a,o){return a&&e(t.prototype,a),o&&e(t,o),t}}(),n=a(1),d=(o=n)&&o.__esModule?o:{default:o},r=a(36),l=(a(21),a(851)),s=(a(850),a(54));var c=function(e){function t(e,a){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var o=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,a));return o.handleClose=o.handleClose.bind(o),o.onChange=o.onChange.bind(o),o.handleSubmit=o.handleSubmit.bind(o),o.onDrop=o.onDrop.bind(o),o.state={files:[]},o}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,d.default.Component),i(t,[{key:"handleClose",value:function(){this.setState({files:[]}),(0,this.props.dispatch)(s.doctorMediaActions.resetState()),this.props.mediaAddHideHandle()}},{key:"componentDidUpdate",value:function(){var e=this.props.dispatch;this.props.isUserNotValid&&e(s.headerActions.logout())}},{key:"onChange",value:function(e){this.setState(e)}},{key:"handleSubmit",value:function(){(0,this.props.dispatch)(s.doctorMediaActions.addMedia(this.state,this.props.mediaData)),this.props.mediaAddHideHandle(),this.setState({src:null})}},{key:"onDrop",value:function(e){this.setState({files:e},function(){var t=this,a=this.props.dispatch;e.map(function(e,o){var i="overplay_"+o;a(s.doctorMediaActions.addMedia(e,t.props.mediaData,i))})})}},{key:"render",value:function(){return d.default.createElement("div",null,d.default.createElement(l.DoctorMediaAdd,{mediaAddShow:this.props.mediaAddShow,mediaAddHideHandle:this.mediaAddHideHandle,handleClose:this.handleClose,onChange:this.onChange,dropValues:this.state,allowedFileTypes:this.allowedFileTypes,maxFileSize:this.maxFileSize,handleSubmit:this.handleSubmit,progressValue:this.props.progressValue,error:this.props.error,mediaData:this.props.mediaData,previewMedia:this.state.files,onDrop:this.onDrop,progressIndex:this.props.progressIndex,progress:this.props.progress,isAdded:this.props.isAdded}))}}]),t}();var u=(0,r.connect)(function(e){var t=e.doctorMedia,a=t.mediaData,o=t.error;return{mediaData:a,progressValue:t.progressValue,error:o,progressIndex:t.progressIndex,progress:t.progress,isAdded:t.isAdded,isUserNotValid:t.isUserNotValid}})(c);t.DoctorMediaAddContainer=u},982:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.DoctorMediaDialog=void 0;var o,i=a(1),n=(o=i)&&o.__esModule?o:{default:o},d=a(8),r=a(43);t.DoctorMediaDialog=function(e){return n.default.createElement("div",null,n.default.createElement(r.Modal,{show:e.mediaDialogShow,onHide:e.handleClose},n.default.createElement(r.Modal.Header,{closeButton:!0}),n.default.createElement(r.Modal.Body,null,n.default.createElement("div",{className:"row"},n.default.createElement("div",{className:"col-md-12 "},n.default.createElement("img",{src:d.configConstants.MEDIA_BASE_PATH+"0/"+e.mediaImage,className:"img-responsive"}))))))}}}]);