export type SourceType = 'website' | 'youtube' | 'instagram';

export interface Source {
  type: SourceType;
  url: string;
  embedId?: string;  // For YouTube/Instagram embeds
}

export interface Recipe {
  id: string;
  name: string;
  description: string;
  source: Source;
  ingredients: string[];
  preparation: string[];
  image: string;
}

export interface RecipeData {
  recipes: Recipe[];
}
