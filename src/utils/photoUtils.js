export function parsePhotoUtil(params){

    const file = params.file;
    const width = params.width;
    const height = params.height;
    params.setMessage("");

    let reader = new FileReader();
    reader.onload = function (e) {
                        
        let image = new Image();
        image.src = createObjectURL(file);
        image.onload =  function(e){
                
            if(e.target.width < width){
                params.setMessage(`Select a photo whose width is ${width}px and above`);
                return false;
            }
            
            const result = resizeCrop(e.target, width, height).toDataURL('image/jpg', 90);
            params.setPhoto({Data:result, Selected:true});
        }     
    }

    reader.readAsDataURL(file);
}

function resizeCrop( src, width, height ){
                    
    var crop = width == 0 || height == 0;
    // not resize
    if(src.width <= width && height == 0) {
        width  = src.width;
        height = src.height;
    }
            
    // resize
    if( src.width > width && height == 0){
        height = src.height * (width / src.width);
    }
        
    // check scale
    var xscale = width  / src.width;
    var yscale = height / src.height;
    var scale  = crop ? Math.min(xscale, yscale) : Math.max(xscale, yscale);
    // create empty canvas
    var canvas = document.createElement("canvas");                  
    canvas.width  = width ? width   : Math.round(src.width  * scale);
    canvas.height = height ? height : Math.round(src.height * scale);
    canvas.getContext("2d").scale(scale,scale);
    // crop it top center
    canvas.getContext("2d").drawImage(src, ((src.width * scale) - canvas.width) * -.5 , ((src.height * scale) - canvas.height) * -.5 );
    return canvas;
}
        
function createObjectURL(i){ 
    var URL = window.URL || window.webkitURL || window.mozURL || window.msURL;
    return URL.createObjectURL(i);
}