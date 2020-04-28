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
            $('#validazioneDomicilio').val($('#validazioneResidenza').val());
            $('#validazioneIndirizzoDomicilio').val($('#validazioneIndirizzoResidenza').val());
            $('#validazioneProvinciaDomicilio').val($('#validazioneProvinciaResidenza').val());
            $("#validazioneDomicilio").prop("readonly", "readonly")
            $("#validazioneIndirizzoDomicilio").prop("readonly", "readonly")
            $("#validazioneProvinciaDomicilio").prop("readonly", "readonly")

        } else {
            $("#validazioneDomicilio").removeAttr("readonly")
            $("#validazioneIndirizzoDomicilio").removeAttr("readonly")
            $("#validazioneProvinciaDomicilio").removeAttr("readonly")
            $('#validazioneDomicilio').val("");
            $('#validazioneIndirizzoDomicilio').val("");
            $('#validazioneProvinciaDomicilio').val("");
        }
    })
})
