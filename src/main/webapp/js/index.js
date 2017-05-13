/**
 * 
 */

var input_path = "116.4757007673,40.089711459484;116.47626957435,40.090135932667;116.47837394484,40.091696980227;116.47941076906,40.092488633163;116.47981940823,40.092803456481;116.48011836431,40.093027067768;116.48086575449,40.093606342439;116.48106499865,40.093758887622;116.48119453431,40.093850580151;116.48218078393,40.094613644824;116.48255932987,40.094918868279;116.48329629971,40.095519238235;116.48396347121,40.09606896325;116.48426215779,40.096303395322;116.48470026139,40.096660009235;116.48534731085,40.097189924785;116.4854468431,40.097271471113;116.4855662279,40.097303344524;116.48668093521,40.098231116353;116.48688988107,40.098384478954;116.48697944213,40.098445948077;116.48764616448,40.099026969951;116.48785511034,40.099200475276;116.48787505272,40.099220826766;116.4884321818,40.099630200858;116.48879024638,40.099866276262;116.48891960237,40.099958512396;116.48905883973,40.100040883226;116.4891284584,40.10006206231;116.49022214536,40.100260952206;116.49075897273,40.1003103469;116.49128582891,40.100349669466;116.49151444767,40.100373745903;116.49240898029,40.100449769438;116.49314442302,40.100503027254;116.49381024706,40.100545109177;116.49464504237,40.100600367532;116.49486368993,40.100614371827;116.49589719042,40.100673355401;116.49668221961,40.100717782761;116.49862004425,40.100813398068;116.49988216349,40.100906391757;116.50045860614,40.100946817757;116.50167113892,40.101008491506;116.5028639988,40.101079478334;116.5034902974,40.101110315155;116.5036990636,40.101123905427;116.503917801,40.101127630679;116.50441492327,40.101136046988;116.50502145915,40.101156190936;116.50538940508,40.101162261714;116.50578717476,40.101178749391;116.50597608841,40.101181784779;116.50645344796,40.101199445215;116.50664245144,40.101202480602;116.50745811284,40.101225246;116.50824404033,40.101247183558;116.50827386408,40.101247597475;116.50888075928,40.101256565657;116.50981616481,40.101280020896;116.50996546318,40.101282090476;116.51360961914,40.101468490349;116.51529340299,40.101566657063;116.51852388927,40.101875022411;116.52017030361,40.10207597652;116.52167783991,40.102373853842;116.52223703509,40.102456221725;116.52539466879,40.102894135718;116.52843543294,40.103312731379;116.52894585013,40.103381646269;116.5294162029,40.103210428164;116.52957637077,40.103229950637;116.52962640639,40.10313985748;116.52970644541,40.103039623529;116.52977651324,40.10297946929;116.52985655226,40.102909243287;116.52995662349,40.102838948226;116.53004672353,40.102788727569;116.53018685919,40.102728297168;116.53029699145,40.102687941219;116.53040712371,40.102667590775;116.5305773526,40.102646964385;116.53069754588,40.102636547712;116.53087783579,40.102645791647;116.53097799686,40.102655380505;116.53104815452,40.102675110092;116.53133866652,40.10276382418;116.5314488886,40.102833291505;116.53153907848,40.102892894;116.53163932937,40.102972432896;116.53171954806,40.103062043386;116.53178970572,40.103151722742;116.53183983116,40.103231468285;116.53190001763,40.103351155405;116.53192013968,40.103481051908;116.5319302007,40.103530996115";

var search_point_1 = "124.068468,52.559656";		//查询起点
var search_point_2 = "124.52252,51.973215";		//查询终点

var pointss = [];		//显示点的集合 string

var point_array_map = new Map();	//所有路的所有坐标点 bmap

var opts = {
				  width : 200,     // 信息窗口宽度
				  height: 100,     // 信息窗口高度
				  title : "点" , // 信息窗口标题
				  enableMessage:true,//设置允许信息窗发送短息
				  message:"亲耐滴，晚上一起吃个饭吧？戳下面的链接看下地址喔~"
				}

$(function() { 
	cut_line();	
})

/**
 *	显示路段path
 */
function show_part_line(){	
	$.ajax({
		// url : "json/route.json",
		url : "http://api.map.baidu.com/direction/v1?mode=driving&origin="+search_point_1.split(",")[1]+","+search_point_1.split(",")[0]+"&destination="+search_point_2.split(",")[1]+","+search_point_2.split(",")[0]+"&origin_region=%E5%8C%97%E4%BA%AC&destination_region=%E5%8C%97%E4%BA%AC&output=json&ak=y9A9WkT3Y1jadGiMZwLEN7itWTS9oaQW",
		dataType : 'jsonp',
		success : function(data) {
			var num_path = data.result.routes[0].steps.length;
			for (i = 0; i < num_path; i++) {
				var path_one = data.result.routes[0].steps[i].path;
				var point_array = path_one.split(";");
				var start_point = point_array[0];
				var end_point = point_array[point_array.length - 1];
				draw_line(start_point, end_point);
				/*for(j=0;j<point_array.length;j++){	//显示最小片段
					var point_any = point_array[j];					
					var ap = new BMap.Point(point_any.split(",")[0],point_any.split(",")[1]);
					var marker3 = new BMap.Marker(ap);
					map.addOverlay(marker3);
				}*/
			}
			var first = data.result.routes[0].steps[0].path.split(";")[0];
			var end = data.result.routes[0].steps[num_path-1].path.split(";")[0];
			var fp = new BMap.Point(first.split(",")[0],first.split(",")[1]);
			var ep = new BMap.Point(end.split(",")[0],end.split(",")[1]);
			var pointss = [];
			pointss.push(fp);
			pointss.push(ep);
			map.setViewport(pointss);
		}
	})
}

/**
 *	剪切路段
 */
function cut_line(){	
	get_every_road();	
}

/**
 *	得到每条路段的所有点，放入point_array_map
 */
function get_every_road(){	
	point_array_all = [];
	$.ajax({
		url : "data/se_points.json",
		dataType : 'json',
		success : function(data) {			
			for(i=0;i<data.length;i++){
				draw_line(data[i].spoint,data[i].epoint,i);			
				setView(data[i].spoint,data[i].epoint);
			}
			map.setViewport(pointss);
			setTimeout(process,3000);
		}
	})
}

/**
 *	获得路段的交点
 */
function process() {
	var dis = 0;
	var dis_flag = false;
	var i=0;
	var j=0;
	var k=0;
	var l=0;
	for (i = 0; i < point_array_map.size(); i++) {
		var first_road = point_array_map.get(i);
		for (j = 0; j < point_array_map.size(); j++) {
			if (i != j) {
				var second_road = point_array_map.get(j);				
				dis_flag = false;
				for (k = 0; k < first_road.length; k++) {
					for (l = 0; l < second_road.length; l++) {
						dis = get_distance(	first_road[k].lat,first_road[k].lng, 
													second_road[l].lat,second_road[l].lng);
						if (dis < 0.010) {
							show_click_lnfoWindow(first_road[k]);
							show_click_lnfoWindow(second_road[l]);
							dis_flag = true;
							break;
						}
					}
					if(dis_flag){
						break;
					}
				}
			}
		}
	}
}

/**
 * 显示一个坐标点，并可以点击显示坐标信息
 * @param point	BMap.Point
 */
function show_click_lnfoWindow(point){
	var marker3 = new BMap.Marker(point);
	var point3 = new BMap.Point(point.lng,point.lat);
	var infoWindow3 = new BMap.InfoWindow(point.lng+"-"+point.lat, opts);
	marker3.addEventListener("click", function(){          
		map.openInfoWindow(infoWindow3,point3); //开启信息窗口
	});
	map.addOverlay(marker3);
}

/**
 * 	将两个点放入带整理视图的序列
 * @param first
 * @param end
 */
function setView(first,end){	
	var fp = new BMap.Point(first.split(",")[0],first.split(",")[1]);
	var ep = new BMap.Point(end.split(",")[0],end.split(",")[1]);
	pointss.push(fp);
	pointss.push(ep);
}

/**
 * 画一条线,点为字符串的x,y
 * @param start_point
 * @param end_point
 * @param i
 */
function draw_line(start_point, end_point,i) { 
	var sp = new BMap.Point(start_point.split(",")[0],start_point.split(",")[1]);
	var ep = new BMap.Point(end_point.split(",")[0], end_point.split(",")[1]);

	var DrvUtil = new BMap.DrivingRoute('浙江', {
		onSearchComplete : function(res) {
			if (DrvUtil.getStatus() == BMAP_STATUS_SUCCESS) {
				var plan = res.getPlan(0);
				var arrPois = [];
				for (var j = 0; j < plan.getNumRoutes(); j++) {
					var route = plan.getRoute(j);
					arrPois = arrPois.concat(route.getPath());
					if(i!=null){
						point_array_map.put(i,arrPois);								
						/*for(k=0;k<arrPois.length;k++){	//显示最小片段
							var marker3 = new BMap.Marker(arrPois[k]);
							map.addOverlay(marker3);
						}*/						
					}								
				}
				map.addOverlay(new BMap.Polyline(arrPois, {
					strokeColor : "black",
					strokeWeight : 2,
					strokeOpacity : 1
				}));
				// map.setViewport(arrPois); 视野调整
				var marker1 = new BMap.Marker(sp);
				var marker2 = new BMap.Marker(ep);
				map.addOverlay(marker1);
				map.addOverlay(marker2);
				var distance_str = plan.getDistance(true);
				var opts = {
					position : ep, // 指定文本标注所在的地理位置
					offset : new BMap.Size(0, 0)
				}
				var label = new BMap.Label(distance_str, opts);
				label.setStyle({
					color : "red",
					fontSize : "12px",
					height : "20px",
					lineHeight : "20px",
					fontFamily : "微软雅黑"
				});
				map.addOverlay(label);
			}
		}
	});
	DrvUtil.disableAutoViewport();
	DrvUtil.search(sp, ep);		
}

/**
 * 	创建一个map对象
 */
function Map() {  
    this.elements = new Array();  
    //获取MAP元素个数  
    this.size = function() {  
        return this.elements.length;  
    };  
    //判断MAP是否为空  
    this.isEmpty = function() {  
        return (this.elements.length < 1);  
    };  
    //删除MAP所有元素  
    this.clear = function() {  
        this.elements = new Array();  
    };  
    //向MAP中增加元素（key, value)   
    this.put = function(_key, _value) {  
        this.elements.push( {  
            key : _key,  
            value : _value  
        });  
    };  
    //删除指定KEY的元素，成功返回True，失败返回False  
    this.remove = function(_key) {  
        var bln = false;  
        try {  
            for (i = 0; i < this.elements.length; i++) {  
                if (this.elements[i].key == _key) {  
                    this.elements.splice(i, 1);  
                    return true;  
                }  
            }  
        } catch (e) {  
            bln = false;  
        }  
        return bln;  
    };  
    //获取指定KEY的元素值VALUE，失败返回NULL  
    this.get = function(_key) {  
        try {  
            for (i = 0; i < this.elements.length; i++) {  
                if (this.elements[i].key == _key) {  
                    return this.elements[i].value;  
                }  
            }  
        } catch (e) {  
            return null;  
        }  
    };  
    //获取指定索引的元素（使用element.key，element.value获取KEY和VALUE），失败返回NULL  
    this.element = function(_index) {  
        if (_index < 0 || _index >= this.elements.length) {  
            return null;  
        }  
        return this.elements[_index];  
    };  
    //判断MAP中是否含有指定KEY的元素  
    this.containsKey = function(_key) {  
        var bln = false;  
        try {  
            for (i = 0; i < this.elements.length; i++) {  
                if (this.elements[i].key == _key) {  
                    bln = true;  
                }  
            }  
        } catch (e) {  
            bln = false;  
        }  
        return bln;  
    };  
    //判断MAP中是否含有指定VALUE的元素  
    this.containsValue = function(_value) {  
        var bln = false;  
        try {  
            for (i = 0; i < this.elements.length; i++) {  
                if (this.elements[i].value == _value) {  
                    bln = true;  
                }  
            }  
        } catch (e) {  
            bln = false;  
        }  
        return bln;  
    };  
    //获取MAP中所有VALUE的数组（ARRAY）  
    this.values = function() {  
        var arr = new Array();  
        for (i = 0; i < this.elements.length; i++) {  
            arr.push(this.elements[i].value);  
        }  
        return arr;  
    };  
    //获取MAP中所有KEY的数组（ARRAY）  
    this.keys = function() {  
        var arr = new Array();  
        for (i = 0; i < this.elements.length; i++) {  
            arr.push(this.elements[i].key);  
        }  
        return arr;  
    };  
}  

/**
 *	经纬度转换成三角函数中度分表形式
 * @param d
 * @returns {Number}
 */
function Rad(d){	
    return d * Math.PI / 180.0;
 }

/**
 * 	根据经纬度计算两点的距离
 * @param lat1
 * @param lng1
 * @param lat2
 * @param lng2
 * @returns {Number}
 */
function get_distance(lat1,lng1,lat2,lng2){	 	
    var radLat1 = Rad(lat1);
    var radLat2 = Rad(lat2);
    var a = radLat1 - radLat2;
    var  b = Rad(lng1) - Rad(lng2);
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2) +
    Math.cos(radLat1)*Math.cos(radLat2)*Math.pow(Math.sin(b/2),2)));
    s = s *6378.137 ;// EARTH_RADIUS;
    s = Math.round(s * 10000) / 10000; //输出为公里
    //s=s.toFixed(4);
    return s;
}

/*
 * $(function(){ //显示路径点 var points = input_path.split(";");
 * alert(points.length); for(i=0;i<points.length;i++){ var bpoint = new
 * BMap.Point(points[i].split(",")[0],points[i].split(",")[1]); var marker = new
 * BMap.Marker(bpoint); map.addOverlay(marker); var infoWindow = new
 * BMap.InfoWindow(points[i], opts); // 创建信息窗口对象
 * marker.addEventListener("click", function(){
 * map.openInfoWindow(infoWindow,point); //开启信息窗口 }); } })
 */

