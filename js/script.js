window.onload= function () {
	
	//main stuff
	var paper = new Raphael(250, 20, 400, 450);
	var backGround = paper.rect(0, 0, 400, 450);
	
	var h;
	var m;
	var s;
	var today;
	var offset = 0;
	var d;

	var grey1 = "#E0E3DA";
	var green1 = "#85C291";
	var blue1 = "#A7CECB";
	var red1 = '#F9B9A2';
	var orange1 = '#FDD692';

	var blue2 = "#373876";
	var green2 = "#4BA99E";
	var lBlue2 = "#88C9C2";
	var red2 = '#E74949';
	var sand2 = '#E7E29F';

	function starTime(){
		//time
		d = new Date();			
		utc = d.getTime() + (d.getTimezoneOffset() * 60000);  
		today = new Date(utc + (3600000*offset));
		
		h = today.getHours();
		m = today.getMinutes();
		s = today.getSeconds();
		
		checkOffset();

		analogClock(h, m ,s);
		digitalClock(h, m, s);
		getTodayDate();
		setTimeout(function (){starTime()}, 1000);
	}
	
	//timezone name
	var timeZoneIT = paper.text(50,420,"");
	var timeZonePERU = paper.text(150,420,"");
	var timeZoneMAD = paper.text(250,420,"");
	var timeZoneUK = paper.text(350,420,"UK");
	
	//stopwatch 
	var stMs = 0;
	var stS = 0;
	var stM = 0
	var stH = 0
	var t;
	
	//color palette
	var palette = 2;
	
	//stopWatch active/paused
	var stopWatchActive = false;
	var stopWatchPaused = false;
	
	//digital time
	var textDigital = paper.text(200, 350, "");
	

	//stopWatch buttons text
	var textStopWatch = paper.text(200, 350, "");

	//buttons text
	var textButton1 = paper.text(37, 190, "");
	textButton1.attr({"text": "Color", "font-size" : 12, "font-family": "Sansita, sans-serif"});

	textButton2 = paper.text(37, 290, "");
	textButton2.attr({"text": "+1 H", "font-size" : 12, "font-family": "Sansita, sans-serif"});
	
	textButton3 = paper.text(362, 190, "");
	textButton3.attr({"text": "Stopwatch", "font-size" : 12, "font-family": "Sansita, sans-serif"});
	
	textButton4 = paper.text(362, 290, "");
	textButton4.attr({"text": "-1 H", "font-size" : 12, "font-family": "Sansita, sans-serif"});
	
	//stopWatch lap
	stopWatchLap = paper.text(350, 350, "");
	stopWatchLap.attr({"text": "", "font-size" : 12, "font-family": "Sansita, sans-serif"});
	
	//date string
	var textDate = paper.text(200, 50, "Date");

	//analog time
	var face = paper.circle(200,200,100);

	//flags
	function it_flag(){
		var front_st = paper.set();
		var back_st = paper.set();

		face_st_ita = paper.circle(50,390,18);
		face_st_ita.attr({fill: "", "stroke-width" : 6})

		outer_st_ita = paper.circle(50,390,18);
		outer_st_ita.attr({fill: "", "stroke-width" : 2, "stroke-opacity" : "0"});

		var ita = paper.circle(50,390,15);
		ita.attr({fill : "white", "stroke-width" : "0", opacity: 1});

		var g_ita = paper.rect(35,376,10,28);
		g_ita.attr({fill : "green", "stroke-width" : "0"});

		var r_ita = paper.rect(55,376,10,28);
		r_ita.attr({fill : "red", "stroke-width" : "0"});

		front_st.push(g_ita, r_ita, face_st_ita, outer_st_ita);
		back_st.push(ita);

		front_st.insertAfter(back_st);

		back_st.hover(function(){
			outer_st_ita.animate({"stroke-opacity" : "1"}, 500);
		}, function(){
	 		outer_st_ita.animate({"stroke-opacity" : "0"}, 500); //out of focus after hover
	 	});
	 	front_st.hover(function(){
			outer_st_ita.animate({"stroke-opacity" : "1"}, 500);
		}, function(){
	 		outer_st_ita.animate({"stroke-opacity" : "0"}, 500); //out of focus after hover
	 	});

		back_st.click(function(){
			offset = 1;
		});
		front_st.click(function(){
			offset = 1;
		});
	}

	function peru_flag(){
		var front_st = paper.set();
		var back_st = paper.set();

		face_st_peru = paper.circle(150,390,18);
		face_st_peru.attr({fill: "", "stroke-width" : 6});

		outer_st_peru = paper.circle(150,390,18);
		outer_st_peru.attr({fill: "", "stroke-width" : 2, "stroke-opacity" : "0"});

		var peru = paper.circle(150,390,15);
		peru.attr({fill : "white", "stroke-width" : "0", opacity: 1});

		var g_peru = paper.rect(135,376,10,28);
		g_peru.attr({fill : "red", "stroke-width" : "0"});

		var r_peru = paper.rect(155,376,10,28);
		r_peru.attr({fill : "red", "stroke-width" : "0"});

		front_st.push(g_peru, r_peru, face_st_peru, outer_st_peru);
		back_st.push(peru);

		front_st.insertAfter(back_st);

		back_st.hover(function(){
			outer_st_peru.animate({"stroke-opacity" : "1"}, 500);
		}, function(){
	 		outer_st_peru.animate({"stroke-opacity" : "0"}, 500); //out of focus after hover
	 	});
	 	front_st.hover(function(){
			outer_st_peru.animate({"stroke-opacity" : "1"}, 500);
		}, function(){
	 		outer_st_peru.animate({"stroke-opacity" : "0"}, 500); //out of focus after hover
	 	});

		back_st.click(function(){
			offset = -5;
		});
		front_st.click(function(){
			offset = -5;
		});
	}

	function mad_flag(){
		var front_st = paper.set();
		var back_st = paper.set();

		face_st_mad = paper.circle(250,390,18);
		face_st_mad.attr({fill: "", "stroke-width" : 6});

		outer_st_mad = paper.circle(250,390,18);
		outer_st_mad.attr({fill: "", "stroke-width" : 2, "stroke-opacity" : "0"});

		var mad = paper.circle(250,390,15);
		mad.attr({fill : "white", "stroke-width" : "0", opacity: 1});

		var g_mad = paper.rect(247,375,18,16);
		g_mad.attr({fill : "red", "stroke-width" : "0"});

		var r_mad = paper.rect(247,390,18,15);
		r_mad.attr({fill : "green", "stroke-width" : "0"});


		front_st.push(g_mad, r_mad, face_st_mad, outer_st_mad);
		back_st.push(mad);

		front_st.insertAfter(back_st);

		back_st.hover(function(){
			outer_st_mad.animate({"stroke-opacity" : "1"}, 500);
		}, function(){
	 		outer_st_mad.animate({"stroke-opacity" : "0"}, 500); //out of focus after hover
	 	});
	 	front_st.hover(function(){
			outer_st_mad.animate({"stroke-opacity" : "1"}, 500);
		}, function(){
	 		outer_st_mad.animate({"stroke-opacity" : "0"}, 500); //out of focus after hover
	 	});

		back_st.click(function(){
			offset = 3;
		});
		front_st.click(function(){
			offset = 3;
		});
	}

	function uk_flag(){
		var front_st = paper.set();
		var back_st = paper.set();

		//external stroke
		face_st_uk = paper.circle(350,390,18);
		face_st_uk.attr({fill: "", "stroke-width" : 6});

		outer_st_uk = paper.circle(350,390,18);
		outer_st_uk.attr({fill: "", "stroke-width" : 2, "stroke-opacity" : "0"});

		//blue background
		var uk = paper.circle(350,390,15);
		uk.attr({fill : "blue", "stroke-width" : "0", opacity: 1});

		//horizontal red
		var g_uk = paper.rect(331,387,35,6);
		g_uk.attr({fill : "red", "stroke-width" : "1", stroke : "white"});

		//horizontal red line to cover white stroke in middle
		var r3_uk = paper.rect(331,388,35,4);
		r3_uk.attr({fill : "red", "stroke-width" : "1", stroke : "red"});

		//vertical red
		var r_uk = paper.rect(347,371,6,35);
		r_uk.attr({fill : "red", "stroke-width" : "1", stroke : "white"});

		//t->b red
		var g2_uk = paper.rect(332,389,35,2);
		g2_uk.attr({fill : "red", "stroke-width" : "1", stroke : "white"});
		g2_uk.rotate(45);

		//b->t red
		var r2_uk = paper.rect(349,373,2,35);
		r2_uk.attr({fill : "red", "stroke-width" : "1", stroke : "white"});
		r2_uk.rotate(45);

		front_st.push(g_uk, r_uk, r3_uk, face_st_uk, outer_st_uk);
		back_st.push(uk, g2_uk, r2_uk);

		front_st.insertAfter(back_st);

		back_st.hover(function(){
			outer_st_uk.animate({"stroke-opacity" : "1"}, 500);
		}, function(){
	 		outer_st_uk.animate({"stroke-opacity" : "0"}, 500); //out of focus after hover
	 	});
	 	front_st.hover(function(){
			outer_st_uk.animate({"stroke-opacity" : "1"}, 500);
		}, function(){
	 		outer_st_uk.animate({"stroke-opacity" : "0"}, 500); //out of focus after hover
	 	});

		back_st.click(function(){
			offset = 0;
		});
		front_st.click(function(){
			offset = 0;
		});
	}

	it_flag();
	peru_flag();
	mad_flag();
	uk_flag();

	var seconds = paper.rect(197,200,3,90);
	var minutes = paper.rect(195,200,5,70);
	var hours = paper.rect(195,200,10,50);

	var pivot = paper.circle(200,200,10);

	var hrs_line0 = paper.rect(196, 102, 8, 15);
	var hrs_line1 = paper.rect(283, 196, 15, 8);
	var hrs_line2 = paper.rect(196, 283, 8, 15);
	var hrs_line3 = paper.rect(102, 196, 15, 8);
	
	//buttons
	var butt1 = paper.rect(25,150,25,25,2);	
	var butt2 = paper.rect(25,250,25,25,2);	
	var butt3 = paper.rect(350,150,25,25,2);
	var butt4 = paper.rect(350,250,25,25,2);

	butt1.click(function(){clockColor();});

	butt2.click(function(){
		if(stopWatchActive){ //siamo nello stopwatch
			if(!stopWatchPaused){
				textButton2.attr({"text": "Play"});
				stopStopWatch();
				stopWatchPaused = true;
			}else{
				stopWatchPaused = false;
				textButton2.attr({"text": "Pause"});
				stopWatchTimer();
			}
		}else{ //+1 hours
			textButton2.attr({"text": "+1 H"});
			offset += 1;
		}
	});
	
	butt3.click(function(){
		if(!stopWatchActive){
			textDigital.attr({"text" : ""});
			textButton3.attr({"text": "Exit"});
			textButton4.attr({"text": "Reset"});
			textButton2.attr({"text": "Pause"});
			stopWatchActive = true;
			stopWatchTimer();
		 }else{
			textStopWatch.attr({"text" : ""});
			textButton3.attr({"text": "Stopwatch"});
			textButton4.attr({"text": "-1 H"});
			textButton2.attr({"text": "+1 H"});
			stopWatchActive = false;
			stopStopWatch();
			var lap = checkTime(stH) + ":" + checkTime(stM) + ":" + checkTime(stS) + ":" + checkTime(stMs);
			
			stopWatchLap.attr({"text": "LAP: " + lap, "font-size" : 12});
			clearStopWatch();
		 }
	});
	
	butt4.click(function(){
		if(stopWatchActive){
			textButton4.attr({"text": "Reset", "font-size" : 12});
			clearStopWatch();
		}else{ //-1 hour
			textButton4.attr({"text": "-1 H", "font-size" : 12});
			offset -= 1;
		}
	});	

	function checkOffset(){
		if(offset == 1){
			timeZoneIT.attr({"text" : "IT"});
			timeZonePERU.attr({"text" : ""});
			timeZoneMAD.attr({"text" : ""});
			timeZoneUK.attr({"text" : ""});
		}else if(offset == -5){
			timeZoneIT.attr({"text" : ""});
			timeZonePERU.attr({"text" : "PERU"});
			timeZoneMAD.attr({"text" : ""});
			timeZoneUK.attr({"text" : ""});
		}else if(offset == 3){
			timeZoneIT.attr({"text" : ""});
			timeZonePERU.attr({"text" : ""});
			timeZoneMAD.attr({"text" : "MAD"});
			timeZoneUK.attr({"text" : ""});
		}else{
			timeZoneIT.attr({"text" : ""});
			timeZonePERU.attr({"text" : ""});
			timeZoneMAD.attr({"text" : ""});
			timeZoneUK.attr({"text" : "UK"});
		}
	}

	// STOPWATCH
	
	function stopStopWatch(){
		clearTimeout(t);
	}
	
	function clearStopWatch(){
		stH = 0;
		stM = 0;
		stS = 0;
		stMs = 0;
	}
	
	function stopWatchTimer() {
		t = setTimeout(stopWatch, 10);

	}
	
	function stopWatch(){
		stMs++;
		if(stMs > 100){
			stMs = 0;
			stS++
		if (stS >= 60) {
			stS = 0;
			stM++;
			if (stM >= 60) {
				stM = 0;
				stH++;
			}
		}
	}
	
	textContent = (stH ? (stH > 9 ? stH : "0" + stH) : "00") + ":" +
	(stM ? (stM > 9 ? stM : "0" + stM) : "00") + ":" + (stS > 9 ? stS : "0" + stS) + ":" +
	(stMs > 9 ? stMs : "0" + stMs);
	
	textStopWatch.attr({"text" : textContent, "font-family": "Sansita, sans-serif", "font-size": "12"});
		
	stopWatchTimer();
	}
	
	//COLOR

	function clockColor(){
		palette = (palette == 1 ? 2 : 1);
		if(palette == 2){

			face_st_peru.attr({stroke : green1});
			face_st_ita.attr({stroke : green1});
			face_st_uk.attr({stroke : green1});
			face_st_mad.attr({stroke : green1});

			outer_st_ita.attr({stroke : red1});
			outer_st_peru.attr({stroke : red1});
			outer_st_mad.attr({stroke : red1});
			outer_st_uk.attr({stroke : red1});

			backGround.attr({ fill: green1, "stroke-width": "0"});

			textDigital.attr({opacity: 1, 'font-size': 16, fill: grey1});
			textDate.attr({opacity: 1, 'font-size': 16, fill: grey1});
			
			textStopWatch.attr({fill: '#333'});

			seconds.attr({ fill: red1, "stroke-width": "0"});
			minutes.attr({ fill: grey1, "stroke-width": "0"});
			hours.attr({ fill: blue1, "stroke-width": "0"});
			
			face.attr({ fill: green1, stroke: orange1, "stroke-width": "5"});
			pivot.attr({ fill: orange1, "stroke-width": "0"});
				
			hrs_line0.attr({fill: red1, "stroke-width": "0"});
			hrs_line1.attr({fill: red1, "stroke-width": "0"});
			hrs_line2.attr({fill: red1, "stroke-width": "0"});
			hrs_line3.attr({fill: red1, "stroke-width": "0"});
			
			butt1.attr({fill: red1, "stroke-width": "0"})
			.hover(function(){
				this.animate({fill: blue1}, 500);
			}, function(){
				this.animate({fill: red1}, 500);
			});
			
			butt2.attr({fill: red1, "stroke-width": "0"})
			.hover(function(){
				this.animate({fill: blue1}, 500);
			}, function(){
				this.animate({fill: red1}, 500);
			});
			
			butt3.attr({fill: red1, "stroke-width": "0"})
			.hover(function(){
				this.animate({fill: blue1}, 500);
			}, function(){
				this.animate({fill: red1}, 500);
			});
			
			butt4.attr({fill: red1, "stroke-width": "0"})
			.hover(function(){
				this.animate({fill: blue1}, 500);
			}, function(){
				this.animate({fill: red1}, 500);
			});
			
			textButton1.attr({fill: grey1});
			
			textButton3.attr({fill: grey1});
			textButton4.attr({fill: grey1});
			stopWatchLap.attr({fill: grey1});
			textButton2.attr({fill: grey1});
			
			timeZoneIT.attr({fill: grey1});
			timeZonePERU.attr({fill: grey1});
			timeZoneMAD.attr({fill: grey1});
			timeZoneUK.attr({fill: grey1});
		
		}else{

			face_st_peru.attr({stroke : blue2});
			face_st_ita.attr({stroke : blue2});
			face_st_uk.attr({stroke : blue2});
			face_st_mad.attr({stroke : blue2});

			outer_st_ita.attr({stroke : green2});
			outer_st_peru.attr({stroke : green2});
			outer_st_mad.attr({stroke : green2});
			outer_st_uk.attr({stroke : green2});

			backGround.attr({ fill: blue2, "stroke-width": "0"});

			textDigital.attr({opacity: 1, 'font-size': 16, fill: sand2});
			textDate.attr({opacity: 1, 'font-size': 16, fill: sand2});
			
			textStopWatch.attr({fill : '#f1f1f1'});

			seconds.attr({ fill: blue2, "stroke-width": "0"});
			minutes.attr({ fill: '#fff', "stroke-width": "0"});
			hours.attr({ fill: lBlue2, "stroke-width": "0"});
			
			face.attr({ fill: sand2, stroke: red2, "stroke-width": "5"});
			pivot.attr({ fill: red2, "stroke-width": "0"});
				
			hrs_line0.attr({fill: green2, "stroke-width": "0"});
			hrs_line1.attr({fill: green2, "stroke-width": "0"});
			hrs_line2.attr({fill: green2, "stroke-width": "0"});
			hrs_line3.attr({fill: green2, "stroke-width": "0"});
			
			butt1.attr({fill: green2, "stroke-width": "0"})
			.hover(function(){
				this.animate({fill: lBlue2}, 500);
			}, function(){
				this.animate({fill: green2}, 500);
			});
			
			butt2.attr({fill: green2, "stroke-width": "0"})
			.hover(function(){
				this.animate({fill: lBlue2}, 500);
			}, function(){
				this.animate({fill: green2}, 500);
			});
			
			butt3.attr({fill: green2, "stroke-width": "0"})
			.hover(function(){
				this.animate({fill: lBlue2}, 500);
			}, function(){
				this.animate({fill: green2}, 500);
			});
			
			butt4.attr({fill: green2, "stroke-width": "0"})
			.hover(function(){
				this.animate({fill: lBlue2}, 500);
			}, function(){
				this.animate({fill: green2}, 500);
			});
			
			textButton1.attr({fill: sand2})
			
			textButton3.attr({fill: sand2});
			textButton4.attr({fill: sand2});
			stopWatchLap.attr({fill: sand2});
			textButton2.attr({fill: sand2});
			
			timeZoneIT.attr({fill: sand2});
			timeZonePERU.attr({fill: sand2});
			timeZoneMAD.attr({fill: sand2});
			timeZoneUK.attr({fill: sand2});
		}
	}
	
	//CLOCK
	
	function analogClock(h, m, s){
		var rot_h = 30 * ((h % 12) + m / 60) +180;
		var rot_m = 6 * m + 180;
		var rot_s = 6 * s + 180;
	
		seconds.animate({transform: [ 'r',rot_s,200,200]});
		minutes.animate({transform: [ 'r',rot_m,200,200]});
		hours.animate({transform: [ 'r',rot_h,200,200]});
	}
	
	function digitalClock(h, m, s){
		h = checkTime(h);	
		m = checkTime(m);
		s = checkTime(s);
		
		var digital = h + ":" + m + ":" + s;
		if(!stopWatchActive)
			textDigital.attr({"text" : digital, "font-family": "Sansita, sans-serif"});
		else
			textDigital.attr({"text" : ""});	
	}

	//DATE
	
	function getTodayDate(){
		var days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
		var months = ["Jan","Feb","Mar","Apr","Maj","Jun","Jul","Aug","Sept","Oct","Nov","Dec"];
		
		var todayDate = days[today.getDay()] + ", " + checkTime(months[(today.getMonth())]) +
		" " + checkTime(today.getDate()) +" " + today.getFullYear() + ", GMT: " +
		(offset >= 0 ? ("+" + offset) : offset);

		textDate.attr({"text" : todayDate, "font-family": "Sansita, sans-serif"});
	}
	
	// MISC
	function checkTime(i) {
		if (i < 10) {i = "0" + i};
		return i;
	}

	//start everything
	clockColor();
	starTime();

}
