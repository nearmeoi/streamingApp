# Dokumentasi API Anichin

Dokumen ini menyajikan hasil eksplorasi lengkap terhadap API Anichin, termasuk struktur data, endpoint, dan contoh respons dari berbagai endpoint yang tersedia.

## Struktur Umum API

Setiap respons API memiliki format standar berikut:

```json
{
  "status": 200,
  "success": true,
  "author": "zhadev",
  "data": {...},
  "message": null
}
```

## Daftar Endpoint

### 1. `/api/v1/donghua/home`

Endpoint ini menyediakan data untuk halaman beranda.

#### Contoh Respons:
```json
{
  "status": 200,
  "success": true,
  "author": "zhadev",
  "data": {
    "slider": [...],
    "popular_today": [...],
    "latest_release": [...],
    "recommendation": {...},
    "ongoing_series": [...],
    "popular_series": {...},
    "new_movie": [...],
    "genre": [...],
    "season": [...]
  },
  "message": null
}
```

#### Struktur Data:
- `slider`: Array konten untuk carousel di beranda
- `popular_today`: Array konten populer harian
- `latest_release`: Array konten terbaru
- `recommendation`: Rekomendasi berdasarkan kategori
- `ongoing_series`: Array konten sedang tayang
- `popular_series`: Array konten populer (mingguan, bulanan, sepanjang masa)
- `new_movie`: Array film baru
- `genre`: Array genre yang tersedia
- `season`: Array musim yang tersedia

### 2. `/api/v1/donghua/detail/{slug}`

Endpoint ini menyediakan informasi detail tentang suatu konten.

#### Contoh Respons:
```json
{
  "status": 200,
  "success": true,
  "author": "zhadev",
  "data": {
    "cover": {...},
    "slug": "perfect-world",
    "title": "Perfect World",
    "alter_title": "Wanmei Shijie, 完美世界",
    "bookmark_count": "Followed 5172 people",
    "synopsis": "Donghua \"Perfect World\" diadaptasi dari novel...",
    "information": {...},
    "genre": [...],
    "download_batch": {...},
    "episode_nav": {...},
    "episode": {...},
    "url": "https://anichin.cafe/seri/perfect-world/"
  },
  "message": null
}
```

#### Struktur Data:
- `cover`: Informasi thumbnail dan banner
- `title`, `alter_title`: Judul konten
- `synopsis`: Deskripsi konten
- `information`: Status, studio, tanggal rilis, durasi, dll.
- `genre`: Array genre
- `download_batch`: Link download per batch
- `episode`: Array daftar episode
- `url`: Link ke halaman detail

### 3. `/api/v1/donghua/watch/{slug}/{episode}`

Endpoint ini menyediakan data untuk pemutaran episode.

#### Contoh Respons:
```json
{
  "status": 200,
  "success": true,
  "author": "zhadev",
  "data": {
    "title": "Perfect World Episode 251 Subtitle Indonesia",
    "slug": "perfect-world",
    "episode": "",
    "thumbnail": "https://anichin.cafe/wp-content/uploads/2021/04/Perfect-World.webp",
    "released_on": "January 15, 2026",
    "server": [...],
    "download": {...},
    "synopsis": "Donghua \"Perfect World\" diadaptasi dari novel...",
    "genre": [...],
    "information": {...},
    "related_episode": [...],
    "episode_list": [...]
  },
  "message": null
}
```

#### Struktur Data:
- `title`: Judul episode
- `slug`: Slug konten
- `thumbnail`: Gambar thumbnail
- `released_on`: Tanggal rilis
- `server`: Array server streaming
- `download`: Link download per kualitas
- `synopsis`: Deskripsi konten
- `genre`: Array genre
- `information`: Informasi konten
- `episode_list`: Array daftar episode

### 4. `/api/v1/donghua/ongoing`

Endpoint ini menyediakan daftar konten sedang tayang.

#### Contoh Respons:
```json
{
  "status": 200,
  "success": true,
  "author": "zhadev",
  "data": {
    "items": [...],
    "pagination": {...},
    "genre_title": ""
  },
  "message": null
}
```

#### Struktur Data:
- `items`: Array konten sedang tayang
- `pagination`: Informasi halaman
- `genre_title`: Judul genre (jika filter)

### 5. `/api/v1/donghua/genres/{slug}`

Endpoint ini menyediakan daftar konten berdasarkan genre.

#### Contoh Respons:
```json
{
  "status": 200,
  "success": true,
  "author": "zhadev",
  "data": {
    "items": [...],
    "pagination": {...},
    "genre_title": "Action"
  },
  "message": null
}
```

#### Struktur Data:
- `items`: Array konten sesuai genre
- `pagination`: Informasi halaman
- `genre_title`: Nama genre

### 6. `/api/v1/donghua/schedule`

Endpoint ini menyediakan jadwal rilis konten per hari.

#### Contoh Respons:
```json
{
  "status": 200,
  "success": true,
  "author": "zhadev",
  "data": {
    "monday": {...},
    "tuesday": {...},
    "wednesday": {...},
    "thursday": {...},
    "friday": {...},
    "saturday": {...},
    "sunday": {...}
  },
  "message": null
}
```

#### Struktur Data:
- `monday`, `tuesday`, ..., `sunday`: Array konten per hari
- Setiap hari berisi: `title`, `slug`, `thumbnail`, `countdown`, dll.

### 7. `/api/v1/donghua/filters/value`

Endpoint ini menyediakan nilai-nilai filter yang tersedia.

#### Contoh Respons:
```json
{
  "status": 200,
  "success": true,
  "author": "zhadev",
  "data": {
    "status": [...],
    "type": [...],
    "sub": [...],
    "order": [...],
    "studio": [...],
    "season": [...],
    "genre": [...]
  },
  "message": null
}
```

#### Struktur Data:
- `status`: Array status (ongoing, completed, dll.)
- `type`: Array tipe (anime, movie, donghua, dll.)
- `sub`: Array subtitle (sub, dub, raw)
- `order`: Array urutan (A-Z, Z-A, popular, dll.)
- `studio`: Array studio produksi
- `season`: Array musim
- `genre`: Array genre

### 8. `/api/v1/donghua/random`

Endpoint ini menyediakan konten acak.

#### Contoh Respons:
```json
{
  "status": 200,
  "success": true,
  "author": "zhadev",
  "data": {
    "random_selection": {...},
    "cover": {...},
    "slug": "mo-dao-zu-shi-season-1",
    "title": "Mo Dao Zu Shi Season 1",
    "alter_title": "Mo Dao Zu Shi The Founder of Diabolism Season 1...",
    "bookmark_count": "Followed 258 people",
    "synopsis": "Xian: keadaan keabadian yang ingin dicapai semua pembudidaya...",
    "information": {...},
    "genre": [...],
    "download_batch": {...},
    "episode_nav": {...},
    "episode": {...},
    "url": "https://anichin.cafe/seri/mo-dao-zu-shi-season-1/"
  },
  "message": null
}
```

### 9. `/api/v1/donghua/completed`

Endpoint ini menyediakan daftar konten yang telah selesai.

#### Contoh Respons:
```json
{
  "status": 200,
  "success": true,
  "author": "zhadev",
  "data": {
    "items": [...],
    "pagination": {...}
  },
  "message": null
}
```

### 10. `/api/v1/donghua/a-z`

Endpoint ini menyediakan daftar konten berdasarkan abjad.

#### Contoh Respons:
```json
{
  "status": 200,
  "success": true,
  "author": "zhadev",
  "data": {
    "items": [...],
    "pagination": {...},
    "genre_title": ""
  },
  "message": null
}
```

## Format Data Umum

### Item Konten Umum
```json
{
  "title": "Nama Konten",
  "slug": "nama-konten",
  "thumbnail": "URL Gambar",
  "episode": "Informasi Episode",
  "type": "Tipe (Donghua, Movie, dll.)",
  "badge": "Sub/Dub",
  "url": "URL Ke Halaman"
}
```

### Informasi Episode
```json
{
  "number": "Nomor Episode",
  "title": "Judul Episode",
  "badge": "Sub/Dub",
  "release_date": "Tanggal Rilis",
  "url": "URL Episode"
}
```

## Catatan Teknis

- API menggunakan format JSON konsisten
- Hampir semua endpoint memiliki informasi pagination
- Gambar thumbnail disediakan dalam berbagai ukuran
- Tautan download tersedia dalam berbagai kualitas
- Struktur data cukup lengkap untuk aplikasi streaming

## Potensi Integrasi ke Frontend

1. **Halaman Beranda**: Gunakan data dari `/home` untuk slider, konten populer, dan rekomendasi
2. **Halaman Detail**: Gunakan data dari `/detail/{slug}` untuk informasi lengkap konten
3. **Halaman Streaming**: Gunakan data dari `/watch/{slug}/{episode}` untuk player dan navigasi episode
4. **Filter dan Pencarian**: Gunakan data dari `/filters/value` dan endpoint pencarian
5. **Navigasi Genre**: Gunakan data dari `/genres/{slug}`
6. **Jadwal Rilis**: Gunakan data dari `/schedule`

## Bahasa

API menyediakan konten dalam bahasa Indonesia, termasuk deskripsi, informasi konten, dan subtitle. Banyak konten menunjukkan bahwa subtitle disediakan dalam bahasa Indonesia, dan label serta terminologi dalam API juga tersedia dalam bahasa Indonesia.

---

Dokumen ini mencakup hasil eksplorasi lengkap terhadap API Anichin, termasuk struktur data, endpoint, dan contoh respons dari berbagai endpoint yang tersedia. Data ini siap digunakan untuk integrasi ke frontend Astro Stream UI.