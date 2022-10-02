"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const userControllers_1 = require("./controllers/userControllers");
const poemaControllers_1 = require("./controllers/poemaControllers");
const poemServices_1 = require("./services/poemServices");
const router = (0, express_1.Router)();
exports.router = router;
const userController = new userControllers_1.UserControllers();
const poemaController = new poemaControllers_1.PoemaController();
const poemaServices = new poemServices_1.PoemServices();
router.get("/", (req, res) => {
    return res.send("Olá");
});
router.get("/user/find", userController.controllerGetUser);
router.get("/poem/find", poemaController.getPoema);
router.post("/user/set", userController.controllerSetUser);
router.post("/poem/set", poemaController.setPoema);
router.post("/interage");