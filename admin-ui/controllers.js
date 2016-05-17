(function(){
  console.log('before controllers declaration');
  var app = angular.module('controllers', ['ngFileUpload', 'Services']);
  
  console.log('after controllers declaration');
    app.controller('FormCtrl', ['$scope','$http','$location', '$window','$state', 'AuthenticationService',function($scope,$http,$location, $window, $state, AuthenticationService) {
        console.log("in login contoller");
        /*if(!AuthenticationService.isAuthenticated){
          $state.go('home');
        }*/

        if(AuthenticationService.isAuthenticated) $state.go('dashboard');

        $scope.user = {
            email_or_phone: '',
            password: ''
          };

        $scope.login = function() {

          if($scope.user.email_or_phone !== undefined && $scope.user.password !== undefined){
            console.log("Login Access success");
            $http.post('/login', $scope.user).success(function(response) {
              console.log("envois d une requete");
              if(response == 1){
                $scope.user.message="Utilisateur n'existe pas !!";
              }
              else if(response == 2){
                console.log('mot de passe incorect');
                $scope.user.message="Mot de passe n'est pas correct !!";
              }
              else{
                console.log('authentification reussi');
                $window.sessionStorage.isAuthenticated = true;
                AuthenticationService.isAuthenticated = true;
                $window.sessionStorage.token = response.token;
                console.log('test');
                $location.path("/dashboard");
              }
              }).error(function(status, data) {
                console.log('erreurrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr');
                $scope.user.message="ggggggggggggggggggggggggggg";
                console.log(data);
                });
          }
          else{
           $state.go('home');   
           user.messge = 'case vide';
          }
        }
    }]);

    app.controller('dashboardCtrl', ['Upload', '$scope','$http','$location', '$window','$state', 'AuthenticationService', function(Upload, $scope,$http,$location, $window, $state, AuthenticationService){
        console.log('in dashbordCtrl' + AuthenticationService.isAuthenticated);
        if(!AuthenticationService.isAuthenticated) $state.go('home');

    }]);

    /*app.controller('wysiwygCtrl', ['$scope','$http','$location', '$window','$state', 'AuthenticationService', function($scope,$http,$location, $window, $state, AuthenticationService){
        console.log('in dashbordCtrl' + AuthenticationService.isAuthenticated);
        if(!AuthenticationService.isAuthenticated) $state.go('home');

    }]);*/

    /*app.controller('uploadImageCtrl', ['Upload','$scope','$http','$location', '$window','$state', 'AuthenticationService', function(Upload, $scope,$http,$location, $window, $state, AuthenticationService){
        console.log('in uploadImageCtrl');
        $scope.file;
        var vm = this;

        var upload = function (file) {
          console.log('in upload function');
            Upload.upload({
                url: 'http://localhost:8080/upload', //webAPI exposed to upload the file
                data:{file:file} //pass file as data, should be user ng-model
            }).then(function (resp) { //upload function returns a promise
                if(resp.data.error_code === 0){ //validate success
                    $window.alert('Success ' + resp.config.data.file.name + 'uploaded. Response: ');
                } else {
                    $window.alert('an error occured');
                }
            }, function (resp) { //catch error
                console.log('Error status: ' + resp.status);
                $window.alert('Error status: ' + resp.status);
            }, function (evt) { 
                console.log(evt);
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                vm.progress = 'progress: ' + progressPercentage + '% '; // capture upload progress
          });
        };
        

        $scope.submit = function(file){ //function to call on form submit
          console.log('in submit');
            if (vm.upload_form.file.$valid && vm.file) { //check if from is valid
                upload(vm.file); //call upload function
            }
            if($scope.file) upload(file);
        }



        
    }]);*/

    //cette directive permet de faire la liaison avec le tag qui contient l'image
    app.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            
            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
          }
        };
    }]);

    //ce service sera utiliser dans le controller pour uploader un fichier
    app.service('fileUpload', ['$http', function ($http) {
    this.uploadFileToUrl = function(file, uploadUrl){
        var fd = new FormData();
        for(var key in file)
          fd.append(key, file[key]);
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
           // enctype: 'multipart/form-data'
        })
        .success(function(){
          console.log('success')
        })
        .error(function(){
          console.log('error')
        });
      }
    }]);

    //upload image controller
    //

     app.controller('myCtrl', ['$scope', 'fileUpload', function($scope, fileUpload){
            $scope.uploadFile = function(){
               var file = $scope.myFile;
               
               console.log('file is ' );
               console.dir(file);
               console.log($scope.data);
               
               var uploadUrl = "/upload";
               fileUpload.uploadFileToUrl($scope.data, uploadUrl);
            };
         }]);

/*app.controller('MainController', ['$scope', 'Upload', function($scope, Upload) {

$scope.uploadFile = function(){
  console.log('in uploadFile');
 $scope.fileSelected = function(files) {
     if (files && files.length) {
        $scope.file = files[0];
     }

     Upload.upload({
       url: '/upload',     //node.js route
       file: $scope.file
     })
     .success(function(data) {
       console.log(data, 'uploaded');
      });

    };
};
}]);*/




        app.controller('UpdateCtrl', ['$scope','$http','$location','GetName','AuthenticationService',function($scope,$http,$location,GetName,AuthenticationService) {
            console.log("access to console update");
            var user = GetName.user;
            $http.get('./update/'+user).success(function(response) {
              $scope.email = response.email_or_phone;
              $scope.firstname = response.first_name;
              $scope.lastname = response.last_name;
            });
            $scope.update = function() {
              $scope.message="";
              if (!AuthenticationService.isAuthenticated) {
                $location.path("/admin");
            }
            else {
              var user = {
                  email_or_phone: $scope.email,
                  firstname: $scope.firstname,
                  lastname: $scope.lastname,
                  password: $scope.password
              }
              console.log(user);
                $http.post('./update', user).success(function(response) {
                    console.log(response);
                    if(response == 0){
                      $scope.message="invalid mot de pass"
                    }else if(response == 1){
                      $scope.message="@ email n'est pas correct"
                    }else {
                    $location.path("update");
                    }
                }).error(function(status, data) {
                    console.log(status);
                    console.log(data);
                });
            }
        };
        $scope.reset = function(){
          var user = GetName.user;
          $http.get('./update/'+user).success(function(response) {
            $scope.email = response.email_or_phone;
            $scope.firstname = response.first_name;
            $scope.lastname = response.last_name;
          });
          $scope.password=""
          $scope.message=""
        };
        }]);

        app.controller('NavCtrl', ['$scope','$window','GetName','AuthenticationService','$http','$location',function($scope,$window,GetName,AuthenticationService,$http,$location) {
          $scope.token = function() {
            if (!AuthenticationService.isAuthenticated && !$window.sessionStorage.token){
             return true;
            }
            else{
              $scope.username=GetName.user;
              return false;
            };
          };
          $scope.logout = function() {
              $http.get('./logout').success(function(data){
                console.log('ttttt');
                AuthenticationService.isAuthenticated = false;
                $window.sessionStorage.clear();
                $location.path("./");
              });
          };
        }]);

        //ajouter une histoire
        app.controller('addStoryCtrl', ['$scope', '$http', function($scope, $http){
          $scope.resp='';
          $scope.title = {
            content : $scope.resp,
            storyId:'',
            titleH:'' 
          }
          //$scope.data.storyId=""
          
          console.log('in addStoryCtrl');
          $scope.newStory = function(){
            console.log('nouvelle hist');
            $http.get('/newStory')
            .success(function(res){
              $scope.title.storyId = res;
              console.log($scope.title.storyId);
            })
            .error(function(status, data){
                console.log(err);
              });
          };


            $scope.froalaOptions = {
                toolbarButtons : []
            }

            //$scope.data ={};
              
            $scope.speLinks = function(){
            console.log($scope.data);
              console.log('in defaultLink');
              $http.post('/speLinks', $scope.title)
              .success(function(res){
                $scope.resp = res;
                console.log(res);
                $scope.title.content = res;
                $scope.title.msg = res;
                $scope.title.titleH = res;
              })
              .error(function(status, data){
                console.log(err);
              });

            }
            $scope.m = false;
            $scope.enregistrerTitre = function(){
            console.log($scope.data);
              console.log('in enregistrerTitre');
              $http.post('/enregistrerTitre', $scope.data)
              .success(function(res){
                console.log(res);
                $scope.title.msg = res;
              })
              .error(function(status, data){
                console.log(err);
              });

            }
        }]);


        app.controller('addPartCtrl', ['$scope', '$http', '$stateParams', '$state', function($scope, $http, $stateParams, $state){
          console.log('in addPartCtrl');
          var x1 = '<p>Karim est un <a data-toggle='
          $scope.part={
            content:'',
            msg:'',
            x:''
          };


          $scope.id_story = $stateParams.id_story;
           $scope.N = 0;
          var x = {id_story:$scope.id_story};
          $http.post('/nberOfParts', x)
            .success(function(res){
              N = res;
              console.log('N:',N);
            })
            .error(function(status, data){
                console.log(err);
            });
          console.log('id:', $scope.id_story);

          $scope.speLinks = function(){
            
              console.log('in speLink');
              $http.post('/speLinks', $scope.part)
              .success(function(res){
                console.log('part:', res);
                if(res){
                  $scope.part.content = res;

                  //$state.go('add_part', {res}, {reload: true});
                }

                $scope.part.msg = res;
                //$scope.data.titleH = res;
              })
              .error(function(status, data){
                console.log(err);
              });

          }
        }]);


        /*app.run(['$window','GetName','AuthenticationService','$location', function ($window,GetName,AuthenticationService,$location) {
          console.log('in app.run function');
          if(GetName.admin == false){
            AuthenticationService.isAuthenticated = false;
            $window.sessionStorage.clear();
            //$location.path("login");
          }
          else{
            if($window.sessionStorage.isAuthenticated){
              AuthenticationService.isAuthenticated = true;
            }
          }
        }]);*/
  })();
