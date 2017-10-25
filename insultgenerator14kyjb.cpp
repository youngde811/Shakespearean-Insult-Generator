/*
 * insultgenerator14kyjb.cpp
 *
 *  Created on: Oct 1, 2017
 *      Author: Kurt Blair
 */


#include <stdio.h>
#include <stdlib.h>

#include <iostream>
#include <string>
#include <vector>
#include <time.h>
#include <stdio.h>
#include "insultgenerator14kyjb.h"

using namespace std;

// initialize() loads all the source phrases from the InsultsSource.txt file into the attributes.
// If the file cannot be read, the method should throw an exception.


int insultgenerator_14kyjb::initialize() {



	string line;
	ifstream insultFile("InsultsSource.txt");

	if (insultFile.fail()) {

		cout << "File Error" << endl;
		return 0;
	}

	stringstream sstream;

	//While loop which ends when eof (end of file) returns true

	while (!insultFile.eof()) {

		getline(insultFile, line);
		sstream.clear();
		sstream.str(" ");
		sstream << line;
		while ((sstream >> line)) {

		  allCols.push_back(line);

		}
	}

	for (int i = 0; i < allCols.size(); i = i + 3) {
		col1.push_back(allCols[i]);
		col2.push_back(allCols[i+1]);
		col3.push_back(allCols[i+2]);
	}
	insultFile.close();

}

// Chooses a random insult from each column and strings them together to make an insult which is returned

string insultgenerator_14kyjb::talkToMe() {

	int random1 = rand() % 50 + 1;
	int random2 = rand() % 50 + 1;
	int random3 = rand() % 50 + 1;

	string insult = "Thou " + col1[random1] + " " + col2[random2] + col3[random3] + " !";

	return insult;

}

//Call talkToMe() to generate a random insult


vector<string> insultgenerator_14kyjb::generate(int x) {

	if (x < 0 || x < 125000) {

		cout << "Number of Insults Error" << endl;
		return vector<string>();

	}
	else {
		vector<string> insults;

		while (x > insults.size()) {

			string diss = (talkToMe());
			insults.push_back(diss);

		}
	}

	return insults;

}

vector <string> insultgenerator_14kyjb::generateAndSave(string ofile, int y) {

	ofstream outFile(ofile);


	if (y < 0 || y < 125000) {

		cout << "Number of Insults Error" << endl;
		return vector<string>();

	}

	else {

		while (y > insults.size()){

			string disss = talkToMe();
			insults.push_back(disss);
			outFile << disss;
			outFile << "/n";

		}

	}

	return insults;
}


int main() {


	insultgenerator_14kyjb ig;

	ig.initialize();
	ig.generate(8);

	string g = ig.talkToMe();

	cout << g << endl;

	return 0;

}

