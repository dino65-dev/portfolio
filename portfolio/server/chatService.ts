import { OpenAI } from "openai";
import { ChatOpenAI } from "@langchain/openai";
import { DuckDuckGoSearch } from "@langchain/community/tools/duckduckgo_search";
import { Response } from "express";

// Azure OpenAI configuration - using environment variables for security
const AZURE_ENDPOINT = process.env.AZURE_ENDPOINT || process.env.OPENAI_BASE_URL || "https://api.openai.com/v1";
const AZURE_API_KEY = process.env.AZURE_API_KEY || process.env.OPENAI_API_KEY || "";
const DEPLOYMENT_NAME = process.env.AZURE_DEPLOYMENT_NAME || "gpt-4o";

// Validate API key is present
if (!AZURE_API_KEY) {
  console.error("⚠️  No API key found! Please set AZURE_API_KEY or OPENAI_API_KEY environment variable.");
}

const client = new OpenAI({
  baseURL: AZURE_ENDPOINT,
  apiKey: AZURE_API_KEY,
});

const searchTool = new DuckDuckGoSearch({ maxResults: 3 });

// Information about Dinmay Kumar Brahma
const DINMAY_INFO = `
Dinmay Kumar Brahma is a student at IIT Guwahati pursuing B.Tech in Biotechnology & Biochemical Engineering (2022-2026). 

Key Information:
- Education: Currently studying at Indian Institute of Technology Guwahati
- Field: Biotechnology & Biochemical Engineering with focus on AI/ML
- Research Interests: AI/ML, Quantum Computing, Biotechnology, Computer Vision, Reinforcement Learning
- Username: dino65-dev

Notable Projects & Research:
1. FlowRL Research: Pioneered research on FlowRL - a new reinforcement learning approach for language models
2. Google's Agent Payments Protocol Analysis: Conducted research on AI-driven payment systems
3. MIRNET + ESRGAN Implementation: Advanced computer vision combining low-light enhancement with super-resolution
4. Documentation ChatBot: AI-powered chatbot with knowledge integration deployed on Vercel
5. Codestral Code Bot: Advanced code generation bot hosted on Hugging Face Spaces
6. Lox Programming Language: Python-based interpreter implementation

Skills:
- Programming: Python, PyTorch, TensorFlow, Computer Vision, Deep Learning
- AI/ML: Reinforcement Learning, NLP, Language Models, AI Agents
- Other: Blockchain, Payment Systems, Image Processing, Compiler Design

Current Focus:
- Exploring AI/ML applications in biotechnology
- Developing novel approaches to AI optimization
- Research in computer vision and reinforcement learning
- Open to collaboration and innovative projects

Location: IIT Guwahati, India
`;

async function searchWeb(query: string): Promise<string> {
  try {
    // Add a small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 2000));
    const results = await searchTool.call(query);
    return results;
  } catch (error) {
    console.error("Web search error:", error);
    // Provide helpful fallback information instead of failing
    return "I'm currently experiencing issues with web search due to rate limiting. However, I have comprehensive information about Dinmay Kumar Brahma's projects, skills, and background that I can share with you.";
  }
}

function shouldSearchWeb(message: string): boolean {
  const searchKeywords = [
    "latest",
    "recent",
    "current",
    "news",
    "today",
    "now",
    "update",
    "what happened",
    "what is happening",
    "search for",
    "find information",
    "tell me about recent",
    "latest developments",
    "current trends",
  ];

  return searchKeywords.some((keyword) =>
    message.toLowerCase().includes(keyword.toLowerCase()),
  );
}

function createSystemPrompt(): string {
  return `You are Dinmay Kumar Brahma's AI assistant. You represent him professionally and provide helpful information about his background, projects, skills, and research work.

Here's detailed information about Dinmay:
${DINMAY_INFO}

Guidelines:
1. Always speak as if you're Dinmay's personal AI assistant
2. Provide accurate information about his background, education, projects, and skills
3. Be friendly, professional, and helpful
4. If asked about topics not related to Dinmay, politely redirect the conversation back to him
5. If you need current information that you don't have, you can ask me to search the web
6. Encourage users to connect with Dinmay if they're interested in collaboration or have specific technical questions
7. Use markdown formatting for better readability when appropriate

Remember: You're here to help people learn about Dinmay Kumar Brahma and his work!`;
}

export async function handleChatMessage(message: string, res: Response) {
  try {
    res.writeHead(200, {
      "Content-Type": "text/plain; charset=utf-8",
      "Transfer-Encoding": "chunked",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    });

    let enhancedMessage = message;

    // Check if we should search the web
    if (shouldSearchWeb(message)) {
      res.write(
        `data: ${JSON.stringify({ content: "🔍 Searching the web for latest information...\n\n" })}\n\n`,
      );

      const searchQuery = `${message} Dinmay Kumar Brahma IIT Guwahati`;
      const searchResults = await searchWeb(searchQuery);
      enhancedMessage = `${message}\n\nWeb search results:\n${searchResults}`;
    }

    const completion = await client.chat.completions.create({
      model: DEPLOYMENT_NAME,
      messages: [
        {
          role: "system",
          content: createSystemPrompt(),
        },
        {
          role: "user",
          content: enhancedMessage,
        },
      ],
      stream: true,
      max_completion_tokens: 1000,
    });
    
    for await (const chunk of completion) {
      if (chunk.choices && chunk.choices[0] && chunk.choices[0].delta && chunk.choices[0].delta.content !== null && chunk.choices[0].delta.content !== undefined) {
        const content = chunk.choices[0].delta.content;
        res.write(`data: ${JSON.stringify({ content })}\n\n`);
      }
    }

    res.write(`data: [DONE]\n\n`);
    res.end();
  } catch (error) {
    console.error("Chat error:", error);
    res.write(
      `data: ${JSON.stringify({
        content:
          "I'm sorry, I encountered an error while processing your message. Please try again.",
      })}\n\n`,
    );
    res.write(`data: [DONE]\n\n`);
    res.end();
  }
}
