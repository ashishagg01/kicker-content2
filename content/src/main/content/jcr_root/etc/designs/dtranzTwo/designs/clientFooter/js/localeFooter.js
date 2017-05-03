
    $('document').ready(function () {

        if ($('.simulator-preview')) {

            // ======== parameters
            // append wcmmode=disabled to all relative links in wcmmode=disabled
            var wcmmode = getParameterByName('wcmmode');
            if (wcmmode == 'disabled') {

                $('a').each(function () {

                    var href = $(this).attr('href');
                    if (href.indexOf('http') < 0 && href.indexOf('wcmmode=') < 0) {

                        if (href.indexOf('?') < 0) {
                            $(this).attr('href', href + '?wcmmode=disabled');
                        } else {
                                $(this).attr('href', href + '&wcmmode=disabled');
                        }
                     }
                 });
             }

             // ======== check if tablet or mobile
             var tabletLink = $('.simulator-preview .tablet'),
			  	 mobileLink = $('.simulator-preview .mobile');

             if ($(window).width() == parseInt(tabletLink.data('width'))) {
                 tabletLink.hide();
             } else if ($(window).width() == parseInt(mobileLink.data('width'))) {
                 mobileLink.hide();
             }

             // ======== devices menu
             var simPreview = $('.simulator-preview');
             link = $(simPreview.find(' > a ')),
			 menu = $(simPreview.find(' > ul ')),
			 menuLink = $(menu.find(' > li a'));

             // clicking on a device in the menu
             menuLink.on('click', function (e) {
                 e.preventDefault();
                 var href = $(this).attr('href'),
				 width = $(this).data('width'),
				 height = $(this).data('height');
                 window.open(href, '_blank', 'toolbar=no,location=no,status=no,menubar=no,width=' + width + ',height=' + height + '');
                 if (wcmmode == 'disabled')
                 	window.close();
             });

             // clicking on the preview link
             link.on('click', function (e) {

                 e.preventDefault();
                 if ($(this).hasClass('active')) {
                     $(this).removeClass('active');
                     menu.removeClass('active');
                 } else {
                     $(this).addClass('active');
                     menu.addClass('active');
                 }
             });

         }

         // credit: http://tinyurl.com/qcreza9
         function getParameterByName(name) {

             name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
             var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
			 results = regex.exec(location.search);
             return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
         }

    });
