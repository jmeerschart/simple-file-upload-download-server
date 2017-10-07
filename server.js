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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const typescript_rest_1 = require("typescript-rest");
const fs = require("fs");
const port = process.argv[2] || process.env.PORT || '3000';
const filesDir = process.argv[3] || process.env.DIR || __dirname;
const serverUrl = process.argv[4] || process.env.SERVER || 'http://localhost';
const instructions = 'curl -F file=@myFile.ext ' + serverUrl + ':' + port;
let FileService = class FileService {
    home() {
        return { 'instruction': instructions };
    }
    uploadFile(file) {
        return __awaiter(this, void 0, void 0, function* () {
            const fileName = file.originalname;
            yield fs.writeFile(filesDir + '/' + fileName, file.buffer, function (err) {
                if (err) {
                    return console.error(err);
                }
            });
            const urlFile = serverUrl + ':' + port + '/file?file=' + fileName;
            return {
                downloadLink: urlFile,
                curl: 'curl ' + urlFile + ' > ' + fileName
            };
        });
    }
    downloadFile(file) {
        return new typescript_rest_1.Return.DownloadResource(filesDir + '/' + file, file);
    }
};
__decorate([
    typescript_rest_1.GET,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], FileService.prototype, "home", null);
__decorate([
    typescript_rest_1.POST,
    __param(0, typescript_rest_1.FileParam("file")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FileService.prototype, "uploadFile", null);
__decorate([
    typescript_rest_1.GET,
    typescript_rest_1.Path("file"),
    __param(0, typescript_rest_1.QueryParam("file")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typescript_rest_1.Return.DownloadResource)
], FileService.prototype, "downloadFile", null);
FileService = __decorate([
    typescript_rest_1.Path("/")
], FileService);
let app = express();
typescript_rest_1.Server.buildServices(app);
app.listen(port, function () {
    console.log('Server listening on port ' + port);
    console.log('use commande : ' + instructions);
});
