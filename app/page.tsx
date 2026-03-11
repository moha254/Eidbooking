'use client';

import { useState, useRef } from 'react';
import { CarCard } from '@/components/car-card';
import { BookingForm } from '@/components/booking-form';
import { Car } from '@/types/car';

const CARS: Car[] = [
  { id: '1', name: 'Toyota Axio', dailyRate: 5000, image: '/cars/axio.jpeg' },
  { id: '2', name: 'Toyota Harrier', dailyRate: 9000, image: '/cars/harrier.jpeg' },
  { id: '3', name: 'Toyota TX Prado', dailyRate: 13000, image: '/cars/tx prado.jpeg' },
  { id: '4', name: 'Toyota Noah', dailyRate: 8000, image: '/cars/noah.jpeg' },
  { id: '5', name: 'Toyota Vitz', dailyRate: 4000, image: '/cars/vitz.jpeg' },
  { id: '6', name: 'Mercedes Benz', dailyRate: 15000, image: '/cars/mercedes.jpeg' },
  { id: '7', name: 'Mazda CX-5', dailyRate: 8500, image: '/cars/CX5.jpeg' },
  { id: '8', name: 'Nissan X-Trail', dailyRate: 8000, image: '/cars/Xtrail.jpeg' },
];

export default function Home() {
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const handleBookNow = (car: Car) => {
    setSelectedCar(car);
    // Smooth scroll to form
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 0);
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Header Banner */}
      <header className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">🎉 Eid Special Offer</h1>
              <p className="text-lg text-primary-foreground/90">
                Shilaabo Tour & Car Hire – Luxury & Budget Vehicle Options
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Banner Alert */}
      <div className="bg-secondary/20 border-b-2 border-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">⭐</span>
            <p className="text-foreground font-semibold">
              Minimum 5 Days Booking Required • Pickup Date Fixed: 29th of Ramadhan
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Cars Section */}
        <section className="mb-16">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">
              Available Vehicles
            </h2>
            <p className="text-muted-foreground">
              Choose from our fleet of premium and budget-friendly cars
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CARS.map((car) => (
              <CarCard
                key={car.id}
                car={car}
                onBookNow={handleBookNow}
              />
            ))}
          </div>
        </section>

        {/* Booking Form Section */}
        <section ref={formRef} className="mb-16">
          <div className="bg-card border border-border rounded-lg p-8 shadow-lg">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-2">
                Complete Your Booking
              </h2>
              <p className="text-muted-foreground">
                Fill in your details below. You'll be redirected to WhatsApp to confirm your booking.
              </p>
            </div>

            <BookingForm
              selectedCar={selectedCar}
              cars={CARS}
              onCarChange={setSelectedCar}
            />
          </div>
        </section>

        {/* Info Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="text-3xl mb-4">📅</div>
            <h3 className="text-xl font-bold text-foreground mb-2">Fixed Pickup Date</h3>
            <p className="text-muted-foreground">
              All bookings start on 29th of Ramadhan. Minimum 5-day booking period required.
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <div className="text-3xl mb-4">💰</div>
            <h3 className="text-xl font-bold text-foreground mb-2">Transparent Pricing</h3>
            <p className="text-muted-foreground">
              No hidden charges. Total cost = Daily Rate × Number of Days. Automatic calculation.
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <div className="text-3xl mb-4">📱</div>
            <h3 className="text-xl font-bold text-foreground mb-2">WhatsApp Confirmation</h3>
            <p className="text-muted-foreground">
              Submit your booking and get instant confirmation via WhatsApp from our team.
            </p>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-bold mb-4">Shilaabo Tour & Car Hire</h3>
              <p className="text-primary-foreground/80">
                Premium car rental services for your Eid celebration and travel needs.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Contact Us</h3>
              <p className="text-primary-foreground/80">
                📱 WhatsApp: +254 792 837 410<br />
                📧 Email: info@shilaabo.com<br />
                🏢 Nairobi, Kenya
              </p>
            </div>
          </div>
          <div className="border-t border-primary-foreground/20 pt-8 text-center text-sm text-primary-foreground/70">
            <p>&copy; 2025 Shilaabo Tour & Car Hire. All rights reserved. | Eid Special Offer</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
