<template>
    <view>
        <button
            class="button"
            open-type="getPhoneNumber"
            @getphonenumber="getPhoneNumber"
            @click.stop="wxLogin"
        >
            <image
                src="https://imgcdn.huanjutang.com/assets/img/2021112416918081.png"
                class="phone-image"
            />
            修改手机号
        </button>
    </view>
</template>

<script>
export default {
    mounted() {},
    data() {
        return {}
    },
    methods: {
        wxLogin() {
            return new Promise((resolve, reject) => {
                uni.login({
                    success: (res) => {
                        this.wxCode = res.code
                        resolve(res.code)
                    },
                    fail() {
                        reject()
                    },
                })
            })
        },
        getPhoneNumber(res) {
            if (res.detail.errMsg !== "getPhoneNumber:ok") {
                // 取消授权
                return
            }
            console.log({
                "X-WX-Code": this.wxCode,
                "X-WX-ENCRYPTED-DATA": res.detail.encryptedData,
                "X-WX-IV": res.detail.iv,
            })
        },
    },
}
</script>
<style lang="scss"></style>
