<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on">
      <div class="title-container">
        <h3 class="title">Login Form</h3>
      </div>
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          v-model="loginForm.username"
          type="text"
          name="username"
          placeholder="Username"
          tabindex="1"
        />
      </el-form-item>
      <el-tooltip v-model="casTooltip" content="Caps lock is On" placement="right" manual>
        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            ref="password"
            :key="passwordType"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="Password"
            tabindex="2"
            name="password"
            @keyup.enter.native="handleLogin"
            @blur="casTooltip=false"
            @keyup.native="checkCapslock"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType==='password'?'eye':'eye-open'" />
          </span>
        </el-form-item>
      </el-tooltip>
      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">Login</el-button>
    </el-form>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
export default {
  name: 'Login',
  props: {},
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: 'admin',
        password: '111111'
      },
      loginRules: {
        username: [{ validator: validateUsername, required: true, trigger: 'blur' }],
        password: [{ validator: validatePassword, required: true, trigger: 'blur' }]
      },
      casTooltip: false,
      passwordType: 'password',
      loading: false,
      redirect: undefined,
      otherQuery: {}
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(route.query)
        }
      },
      immediate: true
    }
  },
  created() {},
  mounted() {},
  methods: {
    getOtherQuery(query) {
      return Object.keys(query).reduce((ret, cur) => {
        if (cur !== 'redirect') {
          ret[cur] = query[cur]
        }
        return ret
      }, {})
    },
    showPwd() {
      this.passwordType = this.passwordType === 'password' ? '' : 'password'
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store
            .dispatch('user/login', this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
              this.loading = false
            })
            .catch((err) => {
              console.log(err)
              this.loading = false
            })
        } else {
          return false
        }
      })
    },
    checkCapslock({ shiftKey, key } = {}) {
      if (key && key.length === 1) {
        if ((shiftKey && key >= 'A' && key <= 'Z') || (!shiftKey && key >= 'A' && key <= 'Z')) {
          this.casTooltip = true
        } else {
          this.casTooltip = false
        }
      }
      if (key === 'CapsLock' && this.casTooltip === true) {
        this.casTooltip = false
      }
    }
  }
}
</script>

<style lang="scss">
$bg: #283443;
$light_gray: #fff;
$cursor: #1890ff;

.login-container {
  .el-input {
    display: inline-block;
    width: 85%;
    height: 47px;
    margin-left: 4px;

    input {
      background: transparent;
      border: 0;
      border-radius: 0;
      padding: 12px 5px 12px 15px;
      height: 47px;
      color: $light_gray;
      caret-color: $cursor;
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>
<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    width: 520px;
    padding: 160px 35px 0;
    margin: 0 auto;
  }
}
.svg-container {
  width: 30px;
  display: inline-block;
  padding: 6px 5px 6px 15px;
  vertical-align: middle;
  color: $dark_gray;
}
.title-container .title {
  font-size: 26px;
  color: $light_gray;
  margin: 0 auto 40px;
  text-align: center;
}
.show-pwd {
  position: absolute;
  right: 10px;
  top: 7px;
  cursor: pointer;
  color: $dark_gray;
  font-size: 16px;
}
</style>
