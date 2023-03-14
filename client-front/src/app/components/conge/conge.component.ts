import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {Conge} from "../../Model/conge";
import {CongeServiceService} from "../../Service/conge-service.service";
import {NgForm} from "@angular/forms";
import {UserServiceService} from "../../Service/user-service.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import * as moment from "moment";
import { Router } from '@angular/router';
import {Type} from "../../Model/Type";
import { PAGE_CALENDAR, PAGE_CONGE } from 'src/app/webRoutes';
import { AuthService } from 'src/app/Service/auth.service';
import { TypeService } from 'src/app/Service/type.service';
import { CongeApiService } from 'src/app/Service/conge-api.service';

@Component({
  selector: 'app-conge',
  templateUrl: './conge.component.html',
  styleUrls: ['./conge.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class CongeComponent implements OnInit {
  conges:Conge[] = [];
  finalListConges:Conge[] = [];
  detailConge:Conge = {
    departureDate:new Date(),
    returnDate:new Date(),

  }
  today: string = new Date().toISOString().split('T')[0];
  isCongeAdded: boolean = false;
  isCongeNotAdded: boolean = false;
  totalLenght: number | undefined;
  page:number= 1;
  conge:Conge = {
    departureDate: new Date(),
    returnDate: new Date(),
    type:'',
    validation:false
  }
  departureDate: Date = new Date(0);
  returnDate: Date = new Date(0);
 
  isDepartureDateSelected:Boolean = false;
  isReturnDateSelected:Boolean = false;
  users: any;
  type: any;
  types:Type[]=[];
  disableSave : boolean = false;
  isCongeAlreadyExists: boolean = false;
  constructor(
    private congeService: CongeServiceService,
    private userService: UserServiceService,
    private modalService: NgbModal,
    private userApiService: UserServiceService,
    private authService : AuthService,
    private router: Router,
    private userServiceService : UserServiceService,
    private typeService: TypeService,
    private congeApiService: CongeApiService
    ) { }

  ngOnInit(): void {
    
    this.getUserList();
    this.getFinalListConges();
    this.getListConges2();
  //  this.replaceIdByName();
    this.gettype();
    this.totalvalidcongee();
    
  }
  key = this.authService.getToken();

  gettype(){
    this.typeService.getAllType().subscribe(typelist=> {
      this.types = Object.values(typelist)[3];
    });
  }

  getListConges() {
    this.congeService.getAllConge().subscribe(congeList=> {
      this.conges = Object.values(congeList)[3];
      
      // console.log( "key1233 :",this.key);
      
      
    });
    // this.conges.forEach((element: Conge) => {
    //   let idUser: number = parseInt(element.user!.toString());
    //   console.log(idUser);
    //   this.userService.getUserByID(idUser).subscribe(user => {
    //     console.log(user)
    //     element.userObject=user;
    //   }
    //     )
    // });
  }
  getFinalListConges() {
    this.congeApiService.getMyConge().subscribe((listconge: Object) => {
      const conges = Object.values(listconge)[3];
      console.log("my conges",conges)
      if (Array.isArray(conges)) {
        conges.forEach(conge => {

          const diffTime = Math.abs(conge.returnDate- conge.departureDate);
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          console.log(`Difference between departure and return dates for conge ${conge.id} is ${diffDays} days`);
        });

      }
    });
  }
  
  totalvalidcongee() {
    this.congeApiService.getAllConge().subscribe(listValidConges => {
      const conges = Object.values(listValidConges)[3];
      const validatedConges = conges.filter((conge: { validation: boolean; }) => conge.validation === true);
      this.totalLenght = validatedConges.length;
      console.log("total validated conges: ", this.totalLenght);
    });
  }
  getUserList(){
    this.userApiService.getAllUser().subscribe(listUser=>{
        this.users = Object.values(listUser)[3];
        this.totalLenght = this.users.length;
       
    });
  }
  clearFormUser(){
      this.conge = {
      departureDate:new Date(),
      returnDate:new Date(),


    }
  }
  saveConge(form: NgForm) {

    if (form.valid) {

        this.congeService.addConge(this.conge).subscribe({
            next: () => {              
                this.isCongeAdded = true;
                setTimeout(() => {
                    this.isCongeAdded = false;
                    this.router.navigateByUrl(PAGE_CONGE);
                }, 3000);

            },
            error: (error) => {
                if (error.error.message === 'Conge already exists for this user between these dates') {
                    this.isCongeAlreadyExists = true;
                } else {
                    this.isCongeNotAdded = true;
                }
                setTimeout(() => {
                    this.isCongeNotAdded = false ;
                    this.isCongeAlreadyExists = false;
                }, 3000);
            }
        });
    }
}


  deleteConge(id:any) {
    if (window.confirm('Are sure you want to delete this conge ?')) {
      this.congeService.deleteConge(id).subscribe(res => {
        this.getListConges();
        this.totalLenght = this.conges.length;
      })
    }
  }

  updateCOnge(form:NgForm ,id: any){
    this.congeService.editConge(form.value, id).subscribe( {
      next:()=>{
        this.getListConges();
      },
      error:()=>{
        this.getListConges();
      }
    });
  }

  search() {

    if (this.type == "") {
      this.ngOnInit();
    } else {
      this.conges = this.conges.filter(res => {
        // @ts-ignore
        return res.type.toLocaleLowerCase().match(this.type.toLocaleLowerCase());
      })
    }
  }
  

  filterByDate() {
    if (!this.isReturnDateSelected && this.isDepartureDateSelected) {
      this.conges = this.conges.filter(m => {
            return moment(m.departureDate).format('DD-MM-YYYY') >=
                moment(this.departureDate).format('DD-MM-YYYY')
          }
      )
      return;
    }
    if (this.isReturnDateSelected && !this.isDepartureDateSelected) {
      this.conges = this.conges.filter(m => {
        return moment(m.returnDate).format('DD-MM-YYYY') <=
            moment(this.returnDate).format('DD-MM-YYYY')
      })
      return;
    }
    if (this.isReturnDateSelected && this.isDepartureDateSelected) {
      this.conges = this.conges.filter(m => {
        return moment(m.departureDate).format('DD-MM-YYYY') >=
            moment(this.departureDate).format('DD-MM-YYYY') &&
            moment(m.returnDate).format('DD-MM-YYYY') <=
            moment(this.returnDate).format('DD-MM-YYYY')
      })
      return;
    }
    if (!this.isReturnDateSelected && !this.isDepartureDateSelected) {
      return;
    }
  }

  toggleDepartureDate(event: any) {
    if (event.target.checked) {
      this.isDepartureDateSelected = true;
    }
  }

  toggleReturnDate(event: any) {
    if (event.target.checked) {
      this.isReturnDateSelected = true;
    }
  }

  popUp(longContent: any) {
    this.modalService.open(longContent, { scrollable: false });
  }

  close(modal:any){
    modal.close('Close click');
    this.clearFormUser();
  }



  getListConges2() {
    this.congeService.getAllConge().subscribe(congeList => {
      const allConges = Object.values(congeList)[3];
      this.totalLenght = allConges.length;
  
      const validConges = allConges.filter((conge: { validation: boolean; }) => conge.validation === true);
  
      this.conges = validConges.map((conge: { user: string; type: string; }) => {
        const idUser: number = <number><unknown>conge.user?.substring(11);
        const idType: number = <number><unknown>conge.type?.substring(11);
  
        this.userServiceService.getUserByID(idUser).subscribe((user) => {
          conge.user = Object.values(user)[4];
        });
  
        this.typeService.getTypeByID(idType).subscribe((type) => {
          conge.type = Object.values(type)[4];
        });
  
        return conge;
      });
    });
  }
  // checkIfCongeExist(){
  //   this.getListConges2();
  //   this.conges.filter(conge => conge.id).forEach(conge => {
      
  //   });
    //if(this.conge.departureDate)


}
