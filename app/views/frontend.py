import time
from flask import Blueprint, render_template, request

from app.config import REGIONS

frontend = Blueprint("frontend", __name__)


@frontend.route('/')
@frontend.route('/index')
def index():
    return render_template(
        "index.html",
        regions=REGIONS,
        ts=time.time()
    )


@frontend.route('/renderform', methods=["POST"])
def showform():
    return render_template(
        "form_template.html",
        **request.form,
        ts=time.time()
    )
