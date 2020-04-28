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
