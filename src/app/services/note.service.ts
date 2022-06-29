import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Note } from './@types/note';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private notes = [
    {
      id: 1,
      date: new Date(),
      text: "Um texto qualqer 1 ",
      urgent: false,
    },
    {
      id: 2,
      date: new Date(),
      text: "Um texto qualqer 2",
      urgent: false,
    },
    {
      id: 3,
      date: new Date(),
      text: "Um texto qualqer 3 ",
      urgent: true,
    },
    {
      id: 4,
      date: new Date(),
      text: "Um texto qualqer 3 ",
      urgent: true,
    }
  ];


  private apiUrl: string; 

  // incluir nota
  private newNoteSource = new Subject<Note>();
  newNoteProvider = this.newNoteSource.asObservable();

  // editar nota
  private editNoteSource = new Subject<Note>();
  editNoteProvider = this.editNoteSource.asObservable();

  constructor(private http:HttpClient) { 
    this.apiUrl = "https://fiap-notes-api.herokuapp.com";
  }

  //getNotes(){
  //  return this.notes;
  //}

  notifyNewNoteAdded(note: Note){
    this.newNoteSource.next(note)
  }

  notifyEditNote(note: any){
    this.editNoteSource.next(note)
  }

  getNotes(){
    return this.http.get<Note[]>(`${this.apiUrl}/notes`);
  }

  removeNote(noteId: number){
  //   this.notes = this.notes.filter(note => note.id !== noteId);
  //   return this.notes
    return this.http.delete(`${this.apiUrl}/notes/${noteId}`);
   }

   postNotes(textNote: string){
     return this.http.post<Note>(`${this.apiUrl}/notes`, {text: textNote});
   }

   putNote(noteId: number, textNote: string){
      return this.http.put<Note>(`${this.apiUrl}/notes/${noteId}`, {text: textNote});
     }

}
