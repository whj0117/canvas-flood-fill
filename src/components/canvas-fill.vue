<!--
 * @Author: wanghongjian
 * @Date: 2022-06-11 18:02:00
 * @LastEditors: wanghongjian
-->
<template>
  <div class="canvas-fill">
    <!-- <button @click="getNum">截图</button> -->
    <button @click="generateCanvas">一键生成</button>
    <div class="draw-wrap">
      <canvas id="canvas" ref="resultCanvas" width="1148" height="870"></canvas>
      <div class="wire" ref="wire" @click="wireClick"></div>
    </div>
    <div>
      <ul class="colorWrapper">
        <li :class="['colorList', { checked: oIndex === index }]" v-for="(item, index) in colorArr" :key="item"
          @click="toggleColor(item, index)" :style="{ backgroundColor: `#${item}` }"></li>
      </ul>
    </div>
  </div>
</template>

<script>
import { floodFillLinear } from '../utils/floodFillLinear'
import { dataArr, colorArr } from '../utils/common'
import { hexToRgb, randomColor, downloadResult,getOffsetSum } from '../utils/utils'
// import canvasImg from '@assets/img/img_canvas2.jpg'
const canvasNum = 1
export default {
  name: 'canvasFill',
  props: {
  },
  data() {
    return {
      colorArr: colorArr,
      chooseColor: null,
      count: 0,
      myCanvas: null,
      ctx: null,
      countNum: 0,
      oIndex: null,
      isColor: true
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    toggleColor(item, index) {
      this.chooseColor = item
      this.oIndex = index
      this.isColor = true
    },
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
      image.src = canvasImg;
    },
    wireClick(e) {
      if (!this.chooseColor) {
        alert('请选择要填充的颜色');
        return false;
      }
      e = e.originalEvent || e;
      let wireOffset = getOffsetSum(this.$refs['wire']);
      let left = Math.floor(e.pageX - wireOffset.left);
      let top = Math.floor(e.pageY - wireOffset.top);
      let imgData = this.ctx.getImageData(left, top, 1, 1);
      let colorArr = imgData.data;
      if (colorArr[0] === 0 && colorArr[1] === 0 && colorArr[2] === 0 && colorArr[3] === 0) {
        alert('此处不能上色');
        return false;
      }
      //判断是否点在线条上
      if (colorArr[0] < 50 && colorArr[1] < 50 && colorArr[2] < 50 && colorArr[3] === 255) {
        alert('线条处不能上色');
        return false;
      }
      let fillColor = hexToRgb(this.chooseColor).split(',');
      fillColor.push(255);
      floodFillLinear(this.myCanvas, left, top, fillColor, 80);
    },
    generateCanvas() {
      this.isColor = false
      this.RepeatRender()
    },
    RepeatRender() {
      let timer = null
      if (this.count >= dataArr.length - 1) {
        clearTimeout(timer);
        if (this.isColor) return false
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
  }
}
</script>

<style lang="less" scoped>
.draw-wrap {
  width: 1148px;
  height: 870px;
  position: absolute;
  top: 10%;
  left: 54px;

  .wire {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
  }
}

.colorWrapper {
  background-color: #fff;
  border-radius: 29px;
  padding: 8px;
  position: absolute;
  left: 28px;
  top: 680px;
  /*width:700px;*/
  z-index: 10;

  .colorList {
    width: 81px;
    height: 81px;
    margin: 10px 8px;
    border-radius: 50%;
    float: left;
    overflow: hidden;
    text-indent: -9999px;

    &.checked {
      background-image: url('@assets/img/color_checked.png');
      background-repeat: no-repeat;
      background-position: 0 0;
    }
  }
}
</style>
