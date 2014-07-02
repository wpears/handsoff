chrome.runtime.onMessage.addListener(handleMessage);

function handleMessage(request, sender, sendResponse){
  var height = parseFloat(request.height);
  var width = parseFloat(request.width);
  var top = parseFloat(request.top);
  var left = parseFloat(request.left);

  if(height !== height || width !== width || top !== top || left !== left){
    sendResponse(new Error("Unable to process input element."))
  }



  sendResponse("NEW DATA")  
}

function connected(){console.log("YEP")}