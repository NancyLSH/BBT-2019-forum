//id记得改回来
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
        <div style="float:left;">浏览次数：{{scan}} 回复次数：{{reply}}</div>
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
      <div v-show="showReply" style="float:left;margin:1% 4%;">
        <div v-show="showReply" style="text-align:left">你的回复：</div>
        <el-input
          type="textarea"
          placeholder="请输入内容"
          v-model="selfreply"
          maxlength="100"
          show-word-limit
        ></el-input>
        <div class="buttons replybuttons">
          <el-button type="primary" @click="toReply" round>发表</el-button>
          <el-button round @click="deleteReply">取消</el-button>
        </div>
      </div>
    </div>

    <h3 class="replytitle">回复：</h3>
    <!-- 回复 -->
    <div class="reply" v-for="(item,index) in replies" :key="index">
      <el-avatar :size="40" style="margin:0 4%;float:left" :src="item.avatar"></el-avatar>
      <div class="replytext">
        <div
          class="username"
          style="  text-align: left;font-size: 20px;margin:0 2%;"
        >{{item.username}}：</div>
        <div style="text-align: left;margin: 0 2%;word-break:break-all;">{{item.content}}</div>
      </div>
      <div class="bottomNum">
        <div>{{item.time}}</div>
        <el-button type="text" style="padding:0;">点赞({{item.replythumb}})</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "forumPage",
  inject: ["reload"],
  data() {
    return {
      id: "",
      author: "",
      time: "",
      scan: "",
      reply: "",
      thumb: "",
      text: "",
      title: "",
      username: "",
      replies: [
        {
          avatar: "",
          username: "",
          content: "",
          time: "",
          replythumb: ""
        }
      ],
      forumPage: true,
      showReply: false,
      selfreply: "",
      timer: null
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    setTimer() {
      this.timer = setTimeout(() => {
        var data = new FormData();
        data.append("postid", this.id);
        data.append("param", 1);
        console.log(10);
        this.$axios
          .post("http://111.230.183.100/forum/add.php", data, {
            header: {
              "Content-Type": "application/json"
            },
            withCredentials: true
          })
          .then(response => {
            if(response.data.errcode == 1){
              this.reload()
            }else{
            console.log(response);
            }
          })
          .catch(err => {
            console.log(err);
          });
      }, 10000);
    },
    toReply() {
      var data = new FormData();
      data.append("content", this.selfreply);
      data.append("postid", this.id);
      this.$axios
        .post("http://111.230.183.100/forum/reply.php", data, {
          header: {
            "Content-Type": "application/json"
          },
          withCredentials: true
        })
        .then(response => {
          if (response.data.errcode == 1) {
            this.selfreply = "";
            this.showReply = false;
            this.reload();
          } else {
            console.log(response.data.data);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    deleteReply() {
      this.selfreply = "";
      this.showReply = false;
    }
  },
  mounted: function() {
    this.setTimer()
    this.id = this.$route.query.postid;
    var postid = new FormData();
    postid.append("postid", this.id);
    this.$axios
      .post("http://111.230.183.100/forum/getOnePost.php", postid, {
        header: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      })
      .then(response => {
        if (response.data.errcode == 1) {
          var data = response.data.data;
          this.author = data.username;
          this.time = data.time;
          this.scan = data.browse;
          this.thumb = data.like;
          this.reply = data.reply;
          this.title = data.title;
          this.text = data.content;
        }
        console.log(response);
      })
      .catch(res => {
        console.log(res);
      });
    this.$axios
      .post("http://111.230.183.100/forum/getReply.php", postid, {
        header: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      })
      .then(response => {
        if (response.data.errcode == 1) {
          var data = response.data.data;
          this.replies = data;
        }
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  },
  destroyed: function() {
    clearInterval(this.timer);
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
  margin: 2% 0;
  width: 100%;
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

