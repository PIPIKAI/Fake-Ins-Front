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
        <v-card outline>
          <v-carousel height="75vh" show-arrows-on-hover :continuous="false">
            <v-carousel-item
              v-for="(item, i) in $store.state.cteatePostModule.FileList"
              :key="i"
            >
              <v-img max-height="75vh" :src="item.cropedBlobUrl"></v-img>
            </v-carousel-item>
          </v-carousel>
        </v-card>
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
              counter
              label="添加说明.."
              :rules="rules"
              :value="comment"
              solo
              flat
            ></v-textarea>
          </v-card-actions>
          <v-divider></v-divider>
          <v-card-actions max-height="30vh" class="pa-0 ma-1">
            <v-text-field
              label="位置"
              append-icon="mdi-map-marker"
              :value="place"
              solo
              flat
            ></v-text-field>
          </v-card-actions>

          <v-divider></v-divider>
          <v-card-actions fixed max-height="30vh" class="pa-0 ma-1">
            <v-combobox
              v-model="chips"
              chips
              clearable
              label="类别"
              multiple
              solo
              flat
            >
              <template v-slot:selection="{ attrs, item, select, selected }">
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
    comment: '',
    place: '',
    rules: [(v) => v.length <= 220 || '最多输入 220 字符'],
    chips: [
    ],
    items: ['Streaming', 'Eating'],
  }),
  computed: {},
  methods: {
    reload() {},
    uploadPost() {
      this.$store.commit('cteatePostModule/test')
    },
    remove(item) {
      this.chips.splice(this.chips.indexOf(item), 1)
    },
  },
}
</script>
<style lang=""></style>
