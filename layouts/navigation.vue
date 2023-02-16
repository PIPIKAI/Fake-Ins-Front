<template>
    <v-app>
    <AppBar></AppBar>

    <v-navigation-drawer app>
      <v-list>
        <v-list-item>
          <v-list-item-avatar>
            <v-img :src="user.Photo"></v-img>
          </v-list-item-avatar>
        </v-list-item>

        <v-list-item link @click="$router.push({path: '/user/' + user.UserName})">
          <v-list-item-content>
            <v-list-item-title class="text-h6">
              {{user.Name}}
            </v-list-item-title>
            <v-list-item-subtitle>{{user.Email}}</v-list-item-subtitle>
          </v-list-item-content>

        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="selectedItem"
          color="primary"
        >
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
          >
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-main class="ma-0 pl-11">
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <!-- <div    
      {{ new Date().getFullYear() }} — <strong>Faker Ins</strong>
      </div> -->
  </v-app>
</template>
<script>
import AppBar from '../components/globle/AppBar'
export default {
    components: { AppBar },
    data: () => ({
        user : {},
        items: [
          { title: '基本信息', icon: 'mdi-account' },
          { title: '安全设置', icon: 'mdi-lock' },
          { title: 'About', icon: 'mdi-help-box' },
        ],
        right: null,
        tab: null,
        selectedItem:0
    }),
    mounted() {
        this.user = this.$store.state.user
    },
    watch:{
      selectedItem:{
        handler(newValue, oldValue) {
          console.log(newValue,oldValue)
          if(newValue == 1){
            this.$router.push('/account/secure')
          }else if(newValue == 2){
            this.$router.push('/account/about')
          }else if(newValue == 0){
            this.$router.push('/account/profile')
          }else{

          }
        },
      }
    }
}
</script>
<style lang="">
    
</style>