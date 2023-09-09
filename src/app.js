const express = require("express");
const port = 3000;
const app = express();
const loginMiddleware = require("./middleware/middleware-login.js");
const successResponse = require("./response/success-response.js");
const logoutMiddleware = require("./middleware/middleware-logout.js");
const cookieParser = require("cookie-parser");
const verifyToken = require("./middleware/verify-token.js");
const listUser = require("./middleware/user/list-users.js");
const createUser = require("./middleware/user/create-user.js");
const detailUser = require("./middleware/user/detail-user.js");
const updateUser = require("./middleware/user/update-user.js");
const updateStatus = require("./middleware/user/update-status-user.js");
const listProduct = require("./middleware/barang/list-product.js");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// <===============================Route Default=============================>
app.get("/", (req, res) => {
  successResponse(
    200,
    "Welcome to Fulfillment API",
    "API Running Success",
    res
  );
});

// <=====================================Login===============================>
app.post("/login", loginMiddleware, (req, res) => {
  const token = req.token;
  res.cookie("TokenJWT", token, { httpOnly: true, maxAge: 172800000 });
  successResponse(200, "Login success", "Success", res);
});

// <===============================User Management===========================>
app.get("/users", verifyToken, listUser, (req, res) => {
  const data = req.userData;
  successResponse(200, data, "List user", res);
});

app.get("/users/detail/:id", verifyToken, detailUser, (req, res) => {
  successResponse(200, req.userDetail, "Detail user", res);
});

app.post("/users/create", verifyToken, createUser, (req, res) => {
  successResponse(200, "Data berhasil diupload", "Create success", res);
});

app.patch("/users/update/:id", verifyToken, updateUser, (req, res) => {
  successResponse(200, "Update berhasil", "success", res);
});

app.patch(
  "/users/update/status/:status/:id",
  verifyToken,
  updateStatus,
  (req, res) => {
    successResponse(200, "Status berhasil diperbaharui", "Success", res);
  }
);

// <===============================User Management===========================>
app.get("/product", verifyToken, listProduct, (req, res) => {
  successResponse(200, req.productData, "Success", res);
});

// <=================================Logout==================================>
app.delete("/logout", verifyToken, logoutMiddleware, (req, res) => {
  res.clearCookie("TokenJWT");
  successResponse(200, "Redirect ke hal. login", "Logout success", res);
});

app.listen(port, () => {
  console.log(`Your app running at port : ${port}`);
});
