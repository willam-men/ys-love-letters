function autoFillGoogleDocFromForm(e) {

  const templateName = "Love Letters Template";

  // collecting the google form inputs
  var formInput = e.namedValues;
  console.log(formInput);

  // getting the ds of the recipient
  var dsName = formInput['Which DS is the recipient of this letter in?'][0];
  console.log(dsName);

  // determining which column in the love letters spreadsheet belongs to the ds
  let i = 0;
  switch(dsName) {
    case "Bandas":
      i = 1;
      break;
    case "Cardiors":
      i = 2;
      break;
    case "Caritours":
      i = 3;
      break;
    case "Ciplets":
      i = 4;
      break;
    case "Dopherz":
      i = 5;
      break;
    case "Exaris":
      i = 6;
      break;
    case "Hisenders":
      i = 7;
      break;
    case "Marakkas":
      i = 8;
      break;
    case "Marvelirs":
      i = 9;
      break;
    case "Mountaineers (OT)":
      i = 10;
      break;
    case "Slikkas":
      i = 11;
      break;
    case "Trixies":
      i = 12;
      break;
  }

  console.log("i is " + i);

  // extracting all the google form inputs corresponding to the ds
  var recipient = formInput['Name of recipient '][i-1];
  console.log("recipient " + recipient);
  var sender = formInput['Sender Name (optional)'][i-1];
  console.log("sender " + sender);
  var msg = formInput['Message '][i-1];
  console.log("msg " + msg);

  // get Love Letters responses spreadsheet ID
  var loveLettersSpreadsheetId =  SpreadsheetApp.getActiveSpreadsheet().getId();

  // get Love Letters responses spreadsheet file
  var loveLettersSpreadsheetFile =  DriveApp.getFileById(loveLettersSpreadsheetId); 

  // get the folder ID that has the spreadsheet file (i.e. the Love Letters folder)
  var loveLettersFolderId = loveLettersSpreadsheetFile.getParents().next().getId();

  // get the Love Letters folder
  var loveLettersFolder = DriveApp.getFolderById(loveLettersFolderId);

  // IF the DS that was inputted into the form does not have a folder yet (no love letters) 
  // create a folder for that DS
  if (!loveLettersFolder.getFoldersByName(dsName).hasNext()) {
    loveLettersFolder.createFolder(dsName);
  }

  // otherwise, get the DS folder according to the input from the form
  var dsLoveLettersFolder = DriveApp.getFoldersByName(dsName).next();

  // if the DS folder does not have a google doc file with the name of the recipient 
  // if (!dsLoveLettersFolder.getFilesByName(recipient + ' - YS Love Letters').hasNext()) {
  //   console.log(recipient + ' - YS Love Letters');
  //   DriveApp.createFile(recipient + ' - YS Love Letters', 'Hello, world!');
  // } else {
  //   console.log('rip');
  // }

  // Create new document if squaddie does not have one yet
  if (!dsLoveLettersFolder.getFilesByName(recipient + ' - YS Love Letters').hasNext()) {
    console.log("Squaddie does not have a document yet. Making it now. If program breaks after this, check that the template exists in the root folder");

    let template = DriveApp.getFileById(loveLettersFolder.getFilesByName(templateName).next().getId());
    console.log(template.getId());
    let copy = template.makeCopy(recipient + ' - YS Love Letters', dsLoveLettersFolder);

    let doc = DocumentApp.openById(copy.getId());
    let body = doc.getBody();
    body.replaceText('{{Recipient}}', recipient);
    body.replaceText('{{DS Name}}', dsName);

    doc.saveAndClose();
    console.log("Document made successfully!");
  }

  console.log("Getting squaddie's document... If it fails on the next line, then the file does not exist and was not created successfully :(");
  let file = dsLoveLettersFolder.getFilesByName(recipient + ' - YS Love Letters').next();
  let doc = DocumentApp.openById(file.getId());
  
  console.log("Got document! Adding message...");
  let body = doc.getBody();
  let para = body.appendParagraph(msg);
  para.setAlignment(DocumentApp.HorizontalAlignment.CENTER);
  if (sender != '') {
    let para = body.appendParagraph(sender);
    para.setAlignment(DocumentApp.HorizontalAlignment.CENTER);
  }
  para = body.appendParagraph("");
  para.setAlignment(DocumentApp.HorizontalAlignment.CENTER);
  
  doc.saveAndClose();
  console.log("Added message! Script is done.");
}
