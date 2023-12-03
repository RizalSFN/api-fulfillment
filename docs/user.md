# User Management API Specification

## 1. List user

- ### Endpoint : /users

- ### Method : GET

- ### User role akses : Supervisor, Superadmin

- ### Parameter :

  - #### page (optional) :
    Digunakan untuk mengatur halaman yang dipakai untuk menampilkan data (Default : 1)
  - #### limit (optional) :
    Digunakan untuk membatasi data yang akan ditampilkan (Default : 10)

- ### Authorization : Bearer token

- ### Deskripsi :

  API ini digunakan untuk mengambil semua data user dari database

- ### Response body success :

  ```json
  {
    "message": "List User",
    "note": "Success",
    "payload": [
      {
        "id": 1,
        "nama": "Rizal Sofiana",
        "role": "Superadmin",
        "status_user": "aktif"
      },...
    ],
    "status_code": {
      "code": 200,
      "status": "OK"
    },
    "metadata": {
      "currentPage": 1,
      "totalPages": 2
    }
  }
  ```

- ### Response body error :

  ```json
  {
    "message": "Invalid token", //401 - ketika token akses sudah tidak berlaku, token akses tidak ada, atau token akses salah
    "message": "Data not found", //404 - ketika data tidak ditemukan
    "message": "Access denied", // 403 - ketika mengakses endpoint ini dengan role "karyawan"
    "message": "Internal server error" // 500 - ketika terjadi error pada saat melakukan perintah ke database atau error lain yang berhubungan dengan server
  }
  ```

## 2. Detail user by ID

- ### Endpoint : /users/detail/{id}

- ### Method : GET

- ### Parameter :

  - #### id :
    Ditulis di url resourcenya langsung, digunakan sebagai kunci utama untuk menentukan data user mana yang akan diambil secara detail

- ### User role akses : Supervisor, Superadmin

- ### Authorization : Bearer token

- ### Deskripsi :

  API ini digunakan untuk mengambil detail data user

- ### Response body success :

  ```json
  {
    "message": "Detail User by Id",
    "note": "Success",
    "payload": [
      {
        "id": 1,
        "nama": "Rizal Sofiana",
        "email": "rizal@gmail.com",
        "role": "Superadmin",
        "status_user": "aktif",
        "created_at": "2023-08-01T09:57:16.000Z"
      }
    ],
    "status_code": {
      "code": 200,
      "status": "OK"
    },
    "metadata": ""
  }
  ```

- ### Response body error :

  ```json
  {
    "message": "Invalid token", //401 - ketika token akses sudah tidak berlaku, token akses tidak ada, atau token akses salah
    "message": "Data not found", //404 - ketika data tidak ditemukan
    "message": "Access denied", // 403 - ketika mengakses endpoint ini dengan role "karyawan"
    "message": "Internal server error" //500 - ketika terjadi error pada saat melakukan perintah ke database atau error lain yang berhubungan dengan server
  }
  ```

## 3. Create user

- ### Endpoint : /users/create

- ### Method : POST

- ### User role akses : Supervisor, Superadmin

- ### Authorization : Bearer token

- ### Deskripsi :

  API ini digunakan untuk membuat user baru

- ### Request body (raw->json) :

  ```json
  {
    "nama": "...",
    "username": "...",
    "password": "...",
    "email": "...",
    "role": "..." // akses = Superadmin
  }
  ```

- ### Response body success :

  ```json
  {
    "message": "Create New User Success",
    "note": "Success",
    "payload": "",
    "status_code": {
      "code": 200,
      "status": "OK"
    },
    "metadata": ""
  }
  ```

- ### Response body error :

  ```json
  {
    "message": "Invalid token", // 401 - ketika token akses sudah tidak berlaku, token akses tidak ada, atau token akses salah
    "message": "Access denied", // 403 - ketika mengakses endpoint ini dengan role "karyawan"
    "message": "Cannot add role", // 400 - ketika role "supervisor" ingin menginputkan role pada saat menambahkan user baru
    "message": "email already exist", // 400 - ketika email dari user baru yang akan ditambahkan sudah ada
    "message": "username already exist", // 400 - ketika username dari user baru yang akan ditambahkan sudah ada
    "message": "Nama is required", // 400 - ketika nama dari user baru yang ingin ditambahkan tidak diisi
    "message": "Email is required", // 400 - ketika email dari user baru yang ingin ditambahkan tidak diisi
    "message": "Role is required", // 400 - ketika role dari user baru yang ingin ditambahkan tidak diisi
    "message": "username must have 12 character or more", // 400 - ketika username dari user baru yang akan ditambahkan berjumlah kurang dari 12 karakter
    "message": "Password must have contains alphanumeric", // 400 - ketika password dari user baru yang akan ditambahkan tidak mengandung huruf dan angka
    "message": "Password must have 12 character or more", // 400 - ketika password dari user baru yang akan ditambahkan berjumlah kurang dari 12 karakter
    "message": "Invalid email", // 400 - ketika email dari user baru yang akan ditambahkan tidak valid atau bukan merupakan email
    "message": "Cannot create Superadmin account", // 400 - ketika pada saat ingin menambahkan user baru tapi dengan role "superadmin"
    "message": "Internal server error" // 500 - ketika terjadi error pada saat melakukan perintah ke database atau error lain yang berhubungan dengan server
  }
  ```

## 4. Update user

- ### Endpoint : /users/update/{id}

- ### Method : PATCH

- ### Parameter :

  - #### id :
    Ditulis di url resourcenya langsung, digunakan sebagai kunci utama untuk menentukan user mana yang datanya akan diupdate

- ### User role akses : Supervisor, Superadmin

- ### Authorization : Bearer token

- ### Deskripsi :

  API ini digunakan untuk meng-update data user

- ### Request body (raw->json) :

  ```json
  {
    "nama": "...", (optional)
    "username": "...", (optional)
    "email": "...", (optional)
    "role": "..." (optional) // akses : superadmin
  }
  ```

### Response body success :

```json
{
  "message": "Update User Success",
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
  "message": "Invalid token", // 401 - ketika token akses sudah tidak berlaku, token akses tidak ada, atau token akses salah
  "message": "Access denied", // 403 - ketika mengakses endpoint ini dengan role "karyawan"
  "message": "Invalid email", // 400 - ketika ingin memperbarui email, tapi email baru yang akan dikirim tidak valid atau bukan merupakan email
  "message": "Cannot update password", // 400 - ketika ingin memperbarui password
  "message": "Username already exist", // 400 - ketika ingin memperbarui username, tapi username baru yang akan dikirim sudah ada
  "message": "Email already exist", // 400 - ketika ingin memperbarui email, tapi email baru yang akan dikirim sudah ada
  "message": "Role not available", // 400 - ketika ingin memperbarui role, tapi role baru yang akan dikirim tidak tersedia
  "message": "Cannot update role", // 400 - ketika role "supervisor" ingin mengupdate role user lainnya
  "message": "Cannot update user", // 400 - ketika role "supervisor" ingin mengupdate user lain yang memiliki role selain "karyawan" atau ketika role "superadmin" ingin mengupdate user yang memiliki role yang sama dengannya
  "message": "Internal Server Error" // 500 - ketika terjadi error pada saat melakukan perintah ke database atau error lain yang berhubungan dengan server
}
```

## 5. Nonactive / activate user

- ### Endpoint : /users/status

- ### Method : PATCH

- ### Authorization : token

- ### Parameter :

  - #### stat :
    Merupakan parameter untuk status baru yang akan dikirim, digunakan untuk mengubah status dari seorang user
  - #### id :
    Digunakan sebagai kunci utama untuk menentukan user mana yang akan diupdate status nya

- ### Deskripsi :

  API ini digunakan untuk menonaktifkan / mengaktifkan user

- ### Response body success :

  ```json
  {
    "message": "Update Status User Success",
    "note": "Success",
    "payload": "",
    "status_code": {
      "code": 200,
      "status": "OK"
    },
    "metadata": ""
  }
  ```

- ### Response body error :

  ```json
  {
    "message": "Invalid token", // 401 - ketika token akses sudah tidak berlaku, token akses tidak ada, atau token akses salah
    "message": "Invalid param id", // 400 - ketika parameter id tidak diisi
    "message": "Invalid param stat", // 400 - ketika parameter stat tidak diisi
    "message": "Access denied", // 403 - ketika mengakses endpoint ini dengan role "karyawan"
    "message": "Cannot deactivate user", // 400 - ketika tidak bisa menonaktifkan user
    "message": "Cannot activate user", // 400 - ketika tidak bisa mengaktifkan user
    "message": "Internal server error" // 500 - ketika terjadi error pada saat melakukan perintah ke database atau error lain yang berhubungan dengan server
  }
  ```
