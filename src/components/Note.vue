<script setup>
// @ts-ignore
import { computed, ref, watch } from 'vue';
import jotting from '../assets/img/jotting.webp';
import { AppState } from '../../appstate.js';
import { notesService } from '../services/NotesService.js';
const activeNote = computed(() => AppState.activeNote);

const updateNoteData = ref({
  description: null
})

watch(() => activeNote.value, () => {
  if (activeNote.value === null) return
  updateNoteData.value.description = activeNote.value.description;
}, { immediate: true })

function updateNote() {
  notesService.updateNote(updateNoteData.value.description);
  saveJotData();
}

function deleteNote() {
  const confirmed = confirm("Are you sure you want to delete this note?");
  if (!confirmed) return
  notesService.deleteNote();
  saveJotData();
}

function saveJotData() {
  localStorage.setItem('jots', JSON.stringify(AppState.notes));
}


</script>

<template>
  <section v-if="activeNote !== null" class="active-note">
    <span class="ms-2"><i class="fa-solid fa-bookmark fa-lg" :style="`color: ${activeNote.color};`"></i></span>
    <div class="px-2 py-2">
      <h3>{{ activeNote.title }}</h3>
      <h6>Created on: {{ activeNote.createdAt.toLocaleDateString() }} <br> Last updated: {{
        activeNote.updatedAt.toLocaleDateString() }}</h6>
      <button @click="deleteNote()" type="button" class="btn btn-danger rounded px-2 py-1">Delete</button>
      <button @click="updateNote()" type="button" class="btn btn-info rounded px-2 py-1 text-light ms-2"
        style="text-shadow: 1px 1px 9px #333;">Save</button>
    </div>

    <div class="p-2">
      <textarea rows="9" class="form-control p-3" v-model="updateNoteData.description" name="jotDescription"
        id="jotDescription">
      </textarea>
    </div>


  </section>

  <section v-else class="inactive-note">
    <div class="position-relative">
      <img class="rounded" :src="jotting" alt="Jotting">
      <div class="position-absolute top-0 bottom-0 start-0 end-0 p-4">
        <p>There doesn't seem to be an active jot create or select to one begin</p>
      </div>
    </div>
  </section>
</template>

<style lang="css" scoped>
h1 {
  color: var(--prime-color);
  text-shadow: 1px 1px 9px azure;
}

.inactive-note {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  & img {
    aspect-ratio: 3/2;
    width: 100%;
    height: 35vh;
    opacity: .2;
    object-fit: cover;
    object-position: center;
  }

  & p {
    font-size: 1.1rem;
    text-shadow: 1px 1px 11px #333;
    backdrop-filter: blur(10px);
  }
}
</style>