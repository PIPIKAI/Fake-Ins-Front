const commonModule = {
    namespaced: true,
    state: {
     
    },
    mutations: {
        showImagePreview(state,imageUrl) {
            const image = new Image();
            image.src = imageUrl;
            image.onload = () => {
              // 创建弹出层
              const previewContainer = document.createElement('div');
              previewContainer.style.position = 'fixed';
              previewContainer.style.top = 0;
              previewContainer.style.bottom = 0;
              previewContainer.style.left = 0;
              previewContainer.style.right = 0;
              previewContainer.style.backgroundColor = 'rgba(0,0,0,0.9)';
              previewContainer.style.display = 'flex';
              previewContainer.style.justifyContent = 'center';
              previewContainer.style.alignItems = 'center';
              previewContainer.style.zIndex = 100;
              document.body.appendChild(previewContainer);
              // 在弹出层中添加图片
              const previewImage = document.createElement('img');
              previewImage.src = imageUrl;
              previewImage.style.maxWidth = '80%';
              previewImage.style.maxHeight = '80%';
              previewContainer.appendChild(previewImage);
              // 点击弹出层，关闭预览
              previewContainer.addEventListener('click', () => {
                document.body.removeChild(previewContainer);
              });
            };
        }
    },
    actions: {
     
    },
    getters:{

    }
  }
  
  export default commonModule
  
  