var worksList 			= [
							{name: "ClockTab", path: "clockTab", mainColor: "#5058CF"},
							{name: "Sky Cube", path: "sky-cube", mainColor: "#5058CF"},
							{name: "ClockTab", path: "clockTab"},
							{name: "Sky Cube", path: "sky-cube"},
							{name: "ClockTab", path: "clockTab"},
							{name: "Sky Cube", path: "sky-cube"},
							{name: "ClockTab", path: "clockTab"},
							{name: "Sky Cube", path: "sky-cube"},
							{name: "ClockTab", path: "clockTab"},
							{name: "Sky Cube", path: "sky-cube"},
							{name: "ClockTab", path: "clockTab"},
							{name: "Sky Cube", path: "sky-cube"}
						];
var scrollbar 			= null;
var scrollDelta 		= 1;
var scrl 				= 0;
var scrlD 				= 1;
var selectWork 			= 0;
var tweaking 			= false;
var distableTweaking	= null;
var mouse 				= {X: 0, Y: 0, XForce: 0, YForce: 0}
var mouseForceSmooth 	= {XForce: 0, YForce: 0}
var halfScreenSizeX 	= document.documentElement.clientWidth*0.5;
var halfScreenSizeY 	= document.documentElement.clientHeight*0.5;
var workCardHalfHeight 	= 220;
var domState = null;
var scrollTo 			= new function(){
							var timer = null;
							this.forcibly = false;
							this.value = false;

							this.set = function(x, y, time){
								scrollbar.scrollTo(x, y, time);
								this.value = true;
								timer = setTimeout(function(){
									this.forcibly = false;
									this.kill();
								}.bind(this), time);
							}.bind(this);

							this.kill = function(){
								if(this.forcibly) return;
								scrollbar.scrollTo(0, scrollbar.offset.y, 0);
								this.value = false;
								clearTimeout(timer);
							}.bind(this);
						};
var scrollBlockPosition = 0;
var debugGraph 			= new function(){
	var canvas;
	var ctx;
	var lastDot = {X: 0, Y: 0}

	this.ini = function(){
		canvas = document.getElementById("console-graph");
		ctx = canvas.getContext('2d');
	}

	this.update = function(y){
		if(y == lastDot.Y) return;
		if(lastDot.X == canvas.width){
			lastDot.X = 0;
			canvas.width = canvas.width;
		}
		ctx.beginPath();
		ctx.strokeStyle = "#fff";
		ctx.moveTo(lastDot.X, canvas.height*(1-lastDot.Y));
		ctx.lineTo(lastDot.X+1, canvas.height*(1-y));
		ctx.stroke();
		lastDot.X += 1;
		lastDot.Y = y;
	};
}
//var shdws 				= new Shadows("canvas-shadow");

//Listeners
window.onmousemove = function(e){
	mouse.X = e.clientX - halfScreenSizeX;
	mouse.Y = e.clientY - halfScreenSizeY;
	mouse.XForce = mouse.X/halfScreenSizeX;
	mouse.YForce = mouse.Y/halfScreenSizeY;
}


function update(){
	if(scrollBlockPosition != -1) scrollbar.scrollTo(0, scrollBlockPosition, 0);
	if(scrollbar.offset.y > halfScreenSizeY*2-110){
		domState.headUnlock();
	}else{
		domState.headStateSet((scrollbar.offset.y)/(halfScreenSizeY*1.4-110));
		domState.headLock();		
	}
	if(scrollbar.offset.y > halfScreenSizeY){		
		domState.scrollWorkVisible();
	}else{
		domState.scrollWorkHidden();
	}
	if(scrollbar.offset.y >= halfScreenSizeY*2 && scrollbar.offset.y <= scrollbar.limit.y-0.5*halfScreenSizeY){		
		domState.scrollWorkStateSet((scrollbar.offset.y-2*halfScreenSizeY)/(scrollbar.limit.y-2.5*halfScreenSizeY));
	}else{
		
	}

	if(scrollbar.offset.y >= scrollbar.limit.y-0.5*halfScreenSizeY){
		domState.buttonUpVisible();
	}else{
		domState.buttonUpHidden();
	}

	scrl += (scrlD-scrl)*((1-scrlD)*0.1+Transition.cubic.ease(1-scrl)*0.05+0.01);	
	
	if(Math.abs(scrollDelta) == 0 && tweaking && !scrollTo.forcibly && !distableTweaking){
		tweaking = false;
		if(scrollbar.offset.y < halfScreenSizeY){
			
			scrollTo.set(0, 0, 600)
		}else{			
			if(scrollbar.offset.y > scrollbar.limit.y-halfScreenSizeY) scrollTo.set(0, scrollbar.limit.y, 600);
			else{
				console.log("NO ZERO SCALE!");
				document.body.classList.remove("fast-scroll");
				scrlD = 1;
				scrollTo.set(0, -halfScreenSizeY + worksList[selectWork].wrapper.offsetTop + workCardHalfHeight, 600);
			} 
		}
	}

	if(Math.abs(mouse.XForce - mouseForceSmooth.XForce) < 0.05) mouseForceSmooth.XForce = mouse.XForce; 
	else mouseForceSmooth.XForce += (mouse.XForce - mouseForceSmooth.XForce)*(Math.abs(mouse.XForce) < 0.6? 0.6 : 0.05);

	if(Math.abs(mouse.YForce - mouseForceSmooth.YForce) < 0.05) mouseForceSmooth.YForce = mouse.YForce; 
	else mouseForceSmooth.YForce += (mouse.YForce - mouseForceSmooth.YForce)*(Math.abs(mouse.YForce) < 0.6? 0.6 : 0.05);


	for(var i=selectWork<2? 0 : selectWork-2; i<(selectWork+2>=worksList.length? worksList.length : selectWork+2); i++){
		var offsetTop = worksList[i].wrapper.offsetTop+workCardHalfHeight;

		var t = 0 ;

		if(offsetTop-scrollbar.offset.y-halfScreenSizeY > 0){
			t = offsetTop-(scrollbar.offset.y+halfScreenSizeY*1.4);
		}else{
			t = (scrollbar.offset.y+halfScreenSizeY*0.6)-offsetTop;
		}

		var s = (1-Transition.bound(t/(halfScreenSizeY*0.6), 0, 1))*0.2*Transition.quartic.ease(scrl);
		s = Math.round(s*1000)/1000
		/*if(i == 1){
			debugGraph.update((s-0.8)*5);
			document.getElementById("console_scale").innerHTML = scrlD;
		}*/
		
		if(offsetTop - scrollbar.offset.y - halfScreenSizeY > 0){
			t = offsetTop-(scrollbar.offset.y+halfScreenSizeY);
		}else{
			t = (scrollbar.offset.y+halfScreenSizeY)-offsetTop;
		}

		var t = 1 - Transition.bound(t/halfScreenSizeY, 0, 1);

		if(Math.abs(scrollbar.offset.y+halfScreenSizeY - worksList[selectWork].wrapper.offsetTop - workCardHalfHeight) > 
		   Math.abs(scrollbar.offset.y+halfScreenSizeY - offsetTop)){
		   	worksList[selectWork].wrapper.classList.remove("select-work");
			selectWork = i;
			worksList[selectWork].wrapper.classList.add("select-work")
		}

		//var xOffset = Transition.cubic.ease(t*0.7+0.3)*Transition.quadratic.easeOut(Math.abs(mouseForceSmooth.XForce))*(mouseForceSmooth.XForce > 0? 1 : -1)*10;
		t = t * (scrollbar.offset.y+halfScreenSizeY - offsetTop)
		/*+Transition.cubic.ease(t*0.7+0.3)*Transition.quadratic.easeOut(Math.abs(mouseForceSmooth.YForce))*(mouseForceSmooth.YForce > 0? 1 : -1)*10*/;

		worksList[i].wrapper.style.transform = /*scale("+(s+0.8)+")*/" translate3D("+/*xOffset*/0+"px,"+t+"px,0px)";
		//worksList[i].bg.style.transform = "scale("+(1.42-(s*5)*0.42)+") translate3D(0px,0px,0px)";
		//worksList[i].body.style.boxShadow = "0px 1px "+((s+0.8)*45)+"px rgba(0, 0, 0, "+((s)*5*0.17)+")";
		//worksList[i].text.style.width = worksList[i].maxTextWidth*s*5+"px";
	}

	//domState.getShadowRects();

	requestAnimationFrame(update);
}

//Application entry point
//preRender();
finishLoad();

function preRender(){
	var logo = new UI("canvas")
		.class("logo-loader")
		.addAttribute("width", "178")
		.addAttribute("height", "245");
	var logoWrp = new UI("div", {class: "logo-loader-wrapper"}).append(logo);
	document.getElementById("resize-wrapper").appendChild(logoWrp.getHTML());

	var canvas 				= logo.getHTML();
	var ctx 				= canvas.getContext('2d');
	var time 				= 0;
	var start 				= performance.now();
	var percentload 		= 0;
		scrollBlockPosition	= 0;

	function drawFrame() {
		canvas.width = canvas.width;
		drawCircle(Transition.cubic.ease(time));
		if(time > 0.5)
			drawLine(Transition.cubic.ease(time*2-1));	
		if(time < 0.98){
			time += (percentload*0.01 - time)*0.06;
			requestAnimationFrame(drawFrame);
		}else{
			if(time != 1){
				time = 1;
				requestAnimationFrame(drawFrame);
				finishLoad();
			}
			
		}
	}
	requestAnimationFrame(drawFrame);

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

	var loader = new Engine.loadResurces().load();
	loader.status = function(p){
		percentload = p;
	}
}

function finishLoad(){
	LocLoad("RU", function(){
		render(function(){
			scrollbar = window.Scrollbar;
			scrollbar.use(window.OverscrollPlugin);
			scrollbar = scrollbar.init(document.getElementById("resize-wrapper"), {
				damping: 0.08,
				alwaysShowTracks: true
			});
			var scollOffset = 0;

			window.onwheel = function(e){				
				if(scrollTo.value){
					scrollTo.kill();
				}
				if(!tweaking){
					tweaking = true;
					console.log("ZERO SCALE!");
					document.body.classList.add("fast-scroll");
					scrlD = 0;
				}
				if(distableTweaking) clearTimeout(distableTweaking);
				distableTweaking = setTimeout(function(){
					distableTweaking = null;
				}, 300);
			}
			/*scrollbar.addListener((status) => {
				scrollDelta = status.offset.y-scollOffset;
				scollOffset = status.offset.y;
			});*/
			setInterval(function(){
				scrollDelta = scrollbar.offset.y-scollOffset;
				scollOffset = scrollbar.offset.y;
			}, 100);
			//debugGraph.ini();
			domState.rebulid();
			update();
			var t = document.getElementById("main-page__cover_ahead").getBoundingClientRect().top-halfScreenSizeY*2;
			//document.getElementById("main-page").style.transform = "translate3D(0,"+-t+"px,0)";
			setTimeout(function(){
				document.body.classList.add("hide-loader");
				setTimeout(function(){
					document.getElementById("main-page").style.transform = "";
					document.body.classList.remove("hide-loader");
					//logoWrp.destroy();
					scrollBlockPosition = -1;
				}, 1400);
			}, 200);				
		});
		scrollBlockPosition = -1;

	});
}

function render(endRender){
	var works = new UI("div", {class: "main-page__works"});
	for(var i=0; i<worksList.length; i++){
		worksList[i].wrapper = new UI("div", {
			class: "works__work-card__wrapper",
			style: [
				{key: "margin", value: (halfScreenSizeY*2 - 560)/4+"px 0px"},
				{key: "height", value: (halfScreenSizeY*2 <= 700? halfScreenSizeY : 440)+"px"}
			]
		})
			.append(
				new UI("div", {
					class: "work-card"
				})
					.append(
						new UI("div", {
							class: "work-card__bg",
							style: [
								{key: "backgroundImage", value: "url('works/"+worksList[i].path+"/preview.png')"},
								{key: "backgroundColor", value: worksList[i].mainColor}
							]
						})
					)
					.append(
						new UI("div", {
							class: "work-card__name-wrapper"
						})
							.append(
								new UI("div", {
									class: "work-card__name",
									content: worksList[i].name
								})
							)
					)	
			)
		
		works.append(worksList[i].wrapper);
		worksList[i].wrapper = worksList[i].wrapper.getHTML();
	}
	var wrp = new UI("div", {class: "main-page", attr: {key: "id", value: "main-page"}})
		.append(
			new UI("div", {class: "main-page__cover-wrp", attr: {key: "id", value: "cover-wrp"}})
				.append(
					new UI("div", {class: "main-page__cover"})
						.append(
							new UI("div", {class: "main-page__cover_ahead", attr: {key: "id", value: "main-page__cover_ahead"}})
								.append(
									new UI("h1", {content: "Danilkinkin"})
								)
								.append(
									new UI("h2", {content: Loc.slogan})
								)
						)
						.append(
							new UI("p", {
								content: Loc.salutation_part_1+" "+(new Date(Date.now() - new Date(1999, 1, 13, 22)).getFullYear() - 1970)+" "+Loc.salutation_part_2
							})
						)						
				)
				.append(
						new UI("div", {class: "main-page__cover-bottom_link-block", attr: {key: "id", value: "cover-bottom_link-block"}})
							.append(
								new UI("div", {class: "link-block__links"})
									.append(
										new UI("a", {
											attr: [
												{key: "href", value: "../contacts/index.html"},
												{key: "id", value: "link-contacts"}
											],
											class: "link-contacts",
											content: Loc.link_contacts
										})
											.addEvent("onclick", function(e){
												e.preventDefault();
												e.stopPropagation();													
												domState.hidePage(function(){
													window.open("../contacts/index.html", "_self");
												});
											})										
									)
									.append(
										new UI("a", {
											attr: [
												{key: "href", value: ""},
												{key: "id", value: "link-works"}
											],
											class: "link-works",
											content: Loc.link_works
										})
											.addEvent("onclick", function(e){
												e.preventDefault();
												e.stopPropagation();													
												scrollTo.forcibly = true;
												tweaking = true;
												scrollTo.set(0, -halfScreenSizeY + worksList[0].wrapper.offsetTop + workCardHalfHeight, 600);
											})
									)
									.append(
										new UI("a", {
											attr:[
												{key: "href", value: "resume.pdf"},
												{key: "target", value: "_blank"},
												{key: "id", value: "link-resume"}
											],
											class: "link-resume",
											content: Loc.link_resume
										})
									)
							)
							.append(
								new UI("a", {
									attr: [
										{key: "href", value: "mailto:hello@danilkinkin.com"},
										{key: "id", value: "link-mail"}
									],
									class: "link-mail",
									content: "hello@danilkinkin.com"
								})
							)
					)
				.append(
					new UI("div", {class: "main-page__cover-wrp_wave-bottom", attr: {key: "id", value: "cover-wrp_wave-bottom"}})
						.append(
							new UI("div", {class: "main-page__cover-wrp_link-block", attr: {key: "id", value: "cover-wrp_wave-bottom_link-block"}})
								.append(
									new UI("div", {class: "link-block__links"})
										.append(
											new UI("a", {
												attr: [
													{key: "href", value: "../contacts/index.html"},
													{key: "id", value: "link-contacts-wave"}
												],
												class: "link-contacts",
												content: Loc.link_contacts
											})
												.addEvent("onclick", function(e){
													e.preventDefault();
													e.stopPropagation();													
													domState.hidePage();
												})
										)
										.append(
											new UI("a", {
												attr: [
													{key: "href", value: ""},
													{key: "id", value: "link-works-wave"}
												],
												class: "link-works",
												content: Loc.link_works
											})
												.addEvent("onclick", function(e){
													e.preventDefault();
													e.stopPropagation();
													scrollTo.forcibly = true;
													tweaking = true;
													scrollTo.set(0, -halfScreenSizeY + worksList[0].wrapper.offsetTop + workCardHalfHeight, 600);
												})
										)
										.append(
											new UI("a", {
												attr:[
													{key: "href", value: "resume.pdf"},
													{key: "target", value: "_blank"},
													{key: "id", value: "link-resume-wave"}
												],
												class: "link-resume",
												content: Loc.link_resume
											})
										)
								)
								.append(
									new UI("a", {
										attr: [
											{key: "href", value: "mailto:hello@danilkinkin.com"},
											{key: "id", value: "link-mail-wave"}
										],
										class: "link-mail",
										content: "hello@danilkinkin.com"
									})
								)
						)
				)			
		)
		.append(works)
		.append(
			new UI("div", {class: "main-page__footer"})
				.append(new UI("div", {class: "main-page__footer_title", content: "Danilkinkin"}))
				.append(new UI("div", {class: "main-page__footer_copy", content: "Danilkinkin 2019"}))
		)
		.append(
			new UI("div", {class: "scrollbar-works-hide", attr: {key: "id", value: "scrollbar-works"}})
				.append(new UI("div", {attr: {key: "id", value: "scrollbar-works-fill"}}))
					.addEvent("onclick", function(){
						if(!domState.buttonUpIsHide){
							scrollTo.forcibly = true;
							scrollTo.set(0, 0, 1000);
						}
					})
		)
		.append(
			new UI("div", {attr: {key: "id", value: "cap"}})
		)
		/*.append(
			new UI("div", {attr: {key: "id", value: "info-project"}, class: "wokrs-info"})
				.append(
					new UI("div", {class: "wokrs-info__info"})
						.append(
							new UI("div", {class: "wokrs-info__info_name"})
						)
						.append(
							new UI("div", {class: "wokrs-info__info_description"})
						)
				)
				.append(
					new UI("div", {class: "wokrs-info__cap"})
				)
		);*/
	document.getElementById("resize-wrapper").appendChild(wrp.getHTML());

	domState = new function(){
		this.page 					= document.getElementById("main-page");
		this.cover 					= document.getElementById("cover-wrp");
		this.body 					= document.getElementById("resize-wrapper");
		this.coverBottom			= document.getElementById("cover-wrp_wave-bottom");
		this.linkWorks 				= document.getElementById("link-works");
		this.linkWorksWave 			= document.getElementById("link-works-wave");
		this.linkResume 			= document.getElementById("link-resume");
		this.linkResumeWave 		= document.getElementById("link-resume-wave");
		this.scrollWork 			= document.getElementById("scrollbar-works");
		this.scrollWorkFill 		= document.getElementById("scrollbar-works-fill");
		this.linksBlockMain 		= document.getElementById("cover-bottom_link-block");
		this.linksBlockWave			= document.getElementById("cover-wrp_wave-bottom_link-block");
		this.workDescriptionBlock 	= new UI("div", {class: "wokrs-info"});
		this.workDescriptionName 	= new UI("div", {class: "wokrs-info__info_name"});
		this.workDescriptionDesc 	= new UI("div", {class: "wokrs-info__info_description"});
		this.workDescriptionCap 	= new UI("div", {class: "wokrs-info__cap"});
		this.headIsUnlock 			= false;
		this.scrollWorkIsHide 		= true;
		this.buttonUpIsHide 		= true;


		this.headStateSet = function(t){
			this.coverBottom.style.height = 110*t+"px";
			this.linkWorks.style.opacity = 
			this.linkWorksWave.style.opacity = 
			this.linkResume.style.opacity = 
			this.linkResumeWave.style.opacity = 1-Transition.bound(t, 0, 1);
			this.linksBlockMain.style.maxWidth = 
			this.linksBlockWave.style.maxWidth = (1510+180*Transition.bound(t, 0, 1))+"px";
		}.bind(this);

		this.headUnlock = function(){
			if(this.headIsUnlock) return;
			this.headIsUnlock = true;
			this.body.appendChild(this.coverBottom);
			document.body.classList.add("unlock-cover-links");
		}.bind(this);

		this.headLock = function(){
			if(!this.headIsUnlock) return;
			this.headIsUnlock = false;
			this.cover.appendChild(this.coverBottom);
			document.body.classList.remove("unlock-cover-links");
		}.bind(this);

		this.scrollWorkStateSet = function(t){
			this.scrollWorkFill.style.transform = "translate3d(0,"+90*(t-1)+"px,0)";
		}.bind(this);

		this.scrollWorkVisible = function(){
			if(!this.scrollWorkIsHide) return;
			this.scrollWorkIsHide = false;
			this.scrollWorkFill.style.transform = "translate3d(0,-90px,0)";
			this.scrollWork.classList.remove("scrollbar-works-hide");
		}.bind(this);

		this.scrollWorkHidden = function(){
			if(this.scrollWorkIsHide) return;
			this.scrollWorkIsHide = true;
			this.scrollWork.classList.add("scrollbar-works-hide");
		}.bind(this);

		this.buttonUpVisible = function(){
			if(!this.buttonUpIsHide) return;
			this.buttonUpIsHide = false;
			this.scrollWork.classList.add("scrollbar-works-button-up-style");
		}.bind(this);

		this.buttonUpHidden = function(){
			if(this.buttonUpIsHide) return;
			this.buttonUpIsHide = true;
			this.scrollWork.classList.remove("scrollbar-works-button-up-style");
		}.bind(this);

		this.rebulid = function(){
			this.body.appendChild(this.scrollWork);
			this.body.appendChild(document.getElementById("cap"));
			this.body.appendChild(
				this.workDescriptionBlock
					.append(
						new UI("div", {class: "wokrs-info__info"})
							.append(this.workDescriptionName)
							.append(this.workDescriptionDesc)
					)
					.append(this.workDescriptionCap)
					.getHTML()
			);
			/*for(var i=0; i<worksList.length; i++){
				worksList[i].text.style.width = (worksList[i].text.clientWidth+28)+"px";
			}*/
		}.bind(this);

		this.hidePage = function(callback){
			var height = halfScreenSizeY*2-document.getElementById("main-page__cover_ahead").getBoundingClientRect().top;
			scrollBlockPosition = scrollbar.offset.y;			
			document.body.classList.add("hide-page");
			setTimeout(function(){
				this.page.style.transform = "translate3D(0,"+height+"px,0)";
				if(callback) setTimeout(callback, 850);
			}.bind(this), 100);
		}.bind(this);

		this.showPage = function(){
			/*var t = document.getElementById("main-page__cover_ahead").getBoundingClientRect().top-halfScreenSizeY*2;
				document.getElementById("main-page").style.transform = "translate3D(0,"+-t+"px,0)";
				setTimeout(function(){
					document.body.classList.add("hide-loader");
					setTimeout(function(){
						document.getElementById("main-page").style.transform = "";
						document.body.classList.remove("hide-loader");
						logoWrp.destroy();
						scrollBlockPosition = -1;
					}, 1400);
				}, 200);*/
		}.bind(this);

		/*this.getShadowRects = function(){
			shdws.clear();
			shdws.draw(
				worksList[selectWork].body.getBoundingClientRect().left,
				worksList[selectWork].body.getBoundingClientRect().top,
				worksList[selectWork].body.getBoundingClientRect().width,
				worksList[selectWork].body.getBoundingClientRect().height,
				"#000"
			);
			if(selectWork > 0)
				shdws.draw(
					worksList[selectWork-1].body.getBoundingClientRect().left,
					worksList[selectWork-1].body.getBoundingClientRect().top,
					worksList[selectWork-1].body.getBoundingClientRect().width,
					worksList[selectWork-1].body.getBoundingClientRect().height,
					"#000"
				);
			if(selectWork+1 < worksList.length)
				shdws.draw(
					worksList[selectWork+1].body.getBoundingClientRect().left,
					worksList[selectWork+1].body.getBoundingClientRect().top,
					worksList[selectWork+1].body.getBoundingClientRect().width,
					worksList[selectWork+1].body.getBoundingClientRect().height,
					"#000"
				);
		}*/
	}
	if(endRender) endRender();
}