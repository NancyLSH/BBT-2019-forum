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
      <el-menu-item
        index="1"
        style="width:50%"
        @click="showForums"
      >帖子({{forumNum}})</el-menu-item>
      <el-menu-item
        index="4"
        style="width:50%"
        @click="showForum=false;showReply=true;"
      >回复({{replyNum}})</el-menu-item>
    </el-menu>

    <!-- 发帖，需要用到v-for -->
    <div class="selfForum" v-show="showForum" v-for="item in forums" :key="item.index">
      <h3>{{item.title}}</h3>
      <div class="text">{{item.content}}</div>
      <div style="margin:2% 0;display:flex;justify-content: space-between;">
        <div style="text-align:left;">
          <i class="el-icon-view" style="margin:0;float:none;">({{ item.browse }})</i>
          <el-divider direction="vertical"></el-divider>
          <i
            class="el-icon-thumb"
            style="background-color: transparent;border-color:transparent;font-size:10px;"
            plain
          >({{ item.like }})</i>
          <el-divider direction="vertical"></el-divider>
          <i
            class="el-icon-chat-dot-square"
            style="background-color: transparent;border-color:transparent;font-size:10px;"
            plain
          >({{ item.reply }})</i>
        </div>
        <el-button
          icon="el-icon-delete-solid"
          style="font-size:20px;padding:0;float:right;background-color:transparent;border-color:transparent;text-align:right;"
          @click="deleteForum(item.postid)"
          plain
        ></el-button>
      </div>
    </div>

    <!-- 回复，需要用到v-for -->
    <div class="homereply" v-show="showReply" v-for="item in replies" :key="item.index">
      <div style="text-align:left;margin:2% 0;">你的回复：{{item.content}}</div>
      <div class="replyTitle">{{item.title}}</div>
      <div class="time" style="text-align:left">{{item.time}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "homePage",
  inject:['reload'],
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    showForums() {
      this.showForum = true;
      this.showReply = false;
    },
    deleteForum(id) {
      var de = new FormData();
      de.append("postid", id);
      this.$axios
        .post("http://111.230.183.100/forum/delete.php", de, {
          headers: {
            "Content-Type": "application/json"
          },
          withCredentials: true
        })
        .then(response => {
          if (response.data.errcode == 1) {
            this.reload()
            // location.reload()
          } else {
            console.log(response);
          }
        })
        .catch(err => {
          console.log(err);
        });
      console.log(id);
    }
  },
  data() {
    return {
      avatar:
        "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
      username: "",
      showForum: true,
      showReply: false,
      sex: "",
      age: '',
      constellation: "",
      status: "",
      forumNum: "",
      replyNum: '',
      forums: [
        {
          postid: "",
          title: "",
          content: "",
          like: "",
          browse: "",
          reply: ""
        }
      ],
      replies: [
        {
          id: "",
          content: "",
          title: "",
          time:'',
        }
      ]
    };
  },
  mounted: function() {
    this.$axios.get("http://111.230.183.100/forum/information.php",{
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
    }).then((response)=>{
      if(response.data.errcode==1){
        var res = response.data.data
        this.username = res.username
        this.avatar = "http://111.230.183.100/forum/"+res.avatar
        this.sex = res.sex==1?"男":"女"
        this.status= res.status
        this.constellation = res.constellation
        this.age = res.age
      }
    }).catch((err)=>{
      console.log(err)
    })
    this.$axios
      .get("http://111.230.183.100/forum/checkPost.php", {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      })
      .then(response => {
        var len = response.data.data;
        if (len == null) {
          this.forumNum = 0;
        } else {
          if (response.data.errcode == 1) {
            this.forums = response.data.data;
            this.forumNum = this.forums.length;
          }
        }
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
    this.$axios
      .get("http://111.230.183.100/forum/checkReply.php", {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      })
      .then(response => {
        if (response.data.data == null) {
          this.showReply = false;
          this.replyNum = 0;
          Object.freeze(this.showReply);
        } else {
          if (response.data.errcode == 1) {
            this.replies = response.data.data
            console.log(response.data);
            this.replyNum = this.replies.length
          }
        }
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
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
  justify-content: space-around;
}
.down {
  text-align: left;
}
.selfForum {
  margin: 2% 4%;
}
</style>

