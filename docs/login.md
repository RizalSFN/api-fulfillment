# Login API Specification

### Endpoint : /login

### Method : POST

### Deskripsi : API ini digunakan untuk melakukan login sebagai salah satu otorisasi yang diperlukan untuk mengakses API ini

### Request body :

```json
{
  "username": "...",
  "password": "..."
}
```

### Response body success :

```json
{
  "message": "Login success"
}
```

### Response body error :

```json
{
  "message": "Invalid username or password", // 400
  "message": "Status akun sudah nonaktif", // 400
  "message": "Logout terlebih dahulu", // 400
  "message": "Internal server error" // 500
}
```
