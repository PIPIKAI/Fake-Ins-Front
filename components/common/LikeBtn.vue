<template lang="">
    <div>
        <v-icon v-if="!liked" flat @click="Like">mdi-cards-heart-outline</v-icon>
        <v-icon v-else  flat color="pink" @click="UndoLike">mdi-cards-heart</v-icon>
    </div>
</template>
<script>
export default {
    props: {
        ownerid: Number,
        owner_type:String,

    },
    data: () => ({
        liked: false,
        
    }),
    computed: {
        self() {
            return this.$store.state.user
        },
        reqData(){
            return {
            'ownerid': this.ownerid,
            'owner_type':this.owner_type
            }
            
        }
    },
    async mounted() {
        console.log(this.ownerid,this.owner_type)
         await this.$store.dispatch('LikeOrNot', this.reqData).then(res=>{
            console.log(res)
            this.liked = res.data
        }).catch(err=>{
            console.log(err)
        })
        
    },
    methods: {
        async Like() {
            await this.$store.dispatch('Like',this.reqData).then(res=>{
            console.log(res)
            this.liked = true
            // this.$store.commit('sendSnackbar',"点赞成功")
        }).catch(err=>{
            console.log(err)
            this.$store.commit('sendSnackbar',"点赞失败")
        })
        },
       async UndoLike() {
            await this.$store.dispatch('UndoLike', this.reqData).then(res=>{
            console.log(res)
            this.liked = false
            // this.$store.commit('sendSnackbar',"取消点赞成功")
        }).catch(err=>{
            console.log(err)
            // this.$store.commit('sendSnackbar',"取消点赞失败")
        })
        },
    }
}
</script>
<style lang="">
    
</style>