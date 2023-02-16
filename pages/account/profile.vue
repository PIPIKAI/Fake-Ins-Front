<template>
  <v-card class="mt-5" flat>
    <CropImageDialog
    :dialog="cropImg"
    :listdata="fileListData"
    :miniheight="dialogSize"
    :imgfixedrates="rates"
    :zoom="true"
    :miniuploadcard="false"
    :rate="false"
    @abandonPost="CanerCrop"
    @nextStep="UploadPhoto"
    ></CropImageDialog>
    <v-row class="ma-auto pa-auto justify-center">
      <div>
        <div>
          <v-avatar size="12vh">
            <img :src="user.Photo" />
          </v-avatar>
        </div>
        <el-upload
        v-model:file-list="fileListData"
        action=""
        class="editphoto"
        :limit="10"
        :show-file-list="false"
        :auto-upload="false"
        accept="image/png,image/gif,image/jpg,image/jpeg"
        :on-preview="handlePreview"
        :before-upload="beforUpload"
        :on-change="onChange"
        :on-remove="onRemove"
        :on-success="Onsuccess"
        :on-error="OnError"
        :on-exceed="onExceed"
      >
        <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
            <v-btn  color="orange" v-bind="attrs"
            v-on="on" icon @click="ChangePhoto">
            <v-icon> mdi-pencil </v-icon>
            </v-btn>
        </template>
        <span>修改头像</span>
      </v-tooltip>
    </el-upload>
      </div>
    </v-row>

    <v-row class="ma-auto pa-auto pt-12">
      <v-col>
        <v-text-field filled v-model="user.Name" label="名称"></v-text-field>
      </v-col>
      <v-col>
        <v-autocomplete
          filled
          v-model="user.Gender"
          :items="sexvalues"
          label="性别"
        ></v-autocomplete>
      </v-col>
      <v-col cols="12" sm="6" md="4">
        <v-menu
          v-model="timepiker"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="user.BirthDay"
              filled
              label="生日"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            filled
            v-model="user.BirthDay"
            @input="timepiker = false"
          ></v-date-picker>
        </v-menu>
      </v-col>
    </v-row>
    <v-row class="ma-auto pa-auto">
      <v-col cols="12" sm="6" md="4">
        <v-text-field
          filled
          v-model="user.Website"
          label="个人网站"
        ></v-text-field>
      </v-col>
      <v-col>
        <v-text-field
          filled
          v-model="user.Bio"
          label="自我介绍"
          auto-grow
        ></v-text-field>
      </v-col>
    </v-row>

    <v-btn depressed color="primary" :loading="saveloading" class="submit" @click="saveInfo">保存</v-btn>
  </v-card>
</template>
<script>
import CropImageDialog from '@/components/dialogs/CropImageDialog.vue'
export default {
  layout: 'navigation',
  middleware: 'auth',
  components:{CropImageDialog},
  data: () => ({
    user: {},
    timepiker: false,
    sexvalues: ['男', '女'],
    fileListData:[],
    cropImg:false,
    rates:[{ icon: 'mdi-crop-square', rate: [1, 1] },],
    dialogSize: "65vh",
    saveloading: false,
  }),
  mounted() {
    this.user = JSON.parse(JSON.stringify(this.$store.state.user))
  },
  methods: {
    ChangePhoto(item){
        console.log("item",item)
    },
    handlePreview(uploadFile){
      console.log('handlePreview',uploadFile.raw)
    },
    onExceed() {
      this.$store.commit('sendSnackbar', '超过最大文件上传个数')
    },
    beforUpload(file) {
      console.log('beforUpload', file.name)
      const fileTypeList = ['png', 'jpeg', 'jpg'] // 可以上传的文件后缀名
      const fileType = file.name.substring(file.name.lastIndexOf('.') + 1) // 获取上传文件的后缀名
      const isType = !fileTypeList.includes(fileType) // 判断类型是否符合
      const isLtXM = file.size / 1024 / 1024 < 10 // 上传文件小于10MB
      if (isType) {
        this.$message.error('只能上传pdf，png，jpeg，jpg格式文件')
        // fileList.pop()//删除不符合的文件  这两个方法随便选择一个都行
        return false
      } else if (!isLtXM) {
        this.$message.error('文件大小不能超过10MB')
        return false
      }
      this.uplodingFile = file
      return true
    },
    async uploadHandle(data) {
      return await this.getBase64(data.file).then((res) => {
        return this.$authApi.uploadImg(res)
      })
    },
    onChange(file, fileList) {
      if (!this.beforUpload(file)) {
        return
      }
      this.fileListData = fileList
      const _file = file.raw
      const blob = new Blob([_file], { type: 'image/jpeg' })
      const blobUrl = window.URL.createObjectURL(blob)
      file.blob = blobUrl
      console.log('onChange', fileList)
      console.log("open crop dialog")
      this.cropImg=true
    },
    // base64编码转换方法
    getBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader() // 定义方法读取文件
        reader.readAsDataURL(file) // 开始读文件  本身是图片的二进制数据 进行base64加密形成字符串
        reader.onload = () =>
          resolve({
            name: file.uid + file.name,
            file: reader.result.split(',')[1],
          }) // 成功返回对应的值 reader.result可以直接放在img标签中使用
        reader.onerror = () => reject(error) // 失败返回失败信息
      })
    },
    onRemove(file) {
      console.log('onRemove')
    },
    onPreview(file) {
      console.log('onPreview', file.raw)
    },
    Onsuccess(response, file, fileList) {
      this.$message.success('上传成功')

      file.url = response.data.url
    },
    OnError(err, file, fileList) {
      this.$message.error(err.msg)
    },
    CanerCrop(){
      // abandonPost
      this.cropImg = false
      this.fileListData.pop()
      // this.onRemove(this.fileListData[0])
    },
    UploadPhoto(item){
      console.log('item',item)
      this.$store.dispatch("UserModule/editUserPhoto",{
        uid: this.user.ID,
        data_list: item
      }).then(res=>{
        this.$message.success("更换头像成功！")
        this.$router.go(0)
      }).catch(err=>{
        this.$message.error("修改失败！"+"err："+err.response.data.msg)
      })
      this.CanerCrop()
    },
     saveInfo(){
      this.saveloading = true
      this.$store.dispatch("UserModule/editUserInfo",
       this.user
      ).then((res)=>{
        console.log('res',res)
        this.$message.success("修改成功！")
      }).catch(err=>{
        this.$message.error("修改失败！"+"err："+err.response.data.msg)
      })
      this.saveloading = false
    }
  },
}
</script>
<style scoped>
.submit {
  position: absolute;
  bottom: -5%;
  right: 1%;
}
.editphoto {
  position: relative;
  top: -30%;
  left: 60%;
  z-index: 10;
}
</style>
