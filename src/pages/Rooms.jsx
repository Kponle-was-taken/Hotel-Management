import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Rooms from "../components/Rooms";
import Footer from "../components/Footer";
import BookingModal from "../components/BookingModal";

const RoomsPage = () => {
  useEffect(() => {
    document.title = "Rooms & Suites - The Ashbourne";
    document.querySelector('meta[name="description"]')?.setAttribute('content', 'Explore our Rooms & Suites at The Ashbourne. From Garden Retreats to the Crown Penthouse, discover spaces crafted for comfort and refinement.');
  }, []);

  const [modalOpen, setModalOpen] = useState(false);
  const [bookingTarget, setBookingTarget] = useState({ room: null, floorName: null });

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-30">
        <Navbar />
      </div>
      <div className="pt-24">
        <Rooms onRequestBooking={(target) => {
          setBookingTarget(target);
          setModalOpen(true);
        }} />
        <BookingModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          initialFloor={bookingTarget.floorName}
          initialRoom={bookingTarget.room}
          onRequest={(payload) => {
            // pass-through: by default just log and close
            console.log('Booking payload from Rooms page:', payload);
            setModalOpen(false);
          }}
        />
      </div>
      <Footer />
    </>
  );
};

export default RoomsPage;
