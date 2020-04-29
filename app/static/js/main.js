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
            beforeSend: function () {
                $("#loader").removeAttr("hidden").show();
                $("#genPDFButton").hide();
            },
            success: function (response) {
                $("#loader").hide();
                $("#seePDFButton").removeAttr("hidden").show();
                $("#seePDFForm").attr("action", "/download_and_remove/" + response);
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


$(function () {
    $("#seePDFButton").on('click', function (e) {
        e.preventDefault();
        let newWindow = window.open();  // fool ad blockers
        let form = $("#seePDFForm");
        let type = 'get';
        let url = form.prop("action");
        let request = {
            type: type,
            url: url,
            xhrFields: {
                responseType: 'blob'
            },
            success: function (response) {
                let blob = new Blob([response], {type: 'application/pdf'});
                newWindow.location = URL.createObjectURL(blob);
                $("#seePDFButton").prop("hidden", "hidden");
                $("#genPDFButton").show();
            }
        }
        $.ajax(request).then(r => {
            console.log("done");
        })
    })
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