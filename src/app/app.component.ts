import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DeporteService } from './services/Deporte/deporte.service';
import { PersonaService } from './services/Persona/persona.service';
import { TorneoService } from './services/Torneo/torneo.service';
import { TorneoDeporteService } from './services/TorneoDeporte/torneo-deporte.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  
  personaForm!: FormGroup;
  personas: any
  torneos: any
  deportes: any
  idtorneodeporte: any
  torneoselected: any
  deporteselected:any

  constructor(
    public fb: FormBuilder,
    public deporteService: DeporteService,
    public personaService: PersonaService,
    public torneoService: TorneoService,
    public torneoDeporteService: TorneoDeporteService,

  ){}

  ngOnInit(): void {

    this.personaForm = this.fb.group({
      idPersona: ['', Validators.required],
      nombre: ['', Validators.required],
      torneo: ['', Validators.required],
      deporte: ['', Validators.required],
      idTorneoDeporte: ['', Validators.required],
    });

    this.torneoService.getAllTorneos().subscribe(resp=>{
      this.torneos=resp;
    },
      error=>{console.error(error)}
    );

    this.personaService.getallpersonas().subscribe(response=>{
      this.personas = response;
    },
      error=>{console.error(error)}
    );

  }

  guardar():void{
    this.personaForm.controls['torneo'].patchValue(this.torneoselected)
    this.personaForm.controls['deporte'].patchValue(this.deporteselected)

    var persona = {
      "idPersona": this.personaForm.controls['idPersona'].value,
      "nombre": this.personaForm.controls['nombre'].value,
      "torneoDeporte": {
              "torneo": this.personaForm.controls['torneo'].value,
              "deporte": this.personaForm.controls['deporte'].value,
              "idTorneoDeporte": this.idtorneodeporte
          }
    } 	
    this.personaService.savepersona(persona).subscribe(resp=>{
      this.personaForm.reset();
      this.personaService.getallpersonas().subscribe(response=>{
        this.personas = response;
      },
        error=>{console.error(error)}
      );
    },  
      error => {console.error(error)}
    )
  }

  cargardeportestorneo(event: Event){
    this.torneoDeporteService.getdeportesbyidtorneo((event.target as HTMLInputElement).value.split(" ")[1]).subscribe(resp=>{
      this.deportes = resp;
      this.torneoService.getTorneobyid((event.target as HTMLInputElement).value.split(" ")[1]).subscribe(torn=>{
        this.torneoselected = torn
      })
    },
      error=> { console.error(error)}  
    )
  }

  setdeporte(event: Event){
    this.deporteService.getdeportebyid((event.target as HTMLInputElement).value.split(" ")[1]).subscribe(dep=>{
      this.deporteselected = dep
      this.updatejson();
    })
  }

  updatejson(){
    this.torneoDeporteService.gettorneodeportebyids(this.torneoselected.idTorneo, this.deporteselected.idDeporte).subscribe(id=>{
      this.idtorneodeporte = id
    })
  }

  updatepersona(persona: any){
    this.torneoService.getTorneobyid(persona.torneoDeporte.torneo.idTorneo).subscribe(res=>{
      this.torneoselected = res;
    });
    
    this.deporteService.getdeportebyid(persona.torneoDeporte.deporte.idDeporte).subscribe(res=>{
      this.deporteselected = res
    });

    this.idtorneodeporte = persona.torneoDeporte.idTorneoDeporte;

    this.personaForm.setValue({
      idPersona: persona.idPersona,
      nombre: persona.nombre,
      torneo: persona.torneoDeporte.torneo.idTorneo,
      deporte: persona.torneoDeporte.deporte.idDeporte,
      idTorneoDeporte: persona.torneoDeporte.idTorneoDeporte,
    })
  }

  deletepersona(persona:any){
    this.personaService.deletepersona(persona.idPersona).subscribe();
    this.personas = this.personas.filter((item: { idPersona: any; }) => item.idPersona != persona.idPersona)
  }
}
