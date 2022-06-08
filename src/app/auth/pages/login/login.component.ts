import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {

  myForm: FormGroup = this.fb.group({
    email: ['testq@test.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required, Validators.minLength(6)]]
  });

  login = () => {
    const { email, password } = this.myForm.value;

    this.authService.login(email, password).subscribe(res => {
      if (res === true) {
        this.router.navigateByUrl('/dashboard');
      }
      else {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: res,
          showConfirmButton: false,
          timer: 2000
        })
      }
    });
  }

  constructor(private fb: FormBuilder,
    private router: Router,
    private authService: AuthService) {

  }
}
