from flask import Flask, request, jsonify
from flask_cors import CORS
import backend

app = Flask(__name__)
CORS(app)

@app.route("/upload", methods=["POST"])
def upload():
    if "video" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    video = request.files["video"]
    video_path = f"uploads/{video.filename}"
    video.save(video_path)

    # Process video
    translated_video_path = backend.process_video(video_path, "hi")  # Change language if needed

    return jsonify({"video_url": translated_video_path})

if __name__ == "__main__":
    app.run(debug=True, port=5000)
