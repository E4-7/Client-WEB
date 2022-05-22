<template>
  <div>
    <div>
      <span @click="play">시작</span> <span @click="pause">중지</span>
      <span @click="stop">멈춰</span>
    </div>
    <div><span @click="capture">캡쳐</span></div>
    <div>
      <span>시간: {{ time }}</span> <span>최종시간: {{ allTime }}</span>
    </div>
    <canvas class="myCanvas" style="width:300px;height:300px;" ref="canv"> </canvas>
    <video ref="vid" id="myVideo" class="vid" :srcObject.prop="src" :src="src"></video>
  </div>
</template>

<script>
import * as posenet from '@tensorflow-models/posenet';
import * as utils from '../utils';
export default {
  data() {
    return {
      ctx: null,
      selectionMode: false,
      startPosition: {
        x: null,
        y: null,
      },
      src: '',
      width: 0,
      height: 0,
      pose: [],
      time: 0,
      allTime: 0,
      isPlay: false,
    };
  },
  async mounted() {
    const constraints = {
      audio: false,
      video: true,
    };
    this.src = await navigator.mediaDevices.getUserMedia(constraints);
    this.net = await posenet.load(); // es6 모듈 불러오기
    this.ctx = this.$refs.canv.getContext('2d');

    this.$refs.vid.addEventListener('timeupdate', () => {
      this.time = this.$refs.vid.currentTime;
    });

    this.$refs.vid.addEventListener('playing', () => {
      this.allTime = this.$refs.vid.duration;

      const { videoWidth, videoHeight } = this.$refs.vid;
      const width = 300;
      const height = 150;
      this.$refs.canv.width = width;
      this.$refs.canv.height = height;
      this.$refs.vid.width = width;
      this.$refs.vid.height = height;
    });
  },
  methods: {
    play() {
      this.$refs.vid.play();
      this.isPlay = true;
      requestAnimationFrame(this.drawPerFrame);
    },
    pause() {
      this.$refs.vid.pause();
      this.isPlay = false;
    },
    stop() {
      this.pause();
      this.$refs.vid.currentTime = 0;
    },
    capture() {
      this.draw();
    },
    async draw() {
      this.pose = await this.net.estimateSinglePose(this.$refs.vid, 0.5, false, 32);
      this.ctx.clearRect(0, 0, this.$refs.canv.width, this.$refs.canv.height);
      this.ctx.drawImage(this.$refs.vid, 0, 0, this.$refs.canv.width, this.$refs.canv.height);
      utils.drawSkeleton(this.pose.keypoints, 0.6, this.ctx);
      if (this.isPlay) {
        requestAnimationFrame(this.draw);
      }
    },
    drawPerFrame() {
      this.draw();
      // if (this.isPlay) {
      //   requestAnimationFrame(this.drawPerFrame);
      // }
    },
  },
};
</script>

<style>
.vid {
  border: 1px solid black;
  display: none;
}
</style>
