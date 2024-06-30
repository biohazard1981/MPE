import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';


const httpOptions = {
  headers: new HttpHeaders({
      'content-type': 'application/json',
      'Authorization': 'Basic cm9iZXJ0bzpNUEVyb2JlcnRv'
  })
};

@Component({
  selector: 'app-demanda-lista',
  templateUrl: './demanda-lista.component.html',
  styleUrls: ['./demanda-lista.component.css']
})
export class DemandaListaComponent implements OnInit {

  demandas: any[] = [];
  demandaSeleccionada: any;
  aranceles: any[] = [];
  partesProcesales: any[] = [];
  documentosAdjuntos: any[] = [];
  modalAbierto: boolean = false;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.obtenerDemandas();
  }

  obtenerDemandas(): void {
    this.http.get<any[]>('http://localhost:8080/api/demandas', httpOptions).subscribe(data => {
        this.demandas = data;
    });
}

  showArancelesModal: boolean = false
  showDocumentoAdjuntoModal: boolean = false
  showPartesProcesalesModal: boolean = false

  verAranceles(demanda: any): void {
    this.http.get<any[]>(`http://localhost:8080/api/arancel/${demanda.id}`, httpOptions).subscribe(aranceles => {
      this.aranceles = aranceles;
      this.showArancelesModal = true;
    });
  }

  verDocumentosAdjuntos(demanda: any): void {
    this.http.get<any[]>(`http://localhost:8080/api/documento-adjunto/${demanda.id}`, httpOptions).subscribe(documentosAdjuntos => {
      this.documentosAdjuntos = documentosAdjuntos;
      this.showDocumentoAdjuntoModal = true;
    });
  }

  verPartesProcesales(demanda: any): void {
    this.http.get<any[]>(`http://localhost:8080/api/parte-procesal/${demanda.id}`, httpOptions).subscribe(partesProcesales => {
      this.partesProcesales = partesProcesales;
      this.showPartesProcesalesModal = true;
    });
  }

  closeModala(): void {
    this.showArancelesModal = false; 
  }

  closeModalda(): void {
    this.showDocumentoAdjuntoModal = false; 
  }

  closeModalpp(): void {
    this.showPartesProcesalesModal = false; 
  }
}