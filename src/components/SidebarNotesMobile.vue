<script setup>
import { computed, ref } from 'vue';
import { AppState } from '../../appstate.js';
import { notesService } from '../services/NotesService.js';
import { Modal, Offcanvas } from 'bootstrap';

const notes = computed(() => AppState.notes);
const jotCreationData = ref({
  title: '',
  description: '',
  color: ''
})
function selectJot(note) {
  notesService.setActiveJot(note);
  Offcanvas.getInstance("#offcanvasJots").hide();
}

function createJot() {
  notesService.createNote(jotCreationData.value);
  jotCreationData.value = {
    title: '',
    description: '',
    color: ''
  }
  Modal.getInstance("#jot-modal").hide();
}

</script>

<template>
  <button class="btn btn-outline-light rounded px-3 py-2" type="button" data-bs-toggle="offcanvas"
    data-bs-target="#offcanvasJots" aria-controls="offcanvasJots">
    View Jots
  </button>
  <button class="btn btn-outline-light rounded px-3 py-2 ms-2" type="button" data-bs-toggle="modal"
    data-bs-target="#jot-modal">
    Create Jot
  </button>

  <!-- STUB Offcanvas -->
  <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasJots" aria-labelledby="offcanvasJotLabel">
    <div class="offcanvas-header">
      <h4 class="offcanvas-title" id="offcanvasJotLabel">Jots <span class="jot-count">{{ notes.length }}</span></h4>
      <button type="button" class="btn-close bg-light" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
      <section class="container-fluid">
        <div class="jot-list">
          <div class="row gy-3 gx-2">
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
      </section>
    </div>
  </div>

  <!-- STUB Modal -->
  <div class="modal fade" id="jot-modal" tabindex="-1" aria-labelledby="jot-modal-label" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="jot-modal-label">Jot Creation</h1>
          <button type="button" class="btn-close bg-light" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <section class="container">
            <form @submit.prevent="createJot()" class="row">
              <div class="col-12">
                <div class="d-flex flex-column align-items-center my-2">
                  <label class="form-label" for="jotColor">Jot Color</label>
                  <input v-model="jotCreationData.color" class="color-design" type="color" name="jotColor"
                    id="jotColor">
                </div>
              </div>
              <div class="col-12">
                <div class="mb-2">
                  <input v-model="jotCreationData.title" class="form-control" placeholder="Title" minlength="3"
                    maxlength="15" required>
                </div>
              </div>
              <div class="col-12">
                <div class="mb-2">
                  <textarea v-model="jotCreationData.description" class="form-control" placeholder="Description"
                    maxlength="300" rows="5"></textarea>
                </div>
              </div>
              <div class="modal-footer justify-content-center">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button class="btn btn-outline-light">Create Jot</button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.offcanvas {
  background-color: #333;
  color: azure;
}

h4 {
  color: #0ef;
  text-shadow: 1px 1px 9px azure;
}


.jot-contain {
  border-left: 2px solid;
  position: relative;
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

.modal-content {
  background-color: #333;
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

textarea {
  resize: none;
}
</style>