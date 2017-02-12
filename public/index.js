angular.module('app', ['ngRoute', 'ui.grid', 'ui.grid.edit'])

// routing to handle navigation
.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'hello.html'
    })
    .when('/helloworld', {
      templateUrl: 'hello.html'
    })
    .when('/window', {
      templateUrl: 'window.html',
      controller: 'windowController'
    })
    .when('/capitals', {
      templateUrl: 'capitals.html',
      controller: 'capitalController'
    })
    // edit is it's own page and id is passed in as params
    .when('/edit/:id', {
      templateUrl: 'edit.html',
      controller: 'editController'
    })
    .when('/capitalgrid', {
      templateUrl: 'capitalgrid.html',
      controller: 'capitalController'
    })
})

.controller('appController', function($scope, $location) {
  // contact me!!
  $scope.contact = {
    name: 'Daniel Chang',
    email: 'chang.daniel@gmail.com'
  };

  // for capitals portion - just using in memory
  $scope.states = [
    {'state': 'California', 'capital': 'Sacramento'},
    {'state': 'Texas', 'capital': 'Austin'},
    {'state': 'Oregon', 'capital': 'Eugene'},
    {'state': 'Colorado', 'capital': 'Denver'},
    {'state': 'Hawaii', 'capital': 'Honolulu'},
    {'state': 'Washington', 'capital': 'Olympia'},
    {'state': 'Wisconsin', 'capital': 'Madison'},
    {'state': 'Michigan', 'capital': 'Lansing'},
    {'state': 'Maine', 'capital': 'Augusta'},
    {'state': 'Maryland', 'capital': 'Annapolis'}
  ];

  // used to determine active tab in the nav bar
  $scope.getNavClass = function(path) {
    return ($location.path().substr(0, path.length) === path) ? 'active navitem' : 'navitem';
  }
})

.controller('windowController', function($scope, $window) {
  // setting initial values
  $scope.height = $window.innerHeight;
  $scope.width = $window.innerWidth;

  angular.element($window).bind('resize', function() {
    $scope.$apply(function() {
      $scope.height = $window.innerHeight;
      $scope.width = $window.innerWidth;
    })
  })
})

// controller shared by both capital and capitalgrid
.controller('capitalController', function($scope) {
  $scope.entry = {
    state: '',
    capital: ''
  }

  $scope.add = function() {
    $scope.states.push($scope.entry)
  }

  $scope.gridOptions = {enableColumnMenus: false}
  $scope.gridOptions.data = $scope.states
  $scope.gridOptions.columnDefs = [
    {name: 'state', enableCellEdit: false},
    {name: 'capital', displayName: 'Capital (editable)', enableCellEdit: true, width: '50%'},
    {name: 'delete', cellTemplate: '<button ng-click="grid.appScope.deleteRow(row)" class="grid_delete">Delete</button>', enableCellEdit: false, width: '15%'}
  ]

  $scope.deleteRow = function(row) {
    var index = $scope.states.indexOf(row.entity);
    $scope.states.splice(index, 1);
  };

})

.controller('editController', function($scope, $location, $routeParams) {
  $scope.editEntry = $scope.states[$routeParams.id]
  idx = $routeParams.id

  $scope.saveCapital = function(newCapital) {
    $scope.states[idx].capital = newCapital
    $location.path('/capitals')
  }

  $scope.delete = function() {
    $scope.states.splice(idx, 1)
    $location.path('/capitals')
  }

  $scope.cancel = function() {
    $location.path('/capitals')
  }

})