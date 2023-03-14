import { Component } from '@angular/core';
import { Type } from 'src/app/Model/Type';
import { TypeService } from 'src/app/Service/type.service';

@Component({
  selector: 'app-typeconge',
  templateUrl: './typeconge.component.html',
  styleUrls: ['./typeconge.component.css']
})
export class TypecongeComponent {
  types : any[] = [];
  
  constructor( private typeService: TypeService) {
  
  }
  ngOnInit(): void {
    this.getType();
    
  }
  getType(){
    this.typeService.getAllType().subscribe(typelist=> {
      this.types = Object.values(typelist)[3];
      console.log("type", this.types);
    });
    console.log("xxxtype", this.types);
  }
}
