!function(e,n){"use strict";"function"==typeof define&&define.amd?define([],n):"object"==typeof exports?module.exports=n():e.viewportUnitsBuggyfill=n()}(this,function(){"use strict";function e(e,n){var t;return function(){var i=this,r=arguments,o=function(){e.apply(i,r)};clearTimeout(t),t=setTimeout(o,n)}}function n(){try{return window.self!==window.top}catch(e){return!0}}function t(t){x||(t===!0&&(t={force:!0}),v=t||{},v.isMobileSafari=A,v.isBadStockAndroid=b,(v.force||A||E||b||R||v.hacks&&v.hacks.required(v))&&(v.hacks&&v.hacks.initialize(v),x=!0,g=document.createElement("style"),g.id="patched-viewport",document.head.appendChild(g),l(function(){var t=e(r,v.refreshDebounceWait||100);window.addEventListener("orientationchange",t,!0),window.addEventListener("pageshow",t,!0),(v.force||E||n())&&(window.addEventListener("resize",t,!0),v._listeningToResize=!0),v.hacks&&v.hacks.initializeEvents(v,r,t),r()})))}function i(){g.textContent=s(),g.parentNode.appendChild(g)}function r(){x&&(o(),setTimeout(function(){i()},1))}function o(){return w=[],T.call(document.styleSheets,function(e){"patched-viewport"!==e.ownerNode.id&&e.cssRules&&"ignore"!==e.ownerNode.getAttribute("data-viewport-units-buggyfill")&&(e.media&&e.media.mediaText&&window.matchMedia&&!window.matchMedia(e.media.mediaText).matches||T.call(e.cssRules,a))}),w}function a(e){if(7===e.type){var n;try{n=e.cssText}catch(t){return}return k.lastIndex=0,void(k.test(n)&&(w.push([e,null,n]),v.hacks&&v.hacks.findDeclarations(w,e,null,n)))}if(!e.style){if(!e.cssRules)return;return void T.call(e.cssRules,function(e){a(e)})}T.call(e.style,function(n){var t=e.style.getPropertyValue(n);k.lastIndex=0,k.test(t)&&(w.push([e,n,t]),v.hacks&&v.hacks.findDeclarations(w,e,n,t))})}function s(){m=d();var e,n,t=[],i=[];return w.forEach(function(r){var o=c.apply(null,r),a=o.selector.length?o.selector.join(" {\n")+" {\n":"",s=new Array(o.selector.length+1).join("\n}");return a&&a===e?(a&&!e&&(e=a,n=s),void i.push(o.content)):(i.length&&(t.push(e+i.join("\n")+n),i.length=0),void(a?(e=a,n=s,i.push(o.content)):(t.push(o.content),e=null,n=null)))}),i.length&&t.push(e+i.join("\n")+n),R&&t.push("* { content: normal !important; }"),t.join("\n\n")}function c(e,n,t){var i,r=[];i=t.replace(k,u),v.hacks&&(i=v.hacks.overwriteDeclaration(e,n,i)),n&&(r.push(e.selectorText),i=n+": "+i+";");for(var o=e.parentRule;o;)r.unshift("@media "+o.media.mediaText),o=o.parentRule;return{selector:r,content:i}}function u(e,n,t){var i=m[t],r=parseFloat(n)/100;return r*i+"px"}function d(){var e=window.innerHeight,n=window.innerWidth;return{vh:e,vw:n,vmax:Math.max(n,e),vmin:Math.min(n,e)}}function l(e){var n=0,t=function(){n--,n||e()};T.call(document.styleSheets,function(e){e.href&&f(e.href)!==f(location.href)&&(n++,h(e.ownerNode,t))}),n||e()}function f(e){return e.slice(0,e.indexOf("/",e.indexOf("://")+3))}function h(e,n){p(e.href,function(){var t=document.createElement("style");t.media=e.media,t.setAttribute("data-href",e.href),t.textContent=this.responseText,e.parentNode.replaceChild(t,e),n()},n)}function p(e,n,t){var i=new XMLHttpRequest;if("withCredentials"in i)i.open("GET",e,!0);else{if("undefined"==typeof XDomainRequest)throw new Error("cross-domain XHR not supported");i=new XDomainRequest,i.open("GET",e)}return i.onload=n,i.onerror=t,i.send(),i}var v,m,w,g,x=!1,y=window.navigator.userAgent,k=/([+-]?[0-9.]+)(vh|vw|vmin|vmax)/g,T=[].forEach,E=!1,R=y.indexOf("Opera Mini")>-1,A=/(iPhone|iPod|iPad).+AppleWebKit/i.test(y)&&function(){var e=y.match(/OS (\d)/);return e&&e.length>1&&parseInt(e[1])<8}(),b=function(){var e=y.indexOf(" Android ")>-1;if(!e)return!1;var n=y.indexOf("Version/")>-1;if(!n)return!1;var t=parseFloat((y.match("Android ([0-9.]+)")||[])[1]);return 4.4>=t}();return E||(E=!!navigator.userAgent.match(/Trident.*rv[ :]*11\./)),{version:"0.5.0",findProperties:o,getCss:s,init:t,refresh:r}});