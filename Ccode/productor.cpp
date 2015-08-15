#include <stdio.h>
#include <string>
#include <iostream>
#include <istream>
#include <stdlib.h>

using namespace std;

void printTryTalkCollection(string id, string topic, string status, string speaker, string category, string place, string description, string vote, string imageURL);
void align(int numberOfRecursive);
FILE *fp;

int main(){


	fp = fopen("collection.json", "a+");

	string device;
	string status;
	string category;

	int over = 10;

	while(1){

		cout << "device: ";
		getline(cin,device);
		cout << "status: ";
		getline(cin,status);
		cout << "category: ";
		getline(cin,category);

		cout << "keep input? : ";
		scanf("%d",&over);


		printTryTalkCollection(id,topic,status,speaker,category,place,description,vote,imageURL);
		if(over == 0)
			break;
	}

	fclose(fp);
	return 0;
}

void printTryTalkCollection(string id, string topic, string status, string speaker, string category, string place, string description, string vote, string imageURL){


	fprintf(fp, "{\n");
	align(1);

	fprintf(fp, "\"device\" : \"%s\",\n", device.c_str());
	align(1);
	fprintf(fp, "\"status\" : %s,\n", status.c_str());
	align(1);
	fprintf(fp, "\"category\" : \"%s\",\n", category.c_str());
	align(1);

	fprintf(fp, "}\n");
}

void align(int numberOfRecursive){
	int n;
	for(n=0;n<numberOfRecursive;n++)
		fprintf(fp,"    ");
}
