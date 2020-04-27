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


def html_to_pdf(path_or_string, pdf_path, options=None):
    """
    Params
    ------
    path_or_string (str) -- if path read from file else from given string
    pdf_path (str) -- where to save produced PDF
    options (dict or None) -- wkhtmltopdf options, for example
        options = {
            'page-size':'A4',
            'dpi':400,
            'margin-top':'0.5cm',
            'margin-bottom':'0.5cm',
            'margin-left':'1cm',
            'margin-right':'1cm'
        }

    """
    if os.path.isfile(path_or_string):
        pdfkit.from_file(path_or_string, pdf_path, options=options)
    else:
        pdfkit.from_string(path_or_string, pdf_path, options=options)


def fields_to_pdf(fields, out_path, pdf_options=None):
    """
    Write PDF file to out_path
    :param fields: dict
    :param out_path: str
    :return: None
    """
    compiled_template = render_template(TEMPLATE_PATH, **fields)
    html_to_pdf(compiled_template, out_path, options=pdf_options)
