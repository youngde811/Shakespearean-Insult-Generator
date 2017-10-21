/*
 * insultgenerator14kyjb.h
 *
 *  Created on: Oct 6, 2017
 *      Author: Kurt Blair
 */

#ifndef INSULTGENERATOR14KYJB_H_
#define INSULTGENERATOR14KYJB_H_


#include "stdio.h"
#include <iostream>
#include <string>
#include <vector>
#include <time.h>
#include <fstream>
#include <sstream>
#include <cstdlib>

using namespace std;


class insultgenerator_14kyjb {
public:
	insultgenerator_14kyjb();
	virtual ~insultgenerator_14kyjb();

	    int initialize();
		string talkToMe();
		vector<string> generate(const int x);
		vector<string> generateAndSave(string ofile, const int y);


		vector<string> col1;
		vector<string> col2;
		vector<string> col3;
		vector<string> allCols;
		vector<string> insults;

};



#endif /* INSULTGENERATOR14KYJB_H_ */
