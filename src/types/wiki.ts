export interface History {
  id: number;
  userId: number;
  createdAt: string;
}

export interface WikiPages {
  id: number;
  documentation_category_id: number;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
  history: History[];
  authors: string[];
  likes: number;
  content: string;
  hasLiked: boolean;
  archived: boolean;
}

export interface WikiCategories {
  id: number;
  name: string;
  index: number;
  created_at: string;
  updated_at: string;
  documentationPages: Pick<
    WikiPages,
    "id" | "title" | "documentation_category_id" | "archived"
  >[];
}

export interface WikiCreate {
  title: string;
  description: string;
  content: string;
  documentation_category_id: number;
  toggleLike?: boolean;
  archived: boolean;
}

export interface WikiCreateCategory {
  name: string;
  index: number;
}

export interface WikiCategoryResponse {
  name: string;
  index: number;
  created_at: string;
  updated_at: string;
  id: number;
  archived: boolean;
}

export interface WikiUpdate {
  data: Partial<WikiCreate>;
}
