var weatherLoggingApp = angular.module('weatherLoggingApp', []);

function mainController($scope, $http) {
	$scope.formData = {};

	$http.get('/api/logs')
		.success(function(data) {
			$scope.logs = data;
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});


	$scope.addTemp = function() {
		$http.post('/api/addTemp', $scope.formData)
			.success(function(data) {
				$scope.formData = {};
				$scope.logs = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

	$scope.deleteLog = function(id) {
		$http.delete('/api/logs/' + id)
			.success(function(data) {
				$scope.logs = data;
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

    $scope.getAverage = function(logs) {
		var total = 0;
		var count = 0;
		var logLength = logs.length;
		if(logLength<1){
			return "";
		}
        for(var i=0;i<logLength;i++){
            total += logs[i].temp;
            count++;
        }
    	return (total/count).toFixed(1);
	}

	$scope.getHighest = function(logs) {
		var high = 0;
		var logLength = logs.length;
		for(var i=0;i<logLength;i++){
			if(high<logs[i].temp){
				high = logs[i].temp;
			}
		}
		if(high==0){
			return "";
		}else {
			return high;
		}
	}

	$scope.getLowest = function(logs) {
		var low = 0;
		var logLength = logs.length;
		for(var i=0;i<logLength;i++){
			if(i==0){
				low = logs[i].temp;
				continue;
			}
			if(low>logs[i].temp){
				low = logs[i].temp;
			}
		}
		if(low==0){
			return "";
		}else {
			return low;
		}
	}

	$scope.getMedian = function(logs) {
		var low = 0;
		var logLength = logs.length;
		if(logLength<1){
			return "";
		}
		var even = false;
		var temps = [];
		if(logLength%2==0){
			even = true;
		}
		for(var i=0;i<logLength;i++) {
			temps.push(logs[i].temp);
		}
		temps.sort(function(a,b) { return a-b; });
		if(even){
			var middle1 = temps[Math.round(logLength/2)-1];
			var middle2 =temps[Math.round(logLength/2)];

			return ((middle1+middle2)/2);

		}else{
			var middle = temps[Math.round(logLength/2)-1];
			return middle;
		}
	}
}
