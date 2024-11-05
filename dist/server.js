"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const page_routes_1 = __importDefault(require("./routes/page.routes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
//Create Server
const app = (0, express_1.default)();
//Middleware
app.use((0, cookie_parser_1.default)(process.env.COOKIE_KEY));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path_1.default.join(__dirname, '../src/views'));
//Route
app.use('/', page_routes_1.default);
//404 Fallback route
app.use((req, res) => {
    res.status(404).send("page not found!");
});
//Start Server
const PORT = Number(process.env.PORT || 5000);
app.listen(PORT, () => {
    console.log(`server is running on PORT: ${PORT}...`);
});
