from openai import OpenAI
from rich.console import Console
from rich.markdown import Markdown
from rich.live import Live
import time

endpoint = "https://dinma-mfm8x6jo-eastus2.cognitiveservices.azure.com/openai/v1/"
#model_name = "gpt-5-nano"
deployment_name = "gpt-5-nano"

api_key = "4CVqoQEHaL7wGymmPNlEFpeBgH6uFMrw29dXjumAv3MafixGu5PeJQQJ99BIACHYHv6XJ3w3AAAAACOGHV2Z"

client = OpenAI(
    base_url=f"{endpoint}",
    api_key=api_key
)

console = Console()

completion = client.chat.completions.create(
    model=deployment_name,
    max_completion_tokens=5000,
    stream=True,
    messages=[
        {
            "role": "user",
            "content": "Explain Python decorators with examples. Use markdown formatting with headers, code blocks, and bullet points.",
        }
    ],
)

# Stream and render markdown in real-time
full_response = ""

with Live(Markdown(""), refresh_per_second=10) as live:
    for chunk in completion:
        if chunk.choices and chunk.choices[0].delta.content is not None:
            content = chunk.choices[0].delta.content
            full_response += content

            # Update the live display with the current markdown
            try:
                markdown = Markdown(full_response)
                live.update(markdown)
            except:
                # If markdown parsing fails with partial content, show raw text
                live.update(full_response)

            # Small delay to make streaming visible
            time.sleep(0.01)
