"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
var rest_service_1 = require("./rest.service");
var OrderService = (function () {
    function OrderService(http, restService) {
        this.http = http;
        this.restService = restService;
    }
    OrderService.prototype.create = function (param) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        param[this.restService.getKeyName()] = this.restService.getKey();
        var body = JSON.stringify(param);
        return this.http.post(this.restService.baseURLNoKey('order', 'create'), body, options);
    };
    OrderService.prototype.findByUsername = function (username) {
        return this.http.get(this.restService.baseURLKey('order', 'findByUsername/' + username)).map(function (res) { return res.json(); });
    };
    OrderService.prototype.find = function (id) {
        return this.http.get(this.restService.baseURLKey('order', 'find/' + id)).map(function (res) { return res.json(); });
    };
    OrderService.prototype.sum = function (id) {
        return this.http.get(this.restService.baseURLKey('order', 'sum/' + id)).map(function (res) { return res.json(); });
    };
    OrderService.prototype.sumHas = function (id) {
        return this.http.get(this.restService.baseURLKey('order', 'sumHas/' + id)).map(function (res) { return res.json(); });
    };
    
    return OrderService;
}());
OrderService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http,
        rest_service_1.RestService])
], OrderService);
exports.OrderService = OrderService;
//# sourceMappingURL=order.service.js.map