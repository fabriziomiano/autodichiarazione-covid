$(function () {
    $('#birthdate').datetimepicker({
        format: 'L',
        locale: 'it'
    });
});

$(function () {
    $('#id_release_date').datetimepicker({
        format: 'L',
        locale: 'it'
    })
});

$(function () {
    $("#checkboxResidenza").on('change', function () {
        if ($(this).prop("checked") === true) {
            $("#validazioneDomicilio").prop("disabled", true)
            $("#validazioneIndirizzoDomicilio").prop("disabled", true)
            $("#validazioneProvinciaDomicilio").prop("disabled", true)
            $('#validazioneDomicilio').val($('#validazioneResidenza').val());
            $('#validazioneIndirizzoDomicilio').val($('#validazioneIndirizzoResidenza').val());
            $('#validazioneProvinciaDomicilio').val($('#validazioneProvinciaResidenza').val());
        } else {
            $("#validazioneDomicilio").prop("disabled", false)
            $("#validazioneIndirizzoDomicilio").prop("disabled", false)
            $("#validazioneProvinciaDomicilio").prop("disabled", false)
            $('#validazioneDomicilio').val("");
            $('#validazioneIndirizzoDomicilio').val("");
            $('#validazioneProvinciaDomicilio').val("");
        }
    })
})

// Ajax form post to fill the PDF
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


    $("#genPDFButton").on('click', function (e) {
        e.preventDefault();
        let form = $("#userForm");
        let type = form.prop("method");
        let url = form.prop("action");
        let formContent = document.getElementById("userForm");
        let formData = new FormData(formContent);
        let request = {
            type: type,
            url: url,
            data: formData,
            processData: false,
            contentType: false,
            xhrFields: {
                responseType: 'blob'
            },
            beforeSend: function () {
                $("#loader").removeAttr("hidden").show();
                $("#genPDFButton").hide();
            },
            success: function (blob) {
                // console.log(blob.size);
                let link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                // to dowload uncomment the lines below
                // link.download = "dichiarazione_" + new Date() + ".pdf";
                // link.click();
                window.open(link.href)
            },
            complete: function () {
                $("#loader").hide();
                $("#genPDFButton").show();
            },
            error: function () {
                alert("Errore nell'invio di dati")
            }
        };

        console.log("sending data to backend")
        $.ajax(request).then(r => {
                console.log("done");
            }
        )
    });
})