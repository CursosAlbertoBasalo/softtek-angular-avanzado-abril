import { Injectable } from '@angular/core';
import { Trip } from '@stk/models/trip.interface';

@Injectable({
  providedIn: 'root',
})
export class TripCalculationsService {
  calculateNights(startDate: Date, endDate: Date): number {
    const diff = endDate.getTime() - startDate.getTime();
    return Math.round(diff / this.getMillisecondsPerNight());
  }
  private getMillisecondsPerNight() {
    return 1000 * 3600 * 24;
  }

  calculateStayingPrice(trip: Trip): number {
    const nights = this.calculateNights(trip.startDate, trip.endDate);
    return nights * trip.stayingNightPrice;
  }
  calculateExtraLuggagePrice(trip: Trip, extraKilos: number): number {
    return trip.extraLuggagePricePerKilo * extraKilos;
  }
  calculateTripPricePerPassenger(
    trip: Trip,
    extraKilos: number,
    includesPremiumFoods: boolean
  ): number {
    return (
      this.calculateStayingPrice(trip) +
      this.calculateExtraLuggagePrice(trip, extraKilos) +
      (includesPremiumFoods ? trip.premiumFoodPrice : 0) +
      trip.flightPrice
    );
  }
  calculateTripPrice(
    trip: Trip,
    extraKilos: number,
    includesPremiumFoods: boolean,
    passengers: number
  ): number {
    return this.calculateTripPricePerPassenger(trip, extraKilos, includesPremiumFoods) * passengers;
  }
  calculateFullFlightPrice(trip?: Trip): number {
    if (!trip) return 0;
    return this.calculateTripPrice(trip, 0, false, trip.places);
  }
}
