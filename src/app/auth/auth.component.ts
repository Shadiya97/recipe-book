import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponseData, AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error: string = '';

  constructor(private authService: AuthService,private router:Router) {}

  ngOnInit(): void {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(authForm: NgForm) {
    if (authForm.invalid) {
      return;
    }
    const email = authForm.value.email;
    const password = authForm.value.password;

    // let authObs: Observable<AuthResponseData>

    this.isLoading = true;

    if (this.isLoginMode) {
      this.authService.login(email,password).subscribe((resData) => {
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(['/recipes'])
      },
      (errorMessage) => {
        console.log('errorMessage is',errorMessage);
        this.error=errorMessage;
        
        this.isLoading = false;
        
      }
    );
    } else {
      this.authService.signup(email, password).subscribe(
        (resData) => {
          console.log(resData);
          this.isLoading = false;
          this.router.navigate(['/recipes'])

        },
        (errorMessage) => {
          console.log('errorMessage is',errorMessage);
          this.error=errorMessage;
          
          this.isLoading = false;
        }
      );
 
    }

    authForm.reset();
  }
}
