import pdfkit
import jinja2
import os
from flask import render_template
from app.config import TEMPLATE_PATH
import pdfrw
from input_parsers import parse_single, parse_date, parse_multiple
import textwrap


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


def wrap_text_in_form(s, sizes):
    outs = []
    tmp_s = s
    for size in sizes[:-1]:
        parts = textwrap.wrap(tmp_s, width=size)
        outs.append(parts[0])
        tmp_s = s[len(parts[0]):]
    outs.append(" ".join(parts[1:]))
    return outs
    

def get_input_type(k, input_map):
    value = input_map[k]
    if isinstance(value, dict):
        if value.get("is_date") is not None:
            out = "date"
        elif value.get("is_multiple") is not None:
            out = "multiple"
    else:
        out = "single"
    return out


def parse_input(user_input, input_map):
    out = {}
    for k, v in input_map.items():
        k_input = user_input.get(k)
        if k_input is not None:
            k_type = get_input_type(k, input_map)
            k_out = FIELDS_DISPATCHER[k_type](k_input)
            out.update(k_out)
    return out

    
def fill_template_from_input(user_input, template_path, out_path, input_map):
    parsed_input = parse_input(user_input, input_map)
    write_fillable_pdf(template_path, out_path, parsed_input)


