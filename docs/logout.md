# Logout User API Specification

### Endpoint : /logout

### Method : DELETE

### Authorization : token

### Deskripsi : API ini digunakan untuk logout

### Response body success :

```json
{
  // 204
}
```

### Response body error :

```json
{
  "error": "Unauthorized", // 401
  "error": "Internal server error" // 500
}
```
