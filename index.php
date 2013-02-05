<!DOCTYPE html>
<html>
        <head>
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">
                <meta name="apple-mobile-web-app-capable" content="yes">
                <meta name="apple-mobile-web-app-status-bar-style" content="black">
                <title></title>
                <!-- CSS files -->
                <link rel="stylesheet" href="css/facebookSliderMenu.css" type="text/css" media="screen" title="no title" charset="utf-8" />
                <link rel="stylesheet" href="css/bootstrap.min.css" type="text/css" media="screen" title="no title" charset="utf-8" />
                <link rel="stylesheet" href="css/bootstrap-responsive.min.css" type="text/css" media="screen" title="no title" charset="utf-8" />
                <!-- JS files -->
                <script type="text/javascript" src="js/jquery-1.9.0.js"></script>
                <script type="text/javascript" src="js/jquery-easing.1.3.js"></script>
                <script type="text/javascript" src="js/bootstrap.min.js"></script>
                <script type="text/javascript" src="js/facebookSliderMenu-1.0.0.js"></script>
        </head>
        <body>
                <!-- GLOBAL CONTAINER -->
                <div id="fbs-app-container">
                        <!-- BACKGROUND MENU -->
                        <div id="fbs-menu-container" class="gradient-dark">
                                <div id="fbs-menu-header" class="fbs-header fbs-header-dark gradient-dark">
                                        <h1>Menu Header</h1>
                                </div>
                        </div>
                        <!-- ! BACKGROUND MENU -->
                        <!-- SITE CONTAINER -->
                        <div id="fbs-main-content-container" class="gradient-light">
                                <div id="fbs-main-content-header" class="fbs-header fbs-header-with-icon fbs-header-light gradient-light">
                                        <a id="fbs-menu-btn" class="btn btn-large" href="#"></a>
                                        <h1>Main Content Page Header</h1>
                                </div>
                        </div>
                        <!-- ! SITE CONTAINER -->
                </div>
                <!-- ! GLOBAL CONTAINER -->
        </body>
        <script>
                $("#fbs-main-content-container").facebookSliderMenu();
        </script>
</html>
