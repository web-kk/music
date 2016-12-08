$(document).ready(function() {
	//////////////load
	$(window).load(function() {
		$("#load").fadeOut("1000", function() {
			$('#load').css("display","none");
			$('#load').css("background","none");
			$('#load').css("width","0");
			$('#load').css("height","0");
	  	})
	})
	var audio = $('#audio').get(0);
	var play = $('.play');
	var nowTime = $('#nowtime');
	var allTime = $('#alltime');
	var jindu = $('.jindu');
	var pi = $('.pi');
	var next = $('.next');
	var prve = $('.prve')
	var cur = 0
	var close = $('.close')
	var lists = $('#lists')
	var list = $('#list')
	var vi = $('.vi')
	var stopvo = $('.stopvo')
	var bj = $('.vi').width() / 2
	var quan = $('.quan')
		///////MUSIC
	var music = [{
			name: '偏爱',
			src: 'music/偏爱.mp3',
			auther: '张芸京',
			img: 'img/1.jpg'

		}, {
			name: '惊鸿一面',
			src: 'music/惊鸿一面.mp3',
			auther: '许嵩',
			img: 'img/5.jpg'
		}, {
			name: '冬天的秘密',
			src: 'music/冬天的秘密.mp3',
			auther: '周传雄',
			img: 'img/4.jpg'

		}, {
			name: '断桥残雪',
			src: 'music/断桥残雪.mp3',
			auther: '许嵩',
			img: 'img/2.jpg'

		}, {
			name: '埋葬冬天',
			src: 'music/埋葬冬天.mp3',
			auther: '徐良',
			img: 'img/3.jpg'

		}]
		//////////函数
	function render() {
		$('#lists ul').empty()
		$.each(music, function(i, v) {
			var c = (i === cur) ? 'active' : ''
			$('<li class="' + c + '"><span>' + v.name + '</span><p>---' + v.auther + '</p><b></b></li>').appendTo('#lists ul')
		})
	}

	$('#lists ul').on('touchend', 'li', function() {
		quan.removeClass('quan-active')
		$('#lists').find('li').removeClass('active')
		$(this).addClass('active')
		cur = $(this).index()
		console.log(cur)
		audio.src = music[cur].src
		audio.play()
		play.find('i').html('&#xe691;')
		quan.addClass('quan-active')
	})
	render()
		//处理时间
	function format(v) {
		v = Math.floor(v)
		var s = v % 60
		s = (s < 10) ? ('0' + s) : s
		var m = Math.floor(v / 60)
		return m + ':' + s
	}
	//////////歌曲列表
	close.on('touchend', function() {
		lists.css('display', 'none')
	})
	list.on('touchend', function() {
			lists.css('display', 'block')
		})
		//////////下一首
	next.on('touchend', function() {
			quan.removeClass('quan-active')
			$('#lists li').removeClass('active')
			cur += 1
			if(cur > music.length - 1) {
				cur = 0
			}
			$('#lists li').eq(cur).addClass('active')
			quan.addClass('quan-active')
			audio.src = music[cur].src
			audio.play()
			play.find('i').html('&#xe691;')
		})
		//////////上一首
	prve.on('touchend', function() {
			quan.removeClass('quan-active')
			$('#lists li').removeClass('active')
			cur -= 1
			if(cur < 0) {
				cur = music.length - 1
			}
			$('#lists li').eq(cur).addClass('active')
			quan.addClass('quan-active')
			audio.src = music[cur].src
			audio.play()
			play.find('i').html('&#xe691;')
		})
		//////////播放暂停事件
	play.on('touchend', function() {
			if(audio.paused) {
				audio.play()
				quan.addClass('quan-active')
				play.find('i').html('&#xe691;')
			} else {
				audio.pause()
				quan.removeClass('quan-active')
				play.find('i').html('&#xe602;')
			}
		})
		/////////进度条事件
	$(audio).on('timeupdate', function() {
		nowTime.html(format(audio.currentTime))
		allTime.html(format(audio.duration))
		var jd = jindu.width() * audio.currentTime / audio.duration - bj
		pi.css('left', jd)
		$('.jindu-2').css('width', jd)
	})
	$(jindu).on('touchend', function(e) {
		audio.currentTime = audio.duration * ((e.originalEvent.changedTouches[0].clientX - jindu.offset().left) / jindu.width());
	})
	$(pi).on('touchend', false)
	$(pi).on('touchstart', function(e) {
		var r = pi.width() / 2
		var start = r - e.originalEvent.changedTouches[0].clientX + pi.offset().left
		$(document).on('touchmove', function(e) {
			var left = e.originalEvent.changedTouches[0].clientX - jindu.offset().left + start
			var c = left / jindu.width() * audio.duration
			if(c > audio.duration || c < 0) {
				return;
			}
			audio.currentTime = c
		})
		return false
	})
	$(document).on("touchend", function() {
			$(document).off("touchmove")
		}, false)
		//////////////////调节音量
	$(audio).on('volumechange', function() {
		$('.vi').css('left', $('.volice').width() * audio.volume - bj)
		$('.volice-2').css('width', $('.volice').width() * audio.volume)
	})
	$('.vi').on('touchend', false)
	$('.volice').on('touchend', function(e) {
		audio.volume = (e.originalEvent.changedTouches[0].clientX - $('.volice').offset().left) / ($('.volice').width())
		stopvo.removeAttr('data-v')
	})
	$(vi).on('touchend', false)
	$(vi).on('touchstart', function(e) {
		var r = vi.width() / 2
		var start = r - e.originalEvent.changedTouches[0].clientX + vi.offset().left
		$(document).on('touchmove', function(e) {
			var left = e.originalEvent.changedTouches[0].clientX - $('.volice').offset().left + start
			var c = left / $('.volice').width()
			if(c > 1 || c < 0) {
				return;
			}
			audio.volume = c
		})
		return false
	})
	$(document).on("touchend", function() {
			$(document).off("touchmove")
		})
		//////////////////音量点击事件
	$('.volume').on('touchend', function() {
		$('.volice-f').show()
		return false
	})
	$('html').delegate('.b-zhao', 'touchstart', function() {
		$('.volice-f').hide()
	})
	$('html').delegate('.foot', 'touchstart', function() {
			$('.volice-f').hide()
		})
	$('html').delegate('.quan-f', 'touchstart', function() {
			$('.volice-f').hide()
			lists.hide()
		})
	$('html').delegate('.header', 'touchstart', function() {
			lists.hide()
			$('.volice-f').hide()
	})
		///////////////////静音事件
	stopvo.on('touchend', function() {
			if($(this).attr('data-v')) {
				audio.volume = this.getAttribute('data-v')
				$(this).removeAttr('data-v')
				$('.stopvo span').html('&#xe62a;')
			} else {
				$(this).attr('data-v', audio.volume)
				audio.volume = 0
				$('.stopvo span').html('&#xe74e;')
			}
			return false
		})
		///////////////////删除歌曲
	$('.dele').on('touchend', function() {
		music.splice(cur, 1)
		$('#lists li').removeClass('active')
		quan.removeClass('quan-active')
		cur = 0
		if(cur > music.length - 1) {
			cur = 0
		}
		$('#lists li').eq(cur).addClass('active')
		audio.src = music[cur].src
		play.find('i').html('&#xe602;')
		render()
	})
	render()
		///////////////////添加收藏
	$('.xin').on('touchend', function() {
			$('.xin span').html('&#xe694;')
			return false
		})
		///////////////////
	$(audio).on('loadstart', function() {
		nowTime.html(format(audio.currentTime))

	})
	$(audio).on('canplay', function() {
			allTime.html(format(audio.duration))
			$('.header h3').html(music[cur].name)
			$('.header p').html(music[cur].auther)
			$('.background').css({
				background: 'url(' + music[cur].img + ')',
				'background-size': 'cover'
			})
			$('.quan').css({
				background: 'url(' + music[cur].img + ')',
				'background-size': 'cover'
			})
		})
		/////////////自动下一曲
	$(audio).on('ended', function() {
		quan.removeClass('quan-active')
		$('#lists li').removeClass('active')
		cur += 1
		if(cur > music.length - 1) {
			cur = 0
		}
		$('#lists li').eq(cur).addClass('active')
		quan.addClass('quan-active')
		audio.src = music[cur].src
		audio.play()
	})
})