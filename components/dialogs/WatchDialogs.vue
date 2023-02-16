<template>
  <div>
    <ContentListDialog @clickUser="clickItem" @closeDialog="$store.commit('setWatchedListDialog',false)" :Title="title" :Dialog="$store.state.watchedListDialog">
      <UserList :UserLists="watchedList" ></UserList>
    </ContentListDialog>
  </div>
</template>
<script>
import UserList from '~/components/common/UserList.vue'
import ContentListDialog from './ContentListDialog.vue'
export default {
  components: { UserList, ContentListDialog},
  data: () => ({
    watchedList: [],
    page: 1,
    page_size: 6,
    title: "全部关注"
  }),
  async mounted() {
    this.watchedList = await this.$store
      .dispatch('UserModule/getWatchedList', {
        page: this.page,
        page_size: this.page_size,
      })
      .then((res) => {
        return res.data.data
      })
  },
  methods: {
    clickItem(UserName) {
      this.$router.push(`/user/${UserName}`)
      this.$store.commit('setWatchedListDialog',false)
    },
  },
}
</script>
<style>
.closebtn {
  position: absolute;
  right: 0;
  padding: 0;
  margin: 0;
}

.itemlist {
  position: absolute;
  width: 100%;
  overscroll-behavior: contain;
  overflow: auto;
  height: 100%;
}
</style>
