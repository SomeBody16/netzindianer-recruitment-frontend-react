(this["webpackJsonprecruitment-frontend-react"]=this["webpackJsonprecruitment-frontend-react"]||[]).push([[0],{283:function(e,t,n){e.exports=n(560)},294:function(e,t){},296:function(e,t){},317:function(e,t){},319:function(e,t){},348:function(e,t){},365:function(e,t){},367:function(e,t){},395:function(e,t){},397:function(e,t){},398:function(e,t){},404:function(e,t){},406:function(e,t){},424:function(e,t){},426:function(e,t){},438:function(e,t){},441:function(e,t){},463:function(e,t){},560:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),r=n(14),i=n.n(r),c=n(603),l=n(602),u=n(55),s=n(263),m=n.n(s),d=n(589),f=n(591),h=n(592),p=n(594),v=n(595),w=n(83),g=n(596),E=n(597),y=n(601),b=n(598),x=n(268),k=n.n(x),j=n(593),C=n(264),O=n.n(C),S=Object(l.a)((function(e){return Object(c.a)({root:{width:"100vw",marginTop:e.spacing(2)},flexCenter:{height:"100vh",display:"flex",alignItems:"center",justifyContent:"center"},error:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center","& button":{marginTop:e.spacing(3)}},feedItem:{margin:"auto",marginBottom:e.spacing(2),width:"90%"},feedItemContent:{display:"flex"},searchField:{width:"90%",marginLeft:"5%",marginBottom:e.spacing(3)}})})),I=function(e){var t,n=e.classes,a=e.item,r=e.proxy,i=e.show,c=o.a.useState(),l=Object(u.a)(c,2),s=l[0],m=l[1];o.a.useEffect((function(){a.link&&O()(r+a.link,(function(e,t){var n,a;e?console.error(e):m(null===t||void 0===t||null===(n=t.og)||void 0===n||null===(a=n.image)||void 0===a?void 0:a.url)}))}),[a.link,r]);var g=new Intl.RelativeTimeFormat("pl",{numeric:"auto"}),E=Math.abs(Date.now()-new Date(a.isoDate||0).getTime())/-36e5,y=g.format(Math.floor(E),"hour"),b=null===(t=a.contentSnippet)||void 0===t?void 0:t.replace(/^([\s\S]{210}(?:(?![\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF])[\s\S])*)[\s\S]*/,"$1");return o.a.createElement(d.a,{className:n.feedItem,style:{display:i?"block":"none"},raised:!0,onClick:function(){return window.open(a.link,"_blank")}},o.a.createElement(f.a,{className:n.feedItemContent},o.a.createElement(h.a,{component:function(){return s?o.a.createElement("img",{src:s,alt:a.title,width:355,height:2/3*355}):o.a.createElement(j.a,{variant:"rect",width:355,height:2/3*355})}}),o.a.createElement("div",{style:{width:"calc(100% - ".concat(355,"px)")}},o.a.createElement(p.a,{title:a.title,subheader:y}),o.a.createElement(v.a,null,o.a.createElement(w.a,{variant:"body2",color:"textSecondary"},b," ...")))))};var N=function(e){var t,n=S(),a=o.a.useState(),r=Object(u.a)(a,2),i=r[0],c=r[1],l=o.a.useState(""),s=Object(u.a)(l,2),d=s[0],f=s[1],h=o.a.useState(!0),p=Object(u.a)(h,2),v=p[0],x=p[1],j=o.a.useState(!1),C=Object(u.a)(j,2),O=C[0],N=C[1],F=o.a.useState(new m.a),z=Object(u.a)(F,1)[0],B=o.a.useCallback((function(){x(!0),N(!1),z.parseURL((e.proxy||"")+e.url).then(c).catch((function(){return N(!0)})).finally((function(){return x(!1)}))}),[z,e.proxy,e.url]);return o.a.useEffect(B,[B]),v||O?o.a.createElement("div",{className:n.flexCenter},v&&o.a.createElement(g.a,{color:"secondary"}),O&&o.a.createElement("div",{className:n.error},o.a.createElement(w.a,{variant:"h4"},"Nie mo\u017cna za\u0142adowa\u0107 kana\u0142u"),o.a.createElement(E.a,{variant:"contained",color:"secondary",onClick:B},"Spr\xf3buj ponownie"))):o.a.createElement("div",{className:n.root},o.a.createElement(y.a,{className:n.searchField,label:"Przeszukaj kana\u0142",variant:"outlined",value:d,onChange:function(e){return f(e.target.value)},InputProps:{endAdornment:o.a.createElement(b.a,{position:"end"},o.a.createElement(k.a,null))}}),null===i||void 0===i||null===(t=i.items)||void 0===t?void 0:t.map((function(t){var a,r;return o.a.createElement(I,Object.assign({key:t.guid,show:0===d.length||-1!==(null===(a=t.title)||void 0===a||null===(r=a.toLowerCase())||void 0===r?void 0:r.indexOf(d.toLowerCase()))},{classes:n,item:t,proxy:e.proxy}))})))},F=Object(l.a)((function(e){return Object(c.a)({root:{overflowX:"hidden",width:"100vw",height:"100vh",display:"flex",justifyContent:"center"}})}));var z=function(){var e=F();return o.a.createElement("div",{className:e.root},o.a.createElement(N,{url:"https://www.gamespot.com/feeds/mashup/",proxy:"https://thingproxy.freeboard.io/fetch/"}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var B=n(269),D=n(599),L=n(600),T=n(273),A=Object(T.a)({palette:{type:"dark"}});i.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(B.Normalize,null),o.a.createElement(D.a,{theme:A},o.a.createElement(L.a,null),o.a.createElement(z,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[283,1,2]]]);
//# sourceMappingURL=main.c435dcc2.chunk.js.map