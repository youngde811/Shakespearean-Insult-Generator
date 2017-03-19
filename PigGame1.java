import javax.swing.JOptionPane;

public class PigGame1 {
	
	public static int score = 0;
    public static boolean turn = true;

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		
		int turnscore = 0;
		
		
		
		// Choosing Yes will make selection 0. No will make Selection 1
		
		while (turn == true){
			int result = 0;
			int num1 = roll();
			int num2 = roll();
			
			result = check(num1, num2);
			
			if(result == 0){
				JOptionPane.showMessageDialog(null, "Double Zeros! Your score is set to 0 and your turn is over!!", "Double Zeros! Your score is set to 0 and your turn is over!!", JOptionPane.ERROR_MESSAGE);
				turnscore = 0;
				score = 0;
				turn = false;
			}
			
			if(result == -1){
				JOptionPane.showMessageDialog(null, "You rolled a Zero! Your turn is over", "Your final score is" + score, JOptionPane.ERROR_MESSAGE);
				  turnscore = 0;
				  turn = false; 
				  
				  
				  
				  
				  
				  
				  
				  
				
			}
			
			if(result == 2){
				
				 turnscore = num1 + num2;
				  score = score + turnscore;
				JOptionPane.showMessageDialog(null, "You rolled a doubles! ReRoll!!!", "You rolled a doubles! ReRoll!!!", JOptionPane.ERROR_MESSAGE);
				  	   turn = true;
			}
			
		if (result == 1){
			
			  turnscore = num1 + num2;
			  score = score + turnscore;
			  
			  System.out.println("Your Turnscore is:" + turnscore);
			
			int Selection = JOptionPane.showConfirmDialog(null, 
					"Would You like to Roll Again?", "Would You like to Roll Again?", JOptionPane.YES_NO_OPTION);
			
			if (Selection == 1){
				
				turn = false;
				
			}
			
		}	
			
		}
	
		System.out.println("Your Final Score is: " + score);
		

	}

	public static int roll(){
		
		int randomNum = (int)(Math.random() * 6); 
		return randomNum;
		
	}
	
	public static int check(int num1, int num2){
	
		if ((num1 == 0) && (num2 == 0)){
   		return 0;
		}
		
	   if((num1 == 0) || (num2 ==0)){
		  return -1;
	   }
	   
	   if(num1 == num2){
		   return 2;
	   }
	   
	   
	   else {
		   return 1;
	   }
		
	}
	
	
}
