// ProfilePage.tsx
"use client"
import React from 'react';
import './ProfilePage.css';
import BookingIcons from './BookingIcons';

const ProfilePage = () => {
  const [bookings, setBookings] = React.useState<any>(null);
  const [user, setUser] = React.useState<any>(null);

  const getBookings = async () => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/movie/getuserbookings`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    })      
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) {
          console.log(data);
          setBookings(data.data);
        } else {
          console.log(data);
        }
      });
  };

  const getUserData = async () => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/auth/getuser`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) {
          console.log(data);
          setUser(data.data);
        } else {
          console.log(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdateBooking = async (bookingId: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/movie/updateBooking/${bookingId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      const data = await response.json();

      if (data.ok) {
        console.log('Booking updated successfully!');
        // You may want to fetch bookings again after updating
        getBookings();
      } else {
        console.error('Error updating booking:', data.error);
      }
    } catch (error) {
      console.error('Error updating booking:', error);
    }
  };

  const handleDeleteBooking = async (bookingId: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/movie/deleteBooking/${bookingId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        }
      );

      const data = await response.json();

      if (data.ok) {
        console.log('Booking deleted successfully!');
        // You may want to fetch bookings again after deleting
        getBookings();
      } else {
        console.error('Error deleting booking:', data.error);
      }
    } catch (error) {
      console.error('Error deleting booking:', error);
    }
  };

  React.useEffect(() => {
    getBookings();
    getUserData();
  }, []);

  return (
    <div className='profile'>
      <h1 className='head'>Profile</h1>
      <div className='user'>
        <h2>User Details</h2>
        <div className='details'>
          <div className='detail'>
            <h3>Name</h3>
            <p>{user?.name}</p>
          </div>
          <div className='detail'>
            <h3>Email</h3>
            <p>{user?.email}</p>
          </div>
          <div className='detail'>
            <h3>City</h3>
            <p>{user?.city}</p>
          </div>
        </div>
      </div>
      <div className='bookings'>
        <h2>Bookings</h2>
        <div className='details'>
          {bookings?.map((booking: any) => (
            <div className={`booking ${booking ? '' : 'deleted-booking'}`} key={booking?._id}>
              {booking ? (
                <React.Fragment>
                  <div className='detail'>
                    <h3>Movie</h3>
                    <p>{booking?.movieId}</p>
                  </div>
                  <div className='detail'>
                    <h3>Screen</h3>
                    <p>{booking.screenId}</p>
                  </div>
                  <div className='detail'>
                    <h3>Seats</h3>
                    <p>{booking.seats.map((seat: any, index:any) => (
                      <span key={index}>{seat.seat_id}, </span>
                    ))}</p>
                  </div>
                  <div className='detail'>
                    <h3>Price</h3>
                    <p>{booking.totalPrice}</p>
                  </div>
                  <div className='detail'>
                    <h3>Payment Type</h3>
                    <p>{booking.paymentType}</p>
                  </div>
                  <div className='detail'>
                    <h3>Payment Id</h3>
                    <p>{booking.paymentId}</p>
                  </div>
                  <div className='detail'>
                    <h3>Show Date</h3>
                    <p>{booking.showDate}</p>
                  </div>
                  <div className='detail'>
                    <h3>Show Time</h3>
                    <p>{booking.showTime}</p>
                  </div>
                  <BookingIcons
                    onEdit={() => handleUpdateBooking(booking?._id)}
                    onDelete={() => handleDeleteBooking(booking?._id)}
                  />
                </React.Fragment>
              ) : (
                <div>
                  <p></p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
