

var app = angular.module("LearningHub",[]);

app.controller('MainController', ['$rootScope', '$scope', '$http', function ($rootScope, $scope, $http) {
    $scope.index = [];
    $scope.CoursesVotes = JSON.parse(localStorage.getItem('CoursesVotes')) || [];
    $http.get('https://hackerearth.0x10.info/api/learning-paths?type=json&query=list_paths')
    .then(function (response) {
        $scope.courses = response.data;
        $scope.initialAdjust();
    }, function (error) {
    });
    $scope.upVote = function (item) {
        item.up_votes += 1;
        item.total_votes += 1;
        for (var i = 0; i < $scope.CoursesVotes.length; i++) {
            if (item.id == $scope.CoursesVotes[i].id) {
                $scope.CoursesVotes[i].total_votes += 1;
                $scope.CoursesVotes[i].up_votes += 1;
                break;
            }
        }
        $scope.saveVotes();
    }
    $scope.downVote = function (item) {
        item.down_votes += 1;
        item.total_votes += 1;
        for (var i = 0; i < $scope.CoursesVotes.length; i++) {
            if (item.id == $scope.CoursesVotes[i].id) {
                $scope.CoursesVotes[i].total_votes += 1;
                $scope.CoursesVotes[i].down_votes += 1;
                break;
            }
        }
        $scope.saveVotes();
    }

    $scope.saveVotes = function () {
        localStorage.removeItem('CoursesVotes');
        temp = JSON.stringify($scope.CoursesVotes);
        localStorage.setItem('CoursesVotes', temp);
    }
    $scope.viewDetails = function (Item) {
        $scope.selectedItem = Item;
        $scope.viewDetailCourse = true;
        document.getElementById('detail-overlay').style.display = "block";
      }
    $scope.hideDetails = function (Item) {
        $scope.selectedItem = {};
        document.getElementById('detail-overlay').style.display = "none";
      }
    $scope.initialAdjust = function () {
        for (var i = 0; i < $scope.courses.paths.length; i++) {
            var j = 0;
            for (j = 0; j < $scope.CoursesVotes.length; j++) {
                if ($scope.courses.paths[i].id == $scope.CoursesVotes[j].id) {
                    $scope.courses.paths[i].total_votes = $scope.CoursesVotes[j].total_votes;
                    $scope.courses.paths[i].up_votes = $scope.CoursesVotes[j].up_votes;
                    $scope.courses.paths[i].down_votes = $scope.CoursesVotes[j].down_votes;
                    break;
                }
            } if (j == $scope.CoursesVotes.length) {
                $scope.courses.paths[i].total_votes = 0;
                $scope.courses.paths[i].up_votes = 0;
                $scope.courses.paths[i].down_votes = 0;

                var obj = {
                    id: $scope.courses.paths[i].id,
                    total_votes: 0,
                    up_votes: 0,
                    down_votes: 0
                };
                $scope.CoursesVotes.push(obj);
            }
            var hrs = $scope.courses.paths[i].hours;
            $scope.courses.paths[i].duration = parseFloat(hrs.substr(0, hrs.length - 1));
            var learners = $scope.courses.paths[i].learner;
            var comma = learners.indexOf(',');
            var learnerCount = learners.substr(0, comma) + learners.substr(comma + 1);
            $scope.courses.paths[i].learners_count = parseInt(learnerCount);
        }
    }

} ]);


