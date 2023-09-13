# Product Management API Specification

## 1. List product

### Endpoint : /product

### Method : GET

### Authorization : Token

### Deskripsi : API ini digunakan untuk memanggil semua data product dari database

### Response body success :

```json
{
  "data": {
    "id": "...",
    "Nama barang": "...",
    "SKU": "...",
    "Deskripsi": "...",
    "Foto": "...",
    "Brand": "..."
  }
}
```

### Response body error :

```json
{
  "message": "Not found", //404
  "message": "Unauthorized", //401
  "message": "Internal server error" //500
}
```

## 2. Detail product

### Endpoint : /product/detail/{id-product}

### Method : GET

### Authorization : Token

### Deskripsi : API ini digunakan untuk memanggil data lengkap product dari database

### Response body success :

```json
{
    "data" : {
        "id": "...",
        "SKU": "...",
        "Deskripsi": "...",
        "Foto": "...",
        "Brand": "...",
        "varian": [
            {
                "ukuran": "...",
                "stok": "...",
                "harga": "...",
                "Status": "..."
            }, ....
            ]
        }
}
```

### Response body error :

```json
{
  "message": "Not found", //404
  "message": "Unauthorized", //401
  "message": "Internal server error" //500
}
```

## 3. Create product

### Endpoint : /product/create

### Method : POST

### Authorization : Token

### Deskripsi : API ini digunakan untuk membuat data product baru

### Request body :

```json
{
  "nama_barang": "...",
  "SKU": "...",
  "Deskripsi": "...",
  "Foto": "...",
  "Brand": "..."
}
```

### Response body success :

```json
{
  "message": "Upload success"
}
```

### Response body error :

```json
{
  "message": "{field} is required", //400
  "message": "Unauthorized", //401
  "message": "Internal server error" //500
}
```
