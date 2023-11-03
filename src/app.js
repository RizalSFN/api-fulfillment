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

// TODO MEMINDAHKAN PENGECEKAN TOKEN
// DARI YANG ASALNYA DI COOKIES JADI KE DATABASE

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
  successResponse(200, "", "Login Success", res);
});

// <=====================================Search==============================>
app.get("/search", verifyToken, search, (req, res) => {
  successResponse(200, req.searchData, "Search Success", res);
});

// <===============================User Management===========================>
app.get("/users", verifyToken, listUser, (req, res) => {
  const data = req.userData;
  successResponse(200, data, "List User", res);
});

app.get("/users/detail/:id", verifyToken, detailUser, (req, res) => {
  successResponse(200, req.userDetail, "Detail User by Id", res);
});

app.post("/users/create", verifyToken, createUser, (req, res) => {
  successResponse(200, "", "Upload User Success", res);
});

app.patch("/users/update/:id", verifyToken, updateUser, (req, res) => {
  successResponse(200, "", "Update User Success", res);
});

app.patch("/users/status", verifyToken, updateStatus, (req, res) => {
  successResponse(200, "", "Update Status User Success", res);
});

// <============================Product Management===========================>
app.get("/product", verifyToken, listProduct, (req, res) => {
  successResponse(200, req.productData, "List Product", res);
});

app.get("/product/detail/:id", verifyToken, detailProduct, (req, res) => {
  successResponse(200, req.detail, "Detail Product by Id", res);
});

app.post("/product/create", verifyToken, createProduct, (req, res) => {
  successResponse(200, "", "Upload Product Success", res);
});

app.post("/product/varian/create", verifyToken, createVarian, (req, res) => {
  successResponse(200, "", "Upload Variant Product Success", res);
});

app.patch("/product/update/:id", verifyToken, updateProduct, (req, res) => {
  successResponse(200, "", "Update Product Success", res);
});

app.patch(
  "/product/update/status/:statusVarian/:id",
  verifyToken,
  statusProduct,
  (req, res) => {
    successResponse(200, "", "Update Status Variant Product Success", res);
  }
);

// <=================================Logout==================================>
app.delete("/logout", verifyToken, logoutMiddleware, (req, res) => {
  res.clearCookie("TokenJWT");
  successResponse(200, "", "Logout Success", res);
});

app.listen(port, () => {
  console.log(`Your app running at port : ${port}`);
});
