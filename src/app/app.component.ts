import { Component } from '@angular/core';
import { MedicineService } from './medicine.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'web_front';
  selectedFile: File | undefined;
  imageUrl: any;
  result = false;
  status: any;
  statusd = false;
  data: any;
  payload: FormData = new FormData();
  porcentajeTrue: any;
  end: any;
  count = 0;
  img1: any;
  img2: any;
  img3: any;
  img4: any;
  nombre: string | undefined;
  true1: any;
  true2: any;
  true3: any;
  true4: any;
  false1: any;
  false2: any;
  false3: any;
  false4: any;
  counter = 0;

  constructor(private apiService: MedicineService) { }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    const fileInput = event.target;

    if (this.selectedFile) {
      this.result = true;
      this.payload.append('imagen', this.selectedFile, this.selectedFile.name); 
    } else {
      this.result = false;
    }
    fileInput.value = '';
  }

  getImageDataUrl(file: File): string {
    this.count++;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imageUrl = reader.result as string;
    };
    switch(this.count){
      case 1: this.img1 = this.imageUrl; break
      case 2: this.img2 = this.imageUrl; break
      case 3: this.img3 = this.imageUrl; break
      case 4: this.img4 = this.imageUrl; break
    }
    return this.imageUrl; 
  }

  deletedFile(): void {
    if (this.selectedFile) {
      this.selectedFile = undefined;
      this.payload.delete('imagen'); 
      this.statusd = false
      this.imageUrl = ''
    } else {
    }
  }

  resultImg(): void {
    
    this.statusd = false; 
    this.apiService.getData(this.payload).subscribe((response) => {
      this.counter++;
      this.statusd = true;
      this.data = response;
      if (this.data.resultado.resultado === true){
        this.status = 'El paciente tiene un ';
        this.porcentajeTrue = this.data.resultado.confiabilidad_si;
        this.end = 'de tener neumonía'
      }else{
        this.status = 'El paciente tiene un ';
        this.porcentajeTrue = this.data.resultado.confiabilidad_no;
        this.end = 'de no tener neumonía '
      }

      switch(this.counter){
        case 1: this.true1 = this.porcentajeTrue; break
        case 2: this.true2 = this.porcentajeTrue; break
        case 3: this.true3 = this.porcentajeTrue; break
        case 4: this.true4 = this.porcentajeTrue; break       
      }
    }, error => {
        console.error('ERROR', error);
    });
  // }
 
  
}
  
  
}