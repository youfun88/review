import { shuffle } from '../utils/array';

interface Business {
  name: string;
  address: string;
  type: string;
}

export async function searchNearbyBusinesses(
  searchTerm: string,
  latitude: number | null,
  longitude: number | null
): Promise<Business[]> {
  // 模擬 API 延遲
  await new Promise(resolve => setTimeout(resolve, 500));

  // 預設店家資訊
  const mockBusinesses: Business[] = [
    {
      name: '自己的眼鏡',
      address: '台北市中山區中山北路二段99號',
      type: 'optical'
    },
    {
      name: '自己的驗光所',
      address: '台北市大安區敦化南路一段233號',
      type: 'optical'
    }
  ];

  return mockBusinesses.filter(business =>
    business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    business.address.toLowerCase().includes(searchTerm.toLowerCase())
  );
}