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
var product_1 = require("../../models/product");
var supertest_1 = __importDefault(require("supertest"));
var index_1 = __importDefault(require("../../index"));
var database_1 = __importDefault(require("../../database"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var product = new product_1.Product();
// create a request object
var request = (0, supertest_1.default)(index_1.default);
describe('Product Model', function () {
    var DummyProductData = {
        title: 'Product Title',
        price: 9.99
    };
    var DummyUserData = {
        username: 'Test User Name',
        password: '123456',
        fullname: 'Mohamed Saied - Test Env'
    };
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        var conn;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, database_1.default.connect()];
                case 1:
                    conn = _a.sent();
                    return [4 /*yield*/, conn.query('TRUNCATE products RESTART IDENTITY CASCADE;')];
                case 2:
                    _a.sent();
                    conn.release();
                    return [2 /*return*/];
            }
        });
    }); });
    afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        var conn;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, database_1.default.connect()];
                case 1:
                    conn = _a.sent();
                    return [4 /*yield*/, conn.query('TRUNCATE products RESTART IDENTITY CASCADE;')];
                case 2:
                    _a.sent();
                    conn.release();
                    return [2 /*return*/];
            }
        });
    }); });
    describe('Model Methods Check', function () {
        it('Product Index Defined', function () {
            expect(product.index).toBeDefined();
        });
        it('Product Create Defined', function () {
            expect(product.create).toBeDefined();
        });
        it('Product Update Defined', function () {
            expect(product.update).toBeDefined();
        });
        it('Product Show Defined', function () {
            expect(product.show).toBeDefined();
        });
        it('Product Delete Defined', function () {
            expect(product.delete).toBeDefined();
        });
    });
    describe('Check Endpoint *API* Access And Functionally', function () {
        var tempToken = jsonwebtoken_1.default.sign({ user: DummyUserData }, process.env.TOKEN_SECRET);
        it('/api/products | All Products', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request
                            .get('/api/products')
                            .set('Authorization', "Bearer ".concat(tempToken))];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(200);
                        expect(response.body).toEqual([]);
                        return [2 /*return*/];
                }
            });
        }); });
        it('/api/products | Create Products', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request
                            .post('/api/products')
                            .send(DummyProductData)
                            .set('Authorization', "Bearer ".concat(tempToken))];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(200);
                        expect(response.body.title).toEqual(DummyProductData.title);
                        expect(parseFloat(response.body.price)).toEqual(DummyProductData.price);
                        return [2 /*return*/];
                }
            });
        }); });
        it('/api/products/:id | Show Product', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request
                            .get('/api/products/1')
                            .set('Authorization', "Bearer ".concat(tempToken))];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(200);
                        expect(response.body.title).toBe('Product Title');
                        return [2 /*return*/];
                }
            });
        }); });
        it('/api/products/:id | Update Product', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request
                            .put('/api/products/1')
                            .send({
                            title: 'Product Title',
                            price: 4.99
                        })
                            .set('Authorization', "Bearer ".concat(tempToken))];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(200);
                        expect(response.body.title).toBe('Product Title');
                        expect(parseFloat(response.body.price)).toEqual(4.99);
                        return [2 /*return*/];
                }
            });
        }); });
        it('/api/products/:id | Delete Product', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request
                            .delete('/api/products/1')
                            .set('Authorization', "Bearer ".concat(tempToken))];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(200);
                        expect(response.body).toEqual({});
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('Test Product Model Methods Functionality', function () {
        var product = new product_1.Product();
        it('Method Index', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, product.index()];
                    case 1:
                        result = _a.sent();
                        expect(result).toEqual([]);
                        return [2 /*return*/];
                }
            });
        }); });
        it('Method Create', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, product.create(DummyProductData)];
                    case 1:
                        result = _a.sent();
                        expect(result.title).toBe(DummyProductData.title);
                        expect(parseFloat(result.price)).toBe(DummyProductData.price);
                        return [2 /*return*/];
                }
            });
        }); });
        it('Method Show', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, product.show(2)];
                    case 1:
                        result = _a.sent();
                        expect(result.title).toBe(DummyProductData.title);
                        expect(parseFloat(result.price)).toEqual(DummyProductData.price);
                        return [2 /*return*/];
                }
            });
        }); });
        it('Method Update', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, product.update({
                            id: 2,
                            title: 'Product',
                            price: 10
                        })];
                    case 1:
                        result = _a.sent();
                        expect(result.title).toBe('Product');
                        expect(parseFloat(result.price)).toEqual(10);
                        return [2 /*return*/];
                }
            });
        }); });
        it('Method Delete', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, product.delete(2)];
                    case 1:
                        result = _a.sent();
                        expect(result).toBe('Product Deleted Successfully');
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
