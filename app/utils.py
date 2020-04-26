import pdfkit
import jinja2
import os

SEARCH_PATH = "./"
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


def fields_to_pdf(
        fields, out_path,
        template_relpath=TEMPLATE_PATH,
        template_searchpath=SEARCH_PATH):
    """
    Params
    ------
    fields (dict): fields to fill template with
    out_path: pdf destination path
    template_searchpath: search root folder of the filesystem
    template_relpath: path of modulo template relative to template_searchpath

    """
    template = get_template(path=template_relpath, searchpath=SEARCH_PATH)
    compiled = compile_template(template, **fields)
    html_to_pdf(compiled, out_path)
