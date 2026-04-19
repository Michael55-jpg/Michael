#!/usr/bin/env python3
"""Jeu de questions en ligne de commande."""

from dataclasses import dataclass


@dataclass(frozen=True)
class Question:
    prompt: str
    choix: tuple[str, str, str, str]
    bonne_reponse: str


def normaliser_reponse(valeur: str) -> str:
    """Normalise la réponse utilisateur vers A/B/C/D."""
    return valeur.strip().upper()


def poser_question(question: Question, numero: int, total: int) -> bool:
    """Affiche une question et retourne True si la réponse est correcte."""
    print(f"\nQuestion {numero}/{total}")
    print(question.prompt)
    lettres = ("A", "B", "C", "D")
    for lettre, texte in zip(lettres, question.choix):
        print(f"  {lettre}. {texte}")

    while True:
        reponse = normaliser_reponse(input("Votre réponse (A/B/C/D) : "))
        if reponse in lettres:
            est_correcte = reponse == question.bonne_reponse
            if est_correcte:
                print("✅ Bonne réponse !")
            else:
                bonne = question.choix[lettres.index(question.bonne_reponse)]
                print(f"❌ Mauvaise réponse. La bonne était {question.bonne_reponse}: {bonne}.")
            return est_correcte

        print("Veuillez choisir A, B, C ou D.")


def lancer_jeu() -> None:
    """Lance le quiz complet et affiche le score final."""
    questions = [
        Question(
            prompt="Quel langage est principalement utilisé pour les applications web côté navigateur ?",
            choix=("Python", "C", "JavaScript", "Rust"),
            bonne_reponse="C",
        ),
        Question(
            prompt="Combien font 9 x 7 ?",
            choix=("63", "56", "72", "49"),
            bonne_reponse="A",
        ),
        Question(
            prompt="Quelle planète est surnommée la planète rouge ?",
            choix=("Vénus", "Mars", "Jupiter", "Mercure"),
            bonne_reponse="B",
        ),
        Question(
            prompt="Qui a écrit 'Le Petit Prince' ?",
            choix=("Victor Hugo", "Albert Camus", "Émile Zola", "Antoine de Saint-Exupéry"),
            bonne_reponse="D",
        ),
        Question(
            prompt="Dans quel océan se trouve l'île de Madagascar ?",
            choix=("Océan Pacifique", "Océan Indien", "Océan Atlantique", "Océan Arctique"),
            bonne_reponse="B",
        ),
    ]

    print("🎮 Bienvenue dans le jeu de questions !")
    print("Répondez aux questions en tapant A, B, C ou D.")

    score = 0
    for index, question in enumerate(questions, start=1):
        if poser_question(question, index, len(questions)):
            score += 1

    print("\n==============================")
    print(f"Score final : {score}/{len(questions)}")

    if score == len(questions):
        print("🏆 Parfait ! Tu es un champion du quiz.")
    elif score >= len(questions) // 2:
        print("👏 Bien joué !")
    else:
        print("💡 Essaie encore, tu vas progresser.")


if __name__ == "__main__":
    lancer_jeu()
