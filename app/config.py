REGIONS = [
    'Abruzzo', 'Basilicata', 'Calabria', 'Campania', 'Emilia-Romagna',
    'Friuli Venezia Giulia', 'Lazio', 'Liguria', 'Lombardia',
    'Marche', 'Molise', 'P.A. Bolzano', 'P.A. Trento', 'Piemonte',
    'Puglia', 'Sardegna', 'Sicilia', 'Toscana', 'Umbria',
    "Valle d'Aosta", 'Veneto'
]
TEMPLATE_PATH = "form_template.html"
DEFAULT_FILENAME = "dichiarazione.pdf"

INPUT_FORM_MAP = {
    "name": "Il sottoscritto",
    "bdate": {
        "is_date": {
            "bday": "nato giorno",
            "bmonth": "nato mese",
            "byear": "nato anno"
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
            "doc_released_day": "giorno documento",
            "doc_released_month": "mese documento",
            "doc_released_year": "anno documento"
        }
    },
    "out_origin": "Testo1",
    "out_destination": "Testo2",
    "region_from": "Testo3",
    "region_to": "Testo4",
    "provvedimento_type": {
        "is_multiple": {
            "Testo5": 28,
            "Testo6": 45
        }
    },
    "out_motivation": "Group7",
    "declaration": {
        "is_multiple": {
            "A  questo  riguardo  dichiara che 1": 53,
            "A  questo  riguardo  dichiara che 2": 80
        }
    }
}
