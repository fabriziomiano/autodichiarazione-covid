import textwrap


def wrap_text_in_form(s, sizes):
    outs = []
    tmp_s = s
    parts = []
    for size in sizes[:-1]:
        parts = textwrap.wrap(tmp_s, width=size) or [""]
        outs.append(parts[0])
        tmp_s = s[len(parts[0]):]
    outs.append(" ".join(parts[1:]))
    return outs
    

def parse_single(k, value, input_map):
    return {input_map[k]: value}


def parse_date(k, value, input_map):
    d, m, y = value.split("/")
    return {
        input_map[k]["is_date"]["day"]: d,
        input_map[k]["is_date"]["month"]: m,
        input_map[k]["is_date"]["year"]: y
    }


def parse_multiple(k, value, input_map):
    fields = sorted(input_map[k]["is_multiple"].items(), key=lambda x: x[0])
    sizes = [x[1] for x in fields]
    parts = wrap_text_in_form(value, sizes)
    return {k: p for (k, s), p in zip(fields, parts)}
    
