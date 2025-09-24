from openai import OpenAI

endpoint = "https://dinma-mfm8x6jo-eastus2.cognitiveservices.azure.com/openai/v1/"
#model_name = "gpt-5-nano"
deployment_name = "gpt-5-nano"

api_key = "4CVqoQEHaL7wGymmPNlEFpeBgH6uFMrw29dXjumAv3MafixGu5PeJQQJ99BIACHYHv6XJ3w3AAAAACOGHV2Z"

client = OpenAI(
    base_url=f"{endpoint}",
    api_key=api_key
)

completion = client.chat.completions.create(
    model=deployment_name,
    max_completion_tokens=500,
    stream=True,
    messages=[
        {
            "role": "user",
            "content": "HI",
        }
    ],
)

for chunk in completion:
    if chunk.choices and chunk.choices[0].delta.content is not None:
        print(chunk.choices[0].delta.content, end="")
