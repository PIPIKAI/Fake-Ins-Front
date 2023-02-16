<template>
  <div>
    <v-sheet rounded="lg" class="mx-auto my-5 pa-1" min-height="268">
      <v-list subheader two-line>
        <v-subheader>
          <v-avatar class="mr-4">
            <v-icon v-if="$store.state.user.Photo == ''"
              >mdi-account-circle</v-icon
            >
            <img v-else :src="$store.state.user.Photo" />
          </v-avatar>
          <v-list-item-content>
            <v-list-item-title
              v-text="$store.state.user.Username"
            ></v-list-item-title>

            <v-list-item-subtitle
              v-text="$store.state.user.Name"
            ></v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn color="primary" outlined> 切换 </v-btn>
          </v-list-item-action>
        </v-subheader>
        <v-subheader>
          <strong>{{info}}</strong>

          <v-spacer></v-spacer>
          <!-- 查看全部 -->
        </v-subheader>

        <UserList :UserLists="recommendUsers" @clickUser="clickItem"></UserList>

        <v-subheader>关于.帮助.API.工作.隐私.条款</v-subheader>
        <v-subheader>@2022 Powered By ZZK</v-subheader>
      </v-list>
    </v-sheet>
  </div>
</template>
<script>
import UserList from '~/components/common/UserList.vue'
export default {
  components: { UserList },
  data: () => ({
    recommendUsers: [],
    page: 1,
    page_size: 6,
  }),
  async mounted() {
    this.recommendUsers = await this.$store.dispatch(
      'UserModule/getCommendUsers'
    )
  },
  methods: {
    clickItem(UserName) {
      this.$router.push(`/user/${UserName}`)
    },
  },
  computed:{
    info(){
      return this.recommendUsers.length == 0 ? '' : '为你推荐'
    }
  }
}
</script>
<style lang=""></style>
