/*
 * fraction14kyjb.cpp
 *
 *  Created on: Oct 16, 2017
 *      Author: Kurt Blair
 */

#include "fraction14kyjb.h"
#include <iostream>
#include <fstream>
#include <cmath>

using namespace std;


//Function using euclidean algorithm to find greatest common denominator. Used in normalize()

int fraction_14kyjb::GCD(int x, int y){

if(x == 0 || y == 0){
	return 1;
} else{
	return GCD(y, x%y);
}

}


//Constructors


fraction_14kyjb::fraction_14kyjb(void){
	this->num = 0;
	this->den = 1;
}

fraction_14kyjb::fraction_14kyjb(int num){
	this->num = num;
	this->den = 1;
}

fraction_14kyjb::fraction_14kyjb(int num, int den){


	this->num = num;
	this->den = den;

	int gcd = GCD(num, den);

		this->den = this->den / gcd;
		this->num = this->num / gcd;



}

//Getters and Setters

int fraction_14kyjb::getNumerator(void){
	return this->num;
}

int fraction_14kyjb::getDenominator(void){
	return this->den;
}

void fraction_14kyjb::setNumerator(int D){
	this->den = D;
}

void fraction_14kyjb::setDenominator(int N){
	this->num = N;
}



//Function to Normalize Fractions

fraction_14kyjb fraction_14kyjb::normalize(void){

	int d = this->den;
	int n = this->num;
	int gcd = GCD(n, d);

	this->den = this->den / gcd;
	this->num = this->num / gcd;

	return *this;

}

fraction_14kyjb fraction_14kyjb::assign(void){
int gcd = GCD(num, den);

if(((this->num >0) && (this->num>0)) || ((this->num <0) && (this->num<0))){
this->den = abs(this->den / gcd);
this->num = abs(this->num / gcd);
} else{
	this->den = abs(this->den / gcd);
	this->num = abs(this->num / gcd)* (-1);
}

return *this;
}

//Unary Operators:

fraction_14kyjb fraction_14kyjb::operator++(void) {
	this->num = this->num + 1;
	return *this;
}



fraction_14kyjb fraction_14kyjb::operator-(void){
	this-> num = this->num * -1;
	return *this;
}



//Binary Operators:

fraction_14kyjb fraction_14kyjb:: operator+(fraction_14kyjb input){

	fraction_14kyjb output;

	if(this->den == output.getDenominator()){
		output.setDenominator(this->den);
		output.setNumerator(this->num + input.getNumerator());
	} else{
		output.setDenominator(this->den * input.getDenominator());
		output.setNumerator((this->num * input.getDenominator())+ (this->den * input.getNumerator()));
	}

	output.normalize();
	return output;

}

fraction_14kyjb fraction_14kyjb::operator-(fraction_14kyjb input){

	fraction_14kyjb output;

	if(this->den == output.getDenominator()){
			output.setDenominator(this->den);
			output.setNumerator(this->num - input.getNumerator());
		} else{
			output.setDenominator(this->den * input.getDenominator());
			output.setNumerator((this->num * input.getDenominator())- (this->den * input.getNumerator()));
		}

	 output.normalize();
     return output;

	}

fraction_14kyjb fraction_14kyjb::operator*(fraction_14kyjb input){

	fraction_14kyjb output;

	output.setDenominator(this->den * input.getDenominator());
	output.setNumerator(this->num * input.getNumerator());

	output.normalize();
	return output;

}

fraction_14kyjb fraction_14kyjb::operator/(fraction_14kyjb input){

	fraction_14kyjb output;

	output.setNumerator(this->num * input.getDenominator());
	output.setDenominator(this->den * input.getNumerator());

	output.normalize();
	return output;

}


fraction_14kyjb fraction_14kyjb::operator+=(fraction_14kyjb input){

	if(this->den == input.getDenominator()){
		this->num = this->num + input.getDenominator();
	}else {
		this-> den = this->den * input.getDenominator();
		this-> num = (this->num * input.getDenominator())+ (this->den * input.getNumerator());
	}

	    int gcd = GCD(this->num, this->den);

		this->den = this->den / gcd;
		this->num = this->num / gcd;


	return *this;

}



fraction_14kyjb fraction_14kyjb::operator-=(fraction_14kyjb input){


	if(this->den == input.getDenominator()){
		this->num = this->num + input.getDenominator();
	}else {
		this-> den = this->den * input.getDenominator();
		this-> num = (this->num * input.getDenominator())- (this->den * input.getNumerator());
	}

	 int gcd = GCD(this->num, this->den);

			this->den = this->den / gcd;
			this->num = this->num / gcd;


	return *this;

}


bool fraction_14kyjb::operator<(fraction_14kyjb input){

	double a = this->num / this->den;
	double b = input.getNumerator()/input.getDenominator();

	if (a<b){
		return true;
	}else
		return false;

}

bool fraction_14kyjb::operator<=(fraction_14kyjb input){

	double a = this->num / this->den;
	double b = input.getNumerator()/input.getDenominator();

	if (a<=b){
		return true;
	}else
		return false;

}

bool fraction_14kyjb::operator==(fraction_14kyjb input){

	double a = this->num / this->den;
	double b = input.getNumerator()/input.getDenominator();

	if (a==b){
		return true;
	}else
		return false;

}


bool fraction_14kyjb::operator!=(fraction_14kyjb input){

	double a = this->num / this->den;
	double b = input.getNumerator()/input.getDenominator();

	if (a != b){
		return true;
	}else
		return false;

}

bool fraction_14kyjb::operator>=(fraction_14kyjb input){

	double a = this->num / this->den;
	double b = input.getNumerator()/input.getDenominator();

	if (a>=b){
		return true;
	}else
		return false;

}

bool fraction_14kyjb::operator>(fraction_14kyjb input){

	double a = this->num / this->den;
	double b = input.getNumerator()/input.getDenominator();

	if (a>b){
		return true;
	}else
		return false;

}


ostream &operator<<(ostream &output, fraction_14kyjb& fraction){
	output << fraction.getNumerator() << " / " << fraction.getDenominator();
	return output;
}

istream &operator>>(istream &input, fraction_14kyjb& fraction ){

    input >> fraction.getNumerator() >> " / " >>fraction.getDenominator();
 	return input;

}

int main(){



}




fraction_14kyjb::~fraction_14kyjb() {
	// TODO Auto-generated destructor stub
}

