<template>
  <div class="cardslider">
    <transition-group class="card-slider-items" name="flip-list">
      <div
        class="card-slider-item"
        v-for="item in showImage"
        :key="item.id"
        :data-id="item.id"
      >
        <img :src="item.src" alt="" />
      </div>
    </transition-group>
    <button @click="change(now - 1)">prev</button>
    <button @click="change(now + 1)">next</button>
  </div>
</template>

<script>
export default {
  name: 'CardSlider',
  data () {
    return {
      screenWidth: document.documentElement.clientWidth, // 螢幕寬度
      screenHeight: document.documentElement.clientHeight, // 螢幕高度
      now: 0,
      imgs: [
        { id: 0, src: '../images/dom.jpg' },
        { id: 1, src: './images/fall.jpg' },
        { id: 2, src: './images/fire.jpg' },
        { id: 3, src: './images/sakurabg.jpg' },
        { id: 4, src: './images/下載.jpg' }
      ]
    }
  },
  computed: {
    allimages () {
      // 5+4
      const ary = []
      const total = this.imgs.length
      let count
      if (total > 0) {
        while (ary.length < 9) {
          count = Math.floor(ary.length / total)
          for (let i = 0; i < total; i++) {
            ary.push({
              id: `${count}-${this.imgs[i].id}`,
              src: this.imgs[i].src
            })
          }
        }
      }
      return ary
    },
    showImage () {
      const start = this.now - 4 // 要補足現在顯示之前的卡片張數
      // 從幾開始切 再接上之後的
      return this.allimages.slice(start).concat(this.allimages.slice(0, start))
    }
  },
  methods: {
    change (index) {
      const limit = this.allimages.length - 1
      this.now = index < 0 ? limit : index > limit ? 0 : index
    },
    windowChangeWidth () {
      console.log(123)
      const dom = document.querySelector('.cardslider')
      dom.style.width = `${50}%`
    }
  },
  watch: {
    screenWidth: {
      immediate: true,
      handler (old, val) {
        if (val < 1200) {
          this.windowChangeWidth()
        }
      }
    }
  },
  mounted () {
    var _this = this
    window.onresize = function () {
      // 定義視窗大小變更通知事件
      _this.screenWidth = document.documentElement.clientWidth // 視窗寬度
    }
  }
}
</script>

<style>
.cardslider {
  width: 100%;
  display: flex;
  margin-bottom: 20px;
  overflow: hidden;
}
.card-slider-items {
  display: flex;
  width: 100%;
  margin-left: calc(-1 * 4% * 2.5);
  justify-content: space-evenly;
}
.card-slider-item {
  flex: calc(4%-20px) 0 0;
  margin: 10px;
}
.card-slider-item:first-child,
.card-slider-item:last-child {
  z-index: -1;
  opacity: 0;
}
img {
  display: block;
  width: 364px;
  height: 500px;
}
.flip-list-move {
  transition: transform 2s;
}
</style>
