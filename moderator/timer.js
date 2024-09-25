$step = 1;
$loops = Math.round(100 / $step);
$increment = 360 / $loops;
$half = Math.round($loops / 2);
$barColor = '#009444';
$backColor = '#f0fcf4';
$audio = new Audio('../sound/NewTimer15-Sec.mp3');
$(function(){
    clock.init();
});

var clock = {
    interval: null,
    remainingTime: 15,
    running: false, // New state variable
    init: function(){
        $('.input-btn').click(function(){
            switch($(this).data('action')){
                case 'start':
                    if (!clock.running) {
                        clock.start(clock.remainingTime);
                        $audio.play(); 
                    } else {
                        clock.reset();
                    }
                    break;
                case 'pause':
                    clock.pause();
                    $audio.pause();
                    break;
                case 'reset':
                    clock.reset();
                    $audio.pause();
                    break;
            }
        });
    },
    start: function(t){
        $('.count').text("Time's Up").css('font-size', '4rem');
        $('.count').text("Time's Up").css('top', '10px');
        $('.count').text("Time's Up").css('width', '100%');
        var pie = 0;
        var num = 0;
        var sec = t ? t : 15;
        var lop = sec;
        $('.count').text(sec).addClass('sec');
        clock.running = true;
        clock.interval = setInterval(function(){
            sec = sec - 1;
            pie = pie + (100 / lop);
            clock.remainingTime = sec;
            if (pie >= 101) { pie = 1; }
            $('.count').text(sec);
            $i = (pie.toFixed(2).slice(0, -3)) - 1;
            if ($i < $half) {
                $nextdeg = (90 + ($increment * $i)) + 'deg';
                $('.clock').css({'background-image': 'linear-gradient(90deg,' + $backColor + ' 50%,transparent 50%,transparent),linear-gradient(' + $nextdeg + ',' + $barColor + ' 50%,' + $backColor + ' 50%,' + $backColor + ')'});
            } else {
                $nextdeg = (-90 + ($increment * ($i - $half))) + 'deg';
                $('.clock').css({'background-image': 'linear-gradient(' + $nextdeg + ',' + $barColor + ' 50%,transparent 50%,transparent),linear-gradient(270deg,' + $barColor + ' 50%,' + $backColor + ' 50%,' + $backColor + ')'});
            }
            if (sec == 0) {
                clearInterval(clock.interval);
                clock.running = false;
                $('.count').text("Time's Up");
                $('.clock').removeAttr('style');
                $('.count').text("Time's Up").css('font-size', '1.6rem');
                $('.count').text("Time's Up").css('top', '25px');
                $('.count').text("Time's Up").css('width', '98%');
                $('.input-btn[data-action="start"]').show();
                $('.input-btn[data-action="pause"], .input-btn[data-action="reset"]').hide();
                $audio.pause(); // Stop audio when the timer ends
                $audio.currentTime = 0; // Reset audio to the beginning
            }
        }, 1000);
    },
    pause: function(){
        clearInterval(clock.interval);
        clock.running = false;
        $audio.pause(); // Pause audio when the timer is paused
    },
    stop: function(){
        clearInterval(clock.interval);
        clock.running = false;
        $('.count').text(15);
        clock.remainingTime = 15;
        $('.clock').removeAttr('style');
        $('.input-btn[data-action="start"]').show();
        $('.input-btn[data-action="pause"], .input-btn[data-action="reset"]').hide();
        $audio.pause(); // Pause audio when the timer stops
        $audio.currentTime = 0; // Reset audio to the beginning
    },
    reset: function(){
        clock.stop();
        $('.count').text(15);
        $('.clock').removeAttr('style');
    }
}
