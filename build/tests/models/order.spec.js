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
var order_1 = require("../../models/order");
var supertest_1 = __importDefault(require("supertest"));
var index_1 = __importDefault(require("../../index"));
var database_1 = __importDefault(require("../../database"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var dotenv_1 = __importDefault(require("dotenv"));
var user_1 = require("../../models/user");
var product_1 = require("../../models/product");
dotenv_1.default.config();
var order = new order_1.Order();
// create a request object
var request = (0, supertest_1.default)(index_1.default);
describe('Product Model', function () {
    afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        var conn;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, database_1.default.connect()];
                case 1:
                    conn = _a.sent();
                    return [4 /*yield*/, conn.query('TRUNCATE order_Products RESTART IDENTITY CASCADE;TRUNCATE users RESTART IDENTITY CASCADE;TRUNCATE products RESTART IDENTITY CASCADE;TRUNCATE order_products RESTART IDENTITY CASCADE;')];
                case 2:
                    _a.sent();
                    conn.release();
                    return [2 /*return*/];
            }
        });
    }); });
    describe('Model Methods Check', function () {
        it('Order Index Defined', function () {
            expect(order.index).toBeDefined();
        });
        it('Order Create Defined', function () {
            expect(order.create).toBeDefined();
        });
        it('Order Update Defined', function () {
            expect(order.update).toBeDefined();
        });
        it('Order Show Defined', function () {
            expect(order.show).toBeDefined();
        });
        it('Order Delete Defined', function () {
            expect(order.delete).toBeDefined();
        });
    });
    describe('Check Endpoint *API* Access And Functionally', function () {
        var DummyOrderData = {
            status: 'active',
            user_id: 1
        };
        var DummyUserData = {
            username: 'Test User Name',
            password: '123456',
            fullname: 'Mohamed Saied - Test Env'
        };
        var DummyProductData = {
            title: 'Product Title',
            price: 5.5
        };
        var tempToken = jsonwebtoken_1.default.sign({ user: DummyUserData }, process.env.TOKEN_SECRET);
        var user = new user_1.User();
        var product = new product_1.Product();
        beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, user.create(DummyUserData)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, product.create(DummyProductData)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('/api/orders | All Orders', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request.get('/api/orders').set('Authorization', "Bearer ".concat(tempToken))];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(200);
                        return [2 /*return*/];
                }
            });
        }); });
        it('/api/orders | Create Orders', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request
                            .post('/api/orders')
                            .send(DummyOrderData)
                            .set('Authorization', "Bearer ".concat(tempToken))];
                    case 1:
                        response = _a.sent();
                        console.log(response.body);
                        expect(response.status).toBe(200);
                        return [2 /*return*/];
                }
            });
        }); });
        it('/api/orders/:id | Show Order', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request
                            .get('/api/orders/1')
                            .set('Authorization', "Bearer ".concat(tempToken))];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(200);
                        return [2 /*return*/];
                }
            });
        }); });
        it('/api/orders/:id | Update Order', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request
                            .put('/api/orders/1')
                            .send({
                            status: 'complete',
                            user_id: 1
                        })
                            .set('Authorization', "Bearer ".concat(tempToken))];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(200);
                        expect(response.body.status).toBe('complete');
                        return [2 /*return*/];
                }
            });
        }); });
        it('/api/orders/:id | Delete Order', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request
                            .delete('/api/orders/1')
                            .set('Authorization', "Bearer ".concat(tempToken))];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(200);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
