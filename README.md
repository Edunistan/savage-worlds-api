# savage-worlds-api

Character creator for the roleplaying setting Savage Worlds.

## Routes


### Ancestries

#### /ancestries
params q (name, description)

#### /ancestries/:id


### Abilities

#### /abilities
params: q (name, description), v (value), max (max_quantity)

#### /abilities/:id


### Hindrances

#### /hindrances
params: q (name, description, summary), t (type)

#### /hindrances/:id


### Skills

#### /skills
params: q (name, description, summary), l (linked_attribute), core (is_core)

#### /skills/:id


### Edges

#### /edges
params: q (name, description, summary), r (requirements), c (category)

#### /edges/:id


### Gear

#### /gear
params: q (name, notes), t (type), max_c (cost), max_w (weight)

#### /gear/common
params: q (name, notes), max_c (cost), max_w (weight)

#### /gear/shields
params: q (name, notes), max_c (cost), max_w (weight), max_s (min_str)

#### /gear/armors
params: q (name, notes), max_c (cost), max_w (weight), max_s (min_str), c (category), s (subcategory)

#### /gear/melee_weapons
params: q (name, notes), max_c (cost), max_w (weight), max_s (min_str), c (category), dmg (damage)

#### /gear/melee_weapons
params: q (name, notes), max_c (cost), max_w (weight), max_s (min_str), c (category), s (subcategory), dmg (damage)

#### /gear/:id


### Powers

#### /powers
params: q (name, description, summary, trappings), r (rank), pp (power_points)

#### /powers/modifiers
params: q (name, description)

#### /powers/backgrounds

#### /powers/backgrounds/:id

#### /powers/:id