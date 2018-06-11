/*! (c) Philipp König under GPL-3.0 */
(e=>{"use strict";(new function(){let t={};this.elm={body:e("body"),title:e("head > title"),contentWrapper:e("body > main"),changelogWrapper:e("article#changelog"),releaseHistoryWrapper:e("article#releaseHistory"),versionInfo:e("main > div.version > span")},this.run=(()=>{l();let i=this.helper.template.loading().appendTo(this.elm.body);this.elm.body.addClass(e.cl.general.initLoading),this.helper.model.init().then(()=>this.helper.i18n.init()).then(()=>(this.elm.body.parent("html").attr("dir",this.helper.i18n.isRtl()?"rtl":"ltr"),this.helper.font.init("default"),this.helper.stylesheet.init(),this.helper.stylesheet.addStylesheets(["changelog"],e(document)),this.helper.i18n.parseHtml(document),this.elm.title.text(this.elm.title.text()+" - "+this.helper.i18n.get("extension_name")),this.elm.versionInfo.text(e.opts.manifest.version_name),this.helper.model.call("trackPageView",{page:"/changelog"}))).then(()=>(this.elm.body.removeClass(e.cl.general.building),Promise.all([a(),e.delay(700)]))).then(()=>{t&&t.changelog&&t.releaseHistory?(s(),r(),n()):e("<p />").addClass(e.cl.general.error).text(this.helper.i18n.get("status_changelog_unavailable_desc")).appendTo(this.elm.contentWrapper),i.remove(),this.elm.body.removeClass(e.cl.general.initLoading)})});let l=()=>{this.helper={i18n:new window.I18nHelper(this),font:new window.FontHelper(this),template:new window.TemplateHelper(this),stylesheet:new window.StylesheetHelper(this),checkbox:new window.CheckboxHelper(this),model:new window.ModelHelper(this)}},s=()=>{let t=this.helper.checkbox.get(this.elm.body,{},"checkbox","switch").prependTo(this.elm.contentWrapper);e("<a />").html(this.helper.i18n.get("changelog_show_release_history")).insertAfter(t).on("click",e=>{e.preventDefault(),t.trigger("click")}),t.children("input[type='checkbox']").on("change",t=>{t.currentTarget.checked?(this.elm.releaseHistoryWrapper.addClass(e.cl.general.visible),this.elm.changelogWrapper.removeClass(e.cl.general.visible)):(this.elm.releaseHistoryWrapper.removeClass(e.cl.general.visible),this.elm.changelogWrapper.addClass(e.cl.general.visible))})},i=t=>{if("Dev"===e.opts.manifest.version_name||!("update_url"in e.opts.manifest))return!1;let l=null,s=/(\.0+)+$/,i=e.opts.manifest.version.replace(s,"").split("."),r=t.replace(s,"").split("."),n=Math.max(i.length,r.length);for(let e=0;e<n;e++)if(l=parseInt(i[e]||0,10)-parseInt(r[e]||0,10))return l<0;return!1},r=()=>{t&&t.changelog&&(Object.entries(t.changelog).forEach(([t,l])=>{if(!1===i(t)){let s=e("<div />").append("<h2>"+t+"</h2>").appendTo(this.elm.changelogWrapper),i=e("<ul />").appendTo(s);l.forEach(t=>{e("<li />").html(t).appendTo(i)})}}),this.elm.changelogWrapper.addClass(e.cl.general.visible))},n=()=>{t&&t.releaseHistory&&t.releaseHistory.forEach(t=>{if(!1===i(t.version)){let l=e("<div />").append("<h2>"+t.version+"</h2>").appendTo(this.elm.releaseHistoryWrapper),s=e("<ul />").appendTo(l);t.changes.forEach(t=>{e("<li />").html(t).appendTo(s)})}})},a=()=>new Promise(l=>{e.xhr(e.opts.ajax.versionHistory,{method:"POST",responseType:"json"}).then(e=>{e.response&&e.response.changelog&&e.response.releaseHistory&&(t=e.response),l()},()=>{l()})})}).run()})(jsu);