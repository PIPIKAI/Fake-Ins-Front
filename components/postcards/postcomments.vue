<template>
  <div>
    <v-list three-line>
      <div class="ma-auto ">
        <template v-for="(item, index) in comments" >
          <CommentItem :key="index" :item="JSON.parse(JSON.stringify(item))" />
        </template>
      </div>
      <div class="mb-2 mt-3"></div>
      <div v-if="pageBtn" class="d-flex justify-center mb-0">
        <v-btn  icon small outlined   @click="addItem" color="black">
          <div class="transition-swing text-h4 mb-0" >+</div>
        </v-btn>
      </div>
      <div v-else >
        <div class="text-center transition-swing text-button mb-0" v-text="btnTex"></div>
      </div>
    </v-list>
  </div>
</template>
<script>
import CommentItem from './CommentItem'
export default {
  name: 'PostComments',
  components:{CommentItem},
  props: {
    postid: {
      type: Number,
      required: true,
    },
  },
  data: () => ({
    page:1,
    page_size:9,
    pageBtn: false,
    btnTex:"",
    replyMode: false
  }),
  computed:{
    comments: {
      get() {
        return this.$store.state.commentModule.showComments
      },
      set(newVal) {
        this.$store.commit('commentModule/setShowComments', newVal)
      },
    },
  },
  async mounted() {
    await this.$store.dispatch("commentModule/GetComments",{
      'postid':this.postid,
      'page': this.page,
      'page_size':this.page_size
    }).then(res => {
      if(res.data.data.length < this.page_size){
        this.pageBtn = false
      }else{
        this.pageBtn = true
        this.btnTex = "到底了"
      }
      this.$store.commit("commentModule/setShowComments",res.data.data)
      return res.data.data
    })
  },
  methods: {
    async addItem(){
      this.page=this.page+1
      await this.$store.dispatch("commentModule/GetComments",{
        'postid':this.postid,
        'page': this.page,
        'page_size':this.page_size
      }).then(res => {
        if(res.data.data.length === 0){
          this.pageBtn = false
        }else{
          this.pageBtn = true
          this.comments =this.comments.concat(res.data.data)
        }
      })
    }
  },
}
</script>
<style scoped>

</style>