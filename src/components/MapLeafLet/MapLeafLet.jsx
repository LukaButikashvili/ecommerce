import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvent,
} from "react-leaflet";

const MapLeafLet = ({
  currentPosition,
  setCurrentPosition,
  changeLocation = false,
}) => {
  const [mapCont, setMapCont] = useState(null);

  useEffect(() => {
    if (mapCont) {
      setTimeout(() => {
        mapCont.invalidateSize(false);
      }, 10);
    }
  }, [mapCont]);

  return (
    <MapContainer
      center={currentPosition}
      zoom={3}
      whenCreated={(mapInstance) => setMapCont(mapInstance)}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {changeLocation ? (
        <LocationMarker
          currentPosition={currentPosition}
          setCurrentPosition={setCurrentPosition}
        />
      ) : (
        <Marker position={currentPosition}></Marker>
      )}
    </MapContainer>
  );
};

function LocationMarker({ currentPosition, setCurrentPosition }) {
  const map = useMapEvent({
    click(e) {
      setCurrentPosition([e.latlng.lat, e.latlng.lng]);
    },
  });

  setTimeout(function () {
    map.invalidateSize(true);
  }, 300);

  return currentPosition === null ? null : (
    <Marker position={currentPosition}>
      <Popup>You are here</Popup>
    </Marker>
  );
}

export default MapLeafLet;
