import { Router, Response, Request } from "express";
import { User } from "../type/user";
import { checkLoginAuth, checkAuth } from '../middleware/auth'

const users: User[] = [
    {
        username: "admin",
        password: "admin12345"
    }
]

const pageRouter = Router()


//Home Route
pageRouter.get('/', (req: Request, res: Response) => {
    res.status(200).render('index', { title: "Home Page" })
})


//Login Route
pageRouter.get('/login', (req: Request, res: Response) => {
    res.status(200).render('login', { title: "Login Page" })
})

//Process Login Route
pageRouter.post('/login', checkLoginAuth, (req: Request, res: Response) => {
    const { username, password } = req.body;
    const found = users.find(user => user.username === username && user.password === password)
    if (found) {
        res.cookie('authToken', 'authenticated', {
            maxAge: 3 * 60 * 1000,
            httpOnly: true,
            signed: true
        });
        res.cookie('user_info', JSON.stringify({
            username: found.username,
        }), {
            maxAge: 3 * 60 * 1000,
            httpOnly: true,
        });
        res.redirect('/profile')
    } else {
        res.redirect('login')
    }
})


//Profile Route
pageRouter.get('/profile', checkAuth, (req: Request, res: Response) => {
    const { username } = JSON.parse(req.cookies.user_info)
    res.status(200).render('profile', { title: `Welcome ${username}!` })
})

//Process Logout Route
pageRouter.get('/logout', (req: Request, res: Response) => {
    res.clearCookie('authToken')
    res.clearCookie('user_info')
    res.redirect('/')
})


export default pageRouter