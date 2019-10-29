<template>
  <div>
    <el-card class="box-card">
      <div v-for="o in 4" :key="o" class="text item">
        {{'列表内容 ' + o }}
      </div>
      <div class="star">
        <div class="box4">
        <i>这首歌感觉怎么样：</i>
        <el-rate
          v-model="value2"
          :colors="colors">
        </el-rate>
        </div>
        <div class="box3">
          <el-input
            type="input"
            class="mycontent"
            placeholder="说两句吧"
            v-model="textarea1">
          </el-input>
          <el-button type="success" plain @click="comment">评论</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: 'comments',
    data () {
      return {
        value2: null,
        textarea1: '',
        colors: ['#99A9BF', '#F7BA2A', '#FF9900']
      }
    },
    methods: {
      comment () {
        this.$notify({
          title: '评论成功',
          message: '您的键盘已经飞到别人脸上去了',
          type: 'success'
        })
      }
    }
  }
</script>

<style scoped>
  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .box-card {
    width: 100%;
    height: 460px;
    background-color: #dfe1e1;
  }
  .star{
    margin-top: 125px;
  }
  .box3{
    margin-top: 10px;
    width: 80%;
    display: flex;
    justify-content: space-between;
  }
  .mycontent{
    margin-top: 3px;
    width: 80%;
  }
  .box4{
    margin-top: 10px;
    width: 45%;
    display: flex;
    justify-content: space-between;
  }
  .box4 i{
    color: orange;
    font-style: normal;
  }
</style>
