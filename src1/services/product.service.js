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

var ProductService = (function () {

    function ProductService(http, restService) {

        this.http = http;

        this.restService = restService;

    }

    ProductService.prototype.latest = function () {

        return this.http.get(this.restService.baseURLKey('article', 'find_latest')).map(function (res) { return res.json(); });

    };

    ProductService.prototype.mostViewed = function () {

        return this.http.get(this.restService.baseURLKey('article', 'find_most_viewed')).map(function (res) { return res.json(); });

    };

    ProductService.prototype.bestSeller = function () {

        return this.http.get(this.restService.baseURLKey('article', 'find_best_seller')).map(function (res) { return res.json(); });

    };

    ProductService.prototype.findByCategory = function (categoryId) {

        return this.http.get(this.restService.baseURLKey('article', 'search_by_category_id/' + categoryId)).map(function (res) { return res.json(); });

    };

    ProductService.prototype.findByBrand = function (brandId) {

        return this.http.get(this.restService.baseURLKey('article', 'search_by_brand_id/' + brandId)).map(function (res) { return res.json(); });

    };

    ProductService.prototype.find = function (id) {

        return this.http.get(this.restService.baseURLKey('article', 'find_by_id/' + id)).map(function (res) { return res.json(); });

    };

    ProductService.prototype.findRelated = function (categoryId, productId) {

        return this.http.get(this.restService.baseURLKey('article', 'search_related_by_category_id/' + categoryId + '/' + productId)).map(function (res) { return res.json(); });

    };

    ProductService.prototype.search = function (keyword) {

        return this.http.get(this.restService.baseURLKey('article', 'search/' + keyword)).map(function (res) { return res.json(); });

    };

    ProductService.prototype.updateView = function (param) {

        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });

        var options = new http_1.RequestOptions({ headers: headers });

        var body = JSON.stringify(param);

        return this.http.post(this.restService.baseURLNoKey('article', 'update_view'), body, options);

    };
    ProductService.prototype.comment = function (param) {
       
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });

        var options = new http_1.RequestOptions({ headers: headers });

        param[this.restService.getKeyName()] = this.restService.getKey();

        var body = JSON.stringify(param);

        return this.http.post(this.restService.baseURLNoKey('comment', 'create'), body, options).map(function (res) { return res.json(); });

    };

    return ProductService;

}());

ProductService = __decorate([

    core_1.Injectable(),

    __metadata("design:paramtypes", [http_1.Http,

        rest_service_1.RestService])

], ProductService);

exports.ProductService = ProductService;

//# sourceMappingURL=product.service.js.map