let fields = getProfile();

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
            $("#personalData").hide();
            $("#greetingsHeader").text("Ciao, " + localStorage.getItem("name"));
            $("#personalDataSummary").removeAttr("hidden").show();
        }
    )
}

// toggle generate/edit buttons
function toggleGenEditButtons() {
    $("#seePDFButton").prop("hidden", "hidden");
    $("#editPDFButton").prop("hidden", "hidden");
    $("#genPDFButton").show();
}

// show data summary after visualizing pdf
function toggleVisualizePDFButton() {
    toggleGenEditButtons();
    showPersonalDataSummary();
    $("#editPDFForm").removeAttr("action")
    location.reload();
}

// show perasonal data after modifying
function toggleEditFormButton() {
    toggleGenEditButtons();
    showPersonalData();
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

// check if user has already been here
function hasProfile() {
    return localStorage.getItem('name') !== null
}

// save user profile
function saveProfile() {
    for (let field of $('#userForm input:not([disabled]):not([type=checkbox])')) {
        localStorage.setItem(field.id, field.value)
    }
}

// retrieve user profile
function getProfile() {
    const fields = {}
    for (let i = 0; i < localStorage.length; i++) {
        const name = localStorage.key(i)
        fields[name] = localStorage.getItem(name)
    }
    return fields
}

// show personal data div and hide summary
function showPersonalData() {
    $('#personalData').show();
    $('#personalDataSummary').hide();
}

// show personal data summary div and hide personal data
function showPersonalDataSummary() {
    $('#personalData').hide();
    $('#personalDataSummary').removeAttr("hidden").show();
    location.reload();
}

// empty form
function emptyForm() {
    for (let key in fields) {
        selectElement(key, "");
    }
}

// clear local storage
function deletePersonalData() {
    showPersonalData();
    emptyForm();
    localStorage.clear();
    alert('Profilo eliminato');
}