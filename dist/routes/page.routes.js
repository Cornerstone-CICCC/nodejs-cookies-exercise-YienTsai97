"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const users = [
    {
        username: "admin",
        password: "admin12345"
    }
];
const pageRouter = (0, express_1.Router)();
//Home Route
pageRouter.get('/', (req, res) => {
    res.status(200).render('index', { title: "Home Page" });
});
//Login Route
pageRouter.get('/login', (req, res) => {
    res.status(200).render('login', { title: "Login Page" });
});
//Process Login Route
pageRouter.post('/login', auth_1.checkLoginAuth, (req, res) => {
    const { username, password } = req.body;
    const found = users.find(user => user.username === username && user.password === password);
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
        res.redirect('/profile');
    }
    else {
        res.redirect('login');
    }
});
//Profile Route
pageRouter.get('/profile', auth_1.checkAuth, (req, res) => {
    const { username } = JSON.parse(req.cookies.user_info);
    res.status(200).render('profile', { title: `Welcome ${username}!` });
});
//Process Logout Route
pageRouter.get('/logout', (req, res) => {
    res.clearCookie('authToken');
    res.clearCookie('user_info');
    res.redirect('/');
});
exports.default = pageRouter;
