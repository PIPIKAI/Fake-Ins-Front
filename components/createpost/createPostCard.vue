<template lang="">
  <v-card min-height="75vh">
    <v-card-actions class="pa-1">
      <v-btn text color="primary" @click="$emit('prepage')">上一步</v-btn>
      <v-spacer></v-spacer>
      <div class="text-h6 font-weight-bold text-center">创建新帖子</div>
      <v-spacer></v-spacer>
      <v-btn text color="primary" @click="uploadPost">提交</v-btn>
    </v-card-actions>
    <v-divider></v-divider>
    <v-row class="ma-0 pa-0">
      <v-col class="ma-0 pa-0" md="9">
          <v-carousel height="100%" show-arrows-on-hover :continuous="false">
            <v-carousel-item  
              v-for="(item, i) in $store.state.createPostModule.FileList"
              :key="i"
            >
              <v-img max-height="75vh"    :src="item.cropedBlobUrl"></v-img>
            </v-carousel-item>
          </v-carousel>

      </v-col>
      <v-col fixed class="ma-0 pa-0" md="3">
        <v-card height="75vh" class="ma-auto pa-2" outline>
          <v-card-title class="ma-1">
            <v-avatar size="36">
              <v-icon v-if="$store.state.user.Photo == ''"
                >mdi-account-circle</v-icon
              >
              <img v-else alt="Avatar" :src="$store.state.user.Photo" />
            </v-avatar>
            {{ $store.state.user.Name }}
          </v-card-title>
          <v-card-actions max-height="30vh" class="pa-0 ma-1">
            <v-textarea
              v-model="mycomment"
              counter
              label="添加说明.."
              :rules="rules"
              solo
              flat
            ></v-textarea>
          </v-card-actions>
          <v-divider></v-divider>
          <v-card-actions max-height="30vh" class="pa-0 ma-1">
            <v-text-field
              v-model="place"
              label="位置"
              append-icon="mdi-map-marker"
              solo
              flat
            ></v-text-field>
          </v-card-actions>

          <v-divider></v-divider>
          <v-card-actions fixed max-height="30vh" class="pa-0 ma-1">
            <v-combobox
              v-model="categorys"
              chips
              clearable
              label="类别"
              multiple
              solo
              flat
            >
              <template #selection="{ attrs, item, select, selected }">
                <v-chip
                  v-bind="attrs"
                  :input-value="selected"
                  close
                  @click="select"
                  @click:close="remove(item)"
                >
                  <strong>{{ item }}</strong>
                </v-chip>
              </template>
            </v-combobox>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
export default {
  data: () => ({
    update: true,
    rules: [(v) => v.length <= 220 || '最多输入 220 字符'],
    categorys: [],
    mycomment: "",
    place: "",

  }),
  computed: {},
  methods: {
    uploadPost() {
      console.log(this.$store.state.createPostModule.FileList)
      this.$store.dispatch('createPostModule/createPost',{
        "user_id" : this.$store.state.user.ID,
        "categorys":this.categorys,
        "mycomment":this.mycomment,
        "place":this.place,
        "data_list": this.$store.state.createPostModule.FileList
      }).then(res=>{
        console.log(res)
        this.$store.commit('createPostModule/setFileList',null)
        this.$router.go(0)
      }).catch(err =>{
        console.log(err)
      })
    },
    remove(item) {
       this.categorys.splice(this.categorys.indexOf(item), 1)
    },
  },
}
</script>
<style scoped>
</style>
