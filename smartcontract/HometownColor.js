"use strict";

var HometownColor = function() {
    LocalContractStorage.defineMapProperty(this, "HometownData"); //Store the admin wallet address
};

var mergerColor = function(c1, c2){
	c1=c1.substr(1);
	c2=c2.substr(1);
	
	var result="#";
	for(var i=0;i<6;i++){
		var a = parseInt(c1.charAt(i),16);
		var b = parseInt(c2.charAt(i),16);
		result += parseInt((a+b)/2).toString(16);
	}
	
	return result;
};

var dataMap = [{
            name: '北京'
        },
        {
            name: '天津'
        },
        {
            name: '上海'
        },
        {
            name: '重庆'
        },
        {
            name: '河北'
        },
        {
            name: '河南'
        },
        {
            name: '云南'
        },
        {
            name: '辽宁'
        },
        {
            name: '黑龙江'
        },
        {
            name: '湖南'
        },
        {
            name: '安徽'
        },
        {
            name: '山东'
        },
        {
            name: '新疆'
        },
        {
            name: '江苏'
        },
        {
            name: '浙江'
        },
        {
            name: '江西'
        },
        {
            name: '湖北'
        },
        {
            name: '广西'
        },
        {
            name: '甘肃'
        },
        {
            name: '山西'
        },
        {
            name: '内蒙古'
        },
        {
            name: '陕西'
        },
        {
            name: '吉林'
        },
        {
            name: '福建'
        },
        {
            name: '贵州'
        },
        {
            name: '广东'
        },
        {
            name: '青海'
        },
        {
            name: '西藏'
        },
        {
            name: '四川'
        },
        {
            name: '宁夏'
        },
        {
            name: '海南'
        },
        {
            name: '台湾'
        },
        {
            name: '香港'
        },
        {
            name: '澳门'
        }];
		
HometownColor.prototype = {
    init: function() {		
		for(var i=0;i<dataMap.length;i++){
			dataMap[i].color = "#FFFFFF";
			dataMap[i].num = 0;
			this.HometownData.put(dataMap[i].name, dataMap[i]);
		}

    },

    getAll: function() {
		var result = [];
        for(var i=0;i<dataMap.length;i++){
			result.push(this.HometownData.get(dataMap[i].name));
		}
		return result;
    },
	
	merge: function(name, color){
		name = name.trim();
		color = color.trim();
		if(!name){
			throw new Error("empty name");
		}
		
		if(!color){
			throw new Error("empty color");
		}
		
		var obj = this.HometownData.get(name);
		obj.color = mergerColor(obj.color, color);
		obj.num += 1;
		this.HometownData.put(name, obj);
		
	}

};

module.exports = HometownColor;