<template>
  <div>
    <el-container>
      <el-main>
        <div class="topBox">
        <div class="search" id="search">
          <div class="myinput">
            <el-input
              placeholder="请输入您想听的歌曲"
              v-model="input"
              autofocus="true"
              clearable>
            </el-input>
          </div>
          <div class="mybutton">
              <el-button type="primary" icon="el-icon-search" :loading="myButtonIsLoading" @click="search">搜索</el-button>
          </div>
        </div>
          <div class="left">aaaaa</div>
          <div class="right">bbbbb</div>
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
        input: '',
        myButtonIsLoading: false
      }
    },
    methods: {
      search () {
        var target = 0
        var current = 250
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
    height: 600px;
    border: 1px solid;
    margin: 0;
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
