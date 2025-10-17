export type Calendar = {
  id: number;
  name: string;
  type: string;
  user_id: number | null;
  demand_id: number;
  date: string;
  createdAt: string;
  updatedAt: string;
  demand: {
    coding: number;
    created_at: string;
    demandTags: string[];
    experiment_id: string;
    id: number;
    institution_id: number;
    modeling: number;
    scripting: number;
    status: string;
    testing: number;
    ualab: number;
    updated_at: string;
  };
  members: string[];
};
