<script setup>
import Sidebar from './components/SidebarNotes.vue'
import SidebarNotesMobile from './components/SidebarNotesMobile.vue';
import Notes from './components/Note.vue'
</script>

<template>
  <main>
    <section class="container-fluid desktop">
      <div class="row gy-2 h-100">
        <div class="col-md-5 col-lg-4 d-flex">
          <div class="flex-grow-1 sidebar">
            <Sidebar />
          </div>
        </div>
        <div class="col-md-7 col-lg-8 d-flex">
          <div class="flex-grow-1 note-view">
            <Notes />
          </div>
        </div>
      </div>
    </section>


    <section class="container-fluid mobile">
      <div class="col-12">
        <div class="text-center p-2">
          <SidebarNotesMobile />
        </div>
      </div>
      <div class="col-12 flex-grow-1">
        <div class="h-100 note-view">
          <Notes />
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
main {
  display: flex;
  gap: 1em;
  padding: 1rem;

  & .sidebar,
  .note-view {
    background-color: #333;
  }
}

& .desktop {
  display: block;
}

& .mobile {
  display: none;
}

@media (width <=768px) {
  .desktop {
    display: none;
  }

  .mobile {
    display: flex;
    flex-direction: column;
  }
}
</style>
