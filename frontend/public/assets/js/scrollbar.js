// Define variables
var hidWidth;
var scrollBarWidths = 40;

// Function to calculate the total width of list items
var widthOfList = function() {
    var itemsWidth = 0;
    $('.list a').each(function() {
        var itemWidth = $(this).outerWidth();
        itemsWidth += itemWidth;
    });
    return itemsWidth;
};

// Function to calculate the width of hidden items
var widthOfHidden = function() {
    var ww = 0 - $('.wrapper-nav').outerWidth();
    var hw = (($('.wrapper-nav').outerWidth()) - widthOfList() - getLeftPosi()) - scrollBarWidths;
    var rp = $(document).width() - ($('.nav-item.nav-link').last().offset().left + $('.nav-item.nav-link').last().outerWidth());

    if (ww > hw) {
        return (rp > ww ? rp : ww);
    } else {
        return (rp > hw ? rp : hw);
    }
};

// Function to get the left position
var getLeftPosi = function() {
    var ww = 0 - $('.wrapper-nav').outerWidth();
    var lp = $('.list').position().left;

    if (ww > lp) {
        return ww;
    } else {
        return lp;
    }
};

// Function to adjust the navigation based on screen size
// var reAdjust = function() {
//     var rp = $(document).width() - ($('.nav-item.nav-link').last().offset().left + $('.nav-item.nav-link').last().outerWidth());

//     if ($('.wrapper-nav').outerWidth() < widthOfList() && rp < 0) {
//         $('.scroller-right').show().css('display', 'flex');
//     } else {
//         $('.scroller-right').hide();
//     }

//     if (getLeftPosi() < 0) {
//         $('.scroller-left').show().css('display', 'flex');
//     } else {
//         $('.scroller-left').hide();
//     }
// };

// // Initial adjustment
// reAdjust();
var reAdjust = function() {
    // Assuming these functions exist, replace them with actual implementations
    var widthOfList = function() {
        // Implement widthOfList logic
    };

    var getLeftPosi = function() {
        // Implement getLeftPosi logic
    };

    var navLinks = $('.nav-item.nav-link');
    
    if (navLinks.length > 0) {
        var lastNavLink = navLinks.last();
        var rp = $(document).width() - (lastNavLink.offset().left + lastNavLink.outerWidth());

        if ($('.wrapper-nav').outerWidth() < widthOfList() && rp < 0) {
            $('.scroller-right').show().css('display', 'flex');
        } else {
            $('.scroller-right').hide();
        }

        if (getLeftPosi() < 0) {
            $('.scroller-left').show().css('display', 'flex');
        } else {
            $('.scroller-left').hide();
        }
    }
};

// Call reAdjust to initialize
reAdjust();


// Event handler for window resize
$(window).on('resize', function(e) {
    reAdjust();
});

// Event handler for right scroll button
$('.scroller-right').click(function() {
    $('.scroller-left').fadeIn('slow');
    $('.scroller-right').fadeOut('slow');

    $('.list').animate({ left: `+=${widthOfHidden()}px` }, 'slow', function() {
        reAdjust();
    });
});

// Event handler for left scroll button
$('.scroller-left').click(function() {
    $('.scroller-right').fadeIn('slow');
    $('.scroller-left').fadeOut('slow');

    $('.list').animate({ left: `-=${getLeftPosi()}px` }, 'slow', function() {
        reAdjust();
    });
});