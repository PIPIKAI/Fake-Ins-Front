<template>
  <v-app>
    <v-row>
      <v-col  md="3"> </v-col>
      <v-col  md="5">
        <div v-for="(post, index) in postList" :key="index">
          <PostCards :post-contend="post"  />
        </div>
        <div v-if="!InTheBottom">
          <h3 class="centertext">
            {{loading}}
          </h3>
        </div>
        <div v-else>
          <h3 class="centertext">
            没有更多内容啦
          </h3>
        </div>

      </v-col>
      <v-col md="3">
          <HomeRight></HomeRight>
        </v-col>
    </v-row>
    
  </v-app>
</template>

<script>
import PostCards from '~/components/postcards/PostCards'
import HomeRight from '~/components/homeright/HomeRight'
export default {
  components: { PostCards, HomeRight },
  layout: 'default',
  middleware: 'auth',
  data: () => ({
    postList :[],
    page:1,
    page_size:8,
    InTheBottom: false,
    loading: '加载中',
  }),
  async mounted() {
    await document.addEventListener('scroll', this.debounce(this.handleScroll, 1000))
    this.postList = await this.$store.dispatch('getPostModule/getHomePosts', {'page':this.page,'page_size':this.page_size}).then(res => res.data)
  },
  computed:{
    emptyList(){
      return this.postList.length == 0
    }
  },
  methods: {
    async handleScroll(){
      let scrollTop=document.documentElement.scrollTop//滚动条在Y轴滚动过的高度
      let scrollHeight=document.documentElement.scrollHeight//滚动条的高度
      let clientHeight=document.documentElement.clientHeight//浏览器的可视高度
      if(scrollTop + clientHeight + 10>= scrollHeight){
        console.log('触底了');
        if(this.InTheBottom){
          return
        }
        this.page += 1
        this.loading = "加载中"

        let newList = await this.$store.dispatch('getPostModule/getHomePosts', {'page':this.page,'page_size':this.page_size}).then(res => res.data)
        if(newList.length == 0){
          this.InTheBottom = true
          window.scrollTo(99999,99999)
        }
        this.postList.push(...newList)
        this.loading = ""
      }
    },
    debounce(fn, delay) {
      let timer = null; // 借助闭包
      return function () {
        if (timer) {
          clearTimeout(timer);
        }
        timer = setTimeout(fn, delay); // 简化写法
      };
    },

  },
  destroyed(){
    window.removeEventListener('scroll', this.handleScroll);
  },
}
</script>
<style>
  .centertext {
    text-align: center;
    color: rgb(16, 5, 50);

  }
</style>