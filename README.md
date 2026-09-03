# SPMB 2026

Website frontend Sistem Penerimaan Mahasiswa Baru (SPMB) yang dibuat menggunakan React dan Vite. Aplikasi menyediakan landing page, registrasi, login, dashboard pendaftar, pengisian biodata bertahap, unggah dokumen, serta halaman pengumuman.

## Fitur

- Landing page responsif untuk HP, tablet, laptop, dan desktop.
- Informasi jadwal, program studi, serta tahapan seleksi dalam modal interaktif.
- Halaman registrasi dan login.
- Proteksi dashboard menggunakan sesi pengguna.
- Dashboard progres pendaftaran.
- Pengisian biodata dalam tujuh tahap.
- Penyimpanan biodata sementara pada browser.
- Validasi tipe dan ukuran dokumen.
- Upload dan crop foto profil.
- Pengumuman yang dapat dibuka dan ditutup.
- Animasi masuk halaman dan dukungan `prefers-reduced-motion`.

## Teknologi

- React 19
- React Router DOM
- Vite
- React Icons
- React Easy Crop
- Oxlint
- CSS responsif

## Persyaratan

Pastikan perangkat sudah memiliki Node.js 20 atau lebih baru, npm, dan Git. Periksa instalasinya dengan:

```bash
node --version
npm --version
git --version
```

## Instalasi dan Menjalankan Website

1. Clone repository:

   ```bash
   git clone https://github.com/USERNAME/NAMA-REPOSITORY.git
   ```

2. Masuk ke folder proyek dan instal dependency:

   ```bash
   cd spmb-tki
   npm install
   ```

3. Jalankan development server:

   ```bash
   npm run dev
   ```

4. Buka alamat yang ditampilkan Vite, biasanya `http://localhost:5173`.

## Perintah yang Tersedia

```bash
npm run dev      # Menjalankan development server
npm run lint     # Memeriksa kualitas kode
npm run build    # Membuat production build
npm run preview  # Meninjau production build
```

Sebelum commit atau push, jalankan:

```bash
npm run lint
npm run build
```

## Alur Penggunaan Website

### 1. Landing Page

Pengguna membuka `/`. Halaman ini berisi informasi utama SPMB 2026, tombol **Daftar Sekarang**, kartu jadwal, program studi, informasi seleksi, serta kontak dan lokasi kampus.

Klik kartu informasi untuk melihat detail. Modal dapat ditutup melalui tombol silang, klik area luar, atau tombol `Escape`.

### 2. Registrasi

Klik **Daftar Sekarang** atau buka `/register`, kemudian isi:

1. Nama lengkap.
2. Email.
3. Nomor WhatsApp.
4. Password minimal enam karakter.
5. Konfirmasi password.

Setelah berhasil, pengguna diarahkan ke login dan kolom email terisi otomatis.

### 3. Login

Buka `/login`, masukkan email/username dan password, kemudian klik **Masuk**. Pengguna akan diarahkan ke `/dashboard`.

> Autentikasi saat ini masih berupa simulasi frontend. Validasi akun melalui server, enkripsi password, reset password, dan token autentikasi memerlukan backend/API.

### 4. Dashboard

Dashboard menampilkan nama dan nomor pendaftaran, status biodata, status dokumen, status seleksi, persentase progres, tahapan pendaftaran, serta pengumuman yang dapat diklik. Pengguna juga dapat mengganti dan memotong foto profil.

Pada HP, sidebar otomatis berubah menjadi navigasi bawah.

### 5. Pengisian Biodata

Klik menu **Biodata** atau tombol **Lengkapi Biodata**. Pengisian terdiri dari tujuh tahap:

1. **Data Pribadi**: nama, tempat dan tanggal lahir, jenis kelamin, WhatsApp, serta email.
2. **Alamat**: alamat lengkap, provinsi, kabupaten/kota, kecamatan, kelurahan/desa, dan kode pos.
3. **Pendidikan**: sekolah, NISN, jenis sekolah, jurusan, dan tahun lulus.
4. **Orang Tua**: nama dan pekerjaan orang tua serta nomor WhatsApp orang tua.
5. **Pilihan Program Studi**: jalur pendaftaran serta program studi pilihan pertama dan kedua.
6. **Berkas**: pas foto, Kartu Keluarga, Ijazah/SKL, dan rapor opsional.
7. **Konfirmasi**: periksa ringkasan, centang pernyataan, lalu klik **Finalisasi Data**.

Gunakan **Simpan Sementara** untuk menyimpan isian sebelum finalisasi. Dokumen menerima PDF, JPG, atau PNG dengan ukuran maksimal 5 MB. Pas foto hanya menerima JPG atau PNG.

### 6. Pengumuman

Klik menu **Pengumuman** atau pengumuman pada dashboard. Halaman ini menampilkan identitas pendaftar, dua pilihan program studi, status seleksi, pengumuman berbentuk accordion, dan jadwal SPMB.

### 7. Logout

Klik **Logout** pada sidebar atau navigasi bawah. Sesi dihapus dan pengguna diarahkan kembali ke login.

## Penyimpanan Data

Versi saat ini belum menggunakan database. Data demo disimpan melalui:

- `sessionStorage` untuk sesi pengguna.
- `localStorage` untuk profil registrasi, draft biodata, nama dokumen, status penyelesaian, dan foto profil.

Konsekuensinya:

- Data tidak tersinkron ke perangkat lain.
- Menghapus data browser akan menghapus data lokal.
- File asli belum dikirim ke server; aplikasi hanya menyimpan nama file.
- Implementasi produksi memerlukan backend, database, penyimpanan file, dan autentikasi aman.

## Struktur Folder

```text
src/
├── assets/       # Gambar dan logo
├── components/   # Layout autentikasi dan proteksi rute
├── context/      # State autentikasi
├── layouts/      # Layout dashboard
├── pages/        # Halaman aplikasi
├── utils/        # Crop gambar dan helper penyimpanan
├── App.jsx       # Konfigurasi rute
└── main.jsx      # Entry point React
```

## Langkah Commit dan Push ke GitHub

### Jika repository sudah terhubung

1. Periksa perubahan dan branch aktif:

   ```bash
   git status
   git branch --show-current
   ```

2. Tambahkan perubahan dan buat commit:

   ```bash
   git add .
   git commit -m "feat: menyempurnakan website SPMB"
   ```

3. Ambil perubahan terbaru untuk mengurangi konflik:

   ```bash
   git pull --rebase origin main
   ```

4. Push ke GitHub:

   ```bash
   git push origin main
   ```

Ganti `main` apabila proyek menggunakan nama branch lain.

### Jika repository lokal belum terhubung

```bash
git init
git add .
git commit -m "feat: initial website SPMB"
git branch -M main
git remote add origin https://github.com/USERNAME/NAMA-REPOSITORY.git
git push -u origin main
```

Ganti `USERNAME` dan `NAMA-REPOSITORY` sesuai repository GitHub.

### Push melalui branch fitur

Untuk kolaborasi, gunakan branch terpisah:

```bash
git switch -c fitur/nama-fitur
git add .
git commit -m "feat: menambahkan nama fitur"
git push -u origin fitur/nama-fitur
```

Setelah push, buat Pull Request dari branch fitur menuju `main` melalui GitHub.

## Penanganan Konflik Sederhana

Jika `git pull --rebase` menemukan konflik:

1. Buka file yang ditandai konflik.
2. Pilih dan rapikan perubahan yang akan digunakan.
3. Tambahkan file yang sudah diperbaiki:

   ```bash
   git add NAMA-FILE
   git rebase --continue
   ```

4. Jalankan lint dan build, kemudian push kembali.

Jangan menggunakan `git push --force` pada branch bersama tanpa koordinasi tim.

## Pengembangan Lanjutan

Prioritas implementasi produksi:

1. Membuat API dan database pendaftaran.
2. Menggunakan autentikasi berbasis token atau session server.
3. Menambahkan verifikasi email dan reset password.
4. Mengunggah dokumen ke object storage.
5. Menyediakan dashboard administrator.
6. Mengambil jadwal dan pengumuman dari database.
7. Menambahkan pengujian komponen dan end-to-end.

## Lisensi

Proyek ini dikembangkan untuk kebutuhan sistem SPMB. Sesuaikan informasi lisensi dan kepemilikan repository sebelum publikasi.
