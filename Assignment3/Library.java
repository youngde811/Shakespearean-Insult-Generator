package library;

import java.util.ArrayList;

public class Library {
  
  // technically, should have toString, clone, and equals methods - as per question.
  // technically, should also have a copy constructor, but don't since using default constructor.
  // The ArrayList is static, so this assumes there is only one libary.

  private static ArrayList<Rental> items = new ArrayList<Rental>();
  
  public void addTransaction(Rental rental) {
    items.add(rental);
  }
  
  public double getTotalLateFees() {
    double amount = 0.0;
    for (Rental r: items) amount = amount + r.getItem().getLateFees(r.getDaysLate());
    return amount;
  }
  
  public double getTotalRentalCosts() {
    double amount = 0.0;
    for (Rental r: items) {
      Item i = r.getItem();
      if (i instanceof Device) amount = amount + ((Device) i).getRentalCost();
    }
    return amount;
  }
  
  public static void main(String[] args) {
    
    // create a library
    Library library = new Library();
    
    // create a magazine
    String name = "Sports Illustrated";
    String[] authors = { "Bob", "Doug" };
    String publisher = "McGraw-Hill";
    int year = 2017;
    
    Magazine mag = new Magazine(name, authors, publisher, year);

    // create a rental of the magazine
    int customerID = 999;
    int days = 7;
    int daysLate = 14;

    Rental rental = new Rental(mag, customerID, days, daysLate);
    
    // process rental through the library
    library.addTransaction(rental);
    
    // calculate fees and costs
    double amount;
    
    amount = library.getTotalLateFees();
    System.out.println("Total late fees are " + amount);  // 14 days * 0.75 is 10.5
    
    amount = library.getTotalRentalCosts();
    System.out.println("Total rental costs are " + amount);  // zero since magazines are not rentals
    
    // create a laptop, rent it out to same customer, re-calculate fees
    name = "Laptop #1";
    double rentalCost = 7.0;
    Laptop laptop = new Laptop(name, rentalCost);
    days = 3;
    daysLate = 10;
    rental = new Rental(laptop, customerID, days, daysLate);
    library.addTransaction(rental);
    System.out.println("Total late fees are " + library.getTotalLateFees());  // 10.5 + 5*10 + 0.2*7 = 61.9
    System.out.println("Total rental costs are " + library.getTotalRentalCosts());  // 7
    
    // clone a laptop and rent it out
    Laptop laptop2 = (Laptop) laptop.clone();
    System.out.println(laptop.toString());
    System.out.println(laptop2.toString());
    if (laptop2.equals(laptop)) {
      System.out.println("laptops are the same");
    } else {
      System.out.println("laptops are different");
    }
    laptop2.setRentalCost(4.0);
    System.out.println(laptop2.toString());
    rental = new Rental(laptop2, customerID, days, daysLate);
    library.addTransaction(rental);
    System.out.println("Total late fees are " + library.getTotalLateFees());  
    System.out.println("Total rental costs are " + library.getTotalRentalCosts());  
  }
  
}