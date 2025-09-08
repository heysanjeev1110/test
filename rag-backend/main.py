from fastapi import FastAPI, Request
from pydantic import BaseModel
import httpx
import re

app = FastAPI()

# --- CONFIG ---
GROK_API_URL = "https://api.grok.com/v1/chat/completions"  # Replace with actual endpoint if different
GROK_API_KEY = "YOUR_GROK_FREE_API_KEY"  # <-- User must set this

class SummarizeRequest(BaseModel):
    text: str

# Simple retrieval: extract top N sentences with most keywords (RAG step 1)
def retrieve_key_sentences(text, n=5):
    sentences = re.split(r'(?<=[.!?]) +', text)
    # For demo: just take the longest sentences
    sentences = sorted(sentences, key=lambda s: -len(s))
    return ' '.join(sentences[:n])

@app.post("/summarize")
async def summarize(req: SummarizeRequest):
    # RAG: Retrieve key sentences
    context = retrieve_key_sentences(req.text)
    prompt = f"Summarize the following webpage content in 5 sentences or less, focusing on the main ideas.\n\n{context}"
    # Call Grok API
    headers = {"Authorization": f"Bearer {GROK_API_KEY}", "Content-Type": "application/json"}
    data = {
        "model": "grok-1",  # or the free model name
        "messages": [{"role": "user", "content": prompt}],
        "max_tokens": 256
    }
    async with httpx.AsyncClient() as client:
        resp = await client.post(GROK_API_URL, json=data, headers=headers)
        if resp.status_code == 200:
            result = resp.json()
            summary = result.get("choices", [{}])[0].get("message", {}).get("content", "No summary.")
            return {"summary": summary}
        else:
            return {"summary": "Failed to summarize (API error)."}
