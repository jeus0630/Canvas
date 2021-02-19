$(document).ready(function(){
    const slider = $('.slider');

    const left_btn = slider.children('.left-btn');
    const right_btn = slider.children('.right-btn');

    const pagination = slider.find('.pagination a');

    let isTrue = true;

    init();

    function init(){
        slider.find('.list .item').last().prependTo('.slider .list');
    }

    left_btn.on('click',function(e){

        e.preventDefault();

        if(isTrue){
            isTrue = false;

            const list = slider.children('.list');
            const item = list.children('.item');

            list.animate({marginLeft : 0},500,function(){
                item.last().prependTo(list);
                list.css({marginLeft: '-100%'});
                isTrue =true;
            })
        }

    })

    right_btn.on('click',function(e){

        e.preventDefault();

        if(isTrue){

            isTrue = false;

            const list = slider.children('.list');
            const item = list.children('.item');

            list.animate({marginLeft : '-200%'},500,function(){
                item.first().appendTo(list);
                list.css({marginLeft : '-100%'});
                isTrue = true;
            })

        }

    })

})