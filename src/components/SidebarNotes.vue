<script setup>
import { computed, ref } from 'vue';
import { AppState } from '../../appstate.js';
import { notesService } from '../services/NotesService.js';

const notes = computed(() => AppState.notes);
const jotCreationData = ref({
  color: '',
  title: '',
})

function createNote() {
  notesService.createNote(jotCreationData.value);
  jotCreationData.value = {
    color: '',
    title: '',
  }
}

// NOTE Left Off Here
</script>

<template>
  <div class="p-3">
    <h1 class="mt-1">Jots <span class="jot-count">{{ notes.length }}</span></h1>
    <hr>
    <form @submit.prevent="createNote()">
      <div class="d-flex align-items-center p-2">
        <div>
          <input v-model="jotCreationData.color" type="color" name="noteColor" id="noteColor">
        </div>

        <div>
          <input v-model="jotCreationData.title" class="form-control" placeholder="Title">
        </div>

        <div class="flex-grow-1">
          <button class="btn btn-outline-light rounded-pill px-3 py-1">Create Jot</button>
        </div>
      </div>
    </form>
    <div class="jot-list">
      <div class="row gy-2">
        <div v-for="note in notes" :key="note" class="col-12">
          <h3>{{ note.title }}</h3>
          <p>{{ note.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
h1 {
  color: var(--prime-color);
  text-shadow: 1px 1px 9px rgba(240, 255, 255, 0.7);
}

.jot-count {
  background: linear-gradient(to right, #5850A5 30%, #3AB5CB 60%, #692DB4 90%);
  background-clip: text;
  color: transparent;
  background-size: 500% auto;
  animation: jotShine 5s ease-in-out infinite alternate;
}

@keyframes jotShine {
  0% {
    background-position: 0% 50%;
  }

  100% {
    background-position: 100% 50%;
  }
}

.jot-list {
  overflow-y: scroll;
  overflow-x: hidden;
  max-height: 70vh;
  max-height: 70dvh;
}
</style>