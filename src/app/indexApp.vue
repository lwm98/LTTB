<template>
  <div>
    <el-container>
      <el-main>
        <div class="topBox">
          <div class="mylove" id="mylove">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>我喜欢</span>
                <el-button style="float: right; padding: 3px 0" type="text">更多</el-button>
                <div class="mylovepull" @mouseenter="myloveshow" @mouseout="mylovehide"><i class="el-icon-star-off"></i></div>
              </div>
              <div v-for="o in 4" :key="o" class="text item">
                {{'列表内容 ' + o }}
              </div>
            </el-card>
          </div>
          <div class="search" id="search">
          <div class="myinput">
            <el-popover
              placement="bottom"
              title="今日推荐："
              width="200"
              trigger="hover"
              content="我的快乐时代-陈奕迅">
              <el-input
                slot="reference"
                placeholder="请输入您想听的歌曲"
                v-model="inputData"
                autofocus="true"
                clearable>
              </el-input>
            </el-popover>
          </div>
          <div class="mybutton">
              <el-button type="primary" icon="el-icon-search" :loading="myButtonIsLoading" @click="search" :disabled="canSearch">搜索</el-button>
          </div>
        </div>
        </div>
        <div class="bottomBox">
          <transition name="el-zoom-in-center">
          <div class="left" v-show="show">
            <h3>正在播放:</h3>
            <el-tooltip class="item" effect="dark" content="点击即可开启/停止播放" placement="right">
              <div class="circle rota" id="circle" @click="play"></div>
            </el-tooltip>
          </div>
          </transition>
          <transition name="el-zoom-in-center">
          <div class="right" v-show="show">
            <h3>评论：</h3>
            <div class="comment">
            </div>
          </div>
          </transition>
        </div>
        <a href="home.html">跳转到home</a>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: 'loginApp',
    data () {
      return {
        inputData: '',
        show: false,
        isplay: true,
        canSearch: true,
        myButtonIsLoading: false
      }
    },
    watch: {
      inputData: function (val) {
        console.log(val)
        if (val != null && val !== '') {
          this.canSearch = false
        } else {
          this.canSearch = true
        }
      },
      isplay: function (val) {
        console.log('值为' + val)
        if (val) {
          console.log('正在播放 点击停止')
          document.getElementById('circle').className = 'circle rota'
        } else {
          console.log('已停止播放 点击继续')
          document.getElementById('circle').className = 'circle'
        }
      }
    },
    methods: {
      search () {
        var target = 40
        var current = 250
        this.show = true
        this.myButtonIsLoading = true
        var myClock = setInterval(function () {
          var step = (target - current) / 15
          step = step > 0 ? Math.ceil(step) : Math.floor(step)
          current = current + step
          document.getElementById('search').style.marginTop = current + 'px'
          if (current === 0) {
            clearInterval(myClock)
          }
        }, 10)

        console.log(this.input)

        const h = this.$createElement
        this.$notify({
          title: '提示',
          message: h('i', {style: 'color: teal'}, '歌曲正在加载中，请稍候')
        })
      },
      play () {
        this.isplay = !this.isplay
      },
      myloveshow () {
        var current = -374
        var target = 0
        var myloveshowclock = setInterval(function () {
          var step = (target - current) / 15
          step = step > 0 ? Math.ceil(step) : Math.floor(step)
          current = current + step
          console.log(current)
          document.getElementById('mylove').style.left = current + 'px'
          if (current == target) {
            clearInterval(myloveshowclock)
          }
        }, 20)
      },
      mylovehide () {
        // document.getElementById('mylove').style.left = -374 + 'px'
      }
    }
  }
</script>

<style scoped>
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    height: 722px;
  }
  .topBox{
    width: 100%;
    height: 226px;
    border: 1px solid #E9EEF3;
    margin: 0;
    position: relative;
  }
  .topBox .mylove{
    position: absolute;
    top: 0;
    left: -374px;
  }
  /*这是我喜欢的卡片↓*/
  .text {
    font-size: 14px;
  }
  .item {
    margin-bottom: 18px;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
  .box-card {
    width: 350px;
  }
  .mylovepull{
    position: absolute;
    top: 0;
    right: -13px;
    border: 1px solid;
    background-color: white;
  }
  /*到这里结束↑*/
  .bottomBox{
    width: 100%;
    height: 420px;
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
  }
  .bottomBox .left,.bottomBox .right{
    width: 658px;
    height: 400px;
    border: 1px solid white;
    padding: 0 20px;
    border-radius: 4px;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  }
  .bottomBox .left{
    text-align: center;
  }
  .bottomBox .left .circle{
    width: 200px;
    height: 200px;
    margin:35px auto;
    border-radius: 100px;
    background-color: yellow;
    background-image: url("../assets/circle.png");
  }
  .item{
    border: 0;
  }
  @keyframes rotating{
    0%{transform:rotate(0deg)}
    to{transform:rotate(1turn)}
  }
  .rota{
    -webkit-animation: rotating 3s infinite linear;
    animation: rotating 3s infinite linear;
  }
  .search{
    width: 650px;
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
    margin-top: 250px;
  }
  .search .myinput{
    width: 500px;
    margin: 0 auto;
  }
</style>
