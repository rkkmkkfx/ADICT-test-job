import $ from 'jquery';
import CountUp from 'countup.js';

const   scope = $('.page__content__counters__items'),
        items = $('.page__content__counter__value span', scope);

const options = {
    useEasing: false,
    useGrouping: true,
    separator: ' ',
    decimal: '.',
};

const startCount = () => {
    if ($(scope).offset().top < $(document).scrollTop() + $(window).height()) {
        for (const item of items) {
            const counter = new CountUp(item.id, 0, item.textContent, 0, 3, options);
            if (!counter.error) {
                counter.start();
            } else {
                console.error(counter.error);
            }
        }
        document.removeEventListener('scroll', startCount);
    }
}
document.addEventListener('scroll', startCount);
