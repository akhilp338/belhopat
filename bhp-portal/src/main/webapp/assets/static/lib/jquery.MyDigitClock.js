/**
 * @author Paul Chan / KF Software House 
 * Homepage: http://www.kfsoft.info
 *
 * Version 0.5
 * Copyright (c) 2010 KF Software House
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 *
 */
	
(function($) {

    var _options = {};
	var _container = {};

	jQuery.fn.MyDigitClock = function(options) {
//		var id = $(this).get(0).id;
		var id = "clock1";
		_options[id] = $.extend({}, $.fn.MyDigitClock.defaults, options);

		return this.each(function()
		{
			_container[id] = $(this);
			showClock(id);
		});
		
		function showClock(id)
		{
			var d = new Date;
			var h = d.getHours();
			var m = d.getMinutes();
			var s = d.getSeconds();
			
			var gmt_m = d.getUTCMinutes();
			var gmt_h = d.getUTCHours();
			if (gmt_h>12)
			{
				//gmt_h = gmt_h-12;
				GTD = "("+d.toTimeString().slice(9,17)+" hrs)";
			}
			else
			{
				GTD = "("+d.toTimeString().slice(9,17)+" hrs)";
			}
			GTD = GTD.replace("GMT", "");
			GTD = GTD.substr(0, 4) + ":" + GTD.substr(4);
//			var date = new Date();
//			return (date.toTimeString().slice(9,17) );
			
/*			var ampm = "";
			if (_options[id].bAmPm)
			{
				if (gmt_h>12)
				{
					gmt_h = gmt_h-12;
					ampm = "PM ("+d.toTimeString().slice(9,17)+" hrs)";
				}
				else
				{
					ampm = "AM ("+d.toTimeString().slice(9,17)+" hrs)";
				}
			}
			if (h>12)
			{
				h = h-12;
				GMTAMPM = "PM (GMT)";
			}
			else
			{
				GMTAMPM = "AM (GMT)";
			}*/
			
			var templateStr = _options[id].timeFormat;
			var today = new Date();
			var dd = today.getDate();
			var mm = today.getMonth()+1; //January is 0!
			var yyyy = today.getFullYear();

			if(dd<10) {
			    dd='0'+dd
			} 

			if(mm<10) {
			    mm='0'+mm
			} 

			today = dd+'-'+mm+'-'+yyyy;
			templateStr = templateStr.replace("{YY}", today);
			templateStr = templateStr.replace("{GMTYY}", today);
			templateStr = templateStr.replace("{HH}", getDD(h));
			templateStr = templateStr.replace("{MM}", getDD(m));
			templateStr = templateStr.replace("{GMTH}", getDD(gmt_h));
			templateStr = templateStr.replace("{GMTM}", getDD(gmt_m))
			templateStr = templateStr.replace("{SS}", getDD(s));
			templateStr = templateStr.replace("{GMTS}", getDD(s));
			//templateStr = templateStr.replace("{GMTAMPM}", GMTAMPM);
			templateStr = templateStr.replace("{GTD}", GTD);
		
			var obj = $("#"+id);
			//obj.css("fontSize", _options[id].fontSize);
			obj.css("fontFamily", _options[id].fontFamily);
			obj.css("color", _options[id].fontColor);
			obj.css("background", _options[id].background);
			//obj.css("fontWeight", _options[id].fontWeight);
		
			//change reading
			obj.html(templateStr)
			
			//toggle hands
			if (_options[id].bShowHeartBeat)
			{
				obj.find("#ch1").fadeTo(800, 0.1);
				obj.find("#ch2").fadeTo(800, 0.1);
			}
			setTimeout(function(){showClock(id)}, 1000);
		}
		
		function getDD(num)
		{
			return (num>=10)?num:"0"+num;
		}
		
		function refreshClock()
		{
			setupClock();
		}
	}
	
	//default values
	jQuery.fn.MyDigitClock.defaults = {
		fontSize: '50px',
		fontFamily: 'Microsoft JhengHei, Century gothic, Arial',
		fontColor: '#ff2200',
		fontWeight: 'bold',
		background: '#fff',
		timeFormat: '{YY} &nbsp;&nbsp;{GMTH}<p style="display:inline;" id="ch1">:</p>{GMTM}<p style="display:inline;" id="ch2">:</p>{GMTS} &nbsp;(GMT)</br>{GMTYY} &nbsp;&nbsp;{HH}<p  style="display:inline;" id="ch1">:</p>{MM}<p style="display:inline;" id="ch2">:</p>{SS} &nbsp;{GTD}',
		bShowHeartBeat: false,
		bAmPm:false
	};

})(jQuery);