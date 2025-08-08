# 🌍 Environmental Calculator

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![Next.js](https://img.shields.io/badge/Next-black?logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

Turn complexity into clarity. Impact Story Pro is a fully functional web application that allows anyone to become an environmental analyst by building powerful, custom calculators. Visually define inputs, write formulas, and see your impact story unfold in real-time.

---

## 📋 Table of Contents

- [Features](#-features)
- [Screenshots](#-screenshots)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [How It Works](#-how-it-works)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

-   **📝 Dynamic Calculator Builder**: Visually add, edit, and remove input fields and output formulas.
-   **🔢 Advanced Input Types**: Supports **Number** fields for quantitative data and **Select (Dropdown)** fields for choosing from predefined options.
-   **🖱️ Drag-and-Drop Interface**: Intuitively reorder all fields to structure your calculator exactly as you need it.
-   **🧮 Powerful Formula Engine**: Write custom formulas using standard math expressions. Variable names are automatically generated from your input labels.
-   **🚀 Real-Time Dashboard**: Results are calculated instantly as you enter data, providing immediate feedback.
-   **💾 Persistent Templates**: Your calculator designs are automatically saved to your browser's local storage.
-   [**➡️ View the Live Demo Here**](https://environmental-calculator.vercel.app/)
---


## 🛠️ Tech Stack

-   **Framework**: [Next.js](https://nextjs.org/) (v13+ with App Router)
-   **UI Library**: [React](https://react.dev/) (v18)
-   **State Management**: [Zustand](https://github.com/pmndrs/zustand)
-   **Styling**: [TailwindCSS](https://tailwindcss.com/)
-   **Formula Parsing**: [math.js](https://mathjs.org/)
-   **Drag & Drop**: [@hello-pangea/dnd](https://github.com/hello-pangea/dnd)
-   **Icons**: [Lucide React](https://lucide.dev/)

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

-   [Node.js](https://nodejs.org/) (version 18.x or later)
-   [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/imdevraj069/environmental-calculator.git](https://github.com/imdevraj069/environmental-calculator.git)
    cd impact-story-pro
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

4.  **Open the application:**
    Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

---

## ⚙️ How It Works

The application's architecture is designed to be reactive, modular, and efficient.

1.  **State Management (Zustand)**: A central store (`calculatorStore.js`) acts as the single source of truth. It manages the structure of the calculator (`inputs`, `outputs`) and the user's entered values (`data`). The `persist` middleware automatically handles saving the state to and rehydrating from `localStorage`.

2.  **Calculator Builder**: This is the core interactive component. When a user drops a field into a new position, `@hello-pangea/dnd` triggers a reorder action that updates the state, causing the UI to re-render in the new order.

3.  **Dynamic Form**: The `DataInputForm` component subscribes to the `inputs` array in the store and dynamically renders the appropriate form control for each item.

4.  **Real-Time Calculation**: The `ResultsDashboard` listens for changes to both the `outputs` (formulas) and the `data` (values). Whenever a change occurs, it re-evaluates each formula using `math.js`, passing in the current `data` object as the scope for the calculation.

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` file for more information.