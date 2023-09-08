# User Management API Specification

## 1. List user

### Endpoint : /users

### Method : GET

### User role akses : Supervisor, Superadmin

### Authorization : token

### Deskripsi : API ini digunakan untuk mengambil semua data user dari database

### Response body success :

```json
{
  "data": {
    "id": "...",
    "nama": "...",
    "role": "...",
    "status_user": "..."
  }
}
```

### Response body error :

```json
{
  "message": "Unauthorized", //401
  "message": "Data tidak ditemukan", //404
  "message": "Akses ditolak", // 403
  "message": "..." // 500
}
```

## 2. Detail user by ID

### Endpoint : /users/detail/{id}

### Method : GET

### User role akses : Supervisor, Superadmin

### Authorization : token

### Parameter query : id

### Deskripsi : API ini digunakan untuk mengambil detail data user

### Response body success :

```json
{
  "data": {
    "id": "...",
    "nama": "...",
    "email": "...",
    "role": "...",
    "status": "..."
  }
}
```

### Response body error :

```json
{
  "message": "Unauthorized", //401
  "message": "Data tidak ditemukan", //404
  "message": "Akses ditolak", // 403
  "message": "..." //500
}
```

## 3. Create user

### Endpoint : /users/create

### Method : POST

### User role akses : Supervisor, Superadmin

### Authorization : token

### Deskripsi : API ini digunakan untuk membuat user baru

### Request body :

```json
{
  "nama": "...",
  "username": "...",
  "password": "...",
  "email": "...",
  "role": "..."
}
```

### Response body error :

```json
{
  "message": "Unauthorized", // 401
  "message": "mohon isi field dengan benar", // 400
  "message": "email sudah terdaftar", // 400
  "message": "username sudah terdaftar", // 400
  "message": "Akses ditolak", // 403
  "message": "..." // 500
}
```

## 4. Update user

### Endpoint : /users/update/{id}

### Method : PATCH

### User role akses : Supervisor, Superadmin

### Authorization : token

### Parameter query : id

### Deskripsi : API ini digunakan untuk meng-update data user

### Request body :

```json
{
  "nama": "...",
  "email": "...",
  "role": "..."
}
```

### Response body success :

```json
{
  "message": "Update success", // 200
  "payload": {
    "changedRows": 1
  }
}
```

### Response body error :

```json
{
  "message": "Unauthorized", // 401
  "message": "Data invalid", // 400
  "message": "..." // 500
}
```

## 5. Nonactive / activate user

### Endpoint : /users/updateStatus/{id}

### Method : PATCH

### Authorization : token

### Parameter query : id

### Deskripsi : API ini digunakan untuk menonaktifkan / mengaktifkan user

### Request body :

```json
{
  "status": "..."
}
```

### Response body success :

```json
{
  "message": "Update status success" // 200
}
```

### Response body error :

```json
{
  "message": "Unauthorized", // 401
  "message": "..." // 500
}
```
