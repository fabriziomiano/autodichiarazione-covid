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
                console.log("sending data to backend")
                $("#loader").removeAttr("hidden").show();
                $("#genPDFButton").hide();
            },
            success: function () {
                console.log("success");
            },
            error: function () {
                alert("Errore nell'invio dei dati")
            }
        };

        $.ajax(request).then(response => {
                console.log("done");
                $("#loader").hide();
                $("#seePDFButton").removeAttr("hidden").show();
                $("#seePDFForm").attr("action", "/download_and_remove/" + response);
            }
        )
    });
})


function toggleGenerateSeeButtons() {
    $("#seePDFButton").prop("hidden", "hidden");
    $("#genPDFButton").show();
}


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