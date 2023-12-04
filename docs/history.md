# History API Specification

## 1. History users

- ### Endpoint : /users/history

- ### Method : GET

- ### Parameter :

  - #### page (optional) :
    Digunakan untuk mengatur halaman yang dipakai untuk menampilkan data (Default : 1)
  - #### limit (optional) :
    Digunakan untuk membatasi data yang akan ditampilkan (Default : 10)

- ### Authorization : Bearer token

- ### Deskripsi :

  API ini digunakan untuk mengambil semua data histori dibagian pengelolaan user termasuk aktifitas login dan logout

- ### Response body success :

  ```json
  {
      "message": "History activity users",
      "note": "Success",
      "payload": [
          {
              "id": 1,
              "id_user": null,
              "id_user_aksi": 18,
              "nama_user_aksi": "Kanza Keysal",
              "keterangan_aksi": "Menambah user baru",
              "created_at": "2023-10-27T03:46:40.000Z"
          },...
      ],
      "status_code": {
          "code": 200,
          "status": "OK"
      },
      "metadata": {
          "currentPage": 1,
          "totalPages": 9
      }
  }
  ```

- ### Response body error :

  ```json
  {
    "message": "Invalid token", //401 - ketika token akses sudah tidak berlaku, token akses tidak ada, atau token akses salah
    "message": "Access denied", //403 - ketika mengakses endpoint ini dengan role "karyawan"
    "message": "Data not found", //404 - ketika mengakses halaman paginasi melebihi batas
    "message": "Internal server error" //500 - ketika terjadi error pada saat melakukan perintah ke database atau error lain yang berhubungan dengan server
  }
  ```

## 2. History product

- ### Endpoint : /product/history

- ### Method : GET

- ### Parameter :

  - #### page (optional) :
    Digunakan untuk mengatur halaman yang dipakai untuk menampilkan data (Default : 1)
  - #### limit (optional) :
    Digunakan untuk membatasi data yang akan ditampilkan (Default : 10)

- ### Authorization : Bearer token

- ### Deskripsi :

  API ini digunakan untuk mengambil semua data histori dibagian pengelolaan user termasuk aktifitas login dan logout

- ### Response body success :

  ```json
  {
      "message": "History activity products",
      "note": "Success",
      "payload": [
          {
              "id": 4,
              "id_barang": 11,
              "id_user_aksi": 1,
              "nama_user_aksi": "Rizal Sofiana",
              "keterangan_aksi": "Menambah varian baru",
              "created_at": "2023-11-06T02:55:58.000Z"
          },...
      ],
      "status_code": {
          "code": 200,
          "status": "OK"
      },
      "metadata": {
          "currentPage": 1,
          "totalPages": 3
      }
  }
  ```

- ### Response body error :

  ```json
  {
    "message": "Invalid token", //401 - ketika token akses sudah tidak berlaku, token akses tidak ada, atau token akses salah
    "message": "Access denied", //403 - ketika mengakses endpoint ini dengan role "karyawan"
    "message": "Data not found", //404 - ketika mengakses halaman paginasi melebihi batas
    "message": "Internal server error" //500 - ketika terjadi error pada saat melakukan perintah ke database atau error lain yang berhubungan dengan server
  }
  ```
