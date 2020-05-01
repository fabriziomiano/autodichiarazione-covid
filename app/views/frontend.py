import os
import time
import uuid

from flask import (
    Blueprint, render_template, request, current_app
)

from app.config import (
    REGIONS, PDF_OUT_FILENAME, INPUT_FORM_MAP
)
from app.utils import fill_template_from_input

frontend = Blueprint("frontend", __name__)


@frontend.route('/')
@frontend.route('/index')
def index():
    return render_template("index.html", regions=REGIONS, ts=time.time())


@frontend.route('/generate', methods=["POST"])
def generate_pdf():
    """
    Get a client-side validated form, create the PDF, and redirect to
    download_and_remove route
    """
    uu_id = uuid.uuid4().hex
    current_app.logger.debug(uu_id)
    current_app.logger.debug(request.form)
    tmp_pdf_filename = "{}_tmp.pdf".format(uu_id)
    pdf_filename = "{}.pdf".format(uu_id)
    tmp_out_pdf_path = os.path.join(
        current_app.config["UPLOAD_FOLDER"], tmp_pdf_filename
    )
    out_pdf_path = os.path.join(
        current_app.config["UPLOAD_FOLDER"], pdf_filename
    )
    fill_template_from_input(
        request.form,
        current_app.config["PDF_TEMPLATE_PATH"],
        tmp_out_pdf_path,
        INPUT_FORM_MAP
    )
    fdf_tmp = os.path.join(
        current_app.config["UPLOAD_FOLDER"], 'tmp.fdf'
    )
    os.system('pdftk ' + tmp_out_pdf_path + ' generate_fdf output ' + fdf_tmp)
    os.system(
        'pdftk ' + tmp_out_pdf_path + ' fill_form ' + fdf_tmp +
        ' output ' + out_pdf_path + ' flatten'
    )
    return pdf_filename


@frontend.route('/download/<filename>')
def download(filename):
    """
    Serve file with filename in UPLOAD_FOLDER before deleting it
    :param filename: str <uuid>.pdf
    """
    path = os.path.join(
        current_app.root_path, current_app.config['UPLOAD_FOLDER'], filename)
    path_default = current_app.config["PDF_TEMPLATE_PATH"]

    def generate():
        try:
            with open(path, "rb") as f:
                yield from f
            os.remove(path)
        except FileNotFoundError:
            with open(path_default, "rb") as f:
                yield from f

    r = current_app.response_class(generate(), mimetype='application/pdf')
    r.headers.set(
        'Content-Disposition', 'attachment', filename=PDF_OUT_FILENAME
    )
    return r


@frontend.route('/remove/<filename>', methods=["POST"])
def remove_pdf(filename):
    try:
        path = os.path.join(
            current_app.root_path,
            current_app.config['UPLOAD_FOLDER'],
            filename
        )
        os.remove(path)
        response = "OK"
    except Exception as e:
        current_app.logger.error(e)
        response = "KO"
    return response
