import $ from 'jquery';
const anchors = document.querySelectorAll('a[name]');

$('.page__menu__item').on('click', event => {
    event.preventDefault();
    let href = event.target.href.split('#');
    href = href[href.length - 1];
    let anchor = Array.from(anchors).find(item => item.name === href);
    $('html,body').animate({ scrollTop: $(anchor).offset().top }, 1000);
});
