import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import ownerRoutes from "./routes/ownerauth.js";
import storeRoutes from "./routes/store.js";
import serviceRoutes from "./routes/service.js";
import bookingRoutes from "./routes/booking.js";
import followRoutes from "./routes/follow.js";
import orderRoutes from "./routes/order.js";
import dashboardRoutes from "./routes/dashboard.js";
import notificationRoutes from "./routes/notification.js";
// import paymentRoutes from "./routes/payment.js";
// import historyRoutes from "./routes/history.js";
import testRoutes from "./routes/test.js";
import csmamoc from "./routes/csmamoc.js";
import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/posts.js";
import { verifyToken } from "./middleware/auth.js";
// import User from "./models/User.js";
// import Post from "./models/Post.js";
// import { users, posts } from "./data/index.js";

/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));
// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'hbs');
// app.engine('hbs', hbs.engine({ extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/', partialsDir: __dirname + '/views/partials/' }))


app.set('views', path.join(__dirname,'views'))
app.set('view engine', 'hbs')
  
app.get('/', function(req, res){
  res.render('addstore')
})
app.get('/testing/hbs', function(req, res){
  res.render('addstore')
})
/* FILE STORAGE */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

/* ROUTES WITH FILES */
// app.post("/auth/register", upload.single("picture"), register);
// app.post("/posts", verifyToken, upload.single("picture"), createPost);

/* ROUTES */
app.use("/auth/user", authRoutes);
app.use("/auth/owner", ownerRoutes);
app.use("/store", storeRoutes);
app.use("/service", serviceRoutes);
app.use("/booking", bookingRoutes);
app.use("/follow", followRoutes);
app.use("/order", orderRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/notification", notificationRoutes);
app.use("/csmamoc", csmamoc);
// app.use("/payment", paymentRoutes);
// app.use("/history", testRoutes);

app.use("/test/api", testRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;
mongoose.set('strictQuery', true)
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () =>  console.log(`Server Running on Port: ${PORT}`));
    
       /* ADD DATA ONE TIME */
    // User.insertMany(users);
    // Post.insertMany(posts);
  })
    .catch((error) =>   console.log(`${error} did not connect`));
    