# Product Management API Specification

## 1. List product

- ### Endpoint : /product

- ### Method : GET

- ### Parameter :

  - #### page (optional) :
    Digunakan untuk mengatur halaman yang dipakai untuk menampilkan data (Default : 1)
  - #### limit (optional) :
    Digunakan untuk membatasi data yang akan ditampilkan (Default : 10)

- ### Authorization : Bearer token

- ### Deskripsi :

  API ini digunakan untuk memanggil semua data product dari database

- ### Response body success :

  ```json
  {
    "message": "List Product",
    "note": "Success",
    "payload": [
      {
        "id": 3,
        "Nama barang": "Jas Hujan",
        "SKU": "MAN 228",
        "Deskripsi": "bahan tebal berkualitas",
        "Brand": "Mantela New Edition Bandung"
      },...
    ],
    "status_code": {
      "code": 200,
      "status": "OK"
    },
    "metadata": {
      "currentPage": 1,
      "totalPages": 1
    }
  }
  ```

- ### Response body error :

  ```json
  {
    "message": "Invalid token", //401 - ketika token akses sudah tidak berlaku, token akses tidak ada, atau token akses salah
    "message": "Data not found", //404 - ketika data tidak ditemukan
    "message": "Internal server error" //500 - ketika terjadi error pada saat melakukan perintah ke database atau error lain yang berhubungan dengan server
  }
  ```

## 2. Detail product

- ### Endpoint : /product/detail/{id}

- ### Method : GET

- ### Parameter :

  - #### id :
    Digunakan sebagai kunci utama dalam pemanggilan detail data barang

- ### Authorization : Bearer token

- ### Deskripsi :

  API ini digunakan untuk memanggil data lengkap product dari database

- ### Response body success :

  ```json
  {
    "message": "Detail Product by Id",
    "note": "Success",
    "payload": {
      "id": 5,
      "SKU": "Nisa set",
      "Deskripsi": "bahan cotton combed nyaman dipakai",
      "Brand": "Hoofla",
      "varians": [
        {
          "ukuran": "L",
          "stok": 20,
          "harga": "110000",
          "warna": "oren",
          "Status": "ready"
        },...
      ]
    },
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
  "message": "Invalid token", //401 - ketika token akses sudah tidak berlaku, token akses tidak ada, atau token akses salah
  "message": "Data not found", //404 - ketika data tidak ditemukan
  "message": "Internal server error" //500 - ketika terjadi error pada saat melakukan perintah ke database atau error lain yang berhubungan dengan server
}
```

## 3. Create product

- ### Endpoint : /product/create

- ### Method : POST

- ### Authorization : Bearer token

- ### Deskripsi :

  API ini digunakan untuk membuat data product baru

- ### Request body (raw->json) :

  ```json
  {
    "nama_barang": "...",
    "sku": "...",
    "deskripsi": "...",
    "brand": "..."
  }
  ```

- ### Response body success :

  ```json
  {
    "message": "Create New Product Success",
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
  "message": "Invalid token", //401 - ketika token akses sudah tidak berlaku, token akses tidak ada, atau token akses salah
  "message": "Product already exist", //400 - ketika product baru yang akan ditambahkan sudah ada
  "message": "Nama barang is required", //400 - ketika nama dari product baru yang ingin ditambahkan tidak diisi
  "message": "SKU is required", //400 - ketika SKU dari product baru yang ingin ditambahkan tidak diisi
  "message": "Deskripsi is required", //400 - ketika deskripsi dari product baru yang ingin ditambahkan tidak diisi
  "message": "Brand is required", //400 - ketika brand dari product baru yang ingin ditambahkan tidak diisi
  "message": "Invalid brand name", //400 - ketika brand yang diisi saat menambahkan product baru salah / tidak terdaftar
  "message": "Internal server error" //500 - ketika terjadi error pada saat melakukan perintah ke database atau error lain yang berhubungan dengan server
}
```

## 4. Create varian product

- ### Endpoint : /product/varian/create

- ### Method : POST

- ### Authorization : Bearer token

- ### Deskripsi :

  API ini digunakan untuk membuat varian baru dari product

- ### Request body (raw->json) :

  ```json
  {
    "id_barang": "...",
    "stok": "...",
    "ukuran": "...",
    "harga": "...",
    "warna": "..."
  }
  ```

- ### Response body success :

  ```json
  {
    "message": "Create Variant Product Success",
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
    "message": "id barang is required", //400 - ketika id product tidak diisi
    "message": "Invalid id barang", //400 - ketika id product yang diinputkan salah / tidak ada
    "message": "Invalid stock", //400 - ketika stok tidak diisi / value yang diinputkan bukan angka
    "message": "Invalid price", //400 - - ketika harga tidak diisi / value yang diinputkan bukan angka
    "message": "Invalid size", //400 - ketika ukuran tidak diisi / tidak ada
    "message": "Invalid colour", //400 - ketika warna tidak diisi / tidak ada
    "message": "Internal server error" // 500 - ketika terjadi error pada saat melakukan perintah ke database atau error lain yang berhubungan dengan server
  }
  ```

## 5. Update product

- ### Endpoint : /product/update/{id}

- ### Method : PATCH

- ### Parameter :

  - #### id :
    Digunakan sebagai kunci utama untuk menentukan product mana yang akan diupdate

- ### Authorization : Bearer token

- ### Deskripsi :

  API ini digunakan untuk mengubah product

- ### Request body (raw->json) :

  ```json
  {
    "nama_barang": "...", (optional)
    "deskripsi": "..." (optional)
  }
  ```

- ### Response body success :

  ```json
  {
    "message": "Update Product Success",
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
    "message": "Cannot update sku", // 400 - ketika ingin mengupdate sku yang memang tidak diperbolehkan diupdate
    "message": "Cannot update sku", // 400 - ketika ingin mengupdate pembuat data barang yang memang tidak diperbolehkan diupdate
    "message": "Cannot update brand", // 400 - ketika ingin mengupdate brand barang yang memang tidak diperbolehkan diupdate
    "message": "Invalid data", // 400 - ketika ingin mengupdate tetapi data yang dikirimkan tidak sesuai / salah
    "message": "Internal server error" // 500 - ketika terjadi error pada saat melakukan perintah ke database atau error lain yang berhubungan dengan server
  }
  ```

## 6. Update status varian product

- ### Endpoint : /product/update/status/{status}?id={id}

- ### Method : PATCH

- ### Parameter :

  - #### status :
    Digunakan sebagai data status varian yang baru
  - #### id :
    Digunakan sebagai kunci utama (id varian) untuk melakukan perubahan status dari sebuah varian

- ### Authorization : Bearer token

- ### Deskripsi :

  API ini digunakan untuk mengubah status varian product

- ### Response body success :

  ```json
  {
    "message": "Update Status Variant Product Success",
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
    "message": "Invalid token", //401 - ketika token akses sudah tidak berlaku, token akses tidak ada, atau token akses salah
    "message": "Invalid param status", //400 - ketika data parameter status yang dikirimkan salah / tidak ada
    "message": "Invalid param id", //400 - ketika data parameter id yang dikirimkan salah / tidak ada
    "message": "Invalid data", //400 - ketika gagal mengupdate status karena data yang dikirimkan tidak sesuai
    "message": "Internal server error" //500 - ketika terjadi error pada saat melakukan perintah ke database atau error lain yang berhubungan dengan server
  }
  ```

## 7. Create brand

- ### Endpoint : /product/brand/create

- ### Method : POST

- ### Authorization : Bearer token

- ### Deskripsi :

  API ini digunakan untuk menambah brand baru

- ### Request body (raw->json) :

  ```json
  {
    "id": "...",
    "nama": "..."
  }
  ```

- ### Response body success :

  ```json
  {
    "message": "Create New Brand Success",
    "note": "Success",
    "payload": "",
    "status_code": {
      "code": 200,
      "status": "OK"
    },
    "metadata": ""
  }
  ```

- ### Respon body error :
  ```json
  {
    "message": "Invalid token", // 401 - ketika token akses sudah tidak berlaku, token akses tidak ada, atau token akses salah
    "message": "Internal server error" // 500 - ketika terjadi error pada saat melakukan perintah ke database atau error lain yang berhubungan dengan server
  }
  ```
