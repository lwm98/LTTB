<template>
  <div class="indexApp">
    <el-container>
      <el-main>
        <div class="bodymask"></div>
        <div class="topBox">
          <div class="search" id="search">
            <div class="myinput">
              <el-popover
                placement="bottom"
                title="今日推荐："
                width="200"
                trigger="hover"
                content="我的快乐时代-陈奕迅">
                <el-input
                  @keyup.enter.native="search"
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
          <div class="mylove" id="mylove" @mouseenter="myloveshow" @mouseleave="mylovehide">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>我喜欢</span>
                <el-button style="float: right; padding: 3px 0" type="text">更多</el-button>
                <div class="mylovepull" v-show="show2" ><i class="el-icon-star-off"></i></div>
              </div>
              <div v-for="o in 4" :key="o" class="text item">
                {{'列表内容 ' + o }}
              </div>
            </el-card>
          </div>
        </div>
        <div class="bottomBox">
          <transition name="el-zoom-in-center">
            <div class="left" v-show="show">
              <h3>正在播放:</h3>
              <el-tooltip class="item" effect="dark" content="点击即可开启/停止播放" placement="right">
                <div class="circle rota" id="circle" @click="play" ></div>
              </el-tooltip>
              <div class="musicRun">
                <!--            <audio controls="controls" id="player">-->
                <!--              <source :src="musicSource" type="audio/mpeg">-->
                <!--            </audio>-->
                <audio v-if="show3" controls="controls" autoplay="autoplay" name="media" id="player"><source :src="musicSource" type="audio/mpeg"></audio>
              </div>
            </div>
          </transition>
          <transition name="el-zoom-in-center">
            <div class="right" v-show="show">
              <div class="title">
              <h3>评论：</h3></div>
              <div class="comment">
                <comments></comments>
              </div>
            </div>
          </transition>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import $ from 'jquery/dist/jquery.min'
  import comments from '../components/comments'
  export default {
    name: 'loginApp',
    data () {
      return {
        inputData: '',
        show: false,
        show2: true,
        show3: false,
        isplay: true,
        musicSource: '',
        canSearch: true,
        myButtonIsLoading: false,
        myloveshowclock: null
      }
    },
    watch: {
      inputData: function (val) {
        if (val != null && val !== '') {
          this.canSearch = false
        } else {
          this.canSearch = true
        }
      },
      isplay: function (val) {
        console.log('值为' + val)
        if (val) {
          document.getElementById('player').play()
          console.log('正在播放 点击停止')
          document.getElementById('circle').className = 'circle rota'
        } else {
          document.getElementById('player').pause()
          console.log('已停止播放 点击继续')
          document.getElementById('circle').className = 'circle'
        }
      }
    },
    methods: {
      search () {
        this.show3 = false
        // 按钮变成加载中
        this.myButtonIsLoading = true
        // 提示加载
        const h = this.$createElement
        this.$notify({
          title: '提示',
          message: h('i', {style: 'color: teal'}, '歌曲正在加载中，请稍候')
        })
        // 发送ajax请求
        $.ajax({
          url: 'http://47.98.182.28:5000/post/' + this.inputData,
          async: 'false',
          type: 'GET',
          dataType: 'jsonp',
          jsonp: 'callback',
          jsonpCallback: 'playMusic'
        })
          .done((data) => {
            this.$notify({
              title: '成功',
              message: '开始播放',
              type: 'success'
            })
            this.inputData = ''
            this.myButtonIsLoading = false
            this.musicSource = 'http://music.163.com/song/media/outer/url?id=' + data.a + '.mp3'
            // 成功
            $('#search').animate({top: '10%'}, 'slow', null, () => {
              this.show = true
            })
            this.show3 = true
          })
          .fail((data) => {
            if (data.readyState === 4) {
                this.$notify.error({
                title: '错误',
                message: '服务器可能被炸到外太空了'
              })
            }
            console.log(data)
            this.myButtonIsLoading = false
          })
          .always(() => {
            console.log('complete')
          })
      },
      play () {
        this.isplay = !this.isplay
      },
      myloveshow () {
        $('#mylove').stop().animate({left: '0'}, 'slow')
      },
      mylovehide () {
        $('#mylove').stop().animate({left: '-374px'}, 'slow')
        this.show2 = true
      }
    },
    mounted () {
    },
    components: {comments}
  }
</script>

<style scoped>
  .indexApp,.el-container,.el-main {
    width: 100%;
    height: 100%;
  }
  .el-main {
    color: white;
  }
  .bodymask{
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
    background-color: rgb(112, 153, 176);
    background-image: url("https://y.gtimg.cn/music/photo_new/T002R300x300M0000046leX14AZUCw.jpg?max_age=2592000");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50%;
    filter: blur(65px);
    opacity: .6;
    transform: translateZ(0);
    width: 100%;
    height: 100%;
  }
  .topBox{
    width: 100%;
    height: 65px;
    margin: 0;
    position: relative;
  }
  .topBox .mylove{
    position: absolute;
    top: 0;
    left: -374px;
    z-index: 100;
  }
  .mylovepull i{
    font-size: 31px;
    color: white;
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
    right: -30px;
  }
  /*到这里结束↑*/
  .bottomBox{
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
  }
  .comment{
    margin-top: 20px;
  }
  .bottomBox .left,.bottomBox .right{
    width: 658px;
    height: 509px;
    padding: 15px 20px;
    border-radius: 4px;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    z-index: 1;
  }
  .bottomBox .left{
    text-align: center;
  }
  .bottomBox .left .circle{
    width: 200px;
    height: 200px;
    margin:65px auto;
    border-radius: 100px;
    background-color: yellow;
    background-image: url("../assets/circle.png");
  }
  .bottomBox .left .circle:focus{
    outline: #67c23a;
  }
  #player:focus{
    outline: #67c23a;
  }
  .item{
    border: 0;
  }
  @keyframes rotating{
    0%{transform:rotate(0deg)}
    to{transform:rotate(1turn)}
  }
  .rota{
    -webkit-animation: rotating 4s infinite linear;
    animation: rotating 4s infinite linear;
  }
  .search{
    width: 650px;
    display: flex;
    justify-content: space-between;
    position: absolute;
    top: 350%;
    left: 50%;
    margin-left: -325px;
  }
  .search .myinput{
    width: 500px;
    margin: 0 auto;
  }
  .right .title{
    border-bottom: 2px solid #c20c0c;
  }
  .el-zoom-in-center-enter-active {
    transition: all 1s ease!important;
  }
</style>
