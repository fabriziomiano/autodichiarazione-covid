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

// duplicate value domicilio inputs
$(function () {
    $("#checkboxResidenza").on('change', function (e) {
        e.preventDefault();
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

// trigger pdf generation when button is clicked
$(function () {
    $("#genPDFButton").on('click', function (e) {
        e.preventDefault();
        generatePDF();
    });
})

// trigger destination region selection when origin changes
$(function () {
    $("#validazioneRegioneOrigine").on('change', function () {
        let selectedOriginRegion = $("select#validazioneRegioneOrigine").val();
        selectElement("validazioneRegioneDestinazione", selectedOriginRegion);
    })
})

// trigger resetGeneratePDFButton when input values change and
// pdf deletion if already submitted
$(function () {
    $("input[class=form-control]").on('change', function (e) {
        e.preventDefault();
        resetGeneratePDFButton();
        if (isGenerationSubmitted($("#editPDFForm"))) {
            deletePDF();
        }
    })
})

// trigger pdf deletion from server when editPDFButton is clicked
$(function () {
    $("#editPDFButton").on('click', function (e) {
        e.preventDefault();
        deletePDF();
    })
})
