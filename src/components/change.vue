// 还差获取用户信息
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
          name="userfile"
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
        <el-button class="change-button" @click="goBack" round>取消</el-button>
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
      params: {},
      changeImg: false
    };
  },
  methods: {
    onChange(file, filesList) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.changeImg = true;
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
      if (this.changeImg) {
        var url = document.getElementById("changeInfo");
        this.params = new FormData(url);
      } else {
        this.params = new FormData();
      }
      var config = {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      };
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
      if(d){
      var birthday =
        d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
      }else{
        birthday = ''
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
        .then(response => {
          if (response.data.errcode == 1) {
            this.$router.push("/main");
          } else {
            console.log(response.data.errmsg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 获取用户信息
    getinfo() {
      var config = {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      };
      this.$axios
        .get("http://111.230.183.100/forum/information.php", config)
        .then(response => {
          if (response.data.errcode == 1) {
            var data = response.data.data;
            this.imageUrl = "http://111.230.183.100/forum/" + data.avatar;
            this.change.username = data.username;
            if (data.sex == 1) {
              this.change.sex = "男";
            }
            if (data.sex == 2) {
              this.change.sex = "女";
            } else {
              this.sex = '';
            }
            // if (data.birthday) {
            //   var date = data.birthday;
            //   this.change.birthday = new Date(
            //     date.substring(0, 4),
            //     date.substring(5, 7) - 1,
            //     date.substring(8, 10)
            //   );
            // }
            if (data.status) {
              this.change.status = data.status;
            }
            if (data.province) {
              this.change.province = data.province;
            }
            if (data.city) {
              this.change.city = data.city;
            }
            if (data.area) {
              this.change.area = data.area;
            }
          }
          console.log(response);
        })
        .catch(response => {
          console.log(response);
        });
    },
    goBack() {
      this.$router.go(-1);
    }
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


