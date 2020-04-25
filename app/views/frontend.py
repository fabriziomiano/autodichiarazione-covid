import uuid
from flask import Blueprint, render_template, current_app, request

frontend = Blueprint("frontend", __name__)


@frontend.route('/')
@frontend.route('/index')
def index():
    return render_template("index.html")


@frontend.route('/pdf', methods=["POST"])
def generate_pdf():
    uu_id = uuid.uuid4()
    current_app.logger.debug(uu_id)
    current_app.logger.debug(request.form)
    return "PDF will be downloaded"
