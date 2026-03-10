'use client';

import { Car } from '@/types/car';
import { Button } from '@/components/ui/button';

interface CarCardProps {
  car: Car;
  onBookNow: (car: Car) => void;
}

export function CarCard({ car, onBookNow }: CarCardProps) {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="bg-gradient-to-br from-primary/10 to-secondary/10 p-6 min-h-48 flex items-center justify-center relative overflow-hidden">
        {car.image ? (
          <img 
            src={car.image} 
            alt={car.name}
            className="w-full h-full object-cover rounded-md absolute inset-0"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextElementSibling?.classList.remove('hidden');
            }}
          />
        ) : null}
        <div className={`${car.image ? 'hidden' : ''} text-center relative z-10`}>
          <div className="text-5xl mb-2">🚗</div>
          <p className="text-foreground/60 text-sm">Vehicle Illustration</p>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-foreground mb-2">{car.name}</h3>
        
        <div className="border-t border-b border-border py-4 mb-4">
          <p className="text-sm text-muted-foreground mb-2">Daily Rate</p>
          <p className="text-3xl font-bold text-primary">
            Ksh {car.dailyRate.toLocaleString()}
          </p>
          <p className="text-xs text-muted-foreground mt-1">per day</p>
        </div>

        <Button
          onClick={() => onBookNow(car)}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2 rounded-md transition-colors"
        >
          Book Now
        </Button>
      </div>
    </div>
  );
}
