<template>
  <div>
    <li @click="todoHandler">
      <input type="checkbox" v-model="lists.done" />
      {{ lists.content }}
      <input v-if="show" type="text" v-model="lists.content" />
    </li>
  </div>
</template>

<script>
export default {
  data () {
    return {
      show: false
    }
  },
  props: {
    lists: {
      type: Object,
      require: true
    }
  },
  methods: {
    todoHandler () {
      this.show = !this.show
      this.$emit('check', this.show)
    }
  }
}
</script>

<style></style>
