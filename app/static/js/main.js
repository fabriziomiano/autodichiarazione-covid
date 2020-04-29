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
            $("#dplace").prop("readonly", "readonly").val($('#rplace').val());
            $("#daddress").prop("readonly", "readonly").val($('#raddress').val());
            $("#dprovince").prop("readonly", "readonly").val($('#rprovince').val());

        } else {
            $("#dplace").removeAttr("readonly").val("");
            $("#daddress").removeAttr("readonly").val("");
            $("#dprovince").removeAttr("readonly").val("");
        }
    })
})

// trigger pdf generation when button is clicked
$(function () {
    $("#genPDFButton").on('click', function (e) {
        e.preventDefault();
        generatePDF();
        saveProfile();
    });
})

// trigger destination region selection when origin changes
$(function () {
    $("#region_from").on('change', function () {
        let selectedOriginRegion = $("select#region_from").val();
        selectElement("region_to", selectedOriginRegion);
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

// check if user in localStorage
$(function () {
    if (hasProfile()) {
        $("#personalData").hide();
        $("#personalDataSummary").removeAttr("hidden").show();
        $("#greetingsHeader").text("Ciao, " + localStorage.getItem("name"));
        for (let key in fields) {
            selectElement(key, fields[key])
        }
    }
})