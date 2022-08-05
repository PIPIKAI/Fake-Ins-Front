<template lang="">
  <div v-cloak>
    <v-card min-height="75vh">
      <v-card-actions class="pa-1">
        <v-btn text color="primary" @click="$emit('abandonPost')">上一步</v-btn>
        <v-spacer></v-spacer>
        <div class="text-h6 font-weight-bold text-center">裁剪</div>
        <v-spacer></v-spacer>
        <v-btn text color="primary" @click="nextStep">下一步</v-btn>
      </v-card-actions>
      <v-divider></v-divider>
      <v-carousel
        ref="carouselRef"
        v-model = "operatId"
        height="75vh"
        show-arrows-on-hover
        :continuous="false"
      >
        <v-carousel-item v-for="(item, i) in ListData"  :key="i">
          <vueCropper
            ref="cropper"
            :img="item.blob"
            :can-move-box="false"
            :fixed="true"
            :fixed-box="true"
            :fixed-number="fixedrate[selectFixedRate].rate"
            :auto-crop="autoCrop"
            :auto-crop-width="800"
            :auto-crop-height="800"
            :full="false"
            mode="100px"
            :center-box="true"
          ></vueCropper>
        </v-carousel-item>
      </v-carousel>
      
          <!-- 放大镜 -->
          <v-menu top :close-on-content-click="false">
            <template #activator="{ on, attrs }">
              <v-btn
                icon
                small
                class="crtn"
                v-bind="attrs"
                color="white"
                v-on="on"
                @click="operate"
              >
                <v-icon small>mdi-magnify-plus-outline</v-icon>
              </v-btn>
            </template>

            <v-card
              rounded
              min-width="10vh"
              class="ma-0 pa-0"
              dark
              style="
                background-color: black;
                filter: alpha(Opacity=60);
                -moz-opacity: 0.7;
                opacity: 0.7;
              "
            >
              <v-card-subtitle> </v-card-subtitle>
              <v-card-actions>
                <v-slider v-model="sliders[operatId]"></v-slider>
              </v-card-actions>
            </v-card>
          </v-menu>
          <!-- 新增图片 -->
          <div>
            <v-menu top :close-on-content-click="false" left>
              <template #activator="{ on, attrs }">
                <v-btn
                  icon
                  small
                  class="bbtn"
                  color="white"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon small>mdi-panorama-variant-outline</v-icon>
                </v-btn>
              </template>
              <UploadLitterCard @deletLastOne="$emit('abandonPost')"/>

            </v-menu>
          </div>
      <v-menu :close-on-content-click="false" top>
        <template #activator="{ on, attrs }">
          <v-btn icon small class="cbtn" v-bind="attrs" color="white" v-on="on">
            <v-icon small>mdi-overscan</v-icon>
          </v-btn>
        </template>

        <v-list
          rounded
          dense
          dark
          style="
            background-color: black;
            filter: alpha(Opacity=60);
            -moz-opacity: 0.7;
            opacity: 0.7;
          "
        >
          <v-list-item-group v-model="selectFixedRate" mandatory>
            <v-list-item
              v-for="(item, i) in fixedrate"
              :key="i"
              color="primary"
              @click="test"
            >
              <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title
                  >{{ item.rate[0] }}:{{ item.rate[1] }}</v-list-item-title
                >
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>
    </v-card>
  </div>
</template>
<script>
import UploadLitterCard from './uplodLitterCard.vue'
export default {
  name: 'CropImageCard',
  components:{UploadLitterCard},
  data: () => ({
    ImgeList: [],
    fixedrate: [
      { icon: 'mdi-crop-square', rate: [1, 1] },
      { icon: 'mdi-cellphone', rate: [4, 5] },
      { icon: 'mdi-rectangle-outline', rate: [16, 9] },
    ],
 
    update: true,
    autoCrop: true,
    sliders: [50],
    operatId:0,
  }),
  computed: {
    ListLen() {
      return this.$store.state.cteatePostModule.FileList.length
    },
    ListData: {
       get () {
      return this.$store.state.cteatePostModule.FileList
      },
      set (value) {
      this.$store.commit('cteatePostModule/setFileList', value)
      }
    },
    selectFixedRate:{
      get () {
      return this.$store.state.cteatePostModule.selectFixedRate
      },
      set (value) {
      this.$store.commit('cteatePostModule/setSelectFixedRate', value)
      }
    },
    newSliders() {
      return JSON.parse(JSON.stringify(this.sliders))
    }
  },
  watch: {
    newSliders: {
      handler(newValue, oldValue) {
        this.$refs.cropper[this.operatId].changeScale(
          (newValue[this.operatId] - oldValue[this.operatId]) * 2
        )
      },
      deep: true,
    },
  },
  mounted() {
    this.initSlider()
  },
  methods: {
    initSlider() {
      this.sliders = new Array(this.ListLen + 10).fill(50.0)
    },
    reload() {
      // 移除组件
      this.update = false
      // 在组件移除后，重新渲染组件
      // this.$nextTick可实现在DOM 状态更新后，执行传入的方法。
      this.$nextTick(() => {
        this.update = true
      })
    },
    async test() {
      this.autoCrop = !this.autoCrop
      await this.$refs.cropper.forEach((element) => {
        element.goAutoCrop()
      })
      this.autoCrop = !this.autoCrop
    },
     nextStep() {
      if (this.operatId < this.ListLen -1){
        this.operatId++
        return
      }
      console.log(this.$refs.cropper)
      const temp = JSON.parse(JSON.stringify(this.ListData))
       for (let i = 0; i < temp.length; i++) {
           this.$refs.cropper[i].getCropBlob((data) => {
          const cropedBlobUrl = window.URL.createObjectURL(data)
          temp[i].cropedBlobUrl = cropedBlobUrl
          temp[i].blobData = data
          this.$store.commit("cteatePostModule/setFileList",JSON.parse(JSON.stringify(temp)))
        })
      }
      this.$emit('nextpage')
    },
    operate(){
      this.operatId = this.$refs.carouselRef.internalIndex
    }
  },
}
</script>
<style scoped="scoped" lang="scss">
.cbtn {
  position: absolute;
  z-index: 999;
  left: 1%;
  background: black;
  margin-top: -5%;
}

.crtn {
  position: absolute;
  z-index: 999;
  left: 7%;
  background: black;
  margin-top: -5%;
}

.bbtn {
  position: absolute;
  z-index: 999;
  right: 1%;
  background: black;
  margin-top: -5%;
}
</style>
