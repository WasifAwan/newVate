const CACHE_NAME = 'my-site-cache-v1';
const urlsToCache = [
  './',
  './moderator/modstyle.css',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css',
  './images/vate-Bg.webp',
  './images/plain-bg.webp',
  './images/Vate Odyssey Start.webp',
  './images/nav-img.webp',
  './images/Map.webp',
  './images/Maze-Master.webp',
  './images/Rapid.webp',
  './images/firstgame.webp',
  './images/finalResultBg.webp',
  './images/Spy.webp',
  './images/rulesBg.webp',
  './images/Back.webp',
  './images/backward.png',
  './images/Brands.webp',
  './images/forward.png',
  './images/Game2.webp',
  './images/Game3.webp',
  './images/resetbut-01.png',
  './images/favicon.png',
  './images/resultBg.webp',
  './images/secondfinal.webp',
  './images/thirdfinal.webp',
  './images/Vector.png',
  './images/wrong-size-change.gif',
  './images/correct-size-change.gif',
  './images/Doctor.gif',
  './images/Thankyou.webp',
  './images/QRFINAL-01.webp',
  './images/Vate Odyssey Screen new.webp',


    //sound files
  './sound/NewTimer15-Sec.mp3',
  './sound/Winning.mp3',
  './sound/wrong-answer-Buzzer.mp3',
  './sound/click.mp3',
  './sound/Background-Music.mp3',
  'https://cdn.jsdelivr.net/npm/canvas-confetti@1.4.0/dist/confetti.browser.min.js',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return Promise.all(urlsToCache.map(url => {
          return fetch(url).then(response => {
            if (!response.ok) {
              throw new Error(`Request for ${url} failed with status ${response.status}`);
            }
            return cache.put(url, response);
          }).catch(error => {
            console.error(`Failed to cache ${url}:`, error);
          });
        }));
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});