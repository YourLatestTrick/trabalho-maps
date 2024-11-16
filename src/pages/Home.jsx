import { useState, useEffect, useContext } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { UserContext } from "../context/UserContext";
import { Header } from "../components/Header";

export function Home() {
  const [map, setMap] = useState(null);
  const [mapCenter, setMapCenter] = useState({
    lat: -28.2624,
    lng: -52.396032,
  });
  const [markers, setMarkers] = useState([]);

  const { user } = useContext(UserContext);

  const containerStyle = {
    width: "100%",
    height: "100%",
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "API-KEY",
  });

  const onLoad = (map) => {
    const bounds = new window.google.maps.LatLngBounds(mapCenter);
    map.fitBounds(bounds);
    setMap(map);
  };

  const handleMapClick = (event) => {
    console.log(event.latLng.lat(), event.latLng.lng());
    const marker = {
      latitude: event.latLng.lat(),
      longitude: event.latLng.lng(),
    };

    fetch("https://apibase2-0bttgosp.b4a.run/ws/foco", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${user}`,
      },
      body: JSON.stringify(marker),
    })
      .then((response) => response.json())
      .then(() => {
        console.log("Novo ponto cadastrado com sucesso");
        setMarkers([
          ...markers,
          { lat: marker.latitude, lng: marker.longitude },
        ]);
      })
      .catch((error) => {
        alert("Erro ao cadastrar novo ponto");
      });
  };

  useEffect(() => {
    console.log("Carregou o componente");
    const location = window.navigator && window.navigator.geolocation;

    const locationSuccess = (position) => {
      console.log(location);
      setMapCenter({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    };

    const locationError = () => {
      setMapCenter({
        lat: -28.2624,
        lng: -52.396032,
      });
    };

    if (location) {
      console.log("Entrou no if");
      location.getCurrentPosition(locationSuccess, locationError);
    }
  }, []);

  useEffect(() => {
    fetch("https://apibase2-0bttgosp.b4a.run/ws/foco", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const newMarkerArray = data.map(({ latitude, longitude }) => {
          return {
            lat: latitude,
            lng: longitude,
          };
        });
        setMarkers(newMarkerArray);
      });
  }, []);

  return (
    <>
      <Header />
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={mapCenter}
          zoom={14}
          onLoad={onLoad}
          onClick={handleMapClick}
          onUnmount={() => setMap(null)}
        >
          {markers.map((marker, key) => (
            <Marker key={key} position={marker} />
          ))}
        </GoogleMap>
      )}
    </>
  );
}
