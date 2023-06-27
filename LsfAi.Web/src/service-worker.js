const CACHE_NAME = 'lsfai-web-cache-v1';

self.addEventListener("install", function(event) {
    event.waitUntil(preLoad());
  });
  
  var preLoad = function(){
    console.log("Installing web app");
    return caches.open(CACHE_NAME).then(function(cache) {
      console.log("caching important routes");
      return cache.addAll(
        [
          "/",
          "/views/frontOffice/form/login.html",
          "/views/frontOffice/form/register.html",
          "/manifest.json",
          "/views/offline.html",
          // "/views/frontOffice/exercises/reproduction.html",
          // "/views/frontOffice/exercises/training.html",
          // "/views/frontOffice/dictionary/dictionary-list.html",
          "/views/frontOffice/home.html",
          "/services/WebcamService.js",
          // "/models/metadata.json",
          // "/models/model.json",
          // "/models/weight.json",
        ]);
    });
  };
  
  self.addEventListener("fetch", function(event) {
    event.respondWith(checkResponse(event.request).catch(function() {
      return returnFromCache(event.request);
    }));
    event.waitUntil(addToCache(event.request));
  });
  
  var checkResponse = function(request){
    return new Promise(function(fulfill, reject) {
      fetch(request).then(function(response){
        if(response.status !== 404) {
          fulfill(response);
        } else {
          reject();
        }
      }, reject);
    });
  };
  
  var addToCache = function(request){
    return caches.open(CACHE_NAME).then(function (cache) {
      return fetch(request).then(function (response) {
        console.log(response.url + " was cached");
        return cache.put(request, response);
      });
    });
  };
  
  var returnFromCache = function(request){
    return caches.open(CACHE_NAME).then(function (cache) {
      return cache.match(request).then(function (matching) {
       if(!matching || matching.status == 404) {
         return cache.match("./views/offline.html");
       } else {
         return matching;
       }
      });
    });
  };
  