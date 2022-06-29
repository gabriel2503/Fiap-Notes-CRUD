import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Note } from 'src/app/services/@types/note';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-list-notes',
  templateUrl: './list-notes.component.html',
  styleUrls: ['./list-notes.component.css']
})
export class ListNotesComponent implements OnInit {

  notes = [] as Note[];

  subscription: Subscription;

  // injetando a dependencia do service (traz do note.service)
  constructor(private noteService: NoteService) {
    this.subscription = this.noteService.newNoteProvider.subscribe((note: Note) => {
      this.getApiNotes();
      //this.notes.push(note);
    });
   }

  //metodo do ciclo de vida do  (renderiza o que esta no service)
  ngOnInit(): void {
    //this.notes = this.noteService.getNotes();
    this.getApiNotes();
  }

  getApiNotes(){
    this.noteService.getNotes().subscribe({
      next: (apiNotes) => this.notes = apiNotes,
      error: (error) => console.error(error),
      //complete: () => alert("Deu tudo certo")
    });
  }

  removeNote(noteId: number){
   this.noteService.removeNote(noteId).subscribe(
     () => this.getApiNotes()
   );
  }

}
