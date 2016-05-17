(function(){
  var app = angular.module('Routes', ['Services']);

    app.config(function($stateProvider, $urlRouterProvider){
      $stateProvider
        .state("home",{
          url:"/",
          templateUrl: "views/login.html",
          access: {requiredAuthentication: false },
          controller: 'FormCtrl'
        })
        .state("dashboard",{
          url:"/dashboard",
          templateUrl: "views/accueil.html",
          access: { requiredAuthentication: false },
          controller: 'dashboardCtrl'
        })
        .state("upload_image",{
          url:"/upload_image",
          templateUrl: "views/upload_image.html",
          access: { requiredAuthentication: false },
          controller:'myCtrl'
        })
        .state("add_story",{
          url:"/add_story",
          templateUrl: "views/wswg.html",
          access: { requiredAuthentication: false },
          controller:'addStoryCtrl'
        })
        .state("add_part",{
          url:"/add_part/:id_story",
          templateUrl: "views/part.html",
          access: { requiredAuthentication: false },
          controller:'addPartCtrl'
        })
        $urlRouterProvider.otherwise("/");
    })
    /*app.run(function($rootScope, $location, $window, $state,AuthenticationService) {
        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
          if (!AuthenticationService.isAuthenticated && toState.access.requiredAuthentication && !$window.sessionStorage.token){
           event.preventDefault();
           $state.go('login');
       }
        });
    });*/
  })();
