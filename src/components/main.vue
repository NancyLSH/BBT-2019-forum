//id记得改回来
<template>
  <div>
    <!-- 页头 -->
    <el-header style="padding:0;">
      <el-button
        style="background-color: transparent;border-color:transparent;color:#FFFFFF;padding:0;"
        icon="el-icon-menu"
        plain
        @click="drawer = true;"
      ></el-button>
      {{header}}
      <el-button
        style="background-color: transparent;color:#FFFFFF;border-color:transparent;padding:0"
        icon="el-icon-message"
      ></el-button>
    </el-header>

    <!-- 抽屉 -->
    <el-drawer :visible.sync="drawer" size="50%" :direction="direction" :show-close="showClose">
      <div class="drawer-header" @click="home">
        <el-avatar :size="40" style="margin:5%;" :src="imgurl"></el-avatar>
        <div class="username" id="asidename">{{username}}</div>
      </div>
      <el-divider></el-divider>
      <el-menu default-active="2">
        <el-menu-item index="2" @click="changeMenu(0)">
          <span slot="title">发现</span>
        </el-menu-item>
        <el-menu-item index="2" @click="changeMenu(1)">
          <span slot="title">政治</span>
        </el-menu-item>
        <el-menu-item index="2" @click="changeMenu(2)">
          <span slot="title">军事</span>
        </el-menu-item>
        <el-menu-item index="2" @click="changeMenu(3)">
          <span slot="title">教育</span>
        </el-menu-item>
        <el-menu-item index="2" @click="changeMenu(4)">
          <span slot="title">音乐</span>
        </el-menu-item>
        <el-menu-item index="2" @click="changeMenu(5)">
          <span slot="title">娱乐</span>
        </el-menu-item>
        <el-menu-item index="2" @click="changeMenu(6)">
          <span slot="title">生活</span>
        </el-menu-item>
      </el-menu>
      <el-divider></el-divider>
      <div class="aside-button">
        <div class="aside-one">
          <i class="el-icon-user-solid"></i>
          <el-divider direction="vertical"></el-divider>
          <el-button type="text" @click="settings">个人信息设置</el-button>
        </div>
        <div class="aside-one">
          <i class="el-icon-caret-left"></i>
          <el-divider direction="vertical"></el-divider>
          <el-button type="text" @click="goBack">退出</el-button>
        </div>
      </div>
    </el-drawer>

    <!-- 主页 -->
    <el-main style="padding:10px;">
      <!-- 帖子 -->
      <div class="sigleForum" v-for="(item,index) in items" :key="index">
        <div @click="toForum(item.postid)">
          <h3>{{ item.title }}</h3>
          <div class="text">{{ item.content }}</div>
        </div>
        <i class="el-icon-view">({{ item.browse }})</i>
        <div class="buttons">
          <el-button
            style="background-color: transparent;border-color:transparent;"
            @click="like(item.postid,index)"
            plain
          >
            <i class="el-icon-thumb"></i>
            ({{ item.like }})
          </el-button>
          <el-button style="background-color: transparent;border-color:transparent;" plain>
            <i class="el-icon-chat-dot-square"></i>
            ({{item.reply }})
          </el-button>
        </div>
      </div>
    </el-main>

    <!-- 发帖按钮 -->
    <el-button
      icon="el-icon-circle-plus"
      style="border:none;background-color:transparent;width: 80px;
    height: 80px;
    position: absolute;
    bottom: 2%;
    right: 2%;"
      @click="write"
      circle
    ></el-button>
  </div>
</template>

<script>
export default {
  name: "mainpage",
    inject:['reload'],
  data() {
    return {
      header: "发现",
      drawer: false,
      direction: "ltr",
      showClose: false,
      username: "",
      imgurl: "",
      reply: 233,
      thumb: 345,
      scan: 987,
      title: "lll",
      text: "iii",
      items: [
        {
          postid: "",
          title: "",
          content: "",
          browse: "",
          like: "",
          reply: "",
        }
      ]
    };
  },
  methods: {
    home() {
      this.$router.push("/home");
    },
    write() {
      this.$router.push("/write");
    },
    settings() {
      this.$router.push("/settings");
    },
    goBack() {
      this.$router.go(-1);
    },
    like(id, index) {
      var data = new FormData();
      data.append("postid", id);
      data.append("param", 2);
      this.$axios
        .post("http://111.230.183.100/forum/add.php", data, {
          headers: {
            "Content-Type": "application/json"
          },
          withCredentials: true
        })
        .then(response => {
          if (response.data.errcode == 1) {
            console.log(index);
            this.items[index].like += 1;
          }
          console.log(response);
        })
        .catch(err => {
          console.log(err);
        });
    },
    toForum(id) {
      if(id){
      this.$router.push({
        name: "forum",
        query: { postid: id }
      });
      }else{
      console.log("未找到id")
      }
      console.log("还有bug");
    },
    changeMenu(a) {
      var key = new FormData();
      key.append("keyword", a);
      this.$axios
        .post("http://111.230.183.100/forum/getPost.php", key, {
          headers: {
            "Content-Type": "application/json"
          },
          withCredentials: true
        })
        .then(response => {
          if (response.data.data == null) {
            this.items = [
              {
                postid: "",
                title: "",
                content: "",
                browse: "",
                like: "",
                reply: "",
              }
            ];
          } else {
            if (response.data.errcode == 1) {
              this.items = response.data.data;
            }
          }
          this.drawer = false;
          console.log(response);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted: function() {
    this.$axios
      .get("http://111.230.183.100/forum/afterLogin.php", {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      })
      .then(response => {
        if (response.data.errcode == 1) {
          this.imgurl = response.data.data.avatar;
          this.username = response.data.data.username;
        } else {
          this.imgurl =
            "https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png";
          this.username = "加载错误";
        }
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
    var key = new FormData();
    key.append("keyword", 0);
    this.$axios
      .post("http://111.230.183.100/forum/getPost.php", key, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      })
      .then(response => {
        if (response.data == null) {
          console.log(response.data);
        } else {
          if (response.data.errcode == 1) {
            this.items = response.data.data;
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
.el-icon-message,
.el-icon-menu {
  font-size: 29px;
}
.el-main {
  background-color: #ffffff;
  color: #333;
  text-align: center;
}
.el-header {
  background-image: url("../assets/2-1.jpg");
  background-size: 100%;
  background-repeat: no-repeat;
  color: #ffffff;
  font-size: 20px;
  text-align: center;
  width: 100%;
  display: flex;
  justify-content: space-between;
  line-height: 55px;
}
.el-avatar {
  height: 40px;
  width: 40px;
  margin: 5%;
}
.username {
  margin: 0 5%;
  width: 55%;
  float: right;
  word-break: break-all;
  font-size: 17px;
}
.drawer-header {
  height: 7%;
}
.aside-one {
  margin: 0 10%;
}
.el-icon-circle-plus {
  font-size: 80px;
  border-color: transparent;
  bottom: 2%;
  right: 2%;
  border: none;
  outline: none;
  color: #7db5ff;
  position: fixed;
}
.sigleForum {
  height: 130px;
  border-bottom: 1px solid #dcdfe6;
  margin: 4%;
}
h3 {
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.text {
  height: 55px;
  margin: 3% 0;
  word-break: break-all;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  text-align: left;
}
.el-icon-view {
  font-size: 10px;
  float: left;
  margin: 4%;
}
.buttons {
  float: right;
}
</style>