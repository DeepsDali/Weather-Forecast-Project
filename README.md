# Weather Info App

Welcome to the Weather Info App repository! This app provides weather information based on your local postcode. It utilizes two APIs, a weather API and a postcode API, to fetch the required data and update the DOM accordingly. The app allows users to search for weather information, filter the results, and view the app on different devices.

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

As a user of the Weather Info App, I want the following features:

- **Core Stories**

  - See an interesting mashup of weather data based on my local postcode.
  - Input my postcode to change the displayed weather information.
  - View the app on all of my devices.

- **Stretch Stories**

  - See a loading indicator when data is being fetched.
  - Receive error messages when something goes wrong.

## Acceptance Criteria <a name="acceptance-criteria"></a>

- The app should query at least two APIs using the fetch function.
- The content displayed in the app should be dynamically generated with JavaScript.
- The user journey should be clearly defined and documented in the README.md file.
- The app should have a responsive, mobile-first design.
- Accessibility should be considered to ensure the app is usable by a wide range of users.

## APIs Used <a name="apis-used"></a>

The Weather Info App utilizes the following APIs:

- **Weather API**: This API provides weather data based on the user's local postcode. It returns information such as temperature, weather conditions, humidity, wind speed, etc.

- **Postcode API**: This API allows the app to convert the user's input postcode into geographic coordinates (latitude and longitude). The coordinates are used to fetch weather data for the specific location.

Please note that some APIs may require an API key or token for authentication. Ensure that you follow the API provider's guidelines for obtaining and using the API key.

## Installation <a name="installation"></a>

To run the Weather Info App locally, follow these steps:

1. Clone the repository: `git clone https://github.com/your-username/weather-info-app.git`
2. Navigate to the project directory: `cd weather-info-app`
3. Open the `index.html` file in your preferred web browser.

That's it! You can now use the Weather Info App to retrieve weather information based on your local postcode.

## Technologies Used <a name="technologies-used"></a>

The Weather Info App is built using the following technologies:

- **HTML**: Markup language for creating the structure of the app.
- **CSS**: Styling language for designing the visual appearance of the app.
- **JavaScript**: Programming language for implementing dynamic functionality and API interactions.

## App Flow <a name="app-flow"></a>

1. When the app loads, the user is presented with a search input field and a submit button.
2. The user enters their postcode in the search input field.
3. Upon submitting the form, the app queries the postcode API to convert the postcode into geographic coordinates (latitude and longitude).
4. The app then uses the coordinates to fetch weather data from the weather API.
5. The received weather data is dynamically displayed in the app, including temperature, weather conditions, humidity, wind speed, etc.
6. The user can input a new postcode at any time to fetch weather information for a different location.
7. The app updates the displayed weather information accordingly.
8. If there are any errors during the API requests or data retrieval, the app displays appropriate error messages to the user.

## Authors <a name="authors"></a>

This project was created and maintained by [Your Name](https://github.com/your-username). Please feel free to contact me if you have any questions or suggestions regarding the Weather Info App.

## Contributing <a name="contributing"></a>

Contributions to the Weather Info App are welcome! If you find any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request.

## License <a name="license"></a>

The Weather Info App is open source and released under the [MIT License](https://mit-license.org/). You are free to use, modify, and distribute the code as needed.
