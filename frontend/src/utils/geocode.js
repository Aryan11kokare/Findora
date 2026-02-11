export const geocodeAddress = async (address) => {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${address}`,
  );

  const data = await res.json();

  if (!data.length) return null;

  return {
    lat: parseFloat(data[0].lat),
    lng: parseFloat(data[0].lon),
  };
};
