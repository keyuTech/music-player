var xhr = new XMLHttpRequest()
xhr.open('GET', 'http://localhost:8080/music.json', true)
xhr.onload = function(){
    window.musicList = JSON.parse(xhr.responseText)
}
xhr.send()