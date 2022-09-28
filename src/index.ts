import express from "express"
import { router } from "./routes"

const port = process.env.PORT || 3000

const server = express()
server.use(express.json())
server.use(router)

server.listen(port, ()=>{
    console.log("Rodando porta 3000")
})
