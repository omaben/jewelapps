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
var CategoryService = (function () {
    function CategoryService(http, restService) {
        this.http = http;
        this.restService = restService;
    }
    CategoryService.prototype.findAll = function () {
        return this.http.get(this.restService.baseURLKey('category', 'find_level_1')).map(function (res) { return res.json(); });
    };
    CategoryService.prototype.findAllLevel = function () {
        return this.http.get(this.restService.baseURLKey('category', 'find_all_level')).map(function (res) { return res.json(); });
    };
    CategoryService.prototype.find = function (id) {
        return this.http.get(this.restService.baseURLKey('category', 'find_by_id/' + id)).map(function (res) { return res.json(); });
    };
    CategoryService.prototype.findCollection = function (id) {
        return this.http.get(this.restService.baseURLKey('category', 'find_by_collection_id/' + id)).map(function (res) { return res.json(); });
    };
    CategoryService.prototype.findSubCategory = function (id) {
        return this.http.get(this.restService.baseURLKey('category', 'find_sub_categories/' + id)).map(function (res) { return res.json(); });
    };
    CategoryService.prototype.countSubCategory = function (id) {
        return this.http.get(this.restService.baseURLKey('category', 'count_sub_categories/' + id)).map(function (res) { return res.json(); });
    };
    return CategoryService;
}());
CategoryService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http,
        rest_service_1.RestService])
], CategoryService);
exports.CategoryService = CategoryService;
//# sourceMappingURL=category.service.js.map