/*!CK:1779799386!*//*1418014195,*/

if (self.CavalryLogger) { CavalryLogger.start_js(["joRCM"]); }

__d("AdsCurrency",["AdsCurrencyConfig"],function(a,b,c,d,e,f){var g=b('AdsCurrencyConfig').currencies,h=Object.keys(g);function i(n){if(g[n])return g[n].format;return null;}function j(n){if(g[n])return g[n].symbol;return null;}function k(n){if(g[n])return 1*g[n].offset;return 1;}function l(n){if(g[n])return g[n].name;return null;}function m(n){if(g[n])return g[n].iso;return null;}f.getFormat=i;f.getSymbol=j;f.getOffset=k;f.getName=l;f.getISO=m;f.currencies=g;f.currencyMapKeys=h;},null);
__d("intlNumUtils",["NumberFormatConfig","escapeRegex"],function(a,b,c,d,e,f,g,h){var i=/(\d)(\d\d\d)($|\D)/,j={'\u060C':'.','\u0660':'0','\u0661':'1','\u0662':'2','\u0663':'3','\u0664':'4','\u0665':'5','\u0666':'6','\u0667':'7','\u0668':'8','\u0669':'9','\u066B':'.','\u06F0':'0','\u06F1':'1','\u06F2':'2','\u06F3':'3','\u06F4':'4','\u06F5':'5','\u06F6':'6','\u06F7':'7','\u06F8':'8','\u06F9':'9'};function k(u,v,w,x,y){w=w||'';x=x||'.';y=y||0;if(v===(void 0)||v===null){u=u.toString();}else if(typeof u==='string'){u=q(u,v);}else u=o(u,v);var z=u.split('.'),aa=z[0],ba=z[1];if(Math.abs(parseInt(aa,10)).toString().length>=y){var ca='',da='$1'+w+'$2$3';while((ca=aa.replace(i,da))!=aa)aa=ca;}var ea=aa;if(ba)ea+=x+ba;return ea;}function l(u,v){return k(u,v,'',g.decimalSeparator,g.minDigitsForThousandsSeparator);}function m(u,v){return k(u,v,g.numberDelimiter,g.decimalSeparator,g.minDigitsForThousandsSeparator);}function n(u,v,w){var x=Math.floor(Math.log(u)/Math.LN10),y=u;if(x<w)y=u*Math.pow(10,-x+w);var z=Math.pow(10,Math.floor(Math.log(y)/Math.LN10)-w+1),aa=Math.round(y/z)*z;if(x<w)aa/=Math.pow(10,-x+w);return m(aa,v);}function o(u,v){var w=Math.pow(10,v);u=Math.round(u*w)/w+'';if(!v)return u;var x=u.indexOf('.'),y=0;if(x==-1){u+='.';y=v;}else y=v-(u.length-x-1);for(var z=0,aa=y;z<aa;z++)u+='0';return u;}var p=function(u,v){for(var w=0;w<v;w++)u+='0';return u;};function q(u,v){var w=u.indexOf('.'),x=w===-1?u:u.slice(0,w),y=w===-1?'':u.slice(w+1);return v?x+'.'+p(y.slice(0,v),v-y.length):x;}function r(u,v){u=u.split('').map(function(y){return j.hasOwnProperty(y)?j[y]:y;}).join('');u=u.trim().replace(/^[^\d]*\-/,'\u0002');if(v){var w=new RegExp(h(v)+'(\\d*).*','i');u=u.replace(w,'\u0001$1');}else if(!((/^\u0002?(\d+,\d*){2,}$/.test(u))||(/^\u0002?(\d+\.\d*){2,}$/.test(u))))u=u.replace(/[\.,](\d*\D*)$/,'\u0001$1');u=u.replace(/[^0-9\u0001\u0002]/g,'').replace('\u0001','.').replace('\u0002','-');var x=Number(u);return (u===''||isNaN(x))?null:x;}function s(u){return r(u,g.decimalSeparator);}var t={formatNumber:l,formatNumberRaw:k,formatNumberWithThousandDelimiters:m,formatNumberWithLimitedSigFig:n,parseNumber:s,parseNumberRaw:r,getFloatString:function(u,v,w){var x=String(u),y=x.split('.'),z=t.getIntegerString(y[0],v);if(y.length===1)return z;return z+w+y[1];},getIntegerString:function(u,v){var w=String(u),x=/(\d+)(\d{3})/;while(x.test(w))w=w.replace(x,'$1'+v+'$2');return w;}};e.exports=t;},null);
__d("ads-lib-formatters",["AdsCurrency","NumberFormatConfig","fbt","intlNumUtils"],function(a,b,c,d,e,f,g,h,i,j){var k='USD';function l(ia,ja,ka){ia=ia||'';ka=ka||'';ja=typeof ja==='undefined'?ia.length:ja;return ia.length>ja?(ia.substr(0,ja-ka.length)+ka):ia;}function m(ia,ja){if(ja===(void 0)||ja===null)ja='';return function(ka){return !ka?ja:l(ka,ia,'...');};}function n(ia,ja,ka,la,ma){if(ia==='N/A')return ia;if(ja===(void 0))ja=0;return j.formatNumberRaw(ia||0,ja,ka,la,ma);}function o(ia){return function(ja){return n(ja,ia||0,',','.');};}function p(ia){return function(ja){return n(ja,ia||0,h.numberDelimiter,h.decimalSeparator,h.minDigitsForThousandsSeparator);};}function q(ia){return function(ja){return j.formatNumberRaw(ja||'0',ia||0,h.numberDelimiter,h.decimalSeparator,h.minDigitsForThousandsSeparator);};}function r(ia,ja){return function(ka){return j.formatNumberWithLimitedSigFig(ka,ia,ja);};}function s(ia,ja){if(ja)return p(ia);return function(ka){return n(ka,ia||0,'',h.decimalSeparator,h.minDigitsForThousandsSeparator);};}function t(ia,ja){var ka=ja===false?1:100;return function(la){return n(la*ka,ia||0,',','.')+'%';};}function u(ia,ja){var ka=ja===false?1:100;return function(la){return n(la*ka,ia||0,h.numberDelimiter,h.decimalSeparator)+'%';};}function v(ia,ja,ka,la,ma){if(ia===(void 0))ia=2;var na=la(ia);if(ka===(void 0))ka=false;ja=ja||k;var oa=ja+'-'+ia+'-'+ka;if(!ma[oa]){var pa=g.getFormat(ja)||g.getFormat(k),qa=g.getSymbol(ja)||g.getSymbol(k),ra=g.getOffset(ja)||g.getOffset(k);pa=pa.replace('{symbol}',qa);ma[oa]=function(sa){if(ka)sa=sa/ra;if(!(sa+'').match(/^\-?[\d\.,]*$/))return 'N/A';return pa.replace('{amount}',na(sa));};}return ma[oa];}var w={};function x(ia,ja,ka){return v(ia,ja,ka,o,w);}var y={};function z(ia,ja,ka){return v(ia,ja,ka,p,y);}function aa(ia,ja){return j.parseNumberRaw(ia+'',ja);}function ba(){return function(ia){return n(ia,0,',','.')+'%';};}function ca(){return function(ia){return n(ia,0,h.numberDelimiter,h.decimalSeparator)+'%';};}function da(ia){var ja=ia.currency(),ka=ia.offset()==100?2:0;return x(ka,ja);}function ea(ia,ja){var ka=ia.currency(),la=ia.offset()==100?2:0;return z(la,ka,ja);}function fa(ia){var ja=[];if(ia.countries&&ia.countries.length)ja.push(ia.countries);if(ia.cities&&ia.cities.length)ja.push(ia.cities.map(function(ka){return ka.name;}));if(ia.zips&&ia.zips.length)ja.push(ia.zips.map(function(ka){return ka.name;}));if(ia.regions&&ia.regions.length)ja.push(ia.regions.map(function(ka){return ka.name;}));return ja.join('; ').replace(/,/g,', ');}function ga(ia,ja){if(ia||ja){ia=ia||"All";ja=ja||"All";return ia+'&ndash;'+ja;}return 'Any';}function ha(ia){ia=ia+'';if(ia==='0'){return "All";}else if(ia==='1')return "Men";return "Women";}f.geoLocation=fa;f.age=ga;f.sex=ha;f.createTextTruncator=m;f.chopString=l;f.parseNumber=aa;f.formatNumber=n;f.createIntlNumberFormatter=p;f.createIntlLongNumberFormatter=q;f.createLimitedSigFigNumberFormatter=r;f.createMaybeDelimitedNumberFormatter=s;f.createIntlPercentFormatter=u;f.createIntlMoneyFormatter=z;f.createIntlMoneyFormatterForAccount=ea;f.createIntlInflationFormatter=ca;f.createNumberFormatter=o;f.createPercentFormatter=t;f.createMoneyFormatter=x;f.createMoneyFormatterForAccount=da;f.createInflationFormatter=ba;},null);
__d("TriggerablePageletLoader",["CSS","Event","OnVisible","Run","UIPagelet","copyProperties"],function(a,b,c,d,e,f,g,h,i,j,k,l){var m=[];function n(p){if(!m[p])return;m[p].__trigger&&m[p].__trigger.remove();delete m[p];}function o(p,q){"use strict";this._disabledTriggerKeys=[];this._pageletConfig=p;this._loaded=false;this._loading=false;this._triggerKeys=[];if(q)q.forEach(this.addTrigger.bind(this));j.onLeave(this.destroy.bind(this));}o.prototype.addTrigger=function(p){"use strict";p.__trigger=this._createTrigger(p);m.push(p);this._triggerKeys.push(m.length-1);};o.prototype.destroy=function(){"use strict";this.removeTriggers();if(this._pageletRequest){this._pageletRequest.cancel();this._pageletRequest=null;this._loading=false;this._loaded=false;}};o.prototype.disableTriggers=function(){"use strict";this._triggerKeys.forEach(function(p){if(m[p]){m[p].__trigger.remove();this._disabledTriggerKeys.push(p);}}.bind(this));};o.prototype.enableTriggers=function(){"use strict";if(this._loaded||this._loading)return;this._disabledTriggerKeys.forEach(function(p){if(m[p])m[p].__trigger=this._createTrigger(m[p]);}.bind(this));this._disabledTriggerKeys.length=0;};o.prototype._createTrigger=function(p){"use strict";if(this._loaded||this._loading)return;var q=this.onTrigger.bind(this,p);switch(p.type){case o.TRIGGER_CLICK:return h.listen(p.node,'click',function(r){r.prevent();q();});case o.TRIGGER_ONVISIBLE:return new i(p.node,q,p.onVisibleStrict,p.onVisibleBuffer);case o.TRIGGER_NOW:return q();default:}};o.prototype.load=function(p){"use strict";if(this._loaded||this._loading)return;this._loading=true;this._loaded=false;g.addClass(this._pageletConfig.node,'async_saving');if(p&&p.node)g.addClass(p.node,'async_saving');var q=this._pageletConfig.options||{};q.displayCallback=this.onLoad.bind(this,p);if(q.crossPage===(void 0))q.crossPage=true;this._pageletRequest=k.loadFromEndpoint(this._pageletConfig.controller,this._pageletConfig.node,this._pageletConfig.data,q);};o.prototype.onLoad=function(p,q){"use strict";this._loaded=true;this._pageletRequest=null;g.removeClass(this._pageletConfig.node,'async_saving');if(p&&p.node)g.removeClass(p.node,'async_saving');if(this._pageletConfig.displayCallback){this._pageletConfig.displayCallback(q);}else q();};o.prototype.onTrigger=function(p){"use strict";p.callback&&p.callback(p);if(!this._loaded&&!this._loading)this.load(p);};o.prototype.removeTriggers=function(p){"use strict";this._triggerKeys.forEach(function(q){if(m[q]&&(!p||m[q].type===p))n(q);});};o.removeTrigger=function(p){"use strict";for(var q=0;q<m.length;q++)if(m[q]&&m[q].node===p)n(q);};l(o,{TRIGGER_CLICK:'click',TRIGGER_ONVISIBLE:'onvisible',TRIGGER_NOW:'now'});e.exports=o;},null);
__d("MedleyPageletRequestData",["Arbiter","TidyArbiter"],function(a,b,c,d,e,f,g,h){var i={},j={get:function(){return i;},set:function(k){i=k;h.inform('Medley/requestDataSet',null,g.BEHAVIOR_STATE);}};e.exports=j;},null);
__d("TimelineAppSectionCuration",["Animation","AppSectionCurationState","Arbiter","AsyncSignal","CSS","DOM","Ease","Event","OnVisible","Parent","Style","TidyArbiterMixin","TimelineSection","copyProperties","cx","queryThenMutateDOM","tidyEvent"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w){var x=0,y={},z={};function aa(fa,ga,ha){var ia,ja;v(function(){ja=fa.offsetHeight;ia=ga===h.hide?0:fa.firstChild.offsetHeight;},function(){q.set(fa,'height',ja+'px');q.set(fa,'overflow','hidden');ia&&k.addClass(fa.parentNode,"_52bu");setTimeout(o.checkBuffer,0);var ka=l.getID(fa);z[ka]&&z[ka].stop();z[ka]=new g(fa).to('height',ia).ondone(function(){delete z[ka];if(ia){q.set(fa,'overflow','');q.set(fa.parentNode,'overflow','');}!ia&&k.removeClass(fa.parentNode,"_52bu");i.inform('reflow');}).duration(Math.abs(ia-ja)*1.5).ease(m.sineOut).go();});}function ba(fa,ga){if(fa){k.show(ga);k.hide(fa);}}function ca(fa,ga){if(fa){k.show(fa);k.hide(ga);}}function da(fa,ga){s.callWithSection(fa,function(ha){new j('/ajax/timeline/collections/app_recs/',{collection_token:ha.getActiveCollection().getToken(),event_type:ga}).send();});}var ea=t({addSection:function(fa,ga,ha){y[fa]={appClickLogged:false,buttons:ga,content:ha,id:fa,state:h.hide,previousState:h.hide,currentCollectionToken:(void 0),onVisible:null};q.set(ha,'height','0px');q.set(ha,'overflow','hidden');k.show(ha);for(var ia in ga)w([n.listen(ga[ia].hide_button,'click',ea.informState.bind(null,h.hide,fa)),n.listen(ga[ia].hide_button,'click',ea.informToggleDrawer.bind(null,'hide',fa)),n.listen(ga[ia].show_button,'click',ea.informState.bind(null,ia,fa)),n.listen(ga[ia].show_button,'click',ea.informToggleDrawer.bind(null,'show',fa))]);ea.register(fa,function(ja,ka,la,ma){y[fa].onVisible&&y[fa].onVisible.remove();y[fa].onVisible=new o(ha,aa.bind(null,ha,ja,ma),true,x);for(var na in ga)ca(ga[na].show_button,ga[na].hide_button);if(ga[ja])ba(ga[ja].show_button,ga[ja].hide_button);});},informState:function(fa,ga,ha,ia){if(typeof(ia)==='undefined')ia=true;if(y[ga]){var ja=y[ga].state;if(!ia&&fa==h.hide)fa=ja;if(!ia&&ha==y[ga].currentCollectionToken)fa=y[ga].previousState;if(ha)y[ga].currentCollectionToken=ha;if(y[ga].state!==fa){if(fa===h.showApps&&!y[ga].appClickLogged){y[ga].appClickLogged=true;da(ga,'add_apps_click');}y[ga].previousState=ja;y[ga].state=fa;ea.inform(fa,{obj:y[ga],oldState:ja});}}},informToggleDrawer:function(fa,ga){ea.inform('toggle_drawer',{button_clicked:fa,section:y[ga]});},refreshState:function(fa,ga){ea.inform(fa,{obj:y[ga],oldState:fa});},linkContent:function(fa,ga,ha){var ia=y[fa].buttons[h.showApps].show_button;k.show(p.byClass(ia,'hidden_elem'));new o(ia,function(){if(Math.floor(Math.random()*100)===0)da(fa,'add_apps_imp');},true,x);ea.register(fa,function(ja,ka,la,ma){if(ja==h.showItems){if(ma==h.showApps)q.set(y[fa].content.parentNode,'overflow','hidden');k.show(ga);k.hide(ha);}else if(ja==h.showApps){k.hide(ga);k.show(ha);}});},register:function(fa,ga){var ha=ea.subscribe([h.hide,h.showItems,h.showApps],function(ia,ja){if(ja.obj.id===fa)ga(ia,ja.obj,ha,ja.oldState);});},getSectionState:function(fa){if(y[fa])return y[fa].state;}},r);e.exports=ea;},null);
__d("TimelineDynamicSection",["DOM","TimelineDynamicSectionMarkup","TimelineSection","cx","ge"],function(a,b,c,d,e,f,g,h,i,j,k){for(var l in i)if(i.hasOwnProperty(l))n[l]=i[l];var m=i===null?null:i.prototype;n.prototype=Object.create(m);n.prototype.constructor=n;n.__superConstructor__=i;function n(o,p,q){"use strict";this._controller=p;this._data=null;this._node=null;this._triggerLoader=null;i.call(this,o,o,q);}n.prototype._createNode=function(){"use strict";var o=["_30f"];this._wrapperClass&&o.push(this._wrapperClass);return g.create('div',{className:o.join(' '),id:this.nodeID},[h.throbber.cloneNode(true)]);};n.prototype.getNode=function(){"use strict";if(!this._node)this._node=k(this.nodeID)||this._createNode();return this._node;};e.exports=n;},null);
__d("TimelineAppCollection",["Arbiter","CSS","DOM","DOMQuery","Event","MedleyPageletRequestData","NumberFormatConfig","PageTransitions","Parent","ProfileOverviewDOMID","TidyArbiter","TidyArbiterMixin","TimelineAppSectionCuration","TimelineDynamicSection","TimelineDynamicSectionMarkup","TimelineSection","TriggerablePageletLoader","classWithMixins","copyProperties","csx","cx","ads-lib-formatters","ge","mixin"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,aa,ba,ca,da){var ea=500,fa=8;function ga(na){var oa=ca(ma.getIDByToken(na));if(!oa)return;return i.scry(oa,"._620")[0];}function ha(na,oa){oa&&!oa.isDefaultRequested()&&oa.prevent();var pa=na._parentSection,qa=pa._parentSection;v.setActiveSectionID(pa.id);pa.setActiveCollection(na);if(pa.isActiveAppSection()){if(!h.hasClass(qa.getNode(),"_c4f")){h.addClass(qa.getNode(),"_c4f");qa.freezeChildren();}na._isFullyLoaded&&qa.addSectionTeasers();}if(!qa.isOverviewProfileTab()&&pa.isActiveAppSection()){g.inform("save_facebar_query",true);var ra=na.href;n.rewriteCurrentURI(n.getCurrentURI().getUnqualifiedURI(),ra);}g.inform('Medley/tab-change',{section:na,appSection:pa,appMedley:qa});}function ia(na,oa){var pa=na._parentSection;oa.data.overview=!pa.isActiveAppSection();oa.data.cursor=null;ha(na);}var ja=x(t,da(r));for(var ka in ja)if(ja.hasOwnProperty(ka))ma[ka]=ja[ka];var la=ja===null?null:ja.prototype;ma.prototype=Object.create(la);ma.prototype.constructor=ma;ma.__superConstructor__=ja;function ma(na){"use strict";this._contentLoader=null;this._isFrozen=false;this._isFullyLoaded=false;this._cursor=0;this._tabNode=na.tab_node;this._tabCount=na.tab_count>0?na.tab_count:0;this._token=na.token;this._ftid=null;this.auxContent=null;this.curationContent=null;this._itemPlaceholderMarkup=null;this._order=na.order;this.href=na.href;this._sortContent=null;this._rootClass=na.root_class;this._wrapperClass=na.wrapper_class;this._importerState=na.importer_state;this.refreshCount();ja.call(this,ma.getIDByToken(this._token),na.controller);if(!this._tabNode)return;if(ca(this.nodeID)){k.listen(this._tabNode,'click',ha.bind(null,this));}else setTimeout(this.createTriggerLoader.bind(this),0);}ma.prototype.addContentLoader=function(na,oa,pa){"use strict";this._cursor=oa;q.subscribe('Medley/requestDataSet',function(){var qa={node:na};if(h.hasClass(na,"_3t3")&&!pa){qa.type=w.TRIGGER_CLICK;}else if(this._isFrozen&&!pa){i.remove(na);qa.node=u.pager.cloneNode(true);i.appendContent(this.getNode(),qa.node);qa.type=w.TRIGGER_CLICK;}else{qa.onVisibleBuffer=ea;qa.onVisibleStrict=true;qa.type=w.TRIGGER_ONVISIBLE;}if(qa.type===w.TRIGGER_CLICK)qa.callback=v.setActiveSectionID.bind(null,this.id);var ra=y({displayCallback:function(ta){i.remove(qa.node);ta();},options:{append:true}},this.getDefaultPageletConfig()),sa=this._parentSection;ra.data.overview=!sa.isActiveAppSection();this._triggerLoader=null;this._contentLoader=new w(ra,[qa]);}.bind(this));};ma.prototype._createNode=function(){"use strict";var na=la._createNode.call(this);na.setAttribute('aria-role','tabpanel');return na;};ma.prototype.createTriggerLoader=function(){"use strict";if(!this._pageletConfig)this._pageletConfig=this.getDefaultPageletConfig();q.subscribe('Medley/requestDataSet',function(){var na={callback:ia.bind(null,this,this._pageletConfig),node:this._tabNode,type:w.TRIGGER_CLICK};this._triggerLoader=new w(this._pageletConfig,[na]);}.bind(this));};ma.prototype.disableContentLoader=function(){"use strict";this._contentLoader&&this._contentLoader.disableTriggers();};ma.prototype.enableContentLoader=function(){"use strict";var na=this._triggerLoader||this._contentLoader;na&&na.enableTriggers();};ma.prototype.freeze=function(){"use strict";this._isFrozen=true;if(!this._contentLoader||this._contentLoader._loading)return;this._contentLoader.removeTriggers(w.TRIGGER_ONVISIBLE);var na=j.scry(this.getNode(),"._3t3");if(!na.length){var oa=j.scry(this.getNode(),"._359")[0];oa.length&&this.addContentLoader(oa,this._cursor);}};ma.prototype.getCount=function(){"use strict";return this._tabCount;};ma.prototype.getDefaultPageletConfig=function(){"use strict";return {controller:this._controller,data:y({collection_token:this._token,cursor:this._cursor},l.get(),{ftid:this._ftid,order:this._order},{sk:this._parentSection._sk,importer_state:this._importerState}),node:this.getNode()};};ma.prototype.getMedleySiteKey=function(){"use strict";return this._parentSection._parentSection._sk;};ma.prototype.getRootClass=function(){"use strict";return this._rootClass;};ma.prototype.flashCountIf=function(){"use strict";if(!this.isActiveCollection()&&this._tabNode){h.addClass(this._tabNode,"_4-k9");setTimeout(h.removeClass.bind(null,this._tabNode,"_4-k9"),800);}};ma.prototype.isActiveCollection=function(){"use strict";return this._parentSection.getActiveCollection()===this;};ma.prototype.registerAuxContent=function(na){"use strict";if(na.nodeType==11)na=i.create('span',null,na);this._resetAuxContent();this.auxContent=na;this._parentSection.addAuxContent(this.auxContent);h.conditionShow(this.auxContent,this.isActiveCollection());};ma.prototype.registerAddCurationContent=function(na,oa,pa,qa,ra){"use strict";if(this.curationContent)return;this.curationContent=(na.nodeType==11)?i.create('span',null,na):na;if(!this.isActiveCollection())return;this.curationContentState=oa;this._itemPlaceholderMarkup=ra;this._parentSection.addCurationContent(this.curationContent,this,pa);if(qa)s.subscribe('toggle_drawer',function(event,sa){if(sa.button_clicked==='show'){this.curationContentState='show_items';}else this.curationContentState='hide';}.bind(this));};ma.prototype.makeActive=function(na){"use strict";if(na){this._parentSection.resetMinHeight();this._resetAuxContent();this._resetContent();}ha(this);};ma.prototype.nullStateCurationContent=function(){"use strict";this._parentSection.nullStateCurationContent();};ma.prototype.registerSortContent=function(na,oa){"use strict";this._sortContent&&i.remove(this._sortContent);this._sortContent=na;oa.subscribeOnce('change',function(pa,qa){i.setContent(i.find(na,"._57oy"),qa.label);this._sort(qa.value);}.bind(this));};ma.prototype.refreshCount=function(){"use strict";if(!this._tabNode)return;var na=j.find(this._tabNode,"._3d0");if(this._tabCount>0){i.setContent(na,ba.formatNumber(this._tabCount,0,m.numberDelimiter,''));}else i.setContent(na,'');};ma.prototype._resetAuxContent=function(){"use strict";if(this.auxContent){i.remove(this.auxContent);this.auxContent=null;}};ma.prototype._resetContent=function(){"use strict";this._contentLoader&&this._contentLoader.destroy();i.remove(this.getNode());this._node=null;i.appendContent(j.find(this._parentSection.getNode(),"div._3i9"),this.getNode());this.addContentLoader(j.find(this.getNode(),"._359"),0);};ma.prototype.setFTID=function(na){"use strict";this._ftid=na;};ma.prototype._sort=function(na){"use strict";this._order=na;this._resetContent();var oa=this._parentSection,pa=oa._parentSection;if(!pa.isOverviewProfileTab()&&oa.isActiveAppSection()){var qa=n.getCurrentURI();qa.addQueryData({order:this._order});n.rewriteCurrentURI(n.getCurrentURI().getUnqualifiedURI(),qa);}};ma.prototype.thaw=function(){"use strict";this._isFrozen=false;};ma.prototype.getToken=function(){"use strict";return this._token;};ma.prototype.getParentSection=function(){"use strict";return this._parentSection;};ma.addPlaceholderToCollection=function(na,oa,pa){"use strict";pa=typeof pa!=='undefined'?pa:{};var qa=i.scry(oa,"._gx7")[0],ra='',sa='';if(qa){ra=qa.text;sa=qa.href;}var ta=i.scry(oa,"._gx8 .img")[0],ua=ta&&ta.src,va=i.scry(oa,"._3owb")[0],wa=va&&va.getAttribute('data-obj');ma.addGenericPlaceholderToCollection(na,y(pa,{entityID:wa,imageSrc:ua,link:sa,title:ra}));};ma.addGenericPlaceholderToCollection=function(na,oa){"use strict";if(!oa.suppressCount)this.incrementCount(ma.getIDByToken(na));if(!oa.title||!oa.link||!oa.entityID)return;v.callWithSection(ma.getIDByToken(na),function(pa){pa.inform(ma.ADDING_PLACEHOLDER);var qa=pa._parentSection,ra=ga(na);if(!ra)return;var sa=i.scry(ra,'[data-obj="'+oa.entityID+'"]')[0],ta=pa._itemPlaceholderMarkup.cloneNode(true);if(!pa._itemPlaceholderMarkup)return;ta.setAttribute('data-item',oa.entityID);if(sa&&oa.replaceExistingElement){i.replace(sa.parentNode,ta);}else{if(sa){i.remove(sa.parentNode);}else if(!qa.isActiveAppSection()&&ra.children.length>=fa)h.addClass(ra.children[fa-1],"_51k9");i.prependContent(ra,ta);}});};ma.replaceItem=function(na,oa,pa){"use strict";var qa=o.byClass(na,"_620"),ra=i.scry(qa,'div[data-obj="'+oa+'"]')[0];if(ra){ma.inform(ma.NEW_ITEM,{grid:qa,newItem:pa});i.replace(ra.parentNode,pa);}};ma.addItemToCollectionAndIncrementCount=function(na,oa,pa){"use strict";this.incrementCount(pa);this.addItemToCollection(na,oa,pa);};ma.addItemToCollection=function(na,oa,pa){"use strict";var qa=ca(pa);if(!qa)return;var ra=i.scry(qa,"._620")[0],sa=ra.parentNode.nextSibling;if(sa&&h.hasClass(sa,"_3t3"))i.remove(ra.lastChild);this.inform(ma.NEW_ITEM,{grid:ra,newItem:na});var ta=i.find(ra,'[data-item="'+oa+'"]'+"._2804");if(ta){i.replace(ta,na);return;}i.prependContent(ra,na);};ma.addMultipleToCollection=function(na,oa){"use strict";for(var pa in na)this.addItemToCollection(na[pa],pa,oa);};ma.createFromArray=function(na){"use strict";return na.map(function(oa){return new ma(oa);});};ma.decrementCount=function(na){"use strict";v.callWithSection(na,function(oa){if(oa._tabCount>0){oa._tabCount--;oa.refreshCount();oa.flashCountIf();}});};ma.enableContentLoader=function(na,oa,pa){"use strict";v.callWithSection(na,function(qa){qa.addContentLoader(oa,pa);});};ma.getIDByToken=function(na){"use strict";return p.PREFIX_APP_COLLECTION+na;};ma.incrementCount=function(na){"use strict";v.callWithSection(na,function(oa){oa._tabCount++;oa.refreshCount();oa.flashCountIf();});};ma.registerAuxContent=function(na,oa){"use strict";v.callWithSection(na,function(pa){pa.registerAuxContent(oa);});};ma.registerAddCurationContent=function(na,oa,pa,qa,ra,sa){"use strict";v.callWithSection(na,function(ta){ta.registerAddCurationContent(oa,pa,qa,ra,sa);});};ma.registerSortContent=function(na,oa,pa){"use strict";v.callWithSection(na,function(qa){qa.registerSortContent(oa,pa);});};ma.clickTabNode=function(na,oa){"use strict";v.callWithSection(ma.getIDByToken(na),function(pa){if(pa._triggerLoader)pa._triggerLoader.addTrigger({callback:ia.bind(null,pa,pa._pageletConfig),node:pa._tabNode,type:w.TRIGGER_NOW});ha(pa);});};ma.setLoaded=function(na){"use strict";v.callWithSection(na,function(oa){oa.setIsLoaded(true);oa._parentSection.inform('loaded',oa);oa._parentSection.unsetMinHeight();});};ma.setFullyLoaded=function(na){"use strict";v.callWithSection(na,function(oa){oa._isFullyLoaded=true;var pa=oa._parentSection;if(pa.isActiveAppSection())pa._parentSection.addSectionTeasers();});};ma.setFTID=function(na,oa){"use strict";v.callWithSection(na,function(pa){pa.setFTID(oa);});};ma.switchToNullStateCurationContent=function(na){"use strict";v.callWithSection(ma.getIDByToken(na),function(oa){oa.nullStateCurationContent();});};y(ma,r,{NEW_ITEM:'TimelineAppCollection/newItem',ADDING_PLACEHOLDER:'TimelineAppCollection/addingPlaceholder'});e.exports=ma;},null);