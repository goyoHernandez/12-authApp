import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent {

  myForm: FormGroup = this.fb.group({
    name: ['Goyin', [Validators.required, Validators.minLength(5)]],
    email: ['testq1@test.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required, Validators.minLength(6)]]
  });

  register = () => {
    const { name, email, password } = this.myForm.value;

    this.authService.register(name, email, password).subscribe(res => {
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
