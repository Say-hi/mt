<template>
  <div class="page-register">
    <article class="header">
      <header>
        <a href="/" class="site-logo"></a>
        <span class="login">
          <em class="bold">已有美团账号？</em>
          <a href="/login">
            <el-button type="primary" size="small">登录</el-button>
          </a>
        </span>
      </header>
    </article>
    <section>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="昵称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="ruleForm.email"></el-input>
          <el-button size="mini" round @click="sendMsg">发送验证</el-button>
          <span class="status">{{statusMsg}}</span>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-input v-model="ruleForm.code" maxlength="4"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
          <el-input v-model="ruleForm.pwd" type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="cpwd">
          <el-input v-model="ruleForm.cpwd" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="register">同意协议并注册</el-button>
          <p>
            <a
              class="f1"
              href="https://rules-center.meituan.com/rules-detail/4"
              target="_blank"
            >《美团点评用户服务协议》</a>
            <a
              class="f1"
              href="https://rules-center.meituan.com/rules-detail/2"
              target="_blank"
            >《美团点评隐私政策》</a>
          </p>
          <div class="error">{{error}}</div>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import CryptoJs from 'crypto-js'
export default {
  layout: "blank",
  data() {
    return {
      ruleForm: {
        name: "",
        code: "",
        email: "",
        pwd: "",
        cpwd: ""
      },
      error: "",
      statusMsg: "",
      rules: {
        name: [
          {
            required: true,
            type: "string",
            message: "请输入昵称",
            trigger: "blur"
          }
        ],
        email: [
          {
            required: true,
            type: "email",
            message: "请输入正确的邮箱",
            trigger: "blur"
          }
        ],
        code: [
          {
            required: true,
            type: 'string',
            message: '请输入正确的验证码',
            trigger: 'blur'
          }
        ],
        pwd: [
          {
            required: true,
            message: "need your password",
            trigger: "blur"
          }
        ],
        cpwd: [
          {
            required: true,
            message: "need your password",
            trigger: "blur"
          },
          {
            validator: (rule, value, cb) => {
              if (value === "") {
                cb(new Error("请再次输入密码"));
              } else if (value !== this.ruleForm.pwd) {
                cb(new Error("两次输入密码不一样"));
              } else {
                cb()
              }
            },
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    register() {
      let self = this
      this.$refs["ruleForm"].validate(valid => {
       if (valid) {
         axios.post('/users/signup', {
           username: encodeURIComponent(self.ruleForm.name),
           password: CryptoJs.MD5(self.ruleForm.pwd).toString(),
           email: self.ruleForm.email,
           code: self.ruleForm.code
         }).then(({status, data}) => {
           if (status === 200 && data && data.code === 0) {
            location.href = '/login'
           } else if (status === 200 && data && data.code !== 0) {
             self.error = data.msg
           } else {
             self.error = `服务器出错，错误码：${status}`
           }
          //  setInterval(() => {
          //     self.error = ''
          //  }, 3000);
         })
       }
      })
    },
    sendMsg() {
      const self = this;
      let namePass;
      let emailPass;
      if (self.timerid) {

        self.$notify({
          title: '提示',
          message: '请休息一会儿再来吧',
          duration: 2000
        })

        return false;
      }
      this.$refs["ruleForm"].validateField("name", valid => {
        namePass = valid;
      });
      self.statusMsg = "";
      if (namePass) {
        console.log('need name')
        return false;
      }
      this.$refs["ruleForm"].validateField("email", valid => {
        emailPass = valid;
      });

      if (!namePass && !emailPass) {
        axios.post("/users/verify", {
            username: encodeURIComponent(self.ruleForm.name),
            email: self.ruleForm.email
          }).then(({ status, data }) => {
            if (status === 200 && data && data.code === 0) {
              let count = 60;
              self.statusMsg = `验证码已发送,剩余${count--}秒可重新发送`;
              self.timerid = setInterval(() => {
                self.statusMsg = `验证码已发送,剩余${count--}秒可重新发送`;
                if (count <= 0) {
                  clearInterval(self.timerid);
                  self.timerid = null
                  self.statusMsg = ''
                }
              }, 1000);
            } else {
              self.statusMsg = data.msg;
            }
          });
      }
    }
  }
};
</script>

<style lang='scss'>
@import "@/assets/css/register/index.scss";
</style>
