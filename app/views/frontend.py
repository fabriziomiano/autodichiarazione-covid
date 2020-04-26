import uuid
from flask import Blueprint, render_template, current_app, request
from app.config import REGIONS

frontend = Blueprint("frontend", __name__)


@frontend.route('/')
@frontend.route('/index')
def index():
    return render_template("index.html", regions=REGIONS)


@frontend.route('/pdf', methods=["POST"])
def generate_pdf():
    uu_id = uuid.uuid4()
    current_app.logger.debug(uu_id)
    current_app.logger.debug(request.form)
    fields = list(request.form.keys())
    current_app.logger.debug("Got {} fields".format(len(fields)))
    return "PDF will be downloaded"
