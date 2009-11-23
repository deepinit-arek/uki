uki={};(function(){var B=Object.prototype.toString;var A=uki.utils={isFunction:function(C){return B.call(C)==="[object Function]"},isArray:function(C){return B.call(C)==="[object Array]"},trim:function(C){return(C||"").replace(/^\s+|\s+$/g,"")},escapeHTML:function(D){var C={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;"};return D.replace(/[&<>\"\']/g,function(E){return C[E]})},each:function(D,I,F){var C,E=0,G=D.length;if(G===undefined){for(C in D){if(!C||!D[C]||!D.hasOwnProperty(C)){continue}if(I.call(F||D[C],C,D[C])===false){break}}}else{for(var H=D[0];E<G&&I.call(F||H,E,H)!==false;H=D[++E]){}return D}},inArray:function(E,F){for(var C=0,D=F.length;C<D;C++){if(F[C]===E){return C}}return -1},unique:function(I){var D=[],C={};try{for(var E=0,F=I.length;E<F;E++){var H=I[E];if(!C[H]){C[H]=true;D.push(I[E])}}}catch(G){D=I}return D},grep:function(C,G){var D=[];for(var E=0,F=C.length;E<F;E++){if(G(C[E],E)){D.push(C[E])}}return D},map:function(C,J,F){var D=[],I=A.isFunction(J)?J:function(K){return A.isFunction(K[J])?K[J]():K[J]};for(var E=0,G=C.length;E<G;E++){var H=I.call(F||C[E],C[E],E);if(H!=null){D[D.length]=H}}return D},reduce:function(D,C,H,F){for(var E=0,G=C.length;E<G;E++){D=H.call(F||C[E],D,C[E],E)}return D},extend:function(){var G=arguments[0]||{},E=1,F=arguments.length,D;for(;E<F;E++){if((D=arguments[E])!=null){for(var C in D){var H=D[C];if(G===H){continue}else{if(H!==undefined){G[C]=H}}}}}return G},newClass:function(D){var C=function(){this.init.apply(this,arguments)};uki.each(arguments,function(){uki.extend(C.prototype,this)});return C}};A.extend(uki,A)})();(function(){var E=uki.geometry={};var D=E.Point=function(F,G){this.x=F||0;this.y=G||0};D.prototype={toString:function(){return this.x+" "+this.y},clone:function(){return new D(this.x,this.y)},eq:function(F){return this.x==F.x&&this.y==F.y},constructor:D};D.fromString=function(F,G){var H=F.split(/\s+/);return new D(C(H[0],G&&G.width),C(H[1],G&&G.height))};var A=E.Size=function(G,F){this.width=G||0;this.height=F||0};A.prototype={toString:function(){return this.width+" "+this.height},clone:function(){return new A(this.width,this.height)},eq:function(F){return this.width==F.width&&this.height==F.height},isEmpty:function(){return this.width<=0||this.height<=0},constructor:A};A.fromString=function(F,G){var H=F.split(/\s+/);return new A(C(H[0],G&&G.width),C(H[1],G&&G.height))};var B=E.Rect=function(F,G){if(arguments.length>2){this.origin=new D(arguments[0],arguments[1]);this.size=new A(arguments[2],arguments[3])}else{this.origin=F||new D();this.size=G||new A()}};B.prototype={toString:function(){return this.origin+" "+this.size},toCoordsString:function(){return this.origin+" "+(new D(this.maxX(),this.maxY()))},clone:function(){return new B(this.origin.clone(),this.size.clone())},minX:function(F){if(typeof F!="undefined"){this.origin.x=F}return this.origin.x},maxX:function(){return this.origin.x+this.size.width},midX:function(){return this.origin.x+this.size.width/2},minY:function(F){if(typeof F!="undefined"){this.origin.y=F}return this.origin.y},midY:function(){return this.origin.y+this.size.height/2},maxY:function(){return this.origin.y+this.size.height},width:function(F){if(arguments.length>0){this.size.width=F}return this.size.width},height:function(F){if(arguments.length>0){this.size.height=F}return this.size.height},isEmpty:function(){return this.size.width<=0||this.size.height<=0},eq:function(F){return F&&this.size.eq(F.size)&&this.origin.eq(F.origin)},inset:function(G,F){this.origin.x+=G;this.origin.y+=F;this.size.width-=G*2;this.size.height-=F*2},intersection:function(H){var F=new D(Math.max(this.origin.x,H.origin.x),Math.max(this.origin.y,H.origin.y)),G=new A(Math.min(this.maxX(),H.maxX())-F.x,Math.min(this.maxY(),H.maxY())-F.y);return G.isEmpty()?new B():new B(F,G)},union:function(F){return B.fromCoords(Math.min(this.origin.x,F.origin.x),Math.min(this.origin.y,F.origin.y),Math.max(this.origin.maxX(),F.origin.maxX()),Math.max(this.origin.maxY(),F.origin.maxY()))},containsPoint:function(F){return ;F.x>=this.minX()&&F.x<=this.maxX()&&F.y>=this.minY()&&F.y<=this.maxY()},containsRect:function(F){return this.eq(this.union(F))},constructor:B};B.prototype.left=B.prototype.minX;B.prototype.top=B.prototype.minY;B.fromCoords=function(F,I,H,G){if(arguments.length==2){return new B(new D(arguments[0].x,arguments[0].y),new A(arguments[1].x-arguments[0].x,arguments[1].y-arguments[0].y))}return new B(new D(F,I),new A(H-F,G-I))};B.fromCoordsString=function(F,G){var I=F.split(/\s+/),H=[[I[0],I[1]].join(" "),[I[2],I[3]].join(" ")];return B.fromCoords(D.fromString(H[0],G),D.fromString(H[1],G))};B.fromString=function(F,G){var I=F.split(/\s+/),H=[[I[0],I[1]].join(" "),[I[2],I[3]].join(" ")];return new B(D.fromString(H[0],G),A.fromString(H[1],G))};function C(H,J){var F=(H+"").match(/([-0-9\.]+)(\S*)/),G=parseFloat(F[1],10),I=(F[2]||"").toLowerCase();if(I){if(I=="%"&&J){G*=J/100}}if(G<0&&J){G=J+G}return G}})();uki.attr=function(B,A,C){if(arguments.length>2){if(uki.isFunction(B[A])){B[A](C)}else{B[A]=C}}else{if(uki.isFunction(B[A])){return B[A]()}else{return B[A]}}};(function(){var D=1,F="uki"+new Date,B=this,E=B.document,A={resize:B,scroll:B,load:B,unload:B};var C=uki.dom={bound:{},createElement:function(G,H){var I=E.createElement(G);if(H){I.style.cssText=H}I[F]=D++;return I},events:("blur,focus,load,resize,scroll,unload,click,dblclick,mousedown,mouseup,mousemove,mouseover,mouseout,mouseenter,mouseleave,change,select,submit,keydown,keypress,keyup,error").split(","),bind:function(I,H,G){var K=I[F]=I[F]||D++,J=A[H]||E;if(!C.bound[H]){J.addEventListener?J.addEventListener(H,C.handler,false):J.attachEvent("on"+H,C.handler);C.bound[H]={}}if(!C.bound[H][K]){C.bound[H][K]=[]}C.bound[H][K].push(G)},unbind:function(I,H,G){if(!I[F]||!C.bound[H]){return }var J=I[F];C.bound[H][J]=uki.grep(C.bound[H][J],function(K){return K!==G})},handler:function(K){event=C.fix(K||B.event);if(!K.target||!K.target[F]){return }var I=K.type,G=C.bound[I],J=K.target,N,M,H,L=100;while(L--&&J&&J!=E){M=J[F];if(G[M]&&G[M].length){for(H=0,N=G[M];H<N.length;H++){N[H].apply(J,arguments)}}J=J.parentNode}},fix:function(H){if(!H.target){H.target=H.srcElement||E}if(H.target.nodeType==3){H.target=H.target.parentNode}if(!H.relatedTarget&&H.fromElement){H.relatedTarget=H.fromElement==H.target?H.toElement:H.fromElement}if(H.pageX==null&&H.clientX!=null){var I=E.documentElement,G=E.body;H.pageX=H.clientX+(I&&I.scrollLeft||G&&G.scrollLeft||0)-(I.clientLeft||0);H.pageY=H.clientY+(I&&I.scrollTop||G&&G.scrollTop||0)-(I.clientTop||0)}if(!H.which&&((H.charCode||H.charCode===0)?H.charCode:H.keyCode)){H.which=H.charCode||H.keyCode}if(!H.metaKey&&H.ctrlKey){H.metaKey=H.ctrlKey}if(!H.which&&H.button){H.which=(H.button&1?1:(H.button&2?3:(H.button&4?2:0)))}}};if(B.attachEvent){B.attachEvent("onunload",function(){uki.each(C.bound,function(G){(A[G]||E).detachEvent("on"+G,C.handler)})})}uki.each(["createElement","bind","unbind"],function(H,G){uki[G]=C[G]})})();uki.layout=new function(){this.queue=[];this.schedule=function(B,A){this.queue[this.queue.length]=[B,A]};this.perform=function(){var A=this.queue,D,C;for(var B=0;B<A.length;B++){D=A[B][0];C=A[B][1];if(C.left){D.left=C.left+"px"}if(C.top){D.top=C.top+"px"}if(C.width){D.width=C.width+"px"}if(C.height){D.height=C.height+"px"}}this.queue=[]}};(function(){var A=this;var B=uki.Attachment=uki.newClass({init:function(D,C){this._dom=D;this._view=C;D.appendChild(C.dom());B.register(this);this.resize();uki.layout.perform()},resize:function(){this._view.rect(new uki.geometry.Rect(0,0,this._dom.offsetWidth,this._dom.offsetHeight))},view:function(){return this._view}});B.instances=[];B.register=function(C){if(B.instances.length==0){uki.bind(A,"resize",function(){uki.each(B.instances,function(){this.resize()});uki.layout.perform()})}B.instances.push(C)};B.children=function(){return uki.map(B.instances,"view")};uki.top=function(){return[B]}})();(function(){uki.Collection=function(B){this.length=0;Array.prototype.push.apply(this,B)};var A=uki.Collection.prototype={};A.each=function(B){return uki.each(this,B)};A.attr=function(B,C){if(arguments.length>1){this.each(function(){uki.attr(this,B,C)});return this}else{return uki.attr(this[0],B)}};A.find=function(B){return uki.find(B,this)};A.attachTo=function(B){this.each(function(){new uki.Attachment(B,this)});return this};uki.each(["bind","unbind","trigger"],function(C,B){A[B]=function(){for(var D=0;D<this.length;D++){this[D][B].apply(this[D],arguments)}return this}})})();(function(){var B=this,A=uki.attr;uki.build=function(G,F){if(!uki.isArray(G)){G=[G]}return new uki.Collection(E(G,F))};function E(G,F){return uki.map(G,function(H){return C(H,F)})}function C(I,H){if(uki.isFunction(I.typeName)){if(H){H.addChild(I)}return I}var L=I.view||I.type,F;I.type=I.view=undefined;if(uki.isFunction(L)){F=L()}else{if(typeof L==="string"){var K=L.split("."),J=B;if(K.length==1&&!B[K[0]]){K=["uki","component",K[0]]}for(var G=0;G<K.length;G++){J=J[K[G]]}F=new J()}else{F=L}}return D(F,I,H)}function D(G,I,H){var F=uki.isFunction(G.builderAttrs)?G.builderAttrs():[];if(H){H.addChild(G)}uki.each(F,function(K,J){if(I[J]){A(G,J,I[J])}I[J]=undefined});uki.each(I,function(J,K){A(G,J,K)});return G}})();(function(){var L,B="__selector_marked",H=uki.attr,M=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^[\]]*\]|['"][^'"]*['"]|[^[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?/g,I=[{name:"ID",regexp:/#((?:[\w\u00c0-\uFFFF_-]|\\.)+)/},{name:"ATTR",regexp:/\[\s*((?:[\w\u00c0-\uFFFF_-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/},{name:"TYPE",regexp:/^((?:[\w\u00c0-\uFFFF\*_\.-]|\\.)+)/},{name:"POS",regexp:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^-]|$)/}],J=I.POS,F={first:function(N){return N===0},last:function(O,N,P){return O===P.length-1},even:function(N){return N%2===0},odd:function(N){return N%2===1},lt:function(O,N){return O<N[2]-0},gt:function(O,N){return O>N[2]-0},nth:function(O,N){return N[2]-0==O},eq:function(O,N){return N[2]-0==O}},E={TYPE:function(O,P){var Q=P[1];if(Q=="*"){return true}var N=H(O,"typeName");return N&&N.length>=Q.length&&("."+N).indexOf("."+Q)==(N.length-Q.length)},ATTR:function(P,Q){var N=H(P,Q[1]),S=N+"",R=Q[2],O=Q[4];return N==null?R==="!=":R==="="?S===O:R==="*="?S.indexOf(O)>=0:R==="~="?(" "+S+" ").indexOf(O)>=0:!O?S&&N!==false:R==="!="?S!=O:R==="^="?S.indexOf(O)===0:R==="$="?S.substr(S.length-O.length)===O:false},POS:function(N,O,P,R){var Q=F[O[1]];return Q?Q(P,O,R):false}},D={"+":function(N){},">":function(N){return A(uki.map(N,"children"))},"":function(N){return G(A(uki.map(N,"children")))},"~":function(N){}};function G(N){return A(uki.map(N,function(O){return[O].concat(G(H(O,"children")))}))}function A(N){return uki.reduce([],N,C)}function C(N,O){return N.concat(O)}function K(P){var N=[],O;for(O=0;O<P.length;O++){if(!P[O][B]){N[N.length]=P[O]}P[O][B]=true}for(O=0;O<N.length;O++){N[O][B]=undefined}return N}L=uki.Selector={find:function(P,R,Q){R=R||uki.top();if(R.length===undefined){R=[R]}var T=L.tokenize(P),S=T[0],O=T[1],N=R,U;while(S.length>0){U=D[S[0]]?D[S.shift()]:D[""];N=U(N);if(S.length==0){break}N=L.reduce(S.shift(),N)}if(O){N=N.concat(L.find(O,R,true))}return Q?N:new uki.Collection(K(N))},reduce:function(Q,O){if(!O||!O.length){return[]}var N,P;while(Q!=""){P=false;uki.each(I,function(R,S){if(N=Q.match(S.regexp)){P=true;O=uki.grep(O,function(T,U){return E[S.name](T,N,U,O)});Q=Q.replace(S.regexp,"");return false}});if(!P){break}}return O},tokenize:function(Q){var P=[],O,N;M.lastIndex=0;while((O=M.exec(Q))!==null){P.push(O[1]);if(O[2]){N=RegExp.rightContext;break}}return[P,N]}};uki.find=L.find})();uki.component={};uki.dom.Observable={dom:function(){return null},bind:function(A,C){var B=this;uki.each(A.split(" "),function(E,D){if(uki.inArray(D,uki.dom.events)==-1){this._observersFor(D).push(C)}else{uki.dom.bind(this.dom(),D,function(){C.apply(B,arguments)})}},this)},unbind:function(A,B){uki.each(A.split(" "),function(D,C){if(uki.inArray(C,uki.dom.events)==-1){this._observers[C]=uki.grep(this._observersFor(C),function(E){return E!==B})}else{uki.dom.unbind(this.dom(),C,B)}},this)},trigger:function(B){var A=Array.prototype.slice.call(arguments,1);uki.each(this._observersFor(B,true),function(C,D){D.apply(this,A)},this)},_observersFor:function(B,A){if(A&&(!this._observers||!this._observers[B])){return[]}if(!this._observers){this._observers={}}if(!this._observers[B]){this._observers[B]=[]}return this._observers[B]}};(function(){var C=1,F=2,B=4,G=8,E=1,H=2;var D=uki.layout,A=uki.utils;uki.component.Base=uki.newClass(uki.dom.Observable,new function(){var I=this;I.defaultCss="position:absolute;overflow:hidden;top:0;left:0;z-index:100;";I.init=function(J){this._anchors=0;this._autosize=0;this._parent=null;this._rect=null;this._children=[];this._domCreate();if(J){this.rect(J)}};I.builderAttrs=function(){return["rect","coords","children"]};I.typeName=function(){return"uki.component.Base"};I.children=function(J){if(arguments.length==0){return this._children}uki.each(this._children,function(K,L){this.removeChild(L)},this);uki.build(J,this)};I.removeChild=function(J){this._dom.removeChild(J._dom);this._children=uki.grep(this._children,function(K){return K==J})};I.addChild=function(J){J.parent(this);this._dom.appendChild(J.dom());this._children.push(J)};I.parent=function(J){if(arguments.length==0){return this._parent}if(this._parent){this._parent.removeChild(this)}this._parent=J};I.rect=function(L){if(arguments.length==0){return this._rect}if(typeof L==="string"){L=uki.geometry.Rect.fromString(L,(this._parent?this._parent.rect().size:undefined))}if(L.eq(this._rect)){return }this._domResize(L);if(this._rect){var K=this._rect.size.clone();this._rect=L;for(var J=0;J<this._children.length;J++){this._children[J].resizeWithOldSize(K)}}else{this._rect=L}};I.coords=function(J){if(arguments.length==0){this.rect().toCoordsString()}this.rect(uki.geometry.Rect.fromCoordsString(J,(this._parent?this._parent.rect().size:undefined)))};I.dom=function(){return this._dom};I.domStyle=function(){return this._domStyle};I._domResize=function(K){var J={};D.schedule(this._domStyle,{left:K.origin.x,top:K.origin.y,width:K.size.width,height:K.size.height})};I._domCreate=function(){this._dom=uki.createElement("div",this.defaultCss);this._domStyle=this._dom.style};I.resizeWithOldSize=function(N){var M=this._parent.rect(),L=this._rect.clone(),K=(M.size.width-N.width)/((this._anchors&G^G?1:0)+(this._autosize&E?1:0)+(this._anchors&F^F?1:0)),J=(M.size.height-N.height)/((this._anchors&C^C?1:0)+(this._autosize&H?1:0)+(this._anchors&B^B?1:0));if(this._anchors&G^G){L.origin.x+=K}if(this._autosize&E){L.size.width+=K}if(this._anchors&C^C){L.origin.y+=J}if(this._autosize&H){L.size.height+=J}this.rect(L)};I.anchors=function(K){if(arguments.length==0){var J=[];if(this._anchors&G){J.push("left")}if(this._anchors&C){J.push("top")}if(this._anchors&F){J.push("right")}if(this._anchors&B){J.push("bottom")}return J.join(" ")}else{this._anchors=0;if(K.indexOf("top")>-1){this._anchors=this._anchors|C}if(K.indexOf("right")>-1){this._anchors=this._anchors|F}if(K.indexOf("bottom")>-1){this._anchors=this._anchors|B}if(K.indexOf("left")>-1){this._anchors=this._anchors|G}}};I.autosize=function(J){if(arguments.length==0){if(this._autosize|E&&this._autosize|H){return"width height"}if(this._autosize|E){return"width"}if(this._autosize|H){return"height"}return""}else{this._autosize=0;if(J.indexOf("width")>-1){this._autosize=this._autosize|E}if(J.indexOf("height")>-1){this._autosize=this._autosize|H}}};uki.each(["width","height","minX","maxX","minY","maxY","left","top"],function(K,J){I[J]=function(){var L=this.rect();return L[J].apply(L,arguments)}})})})();(function(){var B=uki.component.Base.prototype,A=uki.component.Textarea=function(){this.init.apply(this,arguments)};A.prototype=uki.extend({},B,{_domCreate:function(){this._dom=this._dom=document.createElement("textarea");this._domStyle=this._dom.style;this._domStyle.cssText=B.defaultCss}})})();(function(){var B=uki.component.Base.prototype,A=uki.component.Input=function(){this.init.apply(this,arguments)};A.prototype=uki.extend({},B,{_domCreate:function(){this._dom=document.createElement("input");this._domStyle=this._dom.style;this._domStyle.cssText=B.defaultCss+"-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box"}})})();(function(){var B=uki.component.Base.prototype,A=uki.component.Button=function(){this.init.apply(this,arguments)};A.prototype=uki.extend({},B,{_domCreate:function(){this._dom=document.createElement("button");this._domStyle=this._dom.style;this._domStyle.cssText=B.defaultCss+"-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box"},typeName:function(){return"uki.component.Button"},text:function(){if(arguments.length==0){return this._dom.innerHTML}this._dom.innerHTML=arguments[0]}})})();(function(){var B=uki.component.Base.prototype,A=uki.component.Label=function(){this.init.apply(this,arguments)};A.prototype=uki.extend({},B,{typeName:function(){return"uki.component.Label"},_domCreate:function(){this._selectable=true;this._dom=uki.createElement("div");this._domStyle=this._dom.style;this._domStyle.cssText=B.defaultCss+"font-family:Helvetica-Neue,Helvetica,Arial,sans-serif;text-shadow:0 1px 0px rgba(255,255,255,0.8);font-size:12px;line-height:15px;"},text:function(C){return arguments.length==0?this.html():this.html(uki.escapeHTML(C))},html:function(C){if(arguments.length==0){return this._dom.innerHTML}else{this._dom.innerHTML=C}},align:function(C){if(arguments.length==0){return this.domStyle().textAlign}else{this.domStyle().textAlign=C}},selectable:function(C){if(arguments.length==0){return this._selectable}else{this._domStyle.MozUserSelect=C?"":"none";this._domStyle.WebkitUserSelect=C?"":"none";this._domStyle.userSelect=C?"":"none";this._domStyle.cursor=C?"text":"default"}}})})();