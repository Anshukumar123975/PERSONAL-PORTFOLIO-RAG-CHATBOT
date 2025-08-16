import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import fs from "fs"
import dotenv from "dotenv"
import { createClient } from "@supabase/supabase-js";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase"
import { HuggingFaceInferenceEmbeddings } from "@langchain/community/embeddings/hf"

dotenv.config();

try{
    const text = fs.readFileSync("file.txt", "utf-8");

    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 500,
        // separators: ['\n\n', '\n', ' ', '', '##'],
        // chunkOverlap: 50
    });

    const output = await splitter.createDocuments([text]);
    // const markdownContent = output
    //     .map((doc, i) => `### Chunk ${i + 1}\n\n${doc.pageContent}\n`)
    //     .join("\n");

    // fs.writeFileSync("output.md", markdownContent, 'utf-8');
    const sbApiKey = process.env.SUPABASE_API_KEY;
    const sbUrl = process.env.PROJECT_URL;
    const openAIApiKey = process.env.OPENAI_API_KEY;
    const client = createClient(sbUrl, sbApiKey);
    const hfApiKey = process.env.HF_API_KEY;
    const embeddings = new HuggingFaceInferenceEmbeddings({
        apiKey: hfApiKey,
        model: "sentence-transformers/all-MiniLM-L6-v2"
    });
    await SupabaseVectorStore.fromDocuments(
        output,
        embeddings,
        {
            client,
            tableName: 'documents',
        }
    );
    console.log(output);
}
catch(error) {
    console.log(error);
}