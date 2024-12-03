import {AppState} from '../../appstate.js';
import {Note} from '../models/Note.js';

class NotesService {
  setActiveJot(note) {
    AppState.activeNote = note;
  }
  createNote(jotData) {
    const newJot = new Note(jotData);
    AppState.notes.push(newJot);
    AppState.activeNote = newJot;
  }
  updateNote(noteData) {
    AppState.activeNote.description = noteData;
    AppState.activeNote.updatedAt = new Date();
    const noteIndex = AppState.notes.findIndex((note) => AppState.activeNote.title === note.title);
    AppState.notes.splice(noteIndex, 1, AppState.activeNote);
  }

  deleteNote() {
    const noteIndex = AppState.notes.findIndex((note) => AppState.activeNote.title === note.title);
    AppState.notes.splice(noteIndex, 1);
    AppState.activeNote = null;
  }
}

export const notesService = new NotesService();
