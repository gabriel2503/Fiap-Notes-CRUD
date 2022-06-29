import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Note } from 'src/app/services/@types/note';
import { NoteService } from 'src/app/services/note.service';


@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {

//  note = {
//    id: 1,
//    date: new Date(),
//    text: "Um texto qualqer0",
//    urgent: true,
//  }

@Input()
noteProp?: Note;

@Output()
notify = new EventEmitter();



  constructor(private noteService: NoteService) { }

  ngOnInit(): void {
  }

  confirmRemove(){
    if (confirm("Deseja realmente apagar?"))
    this.notify.emit();
  }

  confirmEdit(){
    if (confirm("Deseja realmente editar esta nota?"))
      //alert("edita teste " + this.noteProp?.text)
      this.noteService.notifyEditNote(this.noteProp);
  }

}
