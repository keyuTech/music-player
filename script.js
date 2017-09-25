

var musicList = []
var currentIndex = 0
var musicPlay = new Audio()
musicPlay.autoplay = true

function $(selector){
    return document.querySelector(selector)
}

getMusicList(function(list){
    musicList = list
    loadMusic(list[currentIndex])
})

//播放进度条
musicPlay.ontimeupdate = function(){
    $('.progress-bar .current').style.width = (this.currentTime/this.duration*100) + '%'
}

//播放时间
musicPlay.onplay = function(){
    var clock = setInterval(function(){
        var min = Math.floor(musicPlay.currentTime/60)
        var sec = Math.floor(musicPlay.currentTime%60) + ''
        sec = sec.length === 2 ? sec : '0' + sec
        $('.play .time .current-time').innerText = min + '：' + sec
    },1000)
}
musicPlay.onpause = function(){
    clearInterval(clock)
}

//暂停/播放
$('.control .playing').addEventListener('click', function(){
    if(musicPlay.paused){
        musicPlay.play()
        this.querySelector('.fa').classList.add('fa-pause')
        this.querySelector('.fa').classList.remove('fa-play')
        
    }else{
        musicPlay.pause()
        this.querySelector('.fa').classList.add('fa-play')
        this.querySelector('.fa').classList.remove('fa-pause')
    }
    
}, false)

//下一曲
$('.play .forward').onclick = function(){
    currentIndex = (++currentIndex)%musicList.length
    console.log(musicList)
    console.log(currentIndex)
    loadMusic(musicList[currentIndex])
}
//上一曲
$('.play .forward').onclick = function(){
    currentIndex = (--currentIndex)%musicList.length
    loadMusic(musicList[currentIndex])
}

//AJAX获取数据
function getMusicList(callback){
    var xhr = new XMLHttpRequest()
    xhr.open('GET', 'music.json', true)
    xhr.onload = function(){
        if((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304){
            callback(JSON.parse(this.responseText))
        }else{
            console.log('数据获取失败')
        }
    }
    xhr.onerror = function(){
        console.log('网络异常')
    }
    xhr.send()
}

//加载歌曲信息
function loadMusic(musicObj){
    console.log('musicPlay begin play', musicPlay)
    musicPlay.src = musicObj.src
    $('.infor .name').innerText = musicObj.title
    $('.infor .author').innerText = musicObj.author
}