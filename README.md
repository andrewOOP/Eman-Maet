# Eman-Maet


## Enhancements Prior to Production
* Transpose Send Email functionality to Session and Event
* Currently the email functionality only exists for Teams.
* The logic can be found in TeamList.js and TeamEmailController.cs for the button action/function call and database access, respectively.
* This logic simply needs to be duplicated and slightly altered (change some path names and sql statements to get appropriate data) to fit the Session and Event scenarios.
* Check-Ins are not timegated
* Currently you can check-in to a session at any time, so timegates would need to be added.
* Event Coordinator Functionality
* Currently all Admins can access and edit all events. We had stated that Admins would be able to assign Users as Event Coordinators and those Users would have special permissions to Edit the Events.
* This division of power does not currently exist in the system.
* The necessary table exists in the database, but front-end and back-end functionality does not. 
* Generate Report
* This functionality does not exist in the system currently.
* Information about an Event or Session can be seen in their respective Details pages, but no printable, formatted, .pdf version exists in the system.
* Page and Password Encryption
* No security is present in the system outside of:
* The values of password fields cannot be seen
* Pages will check if the user is an Administrator or User to allow or deny various permissions per page
* The User ID is passed between pages using a cookie to show relevant data in tables. If this is not the preferred method of passing data, this feature should be changed.
* No pages are encrypted

## In depth Repository Overview
* Eman-Maet → ClientApp → src → App.js
  * On this page you will find the paths to the components. Any new components’ paths will need to be added here.
  * Eman-Maet → ClientApp → src → components
  * In this folder you will find each of the web pages and their CSS pages.
  * In a MVC pattern, these pages are our Views.
* Eman-Maet → Controllers
  * In this folder you will find each controller used to execute various database queries to access and alter data. 
* Eman-Maet → Models
  * In this folder you will find each model used in the system.
  * If you wish to change the data retrieved by controllers. You may need to either change current models or create a new one.
* Eman-Maet → Startup.cs
  * This file is executed at runtime. It configures the build and root paths.

## Installations
You will need to install NodeJS, React Table, React Tabs, Rimraf
* Install NodeJS (recommended version)
  * https://nodejs.org/en/ 
* Once you have cloned the GitHub Repository, in the ClientApp folder, run these commands on the command line
  * npm install
  * npm install rimraf -g
  * npm i react-table
  * npm i prop-types
  * npm i react
  * npm i react-dom
  * npm install --save react-tabs
* You will need a MySQL database
  * Server: localhost
  * Database: codeathon
  * UID: root
  * Password: iamroot
  * SslMode: none
  * allowPublicKeyRetrieval: true

Once you have created a database schema named ‘codeathon’ under the user ‘root’ with password ‘iamroot’, run the SQL scripts at the bottom of the document inside the codeathon schema in MySQL
* [NOTE] if you want to change the username or password in MySQL, you will need to change the connection strings in each of the Controllers

Finally, you will need a default email client installed (we have tested with Gmail but it is said to work with others as well) and make sure that client is allowed full access to links.
* To allow this in Gmail, follow the steps provided here:
  * https://blog.hubspot.com/marketing/set-gmail-as-browser-default-email-client-ht

## Known Issues/Limitations
* If the user does not have a default email client with link permissions allowed, the Send Email link on the Team List page will not respond
* No other issues are known.


## SQL SCRIPTS

Table Creation

CREATE TABLE IF NOT EXISTS  company(
    companyID INT AUTO_INCREMENT,
    companyName VARCHAR(255) NOT NULL,
    companyContact VARCHAR(255),
    inactive TINYINT NOT NULL,
    PRIMARY KEY (companyID)
);
CREATE TABLE IF NOT EXISTS
location(
    locationID INT AUTO_INCREMENT,
    companyID INT NOT NULL,
    locationName VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    state VARCHAR(2) NOT NULL,
    zip VARCHAR(5) NOT NULL,
    inactive TINYINT NOT NULL,
    PRIMARY KEY (locationID)
);
CREATE TABLE IF NOT EXISTS
user(
    userID INT AUTO_INCREMENT,
    companyID INT NOT NULL,
    fName VARCHAR(255),
    lName VARCHAR(255),
    securityRole VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    inactive TINYINT NOT NULL,
    PRIMARY KEY (userID)
);
CREATE TABLE IF NOT EXISTS
userTeam(
    userTeamID INT AUTO_INCREMENT,
    userID INT NOT NULL,
    companyID INT NOT NULL,
    PRIMARY KEY (userTeamID)
);
CREATE TABLE IF NOT EXISTS
team(
    teamID INT AUTO_INCREMENT,
    companyID INT NOT NULL,
    teamName VARCHAR(255) NOT NULL,
    teamJob VARCHAR(255),
    inactive TINYINT NOT NULL,
    PRIMARY KEY (teamID)
);
CREATE TABLE IF NOT EXISTS
eventCoordinator(
    eventCoordinatorID INT AUTO_INCREMENT,
    eventID INT NOT NULL,
    userID INT NOT NULL,
    PRIMARY KEY(eventCoordinatorID)
);
CREATE TABLE IF NOT EXISTS
sessionAttendance(
    sessionAttendanceID INT AUTO_INCREMENT,
    sessionID INT NOT NULL,
    userID INT NOT NULL,
    rsvpCheckin VARCHAR(255) NOT NULL,
    PRIMARY KEY(sessionAttendanceID)
);
CREATE TABLE IF NOT EXISTS
sessionTeam(
    sessionTeamID INT AUTO_INCREMENT,
    sessionID INT NOT NULL,
    teamID INT NOT NULL,
    PRIMARY KEY(sessionTeamID)
);
CREATE TABLE IF NOT EXISTS
event(
    eventID INT AUTO_INCREMENT,
    companyID INT NOT NULL,
    eventDate DATE,
    eventDescription VARCHAR(255),
    visitorCount INT,
    startTime DATETIME,
    inactive INT NOT NULL,
    PRIMARY KEY(eventID)
);

CREATE TABLE IF NOT EXISTS
session(
    sessionID INT AUTO_INCREMENT,
    eventID INT NOT NULL,
    companyID INT NOT NULL,
    locationID INT,
    sessionName VARCHAR(255),
    sessionDate DATE,
    startTime TIME,
    endTime TIME,
    Inactive INT NOT NULL
    PRIMARY KEY(sessionID)
);


Data Population

INSERT INTO `codeathon`.`company`
(`companyName`,
`companyContact`,
`inactive`)
VALUES
("Paycom","Chris",0),("OC","Andy",0);


INSERT INTO `codeathon`.`event`
(`companyID`,
`eventDate`,
`eventDescription`,
`inactive`)
VALUES
(1,"2019-02-10","Codeathon",0),(1,"2019-03-01","Company Retreat",0);


INSERT INTO `codeathon`.`user`
(`companyID`,
`fName`,
`lName`,
`securityRole`,
`email`,
`password`,
`inactive`)
VALUES
(1,"Andy","Harbert","User","andy.harbert@oc.com","programming1",0),
(1,"Homer","Simpson","Administrator","homer.simpson@marge.com","duffman",0);

INSERT INTO `codeathon`.`location`
(`companyID`,
`locationName`,
`address`,
`city`,
`state`,
`zip`,
`inactive`)
VALUES
(1,"Codeathon Complex","456 Fake Address","Edmond","OK","73003",0),
(1,"Elmo's World","123 Seasame Street","New York City","NY","12345",0);

INSERT INTO `codeathon`.`team`
(`companyID`,
`teamName`,
`teamJob`,
`inactive`)
VALUES
(1,"Eman Maet","Developement",0),(1,"The Other Team","QA",0);

INSERT INTO `codeathon`.`session`
(`eventID`,
`companyID`,
`locationID`,
`sessionName`,
`sessionDate`,)
VALUES
(1,1,1,"Coding Session 1","2019-02-10"),
(2,1,2,"Seasame Session 1","2019-03-01"); 


[NOTE] This script does not assign users to teams or check them in to sessions. That must be done from the front end.
