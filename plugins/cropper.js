import Vue from 'vue';
import vueCropper from 'vue-cropper';
if(process.browser){
    Vue.use(vueCropper);
}