# Weather Info App

Welcome to the Weather Forecast Project repository, containing our app TD Weather! This app provides weather information based on your local postcode. It utilizes two APIs, a open-meteo.com and a postcodes.io, to fetch the required data and update the DOM accordingly. The app allows users to search for weather information and view the app on different devices.

## Table of Contents

- [User Stories](#user-stories)
- [Acceptance Criteria](#acceptance-criteria)
- [APIs Used](#apis-used)
- [Installation](#installation)
- [Technologies Used](#technologies-used)
- [App Flow](#app-flow)
- [Authors](#authors)
- [Contributing](#contributing)
- [License](#license)

## User Stories <a name="user-stories"></a>

As a user of the TD Weather App, I want the following features:

- **Core Stories**

  - See an interesting mashup of weather data based on my local postcode.
  - Input my postcode to change the displayed weather information.
  - View the app on all of my devices.

<!-- - **Stretch Stories**

  - See a loading indicator when data is being fetched.
  - Receive error messages when something goes wrong. -->

## Acceptance Criteria <a name="acceptance-criteria"></a>

- The app should query at least two APIs using the fetch function.
- The content displayed in the app should be dynamically generated with JavaScript.
- The user journey should be clearly defined and documented in the README.md file.
- The app should have a responsive, mobile-first design.
- Accessibility should be considered to ensure the app is usable by a wide range of users.

## APIs Used <a name="apis-used"></a>

The TD Weather App utilizes the following APIs:

- **Weather API: open-meteo.com**: This API provides weather data based on the user's local postcode. It returns information such as temperature, weather conditions, sunrise, wind speed, etc.

- **Postcode API: postcodes.io**: This API allows the app to convert the user's input postcode into geographic coordinates (latitude and longitude). The coordinates are used to fetch weather data for the specific location.


## Installation <a name="installation"></a>

To run the TD Weather App locally, follow these steps:

1. Clone the repository: `git clone https://github.com/your-username/weather-forecast-project.git`
2. Navigate to the project directory: `cd weather-forecast-project`
3. Open the `index.html` file in your preferred web browser.

That's it! You can now use the TD Weather App to retrieve weather information based on your local postcode.

## Technologies Used <a name="technologies-used"></a>

The TD Weather App is built using the following technologies:

- **HTML**: Markup language for creating the structure of the app.
- **CSS**: Styling language for designing the visual appearance of the app.
- **JavaScript**: Programming language for implementing dynamic functionality and API interactions.

## App Flow <a name="app-flow"></a>

1. When the app loads, the user is presented with a search input field and a submit button.
2. The user enters their postcode in the search input field.
3. Upon submitting the postcode, the app queries the postcode API to convert the postcode into geographic coordinates (latitude and longitude).
4. The app then uses the coordinates to fetch weather data from the weather API.
5. The received weather data is dynamically displayed in the app, including temperature, weather conditions, humidity, wind speed, etc.
6. The user can input a new postcode at any time to fetch weather information for a different location.
7. The app updates the displayed weather information accordingly.
8. If there are any errors during the API requests or data retrieval, the app displays appropriate error messages to the user.

## Authors <a name="authors"></a>

This project was created and maintained by [Deepashri Dali](https://github.com/DeepsDali) and [Tess Phillips](https://github.com/tess-phillips) Please feel free to contact us if you have any questions or suggestions regarding the TD Weather App.

## Contributing <a name="contributing"></a>

Contributions to the TD Weather App are welcome! If you find any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request.

## License <a name="license"></a>

The TD Weather App is open source and released under the [MIT License](https://mit-license.org/). You are free to use, modify, and distribute the code as needed.
