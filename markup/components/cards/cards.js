import $ from 'jquery';

$(document).scroll(event => {
    $('.page__content__card').each((index, item) => {
        if ($(item).offset().top < $(document).scrollTop() + $(window).height()) {
            $(item).addClass('animated')
        } else {
            $(item).removeClass('animated');
        }
    })

})
