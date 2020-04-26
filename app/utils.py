import pdfkit
import jinja2
import os

TEMPLATE_PATH = "templates/modulo.html"


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
