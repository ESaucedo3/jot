import {reactive} from 'vue';
import {Note} from './src/models/Note.js';

export const AppState = reactive({
  /**@type {Note[]} */
  notes: [
    new Note({title: 'CSS is cool!', description: "Has it ups and downs overall however it's awesome to work with", color: '#FF2400'}),
    new Note({title: 'JavaScript Facts!', description: 'JavaScript is very good at doing math!', color: '#FFFF33'}),
  ],
  /**@type {Note} */
  activeNote: null,
});
