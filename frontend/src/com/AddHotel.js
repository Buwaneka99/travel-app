import React, { useState } from 'react';
import './AddHotel.css'; // Make sure to create this CSS file

const AddHotel = () => {
  const [hotelDetails, setHotelDetails] = useState({
    name: '',
    location: '',
    description: '',
    amenities: [],
    rooms: [],
  });
  const [images, setImages] = useState([]); // Handle files
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  // Handle text inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setHotelDetails(prevDetails => ({ ...prevDetails, [name]: value }));
  };

  // Handle amenities input
  const handleAmenitiesChange = (e) => {
    const { value } = e.target;
    setHotelDetails(prevDetails => ({
      ...prevDetails,
      amenities: value.split(',').map(item => item.trim())
    }));
  };

  // Add a new room
  const addRoom = () => {
    setHotelDetails(prevDetails => ({
      ...prevDetails,
      rooms: [...prevDetails.rooms, { roomType: '', price: '', availableRooms: '' }]
    }));
  };

  // Handle room changes
  const handleRoomChange = (index, e) => {
    const { name, value } = e.target;
    const updatedRooms = [...hotelDetails.rooms];
    updatedRooms[index][name] = value;
    setHotelDetails(prevDetails => ({ ...prevDetails, rooms: updatedRooms }));
  };

  // Remove a room
  const removeRoom = (index) => {
    const updatedRooms = hotelDetails.rooms.filter((_, i) => i !== index);
    setHotelDetails(prevDetails => ({ ...prevDetails, rooms: updatedRooms }));
  };

  // Handle image input changes
  const handleImageChange = (index, e) => {
    const updatedImages = [...images];
    updatedImages[index] = e.target.files[0]; // Store only the first selected image
    setImages(updatedImages);
  };

  // Add a new image input
  const addImageInput = () => {
    setImages(prevImages => [...prevImages, null]); // Add a placeholder for new image
  };

  // Remove an image input
  const removeImageInput = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
  };

  // Handle form submission
  const onFinish = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    // Create FormData to handle file uploads
    const formData = new FormData();
    formData.append('name', hotelDetails.name);
    formData.append('location', hotelDetails.location);
    formData.append('description', hotelDetails.description);
    formData.append('amenities', hotelDetails.amenities.join(',')); // Convert amenities array to comma-separated string
    formData.append('rooms', JSON.stringify(hotelDetails.rooms)); // Convert rooms array to JSON string

    // Append each image file to FormData
    images.forEach((image) => {
      if (image) {
        formData.append('images', image); // 'images' should match the field name expected by backend
      }
    });

    try {
      const token = localStorage.getItem('token');
      const ownerId = localStorage.getItem('ownerId'); // Ensure ownerId is being used if necessary

      if (!token) {
        setStatus({ type: 'error', message: 'No token found. Please log in.' });
        return;
      }

      const response = await fetch('http://localhost:8081/api/hotels/add', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          // Do NOT set 'Content-Type' to 'multipart/form-data' manually; let the browser set it
        },
        body: formData,
      });

      if (response.ok) {
        setStatus({ type: 'success', message: 'Hotel added successfully!' });
        setHotelDetails({
          name: '',
          location: '',
          description: '',
          amenities: [],
          rooms: [],
        });
        setImages([]); // Clear selected images
      } else {
        const errorData = await response.json();
        setStatus({ type: 'error', message: `Failed to add hotel: ${errorData.message || "Unknown error"}` });
      }
    } catch (error) {
      console.error('Error adding hotel:', error);
      setStatus({ type: 'error', message: 'An error occurred while adding the hotel. Please try again later.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-hotel-container">
      <h2 className="add-hotel-title">Add New Hotel</h2>
      {status.message && (
        <div className={`status-message ${status.type}`}>
          {status.message}
        </div>
      )}
      <form onSubmit={onFinish} className="add-hotel-form">
        <input
          type="text"
          placeholder="Hotel Name"
          name="name"
          value={hotelDetails.name}
          onChange={handleChange}
          required
          className="form-input"
        />
        <input
          type="text"
          placeholder="Location"
          name="location"
          value={hotelDetails.location}
          onChange={handleChange}
          required
          className="form-input"
        />
        <textarea
          placeholder="Hotel Description"
          name="description"
          value={hotelDetails.description}
          onChange={handleChange}
          rows={4}
          className="form-textarea"
        />
        <input
          type="text"
          placeholder="Amenities (comma separated)"
          value={hotelDetails.amenities.join(', ')}
          onChange={handleAmenitiesChange}
          className="form-input"
        />
        
        <div className="form-section">
          <h3>Rooms</h3>
          {hotelDetails.rooms.map((room, index) => (
            <div key={index} className="room-inputs">
              <select
                value={room.roomType}
                onChange={(e) => handleRoomChange(index, e)}
                name="roomType"
                className="form-select"
              >
                <option value="">Select Room Type</option>
                <option value="Single Room">Single Room</option>
                <option value="Double Room">Double Room</option>
                <option value="Twin Room">Twin Room</option>
                <option value="Triple Room">Triple Room</option>
                <option value="Suite">Suite</option>
              </select>
              <input
                type="number"
                placeholder="Price"
                name="price"
                value={room.price}
                onChange={(e) => handleRoomChange(index, e)}
                required
                className="form-input"
              />
              <input
                type="number"
                placeholder="Available Rooms"
                name="availableRooms"
                value={room.availableRooms}
                onChange={(e) => handleRoomChange(index, e)}
                required
                className="form-input"
              />
              <button type="button" onClick={() => removeRoom(index)} className="remove-button">
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={addRoom} className="add-button">
            Add Room
          </button>
        </div>
        
        <div className="form-section">
          <h3>Images</h3>
          {images.map((image, index) => (
            <div key={index} className="image-inputs">
              <input
                type="file"
                id={`image-${index}`} // Unique ID for each input
                onChange={(e) => handleImageChange(index, e)}
                accept="image/*"
                required
                className="form-input"
              />
              <button type="button" onClick={() => removeImageInput(index)} className="remove-button">
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={addImageInput} className="add-button">
            Add Image
          </button>
        </div>
        
        <button type="submit" disabled={loading} className="submit-button">
          {loading ? "Adding..." : "Add Hotel"}
        </button>
      </form>
    </div>
  );
};

export default AddHotel;
