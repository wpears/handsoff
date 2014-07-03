//chrome.extension.getBackgroundPage().connected();
chrome.runtime.onMessage.addListener(handleMessage);

function handleMessage(message,sender,sendResponse){
  console.log("GOT MESSAGE")
}