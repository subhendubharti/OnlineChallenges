var datamodule=angular.module("LearningHubData",[]);
datamodule.service("DataService",['$http',function($http){
    var getData=function(callback){
        $http.get('https://hackerearth.0x10.info/api/learning-paths?type=json&query=list_paths')
    .then(function (response) {
        callback(response.data);
        }, function (error) {
            
    });
        
    };
    this.getData=getData;
}]);