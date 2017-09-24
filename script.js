


var currentIndex = 0
var musicPlay = new Audio()
musicPlay.autoplay = true

getMusicList(function(list){
    loadMusic(list[currentIndex])
})

musicPlay.ontimeupdate = function(){
    $('.progress-bar .current').style.width = (this.currentTime/this.duration*100) + '%'
    console.log($('.progress-bar .current').style.width)
    var min = Math.floor(this.currentTime/60)
    var sec = Math.floor(this.currentTime%60)
    sec < 10 ? '0' + sec : '' + sec
}

function $(selector){
    return document.querySelector(selector)
}
function getMusicList(callback){
    var xhr = new XMLHttpRequest()
    xhr.open('GET', '/music.json', true)
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
    console.log('musicPlay begin play', musicPlay)
    musicPlay.src = musicObj.src
    $('.infor .name').innerText = musicObj.title
    $('.infor .author').innerText = musicObj.author
}