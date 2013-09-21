angular.module('SPAAuth', [])
    .run(['$rootScope', '$window', 'sessionService',
        function ($rootScope, $window, sessionService) {
        $rootScope.session = sessionService;
        $window.app = {
            authState: function(state, user) {
                $rootScope.$apply(function() {
                    switch (state) {
                        case 'success':
                            sessionService.authSuccess(user);
                            break;
                        case 'failure':
                            sessionService.authFailed();
                            break;
                    }
                    
                });
            }
        };

        if ($window.user !== null) {
            sessionService.authSuccess($window.user);
        }
    }]);