"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var pg_1 = require("pg");
dotenv_1.default.config();
var _a = process.env, POSTGRES_HOST = _a.POSTGRES_HOST, POSTGRES_DB_NAME = _a.POSTGRES_DB_NAME, POSTGRES_TEST_DB_NAME = _a.POSTGRES_TEST_DB_NAME, POSTGRES_USERNAME = _a.POSTGRES_USERNAME, POSTGRES_PASSWORD = _a.POSTGRES_PASSWORD;
var client = new pg_1.Pool({
    host: POSTGRES_HOST,
    database: process.env.ConnectionType === 'dev' ? POSTGRES_DB_NAME : POSTGRES_TEST_DB_NAME,
    user: POSTGRES_USERNAME,
    password: POSTGRES_PASSWORD
});
exports.default = client;
