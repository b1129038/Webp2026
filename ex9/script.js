/* ===========================================================
 * Lab#9 — 使用 flickr API 製作照片牆
 * 課程：Web Programming, Spring 2026
 * -----------------------------------------------------------
 * 流程：
 *   1. 呼叫 flickr.photos.getRecent  → 取得最近 N 張照片的清單
 *   2. 對每張照片的 id 再呼叫 flickr.photos.getSizes → 拿到實際圖片 URL
 *   3. 把圖片塞進 <div id="gallery"> 裡,由 CSS 排版成照片牆
 * =========================================================== */

const API_KEY  = 'ca370d51a054836007519a00ff4ce59e'; // 簡報提供之 key
const PER_PAGE = 6;                                  // 照片牆共 6 張

// Step1: 取得最近的照片清單
const imglist_Url =
  `https://api.flickr.com/services/rest/` +
  `?method=flickr.photos.getRecent` +
  `&api_key=${API_KEY}` +
  `&per_page=${PER_PAGE}` +
  `&format=json&nojsoncallback=1`;

// Step2: 依 photo_id 組出「取得不同尺寸圖片 URL」的 API
function makeSizeUrl(photoId) {
  return `https://api.flickr.com/services/rest/` +
         `?method=flickr.photos.getSizes` +
         `&api_key=${API_KEY}` +
         `&photo_id=${photoId}` +
         `&format=json&nojsoncallback=1`;
}

// --------------------- 主流程 ---------------------
async function getimg() {
  const btn      = document.getElementById('btnGetImg');
  const statusEl = document.getElementById('status');
  const gallery  = document.getElementById('gallery');

  btn.disabled = true;
  statusEl.textContent = '正在向 Flickr 取得照片清單…';
  gallery.innerHTML = '';   // 清空舊照片

  try {
    // 1) 取得照片清單
    const listRes = await fetch(imglist_Url);
    if (!listRes.ok) throw new Error(`getRecent 失敗:${listRes.statusText}`);
    const listJson = await listRes.json();

    console.log('getRecent 回傳:', listJson);

    // flickr 回傳的格式:
    // { photos: { photo: [ {id, owner, secret, ...}, ... ] }, stat: 'ok' }
    const photos = listJson.photos && listJson.photos.photo;
    if (!photos || photos.length === 0) throw new Error('沒有拿到任何照片');

    statusEl.textContent =
      `已取得 ${photos.length} 張照片清單,正在取得每張照片的圖檔網址…`;

    // 2) 針對每張照片,平行去查 getSizes 拿實際 URL
    const urlPromises = photos.map(p => fetchPhotoUrl(p.id));
    const urls = await Promise.all(urlPromises);

    // 3) 把照片一張一張加進 gallery
    urls.forEach(url => {
      if (!url) return;      // 萬一某張失敗就略過
      add_new_img(url, gallery);
    });

    statusEl.textContent = `✅ 完成!共載入 ${urls.filter(Boolean).length} 張圖片。`;
  } catch (err) {
    console.error(err);
    statusEl.textContent = `❌ 發生錯誤:${err.message}`;
  } finally {
    btn.disabled = false;
  }
}

// --------------------- 工具函式 ---------------------

// 給一個 photo_id,回傳一張合適尺寸 (Medium / Medium 640) 的圖片網址
async function fetchPhotoUrl(photoId) {
  try {
    const res = await fetch(makeSizeUrl(photoId));
    if (!res.ok) throw new Error(res.statusText);

    const json = await res.json();
    // 回傳格式:
    // { sizes: { size: [ {label, width, height, source, url, media}, ... ] } }
    const sizes = json.sizes && json.sizes.size;
    if (!sizes) return null;

    // 依偏好順序找第一個有的 size
    const preferOrder = ['Medium 640', 'Medium', 'Small 320', 'Small', 'Large', 'Original'];
    for (const label of preferOrder) {
      const hit = sizes.find(s => s.label === label);
      if (hit) return hit.source;
    }
    // 找不到就回傳最後一個
    return sizes[sizes.length - 1].source;
  } catch (e) {
    console.warn(`photo_id=${photoId} 取得 size 失敗:`, e);
    return null;
  }
}

// 把單張圖片 append 到 gallery (仿照簡報 Page 21 的 add_new_img)
function add_new_img(src, galleryEl) {
  const img = document.createElement('img');
  img.setAttribute('src', src);
  img.setAttribute('alt', 'flickr photo');
  galleryEl.appendChild(img);
}
