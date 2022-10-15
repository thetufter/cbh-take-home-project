# Ticket Breakdown

We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**

Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".

You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

### Ticket 1:

- Title: Create a table for FacilityAgentInfo
- Description: This table will be used to create a many-to-many relationship between Facility and Agent data models, so we can save extra information for each Agent per Facility.
- Acceptance Criteria: A database table created with 3 columns: facilityId(INT, NOT NULL), agentId(INT, NOT NULL), agentCustomId(STRING, NOT NULL, MAX 255)
- Time estimate: Implementation 1 hour, Testing: 1 hour, Total: 2 hours
- Implementation Details:
  Create a database table with the 3 columns provided in the acceptance criteria and make sure that you use the right data type. All columns cannot be NULL.

### Ticket 2:

- Title: Develop getFacilityAgentCustomId and setFacilityAgentCustomId functions
- Description: These 2 functions will be used to get and update the customId of Agent per Facility
- Acceptance Criteria: 2 functions:
  A. getFacilityAgentCustomId: 1. It accepts 2 parameters facilityId(integer) and agentId(integer) with data type validation. 2. If there is no record in FacilityAgentInfo table that matches the provided facilityId and agentId, it returns NULL. 3. If there is a record, it returns the agentCustomId(string) from that record.
  B. setFacilityAgentCustomId: 1. It accepts 3 parameters facilityId(integer), agentId(integer) and customId(string) with data type validation. 2. If there is no record in FacilityAgentInfo table that matches the provided facilityId and agentId, it creates a record with the provided parameters. 3. If there is a record, it updates the agentCustomId in that record.
- Time estimate: Implementation 2 hours, Testing: 2 hours, Total: 4 hours
- Implementation Details:
  A. Develop getFacilityAgentCustomId function with 2 mandatory parameters to get the customId of the provided Facility and Agent. Check the acceptance criteria A for more details.
  B. Develop setFacilityAgentCustomId function with 3 mandatory parameters to set the customId of the provided Facility and Agent. Check the acceptance criteria B for more details.

### Ticket 3:

- Title: Update the frontend to let Facility users update the custom id of each Agent they work with
- Description: In the app, add a field in the Agent page to allow the Facility user to update the customId of the Agent.
- Acceptance Criteria:
  1. In the Agent edit page, a text field that accepts string max length 255 chars.
  2. When the user update that field and hit save, that updates the customId of the agent using Ticket 2 functions.
  3. When the user visits the Agent page, the field shows the current value of the customId of the agent using Ticket 2 functions.
- Time estimate: Implementation 8 hours, Testing: 1 hour, Total: 9 hours
- Implementation Details: Add the text field in the Agent edit page with the data validation and logic mentioned in the acceptance criteria. Use the functions getFacilityAgentCustomId and setFacilityAgentCustomId that are developed in Ticket 2

### Ticket 4:

- Title: Update getShiftsByFacility function to include the Agent customId in the metadata
- Description: We need to fetch the customId of each Agent for the provided Facility in the metadata to be used later.
- Acceptance Criteria: In the returned metadata of each Agent, the value of the customId should be presented.
- Time estimate: Implementation 1 hour, Testing: 1 hour, Total: 2 hours
- Implementation Details: Using the functions getFacilityAgentCustomId and setFacilityAgentCustomId that are developed in Ticket 2, we can fetch the customId of each Agent of the provided Facility. We may face some performance issues if we run a lot of queries to the database, so we need to come up with a query that fetches all the customIds for the Facility and add them to the metadata.

### Ticket 5:

- Title: Update generateReport function to use the customId of each Agent based on the Facility
- Description: Once we have the customId of each Agent, we can use that to show it on the generated PDF.
- Acceptance Criteria:
  1. Show the customId of each Agent based on the metadata that are provided.
  2. If an Agent has no customId, show the Agent id from the database.
- Time estimate: Implementation 2 hour, Testing: 2 hour, Total: 4 hours
- Implementation Details: Update the function generateReport and the PDF template to show the Agent customId instead of the id. If the customId is not configured, use the id.
