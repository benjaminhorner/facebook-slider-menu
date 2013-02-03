/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
(function($) {
        $.fn.bocetoSlider = function(params) {
                /*
                * bocetoSlider Object
                * */
                var $bocetoSlider = $(this);
                /*
                * Variables
                * */
                var totalWidth = $(window).width();
                var maxImumOpen = Math.ceil((totalWidth)-((totalWidth*0.15)));
                var doMoveBocetoSlider = false;
                var slideOut = true;
                /*
                * Options
                * */
                var params = $.extend( {
                        bocetSliderWidth: '15', // %
                        direction: 'left', // accepted values => left, right
                        limitLeft: 0,
                        limitRight: maxImumOpen,
                        animationSpeed: 'fast',
                        animationEasing: 'linear',
                        snap: true,
                        bocetoSliderBtn: '#bocetoSlider-btn',
                        open: true
                }, params);
                /*
                 * Slider options
                 **/
                var $bocetoSliderBtn = $bocetoSlider.find(params.bocetoSliderBtn);
                var bocetSliderWidth = params.bocetSliderWidth;
                var openWidth = (100-bocetSliderWidth);
                var direction = params.direction;
                var limitLeft = params.limitLeft;
                var limitRight = params.limitRight;
                var animationSpeed = params.animationSpeed;
                var animationEasing = params.animationEasing;
                var openOrClosed;
                if(params.open) {openOrClosed = openWidth+'%'}
                else{openOrClosed = '0%'}
                /*
                 * Slider Left or Right
                 * */
                $bocetoSlider.css(direction, openOrClosed)
                /*
                 * Slider Animation
                 **/
                var animateSlider = function(dir){
                        $bocetoSlider.animate({left:dir+'px'}, animationSpeed, animationEasing)
                }
                /*
                 * Glisse le slider en place quand on le lâche
                 **/
                var snap = function(mouseX){
                        var center = totalWidth/2;
                        (mouseX < center) ? animateSlider(limitLeft) : animateSlider(limitRight);
                }
                /*
                * Déplacer le slider
                * */
                var moveSlider  = function(diff, mouseX){
                        var distToMove = (mouseX-diff);
                        if(doMoveBocetoSlider) $bocetoSlider.offset({left: distToMove});
                        if($bocetoSlider.offset().left <= limitLeft) $bocetoSlider.offset({left: limitLeft});
                        if($bocetoSlider.offset().left >= limitRight) $bocetoSlider.offset({left: limitRight});
                }
                var followMouseX = function(diff){
                        if(doMoveBocetoSlider){
                                $(document).bind('mousemove touchmove', function(e){
                                        var mouseX = e.pageX;
                                        moveSlider(diff, mouseX);
                                });
                        }
                 }
                 $bocetoSlider.bind('mousedown touchstart', function(e){
                        var startMouseX = e.pageX;
                        var initialOffset = $bocetoSlider.offset().left;
                        var diff = (startMouseX-initialOffset);
                        doMoveBocetoSlider = true;
                        followMouseX(diff);
                 });
                 $bocetoSlider.bind('mouseup touchend', function(e){
                         var mouseX = e.pageX;
                         if(snap && $bocetoSlider.offset().left > limitLeft) snap(mouseX);
                         doMoveBocetoSlider = false;
                 });
                 /*
                  * Toggle Slider use toggle()
                  **/
                 /*$bocetoSliderBtn.toggle(
                        function() {
                                alert('First handler for .toggle() called.');
                              }, function() {
                                alert('Second handler for .toggle() called.');
                              }
                 /*function(){
                         if(slideOut){
                                 console.log("1");
                                 $bocetoSlider.animate({left:limitLeft+'px'}, animationSpeed, animationEasing);
                                 slideOut = false;
                         }
                         else{
                                 console.log("2");
                                 $bocetoSlider.animate({left:limitRight+'px'}, animationSpeed, animationEasing);
                                 slideOut = true;
                         }
                 });*/
        };
})(jQuery);