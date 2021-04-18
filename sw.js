self.addEventListener("install", e => {
    e.waitUntil(
        caches.open("secretscript_v1").then(cache => {
            return cache.addAll(["./", "./app.js", "./style.css", "./mask294.png",
             "./contact.html", "./howto.html", "./otherstyle.css",
              "./output.html", "./output.js"]);
        })
    );
});

self.addEventListener("fetch", e => {
    console.log(`Intesepting fet req for: ${e.request.url}`);

    e.respondWith(
        caches.match(e.request).then(response => {
            return response || fetch(e.request);
        })
    );

});