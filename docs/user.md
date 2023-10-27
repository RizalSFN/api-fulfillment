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
  "data": [
    {
      "id": "...",
      "nama": "...",
      "role": "...",
      "status_user": "..."
    }
  ]
}
```

### Response body error :

```json
{
  "message": "Unauthorized", //401
  "message": "Data tidak ditemukan", //404
  "message": "Akses ditolak", // 403
  "message": "Internal server error" // 500
}
```

## 2. Detail user by ID

### Endpoint : /users/detail/{id}

### Method : GET

### User role akses : Supervisor, Superadmin

### Authorization : token

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
  "message": "Internal server error" //500
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
  "role": "..." // akses = Superadmin
}
```

### Response body error :

```json
{
  "message": "Invalid token", // 401
  "message": "Unaccess", // 403
  "message": "Cannot add role", // 400
  "message": "email already exist", // 400
  "message": "username already exist", // 400
  "message": "Nama is required", // 400
  "message": "Email is required", // 400
  "message": "Role is required", // 400
  "message": "username must have 12 character or more", // 400
  "message": "Password must have contains alphanumeric", // 400
  "message": "Password must have 12 character or more", // 400
  "message": "Invalid email", // 400
  "message": "Cannot create Superadmin account", // 400
  "message": "Internal server error" // 500
}
```

## 4. Update user

### Endpoint : /users/update/{id}

### Method : PATCH

### User role akses : Supervisor, Superadmin

### Authorization : token

### Deskripsi : API ini digunakan untuk meng-update data user

### Request body :

```json
{
  "nama": "...",
  "username": "...",
  "email": "...",
  "role": "..." // akses : superadmin
}
```

### Response body success :

```json
{
  "message": "Update success" // 200
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

### Endpoint : /users/status

### Method : PATCH

### Authorization : token

### Parameter query : stat, id

### Deskripsi : API ini digunakan untuk menonaktifkan / mengaktifkan user

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
