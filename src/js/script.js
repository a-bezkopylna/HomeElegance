
jQuery(function ($) {
    try {
          const exploreSplide = new Splide( '.explore .splide', {
            type: 'slide',
            perMove: 1,
            arrows: false,
            pagination: false,
            fixedWidth: false,
            autoWidth: true,
            gap: '15.5px',
            

      } );
      
      exploreSplide.mount();
    } catch (error) {
        
    }

    document.querySelectorAll('h2:not(.article)').forEach(function (h2) {
        let text = h2.textContent;
        if (text.length > 3) {
            h2.innerHTML = '<span class="underline">' + text.substring(0, 3) + '</span>' + text.substring(3);
        } else {
            h2.innerHTML = '<span class="underline">' + text + '</span>';
        }
    });

    try {
        const splide_stories = new Splide( '#top-stories', {
        type     : 'loop',
        height   : '500px',
        autoWidth: true,
        perMove: 1,
        gap: '30px',
        pagination: false,
        autoplay: true,
        arrows: true,
        interval: 3000,
        focus: 'center',
        breakpoints: {
            1400:{
                focus: 0,
            },
            1035:{
                arrows: false,
                perPage: 1,

                pagination: true,
                
            },
          
            768: {
                gap: '16px',
            },
            425: {
                perPage: 1,
                gap: '16px',
                
            }
        },
    
      } );
      
      splide_stories.mount();
    } catch (error) {
        
    }
    
    

    //   header
    $('.navbar-toggler').on('click', function(e) {
        e.stopPropagation();
        if (window.innerWidth > 991.8) {
            $('.left-menu').addClass('active');
           } else {

        //  $('#navbarNav').addClass('show');
        $('.mobile-search-wrapper').hide();
            $(this).hide();
            $('#nav-close').show();
            $('body').css('overflow', 'hidden');
        
           }
    });

    $('#nav-close').on('click', function() {
        
        $('#navbarNav').removeClass('show');
        $(this).hide();
        $('.navbar-toggler').show();
        $('body').css('overflow', '');
    });

    $('.search-icon').on('click', function() {
        $('.icon .search-close').show();
        $('.search-wrapper').show();
        $(this).hide();
    });

    $('.search-close').on('click', function() {
        $(this).hide();
        $('.search-wrapper').hide();
        $('.search-icon').show();
    });
    let bodyOverflow = false;
    $('.search-icon-mob').on('click', function(e) {
        e.stopPropagation();
        e.preventDefault();
        if($('#navbarNav').hasClass('show')){
            $('#nav-close').trigger('click');
            bodyOverflow = true; 
        } else {
            bodyOverflow = !bodyOverflow; 
        }
        
        
 
        if (bodyOverflow) {
            $('body').css('overflow', 'hidden');
        } else {
            $('body').css('overflow', ''); 
        }
        $('.mobile-search-wrapper').toggle();

    });
    $(document).click(function(e) {
        e.stopPropagation();
        if (!$(e.target).closest('.mobile-search-wrapper').length && $('.mobile-search-wrapper').is(':visible')) {
            bodyOverflow = !bodyOverflow; 

            if (bodyOverflow) {
                $('body').css('overflow', 'hidden');
            } else {
                $('body').css('overflow', ''); 
            }
            $('.mobile-search-wrapper').hide();
        }
    });

    $('.mobile-search-wrapper__menu form, .desktop-search form').on('submit', function(e) {
        // $('.mobile-search-wrapper').hide();
        e.preventDefault();
        $('body').css('overflow', '');
        location.href = 'search.html?s=' + $(this).find('input').val();
    });
    $('#nav-close-menu').on('click', function() {   
        $('.left-menu').removeClass('active');

    });

    
    if($('#contacts-form').length > 0){
        $('.form-control').on('blur', function() {
            if ($(this).val() == '') {
                $(this).parent().find('label').removeClass('active');
            } else {
                $(this).parent().find('label').addClass('active');
            }

        });
    }

    // Fixed sidebar banners

    const $rightPanel = $('#rightPanel');
    const $asideBanners = $rightPanel.find('.banner__aside');
    const $articleWidgets = $rightPanel.find('.article__aside-block');
  
    function applyStickyLogic() {
        // Reset sticky class on all banners
        $asideBanners.removeClass('sticky');

        // Condition 1: Only article widgets, no ad banners
        if ($asideBanners.length === 0 && $articleWidgets.length > 0) {
            return; // Only articles, nothing to do since they scroll normally
        }

        // Condition 2: Only an ad banner is in the right-side panel
        if ($asideBanners.length === 1 && $articleWidgets.length === 0) {
            $asideBanners.first().addClass('sticky');
            return;
        }

        // Condition 3: Both articles and banners, but last item is not an ad banner
        const $lastElement = $rightPanel.children().last();
        if ($asideBanners.length > 0 && $articleWidgets.length > 0 && !$lastElement.hasClass('banner__aside')) {
            return; // Mixed content with articles last, scrolls as usual
        }

        // Condition 4 & 5: Last item is a banner; make only the last banner sticky
        if ($lastElement.hasClass('banner__aside')) {
            $asideBanners.last().addClass('sticky'); // Only last banner sticky
        }
    }

    applyStickyLogic();
    $(window).resize(applyStickyLogic); // Reapply logic on resize if layout changes
    
      
    
});