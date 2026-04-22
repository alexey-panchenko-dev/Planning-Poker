from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models import DeckPreset

DEFAULT_DECKS = [
    {
        "code": "fibonacci",
        "name": "Фибоначчи",
        "description": "Классическая колода Фибоначчи для оценки задач продуктовой и инженерной команды.",
        "cards": ["1", "2", "3", "5", "8", "13", "21", "34", "55", "89", "?", "break"],
    },
    {
        "code": "tshirt",
        "name": "Футболки",
        "description": "Относительная колода размеров для исследовательских задач, анализа и неопределённых инициатив.",
        "cards": ["XS", "S", "M", "L", "XL", "XXL", "?", "break"],
    },
    {
        "code": "powers_of_2",
        "name": "Чётные",
        "description": "Колода со значениями кратными двум для удобной оценки инженерных задач.",
        "cards": ["0", "2", "4", "8", "16", "32", "64", "?", "break"],
    },
]


def seed_default_decks(db: Session) -> None:
    existing_decks = {deck.code: deck for deck in db.scalars(select(DeckPreset)).all()}
    for deck in DEFAULT_DECKS:
        existing = existing_decks.get(deck["code"])
        if existing is None:
            db.add(DeckPreset(**deck))
            continue

        existing.name = deck["name"]
        existing.description = deck["description"]
        existing.cards = deck["cards"]
        db.add(existing)
    db.commit()
