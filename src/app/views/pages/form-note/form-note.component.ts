import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Note } from 'src/app/services/@types/note';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-form-note',
  templateUrl: './form-note.component.html',
  styleUrls: ['./form-note.component.css']
})
export class FormNoteComponent implements OnInit {

  titulo = "FIAP NOTES"
  logoImage = "/assets/logo.png";

  checkoutForm: FormGroup;

  subscrition: Subscription;

   private texto: String = '';
   private id: number = 0;
   private isEditting = false; 

  constructor(private formBuilder: FormBuilder,
    private noteService: NoteService) { 
      this.subscrition = this.noteService.editNoteProvider.subscribe((note: Note) =>
      {this.id = note.id,
        this.texto = note.text,
        this.isEditting = true,
      //console.log("Editando a nota" + this.texto),
        this.checkoutForm = this.formBuilder.group({
          textNote: [this.texto, 
         [Validators.required,
         Validators.minLength(5)],
          ],
        }
        )
      }
    );

      this.checkoutForm = this.formBuilder.group({
      textNote: [this.texto, 
      [Validators.required,
      Validators.minLength(5)],
    ],
    })
  }

  ngOnInit(): void {
  }

  sendNote(){
    //console.log(this.checkoutForm.get('textNote')?.errors);
    //console.log("iseditting" + this.isEditting + this.id + this.checkoutForm.value.textNote);
    if(this.checkoutForm.valid){
      if (this.isEditting){
        this.noteService.putNote(this.id , this.checkoutForm.value.textNote).
        subscribe(
          (note) => {
           this.checkoutForm.reset();
            this.noteService.notifyNewNoteAdded(note);
            this.isEditting = false;
          }
        );
      } else {
        this.noteService.postNotes(this.checkoutForm.value.textNote).
        subscribe(
          (note) => {
           this.checkoutForm.reset();
            this.noteService.notifyNewNoteAdded(note);
          }
        );
      }
    }
  }
  

  get textNote(){
    return this.checkoutForm.get('textNote');
  }

}
