# Challenge Tracker App

## Overview
The **Challenge Tracker App** is designed to help you set, manage, and track your personal challenges with ease. Whether it's daily exercise, sticking to a diet, or developing a reading habit, this app provides an intuitive interface to keep you motivated and on track.

## Features
### Basic Functionality
- **Create New Challenges**: Add a new challenge with a title, description, start date, and end date.
- **Set Frequency**: Define how often the challenge should be completed (e.g., daily or weekly).
- **Track Progress**: Mark each day or week as completed or missed, and visualize your progress over time.
- **View Progress**: Monitor the status of each challenge based on its start and end dates.

### Advanced Features
- **Update Challenges**: Modify existing challenges to keep them relevant and aligned with your goals.
- **Persistence**: Automatically save challenges and progress in `localStorage` so your data remains intact after a page refresh.
- **Filter Challenges**: Sort and filter challenges by their status—Active, Completed, or Missed.
- **Responsive Design**: Enjoy a seamless experience across various devices, ensuring that the app looks great and functions well on all screen sizes.

## Tech Stack
- **Frontend**: React.js
- **Language**: TypeScript
- **State Management**: React hooks (useState, useEffect, etc.)
- **Data Persistence**: `localStorage`
- **Styling**: CSS (with a focus on responsive design)

## Installation and Setup
Follow these steps to get the app running on your local machine:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/bhupendrasingh-rajput/challenge-tracker-app.git
   cd challenge-tracker-app
   ```

2. **Install Dependencies:**
   Make sure you have Node.js installed, then run:
   ```bash
   npm install
   ```

3. **Run the App:**
   ```bash
   npm start
   ```
   The app will run on `http://localhost:3000`.

## Project Structure
- **src/**
  - **components/**: Reusable React components.
  - **pages/**: Main pages of the app.
  - **hooks/**: Custom hooks for state management.
  - **styles/**: CSS files for styling.
  - **utils/**: Utility functions.
  - **App.tsx**: Main app component.
  - **index.tsx**: Entry point of the app.

## Usage
1. **Creating a Challenge**: Go to the "Create Challenge" page, fill in the details, and hit "Save".
2. **Tracking Progress**: Mark each day or week as completed or missed to track your progress.
3. **Filtering Challenges**: Use the filter options to view Active, Completed, or Missed challenges.
4. **Editing Challenges**: Select an existing challenge and update its details as needed.

## Sample Challenges
Here are some sample challenges you can try:
- **Challenge 1**: Run 4 days a week. 
  - *Description*: Run at least 5 Kms each day.
  - *Frequency*: 4 days a week.
  - *Duration*: 4 weeks.
  
- **Challenge 2**: Follow a diet 5 days a week.
  - *Description*: No sugar, no carbs.
  - *Frequency*: 5 days a week.
  - *Duration*: 4 weeks.

- **Challenge 3**: Read a book every day for 15 minutes.
  - *Description*: Any book of your choice.
  - *Frequency*: Daily.
  - *Duration*: 2 weeks.

## Contributing
Contributions are welcome! Please follow these steps to contribute:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature/your-feature-name`).
6. Open a pull request.
