<template>
  <div class="about">
    <h1>This is an post number</h1>

    <select v-model="chooseCity">
      <option :value="null">請選擇</option>
      <option v-for="(city, index) in citys" :key="index" :value="index">{{
        city
      }}</option>
    </select>
    <select v-model="distSelect">
      <option :value="null">請選擇</option>
      <option v-for="dist in districts" :key="dist.name" :value="dist.zip">{{
        dist.name
      }}</option>
      <!-- <option
        v-for="(dist, index) in districts"
        :key="dist.zip"
        :value="index"
        >{{ dist.name }}</option
      > -->
    </select>
  </div>
</template>
<script>
const postdata = require('@/assets/post.json')

export default {
  data () {
    return {
      chooseCity: null,
      distSelect: null
    }
  },
  computed: {
    citys () {
      return postdata.map(item => item.name)
    },
    districts () {
      let districts = []
      if (this.chooseCity !== null) {
        districts = postdata[this.chooseCity].districts
      }
      return districts
    }
  },
  watch: {
    chooseCity: {
      immediate: true,
      handler () {
        if (this.chooseCity !== null) {
          this.distSelect = null
        }
      }
    }
  }
}
</script>
