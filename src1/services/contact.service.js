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

var ContactService = (function () {

    function ContactService(http, restService) {

        this.http = http;

        this.restService = restService;

        this.userInfo = { username: '' };

    }

    ContactService.prototype.create = function (param) {
       
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });

        var options = new http_1.RequestOptions({ headers: headers });

        param[this.restService.getKeyName()] = this.restService.getKey();

        var body = JSON.stringify(param);

        return this.http.post(this.restService.baseURLNoKey('contact', 'create'), body, options).map(function (res) { return res.json(); });

    };


    return ContactService;

}());

ContactService = __decorate([

    core_1.Injectable(),

    __metadata("design:paramtypes", [http_1.Http,

        rest_service_1.RestService])

], ContactService);

exports.ContactService = ContactService;

//# sourceMappingURL=contact.service.js.map