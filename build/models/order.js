"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
var database_1 = __importDefault(require("../database"));
var Order = /** @class */ (function () {
    function Order() {
    }
    Order.prototype.index = function () {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sql = 'SELECT orders.id, product_id, products.title, products.price as unit_price,user_id,users.fullname,quantity, (products.price * quantity) as total_price FROM orders INNER join products ON orders.product_id = products.id INNER join users ON orders.user_id = users.id;';
                        return [4 /*yield*/, conn.query(sql)];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows];
                    case 3:
                        error_1 = _a.sent();
                        throw new Error('Index Method Error ' + error_1);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Order.prototype.show = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sql = 'SELECT orders.id, product_id, products.title, products.price as unit_price,user_id,users.fullname,quantity, (products.price * quantity) as total_price FROM orders INNER join products ON orders.product_id = products.id INNER join users ON orders.user_id = users.id WHERE orders.id = $1';
                        return [4 /*yield*/, conn.query(sql, [id])];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        error_2 = _a.sent();
                        throw new Error('Show Method Error ' + error_2);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Order.prototype.create = function (order) {
        return __awaiter(this, void 0, void 0, function () {
            var product_id, quantity, user_id, conn, sql, result, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        product_id = order.product_id, quantity = order.quantity, user_id = order.user_id;
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sql = 'INSERT INTO orders (product_id,quantity,user_id) VALUES ($1,$2,$3) RETURNING *;';
                        return [4 /*yield*/, conn.query(sql, [product_id, quantity, user_id])];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        error_3 = _a.sent();
                        throw new Error('Create Method Error ' + error_3);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Order.prototype.update = function (order) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, id, product_id, quantity, user_id, checkIfOrderCount, sql, returnUpdated, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        id = order.id, product_id = order.product_id, quantity = order.quantity, user_id = order.user_id;
                        return [4 /*yield*/, conn.query('SELECT * FROM orders WHERE id = $1', [id])];
                    case 2: return [4 /*yield*/, (_a.sent()).rowCount];
                    case 3:
                        checkIfOrderCount = _a.sent();
                        if (!(checkIfOrderCount <= 1)) return [3 /*break*/, 8];
                        _a.label = 4;
                    case 4:
                        _a.trys.push([4, 7, , 8]);
                        sql = 'UPDATE orders SET product_id = $1 , quantity = $2 , user_id = $3 WHERE id = $4;';
                        return [4 /*yield*/, conn.query(sql, [product_id, quantity, user_id, id])];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, conn.query('SELECT orders.id, product_id, products.title, products.price as unit_price,user_id,users.fullname,quantity, (products.price * quantity) as total_price FROM orders INNER join products ON orders.product_id = products.id INNER join users ON orders.user_id = users.id WHERE orders.id = $1', [id])];
                    case 6:
                        returnUpdated = _a.sent();
                        conn.release();
                        return [2 /*return*/, returnUpdated.rows[0]];
                    case 7:
                        error_4 = _a.sent();
                        throw new Error('Update Method Error ' + error_4);
                    case 8: return [2 /*return*/, false];
                }
            });
        });
    };
    Order.prototype.delete = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sql = 'DELETE FROM orders WHERE id = $1;';
                        return [4 /*yield*/, conn.query(sql, [id])];
                    case 2:
                        _a.sent();
                        conn.release();
                        return [2 /*return*/, 'Order Deleted Successfully'];
                    case 3:
                        error_5 = _a.sent();
                        throw new Error('Delete Method Error ' + error_5);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return Order;
}());
exports.Order = Order;
