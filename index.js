import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import * as UserController from "./controller/UserControllers.js"
import * as FlightController from "./controller/FlightControllers.js"
import { registerValidation, loginValidation, addFlightValidation, reservFlightValidation } from "./validator/validator.js"
import cors from "cors"

mongoose.connect(process.env.URL_DB)
    .then(() => console.log("БД подключена"))
    .catch((e) => console.log("Ошибка подключения БД\n\n", e))

const app = express();
const PORT = process.env.PORT || 7000;

app.use(express.json());
app.use(cors());

app.get("/", UserController.home);
app.post("/login", loginValidation, UserController.login);
app.post("/register", registerValidation, UserController.register);
app.post("/admin/addflight", addFlightValidation, FlightController.addFlight);
app.get("/reservation/:id", FlightController.getFlight);
app.post("/reservation", reservFlightValidation, FlightController.reservation);
app.get("/profile/:id", UserController.profile);
app.get("/search", FlightController.getFlights);
app.get("/popular", FlightController.getPopular);

app.listen(PORT, (e) => {
    if (e) {
        console.log("Сервер не запустился\n\n", e);
        return
    };
    console.log(`Сервер запустился на ${PORT} порту`);
})