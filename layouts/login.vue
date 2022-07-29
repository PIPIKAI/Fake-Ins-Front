<template lang="">
  <v-app>
    <v-app-bar app flat hidden></v-app-bar>
    <!-- 根据应用组件来调整你的内容 -->
    <v-main>
      <!-- 给应用提供合适的间距 -->
      <v-container >
        <v-col >
          <v-sheet max-width="35vh" class="mx-auto pa-5" elevation="1">
          <v-card width="35vh" flat>
            <v-img
              height="100%"
              width="100%"
              src="https://gd-hbimg.huaban.com/f4c384c25a3c7f8c6571a2e34dfe62da5218d743151e2-Q2HJ6i_fw1200"
            >
            </v-img>
            <v-card-text>
            </v-card-text>
            <v-row>
              <v-card-text>
                <v-col cols="12" md="12">
                  <v-text-field
                    v-model="user.phoneoremail"
                    dense
                    label="手机、账号或者邮箱"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="12">
                  <v-text-field
                    v-model="user.password"
                    dense
                    label="密码"
                  ></v-text-field>
                </v-col>
                <v-btn width="100%" color="primary" class="mx-auto">
                  登录
                </v-btn>
              </v-card-text>
            </v-row>
          </v-card>
        </v-sheet>
        </v-col>
        
        <v-col >
          <v-sheet max-width="35vh" class="mx-auto pa-5" elevation="1">
            <v-card width="35vh" flat>
              <v-col>
                <v-card-text center>
               没有账户？<nuxt-link to="/register">注册</nuxt-link>
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
export default {
  data: () => ({
    user: {
      username: '',
      account: '',
      phoneoremail: '',
      password: '',
    },
  }),
}
</script>
<style lang=""></style>
