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
	string id;
	string topic;
	string status;
	string speaker;
	string category;
	string place;
	string description;
	string vote;
	string imageURL;
	int over = 10;

	while(1){
		cout << "id: ";
		getline(cin,id);
		cout << "topic: ";
		getline(cin,topic);
		cout << "status: ";
		getline(cin,status);
		cout << "speaker: ";
		getline(cin,speaker);
		cout << "category: ";
		getline(cin,category);
		cout << "place: ";
		getline(cin,place);
		cout << "description: ";
		getline(cin,description);
		cout << "vote: ";
		getline(cin,vote);
		cout << "imageURL: ";
		getline(cin,imageURL);

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
	fprintf(fp, "\"id\" : \"%s\",\n", id.c_str());
	align(1);
	fprintf(fp, "\"topic\" : \"%s\",\n", topic.c_str());
	align(1);
	fprintf(fp, "\"status\" : \"%s\",\n", status.c_str());
	align(1);
	fprintf(fp, "\"speaker\" : \"%s\",\n", speaker.c_str());	
	align(1);
	fprintf(fp, "\"category\" : \"%s\",\n", category.c_str());	
	align(1);
	fprintf(fp, "\"place\" : \"%s\",\n", description.c_str());
	align(1);
	fprintf(fp, "\"description\" : \"%s\",\n", description.c_str());		
	align(1);
	fprintf(fp, "\"vote\" : \"%s\",\n", vote.c_str());	
	align(1);
	fprintf(fp, "\"imageURL\" : \"%s\"\n", imageURL.c_str());	

	fprintf(fp, "}\n");
}

void align(int numberOfRecursive){
	int n;
	for(n=0;n<numberOfRecursive;n++)
		fprintf(fp,"    ");
}
