"use strict";(globalThis.webpackChunk=globalThis.webpackChunk||[]).push([["ui_packages_commit-attribution_index_ts-ui_packages_copy-to-clipboard_index_ts-ui_packages_us-d922f2"],{93828:(t,e,o)=>{o.d(e,{D:()=>v,C:()=>A});var r,a,i,n,l,s,p,d,c,u,h=o(85893),m=o(57294),f=o(78212),g=o(42483),x=o(73290),y=o(38490),b=o(97011);function v({author:t,repo:e,sx:o={}}){if(!t)return null;let r=(0,h.jsx)(m.O,{"aria-label":`${t.login||"author"}`,src:t.avatarUrl,alt:`${t.login||"author"}`,sx:{mr:2}});return(0,h.jsxs)(g.Z,{sx:{display:"flex",flexDirection:"row",alignItems:"center",...o},"data-testid":"author-avatar",children:[t.path?(0,h.jsx)(x.Z,{href:t.path,"data-testid":"avatar-icon-link","data-hovercard-url":t.login?(0,f.zP)({owner:t.login}):void 0,children:r}):r,t.login?(0,h.jsx)(y.Z,{"aria-label":`commits by ${t.login}`,direction:"se",children:(0,h.jsx)(x.Z,{muted:!0,href:(0,f.OI)({repo:e,author:t.login}),"aria-label":`commits by ${t.login}`,sx:{fontWeight:600,whiteSpace:"nowrap",color:"fg.default","&:hover":{color:"fg.default",textDecoration:"underline"}},children:t.login})}):(0,h.jsx)(b.Z,{sx:{fontWeight:600,whiteSpace:"nowrap",color:"fg.default"},children:t.displayName})]})}try{(r=v).displayName||(r.displayName="AuthorAvatar")}catch{}var j=o(67294),w=o(50901),N=o(79902),C=o(66280);function $({authors:t,repo:e}){let o=t.length,[r,a]=(0,j.useState)(!1),i=(0,j.useRef)(null);return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)(x.Z,{as:"button","aria-label":`Show ${o} authors`,"data-testid":"authors-dialog-anchor",onClick:()=>{a(!0)},sx:{mx:1},ref:i,muted:!0,children:[o," ","people"]}),r&&(0,h.jsx)(C.V,{title:`${o} authors`,onClose:()=>{a(!1),setTimeout(()=>i.current?.focus(),25)},width:"medium",height:o>=12?"small":"auto",renderBody:()=>(0,h.jsx)(w.S,{sx:{overflowY:"auto",py:2},"data-testid":"contributor-dialog-list",children:t.map((t,o)=>(0,h.jsx)(k,{author:t,repo:e},`${t.login}_${o}`))})})]})}function k({author:t,repo:e}){return(0,h.jsxs)(w.S.LinkItem,{sx:{display:"flex",flexDirection:"row",fontSize:1,py:2,color:"fg.default","&:hover":{backgroundColor:"canvas.subtle"}},"data-testid":"contributor-dialog-row",href:(0,f.OI)({repo:e,author:t.login??""}),children:[(0,h.jsx)(m.O,{src:t.avatarUrl,alt:t.login??t.displayName,sx:{mr:2},"aria-hidden":"true"}),(0,h.jsx)(N.Z,{inline:!0,title:t.login??t.displayName??"",children:t.login??t.displayName})]})}try{(a=$).displayName||(a.displayName="AuthorsDialog")}catch{}try{(i=k).displayName||(i.displayName="AuthorRow")}catch{}var _=o(90836);function Z({authors:t}){return(0,h.jsx)(_.Z,{children:t.slice(0,5).map((t,e)=>(0,h.jsx)(m.O,{"data-testid":"commit-stack-avatar",src:t.avatarUrl,alt:t.login??t.displayName,"data-hovercard-url":(0,f.zP)({owner:t.login??""})},`${t.login}_${e}`))})}try{(n=Z).displayName||(n.displayName="CommitAuthorStack")}catch{}function P({author:t,repo:e,sx:o={}}){return t?(0,h.jsx)(g.Z,{sx:{display:"flex",flexDirection:"row",alignItems:"center",...o},"data-testid":"author-link",children:t.login?(0,h.jsx)(y.Z,{"aria-label":`commits by ${t.login}`,direction:"se",children:(0,h.jsx)(x.Z,{muted:!0,href:(0,f.OI)({repo:e,author:t.login}),"aria-label":`commits by ${t.login}`,sx:{fontWeight:600,whiteSpace:"nowrap",color:"fg.default","&:hover":{color:"fg.default",textDecoration:"underline"}},children:t.login})}):(0,h.jsx)(b.Z,{sx:{fontWeight:600,whiteSpace:"nowrap",color:"fg.default"},children:t.displayName})}):null}try{(l=P).displayName||(l.displayName="AuthorLink")}catch{}function S({author:t,repo:e}){return(0,h.jsx)(v,{author:t,repo:e,sx:{px:1}})}function U({author:t,committer:e,repo:o}){return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(Z,{authors:[t,e]}),(0,h.jsx)(P,{author:t,repo:o,sx:{px:1}})]})}function R({authors:t,repo:e}){return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(Z,{authors:t}),t.map((o,r)=>(0,h.jsxs)(j.Fragment,{children:[(0,h.jsx)(P,{author:o,repo:e,sx:{px:1}}),r!==t.length-1&&" and "]},`${o.login}_${r}`))]})}function T({authors:t,repo:e}){return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(Z,{authors:t}),(0,h.jsx)($,{authors:t,repo:e})]})}function A({authors:t,committer:e,committerAttribution:o,repo:r,includeVerbs:a=!0}){let i=1===t.length&&!o,n=1===t.length&&o,l=2===t.length&&!o;return(0,h.jsxs)(g.Z,{sx:{display:"flex",flexDirection:"row",alignItems:"center"},children:[i&&(0,h.jsx)(S,{author:t[0],repo:r}),n&&(0,h.jsx)(U,{author:t[0],committer:e,repo:r}),l&&(0,h.jsx)(R,{authors:t,repo:r}),!i&&!n&&!l&&(0,h.jsx)(T,{authors:t,repo:r}),o?(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)("span",{children:a?"authored and":"and"}),(0,h.jsx)(P,{author:e,repo:r,sx:{px:1}}),(0,h.jsx)("span",{children:a&&"committed"})]}):(0,h.jsx)("span",{children:a&&"committed"})]})}try{(s=S).displayName||(s.displayName="SingleAuthor")}catch{}try{(p=U).displayName||(p.displayName="AuthorAndCommitter")}catch{}try{(d=R).displayName||(d.displayName="TwoAuthors")}catch{}try{(c=T).displayName||(c.displayName="MultipleAuthors")}catch{}try{(u=A).displayName||(u.displayName="CommitAttribution")}catch{}},68912:(t,e,o)=>{o.d(e,{m:()=>g,z:()=>m});var r,a,i=o(85893),n=o(37169),l=o(85529),s=o(38490),p=o(42483),d=o(50919),c=o(67294);function u(t){let e=document.createElement("pre");return e.style.width="1px",e.style.height="1px",e.style.position="fixed",e.style.top="5px",e.textContent=t,e}function h(t){if("clipboard"in navigator)return navigator.clipboard.writeText(t.textContent||"");let e=getSelection();if(null==e)return Promise.reject(Error());e.removeAllRanges();let o=document.createRange();return o.selectNodeContents(t),e.addRange(o),document.execCommand("copy"),e.removeAllRanges(),Promise.resolve()}function m(t){if("clipboard"in navigator)return navigator.clipboard.writeText(t);let e=document.body;if(!e)return Promise.reject(Error());let o=u(t);return e.appendChild(o),h(o),e.removeChild(o),Promise.resolve()}function f({sx:t,tooltipProps:e}){return(0,i.jsx)(s.Z,{"aria-label":"Copied!",sx:t,...e,children:(0,i.jsx)(p.Z,{as:"span",sx:{display:"inline-block",color:"success.fg",p:1,mr:1},children:(0,i.jsx)(l.CheckIcon,{})})})}function g({icon:t=l.CopyIcon,size:e="medium",onCopy:o,sx:r,textToCopy:a,tooltipProps:p,confirmationComponent:u=(0,i.jsx)(f,{sx:r,tooltipProps:p}),ariaLabel:h,accessibleButton:g}){let[x,y]=c.useState(!1),b=(0,n.Z)(),v=()=>{y(!0),m(a),o?.(),setTimeout(()=>b()&&y(!1),2e3)},j=h??`Copy ${a} to clipboard`;return x?(0,i.jsx)(i.Fragment,{children:u}):(0,i.jsx)(s.Z,{"aria-label":j,...p,children:(0,i.jsx)(d.h,{"aria-label":j,icon:t,variant:"invisible",size:e,tabIndex:!1===g?-1:0,sx:{...r},onClick:v})})}try{(r=f).displayName||(r.displayName="CopyConfirmationCheck")}catch{}try{(a=g).displayName||(a.displayName="CopyToClipboardButton")}catch{}},95628:(t,e,o)=>{o.d(e,{M:()=>i});let r=t=>{let e=getComputedStyle(t,null);return["overflow","overflow-y","overflow-x"].some(t=>{let o=e.getPropertyValue(t);return"auto"===o||"scroll"===o})},a=(t,e)=>t&&null!==t.parentNode?a(t.parentNode,e.concat([t])):e;function i(t){if(!(t instanceof HTMLElement||t instanceof SVGElement))return;let e=a(t.parentNode,[]);for(let t of e)if((t instanceof HTMLElement||t instanceof SVGElement)&&r(t))return t;return document.scrollingElement||document.documentElement}},78806:(t,e,o)=>{o.d(e,{Z:()=>a});let r=(t,e)=>{let o=new URL(t,window.location.origin),r=new URL(e,window.location.origin),a=r.href.includes("#");return a&&o.host===r.host&&o.pathname===r.pathname&&o.search===r.search},a=r},37169:(t,e,o)=>{o.d(e,{Z:()=>i});var r=o(78249),a=o(67294);function i(){let t=(0,a.useRef)(!1),e=(0,a.useCallback)(()=>t.current,[]);return(0,r.g)(()=>(t.current=!0,()=>{t.current=!1}),[]),e}},68203:(t,e,o)=>{o.d(e,{s:()=>p});var r=o(67294),a=o(89250),i=o(12599),n=o(78806),l=o(45055),s=o(68202);let p=()=>{let{routes:t,history:e}=r.useContext(l.I),p=(0,a.s0)();return r.useCallback((r,a)=>{let l=(0,i.i3)(r).pathname,d=!(0,i.fp)(t,l);if(d){let t=e.createHref(r);(async()=>{let{softNavigate:e}=await Promise.all([o.e("vendors-node_modules_github_turbo_dist_turbo_es2017-esm_js"),o.e("ui_packages_soft-navigate_soft-navigate_ts")]).then(o.bind(o,75198));e(t)})()}else{(0,n.Z)(location.href,r.toString())||(0,s.LD)("react"),p(r,a);let{turbo:t,...e}=window.history.state;window.history.replaceState({...e,skipTurbo:!0},"",location.href)}},[e,p,t])}},32769:(t,e,o)=>{o.d(e,{H:()=>p,d:()=>s});var r,a,i=o(85893),n=o(67294);let l=n.createContext({});function s({repository:t,children:e}){return(0,i.jsxs)(l.Provider,{value:t,children:[" ",e," "]})}function p(){return n.useContext(l)}try{(r=l).displayName||(r.displayName="CurrentRepositoryContext")}catch{}try{(a=s).displayName||(a.displayName="CurrentRepositoryProvider")}catch{}},57294:(t,e,o)=>{o.d(e,{O:()=>s});var r,a=o(85893),i=o(67294),n=o(26012),l=o(86283);let s=(0,i.forwardRef)(function({src:t,size:e=20,...o},r){let s=(0,i.useMemo)(()=>{let o=new URL(t,l.jX.origin);return o.searchParams.has("size")||o.searchParams.has("s")||o.searchParams.set("size",String(2*Number(e))),o.toString()},[t,e]);return(0,a.jsx)(n.Z,{ref:r,src:s,size:e,"data-testid":"github-avatar",...o})});try{(r=s).displayName||(r.displayName="GitHubAvatar")}catch{}},45222:(t,e,o)=>{o.d(e,{h:()=>u});var r,a=o(85893),i=o(42379),n=o(15173),l=o(41905),s=o(86010),p=o(67294),d=o(15388);let c=d.ZP.span`
  &::before {
    position: absolute;
    z-index: 1000001;
    display: none;
    width: 0px;
    height: 0px;
    color: ${(0,i.U2)("colors.neutral.emphasisPlus")};
    pointer-events: none;
    content: '';
    border: 6px solid transparent;
    opacity: 0;
  }
  &::after {
    position: absolute;
    z-index: 1000000;
    display: none;
    padding: 0.5em 0.75em;
    font: normal normal 11px/1.5 ${(0,i.U2)("fonts.normal")};
    -webkit-font-smoothing: subpixel-antialiased;
    color: ${(0,i.U2)("colors.fg.onEmphasis")};
    text-align: center;
    text-decoration: none;
    text-shadow: none;
    text-transform: none;
    letter-spacing: normal;
    word-wrap: break-word;
    white-space: pre;
    pointer-events: none;
    content: attr(aria-label);
    background: ${(0,i.U2)("colors.neutral.emphasisPlus")};
    border-radius: ${(0,i.U2)("radii.1")};
    opacity: 0;
  }
  /* delay animation for tooltip */
  @keyframes tooltip-appear {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  &.tooltipped-open,
  &:hover,
  &:active,
  &:focus {
    &::before,
    &::after {
      display: inline-block;
      text-decoration: none;
      animation-name: tooltip-appear;
      animation-duration: 0.1s;
      animation-fill-mode: forwards;
      animation-timing-function: ease-in;
      animation-delay: 0.4s;
    }
  }

  &.tooltipped-no-delay.tooltipped-open,
  &.tooltipped-no-delay:hover,
  &.tooltipped-no-delay:active,
  &.tooltipped-no-delay:focus {
    &::before,
    &::after {
      animation-delay: 0s;
    }
  }

  /* Tooltipped south */
  &.tooltipped-s,
  &.tooltipped-se,
  &.tooltipped-sw {
    &::after {
      top: 100%;
      right: 50%;
      margin-top: 6px;
    }
    &::before {
      top: auto;
      right: 50%;
      bottom: -7px;
      margin-right: -6px;
      border-bottom-color: ${(0,i.U2)("colors.neutral.emphasisPlus")};
    }
  }
  &.tooltipped-se {
    &::after {
      right: auto;
      left: 50%;
      margin-left: -${(0,i.U2)("space.3")};
    }
  }
  &.tooltipped-sw::after {
    margin-right: -${(0,i.U2)("space.3")};
  }
  /* Tooltips above the object */
  &.tooltipped-n,
  &.tooltipped-ne,
  &.tooltipped-nw {
    &::after {
      right: 50%;
      bottom: 100%;
      margin-bottom: 6px;
    }
    &::before {
      top: -7px;
      right: 50%;
      bottom: auto;
      margin-right: -6px;
      border-top-color: ${(0,i.U2)("colors.neutral.emphasisPlus")};
    }
  }
  &.tooltipped-ne {
    &::after {
      right: auto;
      left: 50%;
      margin-left: -${(0,i.U2)("space.3")};
    }
  }
  &.tooltipped-nw::after {
    margin-right: -${(0,i.U2)("space.3")};
  }
  /* Move the tooltip body to the center of the object. */
  &.tooltipped-s::after,
  &.tooltipped-n::after {
    transform: translateX(50%);
  }
  /* Tooltipped to the left */
  &.tooltipped-w {
    &::after {
      right: 100%;
      bottom: 50%;
      margin-right: 6px;
      transform: translateY(50%);
    }
    &::before {
      top: 50%;
      bottom: 50%;
      left: -7px;
      margin-top: -6px;
      border-left-color: ${(0,i.U2)("colors.neutral.emphasisPlus")};
    }
  }
  /* tooltipped to the right */
  &.tooltipped-e {
    &::after {
      bottom: 50%;
      left: 100%;
      margin-left: 6px;
      transform: translateY(50%);
    }
    &::before {
      top: 50%;
      right: -7px;
      bottom: 50%;
      margin-top: -6px;
      border-right-color: ${(0,i.U2)("colors.neutral.emphasisPlus")};
    }
  }
  &.tooltipped-align-right-2::after {
    right: 0;
    margin-right: 0;
  }
  &.tooltipped-align-right-2::before {
    right: 15px;
  }
  &.tooltipped-align-left-2::after {
    left: 0;
    margin-left: 0;
  }
  &.tooltipped-align-left-2::before {
    left: 10px;
  }
  ${n.Z};
`,u=(0,p.forwardRef)(function({direction:t="n",className:e,text:o,noDelay:r,align:i,wrap:n,open:p=!1,portalProps:d={},...u},h){let m=(0,s.W)(e,`tooltipped-${t}`,i&&`tooltipped-align-${i}-2`,r&&"tooltipped-no-delay",n&&"tooltipped-multiline",p&&"tooltipped-open");return(0,a.jsx)(l.h,{...d,children:(0,a.jsx)(c,{ref:h,role:"tooltip","aria-label":o,...u,sx:{position:"fixed",zIndex:1,...u.sx},className:m})})});try{(r=u).displayName||(r.displayName="ControlledTooltip")}catch{}},52793:(t,e,o)=>{o.d(e,{u:()=>p});var r,a=o(85893),i=o(48030),n=o(67294),l=o(45222),s=o(95628);let p=(0,n.forwardRef)(function({contentRef:t,open:e,anchoredPositionAlignment:o,anchorSide:r,anchorOffset:p,alignmentOffset:d,allowOutOfBounds:c,...u},h){let m=(0,n.useRef)(null);(0,n.useImperativeHandle)(h,()=>m.current);let f=(0,n.useRef)({left:0,top:0}),g=(0,n.useSyncExternalStore)((0,n.useCallback)(o=>{if(!m.current||!t.current||!e)return()=>void 0;let r=(0,s.M)(t.current);return r?.addEventListener("scroll",o),()=>{r?.removeEventListener("scroll",o)}},[t,e]),(0,n.useCallback)(()=>{if(!m.current||!t.current)return f.current;let e=(0,i.N)(m.current,t.current,{align:o??"center",side:r??"outside-top",alignmentOffset:d??0,anchorOffset:p??0,allowOutOfBounds:c});return(e.left!==f.current.left||e.top!==f.current.top)&&(f.current=e),f.current},[t,d,p,o,r,c]));return(0,a.jsx)(l.h,{...u,ref:m,open:e,style:{position:"absolute",...g,...u.style}})});try{(r=p).displayName||(r.displayName="PortalTooltip")}catch{}}}]);
//# sourceMappingURL=ui_packages_commit-attribution_index_ts-ui_packages_copy-to-clipboard_index_ts-ui_packages_us-d922f2-e33fabc95d60.js.map