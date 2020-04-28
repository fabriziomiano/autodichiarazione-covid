from utils import wrap_text_in_form


def parse_single(k, value, input_map):
    return {input_map[k]: value}


def parse_date(k, value, input_map):
    d, m, y = value.split("/")
    return {
        input_map[k]["day"]: d,
        input_map[k]["month"]: m,
        input_map[k]["year"]: y
    }


def parse_multiple(k, value, input_map):
    fields = sorted(input_map[k]["is_multiple"].items(), key=lambda x: x[0])
    sizes = [x[1] for x in fields]
    parts = wrap_text_in_form(value, sizes)
    return {k: p for (k, s), p in zip(fields, parts)}
    
