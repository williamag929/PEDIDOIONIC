import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

export const GlobalVariable = Object.freeze({
    BASE_API_URL: 'http://localhost:5000/api/',
    //BASE_API_URL: 'http://pedidoapi.goldpos.com.co/api/',
    //BASE_API_URL: 'http://190.145.75.206:1088/api/',
    BASE_API_URL2: 'http://190.145.75.206:8080/',
    MD5: 'be61ef81597278cb4edd772ea770535a',
    vend_id : "",
});


export var AppSetting = Object.isExtensible({
    vend_id : 19
})