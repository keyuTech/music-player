


var currentIndex = 0
var musicPlay = new Audio()
musicPlay.autoplay() = true

getMusicList(function(list){
    loadMusic(list[currentIndex])
})

function $(seletor){
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
    console.log('begin play', musicObj)
    musicPlay.src = musicObj.src
    $('.infor .name').innerText = musicObj.title
    $('.infor .author').innerText = musicObj.author
}