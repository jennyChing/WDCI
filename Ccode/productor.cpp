#include <stdio.h>
#include <string>
#include <iostream>
#include <istream>
#include <stdlib.h>

using namespace std;

void printTryTalkCollection(string id, string topic, int status, string speaker, string category, string place, string description, int vote, string imageURL);
void align(int numberOfRecursive);
FILE *fp;

int main(){


	fp = fopen("collection.json", "a+");
	string id;
	string topic;
	int status;
	string speaker;
	string category;
	string place;
	string description;
	int vote;
	string imageURL;
	int over = 10;

	while(1){

		cout << "id: ";
		stream.getline(&id[0],32);

		cout << "topic: ";
		getline(&topic[0],32);

		cout << "status: ";
		scanf("%d",&status);

		cout << "speaker: ";
		getline(&speaker[0],32);

		cout << "category: ";
		getline(&category[0],32);

		cout << "place: ";
		getline(&place[0],32);

		cout << "description: ";
		getline(&description[0],32);

		cout << "vote: ";
		scanf("%d",&vote);

		cout << "imageURL: ";
		getline(&imageURL[0],128);

		cout << "keep input? : ";
		scanf("%d",&over);

		if(over == 0)
			break;
		printTryTalkCollection(id,topic,status,speaker,category,place,description,vote,imageURL);

	}

	fclose(fp);
	return 0;
}

void printTryTalkCollection(string id, string topic, int status, string speaker, string category, string place, string description, int vote, string imageURL){


	fprintf(fp, "{\n");
	align(1);
	fprintf(fp, "\"id\" : \"%s\",\n", id.c_str());
	align(1);
	fprintf(fp, "\"topic\" : \"%s\",\n", topic.c_str());
	align(1);
	fprintf(fp, "\"status\" : \"%d\",\n", status);
	align(1);
	fprintf(fp, "\"speaker\" : \"%s\",\n", speaker.c_str());	
	align(1);
	fprintf(fp, "\"category\" : \"%s\",\n", category.c_str());	
	align(1);
	fprintf(fp, "\"place\" : \"%s\",\n", description.c_str());
	align(1);
	fprintf(fp, "\"description\" : \"%s\",\n", description.c_str());		
	align(1);
	fprintf(fp, "\"vote\" : \"%d\",\n", vote);	
	align(1);
	fprintf(fp, "\"imageURL\" : \"%s\"\n", imageURL.c_str());	

	fprintf(fp, "}\n");
}

void align(int numberOfRecursive){
	int n;
	for(n=0;n<numberOfRecursive;n++)
		fprintf(fp,"    ");
}
