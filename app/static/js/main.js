$(function () {
    "use strict";

    let csrf_token = "{{ csrf_token() }}";

    $.ajaxSetup({
        beforeSend: function (xhr, settings) {
            if (!/^(GET|HEAD|OPTIONS|TRACE)$/i.test(settings.type) && !this.crossDomain) {
                xhr.setRequestHeader("X-CSRFToken", csrf_token);
            }
        }
    });

    const postFormData = (data) => {
        let request = {
            type: 'POST',
            url: '/pdf',
            data: data,
            processData: false,
            contentType: false,
        };

        $.ajax(request).then(r => {
            console.log(r)
        });
    }

    $('#userForm').on('submit', function (event) {
        event.preventDefault();
        let formData = new FormData(document.getElementById("userForm"));
        postFormData(formData);
    });

});
