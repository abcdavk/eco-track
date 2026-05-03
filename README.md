# Eco-Track — Farieza Davie Rieawan

[Go to website](https://ecotrack.abcdavk.my.id)

## Tentang Project
Eco-Track adalah website yang membantu pengguna mengetahui seberapa besar emisi karbon yang mereka hasilkan dalam kehidupan sehari-hari.  
Melalui input sederhana seperti jarak perjalanan dan penggunaan energi, pengguna dapat melihat estimasi dampak lingkungan mereka secara langsung.

## Masalah Iklim yang Ingin Disoroti
Perubahan iklim semakin memburuk akibat meningkatnya emisi karbon dari aktivitas manusia sehari-hari, seperti transportasi dan penggunaan energi listrik.  
Banyak orang belum menyadari bahwa kebiasaan kecil yang dilakukan setiap hari dapat memberikan dampak besar terhadap lingkungan.  

Melalui Eco-Track, saya ingin meningkatkan kesadaran pengguna dengan memberikan visualisasi sederhana dan feedback langsung mengenai emisi karbon mereka, sehingga mereka terdorong untuk mulai menerapkan kebiasaan yang lebih ramah lingkungan.

## Jalur Spesialisasi yang Dipilih
- [X] A1. Real-time UI Feedback
- [X] A2. Interactive Tips (Action Plan)
- [ ] A3. Dynamic Result Display
- [ ] B1. Static File Serving
- [ ] B2. The Carbon API
- [ ] B3. Smart Validation

(Centang [x] yang berhasil diselesaikan)

## Cara Menjalankan Project
1. Clone/extract project
2. Jalankan `npm install`
3. Jalankan dengan `npm run dev`
4. Buka browser `http://localhost:3000`

## Troubleshoot
### 1. Jika server tidak berjalan

```sh
[nodemon] clean exit - waiting for changes before restart
```

Ubah variabel `PORT` di `app.js`, misal menjadi `3001`

```js
const express = require('express');
const path = require('path');

const app = express(); 
const PORT = 3001;

app.use(express.json());

// Serve static files dari folder public
app.use(express.static(path.join(__dirname, 'public'), {
  extensions: ['html']
}));

app.listen(PORT, () => {
  console.log('Server berjalan di http://localhost:3000');
});

```

### 2. CSS tidak ter-update
Refresh halaman dengan `ctrl+shift+R`

## Tantangan yang Dihadapi
Kesulitan yang saya hadapi saat membuat projek ini adalah saat membuat hero section agar responsive di mobile. Ide saya diawal adalah membuat gambar hutan yang semula jika di desktop di sebelah kanan menjadi wallpaper hero section. Background tersebut menyebabkan horizontal scrolling yang membuat tampilannya aneh. Saya benar benar tidak tau cara mengatasinya, jadi terpaksa harus menggunakan cara terakhir yaitu `overflow-x: hidden` di body.