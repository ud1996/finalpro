import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/Model/user.model';
import { UserService } from 'src/app/Services/user.service';
import { AuthenticationService } from 'src/app/Services/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm:FormGroup;
  formSubmitted:boolean;
  error:string;
  usernameExists:boolean=false;
  passwordError:string;
  user:User;
  signupSuccess:boolean=false;
  asAdmin:boolean = false;
  role:string;
  constructor(private router:Router, private userService: UserService,private authService:AuthenticationService) {

    
   }

  ngOnInit() {

    this.signupForm=new FormGroup({
      'email' : new FormControl(null,[Validators.required]),
      'firstName' : new FormControl(null,[Validators.required]),
      'lastName' : new FormControl(null,[Validators.required]),
      'password' : new FormControl(null,[Validators.required]),
      'gender' : new FormControl(null,[Validators.required]),
      'vendorId' : new FormControl(null,[Validators.required]),
      'age' : new FormControl(null,[Validators.required,Validators.min(18)]),
      'contactNumber' : new FormControl(null,[Validators.required]),
      'genre' : new FormControl(null,[Validators.required]),
    })
    this.signupForm.patchValue({genre: 'User'});
   
    
  }

  onSignup(){
    console.log("insignup");
    console.log(this.signupForm.get('email').value);
    
    this.formSubmitted = true;
    let email = this.signupForm.get('email').value;
    
    
    let firstName = this.signupForm.get('firstName').value;
   
    let lastName = this.signupForm.get('lastName').value;
    let password = this.signupForm.get('password').value;
    let vendorId = this.signupForm.get('vendorId').value;
    console.log(this.signupForm.get('vendorId').value);
    let gender = this.signupForm.get('gender').value;
    console.log(this.signupForm.get('gender').value);
    console.log(this.signupForm.get('contactNumber').value);
   
   
    console.log("1233444");
    let age = this.signupForm.get('age').value;
    let contactNumber = this.signupForm.get('contactNumber').value;
    console.log("ddddnup2");
    this.user = {email:email,firstName:firstName,lastName:lastName,password:password,gender:"male",vendorId:vendorId,age:age,contactNumber:contactNumber,isApproved:false};
    console.log(this.user);
    
    this.userService.authentcate(this.user).subscribe((data)=>{
      console.log(data);
      
    },
    (error)=>{
      if(error['error']['message']==='User Already Exist'){
        this.usernameExists=true;
        
      }    
      this.usernameExists=true;
    });
    this.signupForm.reset();
    this.authService.redirectUrl = "/login";
        this.router.navigate([this.authService.redirectUrl]);
  }

  checkValue(){

    console.log(this.signupForm.get('genre'));
    this.role = this.signupForm.controls['genre'].value;
    if(this.role === "User")
      this.asAdmin = false;
    else
      this.asAdmin = true;
     
     console.log(this.asAdmin);
  }

}
