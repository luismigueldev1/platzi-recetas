/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */

// Precarga la app
self.__precacheManifest = [].concat(self.__precacheManifest || [])
workbox.precaching.suppressWarnings
workbox.precaching.precacheAndRoute(self.__precacheManifest, {})

// App Shell
workbox.routing.registerNavigationRoute('/index.html')

workbox.googleAnalytics.initialize()

// La API usa Stale While Revalidate para mayor velocidad
workbox.routing.registerRoute(/^https?:\/\/www.themealdb.com\/api\/.*/,
    new workbox.strategies.StaleWhileRevalidate(),
    'GET')

// Las fuentes van con Cache First y vencen al mes
workbox.routing.registerRoute(/^https?:\/\/fonts.(?:googleapis|gstatic).com\/(.*)/,
    new workbox.strategies.CacheFirst({
        cacheName: 'google-fonts-cache',
        plugins: [
            new workbox.expiration.Plugin({
                maxAgeSeconds: 30 * 24 * 60 * 60
            })
        ]
    }),
    'GET')
workbox.routing.registerRoute(/^https?:\/\/www.themealdb.com\/images\/.*/,
    new workbox.strategies.CacheFirst({
        cacheName: 'image-cache',
        plugins: [
            new workbox.expiration.Plugin({
                maxAgeSeconds: 7 * 24 * 60 * 60,
                maxEntries: 20
            })
        ]
    })
)

// Todo lo demas usa Network First 
workbox.routing.registerRoute(/^https?.*/,
    new workbox.strategies.NetworkFirst(), 'GET')
