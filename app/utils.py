import os

import pdfrw
from flask import render_template

from app.config import TEMPLATE_PATH
from app.input_parsers import parse_single, parse_date, parse_multiple

SEARCH_PATH = "./"
ANNOT_KEY = '/Annots'
ANNOT_FIELD_KEY = '/T'
ANNOT_VAL_KEY = '/V'
ANNOT_RECT_KEY = '/Rect'
SUBTYPE_KEY = '/Subtype'
WIDGET_SUBTYPE_KEY = '/Widget'
FIELDS_DISPATCHER = {
    "single": parse_single,
    "date": parse_date,
    "multiple": parse_multiple
}


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
    :param pdf_options: dict, optional
    :param fields: dict
    :param out_path: str
    :return: None
    """
    compiled_template = render_template(TEMPLATE_PATH, **fields)
    html_to_pdf(compiled_template, out_path, options=pdf_options)


def write_fillable_pdf(input_pdf_path, output_pdf_path, data_dict):
    """ https://bostata.com/how-to-populate-fillable-pdfs-with-python/ """
    template_pdf = pdfrw.PdfReader(input_pdf_path)
    template_pdf.Root.AcroForm.update(pdfrw.PdfDict(
        NeedAppearances=pdfrw.PdfObject('true')))
    annotations = template_pdf.pages[0][ANNOT_KEY]
    for annotation in annotations:
        if annotation[SUBTYPE_KEY] == WIDGET_SUBTYPE_KEY:
            if annotation[ANNOT_FIELD_KEY]:
                key = annotation[ANNOT_FIELD_KEY][1:-1]
                if key in data_dict.keys():
                    annotation.update(
                        pdfrw.PdfDict(V='{}'.format(data_dict[key]))
                    )
    pdfrw.PdfWriter().write(output_pdf_path, template_pdf)


def get_input_type(k, input_map):
    value = input_map[k]
    out = "single"
    if isinstance(value, dict):
        if value.get("is_date") is not None:
            out = "date"
        elif value.get("is_multiple") is not None:
            out = "multiple"
    return out


def parse_input(user_input, input_map):
    out = {}
    for front_key in input_map:
        value = user_input.get(front_key)
        if value is not None:
            key_type = get_input_type(front_key, input_map)
            form_out = FIELDS_DISPATCHER[key_type](
                front_key, value, input_map
            )
            out.update(form_out)
    return out


def fill_template_from_input(user_input, template_path, out_path, input_map):
    parsed_input = parse_input(user_input, input_map)
    write_fillable_pdf(template_path, out_path, parsed_input)
