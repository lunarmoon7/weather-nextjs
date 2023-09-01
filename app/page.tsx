import Section from '../components/Section';

// Home
export default async function Home() {
  const todayWeathers = await getTodayWeather();
  const hourlyWeathers = await getHourlyWeather();
  const weekWeathers = await getWeekWeather();
  return (
    <div className='w-screen h-screen relative z-0 lg:flex overflow-y-scroll'>
      <Section
        todayWeathers={todayWeathers}
        hourlyWeathers={hourlyWeathers}
        weekWeathers={weekWeathers}
      />
    </div>
  );
}

async function getTodayWeather() {
  const res = await fetch(
    `${process.env.REALTIME_BASE_URL}?location=seoul&units=metric&apikey=${process.env.TOMORROW_API_KEY}`,
    {
      method: 'GET',
      headers: { accept: 'application/json' },
      next: { revalidate: 3600 },
    }
  );
  if (!res.ok) {
    throw new Error('API Error');
  }

  const data = await res.json();
  return data;
}

async function getHourlyWeather() {
  const res = await fetch(
    `${process.env.WEEK_BASE_URL}?location=seoul&timesteps=1h&apikey=${process.env.TOMORROW_API_KEY}`,
    {
      method: 'GET',
      headers: { accept: 'application/json' },
      next: { revalidate: 3600 },
    }
  );

  if (!res.ok) {
    throw new Error('API Error');
  }
  const data = await res.json();
  return data;
}

async function getWeekWeather() {
  const res = await fetch(
    `${process.env.WEEK_BASE_URL}?location=seoul&timesteps=1d&apikey=${process.env.TOMORROW_API_KEY}`,
    {
      method: 'GET',
      headers: { accept: 'application/json' },
      next: { revalidate: 3600 },
    }
  );

  if (!res.ok) {
    throw new Error('API Error');
  }
  const data = await res.json();
  return data;
}
