export type Book = {
    covers: number[];
    description: string | { type: string; value: string };
    first_publish_date: string;
    first_sentence: {
      type: string;
      value: string;
                    };
    key: string;
    subjects: string[];
    title: string;
    number_of_pages?: number;
    review?: Review;
    coverUrl?: string;
  };
  
  export type Author = {
    name: string;
    title: string;
    bio: string | { key: string; value: string };
    alternate_names: string[];
    photos: number[];
    personal_name: string;
    birth_date: string;
    source_records: string[];
    key: string;
    fuller_name: string;
    coverUrl?: string;
  };
  
 