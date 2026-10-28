import React, { useState } from 'react';
import FlipCard from '../components/FlipCard';

const FlipCardsPage: React.FC = () => {
  const [bookingModal, setBookingModal] = useState({
    isOpen: false,
    title: '',
    message: ''
  });

  const handleBooking = (itemName: string) => {
    // Simulate booking process
    console.log(`Booking requested for: ${itemName}`);
    
    // Show success message
    setBookingModal({
      isOpen: true,
      title: 'Booking Confirmed!',
      message: `Your booking for ${itemName} has been successfully received. We'll contact you within 24 hours to confirm details.`
    });

    // In a real application, you would:
    // 1. Send a request to your backend API
    // 2. Handle the response
    // 3. Update the UI based on the response
  };

  const closeModal = () => {
    setBookingModal({
      isOpen: false,
      title: '',
      message: ''
    });
  };

  return (
    <div className="min-h-screen flex flex-wrap justify-center items-center p-4 pt-24">
      {/* Booking Confirmation Modal */}
      {bookingModal.isOpen && (
        <div className="fixed inset-0 bg-gray bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{bookingModal.title}</h2>
            <p className="text-gray-600 mb-6">{bookingModal.message}</p>
            <button
              onClick={closeModal}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors w-full"
            >
              OK
            </button>
          </div>
        </div>
      )}

      <FlipCard
        hue={220}
        imageUrl="https://images.unsplash.com/photo-1486162928267-e6274cb3106f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
        caption="Brohm Lake"
        details={['Hiking trails', 'Swimming area', 'Picnic spots', 'Wildlife viewing', 'Photography']}
        buttonText="Book Now"
        onButtonClick={() => handleBooking("Brohm Lake Adventure")}
      />
      
      <FlipCard
        hue={170}
        imageUrl="https://images.unsplash.com/photo-1545436864-cd9bdd1ddebc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
        caption="Mountain View"
        details={['Scenic views', 'Guided tours', 'Rest areas', 'Souvenir shop', 'Accessible paths']}
        buttonText="Reserve"
        onButtonClick={() => handleBooking("Mountain View Experience")}
      />
      
      <FlipCard
        hue={350}
        imageUrl="https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        caption="Sunset Beach"
        details={['White sandy beach', 'Crystal clear waters', 'Sunset views', 'Water sports', 'Beachside dining']}
        buttonText="Book Now"
        onButtonClick={() => handleBooking("Sunset Beach Getaway")}
      />
    </div>
  );
};

export default FlipCardsPage;