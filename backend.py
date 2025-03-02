from moviepy.editor import VideoFileClip, AudioFileClip
from transformers import pipeline, MarianMTModel, MarianTokenizer, SpeechT5Processor, SpeechT5ForTextToSpeech, SpeechT5HifiGan
import torchaudio

# -------------------- 1. Extract Audio from Video --------------------
def extract_audio(video_path, audio_output_path="audio.wav"):
    video = VideoFileClip(video_path)
    video.audio.write_audiofile(audio_output_path)
    return audio_output_path

# -------------------- 2. Transcribe Audio (Speech-to-Text) --------------------
def transcribe_audio(audio_path):
    asr_pipeline = pipeline(model="openai/whisper-large")
    transcription = asr_pipeline(audio_path)
    return transcription['text']

# -------------------- 3. Translate Text --------------------
def translate_text(text, target_language="fr"):  # Example: English to French
    model_name = f"Helsinki-NLP/opus-mt-en-{target_language}"
    tokenizer = MarianTokenizer.from_pretrained(model_name)
    model = MarianMTModel.from_pretrained(model_name)

    translated = model.generate(**tokenizer(text, return_tensors="pt", padding=True))
    return tokenizer.decode(translated[0], skip_special_tokens=True)

# -------------------- 4. Generate Speech (TTS) --------------------
def generate_speech(text, output_audio_path="translated_audio.wav"):
    processor = SpeechT5Processor.from_pretrained("microsoft/speecht5_tts")
    model = SpeechT5ForTextToSpeech.from_pretrained("microsoft/speecht5_tts")
    vocoder = SpeechT5HifiGan.from_pretrained("microsoft/speecht5_hifigan")

    inputs = processor(text=text, return_tensors="pt")
    speech = model.generate_speech(inputs["input_ids"], vocoder)
    torchaudio.save(output_audio_path, speech.squeeze(0), 16000)

    return output_audio_path

# -------------------- 5. Overlay Translated Audio on Video --------------------
def overlay_audio_on_video(video_path, new_audio_path, output_video_path="final_video.mp4"):
    video = VideoFileClip(video_path)
    new_audio = AudioFileClip(new_audio_path)

    final_video = video.set_audio(new_audio)
    final_video.write_videofile(output_video_path, codec="libx264", audio_codec="aac")

    return output_video_path

# -------------------- Main Function to Run Everything --------------------
def process_video(video_path, target_language="fr"):
    audio_path = extract_audio(video_path)
    transcribed_text = transcribe_audio(audio_path)
    translated_text = translate_text(transcribed_text, target_language)
    translated_audio_path = generate_speech(translated_text)
    final_video = overlay_audio_on_video(video_path, translated_audio_path)

    return final_video

# Example Usage
if __name__ == "__main__":
    process_video("input_video.mp4", "hi")  # Change "hi" for Hindi, "ta" for Tamil, etc.
