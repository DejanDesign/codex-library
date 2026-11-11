# sections (v1)

Layout library for CODEX templates. Every variant is a folder:

```
sections/<group>/<variant>/
  section.html   markup with contract placeholders ({{restaurant_name}}, <!-- repeat:menu_items -->, <!-- if:booking_url -->)
  section.css    only this variant's rules (needs kit/v1/kit.css loaded first)
  info.json      id, name, description, best_for, needs
```

`catalog.json` lists all variants with their path; read it first.

## Rules for DAEDALUS

1. Pick ONE variant per group: header, hero, about, menu, reviews, contact, footer. Gallery is optional.
2. Choose by the brief (`best_for`) and by the data the restaurant really has (`needs`). Never invent facts, years or numbers.
3. Do not copy blindly: adapt the copy, spacing and which kit button / hover / reveal is used, so two sites with the same sections still look different.
4. Copy the chosen `section.css` rules into the template's style.css (no remote CSS except Google Fonts).
5. Marquee variants (hero/marquee, reviews/marquee) duplicate the repeat block; the second copy must stay `aria-hidden="true"`.
6. Use at most one moving element (marquee) per page.
