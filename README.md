# Educational Institution Management System

Welcome to the Educational Institution Management System repository! This project is built using React with TypeScript and aims to provide a platform for managing students and reviews for an educational institution.

## Features

	•	Teachers can view and submit reviews for the educational institution.
	•	Institution employees can manage students, courses, subjects, teachers and reviews.
	•	Administrators can manage students, courses, subjects, teachers and reviews with CRUD operations.

## Prerequisites

	•	Node.js (v14.x or higher)
	•	npm or yarn
	•	Git

## Installation

1. Clone this repository:
 
```
git clone https://github.com/jpcarvalho23/projetointegrado-react.git
```

2. Navigate into the project directory:

```
cd projetointegrado-react
```

3. Install dependencies using npm:

```
npm install
```

or using yarn:

```
yarn
```

4. Create a .env file in the root directory and add necessary environment variables.
5. Start the development server:

```
npm start
```

or with yarn:

```
yarn start
```

## Usage

Once the development server is running, you can access the application at http://localhost:3000 in your web browser. From there, you can:

• View existing reviews for the educational institution.

• Submit new reviews, providing ratings and comments.

• Administrators can log in and manage reviews, including approving, editing, listing and deleting them.

## Folder Structure

```
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
|   |-- CreateAluno.tsx
|   |-- CreateAvaliacao.tsx
|   |-- CreateCurso.tsx
|   |-- CreateProfessor.tsx
|   |-- CreateUC.tsx
|   |-- ListAlunos.tsx
|   |-- ListAvaliacoes.tsx
|   |-- ListCursos.tsx
|   |-- ListProfessor.tsx
|   |-- ListUC.tsx
|   |-- Login.tsx
|   |-- Logout.tsx
|   |-- RemoveAluno.tsx
|   |-- RemoveCurso.tsx
|   |-- RemoveProfessor.tsx
|   |-- RemoveUC.tsx
|   |-- UpdateAluno.tsx
|   |-- UpdateCurso.tsx
|   |-- UpdateUC.tsx
|-- 
|-- App.tsx
|-- index.tsx
|-- index.css
|-- routes.tsx
|-- ...
```

## Contribution

Contributions are encouraged and welcome! If you have any ideas for improvements, feel free to open an issue!
