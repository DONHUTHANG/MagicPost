require("./configs/db");

const app = require("express")();
const port = 5000;

// cors
const cors = require("cors");
app.use(cors());

const bodyParser = require("express").json;
app.use(bodyParser());



const UserRouter = require("./api/User");

const ShipRouter = require("./api/Ship");

const OrderRouter = require("./api/Order");

const DepotRouter = require("./api/Depot");

const CustomerInfoRouter = require("./api/CustomerInfo");
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader(
//       'Access-Control-Allow-Methods',
//       'GET, POST, PUT, PATCH, DELETE'
//     );
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     next();
//   });

app.use("/user", UserRouter);

app.use("/ship", ShipRouter);

app.use("/order", OrderRouter);

app.use("/depot", DepotRouter);

app.use("/customerinfo", CustomerInfoRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
