(function ($) {

  Drupal.behaviors.logout_check = {
    attach: function(context, settings) {

      if (context != document) {
        return;
      }

      var t;
      var theDialog;
      var localSettings;

      function amILoggedIn() {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', localSettings.check_url, true);
        xhr.onload = function () {
          // console.log(xhr.status,localSettings.check_url); // 403 if not logged in
          if (xhr.status == 403) {
            // oh noes
            theDialog = dialog();
          } else {
            // schedule a new check
            t = setTimeout(init, localSettings.logout_check_interval);
          }
        };
        xhr.send(null);
      }

      // Prevent settings being overriden by ajax callbacks by cloning the settings.
      localSettings = jQuery.extend(true, {}, settings.logout_check);


      // On pages where the user can be logged out, set the timer to check
      t = setTimeout(init, localSettings.logout_check_interval);


      function init() {
        amILoggedIn();
      }

      function timeSince(date) {
        var seconds = Math.floor(date / 1000);

        var interval = Math.floor(seconds / 31536000);

        if (interval > 1) {
            return interval + " years";
        }
        interval = Math.floor(seconds / 2592000);
        if (interval > 1) {
            return interval + " months";
        }
        interval = Math.floor(seconds / 86400);
        if (interval > 1) {
            return interval + " days";
        }
        interval = Math.floor(seconds / 3600);
        if (interval > 1) {
            return interval + " hours";
        }
        interval = Math.floor(seconds / 60);
        if (interval > 1) {
            return interval + " minutes";
        }
        return Math.floor(seconds) + " seconds";
      }

      function dialog() {

        // figure out time passed
        var date1 = new Date(localSettings.time_page_loaded);
        var date2 = new Date();

        var timePassed = timeSince(date2.getTime() - date1.getTime());

        var renderedMessage = localSettings.message + ' <cite>You originally loaded this page ' + timePassed + ' ago</cite>';

        if (typeof(Foundation) != 'undefined') {
          // if foundation is present
          // Foundation.version.charAt(0); // foundation version number
          $('body').append('<div class="reveal" id="exampleModal1" data-reveal><h2>' + localSettings.title + '</h2>' + renderedMessage + '<button class="close-button" data-close aria-label="Close modal" type="button"><span aria-hidden="true">&times;</span></button></div>');
          var modal = $('#exampleModal1');
          var elem = new Foundation.Reveal(modal);
          $('#exampleModal1').foundation('open');
        } else {
          // standard drupal jquery ui
          var buttons = {};
          buttons[Drupal.t('Close this message')] = function() {
            $(this).dialog("destroy");
          };

          return $('<div id="logout_check-confirm"> ' + renderedMessage + '</div>').dialog({
            modal: true,
                 closeOnEscape: false,
                 width: "auto",
                 dialogClass: 'logout_check-dialog',
                 title: localSettings.title,
                 buttons: buttons,
                 close: function(event, ui) {
                   $(this).dialog("destroy");
                 }
          });

        }

      }

    }
  };

})(jQuery);
