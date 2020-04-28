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

// Ajax form post to fill the PDF and visualize the response
$(function () {
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
            success: function (response) {
                let blob = new Blob([response], {type: 'application/pdf'});
                let fileURL = URL.createObjectURL(blob);
                window.open(fileURL);
                // se da mobile scarica il file sul dispositivo
                if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
                    let link = document.createElement('a');
                    link.href = window.URL.createObjectURL(blob);
                    link.download = "dichiarazione.pdf";
                    link.click();
                }
            },
            complete: function () {
                $("#loader").hide();
                $("#genPDFButton").show();
            },
            error: function () {
                alert("Errore nell'invio dei dati")
            }
        };

        console.log("sending data to backend")
        $.ajax(request).then(r => {
                console.log("done");
            }
        )
    });
})

function selectElement(id, valueToSelect) {
    let element = document.getElementById(id);
    element.value = valueToSelect;
}

$(function () {
    $("#validazioneRegioneOrigine").on('change', function () {
        let selectedOriginRegion = $("select#validazioneRegioneOrigine").val();
        selectElement("validazioneRegioneDestinazione", selectedOriginRegion);
    })
})