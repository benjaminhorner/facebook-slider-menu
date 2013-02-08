/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
(function($) {
        $.fn.facebookSliderMenu = function(params) {
                document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
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
                var mouseX;
                var endMouseX;
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
                // Options for opening direction (left, both)
                var optionsOpen;
                var optionsClose;
                if(direction == 'left') {
                        optionsOpen = {left: limitLeft + 'px'};
                        optionsClose = {left: limitRight + 'px'};
                }
                (open) ? $menuBtn.data('clickState', 1) : $menuBtn.data('clickState', 0);
                /*
                 * Re-initialize variables that need it
                 **/
                var reInit = function(){
                        totalWidth = $(window).width();
                        limitRight = Math.ceil((totalWidth)-((totalWidth*(params.sliderWidth/100))));
                        optionsClose = {left: limitRight + 'px'};
                        sliderWidthInPixels = Math.ceil((totalWidth)*(sliderWidth/100));
                        var leftOffset = (totalWidth*0.85);
                        if($facebookSliderMenu.offset().left != 0) $facebookSliderMenu.css('left', leftOffset);
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
                       return ('ontouchstart' in window) ? 'touchstart' : 'mousedown';
                };
                var getEndClickEvent = function() {
                       return ('ontouchend' in window) ? 'touchend' : 'mouseup';
                };
                var getMoveEvent = function() {
                       return ('ontouchmove' in window) ? 'touchmove' : 'mousemove';
                };
                /*
                 * Test if touch screen
                 **/
                var getMouseX = function(e){
                        if ('ontouchmove' in window) {
                                //iOS & android
                                mouseX = e.originalEvent.targetTouches[0].pageX;
                                return mouseX;
                        } else if(window.navigator.msPointerEnabled) {
                                //Win8
                                mouseX = e.originalEvent.targetTouches[0].pageX;
                                return mouseX;
                        }
                        else{
                                mouseX = e.pageX;
                                return mouseX;
                        }
                }
                var getReleaseMouseX = function(e){
                        if ('touchend' in window) {
                                //iOS & android
                                endMouseX = e.originalEvent.changedTouches[0].pageX;
                                return mouseX;
                        } else if(window.navigator.msPointerEnabled) {
                                //Win8
                                endMouseX = e.originalEvent.changedTouches[0].pageX;
                                return mouseX;
                        }
                        else{
                                endMouseX = e.pageX;
                                return mouseX;
                        }
                }
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
                var snapFBS = function(msX){
                        var mX = msX;
                        getSnapZone();
                        if($menuBtn.data('clickState')){
                                (mX >= snapZone.right) ? $facebookSliderMenu.animate({left: limitRight}) : $facebookSliderMenu.animate({left: limitLeft});
                        }
                        else{
                                (mX >= snapZone.left) ? $facebookSliderMenu.animate({left: limitRight}) : $facebookSliderMenu.animate({left: limitLeft});
                        }
                }
                /*
                * Déplacer le slider
                * */
                var moveSlider  = function(e){
                        doSnap = true;
                        var diff = e.data.diff;
                        e.stopPropagation();
                        getMouseX(e);
                        var distToMove = (mouseX-diff);
                        if(doMove) {$facebookSliderMenu.stop().css('left', distToMove);}
                        if($facebookSliderMenu.offset().left <= limitLeft) {$facebookSliderMenu.offset({left: limitLeft}); $menuBtn.data('clickState', !$menuBtn.data('clickState')); doSnap = false;}
                        if($facebookSliderMenu.offset().left >= limitRight) {$facebookSliderMenu.offset({left: limitRight}); $menuBtn.data('clickState', !$menuBtn.data('clickState')); doSnap = false;}
                }
                var followMouseX = function(diff){
                        if(doMove){
                                $(document).bind(getMoveEvent(), {diff: diff}, moveSlider);
                        }
                 }
                 $facebookSliderMenu.bind(getStartClickEvent(), function(e){
                        var startMouseX = getMouseX(e);
                        var initialOffset = $facebookSliderMenu.offset().left;
                        var diff = (startMouseX-initialOffset);
                        getActiveZone();
                        if(startMouseX >= activeZone.left && startMouseX <= activeZone.right){
                                doMove = true;
                                followMouseX(diff);
                        }
                 });
                 $facebookSliderMenu.bind(getEndClickEvent(), function(e){
                         var mouseX = getReleaseMouseX(e);
                         if(doSnap) {snapFBS(mouseX);}
                         doMove = false;
                         $(document).unbind(getMoveEvent(), moveSlider);
                 });
                 /*
                  * Toggle Slider : toggle() has been deprected as of jQuery 1.9.0 for anything but visibility so use data() instead
                  **/
                 $menuBtn.click(function(){
                         toggleMenu();
                 });
                 $(window).resize(function(){
                         reInit();
                 })
        };
})(jQuery);