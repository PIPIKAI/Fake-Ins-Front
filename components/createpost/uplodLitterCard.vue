<template lang="">
  <div >
    <v-sheet
      dark

      outline
      round
      style="
        background-color: black;
        filter: alpha(Opacity=60);
        -moz-opacity: 0.7;
        opacity: 0.7;
      "
      class="pa-1"
    >
      <el-upload 
      action="" 
      list-type="picture-card" 
      multiple 
      :auto-upload="false"
      :http-request="uploadHandle" 
      accept="image/png,image/gif,image/jpg,image/jpeg"
      :file-list="fileListData"
      :before-upload="beforUpload" 
      :on-change="onChange" 
      :on-remove="onRemove" 
      :on-success="Onsuccess"
      :on-error ="OnError"
       >
        <i slot="default" class="el-icon-plus"></i>
        <div slot="file" slot-scope="{ file }">
          <el-image
            class="el-upload-list__item-thumbnail"
            style=" height: 120px"
            :src="file.blob"
            fit="cover"
            alt=""
          ></el-image>
          <span class="el-upload-list__item-actions">
            <span
              v-if="!disabled"
              class="el-upload-list__item-delete"
              @click="onRemove(file)"
            >
              <i class="el-icon-delete"></i>
            </span>
          </span>
        </div>
      </el-upload>
      
    </v-sheet>
  </div>
</template>
<script>
export default {
    data:()=>({
        dialogImageUrl: '',
        dialogVisible: false,
        disabled: false,
        limitfilenum: 9,
        
        uploadedUrls: [],
        uplodingFile: null,
    }),
    computed:{
        fileListData:{
            get () {
            return JSON.parse(JSON.stringify(this.$store.state.cteatePostModule.FileList))
            },
            set (value) {
            this.$store.commit('cteatePostModule/setFileList', value)
            }
        }
    },
    methods: {
        onExceed() {
            this.$store.commit("sendSnackbar", "超过最大文件上传个数")
        },
        beforUpload(file) {
            console.log("beforUpload", file.name)
            const fileTypeList = ["pdf", "png", "jpeg", "jpg"]	// 可以上传的文件后缀名
            const fileType = file.name.substring(file.name.lastIndexOf(".") + 1)// 获取上传文件的后缀名
            const isType = (!fileTypeList.includes(fileType))// 判断类型是否符合
            const isLtXM = file.size / 1024 / 1024 < 10 // 上传文件小于10MB
            if (isType) {
                this.$message.error('只能上传pdf，png，jpeg，jpg格式文件')
                // fileList.pop()//删除不符合的文件  这两个方法随便选择一个都行
                return false;
            } else if (!isLtXM) {
                this.$message.error('文件大小不能超过10MB')
                return false;
            }
            this.uplodingFile = file
            return true
        },
        async uploadHandle(data) {
            return await this.getBase64(data.file).then(res => {
                return this.$authApi.uploadImg(res)
            })
        },
        onChange(file, fileList) {
            if (!this.beforUpload(file)){
                return false
            }
            this.fileListData =fileList
            const _file = file.raw;
            const blob = new Blob([_file], { type: "image/jpeg"});
            const blobUrl = window.URL.createObjectURL(blob);
            file.blob = blobUrl
            console.log("onChange",fileList)
            this.$store.commit("cteatePostModule/setFileList",JSON.parse(JSON.stringify(fileList)))
        },
        // base64编码转换方法
        getBase64(file) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader()	// 定义方法读取文件
                reader.readAsDataURL(file)	// 开始读文件  本身是图片的二进制数据 进行base64加密形成字符串
                reader.onload = () => resolve({ "name": file.uid + file.name, "file": reader.result.split(',')[1] })// 成功返回对应的值 reader.result可以直接放在img标签中使用
                reader.onerror = () => reject(error)// 失败返回失败信息
            })
        },
        onRemove(file, fileList) {
            if(this.fileListData.length === 1){
                this.$emit('deletLastOne')
            }
            else{
                this.$store.commit('cteatePostModule/delByUid',file.uid)
            }
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
    }
}
</script>
<style lang="scss" scoped>
::v-deep .el-upload--picture-card{
width: 100px;
height: 100px;
}
::v-deep .el-upload{
width: 100px;
height: 100px;
line-height: 100px;
}
::v-deep .el-upload-list--picture-card .el-upload-list__item{
width: 100px;
height: 100px;
line-height: 100px;
}
::v-deep .el-upload-list--picture-card .el-upload-list__item-thumbnail{
width: 100px;
height: 100px;
line-height: 100px;
}
::v-deep .avatar{
width: 100px;
height: 100px;
}
</style>
