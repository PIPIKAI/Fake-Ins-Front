<template>
    <div>
        <ContentListDialog @closeDialog="$store.commit('setFansListDialog',false)" :Title="title" :Dialog="$store.state.fansListDialog">
          <UserList :UserLists="fansList" @clickUser="clickItem" ></UserList>
        </ContentListDialog>
    </div>
</template>
<script>
import UserList from '~/components/common/UserList.vue'
import ContentListDialog from './ContentListDialog.vue'
export default {
    name:"FanDialogs",
    components: {ContentListDialog,UserList},
    data: () => ({
        fansList:[],
        page:1,
        page_size:6,
        title: "全部粉丝"
    }),
    async mounted() {
        this.fansList = await this.$store.dispatch("UserModule/getFansList",{
            page:this.page,
            page_size:this.page_size
        })
        .then((res)=>{
            console.log(res)
            return res.data.data
        })
    }, 
    methods: {
      clickItem(UserName){
            this.$router.push(`/user/${UserName}`)
            this.$store.commit('setFansListDialog',false)
      },

    },
}
</script>