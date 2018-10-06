<template>
    <nav>
      <ul>
        <li v-for="router in routes">
          <router-link :to="router.path">{{ router.titulo }}</router-link>
        </li>
      </ul>
    </nav>
</template>


<script>
export default {
    props: ['routes']
}
</script>
    

<style>

</style>


