const express = require("express");
const port = 3000;
const app = express();
const loginMiddleware = require("./controllers/middleware-login.js");
const successResponse = require("./response/success-response.js");
const logoutMiddleware = require("./controllers/middleware-logout.js");
const cookieParser = require("cookie-parser");
const verifyToken = require("./controllers/verify-token.js");
const listUser = require("./controllers/user/list-users.js");
const createUser = require("./controllers/user/create-user.js");
const detailUser = require("./controllers/user/detail-user.js");
const updateUser = require("./controllers/user/update-user.js");
const updateStatus = require("./controllers/user/update-status-user.js");
const listProduct = require("./controllers/product/list-product.js");
const detailProduct = require("./controllers/product/detail-product.js");
const createProduct = require("./controllers/product/create-product.js");
const createVarian = require("./controllers/product/create-variant.js");
const updateProduct = require("./controllers/product/update-product.js");
const statusProduct = require("./controllers/product/update-status-product.js");
const search = require("./controllers/search/search.js");
const createBrand = require("./controllers/product/create-brand.js");
const {
  updateVariant,
  updateStok,
} = require("./controllers/product/update-variant.js");
const {
  historyUsers,
  historyProducts,
} = require("./controllers/history/history.js");

app.use(express.json());
app.use(cookieParser());

// TODO BESOK MEMBUAT CONTROLLER UNTUK BARANG KELUAR (PENDING - DOING - #SOLVING)

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
  const paging = req.pagination;
  successResponse(200, data, "List User", res, paging);
});

app.get("/users/detail/:id", verifyToken, detailUser, (req, res) => {
  successResponse(200, req.userDetail, "Detail User by Id", res);
});

app.post("/users/create", verifyToken, createUser, (req, res) => {
  successResponse(200, "", "Create New User Success", res);
});

app.patch("/users/update/:id", verifyToken, updateUser, (req, res) => {
  successResponse(200, "", "Update User Success", res);
});

app.patch("/users/status", verifyToken, updateStatus, (req, res) => {
  successResponse(200, "", "Update Status User Success", res);
});

app.get("/users/history", verifyToken, historyUsers, (req, res) => {
  const paging = req.pagination;
  const data = req.dataHistory;
  successResponse(200, data, "History activity users", res, paging);
});

// <============================Product Management===========================>
app.get("/product", verifyToken, listProduct, (req, res) => {
  const paging = req.pagination;
  successResponse(200, req.productData, "List Product", res, paging);
});

app.get("/product/detail/:id", verifyToken, detailProduct, (req, res) => {
  successResponse(200, req.detail, "Detail Product by Id", res);
});

app.post("/product/create", verifyToken, createProduct, (req, res) => {
  successResponse(200, "", "Create New Product Success", res);
});

app.post("/product/brand/create", verifyToken, createBrand, (req, res) => {
  successResponse(200, "", "Create New Brand Success", res);
});

app.post("/product/varian/create", verifyToken, createVarian, (req, res) => {
  successResponse(200, "", "Create Variant Product Success", res);
});

app.get("/product/history", verifyToken, historyProducts, (req, res) => {
  const paging = req.pagination;
  const data = req.dataHistory;
  successResponse(200, data, "History activity products", res, paging);
});

app.patch("/product/update/:id", verifyToken, updateProduct, (req, res) => {
  successResponse(200, "", "Update Product Success", res);
});

app.patch(
  "/product/update/varian/:stat",
  verifyToken,
  statusProduct,
  (req, res) => {
    successResponse(200, "", "Update Status Variant Product Success", res);
  }
);

app.patch(
  "/product/varian/update/:id",
  verifyToken,
  updateVariant,
  (req, res) => {
    successResponse(200, "", "Update Variant Success", res);
  }
);

app.patch(
  "/product/varian/:keterangan/:id",
  verifyToken,
  updateStok,
  (req, res) => {
    successResponse(200, "", `${req.msg} stok success`, res);
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
