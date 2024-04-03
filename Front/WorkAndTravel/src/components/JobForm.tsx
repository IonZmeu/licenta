import React, { ChangeEvent, FormEvent, useState } from "react";
import { LoadScript, GoogleMap, MarkerF } from '@react-google-maps/api';
import { Navigate } from "react-router-dom";
import axios from "axios";
import "./JobForm.css";
import MapForm from "./MapForm";

function JobForm() {
    const [position, setPosition] = useState({ lat: 40.7567955, lng: -73.9512418 });
    const mapStyles = {        
        height: "80vh",
        width: "100%"
    };

    const [formData, setFormData] = useState<{email: string; name: string; country: string; images: Array<File>}>({
        email: "",
        name: "",
        country: "",
        images: []
    });


    // Function to handle input changes
    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
    
        if (type === 'file') {
            const fileList = (e.target as HTMLInputElement).files;
            if (fileList) {
                setFormData({ ...formData, images: Array.from(fileList) });
            }
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    // Function to handle form submission
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log(formData);
        
        let data = new FormData();
        data.append("email", formData.email);
        data.append("name", formData.name);
        data.append("country", formData.country);
        data.append("long_coordinate", position.lng.toString());
        data.append("lat_coordinate", position.lat.toString());
        for (let i = 0; i < formData.images.length; i++) {
          data.append('images', formData.images[i]);
        }

        axios.post('/job', data, {  
        headers: {'Content-Type': 'multipart/form-data'}
        })
        .then((res) => console.log(res))
        .catch((err)=>console.error(err));
    };
  
    return (
        <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label className="form-label">Email address</label>
            <input onChange={handleInputChange} value={formData.email} name="email" type="email" className="form-control"/>
        </div>
        <div className="mb-3">
            <label className="form-label">Name</label>
            <input onChange={handleInputChange} value={formData.name} name="name" type="text" className="form-control" />
        </div>
        <div className="mb-3">
            <label className="form-label">Country</label>
            <input onChange={handleInputChange} value={formData.country} name="country" type="text" className="form-control" />
        </div>
        <div className="mb-3">
            <label className="form-label">Images</label>
            <input onChange={handleInputChange} name="images" className="form-control" type="file" id="formFileMultiple" multiple/>
        </div>

        <LoadScript googleMapsApiKey='AIzaSyAID844FYzOtqurEPyxm9ooZiF2s05llL0'>
            <GoogleMap 
            center={{ lat: position.lat, lng: position.lng }}
            mapContainerStyle={mapStyles}
            zoom={15}
            onClick={(event) => {
                if (event && event.latLng) { // Check if event and event.latLng is defined
                setPosition({
                    lat: event.latLng.lat(),
                    lng: event.latLng.lng()
                });
                }}}>
            <MarkerF position={{ lat: position.lat, lng: position.lng }} 
            />
            </GoogleMap>
        </LoadScript>
        <div className="test">
            <div className="form-group">
            <label htmlFor="longitude">Longitude</label>
            <input type="text" className="form-control" id="longitude" value={position.lng} readOnly />
            </div>
            
            <div className="form-group">
            <label htmlFor="latitude">Latitude</label>
            <input type="text" className="form-control" id="latitude" value={position.lat} readOnly />
            </div>

        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
    </form>
    );
}
  
  export default JobForm;