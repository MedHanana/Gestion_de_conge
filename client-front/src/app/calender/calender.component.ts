import {Component, OnInit} from '@angular/core';
import {Item, Period, Section} from 'ngx-time-scheduler';
import {NgxTimeSchedulerService} from 'ngx-time-scheduler';
import {CongeServiceService} from "../Service/conge-service.service";
import * as moment from 'moment';
import { Events } from 'ngx-time-scheduler';
import { UserServiceService } from '../Service/user-service.service';
import { Conge } from 'src/app/Model/conge';
import { AuthService } from '../Service/auth.service';
import { CongeApiService } from 'src/app/Service/conge-api.service';
@Component({    
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css']
})
export class CalenderComponent implements OnInit {
  eventOutput = '';
  conges : any =[];
  events: Events = new Events();
  periods: Period[];
  sections: Section[] =[];
  items: Item[];
  isAdmin:boolean = false;
  itemCount = 3;
  sectionCount = 10;
  totalLenght: number =0 ;
  totalLenght2: number =0 ;
  totalnotvalid:number=0;
  totaluser : number=0;
  totalconge:number =0;
  listConge:Conge[] = [];
  conge:Conge = {
    departureDate:new Date(),
    returnDate:new Date(),
    type:''
  }


  constructor(private service: NgxTimeSchedulerService,
              private congeService: CongeServiceService,
              private congeApiService: CongeApiService,
              private userServiceService : UserServiceService,
              private authService:AuthService) {
    this.events.SectionClickEvent = (section) => {
      this.eventOutput += '\n' + JSON.stringify(section);
    };
    this.events.SectionContextMenuEvent = (section, {x, y}: MouseEvent) => {
      this.eventOutput += '\n' + JSON.stringify(section) + ',' + JSON.stringify({x, y});
    };
    this.events.ItemClicked = (item) => {
      this.eventOutput += '\n' + JSON.stringify(item);
    };
    this.events.ItemContextMenu = (item, {x, y}: MouseEvent) => {
      this.eventOutput += '\n' + JSON.stringify(item) + ',' + JSON.stringify({x, y});
    };
    this.events.ItemDropped = (item) => {
      this.eventOutput += '\n' + JSON.stringify(item);
    };
    this.events.PeriodChange = (start, end) => {
      this.eventOutput += '\n' + JSON.stringify(start) + ',' + JSON.stringify(end);
    };

    this.periods = [
      {
        name: '2 week',
        timeFrameHeaders: ['MMM YYYY', 'DD(ddd)'],
        timeFrameHeadersTooltip: ['MMM YYYY', 'DD(ddd)'],
        classes: '',
        timeFrameOverall: 1440 * 30,
        timeFramePeriod: 1440,
      },
      {
        name: '3 days',
        timeFramePeriod: (60 * 3),
        timeFrameOverall: (60 * 24 * 3),
        timeFrameHeaders: [
          'Do MMM',
          'HH'
        ],
        classes: 'period-3day',
      }, {
        name: '1 week',
        timeFrameHeaders: ['MMM YYYY', 'DD(ddd)'],
        classes: '',
        timeFrameOverall: 1440 * 7,
        timeFramePeriod: 1440,
      }];

    
    this.items = [{
      
      
      start: moment(new Date()),
      end: moment(new Date("2022/12/31")),
      classes: 'payee'
    }];

  }
  usert : any[] = [];
  ngOnInit() {
    this.totalvalidcongee();
    this.getNbConge();
    this.getListConges();
    this.userServiceService.getAllUser().subscribe({
      next : (user)=>{

        
       this.usert = Object.values(user)[3];
       this.getusers();
      this.addItem();
      }
     
    });
   this.totalcongee();
   this. totalvnotalidcongee();
   this.totalusers();
    
  }
  totalvalidcongee() {
    this.congeApiService.getAllConge().subscribe(listValidConges => {
      const conges = Object.values(listValidConges)[3];
      const validatedConges = conges.filter((conge: { validation: boolean; }) => conge.validation === true);
      this.totalLenght2 = validatedConges.length;
      console.log("total validated conges: ", this.totalLenght2);
    });
  }
  totalvnotalidcongee() {
    this.congeApiService.getAllConge().subscribe(listValidConges => {
      const conges = Object.values(listValidConges)[3];
      const validatedConges = conges.filter((conge: { validation: boolean; }) => conge.validation === false);
      this.totalnotvalid= validatedConges.length;
      
    });
  }
  totalcongee() {
    this.congeApiService.getAllConge().subscribe(listConges => {
      const conges = Object.values(listConges)[3];

     this.totalconge = conges.length;
      console.log("total conges: ", this.totalconge);
    });
  }
  totalusers(){
    this.userServiceService.getAllUser().subscribe(listusers =>{
      const users = Object.values(listusers)[3];
      this.totaluser= users.length;
      console.log("total users",this.totaluser);
      
    })
  }


  getusers(){
    console.log("z");
    
    for(let i =0 ; i<this.usert.length; i++){
      this.sections.push({id:this.usert[i].id , name: this.usert[i].name + this.usert[i].id })
     }
  }

  AfterViewInit(){
    this.getusers();
  }
  getAllUser() : any{
    let usert : any[] = [];
    
  }

  getUserConge() {


    let section : Section[] = [];
    let user : any[] = [];
    user = this.getAllUser();

      console.log("xxxx", user);
      
  }
 getNbConge(){
  this.totalLenght = this.conges.length;
  console.log("Nb conge",this.totalLenght)
 }

  
  nb: any;

  addItem() {

    this.congeService.getAllConge().subscribe(congeList=> {
      this.conges = Object.values(congeList)[3];
      this.totalLenght = this.conges.length;
      for(let i=0; i<this.totalLenght;i++){
        this.itemCount = i;
        if(this.conges[i].user) {
          const idUser: number = <number><unknown> this.conges[i].user?.substring(11); 
          this.nb = idUser   
          console.log("idUSer : ",this.nb);              
        };
        
        this.service.itemPush({
          id: this.itemCount,
          sectionID: this.nb-- ,
          name: ' ' ,
          start: moment(new Date(this.conges[i].departureDate)),
          end: moment(new Date(this.conges[i].returnDate)),
          classes: ''
          
        });

           
            
          
          }
      });

    /*this.itemCount++;
    this.service.itemPush({
      id: this.itemCount,
      sectionID: 5,
      name: 'Item ' + this.itemCount,
      start: moment(new Date("2022/12/30")),
      end: moment(new Date("2022/12/31")),
      classes: ''
    });*/
  }
 


reload(){

  this.getusers();
 
  
  
}
getListConges() {

  // this.congeService.getAllConge().subscribe(congeList=> {
  //   this.conges = Object.values(congeList)[3];
  //   this.totalLenght = this.conges.length;
  //   this.isAdmin= true;
  //   for(let i=0; i<this.totalLenght;i++){
  //       const idUser: number= <number><unknown>this.conges[i].user?.substring(11)
  //       this.userServiceService.getUserByID(idUser).subscribe((user)=>{
  //           this.conges[i].user= Object.values(user)[3];
  //           console.log("tst",Object.values(user)[3]);
            
  //           if ( this.conges[i].user= Object.values(user)[3]){

  //           }
  //       });
  //       }
  //   });
}

}
