/*! (c) Philipp König under GPL-3.0 */
"use strict";!function(o){window.ModelHelper=function(o){var e=this,t={textColor:{light:"rgb(100,100,100)",dark:"rgb(200,200,200)"},sidebarMaskColor:{light:"rgba(255,255,255,0.8)",dark:"rgba(0,0,0,0.6)"},colorScheme:{light:"rgb(27,130,241)",dark:"rgb(31, 77, 128)"}},i={u:{openStates:{},hiddenEntries:{},scrollPos:{},separators:{},entriesLocked:!1,sort:{name:"custom",dir:"ASC"},mostViewedPerMonth:!1,viewAsTree:!0},b:{animations:!0,preventPageScroll:!1,pxTolerance:{windowed:20,maximized:1},openAction:"mousedown",newTab:"foreground",newTabPosition:"afterCurrent",linkAction:"current",dirAccordion:!1,rememberState:"all",rememberSearch:!0,dirOpenDuration:.5,openDelay:0,closeTimeout:1,initialOpenOnNewTab:!1},a:{sidebarPosition:"left",language:"default",showIndicator:!0,showIndicatorIcon:!0,darkMode:!1,showBookmarkIcons:!0,showDirectoryIcons:!0,styles:{colorScheme:t.colorScheme.light,textColor:t.textColor.light,indicatorWidth:"40px",indicatorIconSize:"32px",indicatorIconColor:"rgb(255,255,255)",indicatorColor:"rgba(0,0,0,0.5)",sidebarWidth:"350px",sidebarMaskColor:t.sidebarMaskColor.light,bookmarksFontSize:"14px",directoriesIconSize:"16px",bookmarksIconSize:"16px",bookmarksLineHeight:"40px",bookmarksDirIcon:"dir-1",bookmarksDirColor:t.textColor.light,bookmarksDirIndentation:"25px",bookmarksHorizontalPadding:"16px",overlayMaskColor:"rgba(0,0,0,0.5)",fontFamily:"default"}}},r={};this.init=function(o){var e=["utility","behaviour","appearance"];chrome.storage.sync.get(e,function(t){r=t,e.forEach(function(o){void 0===r[o]&&(r[o]={})}),"function"==typeof o&&o()})},this.getAllData=function(){return r},this.getData=function(e){var t=e;"string"==typeof t&&(t=[t]);var n={};if(t.forEach(function(e){var t=e.split("/")[0],a=e.split("/")[1],s=null,c=null;switch(t){case"u":c=r.utility;break;case"b":c=r.behaviour;break;case"a":c=r.appearance}if(null!==c&&(void 0===c[a]?void 0!==i[t]&&void 0!==i[t][a]&&(s=i[t][a]):s=c[a]),"a/styles"===e){if(void 0===s.directoriesIconSize&&void 0!==s.bookmarksIconSize&&(s.directoriesIconSize=s.bookmarksIconSize),s=Object.assign({},i.a.styles,s),o.helper.font&&o.helper.font.isLoaded()){var l=o.helper.font.getFontInfo();s.fontFamily=l.name,Object.assign(s,l.fontWeights)}"__color_ee"===s.colorScheme&&(s.isEE=!0,s.colorScheme="#7b5fa4")}n[a]=s}),"string"==typeof e){var a=e.split("/")[1];n=n[a]}return n},this.setData=function(o,t){e.init(function(){Object.keys(o).forEach(function(e){var t=e.split("/")[0],i=e.split("/")[1],n=o[e];switch(t){case"u":r.utility[i]=n;break;case"b":r.behaviour[i]=n;break;case"a":r.appearance[i]=n}});try{chrome.storage.sync.set(r,function(){"function"==typeof t&&t()})}catch(o){"function"==typeof t&&t()}})},this.call=function(o,e,t){"function"==typeof e&&(t=e,e={}),e.type=o,chrome.extension.sendMessage(e,function(o){"function"==typeof t&&t(o)})},this.getDefaultColor=function(o,e){return t[o]?e&&t[o][e]?t[o][e]:t[o].light:null}}}(jsu);