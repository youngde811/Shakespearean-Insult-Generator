 package library;

public class Textbook extends Book {
  
  public Textbook(String name, String[] authors, String publisher, int year) {
    super(name, authors, publisher, year);
  }

  public Textbook(Textbook txbk) {
    this(txbk.getName(), txbk.getAuthors(), txbk.getPublisher(), txbk.getYear());
  }

  public double getLateFees(int days) {
    return 1.0*days;
  }

  public Object clone() {
    Textbook book = new Textbook(this.getName(), this.getAuthors(), this.getPublisher(), this.getYear());
    return book;
  }
}