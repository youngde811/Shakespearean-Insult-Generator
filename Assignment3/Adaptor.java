package library;

public class Adaptor extends Device {
  
  public Adaptor(String name, double rentalCost) {
    super(name, rentalCost);
  }

  public Adaptor(Adaptor adp) {
    this(adp.getName(), adp.getRentalCost());
  }

  public double getLateFees(int days) {
    return 2.5*days + 0.15*this.getRentalCost();
  }

  public Object clone() {
    Adaptor a = new Adaptor(this.getName(), this.getRentalCost());
    return a;
  }
}