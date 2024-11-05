import express, { Response, Request, NextFunction } from "express";
import pageRouter from "./routes/page.routes";
import cookieParser from "cookie-parser";
import path from "path";
import dotenv from "dotenv";
dotenv.config()

//Create Server
const app = express()


//Middleware
app.use(cookieParser(process.env.COOKIE_KEY))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '../src/views'))



//Route
app.use('/', pageRouter)

//404 Fallback route
app.use((req: Request, res: Response) => {
    res.status(404).send("page not found!")
})


//Start Server
const PORT: number = Number(process.env.PORT || 5000)
app.listen(PORT, () => {
    console.log(`server is running on PORT: ${PORT}...`)
})