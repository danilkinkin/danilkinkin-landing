/** @define {boolean} */
var DEBUG = true;

document.addEventListener("DOMContentLoaded", ()=>{
	window.renderBootScreen();
});

window.renderBootScreen = ()=>{
	var canvas = document.createElement("canvas");
	canvas.className = "boot-screen-canvas";
	canvas.setAttribute("width", "178");
	canvas.setAttribute("height", "245");

	var canvasWrapper = document.createElement("div");
	canvasWrapper.className = "boot-screen";
	canvasWrapper.appendChild(canvas);	

	document.body.appendChild(canvasWrapper);

	var ctx 				= canvas.getContext('2d');
	var time 				= 0;
	var start 				= performance.now();
	var percentload 		= 0;
	var resources 			= [];

	if(DEBUG){
		resources = [
			{type: "js", src: "app_res/js/UI.js"},
			{type: "js", src: "app_res/js/localization.js"},
			{type: "js", src: "app_res/js/core.js"},
			{type: "js", src: "app_res/js/pages/index.js"},
			//{type: "css", src: "app_res/css/style.css"},
			{type: "font", src: "app_res/fonts/Gilroy-Light.otf"},
			{type: "font", src: "app_res/fonts/Gilroy-ExtraBold.otf"}
		];
	}else{
		resources = [
			{type: "js", src: "app_res/app.js"},
			//{type: "css", src: "app_res/css/style.css"},	
			{type: "font", src: "app_res/fonts/Gilroy-Light.otf"},
			{type: "font", src: "app_res/fonts/Gilroy-ExtraBold.otf"}
		];
	}
	loadResource(resources, ()=>{
		console.log("Res is load!");
	})

	requestAnimationFrame(drawFrame);


	function loadResource(resources, callback, idRes){
		if(idRes == undefined) idRes = 0;

		console.log("load "+resources[idRes].type+": "+resources[idRes].src);

		var xhr = new XMLHttpRequest();
		xhr.open('GET', resources[idRes].src);

		switch (resources[idRes].type) {
			case "js":
				xhr.responseType = "blob";
				break;
			case "font":
				xhr.responseType = "arraybuffer";
				break;
			default:
				break;
		}		

		xhr.onreadystatechange = function(){
			if(xhr.readyState == 4){
				if(xhr.status == 200) {
					switch (resources[idRes].type) {
						case "js":
							var script = document.createElement('script'),
					        src = URL.createObjectURL(xhr.response);
							script.src = src;
							document.head.appendChild(script);
							//eval(xhr.responseText)
							break;
						case "font":
							var font = new FontFace("Gilroy", xhr.response);
							font.load().then(function(loaded_face) {
								document.fonts.add(loaded_face);
							}).catch(function(error) {
								// error occurred
							});
							break;
						default:
							// statements_def
							break;
					}
				}else{
					console.log({error: xhr.status+': '+xhr.statusText});
				}
				done();
			}	
		}

		function done(){
			percentload = ((idRes+1)/resources.length)*100;
			if(resources[idRes+1]) loadResource(resources, callback, idRes+1);
			else callback();
		}

		xhr.send();		
	}

	function drawFrame() {
		canvas.width = canvas.width;
		drawCircle(cubic(time));
		if(time > 0.5)
			drawLine(cubic(time*2-1));	
		if(time < 0.92){
			time += (percentload*0.01 - time)*0.06;
			//percentload+=1;
			requestAnimationFrame(drawFrame);
		}else{
			if(time != 1){
				time = 1;
				requestAnimationFrame(drawFrame);
				//finishLoad();
				if(window["render"]) window["render"]();
				else window["awitRender"] = ()=>{
					window["render"]();
				}
				console.log("End animation")
			}
			
		}
	}

	function drawCircle(t){
		ctx.lineWidth = 20;
		ctx.strokeStyle = "#1624e6";
		ctx.beginPath();
		ctx.arc(178/2, 245/2, 178/2-10, Math.PI*0.5*(t-1), Math.PI*0.5*(t*5-1));
		ctx.stroke();
	}

	function drawLine(t){
		ctx.lineWidth = 20;
		ctx.strokeStyle = "#1624e6";
		ctx.beginPath();
		ctx.moveTo(39.5, 243);
		ctx.lineTo(31*t+39.5, 241*(1-t)+2);
		ctx.stroke();	
	}

	function cubic(t, power){
		if (t < 0.5) return 4*t*t*t;
		return 4*(t-1)*(t-1)*(t-1)+1;
	}
}