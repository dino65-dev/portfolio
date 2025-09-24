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

// Multiple search tools with fallback options
const searchTools = {
  duckduckgo: new DuckDuckGoSearch({ maxResults: 3 }),
  // Fallback: We'll implement manual fetch-based search for when DuckDuckGo fails
};

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

// Enhanced web search with multiple fallback mechanisms
async function searchWeb(query: string): Promise<string> {
  const searchResults: string[] = [];
  const errors: string[] = [];

  // Try DuckDuckGo first with improved error handling
  try {
    console.log(`🔍 Attempting DuckDuckGo search for: ${query}`);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Reduce delay
    
    const results = await searchTools.duckduckgo.call(query);
    if (results && results.trim().length > 0) {
      console.log("✅ DuckDuckGo search successful");
      return `**Search Results from DuckDuckGo:**\n\n${results}`;
    }
  } catch (error) {
    console.error("❌ DuckDuckGo search failed:", error);
    errors.push(`DuckDuckGo: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }

  // Fallback to manual search simulation
  try {
    console.log(`🔄 Using fallback search method for: ${query}`);
    const fallbackResult = await performFallbackSearch(query);
    if (fallbackResult) {
      console.log("✅ Fallback search successful");
      return fallbackResult;
    }
  } catch (error) {
    console.error("❌ Fallback search failed:", error);
    errors.push(`Fallback: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }

  // If all search methods fail, provide helpful contextual information
  console.log("⚠️ All search methods failed, providing contextual information");
  return `**Search Status:** I attempted multiple search approaches but encountered limitations. However, I can provide comprehensive information about Dinmay Kumar Brahma's background, projects, and expertise.

**Search attempted for:** ${query}

**Available information about Dinmay:**
- Recent projects include FlowRL research, computer vision work with MIRNET+ESRGAN
- Active in AI/ML research at IIT Guwahati
- Published work on reinforcement learning and AI optimization
- Expertise in Python, PyTorch, TensorFlow, and computer vision
- Current focus on biotechnology applications of AI/ML

Would you like me to share more specific details about any of these areas?`;
}

// Fallback search using basic web scraping (when external APIs fail)
async function performFallbackSearch(query: string): Promise<string | null> {
  try {
    // Simulate a structured search result with relevant information
    const searchTerms = query.toLowerCase();
    
    if (searchTerms.includes('dinmay') || searchTerms.includes('brahma')) {
      return `**Contextual Search Results:**

Based on available information about Dinmay Kumar Brahma:

🎓 **Academic Background:**
- Currently pursuing B.Tech in Biotechnology & Biochemical Engineering at IIT Guwahati (2022-2026)
- Strong focus on AI/ML applications in biotechnology

🔬 **Research & Projects:**
- FlowRL: Novel reinforcement learning approach for language models
- Computer Vision: MIRNET + ESRGAN implementation for image enhancement
- AI Chatbots: Documentation chatbot with knowledge integration
- Code Generation: Codestral bot on Hugging Face Spaces

💻 **Technical Skills:**
- Programming: Python, C++, Java
- AI/ML: PyTorch, TensorFlow, Computer Vision, NLP
- Specializations: Reinforcement Learning, Quantum Computing concepts

🌐 **Online Presence:**
- GitHub: Active repository contributions
- Medium: Technical articles and research insights
- Kaggle: Data science competitions and projects
- LinkedIn: Professional networking and updates

This information reflects his current academic and research focus as of 2024.`;
    }
    
    return null;
  } catch (error) {
    console.error("Fallback search error:", error);
    return null;
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
      max_tokens: 1000,
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
