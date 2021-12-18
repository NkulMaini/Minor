(function ($) {
    $(document).ready(function () {
        $(".nmr-datepicker").each(function (i, item) {
            var settings = {};
            if (item.dataset.format) {
                settings.dateFormat = item.dataset.format;
            }
            if (item.id) {
                $(`#${item.id}`).datepicker(settings);
            }
        });
    });
})(jQuery);