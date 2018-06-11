/*! (c) Philipp König under GPL-3.0 */
(e=>{"use strict";(new function(){let t=!1;this.elm={body:e("body"),title:e("head > title"),sidebar:{left:e("div#sidebar"),right:null}},this.run=(()=>{l();let t=this.helper.template.loading().appendTo(this.elm.body);this.elm.body.addClass(e.cl.general.initLoading),this.helper.model.init().then(()=>this.helper.i18n.init()).then(()=>(this.elm.body.parent("html").attr("dir",this.helper.i18n.isRtl()?"rtl":"ltr"),this.helper.font.init(),this.helper.stylesheet.init(),this.helper.stylesheet.addStylesheets(["onboarding"],e(document)),this.helper.i18n.parseHtml(document),this.elm.title.text(this.elm.title.text()+" - "+this.helper.i18n.get("extension_name")),this.helper.model.call("trackPageView",{page:"/onboarding",always:!0}))).then(()=>{this.elm.body.removeClass(e.cl.general.building),this.elm.sidebar.right=e(this.elm.sidebar.left[0].outerHTML).appendTo(this.elm.body),this.elm.sidebar.right.attr(e.attr.position,"right"),i(),n(),o(),a(),s(),r(),d(),e.delay(500).then(()=>(this.elm.body.removeClass(e.cl.general.initLoading),c("intro"),e.delay(300))).then(()=>{t.remove()})})});let l=()=>{this.helper={i18n:new window.I18nHelper(this),font:new window.FontHelper(this),stylesheet:new window.StylesheetHelper(this),template:new window.TemplateHelper(this),model:new window.ModelHelper(this)}},i=()=>{e(window).on("beforeunload",()=>{t&&this.helper.model.call("reinitialize")})},n=()=>{e("section."+e.cl.onboarding.slide+"["+e.attr.name+"='intro'] a").on("click",t=>{t.preventDefault(),e(t.currentTarget).hasClass(e.cl.onboarding.skip)?p(!0):h()})},o=()=>{e("section."+e.cl.onboarding.slide+"["+e.attr.name+"='position'] a").on("mouseenter click",l=>{l.preventDefault();let i=e(l.currentTarget).attr(e.attr.value);this.elm.body.attr(e.attr.position,i),Object.values(this.elm.sidebar).forEach(t=>{t.removeClass(e.cl.general.visible)}),this.elm.sidebar[i].addClass(e.cl.general.visible),"click"===l.type&&this.helper.model.setData({"b/sidebarPosition":i}).then(()=>{t=!0,h()})}).on("mouseleave",t=>{let l=e(t.currentTarget).parent();e.delay().then(()=>{l.hasClass(e.cl.general.visible)&&Object.values(this.elm.sidebar).forEach(t=>{t.removeClass(e.cl.general.visible)})})})},a=()=>{e("section."+e.cl.onboarding.slide+"["+e.attr.name+"='surface'] a").on("mouseenter click",l=>{l.preventDefault();let i=e(l.currentTarget).attr(e.attr.value);if(this.elm.body.attr(e.attr.onboarding.surface,i),"click"===l.type){let l=this.helper.model.getData("a/styles");l.colorScheme=this.helper.model.getDefaultColor("colorScheme",i),l.textColor=this.helper.model.getDefaultColor("textColor",i),l.bookmarksDirColor=this.helper.model.getDefaultColor("textColor",i),l.sidebarMaskColor=this.helper.model.getDefaultColor("sidebarMaskColor",i),l.hoverColor=this.helper.model.getDefaultColor("hoverColor",i),Object.values(this.elm.sidebar).forEach(t=>{t.removeClass(e.cl.general.visible)}),this.helper.model.setData({"a/darkMode":"dark"===i,"a/styles":l}).then(()=>{t=!0,h()})}}).on("mouseleave",t=>{let l=e(t.currentTarget).parent();e.delay().then(()=>{l.hasClass(e.cl.general.visible)&&this.elm.body.removeAttr(e.attr.onboarding.surface)})})},s=()=>{e("section."+e.cl.onboarding.slide+"["+e.attr.name+"='openAction'] a").on("mouseenter click",l=>{l.preventDefault();let i=e(l.currentTarget).attr(e.attr.value);i&&("click"===l.type?(this.elm.body.addClass(e.cl.onboarding.hideOpenTypeIcon),this.helper.model.setData({"b/openAction":i}).then(()=>{t=!0,p()})):(this.elm.body.removeClass(e.cl.onboarding.hideOpenTypeIcon),this.elm.body.attr(e.attr.onboarding.openType,"icon"===i?"icon":"mouse")))}).on("mouseleave",t=>{e(t.currentTarget).parent("section").hasClass(e.cl.general.visible)&&this.elm.body.addClass(e.cl.onboarding.hideOpenTypeIcon)})},r=()=>{e(document).on(e.opts.events.sidebarOpened,()=>{e("section."+e.cl.onboarding.slide+"["+e.attr.name+"='finished']").hasClass(e.cl.general.visible)||(this.elm.body.addClass(e.cl.onboarding.hideOpenTypeIcon),c("finished"))})},d=()=>{e("section."+e.cl.onboarding.slide+"["+e.attr.name+"='finished'] a").on("click",t=>{t.preventDefault(),e(t.currentTarget).hasClass(e.cl.onboarding.settings)?location.href=chrome.extension.getURL("html/settings.html"):e(t.currentTarget).hasClass(e.cl.onboarding.appearance)&&(location.href=chrome.extension.getURL("html/settings.html")+"#appearance_sidebar")})},h=()=>{let t=e("section."+e.cl.onboarding.slide+"."+e.cl.general.visible).next("section."+e.cl.onboarding.slide).attr(e.attr.name);c(t)},c=t=>{e("section."+e.cl.onboarding.slide+"."+e.cl.general.visible).removeClass(e.cl.general.visible),e.delay(300).then(()=>{this.helper.model.call("trackEvent",{category:"onboarding",action:"view",label:t,always:!0}),e("section."+e.cl.onboarding.slide+"["+e.attr.name+"='"+t+"']").addClass(e.cl.general.visible)})},p=()=>{c("handson"),m(),Object.values(this.elm.sidebar).forEach(t=>{t.removeClass(e.cl.general.visible)});let t=e("section."+e.cl.onboarding.slide+"["+e.attr.name+"='handson']"),l=this.helper.model.getData(["b/openAction","b/sidebarPosition"]);if(this.elm.body.attr(e.attr.position,l.sidebarPosition),"icon"===l.openAction)e("<p />").text(this.helper.i18n.get("onboarding_handson_icon_desc")).appendTo(t);else{let i=this.helper.i18n.get("onboarding_"+l.sidebarPosition);if(e("<p />").text(this.helper.i18n.get("onboarding_handson_mouse_desc_1",[i])).appendTo(t),"mousemove"!==l.openAction){let i=this.helper.i18n.get("onboarding_"+("contextmenu"===l.openAction?"right":"left"));e("<p />").text(this.helper.i18n.get("onboarding_handson_mouse_desc_2",[i])).appendTo(t)}}e.delay(300).then(()=>{this.elm.body.removeClass(e.cl.onboarding.hideOpenTypeIcon),this.elm.body.attr(e.attr.onboarding.openType,"icon"===l.openAction?"icon":"mouse")})},m=()=>{e.opts.manifest.content_scripts[0].css.forEach(t=>{e("head").append("<link href='"+chrome.extension.getURL(t)+"' type='text/css' rel='stylesheet' />")});let t=(l=0)=>{let i=e.opts.manifest.content_scripts[0].js[l];if(void 0!==i){let e=document.createElement("script");document.head.appendChild(e),e.onload=(()=>t(l+1)),e.src="/"+i}};t()}}).run()})(jsu);