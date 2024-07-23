import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db/db.config.js";
import blogRoute from "./routes/blogRoute.js";
import uploadRoute from "./routes/uploadRoute.js";
import authRoute from "./routes/authRoute.js";
import adminBlogRoute from "./routes/adminBlogRoute.js";
import adminProfileRoute from "./routes/adminProfileRoute.js";
dotenv.config();
const app = express();

app.use(express.json());
// app.use(cors({
//     // origin: "https://blogger-my-app.vercel.app",
//     origin: "*",
//     credentials: true,
// }));
app.use(cors());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.status(200).send("Hello World");
})

app.use("/api/blog", blogRoute);
app.use("/api/admin/blogs", adminBlogRoute);
app.use("/api/admin/upload", uploadRoute);
app.use("/api/admin", adminProfileRoute);
app.use("/api/auth", authRoute);

app.use("/upload", express.static("upload"));


app.listen(process.env.PORT, () => {
    connectDB();
    console.log(`Server running on http://localhost:${process.env.PORT}`);
})