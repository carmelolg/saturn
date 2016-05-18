angular.module( 'saturnApp' ).run( [ '$rootScope', '$location', '$window', '$localStorage',
  function ( $rootScope, $location, $window, $localStorage ) {
    $rootScope
      .$on( '$stateChangeSuccess',
        function ( event ) {

          /* GA */
          try {
            // only if there is the gaUser and ga is defined
            if ( !$localStorage.gaUser || !$window.ga ) {
              return;
            }

            // get tracker to send data
            var trackerGa = $localStorage.gaUser + '';
            trackerGa = trackerGa.replace( /-/g, '' );

            // create the ga with the gaUser and tracker
            $window.ga( 'create', $localStorage.gaUser, 'auto', trackerGa );

            // get sender
            var sendUser = trackerGa + '.' + 'send';

            // invio il send page
            $window.ga( sendUser, 'pageview', {
              page: $location.path()
            } );
          } catch ( e ) {
            console.error( e );
          } finally {
          }
        } );
  }
] );
