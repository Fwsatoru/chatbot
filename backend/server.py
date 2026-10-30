
import os

from dotenv import load_dotenv
from flask import Flask, jsonify, request
from openai import OpenAI

load_dotenv()

# Flask sert aussi le dossier frontend : la page et l'API ont la même origine.
FRONTEND_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "frontend")
app = Flask(__name__, static_folder=FRONTEND_DIR, static_url_path="")
api_key = os.getenv("OPENAI_API_KEY")
client = OpenAI(api_key=api_key) if api_key else None


# Autorise la page à appeler l'API même si elle n'est pas servie par Flask
# (fichier ouvert en double-clic, Live Server…).
@app.after_request
def autoriser_cors(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type"
    response.headers["Access-Control-Allow-Methods"] = "POST, OPTIONS"
    return response


def get_output_text(response):
    """Extract generated text, including when the SDK helper is unavailable."""
    text = getattr(response, "output_text", None)
    if isinstance(text, str) and text:
        return text

    parts = []
    for item in getattr(response, "output", []) or []:
        if getattr(item, "type", None) != "message":
            continue
        for content in getattr(item, "content", []) or []:
            if getattr(content, "type", None) == "output_text":
                value = getattr(content, "text", None)
                if isinstance(value, str) and value:
                    parts.append(value)
    return "\n".join(parts)


@app.route("/")
def index():
    return app.send_static_file("chat.html")


@app.route("/api/chat", methods=["POST", "OPTIONS"])
def chat():
    if request.method == "OPTIONS":
        return "", 204

    data = request.get_json(silent=True) or {}
    message = str(data.get("message", "")).strip()

    if not message:
        return jsonify({"error": "Message vide."}), 400

    if client is None:
        return jsonify({"error": "OPENAI_API_KEY manquante dans backend/.env."}), 503

    try:
        response = client.responses.create(
            model="gpt-4o-mini",
            instructions=(
                "Tu es Hylia-gpt, un chatbot d'accueil qui explique les bases du "
                "développement Web à des débutants. Réponds en français, en deux "
                "ou trois phrases simples."
            ),
            input=[{"role": "user", "content": message}],
        )
        reply = get_output_text(response)
    except Exception as error:
        app.logger.error("Erreur OpenAI : %s", error)
        return jsonify({"error": "Le service de réponse est indisponible."}), 502

    return jsonify({"reply": reply})


if __name__ == "__main__":
    app.run(debug=True)

