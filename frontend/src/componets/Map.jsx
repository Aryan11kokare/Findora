import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { useSelector } from "react-redux";

const icon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconSize: [25, 41],
});

export default function Map() {
  const itemState = useSelector((state) => state.item);

  const coords = itemState?.item?.geometry?.coordinates;

  if (!coords) {
    return (
      <div className="h-80 w-full flex items-center justify-center">
        Loading map...
      </div>
    );
  }

  const lat = coords[1];
  const lng = coords[0];

  return (
    <div className="h-80 w-full rounded-xl overflow-hidden shadow-md">
      <MapContainer
        center={[lat, lng]}
        zoom={15}
        scrollWheelZoom
        className="h-full w-full"
      >
        <TileLayer
          attribution="© OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={[lat, lng]} icon={icon}>
          <Popup>{itemState.item.title}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
