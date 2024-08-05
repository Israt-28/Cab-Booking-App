import React, { createContext, useState } from "react";

export const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [bookedCabs, setBookedCabs] = useState([]);

  return (
    <BookingContext.Provider value={{ bookedCabs, setBookedCabs }}>
      {children}
    </BookingContext.Provider>
  );
};
