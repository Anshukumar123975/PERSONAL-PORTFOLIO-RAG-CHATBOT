import dotenv from "dotenv"
import { createClient } from "@supabase/supabase-js";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase"
import { HuggingFaceInferenceEmbeddings } from "@langchain/community/embeddings/hf"

dotenv.config();

const sbApiKey = process.env.SUPABASE_API_KEY;
const sbUrl = process.env.PROJECT_URL;
const hfApiKey = process.env.HF_API_KEY;
const client = createClient(sbUrl, sbApiKey);

const embeddings = new HuggingFaceInferenceEmbeddings({
    apiKey: hfApiKey,
    model: "sentence-transformers/all-MiniLM-L6-v2"
});

const vectorStore = new SupabaseVectorStore(embeddings, {
    client,
    tableName: 'documents',
    queryName: 'match_documents'
})

const retriever = vectorStore.asRetriever(3);

function combineDocuments(docs){
    let answer = "";
    docs.forEach((d) => {
        answer+=d.pageContent;
    });
    return answer;
}


export {
    retriever,
    combineDocuments
};