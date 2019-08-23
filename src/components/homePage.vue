<template>
  <div>
    <!-- 页头 -->
    <div style="width:100%">
      <el-page-header class="header" @back="goBack" style="line-height:55px;color:#ffffff"></el-page-header>
    </div>

    <div class="homePage">
      <!-- 上半部信息展示 -->
      <div style="display:flex;justify-content: center;">
        <el-avatar shape="square" size="large" style="width:60px;height:60px;" :src="avatar"></el-avatar>
        <div class="homeInfo">
          <div class="up">
            <h3>{{username}}</h3>
            <div>{{sex}}</div>
            <div>{{age}}岁</div>
            <div>{{constellation}}</div>
          </div>
          <el-divider></el-divider>
          <div class="down">{{status}}</div>
        </div>
      </div>
    </div>
    <!-- 分页 -->
    <el-menu
      default-active="1"
      style="width:100%;margin:auto;"
      class="el-menu-demo"
      mode="horizontal"
    >
      <el-menu-item index="1" style="width:50%">帖子({{forumNum}})</el-menu-item>
      <el-menu-item index="4" style="width:50%">回复({{replyNum}})</el-menu-item>
    </el-menu>

    <!-- 发帖，需要用到v-for -->
    <div class="selfForum">
      <h3>{{title}}</h3>
      <div class="text">{{text}}</div>
      <div style="margin:2% 0;display:flex;justify-content: space-between;">
        <div style="text-align:left;">
          <i class="el-icon-view" style="margin:0;float:none;">({{ scan }})</i>
          <el-divider direction="vertical"></el-divider>
          <i
            class="el-icon-thumb"
            style="background-color: transparent;border-color:transparent;font-size:10px;"
            plain
          >({{ thumb }})</i>
          <el-divider direction="vertical"></el-divider>
          <i
            class="el-icon-chat-dot-square"
            style="background-color: transparent;border-color:transparent;font-size:10px;"
            plain
          >({{ reply }})</i>
        </div>
        <el-button
          icon="el-icon-delete-solid"
          style="font-size:20px;padding:0;float:right;background-color: transparent;border-color:transparent;"
          plain
        ></el-button>
      </div>
    </div>

    <!-- 回复，需要用到v-for -->
    <div class="homereply">
      <div style="text-align:left;margin:2% 0;">你的回复：{{replytext}}</div>
      <div class="replyTitle">{{title}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "homePage",
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  },
  data() {
    return {
      avatar:
        "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
      username: "yonghu",
      sex: "man",
      age: 23,
      constellation: "金牛",
      status: "nothing",
      forumNum:23,
      replyNum:67,
      title: "title",
      text: "text",
      scan: 123,
      thumb: 455,
      reply: 125,
      replytext:'lll',
    };
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
.homePage {
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.homereply {
  display: flex;
  flex-direction: column;
  margin: 2% 4%;
}
.replyTitle {
  font-size: 22px;
  padding: 3% 4%;
  text-align: left;
  background-color: #e4e4e4;
}
.homeInfo {
  display: flex;
  width: 59%;
  flex-direction: column;
  margin: 4% 0;
}
.up {
  display: flex;
  justify-content: space-between;
}
.down {
  text-align: left;
}
.selfForum {
  margin: 2% 4%;
}
</style>

