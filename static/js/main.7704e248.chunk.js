(this["webpackJsonpreact-calendar-docs"]=this["webpackJsonpreact-calendar-docs"]||[]).push([[0],{102:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(32),i=a.n(l),c=(a(92),a(93),a(94),a(2)),o=a(50),s=a(120),u=a(119),d=a(103),g=function(){return(g=Object.assign||function(e){for(var t,a=1,n=arguments.length;a<n;a++)for(var r in t=arguments[a])Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e}).apply(this,arguments)},h={0:"Su",1:"Mo",2:"Tu",3:"We",4:"Th",5:"Fr",6:"Sa"},f={0:"January",1:"February",2:"March",3:"April",4:"May",5:"June",6:"July",7:"August",8:"September",9:"October",10:"November",11:"December"};function m(e){return(e.getFullYear()<10?"0"+e.getFullYear():e.getFullYear())+"_"+(e.getMonth()<10?"0"+e.getMonth():e.getMonth())+"_"+(e.getDate()<10?"0"+e.getDate():e.getDate())}function b(e){return new Date(Number(e.substr(0,4)),Number(e.substr(5,2)),Number(e.substr(8,2)))}function w(e,t){if(t.getFullYear()<e.getFullYear())return!0;if(t.getFullYear()===e.getFullYear()){if(t.getMonth()<e.getMonth())return!0;if(t.getMonth()===e.getMonth()&&t.getDate()<e.getDate())return!0}return!1}function v(e){return"undefined"!==typeof e&&null!==e&&e.getTime&&!isNaN(e.getTime())}function D(e,t){return e.getFullYear()===t.getFullYear()&&e.getMonth()===t.getMonth()&&e.getDate()===t.getDate()}function y(e,t,a){var n=e.getFullYear(),r=e.getMonth(),l=e.getDate(),i=t.getFullYear(),c=t.getMonth(),o=t.getDate(),s=a.getFullYear(),u=a.getMonth(),d=a.getDate();return n<=s&&s<=i&&(n<s&&s<i||(n===i?r<=u&&u<=c&&(r<u&&u<c||(r===c?l<=d&&d<=o&&u===c:r===u?l<=d:c===u&&d<=o)):n===s?u>r||u===r&&d>=l:i===s&&(u<c||u===c&&d<=o)))}function k(e){return e%4===0&&e%100!==0||e%400===0}function M(e,t){return{0:31,1:k(e)?29:28,2:31,3:30,4:31,5:30,6:31,7:31,8:30,9:31,10:30,11:31}[t]}function S(e){return M(e.getFullYear(),e.getMonth())===e.getDate()}function _(e){return 0===e?11:e-1}function O(e){return 11===e?0:e+1}function E(e){return 1===e?1:e-1}function p(e){return e+1}function R(e){return function(e){return 11===e.getMonth()&&S(e)}(e)?new Date(e.getFullYear()+1,0,1):S(e)?new Date(e.getFullYear(),e.getMonth()+1,1):new Date(e.getFullYear(),e.getMonth(),e.getDate()+1)}function j(e,t){var a=6-t;return e<=a?e+t:e-a-1}function C(e){return e%20===0?20*(e/20-1)+1:20*Number(Math.floor(e/20))+1}function x(e){for(var t=e.isRangeSelectModeOn,a=e.isRangeView,n=e.selectedDate,r=e.selectedRangeStart,l=e.selectedRangeEnd,i=e.highlightsMap,c=e.newSelectedRangeStart,o=e.newSelectedRangeEnd,s=e.isSelectMultiDate,u=e.selectedMultiDates,d=e.yearInView,g=e.monthInView,h=e.startOfTheWeek,f=e.isDisabled,m=e.checkIfWeekend,b=[[],[],[],[],[],[]],w=function(e,t,a){var n=new Date;return n.setDate(1),n.setMonth(t),n.setFullYear(e),function(e,t){return void 0===t&&(t=0),e>=t?e-t:6-t+1+e}(n.getDay(),a)}(d,g,h),v=new Date,D=M(d,g),y=0===g,k=11===g,S=M(y?E(d):d,_(g)),p=0,R=0,j=S-(w-1);j<=S;j++)7===R&&(R=0,p++),b[p].push(F({currDate:new Date(y?E(d):d,_(g),j),activeMonthInView:!1,highlightsMap:i,newSelectedRangeEnd:o,newSelectedRangeStart:c,selectedDate:n,selectedRangeEnd:l,selectedRangeStart:r,isDisabled:f,isRangeSelectModeOn:t,isRangeView:a,isSelectMultiDate:s,row:p,weekColumn:R,checkIfWeekend:m,today:v,selectedMultiDates:u,startOfTheWeek:h})),R++;for(var C=1;C<=D;C++)7===R&&(R=0,p++),b[p].push(F({currDate:new Date(d,g,C),activeMonthInView:!0,highlightsMap:i,newSelectedRangeEnd:o,newSelectedRangeStart:c,selectedDate:n,selectedRangeEnd:l,selectedRangeStart:r,isDisabled:f,isRangeSelectModeOn:t,isRangeView:a,isSelectMultiDate:s,row:p,weekColumn:R,checkIfWeekend:m,today:v,selectedMultiDates:u,startOfTheWeek:h})),R++;for(var x=1;b[5].length<7;)7===R&&(R=0,p++),b[p].push(F({currDate:new Date(k?d+1:d,O(g),x),activeMonthInView:!1,highlightsMap:i,newSelectedRangeEnd:o,newSelectedRangeStart:c,selectedDate:n,selectedRangeEnd:l,selectedRangeStart:r,isDisabled:f,isRangeSelectModeOn:t,isRangeView:a,isSelectMultiDate:s,row:p,weekColumn:R,checkIfWeekend:m,today:v,selectedMultiDates:u,startOfTheWeek:h})),R++,x++;return b}function F(e){var t=e.currDate,a=e.activeMonthInView,n=e.highlightsMap,r=e.newSelectedRangeEnd,l=e.newSelectedRangeStart,i=e.selectedDate,c=e.selectedRangeEnd,o=e.selectedRangeStart,s=e.isDisabled,u=e.isRangeSelectModeOn,d=e.isRangeView,g=e.isSelectMultiDate,h=e.row,f=e.weekColumn,b=e.checkIfWeekend,k=e.today,M=e.selectedMultiDates,S=e.startOfTheWeek;return{date:t,dayOfMonth:t.getDate(),month:t.getMonth(),activeMonthInView:a,isHighlight:1===n[m(t)],isInRange:!!d&&(u?!(!v(l)||!v(r))&&(w(r,l)?y(l,r,t):y(r,l,t)):!!o&&!!c&&y(o,c,t)),isRangeStart:!!d&&(u?!!v(l)&&D(l,t):!!o&&D(o,t)),isRangeEnd:!!d&&(!u&&(!!c&&D(c,t))),year:t.getFullYear(),dayOfWeek:j(f,S),isWeekend:b(t),isToday:D(t,k),isFirstRow:0===h,isLastRow:5===h,isFirsColumn:0===f,isLastColumn:6===f,isSelected:g?!!M[m(t)]:!d&&(!!i&&(t.getMonth()===i.getMonth()&&t.getFullYear()===i.getFullYear()&&t.getDate()===i.getDate())),isDisabled:s(t)}}var V={root:{height:"12%",padding:"1% 2%",display:"flex",alignTtems:"center",width:"100%"},arc_header_nav:{width:"10.14%",height:"100%",flex:"0 0 auto"},arch_header_label:{width:"65.21%",height:"100%",margin:"0 4.34%",flex:"1 1 auto",display:"flex",justifyContent:"center",alignItems:"center"}};function N(e){var t=e.onClickPrev,a=e.onChangeViewType,n=e.onClickNext,l=e.viewType,i=e.monthInView,c=e.yearInView,o=e.yearMatrixEnd,s=e.yearMatrixStart;return r.a.createElement("header",{style:V.root,className:"arc_header"},r.a.createElement("button",{style:V.arc_header_nav,className:"arc_header_nav arc_header_nav-prev",onClick:t},r.a.createElement("span",null,"\u2190")),"month_dates"===l?r.a.createElement("button",{style:V.arch_header_label,className:"arc_header_label arc_header_label-days-of-month",onClick:function(){return a("years")}},r.a.createElement("div",null,r.a.createElement("span",null,f[i])),r.a.createElement("div",null,r.a.createElement("span",null,c))):"months"===l?r.a.createElement("button",{style:V.arch_header_label,className:"arc_header_label arc_header_label-months"},r.a.createElement("div",{onClick:function(){return a("years")}},r.a.createElement("span",null,c))):r.a.createElement("button",{style:V.arch_header_label,className:"arc_header_label arc_header_label-years",onClick:function(){return a("month_dates")}},r.a.createElement("div",null,r.a.createElement("span",null,s,"-",o))),r.a.createElement("button",{style:V.arc_header_nav,className:"arc_header_nav arc_header_nav-next",onClick:n},r.a.createElement("span",null,"\u2192")))}var I=Object(n.memo)(N),A={width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center"},T={width:"95%",height:"45%",display:"flex",alignItems:"center",justifyContent:"center"};function W(e){var t=e.cell,a=e.onMonthClicked;return r.a.createElement("div",{style:A},r.a.createElement("button",{style:T,onClick:function(){a(t)}},f[t.month]))}var Y=Object(n.memo)(W),P={root:{height:"100%"},arc_view_row:{height:"24.9%",display:"flex",width:"100%"},arc_view_cell:{flexBasis:"33.33%",maxWidth:"33.33%",height:"100%"}};function z(e){var t=e.onChangeViewingMonth,a=e.onChangeViewType,l=Object(n.useMemo)((function(){return function(e){var t=Array.from({length:12},(function(t,a){return{month:a,isCurrentMonth:(new Date).getMonth()===a,isSelectedMonth:1===e[a]}}));return[t.slice(0,3),t.slice(3,6),t.slice(6,9),t.slice(9,12)]}({})}),[]);return r.a.createElement("div",{role:"grid",style:P.root,className:"arc_view-months"},l.map((function(e,n){return r.a.createElement("div",{style:P.arc_view_row,className:"arc_view_row",key:n},e.map((function(e){return r.a.createElement("div",{style:P.arc_view_cell,className:"arc_view_cell"+(e.isCurrentMonth?" arc_this_month":""),key:e.month},r.a.createElement(Y,{cell:e,onMonthClicked:function(e){t(e.month),a("month_dates")}}))})))})))}var L=Object(n.memo)(z),q={width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center"},B={width:"95%",height:"45%",display:"flex",alignItems:"center",justifyContent:"center"};function H(e){var t=e.cell,a=e.onYearClicked;return r.a.createElement("div",{style:q},r.a.createElement("button",{style:B,onClick:function(){a(t)}},t.year))}var J=Object(n.memo)(H),U={root:{height:"100%"},arc_view_row:{height:"24.9%",display:"flex",width:"100%"},arc_view_cell:{width:"20%",height:"100%"}};function G(e){var t=e.onChangeViewType,a=e.onChangeViewingYear,l=e.yearMatrixStart,i=Object(n.useMemo)((function(){return function(e,t){var a=Array.from({length:20},(function(a,n){return{year:e+n,isCurrentYear:(new Date).getFullYear()===e+n,isSelectedYear:1===t[e+n]}}));return[a.slice(0,5),a.slice(5,10),a.slice(10,15),a.slice(15,20)]}(l,{})}),[l]);return r.a.createElement("div",{role:"grid",style:U.root,className:"arc_view-years"},i.map((function(e,n){return r.a.createElement("div",{style:U.arc_view_row,className:"arc_view_row",key:n},e.map((function(e){return r.a.createElement("div",{style:U.arc_view_cell,className:"arc_view_cell"+(e.isCurrentYear?" arc_this_year":""),key:e.year},r.a.createElement(J,{cell:e,onYearClicked:function(e){a(e.year),t("months")}}))})))})))}var K=Object(n.memo)(G),Q={arc_view_weekdays:{height:"15%",margin:"0",padding:0,display:"flex",width:"100%",listStyle:"none"},arc_view_weekdays_cell:{display:"flex",alignItems:"center",justifyContent:"center",height:"100%",flexBasis:"14.286%",maxWidth:"14.286%"},arc_view_weekdays_cell_value:{width:"65.95%",display:"flex",alignItems:"center",justifyContent:"center"}};function X(e){var t=e.startOfWeek,a=e.weekendMap,l=Object(n.useMemo)((function(){return function(e){void 0===e&&(e=0);var t=Object.keys(h).slice(e,7).concat(Object.keys(h).slice(0,e));return{map:t.reduce((function(e,t){return e[Number(t)]=h[Number(t)],e}),{}),order:t}}(t)}),[t]).order;return r.a.createElement("ul",{style:Q.arc_view_weekdays,className:"arc_view_weekdays"},l.map((function(e){return r.a.createElement("li",{style:Q.arc_view_weekdays_cell,key:e,className:"arc_view_weekdays_cell"+(a[e]?" arc_wknd":"")},r.a.createElement("div",{style:Q.arc_view_weekdays_cell_value},r.a.createElement("span",null,h[e])))})))}var Z=Object(n.memo)(X),$={width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center"},ee={width:"69.80%",height:"80%",display:"flex",alignItems:"center",justifyContent:"center"},te={width:"100%",height:"100%"};function ae(e){var t=e.cell,a=e.onDateClicked;return r.a.createElement("div",{style:$},r.a.createElement("div",{style:ee,className:"arc_view_cell_value"},r.a.createElement("button",{style:te,disabled:t.isDisabled,tabIndex:t.isDisabled?-1:0,onClick:function(){return a(t)}},t.dayOfMonth)))}var ne=Object(n.memo)(ae),re={"arc_view-days-of-month":{height:"85%"},arc_view_row:{height:"16.664%",display:"flex",width:"100%",alignItems:"center"},arc_view_cell:{flexBasis:"14.286%",maxWidth:"14.286%",height:"100%"}};function le(e){var t=e.selectedDate,a=e.selectedRangeStart,l=e.selectedRangeEnd,i=e.newSelectedRangeStart,c=e.startOfWeek,o=e.newSelectedRangeEnd,s=e.isRangeSelectorView,u=e.skipDisabledDatesInRange,d=e.onChangeRangeSelectMode,h=e.fixedRange,f=e.isFixedRangeView,b=e.isRangeSelectModeOn,v=e.isDisabled,y=e.selectedMultiDates,k=e.isMultiSelectorView,M=e.monthInView,S=e.hideAdjacentDates,_=e.onChangenNewSelectedRangeEnd,O=e.onChangenNewSelectedRangeStart,E=e.weekends,p=e.onChange,j=e.yearInView,C=e.allowFewerDatesThanRange,F=e.disableFuture,V=e.disablePast,N=e.lockView,I=e.checkIfWeekend,A=e.onPartialRangeSelect,T=e.onEachMultiSelect,W=e.highlightsMap,Y=e.disableToday,P=Object(n.useMemo)((function(){return x({selectedDate:t,selectedRangeStart:a,selectedRangeEnd:l,newSelectedRangeStart:i,newSelectedRangeEnd:o,checkIfWeekend:I,isRangeView:s||f,isRangeSelectModeOn:b,weekendIndexes:E,selectedMultiDates:y,highlightsMap:W,isSelectMultiDate:k,yearInView:j,monthInView:M,startOfTheWeek:c,disableFuture:F,disablePast:V,disableToday:Y,isDisabled:v})}),[t,a,l,i,o,s,f,b,I,E,y,W,k,j,M,c,F,V,Y,v]),z=Object(n.useCallback)((function(e){var t=e.date;if(!(N&&t.getMonth()!==M))if(s&&!f)if(b&&i){var a=new Date(i.getFullYear(),i.getMonth(),i.getDate());if(w(a,t)){var n=t,r=a;"function"===typeof p&&p([n,r])}else{n=a,r=t;"function"===typeof p&&p([n,r])}_(void 0),d(!1)}else O(t),_(void 0),d(!0),A&&A(t);else if(s&&f){var l=function(e,t,a){for(var n=t,r=e,l=!1,i=0;n>0;){if(1500===i){l=!0;break}var c=R(r);if(a.upperLimit&&D(a.upperLimit,c)){l=!0;break}r=c,a.skipDisabledDatesInRange?a.skipDisabledDatesInRange&&!a.isDisabled(c)&&n--:n--,i++}return{endDate:r,limitReached:l}}(t,h,{isDisabled:v,skipDisabledDatesInRange:u,upperLimit:N?new Date(t.getFullYear(),t.getMonth()+1,1):F?R(new Date):void 0});r=l.endDate;l.limitReached&&!C||"function"===typeof p&&p([t,r])}else if(k){var c=m(t),o=g({},y);y[c]?o[c]=void 0:o[c]=t,T&&T(t),p&&p(Object.keys(o).filter((function(e){return!!o[e]})).map((function(e){return o[e]})))}else"function"===typeof p&&p(t)}),[N,M,s,f,k,b,i,_,d,p,O,A,h,v,u,F,C,y,T]);return r.a.createElement("div",{style:re["arc_view-days-of-month"],className:"arc_view-days-of-month",role:"grid"},P.map((function(e,t){return r.a.createElement("div",{style:re.arc_view_row,className:"arc_view_row",key:t},e.map((function(e){return r.a.createElement("div",{style:re.arc_view_cell,onMouseEnter:function(){s&&b&&_(new Date(e.year,e.month,e.dayOfMonth))},key:m(e.date),className:"arc_view_cell"+(e.activeMonthInView?" arc_active":"")+(e.isWeekend?" arc_wknd":"")+(e.isToday?" arc_today":"")+(e.isFirstRow?" arc_fr":"")+(e.isToday?" arc_today":"")+(e.isHighlight?" arc_highlight":"")+(e.isLastRow?" arc_lr":"")+(e.isFirsColumn?" arc_fc":"")+(e.isLastColumn?" arc_lc":"")+(e.isSelected&&!s?" arc_selected":"")+(e.isDisabled?" arc_disabled":"")+(e.isInRange?" arc_in_range":"")+(e.isRangeStart?" arc_range_start":"")+(e.isRangeEnd?" arc_range_end":"")+(b?" arc_range_mode":"")},!e.activeMonthInView&&S?null:r.a.createElement(ne,{cell:e,onDateClicked:z}))})))})))}var ie=Object(n.memo)(le),ce={height:"88%",width:"100%"};function oe(e){var t=e.size,a=e.fontSize,l=e.isNormalView,i=e.isMultiSelectorView,c=e.isRangeSelectorView,o=e.viewDate,s=e.selectedDate,u=e.selectedRangeStart,d=e.selectedMultiDates,g=e.minAllowedDate,h=e.maxAllowedDate,f=e.isSecondary,m=e.lockView,w=e.startOfWeek,D=e.weekends,y=e.isRangeSelectModeOn,k=e.onChangeRangeSelectMode,M=e.skipDisabledDatesInRange,S=e.hideAdjacentDates,R=e.allowFewerDatesThanRange,j=e.selectedRangeEnd,x=e.newSelectedRangeStart,F=e.onChangenNewSelectedRangeEnd,V=e.onChangenNewSelectedRangeStart,N=e.onPartialRangeSelect,A=e.onEachMultiSelect,T=e.newSelectedRangeEnd,W=e.fixedRange,Y=e.isFixedRangeView,P=e.isDisabled,z=e.checkIfWeekend,q=e.onChange,B=e.showDualCalendar,H=e.disableFuture,J=e.weekendMap,U=e.disablePast,G=e.highlightsMap,Q=e.disableToday,X=Object(n.useMemo)((function(){return function(e,t){return{root:{arc:{width:e+"px",height:e+"px",fontSize:t+"px",display:"flex",alignItems:"flex-start",flexDirection:"column",boxSizing:"border-box"}}}}(t,a)}),[t,a]),$=Object(n.useState)("month_dates"),ee=$[0],te=$[1],ae=Object(n.useState)((function(){return ue({isNormalView:l,isMultiSelectorView:i,isRangeSelectorView:c,selectedDate:s,selectedRangeStart:u,selectedMultiDates:d,viewDate:o?b(o):void 0,minAllowedDate:g?b(g):void 0,maxAllowedDate:h?b(h):void 0}).getMonth()})),ne=ae[0],re=ae[1],le=Object(n.useState)(ue({isNormalView:l,isMultiSelectorView:i,isRangeSelectorView:c,selectedDate:s,selectedRangeStart:u,selectedMultiDates:d,viewDate:o?b(o):void 0,minAllowedDate:g?b(g):void 0,maxAllowedDate:h?b(h):void 0}).getFullYear()),oe=le[0],se=le[1];Object(n.useLayoutEffect)((function(){if(B&&f){var e=O(ne);re(e),se(0===e?p(oe):oe)}}),[B,f]),Object(n.useEffect)((function(){o&&v(b(o))&&(re(b(o).getMonth()),se(b(o).getFullYear()))}),[o]),Object(n.useEffect)((function(){v(s)&&(re(s.getMonth()),se(s.getFullYear()))}),[s]),Object(n.useEffect)((function(){var e=Object.keys(d).map((function(e){return d[e]})).filter((function(e){return v(e)}));1===e.length&&e[0]&&(re(e[0].getMonth()),se(e[0].getFullYear()))}),[d]);var de=Object(n.useCallback)((function(e){!m&&re(e)}),[m,re]),ge=Object(n.useCallback)((function(e){!m&&se(e)}),[m,se]),he=Object(n.useCallback)((function(e){!m&&te(e)}),[m,te]),fe=Object(n.useState)(C(oe)),me=fe[0],be=fe[1];Object(n.useEffect)((function(){be(C(oe))}),[oe,be]);var we=Object(n.useMemo)((function(){return[e=me,e+19];var e}),[me]),ve=we[0],De=we[1],ye=Object(n.useCallback)((function(){var e;"month_dates"===ee&&(0===ne&&se(E(oe)),de(_(ne)));"years"===ee&&be(1===(e=me)?1:C(e-1)),"months"===ee&&ge(1!==oe?oe-1:1)}),[de,ne,ge,oe,ee,be,me]),ke=Object(n.useCallback)((function(){"month_dates"===ee&&(11===ne&&ge(p(oe)),de(O(ne)));"years"===ee&&be(C(me+20)),"months"===ee&&ge(p(oe))}),[de,ne,ge,oe,ee,be,me]),Me=Object(n.useRef)(null),Se=Object(n.useRef)([]),_e=Object(n.useState)(!1),Oe=_e[0],Ee=_e[1];return Object(n.useEffect)((function(){if(Oe){var e=Me.current;if(e){Se.current=e?Array.from(e.querySelectorAll('[role="grid"] button:not([disabled])')):[];var t=Se.current[0],a=Se.current[Se.current.length-1],n=e.querySelector('[role="grid"]'),r=e.querySelector('[role="grid"] .arc_selected button')||e.querySelector('[role="grid"] .arc_range_end button')||e.querySelector('[role="grid"] .arc_range_start button'),l=e.querySelector('[role="grid"] .arc_active button'),i=e.querySelector("header .arc_header_nav-prev"),c=e.querySelector("header .arc_header_nav-next"),o=e.querySelector("header .arc_header_label");n&&!n.contains(document.activeElement)&&(r?r.focus():l?l.focus():t.focus());var s=function(e,a){var n=a===t;return e?function(e){var t=Se.current.indexOf(e);return n?t<Se.current.length-1?Se.current[t+1]:a:t-1>-1?Se.current[t-1]:a}(e):null};return e.addEventListener("keydown",u,{capture:!0}),function(){e.removeEventListener("keydown",u,{capture:!0})}}}function u(n){var r=n.target,l=Se.current&&Se.current.find((function(e){return e===r}));if(l){if("Tab"===n.key)n.preventDefault(),(d=s(l,t))===t?null===i||void 0===i||i.focus():document.activeElement===c?null===t||void 0===t||t.focus():document.activeElement===o?null===c||void 0===c||c.focus():document.activeElement===i?null===o||void 0===o||o.focus():null===d||void 0===d||d.focus();if("ArrowDown"===n.key){n.preventDefault();for(var u="month_dates"===ee?7:"months"===ee?3:5,d=l;u>0;)d=s(d,t),u--;null===d||void 0===d||d.focus()}if("ArrowUp"===n.key){n.preventDefault();u="month_dates"===ee?7:"months"===ee?3:5;for(var d=l;u>0;)d=s(d,a),u--;null===d||void 0===d||d.focus()}if("ArrowLeft"===n.key)n.preventDefault(),null===(d=s(l,a))||void 0===d||d.focus();if("ArrowRight"===n.key)n.preventDefault(),null===(d=s(l,t))||void 0===d||d.focus();"Home"===n.key&&(n.preventDefault(),t.focus()),"End"===n.key&&(n.preventDefault(),a.focus()),"Escape"===n.key&&(n.preventDefault(),l.blur(),null===e||void 0===e||e.blur())}}}),[Me,ee,Oe,ne]),r.a.createElement("div",{onFocus:function(){!Oe&&Ee(!0)},onBlur:function(e){e.currentTarget.contains(e.target)||Ee(!1)},style:X.root.arc,className:"arc",ref:Me},r.a.createElement(I,{onClickPrev:ye,onClickNext:ke,onChangeViewType:he,viewType:ee,monthInView:ne,yearInView:oe,yearMatrixStart:ve,yearMatrixEnd:De}),r.a.createElement("div",{style:ce,className:"arc_view"},"months"===ee&&r.a.createElement(L,{onChangeViewType:he,onChangeViewingMonth:de}),"years"===ee&&r.a.createElement(K,{onChangeViewType:he,onChangeViewingYear:ge,yearMatrixStart:ve,yearMatrixEnd:De}),"month_dates"===ee&&r.a.createElement(r.a.Fragment,null,r.a.createElement(Z,{startOfWeek:w,weekendMap:J}),r.a.createElement(ie,{isRangeSelectModeOn:y,onChangeRangeSelectMode:k,skipDisabledDatesInRange:M,hideAdjacentDates:S,allowFewerDatesThanRange:R,selectedDate:s,selectedRangeStart:u,selectedRangeEnd:j,lockView:m,newSelectedRangeStart:x,startOfWeek:w,onChangenNewSelectedRangeEnd:F,onChangenNewSelectedRangeStart:V,onPartialRangeSelect:N,onEachMultiSelect:A,newSelectedRangeEnd:T,isRangeSelectorView:c,fixedRange:W,isFixedRangeView:Y,isDisabled:P,checkIfWeekend:z,selectedMultiDates:d,isMultiSelectorView:i,monthInView:ne,maxAllowedDate:h,minAllowedDate:g,weekends:D,onChange:q,yearInView:oe,disableFuture:H,disablePast:U,highlightsMap:G,disableToday:Q}))))}var se=Object(n.memo)(oe);function ue(e){var t=e.isMultiSelectorView&&e.selectedMultiDates&&e.selectedMultiDates[Object.keys(e.selectedMultiDates)[0]];return v(e.viewDate)?e.viewDate:e.isNormalView&&v(e.selectedDate)?e.selectedDate:e.isRangeSelectorView&&e.selectedRangeStart?e.selectedRangeStart:t&&v(t)?t:v(e.minAllowedDate)?e.minAllowedDate:v(e.maxAllowedDate)?e.maxAllowedDate:new Date}var de=[],ge={display:"inline-flex"};function he(e,t){var a=e.value,l=e.isMultiSelector,i=e.className,c=void 0===i?"":i,o=e.isRangeSelector,s=e.useDarkMode,u=void 0!==s&&s,d=e.weekends,h=e.highlights,f=void 0===h?de:h,D=e.viewDate,y=e.allowFewerDatesThanRange,k=void 0!==y&&y,M=e.startOfWeek,S=void 0===M?1:M,_=e.maxAllowedDate,O=e.skipDisabledDatesInRange,E=void 0!==O&&O,p=e.minAllowedDate,R=e.fixedRange,j=e.isDisabled,C=e.onPartialRangeSelect,x=e.onEachMultiSelect,F=e.onChange,V=e.lockView,N=void 0!==V&&V,I=e.disableFuture,A=void 0!==I&&I,T=e.size,W=void 0===T?276:T,Y=e.fontSize,P=void 0===Y?16:Y,z=e.disablePast,L=void 0!==z&&z,q=e.disableToday,B=void 0!==q&&q,H=e.showDualCalendar,J=void 0!==H&&H,U=e.hideAdjacentDates,G=void 0!==U&&U,K=!!o,Q=K&&!!J,X=!K&&!!l,Z=!!(K&&"number"===typeof R&&R>0),$=!K&&!X,ee=S,te=Z?R:1,ae=Object(n.useMemo)((function(){return Array.isArray(f)?f.filter((function(e){return v(e)})).reduce((function(e,t){return e[m(t)]=1,e}),{}):{}}),[f]),ne=Object(n.useMemo)((function(){return Array.isArray(d)&&(d.every((function(e){return"number"===typeof e}))||0===d.length)?d:[6,0]}),[d]),re=Object(n.useMemo)((function(){return v(_)?m(_):void 0}),[_]),le=Object(n.useMemo)((function(){return v(p)?m(p):void 0}),[p]),ie=Object(n.useMemo)((function(){return v(D)?m(D):void 0}),[D]),ce=Object(n.useMemo)((function(){return!!v(_)&&(!v(p)||w(_,p))}),[_,p]),oe=Object(n.useMemo)((function(){return!!v(p)&&(!v(_)||w(_,p))}),[_,p]),ue=Object(n.useMemo)((function(){return function(e){var t=e.disablePast,a=e.disableToday,n=e.disableFuture,r=e.customDisabledCheck,l=e.maxDate,i=e.minDate,c=e.applyMax,o=e.applyMin,s=new Date,u=s.getFullYear(),d=s.getMonth(),g=s.getDate();return function(e){if(t){if(e.getFullYear()<u)return!0;if(e.getFullYear()===u&&e.getMonth()<d)return!0;if(e.getFullYear()===u&&e.getMonth()===d&&e.getDate()<g)return!0}if(a&&e.getFullYear()===u&&e.getMonth()===d&&e.getDate()===g)return!0;if(n){if(e.getFullYear()>u)return!0;if(e.getFullYear()===u&&e.getMonth()>d)return!0;if(e.getFullYear()===u&&e.getMonth()===d&&e.getDate()>g)return!0}return!!(c&&l&&w(e,l))||!!(o&&i&&w(i,e))||"function"===typeof r&&r(e)}}({disablePast:L,disableToday:B,disableFuture:A,customDisabledCheck:j,maxDate:re?b(re):void 0,minDate:le?b(le):void 0,applyMax:ce,applyMin:oe})}),[ce,oe,A,L,B,j,re,le]),he=Object(n.useMemo)((function(){return function(e){var t=e.reduce((function(e,t){return e[t]=1,e}),{});return function(e){return 1===t[e.getDay()]}}(ne)}),[ne]),fe=Object(n.useMemo)((function(){return ne.reduce((function(e,t){return e[t]=1,e}),{})}),[ne]),me=Object(n.useMemo)((function(){return $&&v(a)?a:void 0}),[$,a]),be=Object(n.useMemo)((function(){return X&&Array.isArray(a)&&a.every(v)?a.reduce((function(e,t){return v(t)&&(e[m(t)]=t),e}),{}):{}}),[X,a]),we=Object(n.useMemo)((function(){if(K&&Array.isArray(a)&&v(a[0])){var e=a[0].getFullYear(),t=a[0].getMonth(),n=a[0].getDate();return new Date(e,t,n)}}),[K,a]),ve=Object(n.useMemo)((function(){if(K&&we&&Array.isArray(a)&&v(a[1])&&w(a[1],we)){var e=a[1].getFullYear(),t=a[1].getMonth(),n=a[1].getDate();return new Date(e,t,n)}}),[K,we,a]),De=Object(n.useState)(!1),ye=De[0],ke=De[1],Me=Object(n.useState)(we),Se=Me[0],_e=Me[1],Oe=Object(n.useState)(ve),Ee=Oe[0],pe=Oe[1],Re=Object(n.useMemo)((function(){return{showDualCalendar:Q,viewDate:ie,useDarkMode:u,className:c,hideAdjacentDates:!!G,isNormalView:$,size:W,fontSize:P,startOfWeek:ee,weekends:ne,isRangeSelectModeOn:ye,onChangeRangeSelectMode:ke,skipDisabledDatesInRange:!!E,allowFewerDatesThanRange:!!k,selectedDate:me,selectedRangeStart:we,selectedRangeEnd:ve,lockView:!!N,newSelectedRangeStart:Se,onChangenNewSelectedRangeEnd:pe,onChangenNewSelectedRangeStart:_e,onPartialRangeSelect:C,onEachMultiSelect:x,newSelectedRangeEnd:Ee,isRangeSelectorView:K,fixedRange:te,isFixedRangeView:Z,isDisabled:ue,checkIfWeekend:he,selectedMultiDates:be,isMultiSelectorView:X,maxAllowedDate:re,minAllowedDate:le,onChange:F,disableFuture:A,disablePast:L,highlightsMap:ae,disableToday:B,weekendMap:fe}}),[k,ue,he,fe,c,A,L,G,B,te,P,ae,ie,Q,Z,X,$,ye,K,N,re,le,Ee,Se,F,x,C,me,be,ve,we,W,E,ee,u,ne]),je=Object(n.useMemo)((function(){return"string"===typeof c?"arc_root"+(u?" arc_dark":"")+(Q?" arc_dual":"")+" "+c:"arc_root"+(u?" arc_dark":"")+(Q?" arc_dual":"")}),[c,u,Q]);return r.a.createElement("div",{className:je,style:ge,ref:t},Q?r.a.createElement(r.a.Fragment,null,r.a.createElement(se,g({isSecondary:!1},Re)),r.a.createElement(se,g({isSecondary:!0},Re))):r.a.createElement(se,g({isSecondary:!1},Re)))}var fe=r.a.forwardRef(he),me=(a(95),[new Date(2021,(new Date).getMonth(),6),new Date(2021,(new Date).getMonth(),12),new Date(2021,(new Date).getMonth(),14),new Date(2021,(new Date).getMonth(),16),new Date(2021,(new Date).getMonth(),24)]);function be(){var e=Object(n.useState)({hideAdjacentDates:!1,useDarkMode:!1,className:"myckass",size:276,fontSize:14,viewDate:Date,lockView:!1,showDualCalendar:!1,isMultiSelector:!1,isRangeSelector:!1,skipDisabledDatesInRange:!1,allowFewerDatesThanRange:!1,fixedRange:void 0,weekends:[6,0],startOfWeek:1,disablePast:!1,disableToday:!1,disableFuture:!1,isDisabled:void 0,highlights:me,minAllowedDate:void 0,maxAllowedDate:void 0}),t=Object(o.a)(e,2),a=t[0],l=t[1],i=Object(n.useState)(new Date),g=Object(o.a)(i,2),h=g[0],f=g[1],m=Object(n.useCallback)((function(e){f(e)}),[f]),b=Object(n.useState)(!1),w=Object(o.a)(b,2),v=w[0],D=w[1],y=Object(n.useState)("normal"),k=Object(o.a)(y,2),M=k[0],S=k[1];return r.a.createElement("div",{className:"demo"},r.a.createElement("div",{className:"view"},r.a.createElement("div",null,r.a.createElement("div",{className:"calendar"},r.a.createElement(fe,Object.assign({},a,{className:M,value:h,onChange:m}))))),r.a.createElement("div",{className:"props"},r.a.createElement("div",null,r.a.createElement(s.a,{toggle:!0,onChange:function(){return l(Object(c.a)(Object(c.a)({},a),{},{useDarkMode:!a.useDarkMode}))},checked:a.useDarkMode,label:"Use Dark Mode"})),r.a.createElement("div",null,r.a.createElement(s.a,{toggle:!0,onChange:function(){return l(Object(c.a)(Object(c.a)({},a),{},{hideAdjacentDates:!a.hideAdjacentDates}))},checked:a.hideAdjacentDates,label:"Hide Adjacent Dates"})),r.a.createElement("div",null,r.a.createElement(s.a,{toggle:!0,onChange:function(){return l(Object(c.a)(Object(c.a)({},a),{},{lockView:!a.lockView}))},checked:a.lockView,label:"Lock View"})),r.a.createElement("div",null,r.a.createElement(s.a,{toggle:!0,onChange:function(){return l(Object(c.a)(Object(c.a)({},a),{},{disablePast:!a.disablePast}))},checked:a.disablePast,label:"Disable Past"})),r.a.createElement("div",null,r.a.createElement(s.a,{toggle:!0,onChange:function(){return l(Object(c.a)(Object(c.a)({},a),{},{disableFuture:!a.disableFuture}))},checked:a.disableFuture,label:"Disable Future"})),r.a.createElement("div",null,r.a.createElement(s.a,{toggle:!0,onChange:function(){return l(Object(c.a)(Object(c.a)({},a),{},{disableToday:!a.disableToday}))},checked:a.disableToday,label:"Disable Today"})),r.a.createElement("div",null,r.a.createElement(s.a,{toggle:!0,onChange:function(){return l(Object(c.a)(Object(c.a)({},a),{},{isMultiSelector:!a.isMultiSelector},a.isMultiSelector?null:{isRangeSelector:!1,fixedRange:void 0}))},checked:a.isMultiSelector,label:"Multi Selector"})),r.a.createElement("div",null,r.a.createElement(s.a,{toggle:!0,onChange:function(){return l(Object(c.a)(Object(c.a)({},a),{},{isRangeSelector:!a.isRangeSelector}))},checked:a.isRangeSelector,label:"Range Selector"})),r.a.createElement("div",null,r.a.createElement(s.a,{toggle:!0,onChange:function(){return l(Object(c.a)(Object(c.a)({},a),{},{showDualCalendar:!a.showDualCalendar},a.showDualCalendar?null:{isRangeSelector:!0}))},checked:a.showDualCalendar,label:"Show Dual Calendar"})),r.a.createElement("div",null,r.a.createElement("h4",null,"Fixed Range Length"),r.a.createElement(u.a,{type:"number",placeholder:"Type -1 to remove",value:a.fixedRange,onChange:function(e,t){Number(t.value)<1?l(Object(c.a)(Object(c.a)({},a),{},{fixedRange:void 0})):l(Object(c.a)(Object(c.a)({},a),{},{fixedRange:Number(t.value),isRangeSelector:!0}))}})),r.a.createElement("div",null,r.a.createElement(s.a,{toggle:!0,onChange:function(){return l(Object(c.a)(Object(c.a)({},a),{},{skipDisabledDatesInRange:!a.skipDisabledDatesInRange},a.skipDisabledDatesInRange?null:{fixedRange:5,isRangeSelector:!0}))},checked:a.skipDisabledDatesInRange,label:"Skip Disabled Dates In Fixed Range"}))),r.a.createElement("div",{className:"props"},r.a.createElement("div",null,r.a.createElement("h4",null,"Calendar Size"),r.a.createElement(u.a,{min:276,max:700,type:"number",value:a.size,onChange:function(e,t){Number(t.value)<1?l(Object(c.a)(Object(c.a)({},a),{},{size:276})):l(Object(c.a)(Object(c.a)({},a),{},{size:Number(t.value)}))}})),r.a.createElement("div",null,r.a.createElement("h4",null,"Font Size"),r.a.createElement(u.a,{min:12,max:22,type:"number",value:a.fontSize,onChange:function(e,t){Number(t.value)<10?l(Object(c.a)(Object(c.a)({},a),{},{fontSize:14})):l(Object(c.a)(Object(c.a)({},a),{},{fontSize:Number(t.value)}))}})),r.a.createElement("div",null,r.a.createElement("h4",null,"Start Of Week"),r.a.createElement(s.a,{onChange:function(){return l(Object(c.a)(Object(c.a)({},a),{},{startOfWeek:0}))},checked:0===a.startOfWeek,label:"Sun"}),r.a.createElement(s.a,{onChange:function(){return l(Object(c.a)(Object(c.a)({},a),{},{startOfWeek:1}))},checked:1===a.startOfWeek,label:"Mon"}),r.a.createElement(s.a,{onChange:function(){return l(Object(c.a)(Object(c.a)({},a),{},{startOfWeek:2}))},checked:2===a.startOfWeek,label:"Tue"}),r.a.createElement(s.a,{onChange:function(){return l(Object(c.a)(Object(c.a)({},a),{},{startOfWeek:3}))},checked:3===a.startOfWeek,label:"Wed"}),r.a.createElement(s.a,{onChange:function(){return l(Object(c.a)(Object(c.a)({},a),{},{startOfWeek:4}))},checked:4===a.startOfWeek,label:"Thurs"}),r.a.createElement(s.a,{onChange:function(){return l(Object(c.a)(Object(c.a)({},a),{},{startOfWeek:5}))},checked:5===a.startOfWeek,label:"Fri"}),r.a.createElement(s.a,{onChange:function(){return l(Object(c.a)(Object(c.a)({},a),{},{startOfWeek:6}))},checked:6===a.startOfWeek,label:"Sat"})),r.a.createElement("div",null,r.a.createElement("h4",null,"Weekends"),r.a.createElement(u.a,{placeholder:"6,0",onChange:function(e,t){var n=t&&t.value.split(",").filter((function(e){return!!e})).map((function(e){return Number(e.trim())})).filter((function(e){return!isNaN(e)}));l(n?Object(c.a)(Object(c.a)({},a),{},{weekends:n}):Object(c.a)(Object(c.a)({},a),{},{weekends:[]}))}})),r.a.createElement("div",null,r.a.createElement("h4",null,"Move to Date"),r.a.createElement(d.a,{onClick:function(){l(Object(c.a)(Object(c.a)({},a),{},{viewDate:new Date(Math.floor(2400*Math.random())+1940,Math.floor(11*Math.random())+0,Math.floor(28*Math.random())+1)}))}},"Random Date"),r.a.createElement(d.a,{onClick:function(){l(Object(c.a)(Object(c.a)({},a),{},{viewDate:new Date}))}},"Today")),r.a.createElement("div",{dangerouslySetInnerHTML:{__html:v?"<style>.arc_view-days-of-month .arc_view_cell .arc_view_cell_value{border-radius: 50%;}</style>":"<span></span>"}}),r.a.createElement("div",null,r.a.createElement(s.a,{onChange:function(){return D(!v)},checked:a.roundButtonStyles,label:v?"Remove this css":"Apply this css",this:!0,CSS:!0}),r.a.createElement("pre",{style:{color:"rebeccapurple"}},".arc_view-days-of-month .arc_view_cell .arc_view_cell_value {\n  border-radius: 50%;\n}")),r.a.createElement("div",null,r.a.createElement("h4",null,"Easily Modify Theme Colors"),r.a.createElement(s.a,{onChange:function(){return S("green"!==M?"green":"normal")},checked:"green"===M,label:"Green"}),r.a.createElement(s.a,{onChange:function(){return S("violet"!==M?"violet":"normal")},checked:"violet"===M,label:"Violet"}),r.a.createElement("pre",{style:{color:"teal"}},".arc_root.green {\n  --arc-color-accent: #9fbb06;\n  --arc-color-accent-light: #ddea99;\n  --arc-color-accent-lighter: #f6f8e7;\n}\n\n.arc_root.violet {\n  --arc-color-primary: #8755ff;\n  --arc-color-primary-light: #e1c2f9;\n  --arc-color-primary-lighter: #f9ecff;\n}"))))}i.a.render(r.a.createElement(be,null),document.getElementById("root"))},93:function(e,t,a){},94:function(e,t,a){}},[[102,1,2]]]);
//# sourceMappingURL=main.7704e248.chunk.js.map