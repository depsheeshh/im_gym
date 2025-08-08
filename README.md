# I'm Gym - Aplikasi Manajemen Member

Sebuah aplikasi web sederhana yang dibangun menggunakan Express.js dan MongoDB untuk mengelola data member gym (CRUD - Create, Read, Update, Delete).

---

## Fitur Utama

-   **Tambah Member Baru**: Mendaftarkan anggota baru ke dalam database.
-   **Lihat Daftar Member**: Menampilkan semua anggota yang terdaftar dalam satu halaman.
-   **Lihat Detail Member**: Melihat informasi lengkap dari satu anggota.
-   **Ubah Data Member**: Memperbarui informasi anggota yang sudah ada.
-   **Hapus Member**: Menghapus data anggota dari database.

---

## Tumpukan Teknologi (Tech Stack)

-   **Backend**: [Express.js](https://expressjs.com/)
-   **Database**: [MongoDB](https://www.mongodb.com/) (dengan Mongoose sebagai ODM)
-   **View Engine**: [EJS (Embedded JavaScript templates)](https://ejs.co/)
-   **Styling**: [Bootstrap 5](https://getbootstrap.com/)

---

## Instalasi dan Setup Lokal

Ikuti langkah-langkah ini untuk menjalankan proyek di komputer lokal Anda.

1.  **Clone Repositori**
    ```bash
    git clone [https://github.com/depsheeshh/im_gym.git](https://github.com/username-anda/im_gym.git)
    ```

2.  **Masuk ke Direktori Proyek**
    ```bash
    cd im_gym
    ```

3.  **Install Dependensi**
    Pastikan Anda memiliki [Node.js](https://nodejs.org/) terpasang, lalu jalankan:
    ```bash
    npm install
    ```

4.  **Konfigurasi Environment Variable**
    Buat file baru dengan nama `.env` di direktori utama proyek, lalu salin konten dari `.env.example` (jika ada) atau isi seperti di bawah ini.
    ```env
    MONGODB_URI=mongodb://localhost:27017/im_gym
    PORT=3000
    ```
    -   Ganti `MONGODB_URI` dengan string koneksi MongoDB Atlas Anda jika menggunakan database cloud.
    -   `PORT` adalah port di mana server akan berjalan.

5.  **Jalankan Server**
    ```bash
    npm start
    ```
    Aplikasi sekarang akan berjalan di `http://localhost:3000`.

---

## Struktur Rute (API Endpoints)

Berikut adalah rute utama yang digunakan dalam aplikasi ini:

| Method | Path                  | Deskripsi                         |
| :----- | :-------------------- | :-------------------------------- |
| `GET`  | `/`                   | Menampilkan halaman utama (home). |
| `GET`  | `/about`              | Menampilkan halaman "Tentang Kami".|
| `GET`  | `/member`             | Menampilkan daftar semua member.  |
| `POST` | `/member`             | Menambahkan member baru.          |
| `GET`  | `/member/:id`         | Menampilkan detail satu member.   |
| `POST` | `/member/update/:id`  | Memperbarui data satu member.     |
| `GET`  | `/member/delete/:id`  | Menghapus satu member.            |

---

## Lisensi

Proyek ini dilisensikan di bawah [Lisensi MIT](LICENSE).
