import pdfkit
import jinja2
import os
from flask import render_template
from app.config import TEMPLATE_PATH

SEARCH_PATH = "./"


def get_template(path=TEMPLATE_PATH, searchpath="./"):
    templateLoader = jinja2.FileSystemLoader(searchpath=searchpath)
    templateEnv = jinja2.Environment(loader=templateLoader)
    return templateEnv.get_template(path)


def compile_template(template, **kw):
    return template.render(**kw)


def html_to_pdf(path_or_string, pdf_path):
    if os.path.isfile(path_or_string):
        pdfkit.from_file(path_or_string, pdf_path)
    else:
        pdfkit.from_string(path_or_string, pdf_path)


def fields_to_pdf(fields, out_path):
    """
    Write PDF file to out_path
    :param fields: dict
    :param out_path: str
    :return: None
    """
    compiled_template = render_template(TEMPLATE_PATH, **fields)
    html_to_pdf(compiled_template, out_path)
