"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var RestService = (function () {
    function RestService() {
        this.BASE_URL = "http://demo.jewelapps.com/api/";
        this.keyName = "X_API_KEY";
        this.keyValue = "034849cb33d276eb61ac6b9871c7a140f08f386b";
    }
    RestService.prototype.baseURLKey = function (serviceName, methodName) {
        return this.BASE_URL + serviceName + "/" + methodName + this.X_API_Key();
    };
    RestService.prototype.baseURLNoKey = function (serviceName, methodName) {
        return this.BASE_URL + serviceName + "/" + methodName;
    };
    RestService.prototype.X_API_Key = function () {
        return "?" + this.keyName + "=" + this.keyValue;
    };
    RestService.prototype.getKey = function () {
        return this.keyValue;
    };
    RestService.prototype.getKeyName = function () {
        return this.keyName;
    };
    return RestService;
}());
RestService = __decorate([
    core_1.Injectable()
], RestService);
exports.RestService = RestService;
//# sourceMappingURL=rest.service.js.map