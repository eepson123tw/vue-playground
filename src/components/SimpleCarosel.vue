<template>
  <div>
    <transition-group tag="div" class="container" :name="transotionName">
      <div
        class="page"
        v-for="(img, index) of imgs"
        :key="index"
        v-show="index === show"
      >
        <img v-lazy:src="img.src" alt="" />
      </div>
    </transition-group>
    <button @click="caroselhandler" ref="left" data-go="left">left</button>
    <button v-for="number in imgs.length" :key="number - 1">
      {{ number }}
    </button>
    <button @click="caroselhandler" ref="right" data-go="right">right</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      show: 0,
      transotionName: 'left-in',
      imgs: [
        {
          src: '../images/dom.jpg'
        },
        {
          src: './images/fall.jpg'
        },
        {
          src: './images/fire.jpg'
        },
        {
          src: './images/sakurabg.jpg'
        },
        {
          src: './images/下載.jpg'
        }
      ]
    }
  },
  methods: {
    caroselhandler (e) {
      const direction = e.target.dataset.go
      if (direction === 'left') {
        this.transotionName = 'left-in'
        if (this.show <= 0) {
          this.show = this.imgs.length - 1
          return
        }
        this.show -= 1
      }
      if (direction === 'right') {
        this.transotionName = 'right-in'
        if (this.show >= this.imgs.length - 1) {
          this.show = 0
          return
        }
        this.show += 1
      }
    }
  }
}
</script>

<style scoped>
.container {
  width: 500px;
  height: 700px;
  overflow: hidden;
  margin: 0 auto;
  display: flex;
}
.page {
  position: relative;
  widows: 500px;
  height: 700px;
}
img {
  position: absolute;
  display: inline-block;
  width: 500px;
  height: 700px;
  background-size: contain;
  top: 0;
  left: 0;
}
.left-in-enter {
  left: 100%;
}
.left-in-enter-active {
  transition: left 0.5s;
}
.left-in-enter-to {
  left: 0;
}
.left-in-leave {
  left: 0;
}
.left-in-leave-active {
  transition: left 0.5s;
}
.left-in-leave-to {
  left: -100%;
}
.right-in-enter {
  right: 100%;
}
.right-in-enter-active {
  transition: right 0.5s;
}
.right-in-enter-to {
  right: 0;
}
.right-in-leave {
  right: 0;
}
.right-in-leave-active {
  transition: right 0.5s;
}
.right-in-leave-to {
  right: -100%;
}
</style>
