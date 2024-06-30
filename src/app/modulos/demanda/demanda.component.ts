import { Component, OnInit} from '@angular/core';
import { DemandaService } from './demanda.service';
import Swal from "sweetalert2";

import { Router } from '@angular/router';

@Component({
  selector: 'app-demanda',
  templateUrl: './demanda.component.html',
  styleUrl: './demanda.component.css'
})

export class DemandaComponent {
  distritojudicial: string = '';
  instancia: string = '';
  especialidad: string = '';
  sede: string = '';
  subespecialidad: string = '';
  motivoingreso: string = '';
  proceso: string = '';
  materia: string = '';
  sumilla: string = '';

  constructor(private demandaService: DemandaService,private router: Router) { }
  guardarDemanda(): void {
    
    if (!this.camposDemandaLlenos() || !this.camposPartesProcesalesLlenos() || !this.camposArancelesLlenos() || !this.camposDocumentosAdjuntosLlenos()) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Por favor complete todos los campos antes de guardar la demanda',
        showConfirmButton: false,
        timer: 3000
      });
      return; 
    }
    
    const demanda = {
      distritojudicial: this.distritojudicial,
      instancia: this.instancia,
      especialidad: this.especialidad,
      sede: this.sede,
      subespecialidad: this.subespecialidad,
      motivoingreso: this.motivoingreso,
      proceso: this.proceso,
      materia: this.materia,
      sumilla: this.sumilla,
    };

    this.demandaService.guardarDemanda(demanda).subscribe((demandaGuardada: any) => {
      const demandaId = demandaGuardada.id; 
      console.log('Demanda guardada correctamente:', demandaGuardada);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Se registró la demanda correctamente',
        html: `Demanda ID: ${demandaId}`,
        showConfirmButton: false,
        timer: 3000
      });

      this.partesProcesalesFueraModal.forEach(parteProcesal => {
        parteProcesal.demandaid = demandaId; 
        this.demandaService.guardarParteProcesal(parteProcesal).subscribe(resp => {
          console.log('Parte procesal guardada correctamente:', resp);
        }, error => {
          console.error('Error al guardar la parte procesal:', error);
        });
      });
  
      this.ArancelesFueraModal.forEach(arancel => {
        arancel.demandaid = demandaId; 
        this.demandaService.guardarArancel(arancel).subscribe(resp => {
          console.log('Arancel guardado correctamente:', resp);
        }, error => {
          console.error('Error al guardar el arancel:', error);
        });
      });
  
      this.documentosAdjuntos.forEach(documento => {
        documento.demandaid = demandaId; 
        this.demandaService.guardarDocumentoAdjunto(documento).subscribe(resp => {
          console.log('Documento adjunto guardado correctamente:', resp);
        }, error => {
          console.error('Error al guardar el documento adjunto:', error);
        });
      });
    }, error => {
      console.error('Error al guardar la demanda:', error);
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Error al registrar la demanda',
        showConfirmButton: false,
        timer: 3000
      });
    });
  }

  camposDemandaLlenos(): boolean {
    return !!this.distritojudicial && !!this.instancia && !!this.especialidad && !!this.sede &&
           !!this.subespecialidad && !!this.motivoingreso && !!this.proceso && !!this.materia &&
           !!this.sumilla;
  }

  camposArancelesLlenos(): boolean {
    return this.ArancelesFueraModal.length > 0 && 
           this.ArancelesFueraModal.every(arancel => arancel.numerocomprobante && arancel.fechaemision &&
                                                  arancel.monto && arancel.concepto);
  }


  camposDocumentosAdjuntosLlenos(): boolean {
    return this.documentosAdjuntos.length > 0 && 
           this.documentosAdjuntos.every(documento => documento.nombre && documento.tamano && documento.paginas);
  }


  camposPartesProcesalesLlenos(): boolean {
    return this.partesProcesalesFueraModal.length > 0 && 
           this.partesProcesalesFueraModal.every(parteProcesal => parteProcesal.tipoparte && parteProcesal.tipopersona &&
                                                  parteProcesal.tipodocumento && parteProcesal.numerodocumento);
  }

  tipoparte: string = '';
  tipopersona: string = '';
  tipodocumento: string = '';
  numerodocumento: string = '';

  partesProcesales: any[] = [];
  partesProcesalesFueraModal: any[] = [];

  agregarPartesProcesales(): void {
    if (
      !this.tipoparte ||
      !this.tipopersona ||
      !this.tipodocumento ||
      !this.numerodocumento
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, complete todos los campos',
      });
      return; 
    }
    const nuevaParteProcesal = {
      tipoparte: this.tipoparte,
      tipopersona: this.tipopersona,
      tipodocumento: this.tipodocumento,
      numerodocumento: this.numerodocumento,
    };
    this.partesProcesales.push(nuevaParteProcesal);
    this.limpiarCampos();
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Se agregó la parte procesal correctamente',
      showConfirmButton: false,
      timer: 1500,
    });
  }

  numerocomprobante: string = '';
  fechaemision: string = '';
  monto: string = '';
  concepto: string = '';

  Aranceles: any[] = [];
  ArancelesFueraModal: any[] = [];

  agregarAranceles(): void {
    if (
      !this.numerocomprobante ||
      !this.fechaemision ||
      !this.monto ||
      !this.concepto
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, complete todos los campos',
      });
      return; 
    }
    const nuevoArancel = {
      numerocomprobante: this.numerocomprobante,
      fechaemision: this.fechaemision,
      monto: this.monto,
      concepto: this.concepto
    };
  
    this.Aranceles.push(nuevoArancel);
    this.limpiarCampos();
  
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Se agregó el arancel correctamente',
      showConfirmButton: false,
      timer: 1500
    });
  }

  limpiarCampos(): void {
    this.numerocomprobante = '';
    this.fechaemision = '';
    this.monto = '';
    this.concepto = '';
  }

  cerrarModalArancel(): void {
    this.ArancelesFueraModal.push(...this.Aranceles);
    this.Aranceles = [];
  }

  cerrarModalPartesProcesales(): void {
    this.partesProcesalesFueraModal.push(...this.partesProcesales);
    this.partesProcesales = [];
  }
  
  documentosAdjuntos: any[] = [];

  openFileInput(): void {
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
      fileInput.click();
    }
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    const reader: FileReader = new FileReader();

    reader.onloadend = () => {
      const pdfData = reader.result;
      const numeroPaginas = 5;
      const documento = {
        nombre: file.name,
        tamano: this.bytesToSize(file.size),
        paginas: numeroPaginas
      };
      this.documentosAdjuntos.push(documento);
    };

    reader.readAsDataURL(file);
  }

  bytesToSize(bytes: number): string {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Byte';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + ' ' + sizes[i];
  } 
  }




  
