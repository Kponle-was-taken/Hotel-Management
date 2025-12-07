// Mock availability and pricing service
export async function checkAvailability({ room, checkin, checkout, guests }) {
  // simulate network latency
  await new Promise((r) => setTimeout(r, 600 + Math.random() * 600));

  // Updated base prices matching floor definitions
  const basePrices = {
    "The Crown Penthouse": 1500,
    "Grand Suites Collection": 950,
    "Celestial Heights": 750,
    "Regency Elegance": 550,
    "Clocktower Chambers": 425,
    "Heritage Collection": 325,
    "Manor Rooms": 225,
    "Garden Retreat": 150,
  };

  const capacity = {
    "The Crown Penthouse": 4,
    "Grand Suites Collection": 4,
    "Celestial Heights": 3,
    "Regency Elegance": 3,
    "Clocktower Chambers": 2,
    "Heritage Collection": 2,
    "Manor Rooms": 2,
    "Garden Retreat": 2,
  };

  const parse = (s) => (s ? new Date(s) : null);
  const ci = parse(checkin);
  const co = parse(checkout);

  if (!ci || !co || co <= ci) {
    return { available: false, message: "Invalid dates", pricePerNight: 0, totalPrice: 0, nights: 0 };
  }

  const nights = Math.round((co - ci) / (1000 * 60 * 60 * 24));
  let pricePerNight = basePrices[room] || 300;

  // seasonal multiplier based on check-in month
  const month = ci.getMonth(); // 0-11
  let seasonal = 1.0;
  if (month === 11 || month === 0 || month === 1) seasonal = 1.25; // holiday season
  else if (month >= 5 && month <= 8) seasonal = 1.12; // high summer

  // length-of-stay discount
  let lengthDiscount = 1.0;
  if (nights >= 7) lengthDiscount = 0.88;
  else if (nights >= 3) lengthDiscount = 0.95;

  // demand/random availability (mock)
  const randomFactor = Math.random();
  let available = true;
  let demandMultiplier = 1.0;
  if (randomFactor < 0.12) {
    available = false;
  } else if (randomFactor < 0.25) {
    demandMultiplier = 1.18; // busy night
  }

  // guest capacity check
  if (guests && capacity[room] && Number(guests) > capacity[room]) {
    return { available: false, message: `Max ${capacity[room]} guests for ${room}.`, pricePerNight: 0, totalPrice: 0, nights };
  }

  pricePerNight = Math.round(pricePerNight * seasonal * demandMultiplier);
  const totalPrice = Math.round(pricePerNight * nights * lengthDiscount);

  const message = available ? "Available" : "No rooms available for selected dates";

  return { available, message, pricePerNight, totalPrice, nights };
}
