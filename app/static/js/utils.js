// Ajax call for pdf generation
function generatePDF() {
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
            $("#editPDFButton").removeAttr("hidden").show();
            $("#editPDFForm").attr("action", "/remove/" + response);
            $("#seePDFButton").removeAttr("hidden").show();
            $("#seePDFForm").attr("action", "/download/" + response);
        }
    )
}

// toggle buttons
function toggleGenerateSeeButtons() {
    $("#seePDFButton").prop("hidden", "hidden");
    $("#editPDFButton").prop("hidden", "hidden");
    $("#genPDFButton").show();
}

// select option from select box
function selectElement(id, valueToSelect) {
    let element = document.getElementById(id);
    element.value = valueToSelect;
}

// ajax to remove pdf from server
function deletePDF() {
    let form = $("#editPDFForm");
    let type = form.prop("method");
    let url = form.prop("action");
    let request = {
        type: type,
        url: url,
        success: function () {
            form.removeAttr("action")
            console.log("success");
        },
        error: function () {
            alert("Errore nell'eliminazione del documento. Si prega di contattare il supporto")
        }
    };
    $.ajax(request).then(r => {
        if (r === "KO") {
            alert("Errore nell'eliminazione del documento. Si prega di contattare il supporto")
        } else {
            console.log("deleted")
        }
    })
}

// visualize generate buttons and hide the others
function resetGeneratePDFButton() {
    $("#seePDFButton").hide();
    $("#editPDFButton").hide();
    $("#genPDFButton").show();
}

// check if pdf generation has already been submitted
function isGenerationSubmitted(form) {
    return !!$(form).prop("action").includes(".pdf");
}