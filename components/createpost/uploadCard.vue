<template lang="">
    <div ref="fileUpload">
        <v-card min-height="73vh">
        
 
           <div class="text-h6 font-weight-bold text-center">
          创建新帖子
        </div>

        <v-divider></v-divider>
        <v-row fill-height class="ma-auto">
          <v-sheet  min-height="75vh" class="ma-auto d-flex align-content-center flex-wrap" >
            <v-col class="ma-0 pa-0">
              <el-upload
              class="upload" drag action="" multiple 
              :limit="limitfilenum" 
              :on-exceed="onExceed"
                :auto-upload="false" :http-request="uploadHandle" accept="image/png,image/gif,image/jpg,image/jpeg" :show-file-list="true"
                :file-list="fileListData" :before-upload="beforUpload" :on-change="onChange" :on-remove="onRemove" :on-preview="onPreview"
                :on-success="Onsuccess"
                :on-error ="OnError"
                >
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              </el-upload>
            </v-col>

          </v-sheet>
        </v-row>
      
      </v-card>
    </div>
</template>
<script>
export default {
    name: "UploadCard",
    data: () => ({
        limitfilenum: 9,
        fileListData: [],
        uploadedUrls: [],
        uplodingFile: null,
    }),
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
                return
            }
            this.fileListData =fileList
            const _file = file.raw;
            const blob = new Blob([_file], { type: "image/jpeg"});
            const blobUrl = window.URL.createObjectURL(blob);
            file.blob = blobUrl
            console.log("onChange",fileList)
            this.$store.commit("cteatePostModule/setFileList",JSON.parse(JSON.stringify(fileList)))
            this.$emit("nextpage")
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
        }
    }
}
</script>


<style lang="">
    
</style>