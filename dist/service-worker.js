"use strict";var precacheConfig=[["/static/common-umi.6d3d43cc.async.js","42f94387be431c3be7a74ffa106612e1"],["/static/src__layouts__index.578bb0fa.async.js","c89e0d6d5f3025e82645a6f48c77fa60"],["/static/src__pages__404.e993b784.async.js","0a65d33336730d347d20720d48ea794a"],["/static/src__pages__access-wallet__index.f630931f.async.js","de93c3186f826af76ce52bb32e27d3f8"],["/static/src__pages__access-wallet__models__accessWallet.js.59d5e9cb.async.js","04d48b12cd06af9b33fa4c53446b58c0"],["/static/src__pages__access-wallet__my-account__index.0762236d.async.js","28c7ce3f7fb91b2e6274dbd1515c2fcc"],["/static/src__pages__access-wallet__my-account__models__myAccount.js.fe7e308c.async.js","a2cf9e5277674d6a950205fbefd74167"],["/static/src__pages__create-wallet__index.3a9e5061.async.js","4dc4e9fffc29c1f60d0e02306eb6168c"],["/static/src__pages__create-wallet__models__createWallet.js.673c0ee8.async.js","4455b43bab5810dac322c42477a944fe"],["/static/src__pages__index.d4bb928f.async.js","ef66a495bfc858bda83d7a54ecc92820"],["/static/static/logo.7510241f.png","7510241f561c424d2794c05679f12d28"],["/static/umi.6ca5eb34.js","73c2a02ca01bab9112813baf943b8b23"],["/static/umi.fb8c9854.css","fb8c9854f8f2a56a949e015bafc10c7a"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var a=new URL(e);return"/"===a.pathname.slice(-1)&&(a.pathname+=t),a.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(t){return new Response(t,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,t,a,n){var c=new URL(e);return n&&c.pathname.match(n)||(c.search+=(c.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(a)),c.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var a=new URL(t).pathname;return e.some(function(e){return a.match(e)})},stripIgnoredUrlParameters=function(e,t){var a=new URL(e);return a.hash="",a.search=a.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return t.every(function(t){return!t.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),a.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],a=e[1],n=new URL(t,self.location),c=createCacheKey(n,hashParamName,a,!1);return[n.toString(),c]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(t){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(a){if(!t.has(a)){var n=new Request(a,{credentials:"same-origin"});return fetch(n).then(function(t){if(!t.ok)throw new Error("Request for "+a+" returned a response with status "+t.status);return cleanResponse(t).then(function(t){return e.put(a,t)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var t=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(a){return Promise.all(a.map(function(a){if(!t.has(a.url))return e.delete(a)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var t,a=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching);(t=urlsToCacheKeys.has(a))||(a=addDirectoryIndex(a,"index.html"),t=urlsToCacheKeys.has(a));0,t&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(a)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(t){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,t),fetch(e.request)}))}});