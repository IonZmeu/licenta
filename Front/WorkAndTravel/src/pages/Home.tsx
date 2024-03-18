import React from "react";
import Navbar from "../components/Navbar";
import { GoogleMap, LoadScript } from '@react-google-maps/api';

function MyComponent() {
  const mapStyles = {        
    height: "100vh",
    width: "100%"};
  
  return (
    <LoadScript googleMapsApiKey='AIzaSyCEgfkKWDkyccjip0KgLhKzdzFFsapCkFo'>
      <GoogleMap
        center={{ lat: 40.7567955, lng: -73.9512418 }}
        mapContainerStyle={mapStyles}
        zoom={13}> 
      </GoogleMap>        
    </LoadScript>
  )
}

const Home = () => {
  return (
    <>
      <MyComponent/>
    </>
  );
};

export default Home;
