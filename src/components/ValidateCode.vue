<template>
    <div
      class="validate-code"
      @click="drawValidateCode()"
      ng-style="{
        width: codeConfig.width + 'px',
        height: codeConfig.height + 'px'}">
        <canvas id="canvas"></canvas>
    </div>
</template>
<script>
export default {
  name: 'ValidateCode',
  props: ['trueCode', 'config'],
  data () {
    return {
      code: this.trueCode,
      defaultConfig: {
        width: 98,
        height: 40
      }
    }
  },
  computed: {
    codeConfig () {
      var _config = {}
      for (let k in this.defaultConfig) {
        _config[k] = this.config[k] || this.defaultConfig[k]
      }
      return _config
    }
  },
  mounted () {
    this.drawValidateCode()
  },
  watch: {
    code (newVal) {
      // prop 是单向绑定的,组件的prop值只读不写
      // this.trueCode = newVal

      this.$emit('on-code-change', newVal)
    }
  },
  methods: {
    // 随机生成RGB颜色
    randomRgbColor () {
      let r = Math.floor(Math.random() * 256)
      let g = Math.floor(Math.random() * 256)
      let b = Math.floor(Math.random() * 256)
      return 'rgb(' + r + ',' + g + ',' + b + ')'
    },
    drawValidateCode () {
      let canvas = document.getElementById('canvas')
      let context = canvas.getContext('2d')
      canvas.width = this.codeConfig.width
      canvas.height = this.codeConfig.height
      context.strokeStyle = '#fff'
      context.strokeRect(0, 0, this.codeConfig.width, this.codeConfig.height)

      let aCode = 'A,B,C,E,F,G,H,J,K,L,M,N,P,Q,R,S,T,W,X,Y,1,2,3,4,5,6,7,8,9'
      let aLength = aCode.split(',').length
      this.code = ''
      for (let i = 0; i <= 3; i++) {
        let x = 20 + i * 20
        let y = 20 + Math.random() * 10
        let j = Math.floor(Math.random() * aLength)
        let deg = Math.random() * 90 * Math.PI / 180 // 随机弧度
        let txt = aCode.split(',')[j]

        this.code += aCode.split(',')[j]

        context.fillStyle = this.randomRgbColor() // 文字的绘制颜色类型为随机生成的颜色
        context.font = 'bold 20px 微软雅黑' // 文字的字体类型
        // 修改坐标原点和旋转角度
        context.translate(x, y)
        context.rotate(deg) // 根据随机角度进行旋转
        context.fillText(txt, 0, 0)
        // 恢复坐标原点和旋转角度
        context.rotate(-deg)
        context.translate(-x, -y)
      }

      // 干扰线
      for (let i = 0; i < 8; i++) {
        context.strokeStyle = this.randomRgbColor()
        context.beginPath()
        context.moveTo(Math.random() * 120, Math.random() * 40)
        context.lineTo(Math.random() * 120, Math.random() * 40)
        context.stroke()
      }

      /** 绘制干扰点 **/
      for (let i = 0; i < 20; i++) {
        context.fillStyle = this.randomRgbColor()
        context.beginPath()
        context.arc(Math.random() * 120, Math.random() * 40, 1, 0, 2 * Math.PI)
        context.fill()
      }
    }
  }
}
</script>
