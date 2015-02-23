(function(){var e,t,n,r,i,s,o,u,a,f,l,c,h,p,d,v,m,g,y,b,w,E,S,x,T,N,C,k,L,A,O,M,_,D,P,H,B,j,F,I,q,R,U,z,W,X,V,$,J,K=[].slice,Q={}.hasOwnProperty,G=function(e,t){function r(){this.constructor=e}for(var n in t)Q.call(t,n)&&(e[n]=t[n]);return r.prototype=t.prototype,e.prototype=new r,e.__super__=t.prototype,e},Y=[].indexOf||function(e){for(var t=0,n=this.length;t<n;t++)if(t in this&&this[t]===e)return t;return-1};w={catchupTime:1e3,initialRate:.5,minTime:250,ghostTime:666,maxProgressPerFrame:20,easeFactor:1,startOnPageLoad:!0,restartOnPushState:!0,restartOnRequestAfter:500,target:"body",elements:{checkInterval:100,selectors:["body"]},eventLag:{minSamples:10,sampleCount:3,lagThreshold:3},ajax:{trackMethods:["GET"],trackWebSockets:!0,ignoreURLs:[]}},L=function(){var e;return(e=typeof performance!=="undefined"&&performance!==null?typeof performance.now==="function"?performance.now():void 0:void 0)!=null?e:+(new Date)},O=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame,b=window.cancelAnimationFrame||window.mozCancelAnimationFrame,O==null&&(O=function(e){return setTimeout(e,50)},b=function(e){return clearTimeout(e)}),_=function(e){var t,n;return t=L(),n=function(){var r;return r=L()-t,r>=33?(t=L(),e(r,function(){return O(n)})):setTimeout(n,33-r)},n()},M=function(){var e,t,n;return n=arguments[0],t=arguments[1],e=3<=arguments.length?K.call(arguments,2):[],typeof n[t]=="function"?n[t].apply(n,e):n[t]},E=function(){var e,t,n,r,i,s,o;t=arguments[0],r=2<=arguments.length?K.call(arguments,1):[];for(s=0,o=r.length;s<o;s++){n=r[s];if(n)for(e in n){if(!Q.call(n,e))continue;i=n[e],t[e]!=null&&typeof t[e]=="object"&&i!=null&&typeof i=="object"?E(t[e],i):t[e]=i}}return t},m=function(e){var t,n,r,i,s;n=t=0;for(i=0,s=e.length;i<s;i++)r=e[i],n+=Math.abs(r),t++;return n/t},x=function(e,t){var n,r,i;e==null&&(e="options"),t==null&&(t=!0),i=document.querySelector("[data-pace-"+e+"]");if(!i)return;n=i.getAttribute("data-pace-"+e);if(!t)return n;try{return JSON.parse(n)}catch(s){return r=s,typeof console!="undefined"&&console!==null?console.error("Error parsing inline pace options",r):void 0}},o=function(){function e(){}return e.prototype.on=function(e,t,n,r){var i;return r==null&&(r=!1),this.bindings==null&&(this.bindings={}),(i=this.bindings)[e]==null&&(i[e]=[]),this.bindings[e].push({handler:t,ctx:n,once:r})},e.prototype.once=function(e,t,n){return this.on(e,t,n,!0)},e.prototype.off=function(e,t){var n,r,i;if(((r=this.bindings)!=null?r[e]:void 0)==null)return;if(t==null)return delete this.bindings[e];n=0,i=[];while(n<this.bindings[e].length)this.bindings[e][n].handler===t?i.push(this.bindings[e].splice(n,1)):i.push(n++);return i},e.prototype.trigger=function(){var e,t,n,r,i,s,o,u,a;n=arguments[0],e=2<=arguments.length?K.call(arguments,1):[];if((o=this.bindings)!=null?o[n]:void 0){i=0,a=[];while(i<this.bindings[n].length)u=this.bindings[n][i],r=u.handler,t=u.ctx,s=u.once,r.apply(t!=null?t:this,e),s?a.push(this.bindings[n].splice(i,1)):a.push(i++);return a}},e}(),f=window.Pace||{},window.Pace=f,E(f,o.prototype),A=f.options=E({},w,window.paceOptions,x()),V=["ajax","document","eventLag","elements"];for(U=0,W=V.length;U<W;U++)B=V[U],A[B]===!0&&(A[B]=w[B]);a=function(e){function t(){return $=t.__super__.constructor.apply(this,arguments),$}return G(t,e),t}(Error),t=function(){function e(){this.progress=0}return e.prototype.getElement=function(){var e;if(this.el==null){e=document.querySelector(A.target);if(!e)throw new a;this.el=document.createElement("div"),this.el.className="pace pace-active",document.body.className=document.body.className.replace(/pace-done/g,""),document.body.className+=" pace-running",this.el.innerHTML='<div class="pace-progress">\n  <div class="pace-progress-inner"></div>\n</div>\n<div class="pace-activity"></div>',e.firstChild!=null?e.insertBefore(this.el,e.firstChild):e.appendChild(this.el)}return this.el},e.prototype.finish=function(){var e;return e=this.getElement(),e.className=e.className.replace("pace-active",""),e.className+=" pace-inactive",document.body.className=document.body.className.replace("pace-running",""),document.body.className+=" pace-done"},e.prototype.update=function(e){return this.progress=e,this.render()},e.prototype.destroy=function(){try{this.getElement().parentNode.removeChild(this.getElement())}catch(e){a=e}return this.el=void 0},e.prototype.render=function(){var e,t,n,r,i,s,o;if(document.querySelector(A.target)==null)return!1;e=this.getElement(),r="translate3d("+this.progress+"%, 0, 0)",o=["webkitTransform","msTransform","transform"];for(i=0,s=o.length;i<s;i++)t=o[i],e.children[0].style[t]=r;if(!this.lastRenderedProgress||this.lastRenderedProgress|0!==this.progress|0)e.children[0].setAttribute("data-progress-text",""+(this.progress|0)+"%"),this.progress>=100?n="99":(n=this.progress<10?"0":"",n+=this.progress|0),e.children[0].setAttribute("data-progress",""+n);return this.lastRenderedProgress=this.progress},e.prototype.done=function(){return this.progress>=100},e}(),u=function(){function e(){this.bindings={}}return e.prototype.trigger=function(e,t){var n,r,i,s,o;if(this.bindings[e]!=null){s=this.bindings[e],o=[];for(r=0,i=s.length;r<i;r++)n=s[r],o.push(n.call(this,t));return o}},e.prototype.on=function(e,t){var n;return(n=this.bindings)[e]==null&&(n[e]=[]),this.bindings[e].push(t)},e}(),R=window.XMLHttpRequest,q=window.XDomainRequest,I=window.WebSocket,S=function(e,t){var n,r,i;i=[];for(r in t.prototype)try{e[r]==null&&typeof t[r]!="function"?typeof Object.defineProperty=="function"?i.push(Object.defineProperty(e,r,{get:function(){return t.prototype[r]},configurable:!0,enumerable:!0})):i.push(e[r]=t.prototype[r]):i.push(void 0)}catch(s){n=s}return i},C=[],f.ignore=function(){var e,t,n;return t=arguments[0],e=2<=arguments.length?K.call(arguments,1):[],C.unshift("ignore"),n=t.apply(null,e),C.shift(),n},f.track=function(){var e,t,n;return t=arguments[0],e=2<=arguments.length?K.call(arguments,1):[],C.unshift("track"),n=t.apply(null,e),C.shift(),n},H=function(e){var t;e==null&&(e="GET");if(C[0]==="track")return"force";if(!C.length&&A.ajax){if(e==="socket"&&A.ajax.trackWebSockets)return!0;if(t=e.toUpperCase(),Y.call(A.ajax.trackMethods,t)>=0)return!0}return!1},l=function(e){function t(){var e,n=this;t.__super__.constructor.apply(this,arguments),e=function(e){var t;return t=e.open,e.open=function(r,i,s){return H(r)&&n.trigger("request",{type:r,url:i,request:e}),t.apply(e,arguments)}},window.XMLHttpRequest=function(t){var n;return n=new R(t),e(n),n};try{S(window.XMLHttpRequest,R)}catch(r){}if(q!=null){window.XDomainRequest=function(){var t;return t=new q,e(t),t};try{S(window.XDomainRequest,q)}catch(r){}}if(I!=null&&A.ajax.trackWebSockets){window.WebSocket=function(e,t){var r;return t!=null?r=new I(e,t):r=new I(e),H("socket")&&n.trigger("request",{type:"socket",url:e,protocols:t,request:r}),r};try{S(window.WebSocket,I)}catch(r){}}}return G(t,e),t}(u),z=null,T=function(){return z==null&&(z=new l),z},P=function(e){var t,n,r,i;i=A.ajax.ignoreURLs;for(n=0,r=i.length;n<r;n++){t=i[n];if(typeof t=="string"){if(e.indexOf(t)!==-1)return!0}else if(t.test(e))return!0}return!1},T().on("request",function(t){var n,r,i,s,o;s=t.type,i=t.request,o=t.url;if(P(o))return;if(!f.running&&(A.restartOnRequestAfter!==!1||H(s)==="force"))return r=arguments,n=A.restartOnRequestAfter||0,typeof n=="boolean"&&(n=0),setTimeout(function(){var t,n,o,u,a,l;s==="socket"?t=i.readyState<2:t=0<(u=i.readyState)&&u<4;if(t){f.restart(),a=f.sources,l=[];for(n=0,o=a.length;n<o;n++){B=a[n];if(B instanceof e){B.watch.apply(B,r);break}l.push(void 0)}return l}},n)}),e=function(){function e(){var e=this;this.elements=[],T().on("request",function(){return e.watch.apply(e,arguments)})}return e.prototype.watch=function(e){var t,n,r,i;r=e.type,t=e.request,i=e.url;if(P(i))return;return r==="socket"?n=new p(t):n=new d(t),this.elements.push(n)},e}(),d=function(){function e(e){var t,n,r,i,s,o,u=this;this.progress=0;if(window.ProgressEvent!=null){n=null,e.addEventListener("progress",function(e){return e.lengthComputable?u.progress=100*e.loaded/e.total:u.progress=u.progress+(100-u.progress)/2},!1),o=["load","abort","timeout","error"];for(r=0,i=o.length;r<i;r++)t=o[r],e.addEventListener(t,function(){return u.progress=100},!1)}else s=e.onreadystatechange,e.onreadystatechange=function(){var t;return(t=e.readyState)===0||t===4?u.progress=100:e.readyState===3&&(u.progress=50),typeof s=="function"?s.apply(null,arguments):void 0}}return e}(),p=function(){function e(e){var t,n,r,i,s=this;this.progress=0,i=["error","open"];for(n=0,r=i.length;n<r;n++)t=i[n],e.addEventListener(t,function(){return s.progress=100},!1)}return e}(),r=function(){function e(e){var t,n,r,s;e==null&&(e={}),this.elements=[],e.selectors==null&&(e.selectors=[]),s=e.selectors;for(n=0,r=s.length;n<r;n++)t=s[n],this.elements.push(new i(t))}return e}(),i=function(){function e(e){this.selector=e,this.progress=0,this.check()}return e.prototype.check=function(){var e=this;return document.querySelector(this.selector)?this.done():setTimeout(function(){return e.check()},A.elements.checkInterval)},e.prototype.done=function(){return this.progress=100},e}(),n=function(){function e(){var e,t,n=this;this.progress=(t=this.states[document.readyState])!=null?t:100,e=document.onreadystatechange,document.onreadystatechange=function(){return n.states[document.readyState]!=null&&(n.progress=n.states[document.readyState]),typeof e=="function"?e.apply(null,arguments):void 0}}return e.prototype.states={loading:0,interactive:50,complete:100},e}(),s=function(){function e(){var e,t,n,r,i,s=this;this.progress=0,e=0,i=[],r=0,n=L(),t=setInterval(function(){var o;return o=L()-n-50,n=L(),i.push(o),i.length>A.eventLag.sampleCount&&i.shift(),e=m(i),++r>=A.eventLag.minSamples&&e<A.eventLag.lagThreshold?(s.progress=100,clearInterval(t)):s.progress=100*(3/(e+3))},50)}return e}(),h=function(){function e(e){this.source=e,this.last=this.sinceLastUpdate=0,this.rate=A.initialRate,this.catchup=0,this.progress=this.lastProgress=0,this.source!=null&&(this.progress=M(this.source,"progress"))}return e.prototype.tick=function(e,t){var n;return t==null&&(t=M(this.source,"progress")),t>=100&&(this.done=!0),t===this.last?this.sinceLastUpdate+=e:(this.sinceLastUpdate&&(this.rate=(t-this.last)/this.sinceLastUpdate),this.catchup=(t-this.progress)/A.catchupTime,this.sinceLastUpdate=0,this.last=t),t>this.progress&&(this.progress+=this.catchup*e),n=1-Math.pow(this.progress/100,A.easeFactor),this.progress+=n*this.rate*e,this.progress=Math.min(this.lastProgress+A.maxProgressPerFrame,this.progress),this.progress=Math.max(0,this.progress),this.progress=Math.min(100,this.progress),this.lastProgress=this.progress,this.progress},e}(),j=null,D=null,g=null,F=null,v=null,y=null,f.running=!1,N=function(){if(A.restartOnPushState)return f.restart()},window.history.pushState!=null&&(X=window.history.pushState,window.history.pushState=function(){return N(),X.apply(window.history,arguments)}),window.history.replaceState!=null&&(J=window.history.replaceState,window.history.replaceState=function(){return N(),J.apply(window.history,arguments)}),c={ajax:e,elements:r,document:n,eventLag:s},(k=function(){var e,n,r,i,s,o,u,a;f.sources=j=[],o=["ajax","elements","document","eventLag"];for(n=0,i=o.length;n<i;n++)e=o[n],A[e]!==!1&&j.push(new c[e](A[e]));a=(u=A.extraSources)!=null?u:[];for(r=0,s=a.length;r<s;r++)B=a[r],j.push(new B(A));return f.bar=g=new t,D=[],F=new h})(),f.stop=function(){return f.trigger("stop"),f.running=!1,g.destroy(),y=!0,v!=null&&(typeof b=="function"&&b(v),v=null),k()},f.restart=function(){return f.trigger("restart"),f.stop(),f.start()},f.go=function(){var e;return f.running=!0,g.render(),e=L(),y=!1,v=_(function(t,n){var r,i,s,o,u,a,l,c,p,d,v,m,b,w,E,S;c=100-g.progress,i=v=0,s=!0;for(a=m=0,w=j.length;m<w;a=++m){B=j[a],d=D[a]!=null?D[a]:D[a]=[],u=(S=B.elements)!=null?S:[B];for(l=b=0,E=u.length;b<E;l=++b){o=u[l],p=d[l]!=null?d[l]:d[l]=new h(o),s&=p.done;if(p.done)continue;i++,v+=p.tick(t)}}return r=v/i,g.update(F.tick(t,r)),g.done()||s||y?(g.update(100),f.trigger("done"),setTimeout(function(){return g.finish(),f.running=!1,f.trigger("hide")},Math.max(A.ghostTime,Math.max(A.minTime-(L()-e),0)))):n()})},f.start=function(e){E(A,e),f.running=!0;try{g.render()}catch(t){a=t}return document.querySelector(".pace")?(f.trigger("start"),f.go()):setTimeout(f.start,50)},typeof define=="function"&&define.amd?define(["pace"],function(){return f}):typeof exports=="object"?module.exports=f:A.startOnPageLoad&&f.start()}).call(this);