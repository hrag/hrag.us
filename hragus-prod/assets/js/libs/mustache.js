/*!
 * mustache.js - Logic-less {{mustache}} templates with JavaScript
 * http://github.com/janl/mustache.js
 */

(function(e,t){typeof exports=="object"&&exports?t(exports):typeof define=="function"&&define.amd?define(["exports"],t):t(e.Mustache={})})(this,function(e){function r(e){return typeof e=="function"}function i(e){return e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")}function o(e,t){return s.call(e,t)}function a(e){return!o(u,e)}function l(e){return String(e).replace(/[&<>"'\/]/g,function(e){return f[e]})}function m(t,r){function m(){if(f&&!l)while(u.length)delete o[u.pop()];else u=[];f=!1,l=!1}function x(e){typeof e=="string"&&(e=e.split(h,2));if(!n(e)||e.length!==2)throw new Error("Invalid tags: "+e);w=new RegExp(i(e[0])+"\\s*"),E=new RegExp("\\s*"+i(e[1])),S=new RegExp("\\s*"+i("}"+e[1]))}if(!t)return[];var s=[],o=[],u=[],f=!1,l=!1,w,E,S;x(r||e.tags);var T=new b(t),N,C,k,L,A,O;while(!T.eos()){N=T.pos,k=T.scanUntil(w);if(k)for(var M=0,_=k.length;M<_;++M)L=k.charAt(M),a(L)?u.push(o.length):l=!0,o.push(["text",L,N,N+1]),N+=1,L==="\n"&&m();if(!T.scan(w))break;f=!0,C=T.scan(v)||"name",T.scan(c),C==="="?(k=T.scanUntil(p),T.scan(p),T.scanUntil(E)):C==="{"?(k=T.scanUntil(S),T.scan(d),T.scanUntil(E),C="&"):k=T.scanUntil(E);if(!T.scan(E))throw new Error("Unclosed tag at "+T.pos);A=[C,k,N,T.pos],o.push(A);if(C==="#"||C==="^")s.push(A);else if(C==="/"){O=s.pop();if(!O)throw new Error('Unopened section "'+k+'" at '+N);if(O[1]!==k)throw new Error('Unclosed section "'+O[1]+'" at '+N)}else C==="name"||C==="{"||C==="&"?l=!0:C==="="&&x(k)}O=s.pop();if(O)throw new Error('Unclosed section "'+O[1]+'" at '+T.pos);return y(g(o))}function g(e){var t=[],n,r;for(var i=0,s=e.length;i<s;++i)n=e[i],n&&(n[0]==="text"&&r&&r[0]==="text"?(r[1]+=n[1],r[3]=n[3]):(t.push(n),r=n));return t}function y(e){var t=[],n=t,r=[],i,s;for(var o=0,u=e.length;o<u;++o){i=e[o];switch(i[0]){case"#":case"^":n.push(i),r.push(i),n=i[4]=[];break;case"/":s=r.pop(),s[5]=i[2],n=r.length>0?r[r.length-1][4]:t;break;default:n.push(i)}}return t}function b(e){this.string=e,this.tail=e,this.pos=0}function w(e,t){this.view=e==null?{}:e,this.cache={".":this.view},this.parent=t}function E(){this.cache={}}var t=Object.prototype.toString,n=Array.isArray||function(e){return t.call(e)==="[object Array]"},s=RegExp.prototype.test,u=/\S/,f={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;"},c=/\s*/,h=/\s+/,p=/\s*=/,d=/\s*\}/,v=/#|\^|\/|>|\{|&|=|!/;b.prototype.eos=function(){return this.tail===""},b.prototype.scan=function(e){var t=this.tail.match(e);if(!t||t.index!==0)return"";var n=t[0];return this.tail=this.tail.substring(n.length),this.pos+=n.length,n},b.prototype.scanUntil=function(e){var t=this.tail.search(e),n;switch(t){case-1:n=this.tail,this.tail="";break;case 0:n="";break;default:n=this.tail.substring(0,t),this.tail=this.tail.substring(t)}return this.pos+=n.length,n},w.prototype.push=function(e){return new w(e,this)},w.prototype.lookup=function(e){var t=this.cache,n;if(e in t)n=t[e];else{var i=this,s,o;while(i){if(e.indexOf(".")>0){n=i.view,s=e.split("."),o=0;while(n!=null&&o<s.length)n=n[s[o++]]}else typeof i.view=="object"&&(n=i.view[e]);if(n!=null)break;i=i.parent}t[e]=n}return r(n)&&(n=n.call(this.view)),n},E.prototype.clearCache=function(){this.cache={}},E.prototype.parse=function(e,t){var n=this.cache,r=n[e];return r==null&&(r=n[e]=m(e,t)),r},E.prototype.render=function(e,t,n){var r=this.parse(e),i=t instanceof w?t:new w(t);return this.renderTokens(r,i,n,e)},E.prototype.renderTokens=function(e,t,n,r){var i="",s,o,u;for(var a=0,f=e.length;a<f;++a)u=undefined,s=e[a],o=s[0],o==="#"?u=this._renderSection(s,t,n,r):o==="^"?u=this._renderInverted(s,t,n,r):o===">"?u=this._renderPartial(s,t,n,r):o==="&"?u=this._unescapedValue(s,t):o==="name"?u=this._escapedValue(s,t):o==="text"&&(u=this._rawValue(s)),u!==undefined&&(i+=u);return i},E.prototype._renderSection=function(e,t,i,s){function f(e){return o.render(e,t,i)}var o=this,u="",a=t.lookup(e[1]);if(!a)return;if(n(a))for(var l=0,c=a.length;l<c;++l)u+=this.renderTokens(e[4],t.push(a[l]),i,s);else if(typeof a=="object"||typeof a=="string")u+=this.renderTokens(e[4],t.push(a),i,s);else if(r(a)){if(typeof s!="string")throw new Error("Cannot use higher-order sections without the original template");a=a.call(t.view,s.slice(e[3],e[5]),f),a!=null&&(u+=a)}else u+=this.renderTokens(e[4],t,i,s);return u},E.prototype._renderInverted=function(e,t,r,i){var s=t.lookup(e[1]);if(!s||n(s)&&s.length===0)return this.renderTokens(e[4],t,r,i)},E.prototype._renderPartial=function(e,t,n){if(!n)return;var i=r(n)?n(e[1]):n[e[1]];if(i!=null)return this.renderTokens(this.parse(i),t,n,i)},E.prototype._unescapedValue=function(e,t){var n=t.lookup(e[1]);if(n!=null)return n},E.prototype._escapedValue=function(t,n){var r=n.lookup(t[1]);if(r!=null)return e.escape(r)},E.prototype._rawValue=function(e){return e[1]},e.name="mustache.js",e.version="1.0.0",e.tags=["{{","}}"];var S=new E;e.clearCache=function(){return S.clearCache()},e.parse=function(e,t){return S.parse(e,t)},e.render=function(e,t,n){return S.render(e,t,n)},e.to_html=function(t,n,i,s){var o=e.render(t,n,i);if(!r(s))return o;s(o)},e.escape=l,e.Scanner=b,e.Context=w,e.Writer=E});