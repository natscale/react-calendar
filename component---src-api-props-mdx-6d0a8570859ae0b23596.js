(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{vIAq:function(e,t,a){"use strict";a.r(t),a.d(t,"_frontmatter",(function(){return x})),a.d(t,"default",(function(){return A}));var n=a("Fcif"),l=a("+I+c"),b=(a("mXGw"),a("/FXl")),r=a("TjRS"),c=a("5hvn"),d=a("MnpQ"),i=a("EOjB"),p=a("+rpM"),o=a("T7tZ"),u=a("vf6B"),m=a("jIR0"),s=a("L6Tl"),j=a("APOG"),O=a("BY/W"),N=a("Kzln"),g=a("YFEh"),h=a("hdXt"),C=a("pCPt"),f=a("jtQ+"),y=a("HGik"),v=a("dFG0"),D=a("8PDC"),k=a("qvrG"),V=a("rLG/"),w=(a("aD51"),["components"]),x={};void 0!==x&&x&&x===Object(x)&&Object.isExtensible(x)&&!Object.prototype.hasOwnProperty.call(x,"__filemeta")&&Object.defineProperty(x,"__filemeta",{configurable:!0,value:{name:"_frontmatter",filename:"src/API/Props.mdx"}});var S={_frontmatter:x},T=r.a;function A(e){var t=e.components,a=Object(l.a)(e,w);return Object(b.b)(T,Object(n.a)({},S,a,{components:t,mdxType:"MDXLayout"}),Object(b.b)("h2",{id:"basic"},"Basic"),Object(b.b)("p",null,"By default the calendar starts from Sun which is represented 0 index.\nYou can provide the index for any other day that you want as start of the week."),Object(b.b)(d.a,{mdxType:"Value"}),Object(b.b)("table",null,Object(b.b)("thead",{parentName:"table"},Object(b.b)("tr",{parentName:"thead"},Object(b.b)("th",{parentName:"tr",align:null},"Prop"),Object(b.b)("th",{parentName:"tr",align:null},"Type"))),Object(b.b)("tbody",{parentName:"table"},Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("inlineCode",{parentName:"td"},"value")," (required)"),Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("inlineCode",{parentName:"td"},"Date"))),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("inlineCode",{parentName:"td"},"onChange")," (required)"),Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("inlineCode",{parentName:"td"},"(value: Date) => void"))))),Object(b.b)("pre",null,Object(b.b)("code",{parentName:"pre",className:"language-js"},"import React, { useCallback, useState } from 'react';\n\nimport { Calendar } from '@natscale/react-calendar';\n\nimport '@natscale/react-calendar/dist/main.css';\n\nexport function App() {\n  const [value, setValue] = useState(new Date());\n\n  const onChange = useCallback(\n    (val) => {\n      setValue(val);\n    },\n    [setValue],\n  );\n\n  return <Calendar value={value} onChange={onChange} />;\n}\n")),Object(b.b)("h2",{id:"start-day-of-week"},"Start Day Of Week"),Object(b.b)("p",null,"By default the calendar starts from Sun which is represented 0 index.\nYou can provide the index for any other day that you want as start of the week."),Object(b.b)(i.a,{mdxType:"StartOfWeek"}),Object(b.b)("table",null,Object(b.b)("thead",{parentName:"table"},Object(b.b)("tr",{parentName:"thead"},Object(b.b)("th",{parentName:"tr",align:null},"Prop"),Object(b.b)("th",{parentName:"tr",align:null},"Type"),Object(b.b)("th",{parentName:"tr",align:null},"Default"),Object(b.b)("th",{parentName:"tr",align:null},"Enum"))),Object(b.b)("tbody",{parentName:"table"},Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("inlineCode",{parentName:"td"},"startOfWeek")),Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("inlineCode",{parentName:"td"},"number")),Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("inlineCode",{parentName:"td"},"0")),Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("inlineCode",{parentName:"td"},"0 , 1 , 2 , 3 , 4 , 5 , 6"))))),Object(b.b)("pre",null,Object(b.b)("code",{parentName:"pre",className:"language-js"},"import React, { useCallback, useState } from 'react';\n\nimport { Calendar } from '@natscale/react-calendar';\n\nimport '@natscale/react-calendar/dist/main.css';\n\nexport function App() {\n  const [value, setValue] = useState(new Date());\n\n  const onChange = useCallback(\n    (val) => {\n      setValue(val);\n    },\n    [setValue],\n  );\n\n  return <Calendar startOfWeek={1} value={value} onChange={onChange} />;\n}\n")),Object(b.b)("h2",{id:"weekend"},"Weekend"),Object(b.b)("p",null,"By default the calendar starts from Sun which is represented 0 index.\nYou can provide the index for any other day that you want as start of the week."),Object(b.b)(p.a,{mdxType:"Weekends"}),Object(b.b)("table",null,Object(b.b)("thead",{parentName:"table"},Object(b.b)("tr",{parentName:"thead"},Object(b.b)("th",{parentName:"tr",align:null},"Prop"),Object(b.b)("th",{parentName:"tr",align:null},"Type"),Object(b.b)("th",{parentName:"tr",align:null},"Default"),Object(b.b)("th",{parentName:"tr",align:null},"Enum"))),Object(b.b)("tbody",{parentName:"table"},Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("inlineCode",{parentName:"td"},"weekends")),Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("inlineCode",{parentName:"td"},"Array<number>")),Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("inlineCode",{parentName:"td"},"[0,6]")),Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("inlineCode",{parentName:"td"},"0 , 1 , 2 , 3 , 4 , 5 , 6"))))),Object(b.b)("pre",null,Object(b.b)("code",{parentName:"pre",className:"language-js"},"import React, { useCallback, useState } from 'react';\n\nimport { Calendar } from '@natscale/react-calendar';\n\nimport '@natscale/react-calendar/dist/main.css';\n\nexport function App() {\n  const [value, setValue] = useState(new Date());\n\n  const onChange = useCallback(\n    (val) => {\n      setValue(val);\n    },\n    [setValue],\n  );\n\n  return <Calendar weekends={[0, 6]} value={value} onChange={onChange} />;\n}\n")),Object(b.b)("h2",{id:"select-multiple-dates"},"Select Multiple Dates"),Object(b.b)("p",null,"Enable multi selection."),Object(b.b)(o.a,{mdxType:"IsMultiSelector"}),Object(b.b)("table",null,Object(b.b)("thead",{parentName:"table"},Object(b.b)("tr",{parentName:"thead"},Object(b.b)("th",{parentName:"tr",align:null},"Prop"),Object(b.b)("th",{parentName:"tr",align:null},"Type"),Object(b.b)("th",{parentName:"tr",align:null},"Default"))),Object(b.b)("tbody",{parentName:"table"},Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("inlineCode",{parentName:"td"},"isMultiSelector")),Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("inlineCode",{parentName:"td"},"boolean")),Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("inlineCode",{parentName:"td"},"false"))),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("inlineCode",{parentName:"td"},"value")," (required)"),Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("inlineCode",{parentName:"td"},"Array<Date>")),Object(b.b)("td",{parentName:"tr",align:null})),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("inlineCode",{parentName:"td"},"onChange")," (required)"),Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("inlineCode",{parentName:"td"},"(value: Array<Date>) => void")),Object(b.b)("td",{parentName:"tr",align:null})))),Object(b.b)("pre",null,Object(b.b)("code",{parentName:"pre",className:"language-js"},"import React, { useCallback, useState } from 'react';\n\nimport { Calendar } from '@natscale/react-calendar';\n\nimport '@natscale/react-calendar/dist/main.css';\n\nexport function App() {\n  const [value, setValue] = useState([]);\n\n  const onChange = useCallback(\n    (val) => {\n      setValue(val);\n    },\n    [setValue],\n  );\n\n  return <Calendar isMultiSelector value={value} onChange={onChange} />;\n}\n")),Object(b.b)("h2",{id:"select-date-range"},"Select Date Range"),Object(b.b)("p",null,"Select a date range."),Object(b.b)(u.a,{mdxType:"IsRangeSelector"}),Object(b.b)("table",null,Object(b.b)("thead",{parentName:"table"},Object(b.b)("tr",{parentName:"thead"},Object(b.b)("th",{parentName:"tr",align:null},"Prop"),Object(b.b)("th",{parentName:"tr",align:null},"Type"),Object(b.b)("th",{parentName:"tr",align:null},"Default"))),Object(b.b)("tbody",{parentName:"table"},Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("inlineCode",{parentName:"td"},"isRangeSelector")),Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("inlineCode",{parentName:"td"},"boolean")),Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("inlineCode",{parentName:"td"},"false"))),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("inlineCode",{parentName:"td"},"value")," (required)"),Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("inlineCode",{parentName:"td"},"[Date, Date]")),Object(b.b)("td",{parentName:"tr",align:null})),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("inlineCode",{parentName:"td"},"onChange")," (required)"),Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("inlineCode",{parentName:"td"},"(value: [Date, Date]) => void")),Object(b.b)("td",{parentName:"tr",align:null})))),Object(b.b)("pre",null,Object(b.b)("code",{parentName:"pre",className:"language-js"},"import React, { useCallback, useState } from 'react';\n\nimport { Calendar } from '@natscale/react-calendar';\n\nimport '@natscale/react-calendar/dist/main.css';\n\nexport function App() {\n  const [value, setValue] = useState([]);\n\n  const onChange = useCallback(\n    (val) => {\n      setValue(val);\n    },\n    [setValue],\n  );\n\n  return <Calendar isRangeSelector value={value} onChange={onChange} />;\n}\n")),Object(b.b)("h2",{id:"fixed-date-range"},"Fixed Date Range"),Object(b.b)(c.a,{type:"info",mdxType:"Hint"},"Only works if calendar is a range selector"),Object(b.b)(m.a,{mdxType:"FixedRange"}),Object(b.b)("table",null,Object(b.b)("thead",{parentName:"table"},Object(b.b)("tr",{parentName:"thead"},Object(b.b)("th",{parentName:"tr",align:null},"Prop"),Object(b.b)("th",{parentName:"tr",align:null},"Type"),Object(b.b)("th",{parentName:"tr",align:null},"Default"))),Object(b.b)("tbody",{parentName:"table"},Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("inlineCode",{parentName:"td"},"fixedRange")),Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("inlineCode",{parentName:"td"},"number")),Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("inlineCode",{parentName:"td"},"undefined"))),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("inlineCode",{parentName:"td"},"value")," (required)"),Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("inlineCode",{parentName:"td"},"[Date, Date]")),Object(b.b)("td",{parentName:"tr",align:null})),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("inlineCode",{parentName:"td"},"onChange")," (required)"),Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("inlineCode",{parentName:"td"},"(value: [Date, Date]) => void")),Object(b.b)("td",{parentName:"tr",align:null})))),Object(b.b)("pre",null,Object(b.b)("code",{parentName:"pre",className:"language-js"},"import React, { useCallback, useState } from 'react';\n\nimport { Calendar } from '@natscale/react-calendar';\n\nimport '@natscale/react-calendar/dist/main.css';\n\nexport function App() {\n  const [value, setValue] = useState([]);\n\n  const onChange = useCallback(\n    (val) => {\n      setValue(val);\n    },\n    [setValue],\n  );\n\n  return <Calendar fixedRange={5} isRangeSelector value={value} onChange={onChange} />;\n}\n")),Object(b.b)("h2",{id:"date-range-with-no-padding"},"Date Range With No Padding"),Object(b.b)(c.a,{type:"info",mdxType:"Hint"},"Only works if calendar is a range selector"),Object(b.b)(s.a,{mdxType:"NoPadRangeCell"}),Object(b.b)("table",null,Object(b.b)("thead",{parentName:"table"},Object(b.b)("tr",{parentName:"thead"},Object(b.b)("th",{parentName:"tr",align:null},"Prop"),Object(b.b)("th",{parentName:"tr",align:null},"Type"),Object(b.b)("th",{parentName:"tr",align:null},"Default"))),Object(b.b)("tbody",{parentName:"table"},Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("inlineCode",{parentName:"td"},"noPadRangeCell")),Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("inlineCode",{parentName:"td"},"boolean")),Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("inlineCode",{parentName:"td"},"false"))))),Object(b.b)("pre",null,Object(b.b)("code",{parentName:"pre",className:"language-js"},"import React, { useCallback, useState } from 'react';\n\nimport { Calendar } from '@natscale/react-calendar';\n\nimport '@natscale/react-calendar/dist/main.css';\n\nexport function App() {\n  const [value, setValue] = useState([]);\n\n  const onChange = useCallback(\n    (val) => {\n      setValue(val);\n    },\n    [setValue],\n  );\n\n  return <Calendar noPadRangeCell isRangeSelector value={value} onChange={onChange} />;\n}\n")),Object(b.b)("h2",{id:"hide-adjacent-dates"},"Hide Adjacent Dates"),Object(b.b)("p",null,"Hide Adjacent Dates."),Object(b.b)(j.a,{mdxType:"HideAdjacentDates"}),Object(b.b)("table",null,Object(b.b)("thead",{parentName:"table"},Object(b.b)("tr",{parentName:"thead"},Object(b.b)("th",{parentName:"tr",align:null},"Prop"),Object(b.b)("th",{parentName:"tr",align:null},"Type"),Object(b.b)("th",{parentName:"tr",align:null},"Default"))),Object(b.b)("tbody",{parentName:"table"},Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("inlineCode",{parentName:"td"},"hideAdjacentDates")),Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("inlineCode",{parentName:"td"},"boolean")),Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("inlineCode",{parentName:"td"},"false"))))),Object(b.b)("pre",null,Object(b.b)("code",{parentName:"pre",className:"language-js"},"import React, { useCallback, useState } from 'react';\n\nimport { Calendar } from '@natscale/react-calendar';\n\nimport '@natscale/react-calendar/dist/main.css';\n\nexport function App() {\n  const [value, setValue] = useState(new Date());\n\n  const onChange = useCallback(\n    (val) => {\n      setValue(val);\n    },\n    [setValue],\n  );\n\n  return <Calendar hideAdjacentDates value={value} onChange={onChange} />;\n}\n")),Object(b.b)("h2",{id:"classname"},"Classname"),Object(b.b)("p",null,"Pass custom classnames."),Object(b.b)("table",null,Object(b.b)("thead",{parentName:"table"},Object(b.b)("tr",{parentName:"thead"},Object(b.b)("th",{parentName:"tr",align:null},"Prop"),Object(b.b)("th",{parentName:"tr",align:null},"Type"),Object(b.b)("th",{parentName:"tr",align:null},"Default"))),Object(b.b)("tbody",{parentName:"table"},Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("inlineCode",{parentName:"td"},"className")),Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("inlineCode",{parentName:"td"},"string")),Object(b.b)("td",{parentName:"tr",align:null})))),Object(b.b)("pre",null,Object(b.b)("code",{parentName:"pre",className:"language-js"},"import React, { useCallback, useState } from 'react';\n\nimport { Calendar } from '@natscale/react-calendar';\n\nimport '@natscale/react-calendar/dist/main.css';\n\nexport function App() {\n  const [value, setValue] = useState(new Date());\n\n  const onChange = useCallback(\n    (val) => {\n      setValue(val);\n    },\n    [setValue],\n  );\n\n  return <Calendar className=\"my-class\" value={value} onChange={onChange} />;\n}\n")),Object(b.b)("h2",{id:"initial-view"},"Initial View"),Object(b.b)("p",null,"Todo"),Object(b.b)(O.a,{mdxType:"InitialView"}),Object(b.b)("table",null,Object(b.b)("thead",{parentName:"table"},Object(b.b)("tr",{parentName:"thead"},Object(b.b)("th",{parentName:"tr",align:null},"Prop"),Object(b.b)("th",{parentName:"tr",align:null},"Type"),Object(b.b)("th",{parentName:"tr",align:null},"Default"),Object(b.b)("th",{parentName:"tr",align:null},"Enum"))),Object(b.b)("tbody",{parentName:"table"},Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("inlineCode",{parentName:"td"},"initialView")),Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("inlineCode",{parentName:"td"},"enum")),Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("inlineCode",{parentName:"td"},'"month_dates"')),Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("inlineCode",{parentName:"td"},'"years", "months", "month_dates"'))))),Object(b.b)("pre",null,Object(b.b)("code",{parentName:"pre",className:"language-js"},"import React, { useCallback, useState } from 'react';\n\nimport { Calendar } from '@natscale/react-calendar';\n\nimport '@natscale/react-calendar/dist/main.css';\n\nexport function App() {\n  const [value, setValue] = useState(new Date());\n\n  const onChange = useCallback(\n    (val) => {\n      setValue(val);\n    },\n    [setValue],\n  );\n\n  return <Calendar initialView=\"years\" value={value} onChange={onChange} />;\n}\n")),Object(b.b)("h2",{id:"disable-past-dates"},"Disable Past Dates"),Object(b.b)("p",null,"Todo"),Object(b.b)(N.a,{mdxType:"DisablePast"}),Object(b.b)("table",null,Object(b.b)("thead",{parentName:"table"},Object(b.b)("tr",{parentName:"thead"},Object(b.b)("th",{parentName:"tr",align:null},"Prop"),Object(b.b)("th",{parentName:"tr",align:null},"Type"),Object(b.b)("th",{parentName:"tr",align:null},"Default"))),Object(b.b)("tbody",{parentName:"table"},Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("inlineCode",{parentName:"td"},"disablePast")),Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("inlineCode",{parentName:"td"},"boolean")),Object(b.b)("td",{parentName:"tr",align:null})))),Object(b.b)("pre",null,Object(b.b)("code",{parentName:"pre",className:"language-js"},"import React, { useCallback, useState } from 'react';\n\nimport { Calendar } from '@natscale/react-calendar';\n\nimport '@natscale/react-calendar/dist/main.css';\n\nexport function App() {\n  const [value, setValue] = useState(new Date());\n\n  const onChange = useCallback(\n    (val) => {\n      setValue(val);\n    },\n    [setValue],\n  );\n\n  return <Calendar disablePast value={value} onChange={onChange} />;\n}\n")),Object(b.b)("h2",{id:"disable-today"},"Disable Today"),Object(b.b)("p",null,"Todo"),Object(b.b)(g.a,{mdxType:"DisableToday"}),Object(b.b)("table",null,Object(b.b)("thead",{parentName:"table"},Object(b.b)("tr",{parentName:"thead"},Object(b.b)("th",{parentName:"tr",align:null},"Prop"),Object(b.b)("th",{parentName:"tr",align:null},"Type"),Object(b.b)("th",{parentName:"tr",align:null},"Default"))),Object(b.b)("tbody",{parentName:"table"},Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("inlineCode",{parentName:"td"},"disableToday")),Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("inlineCode",{parentName:"td"},"boolean")),Object(b.b)("td",{parentName:"tr",align:null})))),Object(b.b)("pre",null,Object(b.b)("code",{parentName:"pre",className:"language-js"},"import React, { useCallback, useState } from 'react';\n\nimport { Calendar } from '@natscale/react-calendar';\n\nimport '@natscale/react-calendar/dist/main.css';\n\nexport function App() {\n  const [value, setValue] = useState(new Date());\n\n  const onChanghighlightse = useCallback(\n    (val) => {\n      setValue(val);\n    },\n    [setValue],\n  );\n\n  return <Calendar disableToday value={value} onChange={onChange} />;\n}\n")),Object(b.b)("h2",{id:"disable-future"},"Disable Future"),Object(b.b)("p",null,"Todo"),Object(b.b)(h.a,{mdxType:"DisableFuture"}),Object(b.b)("table",null,Object(b.b)("thead",{parentName:"table"},Object(b.b)("tr",{parentName:"thead"},Object(b.b)("th",{parentName:"tr",align:null},"Prop"),Object(b.b)("th",{parentName:"tr",align:null},"Type"),Object(b.b)("th",{parentName:"tr",align:null},"Default"))),Object(b.b)("tbody",{parentName:"table"},Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("inlineCode",{parentName:"td"},"disableFuture")),Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("inlineCode",{parentName:"td"},"boolean")),Object(b.b)("td",{parentName:"tr",align:null})))),Object(b.b)("pre",null,Object(b.b)("code",{parentName:"pre",className:"language-js"},"import React, { useCallback, useState } from 'react';\n\nimport { Calendar } from '@natscale/react-calendar';\n\nimport '@natscale/react-calendar/dist/main.css';\n\nexport function App() {\n  const [value, setValue] = useState(new Date());\n\n  const onChange = useCallback(\n    (val) => {\n      setValue(val);\n    },\n    [setValue],\n  );\n\n  return <Calendar disableFuture value={value} onChange={onChange} />;\n}\n")),Object(b.b)("h2",{id:"custom-dates-disabled"},"Custom Dates Disabled"),Object(b.b)("p",null,"Todo"),Object(b.b)(C.a,{mdxType:"IsDisabled"}),Object(b.b)("table",null,Object(b.b)("thead",{parentName:"table"},Object(b.b)("tr",{parentName:"thead"},Object(b.b)("th",{parentName:"tr",align:null},"Prop"),Object(b.b)("th",{parentName:"tr",align:null},"Type"),Object(b.b)("th",{parentName:"tr",align:null},"Default"))),Object(b.b)("tbody",{parentName:"table"},Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("inlineCode",{parentName:"td"},"isDisabled")),Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("inlineCode",{parentName:"td"},"(date: Date) => boolean")),Object(b.b)("td",{parentName:"tr",align:null})))),Object(b.b)("pre",null,Object(b.b)("code",{parentName:"pre",className:"language-js"},"import React, { useCallback, useState } from 'react';\n\nimport { Calendar } from '@natscale/react-calendar';\n\nimport '@natscale/react-calendar/dist/main.css';\n\nexport function App() {\n  const [value, setValue] = useState(new Date());\n\n  const onChange = useCallback(\n    (val) => {\n      setValue(val);\n    },\n    [setValue],\n  );\n\n  const isDisabled = useCallback((date) => {\n    // disable wednesdays and any date that is divisible by 5\n    if (date.getDay() === 3 || date.getDate() % 5 === 0) {\n      return true;\n    }\n  }, []);\n\n  return <Calendar isDisabled={isDisabled} value={value} onChange={onChange} />;\n}\n")),Object(b.b)("h2",{id:"custom-dates-highlight"},"Custom Dates Highlight"),Object(b.b)("p",null,"Todo"),Object(b.b)(f.a,{mdxType:"IsHighlight"}),Object(b.b)("table",null,Object(b.b)("thead",{parentName:"table"},Object(b.b)("tr",{parentName:"thead"},Object(b.b)("th",{parentName:"tr",align:null},"Prop"),Object(b.b)("th",{parentName:"tr",align:null},"Type"),Object(b.b)("th",{parentName:"tr",align:null},"Default"))),Object(b.b)("tbody",{parentName:"table"},Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("inlineCode",{parentName:"td"},"isHighlight")),Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("inlineCode",{parentName:"td"},"(date: Date) => boolean")),Object(b.b)("td",{parentName:"tr",align:null})))),Object(b.b)("pre",null,Object(b.b)("code",{parentName:"pre",className:"language-js"},"import React, { useCallback, useState } from 'react';\n\nimport { Calendar } from '@natscale/react-calendar';\n\nimport '@natscale/react-calendar/dist/main.css';\n\nexport function App() {\n  const [value, setValue] = useState(new Date());\n\n  const onChange = useCallback(\n    (val) => {\n      setValue(val);\n    },\n    [setValue],\n  );\n\n  const isHighlight = useCallback((date) => {\n    // highlight any data that is divisible by 5\n    if (date.getDate() % 5 === 0) {\n      return true;\n    }\n  }, []);\n\n  return <Calendar isHighlight={isHighlight} value={value} onChange={onChange} />;\n}\n")),Object(b.b)("h2",{id:"max-allowed-date"},"Max Allowed Date"),Object(b.b)("p",null,"Todo"),Object(b.b)(y.a,{mdxType:"MaxAllowedDate"}),Object(b.b)("table",null,Object(b.b)("thead",{parentName:"table"},Object(b.b)("tr",{parentName:"thead"},Object(b.b)("th",{parentName:"tr",align:null},"Prop"),Object(b.b)("th",{parentName:"tr",align:null},"Type"),Object(b.b)("th",{parentName:"tr",align:null},"Default"))),Object(b.b)("tbody",{parentName:"table"},Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("inlineCode",{parentName:"td"},"maxAllowedDate")),Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("inlineCode",{parentName:"td"},"Date")),Object(b.b)("td",{parentName:"tr",align:null})))),Object(b.b)("pre",null,Object(b.b)("code",{parentName:"pre",className:"language-js"},"import React, { useCallback, useState } from 'react';\n\nimport { Calendar } from '@natscale/react-calendar';\n\nimport '@natscale/react-calendar/dist/main.css';\n\nexport function App() {\n  const [value, setValue] = useState(new Date());\n\n  const onChange = useCallback(\n    (val) => {\n      setValue(val);\n    },\n    [setValue],\n  );\n\n  return <Calendar maxAllowedDate={new Date(2025)} value={value} onChange={onChange} />;\n}\n")),Object(b.b)("h2",{id:"min-allowed-date"},"Min Allowed Date"),Object(b.b)("p",null,"Todo"),Object(b.b)(v.a,{mdxType:"MinAllowedDate"}),Object(b.b)("table",null,Object(b.b)("thead",{parentName:"table"},Object(b.b)("tr",{parentName:"thead"},Object(b.b)("th",{parentName:"tr",align:null},"Prop"),Object(b.b)("th",{parentName:"tr",align:null},"Type"),Object(b.b)("th",{parentName:"tr",align:null},"Default"))),Object(b.b)("tbody",{parentName:"table"},Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("inlineCode",{parentName:"td"},"minAllowedDate")),Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("inlineCode",{parentName:"td"},"Date")),Object(b.b)("td",{parentName:"tr",align:null})))),Object(b.b)("pre",null,Object(b.b)("code",{parentName:"pre",className:"language-js"},"import React, { useCallback, useState } from 'react';\n\nimport { Calendar } from '@natscale/react-calendar';\n\nimport '@natscale/react-calendar/dist/main.css';\n\nexport function App() {\n  const [value, setValue] = useState(new Date());\n\n  const onChange = useCallback(\n    (val) => {\n      setValue(val);\n    },\n    [setValue],\n  );\n\n  return <Calendar minAllowedDate={new Date(2020)} value={value} onChange={onChange} />;\n}\n")),Object(b.b)("h2",{id:"lock-view"},"Lock View"),Object(b.b)("p",null,"Todo"),Object(b.b)(D.a,{mdxType:"LockView"}),Object(b.b)("table",null,Object(b.b)("thead",{parentName:"table"},Object(b.b)("tr",{parentName:"thead"},Object(b.b)("th",{parentName:"tr",align:null},"Prop"),Object(b.b)("th",{parentName:"tr",align:null},"Type"),Object(b.b)("th",{parentName:"tr",align:null},"Default"))),Object(b.b)("tbody",{parentName:"table"},Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("inlineCode",{parentName:"td"},"lockView")),Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("inlineCode",{parentName:"td"},"boolean")),Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("inlineCode",{parentName:"td"},"false"))))),Object(b.b)("pre",null,Object(b.b)("code",{parentName:"pre",className:"language-js"},"import React, { useCallback, useState } from 'react';\n\nimport { Calendar } from '@natscale/react-calendar';\n\nimport '@natscale/react-calendar/dist/main.css';\n\nexport function App() {\n  const [value, setValue] = useState(new Date());\n\n  const onChange = useCallback(\n    (val) => {\n      setValue(val);\n    },\n    [setValue],\n  );\n\n  return <Calendar lockView value={value} onChange={onChange} />;\n}\n")),Object(b.b)("h2",{id:"dark-mode"},"Dark Mode"),Object(b.b)("p",null,"Enable/Disable dark mode."),Object(b.b)(k.a,{mdxType:"UseDarkMode"}),Object(b.b)("table",null,Object(b.b)("thead",{parentName:"table"},Object(b.b)("tr",{parentName:"thead"},Object(b.b)("th",{parentName:"tr",align:null},"Prop"),Object(b.b)("th",{parentName:"tr",align:null},"Type"),Object(b.b)("th",{parentName:"tr",align:null},"Default"))),Object(b.b)("tbody",{parentName:"table"},Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("inlineCode",{parentName:"td"},"useDarkMode")),Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("inlineCode",{parentName:"td"},"boolean")),Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("inlineCode",{parentName:"td"},"false"))))),Object(b.b)("pre",null,Object(b.b)("code",{parentName:"pre",className:"language-js"},"import React, { useCallback, useState } from 'react';\n\nimport { Calendar } from '@natscale/react-calendar';\n\nimport '@natscale/react-calendar/dist/main.css';\n\nexport function App() {\n  const [value, setValue] = useState(new Date());\n\n  const onChange = useCallback(\n    (val) => {\n      setValue(val);\n    },\n    [setValue],\n  );\n\n  return <Calendar useDarkMode value={value} onChange={onChange} />;\n}\n")),Object(b.b)("h2",{id:"size-control"},"Size Control"),Object(b.b)("p",null,"Enable/Disable dark mode."),Object(b.b)(V.a,{mdxType:"Size"}),Object(b.b)("table",null,Object(b.b)("thead",{parentName:"table"},Object(b.b)("tr",{parentName:"thead"},Object(b.b)("th",{parentName:"tr",align:null},"Prop"),Object(b.b)("th",{parentName:"tr",align:null},"Type"),Object(b.b)("th",{parentName:"tr",align:null},"Default"))),Object(b.b)("tbody",{parentName:"table"},Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("inlineCode",{parentName:"td"},"fontSize")),Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("inlineCode",{parentName:"td"},"number")),Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("inlineCode",{parentName:"td"},"16"))),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("inlineCode",{parentName:"td"},"size")),Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("inlineCode",{parentName:"td"},"number")),Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("inlineCode",{parentName:"td"},"276"))))),Object(b.b)("pre",null,Object(b.b)("code",{parentName:"pre",className:"language-js"},"import React, { useCallback, useState } from 'react';\n\nimport { Calendar } from '@natscale/react-calendar';\n\nimport '@natscale/react-calendar/dist/main.css';\n\nexport function App() {\n  const [value, setValue] = useState(new Date());\n\n  const onChange = useCallback(\n    (val) => {\n      setValue(val);\n    },\n    [setValue],\n  );\n\n  return <Calendar size={420} fontSize={18} value={value} onChange={onChange} />;\n}\n")))}void 0!==A&&A&&A===Object(A)&&Object.isExtensible(A)&&!Object.prototype.hasOwnProperty.call(A,"__filemeta")&&Object.defineProperty(A,"__filemeta",{configurable:!0,value:{name:"MDXContent",filename:"src/API/Props.mdx"}}),A.isMDXComponent=!0}}]);
//# sourceMappingURL=component---src-api-props-mdx-6d0a8570859ae0b23596.js.map