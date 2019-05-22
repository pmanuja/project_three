# project_three - Bootcamp Boutique
Jon Phillips, Pooja Manuja, Ryan Whitehill


## Technologies used:
- Javascript, Angular (1.7.2), HTML, CSS, Node.JS, Via-NPM:(Bcrypt, Dotenv, Express, Express-session, Mongoose), Github, Heroku


## General Approach
The initial goal was to complete the MVP for the project. We aimed to have a pair of models (users and items), where a user could log in to a page to view the item index. We began by setting up a pair of unrelated models with CRUD; these would store info on the users and items. They were then displayed via angular onto a single-page webpage, and forms were created to add/edit/view/remove both models

Next, the two models needed to be connected - the user needed to be able to store items in their 'shopping cart'. This was accomplished by saving references to the items (as opposed to the items themselves); the benefit of this is that if an item is edited, the program does not need to alter the references in each user's cart. However, the downside is that the item database needs to be searched when the cart is checked.

At this point, we focused on the front-end of the program. The placement of the elements in each view were defined, as was the general appearance of the page.


## User Stories:
A guest user can:
  - Toggle between different views: welcome page, store page
  - See a list of products and inspect them in more detail to see an item description, price, and reviews.
  - Create an account with an encrypted password to log in with

A logged-in user can:
  - Do all of the above.
  - Add an item to my shopping cart; be able to change the quantity in the cart; be able to remove the item from the cart
  - Toggle the view to a page with their shopping cart contents
  - Add a review to items on the store page

A user with admin privileges can:
  - Do all the above
  - Add, edit, and remove items from the store page

Any given user should not be able to:
  - See or edit another user's shopping cart


## Unsolved Problems:
- There are still a handful of unnecessary database searches during item updates; the controller methods used to edit a user's shopping cart could be refined to edit the page without getting updated database info.
- Users are not notified in any way when an item is removed from the store - such items are silently removed from their shopping cart.
- Reviews cannot be edited or deleted
- A new user can become an admin is an unsecured (if slightly obscured) fashion.

## Notes:
We found our biggest struggle in this project was getting used to work in a group dynamic. Being an Angular / single page application, we were often working in the same files, and encountered several merge conflicts. However it was a learning experience. For future projects we all would agree that a best practice would be to specify who is working in which files within our Github project board (or whatever project tracking application we are using).

If given more time, our stretch goals would have included the following:
- Optimizing our code by reducing the number of database searches when items or users are updated.
- Using socket.io to update views / items in real-time.
- Making the experience more personal by allowing the user to update their profile. For example, adding their Github link, location, etc.
- Figuring out a way to incorporate an API (the goal here being to showcase more of what we have learned up to this point in class).
- Adding some sort of user authentication, possibly with an automated email that is sent out to confirm the creation of an account.
- Adding checkout functionality to the cart.
