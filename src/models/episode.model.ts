export interface Episode {
  id: number;
  name: string;
  season: number;
  number: number;
  runtime: number;
  airstamp: string;
  summary: string;
  rating: {
    average: number;
  };
  _links: {
    show: {
      name: string;
    };
  };
}
