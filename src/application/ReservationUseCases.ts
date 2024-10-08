import Reservation, { NewReservationArgs } from "../domain/Reservation";
import { ReservationRepositoryInterface } from "./ReservationRepositoryInterface";

export default class ReservationUseCases {
  private reservationRepository: ReservationRepositoryInterface;

  constructor(reservationRepository: ReservationRepositoryInterface) {
    this.reservationRepository = reservationRepository;
  }

  async getReservations(): Promise<Reservation[]> {
    return this.reservationRepository.find();
  }

  createReservation(args: NewReservationArgs): Promise<Reservation> {
    const reservation = new Reservation(args);

    if (reservation.startDate >= reservation.endDate) {
      throw new Error("Reservation must start before it ends.");
    }
    if (reservation.startDate < new Date()) {
      throw new Error("Reservation must start in future.");
    }

    return this.reservationRepository.save(reservation);
  }
}
