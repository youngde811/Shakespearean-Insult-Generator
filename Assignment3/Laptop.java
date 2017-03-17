package library;

public class Laptop extends Device {
  
  public Laptop(String name, double rentalCost) {
    super(name, rentalCost);
  }

  public Laptop(Laptop l) {
    this(l.getName(), l.getRentalCost());
  }
  
  public double getLateFees(int days) {
    return 5.0*days + 0.2*this.getRentalCost();
  }
  
  public Object clone() {
    Laptop l = new Laptop(this.getName(), this.getRentalCost());
    return l;
  }
  
}