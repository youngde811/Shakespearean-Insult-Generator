/*
 * fraction14kyjb.h
 *
 *  Created on: Oct 16, 2017
 *      Author: Kurt Blair
 */

#include <iostream>
#include <fstream>

#ifndef FRACTION14KYJB_H_
#define FRACTION14KYJB_H_

using namespace std;

class fraction_14kyjb {
public:
	fraction_14kyjb();
	fraction_14kyjb(int);
	fraction_14kyjb(int, int);
	int getNumerator();
	int getDenominator();
	void setNumerator(int);
	void setDenominator(int);
	int GCD(int, int);
	fraction_14kyjb normalize(void);
	fraction_14kyjb assign(void);
	fraction_14kyjb operator-(void);
	fraction_14kyjb operator++(void);
	fraction_14kyjb operator+(fraction_14kyjb input);
	fraction_14kyjb operator-(fraction_14kyjb input);
	fraction_14kyjb operator*(fraction_14kyjb input);
	fraction_14kyjb operator/(fraction_14kyjb input);
	fraction_14kyjb operator+=(fraction_14kyjb input);
	fraction_14kyjb operator-=(fraction_14kyjb input);
	bool operator<(fraction_14kyjb input);
	bool operator<=(fraction_14kyjb input);
	bool operator==(fraction_14kyjb input);
	bool operator!=(fraction_14kyjb input);
	bool operator>=(fraction_14kyjb input);
	bool operator>(fraction_14kyjb input);


	virtual ~fraction_14kyjb();



private:
	int num; //numerator
	int den; //denominator
};

ostream &operator<<(ostream &output, fraction_14kyjb &input);

istream &operator>>(istream &output, fraction_14kyjb &input);

#endif /* FRACTION14KYJB_H_ */
