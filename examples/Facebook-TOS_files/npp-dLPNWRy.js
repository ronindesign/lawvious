/*!CK:1170132393!*//*1418014122,*/

if (self.CavalryLogger) { CavalryLogger.start_js(["tBKJ1"]); }

__d("XAYMTPanelSaveSettingsControllerURIBuilder",["XControllerURIBuilder"],function(a,b,c,d,e,f){e.exports=b("XControllerURIBuilder").create("\/ads\/growth\/aymt\/homepage_panel\/save_settings\/",{time_range:{type:"Enum"},ad_account_id:{type:"Int"},promoted_object:{type:"Int"},collapsed:{type:"Int"},dismiss_nux:{type:"Bool"},flash_insights_dismiss_nux:{type:"Bool"},refresh_panel:{type:"Bool"}});},null);
__d("AdvertiserHomePagelet",["AsyncRequest","DOM","URI","XAYMTPanelSaveSettingsControllerURIBuilder","$"],function(a,b,c,d,e,f,g,h,i,j,k){var l={init:function(m,n){var o=new j().setBool('refresh_panel',true).getURI();o.addQueryData(i.getRequestURI().getQueryData());new g().setURI(o).setStatusElement(n).setErrorHandler(function(p){h.setContent(k('pagelet_advertiser_panel'),'');}).send();}};e.exports=l;},null);
__d("Collection",[],function(a,b,c,d,e,f){function g(h,i){if(!h.__collection__){var j=new Function();for(var k in h.prototype)j.prototype[k]=g._call.bind(null,k);h.__collection__=j;}var l=new h.__collection__();l._elements=i;return l;}g._call=function(h){var i=Array.prototype.slice.call(arguments,1);this._elements.forEach(function(j){j[h].apply(j,i);});return this;};e.exports=g;},null);
__d("Drag",["Event","Arbiter","DOM","Style","Vector"],function(a,b,c,d,e,f,g,h,i,j,k){var l={};l.currentDraggable=null;l.grab=function(m){if(l.currentDraggable)l._onmouseup();m.lastDragOver=null;l.attachDragEvents();l.currentDraggable=m;};l.attachDragEvents=function(){document.onselectstart=function(){document.onselectstart=null;return false;};if(l.dragEventsAttached)return;l.dragEventsAttached=true;h.subscribe('scroller/scroll',l._onmousemove);g.listen(document,{mousemove:l._onmousemove,mouseup:l._onmouseup});};l.droppables={};l.addDroppable=function(m,n){(l.droppables[m]=l.droppables[m]||[]).push(n);};l.removeDroppable=function(m,n){l.droppables[m]=l.droppables[m].filter(function(o){return o!=n;});};l.getOffsetParent=function(m){if(i.isNodeOfType(m,['body','html']))return document.body;while((m=m.parentNode)&&m!==document.body)if(j.get(m,'position')!=='static')return m;return document.body;};l._onmousemove=function(event,m){if(!l.currentDraggable)return;var n=m||k.getEventPosition(event),o=l.currentDraggable,p=l.droppables[o.namespace];if(o.namespace&&o.active&&p){var q={};p.forEach(function(w){q[w.zIndex]=w.zIndex;});var r=[];for(var s in q)r.push(q[s]);r.sort();var t=o.lastDragOver,u=null;for(var v=r.length-1;v>=0;v--)if(t&&t.dom!=null&&t.zIndex==r[v]&&t.isDraggedOver(n)){u=t;break;}else for(s=0;s<p.length;s++){if(r[v]!=p[s].zIndex)continue;if(t!=p[s]&&o.dom!=p[s].dom&&p[s].isDraggedOver(n)){u=p[s];v=-1;break;}}if(u&&u!=t){u.ondragover(o);l.currentDraggable.adjustCursorPosition();}if(u)u.ondragmove(o,n.sub(k.getElementPosition(u.dom)));o.lastDragOver=u;}l.currentDraggable._onmousemove(n);};l._onmouseup=function(m){document.onselectstart=null;if(l.currentDraggable){l.currentDraggable._ondrop();l.currentDraggable=null;}};e.exports=l;},null);
__d("Draggable",["Event","Arbiter","Collection","DOM","Drag","Rect","Style","Vector","emptyFunction"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o){function p(r){"use strict";this.canvas=r;this.scrollZone=50;this.velocity=100;this.coefficient=1;}p.prototype.activate=function(){"use strict";this.activate=o;this.event=g.listen(document,'mousemove',this._onmousemove.bind(this));this.interval=setInterval(this._intervalHandler.bind(this),50);this.cursor=null;};p.prototype.deactivate=function(){"use strict";delete this.activate;this.event&&this.event.remove();this.event=null;clearInterval(this.interval);};p.prototype._onmousemove=function(event){"use strict";this.cursor=n.getEventPosition(event);};p.prototype._intervalHandler=function(){"use strict";if(!this.cursor)return;var r=this.canvas==document.body?l.getViewportBounds():new l(this.canvas),s=new l(this.cursor.y-r.t,r.r-this.cursor.x,r.b-this.cursor.y,this.cursor.x-r.l),t=new n(0,0);if(s.t<s.b&&s.t<this.scrollZone){t.y=-this.scrollZone+s.t;}else if(s.b<this.scrollZone)t.y=this.scrollZone-s.b;t.y=this._doMath(t.y);if(s.l<s.r&&s.l<this.scrollZone){t.x=-this.scrollZone+s.l;}else if(s.r<this.scrollZone)t.x=this.scrollZone-s.r;t.x=this._doMath(t.x);if(t.x||t.y){t.scrollElementBy(this.canvas);if(document.body==this.canvas){var u=n.getScrollPosition();t.scrollElementBy(this.canvas);var v=n.getScrollPosition();this.cursor=this.cursor.add(v.sub(u));}else t.scrollElementBy(this.canvas);h.inform('scroller/scroll',this.cursor);}};p.prototype._doMath=function(r){"use strict";r=(r>=0?Math.min(r,this.scrollZone):Math.max(r,-this.scrollZone));return Math.floor(Math.pow(r/this.scrollZone*this.velocity,this.coefficient));};p.findScrollParent=function(r){"use strict";var s;r=r.parentNode;while(r){if(r.scrollHeight!=r.offsetTop){s=m.get(r,'overflowY');if(s=='scroll'||s=='auto')return r;}r=r.parentNode;}return document.body;};function q(r){"use strict";if(!r)throw new Error('Element should be a DOM node');if(!(this instanceof q)){if(r instanceof Array){var s=[];r.forEach(function(t){s.push(new q(t));});return new i(q,s);}else return new q(r);}else{this.data={};this.handles=[];this.dom=r;this.boundingBox=null;this.useScroller=true;this.grabPctX=this.grabPctY=0;this._shouldKillEvents=true;this.addHandle(this.dom);}}q.prototype.destroy=function(){"use strict";this.handles.forEach(function(r){this.removeHandle(r.obj);}.bind(this));this.data=this.dom=null;};q.prototype.adjustCursorPosition=function(){"use strict";var r=n.getElementDimensions(this.dom);this.cursorPositionVector=new n(parseInt(this.grabPctX*r.x,10),parseInt(this.grabPctY*r.y,10));};q.prototype._onclick=function(event){"use strict";if(!this._shouldKillEvents)return true;if(this.active)return g.kill(event);};q.prototype._ongrab=function(r){"use strict";this.ongrab();if(this.useScroller){if(!this.scroller)this.scroller=new p(p.findScrollParent(this.dom));this.scroller.activate();}if(this.active){if(!this.oldPosition)this.oldPosition=this.dom.style.position;var s=k.getOffsetParent(this.dom);if(s!==document.body)r=r.sub(n.getElementPosition(s));this.dom.style.position=this.absolute?'absolute':'relative';r.sub(this.cursorPositionVector).setElementPosition(this.dom);}};q.prototype._onmousedown=function(event){"use strict";if(!((event.which&&event.which===1)||(event.button&&event.button===1)))return;var r=event.getTarget();if(j.isNodeOfType(r,['input','select','textarea','object','embed']))return true;var s=n.getEventPosition(event),t=n.getElementDimensions(this.dom);this.draggableInitialVector=n.getElementPosition(this.dom);this.cursorPositionVector=s.sub(this.draggableInitialVector);this.grabPctX=t.x===0?0:this.cursorPositionVector.x/t.x;this.grabPctY=t.y===0?0:this.cursorPositionVector.y/t.y;k.grab(this,event);if(this.gutter){this.cursorInitialVector=s;}else{this._setActive(true);this._ongrab(s);}if(!this._shouldKillEvents)return true;return g.kill(event);};q.prototype._onmousemove=function(r){"use strict";if(!this.active)if(r.distanceTo(this.cursorInitialVector)>=this.gutter){this._setActive(true);this._ongrab(r);}if(this.active){var s=r.sub(this.cursorPositionVector),t;if(this.boundingBox){var u=l.newFromVectors(s,n.getElementDimensions(this.dom));u=u.boundWithin(this.boundingBox);s=u.getPositionVector();if(this.boundingBox.w()===0){t=new n(this.draggableInitialVector.x,s.y,'document');}else if(this.boundingBox.h()===0){t=new n(s.x,this.draggableInitialVector.y,'document');}else t=s;}else t=s;var v=k.getOffsetParent(this.dom);if(v!==document.body)t=t.sub(n.getElementPosition(v));t.setElementPosition(this.dom);this.ondrag(r);}};q.prototype._ondrop=function(){"use strict";this.scroller&&this.scroller.deactivate();if(this.active){setTimeout((function(){this._setActive(false);}).bind(this),0);this.ondrop(this.scroller&&this.scroller.cursor);if(this.lastDragOver)this.lastDragOver.ondrop(this);}};q.prototype.killDrag=function(){"use strict";this._setActive(false);k._onmouseup();};q.prototype.forceDrop=function(){"use strict";k._onmouseup();};q.prototype.setBoundingBox=function(r){"use strict";this.boundingBox=r;return this;};q.prototype.resetPosition=function(){"use strict";this.dom.style.position=this.oldPosition;this.oldPosition=null;this.dom.style.left='';this.dom.style.top='';return this;};q.prototype.setUseAbsolute=function(r){"use strict";this.absolute=r;return this;};q.prototype.setDragHandler=function(r){"use strict";this.ondrag=r;return this;};q.prototype.setGrabHandler=function(r){"use strict";this.ongrab=r;return this;};q.prototype.setDropHandler=function(r){"use strict";this.ondrop=r;return this;};q.prototype.setGutter=function(r){"use strict";this.gutter=r;return this;};q.prototype.setNamespace=function(r){"use strict";this.namespace=r;return this;};q.prototype.setUseScroller=function(r){"use strict";this.useScroller=r;return this;};q.prototype.setAvoidKillingEvents=function(r){"use strict";this._shouldKillEvents=!r;return this;};q.prototype.addHandle=function(r){"use strict";if(this.handles.length==1&&this.handles[0].obj==this.dom)this.removeHandle(this.dom);this.handles.push({obj:r,evt:[g.listen(r,'mousedown',this._onmousedown.bind(this)),g.listen(r,'click',this._onclick.bind(this)),g.listen(r,'drag',this._killUnlessActive.bind(this)),g.listen(r,'selectstart',this._killUnlessActive.bind(this))]});return this;};q.prototype.removeHandle=function(r){"use strict";this.handles=this.handles.filter(function(s){if(s.obj!=r){return true;}else{s.evt.forEach(function(t){t.remove();});return false;}});};q.prototype.getDOM=function(){"use strict";return this.dom;};q.prototype.setKey=function(r,s){"use strict";this.data[r]=s;return this;};q.prototype.getKey=function(r){"use strict";return this.data[r];};q.prototype._setActive=function(r){"use strict";if(!this.dom)return;this.dom.activeDrag=this.active=r;for(var s=0;s<this.handles.length;s++)this.handles[s].obj.activeDrag=r;};q.prototype._killUnlessActive=function(r){"use strict";if(!this._shouldKillEvents)return;if(r.getTarget()!==document.activeElement)return r.kill();};q.prototype.ondrag=o;q.prototype.ongrab=o;q.prototype.ondrop=o;q.prototype.gutter=0;q.prototype.handles=null;e.exports=q;},null);
__d("Droppable",["Collection","Drag","Draggable","Vector","emptyFunction"],function(a,b,c,d,e,f,g,h,i,j,k){function l(m){"use strict";if(!m)throw new Error('Element should be a DOM node');if(!(this instanceof l)){if(m instanceof Array){var n=[];m.forEach(function(o){n.push(new l(o));});return new g(l,n);}else return new l(m);}else{this.data={};this.dom=m;this.namespace=null;}}l.prototype.destroy=function(){"use strict";if(this.namespace)h.removeDroppable(this.namespace,this);this.data=this.dom=null;};l.prototype.setNamespace=function(m){"use strict";if(this.namespace)h.removeDroppable(this.namespace,this);this.namespace=m;h.addDroppable(m,this);return this;};l.prototype.setZIndex=function(m){"use strict";this.zIndex=m;return this;};l.prototype.hasPointMovedHorizontally=function(m){"use strict";var n=j.getElementPosition(this.dom);return n.x<=m.x&&this.dom.offsetWidth+n.x>m.x;};l.prototype.hasPointMovedVertically=function(m){"use strict";var n=j.getElementPosition(this.dom);return n.y<=m.y&&this.dom.offsetHeight+n.y>m.y;};l.prototype.hasPointMovedInside=function(m){"use strict";return this.hasPointMovedHorizontally(m)&&this.hasPointMovedVertically(m);};l.prototype.setDragOverHandler=function(m){"use strict";this.ondragover=m;return this;};l.prototype.setDragOverVectically=function(){"use strict";this.isDraggedOver=l.prototype.hasPointMovedVertically;return this;};l.prototype.setDragOverHorizontally=function(){"use strict";this.isDraggedOver=l.prototype.hasPointMovedHorizontally;return this;};l.prototype.setDragMoveHandler=function(m){"use strict";this.ondragmove=m;return this;};l.prototype.setDropHandler=function(m){"use strict";this.ondrop=m;return this;};l.prototype.zIndex=0;l.prototype.isDraggedOver=l.prototype.hasPointMovedInside;l.prototype.ondragover=k;l.prototype.ondragmove=k;l.prototype.ondrop=k;l.prototype.getDOM=i.prototype.getDOM;l.prototype.setKey=i.prototype.setKey;l.prototype.getKey=i.prototype.getKey;e.exports=l;},null);
__d("LeftNavItemClassicDraggableContainer.react",["React","DOMDimensions","Style","Draggable","Droppable","Arbiter"],function(a,b,c,d,e,f,g,h,i,j,k,l){"use strict";var m=g.createClass({displayName:"LeftNavItemClassicDraggableContainer",propTypes:{itemID:g.PropTypes.oneOfType([g.PropTypes.string,g.PropTypes.number]).isRequired,section:g.PropTypes.object.isRequired,sortable:g.PropTypes.bool.isRequired},render:function(){return (g.createElement("div",{"data-itemid":this.props.itemID},this.props.children));},componentWillReceiveProps:function(n){if(!this.props.sortable&&n.sortable)this._mountDraggable(n.draggableBound);if(this.props.sortable&&!n.sortable)this._unmountDraggable();},_mountDraggable:function(n){var o='bookmarkItem',p=this.props.section,q=this.props.itemID,r=this.getDOMNode();this._draggable=(new j(r)).setNamespace(o).setUseAbsolute(true).setGutter(15).setBoundingBox(n).setGrabHandler(function(){var s=h.getElementDimensions(this.dom);i.set(this.dom,'width',s.width+'px');l.inform('LeftNavDragController/onItemEditDraggableGrab',{section:p,draggable:this});}).setDropHandler(function(){i.set(this.dom,'width','');this.resetPosition();l.inform('LeftNavDragController/onItemEditDraggableDrop',{section:p,draggable:this});});this._droppable=(new k(r)).setNamespace(o).setDragOverHandler(function(s){l.inform('LeftNavDragController/onItemEditDroppableDragOver',{section:p,draggable:s,targetItemID:q});});},_unmountDraggable:function(){if(this._draggable)this._draggable.destroy();if(this._droppable)this._droppable.destroy();}});e.exports=m;},null);
__d("LeftNavItem.react",["Arbiter","Bootloader","DOMContainer.react","Image.react","LeftNavItemClassicDraggableContainer.react","React","Run","XUISpinner.react","cx","joinClasses"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){"use strict";var q='\u00A0',r='\u00B7',s=l.createClass({displayName:"LeftNavItem",render:function(){var t=this.props,u=t.model,v=t.section,w=u.keys.some(function(aa){return aa===t.selectedKey;}),x=u.keys.some(function(aa){return aa===t.loadingKey;}),y=v.props.id==='pinnedNav',z=(("sideNavItem")+(' '+"stat_elem")+(w?' '+"selectedItem":'')+(x?' '+"_5afd":''));return (l.createElement("li",{key:u.id,className:z,"data-sortable":u.sortable,id:"navItem_"+u.id},l.createElement(k,{itemID:u.id,section:v,sortable:y&&t.inEditMode&&u.sortable,draggableBound:this.props.draggableBound},this._renderBookmarkContent())));},_renderBookmarkContent:function(){var t=this.props.model,u=this.props.section,v=u.props.id==='pinnedNav',w=u.props.id==='bookmarksSeeAllEntSection',x=t.count>0,y=t.auxcontent?l.createElement(i,{key:"auxpopover"},t.auxcontent):null,z=this._renderCounter(t.count,w),aa=p('linkWrap',x?'hasCount':'noCount'),ba=(("_5afe")+(v&&t.sortable?' '+"sortableItem":''));if(!this.BookmarkPopoverMenu)m.onLoad(function(){h.loadModules(["BookmarkPopoverMenu.react"],function(ga){this.BookmarkPopoverMenu=ga;setTimeout(this.forceUpdate.bind(this),0);}.bind(this));}.bind(this));var ca=null,da=this.BookmarkPopoverMenu;if(da)ca=l.createElement(da,{key:"popover",navSection:this.props.section,navItem:this,editmenu:t.editmenu});var ea=null;if(w&&t.subtitle)ea=l.createElement("div",{className:"_1xmt"},q+q+r+q+q,l.createElement(i,null,t.subtitle));var fa=[y,ca,l.createElement("div",{className:"clearfix"},l.createElement("a",{key:"link","data-testid":'left_nav_item_'+t.link.title,className:ba,"data-gt":t.datagt,title:t.link.title,rel:t.link.rel,href:t.link.href,ajaxify:t.link.ajaxify,draggable:"false",onClick:function(){return g.inform('LeftNavController/setItemCount',{item:t,count:0});}},l.createElement("div",{className:"rfloat"},l.createElement(n,{className:"uiSideNavSpinner",showOnAsync:true}),w?null:z,v&&t.sortable?l.createElement("span",{className:"_upa"}):null),l.createElement("span",{className:"imgWrap"},l.createElement(j,{src:t.image,height:"16",width:"16",draggable:"false",alt:""})),l.createElement("div",{className:aa},t.name,w?z:null)),ea)];return fa;},_renderCounter:function(t,u){var v=t>0,w=(("count")+(' '+"_5aff")+(!v?' '+"hidden_elem":'')+(u?' '+"mlm":''));return (l.createElement("span",{className:w},l.createElement("span",{className:"countValue fss"},t<=20?t:'20+')));}});e.exports=s;},null);
__d("LeftNavItemPlaceholder.react",["React","cx"],function(a,b,c,d,e,f,g,h){"use strict";var i=g.createClass({displayName:"LeftNavItemPlaceholder",render:function(){return (g.createElement("li",{className:"sideNavItem stat_elem"},g.createElement("a",{className:"_5afe clearfix sortableItem"})));}});e.exports=i;},null);
__d("LeftNavSection.react",["Arbiter","Bootloader","React","Link.react","LeftRight.react","InlineBlock.react","LeftNavItem.react","LeftNavItemPlaceholder.react","ReactLayeredComponentMixin","cx","fbt","Run"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r){"use strict";var s=null,t=i.createClass({displayName:"LeftNavSection",mixins:[o],getInitialState:function(){return {dragged:false,inEditMode:false,glowingType:null,draggableBound:null,placeholderIdx:-1};},renderLayers:function(){var u=this.props.id==='bookmarksSeeAllEntSection';if(u)return {dragNUX:null};if(!s)r.onLoad(function(){h.loadModules(["LeftNavDragNUX.react"],function(x){if(!s)s=x;setTimeout(this.forceUpdate.bind(this),0);}.bind(this));}.bind(this));var v=this.state.glowingType,w=null;if(v==='add'||v==='sort')if(s)w=i.createElement(s,{contextRef:"sectionBody",nuxType:v,position:"above",alignment:"center"});return {dragNUX:w};},render:function(){var u=this,v=this.props.model,w=v.items,x=this.props.selectedKey,y=this.props.loadingKey,z=this.state.inEditMode,aa=this.state.draggableBound;if(w.length===0)return null;var ba=1,ca=w.map(function(ia){return (i.createElement(m,{key:ia.id,model:ia,section:u,selectedKey:x,loadingKey:y,inEditMode:z,draggableBound:aa,rank:ba++}));});if(this.state.placeholderIdx>=0)ca.splice(this.state.placeholderIdx,0,i.createElement(n,{key:"itemplaceholder",ref:"placeholder"}));var da=this.state.glowingType,ea=(("homeSideNav")+(da==='add'?' '+"_1492":'')+(da==='sort'?' '+"_1493":'')+(da==='remove'?' '+"_1494":'')),fa=(("_bui")+(this._isPinnedSection()?' '+"droppableNav":'')+(!this._isPinnedSection()?' '+"nonDroppableNav":'')+(' '+"_3-8w")+(!z?' '+"_3-96":'')),ga=this._isPinnedSection()?i.createElement("div",{className:"_3hge stat_elem"},i.createElement(j,{className:"navEditDone",onClick:function(){g.inform('LeftNavDragController/toggleEditMode',{section:u});}},i.createElement("span",{className:"_3hgf"},"Done"))):null,ha={nav_items_count:w.length.toString(),nav_section:this.props.id.toString(),bm_sec:this.props.id.toString()};return (i.createElement("div",{id:this.props.id,className:ea,"data-ft":v.dataft,ref:"sectionBody"},this._renderHeader(),i.createElement("ul",{className:fa,"data-gt":JSON.stringify(ha),"data-ft":v.dataft},ca),ga));},_renderHeader:function(){var u=this.props.model,v;if(u.title){var w=u.seeallhref?i.createElement(j,{href:u.seeallhref},i.createElement(k,null,i.createElement("span",{className:"sectionDragHandle"},u.title),u.remainingcount&&!this.state.dragged?i.createElement(l,{className:"_3-91"},i.createElement("div",{className:"_1cwg _5ol3"},u.seealltext)):null)):i.createElement("span",{className:"sectionDragHandle"},u.title);v=i.createElement("h4",{className:"navHeader"},w);}else v=null;return v;},componentDidUpdate:function(){this._updatePinnedSectionBound();},_updatePinnedSectionBound:function(){if(this._isPinnedSection())g.inform('LeftNavDragController/updatePinnedSectionBound');},_isPinnedSection:function(){return this.props.id==='pinnedNav';}});e.exports=t;},null);
__d("LeftNavSectionPlaceholder.react",["React","cx"],function(a,b,c,d,e,f,g,h){"use strict";var i=g.createClass({displayName:"LeftNavSectionPlaceholder",render:function(){var j={height:this.props.height+'px',width:this.props.width+'px'};return (g.createElement("div",{className:"homeSideNav",style:j},g.createElement("ul",{className:"_bui"})));}});e.exports=i;},null);
__d("LeftNavContainer.react",["invariant","LeftNavSection.react","LeftNavSectionPlaceholder.react","React"],function(a,b,c,d,e,f,g,h,i,j){"use strict";var k=j.createClass({displayName:"LeftNavContainer",getInitialState:function(){return {placeholderIdx:-1,placeholderWidth:0,placeholderHeight:0};},render:function(){var l=this.props.model,m=j.createElement(h,{selectedKey:l.selectedKey,loadingKey:l.loadingKey,model:l.pinnedSection,key:"pinnedNav",id:"pinnedNav",ref:"pinnedNav"}),n=l.sections,o=n.map(function(p){return j.createElement(h,{selectedKey:l.selectedKey,loadingKey:l.loadingKey,model:p,key:p.id,id:p.id});});if(this.state.placeholderIdx>-1)o.splice(this.state.placeholderIdx,0,j.createElement(i,{key:"placeholder",width:this.state.placeholderWidth,height:this.state.placeholderHeight}));return (j.createElement("div",null,m,o));},getPinnedSection:function(){var l=this.refs.pinnedNav;g(l);return l;}});e.exports=k;},null);
__d("LeftNavDragController",["Arbiter","CSS","cx","DOMDimensions","DOMQuery","invariant","Rect","Style","SubscriptionsHandler","Vector"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){"use strict";var q;function r(s,t){l(!q);q=this;this.$LeftNavDragController0=s;this.$LeftNavDragController1=t;this.$LeftNavDragController2();this.$LeftNavDragController3=null;this.$LeftNavDragController4=false;this.$LeftNavDragController5=new o();this.$LeftNavDragController5.addSubscriptions(g.subscribe('LeftNavDragController/updatePinnedSectionBound',this.$LeftNavDragController2.bind(this)),g.subscribe('LeftNavDragController/toggleEditMode',this.$LeftNavDragController6.bind(this)),g.subscribe('LeftNavDragController/onItemEditDraggableGrab',this.$LeftNavDragController7.bind(this)),g.subscribe('LeftNavDragController/onItemEditDraggableDrop',this.$LeftNavDragController8.bind(this)),g.subscribe('LeftNavDragController/onItemEditDroppableDragOver',this.$LeftNavDragController9.bind(this)),g.subscribe('LeftNavDragController/onItemDraggableGrab',this.$LeftNavDragControllera.bind(this)),g.subscribe('LeftNavDragController/onItemDraggableDrag',this.$LeftNavDragControllerb.bind(this)),g.subscribe('LeftNavDragController/onItemDraggableDrop',this.$LeftNavDragControllerc.bind(this)),g.subscribe('LeftNavDragController/onItemDroppableDragOver',this.$LeftNavDragControllerd.bind(this)));}r.prototype.destroy=function(){this.$LeftNavDragController5.release();q=null;};r.prototype.$LeftNavDragController2=function(){this.$LeftNavDragControllere=this.$LeftNavDragControllerf(false);};r.prototype.$LeftNavDragControllera=function(s,t){var u=t,v=u.section,w=u.draggable,x=u.dragContainer,y=u.isDraggedItemPinned;if(!this.$LeftNavDragControllere){w.killDrag();n.set(w.dom,'width','');w.resetPosition();return;}var z=this.$LeftNavDragController1.getPinnedSection();this.$LeftNavDragController3=x;h.addClass(this.$LeftNavDragController0,'draggingMode');if(y){var aa=this.$LeftNavDragControllerg(v,w);z.setState({placeholderIdx:aa,glowingType:'sort'});}else z.setState({glowingType:'add'});};r.prototype.$LeftNavDragControllerb=function(s,t){var u=t.vector,v=t.dragContainer,w=t.isDraggedItemPinned,x=this.$LeftNavDragController1.getPinnedSection();if(this.$LeftNavDragControllerh(u)){var y=x.state.placeholderIdx>-1;if(!y){var z=x.props.model.items.findIndex(function(aa){return !aa.sortable;});x.setState({placeholderIdx:z+1,glowingType:w?'sort':'add'});this.$LeftNavDragController3.setTooltip(null);}}else{x.setState({placeholderIdx:-1,glowingType:w?'remove':'add'});if(w)v.setTooltip('remove');}};r.prototype.$LeftNavDragControllerc=function(s,t){var u=t.draggable,v=t.isDraggedItemPinned,w=this.$LeftNavDragController1.getPinnedSection(),x=u.dom.getAttribute('data-itemid');if(this.$LeftNavDragControllerh()){var y=this.$LeftNavDragControlleri(w,x);if(y)g.inform('LeftNavController/updatePinnedSection',{idOrder:y});}else if(v)g.inform('LeftNavController/toggleFavorite',x);this.$LeftNavDragController3=null;h.removeClass(this.$LeftNavDragController0,'draggingMode');w.setState({placeholderIdx:-1,glowingType:null});};r.prototype.$LeftNavDragControllerd=function(s,t){var u=t.section,v=t.draggable,w=t.targetItemID,x=h.hasClass(v.dom,'pinnedItem'),y=u.state.placeholderIdx>=0,z=u.props.model.items,aa=z.findIndex(function(ca){return ca.id===w;}),ba;if(y){ba=u.state.placeholderIdx<=aa?aa+1:aa;}else ba=aa;u.setState({placeholderIdx:ba,glowingType:x?'sort':'add'});if(x)this.$LeftNavDragController3.setTooltip(null);};r.prototype.$LeftNavDragController6=function(s,t){var u=t.section;if(!u.state.inEditMode){var v=this.$LeftNavDragControllerf(true);if(v){v.l=v.r=0;u.setState({draggableBound:v});}}h.toggleClass(this.$LeftNavDragController0,"_2ryg");u.setState({inEditMode:!u.state.inEditMode});};r.prototype.$LeftNavDragController7=function(s,t){var u=t.section,v=t.draggable,w=this.$LeftNavDragControllerg(u,v);u.setState({placeholderIdx:w});};r.prototype.$LeftNavDragController8=function(s,t){var u=t.section,v=t.draggable,w=this.$LeftNavDragControllerg(u,v),x=u.state.placeholderIdx;if(x!==w&&x!==w+1){var y=u.props.model,z=y.items[w];g.inform('LeftNavController/updatePinnedSection',{idOrder:this.$LeftNavDragControlleri(u,z.id)});}u.setState({placeholderIdx:-1});};r.prototype.$LeftNavDragController9=function(s,t){var u=t.section,v=t.draggable,w=t.targetItemID,x=u.props.model,y=this.$LeftNavDragControllerg(u,v);if(y>=0){var z=x.items.findIndex(function(ba){return ba.id===w;}),aa=u.state.placeholderIdx<=z?z+1:z;u.setState({placeholderIdx:aa});}};r.prototype.$LeftNavDragControllerh=function(s){if(s){var t=this.$LeftNavDragControllere;this.$LeftNavDragController4=t&&s.x>=t.l&&s.x<=t.r&&s.y>=t.t&&s.y<=t.b;}return this.$LeftNavDragController4;};r.prototype.$LeftNavDragControlleri=function(s,t){if(!s)return (void 0);var u=s.props.model.items,v=s.state.placeholderIdx,w=[];u.forEach(function(x,y){if(y===v)w.push(t);if(x.sortable&&x.id!==t)w.push(x.id);});if(v===u.length)w.push(t);return w;};r.prototype.$LeftNavDragControllerg=function(s,t){var u=s.props.model,v=t.dom.getAttribute('data-itemid');return (u.items.findIndex(function(w){return w.id.toString()===v;}));};r.prototype.$LeftNavDragControllerf=function(s){var t=this.$LeftNavDragController1.getPinnedSection(),u=t.getDOMNode(),v=k.scry(u,'li.sideNavItem');if(s)v=v.filter(function(fa){return fa.getAttribute('data-sortable')==='true';});if(v.length>0){var w=v[0],x=j.getElementDimensions(w).width,y=v[v.length-1],z=j.getElementDimensions(y).height,aa=p.getElementPosition(w).y,ba=p.getElementPosition(y).y+z;if(t.state.placeholderIdx>=0){var ca=t.refs.placeholder.getDOMNode(),da=p.getElementPosition(ca),ea=j.getElementDimensions(ca);aa=Math.min(aa,da.y);ba=Math.max(ba,da.y+ea.height);}return new m(aa,p.getElementPosition(w).x+x,ba,p.getElementPosition(w).x);}else return null;};e.exports=r;},null);
__d("LeftNavController",["React","LeftNavContainer.react","LeftNavDragController","AsyncRequest","Arbiter","Event","SubscriptionsHandler","Run","$","copyProperties","CSS","cx","debounce","DOMDimensions","Locale","URI","Vector","NavigationMessage","ChannelConstants"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y){"use strict";var z,aa,ba,ca,da,ea=null,fa,ga={init:function(kb,lb){z=kb;aa=lb;fa=false;da=new m();da.addSubscriptions(l.listen(window,'resize',s(ia,200)),k.subscribe('LeftNavController/toggleFavorite',wa),k.subscribe('LeftNavController/updatePinnedSection',xa),k.subscribe('LeftNavController/setItemCount',function(nb,ob){var pb=ob.item,qb=ob.count;return la(pb,qb);}),k.subscribe(y.getArbiterType('nav_update_counts'),ma),k.subscribeOnce('AsyncLayout/initialized',function(){return fa=true;}),k.subscribe(x.NAVIGATION_ITEM_REMOVED,na),k.subscribe(x.NAVIGATION_COMPLETED,ta),k.subscribe(x.NAVIGATION_FAILED,ua),k.subscribe(x.NAVIGATION_COUNT_UPDATE,va),k.subscribe(x.NAVIGATION_SELECT,sa),k.subscribe('LeftNavController/updateSectionOrder',ya));var mb=fb(aa.selectedKey);if(mb)mb.count=0;ba=g.render(g.createElement(h,{model:aa}),z);ia();ca=new i(z,ba);n.onLeave(this.uninstall.bind(this));},uninstall:function(){fa=false;da.release();ca.destroy();},initPageTransitions:function(kb){kb.registerHandler(function(lb){return fa&&oa(lb);},6);},mountSeeAllPayload:function(kb){ea=kb;}};function ha(){ba.forceUpdate();}function ia(){if(!z)return;var kb=w.getElementPosition(z).x;q.conditionClass(z,"_3evf",kb<20||(u.isRTL()&&kb+t.getElementDimensions(z).width<t.getElementDimensions(o('globalContainer')).width));}function ja(kb){aa.loadingKey=null;aa.selectedKey=kb||aa.defaultKey;ha();}function ka(kb){aa.loadingKey=kb;ha();}function la(kb,lb){kb.count=lb;ha();}function ma(kb,lb){var mb=lb.obj,nb=mb.items;nb.forEach(function(ob){var pb=fb(ob.key);if(pb)pb.count=pb.count+ob.count;});ha();}function na(kb,lb){var mb;function nb(pb,qb){return pb.keys.some(function(rb){return rb===qb;});}for(var ob=0;ob<aa.sections.length;ob++){mb=ib(aa.sections[ob].items,function(pb){return nb(pb,lb);});if(mb)break;}ib(aa.pinnedSection.items,function(pb){return nb(pb,lb);});ha();}function oa(kb){var lb=gb(kb);return lb&&lb.endpoint&&pa(lb,kb);}function pa(kb,lb){ka(kb.keys[0]);la(kb,0);ra(kb.endpoint,p(qa(kb,lb),lb.getQueryData()));return true;}function qa(kb,lb){var mb={};mb.sidecol=true;mb.path=lb.getPath();var nb=hb(kb.keys);nb=nb.text?nb.text:nb.numeric;mb.sk=nb;mb.key=nb;return mb;}function ra(kb,lb){lb.endpoint=kb;k.inform(x.NAVIGATION_BEGIN,{useAjaxPipe:true,params:lb});}function sa(kb,lb){var mb=lb.sk;if(lb.asLoading){ka(mb);}else ja(mb);}function ta(kb,lb){var mb=aa.loadingKey;ja(mb);}function ua(kb,lb){ka(null);}function va(kb,lb){var mb=fb(lb&&lb.key);if(mb)la(mb,lb.hide?0:mb.count+lb.count);}function wa(kb,lb){var mb=cb(lb),nb=aa.pinnedSection;if(!mb){if(!ea)return;mb=ea.find(function(rb){return rb.id===lb;});if(!mb)return;mb=p({},mb);mb.pinned=true;nb.items.push(mb);new j().setURI('/ajax/bookmark/add/').setData({id:mb.keys[0]}).send();}else{var ob=bb(mb);if(db(lb)){mb.pinned=false;var pb=nb.items.findIndex(function(rb){return rb.id===mb.id;});if(pb>=0){nb.items.splice(pb,1);if(ob)ob.items.unshift(mb);new j().setURI('/ajax/bookmark/delete/').setData({id:mb.keys[0]}).send();}}else{mb.pinned=true;var qb=ob.items.findIndex(function(rb){return rb.id===mb.id;});if(ob&&qb>=0){ob.items.splice(qb,1);nb.items.push(mb);new j().setURI('/ajax/bookmark/add/').setData({id:mb.keys[0]}).send();}}}ha();}function xa(kb,lb){var mb=lb.idOrder,nb=aa.pinnedSection,ob=nb.items.filter(function(qb){return !qb.sortable;});mb.forEach(function(qb){var rb=nb.items.find(function(tb){return tb.id===qb;});if(rb){ob.push(rb);}else if(rb=cb(qb)){var sb=bb(rb);ib(sb.items,function(tb){return tb.id===rb.id;});ob.push(rb);rb.pinned=true;}});nb.items=ob;var pb=ob.map(function(qb){return qb.keys[0];});new j().setURI('/ajax/bookmark/edit/').setData({ids:pb}).send();ha();}function ya(kb,lb){var mb=lb.idOrder,nb=aa.sections;aa.sections=mb.reduce(function(ob,pb){var qb=nb.find(function(rb){return rb.id===pb;});if(qb)ob.push(qb);return ob;},[]);new j().setURI('/bookmark/section/edit/').setData({nav_section_names:mb}).send();ha();}function za(kb){var lb=v.getRequestURI();return ((kb.getDomain()===lb.getDomain())&&(kb.getPath()==='/'||kb.getPath()==='/home.php'));}function ab(kb){if(kb==='pinnedNav'){return aa.pinnedSection;}else return (aa.sections.filter(function(lb){return lb.id===kb;})[0]);}function bb(kb){return ab(jb[kb.type]);}function cb(kb){kb=kb.toString();return eb(function(lb){return lb.id.toString()===kb;});}function db(kb){kb=kb.toString();var lb=ab('pinnedNav');return lb.items.some(function(mb){return mb.id.toString()===kb;});}function eb(kb){for(var lb=0;lb<aa.sections.length;lb++){var mb=aa.sections[lb].items.find(kb);if(mb)return mb;}return aa.pinnedSection.items.find(kb);}function fb(kb){return eb(function(lb){return lb.keys.some(function(mb){return mb===kb;});});}function gb(kb){var lb=kb.getQueryData().sk;if(lb){return fb(lb);}else if(za(kb)){return fb(aa.defaultKey);}else return eb(function(mb){return mb.path&&mb.path.some(function(nb){return nb===kb.getPath();});});}function hb(kb){var lb=/^(app|group|fl)_/,mb={};for(var nb=0;nb<kb.length;nb++){var ob=lb.test(kb[nb]);if(ob&&!mb.numeric){mb.numeric=kb[nb];}else if(!ob&&!mb.text)mb.text=kb[nb];if(mb.numeric&&mb.text)break;}return mb;}function ib(kb,lb){for(var mb=0;mb<kb.length;mb++)if(lb(kb[mb])){var nb=kb[mb];kb.splice(mb,1);return nb;}return (void 0);}var jb={favorites:'pinnedNav',profiles:'pinnedNav',company:'companyNav',apps:'appsNav',groups:'groupsNav',pages:'pagesNav',lists:'listsNav',interests:'interestsNav',connect_apps:'connectNav',type_user:'pinnedNav',type_group:'groupsNav',type_company:'companyNav',type_page:'pagesNav',type_friend_list:'listsNav',type_interest_list:'interestsNav',type_non_canvas_app:'appsNav',type_facebook_app:'appsNav',type_canvas_app_game:'appsNav',type_canvas_app_non_game:'appsNav',type_curated_feed:'interestsNav',type_game_tool:'appsNav',type_page_tool:'pagesNav',type_pinnable_page_tool:'pagesNav',type_developer:'developerNav',type_developer_tool:'developerNav'};e.exports=ga;},null);
__d("onViewportChanged",["EventListener","emptyFunction","getViewportDimensions","requestAnimationFrame"],function(a,b,c,d,e,f,g,h,i,j){var k=[],l=false,m=null,n,o;function p(){var aa=i.withoutScrollbars();return {top:0,bottom:aa.height,left:0,right:aa.width};}function q(aa,ba){var ca={transform:ba||h.thatReturnsArgument,callback:aa,needsUpdate:true};k.push(ca);x();s();return {remove:r.bind(null,ca),scheduleCheck:v.bind(null,ca)};}function r(aa){var ba=k.indexOf(aa);if(ba!==-1){k.splice(ba,1);if(k.length===0)t();}}function s(){if(!o){o=g.listen(window,'scroll',w);n=g.listen(window,'resize',u);}}function t(){if(o){o.remove();n.remove();o=n=null;}}function u(){m=null;w();}function v(aa){aa.needsUpdate=true;x();}function w(){k.map(function(aa){return aa.needsUpdate=true;});x();}function x(){if(!l){l=true;j(function(){l=false;z();});}}function y(aa){if(aa.needsUpdate){aa.needsUpdate=false;return true;}return false;}function z(){if(!m)m=p();var aa=k.filter(y),ba=aa.map(function(ca){return ca.transform.call(null,m);});aa.forEach(function(ca,da){return ca.callback.call(null,ba[da]);});}e.exports=q;},null);
__d("onRectIsWithinViewport",["onViewportChanged"],function(a,b,c,d,e,f,g){function h(j,k){return !(j.bottom<k.top||j.top>k.bottom||j.right<k.left||j.left>k.right);}function i(j,k){var l;function m(o){var p=j();return !!p&&h(p,o);}function n(o){if(l!==o){l=o;k(o);}}return g(n,m);}e.exports=i;},null);
__d("OnVisible.react",["React","getElementRect","onRectIsWithinViewport","onlyChild"],function(a,b,c,d,e,f,g,h,i,j){var k=g.createClass({displayName:"OnVisible",propTypes:{onVisible:g.PropTypes.func,onHidden:g.PropTypes.func,buffer:g.PropTypes.number},componentDidMount:function(){this._createListener();},componentDidUpdate:function(){this._createListener();},componentWillUnmount:function(){this._removeListener();},reset:function(){this._removeListener();this._createListener();},check:function(){if(this._listener)this._listener.scheduleCheck();},_measureElementRect:function(){if(!this.isMounted())return null;var l=this.props.buffer||0,m=h(this.getDOMNode());m.left-=l;m.right+=l;m.top-=l;m.bottom+=l;return m;},_createListener:function(){var l=this.getDOMNode();if(this._listener&&l!==this._element)this._removeListener();if(!this._listener){this._element=l;this._listener=i(this._measureElementRect,function(m){var n=m?this.props.onVisible:this.props.onHidden;n&&n();}.bind(this));}},_removeListener:function(){if(this._listener){this._listener.remove();this._listener=null;}},render:function(){return j(this.props.children);}});e.exports=k;},null);
__d("XEventImpressionLoggerAsyncControllerURIBuilder",["XControllerURIBuilder"],function(a,b,c,d,e,f){e.exports=b("XControllerURIBuilder").create("\/events\/{eventid}\/ajax\/impression\/",{eventid:{type:"Int",required:true},acontext:{type:"StringToStringMap",required:true}});},null);
__d("EventImpressionLogger.react",["Arbiter","React","OnVisible.react","DOMContainer.react","AsyncRequest","XEventImpressionLoggerAsyncControllerURIBuilder"],function(a,b,c,d,e,f,g,h,i,j,k,l){var m=h.createClass({displayName:"EventImpressionLogger",propTypes:{child:h.PropTypes.object.isRequired,event_id:h.PropTypes.number.isRequired,action_context:h.PropTypes.object.isRequired,start_signal:h.PropTypes.string,stop_signal:h.PropTypes.string,check_signal:h.PropTypes.string},componentDidMount:function(){this._listening=!this.props.start_signal;if(this.props.start_signal)g.subscribe(this.props.start_signal,function(n,o){this._signalData=o;this._listening=true;if(this._signalData){this._logImpression();}else if(!this.logged){this.refs.onvisible.reset();this.refs.onvisible.check();}}.bind(this));if(this.props.stop_signal)g.subscribe(this.props.stop_signal,function(){this._signalData=null;this._listening=false;}.bind(this));if(this.props.check_signal)g.subscribe(this.props.check_signal,function(n,o){this._signalData=o;if(this._signalData){this._logImpression();}else if(!this.logged){this.refs.onvisible.reset();this.refs.onvisible.check();}}.bind(this));},_logImpression:function(){if(!this._listening)return;if(this.logged)return;if(!document.documentElement.contains(this.props.child))return;if(this._signalData&&this._signalData.rect){var n=this.props.child.getBoundingClientRect(),o=this._signalData.rect,p=0;if(this._signalData.scrollTop)p=this._signalData.scrollTop;if(o.left&&o.left>n.left)return;if(o.right&&o.right<n.right)return;if(o.top&&o.top>n.top-p)return;if(o.bottom&&o.bottom<n.bottom-p)return;}this.logged=true;var q=new l().setInt('eventid',this.props.event_id).setStringToStringMap('acontext',this.props.action_context).getURI();new k(q).send();},render:function(){return (h.createElement(i,{onVisible:this._logImpression,ref:"onvisible"},h.createElement(j,null,this.props.child)));}});e.exports=m;},null);