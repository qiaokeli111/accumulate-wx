<template>
    <view>
        <map
            id="map"
            class="map"
            :longitude="longitude"
            :latitude="latitude"
            :markers="markers"
            :polygons="polygons"
            :polyline="polyline"
            :scale="scale"
            @regionchange="regionchange"
            @callouttap="markertap"
            @markertap="markertap"
            @labeltap="markertap"
            @tap="clearSearchList"
        >
            <cover-view slot="callout">
                <cover-view
                    v-for="item of customCalloutMarker"
                    :key="item.id"
                    :marker-id="item.id"
                    class="callout-id"
                >
                    <cover-view class="map-stage">
                        <cover-view class="plate-name">
                            {{ item.name }}
                        </cover-view>
                        <cover-view class="level-wrap">
                            <cover-image
                                :src="item.levelIcon"
                                class="level-icon"
                            />
                            <cover-view />
                        </cover-view>
                    </cover-view>
                    <cover-view class="angle" />
                </cover-view>
            </cover-view>
        </map>
    </view>
</template>

<script>
import config from "./config"
export default {
    mounted() {
        this.normalMarker()
        this.drowBorder()
    },
    data() {
        return {
            longitude: 104.07667,
            latitude: 30.496222,
            markers: [],
            customCalloutMarker: [],
            polygons: [],
            polyline: [],
            scale: 13,
        }
    },
    methods: {
        normalMarker() {
            this.markers = [
                {
                    id: 510186,
                    name: "天府新区",
                    iconPath:
                        "https://imgcdn.huanjutang.com/assets/img/20205191026358081.png",
                    longitude: 104.07667,
                    latitude: 30.496222,
                    label: {
                        content: " 天府新区 \n (2) ",
                        fontSize: 13,
                        bgColor: "#2D8CF0FF",
                        color: "#FFFFFFD9",
                        display: "ALWAYS",
                        textAlign: "center",
                        borderWidth: 1,
                        borderColor: "#FFFFFF29",
                        padding: 12,
                        borderRadius: 34,
                        anchorX: -(("天府新区".length + 2) * 13 + 24) / 2,
                    },
                    width: 0,
                    height: 0,
                },
            ]
        },
        // 自定义marker
        customMarker() {
            // 这里不能写height width不然位置不准确2
            const areaMarkerCommon = {
                alpha: 1,
                iconPath:
                    "https://imgcdn.huanjutang.com/assets/img/20216101355308081.png",
                customCallout: {
                    anchorY: 47,
                    anchorX: 0,
                    display: "ALWAYS",
                },
            }
            // levelIcon 存在加载不出来的情况 可以考虑 uni.downloadFile
            this.markers = [
                {
                    ...areaMarkerCommon,
                    latitude: 30.500534593804,
                    longitude: 104.04899617816,
                    levelIcon:
                        "https://imgcdn.huanjutang.com/image/2022/08/03/46ea524d0889c0ab644db3b4bea6b7c2.png",
                    name: "华阳22",
                    id: 60,
                    area_id: 510186,
                },
            ]

            this.customCalloutMarker = this.markers
        },
        // 画虚线边框
        drowBorder() {
            let points = config.border
            this.polygons = [
                {
                    strokeWidth: 0,
                    points,
                    level: "abovebuildings",
                    fillColor: "#46D8213D",
                    strokeColor: "#ffffff",
                },
            ]

            this.polyline = [
                {
                    color: "#46D821FF",
                    width: 2,
                    dottedLine: true,
                    borderWidth: 2,
                    borderColor: "#46D821FF",
                    points: points.concat(points[0]),
                    level: "abovelabels",
                },
            ]
        },
    },
}
</script>
<style lang="scss">
.map {
    height: 100vh;
    width: 100vw;
}
.callout-id {
    white-space: break-spaces;
    position: relative;

    .map-stage {
        box-sizing: border-box;
        width: 100%;
        padding: 8rpx 16rpx;
        border-radius: 16rpx;
        background: #0dbbd3ff;
        font-size: 28rpx;
        font-weight: bold;
        color: #ffffff;
        line-height: 40rpx;
        margin-bottom: 2rpx;
    }
    .plate-name {
        font-weight: bold;
    }
    .level-wrap {
        display: flex;
        align-items: center;
        .level-icon {
            height: 30rpx;
            width: 150rpx;
        }
    }

    .angle {
        height: 13rpx;
        width: 13rpx;
        position: relative;
        left: 50%;
        transform: translateX(-50%) rotate(45deg);
        bottom: 8.5rpx;
        z-index: 2;
        background: #0dbbd3ff;
    }
}
</style>
