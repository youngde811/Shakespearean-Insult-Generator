package library;

public class Book extends Item {
  
  protected String[] authors;
  protected String publisher;
  protected int year;
  
  public Book(String name, String[] authors, String publisher, int year) {
    super(name);
    this.authors = authors;
    this.publisher = publisher;
    this.year = year;
  }

  public Book(Book bk) {
    this(bk.getName(), bk.getAuthors(), bk.getPublisher(), bk.getYear());
  }
  
  public double getLateFees(int days) {
    return 0.5*days;
  }
  
  public Object clone() {
    Book book = new Book(this.getName(), this.getAuthors(), this.getPublisher(), this.getYear());
    return book;
  }
   
  public String[] getAuthors() {
    return this.authors;
  }
  
  public void setAuthors(String[] authors) {
    this.authors = authors;
  }

  public String getPublisher() {
    return this.publisher;
  }
  
  public void setPublisher(String publisher) {
    this.publisher = publisher;
  }
  
  public int getYear() {
    return this.year;
  }
  
  public void setYear(int year) {
    this.year = year;
  }
  
  public String toString() {
    return super.toString() + ", authors=" + authors.toString() + ", publisher=" + publisher + ", year=" + year;
  }
}