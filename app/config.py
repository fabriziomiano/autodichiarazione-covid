REGIONS = [
    'Abruzzo', 'Basilicata', 'Calabria', 'Campania', 'Emilia-Romagna',
    'Friuli Venezia Giulia', 'Lazio', 'Liguria', 'Lombardia',
    'Marche', 'Molise', 'P.A. Bolzano', 'P.A. Trento', 'Piemonte',
    'Puglia', 'Sardegna', 'Sicilia', 'Toscana', 'Umbria',
    "Valle d'Aosta", 'Veneto'
]
TEMPLATE_PATH = "form_template.html"
PDF_OUT_FILENAME = "dichiarazione.pdf"
PDF_TEMPLATE_FILENAME = "pdf_form.pdf"
INPUT_FORM_MAP = {
    "name": "Il sottoscritto",
    "bdate": {
        "is_date": {
            "day": "nato giorno",
            "month": "nato mese",
            "year": "nato anno"
        }
    },
    "bplace": "luogo di nascita",
    "bprovince": "provincia di nascita",
    "rplace": "residente in",
    "raddress": "via residenza",
    "rprovince": "provincia residenza",
    "phone_nr": "utenza telefonica",
    "dplace": "e domiciliato in",
    "daddress": "via domicilio",
    "dprovince": "provincia domicilio",
    "document_type": "identificato a mezzo",
    "document_nr": "nr",
    "document_released_by": "rilasciato da",
    "doc_released_date": {
        "is_date": {
            "day": "giorno documento",
            "month": "mese documento",
            "year": "anno documento"
        }
    },
    "out_origin": "Testo1",
    "out_destination": "Testo2",
    "region_from": "Testo3",
    "region_to": "Testo4",
    "provvedimento_type": {
        "is_multiple": [
            ("Testo5", 43),
            ("Testo6", 51)
        ]
    },
    "out_motivation": {
        "is_xor_checklist": {
            "Group7": [
                "Scelta1", "Scelta2", "Scelta3", "Scelta4"
            ]
        }
    },
    "declaration": {
        "is_multiple": [
            ("Testo7", 70),
            ("Testo8", 100),
            ("Testo9", 100),
            ("Testo10", 100),
            ("Testo11", 100),
            ("Testo12", 100)
        ]
    }
}
