/*! For license information please see main.1099603b.chunk.js.LICENSE.txt */
(this["webpackJsonpreact-calendar-docs"]=this["webpackJsonpreact-calendar-docs"]||[]).push([[0],{13:function(e,t,a){},14:function(e,t,a){},22:function(e,t,a){"use strict";a.r(t);var n=a(1),i=a.n(n),c=a(5),r=a.n(c),l=(a(13),a(14),a(2)),s=a(7),d=a.n(s),o={0:"Su",1:"Mo",2:"Tu",3:"We",4:"Th",5:"Fr",6:"Sa"},u={0:"January",1:"February",2:"March",3:"April",4:"May",5:"June",6:"July",7:"August",8:"September",9:"October",10:"November",11:"December"};function h(e){return""+e.getFullYear()+e.getMonth()+e.getDate()}function j(e,t){if(t.getFullYear()<e.getFullYear())return!0;if(t.getFullYear()===e.getFullYear()){if(t.getMonth()<e.getMonth())return!0;if(t.getMonth()===e.getMonth()&&t.getDate()<e.getDate())return!0}return!1}function b(e){return"undefined"!==typeof e&&null!==e&&e.getTime&&!isNaN(e.getTime())}function g(e,t){return e.getFullYear()===t.getFullYear()&&e.getMonth()===t.getMonth()&&e.getDate()===t.getDate()}function v(e,t,a){var n=e.getFullYear(),i=e.getMonth(),c=e.getDate(),r=t.getFullYear(),l=t.getMonth(),s=t.getDate(),d=a.getFullYear(),o=a.getMonth(),u=a.getDate();return n<=d&&d<=r&&(n<d&&d<r||(n===r?i<=o&&o<=l&&(i<o&&o<l||(i===l?c<=u&&u<=s&&o===l:i===o?c<=u:l===o&&u<=s)):n===d?o>i||o===i&&u>=c:r===d&&(o<l||o===l&&u<=s)))}function O(e){return e%4===0&&e%100!==0||e%400===0}function f(e,t){return{0:31,1:O(e)?29:28,2:31,3:30,4:31,5:30,6:31,7:31,8:30,9:31,10:30,11:31}[t]}function w(e){return f(e.getFullYear(),e.getMonth())===e.getDate()}function m(e){return 0===e?11:e-1}function x(e){return 11===e?0:e+1}function y(e){return 1===e?1:e-1}function D(e){return e+1}function S(e){return function(e){return 11===e.getMonth()&&w(e)}(e)?new Date(e.getFullYear()+1,0,1):w(e)?new Date(e.getFullYear(),e.getMonth()+1,1):new Date(e.getFullYear(),e.getMonth(),e.getDate()+1)}function M(e,t){return void 0===t&&(t=0),e>=t?e-t:6-t+1+e}function p(e,t){var a=6-t;return e<=a?e+t:e-a-1}function k(e){return e%20===0?20*(e/20-1)+1:20*Number((e/20).toFixed(0))+1}function _(e){for(var t=e.isRangeSelectModeOn,a=e.isRangeView,n=e.selectedDate,i=e.selectedRangeStart,c=e.selectedRangeEnd,r=e.highlightsMap,l=e.newSelectedRangeStart,s=e.newSelectedRangeEnd,d=e.isSelectMultiDate,o=e.selectedMultiDates,u=e.yearInView,h=e.monthInView,j=e.startOfTheWeek,b=e.isDisabled,g=e.checkIfWeekend,v=[[],[],[],[],[],[]],O=function(e,t,a){var n=new Date;return n.setDate(1),n.setMonth(t),n.setFullYear(e),M(n.getDay(),a)}(u,h,j),w=new Date,D=f(u,h),S=0===h,p=11===h,k=f(S?y(u):u,m(h)),_=0,R=0,E=k-(O-1);E<=k;E++)7===R&&(R=0,_++),v[_].push(C({currDate:new Date(S?y(u):u,m(h),E),activeMonthInView:!1,highlightsMap:r,newSelectedRangeEnd:s,newSelectedRangeStart:l,selectedDate:n,selectedRangeEnd:c,selectedRangeStart:i,isDisabled:b,isRangeSelectModeOn:t,isRangeView:a,isSelectMultiDate:d,row:_,weekColumn:R,checkIfWeekend:g,today:w,selectedMultiDates:o,startOfTheWeek:j})),R++;for(var Y=1;Y<=D;Y++)7===R&&(R=0,_++),v[_].push(C({currDate:new Date(u,h,Y),activeMonthInView:!0,highlightsMap:r,newSelectedRangeEnd:s,newSelectedRangeStart:l,selectedDate:n,selectedRangeEnd:c,selectedRangeStart:i,isDisabled:b,isRangeSelectModeOn:t,isRangeView:a,isSelectMultiDate:d,row:_,weekColumn:R,checkIfWeekend:g,today:w,selectedMultiDates:o,startOfTheWeek:j})),R++;for(var F=1;v[5].length<7;)7===R&&(R=0,_++),v[_].push(C({currDate:new Date(p?u+1:u,x(h),F),activeMonthInView:!1,highlightsMap:r,newSelectedRangeEnd:s,newSelectedRangeStart:l,selectedDate:n,selectedRangeEnd:c,selectedRangeStart:i,isDisabled:b,isRangeSelectModeOn:t,isRangeView:a,isSelectMultiDate:d,row:_,weekColumn:R,checkIfWeekend:g,today:w,selectedMultiDates:o,startOfTheWeek:j})),R++,F++;return v}function C(e){var t=e.currDate,a=e.activeMonthInView,n=e.highlightsMap,i=e.newSelectedRangeEnd,c=e.newSelectedRangeStart,r=e.selectedDate,l=e.selectedRangeEnd,s=e.selectedRangeStart,d=e.isDisabled,o=e.isRangeSelectModeOn,u=e.isRangeView,O=e.isSelectMultiDate,f=e.row,w=e.weekColumn,m=e.checkIfWeekend,x=e.today,y=e.selectedMultiDates,D=e.startOfTheWeek;return{date:t,dayOfMonth:t.getDate(),month:t.getMonth(),activeMonthInView:a,isHighlight:1===n[h(t)],isInRange:!!u&&(o?!(!b(c)||!b(i))&&(j(i,c)?v(c,i,t):v(i,c,t)):!!s&&!!l&&v(s,l,t)),isRangeStart:!!u&&(o?!!b(c)&&g(c,t):!!s&&g(s,t)),isRangeEnd:!!u&&(!o&&(!!l&&g(l,t))),year:t.getFullYear(),dayOfWeek:p(w,D),isWeekend:m(t),isToday:g(t,x),isFirstRow:0===f,isLastRow:5===f,isFirsColumn:0===w,isLastColumn:6===w,isSelected:O?!!y[h(t)]:!u&&(!!r&&(t.getMonth()===r.getMonth()&&t.getFullYear()===r.getFullYear()&&t.getDate()===r.getDate())),isDisabled:d(t)}}var R={root:{height:"12%",padding:"1% 2%",display:"flex",alignTtems:"center",width:"100%"},arc_header_nav:{width:"10.14%",height:"100%",flex:"0 0 auto"},arch_header_label:{width:"65.21%",height:"100%",margin:"0 4.34%",flex:"1 1 auto",display:"flex",justifyContent:"center",alignItems:"center"}};function E(e){var t=e.onClickPrev,a=e.onChangeViewType,n=e.onClickNext,c=e.viewType,r=e.viewingMonth,l=e.viewingYear,s=e.yearMatrixEnd,d=e.yearMatrixStart;return i.a.createElement("header",{style:R.root,className:"arc_header"},i.a.createElement("button",{style:R.arc_header_nav,className:"arc_header_nav arc_header_nav-prev",onClick:t},i.a.createElement("span",null,"\u2190")),"month_dates"===c?i.a.createElement("button",{style:R.arch_header_label,className:"arc_header_label arc_header_label-days-of-month",onClick:function(){return a("years")}},i.a.createElement("div",null,i.a.createElement("span",null,u[r])),i.a.createElement("div",null,i.a.createElement("span",null,l))):"months"===c?i.a.createElement("button",{style:R.arch_header_label,className:"arc_header_label arc_header_label-months"},i.a.createElement("div",{onClick:function(){return a("years")}},i.a.createElement("span",null,l))):i.a.createElement("button",{style:R.arch_header_label,className:"arc_header_label arc_header_label-years",onClick:function(){return a("month_dates")}},i.a.createElement("div",null,i.a.createElement("span",null,d,"-",s))),i.a.createElement("button",{style:R.arc_header_nav,className:"arc_header_nav arc_header_nav-next",onClick:n},i.a.createElement("span",null,"\u2192")))}var Y=Object(n.memo)(E),F={width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center"},N={width:"95%",height:"45%",display:"flex",alignItems:"center",justifyContent:"center"};function I(e){var t=e.cell,a=e.onMonthClicked;return i.a.createElement("div",{style:F},i.a.createElement("button",{style:N,onClick:function(){a(t)}},u[t.month]))}var V=Object(n.memo)(I),T={root:{height:"100%"},arc_view_row:{height:"24.9%",display:"flex",width:"100%"},arc_view_cell:{flexBasis:"33.33%",maxWidth:"33.33%",height:"100%"}};function A(e){var t=e.onChangeViewingMonth,a=e.onChangeViewType,c=Object(n.useMemo)((function(){return function(e){var t=Array.from({length:12},(function(t,a){return{month:a,isCurrentMonth:(new Date).getMonth()===a,isSelectedMonth:1===e[a]}}));return[t.slice(0,3),t.slice(3,6),t.slice(6,9),t.slice(9,12)]}({})}),[]);return i.a.createElement("div",{style:T.root,className:"arc_view-months"},c.map((function(e,n){return i.a.createElement("div",{style:T.arc_view_row,className:"arc_view_row",key:n},e.map((function(e){return i.a.createElement("div",{style:T.arc_view_cell,className:"arc_view_cell"+(e.isCurrentMonth?" arc_this_month":""),key:e.month},i.a.createElement(V,{cell:e,onMonthClicked:function(e){t(e.month),a("month_dates")}}))})))})))}var W=Object(n.memo)(A),P={width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center"},L={width:"95%",height:"45%",display:"flex",alignItems:"center",justifyContent:"center"};function z(e){var t=e.cell,a=e.onYearClicked;return i.a.createElement("div",{style:P},i.a.createElement("button",{style:L,onClick:function(){a(t)}},t.year))}var J=Object(n.memo)(z),B={root:{height:"100%"},arc_view_row:{height:"24.9%",display:"flex",width:"100%"},arc_view_cell:{width:"20%",height:"100%"}};function H(e){var t=e.onChangeViewType,a=e.onChangeViewingYear,c=e.yearMatrixStart,r=Object(n.useMemo)((function(){return function(e,t){var a=Array.from({length:20},(function(a,n){return{year:e+n,isCurrentYear:(new Date).getFullYear()===e+n,isSelectedYear:1===t[e+n]}}));return[a.slice(0,5),a.slice(5,10),a.slice(10,15),a.slice(15,20)]}(c,{})}),[c]);return i.a.createElement("div",{style:B.root,className:"arc_view-years"},r.map((function(e,n){return i.a.createElement("div",{style:B.arc_view_row,className:"arc_view_row",key:n},e.map((function(e){return i.a.createElement("div",{style:B.arc_view_cell,className:"arc_view_cell"+(e.isCurrentYear?" arc_this_year":""),key:e.year},i.a.createElement(J,{cell:e,onYearClicked:function(e){a(e.year),t("months")}}))})))})))}var q=Object(n.memo)(H),G={arc_view_weekdays:{height:"15%",margin:"0",padding:0,display:"flex",width:"100%",listStyle:"none"},arc_view_weekdays_cell:{display:"flex",alignItems:"center",justifyContent:"center",height:"100%",flexBasis:"14.286%",maxWidth:"14.286%"},arc_view_weekdays_cell_value:{width:"65.95%",display:"flex",alignItems:"center",justifyContent:"center"}};function K(e){var t=e.weekStartIndex,a=e.weekendIndices,c=Object(n.useMemo)((function(){return function(e){void 0===e&&(e=0);var t=Object.keys(o).slice(e,7).concat(Object.keys(o).slice(0,e));return{map:t.reduce((function(e,t,a){return e[Number(a)]=o[Number(t)],e}),{}),order:t}}(t)}),[t]),r=c.order,l=c.map,s=Object(n.useMemo)((function(){return a.reduce((function(e,t){return e[t]=1,e}),{})}),[a]);return i.a.createElement("ul",{style:G.arc_view_weekdays,className:"arc_view_weekdays"},r.map((function(e,t){return i.a.createElement("li",{style:G.arc_view_weekdays_cell,key:e,className:"arc_view_weekdays_cell"+(s[t]?" arc_wknd":"")},i.a.createElement("div",{style:G.arc_view_weekdays_cell_value},i.a.createElement("span",null,l[t])))})))}var Q=Object(n.memo)(K),U=function(){return(U=Object.assign||function(e){for(var t,a=1,n=arguments.length;a<n;a++)for(var i in t=arguments[a])Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e}).apply(this,arguments)},X={width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center"},Z={width:"69.80%",height:"80%",display:"flex",alignItems:"center",justifyContent:"center"},$={width:"100%",height:"100%"};function ee(e){var t=e.cell,a=e.onDateClicked;return i.a.createElement("div",{style:X},i.a.createElement("div",{style:Z,className:"arc_view_cell_value"},i.a.createElement("button",{style:$,disabled:t.isDisabled,tabIndex:t.isDisabled?-1:0,onClick:function(){return a(t)}},t.dayOfMonth)))}var te=Object(n.memo)(ee),ae={"arc_view-days-of-month":{height:"85%"},arc_view_row:{height:"16.664%",display:"flex",width:"100%",alignItems:"center"},arc_view_cell:{flexBasis:"14.286%",maxWidth:"14.286%",height:"100%"}};function ne(e){var t=e.selectedDate,a=e.selectedRangeStart,c=e.selectedRangeEnd,r=e.newSelectedRangeStart,l=e.weekStartIndex,s=e.onChangeViewingYear,d=e.onChangeViewingMonth,o=e.newSelectedRangeEnd,u=e.isRangeSelectorView,v=e.skipDisabledDatesInRange,O=e.setIsRangeSelectModeOn,f=e.fixedRangeLength,w=e.isFixedRangeView,m=e.isRangeSelectModeOn,x=e.isDisabled,y=e.onChangenSelectedMultiDates,D=e.selectedMultiDates,M=e.isMultiSelectorView,p=e.today,k=e.viewingMonth,C=e.onChangenNewSelectedRangeEnd,R=e.onChangenNewSelectedRangeStart,E=e.onChangenSelectedRangeEnd,Y=e.onChangenSelectedRangeStart,F=e.onChangenSelectedDate,N=e.weekendIndices,I=e.onChange,V=e.viewingYear,T=e.allowFewerDatesThanRange,A=e.disableFuture,W=e.disablePast,P=e.lockView,L=e.checkIfWeekend,z=e.onPartialRangeSelect,J=e.onEachMultiSelect,B=e.highlights,H=e.disableToday,q=Object(n.useState)((function(){return Array.isArray(B)?B.filter((function(e){return b(e)})).reduce((function(e,t){return e[h(t)]=1,e}),{}):{}}))[0],G=Object(n.useMemo)((function(){return _({selectedDate:t,selectedRangeStart:a,selectedRangeEnd:c,newSelectedRangeStart:r,newSelectedRangeEnd:o,checkIfWeekend:L,isRangeView:u||w,isRangeSelectModeOn:m,weekendIndexes:N,selectedMultiDates:D,highlightsMap:q,isSelectMultiDate:M,yearInView:V,monthInView:k,startOfTheWeek:l,disableFuture:A,disablePast:W,disableToday:H,isDisabled:x})}),[t,a,c,r,o,u,w,m,L,N,D,q,M,V,k,l,A,W,H,x]),K=Object(n.useCallback)((function(e){var t=e.date;if(!(P&&t.getMonth()!==k)){if(u&&!w)if(m&&r){var a=new Date(r.getFullYear(),r.getMonth(),r.getDate());if(j(a,t)){Y(t),E(a);var n=t,i=a;I&&I([n,i])}else{Y(a),E(t);n=a,i=t;I&&I([n,i])}C(void 0),O(!1)}else R(t),C(void 0),O(!0),z&&z(t);else if(w){Y(t);var c=function(e,t,a){for(var n=t,i=e,c=!1,r=0;n>0;){if(1500===r){c=!0;break}var l=S(i);if(a.upperLimit&&g(a.upperLimit,l)){c=!0;break}i=l,a.skipDisabledDatesInRange?a.skipDisabledDatesInRange&&!a.isDisabled(l)&&n--:n--,r++}return{endDate:i,limitReached:c}}(t,f,{isDisabled:x,skipDisabledDatesInRange:v,upperLimit:P?new Date(t.getFullYear(),t.getMonth()+1,1):A?S(p):void 0});i=c.endDate;c.limitReached&&!T?(Y(void 0),E(void 0)):(E(i),I&&I([t,i]))}else if(M){var l=h(t),o=U({},D);D[l]?o[l]=void 0:o[l]=t,y(o),J&&J(t),I&&I(Object.keys(o).filter((function(e){return!!o[e]})).map((function(e){return o[e]})))}else F(t),I&&I(t);d(e.month),s(e.year)}}),[P,k,u,w,M,d,s,m,r,C,O,Y,E,I,R,f,x,v,A,p,T,D,y,F]);return i.a.createElement("div",{style:ae["arc_view-days-of-month"],className:"arc_view-days-of-month",role:"grid"},G.map((function(e,t){return i.a.createElement("div",{style:ae.arc_view_row,className:"arc_view_row",key:t},e.map((function(e){return i.a.createElement("div",{style:ae.arc_view_cell,onMouseEnter:function(){u&&m&&C(new Date(e.year,e.month,e.dayOfMonth))},key:e.dayOfMonth,className:"arc_view_cell"+(e.activeMonthInView?" arc_active":"")+(e.isWeekend?" arc_wknd":"")+(e.isToday?" arc_today":"")+(e.isFirstRow?" arc_fr":"")+(e.isToday?" arc_today":"")+(e.isHighlight?" arc_highlight":"")+(e.isLastRow?" arc_lr":"")+(e.isFirsColumn?" arc_fc":"")+(e.isLastColumn?" arc_lc":"")+(e.isSelected&&!u?" arc_selected":"")+(e.isDisabled?" arc_disabled":"")+(e.isInRange?" arc_in_range":"")+(e.isRangeStart?" arc_range_start":"")+(e.isRangeEnd?" arc_range_end":"")+(m?" arc_range_mode":"")},i.a.createElement(te,{cell:e,onDateClicked:K}))})))})))}var ie=Object(n.memo)(ne),ce=[];function re(e,t){var a=e.value,c=e.isMultiSelector,r=e.className,l=void 0===r?"":r,s=e.isRangeSelector,d=e.useDarkMode,o=void 0!==d&&d,u=e.weekends,g=e.highlights,v=void 0===g?ce:g,O=e.skipWeekendsInRange,f=void 0!==O&&O,w=e.viewDate,S=e.allowFewerDatesThanRange,p=void 0!==S&&S,_=e.startOfWeek,C=void 0===_?1:_,R=e.maxAllowedDate,E=e.skipDisabledDatesInRange,F=void 0!==E&&E,N=e.minAllowedDate,I=e.fixedRange,V=e.isDisabled,T=e.onPartialRangeSelect,A=e.onEachMultiSelect,P=e.onChange,L=e.lockView,z=void 0!==L&&L,J=e.disableFuture,B=void 0!==J&&J,H=e.size,G=void 0===H?276:H,K=e.fontSize,U=void 0===K?16:K,X=e.disablePast,Z=void 0!==X&&X,$=e.disableToday,ee=void 0!==$&&$,te=Object(n.useMemo)((function(){return function(e,t){return{root:{arc:{width:e+"px",height:e+"px",fontSize:t+"px",display:"flex",alignItems:"flex-start",flexDirection:"column",boxSizing:"border-box"},arc_view:{height:"88%",width:"100%"}}}}(G,U)}),[G,U]),ae=Object(n.useState)(new Date)[0],ne=Object(n.useState)(!!s)[0],re=Object(n.useState)(!ne&&!!c)[0],le=Object(n.useState)(!!(ne&&"number"===typeof I&&I>0))[0],se=Object(n.useState)(!ne&&!re)[0],de=Object(n.useState)(!1),oe=de[0],ue=de[1];if(se&&Array.isArray(a))throw new Error("`value` should an instance of the Date class. Provided value is an Array.");var he=Object(n.useState)(le?I:1)[0],je=Object(n.useState)(C)[0],be=Object(n.useState)((function(){return Array.isArray(u)&&(u.every((function(e){return"number"===typeof e}))||0===u.length)?u:function(e){return 0===e?[6,0]:1===e?[5,6]:2===e?[4,5]:3===e?[3,4]:4===e?[2,3]:5===e?[1,2]:[0,1]}(je)}))[0],ge=Object(n.useState)((function(){if(se&&b(a)){var e=a.getFullYear(),t=a.getMonth(),n=a.getDate();return new Date(e,t,n)}})),ve=ge[0],Oe=ge[1],fe=Object(n.useState)((function(){return re&&Array.isArray(a)&&a.every(b)?a.reduce((function(e,t){return b(t)&&(e[h(t)]=t),e}),{}):{}})),we=fe[0],me=fe[1],xe=Object(n.useState)((function(){if(ne&&Array.isArray(a)&&b(a[0])){var e=a[0].getFullYear(),t=a[0].getMonth(),n=a[0].getDate();return new Date(e,t,n)}})),ye=xe[0],De=xe[1],Se=Object(n.useState)((function(){if(ne&&ye&&Array.isArray(a)&&b(a[1])&&j(a[1],ye)){var e=a[1].getFullYear(),t=a[1].getMonth(),n=a[1].getDate();return new Date(e,t,n)}})),Me=Se[0],pe=Se[1],ke=Object(n.useState)(ye),_e=ke[0],Ce=ke[1],Re=Object(n.useState)(Me),Ee=Re[0],Ye=Re[1],Fe=Object(n.useState)("month_dates"),Ne=Fe[0],Ie=Fe[1],Ve=Object(n.useState)(b(w)?w.getMonth():se&&b(a)?a.getMonth():ne&&ye?ye.getMonth():re&&Array.isArray(a)&&b(a[0])?a[0].getMonth():b(N)?N.getMonth():b(R)?R.getMonth():ae.getMonth()),Te=Ve[0],Ae=Ve[1],We=Object(n.useState)(b(w)?w.getFullYear():se&&b(a)?a.getFullYear():ne&&ye?ye.getFullYear():re&&Array.isArray(a)&&b(a[0])?a[0].getFullYear():b(N)?N.getFullYear():b(R)?R.getFullYear():ae.getFullYear()),Pe=We[0],Le=We[1];Object(n.useEffect)((function(){b(w)&&(Ae(w.getMonth()),Le(w.getFullYear()))}),[w]);var ze=Object(n.useCallback)((function(e){!z&&Ae(e)}),[z,Ae]),Je=Object(n.useCallback)((function(e){!z&&Le(e)}),[z,Le]),Be=Object(n.useCallback)((function(e){!z&&Ie(e)}),[z,Ie]),He=Object(n.useState)(k(Pe)),qe=He[0],Ge=He[1];Object(n.useEffect)((function(){Ge(k(Pe))}),[Pe,Ge]);var Ke=Object(n.useMemo)((function(){return[e=qe,e+19];var e}),[qe]),Qe=Ke[0],Ue=Ke[1],Xe=Object(n.useCallback)((function(){var e;"month_dates"===Ne&&(0===Te&&Le(y(Pe)),ze(m(Te)));"years"===Ne&&Ge(1===(e=qe)?1:k(e-1)),"months"===Ne&&Je(1!==Pe?Pe-1:1)}),[ze,Te,Je,Pe,Ne,Ge,qe]),Ze=Object(n.useCallback)((function(){"month_dates"===Ne&&(11===Te&&Je(D(Pe)),ze(x(Te)));"years"===Ne&&Ge(k(qe+20)),"months"===Ne&&Je(D(Pe))}),[ze,Te,Je,Pe,Ne,Ge,qe]),$e=Object(n.useMemo)((function(){return"string"===typeof l?"arc "+(o?"dark":"")+" "+l:"arc "+(o?"dark":"")}),[l,o]),et=Object(n.useState)((function(){return b(R)?R:ae}))[0],tt=Object(n.useState)((function(){return b(N)?N:ae}))[0],at=Object(n.useState)((function(){return!!b(R)&&(!b(N)||j(R,N))}))[0],nt=Object(n.useState)((function(){return!!b(N)&&(!b(R)||j(R,N))}))[0],it=Object(n.useMemo)((function(){return function(e){var t=e.disablePast,a=e.disableToday,n=e.disableFuture,i=e.customDisabledCheck,c=e.maxDate,r=e.minDate,l=e.applyMax,s=e.applyMin,d=new Date,o=d.getFullYear(),u=d.getMonth(),h=d.getDate();return function(e){if(t){if(e.getFullYear()<o)return!0;if(e.getFullYear()===o&&e.getMonth()<u)return!0;if(e.getFullYear()===o&&e.getMonth()===u&&e.getDate()<h)return!0}if(a&&e.getFullYear()===o&&e.getMonth()===u&&e.getDate()===h)return!0;if(n){if(e.getFullYear()>o)return!0;if(e.getFullYear()===o&&e.getMonth()>u)return!0;if(e.getFullYear()===o&&e.getMonth()===u&&e.getDate()>h)return!0}return!(!l||!j(e,c))||!(!s||!j(r,e))||"function"===typeof i&&i(e)}}({disablePast:Z,disableToday:ee,disableFuture:B,customDisabledCheck:V,maxDate:et,minDate:tt,applyMax:at,applyMin:nt})}),[at,nt,B,Z,ee,V,et,tt]),ct=Object(n.useMemo)((function(){return function(e,t){var a=e.reduce((function(e,t){return e[t]=1,e}),{});return function(e){return 1===a[M(e.getDay(),t)]}}(be,je)}),[je,be]);return i.a.createElement("div",{ref:t,style:te.root.arc,className:$e},i.a.createElement(Y,{onClickPrev:Xe,onClickNext:Ze,onChangeViewType:Be,viewType:Ne,viewingMonth:Te,viewingYear:Pe,yearMatrixStart:Qe,yearMatrixEnd:Ue}),i.a.createElement("div",{style:te.root.arc_view,className:"arc_view"},"months"===Ne&&i.a.createElement(W,{onChangeViewType:Be,onChangeViewingMonth:ze}),"years"===Ne&&i.a.createElement(q,{onChangeViewType:Be,onChangeViewingYear:Je,yearMatrixStart:Qe,yearMatrixEnd:Ue}),"month_dates"===Ne&&i.a.createElement(i.a.Fragment,null,i.a.createElement(Q,{weekStartIndex:je,weekendIndices:be}),i.a.createElement(ie,{isRangeSelectModeOn:oe,setIsRangeSelectModeOn:ue,skipDisabledDatesInRange:!!F,allowFewerDatesThanRange:!!p,selectedDate:ve,selectedRangeStart:ye,selectedRangeEnd:Me,lockView:!!z,newSelectedRangeStart:_e,weekStartIndex:je,onChangeViewingYear:Je,onChangeViewingMonth:ze,onChangenSelectedMultiDates:me,onChangenNewSelectedRangeEnd:Ye,onChangenNewSelectedRangeStart:Ce,onChangenSelectedRangeEnd:pe,onChangenSelectedRangeStart:De,onChangenSelectedDate:Oe,onPartialRangeSelect:T,onEachMultiSelect:A,newSelectedRangeEnd:Ee,isRangeSelectorView:ne,fixedRangeLength:he,isFixedRangeView:le,isDisabled:it,checkIfWeekend:ct,selectedMultiDates:we,isMultiSelectorView:re,viewingMonth:Te,today:ae,maxAllowedDate:R,minAllowedDate:N,weekendIndices:be,skipWeekendsInRange:!!f,onChange:P,viewingYear:Pe,disableFuture:B,disablePast:Z,highlights:v,disableToday:ee}))))}var le=i.a.forwardRef(re),se=function(e){return function(e){var t={YYYY:!0,MM:!0,DD:!0},a=e.split("-");if(3!==a.length)throw new Error("Date format is invalid.");if(!a.every((function(e){return t[e]})))throw new Error("Date format uses unknown parts.");return function(e,t){if(b(e)){var n="";return a.forEach((function(a,i){"YYYY"===a&&(n+=e.getFullYear()),"MM"===a&&(n+=e.getMonth()),"DD"===a&&(n+=e.getDate()),2!==i&&(n+=t)})),n}}}(e||"DD-MM-YYYY")},de=a(8),oe=a(0);function ue(){var e=Object(n.useState)(!1),t=Object(l.a)(e,2),a=t[0],i=t[1],c=Object(n.useState)({}),r=Object(l.a)(c,2),s=(r[0],r[1]),o=Object(n.useCallback)((function(e){s(e)}),[s]),u=Object(n.useState)({}),h=Object(l.a)(u,2),j=(h[0],h[1]),b=Object(n.useCallback)((function(e){j(e)}),[j]),g=Object(n.useState)({}),v=Object(l.a)(g,2),O=(v[0],v[1]),f=Object(n.useCallback)((function(e){O(e)}),[O]),w=Object(n.useState)({}),m=Object(l.a)(w,2),x=(m[0],m[1]),y=Object(n.useCallback)((function(e){x(e)}),[x]),D=Object(n.useState)({}),S=Object(l.a)(D,2),M=(S[0],S[1]),p=Object(n.useCallback)((function(e){M(e)}),[M]),k=Object(n.useState)({}),_=Object(l.a)(k,2),C=(_[0],_[1]),R=Object(n.useCallback)((function(e){C(e)}),[C]),E=Object(n.useState)({}),Y=Object(l.a)(E,2),F=(Y[0],Y[1]),N=Object(n.useCallback)((function(e){F(e)}),[F]),I=Object(n.useState)({}),V=Object(l.a)(I,2),T=(V[0],V[1]),A=Object(n.useCallback)((function(e){T(e)}),[T]),W=Object(n.useState)({}),P=Object(l.a)(W,2),L=(P[0],P[1]),z=Object(n.useCallback)((function(e){L(e)}),[L]),J=Object(n.useState)({}),B=Object(l.a)(J,2),H=B[0],q=B[1],G=Object(n.useCallback)((function(e){q(e)}),[q]),K=Object(n.useState)({}),Q=Object(l.a)(K,2),U=Q[0],X=Q[1],Z=Object(n.useCallback)((function(e){X(e)}),[X]),$=Object(n.useState)({}),ee=Object(l.a)($,2),te=(ee[0],ee[1]),ae=Object(n.useCallback)((function(e){te(e)}),[te]),ne=Object(n.useState)([]),ie=Object(l.a)(ne,2),ce=(ie[0],ie[1]),re=Object(n.useCallback)((function(e){ce(e)}),[ce]),ue=Object(n.useState)({}),he=Object(l.a)(ue,2),je=(he[0],he[1]),be=Object(n.useCallback)((function(e){je(e)}),[je]),ge=Object(n.useState)({}),ve=Object(l.a)(ge,2),Oe=(ve[0],ve[1]),fe=Object(n.useCallback)((function(e){Oe(e)}),[Oe]),we=Object(n.useState)(new Date),me=Object(l.a)(we,2),xe=me[0],ye=me[1],De=new Date(2021,7,28),Se=new Date(2021,7,4);return Object(oe.jsxs)("div",{className:"demo",children:[Object(oe.jsxs)("div",{children:[Object(oe.jsx)("div",{children:Object(oe.jsx)("p",{children:"Default"})}),Object(oe.jsx)("div",{children:Object(oe.jsx)("div",{className:"calendar",children:Object(oe.jsx)(le,{onChange:z})})})]}),Object(oe.jsxs)("div",{children:[Object(oe.jsx)("div",{className:"desc",children:Object(oe.jsx)("p",{children:"Multiple Dates View"})}),Object(oe.jsx)("div",{children:Object(oe.jsx)("div",{className:"calendar",children:Object(oe.jsx)(le,{value:[new Date(2021,6,22),new Date(2021,6,25),new Date(2021,6,9)],isMultiSelector:!0,disableToday:!0,onChange:o})})})]}),Object(oe.jsxs)("div",{children:[Object(oe.jsx)("div",{children:Object(oe.jsx)("p",{children:"Range Select View"})}),Object(oe.jsx)("div",{children:Object(oe.jsx)("div",{className:"calendar",children:Object(oe.jsx)(le,{isRangeSelector:!0,disableToday:!0,value:[new Date(2021,0,8),new Date(2021,0,20)],onChange:f})})})]}),Object(oe.jsxs)("div",{children:[Object(oe.jsx)("div",{children:Object(oe.jsx)("p",{children:"Range Select View With Min-Max Allowed Dates"})}),Object(oe.jsx)("div",{children:Object(oe.jsx)("div",{className:"calendar",children:Object(oe.jsx)(le,{isRangeSelector:!0,maxAllowedDate:De,minAllowedDate:Se,disableToday:!0,onChange:b})})})]}),Object(oe.jsxs)("div",{children:[Object(oe.jsx)("div",{children:Object(oe.jsx)("p",{children:"Fixed Range View (6 Days)"})}),Object(oe.jsx)("div",{children:Object(oe.jsx)("div",{className:"calendar",children:Object(oe.jsx)(le,{isRangeSelector:!0,fixedRange:6,onChange:re})})})]}),Object(oe.jsxs)("div",{children:[Object(oe.jsx)("div",{children:Object(oe.jsx)("p",{children:"Highlight Custom Dates"})}),Object(oe.jsx)("div",{children:Object(oe.jsx)("div",{className:"calendar",children:Object(oe.jsx)(le,{initialViewDate:new Date(2020,5,6),highlights:[new Date(2020,5,6),new Date(2020,5,12),new Date(2020,5,16),new Date(2020,5,24)],onChange:be})})})]}),Object(oe.jsxs)("div",{children:[Object(oe.jsx)("div",{children:Object(oe.jsx)("p",{children:"Can disable custom dates (here disabled if (date % 4 === 0))"})}),Object(oe.jsx)("div",{children:Object(oe.jsx)("div",{className:"calendar",children:Object(oe.jsx)(le,{isDisabled:function(e){return e.getDate()%4===0},onChange:fe})})})]}),Object(oe.jsxs)("div",{children:[Object(oe.jsx)("div",{children:Object(oe.jsx)("p",{children:"Can enable skipping disabled dates when doing fixed range(5 here) selections"})}),Object(oe.jsx)("div",{children:Object(oe.jsx)("div",{className:"calendar",children:Object(oe.jsx)(le,{isRangeSelector:!0,fixedRange:5,skipDisabledDatesInRange:!0,isDisabled:function(e){return e.getDate()%3===0},onChange:N})})})]}),Object(oe.jsxs)("div",{children:[Object(oe.jsxs)("div",{children:[Object(oe.jsx)("p",{children:"Can enable/disable selecting fewer dates than range if dates are not available"}),Object(oe.jsx)("small",{children:"Normally it will select 4 dates after the first one but when future dates are disabled then it can even select lesser than 4 dates. This behaviour can be disabled."})]}),Object(oe.jsx)("div",{children:Object(oe.jsx)("div",{className:"calendar",children:Object(oe.jsx)(le,{allowFewerDatesThanRange:!0,disableFuture:!0,isRangeSelector:!0,fixedRange:4,onChange:re})})})]}),Object(oe.jsxs)("div",{children:[Object(oe.jsx)("div",{children:Object(oe.jsx)("p",{children:"Can change start day of the week (Wed here)"})}),Object(oe.jsx)("div",{children:Object(oe.jsx)("div",{className:"calendar",children:Object(oe.jsx)(le,{viewDate:xe,startOfWeek:3,onChange:y})})}),Object(oe.jsxs)("div",{children:[Object(oe.jsx)("button",{onClick:function(){ye(new Date(2016,1,13))},children:"Move to 2016, Feb, 13"}),Object(oe.jsx)("button",{style:{marginLeft:"16px"},onClick:function(){ye(new Date)},children:"Move to Today"})]})]}),Object(oe.jsxs)("div",{children:[Object(oe.jsx)("div",{children:Object(oe.jsx)("p",{children:"Can specify weekend days (Fri, Sat, Sun here)"})}),Object(oe.jsx)("div",{children:Object(oe.jsx)("div",{className:"calendar",children:Object(oe.jsx)(le,{weekends:[4,5,6],onChange:p})})})]}),Object(oe.jsxs)("div",{children:[Object(oe.jsx)("div",{children:Object(oe.jsx)("p",{children:"Can disable highlighting Weekends"})}),Object(oe.jsx)("div",{children:Object(oe.jsx)("div",{className:"calendar",children:Object(oe.jsx)(le,{weekends:[],onChange:p})})})]}),Object(oe.jsxs)("div",{children:[Object(oe.jsx)("div",{children:Object(oe.jsx)("p",{children:"Can set if past,today,future is disabled by simple props"})}),Object(oe.jsxs)("div",{children:[Object(oe.jsx)("div",{className:"calendar",children:Object(oe.jsx)(le,{disablePast:!0,onChange:R})}),Object(oe.jsx)("div",{className:"calendar",children:Object(oe.jsx)(le,{disableToday:!0,value:new Date((new Date).getFullYear(),(new Date).getMonth(),(new Date).getDate()+1),onChange:N})}),Object(oe.jsx)("div",{className:"calendar",children:Object(oe.jsx)(le,{disableFuture:!0,onChange:A})})]})]}),Object(oe.jsxs)("div",{children:[Object(oe.jsx)("div",{children:Object(oe.jsx)("p",{children:"Can lock the calendar to a specific month/year"})}),Object(oe.jsx)("div",{children:Object(oe.jsx)("div",{className:"calendar",children:Object(oe.jsx)(le,{lockView:!0,onChange:R})})})]}),Object(oe.jsxs)("div",{children:[Object(oe.jsx)("div",{children:Object(oe.jsx)("p",{children:"Can set output date format (YYYY-DD-MM here)"})}),Object(oe.jsxs)("div",{children:[Object(oe.jsx)("div",{className:"calendar",children:Object(oe.jsx)(le,{onChange:G})}),Object(oe.jsx)("div",{className:"json",children:se("YYYY-DD-MM")(H,"-")})]})]}),Object(oe.jsxs)("div",{children:[Object(oe.jsx)("div",{children:Object(oe.jsx)("p",{children:"Can set output date separator (# here)"})}),Object(oe.jsxs)("div",{children:[Object(oe.jsx)("div",{className:"calendar",children:Object(oe.jsx)(le,{onChange:Z})}),Object(oe.jsx)("div",{className:"json",children:Object(oe.jsx)("div",{className:"json",children:se("YYYY-DD-MM")(U,"#")})})]})]}),Object(oe.jsxs)("div",{children:[Object(oe.jsx)("div",{children:Object(oe.jsx)("p",{children:"Can be rendered inside a popover"})}),Object(oe.jsx)("div",{style:{justifyContent:"flex-start",width:"202px"},children:Object(oe.jsxs)("div",{className:"input",children:[Object(oe.jsx)("input",{value:se("YYYY-DD-MM")(H,"#")}),Object(oe.jsx)(de.Popover,{isOpen:a,padding:6,positions:["bottom","top","left","right"],content:Object(oe.jsx)(le,{value:H,onChange:function(e){q(e),i(!1)}}),children:Object(oe.jsx)("div",{onClick:function(){return i(!a)},children:"\ud83d\uddd3"})})]})})]}),Object(oe.jsxs)("div",{children:[Object(oe.jsx)("div",{children:Object(oe.jsx)("p",{children:"Can Set Initial Month&Date View To Show (Sept, 2020 here)"})}),Object(oe.jsx)("div",{children:Object(oe.jsx)("div",{className:"calendar",children:Object(oe.jsx)(le,{viewDate:new Date(2020,8,9),onChange:ae})})})]}),Object(oe.jsxs)("div",{children:[Object(oe.jsx)("div",{children:Object(oe.jsx)("p",{children:"Easy to theme using CSS variables"})}),Object(oe.jsxs)("div",{children:[Object(oe.jsx)("div",{children:Object(oe.jsx)(le,{className:"green",isRangeSelector:!0})}),Object(oe.jsx)("div",{children:Object(oe.jsx)(le,{className:"brown"})}),Object(oe.jsx)("div",{children:Object(oe.jsx)(le,{className:"violet",isRangeSelector:!0,fixedRange:4})})]})]}),Object(oe.jsxs)("div",{children:[Object(oe.jsx)("div",{children:Object(oe.jsx)("p",{children:"In-built and customizable dark mode"})}),Object(oe.jsxs)("div",{children:[Object(oe.jsx)("div",{children:Object(oe.jsx)(le,{useDarkMode:!0,isRangeSelector:!0})}),Object(oe.jsx)("div",{children:Object(oe.jsx)(le,{useDarkMode:!0})})]})]}),Object(oe.jsxs)("div",{children:[Object(oe.jsx)("div",{children:Object(oe.jsx)("p",{children:"Can easily adjust scale"})}),Object(oe.jsxs)("div",{children:[Object(oe.jsx)("div",{children:Object(oe.jsx)(le,{fontSize:20,size:600,isRangeSelector:!0})}),Object(oe.jsx)("div",{children:Object(oe.jsx)(le,{fontSize:17,size:400,isMultiSelector:!0})})]})]}),Object(oe.jsxs)("div",{children:[Object(oe.jsxs)("div",{children:[Object(oe.jsx)("p",{children:"Can be rendered on the server-side"}),Object(oe.jsx)("small",{children:"The following markup is created using ReactDomServer.renderToStaticMarkup() method"})]}),Object(oe.jsx)("div",{dangerouslySetInnerHTML:{__html:d.a.renderToStaticMarkup(Object(oe.jsx)(le,{value:[new Date(2021,6,22),new Date(2021,6,25),new Date(2021,6,9)],isMultiSelector:!0,disableToday:!0,onChange:o}))}})]})]})}r.a.render(Object(oe.jsx)(ue,{}),document.getElementById("root"))}},[[22,1,2]]]);
//# sourceMappingURL=main.1099603b.chunk.js.map