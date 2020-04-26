import os
import uuid

from flask import (
    Blueprint, render_template, current_app, request, redirect, url_for
)

from app.config import REGIONS, DEFAULT_FILENAME
from app.utils import fields_to_pdf

frontend = Blueprint("frontend", __name__)


@frontend.route('/')
@frontend.route('/index')
def index():
    return render_template("index.html", regions=REGIONS)


@frontend.route('/pdf', methods=["POST"])
def generate_pdf():
    """
    Get a client-side validated form, create the PDF, and redirect to
    download_and_remove route
    """
    uu_id = uuid.uuid4().hex
    current_app.logger.debug(uu_id, request.form)
    pdf_filename = "{}.pdf".format(uu_id)
    out_pdf_path = os.path.join(
        current_app.root_path,
        current_app.config['UPLOAD_FOLDER'],
        pdf_filename
    )
    fields_to_pdf(request.form, out_pdf_path)
    return redirect(
        url_for('frontend.download_and_remove', filename=pdf_filename)
    )


@frontend.route('/download_and_remove/<filename>')
def download_and_remove(filename):
    """
    Serve file with filename in UPLOAD_FOLDER before deleting it
    :param filename: str <uuid>.pdf
    """
    path = os.path.join(
        current_app.root_path, current_app.config['UPLOAD_FOLDER'], filename)

    def generate():
        with open(path, "rb") as f:
            yield from f
        os.remove(path)

    r = current_app.response_class(generate(), mimetype='application/pdf')
    r.headers.set('Content-Disposition', 'attachment', filename=DEFAULT_FILENAME)
    return r
