// 格式化时间,秒转换为00:00格式
export function formatTime(time) {
	var formatTime
	time = ~~time;
	if(time < 10) {
		formatTime = '00:0' + time;
	}else if(time < 60) {
		formatTime = '00:' + time;
	}else {
		var m = ~~(time / 60)
		if(m<10) m = '0' + m;
		var s = time % 60;
		if(s<10) s = '0' + s;
		formatTime = m + ':' + s;
	}
	return formatTime;
}