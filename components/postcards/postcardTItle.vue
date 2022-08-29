<template>
    <div>
        <v-dialog v-model="menuDialog" max-width="30vh">
            <v-sheet v-if="user.ID == self.ID">
                <v-btn block color="error" text @click="deletePost"> 删除 </v-btn>
                <v-divider class="ma-0 pa-0"></v-divider>
                <v-btn block color="info" text @click="1"> 编辑 </v-btn>
                <v-divider class="ma-0 pa-0"></v-divider>
                <v-btn block color="info" text @click="1"> 打开帖子 </v-btn>
                <v-divider class="ma-0 pa-0"></v-divider>
                <v-btn block color="info" text @click="menuDialog = false">
                    取消
                </v-btn>
            </v-sheet>
            <v-sheet v-else>
                <v-btn block color="error" text @click="1"> 举报 </v-btn>
                <v-divider class="ma-0 pa-0"></v-divider>
                <v-btn block color="error" text @click="1"> 停止关注 </v-btn>
                <v-divider class="ma-0 pa-0"></v-divider>
                <v-btn block color="info" text @click="1"> 打开帖子 </v-btn>
                <v-divider class="ma-0 pa-0"></v-divider>
                <v-btn block color="info" text @click="menuDialog = false">
                    取消
                </v-btn>
            </v-sheet>
        </v-dialog>
        <v-card-actions class="pa-1">
            <v-avatar size="30" class="mx-1">
                <img :src="user.Photo" />
            </v-avatar>
            {{ user.Name }}
            <v-spacer></v-spacer>
            <v-icon @click="menuDialog = true"> mdi-dots-horizontal </v-icon>
        </v-card-actions>
    </div>
</template>
<script>
export default {
    name: 'PostCardTitle',
    props: {
        uid: {
            type: Number,
            required: true,
        },
        postid: {
            type: Number,
            required: true,
        },
    },
    data: () => ({
        user: { Photo: '', Name: '', ID: '' },
        menuDialog: false,
    }),
    computed: {
        self() {
            return this.$store.state.user
        },
    },
    async mounted() {
        const data = await this.$store.dispatch('UserModule/getUserByUid', this.uid)
        this.user = data.data.data
    },
    methods: {
        async deletePost() {
            await this.$store
                .dispatch('getPostModule/deletePost', {
                    uid: this.self.ID,
                    postid: this.postid,
                })
                .then(() => {
                    this.$store.commit('sendSnackbar', '删除成功')
                    this.$emit('deletePost')
                })
                .catch(() => {
                    this.$message.error('删除失败')
                })
        },
    },
}
</script>
