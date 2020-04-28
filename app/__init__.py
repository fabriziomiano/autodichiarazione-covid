import os

from flask import Flask
from flask_wtf import CSRFProtect
from .views.frontend import frontend
from .config import PDF_TEMPLATE_FILENAME


def create_app():
    app = Flask(__name__, static_folder='static')
    app.config["SECRET_KEY"] = os.urandom(32)
    app.config["UPLOAD_FOLDER"] = os.path.join(app.static_folder, 'pdf')
    app.config["PDF_TEMPLATE_PATH"] = os.path.join(
        app.config["UPLOAD_FOLDER"], PDF_TEMPLATE_FILENAME
    )
    app.register_blueprint(frontend)
    CSRFProtect(app)
    return app
