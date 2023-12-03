# Logout User API Specification

- ### Endpoint : /logout

- ### Method : DELETE

- ### Authorization : Bearer token

- ### Deskripsi :

  API ini digunakan untuk logout

- ### Response body success :

  ```json
  {
    "message": "Logout Success",
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
    "message": "Internal server error" // 500 - ketika terjadi error pada saat melakukan perintah ke database atau error lain yang berhubungan dengan server
  }
  ```
