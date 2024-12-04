import {reactive} from 'vue';
import {Note} from './src/models/Note.js';

export const AppState = reactive({
  /**@type {Note[]} */
  notes: [],
  /**@type {Note} */
  activeNote: null,
});
