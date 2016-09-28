# dah-cards

card packs for [discord-against-humanity](https://github.com/z64/discord-against-humanity)

## Submitting expansions

Expansions (and updates to expansions) are welcome as PR's to this repo. 

Each one is a simple YAML file. 

**Follow the following format in your own YAML expansion:**

```yaml
---
# the name of your expansion
expansion: example expansion

# questions. (black cards)
# use a single underscore to denote
# where players would insert an answer.
# if no underscores are present, it is assumed
# to have only one answer.
questions:
  - discord against _ is _
  - lune is a massive _

# answers. (white cards)
answers:
  - answer
  - another answer
```

You can copy `example_expansion.yaml` to help get you started.
