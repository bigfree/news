<template>
  <div>
<!--    <Navbar/>-->
    <NuxtPage :user="user" />
  </div>
</template>

<script setup>
const user = ref({ name: 'Candidate', role: 'Admin' });

const createNewUser = () => {

}
</script>