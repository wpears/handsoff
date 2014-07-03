(function(){
  var count = 1;
  var d = document;

function markAndSend(e){
  var node = e.target;
  var tag= node.tagName;
  if((tag === 'INPUT'||tag === "TEXTAREA") && e.altKey===true){
    markSelected(node);
    updatePopup();
  }
}

function markSelected(node){
  var offsets = getOffsets(node);
  if(isMalformed(offsets)) return new Error("Unable to process element");
  node.placeholder = "Field "+ count;
  createMarker(offsets);
}

function createMarker(offsets){
  console.log(offsets)
  var markerOuter = d.createElement('div');
  var marker = d.createElement('span');
  marker.innerText = count;
  markerOuter.style.cssText="background-color:#1C86EE;box-shadow:0 1px 3px -1px #166BBE, 0px 1px 3px -1px #A1C3E5 inset;font:800 11px sans-serif;color:#fff;position:absolute;display:table;border-radius:12px;height:20px;width:20px;top:"+offsets.top+"px;left:"+(offsets.left-32) +"px;"
  marker.style.cssText="text-align:center;display:table-cell;vertical-align:middle;"
  markerOuter.appendChild(marker);
  d.body.appendChild(markerOuter)
}


function updatePopup(){
  chrome.runtime.sendMessage({})
}




function isMalformed(params){
  var top = parseFloat(params.top);
  var left = parseFloat(params.left);

  if(top !== top || left !== left){
    return true;
  }
  return false;
}


function getOffsets(node){
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
         }
}






d.addEventListener("mousedown",markAndSend);


function insertEncoded(response){
  if(typeof response === "object") console.error(response);
  this.value = response;
}
})();
