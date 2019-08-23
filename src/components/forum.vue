<template>
  <div class="forum">
    <!-- 页头 -->
    <div style="width:100%">
      <el-page-header class="header" @back="goBack" style="line-height:55px;color:#ffffff"></el-page-header>
    </div>
    <!-- 标题 -->
    <h2>{{title}}</h2>
    <!-- 介绍 -->
    <div style="margin:0 5%">
      <div style="float:left;">
        <div style="float:left;">{{author}}</div>
        <br />
        <div style="float:left;">浏览次数：{{scanNumber}} 回复次数：{{replyNumber}}</div>
      </div>
      <div style="float:right">{{time}}</div>
    </div>
    <div class="forumtext">{{text}}</div>

    <!-- 回复与点赞按钮 -->
    <div class="forum-midium">
      <div class="forumNum">
        <el-button
          type="text"
          style="padding:0;font-size: inherit;"
          @click="showReply = !showReply"
        >回复</el-button>
        <el-divider direction="vertical"></el-divider>
        <div>点赞({{ thumb }})</div>
      </div>
      <div v-show="showReply">
        <div style="float:left;margin:1% 0;">你的回复：</div>
        <el-input
          type="textarea"
          placeholder="请输入内容"
          v-model="selfreply"
          maxlength="100"
          show-word-limit
        ></el-input>
        <div class="buttons replybuttons">
          <el-button type="primary" round>发表</el-button>
          <el-button round>取消</el-button>
        </div>
      </div>
    </div>

    <h3 class="replytitle">回复：</h3>
    <!-- 回复 -->
    <div class="reply">
      <el-avatar :size="40" style="margin:0 4%;"></el-avatar>
      <div class="replytext">
        <div class="username" style="  text-align: left;font-size: 20px;margin:0 2%;">{{username}}：</div>
        <div style="text-align: left;margin: 0 2%;word-break:break-all;">{{reply}}</div>
      </div>
      <div class="bottomNum">
        <div>{{time}}</div>
        <el-button type="text" style="padding:0;">点赞({{thumb}})</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "forumPage",
  props: {
    title: String,
    text: String
  },
  data() {
    return {
      author: "zuozhe",
      time: "2019/05/03",
      scan: 233,
      reply: 345,
      thumb: 3452,
      username: "yonghu",
      replytext: "lllllllllllll",
      replytime: "2019/08/23",
      replythumb: 666,
      forumPage: true,
      showReply: false,
      selfreply: ""
    };
  },
  methods: {
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
.forum {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #ffffff;
  width: 100%;
}
.forumtext {
  margin: 3% 4%;
  text-align: left;
}
.replytitle {
  margin: 2% 4%;
  text-align: left;
}
.forum-midium {
  display: flex;
  flex-direction: column;
}
.forumNum {
  margin: 0 3%;
  float: right;
  flex-direction: row-reverse;
  display: flex;
}
.selfReply {
  margin: 0 3%;
}
.replybuttons {
  float: left;
  margin: 2% 0;
}
.reply {
  border-bottom: 1px solid #dcdfe6;
  margin: 2%;
}
.replytext {
  width: 80%;
  display: flex;
  flex-direction: column;
}
.bottomNum {
  display: flex;
  justify-content: space-between;
  margin: 2% 4%;
}
</style>

