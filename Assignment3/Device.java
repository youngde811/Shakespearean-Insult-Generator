package library;

public class Device extends Item {
  
  private double rentalCost;

  public Device(String name, double rentalCost) {
    super(name);
    this.rentalCost = rentalCost;
  }
  
  public Device(Device d) {
    this(d.getName(), d.getRentalCost());
  }
  
  public double getLateFees(int days) {
    return 2.0*days + 0.10*rentalCost;
  }

  public Object clone() {
    Device device = new Device(this.getName(), this.getRentalCost());
    return device;
  }
  
  public double getRentalCost() {
    return this.rentalCost;
  }
  
  public void setRentalCost(double rentalCost) {
    this.rentalCost = rentalCost;
  }
    
  public String toString() {
    return super.toString() + ", rental cost=" + rentalCost;
  }
}