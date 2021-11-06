# Acadia Finder  HCI project

A web application that helps students buy, sell or rent books amongst themselves.

## Getting started

- clone/download the repository into your local machine by running `git clone git@gitlab.com:shatax/acadia-finder-hci-project.git` in your selected folder
- cd into `acadia-finder-hci-project` and you should be able to see two folders there: `acadia-finder-front-end` and `acadia-finder-backend`


### pages needed
- Hero page (landing page)
- login - view
- signup - view
- profile - purchases, rentals, holdings and sales
- books
- notes 
- similar program students - only show up when logged in - view


### to run the front-end
- cd to `acadia-finder-front-end`
- run `yarn`
- run `yarn serve`

### front-end components setup
- create a named component e.g. Book.vue in the `components` directory (login and signup do not need components)
- create a view for the component e.g. Books.vue in the `views` directory
- update the `router.js` accordingly
- update the `index.js` file in the store accordingly
- use google to get nice looking features for the view you are creating
- use vuetify website `https://vuetifyjs.com/en/introduction/why-vuetify/`

### To Do
- create password reset endpoint (not doing)
- add password validation (done?)
- add login validation
- Remember login () (not doing)


- add breakpoint to holdings cols for user Profile page - Noor
- make card height fix on user profile - Noor 
- holdings - Noor
- create admin endpoint, model, and admin login page - Muhammad


### New Notes
- file upload validation for books and note files
- fix file upload button style
-  Fix number of friends (user Profile)
- confirm deletes


