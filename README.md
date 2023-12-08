# RIDEROUTE

## [See the App!](https://rideroute.netlify.app/)

![App Logo](./public/images/letter.png)

## Description
RIDEROUTE is a social media fot motorbikers to share their favourite routes with others motorbikers. They can publish their own routes and all the users can see and comment his questions about the routes.

#### [Client Repo here](https://github.com/dsanchezva/rideroute-client.git)
#### [Server Repo here](https://github.com/jairogcdev/rideroute-server.git)

## Backlog Functionalities

Followwing user system, add to favourite one route and visualize in your profile and much more. 

## Technologies used

HTML, CSS, Javascript, React, axios, React Context, antd, leaflet, leaflet routing, React router dom.

# Client Structure

## User Stories

- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault 
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
- **homepage** - As a user I want to be able to access the homepage so that I see what the app is about and login and signup
- **sign up** - As a user I want to sign up on the webpage so that I can see all the events that I could attend
- **login** - As a user I want to be able to log in on the webpage so that I can get back to my account
- **logout** - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account
- **routes list** - As a user I want to see all the routes available so that I can choose which ones I want to see
- **events create** - As a user I want to create an route to share with others motorbikers

## Client Routes

## React Router Routes (React App)
| Path                      | Page              | Components        | Permissions              | Behavior                                                      |
| ------------------------- | ------------------| ----------------  | ------------------------ | ------------------------------------------------------------  |
| `/`                       | Home              |                   | public                   | Home page                                                     |
| `/signup`                 | Signup            |                   | public                   | Signup form, link to login, navigate to homepage after signup |
| `/login`                  | Login             |                   | public                   | Login form, link to signup, navigate to homepage after login  |
| `/home`                   | MainPage          | MainPage          | user only `<IsPrivate>`  | List of all routes                                            |
| `/profile`                | Profile           | Profile           | user only `<IsPrivate>`  | User information and motorbike information                    |
| `/editUser`               | UserEdit          | UserEdit          | user only `<IsPrivate>`  | User information can be change                                |
| `/editMoto`               | EditMotorbike     | EditMotorbike     | user only `<IsPrivate>`  | Motorbike information can be change                           |
| `/editUserPicture`        | UserEditImage     | UserEditImage     | user only `<IsPrivate>`  | User can upload a new user picture                            |
| `/editMotoPicture`        | EditMotorbikeImage| EditMotorbikeImage| user only `<IsPrivate>`  | User can upload a new motorbike picture                       |
| `/routeCreate`            | RouteCreate       | RouteCreate       | user only `<IsPrivate>`  | User can create a new motorbike route                         |
| `/routeDetails/:routeId`  | RouteDetails      | RouteDetails      | user only `<IsPrivate>`  | Shows in detail a route and add a comment                     |
| `/routeEdit/:routeId`     | RouteEdit         | RouteEdit         | user only `<IsPrivate>`  | Edit a route clicking on the map                              |

## Other Components

- Navbar
- Footer
- ClickMarket
- CommentCard
- CommentList
- IsPrivate
- RouteCard
- RouteMap
- Routing

## Context

- auth.context
- theme.context
  
## Links

### Collaborators

[Jairo](https://github.com/jairogcdev)

[David](https://github.com/dsanchezva)

### Project

[Repository Link Client](https://github.com/dsanchezva/rideroute-client.git)

[Repository Link Server](https://github.com/jairogcdev/rideroute-server.git)

[Deploy Link](https://rideroute.netlify.app/)


### Slides

[Slides Link]([www.your-slides-url-here.com](https://docs.google.com/presentation/d/1c53eW2G7djpTyzk2GM6M9eAocRtZRsRAfIfSqO9OXM8/edit?usp=sharing)https://docs.google.com/presentation/d/1c53eW2G7djpTyzk2GM6M9eAocRtZRsRAfIfSqO9OXM8/edit?usp=sharing)
