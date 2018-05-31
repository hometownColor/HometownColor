
var dappAddress = "n1uepEYBWrzfS1ZGABxhDKBginmDyTuuva7";
$(function() {

    load();
});



function load() {
    var NebPay = require("nebpay"); //https://github.com/nebulasio/nebPay
    var nebpay = new NebPay();

    var to = dappAddress;
    var value = "0";
    var callFunction = "getAll";
    var callArgs = "[]";
    nebpay.simulateCall(to, value, callFunction, callArgs, {
        listener: function(resp) {
            //console.log(JSON.stringify(resp.result));
            if (resp.result == "" || resp.result == null) {
                return;
            }
            myArr = JSON.parse(resp.result);

            // 全国省份列表
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
            }]
            // 需要在页面上直接标记出来的城市
            /*
	var specialMap = ['浙江', '云南', '陕西'];
    // 对dataMap进行处理，使其可以直接在页面上展示
    for (var i = 0; i < specialMap.length; i++) {
        for (var j = 0; j < dataMap.length; j++) {
            if (specialMap[i] == dataMap[j].name) {
                dataMap[j].selected = true;
                break;
            }

        }
    }
	*/
            // 绘制图表，准备数据
            var option = {
				series: [{
                    name: '中国',
                    type: 'map',
                    mapType: 'china',
                    selectedMode: 'single',
					//silent: true,
					
                    label: {
                        normal: {
                            show: true,
                            //显示省份标签
                            // textStyle:{color:"#c71585"}//省份标签字体颜色
                        },
                        emphasis: {
                            show: true,
                            //对应的鼠标悬浮效果
                            // textStyle:{color:"#800080"}
                        }
                    },
                    itemStyle: {
                        normal: {
                            borderWidth: .5,
                            //区域边框宽度
                            // borderColor: '#009fe8',//区域边框颜色
                            //areaColor:"#ffefd5",//区域颜色
                            color: function(params) {
                                return myArr[params.dataIndex].color;
                            }
                        },
                        emphasis: {
                            borderWidth: .5,
                            //区域边框宽度
                            // borderColor: '#009fe8',//区域边框颜色
                            //areaColor:"#ffefd5",//区域颜色
                            areaColor: function(params) {
                                return myArr[params.dataIndex].color;
                            }
                        }

                    },
                    data: dataMap
                }]
            };
            //初始化echarts实例
            var myChart = echarts.init(document.getElementById('container'));
            myChart.on('click',
            function(params) {
                var str='<font size="6">'+params.name+'</font>&nbsp;&nbsp;目前共有&nbsp;'+myArr[params.dataIndex].num+'&nbsp;人分享过<label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;我心中的颜色</label>&nbsp;&nbsp;<input type="text" id="cellColor" style="width:80px"/>&nbsp;&nbsp;<button type="submit" class="btn btn-default" id="savebutton" onclick="save('+"'"+params.name+"'"+');">分享</button>';
				$("#displayarea").html(str);
				$("#cellColor").spectrum({
					color: myArr[params.dataIndex].color, disabled: false
				});
				
				params.color = myArr[params.dataIndex].color;

                //TODO
            });
            //使用制定的配置项和数据显示图表
            myChart.setOption(option);

        }
    });

}



function save(name){
        var NebPay = require("nebpay"); //https://github.com/nebulasio/nebPay
        var nebpay = new NebPay();

        var to = dappAddress;
        var name = name;
        var cellColor = $("#cellColor").spectrum("get").toHexString();
        
        var value = "0";
        var callFunction = "merge";

        var callArgs = '["' + name + '","' + cellColor + '"]';
        nebpay.call(to, value, callFunction, callArgs, {
            listener: function(resp) {
                console.log(JSON.stringify(resp.result));
                alert("操作成功，请刷新页面，查看效果");
            }
        });
}