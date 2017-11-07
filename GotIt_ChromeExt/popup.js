function count(){
    document.getElementById('demo').src = chrome.extension.getURL("big_buck_bunny.mp4"); 
}
document.getElementById('do-count').onclick = count;