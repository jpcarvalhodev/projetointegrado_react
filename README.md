Educational Institution Review Management System (React with TypeScript)

Welcome to the Educational Institution Review Management System repository! This project is built using React with TypeScript and aims to provide a platform for managing and displaying reviews for an educational institution.

Features

	•	Users can view reviews for the educational institution.
	•	Users can submit new reviews, including ratings and comments.
	•	Administrators can manage reviews, including approving, editing, and deleting them.

Prerequisites

	•	Node.js (v14.x or higher)
	•	npm or yarn
	•	Git

Installation

	1.	Clone this repository:

git clone https://github.com/your-username/repository-name.git

	2.	Navigate into the project directory:

cd repository-name

	3.	Install dependencies using npm:

npm install

or using yarn:

yarn

	4.	Create a .env file in the root directory and add necessary environment variables.
	5.	Start the development server:

npm start

or with yarn:

yarn start

Usage

Once the development server is running, you can access the application at http://localhost:3000 in your web browser. From there, you can:

	•	View existing reviews for the educational institution.
	•	Submit new reviews, providing ratings and comments.
	•	Administrators can log in and manage reviews, including approving, editing, and deleting them.

Folder Structure

src/
|-- components/
|   |-- Navbar.tsx
|   |-- NavbarAluno.tsx
|   |-- NavbarAvaliacao.tsx
|   |-- NavbarCurso.tsx
|   |-- NavbarProfessor.tsx
|   |-- NavbarUC.tsx
|-- context/
    |-- AuthContext.tsx
|-- pages/
|   |-- HomePage.tsx
|   |-- LoginPage.tsx
|   |-- AdminPage.tsx
|-- 
|-- App.tsx
|-- index.tsx
|-- styles.css
|-- ...

Contribution

Contributions are encouraged and welcome! If you have any ideas for improvements, feel free to open an issue!