<template lang="">
  <v-app>
    <v-app-bar app flat hidden></v-app-bar>
    <!-- 根据应用组件来调整你的内容 -->
    <v-main>
      <!-- 给应用提供合适的间距 -->
      <v-container >
        <v-snackbar
      v-model="snackbar"
      :timeout="2000"
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
        <v-col >
          <v-sheet rounded max-width="35vh" class="mx-auto pa-5" elevation="1">
          <v-card width="35vh" flat>
            <v-img
              height="100%"
              width="100%"
              src="http://pic.kiass.top/logo2.png"
            >
            </v-img>
            <v-card-text>
            </v-card-text>
            <v-row>
              <v-card-text>
                <v-col cols="12" md="12">
                  <v-text-field
                    v-model="user.emailorphoneorusername"
                    dense
                    label="手机、账号或者邮箱"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="12">
                  <v-text-field
                    v-model="user.password"
                    :append-icon="showeye ? 'mdi-eye' : 'mdi-eye-off'"
                    dense
                    :type="showeye ? 'text' : 'password'"
                    label="密码"
                    @click:append="showeye = !showeye"
                  ></v-text-field>
                </v-col>
                <v-btn @click="login" width="100%" color="primary" class="mx-auto">
                  登录
                </v-btn>
              </v-card-text>
            </v-row>
          </v-card>
        </v-sheet>
        </v-col>
        
        <v-col >
          <v-sheet rounded max-width="35vh" class="mx-auto pa-5" elevation="1">
            <v-card width="35vh" flat>
              <v-col>
                <v-card-text class="text-subtitle-2 text-center">
               没有账户？<nuxt-link to="/register">注册</nuxt-link>
              </v-card-text>


              </v-col>
              
            </v-card>
          </v-sheet>
        </v-col>
        </v-sheet>
      </v-container>
    </v-main>

  </v-app>
</template>
<script>
import parseHead from '@/utils/tools'

export default {
  data: () => ({
    user: {
      emailorphoneorusername: '',
      password: '',
    },
    snackbar: false,
    snackbarText: '',
    showeye: false,
  }),
  methods:{
    sendSnackbar(mes){
      this.snackbarText=mes
      this.snackbar = true
    },
    async login(){
      await this.$authApi.login({
        "emailorphoneorusername":this.user.emailorphoneorusername,
        "password":this.user.password,
      }).then((res) => {
        console.log('res:', res.data)
        const cookieObj = parseHead(res.data.cookie)
        this.sendSnackbar("登录成功")
        this.$cookies.set('info',  cookieObj.info,{maxAge:parseInt(cookieObj[" Max-Age"])})
        this.$router.replace({ name: 'index' });
      }).catch(error => {
        this.sendSnackbar(error.response.data.msg)
      })
    }
  }
}
</script>
<style lang=""></style>
