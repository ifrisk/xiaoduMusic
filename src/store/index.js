import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
		// 音乐列表
		musicList: [],
		// 当前播放的歌曲
		currentPlayMusic: -1
  },
  mutations: {
		addMusicList(state, obj) {
			for(let i=0; i<state.musicList.length; i++) {
				if(state.musicList[i].id == obj.id) {
					state.musicList.unshift(state.musicList.splice(i , 1)[0]);
					state.currentPlayMusic = 0;
					return;
				}
			}
			state.musicList.push({
				id: obj.id,
				musicName: obj.musicName,
				name: obj.name
			});
			state.currentPlayMusic = state.musicList.length - 1;
		},
		changeCurrentPlayMusic(state, num) {
			state.currentPlayMusic = num;
		},
		nextOrLast(state, ble) {
			if(ble == true) {
				state.currentPlayMusic ++;
			}else {
				state.currentPlayMusic --;
			}
		}
  },
  actions: {
  },
  modules: {
  }
})
