import Vue from 'vue'
import Vuex from 'vuex'
import LocalStorage from '@/modules/localStorage'

Vue.use(Vuex)

// 將localstorage 切分出來 避免相依  使用模組化進行開發
const STORE = new LocalStorage('todo-vue')

export default new Vuex.Store({
  state: {
    todos: [{ content: 123, done: false }, { content: 456, done: false }]
  },
  mutations: {
    SET_TODOS (state, todos) {
      state.todos = todos
    }
  },
  actions: { // 回傳promise
    CREATE_TODO ({ commit }, { todo }) {
      // 1.post
      const todos = STORE.load()
      todos.push(todo)
      STORE.save(todos)
      // 2.寫入state(commit mutation)
      commit('SET_TODOS', todos)
      // 3.return(獲得動作完成之提示)
      return {
        tid: todos.length - 1,
        todo
      }
    },
    READ_TODOS ({ commit }) {
      // 1. GET
      const todos = STORE.load()
      // 2. commit mutation
      commit('SET_TODOS', todos)
      // 3. return
      return {
        todos
      }
    },
    // UPDATE_TODOS({ commit }, { tId, content }) {
    //     // 1.update
    //     const todos = STORE.load()
    //         // 2.寫入state(commit mutation)
    //         // 回傳刪除的東西
    //     todos[tId].content = content
    //     STORE.save(todos)
    //     commit('SET_TODOS', todos)
    //         // 3.return(獲得動作完成之提示)
    //     return {
    //         tId,
    //         todo:todos[tId]
    //     }
    // },
    UPDATE_TODOS ({ commit }, { tId, todo }) {
      // 1.update
      const todos = STORE.load()
      // 2.寫入state(commit mutation)
      // 回傳刪除的東西
      todos.splice(tId, 1, todo)
      STORE.save(todos)
      commit('SET_TODOS', todos)
      // 3.return(獲得動作完成之提示)
      return {
        tId,
        todo
      }
    },
    DELETE_TODOS ({ commit }, { tId }) {
      // 1.delete
      const todos = STORE.load()
      // 2.寫入state(commit mutation)
      // 回傳刪除的東西
      const todo = todos.splice(tId, 1)[0]
      STORE.save(todos)
      commit('SET_TODOS', todos)
      // 3.return(獲得動作完成之提示)
      return {
        tId: null,
        todo
      }
    }
  },
  getters: {
    list (state) {
      return state.todos.map((todo, tid) => {
        return {
          tid,
          todo
        }
      })
    },
    filterList: (state, getters) => {
      return (filter) => {
        let status = null
        switch (filter) {
          case 'all':
            return getters.list
          case 'active':
            status = false
            break
          case 'done':
            status = true
            break
        }
        return getters.list.filter((todo) => { return todo.todo.done === status })
      }
    }
  }

  // filterList(state){
  //   return function(filter){

  //   }
  // }
  // modules: {
  // }
})
