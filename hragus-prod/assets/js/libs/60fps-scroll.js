(function e(t,n,r){function i(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(s)return s(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return i(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var s=typeof require=="function"&&require;for(var o=0;o<r.length;o++)i(r[o]);return i})({1:[function(e,t,n){var r=e("./utils").support,i=e("./utils").dispatchClick;if(typeof document.addEventListener!="function")return;document.addEventListener("DOMContentLoaded",function(){if(!r)return;var e=document.createElement("div"),t=document.body,n=e.style,s=!1,o,u=!1,a={x:0,y:0};n.cssText=["-webkit-transform: translate3d(0,0,0);","transform: translate3d(0,0,0);","position: fixed;","top: 0;","right: 0;","left: 0;","bottom: 0;","opacity: 0;","z-index: 2147483647;","pointer-events: none"].join(""),t.appendChild(e),window.addEventListener("scroll",function(){s||(n.pointerEvents="auto",s=!0),clearTimeout(o),o=setTimeout(function(){n.pointerEvents="none",s=!1,u&&(i(a),u=!1)},500)},!1),document.addEventListener("click",function(n){n.target===e&&!n.synthetic&&(a.x=n.clientX,a.y=n.clientY,u=!0)},!1)},!1)},{"./utils":2}],2:[function(e,t,n){function i(e){var t=document.createEvent("MouseEvent"),n=document.elementFromPoint(e.x,e.y);t.initMouseEvent("click",!0,!0,window,null,e.x,e.y,0,0,!1,!1,!1,!1,0,null),t.synthetic=!0,n.dispatchEvent(t)}var r=function(){var t=document.createElement("x");return t.style.cssText="pointer-events:auto",t.style.pointerEvents==="auto"}();n.support=r,n.dispatchClick=i},{}]},{},[1]);