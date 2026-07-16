import express from "express";
import { createServer } from "node:http";

import { Server } from "socket.io";

import mongoose from "mongoose";
import { connectToSocket } from "./controllers/socketManager.js";

import cors from "cors";
import userRoutes from "./routes/users.routes.js";

const app = express();
const server = createServer(app);
const io = connectToSocket(server);


app.set("port", (process.env.PORT || 8000))
app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

// Add this
app.get("/", (req, res) => {
    res.send("Backend is running successfully!");
});

app.use("/api/v1/users", userRoutes);

const start = async () => {
    app.set("mongo_user")
    const connectionDb = await mongoose.connect("mongodb://RutujaBhavar:250714@ac-8vejzp4-shard-00-00.aujo4n4.mongodb.net:27017,ac-8vejzp4-shard-00-01.aujo4n4.mongodb.net:27017,ac-8vejzp4-shard-00-02.aujo4n4.mongodb.net:27017/?ssl=true&replicaSet=atlas-1293bu-shard-0&authSource=admin&appName=ZoomCloneCluster")

    console.log(`MONGO Connected DB HOst: ${connectionDb.connection.host}`)
    server.listen(app.get("port"), () => {
        console.log("LISTENIN ON PORT 8000")
    });



}



start();