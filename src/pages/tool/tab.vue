<template>
    <view>
        <view class="column__nav__box">
            <scroll-view
                v-if="listData.length"
                scroll-x="true"
                class="column__nav"
                :scroll-into-view="scrollId"
                :style="scrollTop"
                scroll-with-animation
            >
                <view
                    v-for="(item, index) in listData"
                    :id="'tabBar_' + item.id"
                    :key="index"
                    class="column__nav__item"
                    @click="switchTabBar(index)"
                >
                    <text v-if="index === 0" class="tab-padding" />
                    <text
                        :class="
                            'column__nav__item__text ' +
                            (type == item.id
                                ? 'column__nav__item__text--active'
                                : '')
                        "
                    >
                        {{ item.text }}
                    </text>
                </view>
            </scroll-view>
        </view>

        <view style="height: 100rpx"> </view>
        <view
            v-for="(i, index) in listData"
            :key="index"
            :id="`SSS_${i.id}`"
            :class="['photo-box', `photo-${i.id}`]"
        >
        {{i.text}}
        </view>
    </view>
</template>

<script>
const nodes = []
let observerObj = null
const duration = 300
export default {
    mounted() {
        this.observerNodes()
    },
    data() {
        return {
            type: 1,
            scrollId: "",
            distance: 0,

            listData: [
                {
                    text: "周边",
                    id: 1,
                },
                {
                    text: "商店",
                    id: 2,
                },
                {
                    text: "公园",
                    id: 3,
                },
                {
                    text: "超市",
                    id: 4,
                },
                {
                    text: "街道",
                    id: 5,
                },
                {
                    text: "食堂",
                    id: 6,
                },
                {
                    text: "学院",
                    id: 7,
                },
            ],
        }
    },
    methods: {
        scrollPage(distance, scrollTop) {
            this.distance = distance
            const scrollHeight = scrollTop + distance - 50
            uni.pageScrollTo({
                scrollTop: scrollHeight,
                duration,
            })
        },
        async switchTabBar(index) {
            this.scrollIndex = index
            const item = this.listData[index]
            // 获取节点信息

            if (Number(item.id) !== Number(this.type)) {
                this.type = item.id
                const query = uni.createSelectorQuery()
                query.select(`#SSS_${item.id}`).boundingClientRect()
                query.selectViewport().scrollOffset()
                query.exec((res) => {
                    if (res[0] && res[0].top) {
                        this.scrollPage(res[0].top, res[1].scrollTop)
                    }
                })
            }

            this.scrollId = `tabBar_${item.id}`
        },
        observerNodes() {
            observerObj = this.createIntersectionObserver({
                observeAll: true,
            })
            observerObj
                .relativeToViewport({
                    top: -120,
                })
                .observe(".photo-box", (res) => {
                    const nodeIndex = nodes.findIndex(
                        (ele) => ele.id === res.id
                    )
                    if (res.intersectionRatio > 0) {
                        if (nodeIndex > -1) {
                            nodes[nodeIndex].show = true
                        } else {
                            nodes.push({
                                id: res.id,
                                show: true,
                            })
                        }
                    } else if (nodeIndex > -1) {
                        nodes[nodeIndex].show = false
                    }

                    if (this.distance) {
                        setTimeout(() => {
                            this.distance = 0
                        }, duration + 1)
                        return
                    }

                    this.changeTypeByScroll(nodes)
                })
        },
        changeTypeByScroll(arr) {
            const info = arr.find((ele) => ele.show === true)

            if (!info) {
                return
            }

            const res = this.listData.find((ele) => `SSS_${ele.id}` === info.id)

            if (res) {
                this.type = res.id
                this.scrollId = `tabBar_${res.id}`
            }
        },
    },
}
</script>
<style lang="scss">
.column__nav__box {
    position: fixed;
    top: 0;
    width: 100%;
    left: 0;
    background: #fff;
    z-index: 2;
    border-bottom: 1rpx solid rgba(0, 0, 0, 7%);
    overflow: hidden;
}
.column__nav {
    height: 100rpx;
    line-height: 100rpx;
    background: #fff;
    overflow-x: hidden;
    white-space: nowrap;
    overflow-y: hidden;
    transition: all ease 0.2s;
    width: 100vw;
}
.column__nav__item {
    margin-right: 36rpx;
    display: inline-block;
    position: relative;
    font-size: 28rpx;
    color: rgba(0, 0, 0, 45%);
}
.column__nav__item__text {
    position: relative;
}
.column__nav__item__text--active {
    font-size: 32rpx;
    font-weight: bold;
    color: rgba(0, 0, 0, 85%);
}
.column__nav__item__text--active::after {
    bottom: -23rpx;
    height: 6rpx;
    width: 40rpx;
    background: #2d8cf0;
    content: " ";
    display: block;
    position: absolute;
    left: 50%;
    margin-left: -20rpx;
    border-radius: 4rpx;
}
.tab-padding {
    width: 32rpx;
    height: 10rpx;
    display: inline-block;
}
.photo-1 {
    height: 345rpx;
    background: #2d8cf0;
}
.photo-2 {
    height: 300rpx;
    background: #b9a80e;
}
.photo-3 {
    height: 100rpx;
    background: #197c53;
}
.photo-4 {
    height: 500rpx;
    background: #300b6b;
}
.photo-5 {
    height: 400rpx;
    background: #0b1a02;
}
.photo-6 {
    height: 100rpx;
    background: #104f74;
}

.photo-7 {
    height: 1600rpx;
    background: #c05915;
}
</style>
