// export const runtime = 'edge'

export async function fetchWeekWeather(lat?:number, lng?:number) {
  const res = await fetch(
    `${process.env.WEEK_BASE_URL}?location=${lat}, ${lng}&units=metric&timesteps=1d&apikey=${process.env.TOMORROW_API_KEY}`,
    {
      method: 'GET',
      headers: { accept: 'application/json' },
      cache: 'force-cache',
    }
  );

  if (!res.ok) {
    throw new Error('API Error');
  }
  const data = await res.json();
  return data;
}