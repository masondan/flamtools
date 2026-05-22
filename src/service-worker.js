import { build, files, version } from '$service-worker';

const CACHE_NAME = `flamtools-${version}`;
const ASSETS = [...build, ...files];

// Install event: cache assets
self.addEventListener('install', (event) => {
	event.waitUntil(
		caches.open(CACHE_NAME).then((cache) => {
			return cache.addAll(ASSETS);
		})
	);
	self.skipWaiting();
});

// Activate event: clean up old caches
self.addEventListener('activate', (event) => {
	event.waitUntil(
		caches.keys().then((cacheNames) => {
			return Promise.all(
				cacheNames.map((cacheName) => {
					if (cacheName !== CACHE_NAME) {
						return caches.delete(cacheName);
					}
				})
			);
		})
	);
	self.clients.claim();
});

// Fetch event: serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
	const { request } = event;

	// Skip non-GET requests
	if (request.method !== 'GET') {
		return;
	}

	// Skip non-http(s) requests
	if (request.url.startsWith('http')) {
		event.respondWith(
			caches.match(request).then((response) => {
				return response || fetch(request);
			})
		);
	}
});
