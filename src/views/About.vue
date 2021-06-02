<template>
  <div class="about">
    <h1>This is an about page</h1>
    <Cardslider></Cardslider>
    <SimpleCarosel></SimpleCarosel>
  </div>
</template>

<script>
import SimpleCarosel from '@/components/SimpleCarosel.vue'
import Cardslider from '@/components/Cardslider.vue'
export default {
  components: {
    SimpleCarosel,
    Cardslider
  }
}
</script>
