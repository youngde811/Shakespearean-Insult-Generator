import java.util.Scanner;
import java.io.File;
import java.io.FileNotFoundException;
import javax.swing.JOptionPane; 
import java.io.IOException;
import java.io.PrintWriter;

public class Matrix {
    // m is number of rows
 private int m ;
 // n is number of columns
 private int n ;
 public double [][] array;
 
 //Matrix Constructor
 
  public Matrix(int m, int n) {
         this.m = m;
         this.n = n;
         array = new double[m][n];
  }
  
  public Matrix(){
   Scanner scan = new Scanner(System.in); 
   
      // Get size of the matrix
      
      System.out.println("Please enter how many rows desired in Matrix");
      int m = scan.nextInt();
      
      System.out.println("Please enter how many columns desired in Matrix");
      int n = scan.nextInt();
      
         double[][] array = new double[m][n]; //The 2D array 
         System.out.println("Please enter "+ (m*n) + " integers separated by spaces:"); 
         
         //For loop to fill array
         
         for(int row = 0; row < m; row++) //row 
         { 
                 for(int column = 0; column < n; column++) //column 
                 { 
                         array[row][column] = scan.nextInt(); //This will read the line of integers and fill all positions in the array. 
                 } 
         }
         
        scan.close();
         
  }
  
  
  public Matrix(File file) throws FileNotFoundException{
    
	 
   Scanner in = new Scanner(new File("test.txt"));
   
   //Get size of matrix
   
   int m = in.nextInt();
   int n = in.nextInt();
   
   double[][] array = new double[m][n];
   
   //Nested for loop Reading in the array
   
    for(int row = 0; row < m; row++) //row 
         { 
                 for(int column = 0; column < n; column++) //column 
                 { 
                         array[row][column] = in.nextDouble(); //This will read the line of integers and fill all positions in the array. 
                 } 
         }
   in.close();
  }
  

  
  
  // create matrix based on 2d array
  
     public Matrix(double[][] array) {
         m = array.length;
         n = array[0].length;
         this.array = new double[m][n];
         for (int i = 0; i < m; i++)
             for (int j = 0; j < n; j++)
                     this.array[i][j] = array[i][j];
     }

     
     //Initializing Getters
              
   public int getN(){
   return this.n;
  }
  
  public int getM(){
   return this.m;
  }
 
  public double get(int i, int j){    
   return this.array[i][j];  
  }
  
  //Matrix Addition Constructor
  
    public Matrix add(Matrix B) {
     
         Matrix A = this;
         
         //Stop if matrix dimensions are illegal
         
         if (B.m != A.m || B.n != A.n){ 
          JOptionPane.showMessageDialog(
                  null, "Matrix Dimensions not allowed", "ErrorMsg", JOptionPane.ERROR_MESSAGE);
         }
        
         Matrix C = new Matrix(m, n);
         
         //Nested For loop to fill Matrix C with the addition result
         
         for (int i = 0; i < m; i++){
             for (int j = 0; j < n; j++){
                 C.array[i][j] = A.array[i][j] + B.array[i][j];
             }
         }
         return C;
     } 
   
  //Matrix Subtraction 
    
     public Matrix subtract(Matrix B) {
      
         Matrix A = this;
         
         //Stop if matrix dimensions are illegal
         
         if (B.m != A.m || B.n != A.n){
          JOptionPane.showMessageDialog(
                  null, "Matrix Dimensions not allowed", "ErrorMsg", JOptionPane.ERROR_MESSAGE);
         }
         
         Matrix C = new Matrix(m, n);
         
         //Nested For loop to fill Matrix C with the subtraction result
         
         for (int i = 0; i < m; i++){
             for (int j = 0; j < n; j++){
                 C.array[i][j] = A.array[i][j] - B.array[i][j];
             }
         }
         return C;
     }
  
     //Matrix Multiplication
     
     public Matrix multiply(Matrix B) {
      
         Matrix A = this;
         
       //Stop if matrix dimensions are illegal
         
         if (A.n != B.m){
          JOptionPane.showMessageDialog(
                  null, "Matrix Dimensions not allowed", "ErrorMsg", JOptionPane.ERROR_MESSAGE);
         }
         Matrix C = new Matrix(A.m, B.n);
         
         //Nested For loop to fill Matrix C with the multiplication Product
        
         for (int i = 0; i < C.m; i++){
             for (int j = 0; j < C.n; j++){
                 for (int k = 0; k < A.n; k++){
                    C.array[i][j] += (A.array[i][k] * B.array[k][j]);
                 }
             } 
         }
         return C;   
     }
     
     
     public Matrix multiply(double x){
      
      Matrix C = new Matrix(m,n);
      
      //Nested For loop to fill new array with the product of scalar matrix multiplication
      
         for (int i = 0; i < m; i++){
             for (int j = 0; j < n; j++){
                 C.array[i][j] = (array[i][j])*x;
             }
         }
         return C;
     }
     
     
     public double determinant()  {
    	 
    	//Stop if matrix dimensions are illegal
    	 
         if (!isSquare()){
          JOptionPane.showMessageDialog(
                  null, "Matrix needs to be square", "ErrorMsg", JOptionPane.ERROR_MESSAGE);
         }
         
         //Return determinant depending on the three matrix sizes given
         
         if (m == 1) {
      return array[0][0];
         }
         if (m == 2) {
             return (array[0][0] * array[1][1]) - ( array[0][1] * array[1][0]);
         }
         if (m == 3){
          return ((array[0][0]) * (array[1][1] * array[2][2]) - (array[2][1] * array[1][2]))
            - (array[0][1] * (array[1][0] * array[2][2]) - (array[1][2] * array[2][0]))
            - (array[0][2] * ((array[1][0] * array[2][1]) - (array[1][1] * array[2][0])))
            ;
         }
         
         //Error message if size not allowed
         
         else {
          JOptionPane.showMessageDialog(
                  null, "Can only computer matrices up to 3x3", "ErrorMsg", JOptionPane.ERROR_MESSAGE);
         }
         return 0;
     } 
     

     Matrix inverse(){
      
    	//Stop if matrix dimensions are illegal
    	 
       if (n != m){
           JOptionPane.showMessageDialog(
                   null, "Matrix needs to be square", "ErrorMsg", JOptionPane.ERROR_MESSAGE);
          }
       
       Matrix matrix = new Matrix(m, m);
       
     //Alter Matrix depending on the three matrix sizes given
       
       if (m == 1) {
        matrix.array[0][0] = 1.0/ this.array[0][0];
           }
       
       if (m == 2) {
           double temp  = array[0][0];
           matrix.array[0][0] = array[1][1];
           matrix.array[1][1] = temp;
           matrix.array[0][1] *= -1;
           matrix.array[1][0] *= -1;    
           matrix = matrix.multiply(1.0/determinant());
           }
      
       if (matrix.m == 3){
        
        //first row 
       matrix.array[0][0] = (array[1][1]*array[2][2]) - (array[1][2]*array[2][1]);
       matrix.array[0][1] = (array[0][2]*array[2][1]) - (array[0][1]*array[2][2]);
       matrix.array[0][2] = (array[0][1]*array[1][2]) - (array[0][2]*array[1][1]);
       
       //second row
       matrix.array[1][0] = (array[1][2]*array[2][0]) - (array[1][0]*array[2][2]);
       matrix.array[1][1] = (array[0][0]*array[2][2]) - (array[0][2]*array[2][0]);
       matrix.array[1][2] = (array[0][2]*array[1][0]) - (array[0][0]*array[1][2]);

       //third row
       matrix.array[2][0] = (array[1][0]*array[2][1]) - (array[1][1]*array[2][0]);
       matrix.array[2][1] = (array[0][1]*array[2][0]) - (array[0][0]*array[2][1]);
       matrix.array[2][2] = (array[0][0]*array[1][1]) - (array[0][1]*array[1][0]);
       
       matrix = matrix.multiply(1.0/(determinant()));
       }
     return matrix;  
     }
     
     //Matrix Division, Calling other classes
     
     public Matrix divide(Matrix B){
      
      return this.multiply(B.inverse());
         
     }
     
     //Checks if Matrix is Square
     
     public boolean isSquare(){
      if(m == n){
       return true;
      }
      
      else {
       return false;
      }
     }
     
     public Matrix transpose() {
         Matrix A = new Matrix(m, n);
         for (int i = 0; i < n; i++){
             for (int j = 0; j < m; j++){
                 A.array[j][i] = array[i][j];
             }
         }
         return A;
     }
     
     
     public static double [][] identity(int size) {
       double[][] a = new double[size][size];
      for (int i = 0; i < size; i++){
             for (int j = 0; j < size; j++){
                if(i==j){
                a[j][i] = 1; 
                }
                else{
                 a[j][i] = 0;
                }
             }
         }
      return a;
     }
     
     //Matrix to string method
     
     public String toString() {
       String elements = "";
             for (int i = 0; i < n; i++){
             for (int j = 0; j < m; j++){
               if (j==0) {
               elements = elements + array[i][j];
               } else {
               elements = elements + ", " + array[i][j];
               }
             }
             elements = elements + "\n";
             }

       return n + ", " + m + "\n" + elements;
     }
     
     //Print Matrix Method
     
     public void print(String filename) {
       try {
         PrintWriter writer = new PrintWriter(filename, "UTF-8");
         writer.println(this.toString());
         writer.close();
       } catch (IOException e) {
         JOptionPane.showMessageDialog(
              null, "Cannot print to file " + filename, "ErrorMsg", JOptionPane.ERROR_MESSAGE);       }
     }
         
      public static void main(String[] args)  {
        Matrix matrix = new Matrix(3, 3);
        System.out.println(matrix.toString());
        matrix.print("array.txt");
        Matrix identity = new Matrix(Matrix.identity(2));  // uses constructor Matrix(double[][])
        System.out.println(identity.toString());
        Matrix inverse = identity.inverse();
        System.out.println(inverse.toString());
      }

}
  
  

