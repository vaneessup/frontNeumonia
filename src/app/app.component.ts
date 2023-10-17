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
  data: any;
  payload: any;

  constructor(private apiService: MedicineService) { }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    const fileInput = event.target;
    if (this.selectedFile != null){
      this.result = true;
      this.payload = this.selectedFile;
    }else {
      this.result = false;
    }
    fileInput.value = "";
  }

  getImageDataUrl(file: File): string {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imageUrl = reader.result as string;
    };
    return this.imageUrl; // Devuelve la URL de datos
  }

  deletedFile(): void {
    if(this.selectedFile != null){
        console.log("No ha seleccionado una imagen");
    }else{
      this.selectedFile = undefined;
      console.log("imagen eliminada");
    }

  }

  resultImg(): void {
    console.log(this.payload, 'imageeeen');
    if(this.result){
      this.apiService.getData(this.payload).subscribe((response) => {
        this.data = response;
        console.log(this.data);
      }, error => {
          console.error('ERROR', error);
      });
    }
   
    
  }
  
  
}
