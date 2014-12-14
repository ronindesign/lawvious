/*!CK:2465785287!*//*1418086675,*/

if (self.CavalryLogger) { CavalryLogger.start_js(["3NqyL"]); }

__d("ChatSidebarSections",[],function(a,b,c,d,e,f){e.exports={MORE_ONLINE_FRIENDS:"more_online_friends",MORE_ONLINE_COWORKERS:"more_online_coworkers",OFFLINE_USERS:"offline_users",ORDERED_LIST:"ordered_list",ORDERED_COWORKERS:"ordered_coworkers",TYPEAHEAD:"typeahead"};},null);
__d("ModuleDependencies",[],function(a,b,c,d,e,f){function g(k,l,m){var n=b.__debug.modules[m],o=b.__debug.deps;if(l[m])return;l[m]=true;if(!n){o[m]&&(k[m]=true);return;}if(!n.dependencies||!n.dependencies.length){if(n.waiting)k[m]=true;return;}n.dependencies.forEach(function(p){g(k,l,p);});}function h(k){if(b.__debug){var l={};g(l,{},k);var m=Object.keys(l);m.sort();return m;}return null;}function i(){var k={loading:{},missing:[]};if(!b.__debug)return k;var l={},m=b.__debug.modules,n=b.__debug.deps;for(var o in m){var p=m[o];if(p.waiting){var q={};g(q,{},p.id);delete q[p.id];k.loading[p.id]=Object.keys(q);k.loading[p.id].sort();k.loading[p.id].forEach(function(r){if(!(r in m)&&n[r])l[r]=1;});}}k.missing=Object.keys(l);k.missing.sort();return k;}var j={setRequireDebug:function(k){b.__debug=k;},getMissing:h,getNotLoadedModules:i};e.exports=j;},null);
__d("ModuleErrorLogger",["Bootloader","ErrorUtils","ModuleDependencies","BanzaiScuba"],function(a,b,c,d,e,f,g,h,i,j){function k(n){if(!n||!n.length)return 0;return n.reduce(function(o,p){return o+p;})/n.length;}function l(n){if(!n)return [];var o=[];for(var p in n)o.push(n[p]);return o;}var m={init:function(){h.addListener(function(n){if(n.name!=='ModuleError')return;var o=i.getNotLoadedModules(),p=Object.keys(o.loading),q=l(g.getLoadingUrls()),r=l(g.getLoadedUrlTimes()),s={};o.missing.forEach(function(v){s[v]=1;});var t={};p.forEach(function(v){t[v]=1;});var u=new j('module_errors',null,{addAsnFields:true,addPredictedGeographyFields:true,addBrowserFields:true,addMobileDeviceFields:true,addPageFields:true,addUserFields:true});u.addInteger('missing_count',o.missing.length).addInteger('loading_count',p.length).addInteger('error_url_count',g.getErrorUrls().length).addTagset('missing_modules',s).addTagset('loading_modules',t).addInteger('mean_url_loading_time',Math.floor(k(q))).addInteger('mean_url_loaded_time',Math.floor(k(r))).post();},true);}};e.exports=m;},null);
__d("AsyncLoader",["copyProperties","AsyncRequest","BaseAsyncLoader"],function(a,b,c,d,e,f,g,h,i){function j(k,l){this._endpoint=k;this._type=l;}g(j.prototype,i.prototype);j.prototype.send=function(k,l,m,n,o){new h(k).setData({ids:l}).setHandler(n).setErrorHandler(o).setAllowCrossPageTransition(true).setMethod('GET').setReadOnly(true).send();};e.exports=j;},null);
__d("legacy:cookie",["Cookie"],function(a,b,c,d,e,f,g){a.getCookie=g.get;a.setCookie=g.set;a.clearCookie=g.clear;},3);
__d("Clock",["EventEmitter"],function(a,b,c,d,e,f,g){var h=new g();h.ANOMALY='anomaly';var i=30,j=Date.now(),k=[],l=0,m=1000;function n(){var p=Date.now()-j;return p<0||p>m*10;}function o(){var p=Date.now()-j;k[l]=p;l=(l+1)%i;if(n())h.emit(h.ANOMALY,p);j=Date.now();}h.getSamples=function(){return k.slice(l).concat(k.slice(0,l));};h.isAnomalous=n;setInterval(o,m,false);e.exports=h;},null);
__d("PublicPromise",["Promise"],function(a,b,c,d,e,f,g){function h(){"use strict";this.$PublicPromise0=false;this.$PublicPromise1=false;this.$PublicPromise2=new g(function(i,j){this.$PublicPromise3=i;this.$PublicPromise4=j;}.bind(this));}h.prototype.getPromise=function(){"use strict";return this.$PublicPromise2;};h.prototype.resolve=function(i){"use strict";if(!this.$PublicPromise0){this.$PublicPromise1=true;this.$PublicPromise3(i);}};h.prototype.reject=function(i){"use strict";if(!this.$PublicPromise0){this.$PublicPromise1=true;this.$PublicPromise4(i);}};h.prototype.then=function(){"use strict";return g.prototype.then.apply(this.$PublicPromise2,arguments);};h.prototype.done=function(){"use strict";return g.prototype.done.apply(this.$PublicPromise2,arguments);};h.prototype.abort=function(){"use strict";this.$PublicPromise0=true;};h.prototype.isSettled=function(){"use strict";return this.$PublicPromise1;};h.prototype.isAborted=function(){"use strict";return this.$PublicPromise0;};e.exports=h;},null);
__d("LogHistoryListeners",["Clock","ErrorUtils","LogHistory"],function(a,b,c,d,e,f,g,h){var i=b('LogHistory').getInstance('sys');g.addListener(g.ANOMALY,function(j){i.warn('clock_anomaly',g.getSamples());});h.addListener(function(j){i.error('error',JSON.stringify({guard:j.guard,line:j.line,message:j.message,script:j.script,stack:j.stack}));});},null);
__d("ScriptPathLogger",["Banzai","ScriptPath","copyProperties","isInIframe"],function(a,b,c,d,e,f,g,h,i,j){var k='script_path_change',l={scriptPath:null,categoryToken:null,impressionID:null},m=false;function n(v,w,x){if(!m||j())return;var y=g.isEnabled('vital_navigations')?g.VITAL:g.BASIC,z={source_path:v.scriptPath,source_token:v.categoryToken,dest_path:w.scriptPath,dest_token:w.categoryToken,navigation:h.getNavigation(),impression_id:w.impressionID,cause:x};if(v.owningEntityID)z.source_owning_entity_id=v.owningEntityID;if(w.owningEntityID)z.dest_owning_entity_id=w.owningEntityID;if(v.topViewEndpoint)z.source_endpoint=v.topViewEndpoint;if(w.topViewEndpoint)z.dest_endpoint=w.topViewEndpoint;g.post(k,z,y);}function o(){n(l,h.getPageInfo(),h.CAUSE.PAGE_LOAD);}function p(v,w){n(v,w,h.CAUSE.TRANSITION);}function q(){n(h.getPageInfo(),l,h.CAUSE.PAGE_UNLOAD);}function r(v){var w=i({},l);w.scriptPath=v;n(h.getPageInfo(),w,h.CAUSE.DIALOG_OPEN);}function s(v){var w=i({},l);w.scriptPath=v;n(w,h.getPageInfo(),h.CAUSE.DIALOG_CLOSE);}var t=h.subscribe(function(v){if(m){var w=v.source,x=v.dest,y=v.cause;if(y){n(w||l,x||l,y);}else if(w){p(w,x);}else o();}});g.subscribe(g.SHUTDOWN,q);var u={startLogging:function(){m=true;if(h.getPageInfo())o();},stopLogging:function(){m=false;h.unsubscribe(t);},logDialogOpen:function(v){r(v);},logDialogClose:function(v){s(v);}};u.BANZAI_LOGGING_ROUTE=k;e.exports=u;},null);
__d("TimeSpentArray",["Banzai","pageID","setTimeoutAcrossTransitions"],function(a,b,c,d,e,f,g,h,i){var j=2,k=j*32,l,m,n,o,p,q,r,s,t,u={},v;function w(){return {timeoutDelayMap:u,nextDelay:v,timeoutInSeconds:n};}function x(){if(l){var fa=Date.now();if(fa>p)r=Math.min(k,Math.ceil((fa/1000)-o));var ga=ca();if(ga)l(ga,v);}ba();}function y(){z();m=i(x,n*1000);}function z(){if(m){clearTimeout(m);m=null;}}function aa(fa){o=fa;p=o*1000;q=[1];for(var ga=1;ga<j;ga++)q.push(0);r=1;s+=1;t+=1;var ha=t.toString()+'_delay';v=u[ha];if(typeof v=='undefined')v=u.delay;var ia=t.toString()+'_timeout',ja=u[ia];if(typeof ja=='undefined')ja=u.timeout;ja=Math.min(ja,k);n=ja||k;y();}function ba(){z();q=null;}function ca(){if(!q)return null;return {tos_id:h,start_time:o,tos_array:q.slice(0),tos_len:r,tos_seq:t,tos_cum:s};}function da(fa){if(fa>=p&&(fa-p)<1000)return;ea(Math.floor(fa/1000));}function ea(fa){var ga=fa-o;if(ga<0||ga>=k)x();if(!q){aa(fa);}else{q[ga>>5]|=(1<<(ga&31));r=ga+1;s+=1;p=fa*1000;}}e.exports={init:function(fa,ga,ha){s=0;t=-1;l=fa;if(typeof ga=='object'&&ga!==null){u=ga;}else u={};if(!ha)ha=Date.now();aa(Math.floor(ha/1000));g.subscribe(g.SHUTDOWN,x);},update:function(fa){da(fa);},get:function(){return ca();},ship:function(){x();},reset:function(){ba();},testState:function(){return w();}};},null);
__d("TimeSpentImmediateActiveSecondsLogger",["Banzai","ImmediateActiveSecondsConfig","ScriptPath"],function(a,b,c,d,e,f,g,h,i){var j='immediate_active_seconds',k={signal:true,retry:true},l=h.sampling_rate,m=h.ias_bucket,n=0;function o(s){if(l<=0)return false;var t=Math.floor(s/1000)%l;return t===m;}function p(s){if(s>=n&&s-n<1000)return;if(o(s)){var t={activity_time_ms:s,last_activity_time_ms:n,script_path:i.getTopViewEndpoint()};try{g.post(j,t,k);}catch(u){}}n=Math.floor(s/1000)*1000;}function q(event,s,t){if(u<0||v<0||u>v)return;var u=Math.floor(s/1000),v=Math.floor(t/1000);if(!r(u,v))return;var w={event:event,start_time_ms:s,end_time_ms:t};g.post(j,w,k);}function r(s,t){if(l<=0)return false;if(t-s>=l)return true;var u=s+(m-(s%l)+l)%l;return u<=t;}e.exports={maybeReportActiveSecond:p,maybeReportActiveInterval:q};},null);
__d("legacy:onload-action",["OnloadHooks"],function(a,b,c,d,e,f,g){a._onloadHook=g._onloadHook;a._onafterloadHook=g._onafterloadHook;a.runHook=g.runHook;a.runHooks=g.runHooks;a.keep_window_set_as_loaded=g.keepWindowSetAsLoaded;},3);
__d("ClickRefUtils",[],function(a,b,c,d,e,f){var g={get_intern_ref:function(h){if(!!h){var i={profile_minifeed:1,gb_content_and_toolbar:1,gb_muffin_area:1,ego:1,bookmarks_menu:1,jewelBoxNotif:1,jewelNotif:1,BeeperBox:1,searchBarClickRef:1};for(var j=h;j&&j!=document.body;j=j.parentNode){if(!j.id||typeof j.id!=='string')continue;if(j.id.substr(0,8)=='pagelet_')return j.id.substr(8);if(j.id.substr(0,8)=='box_app_')return j.id;if(i[j.id])return j.id;}}return '-';},get_href:function(h){var i=(h.getAttribute&&(h.getAttribute('ajaxify')||h.getAttribute('data-endpoint'))||h.action||h.href||h.name);return typeof i==='string'?i:null;},should_report:function(h,i){if(i=='FORCE')return true;if(i=='INDIRECT')return false;return h&&(g.get_href(h)||(h.getAttribute&&h.getAttribute('data-ft')));}};e.exports=g;},null);
__d("setUECookie",["Env"],function(a,b,c,d,e,f,g){function h(i){if(!g.no_cookies)document.cookie="act="+encodeURIComponent(i)+"; path=/; domain="+window.location.hostname.replace(/^.*(\.facebook\..*)$/i,'$1');}e.exports=h;},null);
__d("ClickRefLogger",["Arbiter","Banzai","ClickRefUtils","EagleEye","Env","ScriptPath","Vector","$","collectDataAttributes","copyProperties","ge","pageID","setUECookie"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s){var t={delay:0,retry:true};function u(y){if(!q('content'))return [0,0,0,0];var z=n('content'),aa=m.getEventPosition(y);return [aa.x,aa.y,z.offsetLeft,z.clientWidth];}function v(y,z,event,aa){var ba='r',ca=[0,0,0,0],da,ea;if(!!event){da=event.type;if(da=='click'&&q('content'))ca=u(event);var fa=0;event.ctrlKey&&(fa+=1);event.shiftKey&&(fa+=2);event.altKey&&(fa+=4);event.metaKey&&(fa+=8);if(fa)da+=fa;}if(!!z)ea=i.get_href(z);var ga=o(!!event?(event.target||event.srcElement):z,['ft','gt']);p(ga.ft,aa.ft||{});p(ga.gt,aa.gt||{});if(typeof(ga.ft.ei)==='string')delete ga.ft.ei;var ha=[y._ue_ts,y._ue_count,ea||'-',y._context,da||'-',i.get_intern_ref(z),ba,a.URI?a.URI.getRequestURI(true,true).getUnqualifiedURI().toString():location.pathname+location.search+location.hash,ga].concat(ca).concat(r).concat(l.getScriptPath());return ha;}g.subscribe("ClickRefAction/new",function(y,z){if(i.should_report(z.node,z.mode)){var aa=v(z.cfa,z.node,z.event,z.extra_data);s(z.cfa.ue);if(h.isEnabled('click_ref_logger')){var ba=[j.getSessionID(),Date.now(),'act'];h.post('click_ref_logger',Array.prototype.concat(ba,aa),t);}else j.log('act',aa);}});function w(y){function z(ha){var ia='';for(var ja=0;ja<ha.length;ja++)ia+=String.fromCharCode(1^ha.charCodeAt(ja));return ia;}function aa(ha,ia,ja,ka){var la=ia[ja];if(la&&ha&&la in ha)if(ja+1<ia.length){aa(ha[la],ia,ja+1,ka);}else{var ma=ha[la],na=function(){setTimeout(ka.bind(null,arguments));return ma.apply(this,arguments);};na.toString=ma.toString.bind(ma);Object.defineProperty(ha,la,{configurable:false,writable:true,value:na});}}var ba={},ca={},da=false;function ea(ha,ia){if(ca[ha])return;ca[ha]=ba[ha]=1;}var fa=y[z('jiri')];if(fa){var ga=[];z(fa).split(',').map(function(ha,ia){var ja=ha.substring(1).split(':'),ka;switch(ha.charAt(0)){case '1':ka=new RegExp('\\b('+ja[0]+')\\b','i');ga.push(function(la){var ma=ka.exec(Object.keys(window));if(ma)ea(ia,''+ma);});break;case '2':ka=new RegExp(ja[0]);aa(window,ja,2,function(la){var ma=la[ja[1]];if(typeof ma==='string'&&ka.test(ma))ea(ia,ha);});break;case '3':aa(window,ja,0,function(){for(var la=ga.length;la--;)ga[la]();var ma=Object.keys(ba);if(ma.length){ba={};setTimeout(h[z('qnru')].bind(h,z('islg'),{m:''+ma}),5000);}});break;case '4':da=true;break;}});}}try{w(k);}catch(x){}},null);
__d("StringTransformations",[],function(a,b,c,d,e,f){e.exports={unicodeEscape:function(g){return g.replace(/[^A-Za-z0-9\-\.\:\_\$\/\+\=]/g,function(h){var i=h.charCodeAt().toString(16);return '\\u'+('0000'+i.toUpperCase()).slice(-4);});},unicodeUnescape:function(g){return g.replace(/(\\u[0-9A-Fa-f]{4})/g,function(h){return String.fromCharCode(parseInt(h.slice(2),16));});}};},null);
__d("UserActionHistory",["Arbiter","ClickRefUtils","ScriptPath","throttle","WebStorage"],function(a,b,c,d,e,f,g,h,i,j,k){var l={click:1,submit:1},m=false,n={log:[],len:0},o=j.acrossTransitions(function(){try{m._ua_log=JSON.stringify(n);}catch(r){m=false;}},1000);function p(){var r=k.getSessionStorage();if(r){m=r;m._ua_log&&(n=JSON.parse(m._ua_log));}else m=false;n.log[n.len%10]={ts:Date.now(),path:'-',index:n.len,type:'init',iref:'-'};n.len++;g.subscribe("UserAction/new",function(s,t){var u=t.ua,v=t.node,event=t.event;if(!event||!(event.type in l))return;var w={path:i.getScriptPath(),type:event.type,ts:u._ue_ts,iref:h.get_intern_ref(v)||'-',index:n.len};n.log[n.len++%10]=w;m&&o();});}function q(){return n.log.sort(function(r,s){return (s.ts!=r.ts)?(s.ts-r.ts):(s.index-r.index);});}p();e.exports={getHistory:q};},null);
__d("KappaWrapper",["AsyncSignal","setTimeoutAcrossTransitions"],function(a,b,c,d,e,f,g,h){var i=false;e.exports={forceStart:function(j,k,l){var m=0,n=function(){new g('/si/kappa/',{Ko:"a"}).send();if(++m<j)h(n,(k*1000));};h(n,((k+l)*1000));},start:function(j,k,l){if(!i){i=true;this.forceStart(j,k,l);}}};},null);
__d("Chromedome",["fbt"],function(a,b,c,d,e,f,g){f.start=function(h){if(h.off||top!==window||!/(^|\.)facebook\.com$/.test(document.domain))return;var i=h.stop||"Stop!",j=h.text||"This is a browser feature intended for developers. If someone told you to copy-paste something here to enable a Facebook feature or \"hack\" someone's account, it is a scam and will give them access to your Facebook account.",k=h.more||g._("For more information, see {url}.",[g.param("url",'https://www.facebook.com/selfxss')]);if((window.chrome||window.safari)&&!h.textonly){var l='font-family:helvetica; font-size:20px; ';[[i,h.c1||l+'font-size:50px; font-weight:bold; '+'color:red; -webkit-text-stroke:1px black;'],[j,h.c2||l],[k,h.c3||l],['','']].map(function(r){setTimeout(console.log.bind(console,'\n%c'+r[0],r[1]));});}else{var m=['',' .d8888b.  888                       888','d88P  Y88b 888                       888','Y88b.      888                       888',' "Y888b.   888888  .d88b.  88888b.   888','    "Y88b. 888    d88""88b 888 "88b  888','      "888 888    888  888 888  888  Y8P','Y88b  d88P Y88b.  Y88..88P 888 d88P',' "Y8888P"   "Y888  "Y88P"  88888P"   888','                           888','                           888','                           888'],n=(''+j).match(/.{35}.+?\s+|.+$/g),o=Math.floor(Math.max(0,(m.length-n.length)/2));for(var p=0;p<m.length||p<n.length;p++){var q=m[p];m[p]=q+new Array(45-q.length).join(' ')+(n[p-o]||'');}console.log('\n\n\n'+m.join('\n')+'\n\n'+k+'\n');return;}};},null);
__d("ClearableTypeahead",["Event"],function(a,b,c,d,e,f,g){var h={resetOnCloseButtonClick:function(i,j){g.listen(j,'click',function(){var k=i.getCore();k.getElement().focus();k.reset();});}};e.exports=h;},null);
__d("WebStorageMonster",["Event","AsyncRequest","UserActivity","StringTransformations","WebStorage","arrayContains","isEmpty","setTimeoutAcrossTransitions"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n){var o=300000,p=false;function q(v){var w={};for(var x in v){var y=v.getItem(x),z=j.unicodeEscape(x);if(typeof y==='string')w[z]=y.length;}return w;}function r(v){var w=k.getLocalStorage();if(!w||!v.keys)return;u._getLocalStorageKeys().forEach(function(x){if(l(v.keys,x))w.removeItem(x);});}function s(v){var w=k.getLocalStorage();if(w)u._getLocalStorageKeys().forEach(function(y){if(!v.some(function(z){return new RegExp(z).test(y);}))w.removeItem(y);});var x=k.getSessionStorage();if(x)x.clear();}function t(v){if(i.isActive(o)){n(t.bind(null,v),o);}else u.cleanNow(v);}var u={registerLogoutForm:function(v,w){g.listen(v,'submit',function(x){u.cleanOnLogout(w);});},schedule:function(v){if(p)return;p=true;t(v);},cleanNow:function(v){var w=Date.now(),x={},y=k.getLocalStorage();if(y)x.localStorage=q(y);var z=k.getSessionStorage();if(z)x.sessionStorage=q(z);var aa=!m(x),ba=Date.now();x.logtime=ba-w;if(aa)new h('/ajax/webstorage/process_keys.php').setData(x).setHandler(function(ca){if(!v){var da=ca.getPayload();if(da.keys)da.keys=da.keys.map(j.unicodeUnescape);r(da);}}.bind(this)).send();},cleanOnLogout:function(v){if(v)s(v);var w=k.getSessionStorage();if(w)w.clear();},_getLocalStorageKeys:function(){var v=k.getLocalStorage();return v?Object.keys(v):[];}};e.exports=u;},null);