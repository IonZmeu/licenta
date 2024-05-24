import { ChangeEvent, FormEvent, useState } from "react";
import { LoadScript, GoogleMap, MarkerF } from '@react-google-maps/api';
import axios from "axios";


function JobForm() {
    const [position, setPosition] = useState({ lat: 40.7567955, lng: -73.9512418 });
    const mapStyles = {        
        height: "80vh",
        width: "100%"
    };

    const [mainImage, setMainImage] = useState<File | null>(null);
    const [secondaryImages, setSecondaryImages] = useState<File[]>([]);

    const [formData, setFormData] = useState<{email: string; name: string; country: string; position: string; salary: string; description: string; contactInfo: string; mainImage: File | null; secondaryImages: Array<File>}>({
        email: "",
        name: "",
        country: "",
        position: "",
        salary: "",
        description: "",
        contactInfo: "",
        mainImage: null,
        secondaryImages:[]
    });


    // Function to handle input changes
    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        if (type === 'file') {
            const fileList = (e.target as HTMLInputElement).files;
            if(fileList){
                if (name === 'mainImage') {
                    const newMainImage = fileList[0];
                    setMainImage(newMainImage); // Update mainImage
                    setFormData(prevFormData => ({ ...prevFormData, mainImage: newMainImage })); // Update formData
                } else if (name === 'secondaryImages') {
                    setSecondaryImages(Array.from(fileList)); // Replace secondaryImages array with a new array containing only the new file
                    setFormData(prevFormData => ({ ...prevFormData, secondaryImages: Array.from(fileList) })); // Update formData
                }
            }
        } else {
            setFormData(prevFormData => ({ ...prevFormData, [name]: value })); // Update formData for other fields
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
        data.append("position", formData.position);
        data.append("salary", formData.salary);
        data.append("description", formData.description);
        data.append("contactInfo", formData.contactInfo);
        data.append("longCoordinate", position.lng.toString());
        data.append("latCoordinate", position.lat.toString());
        // Append mainImage if it's not null
        if (formData.mainImage) {
            data.append('mainImage', formData.mainImage);
        }
        
        // Append secondaryImages
        for (let i = 0; i < formData.secondaryImages.length; i++) {
            data.append('secondaryImages', formData.secondaryImages[i]);
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
            <label className="form-label">Job position</label>
            <input onChange={handleInputChange} value={formData.position} name="position" type="text" className="form-control" />
        </div>
        <div className="mb-3">
            <label className="form-label">Salary</label>
            <input onChange={handleInputChange} value={formData.salary} name="salary" type="text" className="form-control" />
        </div>
        <div className="mb-3">
            <label className="form-label">Job description</label>
            <input onChange={handleInputChange} value={formData.description} name="description" type="text" className="form-control" />
        </div>
        <div className="mb-3">
            <label className="form-label">Contact information</label>
            <input onChange={handleInputChange} value={formData.contactInfo} name="contactInfo" type="text" className="form-control" />
        </div>
        <div className="mb-3">
            <label className="form-label">Main display image</label>
            <input onChange={handleInputChange} name="mainImage" className="form-control" type="file" id="formFile" />
        </div>
        <div className="mb-3">
            <label className="form-label">Secondary images</label>
            <input onChange={handleInputChange} name="secondaryImages" className="form-control" type="file" id="formFileMultiple" multiple/>
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