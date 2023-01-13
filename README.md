# ys-love-letters: Set Up
        A step by step guide on how to set up Love Letters for Yellow Shirts. There are 2 major components to Love Letters
## A. Google Form

        The google form is for squaddies to write Love Letters to any another squaddie in any DS in the program. The google form should have 4 questions in total. 

#### 1. Which DS is the recipient of this letter in?

* This is a question for squaddies to indicate the DS that their love letter 
recipient is in. 

* It needs to be a multiple choice question, because each 
answer (which corresponds to a DS) should lead to a unique section.

#### 2. Name of recipient 

* This is a question for squaddies to select the recipient in the particular DS
to write a Love Letter to. 
* There should be as many sections with this question as there are DSs, each 
section corresponding to each DS
* Each section should have a drop down menu of every squaddie in the respective 
DS to choose as a recipient

#### 3. Message

* A simple long answer text of the message that the squaddie wants to send to
the recipient 

#### 4. Sender (Optional)

* An optional short answer text of the sender's name if they wish to let the 
recipient know who sent them a love letter

## B. Google Apps Script 

        A Google Apps Script function that compiles the inputs from the google form into a Google Doc. Each Google Doc is named and corresponds to a squaddie who has received love letters

* You can find the script in the file named "forms-script.js" given by LnA
* 

#### 1. Viewing responses in a Google Sheet
* Click on the Responses tab when editting the Google Form (note: you must be an editor to be able to see this tab
* In the top right of the Responses tab, there is a Google Sheets icon that lets you view responses in a Google Sheet. 
* This Google Sheet will automatically compile all the submissions of the Google Form
#### 2. Adding a Google Apps script
* In the Google Sheet, go to Extensions -> Apps Script
* You will be directed to an Apps Script project on the Editor tab with an empty file called Code.gs
* Copy and paste the function "autoFillGoogleDocFromForm(e)" provided by LnA into this file
* Save the project

#### 3. Connecting this script to the Google Form
* Go to the Triggers tab directly underneath the Editor tab (it should have a clock icon)
* Add a new trigger 
* Choose the "autoFillGoogleDocFromForm" function to run
* Choose the "Head" deployment to run
* Select "From spreadsheet" as the source
* Select "On form submit" as the event type and save
* On every submission of the Google Form, the function will run
* You can check to make sure the function is running on the "Executions" tab, directly below the Triggers tab
* Submit some test inputs in the Google Form and check that this submission shows a new execution in the executions tab

## C. Love Letters Folder

        Some documentation on how the Love Letters folder should be structured to make sure the function behaves the way it should and creates Love Letters in the correct DS folders
        
* The Love Letters folder should have 3 main items 
    #### 1. The Yellow Shirts Love Letters Google Form
    #### 2. The Yellow Shirts Love Letters Google Sheet 
    #### 3. A folder for each DS (NOTE: The function will automatically create a folder for a DS if one doesn't exist yet)
    * Each DS folder should have 1 Google Doc for each squaddie that has received a Love Letter
    #### 4. The Love Letters Google Doc template

## D. What the function does
* Collects the Google Form inputs from the Google Sheet and determines the DS and recipient squaddie
* Searches the Love Letters folder and determines if the DS has a folder yet or not 
* If the DS does NOT have a folder, the function will create one
* If the DS DOES have a folder, the function will then create a new copy of the Love Letters Google Doc template - named after the recipient squaddie
* After successfully creating a new Doc, the function inserts the message
