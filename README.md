# SPMB 2026

Website frontend Sistem Penerimaan Mahasiswa Baru (SPMB) yang dibuat menggunakan React dan Vite.

## Persyaratan

Pastikan perangkat sudah memiliki:

- Node.js versi 20 atau lebih baru.
- npm.

Periksa versi Node.js dan npm melalui terminal:

```bash
node --version
npm --version
```

## Langkah Menjalankan Website

1. Buka terminal pada folder proyek `spmb-tki`.

2. Instal seluruh dependency:

   ```bash
   npm install
   ```

3. Jalankan development server:

   ```bash
   npm run dev
   ```

4. Buka alamat yang ditampilkan oleh Vite pada browser. Alamat default biasanya:

   ```text
   http://localhost:5173
   ```

5. Untuk menghentikan development server, tekan `Ctrl + C` pada terminal.

## Pemeriksaan Kode

Jalankan lint untuk memeriksa kualitas kode:

```bash
npm run lint
```

## Menjalankan Production Build

1. Buat production build:

   ```bash
   npm run build
   ```

2. Jalankan preview dari hasil build:

   ```bash
   npm run preview
   ```

3. Buka alamat preview yang ditampilkan pada terminal, biasanya:

   ```text
   http://localhost:4173
   ```

Hasil production build akan tersimpan di dalam folder `dist`.
