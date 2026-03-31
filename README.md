[README.md](https://github.com/user-attachments/files/26368200/README.md)
# 체육수업 통합 관리 앱 — GitHub Pages 배포 가이드

## 📁 파일 구성
```
index.html      ← 메인 앱 (이걸 열면 됩니다)
manifest.json   ← PWA 설정
sw.js           ← 오프라인 캐시 (Service Worker)
icon-192.png    ← 앱 아이콘 (홈 화면용)
icon-512.png    ← 앱 아이콘 (스플래시용)
```

---

## 🚀 GitHub Pages 배포 방법 (최초 1회)

### 1단계 — GitHub 계정 만들기
- https://github.com 접속 → Sign up (무료)

### 2단계 — 새 저장소 만들기
1. 로그인 후 우측 상단 **+** → **New repository**
2. Repository name: `pe-manager` (영문, 띄어쓰기 없이)
3. **Public** 선택 ← 반드시 Public이어야 무료 배포 가능
4. **Create repository** 클릭

### 3단계 — 파일 올리기
1. 저장소 페이지에서 **uploading an existing file** 클릭
2. 이 폴더의 파일 5개를 모두 드래그해서 업로드
   - index.html
   - manifest.json
   - sw.js
   - icon-192.png
   - icon-512.png
3. 하단 **Commit changes** 클릭

### 4단계 — GitHub Pages 활성화
1. 저장소 상단 **Settings** 탭 클릭
2. 왼쪽 메뉴 **Pages** 클릭
3. Source: **Deploy from a branch**
4. Branch: **main** / **(root)** 선택 → **Save**
5. 1~2분 후 주소 생성됨:
   ```
   https://[내 깃헙 아이디].github.io/pe-manager/
   ```

---

## 📱 태블릿에 앱으로 설치하기

### 안드로이드 (크롬 브라우저)
1. 위에서 생성된 URL을 크롬으로 접속
2. 우측 상단 **⋮** 메뉴 → **홈 화면에 추가**
3. 이름 확인 후 **추가** 탭

### 아이패드 (사파리 브라우저)
1. URL을 사파리로 접속
2. 하단 **공유** 버튼(□↑) → **홈 화면에 추가**
3. **추가** 탭

설치 후엔 홈 화면 아이콘을 탭하면 **브라우저 없이 앱처럼** 전체화면으로 실행됩니다!

---

## 🔄 앱 업데이트 방법
파일을 수정했을 때:
1. GitHub 저장소에서 해당 파일 클릭 → ✏️ 편집 아이콘
2. 수정 후 **Commit changes**
3. 태블릿에서 앱 실행 → 자동으로 최신 버전 반영

---

## 💾 데이터 저장 위치
모든 데이터(학급, 출석, 기록)는 **태블릿 브라우저의 localStorage**에 저장됩니다.
- 앱을 삭제하거나 브라우저 데이터를 초기화하면 데이터가 사라집니다.
- 중요한 데이터는 **기록 탭 → 엑셀 다운로드**로 백업해 두세요.
