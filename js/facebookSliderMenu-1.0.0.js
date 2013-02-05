/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
(function($) {
        $.fn.facebookSliderMenu = function(params) {
                /*
                * facebookSliderMenu Object
                * */
                var $facebookSliderMenu = $(this);
                /*
                 * Object options set by user
                 **/
                var params = $.extend( {
                        sliderWidth: '15', // %
                        snapZoneWidth: '25', // %
                        direction: 'left', // accepted values => left, both
                        animationSpeed: 'fast',
                        animationEasing: 'swing',
                        open: true
                }, params);
                /*
                * Variables
                * */
                var totalWidth = $(window).width();
                var limitRight = Math.ceil((totalWidth)-((totalWidth*(params.sliderWidth/100))));
                var doMove = false;
                var limitLeft = 0;
                var doSnap = false;
                /*
                 * Slider options
                 **/
                var menuBtn = '#fbs-menu-btn';
                var $menuBtn = $facebookSliderMenu.find(menuBtn);
                var sliderWidth = params.sliderWidth;
                var openWidth = (100-sliderWidth);
                var direction = params.direction;
                var animationSpeed = params.animationSpeed;
                var animationEasing = params.animationEasing;
                var sliderWidthInPixels = Math.ceil((totalWidth)*(sliderWidth/100));
                var snapZoneWidth = params.snapZoneWidth;
                var snapRatio = Math.ceil(snapZoneWidth/sliderWidth);
                var openOrClosed;
                var open = params.open;
                if(open) {openOrClosed = openWidth+'%'} else{openOrClosed = '0%'}
                // Options for opening direction (left, right, both)
                var optionsOpen;
                var optionsClose;
                if(direction == 'left') {
                        optionsOpen = {left: limitLeft + 'px'};
                        optionsClose = {left: limitRight + 'px'};
                }
                (open) ? $menuBtn.data('clickState', 1) : $menuBtn.data('clickState', 0);
                /*
                 * Re-initialize varaibels that need it
                 **/
                var reInit = function(){
                        totalWidth = $(window).width();
                        limitRight = Math.ceil((totalWidth)-((totalWidth*(params.sliderWidth/100))));
                        optionsClose = {left: limitRight + 'px'};
                        sliderWidthInPixels = Math.ceil((totalWidth)*(sliderWidth/100));
                        var leftOffset = (totalWidth*0.85);
                        if($facebookSliderMenu.offset().left != 0) $facebookSliderMenu.css('left', leftOffset);
                        //console.log('totalWidth : '+totalWidth+' limitRight : '+limitRight+' sliderWidthInPixels : '+sliderWidthInPixels);
                }
                /*
                 * Active Zone Object
                 **/
                var activeZone;
                var getActiveZone = function(){
                       return activeZone = ({
                               left: $facebookSliderMenu.position().left,
                               right: ($facebookSliderMenu.position().left)+sliderWidthInPixels
                       })
                }
                /*
                 * Snap Zone Object
                 **/
                var snapZone;
                var getSnapZone = function(){
                        return snapZone = ({
                                left:  Math.ceil(sliderWidthInPixels*snapRatio),
                                right: totalWidth-(Math.ceil(sliderWidthInPixels*snapRatio))
                        })
                }
                /*
                * Click and Move events
                **/
                var getStartClickEvent = function() {
                       return ('touchstart' in window) ? 'touchstart' : 'mousedown';
                };
                var getEndClickEvent = function() {
                       return ('touchend' in window) ? 'touchend' : 'mouseup';
                };
                var getMoveEvent = function() {
                       return ('touchmove' in window) ? 'touchmove' : 'mousemove';
                };
                /*
                 * Slider Left only or Both
                * */
                $facebookSliderMenu.css(direction, openOrClosed);
                /*
                 * Width of Menu and Sub-Menu
                * */
                $facebookSliderMenu.siblings().css('width', openWidth+'%');
                /*
                 * Slider Animation
                 **/
                var toggleMenu = function(){
                        if($menuBtn.data('clickState')){
                                $facebookSliderMenu.stop().animate(optionsOpen, animationSpeed, animationEasing);
                        }
                        else{
                                $facebookSliderMenu.stop().animate(optionsClose, animationSpeed, animationEasing);
                        }
                        $menuBtn.data('clickState', !$menuBtn.data('clickState'));
                }
                /*
                 * Glisse le slider en place quand on le lâche
                 **/
                var snapFBS = function(mouseX){
                        getSnapZone();
                        if($menuBtn.data('clickState')){
                                (mouseX >= snapZone.right) ? $facebookSliderMenu.animate({left: limitRight}) : $facebookSliderMenu.animate({left: limitLeft});
                        }
                        else{
                                (mouseX >= snapZone.left) ? $facebookSliderMenu.animate({left: limitRight}) : $facebookSliderMenu.animate({left: limitLeft});
                        }
                }
                /*
                * Déplacer le slider
                * */
                var moveSlider  = function(diff, mouseX){
                        doSnap = true;
                        var distToMove = (mouseX-diff);
                        if(doMove) $facebookSliderMenu.offset({left: distToMove});
                        if($facebookSliderMenu.offset().left <= limitLeft) {$facebookSliderMenu.offset({left: limitLeft}); $menuBtn.data('clickState', 0); doSnap = false;}
                        if($facebookSliderMenu.offset().left >= limitRight) {$facebookSliderMenu.offset({left: limitRight}); $menuBtn.data('clickState', 1); doSnap = false;}
                }
                var followMouseX = function(diff){
                        if(doMove){
                                $(document).bind(getMoveEvent(), function(e){
                                        var mouseX = e.pageX;
                                        moveSlider(diff, mouseX);
                                });
                        }
                 }
                 $facebookSliderMenu.bind(getStartClickEvent(), function(e){
                        var startMouseX = e.pageX;
                        var initialOffset = $facebookSliderMenu.offset().left;
                        var diff = (startMouseX-initialOffset);
                        getActiveZone();
                        if(startMouseX >= activeZone.left && startMouseX <= activeZone.right){
                                doMove = true;
                                followMouseX(diff);
                        }
                 });
                 $facebookSliderMenu.bind(getEndClickEvent(), function(e){
                         var mouseX = e.pageX;
                         if(doSnap) snapFBS(mouseX);
                         doMove = false;
                 });
                 /*
                  * Toggle Slider : toggle() has been deprected as of jQuery 1.9.0 for anuthing but visibility so use data() instead
                  **/
                 $menuBtn.click(function(){
                         toggleMenu();
                 });
                 $(window).resize(function(){
                         reInit();
                 })
        };
})(jQuery);