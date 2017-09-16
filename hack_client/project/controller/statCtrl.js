angular.module('app').controller('statCtrl', ['$scope','$http', 'Authentication', function ($scope,$http, Authentication) {
    
    console.log('statCtrl controler')
    
    $scope.loggedInUser = JSON.parse(sessionStorage.getItem("userInfo")).name
    $scope.selleraddcart = false;
       if(sessionStorage.getItem('role').toLowerCase() == 'user'){
        $scope.selleraddcart = true;
      }
 $scope.openNavi = function(){
     document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    document.getElementById("open").style.display = "none";
     
 }
 $scope.closeNavi = function(){
     document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
    document.getElementById("open").style.display = "block"
     
 }
 
 var graphData = []
 
  $scope.viewMyBid = function(){
      
var uri = ''
    data = {"sellerId":JSON.parse(sessionStorage.getItem("userInfo"))._id};
    uri =  Authentication.serverUrl+"/getActiveAuctionList"
$http.post(uri,data).then(function successCallback(response) {
                console.log(JSON.stringify(response));
                if (response.data.success) {
                   $scope.getMyBids = response.data.myList;
                    $scope.getMyBids.forEach(function(value, key){
                        graphData.push({"label":value.chocoName+", StartingPrice: "+ value.startingPrice,"value": value.highBid});
                        console.log(graphData,'graphDatagraphData')
                        if(key == $scope.getMyBids.length - 1) {
                            console.log(graphData,'graphDatagraphDatagraphData') 
                        }
                    })
                } else {
                    alert("unable to fetch the list");
                }
            }, function errorCallback(err) {
                alert("Server Error");
            });
 }
  $scope.viewMyBid()
  var loadChart = function() {
      $scope.dataSource = {
            "chart": {
              "caption": "Current Auction Item",
              "captionFontSize": "30",
              "xAxisName": "choclate name with inital Bid Price",
              "yAxisName": "Price (in INR)",
              // more chart properties - explained later
            },
            "data": graphData
          };
  }
  loadChart();
    $scope.$watch('graphData', function(graphData) {
       loadChart();
    });
    
  var countData = [] 
$scope.getBidCount = function(){
      
var uri = ''
    data = {"sellerId":JSON.parse(sessionStorage.getItem("userInfo"))._id};
    uri =  Authentication.serverUrl+"/getBidCount"
$http.post(uri,data).then(function successCallback(response) {
                console.log(JSON.stringify(response));
                if (response.data.success) {
                   $scope.getMyBids = response.data.myList;
                    $scope.getMyBids.forEach(function(value, key){
                        countData.push({"label": "Total Bid Count For "+value.chocoName+" ","value": value.myBidCount});
                        console.log(countData,'graphDatagraphData')
                        if(key == $scope.getMyBids.length - 1) {
                            console.log(countData,'graphDatagraphDatagraphData') 
                        }
                    })
                } else {
                    alert("unable to fetch the list");
                }
            }, function errorCallback(err) {
                alert("Server Error");
            });
 }
 
$scope.getBidCount()
  var loadCountChart = function() {
      $scope.dataSourceCount = {
            "chart": {
              "caption": "Total No of bids for your auction items",
              "captionFontSize": "30",
                "showPercentValues": "1",
                "showLegend": "1",
                "numberPrefix": "$",
              // more chart properties - explained later
            },
            "data": countData
          };
  }
  loadCountChart();
    $scope.$watch('countData', function(graphData) {
       loadCountChart();
    });
   
    
//  nv.addGraph(function() {
//        var chart = nv.models.lineChart();
//        var fitScreen = false;
//        var width = 600;
//        var height = 300;
//        var zoom = 1;
//
//        chart.useInteractiveGuideline(true);
//        chart.xAxis
//            .tickFormat(d3.format(',r'));
//
//        chart.lines.dispatch.on("elementClick", function(evt) {
//            console.log(evt);
//        });
//
//        chart.yAxis
//            .axisLabel('x')
//            .tickFormat(d3.format(',.2f'));
//
//        d3.select('#chart1 svg')
//            .attr('perserveAspectRatio', 'xMinYMid')
//            .attr('width', width)
//            .attr('height', height)
//            .datum(sinAndCos());
//
//        setChartViewBox();
//        resizeChart();
//
//        nv.utils.windowResize(resizeChart);
//
//        d3.select('#zoomIn').on('click', zoomIn);
//        d3.select('#zoomOut').on('click', zoomOut);
//
//
//        function setChartViewBox() {
//            var w = width * zoom,
//                h = height * zoom;
//
//            chart
//                .width(w)
//                .height(h);
//
//            d3.select('#chart1 svg')
//                .attr('viewBox', '0 0 ' + w + ' ' + h)
//                .transition().duration(500)
//                .call(chart);
//        }
//
//        function zoomOut() {
//            zoom += .25;
//            setChartViewBox();
//        }
//
//        function zoomIn() {
//            if (zoom <= .5) return;
//            zoom -= .25;
//            setChartViewBox();
//        }
//
//        // This resize simply sets the SVG's dimensions, without a need to recall the chart code
//        // Resizing because of the viewbox and perserveAspectRatio settings
//        // This scales the interior of the chart unlike the above
//        function resizeChart() {
//            var container = d3.select('#chart1');
//            var svg = container.select('svg');
//
//            if (fitScreen) {
//                // resize based on container's width AND HEIGHT
//                var windowSize = nv.utils.windowSize();
//                svg.attr("width", windowSize.width);
//                svg.attr("height", windowSize.height);
//            } else {
//                // resize based on container's width
//                var aspect = chart.width() / chart.height();
//                var targetWidth = parseInt(container.style('width'));
//                svg.attr("width", targetWidth);
//                svg.attr("height", Math.round(targetWidth / aspect));
//            }
//        }
//        return chart;
//    });

    function sinAndCos() {
        var sin = [],
            cos = [];

        for (var i = 0; i < 100; i++) {
            sin.push({x: i, y: Math.sin(i/10) });
            cos.push({x: i, y: .5 * Math.cos(i/10)});
        }

        return [
            {
                values: sin,
                key: "Sine Wave",
                color: "#ff7f0e"
            },
            {
                values: cos,
                key: "Cosine Wave",
                color: "#2ca02c"
            }
        ];
    }

    
}]);


