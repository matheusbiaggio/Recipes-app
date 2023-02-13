<h1 align="center"> Recipes App </h1>

<p align="right">
<img src="http://img.shields.io/static/v1?label=STATUS&message=%20FINISHED&color=GREEN&style=for-the-badge"/>
</p>

## :hammer: Project features

- `Functionality 1`: Search for food and drink recipes
- `Functionality 2`: Filter recipes by types or ingredients
- `Functionality 3`: Favorite recipes
- `Functionality 4`: Track recipes in progress and completed

## ✔ Technologies used

- <img align="center" alt="Matheus-Jest" height="30" width="90" src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB">
- <img align="center" alt="Matheus-Jest" height="30" width="90" src="https://img.shields.io/badge/Jest-323330?style=for-the-badge&logo=Jest&logoColor=white">
- <img align="center" alt="Matheus-Jest" height="30" width="90" src="https://img.shields.io/badge/testing%20library-323330?style=for-the-badge&logo=testing-library&logoColor=red">

## 📒 Introduction

A React application that makes an API request to TheMealDB and The CockTailDB.

The project contains the following screens: 

- `Login`
- `Main page`
- `Drink filter`
- `Recipe details page`
- `Favorite recipes`
- `Started recipes`
- `Profile`

At first it contains a login screen for possible verification of a DB to be created.

After validating the login, the user is redirected to the main page, which comes by default with a request for the first 12 food recipes. The main screen has two buttons, these buttons redirect the user to the food or drink recipe screen. There is also a button that redirects the user to the profile screen.

When clicking on a recipe, the user is redirected to the details screen, which has instructions on how to make the recipe and its ingredients. There is also a button to share the recipe, bookmark it and if the recipe is not done, a button to start the recipe or continue an already started recipe.

In favorite recipes screens, all favorite recipes are listed, also for recipes started.

The profile screen shows the registered email and buttons that redirect to favorite, started and finished recipes.

## 💻 Installation

install the dependencies:

```bash
npm install
```

initialize the project:

```bash
npm start
```
