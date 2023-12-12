import { Injectable } from "@angular/core";

// @Injectable({providedIn:'root'})
//This file is just used to check instance of service.
export class LoggingService{

    Lastlog:string;

    printLog(message: string) {
        console.log('message',message);
        console.log('LastLog',this.Lastlog)
        this.Lastlog= message
    }
}