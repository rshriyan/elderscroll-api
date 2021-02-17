export interface GetCardsApiResponse
{
  cards: {
    name: string;
    rarity: string;
    type: string;
    subtypes: string[];
    cost: number;
    power: number;
    health: number;
    set: {
      id: string;
      name: string;
      _self: string;
    };
    soulSummon: number;
    soulTrap: number;
    text: string;
    attributes: string[];
    keywords: string[];
    unique: boolean;
    imageUrl: string;
    id: string;
  }[];
  _pageSize: number;
  _totalCount: number;
}
