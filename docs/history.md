# History API Specification

### Endpoint : /history

### Method : GET

### Authorization : token

### Deskripsi : API ini digunakan untuk mengambil semua data histori (login&logout, user management, product management)

### Response body success :

```json
{
    "data": [
        {
            ...
        },
    ]
}
```

### Response body error :

```json
{
  "message": "Unauthorized", //401
  "message": "Not found", //404
  "message": "Internal server error" //500
}
```
