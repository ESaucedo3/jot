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
  saveJotData();
}

function selectJot(note) {
  notesService.setActiveJot(note);
}

function saveJotData() {
  localStorage.setItem('jots', JSON.stringify(AppState.notes));
}
</script>

<template>
  <div class="p-3">
    <h1 class="mt-1">Jots <span class="jot-count">{{ notes.length }}</span></h1>
    <hr>
    <form class="d-flex justify-content-between align-items-center" @submit.prevent="createNote()">
      <div class="mb-2 mb-lg-0">
        <input v-model="jotCreationData.color" class="color-design" type="color" name="jotColor" id="jotColor"
          title="Select color">
      </div>
      <div class="mb-2 mb-lg-0">
        <input v-model="jotCreationData.title" class="form-control" minlength="3" maxlength="15" placeholder="Title"
          required>
      </div>
      <div class="mb-2 mb-lg-0">
        <button class="btn btn-outline-light rounded">Create Jot</button>
      </div>
    </form>
    <hr>
    <div v-if="notes" class="jot-list">
      <div class="row gy-2">
        <div v-for="note in notes" :key="note" class="col-12">
          <div class="jot-contain" :style="`border-left-color: ${note.color};`">
            <div class="d-flex justify-content-between px-2">
              <h5>{{ note.title }}</h5>
              <p>{{ note.createdAt.toLocaleDateString() }}</p>
            </div>
            <p class="text-start ps-2">{{ note.description.substring(0, 50) }}...</p>
            <button type="button" @click="selectJot(note)" class="jot-select"></button>
          </div>
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

.color-design {
  aspect-ratio: 1/1;
  width: 50px;
  height: 45px;
  border-radius: 50%;
  border: none;
  padding: 0;
  overflow: hidden;
}

.jot-contain {
  border-left: 2px solid;
  position: relative;
}

.jot-select {
  background: none;
  border: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.jot-list {
  overflow-y: scroll;
  overflow-x: hidden;
  max-height: 70vh;
  max-height: 70dvh;
}

@media (width <=992px) {
  form {
    flex-direction: column;
  }
}
</style>