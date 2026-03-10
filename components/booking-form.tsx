'use client';

import { useState, useEffect } from 'react';
import { Car } from '@/types/car';
import { Button } from '@/components/ui/button';

interface BookingFormProps {
  selectedCar: Car | null;
  cars: Car[];
  onCarChange: (car: Car) => void;
}

interface FormData {
  fullName: string;
  phoneNumber: string;
  nationalId: string;
  selectedCar: string;
  numberOfDays: string;
  pickupLocation: string;
  pickupDate: string;
}

interface FormErrors {
  [key: string]: string;
}

export function BookingForm({ selectedCar, cars, onCarChange }: BookingFormProps) {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    phoneNumber: '',
    nationalId: '',
    selectedCar: selectedCar?.name || '',
    numberOfDays: '5',
    pickupLocation: 'Total starehe',
    pickupDate: '2025-04-30',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Update form when selectedCar changes
  useEffect(() => {
    if (selectedCar) {
      setFormData((prev) => ({
        ...prev,
        selectedCar: selectedCar.name,
      }));
    }
  }, [selectedCar]);

  // Ensure component is mounted before rendering dynamic content
  useEffect(() => {
    setMounted(true);
  }, []);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\d{10,}$/.test(formData.phoneNumber.replace(/\D/g, ''))) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
    }

    if (!formData.nationalId.trim()) {
      newErrors.nationalId = 'National ID / Passport is required';
    }

    if (!formData.selectedCar) {
      newErrors.selectedCar = 'Please select a car';
    }

    const days = parseInt(formData.numberOfDays, 10);
    if (!formData.numberOfDays || isNaN(days) || days < 5) {
      newErrors.numberOfDays = 'Minimum 5 days required';
    }

    if (!formData.pickupDate) {
      newErrors.pickupDate = 'Pickup date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateReturnDate = (): string => {
    const pickupDate = new Date(formData.pickupDate);
    const days = parseInt(formData.numberOfDays, 10);
    const returnDate = new Date(pickupDate);
    returnDate.setDate(returnDate.getDate() + days);

    return returnDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const calculateTotal = (): number => {
    const car = cars.find((c) => c.name === formData.selectedCar);
    const days = parseInt(formData.numberOfDays, 10);
    return car ? car.dailyRate * days : 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === 'selectedCar') {
      const car = cars.find((c) => c.name === value);
      if (car) onCarChange(car);
    }

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const car = cars.find((c) => c.name === formData.selectedCar);
      const total = calculateTotal();
      const returnDate = calculateReturnDate();

      const pickupDateFormatted = new Date(formData.pickupDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

      const message = `EID CAR BOOKING REQUEST
Shilaabo Tour & Car Hire

Customer Name: ${formData.fullName}
Phone Number: ${formData.phoneNumber}
National ID: ${formData.nationalId}
Selected Car: ${formData.selectedCar}
Pickup Date: ${pickupDateFormatted}
Number of Days: ${formData.numberOfDays}
Return Date: ${returnDate}
Pickup Location: ${formData.pickupLocation}

Total Amount: Ksh ${total.toLocaleString()}

Kindly confirm availability. Thank you.`;

      const whatsappNumber = '254792837410'; // Shilaabo Tour & Car Hire contact number
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

      // Open WhatsApp in new window
      window.open(whatsappUrl, '_blank');
    } catch (error) {
      console.error('Error submitting booking:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const days = parseInt(formData.numberOfDays, 10);
  const isValid =
    formData.fullName &&
    formData.phoneNumber &&
    formData.nationalId &&
    formData.selectedCar &&
    days >= 5 &&
    formData.pickupDate &&
    Object.keys(errors).length === 0;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Full Name */}
      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">
          Full Name <span className="text-primary">*</span>
        </label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleInputChange}
          placeholder="Enter your full name"
          className="w-full px-4 py-2 border border-border rounded-md bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {errors.fullName && (
          <p className="text-destructive text-sm mt-1">{errors.fullName}</p>
        )}
      </div>

      {/* Phone Number */}
      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">
          Phone Number <span className="text-primary">*</span>
        </label>
        <input
          type="tel"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleInputChange}
          placeholder="07XXXXXXXX or +2547XXXXXXXX"
          className="w-full px-4 py-2 border border-border rounded-md bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {errors.phoneNumber && (
          <p className="text-destructive text-sm mt-1">{errors.phoneNumber}</p>
        )}
      </div>

      {/* National ID / Passport */}
      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">
          National ID / Passport <span className="text-primary">*</span>
        </label>
        <input
          type="text"
          name="nationalId"
          value={formData.nationalId}
          onChange={handleInputChange}
          placeholder="Enter your ID or Passport number"
          className="w-full px-4 py-2 border border-border rounded-md bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {errors.nationalId && (
          <p className="text-destructive text-sm mt-1">{errors.nationalId}</p>
        )}
      </div>

      {/* Select Car */}
      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">
          Selected Car <span className="text-primary">*</span>
        </label>
        <select
          name="selectedCar"
          value={formData.selectedCar}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">Choose a car...</option>
          {cars.map((car) => (
            <option key={car.id} value={car.name}>
              {car.name} - Ksh {car.dailyRate.toLocaleString()}/day
            </option>
          ))}
        </select>
        {errors.selectedCar && (
          <p className="text-destructive text-sm mt-1">{errors.selectedCar}</p>
        )}
      </div>

      {/* Number of Days */}
      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">
          Number of Days <span className="text-primary">*</span>
        </label>
        <input
          type="number"
          name="numberOfDays"
          value={formData.numberOfDays}
          onChange={handleInputChange}
          min="5"
          className="w-full px-4 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <p className="text-xs text-muted-foreground mt-1">Minimum 5 days required</p>
        {errors.numberOfDays && (
          <p className="text-destructive text-sm mt-1">{errors.numberOfDays}</p>
        )}
      </div>

      {/* Pickup Location (Fixed) */}
      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">
          Pickup Location
        </label>
        <input
          type="text"
          disabled
          value="Total starehe"
          className="w-full px-4 py-2 border border-border rounded-md bg-muted text-foreground cursor-not-allowed opacity-60"
        />
        <p className="text-xs text-muted-foreground mt-1">Fixed location</p>
      </div>

      {/* Pickup Date (Editable) */}
      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">
          Pickup Date <span className="text-primary">*</span>
        </label>
        <input
          type="date"
          name="pickupDate"
          value={formData.pickupDate}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {errors.pickupDate && (
          <p className="text-destructive text-sm mt-1">{errors.pickupDate}</p>
        )}
      </div>

      {/* Return Date (Auto-calculated) */}
      {mounted && formData.numberOfDays && parseInt(formData.numberOfDays, 10) >= 5 && (
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">
            Return Date
          </label>
          <input
            type="text"
            disabled
            value={calculateReturnDate()}
            className="w-full px-4 py-2 border border-border rounded-md bg-muted text-foreground cursor-not-allowed opacity-60"
          />
          <p className="text-xs text-muted-foreground mt-1">Auto-calculated based on number of days</p>
        </div>
      )}

      {/* Total Amount Summary */}
      {mounted && formData.selectedCar && formData.numberOfDays && parseInt(formData.numberOfDays, 10) >= 5 && (
        <div className="bg-secondary/10 border border-secondary rounded-lg p-4">
          <p className="text-sm text-muted-foreground mb-1">Total Amount</p>
          <p className="text-3xl font-bold text-primary">
            Ksh {calculateTotal().toLocaleString()}
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            {formData.selectedCar} × {formData.numberOfDays} days
          </p>
        </div>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={!isValid || isSubmitting}
        className="w-full bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-primary-foreground font-bold py-3 rounded-md transition-colors"
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center">
            <span className="animate-spin mr-2">⏳</span>
            Processing...
          </span>
        ) : (
          '📲 Submit Booking & WhatsApp'
        )}
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        You will be redirected to WhatsApp to confirm your booking details.
      </p>
    </form>
  );
}
