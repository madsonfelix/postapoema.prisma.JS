import { Router, Request, Response } from "express";
import { UserControllers } from "./controllers/userControllers";
import { PoemaController } from "./controllers/poemaControllers";
import { PoemServices } from "./services/poemServices";

const router = Router()
const userController = new UserControllers()
const poemaController = new PoemaController()
const poemaServices = new PoemServices()

router.get("/", (req: Request, res: Response)=>{
    return res.send("Olá")
})

router.get("/user/find", userController.controllerGetUser);

router.post("/user/set", userController.controllerSetUser);

router.post("/poem/set", poemaController.setPoema);

router.post("/interage", );

export {router}