[[Major Project/_Index|Project Index]]
# System Requirements
*System requirements needed IOT enable the [[3. User Interations]]*
## System
- Secure login system (Email + PW used to login. JWT generated serverside with UUID to authenticate user in future requests)
	- Login system must handle individual users + organisation accounts
	- This can be achieved by separating business accounts from individual in DB
- 3 core systems to solution:
	1. Frontend Website (Combination of static rendering and SRR with NextJS)
	1. Management Web Application (React Webapp build into site)
	2. Backend API (Wraps around Database to provide data access)
## Subsystems
### Inventory System
- Store units of stock, matched to a stock type, including the expiry date
- Store stock types: with unit size and food type
- View current stock types
- Add/remove/edit stock types
- Add/remove inventory units
- View all stock in inventory, sorted by: date added, expiry date, name, and type
### Parcel System
- Store current parcels and their content, related to current inventory
- Store status of parcels (Complete/Incomplete)
### Order System
- Track orders and their clients
- Track parcels assigned to orders **(Only COMPLETE parcels can be assigned to orders)**
### Donation System
- Must interface with external payment API to provide secure banking connection
- Donations done through external system must be linked back to the users account
- Users able to view thier donation history via website
- Food donations from businesses must be viewable to staff in the system to enable collection etc.
### Organisation System
- Must provide org admins with a system to manager their own users
- Must allow the creation of organisation employees
- Support Orgs
	- Must allow employees to generate unique referral tokens
- Business Orgs
	- Must allow employees to submit written forms of what food is available from the business