export interface Message {
  role: string;
  content: string;
  refusal: unknown;
}

export interface PromptTokensDetails {
  cached_tokens: number;
}

export interface CompletionTokensDetails {
  reasoning_tokens: number;
}

export interface Usage {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
  prompt_tokens_details: PromptTokensDetails;
  completion_tokens_details: CompletionTokensDetails;
}

export interface Choice {
  index: number;
  message: Message;
  finish_reason: string;
}

export interface ResponseData {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Choice[];
  usage: Usage;
  system_fingerprint: string;
}

export interface ChatData {
  date: string;
  count: number;
}
