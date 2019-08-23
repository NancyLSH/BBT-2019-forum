<template>
  <div class="write">
    <!-- 页头 -->
    <div style="width:100%">
      <el-page-header class="header" @back="goBack" style="line-height:55px;color:#ffffff"></el-page-header>
    </div>
    <el-form
      style="margin:0 5%;text-align:left;"
      label-position="top"
      label-width="80%"
      :model="forum"
    >
      <el-form-item label="标题">
        <el-input
          v-model="forum.title"
          type="text"
          placeholder="请输入标题"
          maxlength="15"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item label="标签" prop="tag">
        <el-radio-group v-model="forum.tag">
          <el-radio label="政治"></el-radio>
          <el-radio label="军事"></el-radio>
          <el-radio label="教育"></el-radio>
          <el-radio label="音乐"></el-radio>
          <el-radio label="娱乐"></el-radio>
          <el-radio label="生活"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="内容">
        <el-input
          type="textarea"
          placeholder="请输入内容"
          v-model="forum.text"
          maxlength="300"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item style="text-align:center;">
        <el-button type="primary" @click="onSubmit" round>发表</el-button>
        <el-button class="change-button" round>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "writeForum",
  data() {
    return {
      forum: {
        title: "",
        tag: "",
        text: ""
      }
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style>
.header {
  background-image: url("../assets/2-1.jpg");
  background-size: 100%;
  padding: 0 5%;
  background-repeat: no-repeat;
  color: #ffffff;
  text-align: center;
  width: 90%;
  font-size: 20px;
}
</style>
