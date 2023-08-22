export async function getStocks() {
  const res = await fetch("http://localhost:3000/api/stocks");
  const data = await res.json();

  return data;
}

export async function getRandomStocks() {
  const res = await fetch("http://localhost:3000/api/stocks/random");
  const data = await res.json();
  return data;
}

export async function getStockData(symbol) {
  const res = await fetch(`http://localhost:3000/api/stocks/${symbol}`);
  const data = await res.json();
  return data;
}

export async function getPopularStocks() {
  const res = await fetch("http://localhost:3000/api/stocks/popular");
  const data = await res.json();
  return data;
}

export async function getSimilarStocks(symbol) {
  const res = await fetch(`http://localhost:3000/api/stocks/similar/${symbol}`);
  const data = await res.json();
  return data;
}

export async function getGrowthTechStocks() {
  const res = await fetch("http://localhost:3000/api/stocks/growthTechStocks");
  const data = await res.json();
  return data;
}

export async function getTrendingStocks() {
  const res = await fetch("http://localhost:3000/api/stocks/trending");
  const data = await res.json();
  return data;
}

export async function autoComplete(input) {
  const res = await fetch(
    `http://localhost:3000/api/stocks/autocomplete/${input}`
  );
  const data = await res.json();
  return data;
}

export async function getMarketMovers() {
  const res = await fetch("http://localhost:3000/api/stocks/market_movers");
  const data = await res.json();
  return data;
}

export async function getMarketNews() {
  const res = await fetch("http://localhost:3000/api/stocks/marketNews");
  const data = await res.json();

  return data;
}

export async function getWatchlist() {
  const res = await fetch("");
  //const data = await res.json();
  return data;
}

export async function getBio(symbol) {
  const res = await fetch(`http://localhost:3000/api/stocks/bio/${symbol}`);
  const data = await res.json();
  return data;
}

export async function getGraphData(symbol, period = "1d") {
  const res = await fetch(
    `http://localhost:3000/api/stocks/stockGraph/${symbol}/${period}`
  );
  const data = await res.json();
  return data;
}

export function graphDataConverter(epoch) {
  const result = {
    date: epochConverter(epoch).date,
    time: epochConverter(epoch).time,
    volume: epoch.volume,
    close: epoch.close,
  };
  return result;
}

function epochConverter(epoch) {
  const date = new Date(epoch * 1000);
  const result = {
    time: date.toLocaleTimeString("en-US", { timeStyle: "short" }),
    date: date.toLocaleDateString("en-US", { dateStyle: "medium" }),
  };
  return result;
}
