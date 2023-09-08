# Login API Specification

### Endpoint : /login

### Method : POST

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
  "message": "Invalid username or password", // 401
  "message": "..." // 500
}
```
