## Folder Structure

auth:
-    ${feature}controllers -> exposed to the clients
-    ${feature} services -> encapsulates business logic
-    ${feature} models -> contains schemas

### Authentication (Who you are?)
- It verifies a user's identity (e.g., login with email & password).
- Example: When you log in to a website, it checks if your credentials are correct.

### Authorization (What you can do?)
- It determines what a user is allowed to do after authentication.
- Example: Even after logging in, you may not have permission to access the admin panel.