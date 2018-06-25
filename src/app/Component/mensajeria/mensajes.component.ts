import { Component, OnInit,Input } from '@angular/core';
import { Router } from '@angular/router';
import { MensajesServices } from '../../servicios/mensajes.service';
import { Mensajes } from '../../Classes/mensajes';

@Component({
  moduleId: module.id,
  selector: 'mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.css']
})
export class MensajesComponent implements OnInit {

  //mensajes: Array<Mensajes> = [];
  error = '' ;
  loading: boolean = false;
  @Input() mensajes: Mensajes;
  @Input() numeroMensajes: number;

  constructor( private router: Router, private servicio: MensajesServices) {
    
   }

   ngOnInit() {
    /*this.servicio.getMensajesList().subscribe(data => {
      this.mensajes = data;
     console.log("mensajes ",this.mensajes);
    });*/

  

  }
  


}
