package library;

public abstract class Item {
  
  private static int IDcount = 0;
  private int ID;
  private String name;
  
  public Item(String name) {
    IDcount++;
    this.ID = IDcount;
    this.name = name;
  }
  
  public abstract double getLateFees(int days);
  
  public boolean equals(Object o) {
    if (o instanceof Item) {
      return ((Item) o).ID == this.ID;
    }
    return false;
  }
  
  public String getName() {
    return this.name;
  }
  
  public void setName(String name) {
    this.name = name;
  }
  
  public int getID() {
    return this.ID;
  }
  
  public String toString() {
    return "ID=" + ID + ", name=" + name;
  }
  
}