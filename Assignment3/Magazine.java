package library;

public class Magazine extends Book {
  
  public Magazine(String name, String[] authors, String publisher, int year) {
    super(name, authors, publisher, year);
  }
  
  public Magazine(Magazine mag) {
    this(mag.getName(), mag.getAuthors(), mag.getPublisher(), mag.getYear());
  }
  
  public double getLateFees(int days) {
    return 0.75*days;
  }
  
  public Object clone() {
    Magazine book = new Magazine(this.getName(), this.getAuthors(), this.getPublisher(), this.getYear());
    return book;
  }
}