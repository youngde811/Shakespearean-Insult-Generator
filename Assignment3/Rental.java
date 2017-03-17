package library;

public class Rental {
  
  private Item item;
  private int customerID;
  private int daysRental;
  private int daysLate;
  
  // technically, should have toString, clone, and equals methods - as per question
  
  public Rental(Item item, int customerID, int daysRental, int daysLate) {
    this.item = item;
    this.customerID = customerID;
    this.daysRental = daysRental;
    this.daysLate = daysLate;
  }
  
  public Rental(Rental r) {
    this(r.item, r.customerID, r.daysRental, r.daysLate);
  }
  
  public Item getItem() {
    return this.item;
  }
  
  public int getCustomerID() {
    return this.customerID;
  }
  
  public int getDaysRental() {
    return this.daysRental;
  }
  
  public int getDaysLate() {
    return this.daysLate;
  }
  
  public void setItem(Item item) {
    this.item = item;
  }
  
  public void setCustomerID(int customerID) {
    this.customerID = customerID;
  }
  
  public void setDaysRental(int daysRental) {
    this.daysRental = daysRental;
  }
  
  public void setDaysLate(int daysLate) {
    this.daysLate = daysLate;
  }
}