


var currentIndex = 0
var musicPlay = new Audio()
musicPlay.autoplay = true

getMusicList(function(list){
    loadMusic(list[currentIndex])
})

musicPlay.ontimeupdate = function(){
    $('.progress-bar .current').style.width = (this.currentTime/this.duration*100) + '%'
}

musicPlay.onplay = function(){
    $('.music-list ')
    var clock = setInterval(function(){
        var min = Math.floor(musicPlay.currentTime/60)
        var sec = Math.floor(musicPlay.currentTime%60) + ''
        sec = sec.length === 2 ? sec : '0' + sec
        $('.progress-bar .time .current-time').innerText = min + ':' + sec
    },1000)
}
musicPlay.onpause = function(){
    clearInterval(clock)
}

$('.control .playing').addEventListenner('click', function(){
    audio.pause()
}, false)


function $(selector){
    return document.querySelector(selector)
}
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

function loadMusic(musicObj){
    console.log('musicPlay begin play+++', musicPlay)
    musicPlay.src = musicObj.src
    $('.infor .name').innerText = musicObj.title
    $('.infor .author').innerText = musicObj.author
}