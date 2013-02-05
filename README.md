# facebookSliderMenu.js

A jQuery plugin that enables you to easily create a Facebook-like slide-out menu.

# OPTIONS : 
* Accepted parametres :
* sliderWidth: THE WIDTH OF YOUR SLIDER WHEN IT IS OPEN => accepted values : 0-100 / default : 15,
* snapZoneWidth: THE WIDTH OF THE ZONE INSIDE WICH THE SLIDER SNAPS INTO PLACE => accepted values : 0-100  / default : 25,
* direction: WHETHER THE SLIDER SLIDES ONLY LEFT OR BOTH WAYS, TO REVEAL A MENU AND A SUBMENU => accepted values : 'left'/'both' (IN BETA)  / default : 'left',
* animationSpeed: SET THE SPEED OF THE SLDER ANIMATION => accepted values : 'slow', duration in milliseconds / default : 'fast',
* animationEasing: SET THE ANIMATON TYPE => accepted values : any of the animation types listed in easing.js / default : 'swing',
* open: WHETHER THE SLIDER SHOULD BE OPEN OR CLOSED AT START => accepted values : true/false / default : true

## Usage

```javascript
$("#fbs-main-content-container").facebookSliderMenu({[params]}});
```