/*
** createNamespace
** desc:
**    Extends Object to add a method to populate nested namespaces to encapsulate code
**    Since it part of Object.prototype is available in any object.
**	@param string namespace: A string of dot separated names. i.e. myApp.components.someComponent
**  @param object o (optional): Object (or Function) to be bound to the last identifier of the namespace
*/
var createNamespace = function (namespace, o) {
    if (typeof namespace === 'string') {
        var segments = namespace.split('.');
        var parent = this;
        for (var i = 0; i < segments.length; i++) {
            parent[segments[i]] = parent[segments[i]] || {};
            if (i == segments.length - 1) {
                parent[segments[i]] = o;
            } else {
                parent = parent[segments[i]]
            }
        }
    }
}; /* createNamespace is a function added to Object.prototype to facilitate
** creating nested namespaces.
** Check it in the prototype.js file
*/
createNamespace('app', {
    name: "bsc_app",
    init: function init() {
        if (typeof window.console === undefined) {
            window.console = { log: function () { } };
        }
    }
});
app.init(); ; createNamespace('app.components.backToTop', (function () {
    $(document).ready(function () {
        if ($('.js-back-to-top').length > 0) {
            setupBackToTop();
        }
    });

    var setupBackToTop = function () {
        $(window).scroll(function () {
            var scrollPos = $(window).scrollTop();
            var winWidth = $(document).width();
            var winHeight = $(window).height();

            if ((scrollPos > winHeight) && winWidth > 959) {
                $('.js-back-to-top').show();
            }
            else {
                $('.js-back-to-top').hide();
            }
        });

        $('.js-back-to-top').click(function (e) {
            e.preventDefault();
            $('html, body').animate({ 'scrollTop': '0px' }, 750)
        });
    }
})()); ; createNamespace('app.components.contactUsForm', (function () {
    $(document).ready(function () {
        if ($(".form:first > .form_row").length) {
            if ($(".contact-us-form .form_field_text").length || $(".contact-us-form .form_field_textarea").length) {
                $(".form:first > .form_row").css("display", "none");
                $(".form:first > .form_row:first").css("display", "block");

                if ($(".form_field_text").length) {
                    var txtval = $(".form_field_text").val();

                    $(".form_field_text").focus(function () {
                        if ($(".form_field_text").val() == txtval) {
                            $(".form_field_text").val("");
                        }
                    });

                    $(".form_field_text").focusin(function () {
                        $(".form:first > .form_row").css("display", "block");
                    });
                }

                if ($(".form_field_textarea").length) {
                    var txtval = $(".form_field_textarea").val();

                    $(".form_field_textarea").focus(function () {
                        if ($(".form_field_textarea").val() == txtval) {
                            $(".form_field_textarea").val("");
                        }
                    });

                    $(".form_field_textarea").focusin(function () {
                        $(".form:first > .form_row").css("display", "block");
                    });
                }
            }
        }
    });
})()); ; createNamespace('app.components.countrySelector', (function () {
    $(document).ready(function () {
        setupCountrySelector();
    });

    var setupCountrySelector = function () {
        var cs = new countrySelector();
        cs.injectInFooter();
        cs.setupModal();
        cs.setupFooter();
    }

    var countrySelector = function () {
        this.obj = '.js-country-selector';
        this.footerObj = '.js-country-selector-footer-wrap';
        this.injectInFooter = function () {
            var $cloneObj = $(this.obj).clone();
            $(this.footerObj).append($cloneObj);
        },
		this.setupModal = function () {
		    var setupCustomClose = function () {
		        $('.js-country-window-close').click(function (e) {
		            e.preventDefault();
		            $.fancybox.close();
		        });
		    }

		    $('.js-country-selector-utility').fancybox({
		        padding: 0,
		        margin: 0,
		        fixed: false,
		        'closeBtn': false,
		        'beforeShow': setupCustomClose
		    });
		},
		this.setupFooter = function () {
		    var countryListObj = $(this.footerObj).find('.js-country-list');
		    var countryLinkObj = $(this.footerObj).find('.js-selected-country-link');

		    countryLinkObj.click(function (r) {
		        r.preventDefault();
		        if (countryListObj.hasClass('js-country-list-expanded')) {
		            countryListObj.removeClass('js-country-list-expanded').slideUp(500, function () {
		                $(this).removeAttr('style');
		            });
		            countryLinkObj.find('.fa').removeClass('fa-chevron-up').addClass('fa-chevron-down');
		        }
		        else {
		            countryListObj.addClass('js-country-list-expanded').slideDown(500);
		            countryLinkObj.find('.fa').removeClass('fa-chevron-down').addClass('fa-chevron-up');
		        }
		    });
		}
    }
})()); ; createNamespace('app.components.digitalAssetList', (function () {
    $(document).ready(function () {
        if ($('.js-digital-asset-toggle').length > 0) {
            $('.js-digital-asset-list').each(function () {
                var toggle = $(this).parentsUntil('.js-digital-asset-toggle');
                setupDigitalAssetSorting(this, toggle);
            });
        }
    });

    var setupDigitalAssetSorting = function (list, toggle) {
        var digitalAsset = new sortToggle(list, toggle);
        digitalAsset.init();

        var $sortBtn = $(digitalAsset.toggleControl).find('.js-toggle-sort');
        var $listObj = $(digitalAsset.list);

        $sortBtn.click(function (e) {
            var newestText = $(this).attr('data-newest');
            var oldestText = $(this).attr('data-oldest');
            var atozText = $(this).attr('data-atoz');
            var ztoaText = $(this).attr('data-ztoa');
            e.preventDefault();
            $sortBtn.removeClass('active');
            $(this).addClass('active');

            if ($(this).hasClass('js-toggle-alpha')) {
                if ($listObj.attr('data-sortedby') === 'atoz') {
                    $listObj.attr('data-sortedby', 'ztoa');
                    digitalAsset.sortAlphabetical(false);
                    $(this).text(ztoaText);
                }
                else {
                    $listObj.attr('data-sortedby', 'atoz');
                    digitalAsset.sortAlphabetical(true);
                    $(this).text(atozText);
                }
            }
            else {
                if ($listObj.attr('data-sortedby') === 'newest') {
                    $listObj.attr('data-sortedby', 'oldest');
                    digitalAsset.sortDates(false);
                    $(this).text(oldestText);
                }
                else {
                    $listObj.attr('data-sortedby', 'newest');
                    digitalAsset.sortDates(true);
                    $(this).text(newestText);
                }
            }
        });
    }

    var sortToggle = function (list, control) {
        this.list = list;
        this.toggleControl = control;
        this.titles = [];
        this.dates = [];
        this.init = function () {
            this.getTitles();
            this.getDates();
            if ($("ul#documentLibraryList").length) {
                this.sortDates(true);
            }
            else {
                this.sortAlphabetical(true);
            }
        },
		this.getTitles = function () {
		    var storeTitles = [];
		    $(this.list).find('.js-sort-title').each(function (i) {
		        storeTitles[i] = {};
		        storeTitles[i]['obj'] = $(this).parents('.js-sort-item');
		        storeTitles[i]['title'] = $(this).text().toLowerCase();
		        if ($("ul#documentLibraryList").length) {
		            var strDate = $(this).attr('data-yyyymmdd').split('-');
		            var jsDate = new Date(strDate[0], strDate[1] - 1, strDate[2]);
		            storeTitles[i]['jsDate'] = jsDate;
		        }
		    });
		    return this.titles = storeTitles;
		},
		this.sortAlphabetical = function (isAtoZ) {
		    this.titles.sort(function (a, b) {
		        if ($("ul#documentLibraryList").length) {
		            if (isAtoZ) {
		                if (a.title < b.title) {
		                    return -1;
		                }
		                else if (a.title > b.title) {
		                    return 1;
		                }
		                else {
		                    return a.jsDate < b.jsDate ? 1 : a.jsDate > b.jsDate ? -1 : 0;
		                }
		            }
		            else {
		                if (a.title < b.title) {
		                    return 1;
		                }
		                else if (a.title > b.title) {
		                    return -1;
		                }
		                else {
		                    return a.jsDate < b.jsDate ? 1 : a.jsDate > b.jsDate ? -1 : 0;
		                }
		            }
		        }
		        else {
		            if (isAtoZ) {
		                return a.title < b.title ? -1 : a.title > b.title ? 1 : 0;
		            }
		            else {
		                return a.title < b.title ? 1 : a.title > b.title ? -1 : 0;
		            }
		        }
		    });
		    this.displaySorting('titles');
		},
		this.getDates = function () {
		    var storeDates = [];
		    $(this.list).find('.js-sort-date').each(function (i) {
		        var strDate = $(this).attr('data-yyyymmdd').split('-');
		        var jsDate = new Date(strDate[0], strDate[1] - 1, strDate[2]);
		        storeDates[i] = {};
		        storeDates[i]['obj'] = $(this).parents('.js-sort-item');
		        storeDates[i]['jsDate'] = jsDate;
		    });
		    return this.dates = storeDates;
		},
		this.sortDates = function (isNewest) {
		    this.dates.sort(function (c, d) {
		        if (isNewest) return c.jsDate < d.jsDate ? 1 : c.jsDate > d.jsDate ? -1 : 0;
		        else return c.jsDate < d.jsDate ? -1 : c.jsDate > d.jsDate ? 1 : 0;
		    });
		    this.displaySorting('dates');
		},
		this.displaySorting = function (arrName) {
		    var storeObjs = new Array();
		    var sortArr;
		    if (arrName === 'titles') sortArr = this.titles;
		    else sortArr = this.dates;

		    for (var i = 0; i < sortArr.length; i++) {
		        storeObjs[i] = sortArr[i]['obj'];
		    }
		    $(this.list).empty().append(storeObjs);
		}
    }
})()); ; createNamespace('app.components.exploreProductLinkList', (function () {
    $(document).ready(function () {
        if ($('.js-explore-products').length > 0) {
            setupExploreLinkList();
            scrollToProduct();
        }
    });

    var setupExploreLinkList = function () {
        var exploreLinkTemplate = '<li><a class="explore-product-link js-explore-product-link" href="#"><span class="explore-product-link-name js-explore-product-link-name"></span><i class="fa fa-chevron-down"></i></a></li>';
        $('#js-product-section h2').each(function (i) {
            var productSectionName = $(this).text();
            var productSectionID = 'ps_' + productSectionName.replace(/[^a-z0-9]/gi, '').toLowerCase();
            if (productSectionID == 'ps_') {
                productSectionID = 'header-anchor-' + i;
            }
            $(this).attr('id', productSectionID);
            $('.js-explore-product-link-list').append(exploreLinkTemplate);
            $('.js-explore-product-link-name').eq(i).text(productSectionName).parent().attr('data-id', productSectionID);
        });
    }

    var scrollToProduct = function () {
        $('.js-explore-product-link').click(function (e) {
            var $scrollObj = $('#' + $(this).attr('data-id'));
            var scrollPos = $scrollObj.position().top + 'px';

            e.preventDefault();
            $('html, body').animate({ 'scrollTop': scrollPos }, 500);
        });
    }
})()); ; createNamespace('app.components.extApp', (function () {
    $(document).ready(function () {
        if ($('.externalApplication')) {
            $('.externalApplication iframe').attr('frameBorder', '0');
        }
    });
})()); ; createNamespace('app.components.featureContentArticleImage', (function () {
    $(document).ready(function () {
        if ($('.feature-content-article-image.carousel').length) {
            $('.feature-content-article-image.carousel').carousel({
                enableSwipe: true,
                showDots: false,
                showPreviews: false,
                showPages: true
            });
        }
    });
})()); ; createNamespace('app.components.featureContentVideoCarousel', (function () {
    $(document).ready(function () {
        if ($('.fancybox-media').length) {
            $('.fancybox-media').fancybox({
                helpers: {
                    media: {}
                }
            });
        }

        if ($('.feature-content-video-carousel.carousel').length) {
            $('.feature-content-video-carousel.carousel').carousel({
                enableSwipe: true,
                showDots: false,
                showPreviews: false
            });
        }
    });
})()); ; createNamespace('app.components.finder', (function () {
    $(document).ready(function () {
        if ($('.js-finder-toggle').length) {
            $('.js-finder-toggle').on('click', function (e) {
                e.preventDefault();

                if ($('.finder-contents').is(':visible')) {
                    $('.finder-contents').slideUp(function () {
                        $(this).addClass('hide-toggle');
                        $('.js-finder-toggle').find('.fa').removeClass('fa-chevron-up');
                        $('.js-finder-toggle').find('.fa').addClass('fa-chevron-down');
                    });
                } else {
                    $('.finder-contents').slideDown(function () {
                        $(this).removeClass('hide-toggle');
                        $('.js-finder-toggle').find('.fa').addClass('fa-chevron-up');
                        $('.js-finder-toggle').find('.fa').removeClass('fa-chevron-down');
                    });
                }
            });
        }
    });
})()); ; createNamespace('app.components.forms', (function () {
    $(document).ready(function () {
        $('input, textarea').placeholder();

        if ($.browser.msie) {
            $('.template form select').css('background', '#FFF');
        }
    });
})()); ; createNamespace('app.components.header', (function () {
    var isClosed = true;
    var clonedLefNav = false;
    var leftNavContainer;
    var mobileNavBreakPoint = 599;

    var toggleNavDrawer = function (e) {
        $('.back-to-main').removeClass('expanded');
        if (isClosed) {
            $('.nav-secondary-container').removeClass('hidden');
            if ($('.nav-secondary-container').hasClass('expanded')) {
                $('.back-to-main').addClass('expanded');
            }
            $('.mobile-drawer-container').addClass('slide');
            $('.template').addClass('slide');
        } else {
            $('.mobile-drawer-container').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function (e) {
                if (!clonedLefNav) {
                    //$('.mobile-scroll-box').removeClass('expanded');
                    $('.nav-secondary-container').removeClass('expanded');
                    $('.sub-nav').removeClass('expanded');
                } else {
                    //$('.mobile-scroll-box').addClass('expanded');
                    $('.nav-secondary-container').addClass('expanded');
                    $('.sub-nav').removeClass('expanded');
                    $('.nav-megamenu').addClass('expanded-subnav');
                    $('.utility-nav').addClass('expanded-subnav');
                }
            });
            $('.mobile-drawer-container').removeClass('slide');
            $('.template').removeClass('slide');
        }

        isClosed = !isClosed;
    };

    var openFlyout = function (e) {
        //$('.mobile-scroll-box').addClass('expanded');
        $('.back-to-main').addClass('expanded');
    };
    var closeFlyout = function (e) {
        $('.back-to-main').removeClass('expanded');
    };

    var copyLeftNav = function () {
        if (!clonedLefNav) {
            if ($('.left-nav').length !== 0) {
                $('.left-nav').clone().appendTo('.nav-secondary-container');
                $('.nav-megamenu').addClass('expanded-subnav');
                $('.utility-nav').addClass('expanded-subnav');
                //$('.mobile-scroll-box').addClass('expanded');
                $('.nav-secondary-container').addClass('expanded');
                clonedLefNav = true;
            }
        }
    };

    var displayMainNav = function (e) {
        e.preventDefault();
        /*$('.mobile-scroll-box').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(e) {
        $('.nav-secondary-container').addClass('hidden');
        });*/
        $('.nav-megamenu').show();
        $('.sub-nav').removeClass('expanded');
        $('.nav-megamenu').removeClass('expanded-subnav');
        $('.nav-megamenu').find('li').removeClass('expanded');
        $('.utility-nav').removeClass('expanded-subnav');
        $('.mobile-scroll-box').removeClass('expanded');
        $('.back-to-main').removeClass('expanded');
        $('.nav-secondary-container').removeClass('expanded');

        //		start cb - show Utility Nav when mobile top left main arrow is clicked
        $('.top-sub-nav-exists.expanded').children('a').show();
        $('.utility-sub-nav').show();
        $('.top-sub-nav-exists').not('.expanded').show();
        $('.top-sub-nav-exists.expanded').show();
        $('.utility-links li:not([class=""]):first').show();
        $('.utility-sub-nav').hide();
        //      end cb
    };

    $(document).ready(function () {
        //Copies the left nav into the main nav markup
        copyLeftNav();
        //Bind to a custom event that is fired when the nav drawer button is clicked
        $(document).bind('toggleMobileNav', toggleNavDrawer);
        //Bind an event to navigate to the flyout level on mobile
        $(document).bind('openFlyout', openFlyout);
        $(document).bind('closeFlyout', closeFlyout);
        //Bind return to main button
        $('.back-to-main').click(displayMainNav);
    });
})());
createNamespace('app.components.manageThinNav', (function () {
    $(document).ready(function () {
        if ($("nav.nav-megamenu").length > 0) {
            manageThinNav();
        }

        if ($("nav.nav-megamenu").length < 1) {
            //displayDottedLine();
            manageDesktopLogo();
        }

        manageTitleAndRightLogoForMobile();
    });

    /*Display left logo/text in the mobile view along with right logo */
    var manageTitleAndRightLogoForMobile = function () {
        if ($(window).width() < 599) {
            $('#rightLogo').css({ 'position': 'absolute', 'bottom': '14px' });
            $('#rightLogo .logo').css('padding', '0');
            $('#rightLogo .logo').css('padding-top', '14px');

            $('.left-header-text').hide();
            $('.left-header-text-thin-nav').show();

            if ($('.left-header-thin-nav').length) {
                $('.left-header-thin-nav').show();
                $('.left-header-image').hide();
                $('#rightLogo').css({ 'bottom': '0' });
                $('#rightLogo .logo').css('padding-top', '0');
            }

            if ($('.left-header-thin-nav').length == 0 && $('.left-header-text-thin-nav').length == 0) {
                $('#rightLogo').css({ 'position': 'static', 'bottom': '0' });
            }

            if ($('.left-header-text-thin-nav').length) {
                $('#rightLogo').css({ 'bottom': '0' });
                $('#rightLogo .logo').css('padding-top', '0');

                if ($('.left-header-text-thin-nav > h1').text().length < 30) {
                    $('.left-header-text-thin-nav > h1').css({ 'margin-top': '34px', 'margin-bottom': '0' });
                }
                else {
                    $('.left-header-text-thin-nav > h1').css({ 'margin-top': '10px' });
                }
            }
        }
    }

    /*Add one dotted line when header menu is not authored */
    var displayDottedLine = function () {
        if ($('.template').length) {
            $('.template > .container').before("<h2 class='no-nav-template-rular'></h2>");
            $('#rightLogo').css('bottom', '10px');
        }
    }

    var manageDesktopLogo = function () {
        if ($(window).width() > 599) {
            $('#rightLogo').css({ 'bottom': '23px' });
        }
    }

    /* Manage the Thin Navigation for different tabs*/
    var manageThinNav = function () {
        var megaMenu = $("nav.nav-megamenu");
        var megaMenuType = megaMenu.data("type");
        var ua = navigator.userAgent.toLowerCase();
        if (megaMenuType != undefined && megaMenuType != "" && megaMenuType == "thin-nav") {
            if (megaMenu.children().children().children().length > 0) {
                var innerTabs = megaMenu.children().children().children();
                $.each(innerTabs, function () {
                    $('nav.sub-nav', $(this)).css('display', 'none');
                    $(this).children().find(".fa-lg").hide();
                    $(this).css('cursor', 'pointer')
                });

                if ($.browser.msie || (ua.indexOf("safari/") !== -1 && ua.indexOf("windows") !== -1 && $(window).width() > 599) || ua.indexOf('ipad') !== -1) {
                    var newWidth = parseFloat(100 / megaMenu.children().children().children().length);
                    megaMenu.children().children().children().css("width", newWidth + '%');
                }

                innerTabs.click(function (e) {
                    var link = innerTabs.find('a').attr('href');
                    window.location.href = link;
                });
            }
        }
    }
})()); ; createNamespace('app.components.imageCarousel', (function () {
    $(document).ready(function () {
        if ($('.image-carousel.carousel').length) {
            $('.image-carousel').carousel({
                enableSwipe: true,
                showPreviews: false
            });
        }
    });
})()); ; createNamespace('app.components.linksList', (function () {
    $(document).ready(function () {
        if ($('.js-list-btn').length > 0) {
            if ($('.js-list-btn').hasClass('js-product-categories-list-btn')) {
                //productCategoriesList();
                // console.log('jsif')
            }
            else
                responsiveLinksList();
        }
    });

    var numOfItems = function () {
        var getNumOfItems = parseInt($('.js-expandable-list').data('default-shown'));
        return getNumOfItems;
    }

    var hideItems = function (items) {
        if ($('.js-expandable-list > li').length >= items) {
            $('.js-list-btn').addClass('js-btn-see-more');
            $('.js-expandable-list > li').each(function () {
                if ($(this).index() >= items) $(this).addClass('hidden-item');
            });
        }
        else $('.js-list-btn').removeClass('js-btn-see-more').hide();
    }

    var hideCategoryItems = function (items) {
        $('.js-expandable-list').each(function (i) {
            // console.log(items + ' | ' + $(this).children('li').length)
            if ($(this).children('li').length >= items) {
                $('.js-list-btn').addClass('js-btn-see-more');
                $('.js-expandable-list > li').each(function () {
                    if ($(this).index() >= items) $(this).addClass('hidden-item');
                });
                // console.log('ify');
            }
            else {
                $('.js-product-categories-list-btn').eq(i).removeClass('js-btn-see-more').hide();
                // console.log('hide');
            }
        });
    }

    var setupSeeMoreBtn = function (amt) {
        $('.js-list-btn').click(function (e) {
            e.preventDefault();

            var seeMoreTxt = $(this).attr('data-seemore');
            var seeLessTxt = $(this).attr('data-seeless');
            if ($(this).hasClass('js-btn-see-more')) {
                $('.js-expandable-list > li:visible:last').nextAll(':lt(' + amt + ')').removeClass('hidden-item');
                if ($('.js-expandable-list > li:visible:last').index() === $('.js-expandable-list > li').length - 1) {
                    $(this).html(seeLessTxt + '<i class="fa fa-chevron-up"></i>').removeClass('js-btn-see-more');
                }
            }
            else {
                $('.js-expandable-list > li').each(function () {
                    if ($(this).index() >= amt) $(this).addClass('hidden-item');
                });
                $(this).html(seeMoreTxt + '<i class="fa fa-chevron-down"></i>').addClass('js-btn-see-more');
            }
        });
    }

    var setupCategorySeeMoreBtn = function (amt) {
        $('.js-list-btn').click(function (e) {
            e.preventDefault();

            var btnIdx = $(this).parents('.product-categories').find('.js-list-btn').index($(this));
            var seeMoreTxt = $(this).attr('data-seemore');
            var seeLessTxt = $(this).attr('data-seeless');
            var $listObj = $('.js-expandable-list').eq(btnIdx);

            if ($(this).hasClass('js-btn-see-more')) {
                $listObj.children('li:visible:last').nextAll(':lt(' + amt + ')').removeClass('hidden-item');
                if ($listObj.children('li:visible:last').index() === $listObj.children('li').length - 1) {
                    $(this).html(seeLessTxt + '<i class="fa fa-chevron-up"></i>').removeClass('js-btn-see-more');
                }
            }
            else {
                $listObj.children('li').each(function () {
                    if ($(this).index() >= amt) $(this).addClass('hidden-item');
                });
                $(this).html(seeMoreTxt + '<i class="fa fa-chevron-down"></i>').addClass('js-btn-see-more');
            }
        });
    }

    var responsiveLinksList = function () {
        var hiddenItems = numOfItems();
        hideItems(hiddenItems);
        setupSeeMoreBtn(hiddenItems);
    }

    var productCategoriesList = function () {
        var hiddenItems = numOfItems();
        hideCategoryItems(hiddenItems);
        setupCategorySeeMoreBtn(hiddenItems);
    }
})());

; createNamespace('app.components.mastheadCarousel', (function () {
    $.fn.carousel = function (options) {
        var settings = {
            showDots: true,
            showPreviews: true,
            showPages: false,
            enableSwipe: false,
            rolloverPreviews: false,
            autoRotate: false,
            rotateDelayInSeconds: 5,
            isDotsClickable: true,
            isQuizCarousel: false,
            defaultAnimationSpeed: 500
        };

        $.extend(settings, options);

        return this.each(function (i, e) {
            var carousel = $(this),
				container = carousel.find('.carousel-container'),
				slides = container.find('.carousel-slides'),
				slide = slides.find('.carousel-slide'),
				numOfSlides,
				origNumOfSlides = slide.length,
				quizCarouselContainer = carousel.find('.calculator-tool-quiz-carousel-container');

            if (quizCarouselContainer != undefined && quizCarouselContainer.length) {
                settings.isDotsClickable = false;
                settings.isQuizCarousel = true;
                // Create quiz array
                var quizData = new Array();

                $("a[title='try-again']").on('click', function (e) {
                    e.preventDefault();
                    tryAgainQuiz();
                });
            }

            var navPrev = carousel.find('.carousel-nav-prev'),
				navNext = carousel.find('.carousel-nav-next');

            var previews,
				previewsPrev,
				previewsNext;

            var dots = null,
				dotsDots = null,
				pgs = null,
				pgsPages = null;

            var positions = [],
				moving = false,
				slideWidth = 0;

            if (origNumOfSlides > 1) {
                init();
            } else {
                navPrev.add(navNext).hide();
            }

            function init() {
                setup();

                if (carousel.find('.carousel-nav-next').length)
                    initNav();

                if (settings.showDots)
                    initDots();

                if (settings.showPages)
                    initPages();

                if (settings.showPreviews)
                    initPreviews();

                if (settings.rolloverPreviews)
                    initRollovers();

                if (settings.isQuizCarousel)
                    initQuizProgress();

                if (settings.enableSwipe && !settings.isQuizCarousel) {
                    slide.hammer({
                        drag_block_horizontal: true
                    }).on('swipe drag', function (e) {
                        //e.gesture.preventDefault();
                        //console.log( e.gesture );
                        if (e.type == 'swipe') {
                            e.gesture.preventDefault();
                            if (e.gesture.direction == 'left') {
                                moveNext();
                            } else if (e.gesture.direction == 'right') {
                                movePrev();
                            }
                        }
                    });
                }

                if (settings.autoRotate) {
                    setInterval(function () {
                        moveNext();
                    }, settings.rotateDelayInSeconds * 1000);
                }

                $(window).resize(function () {
                    var oldSlideWidth = slideWidth;
                    var newSlideWidth = carousel.width();

                    if (newSlideWidth != oldSlideWidth) {
                        slideWidth = newSlideWidth;
                        repositionSlides();

                        if (settings.showDots)
                            updateDots();
                    }

                    if (settings.showPreviews)
                        updatePreviews();
                });

                debug();
            }

            function initDots() {
                var dotsHtml = '';
                dotsHtml += '<div class="carousel-dots"><ul>';
                for (var i = 0; i < origNumOfSlides; i++) {
                    dotsHtml += '<li><span class="fa fa-circle">&#xf111;</span></li>';
                }
                dotsHtml += '</ul></div>';

                carousel.append(dotsHtml);
                dots = carousel.find('.carousel-dots');
                dotsDots = dots.find('ul li');
                dotsSpan = dots.find('ul li span');

                if (settings.isDotsClickable) {
                    dotsSpan.on('click', function (e) {
                        e.preventDefault();

                        var howManyTimes = $(this).parent().index() - (positions[2] % origNumOfSlides);
                        move(howManyTimes);
                    });
                }
                updateDots();
            }

            function initPages() {
                var pgsHtml = '';
                pgsHtml += '<div class="carousel-pages"><ul>';
                for (var i = 0; i < origNumOfSlides; i++) {
                    pgsHtml += '<li><a href="#"><span>' + (i + 1) + '</span></a></li>';
                }
                pgsHtml += '</ul></div>';

                carousel.prepend(pgsHtml);
                pgs = carousel.find('.carousel-pages');
                pgsPages = pgs.find('ul li a');

                pgsPages.on('click', function (e) {
                    e.preventDefault();

                    var howManyTimes = $(this).parent().index() - (positions[2] % origNumOfSlides);
                    move(howManyTimes);
                });

                updatePages();
            }

            function initQuizProgress() {
                var pgsHtml = '';
                pgsHtml += '<div class="carousel-dots carousel-progress">';

                pgsHtml += 1 + ' ' + $('input[name=quizProgressText]').val() + ' ' + origNumOfSlides;

                pgsHtml += '</div>';

                carousel.append(pgsHtml);
                navPrev.hide();
                navNext.hide();
            }

            function move(howManyTimes) {
                if (howManyTimes < 0) {
                    howManyTimes = Math.abs(howManyTimes);
                    movePrev(howManyTimes);
                } else if (howManyTimes > 0) {
                    moveNext(howManyTimes);
                }
            }

            function initNav() {
                navPrev = carousel.find('.carousel-nav-prev');
                navNext = carousel.find('.carousel-nav-next');

                navNext.on('click', function (e) {
                    e.preventDefault();
                    moveNext();
                });

                navPrev.on('click', function (e) {
                    e.preventDefault();
                    movePrev();
                });
            }

            function moveNext(howManyTimes, answer) {
                if (!moving) {
                    var activeQuestionNumber = positions[2] % origNumOfSlides;
                    if (settings.isQuizCarousel && (activeQuestionNumber + 1) == origNumOfSlides) {
                        return false;
                    }

                    moving = true;

                    $(slide[positions[0]]).css('left', '+=' + slideWidth * numOfSlides + 'px');
                    slide.animate({
                        'easing': 'linear',
                        'left': '-=' + slideWidth + 'px'
                    }).promise().done(function () {
                        positions[5] = positions[0];
                        positions[0] = positions[1];
                        positions[1] = positions[2];
                        positions[2] = positions[3];
                        positions[3] = positions[4];
                        positions[4] = positions[4] + 1;
                        if (positions[4] >= numOfSlides)
                            positions[4] = 0;

                        moving = false;

                        if (settings.showDots)
                            updateDots();

                        if (settings.showPages)
                            updatePages();

                        if (settings.isQuizCarousel && !answer)
                            updateQuizProgress(false, false);

                        if (settings.isQuizCarousel && answer)
                            updateQuizProgress(false, true);

                        if (howManyTimes > 1)
                            moveNext(howManyTimes - 1);

                        // debug();
                    });
                }
            }

            function movePrev(howManyTimes) {
                if (!moving) {
                    moving = true;

                    if (howManyTimes == (origNumOfSlides - 1) && settings.isQuizCarousel) {
                        settings.defaultAnimationSpeed = 1;
                    }

                    $(slide[positions[5]]).css('left', '-=' + slideWidth * numOfSlides + 'px');
                    slide.animate({
                        'easing': 'linear',
                        'left': '+=' + slideWidth + 'px'
                    }, settings.defaultAnimationSpeed).promise().done(function () {
                        positions[4] = positions[3];
                        positions[3] = positions[2];
                        positions[2] = positions[1];
                        positions[1] = positions[0];
                        positions[0] = positions[5];
                        positions[5] = positions[5] - 1;
                        if (positions[5] < 0)
                            positions[5] = numOfSlides - 1;

                        moving = false;

                        if (settings.showDots)
                            updateDots();

                        if (settings.showPages)
                            updatePages();

                        if (settings.isQuizCarousel)
                            updateQuizProgress(true, false);

                        if (howManyTimes > 1)
                            movePrev(howManyTimes - 1);

                        if ((settings.isQuizCarousel && howManyTimes == 1) || (settings.isQuizCarousel && howManyTimes == 0)) {
                            ////Reset the Quiz data
                            totalScore = 0;
                            quizData = [];
                            navNext.hide();
                            if ($("input[type=radio].css-checkbox").length > 0) {
                                $('input[type=radio]:checked').prop('checked', false);
                            }
                            settings.defaultAnimationSpeed = 500;
                            $('.quiz-result-container').hide();
                            $('.calculator-tool-quiz').addClass('hidden');
                            $('#assessmentContainer').removeClass('hidden');
                            $('#assessmentContainer').show();
                        }
                    });
                }
            }

            // TODO: Clean this up!
            function repositionSlides() {
                slides.width(slideWidth * numOfSlides);
                slide.width(slideWidth);

                slide.each(function () {
                    var slide = $(this);
                    var i = slide.index();
                    var separator = (numOfSlides + positions[2] - 3) % numOfSlides;

                    // currSlide: 3 4 5 6
                    // separator: 0 1 2 3
                    if (separator <= (numOfSlides - 4)) {
                        if (i <= separator) {
                            $(this).css('left', slideWidth * parseInt(numOfSlides - positions[2]) + 'px');
                        } else {
                            $(this).css('left', '-' + slideWidth * positions[2] + 'px');
                        }

                        // currSlide: 0 1 2
                        // separator: 4 5 6
                    } else if (separator > (numOfSlides - 4)) {
                        if (i > separator) {
                            //console.log( i + ' > ' + separator);
                            $(this).css('left', '-' + slideWidth * parseInt(numOfSlides + positions[2]) + 'px');
                        } else {
                            //console.log( i + ' <= ' + separator);
                            $(this).css('left', '-' + slideWidth * positions[2] + 'px');
                        }
                    }

                    //console.log('[' + i + '] ' + ' left: ' + $(this).css('left'));
                });
            }

            // TODO: clean this up!
            function setup() {
                if (origNumOfSlides < 5) {
                    if (origNumOfSlides == 2) {
                        // duplicate AB to ABabab
                        slides.append($(slide[0]).clone(true));
                        slides.append($(slide[1]).clone(true));
                        slides.append($(slide[0]).clone(true));
                        slides.append($(slide[1]).clone(true));
                    } else if (origNumOfSlides == 3) {
                        // duplicate ABC to ABCabc
                        slides.append($(slide[0]).clone(true));
                        slides.append($(slide[1]).clone(true));
                        slides.append($(slide[2]).clone(true));
                    } else if (origNumOfSlides == 4) {
                        // duplicate ABCD to ABCDabcd
                        slides.append($(slide[0]).clone(true));
                        slides.append($(slide[1]).clone(true));
                        slides.append($(slide[2]).clone(true));
                        slides.append($(slide[3]).clone(true));
                    }
                }

                slide = slides.find('.carousel-slide');
                slide.css('left', '0');
                numOfSlides = slide.length;

                slideWidth = carousel.width();
                slides.width(slideWidth * numOfSlides);
                slide.width(slideWidth);

                positions = [numOfSlides - 2, numOfSlides - 1, 0, 1, 2, numOfSlides - 3];
                repositionSlides();

                slide.css('display', 'block');

                //debug();
            }

            function initRollovers() {
                navPrev.hover(function () {
                    navPrev.addClass('hover');
                }, function () {
                    navPrev.removeClass('hover');
                });

                navNext.hover(function () {
                    navNext.addClass('hover');
                }, function () {
                    navNext.removeClass('hover');
                });
            }

            function initPreviews() {
                container.append('<a href="#" class="carousel-preview carousel-preview-prev"><span>Prev</span></a>');
                container.append('<a href="#" class="carousel-preview carousel-preview-next"><span>Next</span></a>');

                previews = carousel.find('.carousel-preview');
                previewsPrev = carousel.find('.carousel-preview.carousel-preview-prev');
                previewsNext = carousel.find('.carousel-preview.carousel-preview-next');

                updatePreviews();

                previewsPrev.on('click', function (e) {
                    e.preventDefault();
                    movePrev();
                });

                previewsNext.on('click', function (e) {
                    e.preventDefault();
                    moveNext();
                });
            }

            function updateIndicators(obj) {
                if (obj != null) {
                    var active = positions[2] % origNumOfSlides;
                    obj.removeClass('active');
                    $(obj[active]).addClass('active');
                }
            }

            function updateDots() {
                updateIndicators(dotsDots);
                if (dots != null) {
                    var marginLeft = (slideWidth - dots.width()) / 2;
                    dots.css({
                        'left': marginLeft + 'px'
                    });
                }
            }

            function updatePages() {
                updateIndicators(pgsPages);
            }

            function updatePreviews() {
                var containerWidth = $(window).width();
                var leftMargin = ($(window).width() - slideWidth) / 2;

                container.css({
                    'margin-left': '-' + leftMargin + 'px',
                    'width': containerWidth + 'px'
                });

                slides.css({
                    'left': leftMargin + 'px'
                });

                previews.css({
                    'left': leftMargin + 'px',
                    'width': slideWidth + 'px'
                });

                var prevPrev = leftMargin - slideWidth;
                previewsPrev.css({
                    'left': prevPrev + 'px'
                });

                var nextPrev = leftMargin + slideWidth;
                previewsNext.css({
                    'left': nextPrev + 'px'
                });
            }

            function updateQuizProgress(back, answer) {
                var active = positions[2] % origNumOfSlides;
                $('.carousel-progress').html((active + 1) + ' ' + $('input[name=quizProgressText]').val() + ' ' + origNumOfSlides);
                // console.log('active: ' + active);

                if (active == 0) {
                    navPrev.hide();
                    navNext.hide();
                }

                if (quizData != undefined && quizData.length > 0) {
                    var isQuestionFound = false;
                    var currentQuestionNumber = 'question' + (active + 1);
                    for (var index = 0; index < quizData.length; index++) {
                        if (quizData[index].question == currentQuestionNumber) {
                            isQuestionFound = true;
                            if (active > 0 && active < origNumOfSlides) {
                                navPrev.show();
                                navNext.show();
                            }

                            if (active == 0) {
                                navNext.show();
                            }

                            break;
                        }
                    }

                    if (!isQuestionFound && active > 0) {
                        navPrev.show();
                        navNext.hide();
                    }

                    if (!isQuestionFound && active > 1 && back) {
                        navPrev.show();
                        navNext.show();
                    }

                    /*commented out as this causes unintended arrows.  need to setup triggers to act on questions instead of just advancement if this is to work appropriately*/
                    // if(!isQuestionFound && active > 1 && !back && !answer){
                    //     navPrev.show();
                    //     navNext.show();
                    // }

                    if (!isQuestionFound && active === 1 && back) {
                        navPrev.hide();
                        navNext.show();
                    }

                    if ((active + 1) == origNumOfSlides) {
                        navNext.hide();
                    }
                }
            }

            function debug() {
                //container.width(10000);

                //console.log('=============');
                //console.log('slideWidth: ' + slideWidth);
                //console.log('positions: ' + positions);
                /*
                for (var i = 0; i < numOfSlides; i++)
                console.log( $(slide[i]).css('left') )
                */
            }

            function quizConstructor(question, answer, score) {
                this.question = question;
                this.answer = answer;
                this.score = score;
            }

            function saveAnswers() {
                var data = $(this);
                var questionId = $(this).attr('name');
                var answer = $(this).attr('value');
                var score = $(this).data('score');
                var arrayLength = quizData.length;
                var isAlreadyAdded = false;

                if (positions[2] === undefined && origNumOfSlides == 1) {
                    positions[2] = 1;
                }

                var active = positions[2] % origNumOfSlides;
                var currentQuestionNumber = (active + 1);
                if (quizData != undefined && quizData.length > 0) {
                    for (var index = 0; index < quizData.length; index++) {
                        if (quizData[index].question == questionId) {
                            quizData[index].answer = answer;
                            totalScore -= quizData[index].score; //// Minus the old score value before updation.
                            quizData[index].score = score; //// updated the score
                            totalScore += score; //// Add current score to total score
                            isAlreadyAdded = true;
                            break;
                        }
                    }
                }

                if (!isAlreadyAdded) {
                    quizData[arrayLength] = new quizConstructor(questionId, answer, score);
                    totalScore += score;
                }

                ////Redirect to next slide
                if (navNext != undefined && currentQuestionNumber < origNumOfSlides) {
                    moveNext(1, true);
                }

                if (currentQuestionNumber == origNumOfSlides) {
                    $('.calculator-tool-quiz').hide();
                    $('#quiz-score').text(totalScore);
                    if ($('.results-slide').length) {
                        $('.results-slide').each(function () {
                            var startRange = $(this).attr('data-start-range');
                            var endRange = $(this).attr('data-finish-range');

                            if (startRange <= totalScore && endRange >= totalScore) {
                                $(this).show();
                                $('.quiz-result-header').text($(this).find('input[name="quizResultHeader"]').val());
                                $('.quiz-result-container').fadeIn();
                                return false;
                            }
                        });
                    }
                }
            }

            if (settings.isQuizCarousel) {
                var totalScore = 0;
                if ($("input[type=radio].css-checkbox").length > 0) {
                    $('input[type=radio].css-checkbox').bind('click', saveAnswers);
                }
            }

            function tryAgainQuiz() {
                $('.results-slide').each(function () {
                    $(this).hide();
                });
                movePrev(origNumOfSlides - 1);
            }
        });
    };

    $(document).ready(function () {
        if ($('.masthead-carousel.carousel').length) {
            $('.masthead-carousel.carousel').each(function () {
                if ($(this).hasClass('rollover')) {
                    $(this).carousel({
                        rolloverPreviews: true,
                        showDots: true,
                        showPreviews: false,
                        enableSwipe: true
                    });
                } else {
                    $(this).carousel({
                        showDots: true,
                        showPreviews: true,
                        enableSwipe: true
                    });
                }
            });
        }
    });
})()); ; createNamespace('app.components.mobileNavDrawer', (function () {
    var toggleMobileNavIcon = function (e) {
        $('.mobile-nav-drawer').toggleClass('fa-bars');
        $('.mobile-nav-drawer').toggleClass('fa-times-circle-o');
        $('.mobile-nav-drawer').toggleClass('close-button');

        if ($('.mobile-drawer-container').hasClass('slide')) {
            $('.left-header-text-thin-nav').hide();
            $('.left-header-thin-nav').hide();
            $('#rightLogo').css({ 'position': 'static' });
        }

        if (!$('.mobile-drawer-container').hasClass('slide')) {
            $('.left-header-text-thin-nav').show();
            $('.left-header-thin-nav').show();
            $('#rightLogo').css({ 'position': 'absolute' });
        }

        if ($('.left-header-thin-nav').length == 0) {
            $('#rightLogo').css({ 'position': 'static', 'bottom': '0' });
            $('#rightLogo > img').css({ 'padding': '14px 0px 14px' });
        }

        if ($('.left-header-text-thin-nav').length && !$('.mobile-drawer-container').hasClass('slide')) {
            $('#rightLogo').css({ 'position': 'absolute', 'bottom': '0px' });
            $('#rightLogo > img').css({ 'padding': '0' });
        }

        if ($('.left-header-thin-nav').length && $('.mobile-drawer-container').hasClass('slide')) {
            $('#rightLogo > img').css({ 'padding': '14px 0px 14px' });
        }

        if ($('.left-header-thin-nav').length && !$('.mobile-drawer-container').hasClass('slide')) {
            $('#rightLogo > img').css({ 'padding': '0' });
        }
    };
    $(document).ready(function () {
        if ($('.mobile-nav-drawer') !== "undefined") {
            $('.mobile-nav-drawer').click(function (e) {
                $.event.trigger('toggleMobileNav');
            });
        }
        $(document).bind('toggleMobileNav', toggleMobileNavIcon);
    });
})()); ; createNamespace('app.components.navMegamenu', (function () {
    var openingMenu = false;

    $(document).ready(function () {
        var megaMenu = $("nav.nav-megamenu");
        var megaMenuType = megaMenu.data("type");
        if (megaMenuType == undefined || megaMenuType == "" || megaMenuType != "thin-nav") {
            $('.main-nav > li').mouseenter(function (e) {
                //Checking for touch prevents mouseenter from triggering the click actions
                //the first time the user taps on it
                if ($('html').hasClass("no-touch")) {
                    if ($(e.currentTarget).find('.sub-nav').hasClass('expanded')) {
                        collapseSubNav(e);
                    } else {
                        expandSubNav(e);
                    }
                }
            });
        }
        $('.main-nav > li').mouseleave(function (e) {
            if ($('html').hasClass("no-touch")) {
                collapseSubNav(e);
            }
        });
        if (megaMenuType == undefined || megaMenuType == "" || megaMenuType != "thin-nav") {
            $('.main-nav > li').click(function (e) {
                e.preventDefault();
                // On mobile webkit click fires after mouseenter, so we are checking for expanded since
                // the items with sub navigation will have this class and the items without will navigate
                if ($(e.currentTarget).find('.sub-nav').hasClass('expanded')) {
                    collapseSubNav(e);
                } else {
                    collapseAll();
                    expandSubNav(e);
                }
                /*if ($(e.currentTarget).find('.sub-nav').hasClass('expanded') && $('html').hasClass('touch')) {
                e.preventDefault();
                }*/
            });
        }
        $('.sub-nav a').click(function (e) {
            e.stopPropagation();
        });

        var expandSubNav = function (e) {
            $(e.currentTarget).addClass('expanded');
            $(e.currentTarget).find('.sub-nav').addClass('expanded');
            $('.nav-megamenu').addClass('expanded-subnav');
            $('.utility-nav').addClass('expanded-subnav');
            $.event.trigger('openFlyout');
        };

        var collapseSubNav = function (e) {
            $(e.currentTarget).removeClass('expanded');
            $(e.currentTarget).find('.sub-nav').removeClass('expanded');
            $('.nav-megamenu').removeClass('expanded-subnav');
            $('.utility-nav').removeClass('expanded-subnav');
            $.event.trigger('closeFlyout');
        };

        var collapseAll = function () {
            //console.log("collapse all");
            $('.main-nav').find('.sub-nav').removeClass('expanded')
            $('.main-nav').find('li').removeClass('expanded');
            $('.nav-megamenu').removeClass('expanded-subnav');
            $('.utility-nav').removeClass('expanded-subnav');
            $.event.trigger('closeFlyout');
        };
    });
})()); ; createNamespace('app.components.tertiary-nav', (function () {
    $('.highlight').removeClass('highlight');
    $('.tertiary-nav li').hover(
		function () {
		    $(this).children('div').addClass('highlight');
		},
		function () {
		    $(this).children('div').removeClass('highlight');
		}
	);

    // on page load, if .active is on LI, add .highlight
    $('.sub-nav li.active').children('div').addClass('highlightActive');
})()); ; createNamespace('app.components.newsFeedTile', (function () {
    $(document).ready(function () {
        if ($('.js-news-feed-tile').length > 0) {
            getRSSFeed();
        }
    });

    var getRSSFeed = function () {
        var rssUrl = $('.js-news-feed-tile').attr('data-src');
        var rssTotal = parseInt($('.js-news-feed-tile').attr('data-total'));
        var rssNewsStory = new Array();
        var rssPerView = parseInt($('.js-news-feed-tile').attr('data-perpage'));

        $.ajax({
            url: 'https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=?&q=' + encodeURIComponent(rssUrl),
            dataType: 'json',
            success: function (data) {
                var i = 0;
                while (i < rssTotal) {
                    var entryID = 'rssNewsStory_' + i;
                    var entry = data.responseData.feed.entries[i];
                    var entryTitle = entry.title;
                    var entryLink = entry.link;
                    var entryDate = entry.publishedDate;
                    rssNewsStory[i] = new rssNews(entryID, entryTitle, entryLink, entryDate);
                    rssNewsStory[i].buildTemplate(i);
                    i++;
                }
            }
        });
    }

    var rssNews = function (newsID, newsTitle, newsLink, newsDate) {
        this.newsID = newsID;
        this.newsTitle = newsTitle;
        this.newsLink = newsLink;
        this.newsDate = newsDate;
    }

    rssNews.prototype = {
        buildTemplate: function (numID) {
            var rssFeedObj = $('.js-news-feed-list');
            var rssTemplate = '<li class="js-news-feed-item"><div><span class="mo js-news-feed-month"></span><span class="day js-news-feed-day"></span></div><a class="js-news-feed-title" href="#" onclick=linkTracking(\'' + this.newsLink + '\')></a></li>';
            rssFeedObj.append(rssTemplate);
            $('.js-news-feed-title').eq(numID).attr('href', this.newsLink).text(this.newsTitle).parent().attr('id', this.newsID);
            this.rssDisplayDate(numID);
        },
        rssDisplayDate: function (idNum) {
            var date = this.newsDate;
            var day = date.split(' ')[1];
            var month = date.split(' ')[2];
            $('.js-news-feed-day').eq(idNum).text(day);
            $('.js-news-feed-month').eq(idNum).text(month);
        }
    }
})()); ; createNamespace('app.components.pagination', (function () {
    $(document).ready(function () {
        if ($('.js-pagination-select').length > 0) {
            setupPaginationSelect();
        }
    });

    var setupPaginationSelect = function () {
        var paginationSelect = new customSelect('.js-pagination-select');
        paginationSelect.init();
    }

    var customSelect = function (wrapper) {
        this.original = wrapper + ' .js-original-select';
        this.wrapper = wrapper;
        this.selectedArea = wrapper + ' .js-custom-select-area';
        this.selectedText = wrapper + ' .js-custom-select-text';
        this.optionsList = wrapper + ' .js-custom-select-options-list';
        this.template = '<div class="custom-select-selected js-custom-select-area"><span class="custom-select-selected-text js-custom-select-text"></span><span class="custom-select-selected-arrow"><i class="fa fa-chevron-down"></i></span></div><ul class="custom-select-option-list js-custom-select-options-list"></ul>';
        this.init = function () {
            this.createCustomSelect();
            this.toggleSelectOptionList();
            this.changeSelectedOption();
            this.listenForSelectChanges();
        },
		this.createCustomSelect = function () {
		    $(this.original).before(this.template);

		    $(this.original).children('option').each(function () {
		        var selectOption = $(this).val();
		        $(this).parent().parent().find('.js-custom-select-options-list').append('<li class="custom-select-option">' + selectOption + '</li>');
		    });
		    this.setSelectedOption();
		},
		this.setSelectedOption = function () {
		    var selectedText = $(this.original).children('option:selected').val();
		    $(this.selectedText).text(selectedText);
		},
		this.toggleSelectOptionList = function () {
		    var $origSelect = $(this.original);
		    $(this.selectedArea).click(function (e) {
		        if ($(this).hasClass('custom-select-expanded')) {
		            $(this).removeClass('custom-select-expanded').next().hide();
		        }
		        else if ($(document).width() < 600) {
		            $origSelect.focus();
		            $(this).addClass('custom-select-expanded').next().show();
		        }
		        else {
		            $(this).addClass('custom-select-expanded').next().show();
		        }
		    });
		},
		this.changeSelectedOption = function () {
		    var $originalSelect = $(this.original);
		    var $selectedArea = $(this.selectedArea);
		    $(this.optionsList).children('.custom-select-option').click(function () {
		        var optText = $(this).text();
		        $originalSelect.val(optText).trigger('change');
		        $selectedArea.removeClass('custom-select-expanded').next().hide();
		    });
		    this.setSelectedOption();
		},
		this.listenForSelectChanges = function () {
		    var $txtObj = $(this.selectedText);
		    var $listObj = $(this.optionsList);
		    var $areaObj = $(this.selectedArea);
		    $(this.original).change(function () {
		        var mobileOption = $(this).children('option:selected').val();
		        $txtObj.text(mobileOption);
		        $areaObj.focus().removeClass('custom-select-expanded').next().hide();
		    });
		}
    }
})()); ; createNamespace('app.components.productLinksList', (function () {
    $(document).ready(function () {
        if ($('.js-product-links-list-toggle').length > 0) {
            initProductLinksListToggle();
        }
    });

    var initProductLinksListToggle = function () {
        $('.product-links-list').each(function () {
            var list = $(this),
				listToggle = list.find('.js-product-links-list-toggle'),
				listToggleIcon = listToggle.find('.fa'),
				listContents = list.find('.product-links-list-contents');

            listToggle.on('click', function (e) {
                e.preventDefault();

                if ($(listToggleIcon).hasClass('fa-chevron-up')) {
                    listContents.slideUp(function () {
                        listToggleIcon.removeClass('fa-chevron-up');
                        listToggleIcon.addClass('fa-chevron-down');
                    });
                } else if ($(listToggleIcon).hasClass('fa-chevron-down')) {
                    listContents.slideDown(function () {
                        $(listToggleIcon).removeClass('fa-chevron-down');
                        $(listToggleIcon).addClass('fa-chevron-up');
                    });
                }
            });
        });
    }
})()); ; createNamespace('app.components.productViewer', (function () {
    $.fn.productViewer = function (options) {
        var settings = {
            showSides: true
        };

        $.extend(settings, options);

        return this.each(function (i, e) {
            var viewer = $(this),
				images = viewer.find('.product-viewer-gallery-image ul li'),
				carousel = viewer.find('.product-viewer-gallery-carousel'),
				descriptions = viewer.find('.product-viewer-gallery-description p'),
				zoomLink = viewer.find('.zoom-link');

            var carouselImages = carousel.find('.product-viewer-gallery-carousel-images'),
				carouselImagesContainer = carouselImages.find('ul'),
				carouselImagesContainerItem = carouselImagesContainer.find('li'),
				carouselPrev = carousel.find('.product-viewer-gallery-carousel-nav.prev'),
				carouselNext = carousel.find('.product-viewer-gallery-carousel-nav.next');

            var numOfItems = carouselImagesContainerItem.length,
				numToShow = 5,
				numOfPages = Math.ceil(numOfItems / numToShow),
				currPage = 1,
				moving = false;

            var posX = 0,
				posY = 0,
				lastPosX = 0,
				lastPosY = 0;

            var SCREEN_SM_MAX = 600;

            init();

            function init() {
                // setup
                carouselImagesContainer.css('width', numOfItems * 100 + '%');

                updateNav();

                // click prev / next
                carouselPrev.on('click', function (e) {
                    e.preventDefault();
                    movePrev();
                });

                carouselNext.on('click', function (e) {
                    e.preventDefault();
                    moveNext();
                });

                carouselImagesContainerItem.on('click', function (e) {
                    e.preventDefault();
                    changeImage($(this).index());
                });

                if (settings.showSides) {
                    viewer.find('> div').prepend('<div class="product-viewer-side"></div>');
                    viewer.find('> div').prepend('<div class="product-viewer-side right"></div>');
                }

                zoomLink.add(images.find('a')).on('click', function (e) {
                    e.preventDefault();
                    $.fancybox(this, {
                        type: 'image'
                    });
                });

                // drag
                if ($(window).width() < SCREEN_SM_MAX) {
                    carouselImages.hammer().on('tap touch drag dragend', function (e) {
                        e.gesture.preventDefault();

                        switch (e.type) {
                            case 'tap':
                                changeImage($(e.gesture.target).parent().parent().index());
                                break;

                            case 'drag':
                                posX = e.gesture.deltaX + lastPosX;
                                if (posX > 0)
                                    posX = 0;

                                var right = $(carouselImagesContainerItem[0]).outerWidth(true) * carouselImagesContainerItem.length - carouselImages.width();
                                if (posX < -right)
                                    posX = -right;
                                break;

                            case 'dragend':
                                lastPosX = posX;
                                break;
                        }

                        carouselImagesContainer.css({
                            left: posX + 'px'
                        });
                    });
                }

                updateBackground();
                $(window).resize(updateBackground);
            }

            function changeImage(index) {
                // reset
                carouselImagesContainerItem.removeClass('active');
                images.removeClass('active');
                descriptions.removeClass('active');

                $(carouselImagesContainerItem[index]).addClass('active');
                $(images[index]).addClass('active');
                $(descriptions[index]).addClass('active');
            }

            function updateBackground() {
                var margin = ($(window).width() - viewer.find('.container').width()) / 2;
                if (margin > 0) {
                    viewer.css('margin-left', -margin + 'px');
                    viewer.css('margin-right', -margin + 'px');
                } else {
                    viewer.css('margin-left', -10 + 'px');
                    viewer.css('margin-right', -10 + 'px');
                }

                if (settings.showSides) {
                    if (margin > 0) {
                        $('.product-viewer-side').css('width', margin + 'px');
                    } else {
                        $('.product-viewer-side').css('width', '0px');
                    }
                }
            }

            function moveNext() {
                if (!moving) {
                    moving = true;
                    carouselImagesContainer.animate({
                        'left': '-=' + 100 + '%'
                    }).promise().done(function () {
                        currPage++;
                        moving = false;
                        updateNav();
                    });
                }
            }

            function movePrev() {
                if (!moving) {
                    moving = true;
                    carouselImagesContainer.animate({
                        'left': '+=' + 100 + '%'
                    }).promise().done(function () {
                        currPage--;
                        moving = false;
                        updateNav();
                    });
                }
            }

            function updateNav() {
                carouselPrev.css('visibility', 'visible');
                carouselNext.css('visibility', 'visible');
                if (currPage == 1) {
                    carouselPrev.css('visibility', 'hidden');
                }
                if (currPage == numOfPages) {
                    carouselNext.css('visibility', 'hidden');
                }
            }

            function debug() {
                //console.log(viewer);
                //console.log(images);
                //console.log(carousel);
                //console.log(descriptions);
            }
        });
    };

    $(document).ready(function () {
        $('.product-viewer.two-col-parsys.clearfix').attr('style', ' ');

        if ($('.product-viewer').length && $('.product-viewer.two-col-parsys').length < 1) {
            $('.product-viewer').productViewer();

            if ($('.fancybox-media').length) {
                $('.fancybox-media').fancybox({
                    helpers: {
                        media: {}
                    }
                });
            }
        }
    });
})()); ; createNamespace('app.components.responsiveImage', (function () {
    $(document).ready(function () {
        var mobileBreakPoint = 959;

        loadResponsiveImage();

        handleResizing(mobileBreakPoint, loadResponsiveImage);
        handleResizing(599, loadResponsiveImage);
    });

    var handleResizing = function (breakPoint, myFunc) {
        if (window.matchMedia && !$('html').hasClass('lt-ie9')) {
            var mq = window.matchMedia("(min-width: " + breakPoint + "px)");
            if (mq.addListener) {
                mq.addListener(myFunc);
            } else if (window.attachEvent) {
                window.attachEvent('onresize', myFunc);
            }
        } else {
            //throw {name: "Browser Support Exception", description: "No matchMedia support"};
        }
    };

    var loadResponsiveImage = function () {
        $('.js-image-responsive').each(function () {
            var highPxDensity = resCheck();

            var xsImgPath = $(this).attr('data-xssrc');
            var smImgPath = $(this).attr('data-smsrc');
            var mdImgPath = $(this).attr('data-mdsrc');
            var hd_xsImgPath = $(this).attr('data-hdxssrc');
            var hd_smImgPath = $(this).attr('data-hdsmsrc');
            var hd_mdImgPath = $(this).attr('data-hdmdsrc');
            var mediaWidth = $(document).width();
            var smBP = 600;
            var mdBP = 960;
            var imgPath;

            if (mediaWidth >= mdBP) {
                if (highPxDensity) imgPath = hd_mdImgPath;
                else imgPath = mdImgPath;
            }
            else if ((mediaWidth >= smBP && mediaWidth < mdBP)) {
                if (highPxDensity) imgPath = hd_smImgPath;
                else imgPath = smImgPath;
            }
            else {
                if (highPxDensity) imgPath = hd_xsImgPath;
                else imgPath = xsImgPath;
            }

            $(this).load().attr('src', imgPath);
        });
    };

    var resCheck = function () {
        var isHighRes = false,
            ratio = '2.99/2',
            num = '1.5',
            mqs = [
              'only screen and (-o-min-device-pixel-ratio:' + ratio + ')',
              'only screen and (min--moz-device-pixel-ratio:' + num + ')',
              'only screen and (-webkit-min-device-pixel-ratio:' + num + ')',
              'only screen and (min-device-pixel-ratio:' + num + ')'
            ];

        if (!$('html').hasClass('lt-ie9')) {
            for (var i = mqs.length - 1; i >= 0; i--) {
                isHighRes = Modernizr.mq(mqs[i]);
                if (isHighRes) break;
            }
        }

        return isHighRes;
    };
})());

; createNamespace('app.components.resultsProductFinder', (function () {
    $(document).ready(function () {
        if ($('.js-results-product-finder').length > 0) {
            setupExpandableHeader();
        }
    });

    var setupExpandableHeader = function () {
        $('.js-results-product-finder-header').click(function (e) {
            var $finder = $(this).parent();
            var $slideObj = $finder.find('.js-results-product-finder-contents');
            var showTxt = $finder.attr('data-showtxt');
            var hideTxt = $finder.attr('data-hidetxt');

            e.preventDefault();

            if ($finder.hasClass('finder-expanded')) {
                $finder.removeClass('finder-expanded').find('.js-results-product-finder-header-link-text').text(showTxt).next().children('.fa').removeClass('fa-chevron-up').addClass('fa-chevron-down');
                $slideObj.slideUp(500);
            }
            else {
                $finder.addClass('finder-expanded').find('.js-results-product-finder-header-link-text').text(hideTxt).next().children('.fa').removeClass('fa-chevron-down').addClass('fa-chevron-up');
                $slideObj.slideDown(500);
            }
        });
    }
})()); ; createNamespace('app.components.sectionAccordion', (function () {
    $(document).ready(function () {
        if ($('.js-section-accordion-optional').length > 0) {
            $('.js-section-accordion-view-btn').click(function (e) {
                var seeMoreText = $(this).attr('data-seemore');
                var seeLessText = $(this).attr('data-seeless');
                e.preventDefault();

                if ($(this).prev().is(':visible')) $(this).children('.js-view-btn-text').text(seeMoreText).next().removeClass('fa-chevron-up').addClass('fa-chevron-down').parent().prev().hide();
                else $(this).children('.js-view-btn-text').text(seeLessText).next().removeClass('fa-chevron-down').addClass('fa-chevron-up').parent().prev().show();
            });
        }
    });
})()); ; createNamespace('app.components.enlargePrint', (function () {
    $(document).ready(function () {
        if ($('.sidebar-enlarge-print').length) {
            $('.sidebar-enlarge-print').each(function () {
                var enlarge = $(this).find('.enlarge'),
					print = $(this).find('.print'),
					currentFontSize = parseInt($('body').css('font-size'));

                enlarge.on('click', function (e) {
                    e.preventDefault();
                    if (parseInt($('body').css('font-size')) != currentFontSize) {
                        $('body').css('font-size', currentFontSize + 'px');
                    } else {
                        $('body').css('font-size', (currentFontSize + 1) + 'px');
                    }
                });

                print.on('click', function (e) {
                    e.preventDefault();
                    window.print();
                    if ($(this).hasClass('stop-reload')) {
                        return;
                    }
                    if (/chrom(e|ium)/.test(navigator.userAgent.toLowerCase())) {
                        //workaround for Chrome bug - https://code.google.com/p/chromium/issues/detail?id=141633
                        if (window.stop) {
                            location.reload(); //triggering unload (e.g. reloading the page) makes the print dialog appear
                            window.stop(); //immediately stop reloading
                        }
                    }
                });
            });
        }
    });
})()); ; createNamespace('app.components.socialTile', (function () {
    $(document).ready(function () {
        loadDefaultFeed();

        $('.js-social-media-option').click(function (e) {
            var currObj = $(this),
				feedUrl = currObj.attr('data-src'),
				socialType = currObj.attr('data-feed'),
				feedObj = $('#' + socialType);

            e.preventDefault();
            currObj.addClass('active');
            $('.js-social-media-option').not(currObj).removeClass('active');
            $('.js-feed-obj').not(feedObj).hide();

            if (feedObj.length > 0) feedObj.fadeIn(500);
            else {
                $('.js-social-loading').show();
                getSocialFeed(socialType, feedUrl);
            }
        });

        var tilenum = $(".social-media-tabs li").length;
        if (tilenum == 3) {
            $(".social-media-tabs li").css("width", "32%");
        }
        else if (tilenum == 2) {
            $(".social-media-tabs li").css("width", "48%");
        }
        else {
            $(".social-media-tabs").css("background", "linear-gradient(to bottom,  rgba(211,211,211,1) 6%,rgba(255,255,255,1) 73%)");
            $(".social-media-tabs li").css({ 'width': '50%', 'border': '1px solid #d3d3d3', 'border-width': '0 1px', 'margin': '0 25%', 'background': '#ffffff' });
        }
    });

    function loadDefaultFeed() {
        var defaultFeed = $('.js-social-media-option').first().attr('data-src');
        var defaultFeedType = $('.js-social-media-option').first().attr('data-feed');
        getSocialFeed(defaultFeedType, defaultFeed);
    }

    function getSocialFeed(feedType, dataUrl) {
        var loadObj = $('.js-social-media-content');
        $.get(dataUrl, function (response) {
            loadObj.append(response);
        }).done(function () {
            setTimeout(function () {
                loadObj.fadeIn(500).prev().hide();
            }, 500);
        });
    }
})()); ; createNamespace('app.components.solutionBlock', (function () {
    $(document).ready(function () {
        if ($('.js-solution-block').length > 0) {
            setupExpandableSolution();
        }
    });

    var setupExpandableSolution = function () {
        $('.js-solution-block-header').click(function (e) {
            var $block = $(this).parent();
            var slideClass;
            var $slideObj;
            var showTxt = $block.attr('data-showtxt');
            var hideTxt = $block.attr('data-hidetxt');

            e.preventDefault();

            if ($(document).width() > 599) {
                slideClass = '.js-solution-block-products';
            }
            else {
                slideClass = '.js-solution-block-body';
            }

            $slideObj = $block.find(slideClass);

            if ($block.hasClass('solution-expanded') && $slideObj.length > 0) {
                $block.removeClass('solution-expanded').find('.js-solution-block-header-link-text').text(showTxt).next().children('.fa').removeClass('fa-chevron-up').addClass('fa-chevron-down');
                $slideObj.slideUp(500);
            }
            else {
                $block.addClass('solution-expanded').find('.js-solution-block-header-link-text').text(hideTxt).next().children('.fa').removeClass('fa-chevron-down').addClass('fa-chevron-up');

                $('.solution-expanded').not($block).removeClass('solution-expanded').find('.js-solution-block-header-link-text').text(showTxt).next().children('.fa').removeClass('fa-chevron-up').addClass('fa-chevron-down');

                $slideObj.slideDown(500);
                $(slideClass).not($slideObj).slideUp(500);
            }
        });
    }
})()); ; createNamespace('app.components.solutionFilter', (function () {
    $(document).ready(function () {
        if ($('.product-categories-filter .solution-filter').length) {
            setupResultsAmount();

            $('.product-categories-filter .solution-filter').filterDropdown({
                doneChangeFilter: setupResultsAmount,
                filterWithinContainer: '.product-categories-list',
                filterItem: '.product-tile'
            });
        } else if ($('.solution-filter').length) {
            $('.solution-filter').filterDropdown({
                filterItem: '.js-solution-block'
            });
        }
    });

    $.fn.filterDropdown = function (options) {
        // filterWithinContainer: search within a specific container
        // filterItem: ID or class on each individual items that can be filtered
        var settings = {
            doneChangeFilter: function () { },
            filterWithinContainer: '',
            filterItem: ''
        };

        $.extend(settings, options);

        return this.each(function () {
            var filter = $(this),
				filterSelected = filter.find('.js-solution-filter-selected'),
				filterOptionList = filter.find('.js-solution-filter-option-list'),
				filterOptionNames = new Array();
            filterOptionTags = new Array();
            filterResultArray = new Array();

            // generate filter options by what is on the page
            $('.js-filter-option-name').each(function () {
                var filterName = $(this).text();
                var filterData;

                if ($(this).hasClass('js-product-category-name')) {
                    filterData = $(this).parent().next().children(settings.filterItem).attr('data-tags').split(/\s+/);
                }

                else
                    filterData = $(this).parents(settings.filterItem).attr('data-tags').split(/\s+/);

                // check if filter name already exists in array
                if ($.inArray(filterName, filterOptionNames) === -1) {
                    filterOptionNames.push(filterName);
                    for (var i = 0; i < filterData.length; i++) {
                        var tagData = filterData[i];
                        if (tagData.length > 0) {
                            if ($.inArray(tagData, filterOptionTags) === -1) {
                                filterOptionTags.push(tagData);
                            }
                        }
                    }
                }
            });

            // sort the array of tags
            for (var i = 0; i < filterOptionNames.length; i++) {
                filterResultArray.push([filterOptionNames[i], filterOptionTags[i]]);
            }

            filterResultArray.sort(sortByFilterName);

            for (var j = 0; j < filterResultArray.length; j++) {
                var filterOption = '<li class="solution-filter-option js-solution-filter-option" data-tag="' + filterResultArray[j][1] + '">' + filterResultArray[j][0] + '</li>';
                filterOptionList.append(filterOption);
            }

            filterSelected.click(function () {
                $(this).next().slideToggle(500, function () {
                    if ($('.js-ccode-finder-search-filter').length) {
                        var selectedOption = filterSelected.attr('data-tag');
                        if ($('.js-solution-filter-option-list').is(':visible') && selectedOption == '') {
                            $('.js-solution-filter-selected').removeClass('ccode-finder-nofilter-background');
                        }
                        else if (selectedOption == '') {
                            $('.js-solution-filter-selected').addClass('ccode-finder-nofilter-background');
                        }
                    }

                    $(".solution-filter-header").css("border-radius", "0 5px 0 0");
                });
            });

            filterOptionList.on('click', '.js-solution-filter-option', function () {
                var selected = $(this),
					selectedText = selected.text(),
					selectedOption = selected.data('tag');

                // change the value of the selected and slide up the dropdown
                $(this).parent().slideUp(500).prev().children('.js-solution-filter-selected-text').text(selectedText);

                if ($('.js-ccode-finder-search-filter').length) {
                    $(this).parent().prev().attr('data-tag', selectedOption);

                    if (selectedOption === '') {
                        $('.js-solution-filter-selected').addClass('ccode-finder-nofilter-background');
                    }
                    else {
                        $('.js-solution-filter-selected').removeClass('ccode-finder-nofilter-background');
                        $('#searchErrorMessageContainer').hide();
                    }
                }

                // show all items with the selected tag
                if (selectedOption != '') {
                    $(settings.filterItem).hide();
                    $(settings.filterItem + '[data-tags~=' + selectedOption + ']',
					   settings.filterWithinContainer).show();
                    $('.js-product-category-name').parent().hide();

                    // if the value selected is blank, show all items
                } else if (selectedOption == '') {
                    $(settings.filterItem).show();
                    $('.js-product-category-name').parent().show();
                }

                if ($('.js-expandable-list').hasClass('gallery')) {
                    $('.js-expandable-list').find('li:visible').css('display', 'inline-block');
                } else if ($('.js-expandable-list').hasClass('list')) {
                    $('.js-expandable-list').find('li:visible').css('display', 'block');
                }

                settings.doneChangeFilter();

                if ($("ul#mediaGalleryList").length > 0) {
                    var totalTileCount = $('.js-media-gallery-list').find('li.js-media-gallery-item').length;
                    var totalVisibleTileCount = $('.js-media-gallery-list').find('li.js-media-gallery-item:visible').length;
                    if ($('.js-media-gallery-list').find('li.js-media-gallery-item').length > 0) {
                        $('.js-media-gallery-list').find('li.js-media-gallery-item').each(function (i) {
                            $(this).removeClass('last-li-margin');
                        });
                    }

                    if ($(window).width() > 599) {
                        if (totalTileCount == totalVisibleTileCount) {
                            $('.js-media-gallery-list').find('li:nth-child(3n)').addClass('last-li-margin');
                        }
                        else if ($('.js-media-gallery-list').find('li.js-media-gallery-item:visible').length > 2) {
                            $('.js-media-gallery-list').find('li.js-media-gallery-item:visible').each(function (i) {
                                i = i + 1;
                                if (i % 3 == 0) {
                                    $(this).addClass('last-li-margin');
                                }
                            });
                        }
                    }
                }
                ////This code is for product Comparison Carousel. This will execute when user will click on the compare to drop down

                if ($("#productComparisonCarousel").length) {
                    $('li.js-filter-product').each(function () {
                        $(this).show();
                    });
                    $('.product-comparison-carousel').destroyCarousel(selectedOption);
                }
            });
        });
    };

    var setupResultsAmount = function () {
        var productCategoriesTitle = $('.js-solution-filter-selected-text').text(),
			productCategoriesCount = $('.product-tile:visible').length;

        if ($("ul#mediaGalleryList").length && productCategoriesTitle != '') {
            $('.product-categories-media-title').text(productCategoriesTitle);
        }
        else {
            $('.product-categories-title').text(productCategoriesTitle);
        }

        $('.product-categories-count').text('(' + productCategoriesCount + ')');
        $('.product-categories-subcount').each(function () {
            var productCategoriesSubCount = $(this).parent().next().children('.product-tile').length;
            $(this).text('(' + productCategoriesSubCount + ')');
        });
        //SDT00804963 - CQ5 Production environment Media Gallery Component error needs correcting
        if ($("ul#mediaGalleryList").length > 0) {
            $('.product-categories-count').each(function () {
                var productCategoriesCount = $(this).parent().next().children('.product-tile:visible').length;
                $(this).text('(' + productCategoriesCount + ')');
            });
        }
    };

    var sortLowerAtoZ = function (a, b) {
        if (a.toLowerCase() < b.toLowerCase()) return -1;
        if (a.toLowerCase() > b.toLowerCase()) return 1;
        return 0;
    };

    var sortByFilterName = function (a, b) {
        if (a[0].toLowerCase() === b[0].toLowerCase()) {
            return 0;
        }
        else {
            return (a[0].toLowerCase() < b[0].toLowerCase()) ? -1 : 1;
        }
    };
})()); ; createNamespace('app.components.ticker', (function () {
    $(document).ready(function () {
        if ($('.js-ticker').length > 0) {
            setupTicker();
        }
    });

    var setupTicker = function () {
        var news = new Array();
        var delay = parseInt($('.js-ticker').attr('data-delay'));
        var i = 0;
        $('.js-ticker-list li').each(function (i) {
            news[i] = $(this);
        })

        setInterval(function () {
            var nextItem = news[i + 1];
            news[i].animate({ 'top': '-18px' }, { queue: false, duration: 500 }).fadeOut({ queue: false, duration: 500, complete: function () {
                $(this).css({ 'top': '18px' });
            }
            });
            if (i === (news.length - 1)) {
                news[0].animate({ 'top': '0' }, { queue: false, duration: 1000 }).fadeIn({ queue: false, duration: 1000 });
                i = 0;
            }
            else {
                nextItem.animate({ 'top': '0' }, { queue: false, duration: 1000 }).fadeIn({ queue: false, duration: 1000 });
                i++;
            }
        }, delay);
    }
})()); ; createNamespace('app.components.toggleLayout', (function () {
    $(document).ready(function () {
        if ($('.js-toggle-layout').length > 0) {
            setupLayoutToggle();
        }
    });

    var setupLayoutToggle = function () {
        $('.js-toggle-layout').click(function (e) {
            var animateObj;

            e.preventDefault();

            if ($('.product-specialties .js-changeable-layout').length > 0)
                animateObj = '.js-changeable-layout';
            else
                animateObj = '.js-changeable-layout > .product-categories-list';

            $(this).parent().parent().find('.js-toggle-layout').removeClass('active');
            $(this).addClass('active');

            if ($(this).attr('data-layout') === 'gallery' && $(animateObj).hasClass('list')) {
                animateLayoutChange('list', 'gallery', animateObj);
            } else if ($(this).attr('data-layout') === 'list' && $(animateObj).hasClass('gallery')) {
                animateLayoutChange('gallery', 'list', animateObj);
            } else { }
        });
    }

    var animateLayoutChange = function (inactiveLayout, activeLayout, obj) {
        $('.js-changeable-layout').animate({ 'opacity': '0' }, 250, function () {
            $(obj).removeClass(inactiveLayout).addClass(activeLayout);

            if ($('.js-expandable-list').hasClass('gallery')) {
                $('.js-expandable-list').find('li:visible').css('display', 'inline-block');
            } else if ($('.js-expandable-list').hasClass('list')) {
                $('.js-expandable-list').find('li:visible').css('display', 'block');
            }
        }).animate({ 'opacity': '1' }, 250);
    }
})()); ;

createNamespace('app.components.externalLinkFooterSetup', (function () {
    $(document).ready(function () {
        setupExternalLink();
    });

    var setupExternalLink = function () {
        var megaMenu = $("nav.nav-megamenu");
        var megaMenuType = megaMenu.data("type");

        if (megaMenuType != undefined && megaMenuType != "" && megaMenuType == "thin-nav") {
            this.obj = '.js-external-link-footer';
            this.footerObj = '.js-external-link-footer-wrap';
            var $cloneObj = $(this.obj).clone();
            $(this.footerObj).append($cloneObj);
        }
    }
})()); ; createNamespace('app.components.setTileStyleForMediaGallery', (function () {
    $(document).ready(function () {
        if ($('.js-media-gallery-toggle').length > 0) {
            $('.js-media-gallery-list').each(function () {
                var toggle = $(this).parentsUntil('.js-media-gallery-toggle');
                setupMediaGallerySorting(this, toggle);
            });
        }
        if ($("ul#mediaGalleryList").length > 0) {
            if ($(window).width() > 599) {
                setMediaGalleryTileStyle();
            }
            setOverlayImage();
        }

        $(window).on('orientationchange', function (event) {
            if ($(window).width() > 599) {
                setMediaGalleryTileStyle();
            }
        });
    });

    var setupMediaGallerySorting = function (list, toggle) {
        var digitalAsset = new sortToggle(list, toggle);
        digitalAsset.init();

        var $sortBtn = $(digitalAsset.toggleControl).find('.js-toggle-sort');
        var $listObj = $(digitalAsset.list);

        $sortBtn.click(function (e) {
            var newestText = $(this).attr('data-newest');
            var oldestText = $(this).attr('data-oldest');
            var atozText = $(this).attr('data-atoz');
            var ztoaText = $(this).attr('data-ztoa');
            e.preventDefault();
            $sortBtn.removeClass('active');
            $(this).addClass('active');

            if ($(this).hasClass('js-toggle-alpha')) {
                if ($listObj.attr('data-sortedby') === 'atoz') {
                    $listObj.attr('data-sortedby', 'ztoa');
                    digitalAsset.sortAlphabetical(false);
                    $(this).text(ztoaText);
                }
                else {
                    $listObj.attr('data-sortedby', 'atoz');
                    digitalAsset.sortAlphabetical(true);
                    $(this).text(atozText);
                }
            }
            else {
                if ($listObj.attr('data-sortedby') === 'newest') {
                    $listObj.attr('data-sortedby', 'oldest');
                    digitalAsset.sortDates(false);
                    $(this).text(oldestText);
                }
                else {
                    $listObj.attr('data-sortedby', 'newest');
                    digitalAsset.sortDates(true);
                    $(this).text(newestText);
                }
            }

            if ($(window).width() > 599) {
                digitalAsset.setMediaGalleryTileStyle();
            }

            $(window).on('orientationchange', function (event) {
                if ($(window).width() > 599) {
                    digitalAsset.setMediaGalleryTileStyle();
                }
            });
        });
    }

    var sortToggle = function (list, control) {
        this.list = list;
        this.toggleControl = control;
        this.titles = [];
        this.dates = [];
        this.init = function () {
            this.getTitles();
            this.getDates();

            this.sortDates(true);
        },
		this.getTitles = function () {
		    var storeTitles = [];
		    $(this.list).find('.js-sort-title').each(function (i) {
		        storeTitles[i] = {};
		        storeTitles[i]['obj'] = $(this).parents('.js-sort-item');
		        storeTitles[i]['title'] = $(this).text().toLowerCase();
		    });
		    return this.titles = storeTitles;
		},
		this.sortAlphabetical = function (isAtoZ) {
		    this.titles.sort(function (a, b) {
		        if (isAtoZ) {
		            return a.title < b.title ? -1 : a.title > b.title ? 1 : 0;
		        }
		        else {
		            return a.title < b.title ? 1 : a.title > b.title ? -1 : 0;
		        }
		    });
		    this.displaySorting('titles');
		},
		this.getDates = function () {
		    var storeDates = [];
		    $(this.list).find('.js-sort-date').each(function (i) {
		        var strDate = $(this).attr('data-yyyymmdd').split('-');
		        var jsDate = new Date(strDate[0], strDate[1] - 1, strDate[2]);
		        storeDates[i] = {};
		        storeDates[i]['obj'] = $(this).parents('.js-sort-item');
		        storeDates[i]['jsDate'] = jsDate;
		    });
		    return this.dates = storeDates;
		},
		this.sortDates = function (isNewest) {
		    this.dates.sort(function (c, d) {
		        if (isNewest) return c.jsDate < d.jsDate ? 1 : c.jsDate > d.jsDate ? -1 : 0;
		        else return c.jsDate < d.jsDate ? -1 : c.jsDate > d.jsDate ? 1 : 0;
		    });
		    this.displaySorting('dates');
		},

        this.setMediaGalleryTileStyle = function () {
            var totalTileCount = $('.js-media-gallery-list').find('li.js-media-gallery-item').length;
            var totalVisibleTileCount = $('.js-media-gallery-list').find('li.js-media-gallery-item:visible').length;
            if ($('.js-media-gallery-list').find('li.js-media-gallery-item').length > 0) {
                $('.js-media-gallery-list').find('li.js-media-gallery-item').each(function (i) {
                    $(this).removeClass('last-li-margin');
                });
            }
            if (totalTileCount == totalVisibleTileCount) {
                $('.js-media-gallery-list').find('li:nth-child(3n)').addClass('last-li-margin');
            }
            else if ($('.js-media-gallery-list').find('li.js-media-gallery-item:visible').length > 2) {
                $('.js-media-gallery-list').find('li.js-media-gallery-item:visible').each(function (i) {
                    i = i + 1;
                    if (i % 3 == 0) {
                        $(this).addClass('last-li-margin');
                    }
                });
            }
        },

        this.displaySorting = function (arrName) {
            var storeObjs = new Array();
            var sortArr;
            if (arrName === 'titles') sortArr = this.titles;
            else sortArr = this.dates;

            for (var i = 0; i < sortArr.length; i++) {
                storeObjs[i] = sortArr[i]['obj'];
            }

            $(this.list).empty().append(storeObjs);

            if ($('.js-media-tile').length) {
                var deviceColor = $("#hiddenDetect").css('background-color');

                var deviceWidth;
                var isDesktopView = false;
                var isTabletView = false;
                var isMobileView = false;

                if (deviceColor == "rgb(255, 0, 0)" || deviceColor == "rgb(255,0,0)") {
                    isDesktopView = true;
                }

                if (deviceColor == "rgb(0, 255, 0)" || deviceColor == "rgb(0,255,0)") {
                    isTabletView = true;
                }
                if (deviceColor == "rgb(0, 0, 255)" || deviceColor == "rgb(0,0,255)") {
                    isMobileView = true;
                }

                if (isDesktopView) {
                    deviceWidth = 855;
                }
                if (isTabletView) {
                    deviceWidth = 550;
                }
                if (isMobileView) {
                    deviceWidth = 280;
                }
                $('.js-media-tile').on('click', function (e) {
                    e.preventDefault();
                    if ($(this).attr('modal-type') == "global") {
                        $('body').removeClass('media-iframe');
                        $('body').addClass('english-iframe');
                    }
                    else {
                        $('body').removeClass('english-iframe');
                        $('body').addClass('media-iframe');
                    }

                    $.fancybox(this, {
                        padding: 0,
                        width: deviceWidth,
                        autoSize: false,
                        scrolling: "no", // optional to avoid scrollbars inside fancybox
                        type: "iframe",
                        helpers: {
                            media: {}
                        },

                        beforeShow: function () {
                            ////Function : This function is used for setting the height of the iframe according to the contents.
                            $(".fancybox-iframe").height(300); //// We are setting 300 height as a base height for the iframe we can change it as per the requirements.

                            if ($('.fancybox-iframe').contents().find('body').length) {
                                var newHeight = $('.fancybox-iframe').contents().find('body')[0].scrollHeight;
                                $(".fancybox-iframe").height(newHeight + 25);

                                //// This function will reposition the Modal Popup in the center of the screen.
                                $.fancybox.reposition();

                                //// Set the display video/image/iframe as per the selected/clicked item.
                                var currentDataType = $(this.element).find('img').data('filetype');

                                if (currentDataType != '') {
                                    $('.fancybox-iframe').contents().find('div#videoplayer').hide();
                                    $('.fancybox-iframe').contents().find('iframe#externalVideo').hide();
                                    $('.fancybox-iframe').contents().find('img#masterImage').hide();

                                    if (currentDataType == 'video') {
                                        $('.fancybox-iframe').contents().find('div#videoplayer').show();
                                    }
                                    if (currentDataType == 'image') {
                                        $('.fancybox-iframe').contents().find('img#masterImage').show();
                                    }
                                    if (currentDataType == 'youtube') {
                                        $('.fancybox-iframe').contents().find('iframe#externalVideo').show();
                                    }
                                }
                            }
                        }
                    });
                });
            }
        }
    }

    var setOverlayImage = function () {
        $('img[data-tag=mediagallery]').each(function () {
            if ($(this).attr("data-filetype") == "video" || $(this).attr("data-filetype") == "youtube") {
                if ($(this).next().length) {
                    $(this).next().addClass('video-overlay');
                }
            }
            if ($(this).attr("data-filetype") == "image") {
                if ($(this).next().length) {
                    $(this).next().addClass('image-overlay');
                }
            }
        });
    }

    var setMediaGalleryTileStyle = function () {
        // Set the style for Media gallery landing page for every 3rd tile

        if ($('.js-media-gallery-list').find('li.js-media-gallery-item').length > 0) {
            $('.js-media-gallery-list').find('li.js-media-gallery-item').each(function (i) {
                $(this).removeClass('last-li-margin');
            });

            $('.js-media-gallery-list').find('li:nth-child(3n)').addClass('last-li-margin');
        }
    }

    if ($('body').hasClass('cq-wcm-edit')) {
        $("div.mediaTile:nth-child(3n)").children().css('margin-right', 0);
    }
})()); ; createNamespace('app.components.mediagalleryrelatedvideo', (function () {
    $.fn.relatedVideo = function (options) {
        var settings = {
            showSides: false,
            showDots: true,
            numToShow: 3,
            rolloverPreviews: false,
            showPreviews: false
        };

        $.extend(settings, options);

        return this.each(function (i, e) {
            var viewer = $(this),
				images = viewer.find('.video-gallery-carousel-images ul li'),
				carousel = viewer,
				descriptions = viewer.find('.carousel-banner p'),
                container = carousel.find('.carousel-container'),
            //create array for all video tiles that will partially show
                items = carousel.find('.product-tile:even:not(:first) a');

            var carouselImages = carousel.find('.video-gallery-carousel-images'),
				carouselImagesContainer = carouselImages.find('ul'),
				carouselImagesContainerItem = carouselImagesContainer.find('li'),
				carouselPrev = carousel.find('.video-gallery-carousel-nav.prev'),
				carouselNext = carousel.find('.video-gallery-carousel-nav.next');
            slideWidth = carouselImagesContainerItem.width() + 20;

            var numOfItems = carouselImagesContainerItem.length,
				currPage = 1,
				numOfPage = Math.ceil(numOfItems / 2),
				moving = false;
            origNumOfSlides = numOfItems;

            /*logic for dynamically generating page sizes based on viewport*/
            var isTablet = false;

            if ($(window).width() > 419 && $(window).width() < 960) {
                var val = Math.ceil(numOfItems / 2);
                numOfPages = val;
                isMobile = false;
                isTablet = true;
            } else if ($(window).width() > 959) {
                var val = Math.ceil(numOfItems / 2);
                numOfPages = val;
                isMobile = false;
                isTablet = false;
            } else {
                var val = Math.ceil(numOfItems / 1);
                numOfPages = val;
                isMobile = true;
                isTablet = false;
            }

            //logic that resets the media carousel in the modal every time it
            $(window).resize(function () {
                if (isMobile) {
                    if ($(window).width() > 419) {
                        $("#mediaGalleryList").attr("style", "width: 800%; left: 0px;");
                        if (currPage > 1) {
                            movePrev(currPage - 1, 1, 0);
                        }
                        $("#mediaGalleryList").attr("style", "width: 800%; left: 0px;");
                        var val = Math.ceil(numOfItems / 2);
                        numOfPages = val;
                        isMobile = false;
                        isTablet = true;
                    } else {
                        var val = Math.ceil(numOfItems / 1);
                        numOfPages = val;
                        isMobile = true;
                        isTablet = false;
                    }
                } else if (isTablet) {
                    if ($(window).width() > 419 && $(window).width() < 854) {
                        var val = Math.ceil(numOfItems / 2);
                        numOfPages = val;
                        isMobile = false;
                        isTablet = true;
                    } else if ($(window).width() > 853) {
                        $("#mediaGalleryList").attr("style", "width: 800%; left: 0px;");
                        if (currPage > 1) {
                            movePrev(currPage - 1, 1, 0);
                        }
                        $("#mediaGalleryList").attr("style", "width: 800%; left: 0px;");
                        var val = Math.ceil(numOfItems / 2);
                        numOfPages = val;
                        isMobile = false;
                        isTablet = false;
                    } else if ($(window).width() < 420) {
                        $("#mediaGalleryList").attr("style", "width: 800%; left: 0px;");
                        if (currPage > 1) {
                            movePrev(currPage - 1, 1, 0);
                        }
                        $("#mediaGalleryList").attr("style", "width: 800%; left: 0px;");
                        var val = Math.ceil(numOfItems / 1);
                        numOfPages = val;
                        isMobile = true;
                        isTablet = false;
                    }
                } else {
                    if ($(window).width() > 853) {
                        var val = Math.ceil(numOfItems / 2);
                        numOfPages = val;
                        isMobile = false;
                        isTablet = false;
                    } else {
                        $("#mediaGalleryList").attr("style", "width: 800%; left: 0px;");
                        if (currPage > 1) {
                            movePrev(currPage - 1, 1, 0);
                        }
                        $("#mediaGalleryList").attr("style", "width: 800%; left: 0px;");
                        var val = Math.ceil(numOfItems / 1);
                        numOfPages = val;
                        isMobile = false;
                        isTablet = true; ;
                    }
                }
            });
            /*end page size logic*/
            var positions = [];

            var dots = null,
				dotsDots = null,
				pgs = null,
				pgsPages = null;

            var posX = 0,
				posY = 0,
				lastPosX = 0,
				lastPosY = 0;

            var SCREEN_SM_MAX = 600;

            init();

            function init() {
                ////setup()
                carouselImagesContainer.css('width', numOfItems * 100 + '%');

                positions = [numOfItems - 2, numOfItems - 1, 0, 1, 2, numOfItems - 3];
                updateNav();

                //setup for auto scroll on video click
                items.addClass('advance-tile odd-tile');

                var advanceBlocker = {
                    value: -1,
                    increase: function () {
                        if (this.value !== items.length) {
                            this.value += 1;
                        }
                    },
                    decrease: function () {
                        if (this.value !== -1) {
                            this.value -= 1;
                        }
                    }
                }

                var setAdvanceOn = function (clicked, advance) {
                    $('.advance-tile').off('click');
                    $('.advance-tile').on('click', function (e) {
                        e.preventDefault();
                        setAdvanceOn($(this), true);
                    });
                    if (clicked) {
                        clicked.off('click');
                    }
                    if (advance) {
                        advanceBlocker.increase();
                        if (window.innerWidth > 549) {
                            moveNext();
                        }
                    }
                };
                //end auto-advance setup

                // click prev / next
                carouselPrev.on('click', function (e) {
                    e.preventDefault();
                    movePrev();
                    advanceBlocker.decrease();
                    setAdvanceOn(items.eq(advanceBlocker.value), false);
                });

                //assign auto advance to the partially shown tiles
                $('.advance-tile').on('click', function (e) {
                    e.preventDefault();
                    setAdvanceOn($(this), true);
                });

                carouselNext.on('click', function (e) {
                    e.preventDefault();
                    moveNext();
                    setAdvanceOn(false, false);
                    advanceBlocker.increase();
                    setAdvanceOn(items.eq(advanceBlocker.value), false);
                });

                carouselImagesContainerItem.on('click', function (e) {
                    e.preventDefault();
                    changeMasterContent($(this));
                });

                if (settings.showSides) {
                    viewer.find('> div').prepend('<div class="product-viewer-side"></div>');
                    viewer.find('> div').prepend('<div class="product-viewer-side right"></div>');
                }

                if (settings.showDots)
                    initDots();

                if (settings.showPreviews)
                    initPreviews();

                updateBackground();
                $(window).resize(updateBackground);
            }

            //// This function is used for the change the content of the master container when any related item is clicked in the related video/images carousal
            function changeMasterContent(currentItem) {
                if (currentItem.length) {
                    var currentHeading = currentItem.find("h3").text();
                    var currentDescription = currentItem.find("p.related-media-tile-long-description").text();
                    var currentItemType = currentItem.attr("data-type");

                    $("#masterContentTitle").text(currentHeading);
                    $("#masterContentDescription").text(currentDescription);
                    if (Modernizr.video) {
                        $("#videoplayer > video")[0].pause();
                    }
                    if (currentItemType == "image") {
                        var currentUrl = currentItem.find("img").attr('data-mastersrc');
                        loadImage("masterImage", currentUrl);
                    }
                    else if (currentItemType == "video") {
                        var currentUrl = currentItem.find("a").attr('href');
                        loadVideos(currentUrl);
                    }
                    else if (currentItemType == "youtube") {
                        var currentUrl = currentItem.find("a").attr('href');
                        loadExternalVideos(currentUrl);
                    }
                }
            }

            function loadExternalVideos(videoUrl) {
                $('#videoplayer').hide();
                $("#masterImage").hide();
                $("#externalVideo").show();
                $("#externalVideo").attr('src', videoUrl);
            }

            //// This function is used for the change the source of the iframe when any related item is clicked in the related video/images carousal
            function loadVideos(url) {
                $("#masterImage").hide();
                $("#externalVideo").hide();
                $('#videoplayer').show();

                $('#videoplayer > video > source').attr('src', url);
                $('#videoplayer > video > embed').attr('src', url);
                if (Modernizr.video) {
                    $("#videoplayer > video")[0].load();
                    $("#videoplayer > video")[0].play();
                }
            }

            //// This function is used for the change the image source of the image when any related item is clicked in the related video/images carousal
            function loadImage(img, url) {
                var $image = $('#' + img);
                if ($image.length) {
                    $("#externalVideo").hide();
                    $('#videoplayer').hide();
                    $("#masterImage").show();
                    $image.attr('src', url);

                    return false;
                }
                return true;
            }

            function initPreviews() {
                container.append('<a href="#" class="carousel-preview carousel-preview-prev"><span>Prev</span></a>');

                previews = carousel.find('.carousel-preview');
                previewsPrev = carousel.find('.carousel-preview.carousel-preview-prev');

                updatePreviews();

                previewsPrev.on('click', function (e) {
                    e.preventDefault();
                    movePrev();
                });
            }

            function updatePreviews() {
                var containerWidth = $(window).width();
                var leftMargin = ($(window).width() - slideWidth) / 2;
            }

            function updateBackground() {
                var margin = 0;

                if (settings.showSides) {
                    if (margin > 0) {
                        $('.product-viewer-side').css('width', margin + 'px');
                    } else {
                        $('.product-viewer-side').css('width', '0px');
                    }
                }
            }

            // This section is pagination dots under carousel
            function initDots() {
                if (numOfPages > 1) {
                    var dotsHtml = '';
                    dotsHtml += '<div class="carousel-dots"><ul>';
                    for (var i = 0; i < numOfPages; i++) {
                        dotsHtml += '<li style="cursor: pointer"><span class="fa fa-circle">&#xf111;</span></li>';
                    }
                    dotsHtml += '</ul></div>';

                    carousel.append(dotsHtml);
                    dots = carousel.find('.carousel-dots');
                    dotsDots = dots.find('ul li');

                    dotsDots.on('click', function (e) {
                        e.preventDefault();

                        var howManyTimes = $(this).index() - (positions[2] % origNumOfSlides);

                        move(howManyTimes);
                    });

                    updateDots();
                }
            }

            function move(howManyTimes) {
                if (howManyTimes < 0) {
                    howManyTimes = Math.abs(howManyTimes);
                    movePrev(howManyTimes);
                } else if (howManyTimes > 0) {
                    moveNext(howManyTimes);
                }
            }

            function moveNext(howManyTimes, moveAMT) {
                var movement = '200px';
                if ($(window).width() >= 854) {
                    movement = '97%';
                } else if ($(window).width() == 550) {
                    movement = '447px';
                }

                if (moveAMT != undefined) {
                    movement = moveAMT;
                }

                if (!moving) {
                    moving = true;
                    carouselImagesContainer.animate({
                        'left': '-=' + movement
                    }).promise().done(function () {
                        positions[5] = positions[0];
                        positions[0] = positions[1];
                        positions[1] = positions[2];
                        positions[2] = positions[3];
                        positions[3] = positions[4];
                        positions[4] = positions[4] + 1;
                        if (positions[4] >= numOfItems)
                            positions[4] = 0;

                        moving = false;

                        if (settings.showDots)
                            updateDots();

                        if (settings.showPages)
                            updatePages();

                        currPage++;

                        if (howManyTimes > 1)
                            moveNext(howManyTimes - 1);

                        updateNav();
                    });
                }
            }

            function movePrev(howManyTimes, animationTime, moveAMT) {
                if (!animationTime) {
                    animationTime = 400
                }
                var movement = '200px';
                if ($(window).width() >= 854) {
                    movement = '97%';
                } else if ($(window).width() == 550) {
                    movement = '447px';
                }

                if (moveAMT != undefined) {
                    movement = moveAMT;
                }

                if (!moving) {
                    moving = true;
                    carouselImagesContainer.animate({
                        'left': '+=' + movement
                    }, animationTime).promise().done(function () {
                        positions[4] = positions[3];
                        positions[3] = positions[2];
                        positions[2] = positions[1];
                        positions[1] = positions[0];
                        positions[0] = positions[5];
                        positions[5] = positions[5] - 1;
                        if (positions[5] < 0)
                            positions[5] = numOfItems - 1;
                        moving = false;
                        if (settings.showDots)
                            updateDots();

                        if (settings.showPages)
                            updatePages();

                        currPage--;

                        if (howManyTimes > 1) {
                            movePrev(howManyTimes - 1, animationTime, moveAMT);
                        }

                        updateNav();
                    });
                }

                if (moveAMT == 0 || moveAMT == '0px') {
                    $("#mediaGalleryList").attr("style", "width: 800%; left: 0px;");
                }
            }

            function updateDots() {
                updateIndicators(dotsDots);

                var marginLeft = (200 - dots.width()) / 2;
                dots.css({
                    'left': marginLeft + 'px'
                });
            }

            function updateIndicators(obj) {
                var active = positions[2] % origNumOfSlides;
                obj.removeClass('active');
                $(obj[active]).addClass('active');
            }

            function updateNav() {
                carouselPrev.css('visibility', 'visible');
                carouselNext.css('visibility', 'visible');
                if (currPage == 1) {
                    carouselPrev.css('visibility', 'hidden');
                }
                if (currPage == numOfPages) {
                    carouselNext.css('visibility', 'hidden');
                }
            }
        });
    };

    $.fn.defaultModalRelatedMedia = function (options) {
        var settings = {
            showSides: false,
            showDots: true,
            numToShow: 3
        };

        $.extend(settings, options);

        return this.each(function (i, e) {
            var viewer = $(this),
				images = viewer.find('.video-gallery-carousel-images ul li'),
				carousel = viewer,
				descriptions = viewer.find('.carousel-banner p')

            var carouselImages = carousel.find('.video-gallery-carousel-images'),
				carouselImagesContainer = carouselImages.find('ul'),
				carouselImagesContainerItem = carouselImagesContainer.find('li'),
				carouselPrev = carousel.find('.video-gallery-carousel-nav.prev'),
				carouselNext = carousel.find('.video-gallery-carousel-nav.next');
            slideWidth = carouselImagesContainerItem.width() + 20;

            var numOfItems = carouselImagesContainerItem.length,
				numOfPages = Math.ceil(numOfItems / settings.numToShow),
				currPage = 1,
				moving = false;
            origNumOfSlides = numOfItems;
            var positions = [];

            var dots = null,
				dotsDots = null,
				pgs = null,
				pgsPages = null;

            var posX = 0,
				posY = 0,
				lastPosX = 0,
				lastPosY = 0;

            var SCREEN_SM_MAX = 600;

            init();

            function init() {
                ////setup()
                carouselImagesContainer.css('width', numOfItems * 100 + '%');

                positions = [numOfItems - 2, numOfItems - 1, 0, 1, 2, numOfItems - 3];
                updateNav();

                // click prev / next
                carouselPrev.on('click', function (e) {
                    e.preventDefault();
                    movePrev();
                });

                carouselNext.on('click', function (e) {
                    e.preventDefault();
                    moveNext();
                });

                carouselImagesContainerItem.on('click', function (e) {
                    e.preventDefault();
                    changeMasterContent($(this));
                });

                if (settings.showSides) {
                    viewer.find('> div').prepend('<div class="product-viewer-side"></div>');
                    viewer.find('> div').prepend('<div class="product-viewer-side right"></div>');
                }

                if (settings.showDots)
                    initDots();

                updateBackground();
                $(window).resize(updateBackground);
            }

            //// This function is used for the change the content of the master container when any related item is clicked in the related video/images carousal
            function changeMasterContent(currentItem) {
                if (currentItem.length) {
                    var currentHeading = currentItem.find("h3").text().trim();
                    var currentDescription = currentItem.find("p").text().trim();
                    var currentItemType = currentItem.attr("data-type");
                    $("#masterContentTitle").text(currentHeading);
                    $("#masterContentDescription").text(currentDescription);
                    $("#videoplayer > video")[0].pause();
                    if (currentItemType == "image") {
                        var currentUrl = currentItem.find("img").attr('data-mastersrc');
                        loadImage("masterImage", currentUrl);
                    }
                    else if (currentItemType == "video") {
                        var currentUrl = currentItem.find("a").attr('href');
                        loadVideos(currentUrl);
                    }
                    else if (currentItemType == "youtube") {
                        var currentUrl = currentItem.find("a").attr('href');
                        loadExternalVideos(currentUrl);
                    }
                }
            }

            function loadExternalVideos(videoUrl) {
                $('#videoplayer').hide();
                $("#masterImage").hide();
                $("#externalVideo").show();
                $("#externalVideo").attr('src', videoUrl);
            }

            //// This function is used for the change the source of the iframe when any related item is clicked in the related video/images carousal
            function loadVideos(url) {
                $("#masterImage").hide();
                $("#externalVideo").hide();
                $('#videoplayer').hide();
                if (Modernizr.video) {
                    $('#videoplayer').show();
                    $('#videoplayer > video > source').attr('src', url);
                    $('#videoplayer > video > embed').attr('src', url);
                    $("#videoplayer > video")[0].load();
                    $("#videoplayer > video")[0].play();
                } else {
                    $("#externalVideo").show();
                    $("#externalVideo").attr('src', url);
                }
            }

            //// This function is used for the change the image source of the image when any related item is clicked in the related video/images carousal
            function loadImage(img, url) {
                var $image = $('#' + img);
                if ($image.length) {
                    $("#externalVideo").hide();
                    $('#videoplayer').hide();

                    $("#masterImage").show();
                    $image.attr('src', url);

                    return false;
                }
                return true;
            }

            function updateBackground() {
                var margin = 0;

                if (settings.showSides) {
                    if (margin > 0) {
                        $('.product-viewer-side').css('width', margin + 'px');
                    } else {
                        $('.product-viewer-side').css('width', '0px');
                    }
                }
            }

            // This section is pagination dots under carousel
            function initDots() {
                var dotsHtml = '';

                dotsHtml += '<div class="carousel-dots"><ul>';
                if (numOfPages > 1) {
                    for (var i = 0; i < numOfPages; i++) {
                        dotsHtml += '<li style="cursor: pointer"><span class="fa fa-circle">&#xf111;</span></li>';
                    }
                }
                dotsHtml += '</ul></div>';

                carousel.append(dotsHtml);
                dots = carousel.find('.carousel-dots');
                dotsDots = dots.find('ul li');

                dotsDots.on('click', function (e) {
                    e.preventDefault();

                    var howManyTimes = $(this).index() - (positions[2] % origNumOfSlides);

                    move(howManyTimes);
                });

                updateDots();
            }

            function move(howManyTimes) {
                if (howManyTimes < 0) {
                    howManyTimes = Math.abs(howManyTimes);
                    movePrev(howManyTimes);
                } else if (howManyTimes > 0) {
                    moveNext(howManyTimes);
                }
            }

            function moveNext(howManyTimes) {
                if (!moving) {
                    moving = true;
                    carouselImagesContainer.animate({
                        'left': '-=' + 100 + '%'
                    }).promise().done(function () {
                        positions[5] = positions[0];
                        positions[0] = positions[1];
                        positions[1] = positions[2];
                        positions[2] = positions[3];
                        positions[3] = positions[4];
                        positions[4] = positions[4] + 1;
                        if (positions[4] >= numOfItems)
                            positions[4] = 0;

                        moving = false;

                        if (settings.showDots)
                            updateDots();

                        if (settings.showPages)
                            updatePages();

                        currPage++;

                        if (howManyTimes > 1)
                            moveNext(howManyTimes - 1);

                        updateNav();
                    });
                }
            }

            function movePrev(howManyTimes) {
                if (!moving) {
                    moving = true;
                    carouselImagesContainer.animate({
                        'left': '+=' + 100 + '%'
                    }).promise().done(function () {
                        positions[4] = positions[3];
                        positions[3] = positions[2];
                        positions[2] = positions[1];
                        positions[1] = positions[0];
                        positions[0] = positions[5];
                        positions[5] = positions[5] - 1;
                        if (positions[5] < 0)
                            positions[5] = numOfItems - 1;

                        if (settings.showDots)
                            updateDots();

                        if (settings.showPages)
                            updatePages();

                        currPage--;

                        if (howManyTimes > 1)
                            movePrev(howManyTimes - 1);

                        moving = false;
                        updateNav();
                    });
                }
            }

            function updateDots() {
                updateIndicators(dotsDots);

                var marginLeft = (200 - dots.width()) / 2;
                dots.css({
                    'left': marginLeft + 'px'
                });
            }

            function updateIndicators(obj) {
                var active = positions[2] % origNumOfSlides;
                obj.removeClass('active');
                $(obj[active]).addClass('active');
            }

            function updateNav() {
                carouselPrev.css('visibility', 'visible');
                carouselNext.css('visibility', 'visible');
                if (currPage == 1) {
                    carouselPrev.css('visibility', 'hidden');
                }
                if (currPage == numOfPages) {
                    carouselNext.css('visibility', 'hidden');
                }
            }
        });
    };

    //	Override default fancybox.js styles;
    $(document).ready(function () {
        if ($("ul#mediaGalleryList").length > 0) {
            manageMediaGalleryModel();
        }

        function manageMediaGalleryModel() {
            var deviceColor = $("#hiddenDetect").css('background-color');
            var deviceType;
            var deviceWidth;
            var isDesktopView = false;
            var isTabletView = false;
            var isMobileView = false;

            if (deviceColor == "rgb(255, 0, 0)" || deviceColor == "rgb(255,0,0)") {
                isDesktopView = true;
            }

            if (deviceColor == "rgb(0, 255, 0)" || deviceColor == "rgb(0,255,0)") {
                isTabletView = true;
            }
            if (deviceColor == "rgb(0, 0, 255)" || deviceColor == "rgb(0,0,255)") {
                isMobileView = true;
            }

            if (isDesktopView) {
                deviceType = "desktop";
                deviceWidth = 854; //// For Japaneses width is 854 and for English it is 740
            }
            if (isTabletView) {
                deviceType = "tablet";
                deviceWidth = 550;
            }
            if (isMobileView) {
                deviceType = "mobile";
                deviceWidth = 280;
            }

            if ($('.js-media-tile').length) {
                $('.js-media-tile').on('click', function (e) {
                    e.preventDefault();

                    if ($(this).attr('modal-type') == "global") {
                        $('body').removeClass('media-iframe');
                        $('body').addClass('english-iframe');
                    }
                    else {
                        $('body').removeClass('english-iframe');
                        $('body').addClass('media-iframe');
                    }
                    $.fancybox(this, {
                        padding: 0,
                        width: deviceWidth,
                        autoSize: false,
                        scrolling: "no", // optional to avoid scrollbars inside fancybox
                        type: "iframe",
                        helpers: {
                            media: {}
                        },

                        beforeShow: function () {
                            ////Function : This function is used for setting the height of the iframe according to the contents.
                            $(".fancybox-iframe").height(300); //// We are setting 300 height as a base height for the iframe we can change it as per the requirements.

                            if ($('.fancybox-iframe').contents().find('body').length) {
                                var newHeight = $('.fancybox-iframe').contents().find('body')[0].scrollHeight;
                                $(".fancybox-iframe").height(newHeight + 25);

                                //// This function will reposition the Modal Popup in the center of the screen.
                                $.fancybox.reposition();

                                //// Set the display video/image/iframe as per the selected/clicked item.
                                var currentDataType = $(this.element).find('img').data('filetype');

                                if (currentDataType != '') {
                                    $('.fancybox-iframe').contents().find('div#videoplayer').hide();
                                    $('.fancybox-iframe').contents().find('iframe#externalVideo').hide();
                                    $('.fancybox-iframe').contents().find('img#masterImage').hide();

                                    if (currentDataType == 'video') {
                                        $('.fancybox-iframe').contents().find('div#videoplayer').show();
                                    }
                                    if (currentDataType == 'image') {
                                        $('.fancybox-iframe').contents().find('img#masterImage').show();
                                    }
                                    if (currentDataType == 'youtube') {
                                        $('.fancybox-iframe').contents().find('iframe#externalVideo').show();
                                    }
                                }
                            }
                        }
                    });
                });
            }

            if ($('body.default-eng-modal').length) {
                setDefaultMediaCarousal(deviceType);
            }
            else {
                setCarousal(deviceType);
            }

            // Set how many carousel tiles show per device
            // showDots = pagination dots beneath carousel tiles
            function setCarousal(deviceType) {
                if ($('.media-gallery-related-video-carousel').length) {
                    //// This setting is for Mobile view Modal carousel
                    if (deviceType == "mobile") {
                        $('.media-gallery-related-video-carousel').relatedVideo({
                            numToShow: 1,
                            showDots: false
                        });
                    }
                    else if (deviceType == "tablet") {
                        $('.media-gallery-related-video-carousel').relatedVideo({
                            numToShow: 2
                        });
                    }
                    //// This setting is for Desktop view Modal carousel
                    else {
                        $('.media-gallery-related-video-carousel').relatedVideo({
                            numToShow: 3,
                            showDots: true
                        });
                    }
                }
            }

            function setDefaultMediaCarousal(deviceType) {
                if ($('.media-gallery-related-video-carousel').length) {
                    //// This setting is for Mobile view Modal carousel
                    if (deviceType == "mobile") {
                        $('.media-gallery-related-video-carousel').defaultModalRelatedMedia({
                            numToShow: 1,
                            showDots: false
                        });
                    }
                    else if (deviceType == "tablet") {
                        $('.media-gallery-related-video-carousel').defaultModalRelatedMedia({
                            numToShow: 2
                        });
                    }
                    else {
                        $('.media-gallery-related-video-carousel').defaultModalRelatedMedia({
                            numToShow: 3,
                            showDots: true
                        });
                    }
                }
            }
        }
    });
})()); ; createNamespace('app.components.manageSecondaryNav', (function () {
    $(document).ready(function () {
        if ($("div.nav-pdp-secondary-container").length > 0) {
            manageSecondaryNav();
        }

        if ($("nav.tertiary-nav").length) {
            manageTertiaryNav();
        }
    });

    /* Manage the Secondary Navigation for different tabs only for IE*/
    var manageSecondaryNav = function () {
        var ua = navigator.userAgent.toLowerCase();

        var secNav = $("ul.js-pdp-secondary-nav");
        if (($.browser.msie || ua.indexOf('ipad') !== -1 || (ua.indexOf("safari/") !== -1 || ua.indexOf("windows") !== -1)) && $(window).width() > 599 && secNav.length) {
            var newWidth = parseFloat(100 / secNav[0].children.length);
            var jquery_object = jQuery(secNav[1]);
            jquery_object.children().css("width", newWidth + '%');
        }
    }

    /* Manage the Tertiary Navigation for different tabs only for IE*/
    var manageTertiaryNav = function () {
        var ua = navigator.userAgent.toLowerCase();

        var terNav = $(".js-pdp-tertiary-nav");
        if (($.browser.msie || ua.indexOf('ipad') !== -1 || (ua.indexOf("safari/") !== -1 || ua.indexOf("windows") !== -1)) && $(window).width() > 599 && terNav.length) {
            var newWidth = parseFloat(100 / terNav[0].children.length);
            var jquery_object = jQuery(terNav[1]);
            jquery_object.children().css("width", newWidth + '%');
        }
    }
})()); ; createNamespace('app.components.productComparisonCarousel', (function () {
    $.fn.destroyCarousel = function (selectedOption) {
        return this.each(function (i, e) {
            var viewer = $(this),
				images = viewer.find('.product-comparison-carousel-images ul li'),
				carousel = viewer

            var carouselImages = carousel.find('.product-comparison-carousel-images'),
				carouselImagesContainer = carouselImages.find('ul'),
				carouselImagesContainerItem = carouselImagesContainer.find('li'),
				carouselPrev = carousel.find('.product-comparison-carousel-nav.prev'),
				carouselNext = carousel.find('.product-comparison-carousel-nav.next');
            slideWidth = carouselImagesContainerItem.width() + 20;

            var numOfItems = 0,
				numOfPages = 0,
				currPage = 1,
				moving = false;
            origNumOfSlides = numOfItems;
            var positions = [];

            var dots = null,
				dotsDots = null,
				pgs = null,
				pgsPages = null;

            var posX = 0,
				posY = 0,
				lastPosX = 0,
				lastPosY = 0;

            var SCREEN_SM_MAX = 600;

            init();

            function init() {
                carouselImagesContainer.css('width', 0 + '%');
                carouselImagesContainer.css('left', 0 + '%');
                positions = [];
                clearDots();
                // clear the click event for  prev / next
                carouselPrev.off('click');
                carouselNext.off('click');

                if (selectedOption != '') {
                    $('li.js-filter-product').each(function () {
                        if ($(this).data('tags') != selectedOption) {
                            $(this).hide();
                        }
                    });
                }
                ///This statement is again re-initialize the carousel.
                $('.product-comparison-carousel').productComparisonCarousel();
            }

            // This section will clear the pagination dots under carousel
            function clearDots() {
                carousel.find('.carousel-dots').remove();
                $('.product-viewer-side').remove();
                $('.product-viewer-side').remove();
            }
        });
    };

    $.fn.productComparisonCarousel = function (options) {
        var settings = {
            showSides: false,
            showDots: true,
            numToShow: 1
        };

        $.extend(settings, options);

        return this.each(function (i, e) {
            var viewer = $(this),
				images = viewer.find('.product-comparison-carousel-images ul li'),
				carousel = viewer

            var carouselImages = carousel.find('.product-comparison-carousel-images'),
				carouselImagesContainer = carouselImages.find('ul'),
				carouselImagesContainerItem = carouselImagesContainer.find('li:visible'),
				carouselPrev = carousel.find('.product-comparison-carousel-nav.prev'),
				carouselNext = carousel.find('.product-comparison-carousel-nav.next');
            slideWidth = carouselImagesContainerItem.width() + 20;

            var numOfItems = carouselImagesContainerItem.length,
				numOfPages = Math.ceil(numOfItems / settings.numToShow),
				currPage = 1,
				moving = false;
            origNumOfSlides = numOfItems;
            var positions = [];

            var dots = null,
				dotsDots = null,
				pgs = null,
				pgsPages = null;

            var posX = 0,
				posY = 0,
				lastPosX = 0,
				lastPosY = 0;

            var SCREEN_SM_MAX = 600;

            init();

            function init() {
                carouselImagesContainer.css('width', numOfItems * 100 + '%');

                positions = [numOfItems - 2, numOfItems - 1, 0, 1, 2, numOfItems - 3];
                updateNav();

                // click prev / next
                carouselPrev.on('click', function (e) {
                    e.preventDefault();
                    movePrev();
                });

                carouselNext.on('click', function (e) {
                    e.preventDefault();
                    moveNext();
                });

                carouselImagesContainerItem.on('click', function (e) {
                    e.preventDefault();
                });

                if (settings.showSides) {
                    viewer.find('> div').prepend('<div class="product-viewer-side"></div>');
                    viewer.find('> div').prepend('<div class="product-viewer-side right"></div>');
                }

                if (settings.showDots)
                    initDots();

                updateBackground();
                $(window).resize(updateBackground);
            }

            function updateBackground() {
                var margin = 0;

                if (settings.showSides) {
                    if (margin > 0) {
                        $('.product-viewer-side').css('width', margin + 'px');
                    } else {
                        $('.product-viewer-side').css('width', '0px');
                    }
                }

                ////Set the width of the li according to the device width and carousel width.
                slide = images;
                slide.css('left', '0');
                slideWidth = carousel.width();
                slide.width(slideWidth);

                var carouselImages = carousel.find('.product-comparison-carousel-images'),
                				carouselImagesContainer = carouselImages.find('ul'),
                				carouselImagesContainerItem = carouselImagesContainer.find('li:visible'),
                                currentImage = carouselImagesContainerItem.find('img');
                var currentImageHeight = currentImage.height();
                //// checking if the height of the image is 0 then we are setting default height .
                if (currentImageHeight < 1) {
                    currentImageHeight = 400;
                }

                $('.product-comparison-carousel-nav').css({
                    'margin-top': ((currentImageHeight / 2) - 20)
                });
            }

            // This section is pagination dots under carousel
            function initDots() {
                var dotsHtml = '';

                if (numOfItems > 1) {
                    dotsHtml += '<div class="carousel-dots"><ul>';
                    for (var i = 0; i < numOfItems; i++) {
                        dotsHtml += '<li style="cursor: pointer"><span class="fa fa-circle">&#xf111;</span></li>';
                    }
                    dotsHtml += '</ul></div>';

                    carousel.append(dotsHtml);
                }
                else if (numOfItems == 1) { ////Added single DOT with visibility hidden so that it can take the bottom space
                    dotsHtml += '<div class="carousel-dots"><ul>';
                    dotsHtml += '<li style="cursor: pointer;  visibility: hidden;"><span class="fa fa-circle">&#xf111;</span></li>';
                    dotsHtml += '</ul></div>';
                    carousel.append(dotsHtml);
                }
                dots = carousel.find('.carousel-dots');
                dotsDots = dots.find('ul li');

                dotsDots.on('click', function (e) {
                    e.preventDefault();

                    var howManyTimes = $(this).index() - (positions[2] % origNumOfSlides);

                    move(howManyTimes);
                });

                updateDots();
            }

            function move(howManyTimes) {
                if (howManyTimes < 0) {
                    howManyTimes = Math.abs(howManyTimes);
                    movePrev(howManyTimes);
                } else if (howManyTimes > 0) {
                    moveNext(howManyTimes);
                }
            }

            function moveNext(howManyTimes) {
                if (!moving) {
                    moving = true;
                    carouselImagesContainer.animate({
                        'left': '-=' + 100 + '%'
                    }).promise().done(function () {
                        positions[5] = positions[0];
                        positions[0] = positions[1];
                        positions[1] = positions[2];
                        positions[2] = positions[3];
                        positions[3] = positions[4];
                        positions[4] = positions[4] + 1;
                        if (positions[4] >= numOfItems)
                            positions[4] = 0;

                        moving = false;

                        if (settings.showDots)
                            updateDots();

                        if (settings.showPages)
                            updatePages();

                        currPage++;

                        if (howManyTimes > 1)
                            moveNext(howManyTimes - 1);

                        updateNav();
                    });
                }
            }

            function movePrev(howManyTimes) {
                if (!moving) {
                    moving = true;
                    carouselImagesContainer.animate({
                        'left': '+=' + 100 + '%'
                    }).promise().done(function () {
                        positions[4] = positions[3];
                        positions[3] = positions[2];
                        positions[2] = positions[1];
                        positions[1] = positions[0];
                        positions[0] = positions[5];
                        positions[5] = positions[5] - 1;
                        if (positions[5] < 0)
                            positions[5] = numOfItems - 1;
                        moving = false;
                        if (settings.showDots)
                            updateDots();

                        if (settings.showPages)
                            updatePages();

                        currPage--;

                        if (howManyTimes > 1)
                            movePrev(howManyTimes - 1);

                        updateNav();
                    });
                }
            }

            function updateDots() {
                updateIndicators(dotsDots);

                var marginLeft = (200 - dots.width()) / 2;
                dots.css({
                    'left': marginLeft + 'px'
                });
            }

            function updateIndicators(obj) {
                var active = positions[2] % origNumOfSlides;
                obj.removeClass('active');
                $(obj[active]).addClass('active');
            }

            function updateNav() {
                carouselPrev.css('display', 'block');
                carouselNext.css('display', 'block');
                if (currPage == 1) {
                    carouselPrev.css('display', 'none');
                }
                if (currPage == numOfPages) {
                    carouselNext.css('display', 'none');
                }
            }
        });
    };

    //	Override default fancybox.js styles;
    $(document).ready(function () {
        setCarousal();

        // Set how many carousel tiles show per device
        // showDots = pagination dots beneath carousel tiles
        function setCarousal() {
            if ($('.product-comparison-carousel').length && $(".js-solution-filter-field").length) {
                ///This code is for set the carousel images at page load what ever values is selected in the dropdown by default.
                var filter = $(".js-solution-filter-field");
                filterSelected = filter.find('.js-solution-filter-selected');
                filterSelectedText = filterSelected.find(".js-solution-filter-selected-text").data('tag');
                if (filterSelectedText != '') {
                    $('li.js-filter-product').each(function () {
                        if ($(this).data('tags') != filterSelectedText) {
                            $(this).hide();
                        }
                    });
                }

                $('.product-comparison-carousel').productComparisonCarousel({
                    numToShow: 1,
                    showDots: true
                });
            }
        }
    });
})()); ; createNamespace('app.components.libraryFilter', (function () {
    $(document).ready(function () {
        $('.literature-type-filter').css('margin-right', '0');
        $("#noResult").hide();
        setupDocumentResultsAmount();
        if ($('.document-library-filter .medical-speciality-filter').length) {
            $('.document-library-filter .medical-speciality-filter').filterMedicalDropdown({
                doneChangeFilter: setupDocumentResultsAmount,
                filterWithinContainer: '.document-library-list',
                filterItem: '.document-library-tile'
            });
        }
        if ($('.document-library-filter .product-category-filter').length) {
            $('.document-library-filter .product-category-filter').filterProductDropdown({
                doneChangeFilter: setupDocumentResultsAmount,
                filterWithinContainer: '.document-library-list',
                filterItem: '.document-library-tile'
            });
        }
        if ($('.document-library-filter .literature-type-filter').length) {
            $('.document-library-filter .literature-type-filter').filterLiteratureDropdown({
                doneChangeFilter: setupDocumentResultsAmount,
                filterWithinContainer: '.document-library-list',
                filterItem: '.document-library-tile'
            });
        }

        if ($('.js-document-library-toggle').length < 1) {
            $('.document-library-container h2').css('margin', '30px 0 5px');
        }

        if ($('.document-library-filter').length < 1 && $('.js-document-library-toggle').length < 1) {
            $('.document-library-container h2').css('margin', '0 0 5px');
        }
    });

    $.fn.filterMedicalDropdown = function (options) {
        // filterWithinContainer: search within a specific container
        // filterItem: ID or class on each individual items that can be filtered
        var settings = {
            doneChangeFilter: function () { },
            filterWithinContainer: '',
            filterItem: ''
        };

        $.extend(settings, options);

        return this.each(function () {
            var filter = $(this),
                           filterSelected = filter.find('.js-medical-speciality-filter-selected'),
                           filterOptionList = filter.find('.js-medical-speciality-filter-option-list'),
                           filterOptionNames = new Array();
            filterOptionTags = new Array();
            filterResultArray = new Array();

            // generate filter options by what is on the page
            $('.js-medical-speciality-filter-option-name').each(function () {
                var filterName = $(this).text();
                var filterData;

                filterData = $(this).parents(settings.filterItem).attr('data-medical-speciality-tags').split(/\s+/);

                // check if filter name already exists in array
                if ($.inArray(filterName, filterOptionNames) === -1) {
                    filterOptionNames.push(filterName);
                    for (var i = 0; i < filterData.length; i++) {
                        var tagData = filterData[i];
                        if (tagData.length > 0) {
                            if ($.inArray(tagData, filterOptionTags) === -1) {
                                filterOptionTags.push(tagData);
                            }
                        }
                    }
                }
            });

            // create a new 2 D array of tags and names

            for (var i = 0; i < filterOptionNames.length; i++) {
                filterResultArray.push([filterOptionNames[i], filterOptionTags[i]]);
            }

            filterResultArray.sort(sortByFilterName);

            for (var j = 0; j < filterResultArray.length; j++) {
                var filterOption = '<li class="solution-filter-option js-medical-speciality-filter-option" data-tag="' + filterResultArray[j][1] + '">' + filterResultArray[j][0] + '</li>';
                filterOptionList.append(filterOption);
            }

            filterSelected.click(function () {
                $(this).next().slideToggle(500);
            });

            filterOptionList.on('click', '.js-medical-speciality-filter-option', function () {
                var selected = $(this),
                                  selectedText = selected.text(),
                                  firstSelectedOption = selected.data('tag');
                var secondSelectedOption = $(".js-product-category-filter-selected-text").data('tag');
                var thirdSelectedOption = $(".js-literature-type-filter-selected-text").data('tag');

                if (secondSelectedOption == undefined) {
                    secondSelectedOption = '';
                }

                if (thirdSelectedOption == undefined) {
                    thirdSelectedOption = '';
                }

                // change the value of the selected and slide up the dropdown
                $(this).parent().slideUp(500).prev().children('.js-medical-speciality-filter-selected-text').text(selectedText);
                $('.js-medical-speciality-filter-selected-text').data("tag", firstSelectedOption);

                // show all items with the selected tag

                if (firstSelectedOption != '' && secondSelectedOption != '' && thirdSelectedOption != '') {
                    $(settings.filterItem).hide();
                    $(settings.filterItem + '[data-medical-speciality-tags~=' + firstSelectedOption + ']').filter(settings.filterItem + '[data-product-category-tags~=' + secondSelectedOption + ']').filter(settings.filterItem + '[data-literature-type-tags~=' + thirdSelectedOption + ']').show();
                }
                else if (firstSelectedOption != '' && secondSelectedOption != '') {
                    $(settings.filterItem).hide();
                    $(settings.filterItem + '[data-medical-speciality-tags~=' + firstSelectedOption + ']').filter(settings.filterItem + '[data-product-category-tags~=' + secondSelectedOption + ']').show();
                }
                else if (firstSelectedOption != '' && thirdSelectedOption != '') {
                    $(settings.filterItem).hide();
                    $(settings.filterItem + '[data-medical-speciality-tags~=' + firstSelectedOption + ']').filter(settings.filterItem + '[data-literature-type-tags~=' + thirdSelectedOption + ']').show();
                }
                else if (secondSelectedOption != '' && thirdSelectedOption != '') {
                    $(settings.filterItem).hide();
                    $(settings.filterItem + '[data-product-category-tags~=' + secondSelectedOption + ']').filter(settings.filterItem + '[data-literature-type-tags~=' + thirdSelectedOption + ']').show();
                }
                else if (firstSelectedOption != '') {
                    $(settings.filterItem).hide();
                    $(settings.filterItem + '[data-medical-speciality-tags~=' + firstSelectedOption + ']', settings.filterWithinContainer).show();
                }
                else if (secondSelectedOption != '') {
                    $(settings.filterItem).hide();
                    $(settings.filterItem + '[data-product-category-tags~=' + secondSelectedOption + ']', settings.filterWithinContainer).show();
                }
                else if (thirdSelectedOption != '') {
                    $(settings.filterItem).hide();
                    $(settings.filterItem + '[data-literature-type-tags~=' + thirdSelectedOption + ']', settings.filterWithinContainer).show();
                }
                else if (firstSelectedOption == '' && secondSelectedOption == '' && thirdSelectedOption == '') {
                    $(settings.filterItem).show();
                }

                settings.doneChangeFilter();
            });
        });
    };

    $.fn.filterProductDropdown = function (options) {
        // filterWithinContainer: search within a specific container
        // filterItem: ID or class on each individual items that can be filtered
        var settings = {
            doneChangeFilter: function () { },
            filterWithinContainer: '',
            filterItem: ''
        };

        $.extend(settings, options);

        return this.each(function () {
            var filter = $(this),
                           filterSelected = filter.find('.js-product-category-filter-selected'),
                           filterOptionList = filter.find('.js-product-category-filter-option-list'),
                           filterOptionNames = new Array();
            filterOptionTags = new Array();
            filterResultArray = new Array();

            // generate filter options by what is on the page
            $('.js-product-categories-filter-option-name').each(function () {
                var filterName = $(this).text();
                var filterData;

                filterData = $(this).parents(settings.filterItem).attr('data-product-category-tags').split(/\s+/);

                // check if filter name already exists in array
                if ($.inArray(filterName, filterOptionNames) === -1) {
                    filterOptionNames.push(filterName);
                    for (var i = 0; i < filterData.length; i++) {
                        var tagData = filterData[i];
                        if (tagData.length > 0) {
                            if ($.inArray(tagData, filterOptionTags) === -1) {
                                filterOptionTags.push(tagData);
                            }
                        }
                    }
                }
            });

            // create a new 2 D array of tags and names

            for (var i = 0; i < filterOptionNames.length; i++) {
                filterResultArray.push([filterOptionNames[i], filterOptionTags[i]]);
            }

            filterResultArray.sort(sortByFilterName);

            for (var j = 0; j < filterResultArray.length; j++) {
                var filterOption = '<li class="solution-filter-option js-product-category-filter-option" data-tag="' + filterResultArray[j][1] + '">' + filterResultArray[j][0] + '</li>';
                filterOptionList.append(filterOption);
            }

            filterSelected.click(function () {
                $(this).next().slideToggle(500);
            });

            filterOptionList.on('click', '.js-product-category-filter-option', function () {
                var selected = $(this),
                                  selectedText = selected.text(),
                                  secondSelectedOption = selected.data('tag');
                var firstSelectedOption = $(".js-medical-speciality-filter-selected-text").data('tag');
                var thirdSelectedOption = $(".js-literature-type-filter-selected-text").data('tag');

                if (firstSelectedOption == undefined) {
                    firstSelectedOption = '';
                }

                if (thirdSelectedOption == undefined) {
                    thirdSelectedOption = '';
                }

                // change the value of the selected and slide up the dropdown
                $(this).parent().slideUp(500).prev().children('.js-product-category-filter-selected-text').text(selectedText);
                $('.js-product-category-filter-selected-text').data("tag", secondSelectedOption);
                // show all items with the selected tag
                if (firstSelectedOption != '' && secondSelectedOption != '' && thirdSelectedOption != '') {
                    $(settings.filterItem).hide();
                    $(settings.filterItem + '[data-medical-speciality-tags~=' + firstSelectedOption + ']').filter(settings.filterItem + '[data-product-category-tags~=' + secondSelectedOption + ']').filter(settings.filterItem + '[data-literature-type-tags~=' + thirdSelectedOption + ']').show();
                }
                else if (firstSelectedOption != '' && secondSelectedOption != '') {
                    $(settings.filterItem).hide();
                    $(settings.filterItem + '[data-medical-speciality-tags~=' + firstSelectedOption + ']').filter(settings.filterItem + '[data-product-category-tags~=' + secondSelectedOption + ']').show();
                }
                else if (firstSelectedOption != '' && thirdSelectedOption != '') {
                    $(settings.filterItem).hide();
                    $(settings.filterItem + '[data-medical-speciality-tags~=' + firstSelectedOption + ']').filter(settings.filterItem + '[data-literature-type-tags~=' + thirdSelectedOption + ']').show();
                }
                else if (secondSelectedOption != '' && thirdSelectedOption != '') {
                    $(settings.filterItem).hide();
                    $(settings.filterItem + '[data-product-category-tags~=' + secondSelectedOption + ']').filter(settings.filterItem + '[data-literature-type-tags~=' + thirdSelectedOption + ']').show();
                }
                else if (firstSelectedOption != '') {
                    $(settings.filterItem).hide();
                    $(settings.filterItem + '[data-medical-speciality-tags~=' + firstSelectedOption + ']', settings.filterWithinContainer).show();
                }
                else if (secondSelectedOption != '') {
                    $(settings.filterItem).hide();
                    $(settings.filterItem + '[data-product-category-tags~=' + secondSelectedOption + ']', settings.filterWithinContainer).show();
                }
                else if (thirdSelectedOption != '') {
                    $(settings.filterItem).hide();
                    $(settings.filterItem + '[data-literature-type-tags~=' + thirdSelectedOption + ']', settings.filterWithinContainer).show();
                }

                else if (firstSelectedOption == '' && secondSelectedOption == '' && thirdSelectedOption == '') {
                    $(settings.filterItem).show();
                }

                settings.doneChangeFilter();
            });
        });
    };

    $.fn.filterLiteratureDropdown = function (options) {
        // filterWithinContainer: search within a specific container
        // filterItem: ID or class on each individual items that can be filtered
        var settings = {
            doneChangeFilter: function () { },
            filterWithinContainer: '',
            filterItem: ''
        };

        $.extend(settings, options);

        return this.each(function () {
            var filter = $(this),
                           filterSelected = filter.find('.js-literature-type-filter-selected'),
                           filterOptionList = filter.find('.js-literature-type-filter-option-list'),
                           filterOptionNames = new Array();
            filterOptionTags = new Array();
            filterResultArray = new Array();

            // generate filter options by what is on the page
            $('.js-literature-type-filter-option-name').each(function () {
                var filterName = $(this).text();
                var filterData;

                filterData = $(this).parents(settings.filterItem).attr('data-literature-type-tags').split(/\s+/);

                // check if filter name already exists in array
                if ($.inArray(filterName, filterOptionNames) === -1) {
                    filterOptionNames.push(filterName);
                    for (var i = 0; i < filterData.length; i++) {
                        var tagData = filterData[i];
                        if (tagData.length > 0) {
                            if ($.inArray(tagData, filterOptionTags) === -1) {
                                filterOptionTags.push(tagData);
                            }
                        }
                    }
                }
            });

            for (var i = 0; i < filterOptionNames.length; i++) {
                filterResultArray.push([filterOptionNames[i], filterOptionTags[i]]);
            }

            filterResultArray.sort(sortByFilterName);

            for (var j = 0; j < filterResultArray.length; j++) {
                var filterOption = '<li class="solution-filter-option js-literature-type-filter-option" data-tag="' + filterResultArray[j][1] + '">' + filterResultArray[j][0] + '</li>';
                filterOptionList.append(filterOption);
            }

            filterSelected.click(function () {
                $(this).next().slideToggle(500);
            });

            filterOptionList.on('click', '.js-literature-type-filter-option', function () {
                var selected = $(this),
                                  selectedText = selected.text(),
                                  thirdSelectedOption = selected.data('tag');

                var firstSelectedOption = $(".js-medical-speciality-filter-selected-text").data('tag');
                var secondSelectedOption = $(".js-product-category-filter-selected-text").data('tag');

                if (firstSelectedOption == undefined) {
                    firstSelectedOption = '';
                }

                if (secondSelectedOption == undefined) {
                    secondSelectedOption = '';
                }

                // change the value of the selected and slide up the dropdown
                $(this).parent().slideUp(500).prev().children('.js-literature-type-filter-selected-text').text(selectedText);
                $('.js-literature-type-filter-selected-text').data("tag", thirdSelectedOption);

                // show all items with the selected tag
                if (firstSelectedOption != '' && secondSelectedOption != '' && thirdSelectedOption != '') {
                    $(settings.filterItem).hide();
                    $(settings.filterItem + '[data-medical-speciality-tags~=' + firstSelectedOption + ']').filter(settings.filterItem + '[data-product-category-tags~=' + secondSelectedOption + ']').filter(settings.filterItem + '[data-literature-type-tags~=' + thirdSelectedOption + ']').show();
                }
                else if (firstSelectedOption != '' && secondSelectedOption != '') {
                    $(settings.filterItem).hide();
                    $(settings.filterItem + '[data-medical-speciality-tags~=' + firstSelectedOption + ']').filter(settings.filterItem + '[data-product-category-tags~=' + secondSelectedOption + ']').show();
                }
                else if (firstSelectedOption != '' && thirdSelectedOption != '') {
                    $(settings.filterItem).hide();
                    $(settings.filterItem + '[data-medical-speciality-tags~=' + firstSelectedOption + ']').filter(settings.filterItem + '[data-literature-type-tags~=' + thirdSelectedOption + ']').show();
                }
                else if (secondSelectedOption != '' && thirdSelectedOption != '') {
                    $(settings.filterItem).hide();
                    $(settings.filterItem + '[data-product-category-tags~=' + secondSelectedOption + ']').filter(settings.filterItem + '[data-literature-type-tags~=' + thirdSelectedOption + ']').show();
                }
                else if (firstSelectedOption != '') {
                    $(settings.filterItem).hide();
                    $(settings.filterItem + '[data-medical-speciality-tags~=' + firstSelectedOption + ']', settings.filterWithinContainer).show();
                }
                else if (secondSelectedOption != '') {
                    $(settings.filterItem).hide();
                    $(settings.filterItem + '[data-product-category-tags~=' + secondSelectedOption + ']', settings.filterWithinContainer).show();
                }
                else if (thirdSelectedOption != '') {
                    $(settings.filterItem).hide();
                    $(settings.filterItem + '[data-literature-type-tags~=' + thirdSelectedOption + ']', settings.filterWithinContainer).show();

                    // if the first filter and second filter value selected is blank/all, show items
                }

                else if (firstSelectedOption == '' && secondSelectedOption == '' && thirdSelectedOption == '') {
                    $(settings.filterItem).show();
                }

                settings.doneChangeFilter();
            });
        });
    };

    var setupDocumentResultsAmount = function () {
        var productCategoriesTitle = setSelectedDisplayOptions();
        var productCategoriesCount = $('.product-tile:visible').length;

        $("#noResult").hide();

        if (productCategoriesCount == 0) {
            $("#noResult").show();
        }

        if (productCategoriesTitle != '') {
            $('.selected-categories-title').text(productCategoriesTitle);
        }
        $('.product-categories-count').text('(' + productCategoriesCount + ')');
        $('.product-categories-subcount').each(function () {
            var productCategoriesSubCount = $(this).parent().next().children('.product-tile').length;
            $(this).text('(' + productCategoriesSubCount + ')');
        });
        //SDT00804963 - CQ5 Production environment Media Gallery Component error needs correcting
        if ($("ul#mediaGalleryList").length > 0) {
            $('.product-categories-count').each(function () {
                var productCategoriesCount = $(this).parent().next().children('.product-tile:visible').length;
                $(this).text('(' + productCategoriesCount + ')');
            });
        }
    };

    var setSelectedDisplayOptions = function () {
        var defaultResultText = $('input[name=allResultText]').val();
        var firstSelectedOption = $(".js-medical-speciality-filter-selected-text").text();
        var secondSelectedOption = $(".js-product-category-filter-selected-text").text();
        var thirdSelectedOption = $(".js-literature-type-filter-selected-text").text();

        var firstSelectedOptionDataTag = $(".js-medical-speciality-filter-selected-text").data('tag');
        var secondSelectedOptionDataTag = $(".js-product-category-filter-selected-text").data('tag');
        var thirdSelectedOptionDataTag = $(".js-literature-type-filter-selected-text").data('tag');

        if (firstSelectedOptionDataTag == undefined) {
            firstSelectedOptionDataTag = '';
        }

        if (secondSelectedOptionDataTag == undefined) {
            secondSelectedOptionDataTag = '';
        }

        if (thirdSelectedOptionDataTag == undefined) {
            thirdSelectedOptionDataTag = '';
        }

        // show all items with the selected tag
        if (firstSelectedOptionDataTag != '' && secondSelectedOptionDataTag != '' && thirdSelectedOptionDataTag != '') {
            return firstSelectedOption + ', ' + secondSelectedOption + ', ' + thirdSelectedOption;
        }
        else if (firstSelectedOptionDataTag != '' && secondSelectedOptionDataTag != '') {
            return firstSelectedOption + ', ' + secondSelectedOption;
        }
        else if (firstSelectedOptionDataTag != '' && thirdSelectedOptionDataTag != '') {
            return firstSelectedOption + ', ' + thirdSelectedOption;
        }
        else if (secondSelectedOptionDataTag != '' && thirdSelectedOptionDataTag != '') {
            return secondSelectedOption + ', ' + thirdSelectedOption;
        }
        else if (firstSelectedOptionDataTag != '') {
            return firstSelectedOption;
        }
        else if (secondSelectedOptionDataTag != '') {
            return secondSelectedOption;
        }
        else if (thirdSelectedOptionDataTag != '') {
            return thirdSelectedOption;
        }
        else if (firstSelectedOptionDataTag == '' && secondSelectedOptionDataTag == '' && thirdSelectedOptionDataTag == '') {
            return defaultResultText;
        }

        return '';
    };

    var sortLowerAtoZ = function (a, b) {
        if (a.toLowerCase() < b.toLowerCase()) return -1;
        if (a.toLowerCase() > b.toLowerCase()) return 1;
        return 0;
    };

    var sortByFilterName = function (a, b) {
        if (a[0].toLowerCase() === b[0].toLowerCase()) {
            return 0;
        }
        else {
            return (a[0].toLowerCase() < b[0].toLowerCase()) ? -1 : 1;
        }
    };
})()); ; createNamespace('app.components.deviceLookupForm', (function () {
    $(document).ready(function () {
        $("form").attr('autocomplete', 'off');
        $('#serialNumberErrorMessage').hide();
        $('#modelNumberErrorMessage').hide();
        var url = window.location.href;
        if (url.indexOf('Submit?') != -1) {
            var modelNumberForValidation = $('input[name=modelNumberForValidation]').val();
            var serialNumberForValidatiion = $('input[name=serialNumberForValidatiion]').val();
            var emptyModelNumberErrorMessage = $('input[name=emptyModelNumberErrorMessage]').val();
            var validLengthModelNumberErrorMessage = $('input[name=validLengthModelNumberErrorMessage]').val();

            var emptySerialNumberErrorMessage = $('input[name=emptySerialNumberErrorMessage]').val();
            var validLengthSerialNumberErrorMessage = $('input[name=validLengthSerialNumberErrorMessage]').val();

            if (modelNumberForValidation == '') {
                $('#modelNumberErrorMessage').show();
                $('#modelNumberErrorMessage').text(emptyModelNumberErrorMessage);
            }
            else if (modelNumberForValidation != '' && modelNumberForValidation.length > 20) {
                $('#modelNumberErrorMessage').show();
                $('#modelNumberErrorMessage').text(validLengthModelNumberErrorMessage);
            }

            if (serialNumberForValidatiion == '') {
                $('#serialNumberErrorMessage').show();
                $('#serialNumberErrorMessage').text(emptySerialNumberErrorMessage);
            }
            else if (serialNumberForValidatiion != '' && serialNumberForValidatiion.length > 20) {
                $('#serialNumberErrorMessage').show();
                $('#serialNumberErrorMessage').text(validLengthSerialNumberErrorMessage);
            }
            else {
                $('#serialNumberErrorMessage').hide();
            }
        }
        if ($("#btnDeviceSearchAgain").length > 0) {
            $('#btnDeviceSearchAgain').bind('click', doSearchAganin);
        }
        if ($("#btnDeviceLookupSubmit").length > 0) {
            $('#btnDeviceLookupSubmit').bind('click', validateDeviceLookuForm);
        }

        if ($('#modelNumber').length) {
            $('#modelNumber').bind('keyup', validateModelNumber);
        }

        if ($('#serialNumber').length) {
            $('#serialNumber').bind('keyup', validateSerialNumber);
        }
    });

    var validateModelNumber = function () {
        var modelNumberTextbox = $('#modelNumber');

        if (jQuery.trim(modelNumberTextbox.val()) != '') {
            $('#modelNumberErrorMessage').hide();
            modelNumberTextbox.removeClass('validation-error');
        }
    }

    var validateSerialNumber = function () {
        var serialNumberTextbox = $('#serialNumber');

        if (jQuery.trim(serialNumberTextbox.val()) != '') {
            $('#serialNumberErrorMessage').hide();
            serialNumberTextbox.removeClass('validation-error');
        }
    }

    var validateDeviceLookuForm = function () {
        var modelNumberTextbox = $('#modelNumber');
        var serialNumberTextbox = $('#serialNumber');
        var emptyModelNumberErrorMessage = $('input[name=emptyModelNumberErrorMessage]').val();
        var validLengthModelNumberErrorMessage = $('input[name=validLengthModelNumberErrorMessage]').val();

        var emptySerialNumberErrorMessage = $('input[name=emptySerialNumberErrorMessage]').val();
        var validLengthSerialNumberErrorMessage = $('input[name=validLengthSerialNumberErrorMessage]').val();

        var isValid = false;
        if (jQuery.trim(modelNumberTextbox.val()) == '') {
            $('#modelNumberErrorMessage').show();
            $('#modelNumberErrorMessage').text(emptyModelNumberErrorMessage);
            modelNumberTextbox.addClass('validation-error');
            modelNumberTextbox.val("");
            isValid = false;
        }
        else if (jQuery.trim(modelNumberTextbox.val()) != '' && jQuery.trim(modelNumberTextbox.val()).length > 20) {
            $('#modelNumberErrorMessage').show();
            $('#modelNumberErrorMessage').text(validLengthModelNumberErrorMessage);
            modelNumberTextbox.addClass('validation-error');
            isValid = false;
        }
        if (jQuery.trim(serialNumberTextbox.val()) == '') {
            $('#serialNumberErrorMessage').show();
            $('#serialNumberErrorMessage').text(emptySerialNumberErrorMessage);
            serialNumberTextbox.addClass('validation-error');
            serialNumberTextbox.val("");
            isValid = false;
        }
        else if (jQuery.trim(serialNumberTextbox.val()) != '' && jQuery.trim(serialNumberTextbox.val()).length > 20) {
            $('#serialNumberErrorMessage').show();
            $('#serialNumberErrorMessage').text(validLengthSerialNumberErrorMessage);
            serialNumberTextbox.addClass('validation-error');
            isValid = false;
        }
        if (jQuery.trim(modelNumberTextbox.val()) != '' && jQuery.trim(serialNumberTextbox.val()) != '') {
            $('#serialNumberErrorMessage').hide();
            serialNumberTextbox.removeClass('validation-error');
            $('#modelNumberErrorMessage').hide();
            modelNumberTextbox.removeClass('validation-error');
            isValid = true;
        }
        if (isValid) {
            return true;
        }

        return false;
    }

    var doSearchAganin = function () {
        $("#searchSection").show();
        $("#resultsection").hide();
        $('#modelNumber').val('');
        $('#serialNumber').val('');
        return false;
    }
})()); ; createNamespace('app.components.travelWithYourDeviceFilter', (function () {
    $(document).ready(function () {
        $('.city-filter').css('margin-right', '0');
        if ($('.travel-with-device-container').length) {
            $('.travel-with-device-container .country-filter').filterTravelDropdown({}, 'country');
            $('.travel-with-device-container .state-filter').filterTravelDropdown({}, 'state').hide();
            $('.travel-with-device-container .city-filter').filterTravelDropdown({}, 'city').hide();
            $('.solution-results').hide();
        }
    });

    $.fn.focusTextToEnd = function () {
        this.focus();
        var $thisVal = this.val();
        this.val('').val($thisVal);
        return this;
    }

    $.fn.filterTravelDropdown = function (options, filterCategory) {
        // filterWithinContainer: search within a specific container
        // filterItem: ID or class on each individual items that can be filtered
        var settings = {
            doneChangeFilter: function () { },
            filterWithinContainer: '',
            filterItem: ''
        };

        $.extend(settings, options);

        return this.each(function () {
            var filter = $(this),
				filterSelected = filter.find('.js-' + filterCategory + '-filter-selected'),
				filterOptionList = filter.find('.js-' + filterCategory + '-filter-option-list'),
				filterOptionNames = new Array();
            filterOptionTags = new Array();

            // generate filter options by what is on the page
            $('.js-' + filterCategory + '-filter-option-name').each(function () {
                var filterName = $(this).text();
                var filterData;

                filterData = $(this).parents(settings.filterItem).attr('data-' + filterCategory + '-tags').split(/\s+/);

                // check if filter name already exists in array
                if ($.inArray(filterName, filterOptionNames) === -1) {
                    filterOptionNames.push(filterName);
                    for (var i = 0; i < filterData.length; i++) {
                        var tagData = filterData[i];
                        if (tagData.length > 0) {
                            if ($.inArray(tagData, filterOptionTags) === -1) {
                                filterOptionTags.push(tagData);
                            }
                        }
                    }
                }
            });

            // sort the array of tags

            for (var j = 0; j < filterOptionNames.length; j++) {
                var filterOption = '<li class="solution-filter-option js-' + filterCategory + '-filter-option" data-tag="' + filterOptionTags[j] + '">' + filterOptionNames[j] + '</li>';
                filterOptionList.append(filterOption);
            }

            filterSelected.click(function () {
                $(this).next().slideToggle(500, function () {
                    if ($(this).is(":visible")) {
                        if (filterCategory === "country") {
                            $('.js-state-filter-selected-text').show();
                            $('.js-state-filter-arrow').show();
                            $('.js-state-filter-textarea').hide();
                            $('.js-city-filter-selected-text').show();
                            $('.js-city-filter-arrow').show();
                            $('.js-city-filter-textarea').hide();
                        }
                        if (filterCategory === "state") {
                            $('.js-country-filter-selected-text').show();
                            $('.js-country-filter-arrow').show();
                            $('.js-country-filter-textarea').hide();
                            $('.js-city-filter-selected-text').show();
                            $('.js-city-filter-arrow').show();
                            $('.js-city-filter-textarea').hide();
                        }
                        if (filterCategory === "city") {
                            $('.js-country-filter-selected-text').show();
                            $('.js-country-filter-arrow').show();
                            $('.js-country-filter-textarea').hide();
                            $('.js-state-filter-selected-text').show();
                            $('.js-state-filter-arrow').show();
                            $('.js-state-filter-textarea').hide();
                        }

                        if (filterOptionList.find('li:hidden').length) {
                            filterOptionList.find('li:hidden').each(function () {
                                $(this).show();
                            });
                        }
                        $('.js-' + filterCategory + '-filter-selected-text').hide();
                        $('.js-' + filterCategory + '-filter-arrow').hide();
                        $('.js-' + filterCategory + '-filter-textarea').show();
                        $('.js-' + filterCategory + '-filter-textarea').focusTextToEnd();
                    }
                    else {
                        $('.js-' + filterCategory + '-filter-selected-text').show();
                        $('.js-' + filterCategory + '-filter-arrow').show();
                        $('.js-' + filterCategory + '-filter-textarea').hide();
                    }
                });

                $(this).next().scrollTop(0);

                if (filterCategory == "country") {
                    $('.js-city-filter-option-list').slideUp();
                    $('.js-state-filter-option-list').slideUp();
                }

                if (filterCategory == "state") {
                    $('.js-city-filter-option-list').slideUp();
                    $('.js-country-filter-option-list').slideUp();
                }

                if (filterCategory == "city") {
                    $('.js-country-filter-option-list').slideUp();
                    $('.js-state-filter-option-list').slideUp();
                }
            });

            $('.js-' + filterCategory + '-filter-textarea').on('keyup', function (e) {
                var valThis = $(this).val().toLowerCase();
                if (e.keyCode === 8) {
                    if (filterOptionList.find('li:hidden').length) {
                        filterOptionList.find('li:hidden').each(function () {
                            var text = $(this).text().toLowerCase();
                            (text.indexOf(valThis) == 0) ? $(this).show() : $(this).hide();
                        });
                    }
                    else {
                        filterOptionList.find('li').each(function () {
                            var text = $(this).text().toLowerCase();
                            (text.indexOf(valThis) == 0) ? $(this).show() : $(this).hide();
                        });
                    }
                }
                else {
                    filterOptionList.find('li').each(function () {
                        var text = $(this).text().toLowerCase();
                        (text.indexOf(valThis) == 0) ? $(this).show() : $(this).hide();
                    });
                }

                if (valThis == "" && filterOptionList.find('li:hidden').length < 1) {
                    if (filterCategory === "country") {
                        $('.js-country-filter-selected-text').html($('input[name=selectCountry]').val());
                        $('.js-state-filter-selected-text').html($('input[name=selectState]').val());
                        $('.js-city-filter-selected-text').html($('input[name=selectCity]').val());

                        $('.travel-with-device-container .city-filter').hide();
                        $('.travel-with-device-container .state-filter').hide();
                    }
                    if (filterCategory === "state") {
                        $('.js-state-filter-selected-text').html($('input[name=selectState]').val());
                        $('.travel-with-device-container .city-filter').hide();
                    }
                    if (filterCategory === "city") {
                        $('.js-city-filter-selected-text').html($('input[name=selectCity]').val());
                    }

                    $('.solution-results').hide();
                }
            });

            filterOptionList.on('click', '.js-' + filterCategory + '-filter-option', function () {
                var selected = $(this),
					selectedText = selected.text(),
					firstSelectedOption = selected.data('tag');

                // change the value of the selected and slide up the dropdown
                $('.js-' + filterCategory + '-filter-textarea').val(selectedText);
                // change the value of the selected and slide up the dropdown
                $('.js-' + filterCategory + '-filter-selected-text').show();
                $(this).parent().slideUp(500).prev().children('.js-' + filterCategory + '-filter-selected-text').text(selectedText);

                $('.js-' + filterCategory + '-filter-selected-text').data("tag", firstSelectedOption);
                $('.js-' + filterCategory + '-filter-textarea').hide();
                settings.doneChangeFilter();

                if (filterCategory === 'country') {
                    $('.travel-with-device-container .city-filter').hide();
                    $('.travel-with-device-container .state-filter').hide();
                    $('.solution-results').hide();
                    if (firstSelectedOption == "USA") {
                        $.ajax({
                            url: 'js/states.json',
                            data: 'USA',
                            dataType: 'json',
                            success: function (response) {
                                $('.js-state-filter-option-list').html('');
                                sortedStates = response.states.sort(sortStateNamesAsc);
                                for (var i = 0, len = sortedStates.length; i < len; i++) {
                                    var listItem = '<li class=\"solution-filter-option js-state-filter-option\" data-tag=\"' + sortedStates[i].code + '\">' + sortedStates[i].state + '</li>';

                                    $('.js-state-filter-option-list').append(listItem);
                                };
                            },
                            error: function (response) {
                            }
                        });
                        $('.js-state-filter-selected-text').html('Select a State');

                        $('.travel-with-device-container .state-filter').show();
                        $('.js-state-filter-textarea').val('');
                    } else {
                        $('.js-city-filter-option-list').html('');
                        $.ajax({
                            url: 'js/cities2.json',
                            data: firstSelectedOption,
                            dataType: 'json',
                            success: function (response) {
                                $('.js-city-filter-option-list').html('');
                                sortedCities = response.india.sort(sortCityNamesAsc);
                                for (var i = 0, len = sortedCities.length; i < len; i++) {
                                    var listItem = '<li class=\"solution-filter-option js-city-filter-option\" data-tag=\"' + sortedCities[i].code + '\">' + sortedCities[i].city + '</li>';

                                    $('.js-city-filter-option-list').append(listItem);
                                };
                            },
                            error: function (response) {
                            }
                        });

                        $('.js-city-filter-selected-text').html('Select a City');

                        $('.travel-with-device-container .city-filter').show();
                        $('.js-city-filter-textarea').val('');
                    }
                } else if (filterCategory === 'state') {
                    if (firstSelectedOption !== '') {
                        $('.solution-results').html('');
                        $.ajax({
                            url: 'js/cities.json',
                            data: firstSelectedOption,
                            dataType: 'json',
                            success: function (response) {
                                $('.js-city-filter-option-list').html('');
                                sortedCities = response.illinois.sort(sortCityNamesAsc);
                                for (var i = 0, len = sortedCities.length; i < len; i++) {
                                    var listItem = '<li class=\"solution-filter-option js-city-filter-option\" data-tag=\"' + sortedCities[i].code + '\">' + sortedCities[i].city + '</li>';

                                    $('.js-city-filter-option-list').append(listItem);
                                };
                            },
                            error: function (response) {
                            }
                        });
                        $('.js-city-filter-selected-text').html('Select a City');
                        $('.travel-with-device-container .city-filter').show();
                        $('.js-city-filter-textarea').val('');
                    }
                } else if (filterCategory === 'city') {
                    $('.solution-results').html('');
                    if (firstSelectedOption !== '') {
                        $.ajax({
                            url: 'js/results.json',
                            data: firstSelectedOption,
                            dataType: 'json',
                            success: function (response) {
                                for (var i = 0, len = response.results.length; i < len; i++) {
                                    var resultItem = '<div class="result result-' + i + '"><p><span class="map-pin">' + (i + 1) + '</span></p></div>'

                                    $('.solution-results').append(resultItem);
                                    resultItem = $('.result-' + i + ' p');
                                    resultItem.append('<span class="companyname">' + response.results[i].companyname + '</span><br>');

                                    if (response.results[i].addressline1 != null && response.results[i].addressline1.length > 0) {
                                        resultItem.append(response.results[i].addressline1 + '<br>');
                                    }
                                    if (response.results[i].addressline2 != null && response.results[i].addressline2.length !== 0) {
                                        resultItem.append(response.results[i].addressline2 + '<br>');
                                    }
                                    if (response.results[i].addressline3 != null && response.results[i].addressline3.length !== 0) {
                                        resultItem.append(response.results[i].addressline3 + '<br>');
                                    }

                                    if (response.results[i].state == null && response.results[i].postalcode != null && response.results[i].postalcode.length > 0) {
                                        resultItem.append(response.results[i].city + ' ' + response.results[i].postalcode + '<br>');
                                    }
                                    else if (response.results[i].state == null && response.results[i].postalcode.length == 0) {
                                        resultItem.append(response.results[i].city + '<br>');
                                    }
                                    else {
                                        resultItem.append(response.results[i].city + ', ' + response.results[i].state + ' ' + response.results[i].postalcode + '<br>');
                                    }

                                    if (response.results[i].telephonenumber != null && response.results[i].telephonenumber.length > 0) {
                                        resultItem.append($('#phoneText').val() + ': ' + response.results[i].telephonenumber + '<br>');
                                    }

                                    if (response.results[i].faxnumber != null && response.results[i].faxnumber.length > 0) {
                                        resultItem.append($('#faxText').val() + ': ' + response.results[i].faxnumber);
                                    }

                                    if ($("span.map-pin").length) {
                                        $("span.map-pin").each(function () {
                                            var innerContent = $(this).text();
                                            if (innerContent.length > 1) {
                                                $(this).css('text-indent', '-5px');
                                            }
                                        });
                                    }
                                }
                            },
                            error: function (response) {
                            }
                        });
                        $('.solution-results').show();
                    }
                }
            });
        });

        function sortStateName(a, b) {
            if (a.state < b.state) {
                return -1;
            }
            else if (a.state > b.state) {
                return 1;
            }
        };
        function sortStateNamesAsc(a, b) {
            return sortStateName(a, b) * 1;
        };

        function sortCityName(a, b) {
            if (a.city < b.city) {
                return -1;
            }
            else if (a.city > b.city) {
                return 1;
            }
        };
        function sortCityNamesAsc(a, b) {
            return sortCityName(a, b) * 1;
        };
    };
})()); ; createNamespace('app.components.manageTitleForMobile', (function () {
    var titleWidth = function () {
        return $(window).width() - $('#rightLogo').width() - $('.mobile-nav-drawer').width();
    };
    $(document).ready(function () {
        if ($(window).width() < 600) {
            $('.left-header-text-thin-nav').width(titleWidth());
            $('.left-header-thin-nav').css('width', titleWidth());
            $(window).resize(function () {
                $('.left-header-text-thin-nav').width(titleWidth());
                $('.left-header-thin-nav').css('width', titleWidth());
            });
        }
    });
})()); ; createNamespace('app.components.manageStyleForPDPNav', (function () {
    $(document).ready(function () {
        if ($('.nav-pdp-secondary-container').length) {
            if ($('.tertiary-nav').length < 1) {
                $('ul.left-nav-main-level.active').css('border-radius', '6px');
                $('.nav-pdp-secondary-container .left-nav ul.left-nav-main-level > li.link-self.first a').css('border-radius', '6px 0 0 6px');
                $('.nav-pdp-secondary-container .left-nav ul.left-nav-main-level > li.link-self.last a').css('border-radius', '0px 6px 6px 0px');
            }
        }
    });
})()); ; createNamespace('app.components.filterProductOnLoad', (function () {
    $(document).ready(function () {
        if ($('.js-product-categories-gallery-filter').length) {
            if (window.location.hash) {
                // hash found
                var hash = window.location.hash.substring(1); //Puts hash in variable, and removes the # character
                if (hash != '' && hash.indexOf('filterBy') > -1) {
                    var filterData = hash.split('/');
                    if (filterData.length > 1) {
                        var filterBy = filterData[1];

                        $('.js-solution-filter-option').each(function () {
                            var currentTag = $(this).data('tag');
                            if (currentTag != '' && currentTag == filterBy) {
                                $(this).click();
                                return false;
                            }
                        });
                    }
                }
            }
        }
    });
})()); ;
createNamespace('app.components.handleCarouselArrowsIE', (function () {
    $(document).ready(function () {
        if ($('html').hasClass('lt-ie9')) {
            $('.prev.product-comparison-carousel-nav span').removeClass('fa-angle-left');
            $('.next.product-comparison-carousel-nav span').removeClass('fa-angle-right');
        }
    });
})()); ; createNamespace('app.components.addArrowToAnchor', (function () {
    $(document).ready(function () {
        if ($('a.text-icon').length) {
            var arrowHtml = '<span class="arrows"><i class="fa fa-angle-right"></i></span>';
            $('a.text-icon').append(arrowHtml);
        }
    });
})()); ; createNamespace('app.components.validateFullWidthForm', (function () {
    $(document).ready(function () {
        if ($('.form-error-message-full').length) {
            $('textarea').bind('keyup', validateTextArea);

            if ($('input[type="radio"]').length) {
                $('input[type="radio"]').change(function () {
                    if ($(this).is(":checked")) {
                        $("div[name=" + $(this).attr('name') + "]").hide();
                    }
                });
            }

            if ($('input[type="checkbox"]').length) {
                $('input[type="checkbox"]').change(function () {
                    if ($(this).is(":checked")) {
                        $("div[name=" + $(this).attr('name') + "]").hide();
                    }
                });
            }

            if ($('select').length) {
                $('select').change(function () {
                    if ($(this).value != '') {
                        $("div[name=" + $(this).attr('name') + "]").hide();
                    }
                });
            }
        }
    });

    var validateTextArea = function () {
        var currentTextArea = $(this);
        var currentTextAreaName = currentTextArea.attr('name');
        if (currentTextArea.val() != '') {
            $("div[name=" + currentTextAreaName + "]").hide();
        }
    }
})()); ; createNamespace('app.components.manageAssessmentQuiz', (function () {
    $(document).ready(function () {
        if ($('#start-assessment').length) {
            var isFirstLoad = true;
            $('#start-assessment').bind('click', startAssessmentQuiz);
            if (window.navigator.userAgent.indexOf('Android') != -1) {
                $('a.email').hide();
            }
            $('a.email').on('click', sendQuizResultByMail);
            setQuizStyleForIE8();
        }

        function setQuizStyleForIE8() {
            if ($('html').hasClass('lt-ie9')) {
                $('input[type=radio].css-checkbox').css('visibility', 'visible')
                $('label.css-label').css({ 'background-image': 'none', 'padding-left': '0', 'margin-left': '5px' });
            }
        }

        function sendQuizResultByMail() {
            var mailToAddress = $('input[name=mailTOAddress]').val();
            var mailCCAddress = $('input[name=mailCCAddress]').val();
            var mailSubject = $('input[name=mailSubject]').val();
            var mailBodyData = "";
            mailBodyData = $(".results-slide[style='display: block;']").text(); //// set the current score data in the mail body.
            var mailBody = $('input[name=mailBody]').val();
            mailBody += "%0A%0A" + $('.score-data > h1').text() + "|" + $('.quiz-result-header').text() + "%0A%0A";
            mailBody += $(".results-slide[style='display: block;']").find('.results-score-range').text() + "%0A%0A";
            mailBody = mailBody.replace(/\s+/g, ' ');
            mailBodyData = mailBodyData.replace(/\s+/g, ' ');

            var mailMessage = "mailto:" + mailToAddress
             + "?cc=" + mailCCAddress
             + "&subject=" + mailSubject
             + "&body=" + mailBody + mailBodyData;

            window.location = mailMessage;
        }

        function startAssessmentQuiz() {
            if ($('.calculator-tool-quiz').hasClass('hidden')) {
                $('.calculator-tool-quiz').removeClass('hidden');
                $('.calculator-tool-quiz').show();
                $('#assessmentContainer').hide();
                if ($("input[type=radio].css-checkbox").length > 0) {
                    $('input[type=radio]:checked').prop('checked', false);
                }
                if (isFirstLoad) {
                    $('.calculator-tool-quiz-container').carousel({
                        enableSwipe: true,
                        showPreviews: false
                    });

                    isFirstLoad = false;
                }
            }
        };
    });
})()); ; createNamespace('app.components.handleAnchorLinkList', (function () {
    $(document).ready(function () {
        if ($('.js-anchor-component').length > 0) {
            setupAnchorLinkList();
            scrollToAnchor();
        }
    });

    var setupAnchorLinkList = function () {
        var anchorLinkTemplate = '<li><a class="explore-product-link js-anchor-link" href="#"><span class="explore-product-link-name js-anchor-link-name"></span><i class="fa fa-chevron-down"></i></a></li>';
        $('.container.main h2').each(function (i) {
            var productSectionName = $(this).text();
            var productSectionID = 'ps_' + productSectionName.replace(/[^a-z0-9]/gi, '').toLowerCase();
            if (productSectionID == 'ps_') {
                productSectionID = 'header-anchor-' + i;
            }
            $(this).attr('id', productSectionID);
            $('.js-anchor-link-list').append(anchorLinkTemplate);

            if ($('.js-anchor-link-name').length) {
                $('.js-anchor-link-name').each(function () {
                    if ($(this).text().length < 1) {
                        $(this).eq(0).text(productSectionName).parent().attr('data-id', productSectionID);
                    }
                });
            }
        });

        $('.main-content h2').each(function (i) {
            var productSectionName = $(this).text();
            var productSectionID = 'ps_' + productSectionName.replace(/[^a-z0-9]/gi, '').toLowerCase();
            if (productSectionID == 'ps_') {
                productSectionID = 'header-anchor-' + i;
            }
            $(this).attr('id', productSectionID);
            $('.js-anchor-link-list').append(anchorLinkTemplate);
            if ($('.js-anchor-link-name').length) {
                $('.js-anchor-link-name').each(function () {
                    if ($(this).text().length < 1) {
                        $(this).eq(0).text(productSectionName).parent().attr('data-id', productSectionID);
                    }
                });
            }
        });

        $('.masthead h2').each(function (i) {
            var productSectionName = $(this).text();
            var productSectionID = 'ps_' + productSectionName.replace(/[^a-z0-9]/gi, '').toLowerCase();
            if (productSectionID == 'ps_') {
                productSectionID = 'header-anchor-' + i;
            }
            $(this).attr('id', productSectionID);
            $('.js-anchor-link-list').append(anchorLinkTemplate);
            if ($('.js-anchor-link-name').length) {
                $('.js-anchor-link-name').each(function () {
                    if ($(this).text().length < 1) {
                        $(this).eq(0).text(productSectionName).parent().attr('data-id', productSectionID);
                    }
                });
            }
        });

        if ($('ul.js-anchor-link-list > li').length > 0) {
            $('.noAuthoredAnchor').hide();
        }
        else {
            $('.noAuthoredAnchor').show();
        }
    }

    var scrollToAnchor = function () {
        $('.js-anchor-link').click(function (e) {
            var $scrollObj = $('#' + $(this).attr('data-id'));
            var scrollPos = $scrollObj.position().top + 'px';

            e.preventDefault();
            $('html, body').animate({ 'scrollTop': scrollPos }, 500);
        });
    }
})()); ;
// This findParentSelectors adds a class to parent elements so CQ items generated can be targeted with our css
createNamespace('app.components.findParentSelectors', (function () {
    $(document).ready(function () {
        $(".cq-rte-resource-text").parent("p").addClass('js-rte-text-new');
        $(".cq-rte-resource-text").parent("li").parent("ol").addClass('js-rte-resource-text-main');
        $(".cq-rte-resource-text").parent("li").parent("ul").addClass('js-rte-resource-text-main');
        $(".cq-rte-line-height-01").parent("p").addClass('js-rte-text-new');
    });
})());
;
//Handles top nav which has sub nav elements
createNamespace('app.components.manageUtilityNav', (function () {
    $(document).ready(function () {
        function is_touch_device() {
            return (('ontouchstart' in window) || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));
        }
        $('.utility-nav .utility-links > li').each(function () {
            var $this = $(this);
            if ($this.children('ul').length > 0) {
                $this.addClass('top-sub-nav-exists');
                if (is_touch_device()) {
                    $this.find('> a').removeAttr('href');
                }

                if ($(window).width() < 599) {
                    var currentNode = $this.find('> a');
                    var currentText = currentNode.text();
                    currentNode.text('');
                    var innerLinkContainer = '<span class="item-name">' + currentText + '</span>';
                    innerLinkContainer += '<i class="fa fa-lg fa-angle-right item-expand-side"></i>';
                    currentNode.append(innerLinkContainer);
                }
                var manageWidth = (parseInt($this.outerWidth(), 10)) + 58;
                $this.find('> ul').css('min-width', manageWidth);
            }
        });
        if ($(window).width() > 599) {
            $('.utility-nav .utility-links > li.top-sub-nav-exists').mouseenter(function () {
                $this = $(this);
                $this.data("delay", setTimeout(function () {
                    $this.addClass('top-sub-nav-exists-hover');
                    $this.find('> ul.utility-sub-nav').show();
                }, 500));
            }).mouseleave(function () {
                $this = $(this);
                clearTimeout($this.data("delay"));
                $this.find('> ul.utility-sub-nav').hide();
                $this.removeClass('top-sub-nav-exists-hover');
            });
        }
    });
})()); ;
createNamespace('app.components.manageUtilityNavForMobile', (function () {
    var openingMenu = false;

    $(document).ready(function () {
        if ($(window).width() < 599) {
            $('nav.utility-nav .utility-links > li.top-sub-nav-exists').mouseenter(function (e) {
                //Checking for touch prevents mouseenter from triggering the click actions
                //the first time the user taps on it
                if ($('html').hasClass("no-touch")) {
                    if ($(e.currentTarget).find('.sub-nav').hasClass('expanded')) {
                        collapseSubNav(e);
                    } else {
                        expandSubNav(e);
                    }
                }
            });

            $('nav.utility-nav .utility-links > li.top-sub-nav-exists').click(function (e) {
                e.preventDefault();
                // On mobile webkit click fires after mouseenter, so we are checking for expanded since
                // the items with sub navigation will have this class and the items without will navigate
                if ($(e.currentTarget).find('.sub-nav').hasClass('expanded')) {
                    collapseSubNav(e);
                } else {
                    collapseAll(e);
                    expandSubNav(e);
                }
            });

            $('.sub-nav a').click(function (e) {
                e.stopPropagation();
            });

            var expandSubNav = function (e) {
                $('.nav-megamenu').hide();
                $(e.currentTarget).addClass('expanded');
                $(e.currentTarget).find('.sub-nav').addClass('expanded');
                $('.utility-nav.row').addClass('expanded-subnav');

                //				start cb - only show certain subNav, hide other subnavs.
                //				if you remove these 'hides' they take up block area above the subnav and push the subnav down in mobile.
                $('.top-sub-nav-exists.expanded').children('a').hide();
                $('.utility-sub-nav').hide();
                $('.top-sub-nav-exists').not('.expanded').hide();
                $('.utility-links li:not([class=""]):first').hide();
                //              end cb

                $.event.trigger('openFlyout');
            };

            var collapseSubNav = function (e) {
                $(e.currentTarget).removeClass('expanded');
                $(e.currentTarget).find('.sub-nav').removeClass('expanded');
                $('.nav-megamenu').show();
                $('.utility-nav').removeClass('expanded-subnav');
                $.event.trigger('closeFlyout');
            };

            var collapseAll = function (e) {
                $(e.currentTarget).find('.sub-nav').removeClass('expanded')
                $(e.currentTarget).removeClass('expanded');
                $('.utility-nav').removeClass('expanded-subnav');
                $.event.trigger('closeFlyout');
            };
        }
    });
})()); ;
//This findParentSelectors adds a class to parent elements so CQ items generated can be targeted with our css
createNamespace('app.components.handleEmptyDivInFormComponent', (function () {
    $(document).ready(function () {
        if ($("div.form_leftcol").length) {
            $("div.form_leftcol").each(function () {
                var innerContainer = $(this).find('.form_leftcollabel');
                if (innerContainer.find('span').length) {
                    $(this).hide();
                }
            });
        }
    });
})()); ;
createNamespace('app.components.manageHyperlinkTitle', (function () {
    $(document).ready(function () {
        $('.manage-title').each(function () {
            var urlStart = window.location.host,
                halfTitle = $(this).attr('href'),
                newUrl = urlStart + halfTitle;
            $(this).attr('title', newUrl);
        });
    });
})()); ; createNamespace('app.components.managePromoBanner', (function () {
    // PROMO BANNER SCRIPTS
    $(window).load(function () {
        // executes when complete page is fully loaded, including all frames, objects and images
        // Loop through .fa, read data-button-icon, add appropriate class via data-
        if ($('.fa').length) {
            $('.fa').each(function () {
                if ('.fa[data-button-icon=fa-play-circle]') {
                    $('.fa[data-button-icon=fa-play-circle]').addClass('fa-play-circle').css('font-size', '0');
                }

                if ('.fa[data-button-icon=fa-search]') {
                    $('.fa[data-button-icon=fa-search]').addClass('fa-search');
                }

                if ('.fa[data-button-icon=fa-chevron-right]') {
                    $('.fa[data-button-icon=fa-chevron-right]').addClass('fa-chevron-right');
                }
            });
        }

        //	Read the height of table.content-table-container
        //	Add height to table.content-table and table.content-table-container
        $('table.content-table').each(function () {
            $(this, 'table.content-table-container').css('height', $(this, 'table.content-table').parent().height() + 'px');
        });

        //	-----------------------------------
        // Find data-text-align=TOP, add class
        // Find new class, find right-col, add class
        $(".left-column[data-text-align='top']").addClass('js-leftColDataTextAlignTop');

        $(".js-leftColDataTextAlignTop").each(function () {
            $("td.right-column").addClass('js-absoluteBottom');
        });

        //	No Button Text
        $('.promo-banner-button[data-button-icon="no"]').addClass('js-noButtonIcon');

        //	No Button on Banner
        $('.promo-banner-button[data-button-visible="no"]').addClass('js-noButton');
        $('.promo-banner-button.js-noButton').parent().hide('td.right-column').parent().addClass('js-hiddenRightColumn');

        // Promo Block Video modal code
        if ($('.js-promo-banner-modal-link').length) {
            $('.js-promo-banner-modal-link').on('click', function (e) {
                e.preventDefault();

                $('body').addClass('media-iframe');

                $.fancybox(this, {
                    padding: 0,
                    autoSize: false,
                    scrolling: "no", // optional to avoid scrollbars inside fancybox
                    type: "iframe",
                    preload: true,
                    helpers: {
                        media: {}
                    },

                    beforeShow: function () {
                        ////Function : This function is used for setting the height of the iframe according to the contents.
                        $(".fancybox-iframe").height(300); //// We are setting 300 height as a base height for the iframe we can change it as per the requirements.

                        if ($('.fancybox-iframe').contents().find('body').length) {
                            var newHeight = $('.fancybox-iframe').contents().find('body')[0].scrollHeight;
                            $(".fancybox-iframe").height(newHeight + 20);

                            //// This function will reposition the Modal Popup in the center of the screen.
                            $.fancybox.reposition();

                            //// Set the display video/image/iframe as per the selected/clicked item.
                            var currentDataType = $(this.element).data('promo-modal-data-type');
                            var currentDataPath = $(this.element).data('promo-modal-data-path');
                            var currentDataTitle = $(this.element).data('-promo-modal-title');
                            var currentDataDescription = $(this.element).data('-promo-modal-description');

                            $('.fancybox-iframe').contents().find('#masterContentTitle').hide();
                            $('.fancybox-iframe').contents().find('#masterContentDescription').hide();
                            $('.fancybox-iframe').contents().find('img#masterImage').hide();

                            if (currentDataTitle != "") {
                                $('.fancybox-iframe').contents().find('#masterContentTitle').show();
                            }

                            if (currentDataDescription != "") {
                                $('.fancybox-iframe').contents().find('#masterContentDescription').show();
                            }

                            if (currentDataType != '') {
                                $('.fancybox-iframe').contents().find('div#videoplayer').hide();
                                $('.fancybox-iframe').contents().find('iframe#externalVideo').hide();

                                $('.fancybox-iframe').contents().find('#masterContentTitle').text(currentDataTitle);
                                $('.fancybox-iframe').contents().find('#masterContentDescription').text(currentDataDescription);

                                if (currentDataType == 'internal') {
                                    $('.fancybox-iframe').contents().find('div#videoplayer').show();

                                    var internalVideo = $('.fancybox-iframe').contents().find('div#videoplayer');

                                    if (internalVideo != undefined) {
                                        internalVideo.find('source').attr('src', currentDataPath);
                                        $('.fancybox-iframe').contents().find('iframe#externalVideo').attr('src', '');
                                    }
                                }

                                if (currentDataType == 'external') {
                                    $('.fancybox-iframe').contents().find('iframe#externalVideo').show();
                                    $('.fancybox-iframe').contents().find('iframe#externalVideo').attr('src', currentDataPath);
                                }

                                if (currentDataType == 'image') {
                                    $('.fancybox-iframe').contents().find('img#masterImage').show();
                                    $('.fancybox-iframe').contents().find('img#masterImage').attr('src', currentDataPath);
                                }
                            }
                        }
                    }
                });
            });
        }
    });

    //	-----------------------------------
    // Set the left padding of the promo container if the black background is used in title/description.

    if ($('.promo-banner-description').length) {
        $('.promo-banner-description').each(function () {
            var immeParent = $(this).parent();
            var parent = immeParent.parent();
            if (parent != null && parent.data('text-align') == "bottom" && $(window).width() > 959) {
                $(this).css('margin-top', '20px');
            }

            if (parent != null && parent.data('text-align') == "top" && $(window).width() < 959) {
                $(this).css('margin-top', '0px');
            }

            if (parent != null && parent.data('text-align') == "top" && $(window).width() < 599 && $('div.template').hasClass('template-h')) {
                $(this).find("h2").css('margin-top', '0');
            }
        });
    }

    if ($('.promo-banner-text').length) {
        $('.promo-banner-text').each(function () {
            var immediateParent = $(this).parent();
            var parent = immediateParent.parent();
            if (parent != null && parent.data('text-align') == "top" && $(window).width() > 959) {
                $(this).find("h2").css('margin-bottom', '20px');
            }

            if (parent != null && parent.data('text-align') == "top" && $(window).width() < 599) {
                $(this).find("h2").css('margin-bottom', '10px');
            }

            if (parent != null && parent.data('text-align') == "top" && $(window).width() > 599 && $(window).width() < 959) {
                $(this).find("h2").css('margin-bottom', '15px');
            }
        });
    }
    if ($('.js-promo-banner-page-link').length) {
        $('.js-promo-banner-page-link').each(function () {
            var promoLink = $(this);
            if (promoLink != undefined) {
                var promoBanner = promoLink.find('div.promo-banner');
                promoBanner.bind('click', function () {
                    var url = promoLink.attr('href');
                    $(location).attr('href', url);
                });
            }
        });
    }

    if ($('table.content-table td.left-column[data-text-align="bottom"]').length && $(window).width() > 599 && $(window).width() < 959) {
        $('table.content-table td.left-column[data-text-align="bottom"]').each(function () {
            var immediateNextElement = $(this).next();
            if (immediateNextElement != null && immediateNextElement.length && immediateNextElement[0].children.length) {
                $(this).css({ 'float': 'none', 'padding-right': '10px' });
                if (immediateNextElement.data("text-align") === "bottom") {
                    immediateNextElement.attr('style', 'width:auto !important; float:none;padding-right:15px');
                }
            }
        });
    }

    if ($('.template-c table.content-table td.left-column[data-text-align="bottom"]').length && $(window).width() > 599 && $(window).width() < 959) {
        $('.template-c table.content-table td.left-column[data-text-align="bottom"]').each(function () {
            var immediateNextElement = $(this).next();
            if (immediateNextElement != null && immediateNextElement.length && immediateNextElement[0].children.length) {
                $(this).css({ 'float': 'none', 'padding-right': '15px' });
                if (immediateNextElement.data("text-align") === "bottom") {
                    immediateNextElement.attr('style', 'width:auto !important; float:none;padding-right:10px');
                }
            }
        });
    }

    if ($('.template-f table.content-table td.left-column[data-text-align="bottom"]').length && $(window).width() > 599 && $(window).width() < 959) {
        $('.template-f table.content-table td.left-column[data-text-align="bottom"]').each(function () {
            var immediateNextElement = $(this).next();
            if (immediateNextElement != null && immediateNextElement.length && immediateNextElement[0].children.length) {
                $(this).css({ 'float': 'none', 'padding-right': '15px' });
                if (immediateNextElement.data("text-align") === "bottom") {
                    immediateNextElement.attr('style', 'width:auto !important; float:none;padding-right:5px');
                }
            }
        });
    }

    if ($('.template-h table.content-table td.left-column[data-text-align="bottom"]').length && $(window).width() > 599 && $(window).width() < 959) {
        $('.template-h table.content-table td.left-column[data-text-align="bottom"]').each(function () {
            var immediateNextElement = $(this).next();
            if (immediateNextElement != null && immediateNextElement.length && immediateNextElement[0].children.length) {
                $(this).css({ 'float': 'none', 'padding-right': '15px' });
                if (immediateNextElement.data("text-align") === "bottom") {
                    immediateNextElement.attr('style', 'width:auto !important; float:none;');
                }
            }
        });
    }

    if ($('.template-j table.content-table td.left-column[data-text-align="bottom"]').length && $(window).width() > 599 && $(window).width() < 959) {
        $('.template-j table.content-table td.left-column[data-text-align="bottom"]').each(function () {
            var immediateNextElement = $(this).next();
            if (immediateNextElement != null && immediateNextElement.length && immediateNextElement[0].children.length) {
                $(this).css({ 'float': 'none', 'padding-right': '15px' });
                if (immediateNextElement.data("text-align") === "bottom") {
                    immediateNextElement.attr('style', 'width:auto !important; float:none;');
                }
            }
        });
    }

    if ($('.js-promo-banner-page-link').length) {
        $('.js-promo-banner-page-link').each(function () {
            var promoLink = $(this);
            if (promoLink != undefined) {
                var promoBanner = promoLink.find('div.promo-banner');
                promoBanner.bind('click', function () {
                    var url = promoLink.attr('href');
                    $(location).attr('href', url);
                });
            }
        });
    }

    // Call updateMaxHeight when browser resize event fires
    $(window).resize(function () {
        //	Read the height of table.content-table-container
        //	Add height to table.content-table and table.content-table-container
        $('table.content-table').each(function () {
            $(this, 'table.content-table-container').css('height', '0');

            $(this, 'table.content-table-container').css('height', $(this, 'table.content-table').parent().height() + 'px');
        });
    });
})()); ;

createNamespace('app.components.manageTableAlternateColor', (function () {
    $(document).ready(function () {
        $("table.basic-table tr:odd").css('background-color', '#f8f8f8');
        $("table.row-column-header-table tr:odd").css('background-color', '#f8f8f8');
        $("table.column-header-table tr:odd").css('background-color', '#f8f8f8');
        $("table.row-header-table tr:odd").css('background-color', '#f8f8f8');

        if ($(window).width() < 599) {
            $('table').each(function () {
                var tableColumnCount = $(this).find("tr:first th").length;
                if (tableColumnCount > 3 && !$(this).hasClass('ccode-search-result-table')) {
                    $(this).wrap("<div></div>");
                    $(this).css('width', 'auto');
                    $(this).parent('div').css("overflow", "auto");
                }
            });
        }

        if ($(window).width() > 599 && $(window).width() < 959) {
            $('table').each(function () {
                var tableColumnCount = $(this).find("tr:first th").length;
                if (tableColumnCount > 5) {
                    $(this).wrap("<div class='enhance-table-container'></div>");
                    $(this).css('width', 'auto');
                    $(this).parent('div').css("overflow", "auto");
                }
            });
        }
    });
})()); ;

createNamespace('app.components.externalUrlConfirmation', (function () {
    $(document).ready(function () {
        if (!Array.prototype.indexOf) {
            Array.prototype.indexOf = function (val) {
                return jQuery.inArray(val, this);
            };
        }

        var oldIE;
        if ($('html').hasClass('lt-ie9')) {
            oldIE = true;
        }

        if ($('#externalUrlPopup').length) {
            var navigationUrl = "";

            var allowedDomainNames = $('#allowedDomainNames').val();
            var allowedDomainList = allowedDomainNames.split(',');
            $('a').bind('click', checkExternalUrl);

            $('#btnPopupClose').click(function (e) {
                e.preventDefault();
                $.fancybox.close();
            });

            $('#btnPopupContinue').click(function (e) {
                e.preventDefault();
                $.fancybox.close();
                location.href = navigationUrl;
            });

            $("a#externalUrlCheck").fancybox({
                padding: 0,
                margin: [20, 60, 20, 60],
                fixed: false,
                'closeBtn': false,

                //                helpers: {
                //                    overlay: {
                //                        css: {
                //                            'background': 'transparent',
                //                            'filter': 'progid:DXImageTransform.Microsoft.gradient(startColorstr=#F22a2a2a,endColorstr=#F22a2a2a)',
                //                            'zoom': '1',
                //                            'background': 'none repeat scroll 0 0 rgba(138, 169, 193, 0.5)'
                //                        }
                //                    }
                //                },

                'afterLoad': function () {
                    var fancyboxskin = $('.fancybox-skin');
                    if (fancyboxskin != undefined && fancyboxskin.length) {
                        fancyboxskin.css("border-radius", "20px");
                    }
                },

                beforeShow: function () {
                    var fancyboxOverlay = $('.fancybox-overlay');
                    if (fancyboxOverlay != undefined && fancyboxOverlay.length) {
                        if (!oldIE) {
                            fancyboxOverlay.css("background", "none repeat scroll 0 0 rgba(138, 169, 193, 0.5)");
                        }
                    }

                    if ($(window).width() < 599) {
                        var fancyboxWrap = $('.fancybox-wrap');
                        if (fancyboxWrap != undefined && fancyboxWrap.length) {
                            fancyboxWrap.addClass("popup-wrapper");
                        }

                        var fancyboxskin = $('.fancybox-skin');
                        if (fancyboxskin != undefined && fancyboxskin.length) {
                            fancyboxskin.css("border-radius", "0");
                            fancyboxskin.addClass("popup-skin");
                        }
                        var fancyboxOuter = $('.fancybox-outer');
                        if (fancyboxOuter != undefined && fancyboxOuter.length) {
                            fancyboxOuter.addClass("popup-skin");
                        }

                        var fancyboxInner = $('.fancybox-inner');
                        if (fancyboxInner != undefined && fancyboxInner.length) {
                            fancyboxInner.addClass("popup-skin");
                        }
                    }
                }
            });
        }

        function checkExternalUrl(event) {
            var currentUrl = $(this).attr('href');

            if (currentUrl.indexOf('#') == -1) {
                navigationUrl = currentUrl;
                var domainInfo = parseURL(currentUrl);

                if (allowedDomainList.indexOf(domainInfo.host) < 0) {
                    event.preventDefault();
                    $("#externalUrlCheck").trigger('click');
                }
            }
        }

        function parseURL(url) {
            parsed_url = {}

            if (url == null || url.length == 0)
                return parsed_url;

            protocol_i = url.indexOf('://');
            parsed_url.protocol = url.substr(0, protocol_i);

            remaining_url = url.substr(protocol_i + 3, url.length);
            domain_i = remaining_url.indexOf('/');
            domain_i = domain_i == -1 ? remaining_url.length - 1 : domain_i;
            parsed_url.domain = remaining_url.substr(0, domain_i);
            parsed_url.path = domain_i == -1 || domain_i + 1 == remaining_url.length ? null : remaining_url.substr(domain_i + 1, remaining_url.length);

            domain_parts = parsed_url.domain.split('.');
            switch (domain_parts.length) {
                case 2:
                    parsed_url.subdomain = null;
                    parsed_url.host = domain_parts[0];
                    parsed_url.tld = domain_parts[1];
                    break;
                case 3:
                    parsed_url.subdomain = domain_parts[0];
                    parsed_url.host = domain_parts[1];
                    parsed_url.tld = domain_parts[2];
                    break;
                case 4:
                    parsed_url.subdomain = domain_parts[0];
                    parsed_url.host = domain_parts[1];
                    parsed_url.tld = domain_parts[2] + '.' + domain_parts[3];
                    break;
            }

            parsed_url.parent_domain = parsed_url.host + '.' + parsed_url.tld;

            return parsed_url;
        }
    });
})()); ;

// end jquery
// This Starting is for the Tracking Analytics for Travel with your Device Component

function trackgateway($this) {
    record(['locationFinder'], { locationFinderVar: $($this).attr('data-tag') })
}
function linkTracking(a) {
    record(['calenderClickEvent'], { 'trackCalander': a });
}
// This End for the Tracking Analytics for Travel with your Device Component