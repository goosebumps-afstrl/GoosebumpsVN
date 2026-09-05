# Project Rules

- **Stat Changes UI**: Do NOT use `GAME.ui.showToast(...)` to notify the player about stat increases for Charisma (`cha`), Wisdom (`wis`), or NPC relationship `love` points. These notifications are intentionally disabled to rely exclusively on the phone's "History" slider interface. Instead of a toast, always ensure you update the respective history variables (e.g. `last_cha_change`, `last_wis_change`, `npc.last_love_change`) so the changes are correctly reflected in the phone stats menu.
