// ─── 체육수업 통합 관리 Service Worker ───
const CACHE_NAME = 'pe-manager-v2';

// 캐시할 파일 목록
const CACHE_FILES = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js',
  'https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;600;700;800;900&family=Black+Han+Sans&display=swap'
];

// 설치: 필수 파일 캐싱
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      // 외부 리소스는 실패해도 계속 진행
      return cache.addAll(['./index.html', './manifest.json'])
        .then(() => {
          return Promise.allSettled(
            ['https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js']
              .map(url => cache.add(url).catch(() => {}))
          );
        });
    }).then(() => self.skipWaiting())
  );
});

// 활성화: 구버전 캐시 삭제
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// 요청 가로채기: 캐시 우선 → 네트워크 폴백
self.addEventListener('fetch', event => {
  // POST 등 캐시 불가 요청은 그냥 통과
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;

      return fetch(event.request)
        .then(response => {
          // 유효한 응답만 캐시에 저장
          if (response && response.status === 200 && response.type !== 'opaque') {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => {
          // 오프라인 & 캐시 없음 → index.html 반환
          return caches.match('./index.html');
        });
    })
  );
});
