<template lang="">
  <v-app>
    <v-app-bar app flat hidden></v-app-bar>

    <!-- 根据应用组件来调整你的内容 -->
    <v-main>
      <!-- 给应用提供合适的间距 -->
      <v-container >
    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      light
    >
      {{ snackbarText }}
      <template v-slot:action="{ attrs }">
        <v-btn
          color="blue"
          text

          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
        <v-col class="text-center">
          <v-sheet max-width="38vh" class="mx-auto px-8" elevation="1">
          <v-card v-if="page == 0" ref="form" class="mx-1" width="35vh" flat>
            <v-img
              height="100%"
              width="100%"
              src="https://gd-hbimg.huaban.com/f4c384c25a3c7f8c6571a2e34dfe62da5218d743151e2-Q2HJ6i_fw1200"
            >
            </v-img>
            <v-card-text >
              <v-card-title class="mx-auto pa-20"
                >注册 Ins，分享精彩世界</v-card-title
              >
            </v-card-text>
            <v-card-text>
              <v-row>
                <v-divider class="mx-auto"></v-divider>
              </v-row>
            </v-card-text>
            <v-row >
              <v-card-text>
                  <v-text-field
                    ref="emailorphone"
                    v-model="emailorphone"
                    outlined
                    dense
                    label="手机或者邮箱"
                    :rules="[rules.required,emailorphoneok]  "
                    :error-messages="errorMessages"
                    required
                  ></v-text-field>
                  
                  <v-text-field
                    ref="username"
                    v-model="username"
                    dense
                    outlined
                    label="用户名"
                    :rules="[rules.required,usernameok]"

                  ></v-text-field>
                  <v-text-field
                    ref="name"
                    v-model="name"
                    dense
                    outlined
                    label="名称"
                    :rules="[rules.required]"
                  ></v-text-field>
                  <v-text-field
                    ref="password"
                    v-model="password"
                    :append-icon="showeye ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.required, rules.min]"
                    :type="showeye ? 'text' : 'password'"
                    hint="密码至少六位"
                    dense
                    outlined
                    class="input-group--focused"
                    label="密码"
                    required
                    @click:append="showeye = !showeye"
                    
                  ></v-text-field>
                <v-btn   width="100%" color="primary" class="mx-auto" @click="submit" >
                  注册
                </v-btn>
              </v-card-text>
            </v-row>
          </v-card>
          <v-card v-if="page==1"  class="mx-1" width="35vh" flat>
            <img
              height="100%"
              width="100%"
              src="https://img.shuicaimi.com/c2020/11/25/42kqpwvyl3a.jpg"
            >
            </img>
            <!-- <v-card-text> -->
              <v-card-title class="mx-auto "
                >添加你的出生日期</v-card-title
              >
            <!-- </v-card-text> -->
            <v-card-text>
              这不会显示在你的公开资料当中
            </v-card-text>
            <v-row >
              <v-card-text>
      <v-menu
        v-model="menu2"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template #activator="{ on, attrs }">
          <v-text-field
            v-model="birthday"
            label="请选择你的出生日期"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="birthday"
          locale="zh-CN"
          @input="menu2 = false"
        ></v-date-picker>
      </v-menu>
                <v-btn :loading="nextsteploading"  width="100%" color="primary" class="mx-auto" @click="postEmail">
                  下一步
                </v-btn>
                <v-btn  width="100%"  text color="primary" class="mx-auto" @click="page -=1" >
                  返回
                </v-btn>
              </v-card-text>
            </v-row>
          </v-card>
          <v-card v-if="page==2"  class="mx-1" width="35vh" flat>
            <img
              height="100%"
              width="100%"
              src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic.51yuansu.com%2Fpic3%2Fcover%2F00%2F87%2F76%2F58db160c57608_610.jpg&refer=http%3A%2F%2Fpic.51yuansu.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1661761074&t=ae9865faa49bc2bce556ee63de27a473"
            >
            </img>
            <!-- <v-card-text> -->
              <v-card-title class="mx-auto "
                >输入验证码</v-card-title
              >
            <!-- </v-card-text> -->
            <v-card-text>
              请输入{{v.email}}收到的验证码。
              <v-btn    text color="primary" class="mx-auto" @click="postEmail" >
                  重新发送验证码
                </v-btn>
            </v-card-text>
              <v-otp-input
              v-model="v.code"
              length="4"
              :rules="[rules.required]"
              type="text"
            ></v-otp-input>
            <v-row >
              <v-card-text>
      
                <v-btn   width="100%" color="primary" class="mx-auto" @click="register">
                  下一步
                </v-btn>
                <v-btn  width="100%"  text color="primary" class="mx-auto" @click="page -=1" >
                  返回
                </v-btn>
              </v-card-text>
            </v-row>
          </v-card>
        </v-sheet>
        </v-col>
        <v-col>
          <v-sheet max-width="38vh" class="mx-auto pa-5" elevation="1">
            <v-card width="35vh" flat>
              <v-col>
                <v-card-text center>
                已有账号了？<router-link to="/">登录</router-link>
              </v-card-text>


              </v-col>
              
            </v-card>
          </v-sheet>
        </v-col>
        
        </v-sheet>
      </v-container>
    </v-main>
    <v-footer app padless>
      {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
    </v-footer>
  </v-app>
</template>
<script>
import parseHead from '@/utils/tools'
// import { mapMutations } from 'vuex'
export default {
  data: () => ({
    username: '',
    name: '',
    emailorphone: '',
    password: '',
    code: '',
    ip: '',
    data: null,
    btndisable: false,
    showeye: false,
    errorMessages: '',
    formHasErrors: false,
    emailorphoneok: true,
    usernameok: true,
    menu2: false,
    v:null,
    snackbar: false,
    snackbarText: '',
    timeout: 2000,
    nextsteploading: false,
    birthday: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
    rules: {
      required: value => !!value || '不能为空',
      min: v => v.length >= 6 || '密码至少六位',
    },
    page: 0,
  }),
  computed: {
    form() {
      return {
        username: this.username,
        name: this.name,
        emailorphone: this.emailorphone,
        password: this.password,
      }

    },
  },
  watch: {
    name() {
      this.errorMessages = ''
    },
  },
  methods: {
    sendSnackbar(mes){
      this.snackbarText=mes
      this.snackbar = true
    },
    async submit() {
      this.formHasErrors = false
      Object.keys(this.form).forEach(f => {
        if (!this.form[f]) this.formHasErrors = true
        this.$refs[f].validate(true)
      })
      if (this.formHasErrors) {
        return
      }
      await this.$authApi.attempt({
        "emailorphone": this.emailorphone,
        "username": this.username,
        "name": this.name,
        "password": this.password,
      }).then((res) => {
        // console.log('res:', res)
        this.emailorphoneok = true
        this.usernameok = true
        this.page =1
        this.v = res.data.v
        // this.$cookies.set('mid',  session.mid)
      }).catch(error => {
        if (error.response.data.data.position !== 2) {
          this.emailorphoneok = false || error.response.data.msg
        } else {
          this.usernameok = false || error.response.data.msg
        }
      })
    },
    async postEmail() {
      this.nextsteploading= true
      await this.$authApi.sendEmail().then((res) => {
        this.v.birth_day = this.birthday
        console.log('res:', res)
        this.nextsteploading= false 
        this.page =2
      }).catch(error => {
        this.sendSnackbar(error.response.data.msg)
      })
    },
    async register() {
      await this.$authApi.register(this.v).then((res) => {
        console.log('res:', res)
        this.sendSnackbar("注册成功！")
        const cookieObj = parseHead(res.data.cookie)
        console.log('cookieObj:', cookieObj)

        this.$cookies.set('info',  cookieObj.info,{maxAge: 604800})

        this.$router.replace({ name: 'index' });
      }).catch(error => {
        this.sendSnackbar(error.response.data.msg)
      })
    }

  }
}
</script>
<style lang=""></style>
