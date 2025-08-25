const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const http = require("http");
const dotenv = require("dotenv");
const path = require("path")
dotenv.config();

const userRouters = require("./routes/User.js");
const customerRouters = require("./routes/Customers.js");
const customerMedDeatilsRouters = require("./routes/CustomersMedDetails.js");
const customerMedDeatilsRxRouters = require("./routes/CustomersMedDetailsRx.js");
const optMedDeatilsRouters = require("./routes/OptMedDetails.js");
const sendEmailRouter = require("./routes/SendEmail.js");
const cashierRouter = require("./routes/Cashier.js");
const newCusOrder = require("./routes/NewCustomerReport.js");
const rootAmin = require("./routes/RootAdmin.js");

const app = express();
const PORT = process.env.PORT || 2677;

app.use(cors());
app.use(bodyParser.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/users", userRouters);
app.use("/api/customer", customerRouters);
app.use("/api/customer/med", customerMedDeatilsRouters);
app.use("/api/customer/med/rx", customerMedDeatilsRxRouters);
app.use("/api/opt/med", optMedDeatilsRouters);
app.use("/api/email", sendEmailRouter);
app.use("/api/cahsier", cashierRouter);
app.use("/api/order", newCusOrder);
app.use("/api/root", rootAmin);

const httpServer = http.createServer(app);

httpServer.listen(PORT, () => {
  console.log("-------------------------------------");
  console.log(`---Backend is running on port ${PORT}---`);
});
