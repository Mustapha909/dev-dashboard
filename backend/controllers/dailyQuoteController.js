let cachedQuote = null;
let lastFetchDate = null;

export const getDailyQuote = async (req, res) => {
  try {
    const today = new Date().toDateString();

    if (cachedQuote && lastFetchDate === today) {
      return res.status(200).json(cachedQuote);
    }

    const response = await fetch('https://zenquotes.io/api/quotes/');
    if (!response.ok) throw new Error('Failed to fetch quote');

    const data = await response.json();
    const daily = data[Math.floor(Math.random() * data.length)];

    cachedQuote = { quote: daily.q, author: daily.a };

    res.status(200).json(cachedQuote);
  } catch (error) {
    res.status(500).json({ message: 'Could not fetch daily quote' });
  }
};
