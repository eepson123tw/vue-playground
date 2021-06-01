<template>
  <div class="todo">
    <h1>todo</h1>
    <!-- <p>show:{{ filter }}</p> -->
    <router-link to="/todo" replace>All</router-link>
    <router-link to="/todo?filter=active" replace>Active</router-link>
    <router-link :to="{ path: '/todo', query: { filter: 'done' } }" replace
      >Done</router-link
    >
    <!-- <div>{{ list }}</div> -->

    <ul>
      <TodoItem
        v-for="item in list"
        :key="item.tid"
        :lists="item.todo"
        @check="value => checkHandler(item.tid, value)"
      ></TodoItem>
      <!-- <li v-for="item in list" :key="item.tid">
        <input type="checkbox" v-model="item.todo.done" /> {{ item.todo.content }}
      </li> -->
    </ul>
  </div>
</template>

<script>
import TodoItem from '@/components/TodoItem.vue'
export default {
  components: {
    TodoItem
  },
  data () {
    return {
      filter: 'all' // all,active,done
    }
  },
  computed: {
    list () {
      return this.$store.getters.filterList(this.filter)
    }
  },
  methods: {
    checkHandler (tid, value) {
      console.log(tid, value)
    }
  },
  watch: {
    // 資料轉變時可以使用，第一層不建議使用箭頭函式會把實體摧毀this
    // $route: function (route) {
    //   this.filter = route.query.filter || 'all'
    // }
    $route: {
      immediate: true, // 只要進入component 馬上就執行
      handler: function (route) {
        // check query =>redirect
        this.filter = route.query.filter || 'all'
      }
    }
  }
}
</script>

<style scoped>
.todo a {
  color: black;
  text-decoration: none;
  display: inline-block;
  width: 50px;
  height: 30px;
  background: grey;
}
.todo .router-link-exact-active {
  color: green;
}
</style>
