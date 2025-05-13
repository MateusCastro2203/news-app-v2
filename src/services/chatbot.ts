import { useNewsFilterStore } from "@/store/filterStore";
import { User } from "@/store/types/user.types";
import { ChatResponse } from "@/types/chat.types";
import axios from "axios";

const API_URL = "https://newsapp-ai-api-production.up.railway.app";

export interface ChatActionResponse {
  response: string;
  conversation_id: string;
  tool_call?: boolean;
  action?: string;
  api_result?: any;
  params?: {
    tema?: string;
    [key: string]: any;
  };
  partial_response?: string;
  tool_call_id?: string;
}
export const getChatbotResponse = async (
  prompt: string,
  articleLink: string | null, // Opcional, só enviado na primeira mensagem de um novo chat
  userId: string,
  conversationId?: string // Identificador da conversa atual
): Promise<ChatActionResponse> => {
  try {
    // Payload base
    const payload: any = {
      message: prompt,
      user_id: userId,
    };

    // Se temos um conversation_id, usamos ele
    if (conversationId) {
      payload.conversation_id = conversationId;
    }

    if (articleLink) {
      payload.url = articleLink;
    }

    const response = await axios.post(`${API_URL}/chat`, payload);

    return {
      response: response.data.response || response.data.partial_response || "",
      conversation_id: response.data.conversation_id,
      tool_call: response.data.tool_call,
      action: response.data.action,
      api_result: response.data.api_result,
      params: response.data.params,
      partial_response: response.data.partial_response,
      tool_call_id: response.data.tool_call_id,
    };
  } catch (error) {
    console.error("Erro ao obter resposta do chatbot:", error);
    throw new Error("Erro de conexão com o serviço de chat");
  }
};

export const registerUser = async (
  name: string,
  email: string
): Promise<User> => {
  try {
    const response = await axios({
      method: 'POST',
      url: `${API_URL}/user`, 
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      data: JSON.stringify({
      name,
      email,
      })
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao registrar usuário:", error);
    throw new Error("Erro ao registrar usuário");
  }
};
