# Login API Specification

- ### Endpoint : /login

- ### Method : POST

- ### Deskripsi :

  API ini digunakan untuk melakukan login sebagai salah satu otorisasi yang diperlukan untuk mengakses API ini

- ### Note :
  Untuk endpoint login ini akan men-generate sebuah cookie yang diberi nama "TokenJWT" dan cookie tersebut berlaku selama 2 hari

### Request body (raw->json) :

```json
{
  "username": "...",
  "password": "..."
}
```

### Response body success :

```json
{
  "message": "Login Success",
  "note": "Success",
  "payload": "",
  "status_code": {
    "code": 200,
    "status": "OK"
  },
  "metadata": ""
}
```

### Response body error :

```json
{
  "message": "Invalid username or password", // 400 - ketika username atau password yang dimasukkan salah / tidak terdaftar
  "message": "Status akun sudah nonaktif", // 400 - ketika login menggunakan akun yang sudah tidak aktif
  "message": "Logout terlebih dahulu", // 400 - ketika sesi login masih berlaku tetapi mencoba login kembali tanpa logout
  "message": "Internal server error" // 500 - ketika terjadi error pada saat melakukan perintah ke database atau error lain yang berhubungan dengan server
}
```
