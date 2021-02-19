$(function(){
    const iframe = $('iframe');
    const a = $('a');

    a.click(function(e){
        e.preventDefault();
        let src = iframe.attr('src');
        src = src.replace('autoplay=0','autoplay=1');
        iframe.attr('src',src);
        iframe.fadeIn();

    })
})