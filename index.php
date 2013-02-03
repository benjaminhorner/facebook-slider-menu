<!DOCTYPE html>
<html>
        <head>
                <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                <title></title>
                <!-- JS files -->
                <script type="text/javascript" src="js/jquery-1.9.0.js"></script>
                <script type="text/javascript" src="js/bocetoSlider-1.0.0.js"></script>
                <!-- CSS files -->
                <link rel="stylesheet" href="css/bocetoSlider.css" type="text/css" media="screen" title="no title" charset="utf-8" />
        </head>
        <body>
                <!-- GLOBAL CONTAINER -->
                <div id="bocetoSlider-container">
                        <!-- BACKGROUND MENU -->
                        <div id="bocetoSlider-menu-container">
                                <div id="bocetoSlider-menu-header" class="header"></div>
                                <div id="target">CLICK</div>
                        </div>
                        <!-- ! BACKGROUND MENU -->
                        <!-- SITE CONTAINER -->
                        <div id="bocetoSlider">
                                <div class="header" id="bocetoSlider-header">
                                        <a id="bocetoSlider-btn" href="#"></a>
                                </div>
                                2
                        </div>
                        <!-- ! SITE CONTAINER -->
                </div>
                <!-- ! GLOBAL CONTAINER -->
        </body>
        <script>
                $("#bocetoSlider").bocetoSlider();
                $('#target').toggle(function() {
                        alert('First handler for .toggle() called.');
                      }, function() {
                        alert('Second handler for .toggle() called.');
                      });
        </script>
</html>
