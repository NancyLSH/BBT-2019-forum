<template>
  <div class="changeInfo">
    <!-- 页头 -->
    <div style="width:100%">
      <el-page-header class="header" @back="goBack" style="line-height:55px;color:#ffffff"></el-page-header>
    </div>

    <el-form
      style="margin:0 5%;text-align:left;"
      label-position="top"
      label-width="80%"
      v-model="change"
      id="changeInfo"
    >
      <el-form-item label="头像：">
        <el-upload
          class="avatar-uploader"
          action
          :show-file-list="false"
          :data="myData"
          :headers="myHeader"
          :on-change="onChange"
          :auto-upload="false"
          :file-list="fileList"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <!-- 这个+号没法居中 -->
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="用户名：">
        <el-input type="text" v-model="change.username" maxlength="10" show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="性别：" prop="sex">
        <el-radio-group v-model="change.sex">
          <el-radio label="男" value="1"></el-radio>
          <el-radio label="女" value="2"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="生日：">
        <el-date-picker
          type="date"
          placeholder="选择生日日期"
          v-model="change.birthday"
          style="width:100%;"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="个人状态：">
        <el-input type="textarea" v-model="change.status" maxlength="20" show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="所在地区：">
        <v-distpicker
          :province="change.province"
          :city="change.city"
          :area="change.area"
          @province="onChangeProvince"
          @city="onChangeCity"
          @area="onChangeArea"
        ></v-distpicker>
      </el-form-item>
      <el-form-item style="text-align:center;">
        <el-button type="primary" @click="onSubmit" round>保存</el-button>
        <el-button class="change-button" @click="cancel" round>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import VDistpicker from "v-distpicker";
import axios from "axios";

axios.defaults.withCredentials = true;

export default {
  name: "changeInfo",
  components: {
    VDistpicker
  },
  data() {
    return {
      fileList: [],
      imageUrl: "",
      change: {
        username: "",
        sex: "",
        status: "",
        province: "",
        city: "",
        area: ""
      },
      params: {}
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    onChange(file, filesList) {
      this.params = new FormData();
      this.params.append("avatar", file.name);
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    onChangeProvince(data) {
      this.change.province = data.value;
    },
    onChangeCity(data) {
      this.change.city = data.value;
    },
    onChangeArea(data) {
      this.change.area = data.value;
    },
    onSubmit() {
      var config = {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      };
      console.log(this.params);
      var username = this.change.username;
      var sexStr = this.change.sex;
      if (sexStr == "男") {
        var sex = 1;
      } else if (sexStr == "女") {
        var sex = 2;
      } else {
        var sex = "";
      }
      var d = this.change.birthday;
      if (d) {
        var birthday =
          d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
        var status = this.change.status;
      } else {
        var birthday = "";
      }
      var status = this.change.status;
      var province = this.change.province;
      var city = this.change.city;
      var area = this.change.area;
      var names = [
        "username",
        "sex",
        "birthday",
        "status",
        "province",
        "city",
        "area"
      ];
      var arr = [username, sex, birthday, status, province, city, area];
      for (var i = 0; i < arr.length; i++) {
        if (arr[i]) {
          this.params.append(names[i], arr[i]);
          console.log(arr[i]);
        }
      }
      this.$axios
        .post("http://111.230.183.100/forum/modify.php", this.params, config)
        .then(function(response) {
          // 这里是处理正确的回调
          let result = response.data.errmsg;
          console.log(result);
        })
        .catch(function(response) {
          // 这里是处理错误的回调
          console.log(response);
        });
    },
    // 要先写好登录注册页面和路由才有办法调试
    getinfo() {
      this.$axios
        .get("http://111.230.183.100/forum/modify.php")
        .then(function(response) {
          console.log(response);
        })
        .catch(function(response) {
          console.log(response);
        });
    },
    cancel() {}
  },
  mounted: function() {
    this.getinfo();
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
</style>


