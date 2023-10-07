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
const listProduct = require("./middleware/product/list-product.js");
const detailProduct = require("./middleware/product/detail-product.js");
const createProduct = require("./middleware/product/create-product.js");
const createVarian = require("./middleware/product/create-variant.js");
const updateProduct = require("./middleware/product/update-product.js");
const statusProduct = require("./middleware/product/update-status-product.js");
const search = require("./middleware/search/search.js");

app.use(express.json());
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

// <=====================================Search===============================>
app.get("/search", verifyToken, search, (req, res) => {
  successResponse(200, req.dataSearch, "Success", res);
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

app.patch("/users/status", verifyToken, updateStatus, (req, res) => {
  successResponse(200, "Status berhasil diperbaharui", "Success", res);
});

// <============================Product Management===========================>
app.get("/product", verifyToken, listProduct, (req, res) => {
  successResponse(200, req.productData, "Success", res);
});

app.get("/product/detail/:id", verifyToken, detailProduct, (req, res) => {
  successResponse(200, req.detail, "Success", res);
});

app.post("/product/create", verifyToken, createProduct, (req, res) => {
  successResponse(200, "Upload success", "Success", res);
});

app.post("/product/varian/create", verifyToken, createVarian, (req, res) => {
  successResponse(200, "Upload success", "Success", res);
});

app.patch("/product/update/:id", verifyToken, updateProduct, (req, res) => {
  successResponse(200, "Update success", "Success", res);
});

app.patch(
  "/product/update/status/:statusVarian/:id",
  verifyToken,
  statusProduct,
  (req, res) => {
    successResponse(200, "Update success", "Success", res);
  }
);

// <=================================Logout==================================>
app.delete("/logout", verifyToken, logoutMiddleware, (req, res) => {
  res.clearCookie("TokenJWT");
  successResponse(200, "Logout success", "Success", res);
});

app.listen(port, () => {
  console.log(`Your app running at port : ${port}`);
});
