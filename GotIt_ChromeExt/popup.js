function count(){
    document.getElementById('demo').src = chrome.extension.getURL("got_itinstruction.mp4"); 
}
document.getElementById('do-count').onclick = count;