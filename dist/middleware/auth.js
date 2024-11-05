"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkLoginAuth = exports.checkAuth = void 0;
const checkAuth = (req, res, next) => {
    const { authToken } = req.signedCookies;
    if (authToken === 'authenticated') {
        next();
    }
    else {
        res.redirect('/login');
    }
};
exports.checkAuth = checkAuth;
const checkLoginAuth = (req, res, next) => {
    const { authToken } = req.signedCookies;
    if (authToken === 'authenticated') {
        res.redirect('/profile');
    }
    else {
        next();
    }
};
exports.checkLoginAuth = checkLoginAuth;
