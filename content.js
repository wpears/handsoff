function getSecure(e){
  var node = e.target;
  var tag= node.tagName;
  if((tag === 'INPUT'||tag === "TEXTAREA") && e.altKey===true){
    markSelected(node);
    updatePopup();
  }
}



function sendParameters(node){
  var params = getParameters(node);
  buildSecure(params);
  //chrome.runtime.sendMessage(params,insertEncoded.bind(node))
}


function insertEncoded(response){
  if(typeof response === "object") console.error(response);
  this.value = response;
}


function buildSecure(params){
 if(isMalformed(params)) return new Error("Unable to process input element.");
 var ifr = document.createElement('iframe');
 var area = document.createElement('textarea');
 var style = area.style;
 var ifrstyle = ifr.style;
 ifrstyle.backgroundColor = style.backgroundColor = "#fdefea"
 ifrstyle.height = style.height = 100+params.height + 'px';
 ifrstyle.width = style.width = params.width + 'px';
 ifrstyle.top = params.top + 'px';
 ifrstyle.left = params.left + 'px';
 ifrstyle.position = 'absolute';
 ifrstyle.zIndex = '9999';
 document.body.appendChild(ifr);
 ifr.contentDocument.body.appendChild(area);
 ifr.domain = "FAKEDOMAINWLQWEQWE.com"
 area.focus();

}


function isMalformed(params){
  var height = parseFloat(params.height);
  var width = parseFloat(params.width);
  var top = parseFloat(params.top);
  var left = parseFloat(params.left);

  if(height !== height || width !== width || top !== top || left !== left){
    return true;
  }
  return false;
}


function getParameters(node){
  var height = node.clientHeight;
  var width = node.clientWidth;
  var top = 0;
  var left = 0;
  var par;
  while (par = node.offsetParent){
    top+=node.offsetTop;
    left+=node.offsetLeft;
    node = par;
  }
  return { top:top
         , left:left
         , height:height
         , width:width
         }
}






document.addEventListener("mousedown",getSecure);
