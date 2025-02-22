$(document).ready(function(){
    const hamburger = document.querySelector('.hamburger'),
        menu = document.querySelector('.menu'),
        close = document.querySelector('.menu__close');

    hamburger.addEventListener('click', () => {
        menu.classList.add('active');
    });
    close.addEventListener('click', () => {
        menu.classList.remove('active');
    });   

    const percentage = document.querySelectorAll('.skills__scale__percentage'),
        lines = document.querySelectorAll('.skills__scale__lvl');

    percentage.forEach((item, i) => {
        lines[i].style.width = item.innerHTML;
    });

    $('#contact-form').validate({
        rules: {
            name: {
                required: true,
                minlength: 2
            },
            email: {
                required: true,
                email: true
            },
            check: {
                required: true
            }
        },
        messages: {
            name: {
                required: "Ваше имя",
                minlength: jQuery.validator.format("Введите {0} символа!")
                },
            email: {
                required: "Ваша почта",
                email: "Неправильный адрес почты"
            },
            check: {
                required: "Необходимо соглашение"
            }
        }
    });

    $('#contact-form').submit(function(e) {
        e.preventDefault();

        if(!$(this).valid()){
            return;
        };

        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('.overlay, #thanks').fadeIn('slow');
            $('#contact-form').trigger('reset');
        });
        return false;
    });

    $('.modal__close').on('click', function(){
        $('.overlay, #thanks').fadeOut('slow');
    });
    
    $(window).scroll(function(){
        if ($(this).scrollTop() > 1600) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }

    });

    $("a[href=#up]").click(function(){
        const _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
    });

    new WOW().init();
});