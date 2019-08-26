<template>
  <div class="entry">
    <div class="block">
      <el-carousel height="150px">
        <el-carousel-item v-for="item in 4" :key="item"></el-carousel-item>
      </el-carousel>
    </div>
    <el-menu default-active="1" class="el-menu-demo" mode="horizontal">
      <el-menu-item index="1" style="width:50%" @click="showLogin = true;showRegister = false">登录</el-menu-item>
      <el-menu-item index="4" style="width:50%" @click="showRegister = true;showLogin = false;">注册</el-menu-item>
    </el-menu>
    <el-form ref="form" :model="login" label-width="100%" class="login" v-show="showLogin">
      <el-input v-model="login.username" placeholder="请输入用户名"></el-input>
      <el-input v-model="login.password" placeholder="请输入密码" show-password></el-input>
      <div v-show="showLog" class="errmsg">{{logerrmsg}}</div>
      <el-button type="primary" @click="log" plain>登录</el-button>
    </el-form>
    <el-form
      ref="form"
      :model="register"
      label-width="100%"
      class="register"
      v-show="showRegister"
      id="register"
    >
      <el-upload
        class="avatar-uploader"
        action
        :show-file-list="false"
        :data="myData"
        :headers="myHeader"
        :on-change="onChange"
        :auto-upload="false"
        :file-list="fileList"
        name="userfile"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-picture-outline-round avatar-uploader-icon"></i>
      </el-upload>
      <el-input v-model="register.username" placeholder="请输入用户名"></el-input>
      <el-input v-model="register.pwd" placeholder="请输入密码" show-password></el-input>
      <el-input v-model="register.comfirm" placeholder="请再次输入密码" show-password></el-input>
      <div v-show="showRe" class="errmsg">{{reerrmsg}}</div>
      <el-button type="primary" @click="toRegister" plain>注册</el-button>
    </el-form>
  </div>
</template>



<script>
import Vue from 'vue'
import axios from "axios";

axios.defaults.withCredentials = true;

export default {
  name: "login",
  data() {
    return {
      showLogin: true,
      showRegister: false,
      showLog:false,
      logerrmsg:'',
      showRe:false,
      reerrmsg:'',
      fileList: [],
      imageUrl: "",
      data:{},
      params: {},
      login: {
        username: "",
        password: "",
      },
      register: {
        username: "",
        pwd: "",
        comfirm: ""
      }
    };
  },
  methods: {
    onChange(file, filesList) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    log() {
      this.data = new FormData();
      this.data.append('username',this.login.username)
      this.data.append('password',this.login.password)
      this.$axios
        .post("http://111.230.183.100/forum/login.php", this.data, {
          headers: {
            "Content-Type": "application/json"
          },
          withCredentials: true
        })
        .then((response) => {
          console.log(response.data)
          if(response.data.errcode == 1){
            this.$router.push('/main')
          }else{
          this.showLog = true
          this.logerrmsg = response.data.errmsg
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    toRegister() {
      var file = document.getElementById("register");
      this.params = new FormData(file);
      this.params.append("username", this.register.username);
      this.params.append("password", this.register.pwd);
      this.params.append("checkpwd", this.register.comfirm);
      this.$axios
        .post("http://111.230.183.100/forum/register.php", this.params, {
          headers: {
            "Content-Type": "application/json"
          },
          withCredentials: true
        })
        .then((response) => {
          this.showRe=true
          this.reerrmsg=response.data.errmsg
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  computed: {
    myHeader() {
      return {
        authToken: window.sessionStorage.getItem("authToken")
      };
    },
    myData() {
      return {};
    }
  }
};
</script>

<style>
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.entry {
  display: flex;
  flex-direction: column;
  max-width: 100%;
}
.el-menu-demo {
  max-width: 100%;
}
.login,
.register {
  width: 85%;
  margin: 4% auto;
}
.el-input {
  margin: 4% 0;
}
.el-button {
  width: 30%;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.errmsg{
  margin:3% 0;
  color:red;
}
</style>
