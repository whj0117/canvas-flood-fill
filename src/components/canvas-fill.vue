<!--
 * @Author: wanghongjian
 * @Date: 2022-06-11 18:02:00
 * @LastEditors: wanghongjian
-->
<template>
  <div class="canvasFill">
    <!-- <button @click="getNum">截图</button> -->
    <button @click="generateCanvas">一键生成</button>
    <canvas id="canvas" ref="resultCanvas" width="1148" height="870"></canvas>
    <div @click="wire"></div>
  </div>
</template>

<script>
import { floodFillLinear } from '../utils/floodFillLinear'
import { dataArr } from '../utils/common'
import { hexToRgb, randomColor, downloadResult } from '../utils/utils'
const canvasNum = 1
export default {
  name: 'canvasFill',
  props: {
  },
  data() {
    return {
      chooseColor: null,
      count: 0,
      myCanvas: null,
      ctx: null,
      countNum: 0
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      if (this.ctx) {
        this.count = 0;
        this.ctx.clearRect(0, 0, 1148, 870);
        this.myCanvas = null;
        this.ctx = null;
      }
      this.myCanvas = document.getElementById('canvas')
      this.ctx = this.myCanvas.getContext('2d');
      let image = new Image();
      image.onload = () => {
        this.ctx.drawImage(image, 0, -100);
      };
      image.src = '/img/img_canvas2.jpg';
    },
    generateCanvas() {
      this.RepeatRender()
    },
    RepeatRender() {
      let timer = null
      if (this.count >= dataArr.length - 1) {
        console.log('>>>>>>>>>>>>>>>>>>', this.count)
        clearTimeout(timer);
        downloadResult(this.$refs.resultCanvas)
        this.countNum++
        this.init()
        if (this.countNum < canvasNum) {
          this.RepeatRender()
        }
        return false;
      }
      timer = setTimeout(() => {
        // 随机获取colorArr中的颜色
        // const random = Math.floor(Math.random() * (colorArr.length - 1));

        const fillColor = hexToRgb(randomColor()).split(',');
        fillColor.push(255);
        floodFillLinear(this.myCanvas, dataArr[this.count].left, dataArr[this.count].top, fillColor, 80);

        this.count++;
        this.RepeatRender();
      }, 100);
    },
    wire() {
      if (!this.chooseColor) {
        alert('请选择要填充的颜色');
        return false;
      }
    },

  }
}
</script>

<style scoped>
</style>
